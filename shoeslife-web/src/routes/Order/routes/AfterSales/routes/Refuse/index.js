 export default (store) => ({
  breadcrumbName: "拒绝理由",
  path: 'refuse/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const refuse = require('./containers/Refuse').default
      const reducer = require('./modules/RefuseReducer').default
      store.injectReducer({ key: 'refuse', reducer })
      next(null, refuse)
    })
  }
})
