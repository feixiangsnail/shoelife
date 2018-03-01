export default (store) => ({
  breadcrumbName: "",
  path: 'product',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Custom').default(store),
        require('./routes/ShoeStyleNew').default(store),
        require('./routes/ShoeRelated').default(store),
      ])
    })
  }
})
