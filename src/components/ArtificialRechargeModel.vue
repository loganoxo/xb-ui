<template>
    <!--<Modal v-model="showModal">-->
      <!--<p class="pt-20 pl-10 f-b">充值方式（人工）：</p>-->
      <!--<p class="pt-10 pl-10 f-b">1、直按转账到下方指定账号。</p>-->
      <!--<p class="pt-10 pl-10 f-b">2、将转账成功的截图私聊发给客服，客服确认后为您充值。</p>-->
      <!--<div class="text-ct">-->
        <!--<img src="~assets/img/common/zfbewm.png" alt="">-->
      <!--</div>-->
      <!--<div slot="footer" class="text-ct footer">-->
        <!--<a class="contactService" href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=3416123233" target="_blank" >我已成功转账，联系客服(QQ:3416123233)</a>-->
      <!--</div>-->
    <!--</Modal>-->
  <div class="shade-box" @click="colseModal">
    <div class="content-box">
      <span class="colse-btn" @click="colseModal">X</span>
      <p class="pt-20 pl-10 f-b text-lf">充值方式（人工）：</p>
      <p class="pt-10 pl-10 f-b text-lf">1、直按转账到下方指定账号。</p>
      <p class="pt-10 pl-10 f-b text-lf">2、将转账成功的截图私聊发给客服，客服确认后为您充值。</p>
      <div class="text-ct">
        <img src="~assets/img/common/zfbewm.png" alt="">
      </div>
      <div class="text-ct footer">
        <a class="contactService" href="http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=3416123233" target="_blank" >我已成功转账，联系客服(QQ:3416123233)</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Modal} from 'iview';
  export default {
    name: "artificial-recharge-model",
    components:{
      Modal:Modal,
    },
    // props:{
    //   showModal:{
    //     type:Boolean,
    //     required:true,
    //   }
    // },
    data(){
      return {
        // showModal:true
      }
    },

    methods:{
      colseModal(){
        this.$emit('colseFreePayModal');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .footer{
    padding:10px 0 20px;
  }
  .contactService{
    color:#fff;
    background:$mainColor;
    padding:10px 20px;
    border-radius: 10px;
  }

  .shade-box{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 1;
    background: rgba(0,0,0,0.4);
  }
  .content-box{
    position: relative;
    padding:10px;
    background: #fff;
    border-radius: 10px;
    width:500px;
    margin:150px auto;
    .colse-btn{
      position: absolute;
      top:8px;
      right:12px;
      font-size:16px;
      font-weight: bold;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

</style>
