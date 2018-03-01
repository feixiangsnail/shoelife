 export default (store) => ({
  breadcrumbName: "代金券编辑",
  path: 'edit(/:id/:type)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const edit = require('./containers/Edit').default
      const reducer = require('./modules/EditReducer').default

      store.injectReducer({ key: 'edit', reducer })

      next(null, edit)
    })
  }
})
