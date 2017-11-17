<template>
  <div>
    <role-top></role-top>
    <!--修改密码-->
    <div class="my-account" >
      <div class="modify-pwd clear" v-show="myAccount.modifyPwd">
        <div class="modify-pwd-sel clear" style="margin: auto; width: 800px;">
          <p>修改登录密码</p>
          <!--<div v-show="myAccountSon.selBox" class="sel-box clear">
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
          </div>-->
          <div v-show="myAccountSon.selDefaultModify" class="sel-phone-modify mt-20">
            <iForm ref="payCustom" :model="payCustom" :rules="payRuleCustom" :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="绑定手机" prop="phone" class="left" style="width: 650px">
                  <iInput type="text" size="large" v-model="payCustom.phone"></iInput>
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
                  <!--<iButton @click="myAccountPwdChangeSon('selBox')">-->
                    <!--返回上一页-->
                  <!--</iButton>-->
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

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, removeStorage} from '@/config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import RoleTop from '@/components/RoleTop.vue'
  import {mapActions,mapMutations} from 'vuex'
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
          modifyPwd:true,
        },
        myAccountSon:{
          selBox:true,
          selDefaultModify:true,
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
        showModifyAvatar: false,
        userData: {},
      }
    },
    mounted() {
    },
    computed: {},
    created() {
      this.getVrcode();
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
        api.noLoginModifyPayPwdCode({
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
        api.noLoginModifyPayPwd({
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

  .my-account {
    .user-safe {
      margin-top: 20px;
      P {
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        /*background-color: #f8f8f8;*/
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
          /*background-color: #f8f8f8;*/
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




