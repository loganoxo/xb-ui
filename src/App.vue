<template>
  <div id="app">
    <Top v-show="$store.state.topShow"></Top>
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
  }
}
</script>

<style lang="scss" scoped>


</style>
