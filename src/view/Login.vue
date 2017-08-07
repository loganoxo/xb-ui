<template>
  <div>
    <role-top></role-top>
    <div class="login-ctt">
      <div class="container">
        <div class="login-lf">
          <img src="~assets/img/login/login_01.png" alt="">
        </div>
        <div class="login-rt">
          <div class="login-rt-ctt">
            <p class="login-rt-ctt-top">
              <a @click="selLogin = true" :class="[selLogin ? 'active' : '']">
                <Icon v-show="selLogin" type="person" color="#ff6633"></Icon>
                <Icon v-show="!selLogin" type="person"></Icon>
                用户登录
              </a>
              <a @click="selLogin = false" :class="[selLogin ? '' : 'active']">
                <Icon v-show="!selLogin" type="iphone" color="#ff6633"></Icon>
                <Icon v-show="selLogin" type="iphone"></Icon>
                手机动态码登录
              </a>
              <span class="login-rt-ctt-top-line" :class="[selLogin ? 'pos-lf-0' : 'pos-lf-50']"></span>
            </p>
            <div class="login-rt-ctt-ctt">
              <iForm ref="loginNormalCustom" :model="loginNormalCustom" :rules="loginNormalRuleCustom" v-show="selLogin"
                     :class="[selLogin ? 'animated fadeIn' : 'animated fadeOut']">
                <Form-item prop="phone">
                  <iInput placeholder="请输入手机号码" size="large" v-model="loginNormalCustom.phone"></iInput>
                </Form-item>
                <Form-item prop="passWord" style="margin-top: 10px;">
                  <iInput type="password" placeholder="请输入密码" size="large" v-model="loginNormalCustom.passWord"></iInput>
                </Form-item>
                <div class="remember-box">
                  <Form-item class="left" >
                    <Checkbox-group v-model="rememberAccount">
                      <Checkbox label="记住我(公共电脑建议勿勾选)" ></Checkbox>
                    </Checkbox-group>
                  </Form-item>
                  <!--<a class="right mt-6" href="">忘记密码</a>-->
                </div>
                <iButton style="margin-top: 25px;" type="error" long size="large"
                         @click="handleSubmit('loginNormalCustom',setUserInfo)">
                  登录
                </iButton>
              </iForm>
              <iForm ref="loginTrendsCustom" :model="loginTrendsCustom" :rules="loginTrendsRuleCustom"
                     v-show="!selLogin"
                     :class="[selLogin ? 'animated fadeOut' : 'animated fadeIn']">
                <Form-item prop="phone">
                  <iInput placeholder="请输入手机号码" size="large" v-model="loginTrendsCustom.phone"></iInput>
                </Form-item>
                <div class="mt-10 over-hd ">
                  <div style="width: 200px; float: left">
                    <Form-item size="large" prop="validateCode">
                      <iInput placeholder="图片验证码" size="large" v-model="loginTrendsCustom.validateCode"></iInput>
                    </Form-item>
                  </div>
                  <div style="width: 100px; float:left;">
                    <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
                  </div>
                </div>
                <div class="pos-rel" @click="checkPhone">
                  <Form-item class="pt-10 clear" prop="smsCode">
                    <iInput placeholder="动态码" size="large" v-model="loginTrendsCustom.smsCode"></iInput>
                  </Form-item>
                  <SmsCountdown :on-success="sendCodeSuccess"
                                :phone="loginTrendsCustom.phone"
                                :purpose="loginTrendsCustom.purpose"
                                :validateCode="loginTrendsCustom.validateCode">
                  </SmsCountdown>
                </div>

                <div class="remember-box clear" style="margin-top: 15px;">
                  <Form-item class="left">
                    <Checkbox-group v-model="rememberPhone">
                      <Checkbox label="记住手机号码" ></Checkbox>
                    </Checkbox-group>
                  </Form-item>
                </div>
                <iButton size="large" style="margin-top: 15px;" type="error" long
                         @click="handleSubmit('loginTrendsCustom',checkRole)">
                  登录
                </iButton>
              </iForm>
              <p class="fs-14 login-rt-ctt-btm">
                <a class="left" href="">
                  <img class="left   mt-7 mr-5" src="~assets/img/common/qq_logo.png" alt="">
                  QQ账号登录
                </a>
                <router-link class="right" to="/register">注册</router-link>
                <span class="right">没有账号，点击</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        v-model="selRole"
        class-name="vertical-center-modal" cancel-text="" @on-ok="getRegister">
        <h1 class="text-ct">注册角色选择</h1>
        <div class="text-ct">
          <label class="fs-16">
            <input style="vertical-align: middle;font-size: 16px;" type="radio" v-model="loginTrendsCustom.role"
                   v-bind:value="0">秀客
          </label>
          <label class="fs-16">
            <input style="vertical-align: middle;font-size: 16px;" type="radio" v-model="loginTrendsCustom.role"
                   v-bind:value="1">商家
          </label>
        </div>
      </Modal>
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
  import api from '../config/apiConfig'
  import {setStorage, getStorage,removeStorage} from '../config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import RoleTop from '@/components/RoleTop.vue'
  //  import BombBox from '../components/Bombox'

  export default {
    name: 'login',
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
        beginCountTime: false,
        selLogin: true,
        rememberAccount: [],
        rememberPhone: [],
        imgSrc: null,
        modal1: true,
        isBeginImgCode: false,
        formValidate: {
          gender: '',
        },
        loginNormalCustom: {
          phone: null,
          passWord: null,
        },
        loginTrendsCustom: {
          phone: null,
          validateCode: '',
          purpose:'fast',
          smsCode: '',
          role: 0,
        },
        loginNormalRuleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          passWord: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        loginTrendsRuleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          validateCode: [
            {validator: validateCode, trigger: 'blur'},
          ],
          smsCode: [
            {validator: validateSmsCode, trigger: 'blur'}
          ]
        },
      }
    },
    mounted() {
    },
    computed: {},
    created() {
      this.getVrcode();
      if (getStorage('loginNormalCustom')) {
        this.loginNormalCustom = getStorage('loginNormalCustom');
        if (getStorage('loginNormalCustom')) {
          this.loginNormalCustom = getStorage('loginNormalCustom');
          this.rememberAccount = ['记住我(公共电脑建议勿勾选)'];
        }
        if (getStorage('loginTrendsCustomPhone')) {
          this.loginTrendsCustom.phone = getStorage('loginTrendsCustomPhone');
          this.rememberPhone = ['记住手机号码'];
        }
      }
    },
    methods: {
      getRegister() {
        let self = this;
        api.register({
          phone: this.loginTrendsCustom.phone,
          pwd: this.loginTrendsCustom.phone.slice(5),
          repwd: this.loginTrendsCustom.phone.slice(5),
          nickName: null,
          smsCode: this.loginTrendsCustom.smsCode,
          role: this.loginTrendsCustom.role,
          validateCode: this.loginTrendsCustom.validateCode
        }).then((res) => {
          if (res.status) {
            this.$Modal.success({
              content: '恭喜您，成功注册秀吧！',
              onOk: function () {
                self.$router.push({name: 'home'});
              }
            });
          } else {
            this.instance('error', '', res.msg);
          }
        })
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
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
        api.login(this.loginNormalCustom).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            self.rememberAccountFunc();
            self.$Modal.success({
              content: '恭喜您，成功登录秀吧！',
              onOk: function () {
                self.$router.push({name: 'home'});
              }
            });
          } else {
            self.instance('error', '', res.msg)
          }
        })
      },
      rememberAccountFunc() {
        if (this.rememberAccount.length > 0) {
          setStorage('loginNormalCustom', this.loginNormalCustom)
        }else {
          removeStorage('loginNormalCustom')
        }
      },
      rememberPhoneFunc() {
        if (this.rememberPhone.length > 0) {
          setStorage('loginTrendsCustomPhone', this.loginTrendsCustom.phone)
        }else {
          removeStorage('loginTrendsCustomPhone')
        }
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      checkPhone() {
        this.$refs.loginTrendsCustom.validateField('phone');
      },
      checkRole() {
        let self = this;
        api.checkFastSignIn({
          phone: this.loginTrendsCustom.phone,
          smsCode: this.loginTrendsCustom.smsCode,
          validateCode: this.loginTrendsCustom.validateCode,
        }).then((res) => {
          this.rememberPhoneFunc();

          if (res.status) {
            if (res.statusCode === 200) {
              self.$store.commit({
                type: 'RECORD_USER_INFO',
                info: res.data
              });
              self.$Modal.success({
                content: '恭喜您，成功登录秀吧！',
                onOk: function () {
                  self.$router.push({name: 'home'});
                }
              });
            } else if (res.statusCode === 201) {
              this.selRole = true;
            }
          } else {
            this.instance('error', '', res.msg)
          }
        })
      },
      sendCodeSuccess(res) {
        if (res.status) {
          this.instance('success', '', '手机验证码发送成功')
        } else {
          this.instance('error', '', res.msg)
        }
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
            this.$Modal.success({
              title: title,
              content: content
            });
            break;
          case 'warning':
            this.$Modal.warning({
              title: title,
              content: content
            });
            break;
          case 'error':
            this.$Modal.error({
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
  @import 'src/css/common';
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




