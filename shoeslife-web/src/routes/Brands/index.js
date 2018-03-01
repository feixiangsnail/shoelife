export default (store) => ({
  breadcrumbName: "",
  path: 'brand',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Financial').default(store),
        require('./routes/List').default(store),
        require('./routes/Account').default(store),
        require('./routes/MaterialNew').default(store),
      ])
    })
  }
})
