<template>
  <div class="seller-adv">

    <div id="pageContain">
      <div class="page page1 current">
        <div class="contain">
          <div>
            <router-link to="/" class="left">
              <img src="/static/img/common/logo-adv.png" alt="" class="block mt-30 ml-40">
            </router-link>
            <p class="right adv-top-part">
              <router-link to="/login" class="adv-login-btn">登录</router-link>
              <router-link to="/about-us" class="adv-us">关于我们</router-link>
              <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" target="_blank" class="adv-us ml-15"  >
                联系我们
              </a>
            </p>
          </div>
          <div class="clear-both text-ct adv-text1-box">
            <p>
              <img class="adv-text-img" src="/static/img/seller-adv/seller-adv-text1.png" alt="">
            </p>

            <router-link to="/register/seller-register" class="adv-login-register">立即注册</router-link>
          </div>
        </div>
      </div>
      <div class="page page2">
        <div class="contain">
          <div>
            <router-link to="/" class="left">
              <img src="/static/img/common/logo-adv.png" alt="" class="block mt-30 ml-40">
            </router-link>
            <p class="right adv-top-part">
              <router-link to="/login" class="adv-login-btn">登录</router-link>
              <router-link to="/about-us" class="adv-us">关于我们</router-link>
              <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" target="_blank" class="adv-us ml-15"  >
                联系我们
              </a>
            </p>
          </div>
          <div class="clear-both text-ct adv-text1-box">
            <p class="">
              <img class="adv-text-img" src="/static/img/seller-adv/seller-adv-text2.png" alt="">
            </p>

            <router-link to="/register/seller-register" class="adv-login-register">立即注册</router-link>
          </div>
        </div>
      </div>
      <div class="page page3">
        <div class="contain">
          <div>
            <router-link to="/" class="left">
              <img src="/static/img/common/logo-adv.png" alt="" class="block mt-30 ml-40">
            </router-link>
            <p class="right adv-top-part">
              <router-link to="/login" class="adv-login-btn">登录</router-link>
              <router-link to="/about-us" class="adv-us">关于我们</router-link>
              <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" target="_blank" class="adv-us ml-15"  >
                联系我们
              </a>
            </p>
          </div>
          <div class="clear-both text-ct adv-text1-box">
            <p>
              <img class="adv-text-img" src="/static/img/seller-adv/seller-adv-text3.png" alt="">
            </p>

            <router-link to="/register/seller-register" class="adv-login-register">立即注册</router-link>
          </div>
        </div>
      </div>
      <div class="page page4">
        <div class="contain">
          <div>
            <router-link to="/" class="left">
              <img src="/static/img/common/logo-adv.png" alt="" class="block mt-30 ml-40">
            </router-link>
            <p class="right adv-top-part">
              <router-link to="/login" class="adv-login-btn">登录</router-link>
              <router-link to="/about-us" class="adv-us">关于我们</router-link>
              <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" target="_blank" class="adv-us ml-15"  >
                联系我们
              </a>
            </p>
          </div>
          <div class="clear-both text-ct adv-text1-box">
            <p>
              <img class="adv-text-img" src="/static/img/seller-adv/seller-adv-text4.png" alt="">
            </p>

            <router-link to="/register/seller-register" class="adv-login-register">立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <ul id="navBar">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div v-show="advBottomShow" style="position: fixed; bottom: 0; width: 100%; z-index: 1;">
      <a @click="goRegisterFunc($event)">
        <img src="/static/img/seller-adv/adv-bottom.png" alt="" style="width: 100%; display: block;">
        <span class="clfff fs-20 adv-bottom-closed" @click="colsedAdvBottomFunc($event)">&times;</span>
      </a>
    </div>
  </div>
</template>

