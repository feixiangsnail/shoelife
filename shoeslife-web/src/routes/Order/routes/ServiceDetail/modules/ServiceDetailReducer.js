import {
  ADMIN_AFTER_SALE_GET
} from '../../../../../static/apiAlias'

//根据AfterSaleid查询单个售后服务单
const VIEW = 'serviceDetail/VIEW';
const VIEW_SUCCESS = 'serviceDetail/VIEW_SUCCESS';
const VIEW_FAILURE = 'serviceDetail/VIEW_FAILURE';
/**
 * 根据AfterSaleid查询单个售后服务单
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ADMIN_AFTER_SALE_GET + params, {'hasMsg': true})
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
