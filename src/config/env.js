/**
 * Created by ycb on 2017/5/5.
 * 配置开发环境和生产环境之间地址的切换
 * aliTokenUrl: 阿里云请求node临时token接口地址
 * bucket: 阿里云存储域地址
 * aliCallbackImgUrl: 拼接阿里云图片外网链接地址（前缀）
 * aliPayUrl: 支付宝充值地址
 */

const domain = window.location.protocol + '//' + window.location.host;
let bucket = 'xiuba';
let aliCallbackImgUrl = 'https://xiuba.oss-cn-hangzhou.aliyuncs.com/';
let aliTokenUrl = domain + '/api/ali-token.json';
let aliPayUrl = domain + '/pay/build_req.htm?';
let weiXinPayUrl = domain + '/pay/wxpay_qrcode.htm?';

if (process.env.NODE_ENV === 'development') {
  bucket = 'xiuba-dev';
  aliCallbackImgUrl = 'https://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
}

export {bucket, aliCallbackImgUrl, aliTokenUrl, aliPayUrl, weiXinPayUrl}
