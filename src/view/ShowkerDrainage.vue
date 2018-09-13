<template>
  <div class="showker-drainage">
    <role-top/>
    <div class="container">
      <p class="fs-18 pt-40 mb-40 text-ct clear">
        <icon type="md-information-circle" color="#ff6600" class="vtc-mid" size="18"/>
        <span class="vtc-mid">亲，为了更好的体验白拿拿，即日起拿手号请使用手机端登录</span>
        <span class="blue right fs-14 mt-2 cursor-p" @click="goOut">退出登录</span>
      </p>
      <div class="text-ct mb-20">
        <img src="~assets/img/common/showker-drainage-1.png" alt="" class="mr-30">
        <img src="~assets/img/common/showker-drainage-2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Icon} from 'iview'
  import RoleTop from '@/components/RoleTop'
  import Bottom from '@/components/Bottom'
  import {mapActions} from 'vuex'
  export default {
    name: "showker-drainage",
    components: {
      RoleTop: RoleTop,
      Bottom: Bottom,
      Icon: Icon
    },
    data() {
      return {

      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      goOut() {
        let _this = this;
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'Login'})
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';

</style>
