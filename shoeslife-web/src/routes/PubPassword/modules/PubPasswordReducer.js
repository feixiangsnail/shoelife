import {
  USERS_MODIFY_PASS
} from '../../../static/apiAlias'

const MODIFY = 'pubPassword/MODIFY';
const MODIFY_SUCCESS = 'pubPassword/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'pubPassword/MODIFY_FAILURE';

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
    promise: (client) => client.post(USERS_MODIFY_PASS, params)
  }
}


export default function reducer(state = {result: {}}, action) {
  state = {...state, isJump: false, loading: action.loading};
  switch (action.type) {
    case MODIFY:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        result: action.result,
        user: null,
        isJump: true
      }
    case MODIFY_FAILURE:
      return {
        ...state,
        result: null
      }
    default:
      return state
  }
}
