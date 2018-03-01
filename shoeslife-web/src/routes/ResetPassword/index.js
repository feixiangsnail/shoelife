 export default (store) => ({
  breadcrumbName: "ResetPassword",
  path: 'reset/:code/:email',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const resetPassword = require('./containers/ResetPassword').default
      const reducer = require('./modules/ResetPasswordReducer').default

      store.injectReducer({ key: 'resetPassword', reducer })

      next(null, resetPassword)
    })
  }
})
