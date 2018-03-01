import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TinyMce from 'components/TinyMce'
import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';
import {message} from 'antd';
import {strlen} from 'common/utils';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'

class Edit extends Component {

  _getFormItems() {
    const context = this;
    const {item, photoImg, photoList, params, toItem} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'users/record'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 png、jpg 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 300 * 1024) {
          message.error('只能上传 300KB 以内的图片！', 2);
          return false
        }
      }
    };
    let config = {
      formItems: [{
        label: "昵称：",
        name: "userName",
        rules: [
          {required: true, message: '请输入昵称，5-30个字以内，中文、字母或数字'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(() => {
                  if (!(/^[\u4e00-\u9fa5]|[a-zA-Z]|[0-9]$/.test(value)) || (strlen(value) < 5) || (strlen(value) > 30)) {
                    callback([new Error('请输入昵称，5-30个字以内，中文、字母或数字')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: "请输入昵称，5~30个字以内，汉字、英文或数字"
        }
      }, {
        label: "头像：",
        name: "photo",
        required: true,
        wrapperCol: {span: 20},
        infoLabel: <div style={{color: '#f96868'}}>图片要求：.png、.jpg格式，300KB以内，225*225px，可上传一张</div>,
        custom(getCustomFieldProps) {
          upConfig.fileList = photoList || [];
          return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                              upConfig={{...upConfig, onChangeFileList: photoImg}}
                              {...getCustomFieldProps('photo')} />
        }
      }, {
        label: "一句话介绍",
        name: "introduction",
        labelCol: {span: 2},
        wrapperCol: {span: 13},
        rules: [
          {required: true, message: '请输入自我介绍，30个字以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 30 || value.length < 1) {
                    callback([new Error('请输入自我介绍，30个字以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '请输入自我介绍，30个字以内'
        }
      }, {
        label: "个人简介：",
        name: "profils",
        required: true,
        custom(getCustomFieldProps) {
          return <TinyMce id='tinymce-desc' value={getCustomFieldProps('profils').value} onKeyup={toItem} onChange={toItem}/>
        }
      }],
      initValue: {
        userName: null,
        photo: null,
        introduction: null,
        profils: null
      }
    }
    if(item){
      config.initValue = item
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
          name: '提交修改'
        }
      ]
    }
    return (
      <div>
        <Form horizontal buttonOption={buttonOptionNone} items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
      </div>
    )
  }
}

Edit.propTypes = {}

export default Edit;
