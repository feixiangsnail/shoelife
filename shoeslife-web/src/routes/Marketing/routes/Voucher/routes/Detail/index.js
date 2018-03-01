 export default (store) => ({
  breadcrumbName: "代金券信息",
  path: 'detail(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const detail = require('./containers/Detail').default
      const reducer = require('./modules/DetailReducer').default
      store.injectReducer({ key: 'detail', reducer })
      next(null, detail)
    })
  }
})
