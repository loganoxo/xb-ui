<template>
  <div class="vip-member-order">
    <p class="mt-10"><strong>VIP会员服务说明：</strong></p>
    <p class="mt-5">1、可在服务期内免费使用白拿拿免费使用对应版本的服务功能，会员成功开通后，费用不退还。</p>
    <p class="mt-5">2、会员版本仅支持向上扩展。譬如：当前版本为SVIP版本，在该版本到期前不支持购买VIP版本。</p>
    <p class="mt-5">3、时间周期在当前版本中叠加购买。譬如：当前为VIP半年版，再购买VIP季度则在原到期时间上延长一季度。</p>
    <p class="mt-5">4、会员版本升级时，将现有会员剩余时间按天进行折算，剩余价格将抵扣到新版本的费用中（若折算出的价格有溢出，将不退回）。</p>
    <div class="mt-30">
      <span class="f-b">请选择您的会员版本：</span>
      <i-button class="select-version fs-16" :class="{'is-active': isSelectVersionPeriodInfo.level === item.level}"
                v-for="item in memberVersionList" :key="item.id"
                :disabled="getMemberVersionLevel > item.level && isMember"
                @click="selectVersion(item.level, item.levelText)">
        {{item.levelText}}
      </i-button>
    </div>
    <div class="mt-28">
      <span class="f-b">请选择您的时间周期：</span>
      <i-button :class="{'is-active': isSelectVersionPeriodInfo.timeLevel === item.timeLevel}" class="select-period"
                v-for="item in memberPeriodList" :key="item.id"
                @click="selectPeriod(item.timeLevel, item.timeLevelText)">
        <span class="fs-16">{{item.timeLevelText}}</span>
        <span class="fs-12">({{item.validDays || 0}}天)</span>
      </i-button>
    </div>
    <div class="mt-28">
      <p class="fs-14">您当前为：{{isMember ? 'VIP会员' : '非会员'}}<span v-if="isMember">，到期时间：{{getMemberDeadline | dateFormat('YYYY-MM-DD') || '------'}}</span>
      </p>
      <p class="mt-10 fs-14">您已选择 <span class="main-color">{{selectOrderStatusMap[selectOrderStatus]}}</span> <span
        class="cl000 f-b">{{selectVersionPeriodStatus || '--'}}</span>，有效期至
        <span class="main-color">{{orderValidityTime | dateFormat('YYYY-MM-DD') || '------'}}</span><span
          v-if="isMember && selectOrderStatus === 'upgrade'">，根据您现在的会员版本可折价抵扣：{{deductionPrice}}元，成功升级后现有版本将失效。</span>
      </p>
      <p class="fs-16 mt-10">本次总共需要支付的金额为：<span class="f-b">{{buyOrderPrice}}</span> 元。您账户余额为： <span class="f-b">{{getUserBalance || 0}}</span>
        元<span v-if="!hasBalance">，还需要充值：<span class="f-b">{{payPrice}}</span> 元</span>
      </p>
    </div>
    <i-button v-if="hasBalance" class="pay-btn" @click="isNeedRecharge = true">立即购买</i-button>
    <i-button v-if="!hasBalance" class="pay-btn" @click="isNeedRecharge = true">前去充值</i-button>
    <!--支付弹窗-->
    <div class="pay-model" v-if="isNeedRecharge">
      <PayModel ref="orderPayModel" :orderMoney="lastNeedPayPrice" :orderType="1"
                :memberLevel="isSelectVersionPeriodInfo.level" :timeLevel="isSelectVersionPeriodInfo.timeLevel"
                @orderVipSuccess="orderVipSuccess" @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="isNeedRecharge = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3"><Icon color="#FF2424" size="18" type="ios-information"></Icon>
            <span class="ml-10">亲，您的余额不足，请充值。</span>
          </span>还需充值<strong class="size-color3">{{lastNeedPayPrice}}</strong>元
        </div>
        <div slot="isBalance" class="title-tip">
          <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
          <span class="ml-10">您本次需要支付金额为 <span class="size-color3">{{(lastNeedPayPrice).toFixed(2)}}</span> 元。</span>
        </div>
      </PayModel>
    </div>
  </div>
</template>

