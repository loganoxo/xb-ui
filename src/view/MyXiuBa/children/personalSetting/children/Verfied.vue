<template>
  <div class="personal-box">
    <div class="personal-sel-box">
      <router-view></router-view>
      <!--实名认证beg-->
      <div  class="verified-box animated fadeIn">
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
  import Input from '@/components/Input'
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
    name: 'verified',
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
        userData: {},
        btnState: {
          wwBindBtn: false,
          verifiedBtn: false,
        },
        showWwBindBox: false,
        modifyWw: false,
        remarks: {
          text: '',
          auditTime: '',
        },
        demoShow: false,
        imgDemoUrl:{
          taobaoAccountDemo: false,
          taobaoAccountInfo: false,
          picUrl: false,
          reversePicUrl: false,
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
      let self = this;
      self.verifiedInit();
    },
    computed: {},
    methods: {
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
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
      clearVerified(){
        this.verifiedValidate.realname = '';
        this.verifiedValidate.idcard = '';
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
