<template>
  <div id="topTip" class="top-tip">
    <div class="container">

      <p v-show="isLogin" class="left">
        你好，<span class="user-name">
        <span  @click="openMember"  v-if="getUserInfo.role == 1&&!getMemberLevel">
           <Tooltip content="亲当前未开通会员，点击图标马上开通" placement="bottom-start" >
              <span><Icon  type="social-vimeo" color="gray"></Icon></span>
            </Tooltip>
        </span>
        <span  v-if="getUserInfo.role == 1&&getMemberLevel">
          <Icon  type="social-vimeo" color="red"></Icon>
        </span>
        <router-link to="/user/user-home">
          <span v-if="getUserInfo.role == 1"> 商家 </span>
          <span v-if="getUserInfo.role == 0"> 秀客 </span>
          {{decodeURIComponent(getUserInfo.nickname)}}
        </router-link>
        </span>
        <span @click="goOut">[ 退出登录 ]</span>
        <a v-if="getUserInfo.role == 1" href="" class="ml-10 qq-tip">
          <img src="~assets/img/common/qq.png" alt="" >
          加入QQ交流群：
          <span >123456</span>
        </a>
        <a v-if="getUserInfo.role == 0" href="" class="ml-10 qq-tip">
          <img src="~assets/img/common/qq.png" alt="" >
          加入QQ交流群：
          <span >654321</span>
        </a>
      </p>
      <p v-show="!isLogin" class="left">
        你好，欢迎来到秀吧！
        <span class="user-name">
          <router-link to="/login">登录秀吧</router-link>
        </span>
        <span class="user-name">
          <router-link to="/sel-role">免费注册</router-link>
        </span>
        <!--<a href="" class="ml-10 qq-tip">-->
          <!--<img src="~assets/img/common/qq.png" alt="" >-->
          <!--加入QQ交流群：<span>478732305</span>-->
        <!--</a>-->
      </p>
      <p class="right">
        <router-link to="/">
          <i data-v-38a9a25e="" class="ivu-icon ivu-icon-home vtc-text-btm fs-16"></i>
          秀吧首页
        </router-link>
        <router-link to="/user/user-home">
          <i data-v-38a9a25e="" class="ivu-icon ivu-icon-person vtc-text-btm fs-16"></i>
          个人中心
        </router-link>
        <router-link to="/user/help-center/faq">
          <i data-v-38a9a25e="" class="ivu-icon ivu-icon-help-buoy vtc-text-btm fs-16"></i>
          帮助中心
        </router-link>
        <a>
          <i data-v-38a9a25e="" class="ivu-icon ivu-icon-person-stalker vtc-text-btm fs-16"></i>
          联系客服
        </a>
        <a>
          <Tooltip content="按Ctrl + D 收藏本站" placement="bottom-end">
            <i data-v-38a9a25e="" class="ivu-icon ivu-icon-star vtc-text-btm fs-16"></i>
            收藏本站
         </Tooltip>
        </a>

      </p>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Tooltip from 'iview/src/components/tooltip'
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
    components: {
      Icon: Icon,
      Tooltip: Tooltip,
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfo() {
        return this.$store.state.userInfo
      },
      getMemberLevel:function () {
        return this.$store.state.userInfo.memberLevel
      },
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
      openMember(){
        this.$router.push({name:'VipMember'})
      },
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
      a.qq-tip{
        color: $mainColor;
        img{
          vertical-align: text-bottom;
          width: 16px;
        }
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
