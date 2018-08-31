<template>
  <modal :value="value" :title="title" width="600" :mask-closable="false" @on-visible-change="change" >
    <template v-if="step === 'create'">
      <div class="clear task-info pb-20">
        <div class="left">
          <img class="border-radius-5" width="54" height="54" :src="data.taskMainImage" alt="">
        </div>
        <div class="left ml-10">
          <p>
            <span>活动名称：</span> <span>{{data.taskName}}</span>
          </p>
          <p>
            <span>活动类型：</span> <span v-if="data.activityCategory === 'free_get'">拍A发A</span><span v-if="data.activityCategory === 'present_get'">拍A发B</span>
            <span>下单方式：</span> <span>{{data.taskTypeDesc}}</span>
          </p>
          <p>
            <span>若该活动设置了系统审批时间，则原时间点计划不变，日期为明日开始顺延</span>
          </p>
        </div>
      </div>
      <i-button slot="footer" type="primary" size="large" long :loding="buttonLoading" @click="nextStep">下一步</i-button>
    </template>
    <template v-if="step === 'pay'">
      <pay-model ref="payModelRef" :orderMoney="realPayMoney" @confirmPayment="confirmPayment"
                 :isBalance="isBalance" :redEnvelopesState="redEnvelopesState"
                 :redEnvelopeDeductionNumber="redEnvelopeDeductionNumber"
                 :disabledRedEnvelopes="true">
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon type="md-alert" size="18" color="#FF2424"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyBeforeText}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-5">您本次需要支付金额为 <span class="sizeColor3">{{(realPayMoney/100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </template>
  </modal>
</template>

<script>
  import {Modal, Input, Button, Icon} from 'iview'
  import PayModel from '@/components/PayModel'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {isInteger, delSpace, debounce} from '@/config/utils'
  export default {
    name: "exempt-release-modal",
    components: {
      Modal: Modal,
      Icon: Icon,
      IInput: Input,
      IButton: Button,
      PayModel: PayModel,
      TimeDown: TimeDown,
    },
    data() {
      return {
        // currentValue: this.value,
        itemReviewList: [],
        step: 'create',
        title: '免审发布信息确认',
        buttonLoading: false,
        newestData:{},
        redEnvelopeDeductionNumber: null
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    computed: {

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /**
       * 获取用户账户余额
       * @return {number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /**
       * 计算活动总金额
       * @return {number}
       */
      orderMoney() {
        return this.newestData.totalMarginNeed + this.newestData.promotionExpensesNeed + this.newestData.vasFeeNeed + this.newestData.tagVasFeeNeed
      },

      /**
       * 计算红包启用状态
       * @return {number}
       */
      redEnvelopesState() {
        return this.data.redEnvelopeDeductionPaid > 0
      },

      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber <= this.getUserBalance : this.orderMoney <= this.getUserBalance
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要额外充值的金额
       * @return {number}
       */
      needPayMoneyBefore() {
        const money = this.orderMoney - this.getUserBalance;
        return !this.isBalance ? money > 0 ? money : 0 : 0;
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要额外充值的金额（包含是否启用红包金额，此金额为最终需要充值金额）
       * @return {number}
       */
      needPayMoneyBeforeAsRedEnvelopes() {
        return this.redEnvelopesState ? this.needPayMoneyBefore - this.redEnvelopeDeductionNumber : this.needPayMoneyBefore
      },

      /** 计算充值界面上的金额文本显示
       * @return {String}
       */
      needPayMoneyBeforeText() {
        return !this.isBalance ? `${(this.needPayMoneyBeforeAsRedEnvelopes / 100).toFixed(2)} + ${((Math.ceil(this.needPayMoneyBeforeAsRedEnvelopes / 0.994) - this.needPayMoneyBeforeAsRedEnvelopes) / 100).toFixed(2)}` : ''
      },

      /**
       * 计算实际需要支付的费用
       * @return {Number}
       */
      realPayMoney() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber : this.orderMoney
      }

    },
    created() {
    },
    mounted() {

    },
    methods: {
      change(value) {
        if (!value) {
          this.step = 'create';
          this.title = '支付信息确认';
          this.newestData = {};
          this.redEnvelopeDeductionNumber = null;
          this.$emit('input',false);
        }
      },
      nextStep() {
        const _this = this;
        api.releaseWithoutAudit({
          taskId: _this.data.id
        }).then(res => {
          if (res.status) {
            _this.newestData = res.data;
            return res.status;
          } else {
            if (res.statusCode === 'system_update' || res.statusCode === 'system_error') {
              _this.$Message.error(res.msg);
            } else {
              _this.$Message.error('Sorry，该活动不符合免审发布条件。');
            }
          }
        }).then(status => {
          if (status) {
            api.redEnvelopeDeduction({
              taskId: _this.newestData.id,
            }).then(res => {
              if (res.status) {
                _this.redEnvelopeDeductionNumber = res.data;
                _this.title = '支付信息确认';
                _this.step = 'pay';
              } else {
                _this.$Message.error(res.msg);
              }
            })
          }
        })
      },
      confirmPayment(pwd) {
        const _this = this;
        api.editPromotion({
          redEnvelopesState: _this.redEnvelopesState,
          taskId: _this.newestData.id,
        }).then(res => {
          return res
        }).then(res => {
          if (res.status) {
            api.payByBalance({
              fee: _this.realPayMoney,
              payPassword: pwd,
              taskId: _this.newestData.id,
              type: 'first_pay'
            }).then(res => {
              if (res.status) {
                _this.$store.dispatch('getUserInformation');
                _this.step = 'create';
                _this.$emit('input',false);
                _this.$Message.success('恭喜您，支付成功！');
                _this.$emit('releaseSuccess')
              } else {
                _this.$Message.error(res.msg)
              }
              _this.$refs.payModelRef.payLoading = false;
            })
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
    },
    destroyed() {
      this.step = 'create';
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .fee-info {
    width: 80%;
    min-height: 100px;
    border: 1px solid #FF6636;
    border-radius: 5px;
    margin: auto;
    background: #FFF5E0;
    padding: 15px 10px;
    margin-top: 10px;
  }

</style>
