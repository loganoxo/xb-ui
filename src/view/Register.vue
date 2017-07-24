<template>
  <div class="register-ctt">
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
              <div  class="clear form-input-box">
                <Form-item  label="设置登录密码" prop="passwd" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.pwd" size="large"></iInput>
                </Form-item>
              </div>
              <div  class="clear form-input-box">
                <Form-item label="确认密码" prop="passwdCheck" class="left" style="width: 650px">
                  <iInput type="password" v-model="formCustom.repwd" size="large"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box" >
                <Form-item label="图形验证码" prop="imgValidate"  class="left" style="width: 550px">
                  <iInput type="text" size="large"></iInput>
                </Form-item>
                <img style="width: 100px;" src="" alt="">
              </div>
              <div  class="clear form-input-box">
                <div>
                  <Form-item label="手机验证码" prop="age" class="left pos-rel" style="width: 650px">
                    <iInput type="text" v-model="formCustom.age" number size="large"></iInput>
                    <span>获取动态码</span>
                  </Form-item>
                </div>
              </div>

              <Form-item>
                <Checkbox-group>
                  <Checkbox label="我已仔细阅读并同意接受"></Checkbox><a class="fs-12">《用户使用协议》</a>
                </Checkbox-group>
              </Form-item>
              <div>
                <Form-item>
                  <iButton v-show="selLogin.buyer" style="background-color: #ff6633; color: #fff" @click="handleSubmit('formCustom')">立即注册</iButton>
                  <iButton v-show="selLogin.seller" style="background-color: #FF6865; color: #fff" @click="handleSubmit('formCustom')">立即注册</iButton>
                  <iButton type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</iButton>
                </Form-item>
              </div>
            </iForm>
            <p class="fs-14 text-ct vtc-mid">
              <a  href="">
                <img class="vtc-mid" src="~assets/img/common/qq_logo.png" alt="">
                QQ账号登录
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span >我已有账号，现在就</span>
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
  export default {
    name: 'register',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Icon: Icon
    },
    data () {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        }else {
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validateImgCode = (rule, value, callback) => {
        if (!(/^.[A-Za-z0-9]+$/.test(value))) {
          callback(new Error('请输入正确验证码'));
        }else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateDynamicCode  = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      };
      return {
        selLogin:{
          buyer: true,
          seller: false
        },

        formCustom: {
          phone: '',
          imgValidate: '',
          pwd: '',
          repwd: '',
          age: '',
          role: ''
        },
        formRes:{
          phoneRes: false,
        },
        ruleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          imgValidate: [
            {validator: validateImgCode, trigger: 'blur'}
          ],
          age: [
            {validator: validateDynamicCode, trigger: 'blur'}
          ]
        }
      }
    },
    created(){
    },
    methods: {
      selLoginFunc (){
        this.selLogin.buyer = !this.selLogin.buyer;
        this.selLogin.seller = !this.selLogin.seller
      },
      showFormWarn (res) {
        res = true;
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
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
      margin-left: 300px;
      margin-right: 129px;
    }
    .register-ctt-top-line {
      position: absolute;
      width: 172px;
      border-bottom: 2px solid $mainColor;
      left: 300px;
      bottom: -2px;
    }
  }

  .register-form-box {
    width: 1000px;
    margin: 40px auto auto auto;
    border: 1px solid #ccc;
    .form-box {
      padding-bottom: 30px;
      div.form-input-box{
        width: 800px;
        >div{
          span{
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
        >a{
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
      > a.sellerActive{
        background-color: #FF6865;
      }
    }
  }
</style>

