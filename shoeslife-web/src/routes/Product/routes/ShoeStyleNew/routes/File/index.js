 export default (store) => ({
  breadcrumbName: "款式管理",
  path: 'file/:sid/:stat',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const file = require('./containers/File').default
      const reducer = require('./modules/FileReducer').default
      store.injectReducer({ key: 'file', reducer })
      next(null, file)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/EditHeel').default(store),
         require('./routes/EditVamp').default(store),
         require('./routes/EditStamp').default(store),
         require('./routes/Parts').default(store),
       ])
     })
   }
})
