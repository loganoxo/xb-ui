<template>
  <div class="user-home clear">
    <p class="user-home-account">我的主页</p>
    <div v-if="getUserInfoRole === 1" class="fs-14 merchant-info-box clear">
      <div class="avatar-box left text-ct">
        <div class="box-top">
          <router-link :to="{path:'/user/personal-setting/personal-account-info',query:{from:'userHome'}}">
            <img class="border-radius-50 mt-10" :src="userHeadUrl" alt="" width="86" height="86">
          </router-link>
          <div class="mt-15"><span class="f-b fs-16 cl666">{{userData.phone}}</span><span v-if="isMember" class="vip-mark ml-5 fs-14">VIP</span></div>
        </div>
        <div v-if="isMember" class="box-bottom">
          <span>到期时间：{{getMemberDeadline}}</span>
          <span class="vip-operate-btn fs-14 ml-5 cursor-p" @click="toVipOrder">马上续费</span>
        </div>
        <div v-else class="box-bottom">
          <span>升级VIP会员享受更多优惠</span>
          <span class="vip-operate-btn fs-14 ml-5 cursor-p" @click="toVipOrder">马上升级</span>
        </div>
      </div>
      <div class="account-box left">
        <div class="account-title">我的账户</div>
        <div class="account-detail">
          <div>
            <p class="account-item-num">8000.00</p>
            <p class="account-item-desc">冻结金额</p>
            <p class="account-item-operate blue" @click="toActivitySettle">结算</p>
          </div>
          <div>
            <p class="account-item-num">{{(getUserBalance / 100).toFixed(2)}}</p>
            <p class="account-item-desc">余额</p>
            <p class="account-item-operate blue" @click="balanceRecharge">充值</p>
          </div>
          <div>
            <p class="account-item-num">{{(totalInCome/100).toFixed(2)}}</p>
            <p class="account-item-desc">钱包</p>
            <p class="account-item-operate blue"><span class="pr-5" @click="toRecordRules">赚零钱</span><span class="pl-5" @click="toRecordDetail">明细</span></p>
          </div>
          <div class="pos-rel">
            <div class="offer-poptip poptip">5个优惠即将过期</div>
            <p class="account-item-num">20</p>
            <p class="account-item-desc">优惠</p>
            <p class="account-item-operate blue"><span class="pr-5">领券</span><span class="pl-5">查看</span></p>
          </div>
          <div class="pos-rel">
            <div class="recharge-card-poptip poptip">冲1000送500</div>
            <p class="account-item-num">{{getRechargeCardBalance}}</p>
            <p class="account-item-desc">充值卡</p>
            <p class="account-item-operate blue"><span class="pr-5" @click="showRechargeCard = true">充值</span><span class="pl-5" @click="toRechargeCardDetail">明细</span></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getUserInfoRole === 1" class="flow-info-box">
      <img src="~assets/img/icon/favorite_cart_flow.png" alt="" width="14" height="14">
      <span class="ml-5">剩余收藏加购： {{getFlowNumInfo.favoriteCartFlowLeft || 0}} 条</span>
      <img src="~assets/img/icon/visitor_flow.png" alt="" width="14" height="14" class="ml-20">
      <span class="ml-5">剩余访客流量： {{getFlowNumInfo.visitorFlowLeft || 0}} 条</span>
      <span class="ml-20 cursor-p blue" @click="showFlowOrder = true">购买</span>
      <span class="ml-10 cursor-p blue" @click="toOrderDetail">明细</span>
    </div>
    <div v-if="getUserInfoRole === 0" class="fs-14 showker-info-box">
      <div class="clear">
        <div class="left">
          <img class="left border-radius-50" :src="userHeadUrl" alt="" width="86" height="86">
        </div>
        <div class="left ml-20">
          <p>
            <span>账号：{{userData.phone}} </span>
            <span v-if="!getIfEditPwdAlready">支付密码：<icon type="md-alert" color="#f9284f"/>&nbsp;未设置<router-link
              :to="{path: '/user/money-management/account-management','query': {'infoSelect': 'accountInfo'}}">&nbsp;&nbsp;设置</router-link></span>
            <span v-if="getIfEditPwdAlready">支付密码：<icon color="#70CF70" type="checkmark-circled"/> 已设置</span>
            <span v-if="userData.alitmNum <= 0 "><span v-if="userData.alitmNum <= 0 && getUserInfoRole === 0">淘宝账号：<icon
              type="md-alert" color="#f9284f"/> 未绑定<router-link
              to="/user/personal-setting/ww-bind">去绑定</router-link></span></span>
            <span v-else><span v-if="userData.alitmNum > 0 && getUserInfoRole === 0">淘宝账号：<icon color="#70CF70"
                                                                                                type="checkmark-circled"/> 绑定成功</span></span>
            <span v-if="Boolean(userData.ifCertification)">实名认证：<icon color="#70CF70"
                                                                      type="checkmark-circled"/> 已认证</span>
            <span v-else>实名认证：<icon type="md-alert" color="#f9284f"/> 未认证 &nbsp;&nbsp;<router-link
              to="/user/personal-setting/verified">去认证</router-link></span>
          </p>
          <div>
             <!--<span v-if="getUserInfoRole === 1 && !isMember">-->
               <!--<span>免费会员</span>-->
               <!--<router-link to="/user/vip-member/order">马上开通会员</router-link>-->
             <!--</span>-->
            <!--<span v-if="getUserInfoRole === 1 && isMember" class="mr-5">-->
              <!--<img v-if="getMemberVersionLevel === 200" src="~assets/img/common/vip.png" alt="vipLogo">-->
              <!--<img v-if="getMemberVersionLevel === 300" src="~assets/img/common/svip.png" alt="svipLogo">-->
              <!--<span class="cl-red" v-if="getMemberVersionLevel === 200">您已是VIP，<router-link-->
                <!--to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>-->
              <!--<span class="cl-red" v-if="getMemberVersionLevel === 300">您已是SVIP，<router-link-->
                <!--to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>-->
            <!--</span>-->
            <span>可用金额：{{(getUserBalance / 100).toFixed(2)}} 元 </span>
            <span v-if="getUserInfoRole === 0">提现中：{{userData.userAccount.enChashingMoney ? (userData.userAccount.enChashingMoney/100).toFixed(2): 0 }} 元  </span>
            <!--<router-link v-if="getUserInfoRole === 1" :to="{path: '/user/money-management/pay-money'}">充值</router-link>-->
            <!--<span class="ml-10" v-if="getUserInfoRole === 1 && isRedEnvelopesExpirationTime">-->
              <!--<img class="vtc-text-btm" src="~assets/img/common/red-envelopes-logo.png" alt="">-->
              <!--<span>推广费减免红包</span>-->
              <!--<tooltip-->
                <!--:content="`有效期至${getMemberDeadline}，仅限于推广费抵扣，最多抵扣${(redEnvelopeDeductionLimit /100).toFixed(2)}元 / 单`"-->
                <!--placement="top">-->
                <!--<icon type="md-help-circle"/>-->
              <!--</tooltip>-->
            <!--</span>-->
            <!--<span class="ml-10" v-if="getUserInfoRole === 1">-->
              <!--<img src="~assets/img/merchant-promotion/purse-on.png" alt="" class="vtc-mid">-->
              <!--<span>钱包：{{(totalInCome/100).toFixed(2)}}元</span>-->
              <!--&lt;!&ndash;<span class="blue ml-10 cursor-p" @click="toWithdrawal">提现</span>&ndash;&gt;-->
              <!--<span class="blue ml-10 cursor-p" @click="toRecordDetail">明细</span>-->
            <!--</span>-->
            <router-link v-if="getUserInfoRole === 0" :to="{path: '/user/money-management/getout-money'}">提现</router-link>
            <div v-if="limit && getUserInfoRole === 0" class="inline-block ml-20 pos-rel clear vtc-btm">
              <span class="left">剩余申请次数<span class="blue">{{residue}}</span></span>
              <span class="pos-rel apply-num left">
                <icon type="help-circled" color="#f9284f"/>
                <em class="bubble-modal">
                  您今天有{{getUserApplyCount.configValue}}次申请活动的机会，扫描以下二维码，关注51白拿拿公众号并分享宝贝，获取更多申请次数！
                  <img width="200" src="/static/img/common/qr_code_bainana.png" alt="" class="mt-10 block">
                </em>
              </span>
            </div>
            <!--<div v-if="getUserInfoRole === 1" class="mt-10">-->
              <!--<img src="~assets/img/icon/favorite_cart_flow.png" alt="" width="14" height="14">-->
              <!--<span class="ml-5">剩余收藏加购： {{getFlowNumInfo.favoriteCartFlowLeft || 0}} 条</span>-->
              <!--<img src="~assets/img/icon/visitor_flow.png" alt="" width="14" height="14" class="ml-20">-->
              <!--<span class="ml-5">剩余访客流量： {{getFlowNumInfo.visitorFlowLeft || 0}} 条</span>-->
              <!--<span class="ml-20 cursor-p blue" @click="showFlowOrder = true">购买</span>-->
              <!--<span class="ml-10 cursor-p blue" @click="toOrderDetail">明细</span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="mt-10">
        <router-link :to="{path:'/user/personal-setting/personal-account-info',query:{from:'userHome'}}">好头像，才有好形象！
        </router-link>
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
    <!--流量购买弹窗-->
    <flow-order-model v-model="showFlowOrder"/>
    <!--充值卡购买弹窗-->
    <recharge-card-model v-model="showRechargeCard"/>
  </div>
