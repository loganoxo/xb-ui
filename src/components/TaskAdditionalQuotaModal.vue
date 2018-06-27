<template>
  <div>
   <template>
     <modal :value="currentValue" title="活动追加名额" width="560" :mask-closable="false" @on-visible-change="change">
       <div class="clear">
         <div class="left">
           <img class="border-radius-5" width="54" height="54" :src="data.taskMainImage" alt="活动主图">
         </div>
         <div class="left ml-10">
           <p>活动名称：{{data.taskName}}</p>
           <p>参与概括：总份数 <span class="main-color">{{data.taskCount}}</span>，<span class="main-color">{{data.trailOn}} </span>人正在参与活动
             ，<span class="main-color">{{data.trailDone}}</span>人完成活动，剩余名额 <span
               class="main-color">{{data.residueCount}}</span> 个
           </p>
           <p>单品活动担保金：<span class="main-color">{{(oneBondLast / 100).toFixed(2)}}</span>
             元&nbsp;&nbsp;&nbsp;&nbsp;单品推广费：<span class="main-color">{{(data.promotionExpensesPaid / 100).toFixed(2)}}</span> 元&nbsp;&nbsp;&nbsp;&nbsp;单品增值服务费：<span
               class="main-color">{{(data.vasFeePaid / 100 / data.taskCount).toFixed(2)}}</span> 元</p>
         </div>
       </div>
       <div class="mt-10 border-top pt-10">
         <p>当前待审核：<span class="main-color">{{data.totalTaskApplyCount}}</span> 人</p>
         <p class="mt-10">
           <span>追加份数：</span>
           <i-input v-model="taskNumber" placeholder="请输入追加份数" style="width: 100px;"/>
         </p>
       </div>
       <div slot="footer">
         <i-button type="primary" size="large" long :loding="buttonLoading">下一步</i-button>
       </div>
     </modal>
   </template>

  </div>
</template>

<script>
  import {Modal, Input, Button} from 'iview'
  import PayModel from '@/components/PayModel'

  export default {
    name: "task-additional-quota-modal",
    data() {
      return {
        currentValue: this.value,
        buttonLoading: false,
        taskNumber: null,
      }
    },
    components: {
      Modal: Modal,
      IInput: Input,
      IButton: Button,
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
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      change(value) {
        if (!value) {
          this.$emit('input', false);
        }
      }
    },
    watch: {
      value(val) {
        this.setCurrentValue(val);
      }
    },
  }
</script>

<style scoped>

</style>
