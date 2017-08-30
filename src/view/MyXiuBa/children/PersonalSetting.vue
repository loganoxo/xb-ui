<template>
  <div class="personal-box">
    <div class="personal-sel-top">
      <a v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect == myInfoSelect.isSelect}" @click="myInfoSelectsFunc(myInfoSelect)" v-if="myInfoFunc(index)">
        {{myInfoSelect.text}}
      </a>
    </div>
    <div class="personal-sel-box">
      <!--账号信息beg-->
      <div v-show="infoSelect == 'accountInfo'" class="user-info-box animated fadeIn">
        <div class="user-basic">
          <p class="fs-14 user-basic-title">基本信息</p>
          <div class="user-basic-ctt">
            <div class="text-ct left">
              <img class="block mg-at" :src="defaultAvatar" alt="" style="width: 120px;">
              <a class="fs-14 block mt-10" @click="selPortraitPic">修改头像</a>
            </div>
            <ul v-show="!showModifyAvatar" class="left">
              <li>
                手机帐号： {{userData.phone}}
              </li>
              <li>
                <p v-if="userData.alitmNum <= 0 ">
                  绑定淘宝账号：未绑定 - <a @click="myInfoSelectsFunc(myInfoSelects[1])">马上绑定</a>
                </p>
                <p v-else>
                  绑定淘宝账号：<a>已绑定</a>
                </p>
              </li>
              <li>
                <p v-if="Boolean(userData.ifCertification)">
                  实名认证：<a>已认证</a>
                </p>
                <p v-else>
                  实名认证：未认证 - <a @click="myInfoSelectsFunc(myInfoSelects[2])">马上认证</a>
                </p>
              </li>
              <li>
                注册时间：{{userData.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}
              </li>
            </ul>
            <p v-show="showModifyAvatar" class="img-box">
              <!--<img :src="avatar.src" alt="" style="width: 68px;" v-for="avatar in avatars">-->
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
                  未设置
                  <span>(同登录密码)</span>
                </li>
                <li class="three">
                  <a href="">去设置</a>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li class="one">
                  提现账号
                </li>
                <li class="two">
                  未设置
                  <span>(同登录密码)</span>
                </li>
                <li class="three">
                  <a href="">去设置</a>
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
                      <iButton @click="handleSubmit('defaultModifyCustom',modifyDefaultPwdFunc)">
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
                      <iInput type="text" size="large" v-model="payCustom.phone" ></iInput>
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
                    <Form-item label="手机验证码" class="left pos-rel" style="width: 650px">
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
                      <iButton @click="handleSubmit('payCustom',modifyPwdFunc)">
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
                      <iInput type="password" size="large" v-model="trendsModifyCustom.repwd"></iInput>
                    </Form-item>
                  </div>
                  <div>
                    <Form-item>
                      <iButton @click="handleSubmit('payCustom',modifyFinishPwdFunc)">
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

      <!--旺旺号绑定beg-->
      <div v-show="infoSelect == 'wwBind'" class="ww-account-box animated fadeIn">
        <div v-show="!showWwBindBox" class="ww-account-list">
          <a @click = addWwBindFunc>添加新旺旺号</a>
          <ul class="ww-account-title">
            <li>已绑定旺旺号</li>
            <li>绑定时间</li>
            <li>个人信息截图</li>
            <li>绑定状态</li>
            <li>操作</li>
          </ul>
          <div>
            <ul class="ww-account-ctt" v-for="(ww, index) in wwBindLists">
              <li>{{ww.alitmAccount}}</li>
              <li>{{ww.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</li>
              <li><img :src="ww.picUrl" alt="" style="width: 50px; padding: 10px;"></li>
              <li>
                <span v-show="ww.status == 1" >审核中</span>
                <span v-show="ww.status == 2" >启用中</span>
                <span v-show="ww.status == 3" >审核不通过</span>

              </li>
              <li>
                <a v-show="ww.status == 2" @click="deleteWwBindFunc(ww,index)">解绑</a>
                <a v-show="ww.status == 3" @click="modifyWwBindFunc(ww,index)">重新提交</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="ww-account-bind" v-if="showWwBindBox">
          <Alert  v-show="remarks.text"  type="warning" show-icon>
            审核不通过： {{remarks.text}},请重新提交（{{remarks.auditTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}）
          </Alert>
          <div class="ww-account-form mt-20">
            <iForm ref="wwFormValidate" :model="wwFormValidate" :rules="wwFormRuleCustom" label-position="right" :label-width="100">
              <Form-item label="旺旺ID" prop="alitmAccount">
                <iInput v-model="wwFormValidate.alitmAccount"></iInput>
              </Form-item>
              <Form-item label="旺旺信息截图"  class="ww-info-img">
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handlewwBindPicUrlSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="2000"
                  :default-file-list="wwFormValidate.picUrl"
                  name="wwBind"
                  :on-remove = "removewwBindPicUrl"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
              </Form-item>
              <Form-item>
                <iButton  :class="[btnState.wwBindBtn ? '': 'ww-bind-btn']"  :disabled="btnState.wwBindBtn"
                          @click="handleSubmit('wwFormValidate',wwBindFunc)">提交
                  </iButton>
                <iButton type="ghost" @click="handleReset('wwFormValidate',clearWwInfo)">重置</iButton>
              </Form-item>
              <p class="tip clear" style="margin-left: 102px;width: 600px;line-height: 30px;font-size: 14px;color: #999;padding-bottom: 30px;">
               1.支持jpg/jpeg/gif/bmp/png格式，最大不超过2M
              </p>
            </iForm>

          </div>
          <div class="left ww-account-cue mt-20">
            <p>
              <a @click="demoShow = true, imgDemoUrl.picUrl = false,imgDemoUrl.reversePicUrl = false,imgDemoUrl.taobaoAccountInfo = false,imgDemoUrl.taobaoAccountDemo = true;">什么是旺旺ID号？</a>
            </p>
            <p>
              <a @click="demoShow = true, imgDemoUrl.picUrl = false,imgDemoUrl.reversePicUrl = false,imgDemoUrl.taobaoAccountInfo = true,imgDemoUrl.taobaoAccountDemo = false;">[查看示例截图]</a>
            </p>
          </div>
        </div>
      </div>
      <!--旺旺号绑定end-->

      <!--实名认证beg-->
      <div v-show="infoSelect == 'verified'" class="verified-box animated fadeIn">

        <div v-if="verifiedState == verifiedStatus.verifiedBeg || verifiedState == verifiedStatus.verifiedFailed">
          <!--<Alert v-show="verifiedState == verifiedStatus.verifiedFailed" type="warning" show-icon>审核不通过：</Alert>-->
          <Alert  v-show="verifiedState == verifiedStatus.verifiedFailed"  type="warning" show-icon>
            审核不通过： {{verified.assessReason}},请重新提交！({{verified.auditTime |  dateFormat('YYYY-MM-DD hh:mm:ss')}})
          </Alert>
          <div class="verified-form">
            <iForm ref="verifiedValidate" :model="verifiedValidate" :rules="verifiedRuleCustom" label-position="right" :label-width="120">
              <Form-item label="真实姓名" prop="realname">
                <iInput v-model="verifiedValidate.realname"></iInput>
              </Form-item>
              <Form-item label="身份证号"  class="ww-info-img" prop="idcard">
                <iInput v-model="verifiedValidate.idcard"></iInput>
              </Form-item>
              <Form-item label="手持身份证正面面照"  class="ww-info-img" >
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handlePicUrlSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="2000"
                  name="picUrl"
                  :default-file-list="verifiedValidate.picUrl"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-remove = "removeVerifiedPicUrl"
                  :before-upload="handleBeforeUpload"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
              </Form-item>
              <Form-item label="手持身份证反面照"  class="ww-info-img">
                <Upload
                  ref="upload2"
                  name="reversePicUrl"
                  :show-upload-list="false"
                  :on-success="handleReversePicUrlSuccess"
                  :default-file-list="verifiedValidate.reversePicUrl"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="2000"
                  :on-remove = "removeVerifiedReversePicUrl"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
              </Form-item>
              <p class="tip clear" style="margin-left: 116px;width: 600px;line-height: 30px;font-size: 14px;color: #999;padding-bottom: 30px;">
                1.需身份证本人手持证件，照片需免冠，建议未化妆
                <br>
                2.照片需五官清晰可见
                <br>
                3.身份证上的信息需无遮挡，且清晰可见
                <br>
                4.照片需露出手臂，照片请勿进行任何软件处理
                <br>
                5.支持jpg/jpeg/gif/bmp/png格式，最大不超过2M
                <br>
              </p>
              <Form-item>
                <iButton :class="[btnState.verifiedBtn ? '' : 'verified-btn']"  :disabled="btnState.verifiedBtn"
                          @click="handleSubmit('verifiedValidate',verifiedFunc)">提交
                </iButton>
                <iButton type="ghost" @click="handleReset('verifiedValidate',clearVerified)">重置</iButton>
              </Form-item>
            </iForm>
          </div>
          <div class="left mt-20 verified-cue">
            <p>
            </p>
            <p>
            </p>
            <p>
              <a @click="demoShow = true, imgDemoUrl.taobaoAccountDemo = false,imgDemoUrl.taobaoAccountInfo = false,imgDemoUrl.picUrl = true,imgDemoUrl.reversePicUrl = false;">[查看示例截图]</a>
            </p>
            <p>
              <a @click="demoShow = true, imgDemoUrl.taobaoAccountDemo = false,imgDemoUrl.taobaoAccountInfo = false,imgDemoUrl.picUrl = false,imgDemoUrl.reversePicUrl = true;">[查看示例截图]</a>
            </p>
          </div>
          <!--<p class="error-result-text clear" >审核不通过：{{verified.assessReason}}</p>-->

        </div>
        <div class="verified-result mt-80" v-if="verifiedState == verifiedStatus.verifiedIng">
          <p class="text-ct">
            <img src="~assets/img/common/right_64.png" alt="" class="vtc-btm">
            实名认证已提交
          </p>
          <p  class="text-ct">亲当前的实名认证已提交，工作人员会在一个工作日内审核你的活动，敬请关注！</p>

        </div>
        <div class="verified-result mt-80" v-if=" verifiedState == verifiedStatus.verifiedSuccess">
          <p class="text-ct">
            <img src="~assets/img/common/right_64.png" alt="" class="vtc-btm">
            实名已认证
          </p>
          <p  class="text-ct">亲当前已是实名认证用户了~</p>
        </div>
      </div>
      <!--实名认证end-->
    </div>

    <Modal v-model="demoShow" width="900">
      <div style="text-align:center">
        <img v-show="imgDemoUrl.taobaoAccountDemo" src="~assets/img/case-demo/taobao-account-demo.jpg" alt="" style="width: 100%;margin-top: 20px;">
        <img v-show="imgDemoUrl.taobaoAccountInfo" src="~assets/img/case-demo/taobao-account-info.png" alt="" style="width: 100%;margin-top: 20px;">
        <img v-show="imgDemoUrl.picUrl" src="~assets/img/case-demo/sfza.jpg" alt="" style="width: 100%;margin-top: 20px;">
        <img v-show="imgDemoUrl.reversePicUrl" src="~assets/img/case-demo/sfzb.jpg" alt="" style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">

      </div>
    </Modal>
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
  export default {
    name: 'TaskReleaseProcess',
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
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if(!/^[\u4E00-\u9FA5]+$/.test(value)){
          callback(new Error('姓名只能为中文'))
        } else if(value.length > 10){
          callback(new Error('姓名最多为10个汉字'))
        } else{
          callback()
        }
      };
      const wwName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if(value.length > 50){
          callback(new Error('旺旺ID过长'))
        } else {
          callback()
        }
      };
      const validateNameNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写身份证号'));
        } else if(!/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)) {
          callback(new Error('身份证填写有误'))
        }else {
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
        payCustom: {
          phone: null,
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
        defaultAvatar: '',
        showModifyAvatar: false,
        userData: {},
        btnState: {
          wwBindBtn: false,
          verifiedBtn: false,
        },
        myInfoSelects: [
          {
            text: '账号信息',
            isSelect: 'accountInfo',
            callback: this.verifiedInit
          },
          {
            text: '旺旺号绑定',
            isSelect: 'wwBind',
            callback: this.wwBindList
          },
          {
            text: '实名认证',
            isSelect: 'verified',
            callback: this.verifiedInit
          },
        ],
        showWwBindBox: false,
        modifyWw: false,
        remarks: {
            text: '',
            auditTime: '',
        },
        demoShow: false,
        infoSelect: 'accountInfo',
        imgDemoUrl:{
          taobaoAccountDemo: false,
          taobaoAccountInfo: false,
          picUrl: false,
          reversePicUrl: false,
        },
        wwBindLists: [],
        wwFormValidate: {
          alitmAccount: '',
          picUrl: [],
        },
        wwFormRuleCustom: {
          alitmAccount: [
            {validator: wwName, trigger: 'blur'},
          ],
        },
        verified:{},
        verifiedState: '',
        verifiedStatus:{
          verifiedBeg: 10,
          verifiedIng: 1,
          verifiedSuccess: 2,
          verifiedFailed: 3
        },
        verifiedValidate: {
          realname: '',
          idcard: '',
          picUrl: [],
          reversePicUrl: []
        },
        verifiedRuleCustom: {
          realname: [
            {validator: validateName, trigger: 'blur'},
          ],
          idcard: [
            {validator: validateNameNum, trigger: 'blur'}
          ],
        },
      }
    },
    mounted() {

    },
    created() {
      this.getVrcode();
      this.getUserAccount();
    },
    computed: {},
    methods: {
      myAccountPwdChangeFather(type){
        for( var k in this.myAccount){
          if (k===type){
            this.myAccount[k]=true
          }else {
            this.myAccount[k]=false
          }
        }
      },
      myAccountPwdChangeSon(type){
        for( var k in this.myAccountSon){
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
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res) {
          callback();
        }
      },
      modifyDefaultPwdFunc(){
        let self = this;
        api.modifyDefaultPwd({
          oldPwd: self.defaultModifyCustom.oldPwd,
          newPwd: self.defaultModifyCustom.newPwd,
          repwd: self.defaultModifyCustom.repwd
        }).then((res) => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({path: '/login'});
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      modifyPwdFunc(){
        let self = this;
        api.validatePaySmscode({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
        }).then((res) => {
          if(res.status){
            self.myAccountPwdChangeSon('modifyPwd');
          }else {
            self.$Modal.error({
              content: res.msg
            });
            self.getVrcode();
          }
        });
      },
      modifyFinishPwdFunc(){
        let self = this;
        api.modifyTrendsPwd({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
          pwd: self.trendsModifyCustom.pwd,
          repwd: self.trendsModifyCustom.repwd,
        }).then(res => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.push({path: '/login'});
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
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
          self.$Modal.success({
            content: res.msg
          });
        } else {
          self.$Modal.error({
            content: res.msg
          });
          self.getVrcode();
        }
      },
      getUserAccount(){
        let self = this;
        api.getUserAccount().then((res) => {
          if(res.status){
            self.userData = res.data;
            self.defaultAvatar = res.data.portraitPic
          }
        })
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
      modifyPortraitPic(avatar){
        this.defaultAvatar = avatar.src;
        api.modifyPortraitPic({
          picStr: this.defaultAvatar
        }).then((res) => {
          if(res.status){
            this.showModifyAvatar = false;
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      deleteWwBindFunc(ww,index){
        let self = this;
        api.wwUnbind({id: ww.id}).then((res) => {
            if(res.status){
              self.$Modal.success({
                content: res.msg
              });
              self.wwBindLists.splice(index, 1);
              self.$set(self.wwBindLists);
            }else {
              self.$Modal.error({
                content: res.msg
              });
            }
        })
      },
      modifyWwBindFunc(ww,index){
        this.showWwBindBox = true;
        this.wwFormValidate.id = ww.id;
        this.wwFormValidate.alitmAccount = ww.alitmAccount;
        this.wwFormValidate.picUrl = [{
          src: ww.picUrl,
        }];
        this.remarks.text = ww.remarks;
        this.remarks.auditTime = ww.auditTime;
        this.modifyWw = true;
      },
      addWwBindFunc (){
        if(this.wwBindLists.length < 3){
          this.showWwBindBox = true;
          this.wwFormValidate.id = '';
          this.wwFormValidate.alitmAccount = '';
          this.wwFormValidate.picUrl = [];
          this.remarks.text = '';
          this.modifyWw = false;
        }else {
          this.$Modal.warning({
            content: "亲, 最多只能绑定3个旺旺号"
          });
        }
      },
      wwBindList () {
        let self = this;
        api.wwBindList().then((res) => {
          if (res.status) {
            self.wwBindLists = res.data;
            debugger
            if(self.wwBindLists == '') {
              self.showWwBindBox = true;
            }else {
              self.showWwBindBox = false;
            }
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        });
      },
      wwBindFunc(){
        let self = this;
        if(!(self.wwFormValidate.picUrl == '')){
          self.btnState.wwBindBtn = true;
          if(self.modifyWw){
            api.wwModify({
              alitmAccount: self.wwFormValidate.alitmAccount,
              picUrl: self.wwFormValidate.picUrl[0].src,
              id: self.wwFormValidate.id
            }).then((res) => {
              if(res.status){
                  self.remarks = '';
                  self.$Modal.success({
                    content: "亲！提交成功，客服妹子会尽快审核...",
                    onOk:function () {
                      self.wwBindList();
                      self.clearWwInfo();
                    }
                  });
              }else {
                self.$Modal.error({
                  content: res.msg
                });
              }
              self.btnState.wwBindBtn = false;
            })
          }else{
            api.wwBind({
              alitmAccount: this.wwFormValidate.alitmAccount,
              picUrl: this.wwFormValidate.picUrl[0].src,
            }).then((res) => {
              if(res.status){
                  self.$Modal.success({
                    content: "亲！提交成功，客服妹子会尽快审核...",
                    onOk:function () {
                      self.wwBindList();
                      self.clearWwInfo();
                    }
                  });
              }else {
                this.$Modal.error({
                  content: res.msg
                });
              }
              self.btnState.wwBindBtn = false;
            })
          }
        }else {
          this.$Modal.warning({
            content: '请上传所有图片'
          });
        }
      },
      verifiedInit(){
        let self = this;
        api.verifiedInit().then((res) => {
          self.verified = res;
          self.verifiedState = res.status;
          if(self.verified.assessReason){
            self.verifiedValidate.realname = self.verified.realname;
            self.verifiedValidate.idcard = self.verified.idcard;
            self.verifiedValidate.picUrl = [
              {
                  src: res.picUrl
              }
            ];
            self.verifiedValidate.reversePicUrl =  [
              {
                src: res.reversePicUrl
              }
            ];
          }
          if(!self.verifiedState){
            self.verifiedState = 10;
          }
        })
      },
      removeVerifiedPicUrl(){
        this.verifiedValidate.picUrl= [];
      },
      removeVerifiedReversePicUrl(){
        this.verifiedValidate.reversePicUrl= [];
      },
      removewwBindPicUrl(){
        this.wwFormValidate.picUrl= [];
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
      clearWwInfo (){
        this.wwFormValidate.alitmAccount = '';
        let child = this.$refs;
        child.upload.handleRemove();
      },
      clearVerified(){
        this.verifiedValidate.realname = '';
        this.verifiedValidate.idcard = '';
        let child = this.$refs;
        this.$refs.upload.handleRemove();
        this.$refs.upload2.handleRemove();
      },
      verifiedFunc(){
        let self = this;
        if(!(self.verifiedValidate.picUrl == '') && !(self.verifiedValidate.reversePicUrl == '')){
          self.btnState.verifiedBtn = true;
          api.verifiedSubmit({
            realname: self.verifiedValidate.realname,
            idcard: self.verifiedValidate.idcard,
            picUrl: self.verifiedValidate.picUrl[0].src,
            reversePicUrl: self.verifiedValidate.reversePicUrl[0].src
          }).then((res) => {
            if(res.status){
              self.verifiedState = self.verifiedStatus.verifiedIng;
            }else {
              self.$Modal.warning({
                content: res.msg
              });
            }
            self.btnState.verifiedBtn = false;
          })
        }else {
          this.$Modal.warning({
            content: '请上传所有图片'
          });
        }

      },
      handleReset(name,callback) {
        this.$refs[name].resetFields();
        if (typeof callback === 'function') {
          callback();
        }
      },

      handlewwBindPicUrlSuccess(res, file){
        this.wwFormValidate.picUrl = [{
          src: aliCallbackImgUrl + res.name
        }];
      },
      handlePicUrlSuccess(res, file) {
        this.verifiedValidate.picUrl.push({
          src: aliCallbackImgUrl + res.name
        });
      },
      handleReversePicUrlSuccess(res,file){
        this.verifiedValidate.reversePicUrl.push({
          src: aliCallbackImgUrl + res.name
        });
      },
      handleFormatError(file) {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: '图片 ' + file.name + ' 太大，不能超过 2M'
        });
      },
      handleBeforeUpload() {
        /* const check = this.mainUploadList.length < 1;
         if (!check) {
         this.$Modal.warning({
         title: '最多只能上传 1 张图片。'
         });
         }
         return check;*/
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
