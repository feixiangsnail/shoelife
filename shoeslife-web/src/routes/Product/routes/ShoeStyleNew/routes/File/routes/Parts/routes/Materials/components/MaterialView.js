import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Modal,Button} from 'antd'
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import Search from 'components/Search';
import ImageSlider from 'components/ImageSlider';
const TYPE = {
  '0': "通用贴图",
  '1': "纯色",
  '2': "个性用料",
};
class MaterialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
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
      }, {
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
  _getColumns() {
    const context = this;
    let columns = [{
      key: '1',
      title: '缩略图',
      dataIndex: 'icon',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    },{
      key: '2',
      title: '名称',
      dataIndex: 'materialName'
    },
    {
      key: '3',
      title: '渲染类型',
      dataIndex: 'renderType',
      render(key){
        return TYPE[key];
      }
    } , {
      key: '4',
      title: '分类',
      dataIndex: 'categoryNameSecond'
    }, {
      key: '5',
      title: '颜色',
      dataIndex: 'materialColor'
    }, {
      key: '6',
      title: '材料编号',
      dataIndex: 'materialIdentifier'
    }];
    return columns;
  }

  render() {
    const {tableMateriOptions, getFormMateriOptions,addMaterials} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormMateriOptions().handleSubmit} onReset={getFormMateriOptions().handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} {...tableMateriOptions}  ref='dt'/>
        <Button className={tableMateriOptions.dataSource.length?'':'hide'} type="primary" onClick={addMaterials}>提交</Button>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

MaterialView.propTypes = {}

export default MaterialView;
