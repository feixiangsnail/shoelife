 export default (store) => ({
  breadcrumbName: "配置命名规范",
  path: 'notate',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const notate = require('./containers/Notate').default
      const reducer = require('./modules/NotateReducer').default

      store.injectReducer({ key: 'notate', reducer })

      next(null, notate)
    })
  }
})
