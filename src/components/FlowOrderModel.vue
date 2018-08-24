<template>
  <div class="flow-order-model">
    <modal :value="currentValue" :mask-closable="false" @on-visible-change="change" width="600">
      <template v-if="step === 'select'">
        <div slot="header">
          <img src="~assets/img/task-release/shopping-cart.png" alt="">
          <span class="fs-18 ml-10 vtc-sup">流量订购</span>
        </div>
        <div class="order-box">
          <div class="tabs clear">
            <div class="tab left" v-for="(tab,index) in tabs" :key="index" :class="{active:defaultTab.type === tab.type}" @click="defaultTab = tab">{{tab.text}}</div>
          </div>
          <!--收藏加购订购-->
          <div v-if="defaultTab.type === 'collectionOrder'" class="collection-order pt-20 pb-10 pr-10 pl-10">
            <div>
              <span>选择条数</span>
              <i-button v-for="(item,index) in collectionList" :key="index" class="ml-15 collection-option" :class="{'is-active':item.index === defaultCollection.index}" @click="defaultCollection = item">
                <span class="fs-14 order-num">{{item.orderNum}}条</span><br/>
                <span class="fs-14 order-price">￥{{getMemberVersionLevel === 100 ? (item.price/100).toFixed(2) : (item.vipPrice/100).toFixed(2)}}元</span><br/>
                <span v-if="getMemberVersionLevel === 100" class="fs-12 text-decoration-through cl666">VIP:￥{{(item.vipPrice/100).toFixed(2)}}元</span>
                <span v-else class="fs-12 text-decoration-through cl666">原价:￥{{(item.price/100).toFixed(2)}}元</span>
              </i-button>
            </div>
            <p v-if="getMemberVersionLevel === 100" class="mt-15 ml-56">
              <span>单价：￥0.70元/条</span>
              <span class="ml-15 mr-15 text-decoration-through">VIP：￥0.35元/条！</span>
              <span>(<span class="blue text-decoration-underline">升级VIP</span><span class="main-color text-decoration-underline">，享受5折订购</span>)</span>
            </p>
            <p v-else class="mt-15 ml-56">
              <span>单价：￥0.35元/条</span>
              <span class="text-decoration-through mr-15 ml-15">原价：￥0.70元/条！</span>
              <span>(<span class="main-color">您当前是VIP会员，享受5折订购！</span>)</span>
            </p>
          </div>
          <!--访客流量订购-->
          <div v-if="defaultTab.type === 'flowOrder'" class="flow-order pt-20 pb-10 pr-10 pl-10">
            <div>
              <span>选择条数</span>
              <i-button v-for="(item,index) in flowList" :key="index" class="ml-15 flow-option" :class="{'is-active':item.index === defaultFlow.index}" @click="defaultFlow = item">
                <span class="fs-14 order-num">{{item.orderNum}}条</span><br/>
                <span class="fs-14 order-price">￥{{getMemberVersionLevel === 100 ? (item.originalPrice/100).toFixed(2) : (item.price/100).toFixed(2)}}元</span><br/>
                <span v-if="getMemberVersionLevel === 100" class="fs-12 text-decoration-through cl666">VIP:￥{{(item.price/100).toFixed(2)}}元</span>
                <span v-else class="fs-12 text-decoration-through cl666">原价:￥{{(item.originalPrice/100).toFixed(2)}}元</span>
              </i-button>
            </div>
            <p v-if="getMemberVersionLevel === 100" class="mt-15 ml-56">
              <span>单价：￥0.20元/条</span>
              <span class="fs-12 text-decoration-through cl666 ml-15 mr-15">VIP：￥0.10元/条</span>
              <span>(<span class="blue text-decoration-underline">升级VIP</span><span class="main-color text-decoration-underline">，享受5折订购</span>)</span>
            </p>
            <p v-else class="mt-15 ml-56">
              <span>单价：￥0.10元/条</span>
              <span class="fs-12 text-decoration-through cl666 ml-15 mr-15">原价：￥0.20元/条</span>
              <span>(<span class="main-color">您当前是VIP会员，享受5折订购！</span>)</span>
            </p>
          </div>
          <div class="mt-15 ml-56">
            <i-button class="order-btn" :loading="orderLoading" @click="order">立即订购</i-button>
          </div>
        </div>
        <div slot="footer">
          <p class="f-b text-lf">注意：流量购买后不返还，请按需购买！</p>
        </div>
      </template>
      <template v-if="step === 'pay'">
        <pay-model ref="payModelRef" :orderMoney="payMoney"
                   :orderType="3"
                   :isBalance="isBalance"
                   @confirmPayment="confirmPayment">
          <div slot="noBalance" class="title-tip">
            <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
            class="sizeColor3">{{needPayMoney > 0 ? (needPayMoney/100).toFixed(2) : 0.00}}</strong>元
            <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
          </div>
          <div slot="isBalance" class="title-tip">
            <icon color="#FF2424" size="18px" type="md-alert"/>
            <span class="ml-5">您本次需要支付金额为 <span class="sizeColor3">{{(payMoney/100).toFixed(2)}}</span> 元。</span>
          </div>
        </pay-model>
      </template>
    </modal>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Button, Icon} from 'iview'
  import PayModel from '@/components/PayModel'
  export default {
    name: "flow-order-model",
    components: {
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      PayModel: PayModel
    },
    props: {
      value: Boolean,
      default: false
    },
    data() {
      return {
        currentValue: this.value,
        step: 'select',
        tabs: [
          {
            text: '收藏加购订购',
            type: 'collectionOrder'
          },
          {
            text: '访客流量订购',
            type: 'flowOrder'
          }
        ],
        defaultTab: {
          text: '收藏加购订购',
          type: 'collectionOrder'
        },
        collectionList: [
          {
            index: 0,
            orderNum: 100,
            price: 7000,
            vipPrice: 3500
          },
          {
            index: 1,
            orderNum: 500,
            price: 35000,
            vipPrice: 17500
          },
          {
            index: 2,
            orderNum: 1000,
            price: 70000,
            vipPrice: 35000
          },
        ],
        defaultCollection: {
          index: 0,
          orderNum: 100,
          price: 7000,
          vipPrice: 3500
        },
        flowList: [
          {
            index: 0,
            orderNum: 100,
            price: 1000,
            originalPrice: 2000
          },
          {
            index: 1,
            orderNum: 500,
            price: 5000,
            originalPrice: 10000
          },
          {
            index: 2,
            orderNum: 1000,
            price: 10000,
            originalPrice: 20000
          },
        ],
        defaultFlow: {
          index: 0,
          orderNum: 100,
          price: 1000,
          originalPrice: 2000
        },
        orderLoading: false,
        payMoney: null
      }
    },

    computed: {
      /** 获取用户账户余额
       * @return {Number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },
      /** 获取用户会员状态
       * @return {boolean}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },
      /** 计算用户账户余额是否足够支付选购商品的价格（true: 余额足够， false: 余额不足）
       * @return {boolean}
       */
      isBalance() {
        return this.getUserBalance - this.payMoney >= 0
      },

      /** 计算当用户账户余额不足以支付选购的会员版本价格的需要额外充值的金额
       * @return {Number}
       */
      needPayMoney() {
        return !this.hasBalance ? Math.abs(this.getUserBalance - this.payMoney) : 0
      },

    },
    created() {
    },
    mounted() {

    },
    methods: {
      change(value) {

      },
      order() {
        const _this = this;
        if (_this.defaultTab.type === 'collectionOrder') {
          _this.payMoney = _this.getMemberVersionLevel === 100 ? _this.defaultCollection.price : _this.defaultCollection.vipPrice;
        } else if (_this.defaultTab.type === 'flowOrder') {
          _this.payMoney = _this.getMemberVersionLevel === 100 ? _this.defaultFlow.originalPrice : _this.defaultFlow.price;
        }
        console.log(_this.payMoney);
        _this.step = 'pay';
      },
      confirmPayment() {
        const _this = this;
        _this.orderLoading = true;

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .order-box {
    .tabs {
      border-bottom: 1px solid $mainColor;
      .tab {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &.active {
          background: $mainColor;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .collection-option,
    .flow-option{
      width: 120px;
      /*margin-right: 10px;*/
      background: #F7F7F7;
      &:hover{
        border-color: $mainColor;
        background-color: #FFF4F1;
        color: $mainColor;
      }
    }
    .is-active {
      color: $mainColor;
      background: #FFF4F1;
      border-color: $mainColor;
      .order-num,
      .order-price{
        color: $mainColor;
      }
    }
    .order-btn {
      background: $mainColor;
      color: #fff;
      width: 120px;
    }
  }
</style>
