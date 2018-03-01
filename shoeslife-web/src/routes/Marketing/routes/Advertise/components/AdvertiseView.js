import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {formatDate, getNowTime, getTimeStamp} from 'common/utils';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';
import {Popconfirm, Modal} from 'antd';
// 发布状态
const STATUS = {
  'UNRELEASE': "未发布",
  'RELEASE': "发布中",
  'PAUSE': "暂停中",
};
// 显示状态
const SHOW_STATUS = {
  false: "未显示",
  true: "显示中",
};
class Advertise extends Component {
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

  release(row, id) {
    const {toRelease} = this.props;
    toRelease(row, id);
    this.refs && this.refs.dt.refresh();
  }

  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    const context = this;
    const {params, sList} = context.props;
    let config = {
      formItems: [{
        label: "广告位：",
        name: "spaceId",
        span: "5",
        labelCol: {span: 5},
        select: {
          tipValue: "全部",
          optionValue: sList
        }
      }, {
        label: "发布状态：",
        name: "status",
        span: "5",
        labelCol: {span: 5},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "显示状态：",
        name: "play",
        span: "5",
        labelCol: {span: 5},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(SHOW_STATUS).map((key) => {
            return {'value': key, 'title': SHOW_STATUS[key]}
          })
        }
      }],
      initValue: params.ad
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '广告图',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '1',
      title: '排序',
      dataIndex: 'sortWeight',
    }, {
      key: '2',
      title: '广告位',
      dataIndex: 'spaceName',
    }, {
      key: '3',
      title: '关联H5页面',
      dataIndex: 'url',
      render(key, row){
        return <a href={key} target="_blank">{key}</a>
      }
    }, {
      key: '4',
      title: '发布周期',
      dataIndex: 'playStartTime',
      render(key, row){
        return <span>{formatDate(key, false) + ' ~ ' + formatDate(row.playEndTime, false)}</span>
      }
    }, {
      key: '5',
      title: '当前状态',
      dataIndex: 'status',
      render(key, row){
        return STATUS[key]
      }
    }, {
      key: '6',
      title: '显示状态',
      dataIndex: 'play',
      render(key, row){
        return SHOW_STATUS[key]
      }
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id, row){
        return <span>
          {
            row.status == 'UNRELEASE' ?
              <Link to={`/market/advert/edit/${id}`}>编辑</Link> : ''
          }
          {
            row.status == 'UNRELEASE' ?
              <Popconfirm title="发布后，客户端可显示此广告，确认发布吗？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;"> / 发布 / </a></Popconfirm> : ''
          }
          {
            row.status == 'RELEASE' ?
              <Popconfirm title="确认暂停发布吗？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">暂停发布</a></Popconfirm> : ''
          }
          {
            row.status == 'PAUSE' ?
              <Popconfirm title="恢复发布后，客户端可正常显示此广告，确认恢复发布吗？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">恢复发布</a></Popconfirm> : ''
          }
          {
            row.status == 'UNRELEASE' ?
              <Popconfirm title="确认删除此广告吗？" onConfirm={context.del.bind(context, id, row)}>
                <a href="javascript:;">删除</a>
              </Popconfirm> : ''
          }
        </span>
      }
    }];
    return columns;
  }

  render() {
    const {tableOptions, getFormOptions} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptions().handleSubmit} onReset={getFormOptions().handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} {...tableOptions} ref='dt'/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Advertise.propTypes = {}

export default Advertise;
