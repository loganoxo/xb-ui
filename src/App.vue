<template>
  <div id="app" class="xiu-ba-pc">
    <Top v-show="isTopShow"></Top>
    <router-view></router-view>
    <!--网站底部信息-->
    <Bottom v-show="isBottomShow"></Bottom>
    <!--侧边栏信息导航-->
    <side-navigation></side-navigation>
    <!--侧边栏固定联系客服图片展示-->
    <div class="suspend-service" v-show="showSuspendService" v-if="isLogin">
      <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" target="_blank" v-if="getUserRole === 1">
        <img src="~assets/img/common/suspend-service.png" alt="">
      </a>
      <a href="https://jq.qq.com/?_wv=1027&k=5ZMH7Iu" target="_blank" class="pos-rel block" v-else>
        <img src="~assets/img/common/suspend-service-showker.png" alt="">
        <div style="position: absolute; top: 126px; width: 100%;" class="text-ct">
          <p class="text-ct main-color" style="font-size: 13px; line-height: 20px;">打开微信扫一扫</p>
          <p class="text-ct main-color" style="font-size: 13px;  line-height: 20px;">马上关注服务号</p>
          <img src="/static/img/common/qr_code_bainana.png" alt="" width="120px">
          <p class="text-ct main-color" style="font-size: 13px;  line-height: 20px;">领取免费商品</p>
        </div>
      </a>
      <span class="close-suspend-service" @click.stop.self="closeSuspendService">关闭</span>
      <Modal v-model="$store.state.isBuyVipPopup" width="700" class="show-buyer-popup" >
        <div class="show-buyer-popup-body" >
          <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2012364029" target="_blank" @click="closeSuspendService"></a>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import Modal from 'iview/src/components/modal'
  import Top from "@/components/Top.vue"
  import Bottom from "@/components/Bottom.vue"
  import SideNavigation from '@/components/SideNavigation.vue'
  import {getStorage} from '@/config/utils'

  export default {
    name: 'app',
    components: {
      Top: Top,
      Bottom: Bottom,
      SideNavigation: SideNavigation,
      Modal: Modal,
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
      isBottomShow() {
        return this.$store.state.bottomShow
      },
      logInAuthority() {
        return this.$store.state.logInAuthority
      },
      isLogin() {
        return this.$store.state.login
      },
      getUserRole() {
        return this.$store.getters.getUserRole
      }
    },
    created() {
      let _this = this;
      let userInfo = getStorage('userInfo');
      if (!userInfo && _this.logInAuthority) {
        _this.$store.dispatch('loggedOut').then((res) => {
          if (res.status) {
            _this.$router.push({name: 'login'});
          } else {
            console.log(res.msg);
          }
        });
      }
      _this.$store.dispatch('getSysConfigInfo')
    },
    methods: {
      closeSuspendService() {
        self.$store.commit({
          type: "CHANGE_IS_VIP_POPUP",
          result: false,
        });
      },
    },
    watch: {
      '$route'(to, from) {
        let self = this;
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        if (!(self.$route.name === 'TaskCategory' || self.$route.name === 'TaskDetails' || self.$route.name === 'Home')) {
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

  .xiu-ba-pc {
    min-width: 1200px;
  }

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



