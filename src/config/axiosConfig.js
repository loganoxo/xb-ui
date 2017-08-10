/**
 * Created by ycb on 2017/4/25.
 */
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
// import {baseUrl} from './env'

axios.defaults.timeout = 100000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  if (error.response.status === 401) {
    store.commit({ type: 'OUT_LOGIN'});
    router.push({name: 'login'});
  }
  console.error("请求异常或网络异常");
  return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    // url = baseUrl + url;
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

