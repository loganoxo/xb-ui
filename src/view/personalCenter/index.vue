<template>
  <div class="my-xiu-ba container tmy-xiu-ba-con clear">
    <div v-if="isLogin" class="my-xiu-ba-con-nav left">
      <!--商家管理导航-->
      <ul v-if="getUserInfoRole === 1">
        <li :class="{isSelect:isSelect ==='UserHome'}">
          <span class="home-page icon-size"></span>
          <router-link to="/user/user-home">我的主页</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='StoreBindRules' || isSelect === 'StoreBindOperating'}">
          <span class="bind-store icon-size"></span>
          <router-link to="/user/bind-store/store-bind-rules">店铺绑定</router-link>
        </li>

        <li :class="{isSelect:isSelect ==='TaskRelease' || isSelect ==='FastTaskRelease'}">
          <span class="issue-activity icon-size"></span>
          <router-link to="/user/task-release">发布活动</router-link>
        </li>
        <li
          :class="{isSelect:isSelect === 'ActivitiesList' || isSelect === 'ApproveShowker' || isSelect === 'ActivityDetail' || isSelect === 'ActivityLog'}">
          <span class="activity-management-nav icon-size"></span>
          <router-link to="/user/activity-management/list">活动管理</router-link>
        </li>
        <li
          :class="{isSelect:isSelect === 'TaskWaitAudit' || isSelect === 'TaskPassAudit' || isSelect === 'TaskFailAudit' || isSelect === 'ProbationReport'}">
          <span class="task-management-nav icon-size"></span>
          <router-link to="/user/task-management/wait">任务管理</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'releaseGood'}" class="pos-rel">
          <span class="icon-size release-good"></span>
          <img src="~assets/img/icon/new.png" alt="" class="new-task">
          <router-link to="/user/release-good">发布商品</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'goodManagement'}" class="pos-rel">
          <span class="icon-size good-management"></span>
          <img src="~assets/img/icon/new.png" alt="" class="new-task">
          <router-link to="/user/good-management">商品管理</router-link>
        </li>
        <!--<li :class="{isSelect:isSelect ==='TaskFans'}" class="pos-rel">-->
          <!--<span class="task-fans icon-size"></span>-->
          <!--<img src="~assets/img/icon/new.png" alt="" class="new-task">-->
          <!--<router-link to="/user/task-fans">微信加粉</router-link>-->
        <!--</li>-->
        <li
          :class="{isSelect:isSelect ==='AccountInfo' || isSelect === 'PayMoney' || isSelect === 'GetoutMoney' || isSelect === 'AccountManagement'}">
          <span class="money-management-nav icon-size"></span>
          <router-link to="/user/money-management/account-info">资金管理</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='TransactionRecord'}">
          <span class="transaction-record icon-size"></span>
          <router-link to="/user/money-management/transaction-record">交易记录</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='VipMemberOrder' || isSelect ==='VipMemberInstructions'}">
          <span class="vip-member-nav icon-size"></span>
          <router-link to="/user/vip-member/order">VIP会员</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='PersonalAccountInfo' || isSelect === 'WwBind' || isSelect === 'Verfied'}">
          <Tooltip content="上传自定义个性头像，可以提高活动申请通过率哦！" placement="right">
            <span class="personage-set-nav icon-size"></span>
            <router-link to="/user/personal-setting/personal-account-info">个人设置</router-link>
          </Tooltip>
        </li>
        <li :class="{isSelect:isSelect === 'Faq' || isSelect === 'FaqSeller' || isSelect === 'FaqShowker'}">
          <span class="help-center icon-size"></span>
          <router-link to="/user/help-center/faq">帮助中心</router-link>
        </li>
        <!-- <li :class="{isSelect:isSelect === 'Recommend'}" class="pos-rel">
           <span class="recommend icon-size"></span>
           <img src="/static/img/icon/hot.gif" alt="" style="position: absolute;right: 18px;top: -6px;">
           <router-link to="/user/recommend">邀请有礼</router-link>
         </li>-->
        <li class="pos-rel">
          <span class="service-clause icon-size"></span>
          <img src="/static/img/icon/importance.gif" alt="" style="position: absolute;right: 22px;top: -12px;">
          <a @click="openClauseModel">服务条款</a>
        </li>
        <li :class="{isSelect:isSelect === 'MyAppeal'}" class="pos-rel">
          <span class="icon-size my-appeal-nav"></span>
          <router-link to="/user/my-appeal">我的建议</router-link>
        </li>
        <li :class="{isSelect:isSelect === 'BlackListManagement'}" class="pos-rel">
          <span class="icon-size black-management"></span>
          <router-link to="/user/black-list-management">拿手违规申诉</router-link>
        </li>
      </ul>

      <!--拿手管理导航-->
      <ul v-else-if="getUserInfoRole === 0">
        <li :class="{isSelect:isSelect ==='UserHome'}">
          <span class="home-page icon-size"></span>
          <router-link to="/user/user-home">我的主页</router-link>
        </li>
        <li
          :class="{isSelect:isSelect === 'ApplyWaitAudit' || isSelect === 'ApplyPassAudit' || isSelect === 'ApplyFailAudit'}">
          <span class="my-activity icon-size"></span>
          <router-link to="/user/my-probation/pass">我的活动</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='MyTrialReport'}">
          <span class="my-buyershow-nav icon-size"></span>
          <router-link to="/user/my-trial-report">我的买家秀</router-link>
        </li>
        <li
          :class="{isSelect:isSelect ==='AccountInfo' || isSelect === 'PayMoney' || isSelect === 'GetoutMoney' || isSelect === 'AccountManagement'}">
          <span class="money-management-nav icon-size"></span>
          <router-link to="/user/money-management/account-info">资金管理</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='TransactionRecord'}">
          <span class="transaction-record icon-size"></span>
          <router-link to="/user/money-management/transaction-record">交易记录</router-link>
        </li>
        <li :class="{isSelect:isSelect ==='PersonalAccountInfo' || isSelect === 'WwBind' || isSelect === 'Verfied'}">
          <Tooltip content="上传自定义个性头像，可以提高活动申请通过率哦！" placement="right">
            <span class="personage-set-nav icon-size"></span>
            <router-link to="/user/personal-setting/personal-account-info">个人设置</router-link>
          </Tooltip>
        </li>
        <li :class="{isSelect:isSelect === 'Faq' || isSelect === 'FaqSeller' || isSelect === 'FaqShowker'}">
          <span class="help-center icon-size"></span>
          <router-link to="/user/help-center/faq">帮助中心</router-link>
        </li>
        <!-- <li class="pos-rel" :class="{isSelect:isSelect === 'Recommend'}">
           <span class="recommend icon-size"></span>
           <img src="/static/img/icon/hot.gif" alt="" style="position: absolute;right: 22px;top: -4px;">
           <router-link to="/user/recommend">邀请有礼</router-link>
         </li>-->
        <!--<li class="pos-rel">-->
          <!--<span class="service-clause icon-size"></span>-->
          <!--<img src="/static/img/icon/importance.gif" alt="" style="position: absolute;right: 22px;top: -12px;">-->
          <!--<a @click="openClauseModel">服务条款</a>-->
        <!--</li>-->
        <li :class="{isSelect:isSelect === 'MyAppeal'}" class="pos-rel">
          <span class="icon-size my-appeal-nav"></span>
          <router-link to="/user/my-appeal">我的建议</router-link>
        </li>
      </ul>
    </div>
    <div class="my-xiu-ba-con-right left clear ml-20">
      <router-view></router-view>
    </div>
    <!--用户服务条款弹框-->
    <div v-if="isShowUserClause" class="user-clause-model">
      <user-clause @closeClauseModel="closeClauseModel" :isShowCloseTip="false"
                   :isShowClause="getUserInfoRole === 0 ? 'showker' : 'merchant'"></user-clause>
    </div>
  </div>
