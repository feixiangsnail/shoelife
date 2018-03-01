import {
  SHOE_CUSTOM_LIST,
  SHOE_CUSTOM_RECOM
} from 'static/apiAlias'

// 列表查询
const QUERY = 'custom/QUERY';
const QUERY_SUCCESS = 'custom/QUERY_SUCCESS';
const QUERY_FAILURE = 'custom/QUERY_FAILURE';
// 推荐/取消推荐
const MODIFY = 'custom/MODIFY';
const MODIFY_SUCCESS = 'custom/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'custom/MODIFY_FAILURE';

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
    promise: (client) => client.post(SHOE_CUSTOM_LIST, params, {'hasMsg': true})
  }
}
/**
 * 推荐/取消推荐
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.get(SHOE_CUSTOM_RECOM + params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case QUERY:
    case MODIFY:
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
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: action.result
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
