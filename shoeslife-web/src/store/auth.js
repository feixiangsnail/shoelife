import {
  USERS_LOGIN,
  SECUR_CODE,
  USERS_LOGINOUT,
  USERS_IS_LOGIN
} from '../static/apiAlias';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAILURE = 'auth/LOAD_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

const VCODE = 'auth/VCODE';
const VCODE_SUCCESS = 'auth/VCODE_SUCCESS';
const VCODE_FAILURE = 'auth/VCODE_FAILURE'

const TIMEOUT_SESSION = 'auth/TIMEOUT_SESSION';
//检查登录
export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (client) => client.post(USERS_IS_LOGIN, params, {'hasMsg' : true})
  }
}
//验证码
export function vCode(params) {
  return {
    types: [VCODE, VCODE_SUCCESS, VCODE_FAILURE],
    promise: (client) => client.get(SECUR_CODE, params, {'hasMsg' : true})
  }
}
//登录
export function login(params) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (client) => client.post(USERS_LOGIN, params, {'hasMsg' : true}),
    sKey : 'USER'
  }
}
//登出
export function logout(params) {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (client) => client.post(USERS_LOGINOUT, params, {'hasMsg' : '登出成功'})
  }
}
/**
 * isAuthed
 * @param  {any} globalState
 */
export function isAuthed(globalState) {
  return globalState.auth && globalState.auth.user
}

export default function reducer(state = {}, action = {}) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case LOAD:
    case LOGIN:
    case LOGOUT:
    case VCODE:
      return {
        ...state
      };
    case LOAD_SUCCESS:
      return {
         ...state,
        isUser: action.result
      };
    case LOAD_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
        logoutResult : false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loginError: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        logoutResult: true,
        user : null
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutError: action.error
      };
    case TIMEOUT_SESSION:
      return {
         logoutResult : true
      }
    case VCODE_SUCCESS:
      return {
        vcodeResult: true
      };
    case VCODE_FAILURE:
      return {
        ...state,
        vcodeError: action.error
      };
    default:
      return state;
  }
}
