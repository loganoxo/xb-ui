<template>
  <div class="vip-member-order">
    <p class="mt-10"><strong>VIP会员服务说明：</strong></p>
    <p class="mt-5">1、可在服务期内使用对应版本的服务功能，VIP及SVIP购买成功后费用不退还。</p>
    <p class="mt-5">2、会员版本仅支持向上扩展。譬如：当前版本为SVIP版本，在该版本到期前不支持购买VIP版本。</p>
    <p class="mt-5">3、时间周期在当前版本中叠加购买。譬如：当前为VIP年版，再购买VIP半年则在原到期时间上延长半年 。</p>
    <p class="mt-5">4、会员版本升级时，将现有会员剩余时间按天进行折算，剩余价格将抵扣到新版本的费用中（若折算出的价格有溢出，将不退回）。</p>
    <div class="mt-30">
      <span class="f-b">请选择您的会员版本：</span>
      <i-button class="select-version fs-16" :class="{'is-active': isSelectVersionPeriodInfo.level === item}"
                v-for="item in memberVersionList" :key="item.id"
                :disabled="getMemberVersionLevel > item && isMember"
                @click="selectVersion(item, memberVersionNameMap[item])">
        {{memberVersionNameMap[item]}}
      </i-button>
    </div>
    <div class="mt-28">
      <span class="f-b">请选择您的时间周期：</span>
      <i-button :class="{'is-active': isSelectVersionPeriodInfo.timeLevel === item.timeLevel}" class="select-period"
                v-for="item in memberPeriodList" :key="item.id"
                @click="selectPeriod(item.timeLevel, memberPeriodNameMap[item.timeLevel])">
        <div>
          <span class="fs-16">{{memberPeriodNameMap[item.timeLevel]}}</span>
          <span class="fs-12">({{item.validDays || 0}}天)</span>
        </div>
        <div>￥{{(item.fee / 100).toFixed(2) || 0}}</div>
      </i-button>
    </div>
    <div class="mt-28">
      <p class="fs-14">您当前为：{{nowVersionName}}<span v-if="isMember">，到期时间：{{getMemberDeadline | dateFormat('YYYY-MM-DD') || '------'}}</span>
      </p>
      <p class="mt-10 fs-14">您已选择 <span class="main-color">{{selectOrderStatusMap[selectOrderStatus]}}</span> <span
        class="cl000 f-b">{{selectVersionPeriodStatus || '--'}}</span>，有效期至
        <span class="main-color">{{orderValidityTime | dateFormat('YYYY-MM-DD') || '------'}}</span><span
          v-if="isMember && isVersionUpgrade">，根据您现在的会员版本可折价抵扣：{{(deductionPrice / 100).toFixed(2) || 0.00}}元，成功升级后现有版本将失效。</span>
      </p>
      <p class="fs-16 mt-10">本次总共需要支付的金额为：<span class="f-b">{{buyOrderPrice > 0 ? buyOrderPrice : 0}}</span>
        元。您账户余额为： <span class="f-b">{{(getUserBalance).toFixed(2) || 0}}</span>
        元<span v-if="!hasBalance">，还需要充值：<span class="f-b">{{needPayMoney}}</span> 元</span>
      </p>
    </div>
    <i-button v-if="hasBalance" class="pay-btn" @click="isNeedRecharge = true">立即购买</i-button>
    <i-button v-if="!hasBalance" class="pay-btn" @click="isNeedRecharge = true">前去充值</i-button>
    <!--支付弹窗-->
    <div class="pay-model" v-if="isNeedRecharge">
      <pay-model ref="orderPayModel" :orderMoney="needPayMoney" :orderType="1" :isBalance="hasBalance"
                :memberLevel="isSelectVersionPeriodInfo.level" :timeLevel="isSelectVersionPeriodInfo.timeLevel"
                @orderVipSuccess="orderVipSuccess" @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="isNeedRecharge = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3">
            <Icon color="#FF2424" size="16" type="ios-information"></Icon>
            <span class="">亲，您的余额不足，请充值。</span>
          </span>还需充值
          <strong class="size-color3">{{needPayMoneyText}}</strong> 元。
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
          <span class="ml-10">您本次需要支付金额为 <span
            class="size-color3">{{buyOrderPrice > 0 ? buyOrderPrice : 0}}</span> 元。</span>
        </div>
      </pay-model>
    </div>
    <modal v-model="isShowAliPayTip">
      <img src="~assets/img/common/ali-pay-tip.jpg">
    </modal>
  </div>
