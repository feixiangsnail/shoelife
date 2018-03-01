import {is_phone} from './utils.js';
window.webkit = window.webkit || {};
let URL = window.messageHandlers ||window.webkit.messageHandlers;
var isApp = function(){
    if(!URL) return false;
    if(!URL.appHome) return false;
    if(window.messageHandlers)
        return 'android'; 
    return 'ios';
}();
var notice = (name)=>{
    return (file)=>{
        if(!URL) return;
        if(window.messageHandlers)
            return URL[name](file);
        URL[name].postMessage(file);
    };
}
let App = {
    is:isApp,
    login:notice('appLogin'),                  //打开登录
    home:notice('appHome'),                 //打开首页
    bind:notice('appBind'),                    //打开绑定手机号
    diy:notice('appDIY'),                      //打开设计
    setShareArgs:notice('setShareArgs'),    //设置分享参数
    onComplete:notice('onComplete'),        //成功后回调参数
}
export default App;