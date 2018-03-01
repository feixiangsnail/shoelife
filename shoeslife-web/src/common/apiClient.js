import axios from 'axios'
import {message} from 'antd'
import store from 'store2';

// https://github.com/mzabriskie/axios#creating-an-instance
const axiosOptions = {
  timeout: 6000,
  params: {
    // access_token: 'eb97d2e8cf0821814ebc731796440bc629b1f0bd'
  }
};
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
const instance = axios.create(axiosOptions)

instance.interceptors.request.use(function (config) {
  if (typeof config.data === 'string') {
    config.data = JSON.parse(config.data);
    for (let item in config.data) {
      let prop = config.data[item];
      if (prop === null || prop === 'undefined') {
        console.warn(`REQUEST => 删除参数：${item}:${prop}`);
        delete config.data[item];
      }
    }
  }else{
    if(config.method == 'post'){
      config.data={};
    }
  }
  config.data = JSON.stringify(config.data);
  return config;
}, function (error) {
  console.error('XHR REQUEST ERROR :', error);
  return error
});

instance.interceptors.response.use(function (res) {
  if(res.data.returncode == 0){
      if(!res.config.hasMsg){
          if(!res.config.msgStatus){
              //message.success(res.data.message);
          }else{
              message.error(res.data.message || '服务器开小差了，请稍后重试')
          }
      }else{
          if (res.config.hasMsg !== true){
              if(!res.config.msgStatus){
                  //message.success(res.config.hasMsg);
              }else{
                  message.error(res.config.hasMsg || '服务器开小差了，请稍后重试');
              }
          }
      }
  }else{
      message.error(res.data.message || '服务器开小差了，请稍后重试');
  }
  return res.data;
}, function (error) {
  //console.error('XHR RESPONSE ERROR :', error);
  message.error(res.data.message || '服务器开小差了，请稍后重试');
  /*if(error.data){
      error.data.returncode !== "TIMEOUT_SESSION" &&  message.error('服务错误：［'+ error.data +'] 错误码：［'+error.status+ ']', 2);
  }else{
      message.error('请求超时：［'+ error.message +'] 错误码：［'+error.returncode+ ']', 2);
  }
  return error.data*/
})

export default instance