<script>
  import {Button, Icon} from 'iview'
  import PayModel from '@/components/PayModel'
  import {getSeverTime} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: "vip-member-order",
    components: {
      IButton: Button,
      Icon: Icon,
      PayModel: PayModel,
    },
    data() {
      return {
        isSelectVersionPeriodInfo: {
          level: 200,
          levelText: 'VIP',
          timeLevel: 100,
          timeLevelText: '季度',
        },
        selectOrderStatusMap: {
          'renewal': '续费',
          'upgrade': '升级',
          'buy': '购买',
        },
        orderValidityTime: null,
        buyOrderPrice: '0.00',
        deductionPrice: '0.00',
        memberVersionList: [],
        memberPeriodList: [],
        memberVersionPeriodList: [],
        isNeedRecharge: false,
      }
    },
    created() {
      this.getMemberVersionPeriodList();
    },
    computed: {
      /** 获取用户账户余额
       * @return {Number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /** 获取用户会员版本等级（200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.state.userInfo.memberLevel
      },

      /** 获取用户会员周期等级（100：季度， 200：半年， 300： 一年）
       * @return {Number}
       */
      getMemberPeriodLevel() {
        return this.$store.state.userInfo.timeLevel
      },

      /** 获取用户会员状态
       * @return {boolean}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },

      /** 获取用户会员到期时间
       * @return {Number}
       */
      getMemberDeadline() {
        return this.$store.state.userInfo.memberDeadline
      },

      /** 获取客服QQ号码
       * @return {Number}
       */
      getSellerCustomerQq() {
        return this.$store.getters.getSellerCustomerQq
      },

      /** 计算用户选择会员订购状态
       * @return {string}
       */
      selectOrderStatus() {
        if ((this.isSelectVersionPeriodInfo.timeLevel === this.getMemberPeriodLevel && this.isSelectVersionPeriodInfo.level === this.getMemberVersionLevel) && this.isMember) {
          return 'renewal'
        } else if ((this.isSelectVersionPeriodInfo.timeLevel !== this.getMemberPeriodLevel || this.isSelectVersionPeriodInfo.level !== this.getMemberVersionLevel) && this.isMember) {
          return 'upgrade'
        } else {
          return 'buy'
        }
      },

      /** 计算用户选择会员版本周期状态
       * @return {string}
       */
      selectVersionPeriodStatus() {
        return `${this.isSelectVersionPeriodInfo.levelText} - ${this.isSelectVersionPeriodInfo.timeLevelText}`
      },

      /** 计算用户会员距离到期剩余时间
       * @return {Number}
       */
      orderSurplusTime() {
        return this.getMemberDeadline ? this.getMemberDeadline - getSeverTime() : 0
      },

      /** 计算用户账户余额是否足够支付选购的会员版本价格（true: 余额足够， false: 余额不足）
       * @return {boolean}
       */
      hasBalance() {
        return this.getUserBalance * 100 - this.buyOrderPrice * 100 > 0
      },

      /** 计算当用户账户余额不足以支付选购的会员版本价格的需要额外充值的金额
       * @return {Number}
       */
      payPrice() {
        return !this.hasBalance ? (Math.abs(this.getUserBalance * 100 - this.buyOrderPrice * 100) / 100).toFixed(2) : 0
      },

      /** 计算用户最终需要传给后端支付的金额
       * @return {Number}
       */
      lastNeedPayPrice() {
        return this.hasBalance ? this.buyOrderPrice * 1 : this.payPrice * 1
      }
    },
    methods: {
      // 选择购买会员版本
      selectVersion(level, text) {
        this.isSelectVersionPeriodInfo.level = level;
        this.isSelectVersionPeriodInfo.levelText = text;
        this.getBuyOrderPrice();
      },

      // 选择购买会员周期
      selectPeriod(timeLevel, text) {
        this.isSelectVersionPeriodInfo.timeLevel = timeLevel;
        this.isSelectVersionPeriodInfo.timeLevelText = text;
        this.getBuyOrderPrice();
      },

      // 计算选择需要购买会员类型的最终价格、有效期、选择升级后的折扣价格
      getBuyOrderPrice() {
        this.memberVersionPeriodList.forEach(item => {
          if (item.level === this.isSelectVersionPeriodInfo.level && item.timeLevel === this.isSelectVersionPeriodInfo.timeLevel) {
            this.buyOrderPrice = this.isMember && this.selectOrderStatus === 'upgrade' ? ((item.fee - this.deductionPrice * 100) / 100).toFixed(2) : (item.fee / 100).toFixed(2);
            if (this.isMember) {
              this.orderValidityTime = this.orderSurplusTime > 0 ? getSeverTime() + this.orderSurplusTime + item.validDays * 1000 * 3600 * 24 : getSeverTime() + item.validDays * 1000 * 3600 * 24;
            } else {
              this.orderValidityTime = getSeverTime() + item.validDays * 1000 * 3600 * 24;
            }
          }
          if(item.timeLevel === this.getMemberPeriodLevel && item.level === this.getMemberVersionLevel && this.isMember && this.selectOrderStatus === 'upgrade') {
            this.deductionPrice =  ((item.fee / item.validDays * parseInt(this.orderSurplusTime / 1000 / 3600 / 24)) / 100).toFixed(2);
          }
        });
      },

      // 获取所有会员版本周期列表
      getMemberVersionPeriodList() {
        const _this = this;
        let memberVersionList = [];
        let memberPeriodList = [];
        api.getMemberVersionPeriodList().then(res => {
          if (res.status) {
            res.data.forEach(item => {
              if (item.level) {
                memberVersionList.push(item.level)
              }
              if (item.timeLevel) {
                memberPeriodList.push(item.timeLevel)
              }
            });
            memberVersionList = [...new Set(memberVersionList)];
            memberPeriodList = [...new Set(memberPeriodList)];
            memberVersionList.forEach(item => {
              if (item === 200) {
                _this.memberVersionList.push({
                  id: 1,
                  level: item,
                  levelText: 'VIP'
                })
              }
              if (item === 300) {
                _this.memberVersionList.push({
                  id: 2,
                  level: item,
                  levelText: 'SVIP'
                })
              }
            });
            memberPeriodList.forEach(item => {
              if (item === 100) {
                _this.memberPeriodList.push({
                  id: 1,
                  timeLevel: item,
                  timeLevelText: '季度'
                })
              }
              if (item === 200) {
                _this.memberPeriodList.push({
                  id: 2,
                  timeLevel: item,
                  timeLevelText: '半年'
                })
              }
              if (item === 300) {
                _this.memberPeriodList.push({
                  id: 3,
                  timeLevel: item,
                  timeLevelText: '1年'
                })
              }
            });
            _this.memberVersionPeriodList = res.data;
            _this.memberPeriodList.forEach(i => {
              _this.memberVersionPeriodList.forEach(j => {
                if (i.timeLevel === j.timeLevel) {
                  i.validDays = j.validDays
                }
              })
            });
            _this.initStatus();
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      initStatus() {
        const _this = this;
        if (_this.getMemberPeriodLevel && _this.isMember) {
          _this.isSelectVersionPeriodInfo.timeLevel = _this.getMemberPeriodLevel;
          _this.memberPeriodList.forEach(item => {
            if (item.timeLevel === _this.getMemberPeriodLevel) {
              _this.isSelectVersionPeriodInfo.timeLevelText = item.timeLevelText;
            }
          })
        } else {
          _this.isSelectVersionPeriodInfo.timeLevel = _this.memberVersionPeriodList[0].timeLevel;
        }
        if (_this.getMemberVersionLevel && _this.isMember) {
          _this.isSelectVersionPeriodInfo.level = _this.getMemberVersionLevel;
        } else {
          _this.isSelectVersionPeriodInfo.level = _this.memberVersionPeriodList[0].level;
        }
        _this.getBuyOrderPrice();
      },
      orderVipSuccess() {
        _this.initStatus();
      },
      confirmPayment(pwd) {
        const _this = this;
        api.memberPurchase({
          memberLevel: _this.isSelectVersionPeriodInfo.level,
          timeLevel: _this.isSelectVersionPeriodInfo.timeLevel,
          payPwd: pwd
        }).then(res => {
          if (res.status) {
            _this.isNeedRecharge = false;
            _this.$Message.success('支付成功！');
            _this.$store.dispatch('getUserInformation').then(res => {
              if (res.status) {
                _this.initStatus();
              } else {
                _this.$Message.error(res.msg);
              }
            });
          } else {
            _this.$Message.error(res.msg);
          }
          _this.$refs.orderPayModel.payLoading = false;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .vip-member-order {
    padding-left: 40px;
    padding-bottom: 40px;
    padding-top: 20px;
  }

  .select-version,
  .select-period {
    width: 120px;
    margin-right: 10px;
    &:hover:not(:disabled) {
      border-color: $mainColor;
      background-color: #FFF4F1;
      color: $mainColor;
    }
  }

  .is-active {
    border-color: $mainColor;
    background-color: #FFF4F1;
    color: $mainColor;
  }

  .pay-btn {
    color: #fff;
    width: 210px;
    background-color: $mainColor;
    font-size: 18px;
    margin-top: 40px;
    margin-left: 206px;
  }

  .pay-model {
    @include fullScreenModel
  }

  .title-tip {
    height: 36px;
    line-height: 36px;
    margin: 56px auto 20px auto;
    color: #000;
    background-color: #FFF6F3;
    font-size: 14px;
  }

</style>
