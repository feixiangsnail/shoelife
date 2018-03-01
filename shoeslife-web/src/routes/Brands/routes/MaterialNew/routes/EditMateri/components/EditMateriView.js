import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';
import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';
import {message,Checkbox,Row,Col,InputNumber,Switch} from 'antd';
import {FILE_UPLOAD} from 'static/apiAlias';
import {getImgName} from 'common/utils';
import './style.less';

const TYPE = {
  '0': "通用贴图",
  '1': "纯色",
  '2': "个性用料",
};
class EditMateriView extends Component {
  constructor(props) {
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    super(props);
    this.state = {
      partChecked: [],
      useType: 0,
      type:null,
      item:{},
      cursor:'default',
      opacity:null,
      isTyle:null
    }

    props.params.renderType = 0;
  }
  delDarameter(name){
    if(typeof name == 'string')
        return name = name.split('?')[0];
    return name;
  }
  _getFormItems() {
    let config = {};
    const context = this;
    let {cursor,useType,type,isTyle,uuid} = context.state;
    const {
      item, cateList, iconImg, iconList, params,
      normalMap, alphaMap, bumpMap, map
    } = context.props;

    config.initValue = {
      category: null,
      materialColor: null,
      materialName: null,
      materialIdentifier: null,
      icon: null,
      renderType:null,
      materialDesc: null,
      normalMap: null,
      alphaMap: null,
      bumpMap: null,
      map: null
    };

    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/material/thumbnail'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        const isName =  /^[0-9a-zA-Z]*$/g.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 150*1024){
          message.error('只能上传 150KB 以内的图片！', 2);
          return false
        }
        console.log(isName);
        if(isName){
          message.error('图片名称只能是英文或数字！', 2);
          return false;
        }
      }
    };
    let upConfigMap = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        const isName =  /^[0-9a-zA-Z.]*$/g.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500*1024){
          message.error('只能上传 500KB 以内的图片！', 2);
          return false
        }
        console.log(isName);
        if(!isName){
          message.error('图片名称只能是英文或数字！', 2);
          return false;
        }
      }
    };
    let mapFile = {model: 'operations/material/map'};
    let bumpFile = {model: 'operations/material/map'};
    let alphaFile ={model: 'operations/material/map'};
    let normalFile = {model: 'operations/material/map'};
    const pList = []
    if (item&&params.id) {
      let c = [], u = [];
      c.push(item.firstCategoryId.toString(), item.secondCategoryId.toString());
      config.initValue = item;
      for(var i in item){
        this.state.item[i] = item[i];
      }
      config.initValue.category = c;
      if(isTyle != config.initValue.type){
        context.state.type = config.initValue.type;
        this.state.isTyle = config.initValue.type;
        useType = config.initValue.renderType;
        context.state.useType = useType;
        params.renderType = useType;
      }

      upConfig.oldName = this.delDarameter(iconList);
      mapFile.oldName = this.delDarameter(map);
      bumpFile.oldName = this.delDarameter(bumpMap);
      alphaFile.oldName = this.delDarameter(alphaMap);
      normalFile.oldName = this.delDarameter(normalMap);
    }
    config.panels = [
      {
        title: '',
        formItems: [{
          label: "所属分类：",
          name: "category",
          rules: [{required: true, type: 'array', message: '此处必填'}],
          cascader: {
            options: cateList,
            placeholder: "请选择分类",
            changeOnSelect: false
          }
        }, {
          label: "颜色：",
          name: "materialColor",
          rules: [{required: true, min: 1, max: 3, message: '请输入颜色名称，3个字符以内'}],
          input: {
            placeholder: '请输入颜色名称，3个字符以内'
          }
        }, {
          label: "名称：",
          name: "materialName",
          wrapperCol: {span: 8},
          rules: [
            {required: true, message: '名称必填，名称需包含装饰品位置及款式，如鞋头小蝴蝶结'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[A-Za-z\u4e00-\u9fa5]{1,15}$/.test(value))) {
                      callback([new Error('请输入正确格式的名称，15个字符以内，中文、字母均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '请输入名称'
          }
        }, {
          label: "编号：",
          name: "materialIdentifier",
          rules: [
            {required: true, message: '请输入正确的编号，输入a-z 、A~Z、 - 、0~9均可'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9|\-]{1,20}$/.test(value))) {
                      callback([new Error('请输入正确的编号，输入a-z 、A~Z、 - 、0~9均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            disabled: params.id ? true : false,
            placeholder: '可输入a-z 、A~Z、- 、0~9'
          }
        }, {
          label: "渲染类型",
          required: true,
          name:'renderType',
          radio: {
            radioValue: [
              {value: 0, title: '通用贴图'},
              {value: 1, title: '纯色'},
              {value: 2, title: '定向贴图'},
            ],
            value: useType,
            onChange: (e) => {
              this.setState({
                useType: e.target.value
              })
              params.renderType = e.target.value;
            }
          }
        },
        {
          label: "是否为金属材质",
          cName: useType == '1' ? 'show' : 'hide',
          wrapperCol: {span: 12},
          custom(getCustomFieldProps, FormContext){
            return(
                <Row>
                  <Col span="24">
                    <Checkbox checked={context.state.type?true:false} onChange={(e)=>{
                      context.setState({
                        type: e.target.checked
                      });
                      params.type = e.target.checked?1:0;
                    }} ></Checkbox>
                    <span  style={{color: '#f96868'}}>金属和钻石等材料使用</span>
                  </Col>
                </Row>
              )
          }
        }, {
          label: "缩略图",
          name: "icon",
          required: true,
          wrapperCol: {span: 12},
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png、.jpg格式，150K以内，306*306px</div>,
          custom(getCustomFieldProps) {
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, fileList:iconList , onChangeFileList: iconImg('iconList')}}
              {...getCustomFieldProps('icon')} />
          }
        },
        {
          label: "漫反射贴图",
          name: "map",
          wrapperCol: {span: 12},
          cName: useType == '0' ? 'show' : 'hide',
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png、.jpg格式，500K以内</div>,
          custom(getCustomFieldProps) {
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigMap, data:mapFile, fileList:map, onChangeFileList: iconImg('map')}}
              {...getCustomFieldProps('map')} />
          }
        },
        {
          label: "凹凸贴图",
          name: "bumpMap",
          wrapperCol: {span: 12},
          cName: useType == '0' ? 'show' : 'hide',
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png、.jpg格式，500K以内</div>,
          custom(getCustomFieldProps) {
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigMap, fileList:bumpMap,  data:bumpFile ,onChangeFileList: iconImg('bumpMap')}}
              {...getCustomFieldProps('bumpMap')} />
          }
        },
        {
          label: "alpha贴图",
          name: "alphaMap",
          wrapperCol: {span: 12},
          cName: useType == '0' ? 'show' : 'hide',
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png、.jpg格式，500K以内</div>,
          custom(getCustomFieldProps) {
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigMap, fileList:alphaMap, data:alphaFile, onChangeFileList: iconImg('alphaMap')}}
              {...getCustomFieldProps('alphaMap')} />
          }
        },
        {
          label: "法向量贴图",
          name: "normalMap",
          wrapperCol: {span: 12},
          cName: useType == '0' ? 'show' : 'hide',
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png、.jpg格式，500K以内</div>,
          custom(getCustomFieldProps) {
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigMap,fileList:normalMap, data:normalFile , onChangeFileList: iconImg('normalMap')}}
              {...getCustomFieldProps('normalMap')} />
          }
        }, {
          label: "材料介绍：",
          name: "materialDesc",
          rules: [{required: true, min: 1, max: 200, message: '此处必填,200个字符以内'}],
          input: {
            type: "textarea",
            rows: 5,
          }
        }]
      }
    ]
    return config;
  }
  render() {
    const {formOptions, ...other} = this.props;
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: '保存'
        },
        {
          key: 'reset',
          name: '重置'
        }
      ]
    }
    return (<div>
      <Form horizontal buttonOption={buttonOptionNone} items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
            onReset={formOptions.handleReset}/>
    </div>);
  }
}

EditMateriView.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default EditMateriView;
