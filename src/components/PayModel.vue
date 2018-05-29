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
      <iInput v-model="payPassword" type="password" style="width: 200px" @on-keypress="pressEnterLoginNormal"></iInput>
      <span class="ml-10" v-if="isPwdAmend"><router-link
        :to="{path:'/user/money-management/account-management',query:{type:'findPwd'}}">忘记支付密码？</router-link></span>
      <p class="mt-20 default-pwd" v-else>初始密码为：888888，为了您的账号安全，建议您
        <router-link :to="{path:'/user/money-management/account-management',query:{type:'resetPwd'}}">重置支付密码</router-link>！
      </p>
    </div>
    <div class="select-pay-type ml-56 clear" v-else>
      <span class="left mt-8">请选择支付方式：</span>
      <Radio-group v-model="payType" class="left ml-20">
        <Radio label="ali">
          <span class="ali-logo"></span>
        </Radio>
        <!--<Radio label="wechat">-->
        <!--<span class="wechat-logo"></span>-->
        <!--</Radio>-->
      </Radio-group>
    </div>
    <div class="text-ct mt-30">
      <iButton type="primary" v-if="isBalance" @click="confirmPayment" :loading="payLoading" class="recharge-btn">
        {{payButtonText}}
      </iButton>
      <iButton type="primary" v-else @click="confirmRecharge" :loading="payLoading" class="recharge-btn">
        {{rechargeButtonText}}
      </iButton>
      <iButton v-if="getMemberVersionLevel !== 100 && !isBalance && orderType !== 1" class="vip-pay-btn" @click="showFreePayModel = true">
        <span v-if="getMemberVersionLevel === 200">VIP</span>
        <span v-if="getMemberVersionLevel === 300">SVIP</span>
        <span>免手续费充值</span>
        <span>点击这里</span>
      </iButton>
      <iButton v-if="getMemberVersionLevel === 100 && !isBalance && isShowUpgradeVIP" class="svip-upgrade" @click="upgradeSvip">升级VIP免除手续费</iButton>
    </div>

    <div class="confirm-recharge-model" v-if="confirmRechargeModel">
      <div class="confirm-recharge-con">
        <h4>请前往充值界面进行充值！</h4>
        <div class="btn">
          <span @click="finishRecharge">已完成充值</span>
          <span @click="hasProblem">充值遇到问题</span>
        </div>
      </div>
    </div>
    <Modal v-model="payPopWindowWX" :styles="{top:'310px'}">
      <div slot="header" class="text-ct">微信支付二维码</div>
      <div class="text-ct">
        <img :src="wxPayImgSrc" alt="">
      </div>
      <div slot="footer" class="text-ct">
        <iButton class="success-btn" type="success" @click="finishRecharge">充值成功</iButton>
        <iButton class="error-btn" type="error" @click="hasProblem">充值失败</iButton>
      </div>
    </Modal>
    <artificial-recharge-model v-if="showFreePayModel" @colseFreePayModal="showFreePayModel = false"></artificial-recharge-model>
  </div>

</template>

