<template>
</template>
<script>

  export default {
    name: 'Alipay',
    components: {},
    data() {
      return {}
    },
    mounted() {
    },
    created() {
      let querySting = this.$route.query;
      if (querySting) {
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



