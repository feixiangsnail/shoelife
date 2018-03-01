import {
  SHOE_SHOE3D,
  SHOE_3D_STATUS,
  ADMIN_CATEGORY_LIST,
  DESIGNER_LIST,
  ADMIN_SHOE_DEL_NEW,
  SHOE_SEARCH
} from 'static/apiAlias'
//上/下架
const MODIFY = 'shoeStyleNew/MODIFY';
const MODIFY_SUCCESS = 'shoeStyleNew/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'shoeStyleNew/MODIFY_FAILURE';

//列表查询
const QUERY = 'shoeStyleNew/QUERY';
const QUERY_SUCCESS = 'shoeStyleNew/QUERY_SUCCESS';
const QUERY_FAILURE = 'shoeStyleNew/QUERY_FAILURE';

//分类列表
const CATE = 'shoeStyleNew/CATE';
const CATE_SUCCESS = 'shoeStyleNew/CATE_SUCCESS';
const CATE_FAILURE = 'shoeStyleNew/CATE_FAILURE';

//设计师列表
const DESIGNER = 'shoeStyleNew/DESIGNER';
const DESIGNER_SUCCESS = 'shoeStyleNew/DESIGNER_SUCCESS';
const DESIGNER_FAILURE = 'shoeStyleNew/DESIGNER_FAILURE';

//设计风格列表
const STYLE = 'shoeStyleNew/STYLE';
const STYLE_SUCCESS = 'shoeStyleNew/STYLE_SUCCESS';
const STYLE_FAILURE = 'shoeStyleNew/STYLE_FAILURE';

//删除鞋
const DELETE = 'shoeStyleNew/DELETE';
const DELETE_SUCCESS = 'shoeStyleNew/DELETE_SUCCESS';
const DELETE_FAILURE = 'shoeStyleNew/DELETE_FAILURE';

/**
 * 上/下架
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(SHOE_3D_STATUS, params,{'hasMsg' : true})
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
    promise: (client) => client.post(ADMIN_SHOE_DEL_NEW + params)
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case MODIFY:
    case QUERY:
    case CATE:
    case DESIGNER:
    case STYLE:
    case DELETE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: {isResult:true}
      }
    case MODIFY_FAILURE:
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
