/**
 * Created by ycb on 2017/5/5.
 */
/**
 * 配置开发环境和生产环境之间地址的切换
 * baseUrl: api接口地址
 * aliUrl: 阿里云请求node临时token地址
 * bucket: 阿里云存储域地址
 * aliCallbackImgUrl: 拼接阿里云图片外网链接地址（前缀）
 */

let baseUrl = '/api';
let aliUrl = 'http://192.168.1.142:3000/api/ali-token.json';
let bucket = 'xiuba-dev';
let aliCallbackImgUrl = 'http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
  aliUrl = 'http://localhost:8088/api/ali-token.json';
  bucket = 'xiuba-dev';
  aliCallbackImgUrl = 'http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
}
export {
  baseUrl,
  aliUrl,
  bucket,
  aliCallbackImgUrl
}
