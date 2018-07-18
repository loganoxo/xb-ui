<template>
  <div class="promotion-details">
    <div class="title">
      <img src="~assets/img/merchant-promotion/detail-on.png" alt="" class="purse-icon">
      <span class="fs-18 cl666 ml-10">赚钱明细</span>
    </div>
    <!--<div class="btn-area">-->
      <!--<span class="cl666 fs-14 mr-15">钱包余额：10000000000000000000.00元</span>-->
      <!--<i-button size="small" class="pl-10 pr-10 cl-fff bg-main-color mr-15" @click="applyWithdrawal">申请提现</i-button>-->
      <!--<i-button size="small" class="pl-10 pr-10 cl-fff bg-main-color" @click="transferBalance">转入余额</i-button>-->
    <!--</div>-->
    <div v-if="showRecord">
      <div class="bill-preview fs-16">
        <span>推广费收入：<span class="light-green">{{(totalInCome/100).toFixed(2)}}</span>元</span>
        <!--<span>推广费支出：<span class="main-color">13250345312.00</span>元</span>-->
      </div>
      <div class="tab-area clear">
        <div v-for="(tab,index) in tabs" :key="index" @click="currentTab = tab" :class="[{active:currentTab.name === tab.name}]">
          {{tab.name}}
        </div>
      </div>
      <div>
        <component :is="currentTab.component"></component>
      </div>
    </div>
    <div v-else>
      <component :is="currentOperateComponent"></component>
    </div>
  </div>
</template>

<script>
  import {Button} from 'iview'
  import ExpenditureDetail from './components/ExpenditureDetail'
  import IncomeDetail from './components/IncomeDetail'
  import TransferBalanceOperate from './components/TransferBalanceOperate'
  import WithdrawalOperate from './components/WithdrawalOperate'
  export default {
    name: "promotion-details",
    components: {
      iButton: Button,
      TransferBalanceOperate: TransferBalanceOperate,
      WithdrawalOperate: WithdrawalOperate
    },
    data() {
      return {
        tabs: [
          {
            name:'收入明细',
            component: IncomeDetail
          },
          // {
          //   name:'支出明细',
          //   component: ExpenditureDetail
          // }
        ],

        currentTab: {
          name:'收入明细',
          component: IncomeDetail
        },
        showRecord: true,
        currentOperateComponent: null
      }
    },
    computed: {
      queryFrom() {
        if (this.$route.query) {
          return this.$route.query.from;
        } else {
          return '';
        }
      },
      totalInCome() {
        return this.$store.getters.getUserAccountInfo.invitationReward
      }

    },
    created() {
      if (this.queryFrom && this.queryFrom === 'userhome-withdrawal') {
        this.currentOperateComponent = 'WithdrawalOperate';
        this.showRecord = false;
      }
      this.$store.dispatch('getUserInformation');
    },
    mounted() {

    },
    methods: {
      transferBalance() {
        this.currentOperateComponent = 'TransferBalanceOperate';
        this.showRecord = false;
      },
      applyWithdrawal() {
        this.currentOperateComponent = 'WithdrawalOperate';
        this.showRecord = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/css/mixin";
  .promotion-details {
    /*单页面内公共样式*/
    .light-green {
      color: #34CD3B;
    }
    /*该页面样式*/
    .title {
      padding: 5px;
      border-bottom: 1px solid #f8f8f8;
      .purse-icon {
        width:24px;
        height:24px;
        vertical-align: top;
      }
    }
    .btn-area {
      padding: 15px 10px;
      border-bottom: 1px solid #f8f8f8;
    }
    .bill-preview {
      padding: 20px 10px;
    }
    .tab-area {
      border-bottom:1px solid $mainColor;
      div {
        padding:10px 40px;
        float: left;
        cursor: pointer;
        font-size: 16px;
        &.active {
          color:#fff;
          background: $mainColor;
        }
      }
    }
    /*旗下组件的样式*/

  }
</style>
