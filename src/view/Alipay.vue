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
        console.log(alipayUrl);
//        window.location.href = alipayUrl
      }
    },
    computed: {},
    methods: {
      GetQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        } else {
          return null;

        }
      }
    }
  }
</script>



