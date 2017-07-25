<template>
  <div class="home-ctt">
    <div class="container">
      <div class="login-box">
        <div class="buyer-login-box animated fadeInLeft">
          <a href=""   :class="[animateStart.buyerRes ? 'animated pulse' : '' ]" @mouseover="animateOver(0)" @mouseleave="animateLeave(0)">
            <img src="~assets/img/home/home_01.png" alt="">
          </a>
          <p>
            我想要免费试用，体验商品带给我更多快乐， 并将这份快乐传递给更多人！
          </p>
        </div>
        <div class="middle-icon-box fadeInDown">
          <img class="left-icon" :class="[animateStart.buyerRes ? 'aleft' : 'arightDefault' ]" src="~assets/img/home/home_06.png" alt="">
          <img src="~assets/img/home/home_05.png" alt="" style="vertical-align: text-bottom;">
          <img class="right-icon" :class="[animateStart.sellerRes ? 'aright' : 'aleftDefault' ]" src="~assets/img/home/home_07.png" alt="">
        </div>
        <div class="seller-login-box animated fadeInRight">
          <a href="" :class="[animateStart.sellerRes ? 'animated pulse' : 'arightDefault' ]" @mouseover="animateOver(1)" @mouseleave="animateLeave(1)">
            <img src="~assets/img/home/home_02.png" alt="">
          </a>
          <p>
            我想要推广商品、收集新品市场反馈、 提升产品销量。打造专属于我的品牌！
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="qq-login-box">
        <img src="~assets/img/home/home_04.png" alt="">
        <a href="">QQ账号登录</a>
        <p>
          我已注册，现在就
          <router-link to="/login">登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        animateStart: {
          buyerRes: false,
          sellerRes: false,
          complete: false
        },
    }
  },
  created(){
    this.animateStart.complete = true;
  },
  methods: {
    animateOver: function (res) {
      if(res === 1){
        this.animateStart.sellerRes = true;
      }else {
        this.animateStart.buyerRes = true;
      }
      this.animateStart.complete = false;
    },
    animateLeave: function (res) {
      if(res === 1){
        this.animateStart.sellerRes = false;
      }else {
        this.animateStart.buyerRes = false;
      }
      this.animateStart.complete = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';
  .home-ctt{
    padding-bottom: 310px;
  }
  .login-box{
    margin: auto;
    padding-top: 106px;
    width: 806px;
    >div{
      float: left;
      text-align: center;
      a{
        display: block;
        overflow: hidden;
      }
      p{
        width: 242px;
        margin: 20px auto;
        font-size: 14px;
        text-align: left;
      }
    }
    .buyer-login-box{
      width: 40%;
    }
    .seller-login-box{
      width: 40%;
    }
    .middle-icon-box{
      width: 20%;
      margin-top: 26px;
      img{
        position: relative;
      }
      .left-icon,.right-icon{
        top:-2px;
        transition: left 0.3s;
      }
      .aleft{
        left: -40px;
      }
      .aleftDefault{
        left: 0;
      }
      .arightDefault{
        left: 0;
      }
      .aright{
        left: 40px;
      }
    }
  }

  .qq-login-box{
    width: 360px;
    margin: 76px auto auto auto;
    >img{
      display: block;
      margin: auto;
    }
    >a{
      display: block;
      background: url("~assets/img/common/qq_logo.png") no-repeat 0 3px;
      padding-left: 30px;
      height: 30px;
      margin: 20px auto auto auto;
      width: 120px;
      line-height: 30px;
      font-size: 14px;
    }

    p{
      width: 152px;
      margin: 15px auto;
      a{
        display: inline-block;
        border: 1px solid #CCCCCC;
        padding: 1px 13px;
        color: #666666;
      }
    }

  }
</style>
