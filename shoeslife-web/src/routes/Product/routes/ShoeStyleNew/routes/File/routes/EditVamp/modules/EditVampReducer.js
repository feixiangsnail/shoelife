import {
  ADMIN_SHOE_STYLE_ADD,
  ADMIN_SHOE_STYLE_GET,
  ADMIN_SHOE_STYLE_UPDATE
} from '../../../../../../../../../static/apiAlias'
//新增
const ADD = 'editVampNew/ADD';
const ADD_SUCCESS = 'editVampNew/ADD_SUCCESS';
const ADD_FAILURE = 'editVampNew/ADD_FAILURE';
//修改
const MODIFY = 'editVampNew/MODIFY';
const MODIFY_SUCCESS = 'editVampNew/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editVampNew/MODIFY_FAILURE';
//单条详情
const VIEW = 'editVampNew/VIEW';
const VIEW_SUCCESS = 'editVampNew/VIEW_SUCCESS';
const VIEW_FAILURE = 'editVampNew/VIEW_FAILURE';

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
    promise: (client) => client.post(ADMIN_SHOE_STYLE_ADD, params)
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
    promise: (client) => client.post(ADMIN_SHOE_STYLE_GET + params,{'hasMsg': true})
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
    promise: (client) => client.post(ADMIN_SHOE_STYLE_UPDATE, params)
  }
}
export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
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
    default:
      return state
  }
}