<script>
  import {Input, Radio, Button, Modal} from 'iview'
  import api from '@/config/apiConfig'
  import {aliPayUrl, weiXinPayUrl} from '@/config/env'
  import ArtificialRechargeModel from '@/components/ArtificialRechargeModel';

  export default {
    name: 'pay-model',
    components: {
      iInput: Input,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iButton: Button,
      Modal: Modal,
      ArtificialRechargeModel: ArtificialRechargeModel
    },
    props: {
      // 需要充值的金额
      orderMoney: {
        type: [Number, String],
        required: true
      },
      // 订购会员版本
      memberLevel: {
        type: [Number, String],
        default: null
      },
      // 订购会员周期
      timeLevel: {
        type: [Number, String],
        default: null
      },
      // 订购增值服务Id
      vasFeeId: {
        type: [Number, String],
        default: null
      },
      // 是否显示vip升级按钮
      isShowUpgradeVIP: {
        type: Boolean,
        default: false
      },
      // 余额是否足够支付
      isBalance: {
        type: Boolean,
        required: true
      },
      // 购买类型（0：正常充值， 1：购买会员充值，2：购买增值服务充值）
      orderType: {
        type: Number,
        default: 0
      },
      // 支付按钮文本
      payButtonText: {
        type: String,
        default: '确认支付'
      },
      // 充值按钮文本
      rechargeButtonText: {
        type: String,
        default: '立即充值'
      }
    },
    data() {
      return {
        payType: 'ali',
        wxPayImgSrc: null,
        payPassword: null,
        confirmRechargeModel: false,
        payPopWindowWX: false,
        payLoading: false,
        showFreePayModel: false
      }
    },
    computed: {
      /** 获取用户支付密码修改状态
       * @return {boolean}
       */
      isPwdAmend() {
        return this.$store.getters.getIsEditPwdAlready
      },

      /** 获取用户会员版本
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.state.userInfo.memberLevel
      },

      /** 获取用户会员状态
       * @return {Number}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },

      /** 计算用户最终需要充值的金额（包含支付宝充值手续费: 需要收取千分之六的充值手续费）
       * @return {Number}
       */
      lastPayMoney() {
        if(this.orderType === 0) {
          return Math.ceil(Math.ceil(this.orderMoney) / 0.994)
        } else {
          return Math.ceil(this.orderMoney)
        }
      }
    },
    methods: {
      confirmPayment() {
        this.payLoading = true;
        this.$emit('confirmPayment', this.payPassword);
      },
      pressEnterLoginNormal(event) {
        if (event.keyCode === 13) {
          this.confirmPayment()
        }
      },
      upgradeSvip() {
        this.$router.push({path: '/user/vip-member/order'})
      },
      confirmRecharge() {
        const _this = this;
        _this.payLoading = true;
        if (_this.payType === 'ali') {
          const newWindowUrl = window.open('about:blank');
          api.balanceOrderCreate({
            feeToAccount: Math.ceil(_this.orderMoney),
            finalFee: _this.lastPayMoney,
            orderPlatform: 'PC',
            payChannel: 1,
            memberLevel: _this.memberLevel,
            timeLevel : _this.timeLevel,
            orderType: _this.orderType,
            vasFeeId: _this.vasFeeId,
          }).then(res => {
            _this.payLoading = false;
            if (res.status) {
              _this.confirmRechargeModel = true;
              newWindowUrl.location.href = aliPayUrl + 'orderSerial=' + res.data.orderSerial;
            } else {
              _this.$Message.error(res.msg);
            }
          });
        } else {
          api.balanceOrderCreate({
            feeToAccount: (_this.orderMoney * 100).toFixed() * 1,
            finalFee: (_this.orderMoney * 100 * 1.006).toFixed() * 1,
            orderPlatform: 'PC',
            payChannel: 2
          }).then(res => {
            if (res.status) {
              this.payPopWindowWX = true;
              _this.wxPayImgSrc = weiXinPayUrl + 'orderSerial=' + res.data.orderSerial + '&userId=' + res.data.uid;
              _this.payLoading = false;
            } else {
              _this.$Message.error(res.msg);
            }
          });
        }
      },
      finishRecharge() {
        this.confirmRechargeModel = false;
        this.payPopWindowWX = false;
        this.$store.dispatch('getUserInformation').then(res => {
          if(res.status) {
            this.$emit('orderVipSuccess');
          }
        });
      },
      hasProblem() {
        this.confirmRechargeModel = false;
        this.payPopWindowWX = false;
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
      @include transition;
      border-radius: 5px;
      cursor: pointer;
      padding-left: 40px;
      padding-right: 40px;
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

    .success-btn {
      width: 120px;
      padding: 10px 10px;
      background-color: #FF6600;
      border: none
    }

    .error-btn {
      width: 120px;
      padding: 10px 10px;
      margin-left: 50px;
      background-color: #3FC0C5;
      border: none
    }

    .vip-pay-btn {
      color: #fff;
      background-color: #24B3F1;
      margin-left: 20px;
      @include transition;
      &:hover {
        background-color: darken(#24B3F1, 10%);
      }
    }

    .svip-upgrade {
      border:1px solid #FFCD00;
      color: #FF8C2B;
      margin-left: 20px;
      background-color: #FFFC00;
      @include transition;
      &:hover {
        background-color: darken(#FFFC00, 2%);
      }
    }
  }
</style>
