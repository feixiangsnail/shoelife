import {
  ADMIN_COMPANY_ROLE_LIST,
  ADMIN_COMPANY_ADD,
} from '../../../../../../../static/apiAlias'

//添加商家用户
const ADD = 'add/ADD';
const ADD_SUCCESS = 'add/ADD_SUCCESS';
const ADD_FAILURE = 'add/ADD_FAILURE';
//获取所有企业角色
const QUERY = 'add/QUERY';
const QUERY_SUCCESS = 'add/QUERY_SUCCESS';
const QUERY_FAILURE = 'add/QUERY_FAILURE';

/**
 * 添加商家用户
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_COMPANY_ADD, params)
  }
}
/**
 * 获取所有企业角色
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_COMPANY_ROLE_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case QUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        addResult: action.result,
        isJump: true
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
