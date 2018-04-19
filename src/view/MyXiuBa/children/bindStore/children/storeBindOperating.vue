<template>
  <div class="store-bind-operating">
    <div v-show="protocol">
      <p class="main-color operating-tip">注意：店铺一旦绑定成功后，将无法修改和解绑，请慎重操作！</p>
      <div class="form-box">
        <p class="main-color choose-type-tip">请手动选择店铺类型</p>
        <iForm ref="storeBindForm" :v-model="storeBindForm" label-position="right" :label-width="150">
          <Form-item label="店铺类型" prop="storeType" required>
            <RadioGroup v-model="storeBindForm.storeType">
              <Radio label="taobao">淘宝</Radio>
              <Radio label="tmall">天猫</Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="店铺名称" prop="storeName" class="pos-rel" required>
            <iInput type="text" placeholder="请输入店铺名称" v-model="storeBindForm.storeName" disabled></iInput>
            <a class="viewStoreName" @click="showDemo = true">【如何查看店铺名称】</a>
          </Form-item>
          <Form-item label="店铺旺旺" prop="storeWw" class="pos-rel" required>
            <iInput type="text" placeholder="请输入店铺旺旺" v-model="storeBindForm.storeWw" disabled></iInput>
            <a class="viewStoreWw" @click="showDemo = true">【如何查看店铺旺旺】</a>
          </Form-item>
          <!--<Form-item label="店铺内任意商品链接" prop="storeLink" required>-->
            <!--<iInput type="text" placeholder="请输入你绑定店铺内的任意商品链接" v-model="storeBindForm.storeLink"></iInput>-->
          <!--</Form-item>-->
          <Form-item>
            <iButton class="verified-btn" size="large" :loading="bindBtnLoading" @click="verifiedAndBindFunc()">验证并绑定店铺</iButton>
          </Form-item>
        </iForm>
      </div>
      <Modal v-model="showDemo" width="900">
        <div class="demo-content">
          <img src="~assets/img/case-demo/store-bind-demo.png">
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
    <div v-show="!protocol" class="mt-20">
      <span class="required"></span>
      <span class="mr-10">需要您提供店铺内任意商品链接</span>
      <iInput type="text" size="large" class="commodity-input" v-model="commodityLink"></iInput>
      <div class="text-ct mt-30">
        <iButton class="confirm-link-btn" :loading="confirmBtnLoading" @click="getStoreInfoByLink()">确认</iButton>
      </div>
    </div>
  </div>
</template>

<script>
  import {Form, Input, Radio, Button, Modal} from 'iview';
  import {getUrlParams} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: "store-bind-operating",
    components: {
      iInput: Input,
      iButton: Button,
      iForm: Form,
      FormItem: Form.Item,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Modal: Modal
    },
    data() {
      return {
        storeBindForm: {
          storeType: '',
          storeName: '',
          storeWw: '',
          storeLink: ''
        },
        commodityLink: '',
        showDemo: false,
        protocol: false,
        confirmBtnLoading: false,
        bindBtnLoading:false
      }
    },
    created() {
    },
    methods: {
      //验证并绑定店铺
      verifiedAndBindFunc() {
        let _this = this;
        if(!_this.storeBindForm.storeType){
          _this.$Message.warning('亲，店铺类型不能为空！');
          return
        }
        if (!_this.storeBindForm.storeName) {
          _this.$Message.warning('亲，店铺名称不能为空！');
          return
        }
        if (!_this.storeBindForm.storeWw) {
          _this.$Message.warning('亲，店铺旺旺名不能为空！');
          return
        }
        if (!_this.storeBindForm.storeLink) {
          _this.$Message.warning('亲，店铺链接不能为空！');
          return
        }
        if (_this.storeBindForm.storeType === 'taobao') {
          let URL_REG = /(((item|detail).(taobao)).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接需要与所选的店铺类型保持一致！');
            return
          }
        }
        if (_this.storeBindForm.storeType === 'tmall') {
          let URL_REG = /((tmall.com).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接需要与所选的店铺类型保持一致！');
            return
          }
        }
        _this.bindBtnLoading = true;
        api.bindStore({
          storeType: _this.storeBindForm.storeType,
          storeName: _this.storeBindForm.storeName,
          storeAlitm: _this.storeBindForm.storeWw
        }).then(res => {
          if (res.status) {
            _this.bindBtnLoading = false;
            console.log(res.data);
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      //根据商品链接获取店铺信息
      getStoreInfoByLink() {
        const _this = this;
        if (!_this.commodityLink) {
          _this.$Message.warning('亲，店铺链接不能为空！');
          return
        }
        let URL_REG = /(((item|detail|).(tmall|taobao)).*?)/;
        if(!URL_REG.test(_this.commodityLink)){
          _this.$Message.warning('亲，请输入天猫或淘宝店铺的商品链接！');
          return
        }
        _this.confirmBtnLoading = true;
        let commodityId = getUrlParams(_this.commodityLink, 'id');
        api.getStoreInfo({commodityId: commodityId}).then(res => {
          if (res.status) {
            _this.confirmBtnLoading = false;
            let tempData = res.data;
            _this.storeBindForm.storeName = tempData.store.name;
            _this.storeBindForm.storeWw = tempData.store.wangwangId;
            _this.storeBindForm.storeLink = _this.commodityLink;
            _this.protocol = true;
            console.log(res.data);
          } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .store-bind-operating {
    .operating-tip {
      padding: 10px 0 10px 90px;
    }
    .form-box {
      width: 600px;
      .choose-type-tip {
        padding-left: 125px;
      }
      .viewStoreName {
        position: absolute;
        bottom: 0;
        right: -150px;
      }
      .viewStoreWw {
        position: absolute;
        bottom: 0;
        right: -150px;
      }
      .verified-btn {
        background-color: #FF6865;
        color: #fff;
      }
    }
    .commodity-input {
      width: 600px;
      display: inline-block;
    }
    .confirm-link-btn {
      background: #FF6865;
      width: 240px;
      color: #fff;
    }
  }

</style>
