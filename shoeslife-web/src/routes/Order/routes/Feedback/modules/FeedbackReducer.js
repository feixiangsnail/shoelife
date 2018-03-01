import {
  ORDER_FEEDBACK_LIST
} from '../../../../../static/apiAlias'

// 根据搜索条件查询订单反馈
const QUERY = 'feedback/QUERY';
const QUERY_SUCCESS = 'feedback/QUERY_SUCCESS';
const QUERY_FAILURE = 'feedback/QUERY_FAILURE';
/**
 * 根据搜索条件查询订单反馈
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ORDER_FEEDBACK_LIST, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case QUERY:
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
