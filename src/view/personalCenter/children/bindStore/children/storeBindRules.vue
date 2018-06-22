<template>
  <div class="store-bind-rules">
    <div class="rules-box">
      <p class="rules-title">店铺绑定说明:</p>
      <ul>
        <li>1、免费商家可绑定{{freeStoreBindNum}}个店铺，VIP商家可绑定{{vipStoreBindNum}}，SVIP商家可绑定{{svipStoreBindNum}}个店铺。</li>
        <li>2、店铺绑定成功后无法解绑和修改，请慎重操作！</li>
        <li>3、发布活动的宝贝必须是所绑定店铺内的宝贝，否则活动无法发布！</li>
      </ul>
    </div>
    <p class="had-band-title fs-16">我已绑定的店铺 <span class="main-color">（根据你的会员版本，最多可绑定<span v-if="memberLevel === 100 || memberLevel === null">{{freeStoreBindNum}}</span><span v-if="memberLevel === 200">{{vipStoreBindNum}}</span><span v-if="memberLevel === 300">{{svipStoreBindNum}}</span>个店铺。）</span> </p>
    <ul class="had-band-box clear">
      <li class="left pos-rel" v-for="storeInfo in storeInfoList" :key="storeInfo.id">
        <img src="~assets/img/common/taobao-logo.png" v-if="storeInfo.storeType === 'taobao'">
        <img src="~assets/img/common/tmall-logo.png" v-if="storeInfo.storeType === 'tmall'">
        <p class="store-name mt-15 f-b fs-16">{{storeInfo.storeName}}</p>
        <p class="store-ww mt-15">店铺旺旺：<span>{{storeInfo.storeAlitm}}</span></p>
        <p v-if="storeInfo.applyStatus === 1" class="auditing cursor-p" @click="checkDetail(storeInfo)">店铺审核中...（查看详情）</p>
        <p v-if="storeInfo.applyStatus === 3" class="audit-fail cursor-p" @click="checkDetail(storeInfo)">审核未通过...（查看详情）</p>
      </li>
      <li v-if="isShowBindBtn" class="left cursor-p" @click="toBindStore">
        <p class="mt-20"><Icon type="plus" size="50" color="#999"></Icon></p>
        <p class="bind-new-store mt-10 fs-16 f-b" v-if="showBindStoreText">绑定新店铺</p>
        <!--<p class="upgrade-vip mt-10" v-if="showUpgradeText">升级<span v-if="memberLevel===200">S</span>VIP绑定更多店铺</p>-->
        <p class="upgrade-vip mt-10" v-if="showUpgradeText">升级VIP绑定更多店铺</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Icon} from 'iview';
  import api from '@/config/apiConfig'
  import {delHtmlTag} from '@/config/utils'
  export default {
    name: "store-bind-rules",
    components:{
      Icon:Icon
    },
    data(){
      return {
        storeInfoList:[],
        isShowBindBtn:true,
        freeStoreBindNum:0,
        vipStoreBindNum:0,
        svipStoreBindNum:0,
        showBindStoreText:true,
        showUpgradeText:false,
        // availableStoreList:[]
      }
    },
    computed:{
      isMember(){
        return this.$store.getters.isMemberOk;
      },
      memberLevel(){
        return this.$store.getters.getMemberLevel;
      },
    },
    created(){
      this.getVersionInfo();
      // this.getStoreBindInfo();
    },
    methods:{
      // 获取会员版本说明（主要是可绑定店铺数量）
      getVersionInfo(){
        const _this = this;
        api.getMemberInstructionsInfo().then(res=>{
          let tempData = [];
          if(res.status){
            tempData = res.data;
            tempData.forEach(item=>{
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
      getStoreBindInfo(){
        const _this = this;
        api.getStoreBindInfo({}).then(res=>{
          if(res.status){
            if(res.data.length > 0){
              _this.storeInfoList = res.data;
              // _this.availableStoreList = _this.storeInfoList.filter(item => {
              //   return item.applyStatus === 2;
              // });
              _this.bindBtnText();
            }
          }else{
            Toast(res.msg);
          }
        })
      },
      // 根据会员等级和已绑定店铺数量页面绑定按钮显示不同
      bindBtnText(){
        const _this = this;
        // 免费
        if ((_this.memberLevel === 100 || _this.memberLevel === null) && (_this.storeInfoList.length >= _this.freeStoreBindNum)){
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
      toBindStore(){
        const _this = this;
        if ((_this.memberLevel ===100 || _this.memberLevel === null) && _this.storeInfoList.length >= _this.freeStoreBindNum) {
          _this.$router.push({path:'/user/vip-member/order'});
        } else {
          this.$router.push({name:'StoreBindOperating'});
        }
        // 下面为有svip版本的逻辑，先保留着
        // if((_this.memberLevel ===100 || _this.memberLevel === null) && _this.storeInfoList.length >= _this.freeStoreBindNum){
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
      }
    },
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
        height:150px;
        box-sizing: border-box;
        padding:15px 0;
        text-align: center;
        margin-right:20px;
        margin-bottom:20px;
        width:236px;
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


</style>
