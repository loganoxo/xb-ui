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
 * 生成当前时间 + 随机20位字符串（字母+ 数字）
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

/**
 * 接口错误状态映射
 */
export const TaskErrorStatusList = (type) => {
  switch (type) {
    case "pass_and_unclaimed":
      return "已通过待领取";
      break;
    case "order_num_waiting_audit":
      return "订单号待审核";
      break;
    case "order_num_error":
      return "订单号有误";
      break;
    case "trial_report_waiting_submit":
      return "已下单待交试用报告";
      break;
    case "trial_report_waiting_confirm":
      return "试用报告待确认";
      break;
    case "trial_report_unqualified":
      return "报告不合格";
      break;
    case "trial_end":
      return "试用终止";
      break;
    case "trial_finished":
      return "试用完成";
      break;
    case "timeout_auto_close":
      return "任务超时终止";
      break;
    case "buyer_manual_close":
      return "秀客主动终止";
      break;
    case "seller_manual_close":
      return "商家主动终止";
      break;
    case 'waiting_audit':
      return "待审核";
      break;
    case 'audit_reject':
      return "未通过";
      break;
    case 'zong_he':
      return "综合";
      break;
    case 'xiao_liang':
      return "销量";
      break;
    case 'ren_qi':
      return "人气";
      break;
    case 'enchashment':
      return '提现';
      break;
    case  'pay_for_task_deposit_seller':
      return '支付活动担保金';
      break;
    case  'task_return_seller':
      return '活动结算返款';
      break;
    case  'showker_task_supplementary_seller':
      return '补充任务担保金';
      break;
    case  'task_deposit_pay_shower':
      return '任务保证金退款';
      break;
    case  'task_deposit_return_shower':
      return '任务保证金返款';
      break;
    case  'task_delete_return_seller':
      return '删除活动返款';
      break;
    case  'enchashment_audit_ing':
      return '提现审核中';
      break;
    case  'enchashment_audit_success':
      return '提现审核通过';
      break;
    case  'enchashment_audit_defeat':
      return '提现审核未通过';
      break;
  }
}
