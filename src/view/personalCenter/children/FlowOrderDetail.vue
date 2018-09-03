<template>
  <div class="flow-order-detail">

    <!--使用明细-->
    <div v-if="selectTab.id === 1" class="use-detail">
      使用明细
    </div>
    <!--订购明细-->
    <div v-if="selectTab.id === 2" class="order-detail">

    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Icon, Button, DatePicker, Page} from 'iview'
  export default {
    name: "flow-order-detail",
    components: {
      Icon: Icon,
      iButton: Button,
      DatePicker: DatePicker,
      Page: Page
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
      .flow-order {
        padding: 5px 10px;
        border-radius: 5px;
      }
      .free-get-flow {
        padding: 5px 10px;
        background-color: #F0EA39;
        color: $mainColor;
        border: 1px solid $mainColor;
        border-radius: 5px;
      }
    }
    .tabs {
      .tab {
        width: 150px;
        height: 40px;
        line-height:  40px;
        text-align: center;
        background: #F7F6F5;
        &.active {
          background: $mainColor;
          color: #fff;
        }
      }
    }
    .order-detail {

    }



  }
</style>
