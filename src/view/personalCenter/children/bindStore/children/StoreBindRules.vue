<template>
  <div class="store-bind-rules">
    <div class="rules-box">
      <p class="rules-title">店铺绑定说明:</p>
      <ul>
        <li>1、免费商家可绑定{{freeStoreBindNum}}个店铺，VIP商家可绑定{{vipStoreBindNum}}个店铺。</li>
        <li>2、店铺绑定成功后无法解绑和修改，请慎重操作！</li>
        <li>3、发布活动的宝贝必须是所绑定店铺内的宝贝，否则活动无法发布！</li>
      </ul>
    </div>
    <p class="had-band-title fs-16">我已绑定的店铺 <span class="main-color">（根据你的会员版本，最多可绑定<span v-if="memberLevel === 100">{{freeStoreBindNum}}</span><span v-if="memberLevel === 200">{{vipStoreBindNum}}</span><span v-if="memberLevel === 300">{{svipStoreBindNum}}</span>个店铺。）</span> </p>
    <ul class="had-band-box clear">
      <li class="left pos-rel" v-for="storeInfo in storeInfoList" :key="storeInfo.id">
        <img src="~assets/img/common/taobao-logo.png" v-if="storeInfo.storeType === 'taobao'">
        <img src="~assets/img/common/tmall-logo.png" v-if="storeInfo.storeType === 'tmall'">
        <p class="store-name mt-15 f-b fs-16">{{storeInfo.storeName}}</p>
        <p class="store-ww mt-10">店铺旺旺：<span>{{storeInfo.storeAlitm}}</span></p>
        <!--<p class="concat-qq mt-10">联系QQ：{{storeInfo.qqNumber ? storeInfo.qqNumber : personalQQ}} <span class="ml-5 cursor-p blue" @click="modifyQQ(storeInfo.id)">修改</span></p>-->
        <div class="mt-15 clear concat-box">
          <div class="icon-box" v-if="personalQQ || storeInfo.qqNumber">
            <tooltip :content="`QQ：${storeInfo.qqNumber ? storeInfo.qqNumber : personalQQ}`" placement="top">
              <img src="/static/img/icon/icon-qq-on.png" alt="">
            </tooltip>
            <p>已开启</p>
          </div>
          <div class="icon-box" v-if="!personalQQ && !storeInfo.qqNumber">
            <tooltip content="QQ：暂未绑定" placement="top">
              <img src="/static/img/icon/icon-qq-off.png" alt="">
            </tooltip>
            <p>未开启</p>
          </div>
          <div class="icon-box" v-if="storeInfo.weChatNum">
            <tooltip placement="top">
              <img src="/static/img/icon/icon-wx-on.png" alt="">
              <div slot="content" class="text-ct">
                <!--<img src="/static/img/icon/icon-wx-on.png" alt="">-->
                <p>微信：{{storeInfo.weChatNum}}</p>
              </div>
            </tooltip>
            <p>已开启</p>
          </div>
          <div class="icon-box" v-if="!storeInfo.weChatNum">
            <tooltip placement="top">
              <img src="/static/img/icon/icon-wx-off.png" alt="">
              <div slot="content" class="text-ct">
                <!--<img src="/static/img/icon/icon-wx-on.png" alt="">-->
                <p>微信：暂未绑定</p>
              </div>
            </tooltip>
            <p>待补填</p>
          </div>
          <div class="icon-box" v-if="(storeInfo.phone || personalPhone) && storeInfo.showPhone">
            <tooltip :content="`手机：${storeInfo.phone ? storeInfo.phone : personalPhone}`" placement="top">
              <img src="/static/img/icon/icon-phone-on.png" alt="">
            </tooltip>
            <p>已开启</p>
          </div>
          <div class="icon-box" v-if="!storeInfo.phone && !personalPhone">
            <tooltip content="`手机：暂未绑定" placement="top">
              <img src="/static/img/icon/icon-phone-off.png" alt="">
            </tooltip>
            <p>待不填</p>
          </div>
          <div class="icon-box" v-if="(storeInfo.phone || personalPhone) && !storeInfo.showPhone">
            <tooltip :content="`手机：${storeInfo.phone ? storeInfo.phone : personalPhone}`" placement="top">
              <img src="/static/img/icon/icon-phone-off.png" alt="">
            </tooltip>
            <p>未开启</p>
          </div>
        </div>
        <p class="blue mt-10 cursor-p" @click="settingConcat(storeInfo)">店铺联系方式设置</p>
        <p v-if="storeInfo.applyStatus === 1" class="auditing cursor-p" @click="checkDetail(storeInfo)">店铺审核中...（查看详情）</p>
        <p v-if="storeInfo.applyStatus === 3" class="audit-fail cursor-p" @click="checkDetail(storeInfo)">审核未通过...（查看详情）</p>
      </li>
      <li v-if="isShowBindBtn" class="left cursor-p" @click="toBindStore">
        <p class="mt-20"><icon type="md-add" size="50" color="#999"/></p>
        <p class="bind-new-store mt-10 fs-16 f-b" v-if="showBindStoreText">绑定新店铺</p>
        <!--<p class="upgrade-vip mt-10" v-if="showUpgradeText">升级<span v-if="memberLevel===200">S</span>VIP绑定更多店铺</p>-->
        <p class="upgrade-vip mt-10" v-if="showUpgradeText">升级VIP绑定更多店铺</p>
      </li>
    </ul>
    <!--修改店铺QQ号的弹窗-->
    <modal v-model="showModifyStoreQQ" width="450" class="modify-qq-modal">
      <p slot="header" class="f-b fs-16">QQ号设定</p>
      <div class="pt-10 pb-10">
        <p class="pb-10 fs-16">为当前店铺设置联系QQ：</p>
        <i-input v-model="storeQQ" placeholder="请输入你的QQ号"></i-input>
      </div>
      <p slot="footer">
        <i-button :loading="modifyQQLoading" long type="error" @click="editStoreQQ">确定</i-button>
      </p>
    </modal>
    <!--设置店铺联系方式弹窗-->
    <modal v-model="showSettingModal" title="店铺联系方式设置" class="setting-modal" @on-visible-change="change">
      <div class="store-info clear">
        <div class="left">
          <img src="~assets/img/common/taobao-logo.png" v-if="modalStoreInfo.storeType === 'taobao'" width="54" height="54">
          <img src="~assets/img/common/tmall-logo.png" v-if="modalStoreInfo.storeType === 'tmall'" width="54" height="54">
        </div>
        <div class="left pl-20 lht30">
          <p class="fs-16 f-b">{{modalStoreInfo.storeName}}</p>
          <p class="fs-14">{{modalStoreInfo.storeAlitm}}</p>
        </div>
      </div>
      <div class="tip-info">
        <icon type="md-information-circle" color="#EC4C2F" size="16"/>
        为了活动中与拿手及时沟通，请保持联系方式正确有效
      </div>
      <i-form ref="form" :model="contactInfo" :rules="contactRule" class="mt-20">
        <form-item label="QQ号：" prop="mQQNumber">
          <i-input v-model="contactInfo.mQQNumber" placeholder="请输入QQ号" style="width:200px;"></i-input>
          <span class="ml-10">默认对拿手可见</span>
        </form-item>
        <form-item label="微信号：" prop="mWXNumber">
          <i-input v-model="contactInfo.mWXNumber" placeholder="请输入微信号" style="width:200px;"></i-input>
          <span class="ml-10">默认对拿手可见</span>
        </form-item>
        <!--<form-item prop="mqrCode">-->
          <!--<div class="clear">-->
            <!--<upload class="ml-45 left"-->
                    <!--:default-file-list="wxewmDefaultList"-->
                    <!--:on-remove="removewxewmImage"-->
                    <!--:on-success="wxewmImageSuccess"-->
                    <!--:format="['jpg','jpeg','png','gif','bmp']"-->
                    <!--:max-size="1024"-->
                    <!--name="wxewm"-->
                    <!--:on-format-error="handleFormatError"-->
                    <!--:on-exceeded-size="handleMaxSize"-->
                    <!--type="drag">-->
              <!--<div class="camera">-->
                <!--<icon type="ios-camera" size="20"/>-->
              <!--</div>-->
            <!--</upload>-->
            <!--<span class="left mt-20 ml-20">请上传微信二维码</span>-->
          <!--</div>-->
        <!--</form-item>-->
        <form-item label="手机号：" prop="mPhoneNumber">
          <i-input v-model="contactInfo.mPhoneNumber" placeholder="请输入手机号" style="width:200px;"></i-input>
          <span class="ml-10">开启对拿手可见</span>
        </form-item>
        <form-item>
          <div class="ml-56">
            <checkbox v-model="contactInfo.showPhoneNumber">
              开启手机号对拿手可见
            </checkbox>
          </div>
        </form-item>
      </i-form>
      <div slot="footer">
        <i-button class="concat-info-confirm" long :loading="loading" @click="confirm">确认</i-button>
      </div>
    </modal>
    <flow-order-model v-model="showFlowOrder"></flow-order-model>
  </div>
