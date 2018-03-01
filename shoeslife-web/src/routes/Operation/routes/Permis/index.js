 export default (store) => ({
  breadcrumbName: "用户与权限",
  path: 'permis',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const permis = require('./containers/Permis').default
      const reducer = require('./modules/PermisReducer').default
      store.injectReducer({ key: 'permis', reducer })
      next(null, permis)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store),
         require('./routes/Add').default(store),
       ])
     })
   }
})
