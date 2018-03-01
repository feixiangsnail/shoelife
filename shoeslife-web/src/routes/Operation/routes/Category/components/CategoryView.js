import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';

import Search from 'components/Search';
import {formatDate} from 'common/utils';

import {Row, Col, Button, Icon, Popconfirm,Modal} from 'antd';

const STATUS = {
  '1': "商品分类",
  '2': "材料分类",
  '3': "内容分类",
  '4': "设计风格",
};

const DSTATUS = {
  '0': "是",
  '1': "否",
};

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  delCategory(id, row, display) {
    const {toDel} = this.props;
    toDel(id, row, display)
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
    const {cateList} = context.props
    const {params} = this.props;

    let config = {
      formItems: [{
        label: "分类名称：",
        name: "categoryName",
        input: {}
      }, {
        label: "所属模块：",
        name: "categoryType",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "上级分类：",
        name: "newParentId",
        span: "6",
        labelCol: {span: 6},
        wrapperCol: {span: 17},
        cascader: {
          options: cateList,
          placeholder: "请选择分类",
          changeOnSelect: false
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
      title: '手动排序',
      dataIndex: 'sort'
    }, {
      key: '1',
      title: '图标',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '2',
      title: '名称',
      dataIndex: 'categoryName'
    }, {
      key: '3',
      title: '上级分类',
      dataIndex: 'parentName',
      render(id, row){
        return <span>
              {
                id == null ? '顶级分类' : ''
              }
          {
            id != null ? id : ''
          }
          </span>
      }
    }, {
      key: '4',
      title: '是否在前端显示',
      dataIndex: 'display',
      render(key){
        return <span>{DSTATUS[key]}</span>;
      }
    }, {
      key: '5',
      title: '所属模块',
      dataIndex: 'categoryType',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      key: '6',
      title: '更新时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'categoryId',
      render(id, row){
        return <span>
              <Link to={`/operation/category/editCategory/${id}/${row.categoryType}`}>编辑/   </Link>
          {
            row.display == '0' ?
              <Popconfirm title="确定隐藏该分类吗?" onConfirm={context.delCategory.bind(context, id, row, '1')}><a href="javascript:;">隐藏
              </a></Popconfirm> : ''
          }
          {
            row.display == '1' ?
              <Popconfirm title="确定显示该分类吗?" onConfirm={context.delCategory.bind(context, id, row, '0')}><a href="javascript:;">显示
              </a></Popconfirm> : ''
          }
          </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <Row>
      <Col span='2'>
        <Button type="ghost">
          <Link to={`/operation/category/editCategory`}>
            <Icon type="plus"/> 添加分类
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {tableCategoryOptions, getFormCategoryOptions} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormCategoryOptions().handleSubmit} onReset={getFormCategoryOptions().handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...tableCategoryOptions} ref='dt'/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Category.propTypes = {

}

export default Category;
