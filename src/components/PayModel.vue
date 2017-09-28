<template>
  <div class="pay-model-con">
    <slot name="closeModel"></slot>
    <div v-if="!isBalance">
      <slot name="noBalance"></slot>
    </div>
    <div v-else>
      <slot name="isBalance"></slot>
    </div>
    <div class="hasBalance mt-40" v-if="isBalance">
      <span class="input-pay-pwd">请输入支付密码：</span>
      <iInput v-model.number="payPassword" type="password" style="width: 200px"
              @on-keypress="pressEnterLoginNormal"></iInput>
      <span class="ml-10" v-if="isPwdAmend"><router-link
        :to="{path:'/user/money-management/account-management',query:{type:'findPwd'}}">忘记支付密码？</router-link></span>
      <p class="mt-20 default-pwd" v-else>初始密码为：888888，为了您的账号安全，建议您<router-link :to="{path:'/user/money-management/account-management',query:{type:'resetPwd'}}">重置支付密码</router-link>！</p>
    </div>
    <div class="select-pay-type ml-56 clear" v-else>
      <span class="left mt-8">请选择支付方式：</span>
      <Radio-group v-model="payType" class="left ml-20">
        <Radio label="ali">
          <span class="ali-logo"></span>
        </Radio>
        <Radio label="wechat" style="display: none;">
          <span class="wechat-logo"></span>
        </Radio>
      </Radio-group>
    </div>
    <iButton type="primary" v-if="isBalance" :loading="payLoading" @click="confirmPayment" class="recharge-btn">{{payButtonText}}</iButton>
    <iButton type="primary" v-else :loading="payLoading" @click="confirmRecharge" class="recharge-btn">{{rechargeButtonText}}</iButton>
    <div class="confirm-recharge-model" v-if="confirmRechargeModel">
      <div class="confirm-recharge-con">
        <h4>请前往充值界面进行充值！</h4>
        <div class="btn">
          <span @click="finishRecharge">已完成充值</span>
          <span @click="hasProblem">充值遇到问题</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Button from 'iview/src/components/button'
  import api from '@/config/apiConfig'
  import {aliPayUrl} from '@/config/env'

  export default {
    name: 'PayModel',
    components: {
      iInput: Input,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iButton: Button,
    },
    props: {
      orderMoney: {
        type: [Number, String],
        required: true,
        default: 0
      },
      payButtonText: {
        type: String,
        default: '确认支付'
      },
      rechargeButtonText: {
        type: String,
        default: '立即充值'
      }
    },
    data() {
      return {
        payType: 'ali',
        payPassword: null,
        confirmRechargeModel: false,
        payLoading: false,
      }
    },
    mounted() {
    },
    created() {
    },
    computed: {
      userBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      isPwdAmend: function () {
        return this.$store.getters.getIsEditPwdAlready;
      },
      isBalance: function () {
        return this.orderMoney <= this.userBalance;
      },
      payMoney: function () {
        return this.isBalance ? 0 : ((this.orderMoney - this.userBalance) * 100).toFixed(2) * 1;
      }
    },
    methods: {
      confirmPayment() {
        this.$emit('confirmPayment',this.payPassword);
      },
      pressEnterLoginNormal(event) {
        if (event.keyCode === 13) {
          this.confirmPayment()
        }
      },
      confirmRecharge() {
        let _this = this;
        _this.confirmRechargeModel = true;
        _this.payLoading = true;
        api.balanceOrderCreate({
          finalFee: this.payMoney,
          orderPlatform: 'PC',
          payChannel: 1
        }).then(res => {
          if (res.status) {
            let src = aliPayUrl + 'orderSerial=' + res.data.orderSerial;
            window.open(src);
            _this.payLoading = false;
          }
        })
      },
      finishRecharge() {
        this.confirmRechargeModel = false;
        this.$store.dispatch('getUserInformation');
      },
      hasProblem() {
        this.confirmRechargeModel = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .pay-model-con {
    position: absolute;
    width: 600px;
    background-color: #fff;
    border-radius: 5px;
    left: 50%;
    margin-left: -300px;
    top: 30%;
    padding: 0 32px 26px 32px;
    text-align: center;
    .select-pay-type {
      font-size: 16px;
      .ali-logo {
        display: inline-block;
        width: 98px;
        height: 25px;
        @include bis("~assets/img/task-release/zfb_logo.png");
        position: relative;
        top: 8px;
      }
      .wechat-logo {
        display: inline-block;
        width: 98px;
        height: 25px;
        @include bis("~assets/img/task-release/wechat_logo.png");
        position: relative;
        top: 8px;
      }
    }
    .input-pay-pwd {
      font-size: 16px;
    }
    .recharge-btn {
      display: inline-block;
      padding: 4px 16px;
      line-height: 24px;
      @include sc(16px, #fff);
      text-align: center;
      margin: 28px auto 0 auto;
      @include transition;
      border-radius: 5px;
      cursor: pointer;
      background-color: $mainColor;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }
    .close-recharge {
      font-size: 26px;
      float: right;
      cursor: pointer;
    }
    .confirm-recharge-model {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background-color: rgba(55, 55, 55, .6);
    }
    .confirm-recharge-con {
      @include fullScreenModelCon(486px, 186px);
      h4 {
        font-size: 18px;
        margin-top: 42px;
        color: #666;
        font-weight: 500;
      }
      .btn {
        margin-top: 36px;
        text-align: center;
        span {
          display: inline-block;
          @include wh(120px, 40px);
          line-height: 40px;
          color: #fff;
          font-size: 16px;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
        }
        span:first-child {
          background-color: $mainColor;
          margin-right: 42px;
          &:hover {
            background-color: darken($mainColor, 10%);
          }
        }
        span:last-child {
          background-color: #3FC0C5;
          &:hover {
            background-color: darken(#3FC0C5, 10%);
          }
        }
      }
    }
    .default-pwd {
      font-size: 14px;
      color: #666;
    }
  }
</style>
