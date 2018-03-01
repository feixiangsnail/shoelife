import {
  ADMIN_SHOE_MARK_ADD,
  ADMIN_SHOE_MARK_GET,
  ADMIN_SHOE_MARK_UPDATE,
  ADMIN_MATERIAL_LIST
} from '../../../../../../../../../static/apiAlias'

//新增
const ADD = 'editStampNew/ADD';
const ADD_SUCCESS = 'editStampNew/ADD_SUCCESS';
const ADD_FAILURE = 'editStampNewVamp/ADD_FAILURE';
//修改
const MODIFY = 'editStampNew/MODIFY';
const MODIFY_SUCCESS = 'editStampNew/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editStampNew/MODIFY_FAILURE';
//单条详情
const VIEW = 'editStampNew/VIEW';
const VIEW_SUCCESS = 'editStampNew/VIEW_SUCCESS';
const VIEW_FAILURE = 'editStampNew/VIEW_FAILURE';
//印记工艺列表
const QUERY = 'editStampNew/QUERY';
const QUERY_SUCCESS = 'editStampNew/QUERY_SUCCESS';
const QUERY_FAILURE = 'editStampNew/QUERY_FAILURE';

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
    promise: (client) => client.post(ADMIN_SHOE_MARK_ADD, params)
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
    promise: (client) => client.post(ADMIN_SHOE_MARK_GET + params,{'hasMsg': true})
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
    promise: (client) => client.post(ADMIN_SHOE_MARK_UPDATE, params)
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
    promise: (client) => client.post(ADMIN_MATERIAL_LIST, params,{'hasMsg' : true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case QUERY:
    case VIEW:
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
    case QUERY_SUCCESS:
      return {
        ...state,
        qResult: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
