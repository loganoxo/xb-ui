<template>
  <div class="seller-adv">

    <div id="pageContain">
      <div class="page page1 current ">
        <div class="contain ">
          <div class="clear-both text-ct adv-text1-box ">
            <div class="titleEng">
              <a class="block move-arrow-down" style="margin-top: 80px " @click="FullPage.next()">
                <img src="/static/img/common/big-down.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="page page2">
        <div class="contain ">
          <div class="clear-both text-ct adv-text1-box ">
            <div class="titleEng">
              <a class="block move-arrow-down" style="margin-top: 80px " @click="FullPage.next()">
                <img src="/static/img/common/big-down.png" alt="">
              </a>
            </div>

          </div>
        </div>
      </div>
      <div class="page page3">
        <div class="contain ">
          <div class="clear-both text-ct adv-text1-box ">
            <div class="titleEng">
              <a class="block move-arrow-down" style="margin-top: 80px" @click="goRegisterFunc" >
                <iButton  class="begin-now">立即开始</iButton>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <ul id="navBar">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>

  import RoleTop from '@/components/RoleTop.vue'
  import  Button from 'iview/src/components/button'
  import api from '@/config/apiConfig'

  export default {
    name: 'SellerGuide',
    components: {
      RoleTop: RoleTop,
      iButton:Button
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
        advBottomAgain: true,
        FullPage: null,
      }
    },
    created() {

    },
    methods: {
      goRegisterFunc(e){
        let _this = this;
        _this.$router.push({path: '/user/task-release',query:{sellerGuide:'sellerGuide'}});
        window.onmousewheel = document.onmousewheel = function(){
          return true
        };
        e.stopPropagation();
        api.setMerchantGuide().then(res => {
          if (res.status) {
            _this.$store.commit({
              type: 'SHOW_MERCHANT_GUIDE',
              status: true
            })
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
    },

    mounted: function () {
      let self = this;
      self.$nextTick(function () {
        self.FullPage  = new FullPage({
          id : 'pageContain',
          slideTime : 800,
          continuous : true,
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
          onSwipeStart : function(index, thisPage) {
            if(self.advBottomAgain){
              self.advBottomShow = true;
            }
          },
          beforeChange : function(index, thisPage) {
            self.advBottomShow = false;
          },
          callback : function(index, thisPage) {
            if(self.advBottomAgain){
              self.advBottomShow = true;
            }
          },
        });
      })
    },
  }
</script>

<style lang="scss" scoped>
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
    margin-top: 34px;
  }
  .adv-us{
    font-size: 18px;
    color: #fff;
  }
  .adv-text1-box{
    position: absolute;
    bottom: 80px;
    float: left;
    width: 100%;
  }
  .adv-text-img{
    width: 50%;
  }
  .adv-bottom-closed{
    position: absolute;
    top: 36%;
    right: 24%;
    z-index: 3;
    color: #fff;
    font-size: 32px;
    padding: 0 5px;
  }

  #pageContain {
    overflow: hidden;
  }
  .guider{
    position: absolute;
    bottom: 80px;
    transform: translateX(-64px);
  }
  .begin-now{
    width: 150px;
    height:50px;
    color: #fff;
    font-size: 16px;
    background:rgba(0,0,0,.2);
  }
  .begin-now:hover{
    background-color: #fff;
    color: #FF6633;
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
    z-index: 100;
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
    background: url('~assets/img/seller-guide/seller_guide_01.jpg') no-repeat  ;
    background-position: bottom center;
  }
  .page2 {
    background: url('~assets/img/seller-guide/seller_guide_02.jpg') no-repeat;
    background-position: bottom center;
  }
  .page3 {
    background: url('~assets/img/seller-guide/seller_guide_03.jpg') no-repeat;
    background-position: bottom center;
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

  .title,.titleEng {
    -webkit-animation:dragTop .7s ease-in-out both;
    -moz-animation:dragTop .7s ease-in-out both;
    -ms-animation:dragTop .7s ease-in-out both;
    animation:dragTop .7s ease-in-out both;
    text-align: center;
    color: #fff;
    top: 13%;
    left: 50%;
  }
  .title {
    -webkit-animation-delay: .8s;
    -moz-animation-delay:.8s;
    -ms-animation-delay:.8s;
    animation-delay:.8s;
    width: 100%;

  }
  .titleEng {
    -webkit-animation-delay: 1.2s;
    -moz-animation-delay:1.2s;
    -ms-animation-delay:1.2s;
    animation-delay:1.2s;
  }
  .move-arrow-down {
    -webkit-animation: float ease-in-out 2s infinite;
    animation: float ease-in-out 2s infinite;
  }
  @-webkit-keyframes float {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes float {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes dragTop {
    0% {
      opacity:0;
      transform:translateY(-70px)
    }
    60% {
      opacity:1;
      transform:translateY(20px)
    }
    90% {
      transform:translateY(-5px)
    }
    97% {
      transform:translateY(-1px)
    }
    100% {
      transform:translateY(0px)
    }
  }
  @-webkit-keyframes dragTop {
    0% {
      opacity:0;
      -webkit-transform:translateY(-70px)
    }
    60% {
      opacity:1;
      -webkit-transform:translateY(20px)
    }
    90% {
      -webkit-transform:translateY(-5px)
    }
    97% {
      -webkit-transform:translateY(-1px)
    }
    100% {
      -webkit-transform:translateY(0px)
    }
  }
  @-moz-keyframes dragTop {
    0% {
      opacity:0;
      -moz-transform:translateY(-70px)
    }
    60% {
      opacity:1;
      -moz-transform:translateY(20px)
    }
    90% {
      -moz-transform:translateY(-5px)
    }
    97% {
      -moz-transform:translateY(-1px)
    }
    100% {
      -moz-transform:translateY(0px)
    }
  }
  @-ms-keyframes dragTop {
    0% {
      opacity:0;
      -ms-transform:translateY(-70px)
    }
    60% {
      opacity:1;
      -ms-transform:translateY(20px)
    }
    90% {
      -ms-transform:translateY(-5px)
    }
    97% {
      -ms-transform:translateY(-1px)
    }
    100% {
      -ms-transform:translateY(0px)
    }
  }

</style>

