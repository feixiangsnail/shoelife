import {
  ORDER_VOUCHER_LIST,
  ORDER_VOUCHER_UPD,
  ORDER_VOUCHER_DEL
} from '../../../../../static/apiAlias'
// 发放
const SENT = 'voucher/SENT';
const SENT_SUCCESS = 'voucher/SENT_SUCCESS';
const SENT_FAILURE = 'voucher/SENT_FAILURE';
// 删除/发放
const DELETE = 'voucher/DELETE';
const DELETE_SUCCESS = 'voucher/DELETE_SUCCESS';
const DELETE_FAILURE = 'voucher/DELETE_FAILURE';
// 列表
const QUERY = 'voucher/QUERY';
const QUERY_SUCCESS = 'voucher/QUERY_SUCCESS';
const QUERY_FAILURE = 'voucher/QUERY_FAILURE';

/**
 * 发放
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function sentItem(params) {
  return {
    types: [SENT, SENT_SUCCESS, SENT_FAILURE],
    promise: (client) => client.post(ORDER_VOUCHER_UPD, params)
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
    promise: (client) => client.post(ORDER_VOUCHER_DEL + params)
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
    promise: (client) => client.post(ORDER_VOUCHER_LIST, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case SENT:
    case DELETE:
    case QUERY:
      return {
        ...state
      }
    case SENT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        sentResult: action.result
      }
    case SENT_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        delResult: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        loading: action.loading,
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
