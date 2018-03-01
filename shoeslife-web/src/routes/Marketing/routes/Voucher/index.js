export default (store) => ({
  breadcrumbName: "代金卷管理",
  path: 'voucher',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const voucher = require('./containers/Voucher').default
      const reducer = require('./modules/VoucherReducer').default

      store.injectReducer({key: 'voucher', reducer})

      next(null, voucher)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Edit').default(store),
        require('./routes/Detail').default(store),
        require('./routes/VList').default(store),
      ])
    })
  }
})
