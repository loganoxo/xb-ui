<template>
  <div class="instructions">
    <ul class="table-box">
      <li class="t-head clear first">
        <div class="t-catalog left c-white function">功能说明</div>
        <div class="left c-d-grey">
          <p>{{freeMemberInfo.memberName}}</p>
          <p class="mt-10">{{freeMemberInfo.memberDesc}}</p>
        </div>
        <div class="left c-d-blue">
          <p>{{vipMemberInfo.memberName}}</p>
          <p class="mt-10">{{vipMemberInfo.memberDesc}}</p>
        </div>
        <div class="left c-d-orange">
          <p>{{svipMemberInfo.memberName}}</p>
          <p class="mt-10">{{svipMemberInfo.memberDesc}}</p>
        </div>
      </li>
      <li class="clear second">
        <div class="t-catalog c-white">推广费（每单）</div>
        <div class="c-l-grey" v-if="freeMemberInfo.promotionFee">宝贝单价*{{freeMemberInfo.promotionFee.percent}}%，{{freeMemberInfo.promotionFee.limit/100}}元封顶</div>
        <div class="c-l-blue" v-if="vipMemberInfo.promotionFee">宝贝单价*{{vipMemberInfo.promotionFee.percent}}%，{{vipMemberInfo.promotionFee.limit/100}}元封顶</div>
        <div class="c-l-orange">{{svipMemberInfo.promotionFee}}</div>
      </li>
      <li class="clear third">
        <div class="t-catalog c-white">充值手续费</div>
        <div class="c-l-grey" v-if="freeMemberInfo.rechargeCommission">{{freeMemberInfo.rechargeCommission.percent}}‰（支付宝验收）</div>
        <div class="c-l-blue">{{vipMemberInfo.rechargeCommission}}</div>
        <div class="c-l-orange">{{svipMemberInfo.rechargeCommission}}</div>
      </li>
      <li class="clear forth">
        <div class="t-catalog c-white">活动审核</div>
        <div class="c-l-grey">{{freeMemberInfo.taskAudit}}</div>
        <div class="c-l-blue">{{vipMemberInfo.taskAudit}}</div>
        <div class="c-l-orange">{{svipMemberInfo.taskAudit}}</div>
      </li>
      <li class="clear fifth">
        <div class="t-catalog c-white lh-80">活动置顶显示，开发中...</div>
        <div class="c-l-grey lh-80">{{freeMemberInfo.taskStickUp}}</div>
        <div class="c-l-blue check-box">
          <p>每日上新页置顶<span class="check-text cursor-p" @click="showDemo('demo-1')">（查看）</span></p>
          <p class="mt-5" v-if="vipMemberInfo.taskStickUp">每天{{vipMemberInfo.taskStickUp.frequency}}次，每次{{vipMemberInfo.taskStickUp.time}}分钟</p>
        </div>
        <div class="c-l-orange check-box">
          <p>首页最新活动置顶<span class="check-text cursor-p" @click="showDemo('demo-2')">（查看）</span></p>
          <p class="mt-5" v-if="svipMemberInfo.taskStickUp">每天{{svipMemberInfo.taskStickUp.frequency}}次，每次{{svipMemberInfo.taskStickUp.time}}分钟</p>
        </div>
      </li>
      <li class="clear sixth">
        <div class="t-catalog c-white">同一宝贝每日发布活动次数</div>
        <div class="c-l-grey" v-if="freeMemberInfo.itemReleaseTaskOneDayLimit">{{freeMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次</div>
        <div class="c-l-blue" v-if="vipMemberInfo.itemReleaseTaskOneDayLimit">{{vipMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次</div>
        <div class="c-l-orange" v-if="svipMemberInfo.itemReleaseTaskOneDayLimit">{{svipMemberInfo.itemReleaseTaskOneDayLimit.frequency}}次</div>
      </li>
      <li class="clear seventh">
        <div class="t-catalog c-white">店铺绑定数量</div>
        <div class="c-l-grey" v-if="freeMemberInfo.storeBindingLimit">{{freeMemberInfo.storeBindingLimit.number}}个</div>
        <div class="c-l-blue" v-if="vipMemberInfo.storeBindingLimit">{{vipMemberInfo.storeBindingLimit.number}}个</div>
        <div class="c-l-orange" v-if="svipMemberInfo.storeBindingLimit">{{svipMemberInfo.storeBindingLimit.number}}个</div>
      </li>
    </ul>
    <p class="to-be-continue">更多权益正在添加中，敬请期待...</p>
    <Modal v-model="isShowDemo" class="text-ct pt-40" width="700">
      <img v-if="demo1" class="mt-20" src="~assets/img/vip-member/vip-demo-01.png">
      <img v-if="demo2" class="mt-20" src="~assets/img/vip-member/vip-demo-02.png">
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
        freeMemberInfo:{},
        vipMemberInfo:{},
        svipMemberInfo:{},
        isShowDemo: false,
        demo1: false,
        demo2: false
      }
    },
    computed: {},
    created() {
      this.getVersionInfo();
    },
    methods: {
      getVersionInfo(){
        let _this = this;
        api.getMemberInstructionsInfo().then(res=>{
          let tempData = [];
          if(res.status){
            tempData = res.data;
            tempData.forEach(item=>{
              item.memberDesc = item.memberDesc.split(',')[1];
              item.promotionFee = item.promotionFee.length>1?JSON.parse(item.promotionFee):item.promotionFee;
              item.taskStickUp = item.taskStickUp.length>1?JSON.parse(item.taskStickUp):item.taskStickUp;
              item.rechargeCommission = item.rechargeCommission.length>1?JSON.parse(item.rechargeCommission):item.rechargeCommission;
              item.itemReleaseTaskOneDayLimit = JSON.parse(item.itemReleaseTaskOneDayLimit);
              item.storeBindingLimit = JSON.parse(item.storeBindingLimit);
            });
            _this.freeMemberInfo = tempData[0];
            _this.vipMemberInfo = tempData[1];
            _this.svipMemberInfo = tempData[2];
          }else{
            _this.$Message.error(res.msg);
          }
        })
      },
      showDemo(demo) {
        let _this = this;
        if (demo === 'demo-1') {
          _this.demo1 = true;
          _this.demo2 = false;
        }
        if (demo === 'demo-2') {
          _this.demo1 = false;
          _this.demo2 = true;
        }
        _this.isShowDemo = true;
      }

    },

  }
</script>

<style scoped lang="scss">
  .c-d-grey {
    background-color: #cccccc;
  }

  .c-l-grey {
    background-color: #f0f0f0;
  }

  .c-d-blue {
    background-color: #66cccc;
  }

  .c-l-blue {
    background-color: #d1f0f0;
  }

  .c-d-orange {
    background-color: #ff9966;
  }

  .c-l-orange {
    background-color: #ffe0d1;
  }

  .c-white {
    background-color: #fff;
  }

  div {
    box-sizing: border-box;
  }

  .instructions {
    padding: 40px 60px 60px 60px;
  }

  .table-box {
    border: 1px solid #ccc;
    border-right: none;
    div {
      width: 25%;
      text-align: center;
      float: left
    }
    .t-catalog {
      color: #666666;
      text-align: left;
      padding-left: 10px;
    }
    .first {
      div {
        height: 94px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
      .function {
        color: #666;
        text-align: left;
        padding-left: 10px;
        line-height: 54px;
      }
    }
    .second {
      height: 48px;
      line-height: 48px;
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .third {
      height: 48px;
      line-height: 48px;
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .forth {
      height: 48px;
      line-height: 48px;
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .fifth {
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        height: 80px;
      }
      .t-catalog{
        color:#ccc;
      }
      .lh-80 {
        height: 80px;
        line-height: 80px;
      }
      .check-box {
        padding: 20px 0;
      }
      .check-text {
        color: blue;
      }
    }
    .sixth {
      height: 48px;
      line-height: 48px;
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .seventh {
      height: 48px;
      line-height: 48px;
      div {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
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
