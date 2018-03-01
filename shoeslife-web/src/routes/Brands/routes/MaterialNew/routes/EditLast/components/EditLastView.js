import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';

class EditLastView extends Component {
  _getFormItems() {
    let config = {};
    const context = this;
    const {item, params} = context.props;
    config.panels = [
      {
        title: '',
        formItems: [{
          label: "名称：",
          name: "materialName",
          rules: [
            {required: true, message: '名称必填'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[A-Za-z0-9\u4e00-\u9fa5_\-]{2,15}$/.test(value))) {
                      callback([new Error('请输入正确格式的名称，2-15个字符以内，中文、字母或数字均可')]);
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
          label: "编号：",
          name: "materialIdentifier",
          rules: [
            {required: true, message: '编号必填'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9_\-]{2,15}$/.test(value))) {
                      callback([new Error('请输入正确的编号，输入a-z 、A~Z、_、- 、0~9均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            disabled: params.id ? true : false
          }
        },{
          label: "跟高(cm)：",
          name: "lastHeight",
          rules: [{required: true, message: '必填'}],
          inputNumber: {
            step: 0.1,
            min: 0.1,
            max: 99.9,
            style: {width: '90px'},
          }
        }]
      }
    ]

    config.initValue = {
      materialName: null,
      materialIdentifier: null,
      lastHeight:null,
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


EditLastView.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default EditLastView;
