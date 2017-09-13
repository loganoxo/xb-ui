/**
 * Created by ycb on 2017/4/25.
 */
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import LoadingBar from 'iview/src/components/loading-bar'

axios.defaults.timeout = 100000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
    LoadingBar.start();
  }
  return config;
}, (error) => {
  LoadingBar.finish();
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  LoadingBar.finish();
  return res;
}, (error) => {
  LoadingBar.finish();
  if (error.response.status === 401) {
    store.commit( 'OUT_LOGIN');
    if(store.state.logInAuthority){
      router.push({name: 'login'});
    }
  }
  return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

