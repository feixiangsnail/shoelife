import {
  ARTICALE_LIST,
  ADMIN_CATEGORY_LIST,
  ARTICALE_DEL,
  ARTICALE_RELEASE,
  EDITOR_LIST
} from '../../../../../static/apiAlias'

//文章列表
const QUERY = 'list/QUERY';
const QUERY_SUCCESS = 'list/QUERY_SUCCESS';
const QUERY_FAILURE = 'list/QUERY_FAILURE';
//分类列表
const CATE = 'list/CATE';
const CATE_SUCCESS = 'list/CATE_SUCCESS';
const CATE_FAILURE = 'list/CATE_FAILURE';
//发布文章
const MODIFY = 'list/MODIFY';
const MODIFY_SUCCESS = 'list/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'list/MODIFY_FAILURE';
//删除文章
const DELETE = 'list/DELETE';
const DELETE_SUCCESS = 'list/DELETE_SUCCESS';
const DELETE_FAILURE = 'list/DELETE_FAILURE';
//主编列表
const EDITOR = 'list/EDITOR';
const EDITOR_SUCCESS = 'list/EDITOR_SUCCESS';
const EDITOR_FAILURE = 'list/EDITOR_FAILURE';
/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ARTICALE_LIST, params, {'hasMsg': true})
  }
}
/**
 * 分类列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATE, CATE_SUCCESS, CATE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, {'hasMsg': true})
  }
}
/**
 * 删除
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(ARTICALE_DEL + params)
  }
}
/**
 * 发布文章
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ARTICALE_RELEASE, params)
  }
}
/**
 * 主编列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function editorList(params) {
  return {
    types: [EDITOR, EDITOR_SUCCESS, EDITOR_FAILURE],
    promise: (client) => client.post(EDITOR_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case DELETE:
    case MODIFY:
    case QUERY:
    case CATE:
    case EDITOR:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult:{is:true}
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
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
    case CATE_SUCCESS:
      return {
        ...state,
        cateResult: action.result
      }
    case CATE_FAILURE:
      return {
        ...state
      }
    case EDITOR_SUCCESS:
      return {
        ...state,
        eResult: action.result
      }
    case EDITOR_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
