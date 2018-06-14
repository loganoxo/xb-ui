<template>
  <div class="store-bind-operating">
    <div v-show="protocol" class="pos-rel">
      <a class="backToCommodityLink" @click="protocol=false">返回上一页</a>
      <p class="main-color operating-tip">注意：店铺一旦绑定成功后，将无法修改和解绑，请核对店铺信息，慎重操作！</p>
      <div class="form-box">
        <div>
          <i class="required mr-5"></i>
          <span class="f-b mr-20">店铺类型：</span>
          <RadioGroup v-model="storeBindForm.storeType">
            <Radio label="taobao">淘宝</Radio>
            <Radio label="tmall">天猫</Radio>
          </RadioGroup>
        </div>
        <div class="mt-10">
          <i class="required mr-5"></i>
          <span class="f-b mr-20">店铺名称：</span>
          {{storeBindForm.storeName}}
        </div>
        <div class="mt-10">
          <i class="required mr-5"></i>
          <span class="f-b mr-20">店铺旺旺：</span>
          {{storeBindForm.storeWw}}
        </div>
        <div class="mt-10 clear">
          <i class="required mr-5 left"></i>
          <span class="f-b mr-20 left">店铺后台截图：</span>
          <div class="left ml-20">
            <div class="clear">
              <upload key="backstageImage" class="left"
                      :on-success="uploadSuccess"
                      :default-file-list="defaultScreenshotList"
                      :on-remove="removeImage"
                      :format="['jpg','jpeg','png','gif','bmp']"
                      :max-size="1024"
                      name="storeBackStage"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      type="drag">
                <div class="camera">
                  <icon type="camera" size="20"></icon>
                </div>
              </upload>
              <span class="left mt-20 ml-10 blue" @click="showDemoPicture = true">【查看示例图】</span>
            </div>
            <div class="mt-20 cl666">（为避免恶意绑定他人店铺必须上传店铺的后台登录截图）</div>
          </div>
        </div>
        <div v-if="bindStatus === 1" class="mt-20">
          <iButton class="auditing-btn" size="large" :loading="bindBtnLoading">
            店铺审核中...
          </iButton>
          <iButton class="delete-btn ml-20" size="large" :loading="bindBtnLoading" @click="deleteStore ">
            删除此店铺
          </iButton>
        </div>
        <div v-else-if="bindStatus === 3" class="mt-20">
          <iButton class="resubmit-btn" size="large" :loading="bindBtnLoading" @click="verifiedAndBindFunc">
            提交店铺审核
          </iButton>
          <iButton class="delete-btn ml-20" size="large" :loading="bindBtnLoading" @click="deleteStore">
            删除此店铺
          </iButton>
        </div>
        <div v-else class="mt-20">
          <iButton class="verified-btn" size="large" :loading="bindBtnLoading" @click="verifiedAndBindFunc">
            提交店铺审核
          </iButton>
        </div>
      </div>
      <div v-if="bindStatus === 3" class="tip">审核不通过：店铺截图对应的店铺名称不一致，请重新提交</div>
      <div v-else class="tip">提示：店铺绑定审核时间1个工作日左右，若超过一个工作日请联系客服！</div>
    </div>
    <div v-show="!protocol" class="mt-20 pos-rel">
      <router-link to="/user/bind-store/store-bind-rules" class="backwards">返回上一页</router-link>
      <span class="required"></span>
      <span class="mr-10">需要您提供店铺内任意商品链接</span>
      <iInput type="text" size="large" class="commodity-input" v-model="commodityLink"></iInput>
      <div class="text-ct mt-30">
        <iButton class="confirm-link-btn" :loading="confirmBtnLoading" @click="getStoreInfoByLink">确认</iButton>
      </div>
    </div>
    <!--示例图弹窗-->
    <modal v-model="showDemoPicture" width="1000">
      <img src="~assets/img/bind-store/store-backstage-demo.png" alt="店铺后台示例图" width="100%">
    </modal>
  </div>
</template>

