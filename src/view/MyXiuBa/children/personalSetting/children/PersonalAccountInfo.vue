<template>
  <!--账号信息beg-->
  <div class="user-info-box">
    <div class="user-basic">
      <p class="fs-14 user-basic-title">基本信息</p>
      <div class="user-basic-ctt clear">
        <div class="text-ct left" :style="{marginTop:userList.role === 0 ? 20 +'px' : 8 + 'px'}">
          <img class="block mg-at border50" :src="userHeadUrl" alt="" width="86" height="86">
          <picture-upload field="pictureUploadImage"
                          @crop-success="cropSuccess"
                          v-model="showPictureUpload"
                          :width="120"
                          :height="120"
                          :max-size="300"
                          :lang-ext="langExt"
                          img-format="png">
          </picture-upload>
        </div>
        <ul class="left">
          <li>
            手机帐号：{{userList.phone}}
          </li>
          <li v-if="userList.role === 0">
            <p v-if="userList.alitmNum <= 0 ">
              绑定淘宝账号：未绑定 -
              <router-link to="/user/personal-setting/ww-bind">马上绑定</router-link>
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
      </div>
      <div class="edit-head">
        <a class="fs-14 mt-10" @click="toggleShow">修改头像</a>
        <span>（上传自定义个性头像，可以提高活动申请通过率哦）</span>
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
              <a @click="myAccountPwdChangeFather('modifyPwd')">去修改</a>
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
    <div class="my-account">
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
                <div @click="myAccountPwdChangeSon('selPhoneModify')" class="sel-canal">
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
            <iForm ref="defaultModifyCustom" :model="defaultModifyCustom" :rules="defaultModifyRuleCustom"
                   :label-width="400">
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
                  <iButton :disabled="defaultModifyBtnState"
                           @click="handleSubmit('defaultModifyCustom',modifyDefaultPwdFunc)">
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
                <Form-item label="图形验证码" prop="validateCode" class="left" style="width: 550px">
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
            <iForm ref="trendsModifyCustom" :model="trendsModifyCustom" :rules="trendsModifyRuleCustom"
                   :label-width="400">
              <div class="clear form-input-box">
                <Form-item label="新密码" prop="pwd" class="left" style="width: 650px">
                  <iInput type="password" size="large" v-model="trendsModifyCustom.pwd"></iInput>
                </Form-item>
              </div>
              <div class="clear form-input-box">
                <Form-item label="确认新密码" class="left" style="width: 650px" prop="repwd">
                  <iInput type="password" size="large" v-model="trendsModifyCustom.repwd"></iInput>
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
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import Alert from 'iview/src/components/alert'
  import pictureUpload from 'vue-image-crop-upload';
  import api from '@/config/apiConfig'
  import Upload from '@/components/upload'
  import {setStorage, getStorage, aliUploadImgBuffer, randomString} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import SmsCountdown from '@/components/SmsCountdown'

  export default {
    name: 'personalAccountInfo',
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
      pictureUpload: pictureUpload,
    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
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
        myAccount: {
          userSafe: true,
          modifyPwd: false,
        },
        myAccountSon: {
          selBox: true,
          selDefaultModify: false,
          selPhoneModify: false,
          modifyPwd: false
        },
        imgSrc: null,
        defaultModifyBtnState: false,
        trendsModifyBtnState: false,
        trendsModifyBtnState2: false,
        payCustom: {
          phone: this.$store.state.userInfo.phone,
          validateCode: '',
          purpose: 'forget',
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
        trendsModifyCustom: {
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
        userData: {},
        showPictureUpload: false,
        pictureUploadImage: null,
        langExt: {
          hint: '点击，或拖动图片至此处,支持jpg/jpeg/png/gif/bmp格式，大小不超过300K',
          noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
          btn: {
            off: '取消',
            close: '关闭',
            back: '上一步',
            save: '保存'
          },
          error: {
            onlyImg: '亲，仅限上传jpg/jpeg/png/gif/bmp格式图片格式',
            outOfSize: '单文件大小不能超过',
            lowestPx: '图片最低像素为（宽*高）：'
          }
        }
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      let from = self.$route.query.from;
      if (from && from === 'userHome') {
        self.toggleShow();
      }
      self.getVrcode();
      self.$store.dispatch('getUserInformation');
    },
    computed: {
      userAccount() {
        return this.$store.getters.getUserAccountInfo || {}
      },
      userList() {
        return this.$store.getters.getPersonalInfo || {}
      },
      userBalance() {
        return this.$store.getters.getUserBalance
      },
      isEditPwdAlready() {
        return this.$store.getters.getIsEditPwdAlready
      },
      userHeadUrl() {
        return this.$store.getters.getUserHeadUrl
      }
    },
    methods: {
      cropSuccess(imgDataUrl, field) {
        let _this = this;
        let reg = new RegExp(/^data:image\/\w+;base64,/);
        let dataBuffer = new Buffer(imgDataUrl.replace(reg, ''), 'base64');
        let key = 'head-image' + '/' + randomString();
        aliUploadImgBuffer(key, dataBuffer).then(res => {
          if (res) {
            _this.pictureUploadImage = res.name;
            _this.modifyPortraitPic();
          }
        })
      },
      toggleShow() {
        this.showPictureUpload = !this.showPictureUpload;
      },
      myAccountPwdChangeFather(type) {
        for (let k in this.myAccount) {
          this.myAccount[k] = k === type;
        }
      },
      myAccountPwdChangeSon(type) {
        for (let k in this.myAccountSon) {
          this.myAccountSon[k] = k === type;
        }
      },
      modifyPortraitPic() {
        let _this = this;
        api.modifyPortraitPic({
          picStr: _this.pictureUploadImage
        }).then((res) => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      modifyDefaultPwdFunc() {
        let self = this;
        self.defaultModifyBtnState = true;
        api.modifyDefaultPwd({
          oldPwd: self.defaultModifyCustom.oldPwd,
          newPwd: self.defaultModifyCustom.newPwd,
          repwd: self.defaultModifyCustom.repwd
        }).then((res) => {
          self.defaultModifyBtnState = false;
          if (res.status) {
            self.$Message.success({
              top: 50,
              content: res.msg,
              duration: 1,
              onClose: function () {
                self.$router.go(-1);
                self.$store.dispatch('getUserInformation');
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
      modifyPwdFunc() {
        let self = this;
        self.trendsModifyBtnState2 = true;
        api.validatePaySmscode({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
        }).then((res) => {
          self.trendsModifyBtnState2 = false;
          if (res.status) {
            self.myAccountPwdChangeSon('modifyPwd');
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
            self.getVrcode();
          }
        });
      },
      modifyFinishPwdFunc() {
        let self = this;
        self.trendsModifyBtnState = true;
        api.modifyTrendsPwd({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
          pwd: self.trendsModifyCustom.pwd,
          repwd: self.trendsModifyCustom.repwd,
        }).then(res => {
          self.trendsModifyBtnState = false;
          if (res.status) {
            self.$Message.success({
              top: 50,
              content: res.msg,
              duration: 1,
              onClose: function () {
                self.$router.go(-1);
                self.getUserInformation();
              }
            });
          } else {
            self.$Message.error(res.msg);
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
          self.$Message.error(res.msg);
          self.getVrcode();
        }
      },
      myInfoFunc(index) {
        if (index === 1) {
          return this.$store.state.userInfo.role !== 1;
        } else {
          return true;
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
      handleReset(name, callback) {
        this.$refs[name].resetFields();
        if (typeof callback === 'function') {
          callback();
        }
      },
    }
  }
</script>
