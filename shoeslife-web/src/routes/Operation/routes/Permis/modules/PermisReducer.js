import {
  ADMIN_EMP_LIST,
  ADMIN_EMP_DEL,
  ADMIN_EMP_UPLOAD,
  ADMIN_EMP_RECOVER
} from '../../../../../static/apiAlias'
//列表
const QUERY = 'permis/QUERY';
const QUERY_SUCCESS = 'permis/QUERY_SUCCESS';
const QUERY_FAILURE = 'permis/QUERY_FAILURE';
//禁用
const LOCK = 'permis/LOCK';
const LOCK_SUCCESS = 'permis/LOCK_SUCCESS';
const LOCK_FAILURE = 'permis/LOCK_FAILURE';
//恢复
const RECOVER = 'permis/RECOVER';
const RECOVER_SUCCESS = 'permis/RECOVER_SUCCESS';
const RECOVER_FAILURE = 'permis/RECOVER_FAILURE';
//删除
const DELETE = 'permis/DELETE';
const DELETE_SUCCESS = 'permis/DELETE_SUCCESS';
const DELETE_FAILURE = 'permis/DELETE_FAILURE';

/**
 * 禁用
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function lockItem(params) {
  return {
    types: [LOCK, LOCK_SUCCESS, LOCK_FAILURE],
    promise: (client) => client.post(ADMIN_EMP_UPLOAD + params)
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
    promise: (client) => client.post(ADMIN_EMP_DEL + params)
  }
}
/**
 * 恢复
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function recoverItem(params) {
  return {
    types: [RECOVER, RECOVER_SUCCESS, RECOVER_FAILURE],
    promise: (client) => client.post(ADMIN_EMP_RECOVER + params)
  }
}
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
    promise: (client) => client.post(ADMIN_EMP_LIST, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case LOCK:
    case DELETE:
    case RECOVER:
    case QUERY:
      return {
        ...state
      }
    case LOCK_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        lockResult: action.result
      }
    case LOCK_FAILURE:
      return {
        ...state
      }
    case RECOVER_SUCCESS:
      return {
        ...state,
        reResult: action.result
      }
    case RECOVER_FAILURE:
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
    default:
      return state
  }
}
