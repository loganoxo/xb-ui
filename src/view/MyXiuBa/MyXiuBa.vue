<template>
  <div class="my-xiu-ba container tmy-xiu-ba-con clear">
    <div class="my-xiu-ba-con-nav left" v-if="isLogin">
      <!--商家管理导航-->
      <ul v-if="getUserInfoRole === 1">
        <li :class="{isSelect:isSelect ==='UserHome'}">
          <Icon type="person-stalker"></Icon>
          <router-link to="/user/user-home">我的主页</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='TaskReleaseProcess'}">
          <Icon type="compose"></Icon>
          <router-link to="/user/task-release">发布活动</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'ActivitiesList' || isSelect === 'ApproveShowker' || isSelect === 'ActivityDetail' || isSelect === 'ActivityLog'}">
          <Icon type="clipboard"></Icon>
          <router-link to="/user/activity-management/list">活动管理</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'TaskWaitAudit' || isSelect === 'TaskPassAudit' || isSelect === 'TaskFailAudit' || isSelect === 'ProbationReport'}">
          <Icon type="ios-paper"></Icon>
          <router-link to="/user/task-management/wait">任务管理</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='AccountInfo' || isSelect === 'PayMoney' || isSelect === 'GetoutMoney' || isSelect === 'AccountManagement'}">
          <Icon type="social-yen"></Icon>
          <router-link to="/user/money-management/account-info">资金管理</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='TransactionRecord'}">
          <Icon type="loop"></Icon>
          <router-link to="/user/money-management/transaction-record">交易记录</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='VipMember'}">
          <Icon type="ribbon-b"></Icon>
          <router-link to="/user/vip-member">VIP会员</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='PersonalAccountInfo' || isSelect === 'WwBind' || isSelect === 'Verfied'}">
          <Icon type="gear-b"></Icon>
          <router-link to="/user/personal-setting/personal-account-info">个人设置</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'faq' || isSelect === 'faqSeller' || isSelect === 'faqShowker'}">
          <Icon type="help-buoy"></Icon>
          <router-link to="/user/help-center/faq">帮助中心</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'Recommend'}">
          <Icon type="share"></Icon>
          <router-link to="/user/recommend">邀请有礼</router-link>
        </li>
      </ul>

      <!--秀客管理导航-->
      <ul v-else-if="getUserInfoRole === 0">
        <li :class="{isSelect:isSelect ==='UserHome'}">
          <Icon type="person-stalker"></Icon>
          <router-link to="/user/user-home">我的主页</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'ApplyWaitAudit' || isSelect === 'ApplyPassAudit' || isSelect === 'ApplyFailAudit'}">
          <Icon type="compose"></Icon>
          <router-link to="/user/my-probation/pass">我的活动</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='MyTrialReport'}">
          <Icon type="clipboard"></Icon>
          <router-link to="/user/my-trial-report">我的买家秀</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='AccountInfo' || isSelect === 'PayMoney' || isSelect === 'GetoutMoney' || isSelect === 'AccountManagement'}">
          <Icon type="social-yen"></Icon>
          <router-link to="/user/money-management/account-info">资金管理</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='TransactionRecord'}">
          <Icon type="loop"></Icon>
          <router-link to="/user/money-management/transaction-record">交易记录</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='PersonalAccountInfo' || isSelect === 'WwBind' || isSelect === 'Verfied'}">
          <Icon type="gear-b"></Icon>
          <router-link to="/user/personal-setting/personal-account-info">个人设置</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'faq' || isSelect === 'faqSeller' || isSelect === 'faqShowker'}">
          <Icon type="help-buoy"></Icon>
          <router-link to="/user/help-center/faq">帮助中心</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'Recommend'}">
          <Icon type="share"></Icon>
          <router-link to="/user/recommend">邀请有礼</router-link>
        </li>
      </ul>
    </div>
    <div class="my-xiu-ba-con-right left clear ml-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import 'social-share.js/dist/css/share.min.css'
  import 'social-share.js/dist/js/social-share.min.js'
  export default {
    name: 'MyXiuBa',
    components: {
      Icon: Icon,
    },
    data() {
      return {
        isSelect: "UserHome",
      }
    },
    mounted() {

    },
    created() {
      this.isSelect = this.$route.name;
    },
    watch: {
      $route(to) {
        this.isSelect = to.name;
        if(to.name === 'Recommend'){
            this.$router.go(0);
        }
      }
    },
    computed: {
      getUserInfoRole() {
        return this.$store.state.userInfo.role;
      },
      isLogin() {
        return this.$store.state.login
      },
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .tmy-xiu-ba-con {
    margin-top: 12px;
    padding-bottom: 50px;
  }

  .my-xiu-ba-con-nav {
    background-color: #F8F8F8;
    border: 1px solid #F4F4F4;
    width: 12%;
    ul {
      li {
        height: 38px;
        line-height: 38px;
        color: #999;
        padding-left: 16px;
        padding-right: 16px;
        text-align: center;
        &:hover {
          color: $mainColor !important;
          background-color: #fff;
          border-top: 1px solid #F4F4F4;
          border-bottom: 1px solid #F4F4F4;
        }
      }
      a {
        color: inherit;
        font-size: 14px;
        display: inline-block;
        height: 38px;
      }
      i {
        font-size: 18px;
        padding-right: 6px;
      }
    }
  }

  .isSelect {
    color: $mainColor !important;
    background-color: #fff;
    border-top: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
  }

  .my-xiu-ba-con-right {
    width: 86%;
  }
</style>
