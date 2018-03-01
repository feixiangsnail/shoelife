export default (store) => ({
  breadcrumbName: "H5专题页",
  path: 'topic',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const topic = require('./containers/Topic').default
      const reducer = require('./modules/TopicReducer').default

      store.injectReducer({key: 'topic', reducer})

      next(null, topic)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Edit').default(store)
      ])
    })
  }
})
