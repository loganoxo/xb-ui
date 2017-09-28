<template>
  <div class="personal-box">
     <div class="content">
       <div class="title">
        <img class="vipImg" src="~assets/img/screen-shot/vip_member_title.jpg" alt="">
       </div>
       <div class="explanation ">
        <p><strong>VIP会员服务说明</strong></p>
        <p class="mt-5">1、可在服务期内免费使用秀吧所有服务功能；可免费发布秀吧PC、APP所有活动类型；</p>
        <p class="mt-5">2、会员开通后，费用不退还；</p>
        <p class="mt-5">3、会员周期仅支持向上扩展，不支持向下扩展。譬如：当前为会员周期为半年版，在该会员周期到期前不支持购买季度时长的版本。</p>
        <p class="mt-5">4、会员升级时，将现有会员剩余时间按天进行折算，剩余价格将抵扣到新版本的费用中（若折扣出的价格有溢出，将不退回）。</p>
        <p class="mt-20 mb-20"><strong>请您选择您的会员周期：</strong></p>
        <div class="member-cycle text-ct ">
            <iButton  class="member-price cursor-p  mr-10" v-for="(item,index) in memberInformation" :key="index" :class="{active:isSelect === index} "
                 @click="changeStyle(index,item.validDays,item.validDaysDesc,item.finalFee,item.level,item.id)"
                     :disabled=" memberLevelInfo.validDays >item.validDays">
              <p class="price">￥{{item.finalFee/100}}元</p>
              <p class="mt-10">会员时长 <span style="font-size: 20px">{{item.validDaysDesc}}</span><span>({{item.validDays}}天)</span></p>
            </iButton>
        </div>
        <div class="mt-30 member-time">
          <p class="mb-10" v-if="getMemberLevel === null">您当前为：非会员</p>
          <p class="mb-10" v-if="getMemberLevel !== null">您当前的会员到期时间：{{getMemberDeadline | dateFormat('YYYY-MM-DD')}}</p>
          <p v-if="getMemberLevel !== memberLevel && getMemberLevel !== null" style="font-size: 14px">您已选择<span class="my-color">升级</span> <strong>{{year}}会员</strong>，有效期至
            <span style="color: #FC9F84">{{endTime |dateFormat('YYYY-MM-DD ')}}</span>
            <span>根据您现在的会员版本可折价抵扣：<strong>{{moneyRemaining}}元</strong>,成功升级后现有版本将失效</span>
          </p>
          <p v-if="getMemberLevel === memberLevel" style="font-size: 14px">您已选择 <span class="my-color">续费</span> <strong>{{year}}</strong>会员，有效期至
            <span class="my-color">{{endTime |dateFormat('YYYY-MM-DD ')}}</span>
          </p>
          <p v-if="getMemberLevel === null" style="font-size: 14px">
            您已选择<strong>{{year}}会员</strong>，有效期至
            <span style="color: #FC9F84">{{endTime |dateFormat('YYYY-MM-DD ')}}</span>
          </p>
          <p class="mt-10">本次总共要支付的金额为：<strong>{{rechargeSum>0?rechargeSum:0}}</strong>元,您的账户余额为：<strong>{{getUserBalance}}</strong>元 <span v-if="needRecharge>0">，还需要充值：<strong>{{needRecharge}}</strong>元。</span></p>
        </div>
        <div v-if="needRecharge > 0" class="text-ct mt-20"><iButton class="btn-recharge" @click="recharge = true">前去充值</iButton></div>
        <div v-else class="text-ct  mt-20"><iButton class="btn-recharge" @click="recharge = true">马上购买</iButton></div>
      </div>
    </div>
     <div class="footer ">
       <div class="title"><Icon type="android-walk" style="font-size: 25px"></Icon><strong class="ml-10">他们在奔跑，你呢...</strong></div>
       <div class="ml-20 mt-20">
         <h3>Q：我们是谁？</h3>
         <p class="mt-10">A：宝贝深度优化专家，我们只做2件事：1.提权重  2.促转化</p>
       </div>
       <div class="ml-20 mt-30">
         <h3>Q：我们是怎么做到的？</h3>
         <p class="mt-10" style="color:#666;">A：1. 我们是如何提高权重的？</p>
         <p class="ml-22 mt-5 we-do">1.1 从点击浏览，到收藏加购，再到下单转化，加上买家秀，实现一站式全链路的排名提升！</p>
         <p class="ml-22 mt-5 we-do">1.2 多种任务类型（搜索，预售，复购，问大家，淘口令等等），充分匹配各大流量入口！</p>
         <p class="ml-22 mt-5 we-do">1.3 真实消费者，真实交易，永远不会担心降权被罚，在阳光下享受流量猛增的快感！</p>
         <p class="mt-20 ml-22" style="color:#666;">2. 我们是如何促进转化的？</p>
         <p class="ml-22 mt-5 we-do">2.1 精准人群，带来精准标签，远非刷单可比</p>
         <p class="ml-22 mt-5 we-do">2.2 优质买家秀带来疯狂转化，文字，图片，短视频三管齐下，顺应内容营销的风口</p>
         <p class="ml-22 mt-5 we-do">2.3 飙升的收藏和加购数，充分反映了消费者对于该宝贝的兴趣和信任，有利于真实成交</p>
       </div>
       <div class="ml-20 mt-30">
         <h3>Q：适合谁来用？</h3>
         <p class="mt-10">A：1.新品新店一直起不来</p>
         <p class="ml-22 mt-5">2.宝贝权重低，排名落后，自然流量少</p>
         <p class="ml-22 mt-5">3.基础销量很低，甚至无法破零，又不敢刷单</p>
         <p class="ml-22 mt-5">4.人群标签混乱，虽有流量但质量偏低，持续无转化</p>
         <p class="ml-22 mt-5">5.找不到好的推广渠道，报不上活动，又吃不消直通车钻展的高昂费用</p>
       </div>
       <div class="ml-20 mt-30">
         <h3>Q：我们的优势</h3>
         <p class="mt-10">A：1.账号优质：<span class="we-do">我们的秀客都是真实的消费者，和刷单平台相比，有质的区别</span></p>
         <p class="ml-22 mt-5">2.人群标签：<span class="we-do">秀客根据兴趣选择宝贝，自带人群标签</span></p>
         <p class="ml-22 mt-5">3.公开透明：<span class="we-do">每个环节都做到严格可控，商家自己审核秀客，杜绝了暗箱操作的可能性</span></p>
         <p class="ml-22 mt-5">4.流程完整：<span class="we-do">包括了点击浏览收藏加购下单评价的所有环节，缺一不可</span></p>
         <p class="ml-22 mt-5">5.真实有效：<span class="we-do">不仅仅能提升排名，带来真实流量，还能提高转化！宝贝深度优化专家，实至名归！</span></p>
       </div>
     </div>
    <!--支付弹窗-->
    <div class="pay-model" v-if="recharge">
      <PayModel :orderMoney="rechargeSum" @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="recharge = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3"><Icon color="#FF2424" size="18" type="ios-information"></Icon>
            <span class="ml-10">亲，您的余额不足，请充值。</span>
          </span>还需充值<strong class="size-color3">{{needRecharge}}</strong>元
        </div>
        <div slot="isBalance" class="title-tip">
          <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
          <span class="ml-10">您本次需要支付金额为 <span class="size-color3">{{rechargeSum}}</span> 元。</span>
        </div>
      </PayModel>
    </div>
  </div>
