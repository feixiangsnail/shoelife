import Vue from 'vue';
import router from './routes.js';
import store from './store.js';
import request from './common/request';
import '../assets/css/base.scss';

Vue.prototype.$http = request;
//Vue.prototype.$img = "http://shoelives-qc.oss-cn-beijing.aliyuncs.com/";
Vue.prototype.$img = "http://shoelives.oss-cn-shenzhen.aliyuncs.com/";
var app = new Vue({
    router,
    store
}).$mount('#app');

//根据不同设备设置字体大小

let elWidth = document.documentElement.clientWidth;
if (elWidth >= 768) {
    elWidth = 768;
    document.body.style.margin = '0 auto';
    document.body.style.width = "768px";
}
document.documentElement.style.fontSize = elWidth / 15 + 'px';


//百度统计
var _hmt = _hmt || [];
(function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0272121c7925ef2fe2d17ce65c8d0622";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
})();