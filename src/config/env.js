/**
 * Created by ycb on 2017/5/5.
 */
/**
 * 配置开发环境和生产环境之间地址的切换
 * baseUrl: api接口地址
 * aliUrl: 阿里云请求node临时token地址
 * bucket: 阿里云存储域地址
 * aliCallbackImgUrl: 拼接阿里云图片外网链接地址（前缀）
 * aliPayUrl: 支付宝充值地址
 */

let baseUrl = '/api';
let aliUrl = 'http://10.10.10.102:8765/api/ali-token.json';
let bucket = 'xiuba-dev';
let aliCallbackImgUrl = 'http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
let aliPayUrl = 'http://10.10.10.102:8765/pay/build_req.htm?channel=1&userId=';

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
  aliUrl = 'http://192.168.1.142:3000/api/ali-token.json';
  bucket = 'xiuba-dev';
  aliCallbackImgUrl = 'http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
  aliPayUrl = 'http://192.168.1.142:8765/pay/build_req.htm?channel=1&userId='
}

export {
  baseUrl,
  aliUrl,
  bucket,
  aliCallbackImgUrl,
  aliPayUrl
}
