<template>
  <div class="recharge-card-detail">
    <div class="detail-title">
      <img src="~assets/img/merchant-promotion/detail-on.png" alt="" class="purse-icon">
      <span class="fs-18 cl666 ml-10">充值明细</span>
    </div>
    <div class="pt-10 pb-10">当前充值卡余额：<span class="light-green">{{(getRechargeCardBalance / 100).toFixed(2)}}</span> 元</div>
    <div class="tabs-area clear">
      <div class="tab" v-for="item in tabs" :key="item.id" :class="{active: selectTab.id === item.id}" @click="selectTab = item">{{item.text}}</div>
    </div>
    <div>
      <component :is="selectTab.component"></component>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import RechargeDetail from './children/rechargeDetail'
  import RecordDetail from './children/recordDetail'
  export default {
    name: "recharge-card-detail",
    components: {
      RecordDetail: RecordDetail,
      RechargeDetail: RechargeDetail
    },
    data() {
      return {
        tabs: [
          {
            text: '充值明细',
            id: 1,
            component: RechargeDetail
          },
          {
            text: '收支明细',
            id: 2,
            component: RecordDetail
          }
        ],
        selectTab: {
          text: '充值明细',
          id: 1,
          component: RechargeDetail
        }
      }
    },
    computed: {
      getRechargeCardBalance() {
        return this.$store.getters.getRechargeCardBalance
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  /*单页面内公共样式*/
  .light-green {
    color: #34CD3B;
  }
  .recharge-card-detail {
    .detail-title {
      padding: 5px;
      border-bottom: 1px solid #f8f8f8;
      .purse-icon {
        width:24px;
        height:24px;
        vertical-align: top;
      }
    }
    .tabs-area {
      border-bottom: 1px solid $mainColor;
      .tab {
        padding: 10px 40px;
        float: left;
        cursor: pointer;
      }
      .active {
        color: #fff;
        background: $mainColor;
      }
    }
  }
</style>
