<template>
  <div class="expenditure-detail">
    <div class="tab-area clear">
      <div v-for="(tab,index) in tabs" :key="index" @click="currentTab = tab" :class="[{active:currentTab.name === tab.name}]">{{tab.name}}</div>
    </div>
    <div class="record-area">
      <component :is="currentTab.component"></component>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import WithdrawalRecord from './WithdrawalRecord'
  import TransferBalanceRecord from './TransferBalanceRecord'
  export default {
    name: "expenditure-detail",
    components: {

    },
    data() {
      return {
        tabs: [
          {
            name:'提现',
            component: WithdrawalRecord
          },
          {
            name:'转余额',
            component: TransferBalanceRecord
          }
        ],
        currentTab: {
          name:'提现',
          component: WithdrawalRecord
        }
      }
    },
    computed: {

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
  .expenditure-detail {
    .tab-area {
      padding: 25px 10px;
      div {
        padding:10px 40px;
        font-size: 16px;
        float: left;
        background: #eee;
        cursor: pointer;
        &.active {
          color: #fff;
          background: $mainColor;
        }
      }
    }
  }
</style>
