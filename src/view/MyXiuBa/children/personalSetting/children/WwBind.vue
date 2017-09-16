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
              <li>
                <p>{{ww.alitmAccount}}</p>
                <p v-if="ww.creditLevel"><img :src="ww.creditLevel" alt="" style="width: auto;height: auto;"></p>
                <p v-if="ww.tqz">淘气值：{{ww.tqz}}</p>
              </li>
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
            <iForm ref="wwFormValidate" :model="wwFormValidate" :rules="wwFormRuleCustom" label-position="right" :label-width="130">
              <Form-item label="旺旺ID：" prop="alitmAccount">
                <iInput v-model="wwFormValidate.alitmAccount"></iInput>
              </Form-item>
              <Form-item label="旺旺号信用等级：" prop="alitmLevel">
                <iSelect v-model="wwFormValidate.alitmLevel">
                  <iOption v-for="taobaoLevelImg in taobaoLevelImgs" :label='taobaoLevelImg.label' :value="taobaoLevelImg.value" :key="taobaoLevelImg.value">
                    <img :src="taobaoLevelImg.text" alt="">
                  </iOption>
                </iSelect>
              </Form-item>
              <Form-item label="旺旺信用等级截图：" prop="alitmLevelPicUrl"  class="ww-info-img">
                <Upload
                  ref="uploadAlitmLevelPicUrl"
                  :show-upload-list="false"
                  :on-success="handlewwBindAlitmLevelPicUrlSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="2000"
                  :default-file-list="wwFormValidate.alitmLevelPicUrl"
                  name="wwBind"
                  :on-remove = "removewwBindAlitmLevelPicUrl"
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
                截图位置：我的淘宝->评价管理
              </Form-item>
              <Form-item label="账号信息截图："  prop="picUrl" class="ww-info-img">
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
                截图位置：我的淘宝->账户设置->安全设置
              </Form-item>
              <Form-item label="淘气值：" prop="taoqizhi">
                <iSelect v-model="wwFormValidate.taoqizhi">
                  <iOption v-for="taoqizhi in taoqizhiList" :label='taoqizhi.label' :value="taoqizhi.value" :key="taoqizhi.value">
                    {{taoqizhi.label}}
                  </iOption>
                </iSelect>
              </Form-item>
              <Form-item label="淘气值截图：" prop="taoqizhiPicUrl" class="ww-info-img">
                <Upload
                  ref="uploadTaoqizhiPicUrl"
                  :show-upload-list="false"
                  :on-success="handlewwBindtaoqizhiPicUrlSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="2000"
                  :default-file-list="wwFormValidate.taoqizhiPicUrl"
                  name="wwBind"
                  :on-remove = "removewwBindtaoqizhiPicUrl"
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
                截图位置：手机App->我的淘宝
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
              <a @click="changeDemoPicFunc(demoUrl.wwAccount);">什么是旺旺ID号？</a>
            </p>
            <p>

            </p>
            <p>
              <a @click="changeDemoPicFunc(demoUrl.wwLevel)">[查看示例截图]</a>
            </p>
            <p>

            </p>
            <p class="mt-50">
              <a @click="changeDemoPicFunc(demoUrl.wwAccountInfo)">[查看示例截图]</a>
            </p>
            <p>

            </p>
            <p>

            </p>
            <p class="mt-40">
              <a @click="changeDemoPicFunc(demoUrl.taoqi)">[查看示例截图]</a>
            </p>
          </div>
        </div>
      </div>
      <!--旺旺号绑定end-->
    </div>
    <!--删除任务弹框-->
    <Modal  v-model="deleteWwModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div class="text-ct">
        <p>解绑后该旺旺将从亲的账号中删除，</p>
        <p>是否确认解绑？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="confirmDelete">删除</iButton>
      </div>
    </Modal>
    <Modal v-model="demoShow" width="900">
      <div style="text-align:center">
        <img :src="demoShowPic" alt="" style="width: 100%; margin-top: 20px">
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
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
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
      iSelect: Select,
      iOption: Option,
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
        modalLoading: false,
        deleteWwModal: false,
        deleteWwId: '',
        taobaoLevelImgs: [
          {
            value: 1,
            text: 'https://img.alicdn.com/newrank/b_red_1.gif',
            label: '1心'
          },
          {
            value: 2,
            text: 'https://img.alicdn.com/newrank/b_red_2.gif',
            label: '2心'
          },
          {
            value: 3,
            text: 'https://img.alicdn.com/newrank/b_red_3.gif',
            label: '3心'
          },
          {
            value: 4,
            text: 'https://img.alicdn.com/newrank/b_red_4.gif',
            label: '4心'
          },
          {
            value: 5,
            text: 'https://img.alicdn.com/newrank/b_red_5.gif',
            label: '5心'
          },
          {
            value: 6,
            text: 'https://img.alicdn.com/newrank/b_blue_1.gif',
            label: '1钻'
          },
          {
            value: 7,
            text: 'https://img.alicdn.com/newrank/b_blue_2.gif',
            label: '2钻'
          },
          {
            value: 8,
            text: 'https://img.alicdn.com/newrank/b_blue_3.gif',
            label: '3钻'
          },
          {
            value: 9,
            text: 'https://img.alicdn.com/newrank/b_blue_4.gif',
            label: '4钻'
          },
          {
            value: 10,
            text: 'https://img.alicdn.com/newrank/b_blue_5.gif',
            label: '5钻'
          },
          {
            value: 11,
            text: 'https://img.alicdn.com/newrank/s_crown_1.gif',
            label: '1皇冠'
          },
          {
            value: 12,
            text: 'https://img.alicdn.com/newrank/s_crown_2.gif',
            label: '2皇冠'
          },
          {
            value: 13,
            text: 'https://img.alicdn.com/newrank/s_crown_3.gif',
            label: '3皇冠'
          },
          {
            value: 14,
            text: 'https://img.alicdn.com/newrank/s_crown_4.gif',
            label: '4皇冠'
          },
          {
            value: 15,
            text: 'https://img.alicdn.com/newrank/s_crown_5.gif',
            label: '5皇冠'
          },
        ],
        taoqizhiList: [
          {
            value: 1,
            label: '0-199'
          },
          {
            value: 2,
            label: '200-399'
          },
          {
            value: 3,
            label: '400-599'
          },
          {
            value: 4,
            label: '600-799'
          },
          {
            value: 5,
            label: '800-999'
          },
          {
            value: 6,
            label: '1000-1999'
          },
          {
            value: 7,
            label: '2000-2499'
          },
          {
            value: 8,
            label: '2500以上'
          },
        ],
        userData: {},
        demoShowPic: '',
        demoShow: false,
        demoUrl: {
            wwAccount: '/static/img/demo/ww-bind/taobao-account-demo.jpg',
            wwAccountInfo: '/static/img/demo/ww-bind/taobao-account-info.png',
            taoqi: '/static/img/demo/ww-bind/taoqi_demo.jpg',
            wwLevel: '/static/img/demo/ww-bind/ww_level_demo.png'
        },
        btnState: {
          wwBindBtn: false,
          verifiedBtn: false,
        },
        showWwBindBox: false,
        modifyWw: false,
        wwBindLists: [],
        wwFormValidate: {
          alitmAccount: '',
          alitmLevel: '',
          taoqizhi: '',
          picUrl: [],
          alitmLevelPicUrl: [],
          taoqizhiPicUrl: [],
        },
        wwFormRuleCustom: {
          alitmAccount: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
          alitmLevel: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
          alitmLevelPicUrl: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
          picUrl: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
          taoqizhi: [
            { required: false, validator: wwName, trigger: 'blur'},
          ],
        },
        remarks: {
          text: '',
          auditTime: '',
        },
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
      ...mapActions([
        'getUserInformation'
      ]),
      deleteWwBindFunc(ww,index){
        let self = this;
        self.deleteWwId = ww.id;
        self.deleteWwModal = true;
      },
      confirmDelete(){
        let self = this;
        self.modalLoading = true;
        api.wwUnbind({id: self.deleteWwId}).then((res) => {
          self.modalLoading = false;
          if(res.status){
            self.$Message.success({
              content: res.msg,
              duration: 1,
            });
            self.wwBindLists.splice(index, 1);
            self.$set(self.wwBindLists);
            self.getUserInformation();
          }else {
            if(res.statusCode === 'have_waiting_audit_apply'){
              res.msg = '亲，该旺旺还有活动任务正在审核中，请完成该旺旺的所有任务后再进行解绑操作！';
            }else if(res.statusCode === 'have_under_way_showker_task'){
              res.msg = '亲，该旺旺还有活动任务正在进行中，请完成该旺旺的所有任务后再进行解绑操作！';
            }
            self.$Message.error({
              content: res.msg
            });
          }
          self.deleteWwModal = false;
        })
      },
      modifyWwBindFunc(ww,index){
        this.showWwBindBox = true;
        this.wwFormValidate.id = ww.id;
        this.wwFormValidate.alitmAccount = ww.alitmAccount;
        this.wwFormValidate.alitmLevel = this.taobaoLevelImgs[parseInt(ww.creditLevel) + 1].value;
        this.wwFormValidate.taoqizhi = ww.tqz;
        this.wwFormValidate.picUrl = [{
          src: ww.wwInfoPic,
        }];
        this.wwFormValidate.alitmLevelPicUrl = [{
          src: ww.wwCreditLevelPic,
        }];
        this.wwFormValidate.taoqizhiPicUrl = [{
          src: ww.tqzPic,
        }];
        this.remarks.text = ww.remarks;
        this.remarks.auditTime = ww.auditTime;
        this.modifyWw = true;
        this.$set(this.wwFormValidate);
      },
      addWwBindFunc (){
        if((this.wwBindLists && this.wwBindLists.length < 3) || !this.wwBindLists){
          this.showWwBindBox = true;
          this.wwFormValidate.id = '';
          this.wwFormValidate.alitmAccount = '';
          this.wwFormValidate.alitmLevel = '';
          this.wwFormValidate.taoqizhi = '';
          this.wwFormValidate.picUrl = [];
          this.wwFormValidate.alitmLevelPicUrl = [];
          this.wwFormValidate.taoqizhiPicUrl = [];
          this.remarks.text = '';
          this.modifyWw = false;
        }else {
          this.$Modal.warning({
            content: "亲, 最多只能绑定3个旺旺号"
          });
        }
      },
      changeDemoPicFunc(demoPic){
        this.demoShow = true;
        this.demoShowPic = demoPic;
      },
      wwBindList () {
        let self = this;
        api.wwBindList().then((res) => {
          if (res.status) {
            for(let i = 0, j = res.data.length; i < j; i++){
              if(res.data[i].creditLevel){
                res.data[i].creditLevel = self.taobaoLevelImgs[parseInt(res.data[i].creditLevel) - 1]['text'];
              }
              if(res.data[i].tqz){
                res.data[i].tqz = self.taoqizhiList[parseInt(res.data[i].tqz) - 1]['label'];
              }
            }
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
        if(!(self.wwFormValidate.picUrl == '' || self.wwFormValidate.alitmLevelPicUrl == '')){
          self.btnState.wwBindBtn = true;
          if(self.modifyWw){
            api.wwModify({
              alitmAccount: this.wwFormValidate.alitmAccount,
              wwInfoPic: this.wwFormValidate.picUrl[0].src,
              creditLevel: this.wwFormValidate.alitmLevel,
              tqz: this.wwFormValidate.taoqizhi,
              wwCreditLevelPicUrl: this.wwFormValidate.alitmLevelPicUrl[0].src,
              tqzPicUrl: this.wwFormValidate.taoqizhiPicUrl[0].src,
              id: self.wwFormValidate.id,
            }).then((res) => {
              if(res.status){
                self.remarks = '';
                self.$Message.success({
                  content: "亲！提交成功，客服妹子会尽快审核...",
                  duration: 1,
                  onClose: function () {
                    self.wwBindList();
                    self.clearWwInfo();
                    self.getUserInformation();
                    self.showWwBindBox = false;
                  }
                });
              }else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
              self.btnState.wwBindBtn = false;
            })
          }else{
            api.wwBind({
              alitmAccount: this.wwFormValidate.alitmAccount,
              wwInfoPic: this.wwFormValidate.picUrl[0].src,
              creditLevel: this.wwFormValidate.alitmLevel,
              tqz: this.wwFormValidate.taoqizhi,
              wwCreditLevelPicUrl: this.wwFormValidate.alitmLevelPicUrl[0].src,
              tqzPicUrl: this.wwFormValidate.taoqizhiPicUrl[0].src,
            }).then((res) => {
              if(res.status){
                self.$Message.success({
                  content: "亲！提交成功，客服妹子会尽快审核...",
                  duration: 1,
                  onClose: function () {
                    self.wwBindList();
                    self.clearWwInfo();
                    self.getUserInformation();
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
            content: '请上传必需图片'
          });
        }
      },
      removewwBindPicUrl(){
        this.wwFormValidate.picUrl= [];
      },
      removewwBindAlitmLevelPicUrl(){
        this.wwFormValidate.alitmLevelPicUrl = [];
      },
      removewwBindtaoqizhiPicUrl(){
        this.wwFormValidate.taoqizhiPicUrl = [];
      },
      clearWwInfo (){
        this.wwFormValidate.alitmAccount = '';
        let child = this.$refs;
        child.upload.handleRemove();
        child.uploadAlitmLevelPicUrl.handleRemove();
        child.uploadTaoqizhiPicUrl.handleRemove();
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
      handlewwBindtaoqizhiPicUrlSuccess(res, file){
        this.wwFormValidate.taoqizhiPicUrl = [{
          src: aliCallbackImgUrl + res.name
        }];
      },
      handlewwBindAlitmLevelPicUrlSuccess(res, file){
        this.wwFormValidate.alitmLevelPicUrl = [{
          src: aliCallbackImgUrl + res.name
        }];
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
