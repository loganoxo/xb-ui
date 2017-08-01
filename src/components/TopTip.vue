<template>
  <div id="topTip" class="top-tip">
    <div class="container">
      <p class="left">
        你好，<span class="user-name">freshbox02 </span>
        <span @click="signOut">[ 退出登录 ]</span>
      </p>
      <p class="right">
        <a href="">帮助中心</a>|
        <a href="">联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
  import api from '../config/apiConfig'

  export default {
    name: 'topTip',
    beforeMount() {
      this.$store.state.topShow = false;
    },
    created() {

    },
    data() {
      return {}
    },
    methods: {
      signOut() {
        api.signOut().then(res => {

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .top-tip {
    background-color: #F8F8F8;
    > div {
      background-color: #F8F8F8;
      height: 30px;
      line-height: 30px;
      span.user-name {
        color: $mainColor;
        padding-right: 5px;
      }
      p.left {
        span {
          cursor: pointer;
        }
      }
      p.right {
        a {
          color: #666;
          padding: 0 5px;
        }

      }
    }
  }
</style>
