 export default (store) => ({
  breadcrumbName: "主编申请",
  path: 'editorApply',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const list = require('./containers/EditorApply').default
      const reducer = require('./modules/EditorApplyReducer').default
      store.injectReducer({ key: 'editorApply', reducer })
      next(null, list)
    })
  }
})
