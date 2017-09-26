<template>
  <div class="personal-box">
    <div class="content">
      <div class="title">
        <img class="vipImg" src="~assets/img/screen-shot/vip_member_title.jpg" alt="">
      </div>
      <div class="explanation">
        <p><strong>VIP会员服务说明</strong></p>
        <p class="mt-5">可在服务期内免费使用秀吧所有服务功能；可免费发布秀吧PC、APP所有活动类型；会员开通后，费用不退还</p>
        <p class="mt-20 mb-20">请您选择您的会员周期：</p>
        <div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'VipMember',
    data() {
      return {

      }
    },
    mounted() {
    },
    created() {

    },
    computed: {
      getUserAccountRole:function () {
        return this.$store.getters.getUserAccountInfo.role
      }
    },
    watch: {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import 'src/css/mixin';
 .personal-box{
   .content{
     border: 1px solid #F1F1F1;
     border-radius: 9px;
     .title{
       text-align: center;
       .vipImg{
         width: 100%;
         display: block;
       }
     }
     .explanation{
       padding: 20px 40px;
     }
   }
 }


</style>
