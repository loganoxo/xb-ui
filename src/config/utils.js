/**
 * Created by ycb on 2017/7/18.
 */
import {aliUrl, bucket} from '../config/env'

/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
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
 * 生成当前年月日
 */
export const TimeToDate = () => {
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
 * 前端阿里云上传图片方法
 */
export const aliUploadImg = (key, file) => {
  return new Promise((resolve, reject) => {
    OSS.urllib.request(aliUrl, {method: 'GET'}, function (err, response) {
      if (err) {
        return alert(err);
      }
      console.log(response);
      const result = JSON.parse(response);
      console.log(result);
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

