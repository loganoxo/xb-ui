<template>
  <div>
    <role-top></role-top>
    <div class="login-ctt text-ct fs-22">
      QQ登录中....
    </div>
  </div>

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage,removeStorage} from '@/config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import RoleTop from '@/components/RoleTop.vue'

  export default {
    name: 'QQLogin',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      Radio: Radio,
      Modal: Modal,
      RoleTop: RoleTop,
    },
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片验证码'));
        } else {
          callback()
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'));
        } else {
          callback()
        }
      };
      return {
        selRole: false,
        btnState: {
          normalLoginBtn: false,
          trendsLoginBtn: false,
        },
        accessToken: {},
        beginCountTime: false,
        selLogin: true,
        rememberAccount: [],
        rememberPhone: [],
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
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
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
            self.$router.push({name: 'Home'});
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      instance(type, text, ctt) {
        const title = text;
        const content = '<p>' + ctt + '</p>';
        switch (type) {
          case 'info':
            this.$Modal.info({
              title: title,
              content: content
            });
            break;
          case 'success':
            this.$Message.success({
              content: content,
              duration: 1,
            });
            break;
          case 'warning':
            this.$Modal.warning({
              title: title,
              content: content
            });
            break;
          case 'error':
            this.$Message.error({
              title: title,
              content: content
            });
            break;
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
      top: 0;
    }
  }

  .login-ctt {
    padding: 70px 0 250px 0;
    .login-lf, .login-rt {
      float: left;
    }
    .login-rt {
      margin: 50px auto auto 100px;
      .login-rt-ctt {
        width: 404px;
        border: 1px solid #eee;
        > p.login-rt-ctt-top {
          width: 302px;
          margin: 30px auto auto auto;
          line-height: 30px;
          height: 30px;
          position: relative;
          a {
            color: #CCCCCC;
            font-size: 14px;
            float: left;
            width: 50%;
            text-align: center;
            border-bottom: 2px solid #CCCCCC;
            i {
              font-size: 20px;
              position: relative;
              top: 2px;
              left: -2px;
            }
            i.active {
              color: $mainColor;
            }

          }
          a.active {
            color: $mainColor;
          }
          .login-rt-ctt-top-line {
            position: absolute;
            left: 0;
            bottom: -2px;
            border: 1px solid $mainColor;
            width: 50%;
            transition: left 0.1s;
          }

        }
        .login-rt-ctt-btm {
          a.right {
            display: inline-block;
            border: 1px solid #CCCCCC;
            padding: 1px 6px;
            color: #666666;
            height: 20px;
            line-height: 20px;
            margin-top: 8px;
            margin-left: 5px;
          }
        }
        > div {
          width: 302px;
          margin: 44px auto auto auto;
          padding-bottom: 25px;
          div.remember-box {
            margin-top: 25px;
            overflow: hidden;
          }
          p {
            margin-top: 20px;
            height: 38px;
            line-height: 38px;
            a {
              color: #666;
            }
          }
          a.get-code {
            background-color: #EAEAEA;
            color: #999;
            padding: 3px 10px;
            position: absolute;
            right: 7px;
            top: 16px;
          }
        }
      }
    }
  }
</style>




