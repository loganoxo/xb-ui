<template>
  <div class="bind-store-page">
    <div class="bind-store-title pl-10">店铺绑定</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "bind-store",
    data() {
      return {}
    },
    mounted() {

    },
    created() {

    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .bind-store-page{
    .bind-store-title{
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
    }
  }

</style>
