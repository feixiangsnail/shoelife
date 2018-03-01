 export default (store) => ({
  breadcrumbName: "楦头编辑",
  path: 'editLast(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editLast = require('./containers/EditLast').default
      const reducer = require('./modules/EditLastReducer').default

      store.injectReducer({ key: 'editLast', reducer })

      next(null, editLast)
    })
  }
})
