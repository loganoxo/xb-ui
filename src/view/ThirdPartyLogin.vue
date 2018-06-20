<template>
  <div>
    <role-top/>
    <div class="third-party-login fs-22">
      <spin class="spin"/>
      <p class="mt-10">白拿拿登录中....</p>
    </div>
  </div>
</template>

<script>
  import {Spin} from 'iview'
  import RoleTop from '@/components/RoleTop.vue'
  import api from '@/config/apiConfig'
  import {setStorage, encryption} from '@/config/utils'
  export default {
    name: 'third-party-login',
    components: {
      Spin: Spin,
      RoleTop: RoleTop,
    },
    data() {
      return {}
    },
    created() {
      const _this = this;
      let queryString = _this.$route.query.p;
      let pg = _this.$route.query.pg;
      let other = _this.$route.query.other;
      if(queryString){
        api.thirdPartyLogin({
          queryString: encodeURI(queryString),
          platForm: 'PC'
        }).then(res =>{
          if(res.status){
            _this.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            setStorage('weChartPop', 1);
            if(pg && other){
               let taskId = JSON.parse(other);
              _this.$router.push({path: pg, query:{q: encryption(taskId.p)}});
            } else {
              _this.$router.push({name: 'Home'});
            }
          } else {
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
.third-party-login{
  margin: 200px auto;
  text-align: center;
}
  .spin{
    width: 20px;
    margin: auto
  }
</style>
