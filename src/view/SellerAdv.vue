<template>
  <div class="seller-adv">
    <role-top></role-top>
    <div class="text-ct pos-rel" style="min-width: 1200px" >
      <img src="/static/img/seller-adv/seller-adv_02.jpg" alt="" style="width: 100%;" >
      <router-link style="
        position: absolute;
        top: 62%;
        left: 50%;
        width: 330px;
        background-color: rgb(0, 111, 255);
        color: rgb(255, 255, 255);
        border: none;
        margin-left: -165px;
        font-size: 30px;
      " class="ivu-btn ivu-btn-circle ivu-btn-large" to="/register/seller-register">
        立即申请商家注册
      </router-link>
    </div>
    <div class="container" style="min-width: 1200px">
      <img src="/static/img/seller-adv/seller-adv_04.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_06.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_07.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_08.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_10.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_12.png" alt="">
    </div>
    <div class="seller-bottom" style="min-width: 1200px">
      <div class="container">
        <div>
          <router-link style="
          width: 278px;
          border: none;
          font-size: 26px;
          display: block;" class="ivu-btn ivu-btn-circle ivu-btn-large" to="/register/seller-register">
            立即申请商家注册
          </router-link>
          <p class="mt-20" style="color: #fff;">一站式权重优化专家</p>
        </div>
      </div>
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
          id : 'pageContain',
          slideTime : 800,
          continuous : false,
          effect : {
            transform : {
              translate : 'Y',
              scale : [.1, 1],
              rotate : [0, 0]
            },
            opacity : [0, 1]
          },
          mode : 'wheel,touch,nav:navBar',
          start : 0,
          easing : 'fadeInDown',
        });
      })
    },
  }
</script>

<style lang="scss" scoped>
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

