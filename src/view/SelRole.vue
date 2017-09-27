<template>
  <div class="sel-role-ctt">
    <role-top></role-top>

    <div class="container">
      <p v-if="showRegister" class="fs-24  fast-register-tip">
        <Icon type="information-circled" color="#FF6633"></Icon>
        亲是第一次登录秀吧，请选择您的角色！
      </p>
      <div class="login-box">
        <div class="buyer-login-box animated fadeInLeft">
          <a @click="selRoleFunc(0)" :class="[animateStart.buyerRes ? 'animated pulse' : '' ]" @mouseover="animateOver(0)" @mouseleave="animateLeave(0)">
            <img src="~assets/img/sel-role/sel_role_01.png" alt="">
          </a>
          <p>
            我想要免费活动，体验商品带给我更多快乐， 并将这份快乐传递给更多人！
          </p>
        </div>
        <div class="middle-icon-box fadeInDown">
          <img class="left-icon" :class="[animateStart.buyerRes ? 'aleft' : 'arightDefault' ]" src="~assets/img/sel-role/sel_role_06.png" alt="">
          <img src="~assets/img/sel-role/sel_role_05.png" alt="" style="vertical-align: text-bottom;">
          <img class="right-icon" :class="[animateStart.sellerRes ? 'aright' : 'aleftDefault' ]" src="~assets/img/sel-role/sel_role_07.png" alt="">
        </div>
        <div class="seller-login-box animated fadeInRight">
          <a @click="selRoleFunc(1)"  :class="[animateStart.sellerRes ? 'animated pulse' : 'arightDefault' ]" @mouseover="animateOver(1)" @mouseleave="animateLeave(1)">
            <img src="~assets/img/sel-role/sel_role_02.png" alt="">
          </a>
          <p>
            我想要推广商品、收集新品市场反馈、 提升产品销量。打造专属于我的品牌！
          </p>
        </div>
      </div>
    </div>
    <div v-show="showQQ">
      <!--<iForm ref="loginTrendsCustom" :model="loginTrendsCustom" :rules="loginTrendsRuleCustom"-->
             <!--v-show="!selLogin"-->
             <!--:class="[selLogin ? 'animated fadeOut' : 'animated fadeIn']">-->
      <iForm  style="width: 300px; margin: 150px auto;" ref="loginTrendsCustom" :model="loginTrendsCustom" :rules="loginTrendsRuleCustom">
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
            <iInput placeholder="动态码" size="large" v-model="loginTrendsCustom.smsCode"  @on-keypress="pressEnterLoginTrends"></iInput>
          </Form-item>
          <SmsCountdown :on-success="sendCodeSuccess"
                        :phone="loginTrendsCustom.phone"
                        :purpose="loginTrendsCustom.purpose"
                        :validateCode="loginTrendsCustom.validateCode">
          </SmsCountdown>
        </div>
        <iButton size="large" style="margin-top: 15px;" type="error" long :loading="btnState.trendsLoginBtn"
                 @click="handleSubmit('loginTrendsCustom',qqLoginFunc)">
          登录
        </iButton>
      </iForm>
    </div>
    <div class="container">
      <div class="qq-login-box">
        <img src="~assets/img/sel-role/sel_role_04.png" alt="">
        <a href="">QQ账号登录</a>
        <p>
          我已注册，现在就
          <router-link to="/login">登录</router-link>
        </p>
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
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {getCookie,setCookie,delCookie,setStorage, getStorage,removeStorage} from '@/config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import RoleTop from '@/components/RoleTop.vue'
  export default {
    name: 'sel-role',
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
    data () {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
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
        imgSrc: null,
        showQQFrom: false,
        showQQ: false,
        animateStart: {
          buyerRes: false,
          sellerRes: false,
          complete: false
        },
        btnState: {
          normalLoginBtn: false,
          trendsLoginBtn: false,
        },
        loginTrendsCustom: {
          phone: null,
          validateCode: '',
          purpose:'fast',
          smsCode: '',
          role: 0,
        },
        showRegister: false,
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

    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    created(){
      let self = this;
      self.getVrcode();
      self.animateStart.complete = true;
      //快速注册参数
      if(self.$route.query.phone){
        self.showRegister = true;
        self.loginTrendsCustom.phone = self.$route.query.phone;
        self.loginTrendsCustom.pwd = self.$route.query.phone.slice(5);
        self.loginTrendsCustom.repwd = self.$route.query.phone.slice(5);
        self.loginTrendsCustom.smsCode = self.$route.query.smsCode;
        self.loginTrendsCustom.validateCode = self.$route.query.validateCode;
      }
      //推荐链接参数
      if(!getCookie('recommendCode') && self.$route.query.recommendCode){
        setCookie('recommendCode', self.$route.query.recommendCode, 30);
      }
      //qq快速注册参数
      if(self.$route.query.accessToken && self.$route.query.qqOpenId){
        self.showRegister = true;
        self.showQQFrom = true;
        self.loginTrendsCustom.purpose = 'qq_bind';
        self.loginTrendsCustom.accessToken = self.$route.query.accessToken;
        self.loginTrendsCustom.qqOpenId = self.$route.query.qqOpenId;
      }
    },
    methods: {
      qqLoginFunc(){
        let self = this;
        let recommendCode = '';
        if(getCookie('recommendCode')){
          recommendCode = getCookie('recommendCode');
        }
        api.qqRegister({
          accessToken: self.loginTrendsCustom.accessToken,
          qqOpenId: self.loginTrendsCustom.qqOpenId,
          phone: this.loginTrendsCustom.phone,
          pwd: this.loginTrendsCustom.phone.slice(5),
          repwd: this.loginTrendsCustom.phone.slice(5),
          smsCode: this.loginTrendsCustom.smsCode,
          role: this.loginTrendsCustom.role,
          validateCode: this.loginTrendsCustom.validateCode,
          purpose:this.loginTrendsCustom.purpose,
          recommendCode: recommendCode
        }).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            self.$Message.success({
              content: '恭喜您，成功注册秀吧！',
              duration: 1,
              onClose: function () {
                self.$router.push({name: 'Home'});
              }
            });
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      checkPhone() {
        this.$refs.loginTrendsCustom.validateField('phone');
      },
      selRoleFunc(role){
        let self = this;
        if(self.showRegister){
          self.loginTrendsCustom.role = role;
          if(self.showQQFrom){
            self.showQQ = true;
          }else {
            self.getRegister()
          }
        }else {
          if(role === 0){
            self.$router.push({path: '/register/buyer-register'});
          }else if(role === 1){
            self.$router.push({path: '/register/seller-register'});
          }
        }
      },
      setUserInfo() {
        let self = this;
        api.login({
          phone: this.loginTrendsCustom.phone,
          passWord: this.loginTrendsCustom.phone.slice(5),
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

      getRegister() {
        let self = this;
        let recommendCode = '';
        if(getCookie('recommendCode')){
          recommendCode = getCookie('recommendCode');
        }
        api.register({
          phone: this.loginTrendsCustom.phone,
          pwd: this.loginTrendsCustom.phone.slice(5),
          repwd: this.loginTrendsCustom.phone.slice(5),
          nickName: null,
          smsCode: this.loginTrendsCustom.smsCode,
          role: this.loginTrendsCustom.role,
          validateCode: this.loginTrendsCustom.validateCode,
          purpose:this.loginTrendsCustom.purpose,
          recommendCode: recommendCode
        }).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            self.$Message.success({
              content: '恭喜您，成功注册秀吧！',
              duration: 1,
              onClose: function () {
                delCookie('recommendCode');
                self.setUserInfo();
              }
            });
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      sendCodeSuccess(res) {
        let _this = this;
        if (res.status) {
          _this.$Message.success({
            content: '短信验证码发送成功',
            duration: 1,
          });
        } else {
          _this.instance('error', '', res.msg);
          _this.getVrcode();
        }
      },
      pressEnterLoginTrends(event){
        if (event.keyCode === 13){
          this.handleSubmit('loginTrendsCustom',this.checkRole)
        }
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
      animateOver: function (res) {
        if(res === 1){
          this.animateStart.sellerRes = true;
        }else {
          this.animateStart.buyerRes = true;
        }
        this.animateStart.complete = false;
      },
      animateLeave: function (res) {
        if(res === 1){
          this.animateStart.sellerRes = false;
        }else {
          this.animateStart.buyerRes = false;
        }
        this.animateStart.complete = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .fast-register-tip{
    margin-left: 364px;
    margin-top: 140px;
    i{
      color: rgb(255, 102, 51);
      font-size: 35px;
      float: left;
      margin-right: 10px;
    }
  }
  .sel-role-ctt{
    padding-bottom: 310px;
  }
  .login-box{
    margin: auto;
    padding-top: 106px;
    width: 806px;
    >div{
      float: left;
      text-align: center;
      a{
        display: block;
        overflow: hidden;
      }
      p{
        width: 242px;
        margin: 20px auto;
        font-size: 14px;
        text-align: left;
      }
    }
    .buyer-login-box{
      width: 40%;
    }
    .seller-login-box{
      width: 40%;
    }
    .middle-icon-box{
      width: 20%;
      margin-top: 26px;
      img{
        position: relative;
      }
      .left-icon,.right-icon{
        top:-2px;
        transition: left 0.3s;
      }
      .aleft{
        left: -40px;
      }
      .aleftDefault{
        left: 0;
      }
      .arightDefault{
        left: 0;
      }
      .aright{
        left: 40px;
      }
    }
  }

  .qq-login-box{
    width: 360px;
    margin: 76px auto auto auto;
    >img{
      display: block;
      margin: auto;
    }
    >a{
      display: block;
      background: url("~assets/img/common/qq_logo.png") no-repeat 0 3px;
      padding-left: 30px;
      height: 30px;
      margin: 20px auto auto auto;
      width: 120px;
      line-height: 30px;
      font-size: 14px;
    }

    p{
      width: 152px;
      margin: 15px auto;
      a{
        display: inline-block;
        border: 1px solid #CCCCCC;
        padding: 1px 13px;
        color: #666666;
      }
    }

  }
</style>
