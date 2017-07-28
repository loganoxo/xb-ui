/**
 * Created by ycb on 2017/5/5.
 */
/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 接口地址
 **/
let baseUrl = '/api';

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
}
export {
  baseUrl
}
