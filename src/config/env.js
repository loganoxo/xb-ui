/**
 * Created by ycb on 2017/5/5.
 */
/**
 * 配置开发环境和生产环境之间地址的切换
 * aliUrl: 阿里云请求node临时token地址
 * bucket: 阿里云存储域地址
 * aliCallbackImgUrl: 拼接阿里云图片外网链接地址（前缀）
 * aliPayUrl: 支付宝充值地址
 */

const domain = window.location.protocol + '//' + window.location.host;
let bucket = 'xiuba-dev';
let aliCallbackImgUrl = 'https://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
let aliUrl = domain + '/api/ali-token.json';
let aliPayUrl = domain + '/pay/build_req.htm?';
let weiXinPayUrl = domain + '/pay/wxpay_qrcode.htm?';
let openPayUrl = domain + '/ali-pay?';

if (process.env.NODE_ENV === 'development') {
  bucket = 'xiuba-dev';
  aliCallbackImgUrl = 'https://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/';
}

export {bucket, aliCallbackImgUrl, aliUrl, aliPayUrl, weiXinPayUrl, openPayUrl}
