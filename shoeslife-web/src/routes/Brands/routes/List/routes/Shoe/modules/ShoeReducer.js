import {
  SHOE_SEARCH,
  SHOE_STATUS,
  ADMIN_CATEGORY_LIST,
  DESIGNER_LIST,
  ADMIN_SHOE_DEL
} from '../../../../../../../static/apiAlias'
//列表查询
const QUERY = 'shoe/QUERY';
const QUERY_SUCCESS = 'shoe/QUERY_SUCCESS';
const QUERY_FAILURE = 'shoe/QUERY_FAILURE';

//分类列表
const CATE = 'shoe/CATE';
const CATE_SUCCESS = 'shoe/CATE_SUCCESS';
const CATE_FAILURE = 'shoe/CATE_FAILURE';

//设计师列表
const DESIGNER = 'shoe/DESIGNER';
const DESIGNER_SUCCESS = 'shoe/DESIGNER_SUCCESS';
const DESIGNER_FAILURE = 'shoe/DESIGNER_FAILURE';

//设计风格列表
const STYLE = 'shoe/STYLE';
const STYLE_SUCCESS = 'shoe/STYLE_SUCCESS';
const STYLE_FAILURE = 'shoe/STYLE_FAILURE';


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
    promise: (client) => client.post(SHOE_SEARCH, params,{'hasMsg' : true})
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

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case QUERY:
    case CATE:
    case DESIGNER:
    case STYLE:
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
    case CATE_SUCCESS:
      return {
        ...state,
        cateResult: action.result
      }
    case CATE_FAILURE:
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
    case STYLE_SUCCESS:
      return {
        ...state,
        styleResult: action.result
      }
    case STYLE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
