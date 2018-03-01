 export default (store) => ({
  breadcrumbName: "领用详情",
  path: 'vList(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const vList = require('./containers/VList').default
      const reducer = require('./modules/VListReducer').default

      store.injectReducer({ key: 'vList', reducer })

      next(null, vList)
    })
  }
})
