 export default (store) => ({
  breadcrumbName: "IOS",
  path: 'iosAdd(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const iosAdd = require('./containers/IosAdd').default
      const reducer = require('./modules/IosAddReducer').default

      store.injectReducer({ key: 'iosAdd', reducer })

      next(null, iosAdd)
    })
  }
})
