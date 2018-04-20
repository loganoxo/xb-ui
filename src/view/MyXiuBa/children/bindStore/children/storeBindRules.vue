<template>
  <div class="store-bind-rules">
    <div class="rules-box">
      <p class="rules-title">店铺绑定说明:</p>
      <ul>
        <li>1、每个商家可以绑定一个店铺，无论是淘宝或者天猫，如果需要绑定更多，则需要付费成为会员。</li>
        <li>2、店铺绑定成功后无法解绑和修改，请慎重操作！</li>
        <li>3、发布活动的宝贝必须是所绑定店铺内的宝贝，否则活动无法发布！</li>
      </ul>
    </div>
    <p class="has-bind-title fs-16">我已绑定的店铺</p>
    <ul class="has-bind-box clear">
      <li class="left" v-for="storeInfo in storeInfoLists" :key="storeInfo.id">
        <img src="~assets/img/common/taobao-logo.png" v-if="storeInfo.storeType === 'taobao'">
        <img src="~assets/img/common/tmall-logo.png" v-if="storeInfo.storeType === 'tmall'">
        <p class="store-name mt-15 f-b fs-16">{{storeInfo.storeName}}</p>
        <p class="store-ww mt-15">店铺旺旺：<span>{{storeInfo.storeAlitm}}</span></p>
      </li>
      <li class="left cursor-p" @click="toStoreBindOperating">
        <p class="mt-20"><Icon type="plus" size="50" color="#999"></Icon></p>
        <p class="bind-new-store f-b fs-16 mt-10">绑定新店铺</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Icon} from 'iview';
  import api from '@/config/apiConfig'
  export default {
    name: "store-bind-rules",
    components:{
      Icon:Icon
    },
    data(){
      return {
        storeInfoLists:[],
      }
    },
    computed:{
      isMember(){
        return this.$store.state.userInfo.memberOK;
      },
      memberIsExpire(){
        return this.$store.getters.getMembershipIsExpire;
      }
    },
    created(){
      this.getStoreBindInfo();
    },
    methods:{
      //获取商家绑定的店铺列表
      getStoreBindInfo(){
        const _this = this;
        api.getStoreBindInfo({}).then(res=>{
          if(res.status){
            if(res.data.length > 0){
              _this.storeInfoLists = res.data;
            }
          }else{
            Toast(res.msg);
          }
        })
      },
      //去往绑定新店铺页面（需要判断）
      toStoreBindOperating(){
        const _this = this;
        if(_this.storeInfoLists.length >= 1){
          if(_this.isMember && !_this.memberIsExpire){
            this.$router.push({name:'StoreBindOperating'});
          }else{
            this.$router.push({name:'VipMember'});
          }
        } else {
          this.$router.push({name:'StoreBindOperating'});
        }
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
    .has-bind-title{
      padding:15px 0;
    }
    .has-bind-box{
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
    }
  }


</style>
