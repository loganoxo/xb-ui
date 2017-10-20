<template>
  <div class="side-navigation">
    <a v-if="isLogin && getUserRole === 1" href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" class="side-box" target="_blank">
      <i class="side-box-bg qq"></i>
      <span class="animated fadeInRight box-content-service">联系在线客服</span>
    </a>
    <a v-if="isLogin && getUserRole === 0" href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800061938" class="side-box" target="_blank">
      <i class="side-box-bg qq"></i>
      <span class="animated fadeInRight box-content-service">联系在线客服</span>
    </a>
    <div v-if="isLogin && getUserRole === 1" class="side-box mt-10">
      <i class="side-box-bg wechat"></i>
      <div class="animated fadeInRight box-content-wechat">
        <span>秀吧365，提权重，促转化</span>
        <img src="~assets/img/common/merchant_wechat.png" alt="" height="120" width="120">
      </div>
    </div>
    <div v-if="isLogin && getUserRole === 0" class="side-box mt-10">
      <i class="side-box-bg wechat"></i>
      <div class="animated fadeInRight box-content-wechat">
        <span>秀吧365，为你精挑细选每一天</span>
        <img src="~assets/img/common/showker_wechat.jpg" alt="" height="120" width="120">
      </div>
    </div>
    <div class="side-box mt-10" @click="returnTop">
      <i class="side-box-bg return-top"></i>
      <div class="animated fadeInRight box-content-top">回到顶部</div>
    </div>
  </div>
</template>

<script>
  import { scrollTop } from 'iview/src/utils/assist';
  export default {
    data() {
      return {}
    },
    mounted() {

    },
    created() {

    },
    computed: {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

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
    &:hover .box-content-service {
      visibility: visible;
      width: 120px;
    }
    &:hover .box-content-top {
      visibility: visible;
      width: 120px;
    }
    &:hover .box-content-wechat {
      visibility: visible;
      width: 132px;
    }
  }

  .side-box-bg {
    width: 44px;
    height: 44px;
    display: inline-block;
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

  .box-content-service,
  .box-content-top {
    visibility: hidden;
    position: absolute;
    height: 44px;
    width: 0;
    right: 50px;
    overflow: hidden;
    top: 0;
    color: #212326;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    border: 1px solid $mainColor;
    @include transition;
    background-color: #fff;
  }

  .box-content-wechat {
    visibility: hidden;
    position: absolute;
    height: 186px;
    width: 0;
    right: 50px;
    top: -72px;
    color: #212326;
    overflow: hidden;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
    border: 1px solid $mainColor;
    @include transition;
    span {
      line-height: 20px;
      display: inline-block;
      border-bottom: 1px solid #eee;
      margin-top: 6px;
    }
    img{
      display: block;
      margin-left: 6px;
    }
  }

</style>
