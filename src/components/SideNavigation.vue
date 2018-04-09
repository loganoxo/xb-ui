<template>
  <div class="side-navigation">
    <Tooltip placement="left" :always="always" :transfer="true" :disabled="disabled" class="display-block" v-if="!isLogin && $route.name === 'sellerSpread' ">
      <div class="side-box side-box-bg qq"></div>
      <div slot="content">
        <p class="pt-10">产品客服：<a href="http://shang.qq.com/wpa/qunwpa?idkey=c05716ea03d527adb67d4e23d2a9ed942f729dfb0db13ca332e10996805d2b9d" class="qq-refer-logo" target="_blank"></a></p>
        <p class="mt-20">咨询时间：周一至周五</p>
        <p class="text-align-rt mt-5">9:00 --- 18:00</p>
      </div>
    </Tooltip>
    <Tooltip placement="left" :always="always" :transfer="true" :disabled="disabled" class="display-block" v-if="isLogin && getUserRole === 1">
      <div class="side-box side-box-bg qq"></div>
      <div slot="content">
        <p class="pt-10">产品客服：<a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" class="qq-refer-logo" target="_blank"></a></p>
        <p class="mt-20">咨询时间：周一至周五 9:00 - 21:00</p>
        <p class="text-align-rt mt-5">周六周日 9:00 - 18:00</p>
      </div>
    </Tooltip>
    <Tooltip placement="left" :always="always" :transfer="true" :disabled="disabled" class="mt-10 display-block" v-if="isLogin && getUserRole === 0">
      <div class="side-box side-box-bg qq"></div>
      <div slot="content">
        <p class="pt-10">产品客服：<a href="http://shang.qq.com/wpa/qunwpa?idkey=c8b3150dbd8821f50cced9a08831de701636de9ae107e707114150d0050df9a4" class="qq-refer-logo" target="_blank"></a></p>
        <p class="mt-20">咨询时间：周一至周五 9:00 - 21:00</p>
        <p class="text-align-rt mt-5">周六周日 9:00 - 18:00</p>
      </div>
    </Tooltip>
    <Tooltip placement="left" :transfer="true" class="mt-10 display-block" v-if="isLogin && getUserRole === 1">
      <div class="side-box side-box-bg wechat"></div>
      <div slot="content" class="text-ct">
        <p>白拿拿，提权重，促转化</p>
        <img src="~assets/img/common/merchant_wechat.png" alt="" height="140" width="140" class="mt-5">
      </div>
    </Tooltip>
    <Tooltip placement="left" :transfer="true" class="mt-10 display-block" v-if="isLogin && getUserRole === 0">
      <div class="side-box side-box-bg wechat"></div>
      <div slot="content" class="text-ct">
        <p>打开微信扫一扫 关注服务号</p>
        <img src="~assets/img/common/showker_wechat.png" alt="" height="140" width="140" class="mt-5">
      </div>
    </Tooltip>
    <Tooltip placement="left" :transfer="true" class="mt-10 display-block" content="回到顶部">
      <div class="return-top side-box side-box-bg" @click="returnTop"></div>
    </Tooltip>
  </div>
</template>

<script>
  import {Tooltip, Icon} from 'iview'
  import {scrollTop} from 'iview/src/utils/assist'

  export default {
    name: 'SideNavigation',
    components: {
      Tooltip: Tooltip,
      Icon: Icon,
    },
    data() {
      return {
        disabled: false,
        always: false,
        showCloseBtn: true,
      }
    },
    created() {},
    computed: {
      isBottomShow(){
        return this.$store.state.bottomShow
      },
      isLogin: function () {
        return this.$store.state.login
      },
      getUserRole: function () {
        return this.$store.getters.getUserRole
      }
    },
    methods: {
      returnTop() {
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop(window, sTop, 0, 1000);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .display-block {
    display: block;
  }

  .side-navigation {
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 1;
  }

  .side-box {
    position: relative;
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 2px;
    background-color: $mainColor;
    cursor: pointer;
    @include transition;
    &:hover {
      background-color: darken($mainColor, 10%);
    }
  }

  .side-box-bg {
    width: 44px;
    height: 44px;
    display: block;
    background-image: url("~assets/img/common/side_nav_bg.png");
    background-repeat: no-repeat;
  }

  .qq {
    background-position: 0 0;
  }

  .wechat {
    background-position: -132px 0;
  }

  .return-top {
    background-position: -88px 0;
  }

  .qq-refer-logo {
    display: inline-block;
    width: 72px;
    height: 22px;
    vertical-align: middle;
    background: url("~assets/img/common/qq_interflow_logo.png") no-repeat;
  }

  .close-qq-box {
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
