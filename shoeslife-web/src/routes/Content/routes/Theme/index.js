export default (store) => ({
  breadcrumbName: "主题系列专题",
  path: 'theme',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const theme = require('./containers/Theme').default
      const reducer = require('./modules/ThemeReducer').default

      store.injectReducer({key: 'theme', reducer})

      next(null, theme)
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
