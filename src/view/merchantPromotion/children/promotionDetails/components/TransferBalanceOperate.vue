<template>
  <div class="transfer-balance-operate">
    <div class="balance">当前账户余额 <span class="main-color">2532643986.00</span> 元</div>
    <div class="operate-area cl000">
      <div>
        <span>请输入转账户余额金额：</span>
        <i-input v-model="transferAmount" style="width:30%;"></i-input>
        <span>元 （最低1元起）</span>
      </div>
      <div>
        <i-button :loading="loading" class="submit-btn">提交</i-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Input, Button} from 'iview'
  export default {
    name: "transfer-balance-operate",
    components: {
      iInput: Input,
      iButton: Button
    },
    data() {
      return {
        transferAmount: null,
        loading: false
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
  .transfer-balance-operate {
    .balance {
      padding:20px 10px;
    }
    .operate-area {
      padding: 100px;
    }
    .submit-btn {
      padding-left: 30px;
      padding-right: 30px;
      background: $mainColor;
      color:#fff;
      margin-top: 30px;
      margin-left: 134px;
    }
  }
</style>
