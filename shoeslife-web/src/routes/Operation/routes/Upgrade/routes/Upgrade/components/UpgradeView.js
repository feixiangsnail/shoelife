import React, {Component, PropTypes} from 'react';
import {Icon, message, Checkbox} from 'antd';
import Form from 'components/Form';

//平台
class UpgradeView extends Component {
  _getFormItems() {
    let config = {};
    const context = this;
    const {params,item} = context.props;

    config.panels = [
      {
        title: '',
        formItems: [
          {
            label: "平台：",
            name: "appType",
            disabled:true,
            input: {
              placeholder: ''
            }
          },{
          label: "版本号：",
          name: "versionNumber",
          disabled:true,
          input: {
            placeholder: ''
          }
        }, {
          label: "升级方式：",
          name: "upgradeMode",
          rules:[
            {required: true, message: '请选择升级方式'},
          ],
          radio: {
            radioValue: [
              {value: "optional", title: '建议升级'},
              {value: "must", title: '强制升级'}
            ],
          },
        }]
      }
    ]
    config.initValue = {
      versionNumber: null,
      upgradeMode: null,
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


UpgradeView.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default UpgradeView;
