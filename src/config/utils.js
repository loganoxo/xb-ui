/**
 * Created by ycb on 2017/7/18.
 */
import {aliUrl, bucket} from '@/config/env'
import store from '@/store'

/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (content) {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStorage = (name) => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
};

/**
 * 删除localStorage
 */
export const removeStorage = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};


/**
 * 获取cookie
 */
export const getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return (arr[2]);
  } else {
    return null;
  }
};

/**
 * 设置cookie
 */
export const setCookie = (name, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 删除cookie
 */
export const delCookie = (name) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval !== null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

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
  return Y.toString() + M.toString() + D.toString();
};

/**
 * 生成当前时间 + 随机20位字符串（字母+ 数字）
 */
export const randomString = () => {
  return timeToDate() + '/' + Math.random().toString(36).substr(2) + parseInt(new Date().getTime() / parseInt(Math.random() * 1000 - 100 + 100));
};

/**
 * 验证是否是正实数（仅支持验证带2位小数正实数）
 */
export const isNumber = (number) => {
  let IS_NUMBER = /^[0-9]+(.[0-9]{1,2})?$/;
  return IS_NUMBER.test(number)
};

/**
 * 验证是否是非0正整数
 */
export const isInteger = (number) => {
  let IS_INTEGER = /^\+?[1-9][0-9]*$/;
  return IS_INTEGER.test(number)
};

/**
 * 验证是否是淘宝或者天猫链接地址
 */
export const isAliUrl = (url) => {
  let URL_REG = /((item|detail|s.click).(tmall|taobao).*?)/;
  return URL_REG.test(url)
};

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
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        bucket: bucket,
        endpoint: 'https://oss-cn-hangzhou.aliyuncs.com',
        secure: true
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
};

/**
 * 深度copy（数组，对象）
 */
export const extendDeep = (obj, child) => {
  let i, proxy;
  proxy = JSON.stringify(obj);
  proxy = JSON.parse(proxy);
  child = child || {};
  for (i in proxy) {
    if (proxy.hasOwnProperty(i)) {
      child[i] = proxy[i];
    }
  }
  proxy = null;
  return child;

};

/**
 * 实时获取服务端时间
 */
export const getSeverTime = () => {
  return store.state.severTime + new Date().getTime() - store.state.clientTime
};

/**
 * 生成随机6位小写字母组成的字符串
 */
export const randomLetter = () => {
  let result = [];
  for (let i = 0; i < 6; i++) {
    let ranNum = Math.ceil(Math.random() * 25);
    result.push(String.fromCharCode(97 + ranNum));
  }
  return result.toString().replace(/,/g, '');
};

/**
 * 对数字进行简单加密（主要用来加密任务id,活动id）
 */
export const encryption = (num) => {
  if (!num) {
    return
  }
  let newNum = num.toString().split('');
  for (let i = 0, len = newNum.length; i < len; i++) {
    newNum[i] += randomLetter();
  }
  return newNum.toString().replace(/,/g, '');
};

/**
 * 对进行加密后的数字进行解密
 */
export const decode = (string) => {
  if (!string) {
    return
  }
  let newString = string.match(/\d+/g);
  return parseInt(newString.join(',').replace(/,/g, ''));
};

/**
* 解析url地址参数
*/
export const getUrlParams = (url,name) => {
  if(!url || !name){
    return
  }
  let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
  let r = url.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 任务流程状态映射
 */
export const TaskErrorStatusList = (type) => {
  switch (type) {
    case "pass_and_unclaimed":
      return "已通过待下单";
      break;
    case "order_num_waiting_audit":
      return "订单号待审核";
      break;
    case "order_num_error":
      return "订单号有误";
      break;
    case "trial_report_waiting_submit":
      return "已下单待交买家秀";
      break;
    case "trial_report_waiting_confirm":
      return "买家秀待确认";
      break;
    case "trial_report_unqualified":
      return "买家秀不合格";
      break;
    case "trial_end":
      return "任务终止";
      break;
    case "trial_finished":
      return "活动完成";
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
    case "admin_manual_close":
      return "管理员终止";
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
    case 'pay_for_task_deposit_seller':
      return '支付活动担保金';
      break;
    case 'task_trad_record_seller':
      return '商家活动交易记录';
      break;
    case 'task_return_seller':
      return '活动结算返款';
      break;
    case 'showker_task_supplementary_seller':
      return '补充任务担保金';
      break;
    case 'task_deposit_pay_shower':
      return '任务担保金退款';
      break;
    case 'task_deposit_return_shower':
      return '秀客担保金返款';
      break;
    case 'task_delete_return_seller':
      return '关闭活动返款-活动担保金';
      break;
    case 'enchashment_audit_ing':
      return '提现审核中';
      break;
    case 'enchashment_audit_success':
      return '提现审核通过';
      break;
    case 'enchashment_audit_defeat':
      return '提现审核未通过';
      break;
    case 'enchashment_record':
      return '提现交易记录';
      break;
    case 'recharge_record':
      return '充值交易记录';
      break;
    case 'recharge':
      return '充值-其它';
      break;
    case 'pay_for_task_deposit_supply_seller':
      return '补交活动担保金';
      break;
    case 'pay_for_task_promotion_expenses':
      return '支付活动推广费';
      break;
    case 'pay_for_task_promotion_expenses_supply_seller':
      return '补交活动推广费';
      break;
    case 'task_delete_return_promotion_expenses_seller':
      return '关闭活动返款-活动推广费';
      break;
    case 'task_return_deposit_seller':
      return '活动结算担保金返款';
      break;
    case 'task_return_promotion_expenses_seller':
      return '活动结算推广费返款';
      break;
    case 'pinkage':
      return '包邮';
      break;
    case 'mobile_exclusive':
      return '手机专享';
      break;
    case 'tao_coin_deduction':
      return '淘金币抵扣';
      break;
    case 'sales_return_7_plus':
      return '7+天退货';
      break;
    case 'global_shopping':
      return '全球购';
      break;
    case 'overseas_goods':
      return '海外商品';
      break;
    case 'consumer_protect':
      return '消费者保障';
      break;
    case 'pay_after_receive':
      return '货到付款';
      break;
    case 'hua_pay_installment':
      return '花呗分期';
      break;
    case 'wangwang_online':
      return '旺旺在线';
      break;
    case 0 :
      return '活动';
      break;
    case 1 :
      return '充值';
      break;
    case 2 :
      return '提现';
      break;
    case 3 :
      return '会员订购';
      break;
    case 4 :
      return '邀请奖励-秀客';
      break;
    case 5 :
      return '活动提成-秀客';
      break;
    case 6 :
      return '邀请奖励-商家';
      break;
    case 7 :
      return '活动提成-商家';
      break;
    case 'waiting_resubmit' :
      return '待重新提交';
      break;
    case 'audit_pass' :
      return '审核通过';
      break;
    case 'deleted' :
      return '已删除';
      break;
    case 'recharge_alipay':
      return '充值-支付宝';
      break;
    case 'invite_seller_success':
      return '成功邀请商家';
      break;
    case 'recharge_wxpay':
      return '充值-微信';
      break;
    case 'invite_showker_success':
      return '成功邀请秀客';
      break;
    case 'seller_task_commission':
      return '商家活动提成';
      break;
    case 'showker_task_commission':
      return '秀客活动提成';
      break;

  }
};
