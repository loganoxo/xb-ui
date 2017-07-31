<template>
  <div id="topTip" class="top-tip">
    <div class="container">
      <p class="left">
        你好，<span class="user-name">freshbox02 </span>
        <a href="">[ 退出登录 ]</a>
      </p>
      <p class="right">
        <a href="">帮助中心</a>|
        <a href="">联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topTip',
    beforeMount(){
      this.$store.state.topShow = false;
    },
    created(){

    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .top-tip {
    background-color: #F8F8F8;
    > div {
      background-color: #F8F8F8;
      height: 30px;
      line-height: 30px;
      span.user-name{
        color: $mainColor;
        padding-right: 5px;
      }
      p.right{
        a{
          color: #666;
          padding: 0 5px;
        }
      }
    }
  }
</style>
