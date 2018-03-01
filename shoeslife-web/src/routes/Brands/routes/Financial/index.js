 export default (store) => ({
  breadcrumbName: "财务中心",
  path: 'financial',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const financial = require('./containers/Financial').default
      const reducer = require('./modules/FinancialReducer').default

      store.injectReducer({ key: 'financial', reducer })

      next(null, financial)
    })
  }
})
