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
            <div class="member-price left mr-10" v-for="item in memberCycle" :class="{active:isSelect === item.select} " @click="changeStyle(item.select)">
              <p class="price">{{item.textTop}}</p>
              <p class="mt-10">会员时长 <span style="font-size: 20px">{{item.year}}</span><span>({{item.day}})</span></p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'VipMember',
    data() {
      return {
        memberCycle:[
          {
            select:'one',
            textTop:'￥4999.00元',
            year:'2年',
            day:'730天'
          },
          {
            select:'two',
            textTop:'￥2999.00元',
            year:'1年',
            day:'365天'
          },
          {
            select:'three',
            textTop:'￥1999.00元',
            year:'半年',
            day:'182天'
          },
          {
            select:'four',
            textTop:'￥1199.00元',
            year:'一季度',
            day:'90天'
          }
        ],
        isSelect:'one'
      }
    },
    mounted() {
    },
    created() {

    },
    computed: {
      getUserAccountRole:function () {
        return this.$store.getters.getUserAccountInfo.role
      }
    },
    watch: {

    },
    methods: {
      changeStyle(type){
        this.isSelect = type;
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
     }
   }
 }


</style>
