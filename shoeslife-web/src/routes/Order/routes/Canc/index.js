 export default (store) => ({
  breadcrumbName: "已取消订单",
  path: 'canc',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const canc = require('./containers/Canc').default
      const reducer = require('./modules/CancReducer').default

      store.injectReducer({ key: 'canc', reducer })

      next(null, canc)
    })
  }
})
