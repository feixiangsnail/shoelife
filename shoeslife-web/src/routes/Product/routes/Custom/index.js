 export default (store) => ({
  breadcrumbName: "用户定制",
  path: 'custom',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const custom = require('./containers/Custom').default
      const reducer = require('./modules/CustomReducer').default

      store.injectReducer({ key: 'custom', reducer })

      next(null, custom)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Detail').default(store),
       ])
     })
   }
})
