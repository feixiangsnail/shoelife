import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL,IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
import {Row, Col, Button, Modal, Popconfirm, DatePicker} from 'antd';
//状态
const STATUS = {
  '0': "已发布",
  '1': "未发布",
};
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }

  release(id) {
    const {toRelease} = this.props;
    toRelease(id);
  }

  del(id) {
    const {toDel} = this.props;
    toDel(id)
  }

  /**
   * 近24小时、近30天
   * @param t
   */
  recentTime(t) {
    const {recent} = this.props;
    recent(t)
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
    const {cateList, eList,params}=context.props;
    let config = {
      formItems: [{
        label: "标题关键字：",
        name: "searchKey",
        span: "6",
        labelCol: {span: 7},
        input: {
          placeholder: "模糊查询"
        }
      }, {
        label: "分类：",
        name: "selectSecondCategory",
        span: "6",
        labelCol: {span: 6},
        wrapperCol: {span: 17},
        cascader: {
          options: cateList,
          placeholder: "请选择分类",
          changeOnSelect: true
        }
      }, {
        label: "主编：",
        name: "editorId",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: eList
        }
      }, {
        label: "状态：",
        name: "isRelease",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "发布日期：",
        span: '10',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('startTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker  {...getCustomFieldProps('endTime')}/>
          </div>
        }
      }, {
        label: "",
        span: "3",
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <a href="javascript:;" style={{fontSize:'14'}} onClick={context.recentTime.bind(context,86400000)}>近24小时</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" style={{fontSize:'14'}} onClick={context.recentTime.bind(context,604800000)}>近7天</a>
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
      title: '标题图片',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)} /> : '暂无图片'
      }
    }, {
      key: '1',
      title: '标题',
      dataIndex: 'title',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/artical/' + row.articleId;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '2',
      title: '分类',
      dataIndex: 'secondCategoryName'
    }, {
      key: '3',
      title: '主编',
      dataIndex: 'editorName'
    }, {
      key: '4',
      title: '关联商品',
      dataIndex: 'articleProduct',
      render(key){
        return key && key.length ? key.length : '0';
      }
    }, {
      key: '5',
      title: '状态',
      dataIndex: 'isRelease',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      key: '6',
      title: '浏览量',
      dataIndex: 'browseNum'
    }, {
      key: '7',
      title: '最新发布时间',
      dataIndex: 'releaseTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'articleId',
      width: '150px',
      render(id, row){
        return <span>
                  {
                    row.isRelease == '1' ?
                      <Popconfirm title="是否发布该文章？" onConfirm={context.release.bind(context, id, row)}><a href="javascript:;">发布
                        / </a></Popconfirm> : ''
                  }
          <Link to={`/content/list/add/${id}`}>编辑 / </Link>
          <Popconfirm title="是否删除该文章" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm>
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
        <DataTable bordered={false} columns={this._getColumns()} {...other} ref="dt"/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

List.propTypes = {

}

export default List;
