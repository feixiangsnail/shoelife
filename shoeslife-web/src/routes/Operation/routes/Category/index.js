 export default (store) => ({
  breadcrumbName: "分类管理",
  path: 'category',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const category = require('./containers/Category').default
      const reducer = require('./modules/CategoryReducer').default

      store.injectReducer({ key: 'category', reducer })

      next(null, category)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/EditCategory').default(store),
       ])
     })
   }
})
