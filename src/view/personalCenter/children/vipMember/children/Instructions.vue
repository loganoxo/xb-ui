<template>
  <div class="instructions">
    <ul class="table-box">
      <!--以下注释的代码是svip相关，请勿删除-->
      <li class="clear">
        <div class="function">功能说明</div>
        <div class="head head-grey">
          <p>{{freeMemberInfo.memberName}}</p>
          <p class="mt-10">{{freeMemberInfo.memberDesc}}</p>
        </div>
        <div class="head head-blue">
          <p>{{vipMemberInfo.memberName}}</p>
          <p class="mt-10">{{vipMemberInfo.memberDesc}}</p>
        </div>
        <!--<div class="head head-orange">-->
          <!--<p>{{svipMemberInfo.memberName}}</p>-->
          <!--<p class="mt-10">{{svipMemberInfo.memberDesc}}</p>-->
        <!--</div>-->
      </li>
      <!--<li class="clear">-->
        <!--<div>推广费（每单）</div>-->
        <!--<div class="extend-fee">-->
          <!--<p v-if="freeMemberInfo.rewardFee">拍A发A：{{freeMemberInfo.rewardFee.AA.floor/100}}元/单</p>-->
          <!--<p class="mt-5" v-if="freeMemberInfo.rewardFee">拍A发B：{{freeMemberInfo.rewardFee.AB.floor/100}}元/单</p>-->
        <!--</div>-->
        <!--<div class="extend-fee">-->
          <!--<p v-if="vipMemberInfo.rewardFee">拍A发A：{{vipMemberInfo.rewardFee.AA.floor/100}}元/单</p>-->
          <!--<p class="mt-5" v-if="vipMemberInfo.rewardFee">拍A发B：{{vipMemberInfo.rewardFee.AB.floor/100}}元/单</p>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div>免</div>&ndash;&gt;-->
      <!--</li>-->
      <li class="clear">
        <div>平台推广费</div>
        <div>
          <span>10元/单</span>
        </div>
        <div>
          <span>6元/单</span>
        </div>
      </li>
      <!--<li class="clear">-->
        <!--<div>充值手续费</div>-->
        <!--<div v-if="freeMemberInfo.rechargeCommission">千分之六（支付宝收取）</div>-->
        <!--<div>免</div>-->
        <!--<div>免</div>-->
      <!--</li>-->
      <li class="clear">
        <div>活动审核</div>
        <div>{{freeMemberInfo.taskAudit}}</div>
        <div>{{vipMemberInfo.taskAudit}}</div>
        <!--<div>{{svipMemberInfo.taskAudit}}</div>-->
      </li>
      <li class="clear">
        <div class="activity-top developing">活动置顶显示，开发中...</div>
        <div class="activity-top">{{freeMemberInfo.taskStickUp}}</div>
        <div class="check-demo">
          <p>每日上新页置顶<span class="check cursor-p" @click="showDemo('demo-1')">（查看）</span></p>
          <p class="mt-5" v-if="vipMemberInfo.taskStickUp">
            每天{{vipMemberInfo.taskStickUp.frequency}}次，每次{{vipMemberInfo.taskStickUp.time}}分钟</p>
        </div>
        <!--<div class="check-demo">-->
          <!--<p>首页最新活动置顶<span class="check cursor-p" @click="showDemo('demo-2')">（查看）</span></p>-->
          <!--<p class="mt-5" v-if="svipMemberInfo.taskStickUp">-->
            <!--每天{{svipMemberInfo.taskStickUp.frequency}}次，每次{{svipMemberInfo.taskStickUp.time}}分钟</p>-->
        <!--</div>-->
      </li>
      <li class="clear">
        <div>同一宝贝每日发布活动次数</div>
        <div v-if="freeMemberInfo.itemReleaseTaskOneDayLimit">
          {{freeMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次
        </div>
        <div v-if="vipMemberInfo.itemReleaseTaskOneDayLimit">
          {{vipMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次
        </div>
        <!--<div v-if="svipMemberInfo.itemReleaseTaskOneDayLimit">-->
          <!--{{svipMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次-->
        <!--</div>-->
      </li>
      <li class="clear">
        <div >店铺绑定数量</div>
        <div v-if="freeMemberInfo.storeBindingLimit">{{freeMemberInfo.storeBindingLimit.number}}个</div>
        <div v-if="vipMemberInfo.storeBindingLimit">{{vipMemberInfo.storeBindingLimit.number}}个</div>
        <!--<div v-if="svipMemberInfo.storeBindingLimit">{{svipMemberInfo.storeBindingLimit.number}}个</div>-->
      </li>
      <li class="clear">
        <div>火眼金睛（拿手数据查询）</div>
        <div>无</div>
        <!--<div>订购使用</div>-->
        <div>免费使用</div>
      </li>
      <li class="clear">
        <div>活动增值服务项</div>
        <div>{{freeMemberInfo.taskVasItem}}</div>
        <div>{{vipMemberInfo.taskVasItem}}</div>
        <!--<div>{{svipMemberInfo.taskVasItem}}</div>-->
      </li>
      <li class="clear">
        <div>当日单</div>
        <div>{{freeMemberInfo.dayNow}}</div>
        <div>{{vipMemberInfo.dayNow}}</div>
        <!--<div>{{svipMemberInfo.dayNow}}</div>-->
      </li>
      <li class="clear">
        <div>预约单</div>
        <div>{{freeMemberInfo.dayReserve}}</div>
        <div>{{vipMemberInfo.dayReserve}}</div>
        <!--<div>{{svipMemberInfo.dayReserve}}</div>-->
      </li>
    </ul>
    <p class="to-be-continue">更多权益正在添加中，敬请期待...</p>
    <Modal v-model="isShowDemo" class="text-ct pt-40" width="700">
      <img v-if="dailyNewDemo" class="mt-20" src="~assets/img/vip-member/vip-demo-01.png">
      <img v-if="homeNewDemo" class="mt-20" src="~assets/img/vip-member/vip-demo-02.png">
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import {Modal} from 'iview'
  import api from '@/config/apiConfig'
  export default {
    name: "vip-member-instructions",
    components: {
      Modal: Modal
    },
    data() {
      return {
        freeMemberInfo: {},
        vipMemberInfo: {},
        svipMemberInfo: {},
        isShowDemo: false,
        dailyNewDemo: false,
        homeNewDemo: false
      }
    },
    computed: {},
    created() {
      this.getVersionInfo();
    },
    methods: {
      getVersionInfo() {
        const _this = this;
        api.getMemberInstructionsInfo().then(res => {
          let tempData = [];
          if (res.status) {
            tempData = res.data;
            tempData.forEach(item => {
              item.memberDesc = item.memberDesc.split(',')[1];
              item.rewardFee = JSON.parse(item.rewardFee);
              item.promotionFee = JSON.parse(item.promotionFee);
              item.rechargeCommission = JSON.parse(item.rechargeCommission);
              item.taskStickUp = item.taskStickUp.length > 1 ? JSON.parse(item.taskStickUp) : item.taskStickUp;
              item.itemReleaseTaskOneDayLimit = JSON.parse(item.itemReleaseTaskOneDayLimit);
              item.storeBindingLimit = JSON.parse(item.storeBindingLimit);
            });
            _this.freeMemberInfo = tempData[0];
            _this.vipMemberInfo = tempData[1];
            _this.svipMemberInfo = tempData[2];
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      showDemo(demo) {
        const _this = this;
        if (demo === 'demo-1') {
          _this.dailyNewDemo = true;
          _this.homeNewDemo = false;
        }
        if (demo === 'demo-2') {
          _this.dailyNewDemo = false;
          _this.homeNewDemo = true;
        }
        _this.isShowDemo = true;
      }
    },
  }
</script>

<style scoped lang="scss">

  div {
    box-sizing: border-box;
  }
  .instructions {
    padding: 40px 60px 60px 60px;
  }
  .table-box {
    border-top:1px solid #ccc;
    border-left:1px solid #ccc;
    div {
      width: 33.33%;
      height:48px;
      line-height: 48px;
      text-align: center;
      float: left;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    li {
      div:nth-of-type(1) {
        background-color: #fff;
      }
      div:nth-of-type(2) {
        background-color: #f0f0f0;
      }
      div:nth-of-type(3) {
        background-color: #d1f0f0;
      }
      div:nth-of-type(4) {
        background-color: #ffe0d1;
      }
      div.function{
        height:94px;
        font-weight: bold;
        font-size: 16px;
        padding: 20px 0 20px 10px;
      }
      div.head{
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
        color:#fff;
        height:94px;
        padding:20px 0;
      }
      div.head-grey{
        background-color: #cccccc;
      }
      div.head-blue{
        background-color: #66cccc;
      }
      div.head-orange{
        background-color: #ff9966;
      }
      div.extend-fee{
        line-height: 18px;
        padding:5px 0;
      }
      div.activity-top{
        height:80px;
        line-height: 80px;
      }
      div.developing{
        color:#ccc;
      }
      div.check-demo{
        height:80px;
        line-height: 20px;
        padding:20px 0;
        .check{
          color:blue;
        }
      }
    }
  }
  .to-be-continue {
    color: #666;
    text-align: center;
    font-size: 24px;
    margin-top: 40px;
  }
</style>
