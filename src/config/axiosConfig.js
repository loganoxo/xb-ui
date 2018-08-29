/**
 * Created by ycb on 2017/7/25.
 */
import  axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import {LoadingBar} from 'iview'

axios.defaults.timeout = 100000;//配置请求响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置post请求头类型

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
    LoadingBar.start();
  }
  config.headers.platForm = 'PC';
  return config;
}, (error) => {
  LoadingBar.error();
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(res => {
  store.commit({
    type: 'GET_SEVER_TIME',
    time: {
      severTime: res.headers.date,
      clientTime: new Date().getTime()
    }
  });
  LoadingBar.finish();
  return res;
}, (error) => {
  LoadingBar.error();
  if (error.response && error.response.status === 401) {
    store.commit('OUT_LOGIN');
    if (store.state.logInAuthority) {
      router.replace({name: 'login'});
    }
  }
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
const axiosPost = (url, params = {}) => {
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
};

//返回一个Promise(发送get请求)
const axiosGet = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      })
  })
};

export default {
  get: axiosGet,
  post: axiosPost
};
