/**
 * Created by ycb on 2017/7/18.
 */
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
export const getStorage = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
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
  let D = time.getDay();
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  return Y + M + D
}


