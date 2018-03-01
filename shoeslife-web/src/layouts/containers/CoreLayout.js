import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CoreLayoutView from '../components/CoreLayout';
import {logout} from '../../store/auth';
import {Modal} from 'antd';
import Cookie from 'js-cookie';
import store from 'store2';

class CoreLayout extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this._handleClick.bind(this);
    this.state = {
      current: '1',
      openKeys: [],
      pic: '',
      userName: ''
    }
  }

  componentDidMount() {
    /**
     * 获取登录帐号头像
     * @params
     */
    const user = store.get('USER') && store.get('USER');
    this.setState({
      pic: user && user.length ? user[0].photo : '',
      userName: user && user.length ? user[0].userName : '',
    });
  }
  _handleClick(e) {
    this.setState({
      current: e.key
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutResult) {
      const _context = this;
      //正常登出
      if (nextProps.logoutResult === true) {
        this.goToLogin();
      }else { //登录超时
        Modal.info({
          title: '警告!!!',
          content: nextProps.logoutResult.message,
          onOk(){
            _context.goToLogin();
          }
        });
      }
    }
  }

  getChildContext() {
    const {location} = this.props;
    return {props: {location, router: this.context.router}};
  }

  goToLogin() {
    Cookie.remove('SESSION');
    store.remove('USER');
    let pathname = '/login';
    this.context.router.replace(pathname);
  }

  toggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
    });
  }

  doLogout(e) {
    this.props.logout();
  }

  render() {
    const {children} = this.props;
    const {current, openKeys, pic, userName} = this.state;
    return <CoreLayoutView current={current} openKeys={openKeys} pic={pic} userName={userName} onToggle={this.toggle.bind(this)} handleClick={this.handleClick}
                           handleLogout={this.doLogout.bind(this)}>{children}</CoreLayoutView>
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.object.isRequired
}

CoreLayout.contextTypes = {
  router: React.PropTypes.object.isRequired
}

CoreLayout.childContextTypes = {
  props: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {logoutResult} = state.auth;
  if (logoutResult && typeof logoutResult === 'object' && logoutResult.data) {
    return {
      logoutResult: logoutResult.data
    }
  }
  return {
    logoutResult
  }
}

const mapDispatchToProps = {
  logout
}


export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
