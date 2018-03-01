import {
  ORDER_VOUCHER_ADD,
  ORDER_VOUCHER_GET,
  ORDER_VOUCHER_UPD
} from '../../../../../../../static/apiAlias'

// 新增
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';
// 编辑
const MODIFY = 'edit/MODIFY';
const MODIFY_SUCCESS = 'edit/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'edit/MODIFY_FAILURE';
//详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';


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
    promise: (client) => client.post(ORDER_VOUCHER_ADD, params)
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
    promise: (client) => client.post(ORDER_VOUCHER_UPD, params)
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
    promise: (client) => client.post(ORDER_VOUCHER_GET + params, {'hasMsg': true})
  }
}


export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case VIEW:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
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
    default:
      return state
  }
}