<script>

  import RoleTop from '@/components/RoleTop.vue'
  export default {
    name: 'SellerAdv',
    components: {
      RoleTop: RoleTop,
    },
    data() {
      return {
        opts: {
          start: 0,
          dir: 'v',
          loop: false,
          duration: 500,
          stopPageScroll: true,
          beforeChange: function (prev, next) {
          },
          afterChange: function (prev, next) {
          }
        },
        advBottomShow: true,
      }
    },
    created() {

    },
    methods: {
      goRegisterFunc(e){
        this.$router.push({path: '/register/seller-register'});
        e.stopPropagation();
        e.preventDefault()
      },
      colsedAdvBottomFunc(e){

        this.advBottomShow = false;
        e.stopPropagation();
        e.preventDefault()
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        let runPage = new FullPage({

          id : 'pageContain',                            // id of contain
          slideTime : 800,                               // time of slide
          continuous : false,                            // create an infinite feel with no endpoints
          effect : {                                     // slide effect
            transform : {
              translate : 'Y',				   // 'X'|'Y'|'XY'|'none'
              scale : [.1, 1],				   // [scalefrom, scaleto]
              rotate : [0, 0]				       // [rotatefrom, rotateto]
            },
            opacity : [0, 1]                       // [opacityfrom, opacityto]
          },
          mode : 'wheel,touch,nav:navBar',               // mode of fullpage
          start : 0,                                     // which page will display when install
          easing : 'fadeInDown',                                   // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
          //  ,onSwipeStart : function(index, thisPage) {   // callback before pageChange
          //    return 'stop';
          //  }
          //  ,beforeChange : function(index, thisPage) {   // callback before pageChange
          //    return 'stop';
          //  }
          //  ,callback : function(index, thisPage) {       // callback when pageChange
          //    alert(index);
          //  };
        });

      })
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .seller-bottom{
    background-color: #351E97;
    height: 170px;
    >div{
      div{
        width: 300px;
        margin: 45px auto;
        text-align: center;
      }
    }
  }
  .adv-top-part{
    margin-right: 122px;
    margin-top: 55px;
  }
  .adv-login-btn{
    width: 130px;
    height: 36px;
    border: 1px solid #fff;
    color: #fff;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    line-height: 36px;
    border-radius: 18px;
    margin-right: 20px;
  }
  .adv-login-register{
    width: 270px;
    height: 58px;
    border: 2px solid #fff;
    color: #fff;
    display: inline-block;
    text-align: center;
    font-size: 34px;
    line-height: 58px;
    border-radius: 34px;
    margin-right: 20px;
    margin-top: 34px;
  }
  .adv-us{
    font-size: 18px;
    color: #fff;
  }
  .adv-text1-box{
    margin-top: 10%;
    float: left;
    width: 100%;
  }
  .adv-text-img{
    width: 50%;
  }
  .adv-bottom-closed{
    position: absolute;
    top: 48%;
    right: 24%;
    z-index: 3;
    color: #fff;
    font-size: 32px;
    padding: 0 5px;
  }

  #pageContain {
    overflow: hidden;
  }
  .page {
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  .contain {
    width: 100%;
    height: 100%;
    display: none;
    position: relative;
    z-index: 0;
  }
  .current .contain,.slide .contain {
    display: block;
  }
  .current {
    display: block;
    z-index: 1;
  }
  .slide {
    display: block;
    z-index: 2;
  }
  .swipe {
    display: block;
    z-index: 3;
    transition-duration: 0ms !important;
    -webkit-transition-duration: 0ms !important;
  }
  .page1 {
    background: url('/static/img/seller-adv/seller_banner_01.jpg') no-repeat;
  }
  .page2 {
    background: url('/static/img/seller-adv/seller_banner_02.jpg') no-repeat;
  }
  .page3 {
    background: url('/static/img/seller-adv/seller_banner_03.jpg') no-repeat;
  }
  .page4 {
    background: url('/static/img/seller-adv/seller_banner_04.jpg') no-repeat;
  }
  #navBar {
    z-index: 3;
    position: absolute;
    top: 40%;
    right: 3%;
  }
  #navBar .active {
    background: #ccc;
  }
  #navBar li {
    cursor: pointer;
    -webkit-transition: all .7s ease;
    transition: all .7s ease;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    width: 10px;
    height: 10px;
    margin: 10px;
    border: 1px solid #fff;
  }

  .step1 p {
    transform: translate(0, -50px);
    -webkit-transform: translate(0, -50px);
  }
  .step2 p {
    opacity: 0;
    transform: scale(2);
    -webkit-transform: scale(2);
  }
  .step3 p {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 1;
  }
  .step4 p {
    -webkit-transform: rotate(360deg) translate(0,-200px) scale(.3);
    transform: rotate(360deg) translate(0,-200px) scale(.3);
    opacity: 0;
  }



</style>

