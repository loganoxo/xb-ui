<template>
  <div class="personal-box">
    <div class="personal-sel-box">
      <router-view></router-view>
      <!--旺旺号绑定beg-->
      <div class="ww-account-box animated fadeIn">
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
    name: 'wwBind',
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
      const wwName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if(value.length > 50){
          callback(new Error('旺旺ID过长'))
        } else {
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
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      self.wwBindList()
    },
    computed: {},
    methods: {
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
            if(res.statusCode === 'have_waiting_audit_apply'){
              res.msg = '亲，该旺旺还有试用任务正在审核中，请完成该旺旺的所有任务后再进行解绑操作！';
            }else if(res.statusCode === 'have_under_way_showker_task'){
              res.msg = '亲，该旺旺还有试用任务正在进行中，请完成该旺旺的所有任务后再进行解绑操作！';
            }
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
        if((this.wwBindLists && this.wwBindLists.length < 3) || !this.wwBindLists){
          this.showWwBindBox = true;
          this.wwFormValidate.id = '';
          this.wwFormValidate.alitmAccount = '';
          this.wwFormValidate.picUrl = [];
          this.remarks.text = '';
          this.modifyWw = false;
        }else {
          console.log(this.wwBindLists);
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
            if(res.statusCode == 'success_but_not_any_alitm'){
              self.showWwBindBox = true;
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
        if(!(self.wwFormValidate.picUrl === '')){
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
                    self.showWwBindBox = false;
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
                    self.showWwBindBox = false;
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
      removewwBindPicUrl(){
        this.wwFormValidate.picUrl= [];
      },
      clearWwInfo (){
        this.wwFormValidate.alitmAccount = '';
        let child = this.$refs;
        child.upload.handleRemove();
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
