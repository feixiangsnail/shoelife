import {
  ADMIN_AD_ADD,
  ADMIN_AD_UPDATE,
  ADMIN_AD_GET,
  ADMIN_H5_LIST,
  ADMIN_SPACE_LIST,
} from '../../../../../../../static/apiAlias'
// 新增
const ADD = 'editDecori/ADD';
const ADD_SUCCESS = 'editDecori/ADD_SUCCESS';
const ADD_FAILURE = 'editDecori/ADD_FAILURE';
// 单条详情
const VIEW = 'editDecori/VIEW';
const VIEW_SUCCESS = 'editDecori/VIEW_SUCCESS';
const VIEW_FAILURE = 'editDecori/VIEW_FAILURE';
// 修改
const MODIFY = 'editDecori/MODIFY';
const MODIFY_SUCCESS = 'editDecori/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editDecori/MODIFY_FAILURE';
// H5页面列表
const QUERY = 'edit/QUERY';
const QUERY_SUCCESS = 'edit/QUERY_SUCCESS';
const QUERY_FAILURE = 'edit/QUERY_FAILURE';
// 广告位列表
const SPACE_QUERY = 'edit/SPACE_QUERY';
const SPACE_QUERY_SUCCESS = 'edit/SPACE_QUERY_SUCCESS';
const SPACE_QUERY_FAILURE = 'edit/SPACE_QUERY_FAILURE';

/**
 * 新增
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_AD_ADD, params)
  }
}
/**
 * 单条详情
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ADMIN_AD_GET + params, {'hasMsg': true})
  }
}

/**
 * 修改
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_AD_UPDATE, params)
  }
}

/**
 * H5页面列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_H5_LIST, params,{'hasMsg' : true})
  }
}
/**
 * 广告位列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function spaceList(params) {
  return {
    types: [SPACE_QUERY, SPACE_QUERY_SUCCESS, SPACE_QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_SPACE_LIST, params,{'hasMsg' : true})
  }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
    case QUERY:
    case SPACE_QUERY:
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
    case VIEW_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        result: action.result,
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        loading: action.loading,
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
            hResult: action.result
        }
    case QUERY_FAILURE:
        return {
            ...state
        }
    case SPACE_QUERY_SUCCESS:
      return {
        ...state,
        spaceResult: action.result
      }
    case SPACE_QUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
