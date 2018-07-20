<template>
  <div class="spread-landing-page-three">
    <top/>
    <div class="pos-rel spread-landing-page-three-top">
      <div class="login">
        <div class="login-top width-300 margin">
          <icon size="22" color="#f9284f" type="iphone" class="vtc-btm"/>
          <span class="main-color fs-14">手机快捷注册登陆</span>
        </div>
        <div class="mt-20 width-300 margin">
          <i-input v-model="formCustom.phone" placeholder="请输入手机号"/>
        </div>
        <div class="mt-10 width-300 margin cl999">默认密码为手机后6位！</div>
        <div class="mt-10 width-300 margin">
          <i-input v-model="formCustom.qqNumber" placeholder="请输入QQ号"/>
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
      </div>
    </div>
    <div class="container">
      <div class="pos-rel">
        <img src="~assets/img/landing-page/promotion-07.png" alt="推广页面"/>
        <div class="btn-01" @click="goExperience"></div>
      </div>
      <div class="pos-rel">
        <img src="~assets/img/landing-page/promotion-08.png" alt="推广页面"/>
        <div class="btn-02" @click="goExperience"></div>
      </div>
      <div class="pos-rel">
        <img src="~assets/img/landing-page/promotion-09.png" alt="推广页面"/>
        <div class="btn-03" @click="goExperience"></div>
      </div>
    </div>
    <div class="pos-rel">
      <img width="100%" src="~assets/img/landing-page/promotion-10.png" alt="推广页面"/>
      <div class="btn-04" @click="goExperience"></div>
    </div>
    <login-to-register-modal v-model="loginToRegisterModal" pathName="TaskRelease"/>
  </div>
</template>

<script>
  import {Input, Button, Icon} from 'iview'
  import Top from '@/components/Top'
  import LoginToRegisterModal from '@/components/LoginToRegisterModal'
  import SmsCountdown from '@/components/SmsCountdown'
  import {isInteger} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: "spread-landing-page-three",
    components: {
      IInput: Input,
      IButton: Button,
      Icon: Icon,
      Top: Top,
      LoginToRegisterModal: LoginToRegisterModal,
      SmsCountdown: SmsCountdown,
    },
    data() {
      return {
        loginToRegisterModal: false,
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
    created() {
      this.getVrcode()
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      }
    },
    methods: {
      goExperience() {
        if (this.isLogin) {
          this.$router.push({name: 'TaskRelease'})
        } else {
          this.loginToRegisterModal = true
        }
      },
      register() {
        const _this = this;
        const qqReq = /^[1-9][0-9]{5,10}$/;
        if (!_this.formCustom.phone) {
          _this.$Message.warning('请输入手机号！');
          return
        }
        if (!(/^1\d{10}$/.test(_this.formCustom.phone))) {
          _this.$Message.info({content: '请输入正确的手机号！'});
          return
        }
        if (!_this.formCustom.qqNumber) {
          _this.$Message.warning('请输入QQ号！');
          return
        }
        if (!isInteger(_this.formCustom.qqNumber) || !qqReq.test(_this.formCustom.qqNumber)) {
          _this.$Message.warning('请输入正确的QQ号！');
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
            return {
              phone: _this.formCustom.phone,
              pwd: _this.formCustom.pwd,
            }
          } else {
            _this.$Message.error(res.msg)
          }
        }).then(res => {
          api.login({
            phone: res.phone,
            passWord: res.pwd,
            platForm: 'PC'
          }).then(res => {
            if (res.status) {
              _this.$store.commit({
                type: 'RECORD_USER_INFO',
                info: res.data
              });
              _this.$router.push({name: 'TaskRelease'})
            } else {
              _this.$Message.error(res.msg)
            }
            _this.loginLoading = false;
          })
        })
      },
      getVrcode() {
        this.regImgSrc = "/api/vrcode.json?rand=" + new Date() / 100
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/css/mixin";

  .spread-landing-page-three-top {
    max-width: 100%;
    height: 360px;
    background-image: url("~assets/img/landing-page/promotion-06.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  .btn-01 {
    position: absolute;
    width: 152px;
    height: 56px;
    left: 50%;
    margin-left: -76px;
    bottom: 140px;
    cursor: pointer;
  }

  .btn-02 {
    position: absolute;
    width: 152px;
    height: 56px;
    left: 50%;
    margin-left: -76px;
    bottom: 136px;
    cursor: pointer;
  }

  .btn-03 {
    position: absolute;
    width: 152px;
    height: 56px;
    left: 50%;
    margin-left: -84px;
    bottom: 105px;
    cursor: pointer;
  }

  .btn-04 {
    position: absolute;
    width: 370px;
    height: 52px;
    left: 50%;
    margin-left: -185px;
    bottom: 34px;
    cursor: pointer;
  }

  .login {
    width: 342px;
    position: absolute;
    right: 50%;
    margin-right: -528px;
    top: 30px;
  }

  .login-top {
    border-bottom: 2px solid $mainColor;
    padding: 6px 10px;
  }
</style>
