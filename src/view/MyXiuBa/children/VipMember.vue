<template>
  <div class="personal-box">
     <div class="content">
       <div class="title">
        <img class="vipImg" src="~assets/img/screen-shot/vip_member_title.jpg" alt="">
      </div>
       <div class="explanation">
        <p><strong>VIP会员服务说明</strong></p>
        <p class="mt-5">可在服务期内免费使用秀吧所有服务功能；可免费发布秀吧PC、APP所有活动类型；会员开通后，费用不退还</p>
        <p class="mt-20 mb-20"><strong>请您选择您的会员周期：</strong></p>
        <div class="member-cycle clear">
            <iButton  class="member-price cursor-p left mr-10" v-for="(item,index) in memberInformation" :key="index" :class="{active:isSelect === index} "
                 @click="changeStyle(index,item.validDays,item.validDaysDesc,item.finalFee,item.level,item.id)"
                     :disabled=" memberLevelInfo.validDays >item.validDays">
              <p class="price">￥{{item.finalFee/100}}元</p>
              <p class="mt-10">会员时长 <span style="font-size: 20px">{{item.validDaysDesc}}</span><span>({{item.validDays}}天)</span></p>
            </iButton>
        </div>
        <div class="mt-30 member-time">
          <p v-if="getMemberLevel !== memberLevel">您已选择升级 <strong>{{year}}会员</strong>，有效期至
            <span style="color: #FC9F84">{{endTime |dateFormat('YYYY-MM-DD ')}}</span>
            <span>根据您现在的会员版本可折价抵扣：<strong>{{moneyRemaining}}元</strong>,成功升级后现有版本将失效</span>
          </p>
          <p v-else>您已选择续费 <strong>{{year}}</strong>会员，有效期至
            <span style="color: #FC9F84">{{endTime |dateFormat('YYYY-MM-DD ')}}</span>
          </p>
          <p class="mt-10">本次总共要支付的金额为：<strong>{{rechargeSum}}</strong>元,您的账户余额为：<strong>{{getUserBalance}}</strong>元，还需要充值：<strong>{{needRecharge}}</strong>元。</p>
        </div>
        <div class="text-ct mt-20"><iButton class="btn-recharge" @click="recharge = true">前去充值</iButton></div>
      </div>
    </div>
     <div class="footer ">
       <div class="title">他们在奔跑，你呢</div>
     </div>
     <Modal width="600" v-model="recharge">
       <p slot="header" class="text-ct mt-10">
         <span>您本次要充值的金额为{{rechargeSum}}</span>
       </p>
       <PayModel :orderMoney="rechargeSum"  @confirmPayment="confirmPayment"></PayModel>
     </Modal>
  </div>
</template>
<script>
  import api from '@/config/apiConfig'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import Input from 'iview/src/components/input'
  import PayModel from '@/components/PayModel'
  import {mapActions} from 'vuex'


  export default {
    name: 'VipMember',
    components:{
      iButton: Button,
      Modal: Modal,
      iInput: Input,
      PayModel:PayModel,
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
   .content{
     width: 100%;
     border: 1px solid #F1F1F1;
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
         border: 1px solid #FE6E42;
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
         transform: translateX(-50%);
       }
     }
   }
   .footer{
     padding: 30px 50px;
     .title{

     }
   }
 }


</style>
