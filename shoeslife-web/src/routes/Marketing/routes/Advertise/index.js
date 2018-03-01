export default (store) => ({
  breadcrumbName: "广告管理",
  path: 'advert',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const advertise = require('./containers/Advertise').default
      const reducer = require('./modules/AdvertiseReducer').default

      store.injectReducer({key: 'advertise', reducer})

      next(null, advertise)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Edit').default(store),
        require('./routes/EditSpace').default(store),
      ])
    })
  }
})
