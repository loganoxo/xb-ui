<template>
  <div class="verified-box">
    <div v-if="verifiedState === verifiedStatus.verifiedBeg || verifiedState === verifiedStatus.verifiedFailed">
      <Alert v-show="verifiedState === verifiedStatus.verifiedFailed" type="warning" show-icon>
        审核不通过： {{verified.assessReason}},请重新提交！({{verified.auditTime | dateFormat('YYYY-MM-DD hh:mm:ss')}})
      </Alert>
      <div class="verified-form">
        <iForm ref="verifiedValidate" :model="verifiedValidate" :rules="verifiedRuleCustom" label-position="right"
               :label-width="130">
          <Form-item label="真实姓名" prop="realname">
            <iInput v-model="verifiedValidate.realname"></iInput>
          </Form-item>
          <Form-item label="身份证号" class="ww-info-img" prop="idcard">
            <iInput v-model="verifiedValidate.idcard"></iInput>
          </Form-item>
          <Form-item label="身份证正面照" prop="frontagePic" class="ww-info-img">
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
              :on-remove="removeVerifiedPicUrl"
              :before-upload="handleBeforeUpload"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <Form-item label="身份证反面照" prop="reverseSidePic" class="ww-info-img">
            <Upload
              ref="upload2"
              name="reversePicUrl"
              :show-upload-list="false"
              :on-success="handleReversePicUrlSuccess"
              :default-file-list="verifiedValidate.reversePicUrl"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="2000"
              :on-remove="removeVerifiedReversePicUrl"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <p class="ver-tip">
            1.身份证上的信息需无遮挡，且清晰可见
            <br>
            2.照片请勿进行任何软件处理
            <br>
            3.支持jpg/jpeg/gif/bmp/png格式，最大不超过2M
            <br>
          </p>
          <Form-item>
            <iButton :class="[btnState.verifiedBtn ? '' : 'verified-btn']" :disabled="btnState.verifiedBtn"
                     @click="handleSubmit('verifiedValidate',verifiedFunc)">提交
            </iButton>
            <iButton type="ghost" @click="handleReset('verifiedValidate',clearVerified)">重置</iButton>
          </Form-item>
        </iForm>
        <div class="left mt-20 verified-cue">
          <p>
            <a
              @click="demoShow = true, imgDemoUrl.taobaoAccountDemo = false,imgDemoUrl.taobaoAccountInfo = false,imgDemoUrl.picUrl = true,imgDemoUrl.reversePicUrl = false;">[查看示例截图]</a>
          </p>
          <p>
            <a
              @click="demoShow = true, imgDemoUrl.taobaoAccountDemo = false,imgDemoUrl.taobaoAccountInfo = false,imgDemoUrl.picUrl = false,imgDemoUrl.reversePicUrl = true;">[查看示例截图]</a>
          </p>
        </div>
      </div>
    </div>
    <div class="verified-result mt-80" v-if="verifiedState === verifiedStatus.verifiedIng">
      <p class="text-ct">
        <img src="~assets/img/common/right_64.png" alt="" class="vtc-btm">
        实名认证已提交
      </p>
      <p class="text-ct">亲当前的实名认证已提交，工作人员会在一个工作日内审核你的活动，敬请关注！</p>

    </div>
    <div class="verified-result mt-80" v-if=" verifiedState === verifiedStatus.verifiedSuccess">
      <p class="text-ct">
        <img src="~assets/img/common/right_64.png" alt="" class="vtc-btm">
        实名已认证
      </p>
      <p class="text-ct">亲当前已是实名认证用户了~</p>
    </div>
    <Modal v-model="demoShow" width="900">
      <div class="text-ct">
        <img v-show="imgDemoUrl.picUrl" src="~assets/img/case-demo/sfz01.png" alt=""
             style="width: 100%;margin-top: 20px;">
        <img v-show="imgDemoUrl.reversePicUrl" src="~assets/img/case-demo/sfz02.png" alt=""
             style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import {Icon, Form, Input, Checkbox, Button, Radio, Modal, Alert} from 'iview'
  import api from '@/config/apiConfig'
  import Upload from '@/components/upload'
  import {setStorage, getStorage} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import SmsCountdown from '@/components/SmsCountdown'

  export default {
    name: 'Verified',
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
        } else if (!/^[\u4E00-\u9FA5]+$/.test(value)) {
          callback(new Error('姓名只能为中文'))
        } else if (value.length > 10) {
          callback(new Error('姓名最多为10个汉字'))
        } else {
          callback()
        }
      };
      const wwRequired = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else {
          callback()
        }
      };
      const validateNameNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写身份证号'));
        } else if (!/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)) {
          callback(new Error('身份证填写有误'))
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
        remarks: {
          text: '',
          auditTime: '',
        },
        demoShow: false,
        imgDemoUrl: {
          taobaoAccountDemo: false,
          taobaoAccountInfo: false,
          picUrl: false,
          reversePicUrl: false,
        },
        verified: {},
        verifiedState: '',
        verifiedStatus: {
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
            {required: true, validator: validateName, trigger: 'blur'},
          ],
          idcard: [
            {required: true, validator: validateNameNum, trigger: 'blur'}
          ],
          frontagePic: [
            {required: true, validator: wwRequired, trigger: 'blur'}
          ],
          reverseSidePic: [
            {required: true, validator: wwRequired, trigger: 'blur'}
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
      verifiedInit() {
        let self = this;
        api.verifiedInit().then((res) => {
          if (res.status) {
            if (res.statusCode === 'none realname') {
              self.verifiedState = self.verifiedStatus.verifiedBeg;
            } else {
              self.verified = res.data;
              self.verifiedState = res.data.status;
              if (self.verified.assessReason) {
                self.verifiedValidate.realname = self.verified.realname;
                self.verifiedValidate.idcard = self.verified.idcard;
                self.verifiedValidate.picUrl = [
                  {
                    src: res.data.picUrl
                  }
                ];
                self.verifiedValidate.reversePicUrl = [
                  {
                    src: res.data.reversePicUrl
                  }
                ];
              }
              if (!self.verifiedState) {
                self.verifiedState = 10;
              }
            }
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      removeVerifiedPicUrl() {
        this.verifiedValidate.picUrl = [];
      },
      removeVerifiedReversePicUrl() {
        this.verifiedValidate.reversePicUrl = [];
      },
      clearVerified() {
        this.verifiedValidate.realname = '';
        this.verifiedValidate.idcard = '';
        this.$refs.upload.handleRemove();
        this.$refs.upload2.handleRemove();
      },
      verifiedFunc() {
        let self = this;
        if (self.verifiedValidate.picUrl && self.verifiedValidate.reversePicUrl) {
          self.btnState.verifiedBtn = true;
          api.verifiedSubmit({
            realname: self.verifiedValidate.realname,
            idcard: self.verifiedValidate.idcard,
            picUrl: self.verifiedValidate.picUrl[0].src,
            reversePicUrl: self.verifiedValidate.reversePicUrl[0].src
          }).then((res) => {
            if (res.status) {
              self.verifiedState = self.verifiedStatus.verifiedIng;
              self.$store.dispatch('getUserInformation');
            } else {
              self.$Modal.warning({
                content: res.msg
              });
            }
            self.btnState.verifiedBtn = false;
          })
        } else {
          this.$Modal.warning({
            content: '请上传所有图片'
          });
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
      handlePicUrlSuccess(res) {
        this.verifiedValidate.picUrl.push({
          src: aliCallbackImgUrl + res.name
        });
      },
      handleReversePicUrlSuccess(res) {
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
