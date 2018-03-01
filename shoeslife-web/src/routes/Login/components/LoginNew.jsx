import React, {Component, PropTypes} from 'react';
import {Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon} from 'antd';
import './LoginNew.less';
const FormItem = Form.Item;
const createForm = Form.create
import {Link} from 'react-router';
import login from '../assets/login.jpg'
import logo from '../../../layouts/components/logo.png'
function noop() {
  return false;
}

class Login extends Component {

  doReset(e) {
    const {form, handleReset} = this.props;
    handleReset(e, form);
  }

  doSubmit(e) {
    const {form, handleSubmit} = this.props;
    handleSubmit(e, form)
  }

  render() {
    const {form, vcodeUrl, vCode, isLoading} = this.props;
    const {getFieldProps, getFieldError, isFieldValidating} = form;
    let namePropsOptions = {
      rules: [
        {required: true, type: "email", message: '请输入正确的邮箱地址'}
      ]
    }
    let passwdPropsOptions = {
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
      ]
    };
    let vCodeOptions = {
      rules: [
        {required: true, min: 6, whitespace: true, message: '请填写验证码'}
      ]
    };
    // 正式的时候此代码会被干掉
    if (__DEV__) {
      //商家超级管理员
      namePropsOptions.initialValue = 'wxw@qq.com'
      //平台超级管理员
      //namePropsOptions.initialValue = 'jamie@qq.com'
      passwdPropsOptions.initialValue = '123456'
    }

    //用户是否记住密码
    let userInfo = localStorage.getItem('USER_LOGIN_INFO');
    let timestamp = 0;

    if (userInfo) {
      let oUserInfo = JSON.parse(userInfo),
        {email, password, timestamp} = oUserInfo;
      if (+new Date() - timestamp >= 7 * 24 * 60 * 60 * 1000) {//检查记住的密码是否过期（7天）
        email = '';
        password = '';
        userInfo = '';
      }

      namePropsOptions.initialValue = email;
      passwdPropsOptions.initialValue = password;
    }

    const nameProps = getFieldProps('email', namePropsOptions);

    const passwdProps = getFieldProps('password', passwdPropsOptions);

    const vCodeProps = getFieldProps('securityCode', vCodeOptions);

    const checkboxProps = getFieldProps('rememberUser', {
      valuePropName: 'checked',
      initialValue: userInfo ? true : false
    });

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
    const context = this;

    document.onkeydown = function (e) {
      let eventCode = e.which || e.keyCode;
      switch (eventCode) {
        case 13:
          context.doSubmit(e)
          break;
      }
    }

    return <div className="page-login-v2">
      <div className="g-hd">
        <header>
          <img src={logo}/>
          <div className="p-title">&nbsp;&nbsp;·&nbsp;&nbsp;运营管理平台</div>
          <div className="p-other">帮助中心  |  服务协议</div>
        </header>

      </div>
      <div className="g-content">
        <img src={login} width='100%' height='100%'/>
        <div className="content-form">
          <Form horizontal  ref='login'>
            <h3>账号登录</h3>
            <FormItem
              {...formItemLayout}
              label="账&nbsp;&nbsp;&nbsp;&nbsp;号："
              hasFeedback>
              <Input {...nameProps} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="密&nbsp;&nbsp;&nbsp;&nbsp;码："
              hasFeedback>
              <Input {...passwdProps} type="password" autoComplete="off"
                                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="验证码："
              hasFeedback style={{marginBottom: '8px'}}>
              <Input {...vCodeProps} style={{width: '100px'}}/>
              <a href="javascript:void(0)" onClick={vCode}> <img src={vcodeUrl} height="30"/></a>
            </FormItem>
            <FormItem wrapperCol={{ span: 24}} style={{ marginBottom: '20px' }}>
              <label className="checkbox-inline" style={{marginBottom: '-4px',marginRight:'120px'}}>
                <Checkbox {...checkboxProps} type="checkbox" name="checkbox"/>&nbsp; &nbsp; 记住账号
              </label>
              <Link to={`/forgpas`}>忘记密码？</Link>
            </FormItem>
            <FormItem wrapperCol={{span: 23, offset: 1}}>
              <div className="form-group">
                <Button type="primary" className="btn btn-primary" loading={isLoading}
                        onClick={this.doSubmit.bind(this)}>确定</Button>
              </div>
            </FormItem>
          </Form>
        </div>

      </div>
      <div className="g-ft">
        <footer>
          深圳市鞋生活科技有限公司&nbsp;&nbsp;|&nbsp;&nbsp;Copyright © 2016~2017 Shoelives. All Rights Reserved&nbsp;&nbsp;|&nbsp;&nbsp;粤ICP备16124523号
        </footer>

      </div>
    </div>
  }
}
Login.propsTypes = {
  form: React.PropTypes.object.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleReset: React.PropTypes.func.isRequired
}

export default createForm()(Login);
