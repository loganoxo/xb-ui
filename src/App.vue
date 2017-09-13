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
  import {getStorage} from '@/config/utils'

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
    },
    created() {
      let _this = this;
      _this.$store.commit({
        type: 'INIT_USER_INFO'
      });
      let userInfo = getStorage('userInfo');
      if (!userInfo) {
        _this.$store.dispatch('loggedOut').then((res) => {
          if (res.status) {
            _this.$router.push({name: 'login'});
          } else {
            console.log(res.msg);
          }
        });
      }
    }
  }
</script>

