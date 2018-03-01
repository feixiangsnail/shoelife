import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Icon, message, Radio, inputNumber} from 'antd';
import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';
import {toNumber} from 'common/utils';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
import {strlen} from 'common/utils';
class EditCategoryView extends Component {
  changeType(value) {
    const {toChange} = this.props;
    toChange(value)
  }

  _getFormItems() {
    let config = {}, list = [];
    const context = this;
    const {item, iconImg, iconList, bannerList, bannerImg, cateList, topList, params} = context.props;

    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/category/icon'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|jpeg|gif|png|bmp)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传图片！', 2);
          return isFile;
        }
      }
    };
    let upConfigBanner = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/category/banner'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|jpeg|gif|png|bmp)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传图片！', 2);
          return isFile;
        }
      }
    };
    config.panels = [
      {
        title: '',
        formItems: [{
          label: "分类名称：",
          name: "categoryName",
          rules: [{required: true, message: '分类名称唯一且不可重复，由汉字或字母组成，2~10个字符长度，不可为空。'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if ((strlen(value) < 2) || (strlen(value) > 10)) {
                      callback([new Error('分类名称唯一且不可重复，由汉字或字母组成，2~10个字符长度，不可为空。')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '请输入分类名称'
          }
        }, {
          label: "所属模块：",
          name: "categoryType",
          rules(fieldForm){
            return [
              {required: true, message: '必须选择分类所属模块。'},
              {
                validator(rule, value, callback){
                  context.changeType(value);
                  callback();
                }
              }
            ]
          },
          disabled: params.id ? true : false,
          radio: {
            radioValue: [
              {value: "1", title: '商品'},
              {value: "2", title: '材料'},
              {value: "3", title: '内容'},
              {value: "4", title: '设计'}
            ],
          },
        }, {
          label: "上级分类：",
          required: true,
          name: 'parentId',
          rules: [{required: true, type: 'array', message: '请选择分类'}],
          defaultValue: '0',
          disabled: params.id ? true : false,
          cascader: {
            options: topList,
            placeholder: "请选择分类",
            changeOnSelect: false
          }
        }, {
          label: "图标：",
          name: "icon",
          custom(getCustomFieldProps) {
            upConfig.fileList = iconList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList: iconImg}} />
          }
        }, {
          label: "Banner图：",
          name: "bannerIcon",
          custom(getCustomFieldProps) {
            upConfigBanner.fileList = bannerList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigBanner, onChangeFileList: bannerImg}} />
          }
        }, {
          label: "是否在前端显示：",
          name: "display",
          rules(fieldForm){
            return [
              {required: true, message: '选择是否在前端显示。'},
              {
                validator(rule, value, callback){
                  callback();
                }
              }
            ]
          },
          radio: {
            radioValue: [
              {value: "0", title: '是'},
              {value: "1", title: '否'}
            ],
          }
        }, {
          label: "手动排序：",
          name: "sort",
          rules: [
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[0-9]{1,5}$/.test(value))) {
                      callback([new Error('请输入5位以内的数字')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '请输入数字',
            style: {width: 100}
          }
        }]
      }
    ]
    config.initValue = {
      categoryName: null,
      categoryType: '1',
      parentId: null,
      display: "0",
      sort: '100',
      icon: null,
      bannerIcon: null,
    };
    if (item) {
      let arr = [];
      arr.push(item.parentId.toString())
      config.initValue = item;
      config.initValue.display = '' + item.display;
      config.initValue.parentId = arr;
      config.initValue.sort = item.sort;
    }
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
    return (
      <div>

        <Form horizontal buttonOption={buttonOptionNone} items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>

      </div>
    )
  }
}

EditCategoryView.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default EditCategoryView;
