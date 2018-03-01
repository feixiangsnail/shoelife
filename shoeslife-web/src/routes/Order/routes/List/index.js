 export default (store) => ({
  breadcrumbName: "订单管理",
  path: 'list',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const list = require('./containers/List').default
      const reducer = require('./modules/ListReducer').default
      store.injectReducer({ key: 'list', reducer })
      next(null, list)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/UpdDeli').default(store),
         require('./routes/Detail').default(store)
       ])
     })
   }
})
