<template>
  <div>
    <role-top></role-top>
    <div class="text-ct fs-22">
      秀吧登录中....
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import RoleTop from '@/components/RoleTop.vue'
  import {setStorage, getStorage, removeStorage} from '@/config/utils'
  export default {
    name: 'ThirdPartyLogin',
    components: {
      RoleTop: RoleTop,
    },
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    data() {
      return {}
    },
    mounted() {

    },
    created() {
      let _this = this;
      let queryString = _this.$route.query.p;
      if(queryString){
        api.thirdPartyLogin({queryString:queryString}).then(res =>{
          if(res.status){
            _this.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            setStorage('weChartPop', 1);
            _this.$router.push({name: 'Home'});
          }else{
            _this.$Message.error(res.msg)
          }
        })
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
