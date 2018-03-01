 export default (store) => ({
  breadcrumbName: "参数配置",
  path: 'system',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const system = require('./containers/System').default
      const reducer = require('./modules/SystemReducer').default
      store.injectReducer({ key: 'system', reducer })
      next(null, system)
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
