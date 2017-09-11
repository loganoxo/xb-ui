<template>
  <div class="sel-role-ctt">
    <role-top></role-top>

    <div class="container">
      <p v-if="showRegister" class="fs-24 left fast-register-tip">
        <Icon type="information-circled" color="#FF6633"></Icon>
        亲是第一次登录秀吧，请选择您的角色！
      </p>
      <div class="login-box">
        <div class="buyer-login-box animated fadeInLeft">
          <a @click="selRoleFunc(0)" :class="[animateStart.buyerRes ? 'animated pulse' : '' ]" @mouseover="animateOver(0)" @mouseleave="animateLeave(0)">
            <img src="~assets/img/sel-role/sel_role_01.png" alt="">
          </a>
          <p>
            我想要免费试用，体验商品带给我更多快乐， 并将这份快乐传递给更多人！
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
  import {setStorage, getStorage,removeStorage} from '@/config/utils'
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
      return {
        animateStart: {
          buyerRes: false,
          sellerRes: false,
          complete: false
        },
        loginTrendsCustom: {
          phone: null,
          validateCode: '',
          purpose:'fast',
          smsCode: '',
          role: 0,
        },
        showRegister: false
      }
    },

    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_HIDE'
      })
    },
    created(){
      let self = this;
      self.animateStart.complete = true;
      if(self.$route.query.phone){
        self.showRegister = true;
        self.loginTrendsCustom.phone = self.$route.query.phone;
        self.loginTrendsCustom.pwd = self.$route.query.phone.slice(5);
        self.loginTrendsCustom.repwd = self.$route.query.phone.slice(5);
        self.loginTrendsCustom.smsCode = self.$route.query.smsCode;
        self.loginTrendsCustom.validateCode = self.$route.query.validateCode;
      }
    },
    methods: {
      selRoleFunc(role){
        let self = this;
        if(self.showRegister){
          self.loginTrendsCustom.role = role;
          self.getRegister()
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
            self.$Modal.error({
              content: res.msg,
            });
          }
        })
      },
      getRegister() {
        let self = this;
        api.register({
          phone: this.loginTrendsCustom.phone,
          pwd: this.loginTrendsCustom.phone.slice(5),
          repwd: this.loginTrendsCustom.phone.slice(5),
          nickName: null,
          smsCode: this.loginTrendsCustom.smsCode,
          role: this.loginTrendsCustom.role,
          validateCode: this.loginTrendsCustom.validateCode,
          purpose:'fast'
        }).then((res) => {
          if (res.status) {
            self.$store.commit({
              type: 'RECORD_USER_INFO',
              info: res.data
            });
            self.$Modal.success({
              content: '恭喜您，成功注册秀吧！',
              onOk: function () {
                self.setUserInfo();
              }
            });
          } else {
            self.$Modal.error({
              content: res.msg,
            });
          }
        })
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
    margin-left: 156px;
    margin-top: 140px;
    margin-bottom: 100px;
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
