import {
  COMMON_FEEDBACK_LIST,
  COMMON_FEEDBACK_DEL,
  COMMON_FEEDBACK_UPD
} from '../../../../../static/apiAlias'

//根据搜索条件查询意见反馈
const QUERY = 'feedback/QUERY';
const QUERY_SUCCESS = 'feedback/QUERY_SUCCESS';
const QUERY_FAILURE = 'feedback/QUERY_FAILURE';
//根据Id删除意见反馈
const DELETE = 'feedback/DELETE';
const DELETE_SUCCESS = 'feedback/DELETE_SUCCESS';
const DELETE_FAILURE = 'feedback/DELETE_FAILURE';
//根据Feedback更新意见反馈
const MODIFY = 'feedback/MODIFY';
const MODIFY_SUCCESS = 'feedback/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'feedback/MODIFY_FAILURE';
/**
 * 根据搜索条件查询意见反馈
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(COMMON_FEEDBACK_LIST, params, {'hasMsg': true})
  }
}
/**
 * 根据Id删除意见反馈
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(COMMON_FEEDBACK_DEL + params)
  }
}
/**
 * 根据Feedback更新意见反馈
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(COMMON_FEEDBACK_UPD, params)
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
