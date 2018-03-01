 export default (store) => ({
  breadcrumbName: "材料编辑",
  path: 'editMateri(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editMateri = require('./containers/EditMateri').default
      const reducer = require('./modules/EditMateriReducer').default

      store.injectReducer({ key: 'editMateri', reducer })

      next(null, editMateri)
    })
  }
})
