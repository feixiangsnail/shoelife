import {
  VERSION_GET,
  VERSION_UPGRADE,
} from '../../../../../../../static/apiAlias'
//单条详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

//修改
const UPGRADE = 'edit/UPGRADE';
const UPGRADE_SUCCESS = 'edit/UPGRADE_SUCCESS';
const UPGRADE_FAILURE = 'edit/UPGRADE_FAILURE';

/**
 * 设置升级方式
 *
 * @export
 * @param params (description)
 * @returns (description)
 *
 */
export function upgradeItem(params) {
  return {
    types: [UPGRADE, UPGRADE_SUCCESS, UPGRADE_FAILURE],
    promise: (client) => client.post(VERSION_UPGRADE, params)
  }
}

export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post(VERSION_GET+"/"+ params,{'hasMsg': true})
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading, isJump: false};
  switch (action.type) {
    case UPGRADE:
    case VIEW:
      return {
        ...state
      }
    case UPGRADE_SUCCESS:
      return {
        ...state,
        upgradeResult: action.result,
        loading: action.loading,
        isJump: true
      }
    case UPGRADE_FAILURE:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        result: action.result,
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
