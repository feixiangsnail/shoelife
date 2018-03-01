export default (store) => ({
  breadcrumbName: "",
  path: 'market',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Advertise').default(store),
        require('./routes/Topic').default(store),
        require('./routes/Voucher').default(store),
      ])
    })
  }
})
