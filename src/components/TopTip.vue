<template>
  <div id="topTip" class="top-tip">
    <div class="container">

      <p v-show="isLogin" class="left">
        你好，<span class="user-name">

        <router-link to="/user">{{getUserInfo.phone}} </router-link>
        </span>
        <span @click="signOut">[ 退出登录 ]</span>
      </p>
      <p v-show="!isLogin" class="left">
        你好，欢迎来到秀吧！
        <span class="user-name">
          <router-link to="/login">登录</router-link>
        </span>
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
  import {setStorage, getStorage, removeStorage} from '../config/utils'

  export default {
    name: 'topTip',
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfo() {
        return this.$store.state.userInfo
      }
    },
    created() {

    },
    data() {
      return {}
    },
    methods: {
      signOut() {
        let _this = this;
        this.$router.push({name: 'home'});
        api.signOut().then(res => {
          if (res.status) {
            _this.$store.commit({
              type: 'OUT_LOGIN'
            });
            _this.$router.push({name: 'login'});
          }
        });
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
