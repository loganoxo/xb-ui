<template>
  <div class="check-order-model">
    <div class="check-order-con">
      <i class="right" @click="showCheckOrder = false">&times;</i>
      <div class="f-b fs-14 main-color mt-28" v-if="needBrowseCollectAddCart || needIssue">1.请查看拿手提交的截图信息</div>
      <div class="clear">
        <!--<div class="left" v-if="needBrowseCollectAddCart">
          <div class="mt-5 cl00 fs-12 f-b">A.查看拿手提交的收藏加购截图</div>
          <div class="order-info-screenshot mt-5" v-for="(value, key) in orderInfo.screenshot" :key="key" v-if="value">
            <img :src="value + '!thum54'" alt="收藏加购截图">
            <div class="order-info-screenshot-cover">
              <icon type="ios-eye-outline" @click.native="handleView(value,key)"></icon>
            </div>
          </div>
        </div>-->
        <!--<div class="left parting-line" v-if="needIssue"></div>-->
        <div class="left ml-10" v-if="needIssue">
          <div class="mt-5 cl00 fs-12 f-b"><!--<span>{{needIssue ? 'B.' : 'A.'}}</span>-->查看拿手提交的浏览答题截图</div>
          <div class="order-info-screenshot mt-5" v-for="(item, index) in orderInfo.issueAnswerScreenshot"
               :key="index" v-if="item">
            <img :src="item.screenshotSrc + '!thum54'" alt="浏览答题截图">
            <div class="order-info-screenshot-cover">
              <icon type="ios-eye-outline" @click.native="handleViewIssue(item.screenshotSrc,item.issueText.issue)"></icon>
            </div>
          </div>
        </div>
      </div>
      <div class="f-b fs-14 main-color mt-10"><span v-if="needBrowseCollectAddCart || needIssue">2.</span>请仔细核对订单号与交易金额
      </div>
      <div class="order-info-con text-lf mt-10">
        <p>
          <span class="f-b">订单号：</span>
          <span class="main-color">{{orderInfo.orderNum}}</span>
        </p>
        <p class="mt-10">
          <span><span class="f-b">拿手实付金额：</span><span class="main-color">{{orderInfo.orderPrice || 0}}</span>元<span>（当前每单活动担保金<span>{{orderInfo.perMarginNeed}}</span>元）</span></span>
        </p>
      </div>
      <p class="cl-red mt-10 text-lf" v-if="orderInfo.orderPrice < orderInfo.perMarginNeed">
        <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
        注意：拿手实付金额与活动担保金金额不一致，请仔细审核！
      </p>
      <p class="cl-red mt-10 text-lf" v-else>
        <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
        注意：为了防止不良拿手冒领担保金，请您仔细审核交易订单信息，确认不误再作提交！
      </p>
      <div class="mt-22 text-lf">
        <Radio-group v-model="orderReviewStatus">
          <Radio class="mr-30" label="passAudit">
            <span class="fs-14">通过</span>
          </Radio>
          <Radio label="failAudit">
            <span class="fs-14">不通过</span>
          </Radio>
        </Radio-group>
        <div class="no-pass-reason text-ct inline-block fs-14" v-show="orderReviewStatus === 'failAudit'">
          <i-select v-model="orderNoPassReason" style="width:200px" placeholder="请选择不通过原因">
            <!--<i-option value="收藏加购截图不合格">收藏加购截图不合格</i-option>-->
            <i-option value="浏览答题截图不合格">浏览答题截图不合格</i-option>
            <i-option value="订单号有误">订单号有误</i-option>
            <i-option value="实付金额有误">实付金额有误</i-option>
            <i-option value="下单旺旺和平台绑定旺旺不一致">下单旺旺和平台绑定旺旺不一致</i-option>
            <i-option value="自定义">自定义</i-option>
          </i-select>
        </div>
        <div class="mt-20 text-lf" v-show="orderNoPassReason === '自定义'">
          <iInput placeholder="自定义内容,字数不超过50个字" v-model="orderNoPassReasonDiy"></iInput>
        </div>
        <p  class="cl-red mt-10 text-lf" v-show="orderNoPassReasonDiy && orderNoPassReasonDiy.length > 50" >
          <icon type="information-circled" color="red" size="14" class="mr-5"></icon>
          注意：自定义字数不能超过50个字
        </p>
      </div>
      <div class="true-btn" v-show="orderReviewStatus === 'failAudit'" @click="orderNumberAudit">确认提交</div>
      <div class="true-btn" v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed >= getOderPrice"
           @click="orderNumberAudit">确认提交
      </div>
      <pay-model v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed < getOderPrice"
                :orderMoney="needReplenishMoney" :isShowUpgradeVIP="true" :isBalance="isBalance"
                @confirmPayment="confirmPayment" :payButtonText="payButtonText"
                :rechargeButtonText="rechargeButtonText" style="margin-top: 120px;width: 652px;margin-left: -326px;"
                :style="{top:needBrowseCollectAddCart ? 45+'%' : 20 +'%'}">
        <div slot="isBalance" class="title-tip">
                <span class="size-color3">
                <icon color="#FF2424" size="18" type="ios-information"></icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
          class="main-color">{{(needReplenishMoney / 100).toFixed(2)}}</strong>元
        </div>
        <div slot="noBalance" class="title-tip">
                <span class="size-color3">
                <icon color="#FF2424" size="18" type="ios-information"></icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
          class="main-color">{{needReplenishMoneyText}}</strong>元,请充值！
        </div>
      </pay-model>
    </div>
  </div>