</template>
<script>
  import api from '@/config/apiConfig'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import Input from 'iview/src/components/input'
  import PayModel from '@/components/PayModel'
  import {mapActions} from 'vuex'
  import Icon from 'iview/src/components/icon'

  export default {
    name: 'VipMember',
    components:{
      iButton: Button,
      Modal: Modal,
      iInput: Input,
      PayModel:PayModel,
      Icon: Icon,

    },
    data() {
      return {
        memberCycle:[
          {
            select:'one',
            textTop:'4999.00',
            year:'2年',
            day:'730'
          },
          {
            select:'two',
            textTop:'2999.00',
            year:'1年',
            day:'365'
          },
          {
            select:'three',
            textTop:'1999.00',
            year:'半年',
            day:'182'
          },
          {
            select:'four',
            textTop:'1199.00',
            year:'一季度',
            day:'90'
          }
        ],
        isSelect:'one',
        day:730,
        year:'0年',
        rechargeSum:'0',
        needRecharge:0,
        memberInformation:[],
        endTime:null,
        memberLevelInfo:{},
        timeRemaining:null,
        moneyRemaining:0,
        memberLevel:null,
        memberId:null,
        recharge:false,
      }
    },
    mounted() {
    },
    created() {
      this.getUserMemberLevelInfo();
    },
    computed: {
      getUserAccountRole:function () {
        return this.$store.getters.getUserAccountInfo.role
      },
      getUserBalance:function () {
        return this.$store.getters.getUserBalance
      },
      getMemberLevel:function () {
        return this.$store.state.userInfo.memberLevel
      },
      getMemberDeadline:function () {
        return this.$store.state.userInfo.memberDeadline
      }
    },
    watch: {

    },
    methods: {
      ...mapActions([
        'getUserInformation'
      ]),
      changeStyle(type,day,year,recharge,level,id){
        this.isSelect = type;
        this.year = year;
        this.memberLevel = level;
        this.memberId = id;
        if(level === this.getMemberLevel){
          let stopTime = new Date().getTime() + parseInt(day)*24*3600*1000+ this.timeRemaining*24*3600*1000;
          this.endTime = stopTime;
          this.rechargeSum = recharge/100;
          if (this.rechargeSum - this.getUserBalance < 0){
            this.needRecharge = 0
          }else {
            this.needRecharge = this.rechargeSum - this.getUserBalance
          }
        }else {
          let stopTime = new Date().getTime() + parseInt(day)*24*3600*1000;
          this.endTime = stopTime;
          this.rechargeSum = recharge/100- this.moneyRemaining;
          if (this.rechargeSum - this.getUserBalance < 0){
            this.needRecharge = 0
          }else {
            this.needRecharge = this.rechargeSum - this.getUserBalance
          }
        }
      },
      getUserMemberAll(){
        let _this = this;
        api.getUserMemberAll().then(res => {
          if (res.status) {
            _this.memberInformation = res.data.reverse();
            _this.changeStyle(0,
              _this.memberInformation[0].validDays,
              _this.memberInformation[0].validDaysDesc,
              _this.memberInformation[0].finalFee,
              _this.memberInformation[0].level,
              _this.memberInformation[0].id);
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getUserMemberLevelInfo(){
        let _this = this;
        if (!_this.getMemberLevel){
          _this.getUserMemberAll();
          return;
        }
        api.getUserMemberLevelInfo({
          level:_this.getMemberLevel
        }).then(res => {
          if (res.status) {
            _this.memberLevelInfo = res.data;
            let timeRemainings = _this.getMemberDeadline - new Date().getTime();
            _this.timeRemaining = Math.floor(timeRemainings/(24*60*60*1000));
            _this.moneyRemaining = Math.floor((parseInt((_this.memberLevelInfo.finalFee/100))/parseInt(_this.memberLevelInfo.validDays))*parseInt(_this.timeRemaining));
            _this.getUserMemberAll();
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      confirmPayment(pwd,close){
        let _this = this;
        _this.recharge = close;
        api.memberPurchase({
          memberId:_this.memberId,
          payPwd:pwd
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '支付成功！',
              duration: 2,
            });
            _this.getUserInformation();
            setTimeout(function () {
              _this.$router.go(0)
            },2000)
          } else {
            _this.$Message.error(res.msg);
          }
        });
      }

    }
  }
</script>

<style lang="scss">
  @import 'src/css/mixin';
 .personal-box{
   .my-color{
     color: #FC9F84;
   }
   .title-tip {
     height: 36px;
     line-height: 36px;
     margin: 56px auto 20px auto;
     color: #000;
     background-color: #FFF6F3;
     font-size: 14px;
   }
   .pay-model {
     @include fullScreenModel
   }
   .ml-22{
     margin-left: 23px;
   }
   .content{
     width: 100%;
     border: 2px solid #F1F1F1;
     border-radius: 9px;
     .title{
       width: 100%;
       height: 155px;
       text-align: center;
       .vipImg{
         width: 100%;
         display: block;
       }
     }
     .explanation{
       padding: 20px 40px;
       background-color: #F8F8F8;
       .member-price{
         box-sizing: border-box;
         height: 93px;
         width: 200px;
         padding: 10px;
         border: 1px dashed #D8D8D8;
         text-align: center;
         background-color: #fff;
         .price{
           font-size: 20px;
         }
       }
       .member-price:hover{
         border: 1px dashed $mainColor;
         color: $mainColor;
       }
       .member-price.active{
         background-color: #F6E363;
         border: 2px solid #FE6E42;
         color: #FC803E;
       }
       .member-time{
         padding: 10px 5px;
         p:last-of-type{
           font-size: 18px;
         }
       }
       .btn-recharge{
         width: 200px;
         height: 40px;
         background-color: $mainColor;
         color: #fff;
         font-size: 14px;
       }
     }
   }
   .footer{
     padding: 30px 50px;
     .title{
       border-bottom: 1px solid #E7E7E7;
       color: #D6D6D6;
       font-size: 18px;
     }
     h3{
       font-size: 18px;
       color: #666666;
     }
     p{
       font-size: 14px;
     }
     .we-do{
       color: #999999;
     }
   }
 }


</style>
