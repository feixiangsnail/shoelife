 export default (store) => ({
  breadcrumbName: "服务号详情",
  path: 'serviceDetail/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const serviceDetail = require('./containers/ServiceDetail').default
      const reducer = require('./modules/ServiceDetailReducer').default
      store.injectReducer({ key: 'serviceDetail', reducer })
      next(null, serviceDetail)
    })
  }
})
