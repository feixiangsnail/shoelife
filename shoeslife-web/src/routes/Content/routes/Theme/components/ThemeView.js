import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
import {Modal, Popconfirm, Button, Icon} from 'antd';
//状态
const STATUS = {
  'UNPUBLISHED': "未发布",
  'ONLINE': "已发布",
  'OFFLINE': "已下线",
};
class Theme extends Component {
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
   * 发布/上线/下线
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
    const {params} = context.props;
    let config = {
      formItems: [{
        label: "关键字：",
        name: "name",
        input: {}
      }, {
        label: "状态：",
        name: "status",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
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
      title: '排序',
      dataIndex: 'sortWeight'
    },{
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    }, {
      key: '2',
      title: '宣传图',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '3',
      title: '标题',
      dataIndex: 'name',
      render(key, row){
        return <a href={row.url} target="_blank">{key}</a>
      }
    }, {
      key: '4',
      title: '关联鞋款',
      dataIndex: 'shoeIds',
      render(key){
        return key && key.split(',').length;
      }
    }, {
      key: '5',
      title: '更新时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '6',
      title: '当前状态',
      dataIndex: 'status',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id, row){
        return <span>
          {
            row.status == 'UNPUBLISHED' ?
              <Popconfirm title="是否发布？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">发布 / </a></Popconfirm> : ''
          }
          {
            row.status == 'ONLINE' ?
              <Popconfirm title="是否下线？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">下线</a></Popconfirm> : ''
          }
          {
            row.status == 'OFFLINE' ?
              <Popconfirm title="是否上线？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">上线 / </a></Popconfirm> : ''
          }
          {
            row.status == 'UNPUBLISHED' ?
              <Popconfirm title="是否删除该款式？" onConfirm={context.del.bind(context, id)}><a href="javascript:;">删除 / </a></Popconfirm> : ''
          }
          {
            row.status != 'ONLINE' ? <Link to={`/content/theme/edit/${id}`}>编辑</Link> : ''
          }
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <div style={{textAlign: 'right'}}>
      <Button type="primary">
        <Link to={`/content/theme/edit`}>
          <Icon type="plus"/> 主题系列
        </Link>
      </Button>
    </div>
  }

  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...other} ref="dt" />
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Theme.propTypes = {}

export default Theme;
