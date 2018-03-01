import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Form from 'components/Form';

class Refuse extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "拒绝原因：",
        name: "companyDesc",
        rules: [
          {required: true, min: 1, max: 100, message: '100个字符以内且不能为空'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 100) {
                    callback([new Error('100个字符以内')]);
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
          placeholder: "请认真填写拒绝的理由"
        }
      }],
      initValue: {
        companyDesc: null
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

Refuse.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Refuse;
