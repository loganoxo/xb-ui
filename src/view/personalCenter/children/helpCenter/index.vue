<template>
  <div class="personal-box" :class="[!isLogin ? 'ml-ptc-12' : '']">
    <div class="personal-sel-top">
      <router-link :to="myInfoSelect.link" :key="myInfoSelect.link" v-for="myInfoSelect in myInfoSelectsFilter" :class="{active:infoSelect == myInfoSelect.isSelect}">
        {{myInfoSelect.text}}
      </router-link>
    </div>
    <div class="personal-sel-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'help-center',
    data() {
      return {
        userData: {},
        myInfoSelects: [
          {
            text: '常见问题',
            isSelect: 'Faq',
            link: '/user/help-center/faq',
            role: null
          },
          {
            text: '商家中心',
            isSelect: 'FaqSeller',
            link: '/user/help-center/faq-seller',
            role: 1
          },
          {
            text: '拿手中心',
            link: '/user/help-center/faq-showker',
            isSelect: 'FaqShowker',
            role: 0
          },
        ],
        infoSelect: '',
      }
    },
    beforeMount() {

    },
    mounted() {

    },
    created() {
      this.infoSelect = this.$route.name;
    },
    computed: {
      isLogin(){
        return this.$store.state.login
      },
      userRole() {
        return this.$store.state.userInfo.role
      },
      myInfoSelectsFilter() {
        return this.myInfoSelects.filter(item => {
          return item.role === this.userRole || item.role === null
        })
      }
    },
    methods: {

    },
    watch: {
      $route(to){
        this.infoSelect = to.name;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .personal-box {
    .personal-sel-top {
      border-bottom: 1px solid $mainColor;
      margin: auto;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
    .personal-sel-box {
      .verified-box{
        width: 830px;
        margin: 30px auto auto auto;
        .verified-form{
          margin-top: 20px;
          width: 400px;
          float: left;
          .verified-btn{
            background-color: $mainColor;
            color: #fff;
          }
        }
        .verified-cue{
          p{
            height: 36px;
            line-height: 36px;
            margin-bottom: 21px;
            margin-left: 30px;
            a{
              margin-right: 30px;
            }
          }
        }
        .error-result-text{
          margin-left: 116px;
          clear: both;
          font-size: 14px;
        }
        .verified-result{
          p:first-child{
            font-size: 30pt;
            margin: auto;
            width: 500px;
            color: #666;
          }
          p:last-child{
            font-size: 14px;
            margin: 60px auto;
            width: 600px;
            color: #999;
          }
        }
      }
    }
  }

</style>
