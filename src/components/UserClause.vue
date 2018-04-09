<template>
  <div class="user-clause">
    <em class="close-model" @click="closeClauseModel">&times;</em>
    <template v-if="isShowClause === 'merchant'">
      <h2 class="text-ct mt-46">白拿拿-商家平台服务条款</h2>
      <div class="user-clause-con mt-20">
        <p class="main-color">亲，感谢您成为白拿拿商家用户！</p>
        <p class="mt-10 ml-15">本指引非常重要，请您一定认真看完！</p>
        <p class="mt-5 ml-15">在白拿拿，商家用户的流程图如下：</p>
        <img class="mt-20" src="~assets/img/common/merchant-clause.jpg" alt="商家用户流程图"/>
        <p class="mt-10 ml-15">图中给予了您充分时间进行相关审核，若您不能在规定时间内审核完毕，系统将自动通过！</p>
        <p class="mt-10 ml-15 text-indent">在白拿拿平台，除了“体验专区”以外，其余板块都要求商家用户拍A发A（拿手在淘宝上拍下是什么商品，商家必须邮寄什么商品！）</p>
        <p class="mt-10 ml-15">在“体验专区”（拍A发B）中，您也必须向拿手寄送承若的赠品</p>
        <p class="mt-10 ml-15 text-indent">如果发生没有按照承若寄送商品的情况，甚至是寄送空包的情况，将被平台判定为重大违规，平台将注销其商家账号，并视情节严重情况，扣留对应活动保证金！</p>
        <p class="mt-22 ml-15 mb-40">真诚希望白拿拿平台能帮助到您，祝您生意兴隆！</p>
      </div>
      <div class="user-clause-footer">
        <div class="switch-guide" @click="lookOther('showker')">查看拿手版指引</div>
        <div class="no-tip" @click="notTip" v-if="isShowCloseTip">“我已了解，以后不在提醒！”</div>
      </div>
    </template>
    <template v-if="isShowClause === 'showker'">
      <h2 class="text-ct mt-46">白拿拿-拿手平台服务条款</h2>
      <div class="user-clause-con mt-20">
        <p class="main-color">亲，感谢您成为白拿拿平台的拿手！</p>
        <p class="mt-10 ml-15">本指引非常重要，请您一定认真看完！</p>
        <p class="mt-5 ml-15">在白拿拿，拿手接任务领取商品的流程图如下：</p>
        <img class="mt-20" src="~assets/img/common/showker-clause.jpg" alt="拿手用户流程图"/>
        <p class="mt-10 text-indent">图中您都要在规定时间内完成对应操作！若发生3次超时未完成的情况，平台将有权注销您拿手账号，并扣留您一定的账户余额不予提现！</p>
        <p class="mt-10 text-indent">商家会对拿手下单、淘宝评价以及平台买家秀等作出要求，不按照要求执行的，平台有权不予退还商品货款！</p>
        <p class="mt-10 ml-15">另外，以下情况，将视为拿手重大违规事项：</p>
        <p class="text-indent">1.在旺旺上，与商家谈及白拿拿平台相关事项的；</p>
        <p class="text-indent">2.还未收到货品的情况下，就去淘宝进行商品评价的；</p>
        <p class="text-indent">3.未跟商家协商的情况下，就申请退款的。</p>
        <p class="mt-12">出现以上重大违规事项，平台将即刻注销您拿手账号，并扣留您所有账户余额！</p>
        <p class="mt-12 mb-20">希望您在白拿拿领到心仪的产品，祝您玩得开心！</p>
      </div>
      <div class="user-clause-footer">
        <div class="switch-guide" @click="lookOther('merchant')">查看商家版指引</div>
        <div class="no-tip" @click="notTip" v-if="isShowCloseTip">“我已了解，以后不在提醒！”</div>
      </div>
    </template>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  export default {
    name: "UserClause",
    props:{
      isShowClause: {
        type: String,
        default: 'merchant'
      },
      isShowCloseTip: {
        type: Boolean,
        default: true
      },
    },
    data(){
      return{

      }
    },
    methods:{
      closeClauseModel() {
        this.$emit('closeClauseModel');
      },
      lookOther(type) {
        this.isShowClause = type;
      },
      notTip(){
        let _this = this;
        api.setUserClauseTip().then(res =>{
          if(res.status){
            _this.$Message.success('关闭成功！');
            _this.$emit('closeClauseModel');
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

  .user-clause {
    width: 754px;
    height: 706px;
    background-color: #fff;
    @include center;
    padding: 0 16px;
  }

  .user-clause-con {
    font-size: 14px;
    border-bottom: 1px solid #E6E6E6;
  }

  .switch-guide {
    width: 156px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: $mainColor;
    font-size: 18px;
    padding: 2px 0;
    margin: 26px auto 10px auto;
    @include transition;
    &:hover {
      background-color: darken($mainColor, 10%);;
    }
  }

  .no-tip {
    font-size: 14px;
    color: $mainColor;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken($mainColor, 10%);;
    }
  }

  .close-model{
    float: right;
    font-size: 32px;
    margin-right: 12px;
    color: $mainColor;
    cursor: pointer;
  }
</style>
