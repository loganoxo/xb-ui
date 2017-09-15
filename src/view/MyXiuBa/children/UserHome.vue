<template>
  <div class="user-home clear">
    <p class="user-home-account">我的主页</p>
    <div class="fs-14 user-info-box clear">
      <div class="left">
        <img class="left" :src="userData.portraitPic" alt="" width="68px">
      </div>
      <div class="left ml-20">
        <p>
          <span>账号：{{userData.phone}} </span>
          <span v-if="!userData.userAccount.ifEditPwdAlready">支付密码：<Icon type="information-circled" color="#FF6633"></Icon>&nbsp;未设置<router-link :to="{ 'path': '/user/money-management/account-management','query': {'infoSelect': 'accountInfo'}}">&nbsp;&nbsp;设置</router-link></span>
          <span v-if="userData.userAccount.ifEditPwdAlready">支付密码：<Icon color="#70CF70" type="checkmark-circled"></Icon> 已设置</span>
          <span v-if="userData.alitmNum <= 0 "><span v-if="userData.alitmNum <= 0 && getUserInfoRole === 0">淘宝账号：<Icon type="information-circled" color="#FF6633"></Icon> 未绑定<router-link to="/user/personal-setting/ww-bind">去绑定</router-link></span></span>
          <span v-else><span v-if="userData.alitmNum > 0 && getUserInfoRole === 0">淘宝账号：<Icon color="#70CF70" type="checkmark-circled"></Icon>绑定成功</span></span>
          <span v-if="Boolean(userData.ifCertification)">实名认证：<Icon color="#70CF70" type="checkmark-circled"></Icon> 已认证</span>
          <span v-else>实名认证：<Icon type="information-circled" color="#FF6633"></Icon> 未认证<router-link to="/user/personal-setting/verified">去认证</router-link></span>
        </p>
        <p>
          <span>可用金额：{{getUserBalance}} 元 </span>
          <span>提现中：{{userData.userAccount.enChashingMoney ? userData.userAccount.enChashingMoney : 0 }} 元  </span>
          <router-link :to="{path: '/user/money-management/pay-money'}">充值</router-link>
          <router-link :to="{path: '/user/money-management/getout-money'}">提现</router-link>
        </p>
      </div>
    </div>
    <div class="fs-14 pd-tb-20 clear" style="border-bottom: 1px solid #eee;">
      <p v-if="getUserInfoRole === 0">
        活动提醒：待审核
        <router-link to="/user/my-probation/wait">{{trialCount.waitingAuditTaskApply}}</router-link>个，进行中
        <router-link to="/user/my-probation/pass">{{trialCount.underWayShowkerTask}}</router-link>个（已通过待领取
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'pass_and_unclaimed'}}">{{trialCount.passAndUnclaimedShowkerTask}}</router-link>个；已下单待交买家秀
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'trial_report_waiting_submit'}}">{{trialCount.trialReportWaitingSubmitShowkerTask}}</router-link>个；待修改订单号/买家秀
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'order_num_error'}}">{{trialCount.orderNumErrorShowkerTask + trialCount.trialReportUnqualifiedShowkerTask}}</router-link>个）。
        <router-link to="/user/my-probation/wait">进入我的买家秀</router-link>
      </p>
      <p v-if="getUserInfoRole === 1">
        活动提醒：待审核
        <router-link :to="{path:'/user/activity-management/list',query:{status:'waiting_audit'}}">
          {{trialCount.waitingAuditTask}}
        </router-link>
        个，
        进行中
        <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}"> {{trialCount.underWayTask}}</router-link>
        个
        （待审批秀客
        <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">
          {{trialCount.waitingAuditTaskApply}}
        </router-link>
        个；
        待审核订单号
        <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">
          {{trialCount.orderNumWaitingAuditShowkerTask}}
        </router-link>
        个；
        待审核报告
        <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">
          {{trialCount.trialReportWaitingConfirmShowkerTask}}
        </router-link>
        个）。
        已结束尚未结算
        <router-link :to="{path:'/user/activity-management/list',query:{status:'waiting_settlement'}}">
          {{trialCount.waitingSettlementTask}}
        </router-link>
        个
        <router-link to="/user/activity-management/list">进入买家秀活动管理</router-link>
      </p>
    </div>
    <p v-if="getUserInfoRole === 0" class="clear-both user-home-account">最新秀品宝贝</p>
    <div v-if="getUserInfoRole === 0" class="home-commodity-ctt">
      <router-link
        class="home-commodity-details"
        v-for="homeCommodity in homeCommodityList"
        :title="homeCommodity.taskName"
        :key="homeCommodity.id"
        :to="{ 'path': '/task-details','query': {'taskId': homeCommodity.id}}">
        <div class="home-commodity-img">
          <img class="block" v-lazy="homeCommodity.taskMainImage" alt="" style="width: 220px; height: 220px;">
        </div>
        <div class="home-commodity-text">
          <p>{{homeCommodity.taskName}}</p>
          <p>
            <span class="left">￥{{homeCommodity.itemPrice / 100}}</span>
            <span class="right">免费活动</span>
          </p>
        </div>
      </router-link>
    </div>
    <div v-if="getUserInfoRole === 1" class="user-seller-tips-box clear">
      <div class="fs-14 left user-seller-tips">
        <p class="fs-16 mb-10">商家常见问题</p>
        <ul>
          <li>发布秀品活动需要什么条件？</li>
          <li>什么是活动担保金？</li>
          <li>如产品价格出现变动商家怎么办？</li>
          <li>秀客被通过审批后迟迟不下单，并联系不到人，怎么办？</li>
          <li>什么情况下可以取消会员的通过资格？</li>
        </ul>
      </div>
      <div class="fs-14 left user-seller-tips">
        <p class="fs-16 mb-10">客服工作时间</p>
        <ul>
          <li> 周一至周五：</li>
          <li>早上9:00-12:00</li>
          <li>下午14:00-18:00</li>
          <li>周六、周日全天休息,请在工作时间联系我们。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Alert from 'iview/src/components/alert'
  import Form from 'iview/src/components/form'
  import Input from '@/components/Input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  import Carousel from 'iview/src/components/carousel'

  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'UserHome',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      TimeDown: TimeDown,
      Alert: Alert,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
    },
    data() {
      return {
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover'
        },
        trialCount: {},
        homeCommodityList: [],
      }
    },
    created() {
      this.getHomeTaskList();
      this.personalTrialCount();

    },
    computed: {
      getUserInfoRole() {
        return this.$store.state.userInfo.role;
      },
      getUserBalance() {
        return this.$store.getters.getUserBalance;
      },
      userData: function () {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      getHomeTaskList() {
        let self = this;
        api.getHomeTaskList().then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeCommodityList = res.data;
            }
          } else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      personalTrialCount() {
        let self = this;
        if (self.getUserInfoRole === 0) {
          api.showkerPersonalTrialCount().then((res) => {
            if (res.status) {
              self.trialCount = res.data
            } else {
              self.$Modal.error({
                content: res.msg
              });
            }
          })
        } else {
          api.sellerPersonalTrialCount().then((res) => {
            if (res.status) {
              self.trialCount = res.data
            } else {
              self.$Modal.error({
                content: res.msg
              });
            }
          })
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .user-home {
    .user-home-account {
      line-height: 50px;
      height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #eee;
    }
    .user-info-box {
      padding: 40px 0;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      p {
        line-height: 30px;
        span {
          display: inline-block;
          margin-right: 20px;
        }
        a {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
  }

  .home-commodity-ctt {
    padding: 24px 0;
    text-align: left;
    .home-commodity-details {
      width: 222px;
      display: inline-block;
      margin: 0 4px 30px 4px;
      .home-commodity-img {
        border: 1px solid #ddd;
      }
      .home-commodity-text {
        background-color: #EEEEEE;
        padding: 5px;
        p {
          line-height: 35px;
          height: 35px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:first-child {
            color: #000;
            text-align: left;
          }
          &:last-child {
            color: #FF6633;
            span:last-child {
              background-color: #FCE2E4;
              padding: 0 10px;
              height: 30px;
              line-height: 30px;
              margin-top: 2px;
            }
          }
        }

      }
    }

  }

  .user-seller-tips-box {
    margin-top: 20px;
    text-align: center;
    .user-seller-tips {
      text-align: left;
      width: 40%;
      margin: 2%;
      ul {
        background-color: #f8f8f8;
        padding: 20px;
        height: 180px;
        overflow: hidden;
        li {
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
</style>
