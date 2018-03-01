import {
  ADMIN_COMPANY_DESIGNER_LIST,
  ADMIN_DES_DYNAMIC_LIST,
  ADMIN_DES_DYNAMIC_DEL,
  ADMIN_DES_DYNAMIC_RELEASE,
} from 'static/apiAlias'
// 删除
const DELETE = 'dynamic/DELETE';
const DELETE_SUCCESS = 'dynamic/DELETE_SUCCESS';
const DELETE_FAILURE = 'dynamic/DELETE_FAILURE';
// 发布
const MODIFY = 'dynamic/MODIFY';
const MODIFY_SUCCESS = 'dynamic/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'dynamic/MODIFY_FAILURE';
// 列表
const QUERY = 'dynamic/QUERY';
const QUERY_SUCCESS = 'dynamic/QUERY_SUCCESS';
const QUERY_FAILURE = 'dynamic/QUERY_FAILURE';
// 设计师列表
const DESIGNER = 'dynamic/DESIGNER';
const DESIGNER_SUCCESS = 'dynamic/DESIGNER_SUCCESS';
const DESIGNER_FAILURE = 'dynamic/DESIGNER_FAILURE';

/**
 * 删除
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_DEL + params)
  }
}
/**
 * 发布
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_RELEASE, params)
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
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_LIST, params, {'hasMsg': true})
  }
}
/**
 * 设计师列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function desList(params) {
  return {
    types: [DESIGNER, DESIGNER_SUCCESS, DESIGNER_FAILURE],
    promise: (client) => client.post(ADMIN_COMPANY_DESIGNER_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading,isOk:false};
  switch (action.type) {
    case DELETE:
    case MODIFY:
    case QUERY:
    case DESIGNER:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: action.result
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        delResult: action.result
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
    case DESIGNER_SUCCESS:
      return {
        ...state,
        desResult: action.result,
        isOk:true
      }
    case DESIGNER_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
