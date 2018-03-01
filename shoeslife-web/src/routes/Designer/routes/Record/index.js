 export default (store) => ({
  breadcrumbName: "设计师履历",
  path: 'record',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const record = require('./containers/Record').default
      const reducer = require('./modules/RecordReducer').default

      store.injectReducer({ key: 'record', reducer })

      next(null, record)
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
