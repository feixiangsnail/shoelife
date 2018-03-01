import {
  ADMIN_TRADE_LIST,
  ADMIN_TRADE_COUNT,
} from '../../../../../static/apiAlias';

const QUERY = 'financial/QUERY';
const QUERY_SUCCESS = 'financial/QUERY_SUCCESS';
const QUERY_FAILURE = 'financial/QUERY_FAILURE';

const COUNT = 'financial/COUNT';
const COUNT_SUCCESS = 'financial/COUNT_SUCCESS';
const COUNT_FAILURE = 'financial/COUNT_FAILURE';

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
    promise: (client) => client.post(ADMIN_TRADE_LIST, params,{'hasMsg' : true})
  }
}
/**
 * 小计
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function countItem(params) {
  return {
    types: [COUNT, COUNT_SUCCESS, COUNT_FAILURE],
    promise: (client) => client.post(ADMIN_TRADE_COUNT, params,{'hasMsg' : true})
  }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case QUERY:
    case COUNT:
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
    case COUNT_SUCCESS:
      return {
        ...state,
        countResult: action.result
      }
    case COUNT_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
