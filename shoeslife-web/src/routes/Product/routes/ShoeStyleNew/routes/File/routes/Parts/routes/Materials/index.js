 export default (store) => ({
  breadcrumbName: "添加用料",
  path: 'mater/:mid',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const materials = require('./containers/Materials').default
      const reducer = require('./modules/MaterialsReducer').default

      store.injectReducer({ key: 'materials', reducer })
      next(null, materials)
    })
  }
})
