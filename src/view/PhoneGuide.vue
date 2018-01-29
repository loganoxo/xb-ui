<template>
  <div class="seller-adv">
    <div id="pageContain">
      <div class="page page1 current ">
        <div class="contain">
          <img src="/static/img/seller-adv/phone-guide.jpg" class="contain-bg-img" alt="">
          <p class="text-align-rt cl-fff pos-rel mr-30 pt-20 page-text" style="z-index: 2;">
            <router-link to="/about-us" class="inline-block fs-22 cl-fff mr-20">
              <i class="ivu-icon ivu-icon-person-stalker vtc-text-btm fs-24"></i>
              关于我们
            </router-link>
            <span class="inline-block fs-22 cl-fff">|</span>
            <router-link  to="/seller-adv" class="inline-block fs-22 cl-fff ml-20">
              <img src="/static/img/icon/shop-icon.png" class="inline-block" alt=""  style="width: 20px; vertical-align: -3px;">
              商家入驻
            </router-link>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  export default {
    name: 'SellerAdv',
    components: {
      vanIcon: Icon,
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
        this.$router.push({path: '/register/seller-register'});
        e.stopPropagation();
        e.preventDefault()
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
        });
      })
    },
  }
</script>

<style lang="scss" scoped>

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
  .page-text{
    a{
      &:hover{
        color: #fff;
      }
    }
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
  .contain-bg-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>

