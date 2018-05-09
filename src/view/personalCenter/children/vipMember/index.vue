<template>
  <div class="vip-member-box">
    <div class="banner text-ct">
      <img src="~assets/img/vip-member/vip-banner.png" alt="" class="mt-28">
    </div>
    <div class="content-box pt-20 pb-20">
      <div class="tabs-box">
        <span v-if="getUserAccountRole === item.disabledRole" v-for="item in infoSelectList" :class="{active:infoSelect === item.isSelect}" @click="switchTab(item.isSelect)">{{item.text}}</span>
      </div>
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
  export default {
    name: "vip-member",
    data(){
      return {
        infoSelectList: [
          {
            text: '会员订购',
            isSelect: 'VipMemberOrder',
            disabledRole: 1,
          },
          {
            text: '版本说明',
            isSelect: 'VipMemberInstructions',
            disabledRole: 1,
          },
        ],
        infoSelect: 'VipMemberOrder',
      }
    },
    computed: {
      getUserAccountRole() {
        return this.$store.getters.getUserRole;
      }
    },
    watch: {
      $route(to) {
        this.infoSelect = to.name;
      },
    },
    created(){
      this.infoSelect = this.$route.query?this.$route.query.q:this.infoSelect;
    },
    methods: {
      switchTab(name) {
        this.$router.push({name: name});
      },
      // selectNavigate(type) {
      //   this.infoSelect = type;
      // },
    },


  }
</script>

<style lang="scss">
  @import 'src/css/mixin';
  .banner{
    height:152px;
    line-height: 152px;
    background-color: #f3f3f3;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #f8f8f8;
  }
  .content-box{
    background: #f8f8f8;
    .tabs-box{
      border-bottom:1px solid $mainColor;
      padding-left:40px;
      margin-left:20px;
      margin-right:20px;
      span{
        background-color: #ccc;
        color: #fff;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
        cursor: pointer;
        margin-right:10px;
      }
      span.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }

</style>
