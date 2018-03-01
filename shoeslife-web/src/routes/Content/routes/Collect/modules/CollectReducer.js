import {
  ADMIN_COLLECT_ADD,
  ADMIN_COLLECT_DEL,
  ADMIN_COLLECT_LIST,
  ADMIN_COLLECT_SORT,
  ADMIN_COLLECT_STATUS,
  ADMIN_COLLECT_UPDATE,
  SHOE_SEARCH,
  ADMIN_CATEGORY_LIST
} from '../../../../../static/apiAlias'
// 新增合集
const ADD = 'collect/ADD';
const ADD_SUCCESS = 'collect/ADD_SUCCESS';
const ADD_FAILURE = 'collect/ADD_FAILURE';
// 删除合集
const DELETE = 'collect/DELETE';
const DELETE_SUCCESS = 'collect/DELETE_SUCCESS';
const DELETE_FAILURE = 'collect/DELETE_FAILURE';
// 修改合集
const MODIFY = 'collect/MODIFY';
const MODIFY_SUCCESS = 'collect/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'collect/MODIFY_FAILURE';
// 合集列表
const QUERY = 'collect/QUERY';
const QUERY_SUCCESS = 'collect/QUERY_SUCCESS';
const QUERY_FAILURE = 'collect/QUERY_FAILURE';
// 提交合集排序列表
const SORT_QUERY = 'collect/SORT_QUERY';
const SORT_QUERY_SUCCESS = 'collect/SORT_QUERY_SUCCESS';
const SORT_QUERY_FAILURE = 'collect/SORT_QUERY_FAILURE';
// 合集设置状态
const MODIFY_STATUS = 'collect/MODIFY_STATUS';
const MODIFY_STATUS_SUCCESS = 'collect/MODIFY_STATUS_SUCCESS';
const MODIFY_STATUS_FAILURE = 'collect/MODIFY_STATUS_FAILURE';
// 商品鞋列表
const SQUERY = 'collect/SQUERY';
const SQUERY_SUCCESS = 'collect/SQUERY_SUCCESS';
const SQUERY_FAILURE = 'collect/SQUERY_FAILURE';
// 鞋分类列表
const SCATE = 'collect/SCATE';
const SCATE_SUCCESS = 'collect/SCATE_SUCCESS';
const SCATE_FAILURE = 'collect/SCATE_FAILURE';
/**
 * 新增
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_COLLECT_ADD, params)
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
    promise: (client) => client.post(ADMIN_COLLECT_DEL + params)
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
    promise: (client) => client.post(ADMIN_COLLECT_UPDATE, params)
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
    promise: (client) => client.post(ADMIN_COLLECT_LIST, params, {'hasMsg': true})
  }
}
/**
 * 提交合集排序列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function setsSort(params) {
  return {
    types: [SORT_QUERY, SORT_QUERY_SUCCESS, SORT_QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_COLLECT_SORT, params, {'hasMsg': true})
  }
}
/**
 * 设置状态
 * @export
 * @param params (description)
 * @returns (description)
 */
export function setStatus(params) {
  return {
    types: [MODIFY_STATUS, MODIFY_STATUS_SUCCESS, MODIFY_STATUS_FAILURE],
    promise: (client) => client.post(ADMIN_COLLECT_STATUS, params, {'hasMsg': true})
  }
}
/**
 * 商品鞋列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function shoeList(params) {
  return {
    types: [SQUERY, SQUERY_SUCCESS, SQUERY_FAILURE],
    promise: (client) => client.post(SHOE_SEARCH, params, {'hasMsg': true})
  }
}
/**
 * 鞋分类列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function sCateList(params) {
  return {
    types: [SCATE, SCATE_SUCCESS, SCATE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case ADD:
    case DELETE:
    case MODIFY:
    case QUERY:
    case SORT_QUERY:
    case MODIFY_STATUS:
    case SQUERY:
    case SCATE:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        addResult: {is: true,isP:true}
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: {is: true}
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        delResult: {is: true}
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
    case SORT_QUERY_SUCCESS:
      return {
        ...state,
        sortResult: {is: true}
      }
    case SORT_QUERY_FAILURE:
      return {
        ...state
      }
    case MODIFY_STATUS_SUCCESS:
      return {
        ...state,
        statusResult: {is: true}
      }
    case MODIFY_STATUS_FAILURE:
      return {
        ...state
      }
    case SQUERY_SUCCESS:
      return {
        ...state,
        sqResult: action.result
      }
    case SQUERY_FAILURE:
      return {
        ...state
      }
    case SCATE_SUCCESS:
      return {
        ...state,
        sCateResult: action.result
      }
    case SCATE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
