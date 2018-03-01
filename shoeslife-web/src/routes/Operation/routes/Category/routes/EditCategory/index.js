 export default (store) => ({
  breadcrumbName: "分类编辑",
  path: 'editCategory(/:id/:type)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editCategory = require('./containers/EditCategory').default
      const reducer = require('./modules/EditCategoryReducer').default

      store.injectReducer({ key: 'editCategory', reducer })

      next(null, editCategory)
    })
  }
})
