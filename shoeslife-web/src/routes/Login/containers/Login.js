import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/LoginNew'
import {login, vCode} from 'store/auth'
import {SECUR_CODE} from '../../../static/apiAlias'
import {Link} from 'react-router';
import Cookie from 'js-cookie';
import store from 'store2';
const imgUrl = SECUR_CODE;

export class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.uptVcode = this.uptVcode.bind(this);

    this.state = {
      vcodeUrl: imgUrl
    }
  }

  componentDidMount() {
    this.uptVcode();
    store.remove('USER');
    Cookie.remove('SESSION');
  }
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  handleReset(e, form) {
    e.preventDefault();
    form.resetFields();
  }

  handleSubmit(e, form) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      const {email, password, rememberUser} = values;
      let userInfo = '';

      if (rememberUser) {
        userInfo = {email, password,rememberUser, timestamp: +new Date()};
      }
      localStorage.setItem('USER_LOGIN_INFO', userInfo ? JSON.stringify(userInfo) : userInfo);

      this.submit(values);

    });
  }
  submit(file){
    this.props.login({
      email: file.email,
      password: file.password,
      securityCode: file.securityCode
    }).then((res)=>{
      switch(res.returncode){
        case 0:
          this.context.router.replace('/');
          break;
        case 1:
        case 2:
          this.uptVcode()
          break;
        default:
          break;
      }
    });
  }
  uptVcode() {
      this.setState({
          vcodeUrl : imgUrl+'?t='+new Date().getTime()
      });
  }
  componentWillReceiveProps(nextProps) {
    /*
     * 框架BUG  修改密码登出后  使用老密码可进入
      if (nextProps.user !== null && nextProps.user !== undefined && nextProps.user !== false) {
      let pathname = '/';
      this.context.router.replace(pathname);
    }*/
  }

  componentWillUnmount() {
    document.onkeydown = () => { }
  }

  render() {
    const {loading} = this.props;
    const {vcodeUrl} = this.state;
    return (
      <LoginComponent handleSubmit={this.handleSubmit} handleReset={this.handleReset} vCode={this.uptVcode} vcodeUrl={vcodeUrl} isLoading={loading}/>
    )
  }
}

Login.propsTypes = {
  user: React.PropTypes.object.isRequired,
  vCode: React.PropTypes.object.func,
  loading: React.PropTypes.bool.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {auth} = state;
  const {user, loading} = auth;
  return {
    user,
    loading
  }
}

const mapDispatchToProps = {
  login,
  vCode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
