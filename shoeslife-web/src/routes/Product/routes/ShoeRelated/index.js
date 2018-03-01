 export default (store) => ({
   breadcrumbName: "鞋款关联",
   path: 'shoeRelated',
   getComponent(nextState, next) {
     require.ensure([], (require) => {
       const shoeRelated = require('./containers/ShoeRelated').default
       const reducer = require('./modules/ShoeRelated').default
       store.injectReducer({ key: 'shoeRelated', reducer })
       next(null, shoeRelated)
     })
   }
 })
