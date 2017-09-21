<template>
  <div>
    秀客中心
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
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
      const wwRequired = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        }  else {
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
            taoqi: '/static/img/demo/ww-bind/taoqi_demo.png',
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
//          picUrl: [],
          alitmLevelPicUrl: [],
          taoqizhiPicUrl: [],
        },
        wwFormRuleCustom: {
          alitmAccount: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
          alitmLevel: [
            { required: true, validator: wwRequired, trigger: 'change'},
          ],
          alitmLevelPicUrl: [
            { required: true, validator: wwRequired, trigger: 'blur'},
          ],
          taoqizhi: [
            { required: true, validator: wwRequired, trigger: 'change'},
          ],
          taoqizhiPicUrl: [
            { required: true, validator: wwName, trigger: 'blur'},
          ],
//          picUrl: [
//            { required: true, validator: wwName, trigger: 'blur'},
//          ],
        },
        remarks: {
          text: '',
          auditTime: '',
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
              onClose:function () {
                self.$router.go(0);
              }
            });

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
//        this.wwFormValidate.picUrl = [{
//          src: ww.wwInfoPic,
//        }];
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
//          this.wwFormValidate.picUrl = [];
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
            self.wwBindLists = res.data;
            if(res.statusCode == 'success_but_not_any_alitm'){
              self.showWwBindBox = true;
            }
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        });
      },
      wwBindFunc(){
        let self = this;
        if(!(self.wwFormValidate.taoqizhiPicUrl == '' || self.wwFormValidate.alitmLevelPicUrl == '')){
          self.btnState.wwBindBtn = true;
          if(self.modifyWw){
            api.wwModify({
              alitmAccount: this.wwFormValidate.alitmAccount,
//              wwInfoPic: this.wwFormValidate.picUrl[0].src,
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
//              wwInfoPic: this.wwFormValidate.picUrl[0].src,
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

                this.$Message.error({
                  content: res.msg,
                  duration: 9
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
//      removewwBindPicUrl(){
//        this.wwFormValidate.picUrl= [];
//      },
      removewwBindAlitmLevelPicUrl(){
        this.wwFormValidate.alitmLevelPicUrl = [];
      },
      removewwBindtaoqizhiPicUrl(){
        this.wwFormValidate.taoqizhiPicUrl = [];
      },
      clearWwInfo (){
        this.wwFormValidate.alitmAccount = '';
        let child = this.$refs;
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
//      handlewwBindPicUrlSuccess(res, file){
//        this.wwFormValidate.picUrl = [{
//          src: aliCallbackImgUrl + res.name
//        }];
//      },
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

</style>
