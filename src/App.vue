<template>
  <div id="app">
    <Top v-show="topShow"></Top>
    <router-view></router-view>
    <Bottom></Bottom>
    <side-navigation></side-navigation>
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
    computed: {
      topShow() {
        return this.$store.state.topShow
      },
      logInAuthority() {
        return this.$store.state.logInAuthority;
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

    },
    watch: {
      '$route' (to, from) {
        let self = this;
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        if(!(self.$route.name == 'TaskCategory' || self.$route.name == 'TaskDetails' ||  self.$route.name == 'Home' )){
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: ''
          });
        }
      }
    }
  }
</script>



