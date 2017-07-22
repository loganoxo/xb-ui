/**
 * Created by ycb on 2017/4/25.
 */
import axios from 'axios'
import qs from 'qs'
import {baseUrl} from './env'

axios.defaults.timeout = 100000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log("错误的传参");
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  return res;
}, (error) => {
  console.error("请求异常或网络异常");
  return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    url = baseUrl + url;
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

