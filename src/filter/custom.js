/**
 * Created by ycb on 2017/4/28.
 */

/**
 * 格式化时间
 * timeSpan：要格式化的时间（毫秒数）
 * format：要格式化的时间格式（YYYY-MM-DD hh:mm:ss）
 */
const dateFormat = (timeSpan, format) => {
  if (!timeSpan) return;
  let date = new Date(timeSpan);
  let o = {
    "M+": date.getMonth() + 1, //月
    "D+": date.getDate(), //天
    "W": "日一二三四五六".charAt(date.getDay()), //星期
    "h+": date.getHours(), //时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季节
    "S": date.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

/**
 * 格式化数字
 * number：要格式化的数字
 * decimals：保留几位小数
 */
const numberFormat = (number, decimals) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    s = '',
    toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join('.');
};


export {dateFormat, numberFormat}
