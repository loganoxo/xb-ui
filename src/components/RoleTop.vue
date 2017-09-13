<template>
  <div id="top" class="">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="~assets/img/common/logo.png" alt="">
      </router-link>
      <div class="right top-rt">
        <router-link to="/">首页</router-link>
        <span>|</span>
        <router-link to="/login">登录</router-link>
        <span>|</span>
        <a href="">帮助中心</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  #top {
    background-color: #F8F8F8;
    > div {
      background-color: #F8F8F8;
      height: 80px;
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
