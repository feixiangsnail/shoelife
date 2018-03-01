import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import classes from '../assets/pubPassword.less';
import {Link} from 'react-router'
import logo from '../../../layouts/components/logo.png'
class ResetPassword extends Component {

  _getFormItems() {
    const config = {}, context = this;
    const {params} = context.props;
    config.panels = [
      {
        className: 'noborder',
        formItems: [{
          label: "账号：",
          name: "email",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          custom(getCustomFieldProps) {
            return <label className="ant-checkbox-inline">
              <span name="userName">{getCustomFieldProps('email').value}</span>
            </label>
          }
        }, {
          label: "新密码：",
          name: "password",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
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
          name: "repassword",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          rules(fieldForm){
            return [
              {required: true,message: '请输入正确格式密码，6-12个字符以内，字母数字均可'},
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback();
                  } else {
                    if (value !== fieldForm.getFieldValue('password')) {
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
            placeholder: "请再次输入密码",
          }
        }]
      }];
    config.initValue = {
      email: null,
      password: null,
      repassword: null
    };
    if (params) {
      config.initValue.email = params.email
    }
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

ResetPassword.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default ResetPassword;
