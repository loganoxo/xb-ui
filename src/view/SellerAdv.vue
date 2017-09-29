<template>
  <div class="seller-adv">
    <role-top></role-top>
    <div class="text-ct pos-rel" style="min-width: 1200px" >
      <img src="/static/img/seller-adv/seller-adv_02.jpg" alt="" style="width: 100%;" >
      <router-link style="
        position: absolute;
        top: 60%;
        left: 50%;
        width: 330px;
        background-color: rgb(0, 111, 255);
        color: rgb(255, 255, 255);
        border: none;
        margin-left: -165px;
        font-size: 30px;
      " class="ivu-btn ivu-btn-circle ivu-btn-large" to="/register/seller-register">
        立即申请商家注册
      </router-link>
    </div>
    <div class="container" style="min-width: 1200px">
      <img src="/static/img/seller-adv/seller-adv_04.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_06.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_07.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_08.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_10.png" alt="">
      <img src="/static/img/seller-adv/seller-adv_12.png" alt="">
    </div>
    <div class="seller-bottom" style="min-width: 1200px">
      <div class="container">
        <div>
          <router-link style="
          width: 278px;
          border: none;
          font-size: 26px;
          display: block;" class="ivu-btn ivu-btn-circle ivu-btn-large" to="/register/seller-register">
            立即申请商家注册
          </router-link>
          <p class="mt-20" style="color: #fff;">一站式权重优化专家</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import RoleTop from '@/components/RoleTop.vue'
  export default {
    name: 'SellerAdv',
    components: {
      RoleTop: RoleTop,
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

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .seller-bottom{
    background-color: #351E97;
    height: 170px;
    >div{
      div{
        width: 300px;
        margin: 45px auto;
        text-align: center;
      }
    }
  }

</style>

