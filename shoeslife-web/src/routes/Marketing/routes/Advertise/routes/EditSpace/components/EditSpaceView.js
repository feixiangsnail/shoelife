import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


import Form from 'components/Form';


class EditSpace extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "广告位名称：",
        name: "name",
        rules: [
          {required: true, message: '请输入广告位名称,20个字符以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 20) {
                    callback([new Error('请输入广告位名称,20个字符以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '请输入广告位名称'
        }
      }, {
        label: "广告位类型：",
        name: "type",
        required: true,
        radio: {
          radioValue: [
            {value: "ICON", title: '图片广告'}
          ],
        }
      },{
        label: "轮播广告数：",
        name: "standNumber",
        rules: [{required: true, message: '请输入1位整数'}],
        infoLabel: <div style={{color: '#999'}}>张</div>,
        inputNumber: {
          min: 1,
          max: 9,
          style: {
            width: '100px',
            float: 'left'
          }
        }
      }],
      initValue: {
        name: null,
        type: 'ICON',
        standNumber: '3'
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

EditSpace.propTypes = {}

export default EditSpace;
