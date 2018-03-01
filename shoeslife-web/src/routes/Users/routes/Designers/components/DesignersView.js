import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import {Row, Col, Modal, Popconfirm} from 'antd';
import Search from 'components/Search';

class Designers extends Component {

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
   * 推荐/取消推荐
   * @param row
   * @param id
   */
  _recommend(row, id) {
    const {toRecommend} = this.props;
    toRecommend(row, id);
    this.refs && this.refs.dt.refresh();
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
    const {params} = context.props;
    let config = {
      formItems: [{
        label: "昵称",
        name: "adminName",
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
      title: '头像',
      dataIndex: 'photo',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '1',
      title: '昵称',
      dataIndex: 'adminName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/designer/' + row.id;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '2',
      title: '是否推荐',
      dataIndex: 'recommend',
      render(key){
        return <span>{key ? '是' : '否'}</span>;
      }
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id, row){
        return <span>
                  {
                    !row.recommend ?
                      <Popconfirm title="是否推荐？" onConfirm={context._recommend.bind(context, id, row)}><a href="javascript:;">设为推荐</a></Popconfirm> :
                      <Popconfirm title="是否取消推荐？" onConfirm={context._recommend.bind(context, id, row)}><a href="javascript:;">取消推荐</a></Popconfirm>
                  }
                </span>
      }
    }];
    return columns;
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()}  {...other} ref="dt"/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Designers.propTypes = {}

export default Designers;
