 export default (store) => ({
  breadcrumbName: "Android",
  path: 'anAdd(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const anAdd = require('./containers/AnAdd').default
      const reducer = require('./modules/AnAddReducer').default

      store.injectReducer({ key: 'anAdd', reducer })

      next(null, anAdd)
    })
  }
})
