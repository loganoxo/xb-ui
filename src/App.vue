<template>
  <div class="xiu-ba-pc">
    <top v-show="isTopShow"></top>
    <router-view></router-view>
    <!--网站底部信息-->
    <bottom v-show="isBottomShow"></bottom>
    <!--侧边栏信息导航-->
    <side-navigation></side-navigation>
    <!--侧边栏固定联系客服图片展示-->
    <div class="suspend-service" v-show="showSuspendService" v-if="isLogin">
      <div v-if="getUserRole === 1" class="pos-rel">
        <img src="~assets/img/common/service-little-sister.png" alt="">
        <div class="service-content">
          <p class="service-title text-ct fs-14">您的专属</p>
          <p class="service-title text-ct fs-14">一对一产品服务</p>
          <!--<div class="business-service text-ct" v-if="memberLevel === 100 || memberLevel === null">-->
            <!--<p class="fs-14 cl666 mt-10">商家咨询</p>-->
            <!--<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2012364029" target="_blank">小米</a>-->
            <!--<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1873512513" target="_blank">元宝</a>-->
            <!--<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2331878513" target="_blank">周洲</a>-->
          <!--</div>-->
          <!--<div class="vip-service text-ct" v-if="memberLevel === 200 || memberLevel === 300">-->
            <!--<p class="fs-14 cl666 mt-10">VIP售后客服</p>-->
            <!--<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" target="_blank">拿拿酱</a>-->
          <!--</div>-->
          <div class="common-service text-ct">
            <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAxOTQwNF80ODQ2MjlfODAwMDE5NDA0XzJf" target="_blank">点击咨询</a>
          </div>
        </div>
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
      <modal v-model="$store.state.isBuyVipPopup" width="700" class="show-buyer-popup" >
        <div class="show-buyer-popup-body pos-rel" >
          <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=2012364029" target="_blank" @click="closeSuspendService"></a>
          <div class="dynamicQQ">{{getSellerCustomerQq.configValue}}</div>
        </div>
      </modal>
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
      },
      memberLevel() {
        return this.$store.getters.getMemberLevel
      }
    },
    created() {
      const _this = this;
      let userInfo = getStorage('userInfo');
      if (!userInfo && _this.logInAuthority) {
        _this.$store.dispatch('loggedOut').then((res) => {
          if (res.status) {
            _this.$router.push({name: 'Login'});
          } else {
            console.error(res.msg);
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
    .service-content {
      width:111px;
      min-height: 50px;
      border:1px solid #ccc;
      border-radius:5px;
      box-sizing: border-box;
      position: absolute;
      top:92px;
      left:7px;
      background-color: #fff;
      padding:15px 5px;
      .service-title {
        color:#FF6636;
      }
      a{
        display: inline-block;
        width:86px;
        height:24px;
        background-color: #E5E5E5;
        border:1px solid #ccc;
        border-radius: 12px;
        background-image: url("assets/img/common/qq-icon.png");
        background-repeat: no-repeat;
        background-position: 4px 2px;
        padding-left:25px;
        text-align: left;
        font-size: 14px;
        color:#000;
        margin-top:10px;
      }
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


  .pay-model {
    @include fullScreenModel
  }

  .title-tip {
    height: 36px;
    line-height: 36px;
    margin: 56px auto 20px auto;
    color: #000;
    background-color: #FFF6F3;
    font-size: 14px;
  }

  .open-vip-btn {
    display: inline-block;
    background-color: #FFFC00;
    border-radius: 5px;
    border: 1px solid $mainColor;
    text-align: center;
    color: $mainColor;
    padding: 0 20px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
  }

  .ivu-modal .camera {
    width: 58px;
    height: 58px;
    line-height: 58px;
  }


</style>



