import {
  USERS_FORGOT_RESET
} from '../../../static/apiAlias'

const MODIFY = 'resetPassword/MODIFY';
const MODIFY_SUCCESS = 'resetPassword/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'resetPassword/MODIFY_FAILURE';

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
    promise: (client) => client.post(USERS_FORGOT_RESET, params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading,isJump: false};
  switch (action.type) {
    case MODIFY:
        return {
            ...state
        }
    case MODIFY_SUCCESS:
        return {
            ...state,
            result: action.result,
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
