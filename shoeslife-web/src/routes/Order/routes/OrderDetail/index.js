 export default (store) => ({
  breadcrumbName: "订单信息",
  path: 'orderDetail/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const orderDetail = require('./containers/OrderDetail').default
      const reducer = require('./modules/OrderDetailReducer').default
      store.injectReducer({ key: 'orderDetail', reducer })
      next(null, orderDetail)
    })
  }
})
