import {
  ORDER_LOGISTICS_GET
} from '../../../../../static/apiAlias'

const VIEW = 'logisDetail/VIEW';
const VIEW_SUCCESS = 'logisDetail/VIEW_SUCCESS';
const VIEW_FAILURE = 'logisDetail/VIEW_FAILURE';

/**
 * 单条查看
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(ORDER_LOGISTICS_GET, params,{'hasMsg' : true})
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
