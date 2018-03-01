import {
  SHOE_SEARCH,
  ADMIN_CATEGORY_LIST,
  ADMIN_SUBJECT_ADD,
  ADMIN_SUBJECT_GET,
  ADMIN_SUBJECT_UPDATE,
  ADMIN_SHOE_GET
} from 'static/apiAlias'

// 新增
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';
// 修改
const MODIFY = 'edit/MODIFY';
const MODIFY_SUCCESS = 'edit/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'edit/MODIFY_FAILURE';
// 商品鞋列表
const QUERY = 'edit/QUERY';
const QUERY_SUCCESS = 'edit/QUERY_SUCCESS';
const QUERY_FAILURE = 'edit/QUERY_FAILURE';
// 详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';
// 鞋分类列表
const SCATE = 'edit/SCATE';
const SCATE_SUCCESS = 'edit/SCATE_SUCCESS';
const SCATE_FAILURE = 'edit/SCATE_FAILURE';
// 获取单个鞋商品的信息
const SVIEW = 'edit/SVIEW';
const SVIEW_SUCCESS = 'edit/SVIEW_SUCCESS';
const SVIEW_FAILURE = 'edit/SVIEW_FAILURE';
/**
 * 新增
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_SUBJECT_ADD, params)
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
    promise: (client) => client.post(ADMIN_SUBJECT_UPDATE, params)
  }
}
/**
 * 商品鞋列表
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
/**
 * 获取专题
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ADMIN_SUBJECT_GET + params)
  }
}
/**
 * 鞋分类列表
 * @export
 * @param params (description)
 * @returns (description)
 */
export function sCateList(params) {
  return {
    types: [SCATE, SCATE_SUCCESS, SCATE_FAILURE],
    promise: (client) => client.post(ADMIN_CATEGORY_LIST, params, {'hasMsg': true})
  }
}
/**
 * 获取单个鞋商品的信息
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getShoe(params) {
  return {
    types: [SVIEW, SVIEW_SUCCESS, SVIEW_FAILURE],
    promise: (client) => client.post(ADMIN_SHOE_GET + params)
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case QUERY:
    case VIEW:
    case SCATE:
    case SVIEW:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
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
        loading: action.loading,
        modResult: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
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
    case VIEW_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case VIEW_FAILURE:
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
    case SVIEW_SUCCESS:
      return {
        ...state,
        showResult: action.result
      }
    case SVIEW_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
