<template>
  <div class="pay-model-con">
    <i class="close-recharge" @click="closeRecharge">&times;</i>
    <div v-if="!isBalance">
      <slot name="noBalance"></slot>
    </div>
    <div v-else>
      <slot name="isBalance"></slot>
    </div>
    <div class="hasBalance ml-80 mt-40" v-if="isBalance">
      <span class="input-pay-pwd">请输入支付密码：</span>
      <iInput v-model.number="payPassword" type="password" style="width: 200px"></iInput>
    </div>
    <div class="select-pay-type ml-56 clear" v-else>
      <span class="left mt-8">请选择支付方式：</span>
      <Radio-group v-model="payType">
        <Radio label="ali">
          <span class="ali-logo"></span>
        </Radio>
        <Radio label="wechat">
          <span class="wechat-logo"></span>
        </Radio>
      </Radio-group>
    </div>
    <div class="recharge-btn" v-if="isBalance" @click="confirmPayment">{{payButtonText}}</div>
    <div class="recharge-btn" v-else>{{rechargeButtonText}}</div>
  </div>
</template>

<script>
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'

  export default {
    name: 'PayModel',
    components: {
      iInput: Input,
      Radio: Radio,
      RadioGroup: Radio.Group,
    },
    props: {
      orderMoney: {
        type: Number,
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
      },
      onSuccess:{
        type: Function,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        payType: 'ali',
        payPassword: null
      }
    },
    mounted() {

    },
    created() {

    },
    computed: {
      userBalance: function () {
        return this.$store.state.userBalance / 100
      },
      isBalance: function () {
        return this.orderMoney <= this.userBalance
      },
    },
    methods: {
      closeRecharge() {
        this.$emit('closeRecharge');
      },
      confirmPayment() {
        api.payByBalance({
          fee:this.orderMoney,
          payPassword:this.payPassword
        }).then(res => {
          this.onSuccess(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .pay-model-con {
    @include fullScreenModelCon(630px, 298px);
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
      @include wh(120px, 30px);
      line-height: 30px;
      @include sc(16px, #fff);
      text-align: center;
      margin: 56px auto 0 auto;
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
      margin-right: 12px;
      cursor: pointer;
    }
  }
</style>
