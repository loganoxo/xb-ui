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
export default {
  name: 'app',
  components:{
    Top:Top,
    Bottom:Bottom
  },
  computed: {
    topShow () {
      return this.$store.state.topShow
    }
  },
  created(){
    this.$store.commit({
      type:'INIT_USER_INFO'
    })
  }
}
</script>

<style lang="scss" scoped>


</style>
