import {
  ADMIN_DESIGNER_LIST,
  ADMIN_DESIGNER_RECOMMEND,
} from '../../../../../static/apiAlias'
// 推荐/取消推荐
const MODIFY = 'designers/MODIFY';
const MODIFY_SUCCESS = 'designers/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'designers/MODIFY_FAILURE';
// 列表
const QUERY = 'designers/QUERY';
const QUERY_SUCCESS = 'designers/QUERY_SUCCESS';
const QUERY_FAILURE = 'designers/QUERY_FAILURE';

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
    promise: (client) => client.post(ADMIN_DESIGNER_RECOMMEND + params)
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
    promise: (client) => client.post(ADMIN_DESIGNER_LIST, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
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
