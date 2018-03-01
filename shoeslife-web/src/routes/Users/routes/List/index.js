 export default (store) => ({
  breadcrumbName: "注册用户",
  path: 'list',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const list = require('./containers/List').default
      const reducer = require('./modules/ListReducer').default

      store.injectReducer({ key: 'list', reducer })

      next(null, list)
    })
  }
})
