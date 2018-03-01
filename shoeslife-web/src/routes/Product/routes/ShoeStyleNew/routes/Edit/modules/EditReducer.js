import {
  ADMIN_SHOE_ADD,
  ADMIN_SELECT_BRANDS,
  ADMIN_CATEGORY_LIST,
  DESIGNER_LIST,
  MATERIAL_SEARCH_P,
  ADMIN_SHOE_UPDATE,
  ADMIN_SHOE_GET
} from '../../../../../../../static/apiAlias'
//基本信息添加保存
const ADD = 'addOne/ADD';
const ADD_SUCCESS = 'addOne/ADD_SUCCESS';
const ADD_FAILURE = 'addOne/ADD_FAILURE';

//分类列表
const CATE = 'addOne/CATE';
const CATE_SUCCESS = 'addOne/CATE_SUCCESS';
const CATE_FAILURE = 'addOne/CATE_FAILURE';

//设计风格列表
const STYLE = 'shoeStyle/STYLE';
const STYLE_SUCCESS = 'shoeStyle/STYLE_SUCCESS';
const STYLE_FAILURE = 'shoeStyle/STYLE_FAILURE';

//品牌列表
const BRAND = 'shoeStyle/BRAND';
const BRAND_SUCCESS = 'shoeStyle/BRAND_SUCCESS';
const BRAND_FAILURE = 'shoeStyle/BRAND_FAILURE';

//设计师列表
const DESIGNER = 'shoeStyle/DESIGNER';
const DESIGNER_SUCCESS = 'shoeStyle/DESIGNER_SUCCESS';
const DESIGNER_FAILURE = 'shoeStyle/DESIGNER_FAILURE';

//楦头列表
const MQUERY = 'shoeStyle/MQUERY';
const MQUERY_SUCCESS = 'shoeStyle/MQUERY_SUCCESS';
const MQUERY_FAILURE = 'shoeStyle/MQUERY_FAILURE';

//单条详情
const VIEW = 'shoeStyle/VIEW';
const VIEW_SUCCESS = 'shoeStyle/VIEW_SUCCESS';
const VIEW_FAILURE = 'shoeStyle/VIEW_FAILURE';

//修改
const MODIFY = 'shoeStyle/MODIFY';
const MODIFY_SUCCESS = 'shoeStyle/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'shoeStyle/MODIFY_FAILURE';
/**
 * 基本信息添加保存
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_SHOE_ADD, params)
  }
}
/**
 * 分类列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATE, CATE_SUCCESS, CATE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params,{'hasMsg' : true})
  }
}

/**
 * 设计风格列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function styleList(params) {
  return {
    types: [STYLE, STYLE_SUCCESS, STYLE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params,{'hasMsg' : true})
  }
}

/**
 * 品牌
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function brandList(params) {
  return {
    types: [BRAND, BRAND_SUCCESS, BRAND_FAILURE],
    promise: (client) => client.post(ADMIN_SELECT_BRANDS, params,{'hasMsg' : true})
  }
}

/**
 * 设计师列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function desList(params) {
  return {
    types: [DESIGNER, DESIGNER_SUCCESS, DESIGNER_FAILURE],
    promise: (client) => client.post(DESIGNER_LIST, params,{'hasMsg' : true})
  }
}
/**
 * 楦头列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function materialList(params) {
  return {
    types: [MQUERY, MQUERY_SUCCESS, MQUERY_FAILURE],
    promise: (client) => client.post(MATERIAL_SEARCH_P, params,{'hasMsg' : true})
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
    promise: (client) => client.post(ADMIN_SHOE_GET + params,{'hasMsg' : true})
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
    promise: (client) => client.post(ADMIN_SHOE_UPDATE, params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case CATE:
    case STYLE:
    case BRAND:
    case DESIGNER:
    case VIEW:
    case MODIFY:
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
    case CATE_SUCCESS:
      return {
        ...state,
        cateResult: action.result
      }
    case CATE_FAILURE:
      return {
        ...state
      }
    case STYLE_SUCCESS:
      return {
        ...state,
        styleResult: action.result
      }
    case STYLE_FAILURE:
      return {
        ...state
      }
    case BRAND_SUCCESS:
      return {
        ...state,
        brandResult: action.result
      }
    case BRAND_FAILURE:
      return {
        ...state
      }
    case DESIGNER_SUCCESS:
      return {
        ...state,
        desResult: action.result
      }
    case DESIGNER_FAILURE:
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
    default:
      return state
  }
}
