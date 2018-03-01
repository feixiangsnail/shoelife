import {
  ADMIN_AFTER_SALE_LIST,
  ADMIN_AFTER_SALE_UPD,
  ADMIN_AFTER_SALE_CONFIRM,
} from '../../../../../static/apiAlias'

//根据AfterSale对象查询企业售后服务单  列表
const QUERY = 'afterSales/QUERY';
const QUERY_SUCCESS = 'afterSales/QUERY_SUCCESS';
const QUERY_FAILURE = 'afterSales/QUERY_FAILURE';
//根据AfterSale对象更新售后服务单  拒绝/接受/更新状态
const MODIFY = 'afterSales/MODIFY';
const MODIFY_SUCCESS = 'afterSales/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'afterSales/MODIFY_FAILURE';
//根据AfterSale对象更新售后服务单  确认收货
const ADD = 'afterSales/ADD';
const ADD_SUCCESS = 'afterSales/ADD_SUCCESS';
const ADD_FAILURE = 'afterSales/ADD_FAILURE';
/**
 * 根据AfterSale对象查询企业售后服务单
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post(ADMIN_AFTER_SALE_LIST, params, {'hasMsg': true})
  }
}
/**
 * 根据AfterSale对象更新售后服务单  拒绝/接受/更新状态
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post(ADMIN_AFTER_SALE_UPD, params)
  }
}
/**
 * 根据AfterSale对象更新售后服务单  确认收货
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post(ADMIN_AFTER_SALE_CONFIRM, params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isGet: false};
  switch (action.type) {
    case ADD:
    case MODIFY:
    case QUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        addResult: action.result,
        isGet: true
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: action.result,
        isGet: true
      }
    case MODIFY_FAILURE:
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
    default:
      return state
  }
}
