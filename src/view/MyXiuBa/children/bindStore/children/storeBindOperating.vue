<template>
  <div class="store-bind-operating">
    <div v-show="protocol" class="pos-rel">
      <a class="backToCommodityLink" @click="protocol=false">返回上一页</a>
      <p class="main-color operating-tip">注意：店铺一旦绑定成功后，将无法修改和解绑，请慎重操作！</p>
      <div class="form-box">
        <p class="main-color choose-type-tip">请核对店铺信息</p>
        <iForm ref="storeBindForm" :v-model="storeBindForm" label-position="right" :label-width="150">
          <Form-item label="店铺类型" prop="storeType" required>
            <RadioGroup v-model="storeBindForm.storeType">
              <Radio label="taobao">淘宝</Radio>
              <Radio label="tmall">天猫</Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="店铺名称" prop="storeName" class="pos-rel" required>
            <iInput type="text" placeholder="请输入店铺名称" v-model="storeBindForm.storeName" disabled></iInput>
          </Form-item>
          <Form-item label="店铺旺旺" prop="storeWw" class="pos-rel" required>
            <iInput type="text" placeholder="请输入店铺旺旺" v-model="storeBindForm.storeWw" disabled></iInput>
          </Form-item>
          <!--<Form-item label="店铺内任意商品链接" prop="storeLink" required>-->
          <!--<iInput type="text" placeholder="请输入你绑定店铺内的任意商品链接" v-model="storeBindForm.storeLink"></iInput>-->
          <!--</Form-item>-->
          <Form-item>
            <iButton class="verified-btn" size="large" :loading="bindBtnLoading" @click="verifiedAndBindFunc()">
              验证并绑定店铺
            </iButton>
          </Form-item>
        </iForm>
      </div>
    </div>
    <div v-show="!protocol" class="mt-20 pos-rel">
      <router-link to="/user/bind-store/store-bind-rules" class="backwards">返回上一页</router-link>
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
  import {getUrlParams, delHtmlTag} from '@/config/utils'
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
          storeLink: '',
          shopId:'',
          sellerId:''
        },
        commodityLink: '',
        showDemo: false,
        protocol: false,
        confirmBtnLoading: false,
        bindBtnLoading: false,
      }
    },
    created() {

    },
    methods: {
      //根据商品链接判断店铺类型
      getStoreType() {
        const _this = this;
        let taobaoUrl = /((taobao.com).*?)/;
        let tmallUrl = /((tmall.com).*?)/;
        if (taobaoUrl.test(_this.commodityLink)) {
          _this.storeBindForm.storeType = 'taobao';
        } else if (tmallUrl.test(_this.commodityLink)) {
          _this.storeBindForm.storeType = 'tmall';
        }
      },
      //根据商品链接获取店铺信息
      getStoreInfoByLink() {
        const _this = this;
        if (!_this.commodityLink) {
          _this.$Message.warning('亲，店铺链接不能为空！');
          return
        }
        let URL_REG = /(((item|detail|).(tmall|taobao)).*?)/;
        if (!URL_REG.test(_this.commodityLink)) {
          _this.$Message.warning('亲，请输入天猫或淘宝店铺的商品链接！');
          return
        }
        _this.getStoreType();
        _this.confirmBtnLoading = true;
        // let commodityId = getUrlParams(_this.commodityLink, 'id');
        // api.getStoreInfo({commodityId: commodityId}).then(res => {
        //   _this.confirmBtnLoading = false;
        //   if (res.status) {
        //     let tempData = res.data;
        //     let decodeStoreName = decodeURI(tempData.store.name);
        //     _this.storeBindForm.storeName = delHtmlTag(decodeStoreName);
        //     let decodeStoreWw = decodeURI(tempData.store.wangwangId);
        //     _this.storeBindForm.storeWw = delHtmlTag(decodeStoreWw);
        //     _this.storeBindForm.storeLink = _this.commodityLink;
        //     _this.storeBindForm.shopId = tempData.store.shopId;
        //     _this.storeBindForm.sellerId = tempData.store.sellerId;
        //     _this.protocol = true;
        //   } else {
        //     _this.$Message.error(res.msg);
        //   }
        // })
        api.getStoreInfoByLink({link:_this.commodityLink}).then(res=>{
          _this.confirmBtnLoading = false;
          if(res.status){
            let tempData = res.data;
            let decodeStoreName = decodeURI(tempData.name);
            _this.storeBindForm.storeName = delHtmlTag(decodeStoreName);
            let decodeStoreWw = decodeURI(tempData.wangwangId);
            _this.storeBindForm.storeWw = delHtmlTag(decodeStoreWw);
            _this.storeBindForm.storeLink = _this.commodityLink;
            _this.storeBindForm.shopId = tempData.shopId;
            _this.storeBindForm.sellerId = tempData.sellerId;
            _this.protocol = true;
          }else {
            _this.$Message.error(res.msg);
          }
        })
      },
      //验证并绑定店铺
      verifiedAndBindFunc() {
        let _this = this;
        if (!_this.storeBindForm.storeType) {
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
        // if (!_this.storeBindForm.storeLink) {
        //   _this.$Message.warning('亲，店铺链接不能为空！');
        //   return
        // }
        if (_this.storeBindForm.storeType === 'taobao') {
          let URL_REG = /(((item|detail).(taobao.com)).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接需要与所选的店铺类型保持一致！');
            return
          }
        }
        if (_this.storeBindForm.storeType === 'tmall') {
          let URL_REG = /(((item|detail).(tmall.com)).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接需要与所选的店铺类型保持一致！');
            return
          }
        }
        _this.bindBtnLoading = true;
        api.bindStore({
          storeType: _this.storeBindForm.storeType,
          storeName: _this.storeBindForm.storeName,
          storeAlitm: _this.storeBindForm.storeWw,
          shopId: _this.storeBindForm.shopId,
          sellerId:_this.storeBindForm.sellerId
        }).then(res => {
          _this.bindBtnLoading = false;
          if (res.status) {
            _this.$Message.success({
              content: '店铺绑定成功！',
              duration: 1
            });
            _this.$router.replace({name: 'StoreBindRules'});
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },

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
        right: -170px;
      }
      .viewStoreWw {
        position: absolute;
        bottom: 0;
        right: -170px;
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
    .backwards {
      position: absolute;
      top: -60px;
      right: 0;
    }
    .backToCommodityLink {
      position: absolute;
      top: -40px;
      right: 0;
    }
  }

</style>
