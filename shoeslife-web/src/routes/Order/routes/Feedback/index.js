 export default (store) => ({
  breadcrumbName: "订单反馈",
  path: 'feedback',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const feedback = require('./containers/Feedback').default
      const reducer = require('./modules/FeedbackReducer').default

      store.injectReducer({ key: 'feedback', reducer })

      next(null, feedback)
    })
  }
})
