// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/containers/CoreLayout'
import Home from './Home'
import {load, isAuthed} from '../store/auth'
import Login from './Login'
import PubPassword from './PubPassword'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import NotFound from './NotFound'
import React from 'react'

export const createRoutes = (store) => {
  const requireLogin = (nextState, replace, cb) => {
    /**
     * 权限检查
     * 从 state 里面获取 auth 数据,如果有 user 数据则说明已经登录
     * 未登录的 统一 定向到 login 页面
     */
    function checkAuth() {
      const {auth} = store.getState()
      if (!auth.user) {
        replace('/login')
      }
      cb();
    }

    /**
     * 检查是否已经登录
     *
     **/
    if (!isAuthed(store.getState())) {
      // 如果没有登录则执行 load 方法 然后检测权限
      store.dispatch(load()).then(checkAuth)
    } else {
      checkAuth()
    }
  }

  /**
   * routes that need auth
   */
  const requireLoginRoutes = {
    breadcrumbName: "首页",
    path: '/',
    component: CoreLayout,
    indexRoute: Home(store),
    // 取消注释开启登录检查
    //onEnter: requireLogin,
    getChildRoutes(location, next) {
      require.ensure([], (require) => {
        let asyncComponents = [
          require('./Brands').default(store),
          require('./Product').default(store),
          require('./Order').default(store),
          require('./Users').default(store),
          require('./Operation').default(store),
          require('./Content').default(store),
          require('./Marketing').default(store),
          require('./Designer').default(store),
        ];
        /*if (__DEV__) {
          asyncComponents.push(require('./Docs').default(store))
        }*/
        next(null, asyncComponents)
      })
    }
  }

  /**
   * other routes include login register error page
   * these pages don't need login so we should split them
   */
  const otherRoutes = [
    Login(store),
    PubPassword(store),
    ForgotPassword(store),
    ResetPassword(store),
    NotFound
  ]

  /**
   * root component
   */
  const rootComponent = ({children}) => {
    return <div style={{height: '100%'}}>{children}</div>
  }
  /** final routes */
  const routes = {
    component: rootComponent,
    childRoutes: [
      requireLoginRoutes,
      ...otherRoutes
    ]
  }
  return routes
}

export default createRoutes
