/**
 * index.js
 * @date Created on 2016/11/25
 * @author Jamie
 *
 */
export default (store) => ({
  breadcrumbName: "",
  path: 'operation',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Category').default(store),
        require('./routes/Upgrade').default(store),
        require('./routes/System').default(store),
        require('./routes/Permis').default(store),
      ])
    })
  }
})
