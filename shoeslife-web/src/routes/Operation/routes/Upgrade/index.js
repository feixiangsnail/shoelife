 export default (store) => ({
  breadcrumbName: "软件升级",
  path: 'upgrade',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const upgrade = require('./containers/Upgrade').default
      const reducer = require('./modules/UpgradeReducer').default

      store.injectReducer({ key: 'upgrade', reducer })

      next(null, upgrade)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Upgrade').default(store),
         require('./routes/AnAdd').default(store),
         require('./routes/IosAdd').default(store),
       ])
     })
   }
})
