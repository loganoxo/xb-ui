<template>
  <div class="thowker-landing">
    <div class="text-ct pos-rel" style="min-width: 1200px" >
      <img class="img" src="/static/img/showker-landing/showker01.jpg" alt=""  >
      <img @click="toLogin" src="/static/img/showker-landing/showker_btn.png" alt="" class="showker-btn" >
      <iButton class="ibtn-showker">秀客注册</iButton>
      <iButton class="ibtn-sell">商家注册</iButton>
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
  import Button from  'iview/src/components/button'

  export default {
    name: 'ShowkerLanding',
    components: {
      RoleTop: RoleTop,
      iButton:Button,
    },
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    data() {
      //表单验证

      return {}
    },
    created() {

    },
    methods: {
      toLogin(){
        this.$router.push({name:'buyer'})
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
      bottom: 60px;
      left: 50%;
      transform: translateX(-40%);
      width: 11.67%;
      cursor: pointer;
    }
    .img{
      display: block;
      width: 100%;
    }
    .ibtn-showker,ibtn-sell{
      position: absolute;
      top: 50px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
    }
  }

</style>

