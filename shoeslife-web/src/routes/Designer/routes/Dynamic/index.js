 export default (store) => ({
  breadcrumbName: "设计师动态",
  path: 'dynamic',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const dynamic = require('./containers/Dynamic').default
      const reducer = require('./modules/DynamicReducer').default
      store.injectReducer({ key: 'dynamic', reducer })
      next(null, dynamic)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store)
       ])
     })
   }
})
