import {
  EDITOR_APPLAY_LIST,
  EDITOR_APPLAY_DELELTE,
  EDITOR_APPLAY_REFUSE,
  EDITOR_APPLAY_REVOKE,
  EDITOR_APPLAY_PASS,
} from '../../../../../static/apiAlias'

//主编列表
const QUERY = 'list/QUERY';
const QUERY_SUCCESS = 'list/QUERY_SUCCESS';
const QUERY_FAILURE = 'list/QUERY_FAILURE';

const DELETE = 'list/DELETE';
const DELETE_SUCCESS = 'list/DELETE_SUCCESS';
const DELETE_FAILURE = 'list/DELETE_FAILURE';

const REFUSE = 'list/REFUSE';
const REFUSE_SUCCESS = 'list/REFUSE_SUCCESS';
const REFUSE_FAILURE = 'list/REFUSE_FAILURE';

const REVOKE = 'list/REVOKE';
const REVOKE_SUCCESS = 'list/REVOKE_SUCCESS';
const REVOKE_FAILURE = 'list/REVOKE_FAILURE';

const PASS = 'list/PASS';
const PASS_SUCCESS = 'list/PASS_SUCCESS';
const PASS_FAILURE = 'list/PASS_FAILURE';

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
    promise: (client) => client.post(EDITOR_APPLAY_LIST, params, {'hasMsg': true})
  }
}

/**
 * 删除
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post(EDITOR_APPLAY_DELELTE + params)
  }
}

export function refuseItem(params) {
  return {
    types: [REFUSE, REFUSE_SUCCESS, REFUSE_FAILURE],
    promise: (client) => client.post(EDITOR_APPLAY_REFUSE + params)
  }
}


export function revokeItem(params) {
  return {
    types: [REVOKE, REVOKE_SUCCESS, REVOKE_FAILURE],
    promise: (client) => client.post(EDITOR_APPLAY_REVOKE + params)
  }
}

export function passItem(params) {
  return {
    types: [PASS, PASS_SUCCESS, PASS_FAILURE],
    promise: (client) => client.post(EDITOR_APPLAY_PASS + params)
  }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
switch (action.type) {
  case QUERY:
  case DELETE:
  case REFUSE:
  case REVOKE:
  case PASS:
    return {
      ...state
    }
  case QUERY_SUCCESS:
    return {
      ...state,
      result: action.result
    }
  case QUERY_FAILURE:
    return {
      ...state
    }
  case DELETE_SUCCESS:
    return {
      ...state,
      delResult: action.result
    }
  case DELETE_FAILURE:
    return {
      ...state
    }
  case REFUSE_SUCCESS:
    return {
      ...state,
      refuseResult: action.result
    }
  case REFUSE_FAILURE:
    return {
      ...state
    }
  case REVOKE_SUCCESS:
    return {
      ...state,
      revokeResult: action.result
    }
  case REVOKE_FAILURE:
    return {
      ...state
    }
  case PASS_SUCCESS:
    return {
      ...state,
      passResult: action.result
    }
  case PASS_FAILURE:
    return {
      ...state
    }
  default:
    return state
}

}
