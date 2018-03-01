import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button, Icon, Modal, Table, Input, message} from 'antd';
import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'

class EditView extends Component {
  _getFormItems() {
    let config = {};
    const context = this;
    const {item, logImg, logList} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/brand'
      },
      beforeUpload(file) {
        const isFile = /\.(png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 png 后缀图片！', 2);
          return isFile;
        }
      }
    };
    config.panels = [
      {
        title: '',
        formItems: [{
          label: "品牌名称：",
          name: "brandName",
          rules: [
            {required: true, message: '请输入正确的品牌名称，30个字符以内'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[A-Za-z0-9\u4e00-\u9fa5_\-\s&]{1,30}$/.test(value))) {
                      callback([new Error('请输入正确的品牌名称，30个字符以内，可输入字母、数字、汉字、空格、&、-、_')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '可输入字母、数字、汉字、空格、&、-、_'
          }
        }, {
          label: "LOGO：",
          name: "log",
          required: true,
          infoLabel: <div style={{color: '#f96868'}}>图片格式.png格式，80*80px</div>,
          custom(getCustomFieldProps) {
            upConfig.fileList = logList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList: logImg}}
                                {...getCustomFieldProps('log')} />
          }
        }, {
          label: "品牌简介：",
          name: "introduction",
          rules: [
            {required: true, min: 1, max: 300, message: '300个字符以内且不能为空'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (value.length > 300) {
                      callback([new Error('300个字符以内')]);
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
            placeholder: ""
          }
        }]
      }
    ]

    config.initValue = {
      log: null,
      brandName: null,
      introduction: null,
    };
    if (item) {
      config.initValue = item;
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

EditView.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default EditView;
