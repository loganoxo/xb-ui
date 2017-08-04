<template>
  <div class="register-ctt">
    <role-top></role-top>
    <div class="container">
      <div class="register-ctt-top pos-rel">
        <div class="left active">
          <span>1</span>
          填写注册信息
        </div>
        <div class="left pos-rel">
          <div class="fs-22 left">
            <Icon type="checkmark-circled" size="50px" color="#ccc"></Icon>
          </div>
          注册成功
        </div>
        <div class="register-ctt-top-line"></div>
      </div>
      <div class="container">
        <div class="register-form-box">
          <div class="register-form-sel">
            <a :class="[selLogin.buyer ? 'buyActive' : '']" @click="selLoginFunc">
              <img v-show="selLogin.buyer" src="~assets/img/register/register_01.png" alt="">
              <img v-show="!selLogin.buyer" src="~assets/img/register/register_03.png" alt="">
              秀客注册
            </a>
            <a :class="[selLogin.seller ? 'sellerActive' : '']" @click="selLoginFunc">
              <img v-show="selLogin.seller" src="~assets/img/register/register_04.png" alt="">
              <img v-show="!selLogin.seller" src="~assets/img/register/register_02.png" alt="">
              商家注册
            </a>
          </div>
          <div class="mt-80 form-box over-hd">
            <iForm ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="手机号码:" prop="phone" class="left" style="width: 650px">
                  <iInput size="large" v-model="formCustom.phone"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="设置登录密码" prop="pwd" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.pwd" size="large"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="确认密码" prop="repwd" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.repwd" size="large"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="图形验证码" prop="validateCode" class="left" style="width: 550px">
                  <iInput type="text" size="large" v-model="formCustom.validateCode"></iInput>
                </Form-item>
                <div style="width: 100px; float:left;">
                  <img :src="regImgSrc" width="100%" alt="" @click="getRegVrcode">
                </div>
              </div>
              <div class="clear form-input-box">
                <Form-item label="手机验证码" prop="smsCode" class="left pos-rel" style="width: 650px">
                  <iInput type="text" v-model="formCustom.smsCode" number size="large"></iInput>
                  <SmsCountdown style="top: 3px;"
                                :on-success="sendCodeSuccess"
                                :phone="formCustom.phone"
                                :purpose="formCustom.purpose"
                                :validateCode="formCustom.validateCode">
                  </SmsCountdown>
                  <!--<SmsCountdown style="position: absolute;top: 3px;"  class="btn btn-default"  @sendCode="sendCode" :phone="formCustom.phone"></SmsCountdown>-->
                </Form-item>
              </div>

              <Form-item prop="agreeStrip">
                <Checkbox-group>
                  <Checkbox label="我已仔细阅读并同意接受" v-model="formCustom.agreeStrip"></Checkbox>
                  <a class="fs-12">《用户使用协议》</a>
                </Checkbox-group>
              </Form-item>
              <div>
                <Form-item>
                  <iButton v-show="selLogin.buyer" style="background-color: #ff6633; color: #fff"
                           @click="handleSubmit('formCustom',registerBuyer)">立即注册
                  </iButton>
                  <iButton v-show="selLogin.seller" style="background-color: #FF6865; color: #fff"
                           @click="handleSubmit('formCustom',registerSeller)">立即注册
                  </iButton>
                  <iButton type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</iButton>
                </Form-item>
              </div>
            </iForm>
            <p class="fs-14 text-ct vtc-mid">
              <a href="">
                <img class="vtc-mid" src="~assets/img/common/qq_logo.png" alt="">
                QQ账号登录
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>我已有账号，现在就</span>
              <router-link class="" to="/login">登陆</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Button from 'iview/src/components/button'
  import Checkbox from 'iview/src/components/checkbox'
  import api from '../config/apiConfig'
  import SmsCountdown from '@/components/SmsCountdown'
  import RoleTop from '@/components/RoleTop.vue'

  export default {
    name: 'register',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      RoleTop: RoleTop
    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.pwd !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('repwd');
          }
          callback();
        }
      };
      const validateImgCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback()
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback()
        }
      };
      const validateAgreeStrip = (rule, value, callback) => {
        if (!this.formCustom.agreeStrip) {
          return callback(new Error('请仔细阅读，并勾选！'));
        } else {
          callback();
        }
      };
      return {
        countRegTimeText: "获取动态码",
        regImgSrc: null,
        selLogin: {
          buyer: true,
          seller: false
        },

        formCustom: {
          phone: '',
          pwd: '',
          repwd: '',
          validateCode: '',
          smsCode: '',
          role: '',
          purpose: 'reg',
          agreeStrip: false,
        },
        formRes: {
          phoneRes: false,
        },
        ruleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          repwd: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          validateCode: [
            {validator: validateImgCode, trigger: 'blur'}
          ],
          smsCode: [
            {validator: validateSmsCode, trigger: 'blur'}
          ],
          agreeStrip: [
            {validator: validateAgreeStrip, trigger: 'blur'}
          ]

        }
      }
    },
    created() {
      this.getRegVrcode();
      if (this.$route.name == 'seller') {
        this.selLogin.buyer = false;
        this.selLogin.seller = true;
      }
    },
    methods: {
      getRegVrcode() {
        this.regImgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      selLoginFunc() {
        this.selLogin.buyer = !this.selLogin.buyer;
        this.selLogin.seller = !this.selLogin.seller
      },
      showFormWarn(res) {
        res = true;
      },
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      registerBuyer() {
        this.formCustom.role = 0;
        let self = this;
        api.register({
          phone: this.formCustom.phone,
          pwd: this.formCustom.pwd,
          repwd: this.formCustom.repwd,
          nickName: '',
          smsCode: this.formCustom.smsCode,
          validateCode: this.formCustom.validateCode,
          role: this.formCustom.role
        }).then((res) => {
          if (res.status) {
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({name: 'login'});
              }
            });
          } else {
            self.$Modal.error({
              content: res.msg,
            });
          }
        })
      },
      registerSeller() {
        let self = this;
        this.formCustom.role = 1;
        api.register({
          phone: this.formCustom.phone,
          pwd: this.formCustom.pwd,
          repwd: this.formCustom.repwd,
          nickName: '',
          smsCode: this.formCustom.smsCode,
          validateCode: this.formCustom.validateCode,
          role: this.formCustom.role
        }).then((res) => {
          if (res.status) {
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({name: 'login'});
              }
            });
          } else {
            self.$Modal.error({
              content: res.msg,
            });
          }
        })
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Modal.success({
            content: "手机验证码发送成功！",
          });
        } else {
          self.$Modal.error({
            content: res.msg,
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .register-ctt {
    padding-bottom: 50px;
  }

  .register-ctt-top {
    margin-top: 60px;
    border-bottom: 2px solid #E6E6E6;
    height: 42px;
    line-height: 42px;
    > div {
      width: 172px;
      text-align: center;
      font-size: 16px;
      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background-color: #CCCCCC;
        color: #fff;
        border-radius: 50%;
        text-align: center;
      }
      > div {
        position: relative;
        left: 40px;
      }
    }
    > div.active {
      color: #000;
      font-weight: bold;
      span {
        background-color: $mainColor;
      }
    }
    > div:first-child {
      margin-left: 360px;
      margin-right: 129px;
    }
    .register-ctt-top-line {
      position: absolute;
      width: 172px;
      border-bottom: 2px solid $mainColor;
      left: 360px;
      bottom: -2px;
    }
  }

  .register-form-box {
    width: 1000px;
    margin: 40px auto auto auto;
    border: 1px solid #ccc;
    .form-box {
      padding-bottom: 30px;
      div.form-input-box {
        width: 800px;
        > div {
          span {
            background-color: #EAEAEA;
            color: #999;
            padding: 0px 10px;
            position: absolute;
            right: 7px;
            top: 7px;
            height: 24px;
            line-height: 24px;
          }
        }
        > a {
          display: inline-block;
          height: 38px;
          line-height: 38px;
          margin-left: 30px;
        }
      }
    }
    .register-form-sel {
      overflow: hidden;
      > a {
        float: left;
        width: 50%;
        height: 48px;
        line-height: 48px;
        background-color: #ccc;
        color: #fff;
        text-align: center;
        font-size: 16px;

        img {
          vertical-align: middle;
        }
      }
      > a.buyActive {
        background-color: $mainColor;
      }
      > a.sellerActive {
        background-color: #FF6865;
      }
    }
  }
</style>

