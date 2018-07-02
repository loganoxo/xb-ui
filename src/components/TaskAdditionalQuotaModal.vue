<template>
  <modal :value="currentValue" :title="title" width="600" :mask-closable="false" @on-visible-change="change">
    <template v-if="step === 'create'">
      <div class="clear">
        <div class="left">
          <img class="border-radius-5" width="54" height="54" :src="data.taskMainImage" alt="活动主图">
        </div>
        <div class="left ml-10">
          <p>活动名称：{{data.taskName}}</p>
          <p>参与概括：总份数 <span class="main-color">{{data.taskCount}}</span>，<span
            class="main-color">{{data.trailOn}} </span>人正在参与活动
            ，<span class="main-color">{{data.trailDone}}</span>人完成活动，剩余名额 <span
              class="main-color">{{data.residueCount}}</span> 个
          </p>
          <p>单品活动担保金：<span class="main-color">{{(oneBondLast / 100).toFixed(2)}}</span>
            元&nbsp;&nbsp;&nbsp;&nbsp;单品推广费：<span
              class="main-color">{{(data.promotionExpensesPaid / data.taskCount / 100).toFixed(2)}}</span> 元&nbsp;&nbsp;&nbsp;&nbsp;单品增值服务费：<span
              class="main-color">{{(data.vasFeePaid / data.taskCount / 100).toFixed(2)}}</span> 元</p>
        </div>
      </div>
      <div class="mt-10 border-top pt-10">
        <p>当前待审核：<span class="main-color">{{data.totalTaskApplyCount}}</span> 人</p>
        <p class="mt-10">
          <span>追加份数：</span>
          <i-input v-model.number="addTaskNumber" placeholder="请输入追加份数" @on-change="addTaskNumberChange" style="width: 100px;"/>
        </p>
      </div>
      <div class="mt-10 border-top pt-10" v-if="data.itemReviewRequired === 'assign_review_detail' && itemReviewList.length > 0">
        <p class="mb-10">该活动设置了指定评价，请对追加的份数提供相应的评价数：</p>
        <p class="mt-5" v-for="item in itemReviewList">
          <span class="vtc-sup">{{'评价' + item.index}}：</span>
          <i-input v-model="item.value" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价内容" style="width: 480px;"/>
        </p>
      </div>
      <div slot="footer">
        <i-button type="primary" size="large" long :loding="buttonLoading" @click="nextStep">下一步</i-button>
      </div>
    </template>
    <template v-else>
      <pay-model ref="payModelRef" :orderMoney="needPayMoneyBeforeAsRedEnvelopes" @confirmPayment="confirmPayment"
                 :isBalance="isBalance" :redEnvelopesState="redEnvelopesState"
                 @change="redEnvelopesState = arguments[0]" :redEnvelopeDeductionNumber="redEnvelopeDeductionNumber"
                 :disabledRedEnvelopes="true">
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="ios-information"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyBeforeText}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="ios-information"/>
          <span class="ml-5">您本次需要支付金额为 <span class="sizeColor3">{{(needPayMoneyAfterAsRedEnvelopes / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </template>
  </modal>
</template>

<script>
  import {Modal, Input, Button, Icon} from 'iview'
  import PayModel from '@/components/PayModel'
  import api from '@/config/apiConfig'
  import {isInteger, delSpace} from '@/config/utils'

  export default {
    name: "task-additional-quota-modal",
    data() {
      return {
        currentValue: this.value,
        buttonLoading: false,
        addTaskNumber: null,
        itemReviewList: [],
        step: 'create',
        title: '活动追加名额'
      }
    },
    components: {
      Modal: Modal,
      Icon: Icon,
      IInput: Input,
      IButton: Button,
      PayModel: PayModel,
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
       * 计算红包启用状态
       * @return {number}
       */
      redEnvelopesState() {
        return this.data.redEnvelopeDeductionPaid > 0
      },

      /**
       * 计算红包抵扣金额
       * @return {number}
       */
      redEnvelopeDeductionNumber() {
        return this.data.redEnvelopeDeductionPaid > 0 ? this.data.redEnvelopeDeductionPaid / this.data.taskCount * this.addTaskNumber : 0
      },

      /**
       * 计算拍A发A最终商家发布单品活动担保金（宝贝单价 + 邮费）
       * @return {number}
       */
      oneBondAToA() {
        return this.data.pinkage ? this.data.itemPrice : (this.data.itemPrice + 1000)
      },

      /**
       * 计算拍A发B最终商家发布单品活动担保金（A宝贝单价 * 拍下数量 + 邮费）
       * @return {number}
       */
      oneBondAToB() {
        return this.data.pinkage ? this.data.itemPrice * this.data.orderQuantity : (this.data.itemPrice * this.data.orderQuantity + 1000)
      },

      /**
       * 计算最终的单品活动保证金
       * @return {number}
       */
      oneBondLast() {
        if (this.data.activityCategory === 'free_get') {
          return this.oneBondAToA
        }
        if (this.data.activityCategory === 'present_get') {
          return this.oneBondAToB
        }
      },

      /**
       * 计算最终单品推广费用（打赏费）
       * @return {number}
       */
      onePromotionExpenses() {
        if (this.data.activityCategory === 'free_get') {
          if (this.getMemberVersionLevel === 100) {
            return 5
          }
          if (this.getMemberVersionLevel === 200) {
            return 3
          }
          if (this.getMemberVersionLevel === 300) {
            return 3
          }
        }
        if (this.data.activityCategory === 'present_get') {
          if (this.getMemberVersionLevel === 100) {
            return 10
          }
          if (this.getMemberVersionLevel === 200) {
            return 6
          }
          if (this.getMemberVersionLevel === 300) {
            return 6
          }
        }
      },

      /**
       * 计算活动总增值费
       * @return {number}
       */
      allValueAddedCost() {
        return (this.data.vasFeePaid / this.data.taskCount) * this.addTaskNumber
      },

      /**
       * 计算活动总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.addTaskNumber
      },

      /**
       * 计算活动总金额
       * @return {number}
       */
      orderMoney() {
        if (this.data.activityCategory === 'free_get') {
          return (this.addTaskNumber * this.oneBondAToA) + this.allPromotionExpenses * 100 + this.allValueAddedCost
        }
        if (this.data.activityCategory === 'present_get') {
          return (this.addTaskNumber * this.oneBondAToB) + this.allPromotionExpenses * 100 + this.allValueAddedCost
        }
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
       * 计算当用户账户余额足以支付活动所需金额时要支付的金额（包含是否启用红包金额，此金额为最终需要支付金额）
       * @return {number}
       */
      needPayMoneyAfterAsRedEnvelopes() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber : this.orderMoney
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
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      change(value) {
        if (!value) {
          this.$emit('input', false)
        }
        this.addTaskNumber = null;
        this.itemReviewList = [];
        // 关闭弹框时延迟渲染创建活动界面
        setTimeout(() => {
          this.step = 'create';
        }, 200);
      },
      nextStep() {
        if (!this.addTaskNumber) {
          this.$Message.warning('亲，请输入需要追加的活动份数！');
          return;
        }
        if (!isInteger(this.addTaskNumber)) {
          this.$Message.warning('亲，追加活动份数必须为正整数数字！');
          return;
        }
        if (this.addTaskNumber <= 0) {
          this.$Message.warning('亲，追加活动份数必须大于0！');
          return;
        }
        let isItemReviewOk = true;
        this.itemReviewList.map(item => {
          if (!item.value || !delSpace(item.value)) {
            item.value = item.value ? delSpace(item.value) : item.value;
            this.$Message.warning('亲，追加评价内容不能为空！');
            isItemReviewOk = false;
          }
        });
        if (!isItemReviewOk) {
          return
        }
        this.title = '支付充值活动费用';
        this.step = 'pay';
      },
      addTaskNumberChange() {
        this.itemReviewList = [];
        for (let i = 1; i <= this.addTaskNumber; i++) {
          this.itemReviewList.push({
            value: null,
            index: i,
          })
        }
      },
      confirmPayment(pwd) {
        const _this = this;
        const itemReviewPushList = [];
        if (_this.itemReviewList.length > 0) {
          _this.itemReviewList.forEach(item => {
            if (item.value) {
              itemReviewPushList.push(delSpace(item.value));
            }
          })
        }
        api.additionalTaskAccount({
          payPwd: pwd,
          taskId: _this.data.taskId,
          additionCount: _this.addTaskNumber,
          additionItemReview: JSON.stringify(itemReviewPushList)
        }).then(res => {
          if (res.status) {
            _this.addTaskNumber = null;
            _this.$emit('addTaskSuccess');
            _this.$emit('input', false);
          } else {
            _this.$Message.error(res.msg)
          }
          _this.$refs.payModelRef.payLoading = false;
        })
      },
    },
    watch: {
      value(val) {
        this.setCurrentValue(val)
      }
    },
  }
</script>