</template>

<script>
  import {Tooltip} from 'iview'
  import UserClause from '@/components/UserClause'

  export default {
    name: 'personal-center',
    components: {
      Tooltip: Tooltip,
      UserClause: UserClause,
    },
    data() {
      return {
        isSelect: "UserHome",
        isShowUserClause: false,
      }
    },

    mounted() {

    },
    created() {
      let _this = this;
      _this.isSelect = this.$route.name;
    },
    watch: {
      $route(to) {
        this.isSelect = to.name;
      }
    },
    computed: {
      getUserInfoRole() {
        return this.$store.getters.getUserRole;
      },
      isLogin() {
        return this.$store.state.login
      },
    },
    methods: {
      closeClauseModel() {
        this.isShowUserClause = false;
      },
      openClauseModel() {
        this.isShowUserClause = true;
      }
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
        text-align: left;
        &:hover {
          color: $mainColor !important;
          background-color: #fff;
          border-top: 1px solid #F4F4F4;
          border-bottom: 1px solid #F4F4F4;
        }
        &:hover {
          .home-page {
            background-image: url("~assets/img/userhome-merchant/my-homepage-on.png");
          }
        }
        &:hover {
          .bind-store {
            background-image: url("~assets/img/userhome-merchant/store-bind-on.png");
          }
        }
        &:hover {
          .help-center {
            background-image: url("~assets/img/userhome-merchant/help-center-on.png");
          }
        }
        &:hover {
          .issue-activity {
            background-image: url("~assets/img/userhome-merchant/issue-activity-on.png");
          }
        }
        &:hover {
          .activity-management-nav {
            background-image: url("~assets/img/userhome-merchant/activity-management-on.png");
          }
        }
        &:hover {
          .task-management-nav {
            background-image: url("~assets/img/userhome-merchant/task-management-on.png");
          }
        }
        &:hover {
          .money-management-nav {
            background-image: url("~assets/img/userhome-merchant/money-management-on.png");
          }
        }
        &:hover {
          .transaction-record {
            background-image: url("~assets/img/userhome-merchant/transaction-record-on.png");
          }
        }
        &:hover {
          .vip-member-nav {
            background-image: url("~assets/img/userhome-merchant/vip-member-on.png");
          }
        }
        &:hover {
          .personage-set-nav {
            background-image: url("~assets/img/userhome-merchant/personage-set-on.png");
          }
        }
        &:hover {
          .recommend {
            background-image: url("~assets/img/userhome-merchant/invite-on.png");
          }
        }
        &:hover {
          .service-clause {
            background-image: url("~assets/img/userhome-merchant/service-clause-on.png");
          }
        }
        &:hover {
          .my-appeal-nav {
            background-image: url("~assets/img/userhome-merchant/my-appeal-on.png");
          }
        }
        &:hover {
          .my-activity {
            background-image: url("~assets/img/userhome-showker/my-activity-on.png");
          }
        }
        &:hover {
          .my-buyershow-nav {
            background-image: url("~assets/img/userhome-showker/my-buyerShow-on.png");
          }
        }
        &:hover {
          .black-management {
            background-image: url("~assets/img/userhome-merchant/black-management-off.png");
          }
        }
        &:hover {
          .task-fans {
            background-image: url("~assets/img/userhome-merchant/task-fans-on.png");
          }
        }
        &:hover {
          .release-good {
            background-image: url("~assets/img/userhome-merchant/release-good-on.png");
          }
        }
        &:hover {
          .good-management {
            background-image: url("~assets/img/userhome-merchant/good-management-on.png");
          }
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

  .icon-size {
    display: inline-block;
    width: 13px;
    height: 13px;
    background-size: 13px 13px;
    background-repeat: no-repeat;
    margin-right: 5px;
    transform: translateY(1px);
  }

  .home-page {
    background-image: url("~assets/img/userhome-merchant/my-homepage-off.png");
  }

  .isSelect {
    .home-page {
      background-image: url("~assets/img/userhome-merchant/my-homepage-on.png");
    }
  }

  .bind-store {
    background-image:url("~assets/img/userhome-merchant/store-bind-off.png") ;
  }

  .isSelect {
    .bind-store {
      background-image: url("~assets/img/userhome-merchant/store-bind-on.png");
    }
  }

  .issue-activity {
    background-image: url("~assets/img/userhome-merchant/issue-activity-off.png");
  }

  .isSelect {
    .issue-activity {
      background-image: url("~assets/img/userhome-merchant/issue-activity-on.png");
    }
  }

  .activity-management-nav {
    background-image: url("~assets/img/userhome-merchant/activity-management-off.png");
  }

  .isSelect {
    .activity-management-nav {
      background-image: url("~assets/img/userhome-merchant/activity-management-on.png");
    }
  }

  .task-management-nav {
    background-image: url("~assets/img/userhome-merchant/task-management-off.png");
  }

  .isSelect {
    .task-management-nav {
      background-image: url("~assets/img/userhome-merchant/task-management-on.png");
    }
  }

  .task-fans {
    background-image: url("~assets/img/userhome-merchant/task-fans-off.png");
  }

  .isSelect {
    .task-fans {
      background-image: url("~assets/img/userhome-merchant/task-fans-on.png");
    }
  }

  .money-management-nav {
    background-image: url("~assets/img/userhome-merchant/money-management-off.png");
  }

  .isSelect {
    .money-management-nav {
      background-image: url("~assets/img/userhome-merchant/money-management-on.png");
    }
  }

  .transaction-record {
    background-image: url("~assets/img/userhome-merchant/transaction-record-off.png");
  }

  .isSelect {
    .transaction-record {
      background-image: url("~assets/img/userhome-merchant/transaction-record-on.png");
    }
  }

  .vip-member-nav {
    background-image: url("~assets/img/userhome-merchant/vip-member-off.png");
  }

  .isSelect {
    .vip-member-nav {
      background-image: url("~assets/img/userhome-merchant/vip-member-on.png");
    }
  }

  .personage-set-nav {
    background-image: url("~assets/img/userhome-merchant/personage-set-off.png");
  }

  .isSelect {
    .personage-set-nav {
      background-image: url("~assets/img/userhome-merchant/personage-set-on.png");
    }
  }

  .recommend {
    background-image: url("~assets/img/userhome-merchant/invite-off.png");
  }

  .isSelect {
    .recommend {
      background-image: url("~assets/img/userhome-merchant/invite-on.png");
    }
  }

  .help-center {
    background-image: url("~assets/img/userhome-merchant/help-center-off.png");
  }

  .isSelect {
    .help-center {
      background-image: url("~assets/img/userhome-merchant/help-center-on.png");
    }
  }

  .service-clause {
    background-image: url("~assets/img/userhome-merchant/service-clause-off.png");
  }

  .isSelect {
    .service-clause {
      background-image: url("~assets/img/userhome-merchant/service-clause-on.png");
    }
  }

  .my-appeal-nav {
    background-image: url("~assets/img/userhome-merchant/my-appeal-off.png");
  }

  .isSelect {
    .my-appeal-nav {
      background-image: url("~assets/img/userhome-merchant/my-appeal-on.png");
    }
  }

  .my-activity {
    background-image: url("~assets/img/userhome-showker/my-activity-off.png");
  }

  .isSelect {
    .my-activity {
      background-image: url("~assets/img/userhome-showker/my-activity-on.png");
    }
  }

  .my-buyershow-nav {
    background-image: url("~assets/img/userhome-showker/my-buyerShow-off.png");
  }

  .isSelect {
    .my-buyershow-nav {
      background-image: url("~assets/img/userhome-showker/my-buyerShow-on.png");
    }
  }

  .black-management {
    background-image: url("~assets/img/userhome-merchant/black-management-on.png");
  }

  .isSelect {
    .black-management {
      background-image: url("~assets/img/userhome-merchant/black-management-off.png");
    }
  }

  .release-good {
    background-image: url("~assets/img/userhome-merchant/release-good-off.png");
  }

  .isSelect {
    .release-good {
      background-image: url("~assets/img/userhome-merchant/release-good-on.png");
    }
  }

  .good-management {
    background-image: url("~assets/img/userhome-merchant/good-management-off.png");
  }

  .isSelect {
    .good-management {
      background-image: url("~assets/img/userhome-merchant/good-management-on.png");
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

  .user-clause-model {
    @include fullScreenModel
  }

  @keyframes tip-icon-move
  {
    from { top: -12px; }
    to { top: -9px; }
  }

  .new-task {
    position: absolute;
    right: 22px;
    top: -12px;
    width: 32px;
    animation: tip-icon-move .4s ease-in-out .6s infinite alternate running;
  }
</style>
