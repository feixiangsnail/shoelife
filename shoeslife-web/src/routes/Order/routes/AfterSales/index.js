 export default (store) => ({
  breadcrumbName: "售后服务",
  path: 'sales',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const afterSales = require('./containers/AfterSales').default
      const reducer = require('./modules/AfterSalesReducer').default

      store.injectReducer({ key: 'afterSales', reducer })

      next(null, afterSales)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/UpdDeli').default(store),
         require('./routes/Refuse').default(store),
       ])
     })
   }
})
