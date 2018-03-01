import {
  ORDER_VOUCHER_GET
} from '../../../../../../../static/apiAlias'

//代金券信息
const VIEW = 'infor/VIEW';
const VIEW_SUCCESS = 'infor/VIEW_SUCCESS';
const VIEW_FAILURE = 'infor/VIEW_FAILURE';
/**
 * 代金券信息
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

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
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
