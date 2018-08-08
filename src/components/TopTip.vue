<template>
  <div id="topTip" class="top-tip bg-f8f8f8">
    <div class="notice text-ct bg-FFFDD6 main-color" v-if="whetherShowNotice">{{noticeTitle}}
      <router-link to="/notice" class="main-color">【阅读全文】</router-link>
    </div>
    <div class="container" id="buyershowPosition">
      <p v-show="isLogin" class="left">
        你好，<span class="user-name">
        <span v-if="getUserInfo.role === 1 && isMember" class="mr-5">
          <img v-if="getMemberVersionLevel === 200" src="~assets/img/common/vip.png" alt="vipLogo">
          <img v-if="getMemberVersionLevel === 300" src="~assets/img/common/svip.png" alt="svipLogo">
        </span>
        <router-link class="blue" tag="span" to="/user/user-home" @click.native="cancelActivityCategory">
          <span class="main-color" v-if="getUserInfo.role === 1"> 商家 </span>
          <span class="main-color" v-if="getUserInfo.role === 0"> 拿手 </span>
          {{decodeURIComponent(getUserInfo.nickname)}}
        </router-link>
        </span>
        <span @click="goOut">[ 退出登录 ]</span>
        <a v-if="getUserInfo.role === 1" target="_blank" :href="pcMerchantQqGroup.remark" class="ml-10 qq-tip">
          <img src="~assets/img/common/qq.png" alt="" >
          加入QQ交流群：
          <span >{{pcMerchantQqGroup.configValue}}</span>
          <span class="cl000">(内幕玩法抢先得)</span>
        </a>
        <a v-if="getUserInfo.role === 0" target="_blank" href="https://jq.qq.com/?_wv=1027&k=5ZMH7Iu" class="ml-10 qq-tip">
          <img src="~assets/img/common/qq.png" alt="" >
          加入QQ交流群：
          <span >672268939</span>
          <span class="cl000">(第一时间抢便宜)</span>
        </a>
      </p>
      <p v-show="!isLogin" class="left">
        你好，欢迎来到白拿拿！
        <span class="user-name">
          <router-link to="/login">登录白拿拿</router-link>
        </span>
        <span class="user-name">
          <router-link to="/sel-role">免费注册</router-link>
        </span>
      </p>
      <p class="right">
        <router-link to="/" @click.native="selTaskCategoryHome">
          <icon type="md-home" size="16" class="vtc-text-btm"/>
          白拿拿首页
        </router-link>
        <router-link to="/user/user-home" @click.native="cancelActivityCategory">
          <Icon type="md-person" size="16" class="vtc-text-btm"/>
          个人中心
        </router-link>
        <router-link v-if="getRole === 1" to="/promotion/promotion-regulation" @click.native="cancelActivityCategory">
          <img src="~assets/img/merchant-promotion/purse-on.png" alt="" width="16" height="16" class="vtc-text-btm">
          赚点钱儿
        </router-link>
        <router-link to="/user/help-center/faq" @click.native="cancelActivityCategory">
          <Icon type="md-help-buoy" size="16" class="vtc-text-btm"/>
          帮助中心
        </router-link>
        <router-link to="/about-us">
          <Icon type="md-help-circle" size="16" class="vtc-text-btm"/>
          关于我们
        </router-link>
        <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1624363653" target="_blank" v-if="getUserInfo.role === 1">
          <Icon type="ios-contacts" size="16" class="vtc-text-btm"/>
          联系客服
        </a>
        <a href="https://jq.qq.com/?_wv=1027&k=5ZMH7Iu" target="_blank" v-if="getUserInfo.role === 0">
          <Icon type="ios-contacts" size="16" class="vtc-text-btm"/>
          联系客服
        </a>
        <a>
          <Tooltip content="按Ctrl + D 收藏本站" placement="bottom-end">
            <Icon type="md-star" size="16" class="vtc-text-btm"/>
            收藏本站
         </Tooltip>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  import {Icon, Tooltip} from 'iview'
  import api from '@/config/apiConfig'
  import {mapActions} from 'vuex'

  export default {
    name: 'top-tip',
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
      getRole() {
        return this.$store.state.userInfo.role
      },
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },
      isMember() {
        return this.$store.getters.isMemberOk
      },
      pcMerchantQqGroup() {
        return this.$store.getters.getSysConfigValue('pcMerchantQqGroup')
      },
    },
    created() {
      this.getUserGetAnnouncement();
    },
    data() {
      return {
        noticeTitle:null,
        whetherShowNotice:false,
      }
    },
    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      openMember() {
        this.$router.push({name:'VipMember'})
      },
      goOut() {
        let _this = this;
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'Login'})
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      getUserGetAnnouncement(){
        let self = this;
        api.getUserGetAnnouncement({
          type:'all'
        }).then( res => {
          if (res && res.length>0){
            self.noticeTitle = res[0].title;
            self.whetherShowNotice = true;
          }
        })
      },
      selTaskCategoryHome(){
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'home'
        });
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: 'home'
        });
      },
      cancelActivityCategory(){
        let self = this;
        // self.$store.commit({
        //   type: 'TASK_CATEGORY_LIST',
        //   info: ''
        // });
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: ''
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .bg-f8f8f8{
    background-color: #F8F8F8;
  }
  .bg-FFFDD6{
    background-color: #FFFDD6;
  }
  .top-tip {
    /*background-color: #F8F8F8;*/
    > div {
      /*background-color: #F8F8F8;*/
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
          &:hover{
            color: red;
          }
        }
      }
      p.right {
        a {
          color: #666;
          padding: 0 5px;
          &:hover{
            color: $mainColor;
          }
        }

      }
    }
  }
</style>
