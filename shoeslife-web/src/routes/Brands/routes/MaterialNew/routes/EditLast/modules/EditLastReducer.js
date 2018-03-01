import {
  MATERIAL_ADD_P,
  MATERIAL_GET_P,
  MATERIAL_UPDATE_P
} from '../../../../../../../static/apiAlias'
//新增
const ADD = 'editLast/ADD';
const ADD_SUCCESS = 'editLast/ADD_SUCCESS';
const ADD_FAILURE = 'editLast/ADD_FAILURE';

//单条详情
const VIEW = 'editLast/VIEW';
const VIEW_SUCCESS = 'editLast/VIEW_SUCCESS';
const VIEW_FAILURE = 'editLast/VIEW_FAILURE';

//修改
const MODIFY = 'editLast/MODIFY';
const MODIFY_SUCCESS = 'editLast/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'editLast/MODIFY_FAILURE';
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
    promise: (client) => client.post(MATERIAL_ADD_P, params)
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
    promise: (client) => client.post(MATERIAL_GET_P + params, params, {'hasMsg': true})
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
    promise: (client) => client.post(MATERIAL_UPDATE_P, params)
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
    default:
      return state
  }
}
