<template>
  <modal :value="closable" title="添加黑名单" @on-visible-change="modalChange" :mask-closable="false">
    <div>
      <span class="inline-block title">淘宝账号（旺旺ID）：</span>
      <i-input class="ww-name" :disabled="disabled" v-model="alitmAccount" style="width: 120px;"/>
    </div>
    <div class="mt-20">
      <span class="inline-block title">拉黑原因：</span>
      <i-select :disabled="disabled" v-model="addToBlackListReason" style="width:300px;" @on-change="selectChange">
        <i-option style="width:300px;" v-for="(item ,index) in reasonList" :value="item.reasonStatus" :key="index">{{item.reasonDec}}</i-option>
      </i-select>
    </div>
    <div class="mt-20" v-show="addToBlackListReason === 'other_reason'">
      <span class="inline-block title">填写原因：</span>
      <i-input type="textarea" v-model="addToBlackOtherReason" :disabled="disabled" placeholder="100字以内" style="width:300px"/>
    </div>
    <div class="mt-20" v-if="addToBlackListReason && addToBlackListReason !== 'tao_ke' && addToBlackListReason !== 'none_reason'">
      <span>记入征信体系：</span>
      <checkbox v-model="addToCredit" :disabled="disabled">需要</checkbox>
      <span class="cl999">（成功计入征信体系后， <span class="main-color">火眼金睛</span>会统计此条拉黑记录）</span>
    </div>
    <div class="mt-5 cl999 ml-88" v-show="addToCredit && addToBlackListReason">记入征信体系需要提交截图证明，由平台审核是否属实，审核期间及审核结果均不影响您正常拉黑，即此用户无法申请您发布的任何活动。</div>
    <div class="mt-20 clear" v-show="addToCredit && addToBlackListReason">
      <span class="left mt-20">相关截图：</span>
      <upload class="left ml-5"
              ref="upload"
              :on-success="bankListImageSuccess"
              :disabled="disabled"
              :default-file-list="bankListDefaultList"
              :on-remove="removeBankListImage"
              :format="['jpg','jpeg','png','gif','bmp']"
              :max-size="1024"
              name="screenshots"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag">
        <div class="camera">
          <icon type="camera" size="20"/>
        </div>
      </upload>
      <span class="ml-10 mt-20 left cl999">支持jpg/jpeg/gif/bmp格式，大小不超过10M，最多可上传5张</span>
    </div>
    <div class="black-list-error-tip mt-20" v-if="blackListInfo.auditStatus && blackListInfo.auditStatus === 3"><icon color="#FF9900" type="information-circled"/><span class="ml-5">审核不通过：{{blackListInfo.refuseReason}}</span></div>
    <div slot="footer" class="text-ct">
      <i-button :disabled="disabled" type="error" size="large" class="pl-40 pr-40" @click="confirm" :loading="loading">确定</i-button>
    </div>
  </modal>
</template>

<script>
  import {Modal, Input, Select, Option, Checkbox, Button, Icon} from 'iview'
  import Upload from '@/components/Upload'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  export default {
    name: "add-to-black-list-modal",
    components: {
      Modal: Modal,
      Icon: Icon,
      Checkbox: Checkbox,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      iButton: Button,
      Upload: Upload,
    },
    props: {
      closable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onSuccess: {
        type: Function,
        default() {
          return {}
        }
      },
      blackListInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        reasonList: [
          {
            reasonStatus: 'none_reason',
            reasonDec: '无理由（仅屏蔽此用户申请，不记入征信体系）'
          },
          {
            reasonStatus: 'tao_ke',
            reasonDec: '走淘客（仅屏蔽此用户申请，不记入征信体系）'
          },
          {
            reasonStatus: 'illegal_operation',
            reasonDec: '不按要求操作'
          },
          {
            reasonStatus: 'danger_account',
            reasonDec: '此号不安全'
          },
          {
            reasonStatus: 'sales_return',
            reasonDec: '有退货行为'
          },
          {
            reasonStatus: 'other_reason',
            reasonDec: '其他'
          },
        ],
        addToBlackListModal: false,
        loading: false,
        addToBlackListReason: null,
        addToBlackOtherReason: null,
        alitmAccount: null,
        addToCredit: false,
        bankListDefaultList: [],
        screenshot: null,
      }
    },
    methods: {
      bankListImageSuccess(res) {
        this.screenshot = aliCallbackImgUrl + res.name
      },
      removeBankListImage() {
        this.screenshot = null
      },
      handleFormatError(file) {
        this.$Message.warning('图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。')
      },
      handleMaxSize(file) {
        this.$Message.warning('图片 ' + file.name + ' 太大，不能超过 1M')
      },
      modalChange(value) {
        if (value) {
          this.alitmAccount = this.blackListInfo.alitmAccount ? this.blackListInfo.alitmAccount : null;
          this.addToBlackListReason = this.blackListInfo.reasonCode ? this.blackListInfo.reasonCode : null;
          this.addToBlackOtherReason = this.blackListInfo.reasonCode && this.blackListInfo.reasonCode === 'other_reason' ? this.blackListInfo.reasonStr : null;
          this.addToCredit = this.blackListInfo.addToCredit ? this.blackListInfo.addToCredit : null;
          this.blackListInfo.screenshot ? this.bankListDefaultList.push({src: this.blackListInfo.screenshot}) : [];
          this.screenshot = this.blackListInfo.screenshot ?  this.blackListInfo.screenshot : null;
        } else {
          this.addToBlackListReason = null;
          this.$emit('change', false);
          this.alitmAccount = null;
          this.addToBlackListReason = null;
          this.addToBlackOtherReason = null;
          this.addToCredit = false;
          this.bankListDefaultList = [];
          this.$refs.upload.fileList.splice(0, 1);
        }
      },
      selectChange(value) {
        this.addToCredit = !(value === 'none_reason' || value === 'tao_ke');
      },
      confirm() {
        const _this = this;
        if (!_this.alitmAccount) {
          _this.$Message.warning("请填写要拉黑的旺旺号！");
          return;
        }
        if (!_this.addToBlackListReason) {
          _this.$Message.warning("请选择拉黑原因！");
          return;
        }
        if (_this.addToCredit && !_this.screenshot) {
          _this.$Message.warning("请上传拉黑相关凭证截图！");
          return;
        }
        if (_this.addToBlackListReason === 'other_reason' && !_this.addToBlackOtherReason) {
          _this.$Message.warning("请填写拉黑原因！");
          return;
        }
        _this.loading = true;
        api.addShowkerToBlackList({
          id: _this.blackListInfo.id ? _this.blackListInfo.id : '',
          alitmAccount: _this.alitmAccount,
          reasonCode: _this.addToBlackListReason,
          reasonText: _this.addToBlackOtherReason,
          addToCredit: _this.addToCredit,
          screenshot: JSON.stringify([_this.screenshot]),
        }).then(res => {
          if (res.status) {
            _this.$emit('change', false);
            _this.$Message.success("添加黑名单成功！");
            _this.onSuccess();
          } else {
            _this.$Message.error(res.msg)
          }
          _this.loading = false;
        })
      }
    }
  }
</script>

<style lang="scss">
  .black-list-error-tip {
    width: 100%;
    min-height: 36px;
    line-height: 36px;
    background-color: #FFF5E6;
    border: 1px solid #FFEBCC;
    border-radius: 5px;
    padding-left: 10px;
  }
</style>
