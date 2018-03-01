export default (store) => ({
  breadcrumbName: "广告位编辑",
  path: 'editSpace',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const editSpace = require('./containers/EditSpace').default
      const reducer = require('./modules/EditSpaceReducer').default

      store.injectReducer({key: 'editSpace', reducer})

      next(null, editSpace)
    })
  }
})
