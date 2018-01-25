/**
 * Created by Administrator on 2017/10/20 0020.
 */

(function () {
  //这里处理用户渠道-搜索引擎
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 36500);
  var regexp = /(.*\.)*(\w*\.\w*)/;
  var domain = regexp.exec(window.location.host) ? regexp.exec(window.location.host)[2] : null;
  var cookieAttr = ";expires=" + expireDate.toUTCString() + ";path=/;domain=" + domain;
  var referer = document.referrer;
  if (referer && '' !== referer) {
    var searchEngineConfig = {
      'www.baidu.com': {'name': 'BAIDU', 'queryKey': 'wd'},
      'www.so.com': {'name': '360', 'queryKey': 'q'},
      'www.sogou.com': {'name': 'SOUGOU', 'queryKey': 'query'}
    };
    var searchKeyWord = null;
    for (var key in searchEngineConfig) {
      if (referer.indexOf(key) !== -1) {
        var qudaoData = searchEngineConfig[key];
        eval("var regexStr = /\&" + qudaoData.queryKey + "\=([^\&]*)/;");
        var searchKey = referer.match(regexStr);
        if (searchKey === null || searchKey.length < 2) {
          eval("var regexStr = /\\?" + qudaoData.queryKey + "\=([^\&]*)/;");
          searchKey = referer.match(regexStr);
        }
        if (searchKey && searchKey.length > 1 && null !== searchKey[1] && '' !== searchKey[1]) {
          searchKeyWord = searchKey[1];
        }
        if (null === searchKeyWord || '' === searchKeyWord) {
          searchKeyWord = encodeURI(referer);
          if (searchKeyWord.length > 512) {
            searchKeyWord = searchKeyWord.substring(0, 512);
          }
        }

        document.cookie = "from_qudao=" + qudaoData.name + cookieAttr;
        document.cookie = "from_qudao_key=" + searchKeyWord + cookieAttr;
        break;
      }
    }
  }

//这里处理用户渠道-自定义渠道

  //获取url地址中query参数
  function getQueryString(name) {
    var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  if (getQueryString('qd')) {
    document.cookie = "from_qudao="+ getQueryString('qd').toUpperCase() + cookieAttr;
  }

  /**
   * 新增渠道的Key为from_qudao
   */
  if (getQueryString('from_qudao')) {
    document.cookie = "from_qudao=" + getQueryString('from_qudao').toUpperCase() + cookieAttr;
  }

//营销qq
  if (getQueryString('salesFrom') === 'SALE_QQ') {
    document.cookie = "from_qudao=SALE_QQ" + cookieAttr;
    document.cookie = "from_qudao_key=" + '' + cookieAttr;
  }

//微信
  if (getQueryString('salesFrom') === 'WECHAT') {
    document.cookie = "from_qudao=WECHAT" + cookieAttr;
    document.cookie = "from_qudao_key=" + '' + cookieAttr;
  }

})();
