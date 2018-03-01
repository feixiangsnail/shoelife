import {
  ADMIN_MATERIAL_LIST_P,
  ADMIN_CATEGORY_LIST,
  MATERIAL_DEL_P,
} from '../../../../../static/apiAlias'
//楦头
const LQUERY = 'materialNew/LQUERY';
const LQUERY_SUCCESS = 'materialNew/LQUERY_SUCCESS';
const LQUERY_FAILURE = 'materialNew/LQUERY_FAILURE';
//材料
const MQUERY = 'materialNew/MQUERY';
const MQUERY_SUCCESS = 'materialNew/MQUERY_SUCCESS';
const MQUERY_FAILURE = 'materialNew/MQUERY_FAILURE';
//装饰
const DQUERY = 'materialNew/DQUERY';
const DQUERY_SUCCESS = 'materialNew/DQUERY_SUCCESS';
const DQUERY_FAILURE = 'materialNew/DQUERY_FAILURE';
//印记
const SQUERY = 'materialNew/SQUERY';
const SQUERY_SUCCESS = 'materialNew/SQUERY_SUCCESS';
const SQUERY_FAILURE = 'materialNew/SQUERY_FAILURE';
//材料分类管理
const CATEQUERY = 'materialNew/CATEQUERY';
const CATEQUERY_SUCCESS = 'materialNew/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'materialNew/CATEQUERY_FAILURE';
//删除材料
const DELETE = 'materialNew/DELETE';
const DELETE_SUCCESS = 'materialNew/DELETE_SUCCESS';
const DELETE_FAILURE = 'materialNew/DELETE_FAILURE';

/**
 * 楦头列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function lastList(params) {
  return {
    types: [LQUERY, LQUERY_SUCCESS, LQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_MATERIAL_LIST_P, params, params, {'hasMsg': true})
  }
}
/**
 * 材料列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function materialList(params) {
  return {
    types: [MQUERY, MQUERY_SUCCESS, MQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_MATERIAL_LIST_P, params, {'hasMsg': true})
  }
}
/**
 * 装饰列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function decoriList(params) {
  return {
    types: [DQUERY, DQUERY_SUCCESS, DQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_MATERIAL_LIST_P, params, {'hasMsg': true})
  }
}
/**
 * 印记列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function stampList(params) {
  return {
    types: [SQUERY, SQUERY_SUCCESS, SQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_MATERIAL_LIST_P, params, {'hasMsg': true})
  }
}
/**
 * 材料分类管理
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATEQUERY, CATEQUERY_SUCCESS, CATEQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, {'hasMsg': true})
  }
}
/**
 * 删除材料
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(MATERIAL_DEL_P + params)
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case LQUERY:
    case MQUERY:
    case DQUERY:
    case SQUERY:
    case CATEQUERY:
    case DELETE:
      return {
        ...state
      }
    case LQUERY_SUCCESS:
      return {
        ...state,
        lResult: action.result
      }
    case LQUERY_FAILURE:
      return {
        ...state
      }
    case MQUERY_SUCCESS:
      return {
        ...state,
        mResult: action.result
      }
    case MQUERY_FAILURE:
      return {
        ...state
      }
    case DQUERY_SUCCESS:
      return {
        ...state,
        dResult: action.result
      }
    case DQUERY_FAILURE:
      return {
        ...state
      }
    case SQUERY_SUCCESS:
      return {
        ...state,
        sResult: action.result
      }
    case SQUERY_FAILURE:
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
    case DELETE_SUCCESS:
      return {
        ...state,
        delResult: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
