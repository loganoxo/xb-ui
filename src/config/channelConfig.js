import {setCookie, getUrlParams} from '@/config/utils'

const setChannel = () => {

  // 处理搜索引擎渠道来源信息
  const referer = document.referrer;
  if (referer) {
    const searchEngineConfig = {
      'www.baidu.com': {'name': 'BAIDU', 'queryKey': 'wd'},
      'www.so.com': {'name': '360', 'queryKey': 'q'},
      'www.sogou.com': {'name': 'SOUGOU', 'queryKey': 'query'}
    };
    for (let key in searchEngineConfig) {
      if (referer.includes(key)) {
        const searchKeyWord = getUrlParams(referer, searchEngineConfig[key].queryKey);
        setCookie('from_qudao_key', searchKeyWord);
        setCookie('from_qudao', searchEngineConfig[key].name);
        break;
      }
    }
  }

  const search = window.location.search;
  const qd = getUrlParams(search, 'qd');
  const fromQuDao = getUrlParams(search, 'from_qudao');

  // 旧渠道的Key为qd
  if (qd) {
    setCookie('from_qudao', qd.toUpperCase());
  }

  // 新增渠道的Key为from_qudao
  if (fromQuDao) {
    setCookie('from_qudao', fromQuDao.toUpperCase());
  }

  // 营销qq渠道
  if (getUrlParams(search, 'salesFrom') === 'SALE_QQ') {
    setCookie('from_qudao', 'SALE_QQ');
    setCookie('from_qudao_key', '');
  }

  // 微信渠道
  if (getUrlParams(search, 'salesFrom') === 'WECHAT') {
    setCookie('from_qudao', 'WECHAT');
    setCookie('from_qudao_key', '');
  }
};

export default setChannel
