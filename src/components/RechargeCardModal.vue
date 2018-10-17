<template>
  <modal :value="value" :mask-closable="false" @on-visible-change="change" width="600" :footer-hide="true">
    <template v-if="step === 'select'">
      <div slot="header">
        <img src="~assets/img/icon/recharge-card-icon.png" alt="">
        <span class="fs-18 ml-10 vtc-sup">充值卡充值</span>
      </div>
      <div class="pl-20 pr-20">
        <div class="card-list">
          <i-button class="card-order pos-rel" v-for="item in cardList" :key="item.id" @click="selectOrderCard(item)" :class="{'is-active': selectCard.id === item.id}">
            <span class="fs-16 f-b">￥{{item.rechargeAmount / 100}}</span><br/>
            <span>赠送{{item.presentedAmount / 100}}元</span>
            <span v-if="item.id === cardList.length" class="mark">最划算</span>
          </i-button>
        </div>
        <div class="terms-box">
          <p>使用充值业务，表示您已阅读、理解并同意接受以下条款及规则的约束。</p>
          <p>1、成功充值后，充值金额和赠送金额将显示于充值卡中。仅限对自己账户充值，充值金额和赠送金额不可转赠或提现。</p>
          <p>2、充值卡仅用限于支付活动推广费，不支持支付其它消费。</p>
          <p>3、充值卡不能与平台其它优惠同时使用。</p>
          <p>4、当你同时具有充值金额及赠送金额，在您进行消费时，优先使用充值金额。多次充值情况下，将优先消耗所有的充值金额后再消耗赠送金额。</p>
          <p>5、使用充值卡消费时，若任务结算时未完成</p>
        </div>
      </div>
      <div class="hasRead">
        <checkbox v-model="hasRead"/>
        <span>本人已阅读并同意</span>
        <span>《特惠返利充值条款》</span>
      </div>
      <div class="operate-box clear pt-10 pl-20 pr-20">
        <div class="recharge-info left">
          <p>
            <span class="f-b fs-18">到账</span>
            <span class="f-b main-color ml-10 fs-18">￥{{(selectCard.rechargeAmount +  selectCard.presentedAmount) / 100}}</span>
          </p>
          <p>充值卡仅限支付推广费</p>
        </div>
        <i-button class="right confirm-btn" :disabled="!hasRead" @click="toPay">去支付{{selectCard.rechargeAmount / 100}}元</i-button>
      </div>
    </template>
    <template v-if="step === 'pay'">
      <pay-model ref="payModelRef" :orderMoney="needRechargeMoney"
                 :orderType="3"
                 :rechargeableCardConfigId="selectCard.id"
                 :isBalance="isBalance"
                 @confirmPayment="confirmPayment">
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span
            class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyText > 0 ? (needPayMoneyText/100).toFixed(2) : 0.00}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-5">您本次需要支付金额为 <span class="sizeColor3">{{(payMoney/100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </template>
  </modal>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Button, Icon, Checkbox} from 'iview'
  import PayModel from '@/components/PayModel'
  export default {
    name: "recharge-card-modal",
    components: {
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      Checkbox: Checkbox,
      PayModel: PayModel
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        step: 'select',
        cardList:[],
        selectCard: {},
        hasRead: true,
        payMoney: null,
        isShowAliPayTip: false
      }
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
        if (this.$store.getters.getMemberLevel === 100) {
          return 100
        } else {
          return 200
        }
      },
      /** 获取用户会员状态
       * @return {boolean}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },
      /** 计算用户账户余额是否足够支付选购商品的价格（true: 余额足够， false: 余额不足）
       * @return {boolean}
       */
      isBalance() {
        return this.getUserBalance - this.payMoney >= 0
      },

      /** 计算当用户账户余额不足以支付选购的充值卡价格时需要额外充值的金额（显示给用户看的文本）
       * @return {Number}
       */
      needPayMoneyText() {
        return !this.isBalance ? Math.ceil(Math.abs(this.getUserBalance - this.payMoney) / 0.994): 0
      },

      /**
       * 计算当用户余额不足时，需要充值的金额，当余额充足时，传入0（传入orderMoney的值）
       * @return {Number}
       */
      needRechargeMoney() {
        return this.isBalance ? 0 : Math.abs(this.getUserBalance - this.payMoney)
      },

    },
    created() {

    },
    mounted() {

    },
    methods: {
      change(value) {
        if (!value) {
          this.step = 'select';
          this.cardList = [];
          this.selectCard = {};
          this.payMoney = null;
          this.$emit('input', false);
        } else {
          this.getRechargeCardConfig();
        }
      },
      selectOrderCard(card) {
        this.selectCard = card;
      },
      toPay() {
        this.payMoney = this.selectCard.rechargeAmount;
        this.step = 'pay';
      },
      getRechargeCardConfig() {
        const _this = this;
        api.getRechargeCardConfig().then(res => {
          if (res.status) {
            _this.cardList = res.data.filter(item => {
              return item.showFront;
            });
            _this.selectCard = _this.cardList[_this.cardList.length - 1];
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      confirmPayment(pwd) {
        const _this = this;
        api.orderRechargeCard({
          rechargeableCardConfigId: _this.selectCard.id,
          platform: 'PC',
          payPwd: pwd
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.step = 'select';
            _this.$Message.success('恭喜您，支付成功！');
            _this.selectCard = {};
            _this.$emit('input', false);
          } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .card-list {
    padding: 20px 0;
    .card-order {
      width: 120px;
      background: #F7F7F7;
      padding: 10px 5px;
      margin-left: 25px;
      &:first-of-type {
        margin-left: 0;
      }
      &:hover {
        border-color: $mainColor;
        background-color: #FFF4F1;
        color: $mainColor;
      }
      .mark {
        position: absolute;
        top: -15px;
        right: -15px;
        padding: 3px 10px;
        background: $mainColor;
        color: #fff;
        border-radius: 5px;
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          right: 0;
          top: 20px;
          border-color: transparent $mainColor;
          border-width: 0 0 30px 15px;
          border-style: solid;
        }
      }
    }
    .is-active {
      color: $mainColor;
      background: #FFF4F1;
      border-color: $mainColor;
    }
  }
  .terms-box {
    border: 1px solid #eee;
    padding: 10px;
  }
  .hasRead {
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
  }
  .confirm-btn {
    padding: 10px 40px;
    background: $mainColor;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }
</style>
