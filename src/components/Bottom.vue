<template>
  <div id="bottom" class="">
    <div class="container">
      Copyright  2017-2018 <router-link to="/"> www.51bainana.com </router-link> 备案/许可证编号为: 浙ICP备17043547号-2 杭州秀客科技有限公司
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bottom',
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  #bottom {
    background-color: #F8F8F8;
    > div {
      background-color: #F8F8F8;
      height: 80px;
      font-size: 14px;
      line-height: 80px;
      text-align: center;
    }
    border-top: 1px solid #F1F1F1;
  }
</style>
