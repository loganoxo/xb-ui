<template>
  <div class="landing-page">
    <img src="~assets/img/landing-page/banner-top.png" class="banner">
    <img src="~assets/img/landing-page/troubled.png" class="troubled mt-5">
    <img src="~assets/img/landing-page/ensure.png" class="mt-20">
    <img src="~assets/img/landing-page/function.png" class="mt-30">
    <img src="~assets/img/landing-page/service.png" class="mt-30">
    <img src="~assets/img/landing-page/platform-comparing.png" class="mt-30">
    <img src="~assets/img/landing-page/process.png" class="mt-30">
    <div class="mt-30 pos-rel">
      <img src="~assets/img/landing-page/exclusive-black-tectnology.png">
      <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAxOTQwNF80ODQ2MjlfODAwMDE5NDA0XzJf" target="_blank" class="down-load-btn"></a>
    </div>
    <img src="~assets/img/landing-page/evaluation.png" class="mt-30">
    <img src="~assets/img/landing-page/buyer-shower.png" class="mt-30 mb-20">
    <div class="floating-window">
      <img src="~assets/img/landing-page/floating-window.png" class="bottom-window">
      <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAxOTQwNF80ODQ2MjlfODAwMDE5NDA0XzJf" target="_blank" class="receive-material"></a>
      <div class="fast-release" @click="toFastTaskRelease"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "landing-page",
    components: {
    },
    computed: {
      isLogin() {
        return this.$store.state.login;
      },
      getRole() {
        return this.$store.state.userInfo.role
      },
    },
    methods: {
      toFastTaskRelease() {
        if (this.isLogin && this.getRole === 1) {
          this.$router.push({name: 'TaskRelease'});
        } else {
          this.$router.push({path: '/register/seller-register'});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';

  .landing-page {
    position: relative;
    text-align: center;
    .banner {
      width: 100%;
    }
    .troubled {
      margin-top: -30px;
    }
    .down-load-btn {
      /*background: yellow;*/
      position: absolute;
      width: 50%;
      height: 70px;
      right: 0;
      bottom: 92px;
      left: 50%;
      margin-left: -25%;
    }

    .floating-window {
      position: fixed;
      left: 0;
      bottom: 0;
      .bottom-window {
        width: 100%;
      }
      .receive-material {
        position: absolute;
        width: 30%;
        height: 45px;
        right: 65px;
        top: 10px;
      }
      .fast-release {
        position: absolute;
        width: 30%;
        height: 45px;
        right: 65px;
        bottom: 10px;
      }
    }
  }
</style>