</template>

<script>
  import {Icon, Alert, Form, Input, Checkbox, Button, Radio, Modal, Breadcrumb, Page, Carousel, Tooltip} from 'iview'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, getSeverTime, encryption, timeToDate} from '@/config/utils'
  import FlowOrderModel from '@/components/FlowOrderModel'
  import RechargeCardModal from '@/components/RechargeCardModal'

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
      Tooltip: Tooltip,
      FlowOrderModel: FlowOrderModel,
      RechargeCardModel: RechargeCardModal
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
        showFlowOrder: false,
        showRechargeCard: false
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
      getIfEditPwdAlready() {
        return this.$store.getters.getIsEditPwdAlready;
      },
      getMemberDeadline() {
        const time = new Date(this.redEnvelopesExpirationTime);
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
      },
      isRedEnvelopesExpirationTime() {
        return this.redEnvelopesExpirationTime > getSeverTime()
      },
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },
      redEnvelopeDeductionLimit() {
        return this.$store.getters.getRedEnvelopeDeductionLimit
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
        return this.freshman ? this.$store.getters.getSysConfigValue('taskApplyBaseCountFreshman') : this.$store.getters.getSysConfigValue('taskApplyBaseCountOldman')
      },
      // 商家推荐系统钱包
      totalInCome() {
        return this.$store.getters.getUserAccountInfo.invitationReward
      },
      getFlowNumInfo() {
        return this.$store.state.flowNumberInfo
      },
      getRechargeCardBalance() {
        return this.$store.getters.getRechargeCardBalance
      }
    },
    methods: {
      toRechargeCardDetail() {
        this.$router.push({path: '/user/recharge-card-detail'})
      },
      toVipOrder() {
        this.$router.push({path: '/user/vip-member/order'});
      },
      toActivitySettle() {
        this.$router.push({path: '/user/activity-management/list',query: {status: 'waiting_settlement'}});
      },
      toRecordRules() {
        this.$router.push({path: '/promotion/promotion-regulation'});
      },
      balanceRecharge() {
        this.$router.push({path: '/user/money-management/pay-money'});
      },
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
      },
      toWithdrawal() {
        this.$router.push({name: 'PromotionDetails', query: {from: 'userhome-withdrawal'}});
      },
      toRecordDetail() {
        this.$router.push({name: 'PromotionDetails', query: {from: 'userhome-detail'}});
      },
      toOrderDetail() {
        this.$router.push({name: 'FlowOrderDetail'});
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
    .showker-info-box {
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
    .merchant-info-box{
      padding: 5px 0;
      border-bottom: 1px solid #EEE;
      .avatar-box {
        width: 30%;
        min-height: 196px;
        .box-top {
          height: 155px;
          background-image: url("~assets/img/userhome-merchant/51bainana.png");
          background-position: center 20px;
          background-repeat: no-repeat;
          background-color: #F4CA3D;
          .vip-mark {
            padding: 3px 6px 3px 24px;
            background-image: url("~assets/img/icon/diamond-icon.png");
            background-position: 5px center;
            background-repeat: no-repeat;
            background-color: #444;
            border-radius: 5px;
            color: #F5EB79;
          }
        }
        .box-bottom {
          padding: 10px 0;
          background-color: #444;
          color: #F5EB79;
          .vip-operate-btn {
            padding: 3px 5px;
            background-color: #F5EB79;
            color: #333;
            border-radius: 10px;
          }
        }
      }
      .account-box {
        width: 70%;
        min-height: 196px;
        background: #eee;
        padding: 0 10px;
        .account-title {
          padding: 10px 0 10px 10px;
          border-bottom: 1px solid #ccc;
        }
        .account-detail {
          display: flex;
          flex-direction: row;
          >div {
            flex: 1;
            text-align: center;
            .account-item-num {
              font-size: 16px;
              color: #444;
              font-weight: bold;
              padding: 10px 0;
            }
            .account-item-operate {
              margin-top: 20px;
              cursor: pointer;
            }
            .poptip {
              position: absolute;
              top: -17px;
              padding: 2px 3px;
              border-radius: 4px;
              color: #fff;
            }
            .offer-poptip {
              background-color: #FF9900;
              left: 10px;
              &::after {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: 50%;
                bottom: -3px;
                transform: rotate(45deg);
                background-color: #FF9900;
              }
            }
            .recharge-card-poptip {
              background-color: #FF3666;
              left: 20px;
              &::after {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: 50%;
                bottom: -3px;
                transform: rotate(45deg);
                background-color: #FF3666;
              }
            }
          }
        }
      }
    }
    .flow-info-box {
      padding: 20px 0;
      border-bottom: 1px solid #EEE;
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
    &:hover .bubble-modal {
      display: block;
    }
    .bubble-modal {
      display: none;
      position: absolute;
      top: 28px;
      right: -66px;
      background-color: rgba(70, 76, 91, 0.9);
      color: rgb(255, 255, 255);
      padding: 10px;
      font-style: normal;
      font-size: 12px;
      z-index: 2;
      &:after {
        content: '';
        position: absolute;
        bottom: 100%;
        right: 67px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent;
        border-bottom-width: 8px;
        border-bottom-color: currentColor;
        color: #585E6B;
      }
    }
    .up-icon {
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-bottom-color: rgba(70, 76, 91, 0.9);
      position: absolute;
      bottom: 0;
      top: 5px;
      left: -2px;
      display: none;

    }
  }
</style>
