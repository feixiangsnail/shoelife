 export default (store) => ({
  breadcrumbName: "用户信息",
  path: 'infor/:id(/:wx)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const infor = require('./containers/Infor').default
      const reducer = require('./modules/InforReducer').default
      store.injectReducer({ key: 'infor', reducer })
      next(null, infor)
    })
  }
})
