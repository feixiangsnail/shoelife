import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
import Image from 'components/Image';
import {Row, Col, Modal, Icon, Popconfirm, DatePicker} from 'antd';
import ImageSlider from 'components/ImageSlider';
import {H5_URL,IMG_URL} from '../../../../../static/apiAlias';
const STATUS = {
  '0': '默认',
  '1': '推荐',
}
class RecommendView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  recommend(id, row) {
    const {isRecommend} = this.props;
    isRecommend(id, row)
    this.refs && this.refs.dt.refresh();
  }
  /**
   * 近24小时、近30天
   * @param t
   */
  recentTime(t) {
    const {recent} = this.props;
    recent(t,'reacommend');
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
    const context = this;
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "发布时间：",
        span: '12',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('startTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endTime')}/>
          </div>
        }
      },{
        label: "",
        span: "3",
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <a href="javascript:;" style={{fontSize:'14'}} onClick={context.recentTime.bind(context,86400000)}>近24小时</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={context.recentTime.bind(context,604800000)}>近7天</a>
          </div>
        }
      }],
      initValue: params
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '配图',
      dataIndex: 'icon',
      render(key){
        return <div>
          {
            <Image src={key && key.split(',') && key.split(',').length && key.split(',')[0]+'?x-oss-process=image/resize,h_80'}
                   onClick={context.onClickImage.bind(context,key)}/>
          }
        </div>
      }
    }, {
      key: '1',
      title: '动态内容',
      dataIndex: 'title'
    }, {
      key: '2',
      title: '发布者',
      dataIndex: 'accountName',
      render(key, row){
        let toType = row.dynamicType == '2' ? 'h5/#/editor/' : 'h5/#/designer/'
        let toUrl = H5_URL + toType + row.accountId;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '3',
      title: '状态',
      dataIndex: 'status',
      render(key){
        return STATUS[key]
      }
    }, {
      key: '4',
      title: '浏览量',
      dataIndex: 'browseNum',
    }, {
      key: '5',
      title: '发布时间',
      dataIndex: 'createTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'dynamicId',
      width: '100px',
      render(id, row){
        return <span>
          {
            row.status == '0' ?
              <Popconfirm title="是否推荐该动态？" onConfirm={context.recommend.bind(context, id, row)}><a href="javascript:;">推荐 / </a></Popconfirm> :
              <Popconfirm title="是否取消推荐该动态？" onConfirm={context.recommend.bind(context, id, row)}><a href="javascript:;">取消推荐 / </a></Popconfirm>
          }
          <Popconfirm title="是否删除该动态？" onConfirm={context.del.bind(context, id)}><a href="javascript:;">删除</a></Popconfirm>
        </span>
      }
    }];
    return columns;
  }

  render() {
    const {tableOptionsR, getFormOptionsR} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptionsR().handleSubmit} onReset={getFormOptionsR().handleReset} sign="reacommend"/>
        <DataTable bordered={false} columns={this._getColumns()}  {...tableOptionsR} ref="dt" sign="reacommend"/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}


RecommendView.propTypes = {}


export default RecommendView;
