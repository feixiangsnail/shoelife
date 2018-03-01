 export default (store) => ({
  breadcrumbName: "鞋款",
  path: 'shoe/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const shoe = require('./containers/Shoe').default
      const reducer = require('./modules/ShoeReducer').default
      store.injectReducer({ key: 'shoe', reducer })
      next(null, shoe)
    })
  }
})
