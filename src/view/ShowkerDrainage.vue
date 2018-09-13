<template>
  <div class="showker-drainage">
    <top-tip/>
    <role-top/>
    <div class="container">
      <p class="fs-18 pt-40 mb-40 text-ct">
        <icon type="md-information-circle" color="#ff6600" class="vtc-mid" size="18"/>
        <span class="vtc-mid">亲，为了更好的体验白拿拿，即日起拿手号请使用手机端登录</span>
      </p>
      <div class="text-ct mb-20">
        <img src="~assets/img/common/showker-drainage-1.png" alt="" class="mr-30">
        <img src="~assets/img/common/showker-drainage-2.png" alt="">
      </div>
    </div>
    <!--<bottom/>-->
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Icon} from 'iview'
  import RoleTop from '@/components/RoleTop'
  import Bottom from '@/components/Bottom'
  import TopTip from '@/components/TopTip'
  export default {
    name: "showker-drainage",
    components: {
      RoleTop: RoleTop,
      Bottom: Bottom,
      TopTip: TopTip,
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

    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';

</style>
