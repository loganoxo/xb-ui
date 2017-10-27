<template>
</template>
<script>
  import api from '@/config/apiConfig'
  import {isNumber} from '@/config/utils'
  import {aliPayUrl, weiXinPayUrl} from '@/config/env'

  export default {
    name: 'Alipay',
    components: {},
    data() {
      return {}
    },
    mounted() {
    },
    created() {
      if (this.$route) {
        console.log(this.$route.query);
        let url = this.$route.query;
        let alipayUrl = null;
        for (let k in url) {
          alipayUrl = k + '=' + url[k]
        }
        window.location.href = alipayUrl
      }
    },
    computed: {},
    methods: {

    }
  }
</script>



