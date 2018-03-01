 export default (store) => ({
  breadcrumbName: "ForgotPassword",
  path: 'forgpas',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const forgotPassword = require('./containers/ForgotPassword').default
      const reducer = require('./modules/ForgotPasswordReducer').default
      store.injectReducer({ key: 'forgotPassword', reducer })
      next(null, forgotPassword)
    })
  }
})
