import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Icon, message, Checkbox} from 'antd';
import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';

class EditView extends Component {
  _getFormItems() {
    let config = {};
    const context = this;
    const {item} = context.props;
    config.panels = [
      {
        title: '',
        formItems: [{
          label: "名称：",
          name: "paramName",
          rules: [{required: true, message: '必填'}],
          input: {
            placeholder: ''
          }
        }, {
          label: "Value：",
          name: "paramValue",
          rules: [{required: true, message: '必填'}],
          input: {
            disabled:false,
            placeholder: ''
          }
        }, {
          label: "Key：",
          name: "paramKey",
          rules: [{required: true, message: '必填'}],
          input: {
            placeholder: ''
          }
        }, {
          label: "说明：",
          name: "remark",
          rules: [{required: true, message: '必填'}],
          input: {
            disabled:false,
            placeholder: ''
          }
        }]
      }
    ]

    config.initValue = {
      paramName: null,
      paramValue: null,
      paramKey: null,
      remark: null,
    };
    if (item) {
      config.initValue = item;
    }
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} allDisabled={true}
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
