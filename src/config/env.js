/**
 * Created by ycb on 2017/5/5.
 */
/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 接口地址
 * aliUrl: 阿里云请求node临时token地址
 * bucket: 阿里云存储域
 */

let baseUrl = '/api';
let aliUrl = '';
let bucket = 'xiuba-prod';
let aliCallbackImgUrl  = 'http://xiuba-prod.oss-cn-hangzhou.aliyuncs.com/';

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
  aliUrl = 'http://localhost:8088/api/ali-token.json';
  bucket = 'xiuba-dev';
  aliCallbackImgUrl  = 'http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
}
export {
  baseUrl,
  aliUrl,
  bucket,
  aliCallbackImgUrl
}
