import {
  CATEGORY_GET,
  ADMIN_ALL_CATEGORY_LIST,
  ADMIN_TOP_CATEGORY_LIST,
  ADMIN_ADD_CATEGORY,
  ADMIN_MODIFY_CATEGORY
} from '../../../../../../../static/apiAlias'
//新增
const ADD = 'editCategory/ADD';
const ADD_SUCCESS = 'editCategory/ADD_SUCCESS';
const ADD_FAILURE = 'editCategory/ADD_FAILURE';

//单条详情
const VIEW = 'editCategory/VIEW';
const VIEW_SUCCESS = 'editCategory/VIEW_SUCCESS';
const VIEW_FAILURE = 'editCategory/VIEW_FAILURE';

//修改
const MODIFY = 'editCategory/MODIFY';
const MODIFY_SUCCESS = 'editCategory/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editCategory/MODIFY_FAILURE';

//分类管理
const CATEQUERY = 'editCategory/CATEQUERY';
const CATEQUERY_SUCCESS = 'editCategory/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'editCategory/CATEQUERY_FAILURE';

//顶级分类查询
const TOPCATEQUERY = 'editCategory/TOPCATEQUERY';
const TOPCATEQUERY_SUCCESS = 'editCategory/TOPCATEQUERY_SUCCESS';
const TOPCATEQUERY_FAILURE = 'editCategory/TOPCATEQUERY_FAILURE';

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
 * 顶级分类查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function topCateList(params) {
  return {
    types: [TOPCATEQUERY, TOPCATEQUERY_SUCCESS, TOPCATEQUERY_FAILURE],
    promise: (client) => client.post(ADMIN_TOP_CATEGORY_LIST, params,{'hasMsg': true})
  }
}

/**
 * 新增
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_ADD_CATEGORY, params)
  }
}

/**
 * 单条详情
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(CATEGORY_GET + params,{'hasMsg': true})
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
    promise: (client) => client.post(ADMIN_MODIFY_CATEGORY, params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
    case CATEQUERY:
    case TOPCATEQUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        result: action.result,
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
        vResult: action.result,
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
    case TOPCATEQUERY_SUCCESS:
      return {
        ...state,
        topCateResult: action.result
      }
    case TOPCATEQUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