</template>

<script>
  import {Button, Icon, Modal} from 'iview'
  import PayModel from '@/components/PayModel'
  import {getSeverTime} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: "vip-member-order",
    components: {
      IButton: Button,
      Icon: Icon,
      Modal: Modal,
      PayModel: PayModel,
    },
    data() {
      return {
        isSelectVersionPeriodInfo: {
          level: 200,
          levelText: 'VIP',
          timeLevel: 300,
          timeLevelText: '1年',
        },
        selectOrderStatusMap: {
          'renewal': '续费',
          'upgrade': '升级',
          'buy': '购买',
        },
        memberPeriodNameMap: {
          7 : '7天',
          15 : '15天',
          30 : '1月',
          100: '季度',
          200: '半年',
          300: '1年',
        },
        memberVersionNameMap: {
          200: 'VIP',
          300: 'SVIP',
        },
        orderValidityTime: null,
        buyOrderPrice: '0.00',
        deductionPrice: 0,
        memberVersionList: [],
        memberPeriodList: [],
        memberVersionPeriodList: [],
        isNeedRecharge: false,
        nowVersionName: null,
        isShowAliPayTip: false,
      }
    },
    created() {
      this.getMemberVersionPeriodList()
    },
    computed: {
      /** 获取用户账户余额
       * @return {Number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
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

      /** 获取售后客服QQ号码
       * @return {Number}
       */
      getSellerCustomerQq() {
        return this.$store.getters.getSellerCustomerQq
      },

      /** 计算用户选择会员订购状态（renewal：续费，upgrade：升级， buy： 购买）
       * @return {string}
       */
      selectOrderStatus() {
        if (this.isSelectVersionPeriodInfo.level === this.getMemberVersionLevel && this.isMember) {
          return 'renewal'
        } else if (this.isSelectVersionPeriodInfo.level !== this.getMemberVersionLevel && this.isMember) {
          return 'upgrade'
        } else {
          return 'buy'
        }
      },

      /** 计算用户当前选择会员版本周期状态
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
        return this.getUserBalance * 100 - this.buyOrderPrice * 100 >= 0
      },

      /** 计算当用户账户余额不足以支付选购的会员版本价格的需要额外充值的金额
       * @return {Number}
       */
      needPayMoney() {
        return !this.hasBalance ? (Math.abs(this.getUserBalance * 100 - this.buyOrderPrice * 100) / 100).toFixed(2) : 0
      },

      /** 计算充值界面上的金额文本显示
       * @return {String}
       */
      needPayMoneyText() {
        return `${this.needPayMoney} + ${(((Math.ceil(this.needPayMoney * 100 / 0.994)) - this.needPayMoney * 100) / 100).toFixed(2)}`
      },

      /** 计算用户当前选择是否是版本升级
       * @return {Number}
       */
      isVersionUpgrade() {
        return this.getMemberVersionLevel < this.isSelectVersionPeriodInfo.level && this.selectOrderStatus === 'upgrade'
      }
    },
    methods: {
      // 选择购买会员版本
      selectVersion(level, text) {
        this.isSelectVersionPeriodInfo.level = level;
        this.isSelectVersionPeriodInfo.levelText = text;
        this.memberPeriodList = [];
        this.memberVersionPeriodList.forEach(item => {
          if (item.level === level) {
            this.memberPeriodList.push(item)
          }
        });
        if(level === 300) {
          this.isSelectVersionPeriodInfo.timeLevel = 300;
          this.isSelectVersionPeriodInfo.timeLevelText = '1年';
        }
        this.getMemberSurplusFee().then(() => {
          this.getBuyOrderPrice();
        });
      },

      // 选择购买会员周期
      selectPeriod(timeLevel, text) {
        this.isSelectVersionPeriodInfo.timeLevel = timeLevel;
        this.isSelectVersionPeriodInfo.timeLevelText = text;
        this.getBuyOrderPrice();
      },

      // 计算选择需要购买会员类型的最终价格、有效期（不同版本升级有效期以当前时间为节点重置，同版本下周期变更以到期时间为节点叠加）
      getBuyOrderPrice() {
        this.memberVersionPeriodList.forEach(item => {
          if (item.level === this.isSelectVersionPeriodInfo.level && item.timeLevel === this.isSelectVersionPeriodInfo.timeLevel) {
            this.buyOrderPrice = this.isMember && this.isVersionUpgrade ? ((item.fee - this.deductionPrice) / 100).toFixed(2) : (item.fee / 100).toFixed(2);
            if (this.isMember) {
              if (!this.isVersionUpgrade) {
                this.orderValidityTime = this.orderSurplusTime > 0 ? getSeverTime() + this.orderSurplusTime + item.validDays * 1000 * 3600 * 24 : getSeverTime() + item.validDays * 1000 * 3600 * 24;
              } else {
                this.orderValidityTime = getSeverTime() + item.validDays * 1000 * 3600 * 24;
              }
            } else {
              this.orderValidityTime = getSeverTime() + item.validDays * 1000 * 3600 * 24;
            }
          }
        })
      },

      // 获取所有会员版本周期列表
      getMemberVersionPeriodList() {
        const _this = this;
        let memberVersionList = [];
        api.getMemberVersionPeriodList().then(res => {
          if (res.status) {
            let filterData = res.data.filter(item => {
              return item.validDays >= 91
            });
            filterData.forEach(item => {
              if (item.level) {
                memberVersionList.push(item.level)
              }
            });
            _this.memberVersionList = [...new Set(memberVersionList)];
            _this.memberVersionPeriodList = filterData;
            if(_this.getMemberVersionLevel && _this.getMemberVersionLevel !== 100) {
              _this.memberVersionPeriodList.forEach(item => {
                if (item.level === _this.getMemberVersionLevel) {
                  _this.memberPeriodList.push(item)
                }
              });
            } else {
              _this.memberVersionPeriodList.forEach(item => {
                if (item.level === 200) {
                  _this.memberPeriodList.push(item)
                }
              });
            }
            _this.initStatus();
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },

      // 获取用户当前版本折扣价格
      getMemberSurplusFee () {
        const _this = this;
        return new Promise((resolve, reject) => {
          api.getMemberSurplusFee().then(res => {
            if (res.status) {
              _this.deductionPrice = res.data;
            } else {
              _this.$Message.error(res.msg)
            }
            resolve();
          }).catch(err => {
            reject(err);
          })
        });
      },

      // 初始化购买信息状态
      initStatus() {
        const _this = this;
        if (_this.getMemberPeriodLevel && _this.isMember) {
          _this.isSelectVersionPeriodInfo.timeLevel = _this.getMemberPeriodLevel;
          _this.isSelectVersionPeriodInfo.timeLevelText = _this.memberPeriodNameMap[_this.getMemberPeriodLevel];
        }
       /* if (_this.getMemberVersionLevel && _this.isMember) {
          _this.isSelectVersionPeriodInfo.level = _this.getMemberVersionLevel;
          _this.isSelectVersionPeriodInfo.levelText = _this.memberVersionNameMap[_this.getMemberVersionLevel]
        }*/
       // 默认选择一年的周期（不考虑用户当前版本）
        _this.isSelectVersionPeriodInfo.timeLevel = 300;
        _this.isSelectVersionPeriodInfo.timeLevelText = '1年';
        if (_this.isMember && _this.getMemberVersionLevel === 200) {
          _this.nowVersionName = 'VIP会员'
        } else if (_this.isMember && _this.getMemberVersionLevel === 300) {
          _this.nowVersionName = 'SVIP会员'
        } else {
          _this.nowVersionName = '免费会员'
        }
        _this.getBuyOrderPrice();
      },

      // 购买会员成功后的回调
      orderVipSuccess() {
        this.initStatus();
      },

      // 支付宝支付成功后的回调
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
