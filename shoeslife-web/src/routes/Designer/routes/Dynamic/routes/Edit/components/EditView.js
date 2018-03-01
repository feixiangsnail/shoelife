import React, {Component, PropTypes} from 'react';
import TinyMce from 'components/TinyMce'
import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';
import {message} from 'antd';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
class Edit extends Component {

  _getFormItems() {
    const context = this;
    const {item, iconImg, iconList, dList, params, toItem, dId} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'users/dynamic'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 150 * 1024) {
          message.error('只能上传 150KB 以内的图片！', 2);
          return false
        }
      }
    };
    let config = {
      formItems: [{
        label: "设计师：",
        name: "designerId",
        disabled: dId || params.id ? true : false,
        rules: [{required: true, type: 'number', message: '请选择设计师'}],
        select: {
          tipValue: "全部",
          optionValue: dList,
          style: {width: '300px'}
        }
      }, {
        label: "标题",
        name: "title",
        labelCol: {span: 2},
        wrapperCol: {span: 13},
        rules: [
          {required: true, message: '请输入标题名称，50个字以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 50 || value.length < 1) {
                    callback([new Error('请输入标题名称，50个字以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '请输入标题名称，50个字以内'
        }
      }, {
        label: "内容：",
        name: "content",
        required: true,
        custom(getCustomFieldProps) {
          return <TinyMce id='tinymce-desc' value={getCustomFieldProps('content').value} onKeyup={toItem} onChange={toItem}/>
        }
      }, {
        label: "动态配图：",
        name: "icon",
        required: true,
        wrapperCol: {span: 20},
        infoLabel: <div style={{color: '#f96868'}}>可上传1张图片，jpg、png格式，图片大小150KB</div>,
        custom(getCustomFieldProps) {
          upConfig.fileList = iconList || [];
          return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                              upConfig={{...upConfig, onChangeFileList: iconImg}} />
        }
      }],
      initValue: {
        designerId: dId ? dId : null,
        title: null,
        content: null,
        icon: null
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

Edit.propTypes = {}

export default Edit;
