import {
  MATERIAL_ADD_P,
  MATERIAL_GET_P,
  MATERIAL_UPDATE_P,
  ADMIN_CATEGORY_LIST
} from '../../../../../../../static/apiAlias'
//新增
const ADD = 'editMateriNewNew/ADD';
const ADD_SUCCESS = 'editMateriNew/ADD_SUCCESS';
const ADD_FAILURE = 'editMateriNew/ADD_FAILURE';

//单条详情
const VIEW = 'editMateriNew/VIEW';
const VIEW_SUCCESS = 'editMateriNew/VIEW_SUCCESS';
const VIEW_FAILURE = 'editMateriNew/VIEW_FAILURE';

//修改
const MODIFY = 'editMateriNew/MODIFY';
const MODIFY_SUCCESS = 'editMateriNew/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editMateriNew/MODIFY_FAILURE';

//材料分类管理
const CATEQUERY = 'editMateriNew/CATEQUERY';
const CATEQUERY_SUCCESS = 'editMateriNew/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'editMateriNew/CATEQUERY_FAILURE';
/**
 * 新增
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(MATERIAL_ADD_P, params)
  }
}

/**
 * 单条详情
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(MATERIAL_GET_P + params, params, {'hasMsg': true})
  }
}

/**
 * 修改
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(MATERIAL_UPDATE_P, params)
  }
}
/**
 * 材料分类管理
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATEQUERY, CATEQUERY_SUCCESS, CATEQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params,{'hasMsg' : true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
    case CATEQUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        addResult: action.result,
        isJump: true
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        result: action.result,
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        modResult: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
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
