<template>
  <div class="role-top">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="~assets/img/common/top-logo-sj.png"  alt="">
      </router-link>
      <div class="right top-rt">
        <router-link to="/">首页</router-link>
        <span>|</span>
        <router-link to="/login" v-if="!isLogin">登录</router-link>
        <span v-if="!isLogin">|</span>
        <router-link to="/register/seller-register">注册</router-link>
        <span>|</span>
        <router-link to="/seller-adv">商家入驻必读</router-link>
        <span>|</span>
        <router-link to="/about-us">关于我们</router-link>
        <span>|</span>
        <router-link to="/user/help-center/faq">帮助中心</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data () {
      return {}
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
    },
  }
</script>

<style lang="scss" scoped>

  .role-top {
    background-color: #F8F8F8;
    > div {
      background-color: #F8F8F8;
      height: 100px;
    }
    border-bottom: 1px solid #F1F1F1;
    .logo-link {
      float: left;
    }
    .top-rt {
      display: table;
      height: 100%;
      a, span {
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
        color: #B0B0B0;
      }
      a {
        padding: 10px;
      }
    }
  }
</style>
