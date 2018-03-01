import {
  ORDER_GET
} from '../../../../../static/apiAlias'

//查询订单详情
const VIEW = 'infor/VIEW';
const VIEW_SUCCESS = 'infor/VIEW_SUCCESS';
const VIEW_FAILURE = 'infor/VIEW_FAILURE';
/**
 * 查询订单详情
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ORDER_GET + params, {'hasMsg': true})
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
            ...state,
            result:[]
        }
    default:
      return state
  }
}
