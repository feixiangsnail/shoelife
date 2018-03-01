export default (store) => ({
  breadcrumbName: "",
  path: 'users',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/List').default(store),
        require('./routes/Feedback').default(store),
        require('./routes/Infor').default(store),
        require('./routes/EditorApply').default(store),
        require('./routes/Designers').default(store),
      ])
    })
  }
})
