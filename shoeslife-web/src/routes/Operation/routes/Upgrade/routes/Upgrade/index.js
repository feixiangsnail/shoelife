 export default (store) => ({
  breadcrumbName: "升级方式",
  path: 'upgrade(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const upgrade = require('./containers/Upgrade').default
      const reducer = require('./modules/UpgradeReducer').default
      store.injectReducer({ key: 'upgrade', reducer })
      next(null, upgrade)
    })
  }
})