</template>

<script>
  import PayModel from '@/components/PayModel'
  export default {
    name: "audit-order-popup",
    components:{
      PayModel:PayModel
    },
    props:{

    },
    data() {
      return {
        needBrowseCollectAddCart: false,
        needIssue: false,
        orderInfo: {},
        orderReviewStatus: 'passAudit',
        orderNoPassReason: null,
        orderNoPassReasonDiy: null,
      }
    },
    methods:{
      orderNumberAudit() {
        // let _this = this;
        // if(_this.orderReviewStatus === 'failAudit'){
        //   if (!_this.orderNoPassReason) {
        //     _this.$Message.error("亲，请填写不通过的理由！");
        //     return;
        //   }else {
        //     if(_this.orderNoPassReason === '自定义'){
        //       if(!_this.orderNoPassReasonDiy){
        //         _this.$Message.error("亲，请填写不通过自定义原因！");
        //         return;
        //       }else {
        //         if(_this.orderNoPassReasonDiy.length > 50){
        //           _this.$Message.error("亲，自定义原因字数不超过50个字！");
        //           return;
        //         }else {
        //           _this.orderNoPassReason = _this.orderNoPassReasonDiy;
        //         }
        //       }
        //     }else {
        //       _this.orderNoPassReasonDiy = '';
        //     }
        //   }
        // }
        //
        // if (_this.orderReviewStatus === 'passAudit' && _this.orderNoPassReason) {
        //   _this.orderNoPassReason = null;
        // }
        // api.orderNumberAudit({
        //   id: _this.orderInfo.id,
        //   status: _this.orderReviewStatus === 'passAudit' ? 'true' : 'false',
        //   msg: _this.orderNoPassReason
        // }).then(res => {
        //   if (res.status) {
        //     _this.$Message.success('订单号审核成功！');
        //     _this.$store.dispatch('getPersonalTrialCount');
        //     _this.$store.dispatch('getUserInformation');
        //     _this.showCheckOrder = false;
        //     _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
        //   } else {
        //     _this.$Message.error(res.msg);
        //     _this.closeCheckOrder();
        //   }
        // })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .check-order-model {
    @include fullScreenModel;
  }

  .check-order-con {
    position: absolute;
    width: 652px;
    background-color: #fff;
    border-radius: 5px;
    left: 50%;
    margin-left: -300px;
    top: 30%;
    padding: 0 18px 26px 18px;
    > i {
      font-size: 24px;
      cursor: pointer;
    }
    > p:nth-child(2) {
      span {
        font-size: 16px;
      }
    }
    > p:nth-child(3) {
      font-size: 14px;
    }
  }

  .true-btn {
    @include wh(120px, 32px);
    line-height: 32px;
    background-color: $mainColor;
    color: #fff;
    text-align: center;
    margin: 24px auto 0 auto;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    @include transition;
    &:hover {
      background-color: darken($mainColor, 10%);
    }
  }

  .carousel {
    width: 800px;
    height: 800px;
  }

  .order-info-screenshot {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    &:hover .order-info-screenshot-cover {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .order-info-screenshot-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .order-info-screenshot-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .certainly-hit-tip {
    position: absolute;
    background-color: #f9284f;
    color: #fff;
    line-height: 14px;
    height: 14px;
    width: 54px;
    text-align: center;
    left: 0;
    bottom: -4px;
    font-size: 12px !important;
  }

  .new-man-tip {
    width: 50px;
  }

  .account-info {
    width: 140px;
  }

  .parting-line {
    border-left: 1px dashed #999;
    height: 60px;
    margin-top: 28px;
    margin-left: 14px;
  }

  .order-info-con {
    border: 1px dashed #999;
    border-radius: 5px;
    padding: 10px;
  }
</style>
