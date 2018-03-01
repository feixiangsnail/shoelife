import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Icon, message, Checkbox} from 'antd';
import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';
import {strlen} from 'common/utils';
class EditView extends Component {

  _getFormItems() {
    const context = this;
    let config = {};
    const {roleList, item} = context.props;

    config.panels = [
      {
        title: '',
        formItems: [{
          label: "昵称：",
          name: "userName",
          rules: [
            {required: true, message: '请输入昵称，50个字以内，汉字数字、或英文'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(() => {
                    if (!(/^[\u4e00-\u9fa5]|[a-zA-Z]|[0-9]$/.test(value)) || (strlen(value) < 5) || (strlen(value) > 30)) {
                      callback([new Error('请输入昵称，50个字以内，汉字、数字或英文')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: "请输入昵称，50个字以内，汉字、英文或数字"
          }
        }, {
          label: "登录账号：",
          name: "email",
          rules: [{required: true, type: "email", message: '请输入正确的邮箱地址'}],
          input: {
            placeholder: "请输入邮箱",
            disabled: true,
          }
        }, {
          label: "登录密码：",
          name: "password",
          infoLabel: <div style={{color: '#76838f'}}>注：若需要修改密码，请输入新密码</div>,
          rules: [
            {required: false},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9]{6,12}$/.test(value))) {
                      callback([new Error('请输入正确格式密码，6-12个字符以内，字母、数字均可')]);
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
            placeholder: "请输入密码，6~12位字母+数字"
          }
        }, {
          label: "用户角色：",
          name: "roleName",
          custom(getCustomFieldProps) {
            return <label className="ant-checkbox-inline">
              <span>{getCustomFieldProps('roleName').value}</span>
            </label>
          }
        }]
      }
    ]
    config.initValue = {
      userName: null,
      email: null,
      password: null,
      roleName: null,
    };
    if (item) {
      config.initValue = item
    }
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
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














