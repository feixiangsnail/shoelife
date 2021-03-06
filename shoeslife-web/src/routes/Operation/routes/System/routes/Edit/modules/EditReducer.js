import {
  SYSTEM_PARAM_GET,
  SYSTEM_PARAM_UPDATE,
} from '../../../../../../../static/apiAlias'

const MODIFY = 'system/MODIFY';
const MODIFY_SUCCESS = 'system/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'system/MODIFY_FAILURE';

const VIEW = 'system/VIEW';
const VIEW_SUCCESS = 'system/VIEW_SUCCESS';
const VIEW_FAILURE = 'system/VIEW_FAILURE';

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
    promise: (client) => client.post(SYSTEM_PARAM_UPDATE, params)
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
    promise: (client) => client.post(SYSTEM_PARAM_GET + params, {'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case MODIFY:
    case VIEW:
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
