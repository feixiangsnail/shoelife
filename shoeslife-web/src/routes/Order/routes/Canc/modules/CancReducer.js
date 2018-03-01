import {
  ORDER_CANCEL_LIST
} from '../../../../../static/apiAlias'

const QUERY = 'canc/QUERY';
const QUERY_SUCCESS = 'canc/QUERY_SUCCESS';
const QUERY_FAILURE = 'canc/QUERY_FAILURE';

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
    promise: (client) => client.post(ORDER_CANCEL_LIST, params, {'hasMsg': true})
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
