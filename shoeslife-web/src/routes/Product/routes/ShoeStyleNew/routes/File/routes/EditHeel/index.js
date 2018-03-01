export default (store) => ({
  breadcrumbName: "款式-鞋跟",
  path: 'editHeel(/:cid)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editHeel = require('./containers/EditHeel').default
      const reducer = require('./modules/EditHeelReducer').default

      store.injectReducer({key: 'editHeel', reducer})

      next(null, editHeel)
    })
  }
})
