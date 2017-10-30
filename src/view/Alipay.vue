<template>
  <div class="alipay">
    <p class="text-ct title">页面正在跳转中，请您耐心等待。。。</p>
  </div>
</template>
<script>

  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    name: 'Alipay',
    components: {},
    data() {
      return {}
    },
    mounted() {
    },
    created() {
      let querySting = this.$route.query;
      if (Object.keys(querySting).length > 0) {
        let openPayUrl = null;
        for (let k in querySting) {
          openPayUrl = k + '=' + querySting[k]
        }
        window.location.href = openPayUrl
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';
  .title{
    height: 800px;
    line-height: 500px;
  }
</style>



