<template>
  <div id="app">
    <Top v-show="isTopShow"></Top>
    <router-view></router-view>
    <!--网站底部信息-->
    <Bottom v-show="isBottomShow"></Bottom>
    <!--商家引导-->
    <SellerGuide v-if="!isShowSuspendService && isLogin && getUserRole === 1"></SellerGuide>
    <!--侧边栏信息导航-->
    <side-navigation></side-navigation>
    <!--侧边栏固定联系客服图片展示-->
    <div class="suspend-service" v-show="showSuspendService" v-if="isLogin">
      <a href="http://shang.qq.com/wpa/qunwpa?idkey=c05716ea03d527adb67d4e23d2a9ed942f729dfb0db13ca332e10996805d2b9d" target="_blank" v-if="getUserRole === 1">
        <img src="~assets/img/common/suspend-service.png" alt="">
      </a>
      <a href="http://shang.qq.com/wpa/qunwpa?idkey=a5e370e72edddbc2b9edc58d9517719b97d32a6683ef4faa0675c52bf494d9d1" target="_blank" v-else>
        <img src="~assets/img/common/suspend-service-showker.png" alt="">
      </a>
      <span class="close-suspend-service" @click.stop.self="closeSuspendService">关闭</span>
    </div>
  </div>
</template>

<script>
  import Top from "@/components/Top.vue"
  import Bottom from "@/components/Bottom.vue"
  import SideNavigation from '@/components/SideNavigation.vue'
  import MerchantGuide from '@/components/MerchantGuide.vue'
  import SellerGuide from '@/components/SellerGuide.vue'
  import BackTop from "iview/src/components/back-top"
  import {getStorage, getCookie} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: 'app',
    components: {
      Top: Top,
      Bottom: Bottom,
      BackTop: BackTop,
      SideNavigation: SideNavigation,
      MerchantGuide: MerchantGuide,
      SellerGuide:SellerGuide,
    },
    data() {
      return {
        showSuspendService: true
      }
    },
    computed: {
      isTopShow() {
        return this.$store.state.topShow
      },
      isBottomShow(){
        return this.$store.state.bottomShow
      },
      logInAuthority() {
        return this.$store.state.logInAuthority
      },
      isLogin () {
        return this.$store.state.login
      },
      getUserRole () {
        return this.$store.getters.getUserRole
      },
      isShowSuspendService() {
        return this.$store.state.showMerchantGuide
      }
    },
    created() {
      let _this = this;
      let userInfo = getStorage('userInfo');
      if(_this.isLogin){
        _this.$store.dispatch('getDetectionMerchantGuide');
      }
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
      closeSuspendService() {
        this.showSuspendService = false;
      }
    },
    watch: {
      '$route'(to, from) {
        let self = this;
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        if (!(self.$route.name == 'TaskCategory' || self.$route.name == 'TaskDetails' || self.$route.name == 'Home' )) {
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: ''
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';

  .suspend-service {
    display: block;
    position: fixed;
    right: 64px;
    top: 242px;
    cursor: pointer;
  }

  .close-suspend-service {
    position: absolute;
    top: -16px;
    right: 12px;
    cursor: pointer;
    color: #575C6A;
    @include transition;
    &:hover {
      color: darken(#575C6A, 10%);
    }
  }
</style>



