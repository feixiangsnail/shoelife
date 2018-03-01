import {
  VERSION_PUBLISHED,
  VERSION_SEARCH,
  VERSION_DEL,

} from '../../../../../static/apiAlias'

const DELETE = 'upgrade/DELETE';
const DELETE_SUCCESS = 'upgrade/DELETE_SUCCESS';
const DELETE_FAILURE = 'upgrade/DELETE_FAILURE';

const QUERY = 'upgrade/QUERY';
const QUERY_SUCCESS = 'upgrade/QUERY_SUCCESS';
const QUERY_FAILURE = 'upgrade/QUERY_FAILURE';

const PUBLISHED = 'upgrade/PUBLISHED';
const PUBLISHED_SUCCESS = 'upgrade/PUBLISHED_SUCCESS';
const PUBLISHED_FAILURE = 'upgrade/PUBLISHED_FAILURE';

/**
 * 发布
 * @export
 * @param params (description)
 * @returns (description)
 */
export function publishedItem(params) {
  return {
    types: [PUBLISHED, PUBLISHED_SUCCESS, PUBLISHED_FAILURE],
    promise: (client) => client.post(VERSION_PUBLISHED+'/'+ params)
  }
}
/**
 * 删除
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(VERSION_DEL+'/'+ params)
  }
}
/**
 * 列表查询
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(VERSION_SEARCH, params,{'hasMsg': true})
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case DELETE:
    case PUBLISHED:
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
    case PUBLISHED_SUCCESS:
      return {
        ...state,
        pubResult: action.result
      }
    case PUBLISHED_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
