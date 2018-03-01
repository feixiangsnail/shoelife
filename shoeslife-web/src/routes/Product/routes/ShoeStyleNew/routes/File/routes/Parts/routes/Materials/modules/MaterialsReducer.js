import {
  ADMIN_MATERIAL_LIST_P,
  ADMIN_CATEGORY_LIST,
  GET_MODE_MATERIAL,
  ADD_MODE_MATERIAL
} from 'static/apiAlias'

//材料
const MQUERY = 'materialNew/MQUERY';
const MQUERY_SUCCESS = 'materialNew/MQUERY_SUCCESS';
const MQUERY_FAILURE = 'materialNew/MQUERY_FAILURE';

//材料分类管理
const CATEQUERY = 'materialNew/CATEQUERY';
const CATEQUERY_SUCCESS = 'materialNew/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'materialNew/CATEQUERY_FAILURE';
//添加材料
const ADD_MQUERY = 'materialNew/ADD_MQUERY';
const ADD_MQUERY_SUCCESS = 'materialNew/ADD_MQUERY_SUCCESS';
const ADD_MQUERY_FAILURE = 'materialNew/ADD_MQUERY_FAILURE';



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
    promise: (client) => client.post(GET_MODE_MATERIAL, params, {'hasMsg': true})
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
 * 添加材料
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addModeMaterial(params) {
  return {
    types: [ADD_MQUERY, ADD_MQUERY_SUCCESS, ADD_MQUERY_FAILURE],
    promise: (client) => client.post(ADD_MODE_MATERIAL, params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case MQUERY:
    case CATEQUERY:
    case ADD_MQUERY:
      return {
        ...state
      }
    case ADD_MQUERY_SUCCESS:
      return {
        ...state,
        aResult:{is:true}
      }
    case MQUERY_SUCCESS:
      return {
        ...state,
        mResult: action.result
      }
      case ADD_MQUERY_FAILURE:
        return {
          ...state
        }
    case MQUERY_FAILURE:
      return {
        ...state
      }
    case CATEQUERY_SUCCESS:
      return {
        ...state,
        cateResult: action.result
      }
    case ADD_MQUERY_FAILURE:
      return {
        ...state
      }
    case CATEQUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
