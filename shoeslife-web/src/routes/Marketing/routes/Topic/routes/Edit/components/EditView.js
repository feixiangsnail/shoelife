import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
class Edit extends Component {

  _getFormItems() {
    const context = this;
    const {item} = context.props;
    let config = {
      formItems: [{
        label: "页面名称：",
        name: "name",
        rules: [
          {required: true, message: '请输入正确的页面名称，30个字以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(value))) {
                    callback([new Error('请输入正确的页面名称，30个字以内，可输入字母、数字、汉字')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '可输入字母、数字、汉字'
        }
      }, {
        label: "URL：",
        name: "url",
        rules: [
          {required: true, message: '请输入正确的URL地址'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(value))) {
                    callback([new Error('请输入正确的URL地址')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: ''
        }
      }],
      initValue: {
        name: null,
        url: null
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
