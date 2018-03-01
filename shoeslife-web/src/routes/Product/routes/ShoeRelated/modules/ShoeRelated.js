import {
  GET_3D_SHOE_RELATIVE,
  ADD_BOUND_UP,
  UN_BIND,
} from 'static/apiAlias';

const QUERY = 'shoe/QUERY';
const QUERY_SUCCESS = 'shoe/QUERY_SUCCESS';
const QUERY_FAILURE = 'shoe/QUERY_FAILURE';

const ADD = 'shoe/ADD';
const ADD_SUCCESS = 'shoe/ADD_SUCCESS';
const ADD_FAILURE = 'shoe/ADD_FAILURE';

const UN = 'shoe/UN';
const UN_SUCCESS = 'shoe/UN_SUCCESS';
const UN_FAILURE = 'shoe/UN_FAILURE';

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
    promise: (client) => client.post(GET_3D_SHOE_RELATIVE, params,{'hasMsg' : true})
  }
}
/**
 * 关联款式跟高
 *
 * @export
 * @param params {list:array,type:number}
 * @returns (description)
 */
export function addBound(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADD_BOUND_UP, params,{'hasMsg' : true})
  }
}
/**
 * 关联款式跟高
 *
 * @export
 * @param params type:number id:string
 * @returns (description)
 */
export function unBound(type,id) {
  return {
    types: [UN, UN_SUCCESS, UN_FAILURE],
    promise: (client) => client.post([UN_BIND,id,'/',type].join(''))
  }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case QUERY:
    case ADD:
    case UN:
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
    case ADD_SUCCESS:
      return {
        ...state,
        bResult:{is:true}
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case UN_SUCCESS:
      return {
        ...state,
        uResult:{is:true}
      }
    case UN_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
