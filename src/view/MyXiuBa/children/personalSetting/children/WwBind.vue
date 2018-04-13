<template>
  <div class="ww-account-box">
    <div v-show="!showWwBindBox" class="ww-account-list">
      <a @click=addWwBindFunc>添加新旺旺号</a>
      <ul class="ww-account-title">
        <li>已绑定旺旺号</li>
        <li>绑定时间</li>
        <li>信用等级截图</li>
        <li>绑定状态</li>
        <li>操作</li>
      </ul>
      <div>
        <ul class="ww-account-ctt" v-for="(ww, index) in wwBindLists">
          <li>
            <p>{{ww.alitmAccount}}</p>
            <p v-if="ww.creditLevel"><img :src="taobaoLevelImgs[parseInt(ww.creditLevel) - 2]['text']" style="width: auto;height: auto;"></p>
            <p v-if="ww.tqz">淘气值：{{taoqizhiList[parseInt(ww.tqz) - 1]['label']}}</p>
          </li>
          <li>{{ww.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</li>
          <li><img :src="ww.wwCreditLevelPicUrl" alt="" style="width: 50px; padding: 10px;"></li>
          <li>
            <span v-show="ww.status === 1">审核中</span>
            <div v-if="ww.status === 2 ">
              <p>{{wwStatusTextOn}}</p>
              <iSwitch
                v-model="switchTrue"
                @on-change="switchTypeTrue(ww.id)">
              </iSwitch>
            </div>
            <div v-if="ww.status === 5 ">
              <p>{{wwStatusTextOff}}</p>
              <iSwitch
                v-model="switchFalse"
                @on-change="switchTypeFalse(ww.id)">
              </iSwitch>
            </div>
            <Tooltip v-show="ww.status === 3" :content="ww.remarks" placement="top" style="color: #ff6633;">
              <Icon type="information-circled" color="#FF6633"></Icon>
              <span>审核不通过(查看)</span>
            </Tooltip>
            <Tooltip v-show="ww.status === 4" content="此旺旺已被列入黑名单" placement="top" style="color: #ff6600;">
              <span>冻结</span>
            </Tooltip>
          </li>
          <li>
            <a v-show=" ww.status === 3 || (ww.status === 2 && !switchValueTrue && switchValueFalse)|| (!switchValueFalse && !switchValueTrue)"
              @click="modifyWwBindFunc(ww)" class="mr-10">修改</a>
            <a v-show="ww.status !== 4" @click="deleteWwBindFunc(ww)">解绑</a>
            <!--<a v-show="ww.status == 3 " @click="modifyWwBindFunc(ww,index)">重新提交</a>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="ww-account-bind" v-if="showWwBindBox">
      <Alert v-show="remarks.text" type="warning" show-icon>
        审核不通过： {{remarks.text}},请重新提交（{{remarks.auditTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}）
      </Alert>
      <div class="ww-account-form mt-20">
        <iForm ref="wwFormValidate" :model="wwFormValidate" :rules="wwFormRuleCustom" label-position="right"
               :label-width="150">
          <Form-item label="旺旺ID：" prop="alitmAccount">
            <iInput v-model="wwFormValidate.alitmAccount"></iInput>
          </Form-item>
          <Form-item label="性别：" prop="sex">
            <Radio-group v-model="wwFormValidate.sex">
              <Radio label="0">
                男
              </Radio>
              <Radio label="1">
                女
              </Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="旺旺号信用等级：" prop="alitmLevel">
            <iSelect v-model="wwFormValidate.alitmLevel">
              <iOption v-for="taobaoLevelImg in taobaoLevelImgs" :label='taobaoLevelImg.label'
                       :value="taobaoLevelImg.value" :key="taobaoLevelImg.value">
                <img :src="taobaoLevelImg.text" alt="">
              </iOption>
            </iSelect>
          </Form-item>
          <Form-item label="旺旺信用等级截图：" prop="alitmLevelPicUrl" class="ww-info-img clear">
            <Upload class="left"
                    ref="uploadAlitmLevelPicUrl"
                    :show-upload-list="false"
                    :on-success="handlewwBindAlitmLevelPicUrlSuccess"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="10240"
                    :default-file-list="wwFormValidate.alitmLevelPicUrl"
                    name="wwBind"
                    :on-remove="removewwBindAlitmLevelPicUrl"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <div>
            <a class="look-image" @click="changeDemoPicFunc(demoUrl.wwLevelApp)">[查看手淘示例截图]</a>
            <p class="look-image-tip-text"> 截图位置：打开手淘并登录后，点击“我的淘宝”，在“必备工具”中选择“我的评价”即可在顶部看到当前旺旺信用等级</p>
            <a class="look-image mt-6 inline-block" @click="changeDemoPicFunc(demoUrl.wwLevelPc)">[查看PC示例截图]</a>
            <p class="look-image-tip-text"> 截图位置：打开淘宝首页并登录后，点击顶部“我的淘宝”，然后在左侧菜单列表中点击“评价管理”，即可查看当前旺旺信用等级</p>
          </div>
          <!--<Form-item label="账号信息截图："  prop="picUrl" class="ww-info-img">
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
          </Form-item>-->
          <Form-item label="淘气值：" prop="taoqizhi" class="mt-12">
            <iSelect v-model="wwFormValidate.taoqizhi">
              <iOption v-for="taoqizhi in taoqizhiList" :label='taoqizhi.label' :value="taoqizhi.value"
                       :key="taoqizhi.value">
                {{taoqizhi.label}}
              </iOption>
            </iSelect>
          </Form-item>
          <Form-item label="淘气值截图：" prop="taoqizhiPicUrl" class="ww-info-img clear">
            <Upload
              class="left"
              ref="uploadTaoqizhiPicUrl"
              :show-upload-list="false"
              :on-success="handlewwBindtaoqizhiPicUrlSuccess"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="10240"
              :default-file-list="wwFormValidate.taoqizhiPicUrl"
              name="wwBind"
              :on-remove="removewwBindtaoqizhiPicUrl"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <div>
            <a class="look-image" @click="changeDemoPicFunc(demoUrl.taoqiApp)">[查看手淘示例截图]</a>
            <p class="look-image-tip-text"> 截图位置：打开手淘并登录后，点击“我的淘宝”，即可查看到当前账号的淘气值</p>
            <a class="look-image mt-6 inline-block" @click="changeDemoPicFunc(demoUrl.taoqiPc)">[查看PC示例截图]</a>
            <p class="look-image-tip-text">截图位置：打开淘宝首页，将鼠标移至左上角自己的淘宝账户，即可看到自己的淘气值</p>
          </div>
          <Form-item label="收货地址：" prop="address" class="mt-12">
            <region-picker
              :auto="true"
              :placeholder="{province: '选择省份', city: '选择市', district: '选择地区'}"
              :province="region.province"
              :city="region.city"
              :district="region.district"
              @onchange="regionPickerChange">
            </region-picker>
          </Form-item>
          <Form-item prop="detailAddress">
            <iInput v-model="wwFormValidate.detailAddress"></iInput>
          </Form-item>
          <Form-item>
            <iButton :class="[btnState.wwBindBtn ? '': 'ww-bind-btn']" :disabled="btnState.wwBindBtn"
                     @click="handleSubmit('wwFormValidate',wwBindFunc)">提交
            </iButton>
            <iButton type="ghost" @click="handleReset('wwFormValidate',clearWwInfo)">重置</iButton>
          </Form-item>
          <p class="ww-tip">
            1.支持jpg/jpeg/gif/bmp/png格式，最大不超过10M
          </p>
        </iForm>

      </div>
      <div class="left ww-account-cue mt-20">
        <p>
          <a @click="changeDemoPicFunc(demoUrl.wwAccount)">什么是旺旺ID号？</a>
        </p>
      </div>
    </div>
    <!--删除任务弹框-->
    <Modal v-model="deleteWwModal" width="360">
      <p slot="header" class="main-color text-ct">
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
      <div class="text-ct">
        <img :src="demoShowPic" alt="" style="width: 100%; margin-top: 20px">
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import {Icon, Form, Input, Switch, Select, Option, Button, Radio, Modal, Alert, Tooltip} from 'iview'
  import {RegionPicker} from 'vue-region-picker'
  import CHINA_REGION from 'china-area-data'
  import Upload from '@/components/upload'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'

  RegionPicker.region = CHINA_REGION;
  RegionPicker.vueVersion = 2;
  export default {
    name: 'WwBind',
    components: {
      Tooltip: Tooltip,
      iInput: Input,
      iSwitch: Switch,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Upload: Upload,
      Modal: Modal,
      Alert: Alert,
      iSelect: Select,
      iOption: Option,
      RegionPicker: RegionPicker,
    },
    data() {
      //表单验证
      const wwName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else if (value.length > 50) {
          callback(new Error('旺旺ID过长'))
        }else if (value !== this.oldAlitmAccount) {
          callback(new Error('旺旺名禁止修改'))
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
      const addAddress = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('地址不能为空'));
        } else {
          callback()
        }
      };
      const sex = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择性别'));
        } else {
          callback()
        }
      };
      const tqzUrl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传淘气值图片'));
        } else {
          callback()
        }
      };
      return {
        alimitId: null,
        wwStatusTextOn: '启用中',
        wwStatusTextOff: '停用中',
        switchTrue: true,
        switchFalse: false,
        switchValueTrue: false,
        switchValueFalse: true,
        modalLoading: false,
        deleteWwModal: false,
        deleteWwId: '',
        taobaoLevelImgs: [
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
          taoqiPc: '/static/img/demo/ww-bind/taoqi_demo.png',
          taoqiApp: '/static/img/demo/ww-bind/taoqi_demo_app.png',
          wwLevelPc: '/static/img/demo/ww-bind/ww_level_demo.png',
          wwLevelApp: '/static/img/demo/ww-bind/ww_level_demo_app.png'
        },
        btnState: {
          wwBindBtn: false,
          verifiedBtn: false,
        },
        showWwBindBox: false,
        modifyWw: false,
        wwBindLists: [],
        wwFormValidate: {
          sex: '0',
          alitmAccount: '',
          alitmLevel: '',
          taoqizhi: null,
//          picUrl: [],
          alitmLevelPicUrl: [],
          taoqizhiPicUrl: [],
          detailAddress: '',
        },
        wwFormRuleCustom: {
          alitmAccount: [
            {required: true, validator: wwName, trigger: 'blur'},
          ],
          alitmLevel: [
            {required: true, validator: wwRequired, trigger: 'change'},
          ],
          alitmLevelPicUrl: [
            {required: true, validator: wwRequired, trigger: 'blur'},
          ],
          taoqizhi: [
            {required: true, validator: wwRequired, trigger: 'change'},
          ],
         /* taoqizhiPicUrl: [
            {required: true, validator: wwName, trigger: 'blur'},
          ],*/
          address: [
            {required: true, validator: wwRequired, trigger: 'blur'}
          ],
          detailAddress: [
            {required: true, validator: addAddress, trigger: 'blur'},
          ],
          sex: [
            {required: true, validator: sex, trigger: 'blur'},
          ],
          taoqizhiPicUrl: [
            {required: true, validator: tqzUrl, trigger: 'blur'},
          ],
        },
        remarks: {
          text: '',
          auditTime: '',
        },
        region: {},
        address: {},
        oldAlitmAccount:null,
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      self.wwBindList();
    },
    computed: {},
    methods: {
      switchTypeTrue(id) {
        let self = this;
        if (!self.switchValueTrue) {
          self.wwStatusTextOn = '停用中';
          self.switchValueTrue = true;
          api.disuseWw({
            id: id
          }).then((res) => {
            if (res.status) {
              self.$Message.success('已停用！')
            } else {
              self.$Message.error(res.msg);
            }
          })
        } else {
          self.wwStatusTextOn = '启用中';
          self.switchValueTrue = false;
          api.unDisuseWw({
            id: id
          }).then((res) => {
            if (res.status) {
              self.$Message.success('已启用！');
            } else {
              self.$Message.error(res.msg);
            }
          })
        }
      },
      switchTypeFalse(id) {
        let self = this;
        if (!self.switchValueFalse) {
          self.wwStatusTextOff = '停用中';
          self.switchValueFalse = true;
          api.disuseWw({
            id: id
          }).then((res) => {
            if (res.status) {
              self.$Message.success('已停用！')
            } else {
              self.$Message.error(res.msg)
            }
          })
        } else {
          self.wwStatusTextOff = '启用中';
          self.switchValueFalse = false;
          api.unDisuseWw({
            id: id
          }).then((res) => {
            if (res.status) {
              self.$Message.success('已启用！');
            } else {
              self.$Message.error(res.msg);
            }
          })
        }
      },
      regionPickerChange(obj) {
        this.address = obj;
      },
      deleteWwBindFunc(ww) {
        let self = this;
        self.deleteWwId = ww.id;
        self.deleteWwModal = true;
      },
      confirmDelete() {
        let self = this;
        self.modalLoading = true;
        api.wwUnbind({id: self.deleteWwId}).then((res) => {
          self.modalLoading = false;
          if (res.status) {
            self.$store.dispatch('getUserInformation');
            self.$Message.success({
              content: res.msg,
              duration: 1,
              onClose: function () {
                self.$router.go(0);
              }
            });

          } else {
            if (res.statusCode === 'have_waiting_audit_apply') {
              res.msg = '亲，该旺旺还有活动任务正在审核中，请完成该旺旺的所有任务后再进行解绑操作！';
            } else if (res.statusCode === 'have_under_way_showker_task') {
              res.msg = '亲，该旺旺还有活动任务正在进行中，请完成该旺旺的所有任务后再进行解绑操作！';
            }
            self.$Message.error({
              content: res.msg
            });
          }
          self.deleteWwModal = false;
        })
      },
      modifyWwBindFunc(ww) {
        let _this = this;
        _this.showWwBindBox = true;
        _this.wwFormValidate.id = ww.id;
        _this.wwFormValidate.alitmAccount = ww.alitmAccount;
        _this.oldAlitmAccount = ww.alitmAccount;
        _this.wwFormValidate.alitmLevel = ww.creditLevel;
        _this.wwFormValidate.taoqizhi = ww.tqz;
        _this.address.province = ww.takeProvince;
        _this.address.city = ww.takeCity;
        _this.address.district = ww.takeDistrict;
        _this.region.province = ww.takeProvince;
        _this.region.city = ww.takeCity;
        _this.region.district = ww.district;
        _this.wwFormValidate.sex = ww.alitmRole;
        _this.wwFormValidate.detailAddress = ww.takeDetail;
        _this.wwFormValidate.alitmLevelPicUrl = [{
          src: ww.wwCreditLevelPic,
        }];
        _this.wwFormValidate.taoqizhiPicUrl = [{
          src: ww.tqzPic,
        }];
        _this.remarks.text = ww.remarks;
        _this.remarks.auditTime = ww.auditTime;
        _this.modifyWw = true;
        _this.$set(_this.wwFormValidate);
      },
      addWwBindFunc() {
        let _this = this;
        if ((_this.wwBindLists && _this.wwBindLists.length < 1) || !_this.wwBindLists) {
          _this.showWwBindBox = true;
          _this.wwFormValidate.id = '';
          _this.wwFormValidate.alitmAccount = '';
          _this.wwFormValidate.alitmLevel = '';
          _this.wwFormValidate.taoqizhi = '';
//          _this.wwFormValidate.picUrl = [];
          _this.wwFormValidate.alitmLevelPicUrl = [];
          _this.wwFormValidate.taoqizhiPicUrl = [];
          _this.remarks.text = '';
          _this.modifyWw = false;
        } else {
          _this.$Modal.warning({
            content: "亲, 最多只能绑定1个旺旺号"
          });
        }
      },
      changeDemoPicFunc(demoPic) {
        this.demoShow = true;
        this.demoShowPic = demoPic;
      },
      wwBindList() {
        let self = this;
        api.wwBindList().then((res) => {
          if (res.status) {
            self.wwBindLists = res.data;
            if (res.statusCode === 'success_but_not_any_alitm') {
              self.showWwBindBox = true;
              self.$nextTick(() => {
                self.$Notice.info({
                  title: '旺旺号信息绑定',
                  desc: '申请宝贝时，需要首先绑定淘宝旺旺号后才可以进行操作。请先按照页面提示进行旺旺号的绑定，以便于后期活动的申请，感谢您的支持与配合！',
                  duration: 0
                });
              });
            }
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      wwBindFunc() {
        let self = this;
        if (self.wwFormValidate.taoqizhiPicUrl && self.wwFormValidate.alitmLevelPicUrl) {
          if (!self.address.province) {
            self.$Message.error('请选择省');
            return
          }
          self.btnState.wwBindBtn = true;
          if (self.modifyWw) {
            if (self.wwFormValidate.alitmAccount !== self.oldAlitmAccount){
              self.$Message.error('旺旺名禁止修改！');
              return
            }
            api.wwModify({
              alitmAccount: self.wwFormValidate.alitmAccount,
//              wwInfoPic: this.wwFormValidate.picUrl[0].src,
              creditLevel: self.wwFormValidate.alitmLevel,
              tqz: self.wwFormValidate.taoqizhi,
              wwCreditLevelPicUrl: self.wwFormValidate.alitmLevelPicUrl[0].src,
              tqzPicUrl: self.wwFormValidate.taoqizhiPicUrl[0].src,
              id: self.wwFormValidate.id,
              takeProvince: self.address.province,
              takeCity: self.address.city || null,
              takeDistrict: self.address.district || null,
              alitmRole: self.wwFormValidate.sex,
              takeDetail: self.wwFormValidate.detailAddress
            }).then((res) => {
              if (res.status) {
                self.remarks = '';
                self.$Message.success({
                  content: "亲！提交成功，客服妹子会尽快审核...",
                  duration: 1,
                  onClose: function () {
                    self.wwBindList();
                    self.clearWwInfo();
                    self.showWwBindBox = false;
                  }
                });
              } else {
                self.$Message.error(res.msg);
              }
              self.btnState.wwBindBtn = false;
            })
          } else {
            api.wwBind({
              alitmAccount: self.wwFormValidate.alitmAccount,
//              wwInfoPic: this.wwFormValidate.picUrl[0].src,
              creditLevel: self.wwFormValidate.alitmLevel,
              tqz: self.wwFormValidate.taoqizhi,
              wwCreditLevelPicUrl: self.wwFormValidate.alitmLevelPicUrl[0].src,
              tqzPicUrl: self.wwFormValidate.taoqizhiPicUrl[0].src,
              takeProvince: self.address.province,
              takeCity: self.address.city || null,
              takeDistrict: self.address.district || null,
              alitmRole: self.wwFormValidate.sex,
              takeDetail: self.wwFormValidate.detailAddress
            }).then((res) => {
              if (res.status) {
                self.$Message.success({
                  content: "亲！提交成功，客服妹子会尽快审核...",
                  duration: 1,
                  onClose: function () {
                    self.wwBindList();
                    self.clearWwInfo();
                    self.$store.dispatch('getUserInformation');
                    self.showWwBindBox = false;
                  }
                });
              } else {
                self.$Message.error(res.msg);
              }
              self.btnState.wwBindBtn = false;
            })
          }
        } else {
          self.$Modal.warning({
            content: '请上传必需图片'
          });
        }
      },
      removewwBindAlitmLevelPicUrl() {
        this.wwFormValidate.alitmLevelPicUrl = [];
      },
      removewwBindtaoqizhiPicUrl() {
        this.wwFormValidate.taoqizhiPicUrl = [];
      },
      clearWwInfo() {
        this.wwFormValidate.alitmAccount = '';
        let child = this.$refs;
        child.uploadAlitmLevelPicUrl.handleRemove();
        child.uploadTaoqizhiPicUrl.handleRemove();
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
//      handlewwBindPicUrlSuccess(res, file){
//        this.wwFormValidate.picUrl = [{
//          src: aliCallbackImgUrl + res.name
//        }];
//      },
      handlewwBindtaoqizhiPicUrlSuccess(res) {
        this.wwFormValidate.taoqizhiPicUrl = [{
          src: aliCallbackImgUrl + res.name
        }];
      },
      handlewwBindAlitmLevelPicUrlSuccess(res) {
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
