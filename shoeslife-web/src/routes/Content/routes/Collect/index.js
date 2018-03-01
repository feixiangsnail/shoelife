 export default (store) => ({
  breadcrumbName: "鞋款合集",
  path: 'collect',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const collect = require('./containers/Collect').default
      const reducer = require('./modules/CollectReducer').default

      store.injectReducer({ key: 'collect', reducer })

      next(null, collect)
    })
  }
})
