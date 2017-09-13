<template>
  <div id="app">
    <Top v-show="topShow"></Top>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from "./components/Top.vue";
  import Bottom from "./components/Bottom.vue";
  import {getStorage, getCookie} from '@/config/utils'

  export default {
    name: 'app',
    components: {
      Top: Top,
      Bottom: Bottom
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
      _this.$store.commit('INIT_USER_INFO');
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
  }
</script>

