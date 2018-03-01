import {
  DICT_IS_NULL,
} from 'static/apiAlias'

//检查
const IS_DICT = 'file/IS_DICT';
const IS_DICT_SUCCESS = 'file/IS_DICT_SUCCESS';
const IS_DICT_FAILURE = 'file/IS_DICT_FAILURE';

/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function isDict() {
  return {
    types: [IS_DICT, IS_DICT_SUCCESS, IS_DICT_FAILURE],
    promise: (client) => client.post(DICT_IS_NULL , {'hasMsg': true})
  }
}

export default function reducer(state = {result: []}, action) {
  state = {...state, loading: action.loading,isOK:false,isMark:false};
  switch (action.type) {
    case IS_DICT:
    case IS_DICT_SUCCESS:
      return {
        ...state,
        result:{is:action.result}
      }
    case IS_DICT_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
