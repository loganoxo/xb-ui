<template>
  <div id="app">
    <Top v-show="topShow"></Top>
    <router-view></router-view>
    <Bottom></Bottom>
    <side-navigation></side-navigation>
    <!--侧边栏固定联系客服图片展示-->
    <div class="suspend-service" v-show="showSuspendService" v-if="isLogin">
      <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800019404" target="_blank" v-if="getUserRole === 1">
        <img src="~assets/img/common/suspend-service.png" alt="">
      </a>
      <a href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=800061938" target="_blank" v-else>
        <img src="~assets/img/common/suspend-service.png" alt="">
      </a>
      <span class="close-suspend-service" @click.stop.self="closeSuspendService">关闭</span>
    </div>
  </div>
</template>

<script>
  import Top from "@/components/Top.vue"
  import Bottom from "@/components/Bottom.vue"
  import SideNavigation from '@/components/SideNavigation.vue'
  import BackTop from "iview/src/components/back-top"
  import {getStorage, getCookie} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: 'app',
    components: {
      Top: Top,
      Bottom: Bottom,
      BackTop: BackTop,
      SideNavigation: SideNavigation,
    },
    data() {
      return {
        showSuspendService: true
      }
    },
    computed: {
      topShow() {
        return this.$store.state.topShow
      },
      logInAuthority() {
        return this.$store.state.logInAuthority;
      },
      isLogin: function () {
        return this.$store.state.login
      },
      getUserRole: function () {
        return this.$store.getters.getUserRole
      }
    },
    created() {
      let _this = this;
      let userInfo = getStorage('userInfo');
      if (!userInfo && _this.logInAuthority) {
        _this.$store.dispatch('loggedOut').then((res) => {
          if (res.status) {
            _this.$router.push({name: 'login'});
          } else {
            console.log(res.msg);
          }
        });
      }
    },
    methods: {
      closeSuspendService() {
        this.showSuspendService = false;
      }
    },
    watch: {
      '$route'(to, from) {
        let self = this;
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        if (!(self.$route.name == 'TaskCategory' || self.$route.name == 'TaskDetails' || self.$route.name == 'Home' )) {
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: ''
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';

  .suspend-service {
    display: block;
    position: fixed;
    right: 99px;
    top: 242px;
    cursor: pointer;
  }

  .close-suspend-service {
    position: absolute;
    top: -16px;
    right: 12px;
    cursor: pointer;
    color: #575C6A;
    @include transition;
    &:hover {
      color: darken(#575C6A, 10%);
    }
  }
</style>