<script>
  import {Form, Input, Radio, Button, Modal, Icon} from 'iview';
  import {getUrlParams, delHtmlTag} from '@/config/utils'
  import api from '@/config/apiConfig'
  import Upload from '@/components/Upload'
  import {aliCallbackImgUrl} from '@/config/env'

  export default {
    name: "store-bind-operating",
    components: {
      iInput: Input,
      iButton: Button,
      iForm: Form,
      FormItem: Form.Item,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Modal: Modal,
      Upload: Upload,
      Icon:Icon
    },
    data() {
      return {
        storeBindForm: {
          storeType: '',
          storeName: '',
          storeWw: '',
          storeLink: '',
          shopId: '',
          sellerId: ''
        },
        commodityLink: '',
        showDemo: false,
        protocol: false,
        confirmBtnLoading: false,
        bindBtnLoading: false,
        // query:'',
        storeBackstageImage:null,
        defaultScreenshotList:[],
        showDemoPicture:false,
        currentStoreInfo:{}
      }
    },
    computed:{
      pageChange() {
        return this.$route.query.protocol
      },
      fromPage() {
        return this.$route.query.from
      },
      storeId() {
        return this.$route.query.id
      },
      bindStatus() {
        return this.$route.query.status
      }

    },
    created() {
      const _this = this;
      // this.query = this.$route.query.from;
      if (_this.pageChange) {
        _this.protocol = true;
        _this.getStoreBindInfo();
        console.log(_this.storeId)
      }
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
        api.getStoreInfoByLink({link: _this.commodityLink}).then(res => {
          _this.confirmBtnLoading = false;
          if (res.status) {
            let tempData = res.data;
            let decodeStoreName = decodeURI(tempData.name);
            _this.storeBindForm.storeName = delHtmlTag(decodeStoreName);
            let decodeStoreWw = decodeURI(tempData.wangwangId);
            _this.storeBindForm.storeWw = delHtmlTag(decodeStoreWw);
            _this.storeBindForm.storeLink = _this.commodityLink;
            _this.storeBindForm.shopId = tempData.shopId;
            _this.storeBindForm.sellerId = tempData.sellerId;
            _this.protocol = true;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      //验证并绑定店铺
      verifiedAndBindFunc() {
        let _this = this;
        if (_this.storeBindForm.storeType === 'taobao') {
          let URL_REG = /((taobao.com).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接与所选的店铺类型不一致！');
            return
          }
        }
        if (_this.storeBindForm.storeType === 'tmall') {
          let URL_REG = /((tmall.com).*?)/;
          if (!URL_REG.test(_this.commodityLink)) {
            _this.$Message.warning('亲，店铺链接与所选的店铺类型不一致！');
            return
          }
        }
        if (!_this.storeBackstageImage) {
          _this.$Message.warning('亲，请上传店铺后台截图！');
          return
        }
        _this.bindBtnLoading = true;
        api.bindStore({
          storeType: _this.storeBindForm.storeType,
          storeName: _this.storeBindForm.storeName,
          storeAlitm: _this.storeBindForm.storeWw,
          shopId: _this.storeBindForm.shopId,
          sellerId: _this.storeBindForm.sellerId,
          screenshot:_this.storeBackstageImage
        }).then(res => {
          _this.bindBtnLoading = false;
          if (res.status) {
            _this.$Message.success({
              content: '店铺绑定申请已提交！',
              duration: 1
            });
            if (this.fromPage) {
              _this.$router.replace({path: '/user/task-release'});
            } else {
              _this.$router.replace({name: 'StoreBindRules'});
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 上传店铺后天截图相关函数
      uploadSuccess(res) {
        this.storeBackstageImage = aliCallbackImgUrl + res.name;
      },
      removeImage() {
        this.storeBackstageImage = null;
        this.backstageImageList = [];
      },
      handleFormatError() {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: `图片 ${file.name} 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。`
        })
      },
      handleMaxSize() {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: `图片 ${file.name} 太大，不能超过 1M`
        })
      },
      // 获取商家绑定的店铺列表(针对有问题的店铺查看详情时)
      getStoreBindInfo(){
        const _this = this;
        api.getStoreBindInfo({}).then(res=>{
          if(res.status){
            if(res.data.length > 0){
              _this.storeInfoList = res.data;
              _this.currentStoreInfo = _this.storeInfoList.find(item => {
                return item.id === _this.storeId;
              });
              _this.storeBindForm.storeName = _this.currentStoreInfo.storeName;
              _this.storeBindForm.storeWw = _this.currentStoreInfo.storeAlitm;
              _this.storeBindForm.storeType = _this.currentStoreInfo.storeType;
              _this.storeBindForm.shopId = _this.currentStoreInfo.id;
              _this.storeBindForm.sellerId = _this.currentStoreInfo.sellerId;
              _this.storeBackstageImage = _this.currentStoreInfo.screenshot;
              _this.defaultScreenshotList = [{src:_this.currentStoreInfo.screenshot}]
            }
          }else{
            Toast(res.msg);
          }
        })
      },
      // 删除店铺
      deleteStore() {
        const _this = this;
        api.deleteStore({id:_this.storeId}).then(res => {
          if (res.status) {
            _this.$router.replace({name:'StoreBindRules'});
            _this.$Message.success('删除店铺成功');
          } else {
            _this.$Message.warning(res.msg);
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
      padding: 20px 0 10px 90px;
    }
    .form-box {
      width: 800px;
      padding-left: 90px;
      .verified-btn {
        background-color: #FF6865;
        color: #fff;
        width:300px;
        margin-left:50px;
      }
      .auditing-btn {
        width:200px;
        margin-left:100px;
        color:#999;
      }
      .delete-btn {
        width: 200px;
        background-color: #FF6865;
        color: #fff;
      }
      .resubmit-btn{
        width: 200px;
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
    .camera {
      width: 58px;
      height: 58px;
      line-height: 58px;
    }
    .tip {
      padding:15px 30px;
      margin:40px auto;
      background: #FFF0D8;
      border-radius: 5px;
      width: 95%;
    }
  }

</style>
