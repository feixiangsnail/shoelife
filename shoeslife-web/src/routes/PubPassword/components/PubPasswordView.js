import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import logo from '../../../layouts/components/logo.png'
import Form from 'components/Form';
import classes from '../assets/pubPassword.less';
class PubPassword extends Component {

  _getFormItems() {
    const config = {}, context = this;
    config.panels = [
      {
        className: 'noborder',
        formItems: [{
          label: "旧密码：",
          name: "ordPass",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          hasFeedback: true,
          rules: [
            {required: true, message: '请输入正确格式密码，6-12个字符以内，字母数字均可'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9]{6,12}$/.test(value))) {
                      callback([new Error('请输入正确格式密码，6-12个字符以内，字母数字均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: "password",
            placeholder: "请输入旧密码",
          }
        }, {
          label: "新密码：",
          name: "pass",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          hasFeedback: true,
          rules: [
            {required: true, message: '请输入正确格式密码，6-12个字符以内，字母数字均可'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9]{6,12}$/.test(value))) {
                      callback([new Error('请输入正确格式密码，6-12个字符以内，字母数字均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: "password",
            placeholder: "请输入新密码",
          }
        }, {
          label: "确认密码：",
          name: "rePass",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          hasFeedback: true,
          required: true,
          rules(fieldForm){
            return [
              {required: true, message: '请输入正确格式密码，6-12个字符以内，字母数字均可'},
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback();
                  } else {
                    if (value !== fieldForm.getFieldValue('pass')) {
                      callback(new Error('两次输入密码不一致！'));
                    } else {
                      callback();
                    }
                  }
                }
              }
            ]
          },
          input: {
            type: "password",
            placeholder: "请再次确认密码",
          }
        }]
      }];
    config.initValue = {
      ordPass: null,
      pass: null,
      rePass: null
    };
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} height="46"/>
          </Link>
        </div>
        <div className={classes.contentForm}>
          <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                onReset={formOptions.handleReset}/>
        </div>
      </div>
    )
  }
}

PubPassword.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default PubPassword;
