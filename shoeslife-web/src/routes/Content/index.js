/**
 * index.js
 * @date Created on 2016/11/25
 * @author Jamie
 *
 */
export default (store) => ({
  breadcrumbName: "",
  path: 'content',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/List').default(store),
        require('./routes/Square').default(store),
        require('./routes/Theme').default(store),
        require('./routes/Collect').default(store),
      ])
    })
  }
})
