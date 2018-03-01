import {
  ADMIN_COMPANY_DESIGNER_LIST,
  ADMIN_DES_DYNAMIC_ADD,
  ADMIN_DES_DYNAMIC_UPDATE,
  ADMIN_DES_DYNAMIC_GET
} from 'static/apiAlias'

// 新增
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';
// 编辑
const MODIFY = 'edit/MODIFY';
const MODIFY_SUCCESS = 'edit/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'edit/MODIFY_FAILURE';
// 设计师列表
const QUERY = 'edit/QUERY';
const QUERY_SUCCESS = 'edit/QUERY_SUCCESS';
const QUERY_FAILURE = 'edit/QUERY_FAILURE';
// 获取详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

/**
 * 新增
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_ADD, params)
  }
}
/**
 * 编辑
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_UPDATE, params)
  }
}
/**
 * 设计师列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_COMPANY_DESIGNER_LIST, params, {'hasMsg': true})
  }
}
/**
 * 获取详情
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ADMIN_DES_DYNAMIC_GET + params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case QUERY:
    case VIEW:
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
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
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
    case VIEW_SUCCESS:
      return {
        ...state,
        vResult: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
