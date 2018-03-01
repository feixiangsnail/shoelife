import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Image from 'components/Image';
import Search from 'components/Search';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';

import {Row, Col, Button, Icon, Popconfirm,Modal} from 'antd';

const STATUS = {
  '鞋跟': "鞋跟",
  '鞋面': "鞋面",
  '鞋底': "鞋底",
  '内里': "内里",
  '鞋垫': "鞋垫",
  '装饰': "装饰",
  '其他': "其他",
};
const TYPE = {
  '0': "通用贴图",
  '1': "纯色",
  '2': "个性用料",
};
class Materi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  delMateri(id) {
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
    const {cateList,params} = context.props
    let config = {
      formItems: [{
        label: "关键字：",
        name: "searchKey",
        labelCol: {span: 6},
        input: {
          placeholder: '名称或编号'
        }
      },{
        label: "所属分类：",
        name: "category",
        span: "6",
        labelCol: {span: 6},
        wrapperCol: {span: 17},
        cascader: {
          options: cateList,
          placeholder: "请选择分类",
          changeOnSelect: true
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
      title: '缩略图',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '1',
      title: '名称',
      dataIndex: 'materialName'
    },{
      key: '3',
      title: '渲染类型',
      dataIndex: 'renderType',
      render(key){
        return TYPE[key];
      }
    },{
      key: '2',
      title: '编号',
      dataIndex: 'materialIdentifier'
    }, {
      key: '4',
      title: '颜色',
      dataIndex: 'materialColor'
    },{
     key: '6',
     title: '所属分类',
     dataIndex: 'categoryNameSecond'
   },{
      key: '7',
      title: '更新时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'materialId',
      render(id, row){
        return <span>
          <Popconfirm title="删除后不可恢复，确认该材料么？" onConfirm={context.delMateri.bind(context, id, row)}><a href="javascript:;">删除
                / </a></Popconfirm>
          <Link to={`/brand/materialNew/editMateri/${id}`}>编辑</Link>
        </span>
      }
    }];
    return columns;
  }


  quickButton() {
    return <Row>
      <Col span='2'>
        <Button type="ghost">
          <Link to={`/brand/materialNew/editMateri`}>
            <Icon type="plus"/> 添加材料
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {tableMateriOptions, getFormMateriOptions} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormMateriOptions().handleSubmit} onReset={getFormMateriOptions().handleReset} sign="materi"/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...tableMateriOptions} ref='dt' sign="materi"/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}


Materi.propTypes = {}


export default Materi;
