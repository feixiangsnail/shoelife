 export default (store) => ({
  breadcrumbName: "鞋材中心",
  path: 'materialNew',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const material = require('./containers/Material').default
      const reducer = require('./modules/MaterialReducer').default
      store.injectReducer({ key: 'materialNew', reducer })
      next(null, material)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/EditLast').default(store),
         require('./routes/EditMateri').default(store)
       ])
     })
   }
})
