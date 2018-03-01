export default (store) => ({
  breadcrumbName: "账号管理",
  path: 'account',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const account = require('./containers/Account').default
      const reducer = require('./modules/AccountReducer').default
      store.injectReducer({key: 'account', reducer})
      next(null, account)
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
