<template>
  <div class="user-home clear">
    <p class="user-home-account">我的主页</p>
    <div class="fs-14 user-info-box">
      <div class="clear">
        <div class="lef">
          <img class="left border-radius-50" :src="userHeadUrl" alt="" width="86" height="86">
        </div>
        <div class="left ml-20 mt-12">
          <p>
            <span>账号：{{userData.phone}} </span>
            <span v-if="!userData.userAccount.ifEditPwdAlready">支付密码：<icon type="information-circled" color="#f9284f"/>&nbsp;未设置<router-link :to="{path: '/user/money-management/account-management','query': {'infoSelect': 'accountInfo'}}">&nbsp;&nbsp;设置</router-link></span>
            <span v-if="userData.userAccount.ifEditPwdAlready">支付密码：<icon color="#70CF70" type="checkmark-circled"/> 已设置</span>
            <span v-if="userData.alitmNum <= 0 "><span v-if="userData.alitmNum <= 0 && getUserInfoRole === 0">淘宝账号：<icon type="information-circled" color="#f9284f"/> 未绑定<router-link to="/user/personal-setting/ww-bind">去绑定</router-link></span></span>
            <span v-else><span v-if="userData.alitmNum > 0 && getUserInfoRole === 0">淘宝账号：<icon color="#70CF70" type="checkmark-circled"/> 绑定成功</span></span>
            <span v-if="Boolean(userData.ifCertification)">实名认证：<icon color="#70CF70" type="checkmark-circled"/> 已认证</span>
            <span v-else>实名认证：<icon type="information-circled" color="#f9284f"/> 未认证 &nbsp;&nbsp;<router-link to="/user/personal-setting/verified">去认证</router-link></span>
          </p>
          <div>
          <span v-if="getUserInfoRole === 1 && !isMember">
            <span>免费会员</span>
            <router-link to="/user/vip-member/order">马上开通会员</router-link>
          </span>
            <span v-if="getUserInfoRole === 1 && isMember" class="mr-5">
              <img v-if="getMemberVersionLevel === 200" src="~assets/img/common/vip.png" alt="vipLogo">
              <img v-if="getMemberVersionLevel === 300" src="~assets/img/common/svip.png" alt="svipLogo">
              <span class="cl-red" v-if="getMemberVersionLevel === 200">您已是VIP，<router-link to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>
              <span class="cl-red" v-if="getMemberVersionLevel === 300">您已是SVIP，<router-link to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>
            </span>
            <span>可用金额：{{(getUserBalance / 100).toFixed(2)}} 元 </span>
            <span v-if="getUserInfoRole === 0">提现中：{{userData.userAccount.enChashingMoney ? (userData.userAccount.enChashingMoney/100).toFixed(2): 0 }} 元  </span>
            <router-link v-if="getUserInfoRole === 1" :to="{path: '/user/money-management/pay-money'}">充值</router-link>
            <span class="ml-10" v-if="getUserInfoRole === 1 && isRedEnvelopesExpirationTime">
              <span>推广费减免红包</span>
              <tooltip :content="`有效期至${getMemberDeadline}，仅限于推广费抵扣，最多抵扣${getMemberVersionLevel === 200 ? 3 : 6}元 / 单`" placement="top">
                <icon type="help-circled"/>
              </tooltip>
            </span>
            <router-link v-if="getUserInfoRole === 0" :to="{path: '/user/money-management/getout-money'}">提现</router-link>
            <div v-if="limit" class="inline-block ml-20 pos-rel mt-5">
              <a v-if="getUserInfoRole === 0" class="left">
                <span style="color: #495060;">剩余申请次数</span>{{residue}}
              </a>
              <a class="pos-rel apply-num left" v-if="getUserInfoRole === 0">
                <icon type="help-circled"
                      color="#f9284f"/>
                <i class="up-icon"></i>
                <em>
                  您今天有{{getUserApplyCount}}次申请活动的机会，扫描以下二维码，关注51白拿拿公众号并分享宝贝，获取更多申请次数！
                  <img width="200" src="/static/img/common/qr_code_bainana.png" alt="" class="mt-10 block">
                </em>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <router-link :to="{path:'/user/personal-setting/personal-account-info',query:{from:'userHome'}}">好头像，才有好形象！</router-link>
      </div>
    </div>
    <div class="fs-14 pd-tb-20 clear" style="border-bottom: 1px solid #eee;">
      <p v-if="getUserInfoRole === 0">
        活动提醒：待审核
        <router-link to="/user/my-probation/wait">{{trialCount.waitingAuditTaskApply}}</router-link>
        个，进行中
        <router-link to="/user/my-probation/pass">{{trialCount.underWayShowkerTask}}</router-link>
        个（已通过待下单
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'pass_and_unclaimed'}}">
          {{trialCount.passAndUnclaimedShowkerTask}}
        </router-link>
        个；已下单待交买家秀
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'trial_report_waiting_submit'}}">
          {{trialCount.trialReportWaitingSubmitShowkerTask}}
        </router-link>
        个；待修改订单号/买家秀
        <router-link :to="{path:'/user/my-probation/pass',query:{status:'order_num_error'}}">
          {{trialCount.orderNumErrorShowkerTask + trialCount.trialReportUnqualifiedShowkerTask}}
        </router-link>
        个）。
        <router-link to="/user/my-probation/wait">进入我的活动</router-link>
      </p>
      <p v-if="getUserInfoRole === 1">
        活动提醒：待审核
        <router-link :to="{path:'/user/activity-management/list',query:{status:'waiting_audit'}}">
          {{trialCount.waitingAuditTask}}
        </router-link>
        个，
        进行中
        <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">
          {{trialCount.underWayTask}}
        </router-link>
        个
        （待审批拿手
        <router-link :to="{path:'/user/task-management/wait'}">
          {{trialCount.waitingAuditTaskApply}}
        </router-link>
        个；
        待审核订单号
        <router-link :to="{path:'/user/task-management/pass',query:{status:'orderNum'}}">
          {{trialCount.orderNumWaitingAuditShowkerTask}}
        </router-link>
        个；
        待审核买家秀
        <router-link :to="{path:'/user/task-management/pass',query:{status:'trialReport'}}">
          {{trialCount.trialReportWaitingConfirmShowkerTask}}
        </router-link>
        个）。
        已结束尚未结算
        <router-link :to="{path:'/user/activity-management/list',query:{status:'waiting_settlement'}}">
          {{trialCount.waitingSettlementTask}}
        </router-link>
        个
        <router-link to="/user/activity-management/list">进入活动管理</router-link>
      </p>
    </div>
    <p v-if="getUserInfoRole === 0" class="clear-both user-home-account">最新秀品宝贝</p>
    <div v-if="getUserInfoRole === 0" class="home-commodity-ctt">
      <router-link
        target="_blank"
        class="home-commodity-details"
        v-for="homeCommodity in homeCommodityList"
        :title="homeCommodity.taskName"
        :key="homeCommodity.id"
        :to="{path: '/task-details',query: {q: encryptionId(homeCommodity.id)}}">
        <div class="home-commodity-img pos-rel">
          <img class="block" :src="homeCommodity.taskMainImage | imageSrc('!orgi75')" width="210" height="208">
          <span class="applied"> {{homeCommodity.showkerApplyTotalCount || 0}} 人已申请</span>
        </div>
        <div class="home-commodity-text">
          <p class="home-commodity-title">{{homeCommodity.taskName}}</p>
          <p class="home-commodity-price">
            <span class="left">￥{{homeCommodity.itemPrice / 100}}</span>
          </p>
          <!--打赏费-->
          <!--<P class="rewards-fee">-->
            <!--<span v-if="homeCommodity.activityCategory === 'free_get'" class="main-color">打赏1元</span>-->
            <!--<span v-if="homeCommodity.activityCategory === 'present_get'" class="main-color">打赏2元</span>-->
            <!--<span v-if="homeCommodity.activityCategory !== 'free_get' && homeCommodity.activityCategory !== 'present_get'" class="main-color">打赏0元</span>-->
            <!--<Tooltip content="完成该任务可额外获得打赏费" placement="top-start">-->
              <!--<Icon type="help-circled" color="#000"></Icon>-->
            <!--</Tooltip>-->
          <!--</P>-->
          <p class="home-commodity-apply">
            限量 <span class="main-color"> {{homeCommodity.taskCount || 0 }} </span> 份，剩余
            <span class="main-color"> {{homeCommodity.taskCount - homeCommodity.showkerApplySuccessCount || 0}} </span>
            份
          </p>
          <p class="home-commodity-take">
            <router-link :to="{path: '/task-details',query: {q: encryptionId(homeCommodity.id)}}"
                         class="ivu-btn ivu-btn-long">免费领取
            </router-link>
          </p>
        </div>
      </router-link>
    </div>
    <div v-if="getUserInfoRole === 1" class="user-seller-tips-box clear">
      <div class="fs-14 left user-seller-tips">
        <p class="fs-16 mb-10">商家常见问题</p>
        <ul>
          <li>
            <router-link :to="{path: '/user/help-center/faq-seller', query: {pag: 'special'}}">
              商家活动完整流程？
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/user/help-center/faq-seller', query: {page: 'common', qusNum : '1'}}">
              商家活动支持哪几种搜索/下单渠道？
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/user/help-center/faq-seller', query: {page: 'common', qusNum : '2'}}">
              商家发布活动如何收费？
            </router-link>
          </li>
          <li>
            <router-link :to="{path: '/user/help-center/faq-seller', query: {page: 'common', qusNum : '11'}}">
              什么条件下可以申请活动结算？
            </router-link>
          </li>
        </ul>
      </div>
      <div class="fs-14 left user-seller-tips">
        <p class="fs-16 mb-10">客服工作时间</p>
        <ul>
          <li>周一至周五：</li>
          <li>9:00-21:00</li>
          <li>周六周日：</li>
          <li>10:00-18:00</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon, Alert, Form, Input, Checkbox, Button, Radio, Modal, Breadcrumb, Page, Carousel, Tooltip} from 'iview'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, getSeverTime, encryption, timeToDate} from '@/config/utils'

  export default {
    name: 'user-home',
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
      Tooltip:Tooltip
    },
    data() {
      return {
        trialCount: {},
        homeCommodityList: [],
        lastTime: null,
        levelValue: '',
        residue: null,
        showkerApplyTotal: null,
        limit: true,
        freshman: null,
      }
    },
    created() {
      this.getHomeTaskList();
      this.personalTrialCount();
      if (this.$store.state.login) {
        this.getShowkerApplyCount()
      }
      this.$store.dispatch('getUserInformation');
    },
    computed: {
      getUserInfoRole() {
        return this.$store.getters.getUserRole;
      },
      getUserBalance() {
        return this.$store.getters.getUserBalance;
      },
      userData() {
        return this.$store.state.userInfo;
      },
      getMemberDeadline () {
        const time = new Date(this.redEnvelopesExpirationTime);
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
      },
      isRedEnvelopesExpirationTime() {
        return this.redEnvelopesExpirationTime > getSeverTime()
      },
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },
      redEnvelopesExpirationTime() {
        return this.$store.getters.getRedEnvelopesExpirationTime
      },
      isMember() {
        return this.$store.getters.isMemberOk
      },
      userHeadUrl() {
        return this.$store.getters.getUserHeadUrl
      },
      getUserApplyCount() {
        return this.freshman ? this.$store.getters.getTaskApplyBaseCountFreshman.configValue : this.$store.getters.getTaskApplyBaseCountOldman.configValue
      }
    },
    methods: {
      getUserMemberLevelInfo() {
        let _this = this;
        if (!_this.getMemberLevel) {
          return;
        }
        api.getUserMemberLevelInfo({
          level: _this.getMemberLevel
        }).then(res => {
          if (res.status) {
            _this.levelValue = res.data.validDaysDesc;
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getShowkerApplyCount() {
        let self = this;
        api.getShowkerApplyCount().then(res => {
          if (res.status) {
            self.showkerApplyTotal = res.data.baseShareGet;
            self.residue = res.data.left;
            self.limit = res.data.limit;
            self.freshman = res.data.freshman;
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      encryptionId(id) {
        return encryption(id)
      },
      getHomeTaskList() {
        let self = this;
        api.getHomeTaskList().then((res) => {
          if (res.status && res.data) {
            self.homeCommodityList = res.data.splice(0, 8);
          } else {
            self.$Message.error(res.msg);
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
              self.$Message.error(res.msg);
            }
          })
        } else {
          api.sellerPersonalTrialCount().then((res) => {
            if (res.status) {
              self.trialCount = res.data
            } else {
              self.$Message.error(res.msg);
            }
          })
        }
      }
    },
    watch: {},
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
      padding: 40px 0 20px 0;
      /*overflow: hidden;*/
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
          a {
            color: #666;
          }
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }

  .applied {
    position: absolute;
    top: 0;
    right: 0;
    background-color: $mainColor;
    padding: 0 6px;
    color: #fff;
  }

  .home-commodity-title {
    img {
      display: block;
      margin: 28px auto 10px auto;
    }
    p {
      color: #999;
    }
  }

  .home-commodity-ctt {
    padding: 24px;
    text-align: left;
    .home-commodity-details {
      width: 222px;
      display: inline-block;
      margin: 0 4px 30px 4px;
      padding: 0 5px 20px 5px;
      .home-commodity-img {
        border: 1px solid #ddd;
      }
      .home-commodity-text {
        background-color: #EEEEEE;
        padding: 5px 5px 8px 5px;
        p {
          line-height: 28px;
          height: 28px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        p.home-commodity-title {
          color: #000;
          text-align: left;
        }
        p.home-commodity-price {
          color: $mainColor;
        }
        p.home-commodity-apply {
          color: #000;
        }
        p.home-commodity-take {
          height: 40px;
          line-height: 40px;
        }
      }
    }

  }

  .apply-num {
    display: block;
    margin-left: 5px;
    &:hover em, &:hover i {
      display: block;
    }
    em {
      display: none;
      position: absolute;
      top: 23px;
      right: -66px;
      background-color: rgba(70, 76, 91, 0.9);
      color: rgb(255, 255, 255);
      padding: 10px;
      font-style: normal;
      font-size: 12px;
      z-index: 2;
    }
    .up-icon {
      width: 0;
      height: 0;
      border: 9px solid transparent;
      border-bottom-color: rgba(70, 76, 91, 0.9);
      position: absolute;
      bottom: 0;
      top: 5px;
      left: -2px;
      display: none;

    }
  }
</style>
