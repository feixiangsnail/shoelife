import {
  ADMIN_SUBJECT_SEARCH,
  ADMIN_SUBJECT_DEL,
  ADMIN_SUBJECT_STATUS,
} from 'static/apiAlias'

// 删除
const DELETE = 'theme/DELETE';
const DELETE_SUCCESS = 'theme/DELETE_SUCCESS';
const DELETE_FAILURE = 'theme/DELETE_FAILURE';
// 发布/上线/下线
const MODIFY = 'theme/MODIFY';
const MODIFY_SUCCESS = 'theme/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'theme/MODIFY_FAILURE';
// 列表
const QUERY = 'theme/QUERY';
const QUERY_SUCCESS = 'theme/QUERY_SUCCESS';
const QUERY_FAILURE = 'theme/QUERY_FAILURE';

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
    promise: (client) => client.post(ADMIN_SUBJECT_DEL + params)
  }
}

/**
 * 发布/上线/下线
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_SUBJECT_STATUS, params)
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
    promise: (client) => client.post(ADMIN_SUBJECT_SEARCH, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case DELETE:
    case MODIFY:
    case QUERY:
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
    default:
      return state
  }
}
