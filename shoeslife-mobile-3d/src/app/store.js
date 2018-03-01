import Vue from 'vue';
import Vuex from 'vuex';
import {is_weixn} from './common/utils.js';
import modelLoader from './common/modelLoader';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        isSign:false,
        showHeader:true,
        Model:modelLoader
    },
    mutations:{
        upSing(state,config){
            let isWx = is_weixn();
            let url = 'http://wap.shoelives.com/h5/';
            if(isWx){
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2f5e6a483178364a&redirect_uri='+encodeURIComponent(url+'#/'+config.fullPath)+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                return;
            }
            if(typeof config == 'object')
                return state.isSign = config.is;
            state.isSign = config;
        }
    }
});

export default store;