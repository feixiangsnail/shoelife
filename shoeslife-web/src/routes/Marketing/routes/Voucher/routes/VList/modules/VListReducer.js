import {
  ORDER_VOUCHER_GET_LIST
} from '../../../../../../../static/apiAlias'
// 代金券领用详情
const QUERY = 'vList/QUERY';
const QUERY_SUCCESS = 'vList/QUERY_SUCCESS';
const QUERY_FAILURE = 'vList/QUERY_FAILURE';

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
    promise: (client) => client.post(ORDER_VOUCHER_GET_LIST, params,{'hasMsg' : true})
  }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
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
