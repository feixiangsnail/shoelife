 export default (store) => ({
  breadcrumbName: "<%= pascalEntityName %>",
  path: '<%= camelEntityName %>',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const <%= camelEntityName %> = require('./containers/<%= pascalEntityName %>').default
      const reducer = require('./modules/<%= pascalEntityName %>Reducer').default

      store.injectReducer({ key: '<%= camelEntityName %>', reducer })

      next(null, <%= camelEntityName %>)
    })
  }
})
