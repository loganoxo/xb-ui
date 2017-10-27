<template>
  <div class="personal-box">
    <div class="personal-sel-box">
      <!--账号信息beg-->
      <div  class="user-info-box animated fadeIn">
        <div class="user-basic">
          <p class="fs-14 user-basic-title">基本信息</p>
          <div class="user-basic-ctt">
            <div class="text-ct left">
              <img class="block mg-at" :src="userList.portraitPic" alt="" style="width: 120px; border-radius: 50%;">
              <a class="fs-14 block mt-10" @click="selPortraitPic">修改头像</a>
            </div>
            <ul v-show="!showModifyAvatar" class="left">
              <li>
                手机帐号： {{userList.phone}}
              </li>
              <li v-if="userList.role == 0">
                <p v-if="userList.alitmNum <= 0 ">
                  绑定淘宝账号：未绑定 - <router-link to="/user/personal-setting/ww-bind">马上绑定</router-link>
                </p>
                <p v-else>
                  绑定淘宝账号：<a>已绑定</a>
                </p>
              </li>
              <li>
                <p v-if="Boolean(userList.ifCertification)">
                  实名认证：<a>已认证</a>
                </p>
                <p v-else>
                  实名认证：未认证 -
                  <router-link to="/user/personal-setting/verified">马上认证</router-link>
                </p>
              </li>
              <li>
                注册时间：{{userList.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
              </li>
            </ul>
            <p v-show="showModifyAvatar" class="img-box">
              <img :src="avatar.src" alt="" @click="modifyPortraitPic(avatar)" :key="avatar.src" style="width: 68px; cursor: pointer" v-for="avatar in avatars">
            </p>
          </div>
        </div>
        <div class="user-safe" v-show="myAccount.userSafe">
          <p class="fs-14">账户&安全</p>
          <ul>
            <li>
              <ul>
                <li class="one">登录密码</li>
                <li class="two">
                  已设置
                  <span>(建议定期修改登录密码)</span>
                </li>
                <li class="three">
                  <a @click="myAccountPwdChangeFather('modifyPwd')" >去修改</a>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li class="one">支付密码</li>
                <li class="two">
                  <span v-if="!isEditPwdAlready">未设置(初始密码888888)</span>
                  <span v-if="isEditPwdAlready">已设置</span>
                </li>
                <li class="three">
                  <router-link to="/user/money-management/account-management?infoSelect=accountInfo">去设置</router-link>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li class="one">
                  提现账号
                </li>
                <li class="two">
                  <span v-if="!userList.ifBandingBankCard">未设置</span>
                  <span v-if="userList.ifBandingBankCard">已设置</span>
                </li>
                <li class="three">
                  <router-link to="/user/money-management/getout-money">去设置</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!--修改密码-->
        <div class="my-account" >
          <div class="modify-pwd clear" v-show="myAccount.modifyPwd">
            <div class="modify-pwd-sel clear">
              <p>修改登录密码</p>
              <div v-show="myAccountSon.selBox" class="sel-box clear">
                <p class="left">请选择重置的方式：</p>
                <div class="left">
                  <div>
                    <div @click="myAccountPwdChangeSon('selDefaultModify')" class="sel-canal">
                      <p>
                        我忘记登录密码了
                        <br>
                        <span style="color: #999">忘记密码或者密码被锁定了</span>
                      </p>
                      <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                         style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
                    </div>
                    <div  @click="myAccountPwdChangeSon('selPhoneModify')" class="sel-canal">
                      <p>
                        我记得原来的密码
                      </p>
                      <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                         style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
                    </div>
                    <iButton @click="myAccountPwdChangeFather('userSafe')">
                      返回上一页
                    </iButton>
                  </div>
                </div>

              </div>
              <div v-show="myAccountSon.selPhoneModify" class="sel-default-modify mt-20">
                <iForm ref="defaultModifyCustom" :model="defaultModifyCustom" :rules="defaultModifyRuleCustom" :label-width="400">
                  <div class="clear form-input-box">
                    <Form-item label="原始密码" class="left" style="width: 650px" prop="oldPwd">
                      <iInput type="password" size="large" v-model="defaultModifyCustom.oldPwd"></iInput>
                    </Form-item>
                  </div>
                  <div class="clear form-input-box">
                    <Form-item label="新密码" class="left" style="width: 650px" prop="newPwd">
                      <iInput type="password" size="large" v-model="defaultModifyCustom.newPwd"></iInput>
                    </Form-item>
                  </div>
                  <div class="clear form-input-box">
                    <Form-item label="确认密码" class="left" style="width: 650px" prop="repwd">
                      <iInput type="password" size="large" v-model="defaultModifyCustom.repwd"></iInput>
                    </Form-item>
                  </div>
                  <div>
                    <Form-item>
                      <iButton :disabled="defaultModifyBtnState" @click="handleSubmit('defaultModifyCustom',modifyDefaultPwdFunc)">
                        确定
                      </iButton>
                      <iButton @click="myAccountPwdChangeSon('selBox')">
                        返回上一页
                      </iButton>
                    </Form-item>
                  </div>
                </iForm>
              </div>
              <div v-show="myAccountSon.selDefaultModify" class="sel-phone-modify mt-20">
                <iForm ref="payCustom" :model="payCustom" :rules="payRuleCustom" :label-width="400">
                  <div class="clear form-input-box">
                    <Form-item label="绑定手机" prop="phone" class="left" style="width: 650px">
                       <input class="fs-14" type="text" v-model="payCustom.phone" style="border: none;" readonly>
                    </Form-item>
                  </div>
                  <div class="clear form-input-box">
                    <Form-item label="图形验证码"  prop="validateCode" class="left" style="width: 550px">
                      <iInput type="text" size="large" v-model="payCustom.validateCode"></iInput>
                    </Form-item>
                    <div style="width: 100px; float:left;">
                      <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
                    </div>
                  </div>
                  <div class="clear form-input-box">
                    <Form-item label="短信验证码" class="left pos-rel" style="width: 650px">
                      <iInput type="text" number size="large" v-model="payCustom.smsCode"></iInput>
                      <SmsCountdown :on-success="sendCodeSuccess" style="top: 3px;"
                                    :phone="payCustom.phone"
                                    :purpose="payCustom.purpose"
                                    :validateCode="payCustom.validateCode"
                                    :timeout=120
                      >
                      </SmsCountdown>
                    </Form-item>
                  </div>
                  <div>
                    <Form-item>
                      <iButton :disabled="trendsModifyBtnState2" @click="handleSubmit('payCustom',modifyPwdFunc)">
                        确定
                      </iButton>
                      <iButton @click="myAccountPwdChangeSon('selBox')">
                        返回上一页
                      </iButton>
                    </Form-item>
                  </div>
                </iForm>
              </div>
              <div v-show="myAccountSon.modifyPwd" class="mt-20">
                <iForm ref="trendsModifyCustom" :model="trendsModifyCustom" :rules="trendsModifyRuleCustom" :label-width="400">
                  <div class="clear form-input-box">
                    <Form-item label="新密码" prop="pwd" class="left" style="width: 650px" >
                      <iInput type="password" size="large" v-model="trendsModifyCustom.pwd"></iInput>
                    </Form-item>
                  </div>
                  <div class="clear form-input-box">
                    <Form-item label="确认新密码" class="left" style="width: 650px" prop="repwd">
                      <iInput type="password" size="large"  v-model="trendsModifyCustom.repwd"></iInput>
                    </Form-item>
                  </div>
                  <div>
                    <Form-item>
                      <iButton :disabled="trendsModifyBtnState" @click="handleSubmit('payCustom',modifyFinishPwdFunc)">
                        确定
                      </iButton>
                    </Form-item>
                  </div>
                </iForm>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--账号信息end-->
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
  import Upload from '@/components/upload'
  import {setStorage, getStorage} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import Modal from 'iview/src/components/modal'
  import Alert from 'iview/src/components/alert'
  import SmsCountdown from '@/components/SmsCountdown'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  export default {
    name: 'ersonalAccountInfo',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Upload: Upload,
      Modal: Modal,
      Alert: Alert,
      SmsCountdown: SmsCountdown,
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
      const validateDefaultPassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.defaultModifyCustom.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.trendsModifyCustom.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
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
        myAccount:{
          userSafe:true,
          modifyPwd:false,
        },
        myAccountSon:{
          selBox:true,
          selDefaultModify:false,
          selPhoneModify:false,
          modifyPwd: false
        },
        imgSrc: null,
        defaultModifyBtnState: false,
        trendsModifyBtnState: false,
        trendsModifyBtnState2:false,
        payCustom: {
          phone: this.$store.state.userInfo.phone,
          validateCode: '',
          purpose:'forget',
          smsCode: '',
          role: 0,
        },
        payRuleCustom: {
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
        trendsModifyCustom:{
          pwd: '',
          repwd: ''
        },
        defaultModifyCustom: {
          oldPwd: '',
          newPwd: '',
          repwd: '',
        },
        defaultModifyRuleCustom: {
          oldPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          newPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validateDefaultPassCheck, trigger: 'blur'},
          ]
        },
        trendsModifyRuleCustom: {
          pwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validatePassCheck, trigger: 'blur'},
          ],
        },
        avatars: [
          {
            src: "/static/avatar/tx1.png"
          },
          {
            src: "/static/avatar/tx2.png"
          },
          {
            src: "/static/avatar/tx3.png"
          },
          {
            src: "/static/avatar/tx4.png"
          },
          {
            src: "/static/avatar/tx5.png"
          },
          {
            src: "/static/avatar/tx6.png"
          },
          {
            src: "/static/avatar/tx7.png"
          },
          {
            src: "/static/avatar/tx8.png"
          },
          {
            src: "/static/avatar/tx9.png"
          },
          {
            src: "/static/avatar/tx10.png"
          },
          {
            src: "/static/avatar/tx11.png"
          },
          {
            src: "/static/avatar/tx12.png"
          },
        ],
        showModifyAvatar: false,
        userData: {},
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      self.getVrcode();
      self.$store.dispatch('getUserInformation');
    },
    computed: {
      getUserRole() {
        return this.$store.state.userInfo.role
      },
      userAccount: function () {
        return this.$store.getters.getUserAccountInfo || {};
      },
      userList: function () {
        return this.$store.getters.getPersonalInfo || {};
      },
      userBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      isEditPwdAlready: function () {
        return this.$store.getters.getIsEditPwdAlready;
      }
    },
    methods: {
      ...mapActions([
        'getUserInformation'
      ]),
      myAccountPwdChangeFather(type){
        for( let k in this.myAccount){
          if (k===type){
            this.myAccount[k]=true
          }else {
            this.myAccount[k]=false
          }
        }
      },
      myAccountPwdChangeSon(type){
        for( let k in this.myAccountSon){
          if (k===type){
            this.myAccountSon[k]=true
          }else {
            this.myAccountSon[k]=false
          }
        }
      },
      modifyPortraitPic(avatar){
        let self = this;
        api.modifyPortraitPic({
          picStr: avatar.src
        }).then((res) => {
          if(res.status){
            self.showModifyAvatar = false;
            self.getUserInformation();
          }else {
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
      modifyDefaultPwdFunc(){
        let self = this;
        self.defaultModifyBtnState = true;
        api.modifyDefaultPwd({
          oldPwd: self.defaultModifyCustom.oldPwd,
          newPwd: self.defaultModifyCustom.newPwd,
          repwd: self.defaultModifyCustom.repwd
        }).then((res) => {
          self.defaultModifyBtnState = false;
          if(res.status){
            self.$Message.success({
              top: 50,
              content: res.msg,
              duration: 1,
              onClose: function () {
                self.$router.go(-1);
                self.getUserInformation();
              }
            });
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      modifyPwdFunc(){
        let self = this;
        self.trendsModifyBtnState2 = true;
        api.validatePaySmscode({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
        }).then((res) => {
          self.trendsModifyBtnState2 = false;
          if(res.status){
            self.myAccountPwdChangeSon('modifyPwd');
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
            self.getVrcode();
          }
        });
      },
      modifyFinishPwdFunc(){
        let self = this;
        self.trendsModifyBtnState = true;
        api.modifyTrendsPwd({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
          pwd: self.trendsModifyCustom.pwd,
          repwd: self.trendsModifyCustom.repwd,
        }).then(res => {
          self.trendsModifyBtnState = false;
          if(res.status){
            self.$Message.success({
              top: 50,
              content: res.msg,
              duration: 1,
              onClose: function () {
                self.$router.go(-1);
                self.getUserInformation();
              }
            });
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      checkPhone() {
        this.$refs.loginTrendsCustom.validateField('phone');
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Message.success({
            content: res.msg,
          });
        } else {
          self.$Message.error({
            content: res.msg,
            duration: 9
          });
          self.getVrcode();
        }
      },
      myInfoFunc(index){
        if(index === 1){
          return this.$store.state.userInfo.role !== 1;
        }else {
          return true;
        }
      },
      myInfoSelectsFunc(myInfoSelect){
        this.infoSelect=myInfoSelect.isSelect;
        myInfoSelect.callback();
      },
      //修改头像
      selPortraitPic(){
        this.showModifyAvatar = true;
      },
      handleSubmit (name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
      handleReset(name,callback) {
        this.$refs[name].resetFields();
        if (typeof callback === 'function') {
          callback();
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .user-info-box{
    margin-top: 20px;
    .user-basic{
      border: 1px solid #EEEEEE;
      overflow: hidden;
      P.user-basic-title{
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        background-color: #f8f8f8;
      }
      p.img-box{
        width: 800px;
        img{
          margin: 0 10px 5px 10px;
        }
      }
      .user-basic-ctt{
        padding: 25px 0;
        overflow: hidden;
        >div{
          width: 20%;
          text-align: center;
        }
        >ul{
          margin-top: 5px;
          width: 80%;
          line-height: 30px;
          height: 30px;
          font-size: 14px;
        }
      }
    }
    .user-safe{
      margin-top: 20px;
      P{
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        background-color: #f8f8f8;
      }
      ul{
        width: 100%;
        li{
          ul{
            display: table;
            height: 60px;
            font-size: 14px;
            li{
              display: table-cell;
              vertical-align: middle;
              text-align: center;
            }
            li.one{
              width: 30%;
            }
            li.two{
              width: 50%;
              text-align: left;
            }
            li.three{
              width: 20%;
            }
          }
        }
      }
    }
  }
  .personal-box {
    .personal-sel-top {
      border-bottom: 1px solid #FF845B;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: #FF845B;
        color: #fff;
      }
    }
    .personal-sel-box {
      .verified-box{
        width: 830px;
        margin: 30px auto auto auto;
        .verified-form{
          margin-top: 20px;
          width: 400px;
          float: left;
          .verified-btn{
            background-color: #FF6865;
            color: #fff;
          }
        }
        .verified-cue{
          p{
            height: 36px;
            line-height: 36px;
            margin-bottom: 21px;
            margin-left: 30px;
            a{
              margin-right: 30px;
            }
          }
        }
        .error-result-text{
          margin-left: 116px;
          clear: both;
          font-size: 14px;
        }
        .verified-result{
          p:first-child{
            font-size: 30pt;
            margin: auto;
            width: 500px;
            color: #666;
          }
          p:last-child{
            font-size: 14px;
            margin: 60px auto;
            width: 600px;
            color: #999;
          }
        }
      }
      .ww-account-box{
        .ww-account-list{
          >a{
            margin: 20px 0 20px 10px;
            display: block;
            background-color: #F8F8F8;
            border: 1px solid #E8E8E8;
            color: #666;
            width: 120px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            font-size: 12px;
          }
          .ww-account-title{
            display: table;
            width: 100%;
            background-color: #DDDDDD;
            color: #000;
            height: 38px;
            text-align: center;
            margin-top: 20px;
            li{
              display: table-cell;
              vertical-align: middle;
              width: 20%;
            }
          }
          .ww-account-ctt{
            display: table;
            width: 100%;
            background-color: #FFFFFF;
            color: #999;
            height: 38px;
            border: 1px solid #E2E2E2;
            border-top: none;
            text-align: center;
            li{
              display: table-cell;
              vertical-align: middle;
              word-wrap: break-word;
              word-break: break-all;
              width: 20%;
            }
          }
        }
        .ww-account-bind {
          width: 830px;
          margin: 30px auto auto auto;
          .ww-account-form{
            width: 400px;
            float: left;
            .ww-bind-btn{
              background-color: #FF6865;
              color: #fff
            }
          }
          .ww-account-cue{
            p{
              height: 36px;
              line-height: 36px;
              margin-bottom: 21px;
              margin-left: 30px;
              a{
                margin-right: 30px;
              }
            }
          }
          .error-result-text{
            margin-left: 102px;
            clear: both;
            font-size: 14px;
          }
        }
      }

    }
  }

  .my-account {
    .user-safe {
      margin-top: 20px;
      P {
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        background-color: #f8f8f8;
      }
      ul {
        width: 100%;
        border: 1px solid  #f3f3f3;
        li {
          ul {
            display: table;
            height: 60px;
            font-size: 14px;
            li {
              display: table-cell;
              vertical-align: middle;
              text-align: center;
            }
            li.one {
              width: 30%;
              text-align: left;
              padding-left: 20px;
            }
            li.two {
              width: 50%;
              text-align: left;
            }
            li.three {
              width: 20%;
            }
          }
        }
      }
    }
    .modify-pwd {
      margin-top: 20px;
      font-size: 14px;
      border: 1px solid  #f3f3f3; ;
      padding-bottom: 20px;
      .modify-pwd-sel {
        > P {
          padding: 0 20px;
          height: 36px;
          line-height: 36px;
          background-color: #f8f8f8;
        }
        .sel-box {
          margin-top: 50px;
          > p {
            width: 20%;
            text-align: center;
          }
          > div {
            width: 80%;
            .sel-canal {
              border: 1px solid #E8E8E8;
              width: 500px;
              height: 70px;
              display: table;
              margin-bottom: 15px;
              padding-left: 20px;
              cursor: pointer;
              p {
                display: table-cell;
                vertical-align: middle;
                width: 95%;
              }
            }

          }
        }
      }
    }
  }
</style>
