import React, {Component, PropTypes} from 'react';
import {Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon} from 'antd';
import './LoginNew.less';
import {Link} from 'react-router';
import login from '../assets/login.jpg'
import logo from '../../../layouts/components/logo.png'
const FormItem = Form.Item;
const createForm = Form.create;
function noop() {
  return false;
}
class ForgotPassword extends Component {
  doSubmit(e) {
    const {form, handleSubmit} = this.props;
    handleSubmit(e, form)
  }

  render() {
    const {form, vcodeUrl, vCode, isLoading, isShow, userName} = this.props;
    const {getFieldProps, getFieldError, isFieldValidating} = form;
    let namePropsOptions = {
      rules: [
        {required: true, type: "email", message: '请输入正确的邮箱地址'}
      ]
    }
    let vCodeOptions = {
      rules: [
        {required: true, min: 6, whitespace: true, message: '请填写验证码'}
      ]
    };
    const nameProps = getFieldProps('email', namePropsOptions);

    const vCodeProps = getFieldProps('securityCode', vCodeOptions);

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
          <div className="p-other">帮助中心 | 服务协议</div>
        </header>

      </div>
      <div className="g-content">
        <img src={login} width='100%' height='100%'/>
        <div className="content-form">
          <Form horizontal ref='login'>
            <h3>忘记密码</h3>
            <div style={{display: isShow ? 'none' : 'block'}}>
              <FormItem
                {...formItemLayout}
                label="E-mial："
                hasFeedback>
                <Input {...nameProps} />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="验证码："
                hasFeedback style={{marginBottom: '8px'}}>
                <Input {...vCodeProps} style={{width: '100px'}}/>
                <a href="javascript:void(0)" onClick={vCode}> <img src={vcodeUrl} height="30"/></a>
              </FormItem>
              <FormItem wrapperCol={{span: 23, offset: 1}}>
                <div className="form-group clearfix">
                  <Button type="primary" loading={isLoading} style={{width: '150px',float:'left'}}
                          onClick={this.doSubmit.bind(this) }>下一步</Button>
                  <Link to={`/login`} style={{float:'right'}}>取消</Link>
                </div>
              </FormItem>
            </div>

            <p className='sentEmail' style={{display: isShow ? 'block' : 'none'}}>
              系统已向{userName}邮箱发送邮件，请在24小时内点击邮件内的链接重设密码。
              <br/>
              <Link to={`/login`}>没有收到邮件？重新发送</Link>
            </p>
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

ForgotPassword.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default createForm()(ForgotPassword);
