import {
  ADMIN_SELECT_BRANDS,
  ADMIN_SELECT_BRANDS_DEL,
} from '../../../../../static/apiAlias'

const DELETE = 'list/DELETE';
const DELETE_SUCCESS = 'list/DELETE_SUCCESS';
const DELETE_FAILURE = 'list/DELETE_FAILURE';

const QUERY = 'list/QUERY';
const QUERY_SUCCESS = 'list/QUERY_SUCCESS';
const QUERY_FAILURE = 'list/QUERY_FAILURE';

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
    promise: (client) => client.post(ADMIN_SELECT_BRANDS_DEL + params)
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
    promise: (client) => client.post(ADMIN_SELECT_BRANDS, params, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: []}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case DELETE:
    case QUERY:
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
