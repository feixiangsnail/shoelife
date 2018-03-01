export default (store) => ({
  breadcrumbName: "印记方案",
  path: 'editStamp(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editStamp = require('./containers/EditStamp').default
      const reducer = require('./modules/EditStampReducer').default
      store.injectReducer({key: 'editStamp', reducer})

      next(null, editStamp)
    })
  }
})
