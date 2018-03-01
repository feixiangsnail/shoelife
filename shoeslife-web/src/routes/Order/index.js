export default (store) => ({
  breadcrumbName: "",
  path: 'order',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/List').default(store),
        require('./routes/AfterSales').default(store),
        require('./routes/OrderDetail').default(store),
        require('./routes/ServiceDetail').default(store),
        require('./routes/LogisDetail').default(store),
        require('./routes/Feedback').default(store),
        require('./routes/Canc').default(store),
      ])
    })
  }
})
