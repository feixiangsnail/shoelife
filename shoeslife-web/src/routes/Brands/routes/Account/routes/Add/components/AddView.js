import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button, Icon, Input, message} from 'antd';
import {UploadImage} from 'components/FileLoader';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
import Form from 'components/Form';
import {strlen} from 'common/utils';
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleChecked: null
    }
  }

  _getFormItems() {
    const context = this;
    let config = {};
    let {roleChecked} = context.state;
    const {roleList, upReducerId} = context.props;

    if (roleList.length && roleChecked == null) {
      roleChecked = roleList[0].value;
    }

    config.panels = [
      {
        title: '',
        formItems: [{
          label: "昵称：",
          name: "userName",
          rules: [
            {required: true, message: '请输入昵称，5-30个字以内，中文、字母或数字'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(() => {
                    if ((strlen(value) < 5) || (strlen(value) > 30)) {
                      callback([new Error('请输入昵称，5-30个字以内，中文、字母或数字')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: "请输入昵称，5~30个字以内，汉字、英文或数字"
          }
        }, {
          label: "登录账号：",
          name: "email",
          rules: [{required: true, type: 'email', min: 4, max: 64, message: '请输入正确的邮箱地址'}],
          input: {
            placeholder: "请输入邮箱",
          }
        }, {
          label: "登录密码：",
          name: "password",
          rules: [
            {required: true, message: '请输入密码，6~12位字母、数字'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(() => {
                    if (!(/^[a-zA-Z0-9]{6,12}$/.test(value))) {
                      callback([new Error('请输入密码，6~12位字母、数字')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: "password"
          }
        }, {
          label: "用户角色：",
          name: "roleId",
          wrapperCol: {span: 17},
          rules: [{required: true, message: '请选择一个用户角色'}],
          radio: {
            radioValue: roleList,
            value: roleChecked,
            onChange: (e) => {
              this.setState({
                roleChecked: e.target.value
              })
            }
          }
        }]
      }
    ]
    config.initValue = {
      userName: null,
      email: null,
      password: null,
      roleId: null,
    };
    config.initValue.roleId = roleChecked
    upReducerId(roleChecked);
    return config;
  }

  render() {
    const {formOptions} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
      </div>
    )
  }
}

Add.propTypes = {

}

export default Add;
