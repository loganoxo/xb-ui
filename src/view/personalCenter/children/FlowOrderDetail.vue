<template>
  <div class="flow-order-detail">
    <p class="title">收藏加购及访客流量</p>
    <div class="flow-info pt-20 pb-20 fs-14 pl-5">
      <icon type="md-alert" color="#000" class="mr-5"/>
      <span class="">当前您的账户剩余收藏加购流量：<span class="main-color">0</span>条（可支配 <span>0</span> 条），访客流量 <span>0</span> 条（可支配 <span>0</span> 条），若数量不足则无法发布相关任务。</span>
      <i-button class="bg-main-color cl-fff">流量订购</i-button>
      <i-button class="free-get-flow">VIP免费领取100条流量</i-button>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Icon, Button} from 'iview'
  export default {
    name: "flow-order-detail",
    components: {
      Icon: Icon,
      iButton: Button,
    },
    data() {
      return {

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
  .flow-order-detail {
    .title {
      line-height: 50px;
      height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #eee;
      padding-left: 10px;
    }
    .flow-info {
      .free-get-flow {
        background-color: #F0EA39;
        color: $mainColor;
        border: 1px solid $mainColor;
      }
    }

  }
</style>
