import {
  USERS_BASIC
} from '../../../static/apiAlias';
const VIEW = 'home/VIEW';
const VIEW_SUCCESS = 'home/VIEW_SUCCESS';
const VIEW_FAILURE = 'home/VIEW_FAILURE';

/**
 * 单条查看
 * api-console.platformConsole
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(USERS_BASIC, params,{'hasMsg' : true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case VIEW:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
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
