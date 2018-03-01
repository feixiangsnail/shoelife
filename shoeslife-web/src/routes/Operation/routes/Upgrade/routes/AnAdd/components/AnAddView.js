import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Form from 'components/Form';
import {Button, Icon, message} from 'antd';
import {UploadImage} from 'components/FileLoader'
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
class AnAdd extends Component {

  _getFormItems() {
    const context = this;
    const {item, logImg, logList, params} = context.props;
    let upConfig = {
      listType: 'picture',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/app'
      }, beforeUpload(file) {
        const isFile = /\.(apk)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 apk 后缀文件！', 2);
          return isFile;
        }
      }
    };
    let config = {
      formItems: [{
        label: "平台：",
        name: "appType",
        required: true,
        custom(getCustomFieldProps) {
          return <label className="ant-checkbox-inline">
            <span name="appType">{getCustomFieldProps('appType').value}</span>
          </label>
        }
      }, {
        label: "工程文件包：",
        name: "fileId",
        required: true,
        custom(getCustomFieldProps) {
          upConfig.fileList = logList || [];
          return <div>
            <UploadImage className='upload-list-inline upload-fixed'
                         upConfig={{...upConfig, onChangeFileList: logImg,title:"工程文件包"}}
              {...getCustomFieldProps('fileId')} />
          </div>
        }
      }, {
        label: "版本号：",
        name: "versionNumber",
        rules: [
          {required: true, message: '请输入正确的版本号，输入 . 、0~9均可'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[0-9|\.]{1,20}$/.test(value))) {
                    callback([new Error('请输入正确的版本号，输入 . 、0~9均可')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '可输入 . 、0~9'
        }
      }, {
        label: "版本说明：",
        name: "remark",
        rules: [
          {required: true, max: "100", message: '请输入版本说明'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 100) {
                    callback([new Error('版本说明，100字以内')])
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          type: "textarea",
          rows: 5,
          placeholder: "100字以内"
        }
      }],
      initValue: {
        appType: "android",
        fileId: null,
        versionNumber: null,
        remark: null,
      }
    }
    if (item) {
      config.initValue = item
    }
    return config;
  }


  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
      </div>
    )
  }
}

AnAdd.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default AnAdd;
