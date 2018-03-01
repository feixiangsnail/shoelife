export default (store) => ({
  breadcrumbName: "部位&装饰&用料",
  path: 'parts',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const parts = require('./containers/Parts').default
      const reducer = require('./modules/PartsReducer').default
      store.injectReducer({key: 'parts', reducer})
      next(null, parts)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Materials').default(store),
      ])
    })
  }
})
