import {
  USERS_FORGOT_PASS
} from '../../../static/apiAlias';

const ADD = 'forgotPassword/ADD';
const ADD_SUCCESS = 'forgotPassword/ADD_SUCCESS';
const ADD_FAILURE = 'forgotPassword/ADD_FAILURE';

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
    promise: (client) => client.post(USERS_FORGOT_PASS, params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading,isOk:false};
  switch (action.type) {
    case ADD:
        return {
            ...state
        }
    case ADD_SUCCESS:
        return {
            ...state,
            loading : action.loading,
            result: action.result,
            isOk:true
        }
    case ADD_FAILURE:
        return {
            ...state
        }

    default:
      return state
  }
}
