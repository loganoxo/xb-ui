<template>
  <div id="bottom" class="">
    <div class="container">
      Copyright © 2014-2018 www.xinshike.com    备案/许可证编号为: 浙ICP备14033561号-5  浙公网安备 33010602001682号 杭州米众科技有限公司旗下网站
    </div>
  </div>
</template>

<script>
  //  import Button from 'iview/src/components/button'
  //  import DatePicker from 'iview/src/components/date-picker'
  export default {
    name: 'bottom',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  #bottom {
    background-color: #F8F8F8;
    > div {
      height: 80px;
      font-size: 14px;
      line-height: 80px;
      text-align: center;
    }
    border-top: 1px solid #F1F1F1;
  }
</style>
