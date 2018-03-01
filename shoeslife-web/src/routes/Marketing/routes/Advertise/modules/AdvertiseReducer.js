import {
  ADMIN_AD_DEL,
  ADMIN_SPACE_DEL,
  ADMIN_AD_STATUS,
  ADMIN_SPACE_UPDATE,
  ADMIN_AD_LIST,
  ADMIN_SPACE_LIST,
} from '../../../../../static/apiAlias'
// 广告-删除
const DELETE = 'advertise/DELETE';
const DELETE_SUCCESS = 'advertise/DELETE_SUCCESS';
const DELETE_FAILURE = 'advertise/DELETE_FAILURE';
// 广告位-删除
const DEL_SPACE = 'advertise/DEL_SPACE';
const DEL_SPACE_SUCCESS = 'advertise/DEL_SPACE_SUCCESS';
const DEL_SPACE_FAILURE = 'advertise/DEL_SPACE_FAILURE';
// 广告-发布/暂停发布/恢复发布
const MODIFY = 'advertise/MODIFY';
const MODIFY_SUCCESS = 'advertise/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'advertise/MODIFY_FAILURE';
// 广告位-编辑
const MODIFY_SPACE = 'advertise/MODIFY_SPACE';
const MODIFY_SPACE_SUCCESS = 'advertise/MODIFY_SPACE_SUCCESS';
const MODIFY_SPACE_FAILURE = 'advertise/MODIFY_SPACE_FAILURE';
// 广告-列表
const QUERY = 'advertise/QUERY';
const QUERY_SUCCESS = 'advertise/QUERY_SUCCESS';
const QUERY_FAILURE = 'advertise/QUERY_FAILURE';
// 广告位-列表
const QUERY_SPACE = 'advertise/QUERY_SPACE';
const QUERY_SPACE_SUCCESS = 'advertise/QUERY_SPACE_SUCCESS';
const QUERY_SPACE_FAILURE = 'advertise/QUERY_SPACE_FAILURE';

/**
 * 广告-删除
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(ADMIN_AD_DEL + params)
  }
}
/**
 * 广告位-删除
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function deleteSpace(params) {
  return {
    types: [DEL_SPACE, DEL_SPACE_SUCCESS, DEL_SPACE_FAILURE],
    promise: (client) => client.post(ADMIN_SPACE_DEL + params)
  }
}
/**
 * 广告-发布/暂停发布/恢复发布
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_AD_STATUS, params)
  }
}
/**
 * 广告位-编辑
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function modifySpace(params) {
  return {
    types: [MODIFY_SPACE, MODIFY_SPACE_SUCCESS, MODIFY_SPACE_FAILURE],
    promise: (client) => client.post(ADMIN_SPACE_UPDATE, params)
  }
}
/**
 * 广告-列表
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_AD_LIST, params, {'hasMsg': true})
  }
}
/**
 * 广告位-列表
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*): *)}}
 */
export function spaceList(params) {
  return {
    types: [QUERY_SPACE, QUERY_SPACE_SUCCESS, QUERY_SPACE_FAILURE],
    promise: (client) => client.post(ADMIN_SPACE_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isP: false};
  switch (action.type) {
    case DELETE:
    case DEL_SPACE:
    case MODIFY:
    case MODIFY_SPACE:
    case QUERY:
    case QUERY_SPACE:
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
    case MODIFY_SPACE_SUCCESS:
      return {
        ...state,
        modSpaceResult: action.result,
        isP: true
      }
    case MODIFY_SPACE_FAILURE:
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
    case DEL_SPACE_SUCCESS:
      return {
        ...state,
        delSpaceResult: action.result
      }
    case DEL_SPACE_FAILURE:
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
    case QUERY_SPACE_SUCCESS:
      return {
        ...state,
        spaceResult: action.result
      }
    case QUERY_SPACE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
