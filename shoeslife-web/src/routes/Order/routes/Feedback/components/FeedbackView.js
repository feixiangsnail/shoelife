import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';

import {DownLoader} from 'components/FileLoader';

import {formatDate} from 'common/utils';
import Search from 'components/Search';

import {Row, Modal, Rate} from 'antd';
// 满意度
const STAR = {
  '1': "1星",
  '2': "2星",
  '3': "3星",
  '4': "4星",
  '5': "5星",
};
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }

  /**
   * 隐藏图片预览
   */
  cancelPreview = () => {
    this.setState({previewVisible: false});
  };

  /**
   * 点击图片时显示幻灯片
   * @param text
   */
  onClickImage(text) {
    let newImageArray = [];
    if (typeof(text) === 'string' || text instanceof String && text.length > 0) {
      newImageArray = text.split(',') && text.split(',').length&&text.split(',').map((k)=>{
          return {url: IMG_URL + k, alt: ''}
        })
    }
    // 如果没有图片, 点击就不要显示modal
    if (newImageArray.length > 0) {
      this.setState({previewVisible: true, previewImages: newImageArray});
    }
  }

  _getFormItems() {
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "满意度：",
        name: "satisfaction",
        span: "6",
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STAR).map((key) => {
            return {'value': key, 'title': STAR[key]}
          })
        }
      }, {
        label: "订单编号：",
        name: "orderId",
        span: "6",
        labelCol: {span: 4},
        input: {}
      }],
      initValue: params
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '订单编号',
      dataIndex: 'orderId',
      render(id, row){
        return <Link to={`/order/orderDetail/${id}`}>{id}</Link>;
      }
    }, {
      key: '1',
      title: '反馈内容',
      dataIndex: 'content',
      width: '300px'
    }, {
      key: '2',
      title: '图片',
      dataIndex: 'image',
      render(key){
        return <div>
          {
            <Image src={key && key.split(',') && key.split(',').length && key.split(',')[0]+'?x-oss-process=image/resize,h_80'}
            onClick={context.onClickImage.bind(context,key)}/>
          }
        </div>
      }
    }, {
      key: '3',
      title: '满意度',
      dataIndex: 'satisfaction',
      render(key, row){
        return <Rate disabled value={key}/>
      }
    }, {
      key: '4',
      title: '反馈时间',
      dataIndex: 'feedbackTime',
      render(key, row){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }];
    return columns;
  }

  quickButton() {
    const {params} = this.props;
    return <div style={{textAlign: 'right'}}>
      <DownLoader url='/order/common/orderfeedback/export' params={params} title='导出Excel'/>
    </div>
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...other}/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Feedback.propTypes = {}

export default Feedback;
