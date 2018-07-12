<template>
  <modal :value="currentValue" :mask-closable="false" width="410" @on-visible-change="change">
    <h2 class="text-ct mt-20">亲！就差一步了，马上登陆</h2>
    <div class="mt-20 width-300 margin">
      <i-input v-model="formCustom.phone" placeholder="请输入手机号"/>
    </div>
    <div class="mt-20 width-300 margin">
      <i-input v-model="formCustom.validateCode" class="width-200" placeholder="请输入图形验证码"/>
      <img :src="regImgSrc" class="inline-block vtc-mid" alt="图形验证码" @click="getVrcode">
    </div>
    <div class="mt-20 width-300 margin pos-rel">
      <i-input v-model="formCustom.smsCode" class="width-200" placeholder="请输入动态码"/>
      <sms-countdown style="top: 0;" :on-success="sendCodeSuccess"
                     :phone="formCustom.phone"
                     :purpose="formCustom.purpose"
                     :validateCode="formCustom.validateCode">
      </sms-countdown>
    </div>
    <div class="mt-20 text-ct">
      <i-button type="primary" class="width-300" :loading="loginLoading" @click="register">注册并登陆</i-button>
    </div>
    <div slot="footer"></div>
  </modal>
</template>

<script>
  import {modal, Input, Button} from 'iview'
  import SmsCountdown from '@/components/SmsCountdown'
  import api from '@/config/apiConfig'
  export default {
    name: "login-to-register-modal",
    components: {
      modal: modal,
      IInput: Input,
      IButton: Button,
      SmsCountdown: SmsCountdown,
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value,
        dynamicCodeLoading: false,
        loginLoading: false,
        regImgSrc: null,
        formCustom: {
          phone: null,
          pwd: null,
          repwd: null,
          qqNumber: null,
          validateCode: null,
          smsCode: null,
          purpose: 'reg',
          platForm: 'PC',
          role: 1,
        }
      }
    },
    methods: {
      change(value) {
        if (!value) {
          this.$emit('input', false)
        }
      },
      getVrcode() {
        this.regImgSrc = "/api/vrcode.json?rand=" + new Date() / 100;
        this.formCustom.validateCode = null;
      },
      sendCodeSuccess(res) {
        if (res.status) {
          this.$Message.success({
            content: '短信验证码发送成功',
            duration: 1,
          })
        } else {
          this.$Message.error(res.msg);
          this.getVrcode();
        }
      },
      register() {
        const _this = this;
        if (!_this.formCustom.phone) {
          _this.$Message.warning('请输入手机号！');
          return
        }
        if (!(/^1\d{10}$/.test(_this.formCustom.phone))) {
          _this.$Message.info({content:'请输入正确的手机号！'});
          return
        }
        if (!_this.formCustom.validateCode) {
          _this.$Message.warning('请输入图形验证码！');
          return
        }
        if (!_this.formCustom.smsCode) {
          _this.$Message.warning('请输入动态验证码！');
          return
        }
        _this.loginLoading = true;
        _this.formCustom.pwd = _this.formCustom.phone.slice(5);
        _this.formCustom.repwd = _this.formCustom.phone.slice(5);
        api.register(_this.formCustom).then(res => {
          if (res.status) {
            _this.login(_this.formCustom.phone, _this.formCustom.pwd, _this.formCustom.role)
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      login(phone, pwd) {
        const _this = this;
        api.login({
          phone: phone,
          passWord: pwd,
          platForm: 'PC'
        }).then(res => {
          if (res.status) {
            _this.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            _this.$emit('input', false);
          } else {
            _this.$Message.error(res.msg)
          }
          _this.loginLoading = false;
        })
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
        val && this.getVrcode();
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "src/css/mixin";
</style>
