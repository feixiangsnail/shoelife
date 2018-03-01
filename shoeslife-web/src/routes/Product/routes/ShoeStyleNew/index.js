 export default (store) => ({
   breadcrumbName: "3d鞋款管理",
   path: 'shoeNew',
   getComponent(nextState, next) {
     require.ensure([], (require) => {
       const ShoeStyleNew = require('./containers/ShoeStyleNew').default
       const reducer = require('./modules/ShoeStyleReducer').default
       store.injectReducer({ key: 'shoeNew', reducer })
       next(null, ShoeStyleNew)
     })
   },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store),
         require('./routes/File').default(store),
         require('./routes/Notate').default(store)
       ])
     })
   }
 })
