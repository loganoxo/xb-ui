<template>
  <div class="clear">
    <div class="my-xiu-ba container clear">
      <!--<div class="my-xiu-ba-title">-->
        <!--<h1 class="left">我的秀吧</h1>-->
      <!--</div>-->
      <div class="container clear">
        <div class="tmy-xiu-ba-con clear">
          <div class="my-xiu-ba-con-nav left">
            <ul v-if="getUserInfoRole === 1">
              <li :class="{isSelect:isSelect ==='userHome'}" @click="selectNavigate('userHome')">
                <Icon type="person-stalker"></Icon>
                <router-link to="/user/user-home">我的主页</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='taskRelease'}" @click="selectNavigate('taskRelease')">
                <Icon type="compose"></Icon>
                <router-link to="/user/task-release">发布试用活动</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='activityManagement'}" @click="selectNavigate('activityManagement')">
                <Icon type="clipboard"></Icon>
                <router-link to="/user/activity-management/list">试用活动管理</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='moneyManagement'}" @click="selectNavigate('moneyManagement')">
                <Icon type="social-yen"></Icon>
                <router-link to="/user/money-management/account-info">资金管理</router-link>
              </li>
              <li :class="{isSelect:isSelect ===' tradingRecord'}" @click="selectNavigate('tradingRecord')">
                <Icon type="loop"></Icon>
                <router-link to="/user/task-release">交易记录</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='personalSetting'}" @click="selectNavigate('personalSetting')">
                <Icon type="gear-b"></Icon>
                <router-link to="/user/personal-setting">个人设置</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='helpCenter'}" @click="selectNavigate('helpCenter')">
                <Icon type="help-buoy"></Icon>
                <router-link to="/user/task-release">帮助中心</router-link>
              </li>
            </ul>
            <ul v-if="getUserInfoRole === 0">
              <li :class="{isSelect:isSelect ==='userHome'}" @click="selectNavigate('userHome')">
                <Icon type="person-stalker"></Icon>
                <router-link to="/user/user-home">我的主页</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='myProbation'}" @click="selectNavigate('myProbation')">
                <Icon type="compose"></Icon>
                <router-link to="/user/my-probation/wait">我的试用</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='myTrialReport'}" @click="selectNavigate('myTrialReport')">
                <Icon type="clipboard"></Icon>
                <router-link to="/user/my-trial-report">我的报告</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='moneyManagement'}" @click="selectNavigate('moneyManagement')">
                <Icon type="social-yen"></Icon>
                <router-link to="/user/money-management">资金管理</router-link>
              </li>
              <li :class="{isSelect:isSelect ===' tradingRecord'}" @click="selectNavigate('tradingRecord')">
                <Icon type="loop"></Icon>
                <router-link to="/user/personal-setting">交易记录</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='personalSetting'}" @click="selectNavigate('personalSetting')">
                <Icon type="gear-b"></Icon>
                <router-link to="/user/personal-setting">个人设置</router-link>
              </li>
              <li :class="{isSelect:isSelect ==='helpCenter'}" @click="selectNavigate('helpCenter')">
                <Icon type="help-buoy"></Icon>
                <router-link to="/user/personal-setting">帮助中心</router-link>
              </li>
            </ul>
          </div>
          <div class="my-xiu-ba-con-right right clear">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import TopTip from "@/components/TopTip.vue";
  import {setStorage, getStorage, removeStorage} from '@/config/utils'
  import { mapActions } from 'vuex'
  export default {
    name: 'MyXiuBa',
    components: {
      TopTip: TopTip,
      Icon: Icon,
    },
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    data() {
      return {
        isSelect:"userHome",
        userInfo: '',
      }

    },
    mounted() {

    },
    created() {
      this.getBalance();
      let type = getStorage("navigationTagsName");
      if(type){
        this.selectNavigate(type);
      }else{
        this.selectNavigate("userHome");
      }
    },
    watch:{
      $route(to,from){
      }
    },
    computed: {
      getUserInfoRole(){
        return this.$store.state.userInfo.role;
      }
    },
    methods: {
      ...mapActions([
        'getBalance'
      ]),
      selectNavigate(type) {
        this.isSelect = type;
        setStorage('navigationTagsName', type);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .my-xiu-ba-title{
    height: 50px;
    background-color:$mainColor;
    position: relative;
    h1{
      @include sc(28px,#fff);
      position: absolute;
      left: 22px;
      line-height: 50px;
    }
  }
  .tmy-xiu-ba-con{
    margin-top: 12px;
    padding-bottom: 50px;
  }
  .my-xiu-ba-con-nav{
    background-color:#F8F8F8;
    border:1px solid #F4F4F4;
    ul{
      li{
        height:38px;
        line-height: 38px;
        color:#999;
        padding-left:16px;
        padding-right:16px;

        &:hover{
          color:$mainColor!important;
          background-color:#fff;
          border-top:1px solid #F4F4F4;
          border-bottom:1px solid #F4F4F4;
        }
      }
      a{
        color:inherit;
        font-size: 14px;
        display: inline-block;
        height: 38px;
      }
      i{
        font-size: 18px;
        padding-right: 6px;
      }
    }
  }
  .isSelect{
    color:$mainColor!important;
    background-color:#fff;
    border-top:1px solid #F4F4F4;
    border-bottom:1px solid #F4F4F4;
  }
  .my-xiu-ba-con-right{
    width: 86%;
  }
</style>
