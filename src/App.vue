<template>
  <div class="xiu-ba-pc">
    <Top v-show="isTopShow"></Top>
    <router-view></router-view>
    <!--网站底部信息-->
    <Bottom v-show="isBottomShow"></Bottom>
    <!--侧边栏信息导航-->
    <side-navigation></side-navigation>
    <!--侧边栏固定联系客服图片展示-->
    <div class="suspend-service" v-show="showSuspendService" v-if="isLogin">
      <!--<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" target="_blank" v-if="getUserRole === 1">-->
        <!--<img src="~assets/img/common/suspend-service.png" alt="">-->
      <!--</a>-->
      <div v-if="getUserRole === 1" class="pos-rel">
        <img src="~assets/img/common/suspend-service-merchant.png" alt="">
        <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2012364029" target="_blank"  class="service service1"></a>
        <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1873512513" target="_blank"  class="service service2"></a>
        <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2331878513" target="_blank"  class="service service3"></a>
        <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" target="_blank"  class="service service4"></a>
      </div>
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
        <div class="show-buyer-popup-body pos-rel" >
          <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2012364029" target="_blank" @click="closeSuspendService"></a>
          <div class="dynamicQQ">{{getSellerCustomerQq.configValue}}</div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {Modal} from 'iview'
  import Top from "@/components/Top.vue"
  import Bottom from "@/components/Bottom.vue"
  import SideNavigation from '@/components/SideNavigation.vue'
  import {getStorage} from '@/config/utils'

  export default {
    name: 'my-app',
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
      },
      getSellerCustomerQq() {
        return this.$store.getters.getSellerCustomerQq
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
        this.showSuspendService = false;
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
<style lang="scss">
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
    .service{
      position: absolute;
      width:100%;
      height:25px;
    }
    .service1{
      top:173px;
    }
    .service2{
      top:200px;
    }
    .service3{
      top:227px;
    }
    .service4{
      bottom:15px;
    }
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

  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }

</style>



