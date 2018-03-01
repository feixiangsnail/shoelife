import {
  ADMIN_DICT_ADD,
  ADMIN_DICT_DEL,
  ADMIN_DICT_UPDATE,
  ADMIN_DICT_LIST,
} from '../../../../../../../static/apiAlias'

// 新增
const ADD = 'notateNew/ADD';
const ADD_SUCCESS = 'notateNew/ADD_SUCCESS';
const ADD_FAILURE = 'notateNew/ADD_FAILURE';
// 删除
const DELETE = 'notateNew/DELETE';
const DELETE_SUCCESS = 'notateNew/DELETE_SUCCESS';
const DELETE_FAILURE = 'notateNew/DELETE_FAILURE';
// 修改
const MODIFY = 'notateNew/MODIFY';
const MODIFY_SUCCESS = 'notateNew/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'notateNew/MODIFY_FAILURE';
// 查询
const QUERY = 'notateNew/QUERY';
const QUERY_SUCCESS = 'notateNew/QUERY_SUCCESS';
const QUERY_FAILURE = 'notateNew/QUERY_FAILURE';

/**
 * 新增
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_DICT_ADD+params)
  }
}

/**
 * 删除
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(ADMIN_DICT_DEL + params)
  }
}

/**
 * 修改
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_DICT_UPDATE, params)
  }
}

/**
 * 列表查询
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_DICT_LIST, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading,isP: false};
  switch (action.type) {
    case ADD:
    case DELETE:
    case MODIFY:
    case QUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        addResult: action.result
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        modResult: {is:true},
        isP: true
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        delResult: {is:true}
      }
    case DELETE_FAILURE:
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
