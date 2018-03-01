import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Upload, Icon, message} from 'antd';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader';
import {FILE_UPLOAD} from '../../../../../../../../../static/apiAlias'
class EditVamp extends Component {

  _getFormItems() {
    const context = this;
    const {item, rendImg, rendList, params} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'product/style'
      },
      beforeUpload(file) {
        const isFile = /\.(png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 150*1024){
          message.error('只能上传 150KB 以内的图片！', 2);
          return false
        }
      }
    };
    let config = {
      formItems: [{
        label: "款式名称：",
        name: "styleName",
        rules: [
          {required: true, message: '必填'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[A-Za-z0-9\u4e00-\u9fa5]{1,5}$/.test(value))) {
                    callback([new Error('请输入正确的部位名称，5个字符以内数字、字母、汉字均可')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {}
      }, {
        label: "款式编号：",
        name: "styleCode",
        rules: [
          {required: true, message: '必填'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(() => {
                  if (!(/^[a-zA-Z0-9\-]{1,20}$/.test(value))) {
                    callback([new Error('请输入款式编号，20个字符以内，字母、数字或-')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {}
      }, {
        label: "款式效果图：",
        name: "rendering",
        required: true,
        wrapperCol: {span: 13},
        infoLabel: <div style={{color: '#f96868'}}>可上传1张，150KB以内，.png格式，透明背景，306*306px</div>,
        custom(getCustomFieldProps) {
          upConfig.fileList = rendList || [];
          return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                              upConfig={{...upConfig, onChangeFileList: rendImg}}
                              {...getCustomFieldProps('rendering')} />
        }
      }],
      initValue: {
        styleName: null,
        styleCode: null,
        rendering: null
      }
    }
    if (item) {
      config.initValue = item;
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


EditVamp.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default EditVamp;
