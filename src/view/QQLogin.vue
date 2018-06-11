<template>
  <div>
    <role-top/>
    <div class="qq-login fs-22">
      <spin class="spin"/>
      <p class="mt-10">QQ登录中....</p>
    </div>
  </div>
</template>

<script>
  import {Spin} from 'iview'
  import RoleTop from '@/components/RoleTop'
  import api from '@/config/apiConfig'
  import {setStorage} from '@/config/utils'

  export default {
    name: 'qq-login',
    components: {
      Spin: Spin,
      RoleTop: RoleTop,
    },
    data() {
      return {
        accessToken: {},
      }
    },
    created() {
      const _this = this;
      if (_this.$route.hash) {
        let hash = _this.$route.hash.replace('#', '');
        hash = hash.split("&");
        let array = [];
        for (let i = 0, j = hash.length; i < j; i++) {
          array = hash[i].split("=");
          if (array[0] === 'access_token') {
            _this.accessToken.accessToken = array[1];
            break;
          }
        }
        _this.setUserInfo();
      }
    },
    methods: {
      setUserInfo() {
        const _this = this;
        api.QQLoginFunc({
          accessToken: _this.accessToken.accessToken,
          platForm: 'PC',
        }).then(res => {
          if (res.status) {
            _this.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            setStorage('weChartPop', 1);
            _this.$router.push({name: 'Home'});
          } else {
            if (res.statusCode === 'new_user') {
              _this.$router.push({
                path: '/sel-role',
                query: {accessToken: _this.accessToken.accessToken, qqOpenId: res.msg}
              });
            } else {
              _this.$Message.error(res.msg);
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .qq-login {
    margin: 200px auto;
    text-align: center;
  }

  .spin {
    width: 20px;
    margin: auto
  }
</style>




