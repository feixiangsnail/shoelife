import {
  ADMIN_ALL_CATEGORY_LIST,
  ADMIN_SEARCH_CATEGORY_LIST,
  ADMIN_DELETE_CATEGORY,
  ADMIN_MODIFY_CATEGORY,
} from '../../../../../static/apiAlias'

const DELETE = 'category/DELETE';
const DELETE_SUCCESS = 'category/DELETE_SUCCESS';
const DELETE_FAILURE = 'category/DELETE_FAILURE';

const QUERY = 'category/QUERY';
const QUERY_SUCCESS = 'category/QUERY_SUCCESS';
const QUERY_FAILURE = 'category/QUERY_FAILURE';

//分类管理
const CATEQUERY = 'category/CATEQUERY';
const CATEQUERY_SUCCESS = 'category/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'category/CATEQUERY_FAILURE';

/**
 * 分类管理
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATEQUERY, CATEQUERY_SUCCESS, CATEQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_ALL_CATEGORY_LIST, params,{'hasMsg': true})
  }
}

/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function categoryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_SEARCH_CATEGORY_LIST, params,{'hasMsg': true})
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
    promise: (client) => client.post(ADMIN_MODIFY_CATEGORY, params,{'hasMsg': true})
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case DELETE:
    case QUERY:
    case CATEQUERY:
        return {
            ...state
        }
    case DELETE_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case DELETE_FAILURE:
        return {
            ...state
        }
    case QUERY_SUCCESS:
        return {
            ...state,
          categoryResult: action.result
        }
    case QUERY_FAILURE:
        return {
            ...state
        }
    case CATEQUERY_SUCCESS:
      return {
        ...state,
        cateResult: action.result
      }
    case CATEQUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
