import {
  VERSION_ADD,
  VERSION_GET,
  VERSION_UPDATE,
} from '../../../../../../../static/apiAlias'

const ADD = 'iosAdd/ADD';
const ADD_SUCCESS = 'iosAdd/ADD_SUCCESS';
const ADD_FAILURE = 'iosAdd/ADD_FAILURE';

const MODIFY = 'iosAdd/MODIFY';
const MODIFY_SUCCESS = 'iosAdd/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'iosAdd/MODIFY_FAILURE';

const VIEW = 'iosAdd/VIEW';
const VIEW_SUCCESS = 'iosAdd/VIEW_SUCCESS';
const VIEW_FAILURE = 'iosAdd/VIEW_FAILURE';


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
    promise: (client) => client.post(VERSION_ADD, params)
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
    promise: (client) => client.post(VERSION_UPDATE, params)
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
    promise: (client) => client.post(VERSION_GET + params, {'hasMsg': true})
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
        loading: action.loading,
        result: action.result,
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
