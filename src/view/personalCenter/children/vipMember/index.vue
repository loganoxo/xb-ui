<template>
  <div class="vip-member-box">
    <div class="banner text-ct">
      <img src="~assets/img/vip-member/vip-banner.png" alt="" class="mt-28">
    </div>
    <div class="mt-10 tabs-box">
      <span v-if="getUserAccountRole === item.disabledRole" v-for="item in infoSelectList" :class="{active:infoSelect === item.isSelect}" @click="accountInit(item.isSelect)">{{item.text}}</span>
    </div>
    <router-view></router-view>
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
            isSelect: 'Order',
            disabledRole: 1,
          },
          {
            text: '版本说明',
            isSelect: 'Instructions',
            disabledRole: 1,
          },
        ],
        infoSelect: 'Order',
      }
    },
    computed: {
      getUserAccountRole() {
        return this.$store.getters.getUserRole
      }
    },
    watch: {
      $route(to) {
        this.infoSelect = to.name;
      }
    },
    methods: {
      accountInit(name) {
        this.$router.push({name: name});
      },
      // selectNavigate(type) {
      //   this.infoSelect = type;
      // },
    }

  }
</script>

<style scoped lang="scss">
  .banner{
    height:152px;
    line-height: 152px;
    background-color: #f3f3f3;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #f8f8f8;
  }
  .tabs-box{
    border-bottom:1px solid #ff6633;
    padding-left:50px;
    span{
      background-color: #fff;
      color: #666;
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
      background-color: #ff6633;
      color: #fff;
    }
  }
</style>
