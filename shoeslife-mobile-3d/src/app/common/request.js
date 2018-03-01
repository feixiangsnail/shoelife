/**
 * request.js
 * @date Created on 2017/5/12
 * @author Jamie
 *
 */
import axios from 'axios';
import Vue from 'vue';
import { Toast,Indicator } from 'mint-ui';
import Urls from './requestUrl';
// 添加一个请求拦截器
let deposit = [];
axios.interceptors.request.use(config => {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// 添加一个响应拦截器
axios.interceptors.response.use(response => {
    deposit[response.config.url] = false;
    if(response.data.returncode){
        if(response.config.isMessage)
            Toast({
                message: response.data.message,
                duration: 500
            });
        if(response.data.returncode==3)
            return [{isSign:true}];
        return Promise.reject(response.data);
    }
    return response.data.data
}, function (error) {
    return Promise.reject(error)
})
export default {
    g (u, params,config={isMessage:true}) {
        let url;
        if(typeof u == 'object' ){
            if( typeof u.id !='undefined' ) url = Urls[u.name]+u.id;
            else url = Urls[u.name];
        } 
        else url = Urls[u];
        
        if(deposit[url]) return;
        deposit[url] = true;
        return axios({
            method: 'get',
            url:  url,
            isMessage:config.isMessage,
            params,
            withCredentials: true,
            timeout: 30000
        })
    },
    p (u, data,config={isMessage:true}) {
        let url;
        if(typeof u == 'object' ){
            if( typeof u.id !='undefined' ) url = Urls[u.name]+u.id;
            else url = Urls[u.name];
        }
        else url = Urls[u];
        return axios({
            method: 'post',
            url: url,
            data: data,
            timeout: 30000,
            isToast:config.isToast,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }
}
