import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({  
    routes: [
        { path: '/', name: 'home',  component:resolve => require(['./home/index.vue'], resolve)},
        // 文章详情页
        { path: '/artical/:id', name: 'artical',  component:resolve => require(['./artical/index.vue'], resolve)},
        //首页
        { path: '/home', name: 'home',  component:resolve => require(['./home/index.vue'], resolve)},
        //鞋款分类
        { path: '/category', name: 'shoeCategory', component: resolve => require(['./shoe/shoeCategory/index.vue'], resolve) },
        //分类列表
        { path: '/shoelist/:id', name: 'shoelist', component: resolve => require(['./shoe/shoelist/index.vue'], resolve) },
        //我的首页
        { path: '/account/index', name: 'account', component: resolve => require(['./account/user.vue'], resolve) },
        //我的设计
        { path: '/account/desgins', name: 'desgins', component: resolve => require(['./account/mydesign/mydesign.vue'], resolve) },
        //我的收藏
        { path: '/account/favorites', name: 'favorites', component: resolve => require(['./account/mycollection/mycollection.vue'], resolve) },
        //我的关注
        { path: '/account/follows', name: 'follows', component: resolve => require(['./account/myinterest/myinterest.vue'], resolve) },
        //设计师主页
        { path: '/designer/:id', name: 'designerHome', component: resolve => require(['./designerHome/index.vue'], resolve) },
        //鞋款详情
        { path: '/shoes/:id', name: 'shoeDetail', component: resolve => require(['./shoe/shoeDetail/index.vue'], resolve) },
        //人气鞋款
        { path: '/tops', name: 'popShoe', component: resolve => require(['./shoe/popShoe/index.vue'], resolve) },
        //个性设计
        { path: '/design/:id/:star', name: 'design', component: resolve => require(['./design/index.vue'], resolve) },
        //用户设计
        { path: '/design/list/:id/:star', name: 'designList', component: resolve => require(['./design/designList/index.vue'], resolve) },
        //设计详情
        { path: '/design/details/:id/:star', name: 'designDetail', component: resolve => require(['./design/designDetail/index.vue'], resolve) },
        // 主编主页
        { path: '/user/:id', name: 'user', component: resolve => require(['./editor/index.vue'], resolve) },
        // 动态详情页
        { path: '/dynamic/:id', name: 'dynamic', component: resolve => require(['./dynamic/index.vue'], resolve) },
        // 广告着陆页
        { path: '/ad/:id/:type', name: 'ad', component: resolve => require(['./adLogin/index.vue'], resolve) },
    ]
});
export default router
