<template>
  <div id="topTip" class="top-tip">
    <div class="container">

      <p v-show="isLogin" class="left">
        你好，<span class="user-name">
        <router-link to="/user">{{getUserInfo.phone}} </router-link>
        </span>
        <span @click="goOut">[ 退出登录 ]</span>
      </p>
      <p v-show="!isLogin" class="left">
        你好，欢迎来到秀吧！
        <span class="user-name">
          <router-link to="/login">登录</router-link>
        </span>
      </p>
      <p class="right">
        <a>帮助中心</a>|
        <a>联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, removeStorage} from '../config/utils'
  import {mapActions} from 'vuex'

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
      ...mapActions([
        'loggedOut'
      ]),
      goOut() {
        let _this = this;
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'login'})
          }else{
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
