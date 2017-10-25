<template>
  <div>
    <role-top></role-top>
    <div class="login-ctt text-ct fs-22">
      QQ登录中....
    </div>
  </div>

</template>

<script>
  import api from '@/config/apiConfig'
  import RoleTop from '@/components/RoleTop.vue'
  import {setStorage, getStorage, removeStorage} from '@/config/utils'
  export default {
    name: 'QQLogin',
    components: {
      RoleTop: RoleTop,
    },
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    data() {
      return {
        accessToken: {},
        imgSrc: null,
        modal1: true,
      }
    },
    mounted() {
    },
    computed: {},
    created() {
       if(this.$route.hash){
         let hash = this.$route.hash.replace('#','');
         hash = hash.split("&");
         let array = [];
         for(let i = 0, j = hash.length; i < j; i++){
            array = hash[i].split("=");
            if(array[0] == 'access_token'){
              this.accessToken.accessToken = array[1];
            }
         }
         this.setUserInfo()
       }
    },
    methods: {
      setUserInfo() {
        let self = this;
        api.QQLoginFunc({
          accessToken: self.accessToken.accessToken
        }).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            setStorage('weChartPop', 1);
            self.$router.push({name: 'Home'});
          } else {
            if(res.statusCode == 'new_user'){
              self.$router.push({path: '/sel-role',query: {accessToken: self.accessToken.accessToken, qqOpenId: res.msg}});
            }else {
              self.$Message.error({
                content: res.msg,
                duration: 6
              });
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped></style>




