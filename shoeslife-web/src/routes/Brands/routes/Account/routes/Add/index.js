 export default (store) => ({
  breadcrumbName: "添加管理员",
  path: 'add',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const add = require('./containers/Add').default
      const reducer = require('./modules/AddReducer').default
      store.injectReducer({ key: 'add', reducer })
      next(null, add)
    })
  }
})
