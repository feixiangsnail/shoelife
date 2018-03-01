import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {message, DatePicker} from 'antd';
import {UploadImage} from 'components/FileLoader';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
import Form from 'components/Form';
import {formatDate, getTimeStamp} from 'common/utils';

class Edit extends Component {

  _getFormItems() {
    const context = this;
    const {item, iconImg, iconList, pList, sList} = context.props;
    const disabledDate = (current) => {
      return current && getTimeStamp(formatDate(current.getTime(), false)) < getTimeStamp(formatDate(Date.now(), false))
    };
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/ad'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg或png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500*1024) {
          message.error('广告图片不能超过 500KB！', 2);
          return false;
        }
      }
    };
    let config = {
      formItems: [{
        label: "广告位：",
        name: "spaceId",
        rules: [{required: true, message: '请选择广告位'}],
        select: {
          defaultValue: "全部",
          optionValue: sList
        }
      }, {
        label: "广告图片：",
        name: "icon",
        required: true,
        infoLabel: <div style={{color: '#f96868'}}>图片格式.jpg或.png格式，500k以内</div>,
        custom(getCustomFieldProps) {
          upConfig.fileList = iconList || [];
          return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                              upConfig={{...upConfig, onChangeFileList: iconImg}}
                              {...getCustomFieldProps('icon')} />
        }
      }, {
        label: "手动排序：",
        name: "sortWeight",
        rules: [{required: true, message: '请输入3位数字'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[0-9]{3}$/.test(value))) {
                    callback([new Error('请输入3位数字')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          style: {width: '100px'}
        }
      }, {
        label: "发布周期：",
        required: true,
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('playStartTime')} showTime={false} format="yyyy-MM-dd" disabledDate={disabledDate}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('playEndTime')} showTime={false} format="yyyy-MM-dd" disabledDate={disabledDate}/>
          </div>
        }
      }, {
        label: "关联H5页：",
        name: "h5Id",
        select: {
          style: {width: '200px'},
          optionValue: pList,
          showSearch: true,
          notFoundContent: "无法找到",
          optionFilterProp: "children",
          searchPlaceholder: "请输入页面名称查找"
        }
      }],
      initValue: {
        spaceId: null,
        icon: null,
        sortWeight: 100,
        playEndTime: null,
        playStartTime: null,
        h5Id: null,
      }
    }
    if (item) {
      config.initValue = item
      if (item.playStartTime) {
        config.initValue.playStartTime = formatDate(item.playStartTime, 'yyyy-MM-dd HH:mm:ss')
      }
      if (item.playEndTime) {
        config.initValue.playEndTime = formatDate(item.playEndTime, 'yyyy-MM-dd HH:mm:ss')
      }
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
