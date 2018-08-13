import {setCookie} from '@/config/utils'

const getUrlQueryString = (name) => {
  const reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

export const setChannel = () => {
  // 旧渠道的Key为qd
  if (getUrlQueryString('qd')) {
    setCookie('from_qudao', getUrlQueryString('qd').toUpperCase());
  }

  // 新增渠道的Key为from_qudao
  if (getUrlQueryString('from_qudao')) {
    setCookie('from_qudao', getUrlQueryString('from_qudao').toUpperCase());
  }

  // 营销qq渠道
  if (getUrlQueryString('salesFrom') === 'SALE_QQ') {
    setCookie('from_qudao', 'SALE_QQ');
    setCookie('from_qudao_key', '');
  }

  // 微信渠道
  if (getUrlQueryString('salesFrom') === 'WECHAT') {
    setCookie('from_qudao', 'WECHAT');
    setCookie('from_qudao_key', '');
  }
};
