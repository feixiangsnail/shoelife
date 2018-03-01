 export default (store) => ({
  breadcrumbName: "广场动态",
  path: 'square',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const square = require('./containers/Square').default
      const reducer = require('./modules/SquareReducer').default

      store.injectReducer({ key: 'square', reducer })

      next(null, square)
    })
  }
})
