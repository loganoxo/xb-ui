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
            元&nbsp;&nbsp;&nbsp;&nbsp;单品推广费：<span class="main-color">{{(data.promotionExpensesPaid / data.taskCount / 100).toFixed(2)}}</span> 元&nbsp;&nbsp;&nbsp;&nbsp;单品增值服务费：<span
              class="main-color">{{(data.vasFeePaid / data.taskCount / 100).toFixed(2)}}</span> 元</p>
        </div>
      </div>
      <div class="mt-10 border-top pt-10">
        <p>当前待审核：<span class="main-color">{{data.totalTaskApplyCount}}</span> 人</p>
        <template v-if="!data.isOldTask">
          <div class="inline-block tag" v-for="item in keywordPlanInfo" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
            <span @click="selectChangeScheme(item.index)">关键词方案{{ item.index + 1 }}</span>
            <sup class="badge-count" v-show="item.addTaskNumber > 0">{{item.addTaskNumber}}</sup>
          </div>
        </template>
        <div v-for="item in keywordPlanInfo" v-show="selectKeywordScheme === item.index">
          <div class="mt-10">
            <span>追加份数：</span>
            <i-input v-model.number="item.addTaskNumber" placeholder="请输入追加份数" @on-change="addTaskNumberChange" style="width: 100px;"/>
          </div>
          <div class="mt-10 border-top pt-10 addition-item" v-if="data.itemReviewRequired === 'assign_review_detail' && itemReviewList.length > 0">
            <p class="mb-10">该活动设置了指定评价，请对追加的份数提供相应的评价数：</p>
            <p class="mt-5" v-for="(item, index) in itemReviewList">
              <span class="vtc-sup">{{`评价${index + 1}`}}：</span>
              <i-input v-model="item.value" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价内容" style="width: 480px;"/>
            </p>
          </div>
        </div>
      </div>
      <div class="mt-10 border-top pt-10">共追加&nbsp;<span class="main-color">{{allAddTaskNumber}}</span>&nbsp;份</div>
      <i-button slot="footer" type="primary" size="large" long :loding="buttonLoading" @click="nextStep">下一步</i-button>
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
  import {isInteger, delSpace, debounce} from '@/config/utils'

  export default {
    name: "task-additional-quota-modal",
    data() {
      return {
        currentValue: this.value,
        buttonLoading: false,
        oldAddTaskNumber: null,
        itemReviewList: [],
        step: 'create',
        title: '活动追加名额',
        keywordPlanInfo: [],
        selectKeywordScheme: 0,
        timer: null
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
        return this.data.redEnvelopeDeductionPaid > 0 ? this.data.redEnvelopeDeductionPaid / this.data.taskCount * this.allAddTaskNumber : 0
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
        return (this.data.vasFeePaid / this.data.taskCount) * this.allAddTaskNumber
      },

      /**
       * 计算活动总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.allAddTaskNumber
      },

      /**
       * 计算活动总金额
       * @return {number}
       */
      orderMoney() {
        if (this.data.activityCategory === 'free_get') {
          return (this.allAddTaskNumber * this.oneBondAToA) + this.allPromotionExpenses * 100 + this.allValueAddedCost
        }
        if (this.data.activityCategory === 'present_get') {
          return (this.allAddTaskNumber * this.oneBondAToB) + this.allPromotionExpenses * 100 + this.allValueAddedCost
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

      /** 计算总追加份数
       * @return {number}
       */
      allAddTaskNumber() {
       return this.keywordPlanInfo.reduce((prev, cur) => {
         return (cur.addTaskNumber > 0 ? cur.addTaskNumber : 0) + prev
        }, 0)
      }
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      change(value) {
        if (!value) {
          this.$emit('input', false);
          this.keywordPlanInfo.forEach(item => {
            item.addTaskNumber = null;
          });
          this.itemReviewList = [];
          this.oldAddTaskNumber = null;
          // 关闭弹框时延迟渲染创建活动界面
          setTimeout(() => {
            this.step = 'create'
          }, 200);
        }
      },
      nextStep() {
        let isItemReviewOk = true;
        if (this.data.isOldTask) {
          // 老活动的校验逻辑（没有关键词人数分配）
          if (!this.keywordPlanInfo[0].addTaskNumber) {
            this.$Message.warning(`亲，请输入需要追加的活动份数！`);
            return;
          }
        } else {
          // 新活动的校验逻辑（有关键词人数分配）
          for (let i = 0, len = this.keywordPlanInfo.length; i < len; i++) {
            if (!this.keywordPlanInfo[i].addTaskNumber) {
              this.$Message.warning(`亲，请输入关键词方案 ${i + 1} 中需要追加的活动份数！`);
              return;
            }
            if (!isInteger(this.keywordPlanInfo[i].addTaskNumber)) {
              this.$Message.warning(`亲，关键词方案 ${i + 1} 中追加活动份数必须为正整数数字！`);
              return;
            }
            if (this.keywordPlanInfo[i].addTaskNumber <= 0) {
              this.$Message.warning(`亲，关键词方案 ${i + 1} 中追加活动份数必须大于0！`);
              return;
            }
          }
        }
        if (this.data.itemReviewRequired === 'assign_review_detail') {
          for (let l = 0, len = this.itemReviewList.length; l < len; l++) {
            if (!this.itemReviewList[l].value || !delSpace(this.itemReviewList[l].value)) {
              // 当用户输入连续空格的时候自动将空格去除
              this.itemReviewList[l].value = delSpace(this.itemReviewList[l].value);
              this.$Message.warning(`亲，追加评价 ${l + 1} 内容不能为空！`);
              isItemReviewOk = false;
              break;
            }
          }
        }
        if (isItemReviewOk) {
          this.title = '支付充值活动费用';
          this.step = 'pay';
        }
      },
      addTaskNumberChange() {
        if (this.data.itemReviewRequired === 'assign_review_detail') {
          // 函数防抖处理（等待用户输入完成后600毫秒后触发逻辑，防止逻辑不停触发造成不必要的性能损失）
          // 动态增删追加评价输入框DOM
          const _this = this;
          if (_this.timer) {
            clearTimeout(_this.timer)
          }
          _this.timer = setTimeout(() => {
            if (_this.allAddTaskNumber > _this.oldAddTaskNumber) {
              for (let i = 0, len = _this.allAddTaskNumber - _this.oldAddTaskNumber; i < len; i++) {
                this.itemReviewList.push({
                  value: null,
                  index: i + 1,
                })
              }
            } else if (_this.allAddTaskNumber < _this.oldAddTaskNumber) {
              this.itemReviewList.splice(_this.allAddTaskNumber, _this.oldAddTaskNumber - _this.allAddTaskNumber)
            }
            this.oldAddTaskNumber = _this.allAddTaskNumber
          }, 600)
        }
      },
      selectChangeScheme(index) {
        this.selectKeywordScheme = index
      },
      confirmPayment(pwd) {
        const _this = this;
        const itemReviewPushList = [];
        const additionSearchScheme = [];
        if (_this.itemReviewList.length > 0) {
          _this.itemReviewList.forEach(item => {
            if (item.value) {
              itemReviewPushList.push(delSpace(item.value));
            }
          })
        }
        _this.keywordPlanInfo.forEach(item => {
          additionSearchScheme.push(item.addTaskNumber)
        });
        api.additionalTaskAccount({
          payPwd: pwd,
          taskId: _this.data.taskId,
          additionCount: _this.allAddTaskNumber,
          additionItemReview: JSON.stringify(itemReviewPushList),
          additionSearchScheme : JSON.stringify(additionSearchScheme),
        }).then(res => {
          if (res.status) {
            _this.keywordPlanInfo.forEach(item => {
              item.addTaskNumber = null;
            });
            _this.itemReviewList = [];
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
      },
      'data.keywordPlanNum'(val) {
        if (val > 0) {
          for (let i = 0; i < this.data.keywordPlanNum; i++) {
            this.keywordPlanInfo.push({
              addTaskNumber: null,
              index: i
            })
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .addition-item {
    overflow-y: auto;
    max-height: 200px;
  }

  .tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 20px 12px 10px 0;
    padding: 0 8px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    cursor: pointer;
    position: relative;
  }

  .select-tag-bg {
    background-color: $mainColor;
    color: #fff;
    border-color: $mainColor;
  }

  .badge-count{
    position: absolute;
    transform: translateX(50%);
    top: -16px;
    right: 0;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
    background: #ed3f14;
    border: 1px solid transparent;
    color: #fff;
    line-height: 18px;
    text-align: center;
    padding: 0 6px;
    font-size: 12px;
    white-space: nowrap;
    transform-origin: -10% center;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
  }
</style>