</template>

<script>
  import {Icon, Modal, Input, Button, Tooltip, Form, Checkbox} from 'iview';
  import api from '@/config/apiConfig'
  import Upload from '@/components/Upload'
  import {delHtmlTag} from '@/config/utils'
  import FlowOrderModel from '@/components/FlowOrderModel.vue'
  export default {
    name: "store-bind-rules",
    components:{
      Icon: Icon,
      Modal: Modal,
      iInput:Input,
      iButton: Button,
      Tooltip: Tooltip,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      Upload: Upload,
      FlowOrderModel: FlowOrderModel
    },
    data() {
      const validateQQ = (rule, value, callback) => {
        const qqReq = /^[1-9][0-9]{4,11}$/;
        if (!value) {
          callback(new Error('请输入QQ号码！'));
        } else if (!qqReq.test(value)) {
          callback(new Error('请输入正确格式的QQ号！'));
        } else {
          callback();
        }
      };
      const validateWX = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入微信号！'));
        } else {
          callback();
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号！'));
        } else if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback();
        }
      };
      return {
        storeInfoList:[],
        isShowBindBtn:true,
        freeStoreBindNum:0,
        vipStoreBindNum:0,
        svipStoreBindNum:0,
        showBindStoreText:true,
        showUpgradeText:false,
        showModifyStoreQQ: false,
        storeQQ: null,
        modifyQQLoading: false,
        modifyStoreId: null,
        modalStoreInfo: {},
        // mQQNumber: 1625139801,
        // mWx: 'L1625139801',
        // mphone: 18611536208,
        showSettingModal: false,
        contactInfo:{
          mQQNumber: null,
          mWXNumber: null,
          mqrCode: null,
          mPhoneNumber: null,
          showPhoneNumber: false
        },
        contactRule: {
          mQQNumber: [
            {validator: validateQQ, trigger: 'blur'}
          ],
          mWXNumber: [
            {validator: validateWX, trigger: 'blur'}
          ],
          mPhoneNumber: [
            {validator: validatePhone, trigger: 'blur'}
          ],
        },
        wxewmDefaultList: [],
        loading: false,
        showFlowOrder: true
      }
    },
    computed:{
      isMember() {
        return this.$store.getters.isMemberOk;
      },
      memberLevel() {
        return this.$store.getters.getMemberLevel;
      },
      // 获取个人设置里的QQ，当店铺对应的QQ为空时，默认取个人设置的QQ
      personalQQ() {
        return this.$store.state.userInfo.qqNumber
      },
      personalPhone() {
        return this.$store.state.userInfo.phone
      }
    },
    created(){
      this.getVersionInfo();
    },
    methods:{
      // 获取会员版本说明（主要是可绑定店铺数量）
      getVersionInfo() {
        const _this = this;
        api.getMemberInstructionsInfo().then(res => {
          let tempData = [];
          if (res.status) {
            tempData = res.data;
            tempData.forEach(item => {
              item.storeBindingLimit = JSON.parse(item.storeBindingLimit);
            });
            _this.freeStoreBindNum = tempData[0].storeBindingLimit.number;
            _this.vipStoreBindNum = tempData[1].storeBindingLimit.number;
            _this.svipStoreBindNum = tempData[2].storeBindingLimit.number;
            _this.getStoreBindInfo();
          }else{
            _this.$Message.error(res.msg);
          }
        })
      },
      // 获取商家绑定的店铺列表
      getStoreBindInfo() {
        const _this = this;
        api.getStoreBindInfo().then(res=>{
          if (res.status) {
            if (res.data.length > 0) {
              _this.storeInfoList = res.data;
              _this.bindBtnText();
            }
          }else{
            _this.$Message.error(res.msg);
          }
        })
      },
      // 根据会员等级和已绑定店铺数量页面绑定按钮显示不同
      bindBtnText() {
        const _this = this;
        // 免费
        if ((_this.memberLevel === 100) && (_this.storeInfoList.length >= _this.freeStoreBindNum)){
          _this.showBindStoreText = false;
          _this.showUpgradeText = true;
        }
        if (_this.memberLevel === 200) {
          _this.showBindStoreText = true;
          _this.showUpgradeText = false;
          if (_this.storeInfoList.length >= _this.vipStoreBindNum) {
            _this.isShowBindBtn = false;
          }
        }
        if (_this.memberLevel === 300) {
          _this.showBindStoreText = true;
          _this.showUpgradeText = false;
          if (_this.storeInfoList.length >= _this.svipStoreBindNum) {
            _this.isShowBindBtn = false;
          }
        }
        // 以下为svip逻辑，先保留
        // // vip
        // if(_this.memberLevel === 200 && (_this.storeInfoList.length >= _this.vipStoreBindNum)){
        //   _this.showBindStoreText = false;
        //   _this.showUpgradeText = true;
        // }
        // // svip
        // if(_this.memberLevel === 300){
        //   _this.showBindStoreText = true;
        //   _this.showUpgradeText = false;
        //   if(_this.storeInfoList.length >= _this.svipStoreBindNum){
        //     _this.isShowBindBtn = false;
        //   }
        // }
      },
      // 绑店铺还是买会员（需要判断）
      toBindStore() {
        const _this = this;
        if ((_this.memberLevel ===100) && _this.storeInfoList.length >= _this.freeStoreBindNum) {
          _this.$router.push({path:'/user/vip-member/order'});
        } else {
          this.$router.push({name:'StoreBindOperating'});
        }
        // 下面为有svip版本的逻辑，先保留着
        // if((_this.memberLevel ===100) && _this.storeInfoList.length >= _this.freeStoreBindNum){
        //   _this.$router.push({path:'/user/vip-member/order'});
        // } else if (_this.memberLevel === 200 && _this.storeInfoList.length >= _this.vipStoreBindNum) {
        //   _this.$router.push({path:'/user/vip-member/order'});
        // } else if (_this.memberLevel === 300 && _this.storeInfoList.length >= _this.svipStoreBindNum) {
        //   _this.isShowBindBtn = false;
        // } else {
        //   this.$router.push({name:'StoreBindOperating'});
        // }
      },
      // 查看绑定店铺的详情（审核中，未通过）
      checkDetail(storeInfo) {
        this.$router.push({name:'StoreBindOperating',query:{protocol:true,id:storeInfo.id,status:storeInfo.applyStatus}});
      },
      // 点击修改，弹窗，记录storeID
      modifyQQ(storeId) {
        this.showModifyStoreQQ = true;
        this.modifyStoreId = storeId;
      },
      // 商家修改店铺的QQ号，（可以为每个店铺绑定QQ）
      editStoreQQ() {
        const _this = this;
        const qqReq = /^[1-9][0-9]{5,11}$/;
        if (!_this.storeQQ) {
          _this.$Message.info('请输入QQ号');
          return
        }
        if (!qqReq.test(_this.storeQQ)) {
          _this.$Message.info('请输入正确格式的QQ号');
          return
        }
        _this.modifyQQLoading = true;
        api.eidtStoreQQ({
          storeId: _this.modifyStoreId,
          qqNumber: _this.storeQQ
        }).then(res => {
          if (res.status) {
            _this.$Message.success('修改店铺QQ号成功！');
            _this.modifyStoreId = null;
            _this.storeQQ = null;
            _this.showModifyStoreQQ = false;
            _this.getVersionInfo();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.modifyQQLoading = false;
        })
      },
      settingConcat(info) {
        this.modalStoreInfo = info;
        this.contactInfo.mPhoneNumber = info.phone ? info.phone : this.personalPhone;
        this.contactInfo.mQQNumber = info.qqNumber ? info.qqNumber : this.personalQQ;
        this.contactInfo.mqrCode = info.weChatQrPicUrl;
        this.contactInfo.mWXNumber = info.weChatNum;
        this.contactInfo.showPhoneNumber = info.showPhone ? true : false;
        this.showSettingModal = true;
      },
      removewxewmImage() {

      },
      wxewmImageSuccess() {

      },
      handleFormatError() {

      },
      handleMaxSize() {

      },
      // 提交店铺联系方式信息
      confirm() {
        const _this = this;
        const qqReq = /^[1-9][0-9]{4,11}$/;
        if (!_this.contactInfo.mQQNumber) {
          _this.$Message.info('请输入QQ号');
          return
        }
        if (!qqReq.test(_this.contactInfo.mQQNumber)) {
          _this.$Message.info('请输入正确格式的QQ号');
          return
        }
        if (!_this.contactInfo.mWXNumber) {
          _this.$Message.info('请输入微信号');
          return
        }
        // if (!_this.contact.mqrCode) {
        //   _this.$Message.info('请上传微信二维码');
        //   return
        // }
        if (!_this.contactInfo.mPhoneNumber) {
          _this.$Message.info('请输入电话号码');
          return
        }
        if (!(/^1\d{10}$/.test(_this.contactInfo.mPhoneNumber))) {
          _this.$Message.info('请输入正确格式的手机号码');
          return
        }
        _this.loading = true;
        api.completeContact({
          storeId: _this.modalStoreInfo.id,
          qqNumber: _this.contactInfo.mQQNumber,
          phone: _this.contactInfo.mPhoneNumber,
          isShowPhone: _this.contactInfo.showPhoneNumber,
          weChatNum: _this.contactInfo.mWXNumber,
          weChatQrPicUrl: _this.contactInfo.mqrCode
        }).then(res => {
          if (res.status) {
            _this.modalStoreInfo = {};
            _this.contactInfo.mQQNumber = null;
            _this.contactInfo.mPhoneNumber = null;
            _this.contactInfo.showPhoneNumber = false;
            _this.contactInfo.mWXNumber = null;
            _this.contactInfo.mqrCode = null;
            _this.$refs.form.resetFields();
            _this.$Message.success('设置店铺联系方式成功！');
            _this.getVersionInfo();
            _this.showSettingModal = false;
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
        })
      },
      change(value) {
        !value && this.$refs.form.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .store-bind-rules{
    .rules-box{
      background: #F8F8F8;
      padding:10px;
      li{
        margin-top:10px;
      }
    }
    .had-band-title{
      padding:15px 0;
    }
    .had-band-box{
      li{
        background:#F8F8F8;
        min-height:150px;
        box-sizing: border-box;
        padding:15px 0;
        text-align: center;
        margin-right:20px;
        margin-bottom:20px;
        width:236px;
        .concat-box {
          .icon-box {
            width: 33.33%;
            float: left;
          }
        }
      }
      .auditing {
        width: 100%;
        position: absolute;
        padding:8px 0;
        text-align: center;
        color: #fff;
        background: rgba(0,0,0,.7);
        bottom: 0;
      }
      .audit-fail {
        width: 100%;
        position: absolute;
        padding:8px 0;
        text-align: center;
        color: #fff;
        background: rgba(249,40,80,.8);
        bottom: 0;
      }
    }
    .upgrade-vip{
      padding:0 5px;
      border:1px solid $mainColor;
      background-color: #F6E363;
      border-radius: 5px;
      color:$mainColor;
      display: inline-block;
    }
  }
  .setting-modal {
    .tip-info {
      margin-top: 20px;
      border-radius: 5px;
      padding: 5px;
      background: #FFF3D8;
    }
    .concat-info-confirm {
      color: #fff;
      background: $mainColor;
    }
  }

</style>
