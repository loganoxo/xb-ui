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
            <iButton  class="member-price cursor-p left mr-10" v-for="item in memberInformation" :class="{active:isSelect === item.id} "
                 @click="changeStyle(item.id,item.validDays,item.validDaysDesc,item.finalFee)">
              <p class="price">￥{{item.finalFee/100}}元</p>
              <p class="mt-10">会员时长 <span style="font-size: 20px">{{item.validDaysDesc}}</span><span>({{item.validDays}}天)</span></p>
            </iButton>
        </div>
        <div class="mt-20 member-time">
          <p>您已选择升级{{year}}，有效期至 <span style="color: #FC9F84">{{endTime |dateFormat('YYYY-MM-DD ')}}</span></p>
          <p class="mt-10">本次总共要支付的金额为：<strong>{{rechargeSum/100}}</strong>元,您的账户余额为：<strong>{{getUserBalance}}</strong>元，还需要充值：<strong>{{needRecharge}}</strong>元。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/config/apiConfig'
  import Button from 'iview/src/components/button'

  export default {
    name: 'VipMember',
    components:{
      iButton: Button,
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
        year:'2年',
        rechargeSum:'4999.00',
        needRecharge:0,
        memberInformation:[],
        endTime:null,
      }
    },
    mounted() {
    },
    created() {
      this.changeStyle('one','730','2年','4999.00');
      this.getUserMemberAll();
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
      }
    },
    watch: {

    },
    methods: {
      changeStyle(type,day,year,recharge){
        this.isSelect = type;
        this.year = year;
        let nowDay = new Date().getTime() + parseInt(day)*24*3600*1000;
        this.endTime = nowDay;
        this.rechargeSum = recharge;
        if (recharge/100 - this.getUserBalance < 0){
          this.needRecharge = 0
        }else {
          this.needRecharge = recharge/100 - this.getUserBalance
        }
      },
      getUserMemberAll(){
        let _this = this;
        api.getUserMemberAll().then(res => {
          if (res.status) {
            _this.memberInformation = res.data
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
//            console.log(res.data);
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
     }
   }
 }


</style>
