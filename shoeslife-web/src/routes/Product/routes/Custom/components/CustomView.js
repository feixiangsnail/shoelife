import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import {Popconfirm,Modal} from 'antd';
// 推荐设计
const RECOM = {
  true: "仅推荐设计"
};
class Custom extends Component {
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
        label: "原鞋款：",
        name: "key",
        span: "5",
        labelCol: {span: 5},
        input: {}
      }, {
        label: "推荐设计：",
        name: "isRecommend",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(RECOM).map((key) => {
            return {'value': key, 'title': RECOM[key]}
          })
        }
      }],
      initValue: params
    }
    return config;
  }

  _recom(id, row) {
    const {toRecom} = this.props;
    toRecom(id, row)
    this.refs && this.refs.dt.refresh();
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '用户账号',
      dataIndex: 'userName'
    }, {
      key: '1',
      title: '款式效果图',
      dataIndex: 'rendering',
      render(key){
        return <div>
          {
            <Image src={key && key.split(',') && key.split(',').length && key.split(',')[0]+'?x-oss-process=image/resize,h_80'}
                   onClick={context.onClickImage.bind(context,key)}/>
          }
        </div>
      }
    }, {
      key: '2',
      title: '原鞋款',
      dataIndex: 'shoeName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/shoes/' + row.shoeId+'?star='+'preview';
        return <a href={toUrl} target="_blank">{key}</a>
      }
    }, {
      key: '3',
      title: '创建时间',
      dataIndex: 'createTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '4',
      title: '修改时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '5',
      title: '是否推荐',
      dataIndex: 'isRecommend',
      render(key){
        return <span>{key ? '是' : '否'}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'customizedId',
      render(id, row){
        return <span>
          <Link to={`/product/custom/detail/${id}`}>设计详情 / </Link>
          {
            row.isRecommend ? <Popconfirm title="确认取消推荐吗？" onConfirm={context._recom.bind(context, id, row)}><a
              href="javascript:;">取消推荐</a></Popconfirm> :
              <Popconfirm title="确认设为推荐吗？" onConfirm={context._recom.bind(context, id, row)}><a
                href="javascript:;">推荐设计</a></Popconfirm>
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
        <DataTable bordered={false} columns={this._getColumns()}  {...other} ref='dt'/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Custom.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Custom;
