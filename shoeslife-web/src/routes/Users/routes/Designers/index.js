 export default (store) => ({
  breadcrumbName: "设计师管理",
  path: 'designers',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const designers = require('./containers/Designers').default
      const reducer = require('./modules/DesignersReducer').default

      store.injectReducer({ key: 'designers', reducer })

      next(null, designers)
    })
  }
})
