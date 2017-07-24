<template>
  <div class="login-ctt">
    <div class="container">
      <div class="login-lf">
        <img src="~assets/img/login/login_01.png" alt="">
      </div>
      <div class="login-rt">
        <div class="login-rt-ctt">
          <p class="login-rt-ctt-top">
            <a @click="selLogin = true" :class="[selLogin ? 'active' : '']">
              <Icon v-show="selLogin" type="person"  color="#ff6633"></Icon>
              <Icon v-show="!selLogin" type="person" ></Icon>
              用户登录
            </a>
            <a @click="selLogin = false" :class="[selLogin ? '' : 'active']">
              <Icon v-show="!selLogin" type="iphone" color="#ff6633" ></Icon>
              <Icon v-show="selLogin"  type="iphone"  ></Icon>
              手机动态码登录
            </a>
            <span class="login-rt-ctt-top-line" :class="[selLogin ? 'pos-lf-0' : 'pos-lf-50']"></span>
          </p>
          <div>
            <iForm ref="loginNormalCustom" :model="loginNormalCustom" :rules="loginNormalRuleCustom"  v-show="selLogin" :class="[selLogin ? 'animated fadeIn' : 'animated fadeOut']">
              <Form-item prop="phone">
                <iInput placeholder="请输入手机号码" size="large" v-model="loginNormalCustom.phone"></iInput>
              </Form-item>
              <Form-item style="margin-top: 10px;" prop="passWord" >
                <iInput type="password" placeholder="请输入密码" size="large" v-model="loginNormalCustom.passWord"></iInput>
              </Form-item>
              <div class="remember-box">
                <Form-item class="left">
                  <Checkbox-group>
                    <Checkbox label="记住我(公共电脑建议勿勾选)"></Checkbox>
                  </Checkbox-group>
                </Form-item>
                <a class="right mt-6" href="">忘记密码</a>
              </div>
              <iButton  style="margin-top: 25px;" type="error" long size="large" @click="handleSubmit('loginNormalCustom',setUserInfo)">
                登录
              </iButton>
            </iForm>
            <iForm  ref="loginTrendsCustom" :model="loginTrendsCustom" :rules="loginTrendsRuleCustom"  v-show="!selLogin" :class="[selLogin ? 'animated fadeOut' : 'animated fadeIn']">
              <Form-item prop="phone">
                <iInput placeholder="请输入手机号码" size="large" v-model="loginTrendsCustom.phone"></iInput>
              </Form-item>
              <div class="mt-10 over-hd ">
                <div style="width: 200px; float: left">
                  <Form-item  size="large" prop="validateCode">
                    <iInput placeholder="验证码" size="large" v-model="loginTrendsCustom.validateCode"></iInput>
                  </Form-item>
                </div>
                <div style="width: 100px; float:left;">
                  <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
                </div>
              </div>
              <div class="pos-rel">
                <Form-item class="pt-10 clear" prop="trendsCode">
                  <iInput placeholder="动态码" size="large" v-model="loginTrendsCustom.trendsCode"></iInput>
                </Form-item>
                <a class="get-code" @click="getCode(60,countTimeText)" >{{countTimeText}}</a>
              </div>

              <div class="remember-box clear" style="margin-top: 15px;">
                <Form-item class="left">
                  <Checkbox-group>
                    <Checkbox label="记住手机号码"></Checkbox>
                  </Checkbox-group>
                </Form-item>
              </div>
              <iButton size="large" style="margin-top: 15px;" type="error" long @click="handleSubmit('loginTrendsCustom')">
                登录
              </iButton>
            </iForm>
            <p class="fs-14">
              <a class="left" href="">
                <img class="left   mt-7 mr-5" src="~assets/img/common/qq_logo.png" alt="">
                QQ账号登录
              </a>
              <router-link class="right" to="/register">注册</router-link>
              <span  class="right">没有账号，点击</span>
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
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import api from '../config/apiConfig'
  import {setStorage, getStorage,countDown} from '../config/utils'
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
    },
    data () {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        }else {
            callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else {
          callback()
        }
      };
      const validateTrendsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'));
        }else {
          callback()
        }
      };
      return {
        countTimeText: '获取动态码',
        selLogin: true,
        imgUrl: null,
        loginNormalCustom:{
          phone: '',
          passWord: '',
          role: 1
        },
        loginTrendsCustom:{
          phone: '',
          validateCode: '',
          trendsCode: ''
        },
        loginNormalRuleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          pwd: [
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
          trendsCode: [
            {validator: validateTrendsCode, trigger: 'blur'}
          ]
        },
        imgSrc:null
      }
    },
    mounted () {
    },
    computed:{
    },
    created(){
        this.getVrcode()
    },
    methods: {
      getVrcode (){
        this.imgSrc = "/api/vrcode.json?rand="+ new Date() / 100
      },
      handleSubmit (name,callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res ) {
          callback();
        }
      },
      setUserInfo (){
        api.login(this.loginNormalCustom).then((res)=>{
          if(res.status){
            this.$store.state.userInfo = res.data;
            this.$store.state.login = true;
            this.$swal({
              text: '' + res.msg,
              type: 'success',
              confirmButtonText: "登陆成功",
            })
          }else {
            this.$swal({
              text: '' + res.msg,
              type: 'error',
              confirmButtonText: "登陆失败",
            })
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

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
            i{
              font-size: 20px;
              position: relative;
              top: 2px;
              left: -2px;
            }
            i.active{
              color: $mainColor;
            }

          }
          a.active{
            color: $mainColor;
          }
          .login-rt-ctt-top-line{
            position: absolute;
            left: 0;
            bottom: -2px;
            border: 1px solid $mainColor;
            width: 50%;
            transition: left 0.1s;
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
          p{
            margin-top: 20px;
            height: 38px;
            line-height: 38px;
            a{
              color: #666;
            }
          }
          a.get-code{
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
