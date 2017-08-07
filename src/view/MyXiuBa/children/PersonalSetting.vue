<template>
  <div class="personal-box">
    <div class="personal-sel-top">
      <a v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect == myInfoSelect.isSelect}" @click="myInfoSelectsFunc(myInfoSelect)" v-if="myInfoFunc(index)">
        {{myInfoSelect.text}}
      </a>
    </div>
    <div class="personal-sel-box">
      <!--账号信息beg-->
      <div v-show="infoSelect == 'accountInfo'" class="animated fadeIn">
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
                <iButton  style="background-color: #FF6865; color: #fff"
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
              <Form-item label="手持身份证正面面照"  class="ww-info-img">
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
              <Form-item label="手持身份证反面照"  class="ww-info-img" >
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
                <iButton  style="background-color: #FF6865; color: #fff"
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
  //  import {setStorage, getStorage} from '/src/config/utils'
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
    created() {},
    computed: {},
    methods: {
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
        api.wwBindList().then((res) =>{
          if(res.status){
              if(res.statusCode == 201){
                self.showWwBindBox = true;
              }else if(res.statusCode == 200){
                self.wwBindLists = res.data;
                if(self.wwBindLists.length > 0){
                  self.showWwBindBox = false;
                }
              }
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }

        });
      },
      wwBindFunc(){
        if(!(this.wwFormValidate.picUrl == '')){
          if(this.modifyWw){
            api.wwModify({
              alitmAccount: this.wwFormValidate.alitmAccount,
              picUrl: this.wwFormValidate.picUrl[0].src,
              id: this.wwFormValidate.id
            }).then((res) => {
              if(res.status){
                if(res.statusCode == 200){
                  this.remarks = '';
                  self.$Modal.success({
                    content: "亲！提交成功，客服妹子会尽快审核...",
                    onOk:function () {
                      self.wwBindList();
                      self.clearWwInfo();
                    }
                  });
                }
              }else {
                this.$Modal.error({
                  content: res.msg
                });
              }
            })
          }else{
            api.wwBind({
              alitmAccount: this.wwFormValidate.alitmAccount,
              picUrl: this.wwFormValidate.picUrl[0].src,
            }).then((res) => {
              if(res.status){
                if(res.statusCode == 200){
                  self.$Modal.success({
                    content: "亲！提交成功，客服妹子会尽快审核...",
                    onOk:function () {
                      self.wwBindList();
                      self.clearWwInfo();
                    }
                  });
                }
              }else {
                this.$Modal.error({
                  content: res.msg
                });
              }
            })
          }
        }else {
          this.$Modal.warning({
            content: '请上传图片，后提交'
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
      clearWwInfo(){
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
        if(!(this.verifiedValidate.picUrl == '') && !(this.verifiedValidate.reversePicUrl == '')){
          api.verifiedSubmit({
            realname: this.verifiedValidate.realname,
            idcard: this.verifiedValidate.idcard,
            picUrl: this.verifiedValidate.picUrl[0].src,
            reversePicUrl: this.verifiedValidate.reversePicUrl[0].src
          }).then((res) => {
            if(res.status){
              this.verifiedState = this.verifiedStatus.verifiedIng;
            }
          })
        }else {
          this.$Modal.warning({
            content: '请上传图片，后提交'
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
  @import 'src/css/common';
  @import 'src/css/mixin';
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

</style>
