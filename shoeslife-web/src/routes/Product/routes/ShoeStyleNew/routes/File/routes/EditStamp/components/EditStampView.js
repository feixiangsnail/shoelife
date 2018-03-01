import React, {Component, PropTypes} from 'react';
import {Icon, message} from 'antd';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader';
import {FILE_UPLOAD} from '../../../../../../../../../static/apiAlias';
//印记位置
const POSITION = {
  'VAMP': "鞋面",
  'INSIDE': "内里",
  'INSOLE': "脚垫",
  'HEEL': "鞋跟",
  'SOLE': "鞋底",
};
class EditDecor extends Component {

  _getFormItems() {
    const context = this;
    const {xList, item, rendImg, rendList} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'product/mark'
      },
      beforeUpload(file) {
        const isFile = /\.(png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 png 后缀图片！', 2);
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
        label: "印记工艺：",
        name: "materialId",
        rules: [
          {required: true, message: '请选择所用印记工艺'},
        ],
        select: {
          style: {width: '260px'},
          optionValue: xList,
          showSearch: true,
          notFoundContent: "无法找到",
          optionFilterProp: "children",
          searchPlaceholder: "请输入印记工艺编号",
        }
      },
        {
          label: "印记位置：",
          name: "part",
          rules: [{required: true, type: 'string', message: '请选择印记位置'}],
          select: {
            tipValue: "请选择",
            optionValue: Object.keys(POSITION).map((key) => {
              return {'value': key, 'title': POSITION[key]}
            })
          }
        },
        {
          label: "效果图：",
          name: "rendering",
          required: true,
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传1张，150KB以内，.png格式，306*306px</div>,
          custom(getCustomFieldProps) {
            upConfig.fileList = rendList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList: rendImg}}
              {...getCustomFieldProps('rendering')} />
          },
        }
      ],
      initValue: {
        materialId: null,
        part: null,
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

EditDecor.propTypes = {}

export default EditDecor;
