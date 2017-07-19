<template>
  <div class="login-ctt">
    <div class="container">
      <div class="login-lf">
        <img src="~assets/img/login/login_01.png" alt="">
      </div>
      <div class="login-rt">
        <div class="login-rt-ctt">
          <p>
            <a href="">
              <img src="" alt="">
              用户登录
            </a>
            <a href="">
              <img src="" alt="">
              手机动态码登录
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'login',
    components: {
    },
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
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .login-ctt {
    padding-top: 70px;
    .login-lf, .login-rt {
      float: left;
    }
    .login-rt {
      .login-rt-ctt {
        width: 404px;
        border: 1px solid #eee;
      }
    }
  }
</style>
