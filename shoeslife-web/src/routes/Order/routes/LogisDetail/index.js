 export default (store) => ({
  breadcrumbName: "物流进度",
  path: 'logis/:type/:id/:name',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const logisDetail = require('./containers/LogisDetail').default
      const reducer = require('./modules/LogisDetailReducer').default
      store.injectReducer({ key: 'logisDetail', reducer })
      next(null, logisDetail)
    })
  }
})
