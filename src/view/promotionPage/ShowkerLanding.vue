<template>
  <div class="thowker-landing">
    <div class="text-ct pos-rel" style="min-width: 1200px" >
      <img class="img" src="/static/img/showker-landing/showker01.jpg" alt=""  >
      <img @click="toLogin('buyer')" src="/static/img/showker-landing/showker_btn.png" alt="" class="showker-btn" >
      <div class="ibtnBox">
        <iButton @click="toLogin('buyer')" class="ibtn-showker mr-30">拿手注册</iButton>
        <iButton  @click="toLogin('seller')" class="ibtn-sell">商家注册</iButton>
      </div>
    </div>
    <div class=" text-ct" style="min-width: 1200px">
      <img class="img" src="/static/img/showker-landing/showker02.png" alt="">
      <img class="img" src="/static/img/showker-landing/showker03.jpg" alt="">
      <img class="img" src="/static/img/showker-landing/showker04.jpg" alt="">
      <img class="img" src="/static/img/showker-landing/showker05.jpg" alt="">
      <img class="img" src="/static/img/showker-landing/showker06.jpg" alt="">
    </div>
  </div>
</template>

<script>

  import RoleTop from '@/components/RoleTop.vue'
  import {Button} from 'iview'

  export default {
    name: 'ShowkerLanding',
    components: {
      RoleTop: RoleTop,
      iButton:Button,
    },
    data() {
      //表单验证

      return {}
    },
    created() {

    },
    methods: {
      toLogin(type){
        this.$router.push({name:type})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .thowker-landing{
    background-color: #F8FBFA;
    .showker-btn{
      position: absolute;
      bottom: 7%;
      left: 50%;
      transform: translateX(-40%);
      width: 11.67%;
      cursor: pointer;
    }
    .img{
      display: block;
      width: 100%;
    }
    .ibtnBox{
      position: absolute;
      top: 39px;
      right: 12%;
    }
    .ibtn-showker,.ibtn-sell{

      width: 100px;
      height: 30px;
      border-radius: 15px;
      color: #fff;
      background: rgba(255,251,240,0.3);
    }
    .ibtn-showker{
      float: left;
    }
    .ibtn-sell{
      float: right;
    }
    .ibtn-showker:hover,.ibtn-sell:hover{
      color: $mainColor;
      background: rgba(255,251,240,1);
    }
  }

</style>

