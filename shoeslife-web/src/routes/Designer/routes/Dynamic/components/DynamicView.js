import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import {Modal, Button, Popconfirm} from 'antd';

//状态
const STATUS = {
  '1': "未发布",
  '0': "已发布",
};
class Dynamic extends Component {
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
   * 发布
   * @param row
   * @param id
   */
  release(row, id) {
    const {toRelease} = this.props;
    toRelease(row, id);
    this.refs && this.refs.dt.refresh();
  }

  /**
   * 删除
   * @param id
   */
  del(id) {
    const {toDel} = this.props;
    toDel(id)
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
    const {dList, params, isDeser} = context.props;
    let config = {
      formItems: [{
        label: "设计师：",
        name: "designerId",
        span: "8",
        labelCol: {span: 4},
        disabled: isDeser,
        select: {
          tipValue: "全部",
          optionValue: dList,
          style: {width: '300px'}
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
      title: '标题',
      dataIndex: 'title',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/dynamic/' + row.designerDynamicId;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '1',
      title: '宣传图',
      dataIndex: 'icon',
      render(key){
        return <Image src={key + '?x-oss-process=image/resize,h_80,w_80'} onClick={context.onClickImage.bind(context, key)}/>
      }
    }, {
      key: '2',
      title: '设计师',
      dataIndex: 'designerName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/designer/' + row.designerId;
        let tName = key;
        return <span><a href={toUrl} target="_blank">{tName}</a>{row.designerStatus != 0 ? '（已禁用）' : ''}</span>
      }
    }, {
      key: '3',
      title: '发布时间',
      dataIndex: 'releaseTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '4',
      title: '浏览量',
      dataIndex: 'browseNum'
    }, {
      key: '5',
      title: '当前状态',
      dataIndex: 'isRelease',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      title: '操作',
      dataIndex: 'designerDynamicId',
      render(id, row){
        return <span>
          {
            row.isRelease == '1' ?
              <Popconfirm title="是否确定发布？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">发布 / </a></Popconfirm> : ''
          }
          {
            row.isRelease == '1' ?
              <Link to={`/designer/dynamic/edit/${id}`}>编辑 / </Link> : ''
          }
          <Popconfirm title="是否删除该动态？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <div style={{textAlign: 'right'}}>
      <Button type="primary">
        <Link to={`/designer/dynamic/edit`}>
          发布新动态
        </Link>
      </Button>
    </div>
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...other} ref="dt"/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Dynamic.propTypes = {}

export default Dynamic;
