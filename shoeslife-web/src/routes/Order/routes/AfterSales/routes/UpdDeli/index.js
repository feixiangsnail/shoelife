 export default (store) => ({
  breadcrumbName: "更新状态",
  path: 'updDeli/:key(/:type)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const updDeli = require('./containers/UpdDeli').default
      const reducer = require('./modules/UpdDeliReducer').default
      store.injectReducer({ key: 'updDeli', reducer })
      next(null, updDeli)
    })
  }
})
