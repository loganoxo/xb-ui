/**
 * Created by ycb on 2017/7/18.
 */
import {aliUrl, bucket} from '@/config/env'

/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (content) {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = (name) => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStorage = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 生成当前时间的年月日
 */
export const timeToDate = () => {
  let time = new Date();
  let Y = time.getFullYear();
  let M = time.getMonth() + 1;
  let D = time.getDate();
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  return Y + M + D
}

/**
 * 随机生成20位字符串（字母+ 数字）
 */
export const randomString = () => {
  return timeToDate() + '/' + Math.random().toString(36).substr(2) + parseInt(new Date().getTime() / parseInt(Math.random() * 1000 - 100 + 100));
}

/**
 * 验证是否是正实数（仅支持验证带2位小数正实数）
 */
export const isNumber = (number) => {
  let IS_NUMBER = /^[0-9]+(.[0-9]{1,2})?$/;
  return IS_NUMBER.test(number)
}

/**
 * 验证是否是非0正整数
 */
export const isInteger = (number) => {
  let IS_INTEGER = /^\+?[1-9][0-9]*$/;
  return IS_INTEGER.test(number)
}

/**
 * 验证是否是淘宝或者天猫链接地址
 */
export const isAliUrl = (url) => {
  let URL_REG = /((item|detail).(tmall|taobao).*?)/;
  return URL_REG.test(url)
}

/**
 * 上传图片到阿里云
 */
export const aliUploadImg = (key, file) => {
  return new Promise((resolve, reject) => {
    OSS.urllib.request(aliUrl, {method: 'GET'}, function (err, response) {
      if (err) {
        return alert(err);
      }
      const result = JSON.parse(response);
      const client = new OSS.Wrapper({
        region: 'oss-cn-hangzhou',
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        bucket: bucket,
      });
      client.multipartUpload(key, file).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      }).catch((error) => {
        reject(error);
      })
    });
  });
}

