export default (store) => ({
  breadcrumbName: "款式-鞋面",
  path: 'editVamp(/:cid)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editVamp = require('./containers/EditVamp').default
      const reducer = require('./modules/EditVampReducer').default
      store.injectReducer({key: 'editVamp', reducer})

      next(null, editVamp)
    })
  }
})
