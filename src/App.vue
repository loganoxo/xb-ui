<template>
  <div id="app">
    <Top v-show="topShow"></Top>
    <router-view></router-view>
    <Bottom></Bottom>
    <BackTop :height="200" :bottom="160"></BackTop>
  </div>
</template>

<script>
  import Top from "./components/Top.vue";
  import Bottom from "./components/Bottom.vue";
  import BackTop from "iview/src/components/back-top";
  import {getStorage, getCookie} from '@/config/utils';
  import api from '@/config/apiConfig'
  export default {
    name: 'app',
    components: {
      Top: Top,
      Bottom: Bottom,
      BackTop: BackTop,
    },
    computed: {
      topShow() {
        return this.$store.state.topShow
      },
      logInAuthority() {
        return this.$store.state.logInAuthority;
      }
    },
    created() {
      let _this = this;
      let userInfo = getStorage('userInfo');
//      _this.$store.commit('INIT_USER_INFO');
      _this.setChannelFunc();
      if (!userInfo && _this.logInAuthority) {
        _this.$store.dispatch('loggedOut').then((res) => {
          if (res.status) {
            _this.$router.push({name: 'login'});
          } else {
            console.log(res.msg);
          }
        });
      }
    },
    methods: {
      setChannelFunc(){
        //这里处理用户渠道-搜索引擎
//        let expireDate = new Date();
//        expireDate.setDate(expireDate.getDate() + 36500);
//        let regexp = /(.*\.)*(\w*\.\w*)/;
//        let domain = regexp.exec(window.location.host)[2];
//        let cookieAttr = ";expires=" + expireDate.toUTCString() + ";path=/;domain=" + domain;
        let referer = document.referrer;
        if (referer && '' !== referer) {
          let searchEngineConfig = {
            'www.baidu.com': {'name': 'BAIDU', 'queryKey': 'wd'},
            'www.so.com': {'name': '360', 'queryKey': 'q'},
            'www.sogou.com': {'name': 'SOUGOU', 'queryKey': 'query'}
          };
          let searchKeyWord = null;
          for (let key in searchEngineConfig) {
            if (referer.indexOf(key) !== -1) {
              let qudaoData = searchEngineConfig[key];
              eval("let regexStr = /\&" + qudaoData.queryKey + "\=([^\&]*)/;");
              let searchKey = referer.match(regexStr);
              if (searchKey === null || searchKey.length < 2) {
                eval("let regexStr = /\\?" + qudaoData.queryKey + "\=([^\&]*)/;");
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

              document.cookie = "from_qudao=" + qudaoData.name ;
//              document.cookie = "from_qudao_key=" + searchKeyWord ;
              break;
            }
          }
        }
        //这里处理用户渠道-自定义渠道
//        let path = this.location.pathname;
//        let host = this.location.host;
//        // console.info(path);
//        //销售推广
//        if (path && path.indexOf("/s/") !== -1) {
//          let salerId = this.location.pathname.replace("/s/", "");
//          document.cookie = "from_qudao=saler_dev" + cookieAttr;
//          document.cookie = "reg_user_from_saler_id=" + salerId + cookieAttr;
//        }
//        //百度
//        if (path && path.indexOf("/bd") !== -1 && path.length <= 4) {
//          document.cookie = "from_qudao=baidu" + cookieAttr;
//        }
//        //百度知道
//        if (path && path.indexOf("/zd") !== -1 && path.length <= 4) {
//          document.cookie = "from_qudao=bdzd" + cookieAttr;
//        }
//        //百度网盟
//        if (path && path.indexOf("/bdwm") !== -1 && path.length <= 6) {
//          document.cookie = "from_qudao=bdwm" + cookieAttr;
//        }
//        //360
//        if (path && path.indexOf("/qh") !== -1 && path.length <= 4) {
//          document.cookie = "from_qudao=qh360" + cookieAttr;
//        }
//        //搜狗
//        if (path && path.indexOf("/sg") !== -1 && path.length <= 4) {
//          document.cookie = "from_qudao=sogou" + cookieAttr;
//        }
//        if (path && path.indexOf("uref") >= 0) {
//          let user_ref_code = path.match(/uref.*/)[0];
//          document.cookie = "user_refer_code=" + user_ref_code.substr(4, user_ref_code.length) + cookieAttr;
//          document.cookie = "from_qudao=user_recommend" + cookieAttr;
//        }
      }
    },
    watch: {
      '$route' (to, from) {
        let self = this;
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        if(!(self.$route.name == 'TaskCategory' || self.$route.name == 'TaskDetails' ||  self.$route.name == 'Home' )){
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: ''
          });
        }
      }
    }
  }
</script>



