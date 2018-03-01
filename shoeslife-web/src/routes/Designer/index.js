export default (store) => ({
  breadcrumbName: "",
  path: 'designer',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Dynamic').default(store),
        require('./routes/Record').default(store),
      ])
    })
  }
})
