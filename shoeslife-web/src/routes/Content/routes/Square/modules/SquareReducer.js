import {
  ADMIN_DYNAMIC_LIST,
  ADMIN_DYNAMIC_UPDATE,
  ADMIN_DYNAMIC_DEL,
} from '../../../../../static/apiAlias'
//根据DynamicId删除信息
const DELETE = 'square/DELETE';
const DELETE_SUCCESS = 'square/DELETE_SUCCESS';
const DELETE_FAILURE = 'square/DELETE_FAILURE';
//推荐或取消推荐动态信息
const MODIFY = 'square/MODIFY';
const MODIFY_SUCCESS = 'square/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'square/MODIFY_FAILURE';
//根据搜索条件分页查询动态信息
const QUERY = 'square/QUERY';
const QUERY_SUCCESS = 'square/QUERY_SUCCESS';
const QUERY_FAILURE = 'square/QUERY_FAILURE';

const QUERY_RECOMMEND = 'square/QUERY_RECOMMEND';
const QUERY_RECOMMEND_SUCCESS = 'square/QUERY_RECOMMEND_SUCCESS';
const QUERY_RECOMMEND_FAILURE = 'square/QUERY_RECOMMEND_FAILURE';

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
    promise: (client) => client.post(ADMIN_DYNAMIC_DEL + params)
  }
}

/**
 * 修改
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_DYNAMIC_UPDATE, params)
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
    promise: (client) => client.post(ADMIN_DYNAMIC_LIST, params, {'hasMsg': true})
  }
}
/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryRecommendList(params) {
  return {
    types: [QUERY_RECOMMEND, QUERY_RECOMMEND_SUCCESS, QUERY_RECOMMEND_FAILURE],
    promise: (client) => client.post(ADMIN_DYNAMIC_LIST, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case DELETE:
    case MODIFY:
    case QUERY:
    case QUERY_RECOMMEND:
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
    case QUERY_RECOMMEND_SUCCESS:
      return{
        ...state,
        ResultR:action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    case QUERY_RECOMMEND_FAILURE:
      return{
        ...state
      }
    default:
      return state
  }
}
