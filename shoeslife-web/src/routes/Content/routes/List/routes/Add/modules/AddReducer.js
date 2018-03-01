import {
  ARTICALE_ADD,
  ARTICALE_UPDATE,
  ARTICALE_GET,
  ADMIN_CATEGORY_LIST,
  EDITOR_LIST,
  SHOE_SEARCH
} from '../../../../../../../static/apiAlias'

//新增
const ADD = 'add/ADD';
const ADD_SUCCESS = 'add/ADD_SUCCESS';
const ADD_FAILURE = 'add/ADD_FAILURE';
//修改
const MODIFY = 'add/MODIFY';
const MODIFY_SUCCESS = 'add/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'add/MODIFY_FAILURE';
//详情
const VIEW = 'add/VIEW';
const VIEW_SUCCESS = 'add/VIEW_SUCCESS';
const VIEW_FAILURE = 'add/VIEW_FAILURE';
//主编列表
const EDITOR = 'add/EDITOR';
const EDITOR_SUCCESS = 'add/EDITOR_SUCCESS';
const EDITOR_FAILURE = 'add/EDITOR_FAILURE';
//分类列表
const CATE = 'add/CATE';
const CATE_SUCCESS = 'add/CATE_SUCCESS';
const CATE_FAILURE = 'add/CATE_FAILURE';
//鞋分类列表
const SCATE = 'add/SCATE';
const SCATE_SUCCESS = 'add/SCATE_SUCCESS';
const SCATE_FAILURE = 'add/SCATE_FAILURE';
//列表查询
const QUERY = 'add/QUERY';
const QUERY_SUCCESS = 'add/QUERY_SUCCESS';
const QUERY_FAILURE = 'add/QUERY_FAILURE';

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
    promise: (client) => client.post(ARTICALE_ADD, params)
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
    promise: (client) => client.post(ARTICALE_UPDATE, params)
  }
}
/**
 * 单条查看
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ARTICALE_GET + params, params, {'hasMsg': true})
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
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, params, {'hasMsg': true})
  }
}
/**
 * 鞋分类列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function sCateList(params) {
  return {
    types: [SCATE, SCATE_SUCCESS, SCATE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, params, {'hasMsg': true})
  }
}
/**
 * 主编列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function editorList(params) {
  return {
    types: [EDITOR, EDITOR_SUCCESS, EDITOR_FAILURE],
    promise: (client) => client.post(EDITOR_LIST, params, params, {'hasMsg': true})
  }
}
/**
 * 商品列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(SHOE_SEARCH, params, {'hasMsg': true})
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case CATE:
    case EDITOR:
    case VIEW:
    case QUERY:
    case SCATE:
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
    case VIEW_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case VIEW_FAILURE:
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
    case EDITOR_SUCCESS:
      return {
        ...state,
        eResult: action.result
      }
    case EDITOR_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        sResult: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    case SCATE_SUCCESS:
      return {
        ...state,
        sCateResult: action.result
      }
    case SCATE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
