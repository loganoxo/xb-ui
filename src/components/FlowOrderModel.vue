<template>
  <!--<div class="flow-order-model">-->
  <modal :value="value" :mask-closable="false" @on-visible-change="change" width="600">
    <template v-if="step === 'select'">
      <div slot="header">
        <img src="~assets/img/task-release/shopping-cart.png" alt="">
        <span class="fs-18 ml-10 vtc-sup">流量订购</span>
      </div>
      <div class="order-box">
        <div class="tabs clear">
          <div class="tab left" v-for="(tab,index) in tabs" :key="index" :class="{active:defaultTab.type === tab.type}"
               @click="changeType(tab)">{{tab.text}}
          </div>
        </div>
        <!--收藏加购订购-->
        <div class="collection-order pt-20 pb-10 pr-10 pl-10">
          <div>
            <span>选择条数</span>
            <i-button v-for="item in orderList" :key="item.id" class="ml-15 collection-option"
                      :class="{'is-active':item.id === selectItem.id}" @click="selectItem = item">
              <span class="fs-14 order-num">{{item.count}}条</span><br/>
              <span class="fs-14 order-price">￥{{(item.price/100).toFixed(2)}}元</span><br/>
              <span class="fs-12 text-decoration-through cl666">{{item.memberLevel === 100 ? 'VIP' : '原价'}}:￥{{(item.showPrice/100).toFixed(2)}}元</span>
              <!--<span v-else class="fs-12 text-decoration-through cl666">原价:￥{{(item.price/100).toFixed(2)}}元</span>-->
            </i-button>
          </div>
          <p v-if="getMemberVersionLevel === 100" class="mt-15 ml-56">
            <span v-show="defaultTab.type === 'favorite_cart_flow'">单价：￥0.70元/条</span>
            <span v-show="defaultTab.type === 'favorite_cart_flow'" class="ml-15 mr-15 text-decoration-through">VIP：￥0.35元/条</span>
            <span v-show="defaultTab.type === 'visitor_flow'">单价：￥0.20元/条</span>
            <span v-show="defaultTab.type === 'visitor_flow'"
                  class="ml-15 mr-15 text-decoration-through">VIP：￥0.10元/条</span>
            <span>(<span class="blue text-decoration-underline">升级VIP</span><span
              class="main-color text-decoration-underline">，享受5折订购</span>)</span>
          </p>
          <p v-else class="mt-15 ml-56">
            <span v-show="defaultTab.type === 'favorite_cart_flow'">单价：￥0.35元/条</span>
            <span v-show="defaultTab.type === 'favorite_cart_flow'" class="text-decoration-through mr-15 ml-15">原价：￥0.70元/条</span>
            <span v-show="defaultTab.type === 'visitor_flow'">单价：￥0.10元/条</span>
            <span v-show="defaultTab.type === 'visitor_flow'"
                  class="text-decoration-through mr-15 ml-15">原价：￥0.20元/条</span>
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
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span
            class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
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
  <!--</div>-->
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Button, Icon} from 'iview'
  import PayModel from '@/components/PayModel'
  import {setSessionStorage, getSessionStorage} from '@/config/utils'

  export default {
    name: "flow-order-model",
    components: {
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      PayModel: PayModel
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      // 订购选项卡默认选择（以访客流量是否不足为标准，如果访客流量不足，定位到访客流量订购（true），其他情况均默认收藏加购流量订购（false））
      visitorFlowOrder: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        step: 'select',
        tabs: [
          {
            text: '收藏加购订购',
            type: 'favorite_cart_flow'
          },
          {
            text: '访客流量订购',
            type: 'visitor_flow'
          }
        ],
        defaultTab: {
          text: this.visitorFlowOrder ? '访客流量订购' :'收藏加购订购',
          type: this.visitorFlowOrder ? 'visitor_flow' :'favorite_cart_flow'
        },
        orderList: [],
        selectItem: {},
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
        if (this.$store.getters.getMemberLevel === 100) {
          return 100
        } else {
          return 200
        }
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
      // this.getFlowOrderConfig('favorite_cart_flow');
      if (this.visitorFlowOrder) {
        this.getFlowOrderConfig('visitor_flow');
      } else {
        this.getFlowOrderConfig('favorite_cart_flow');
      }
    },
    mounted() {},
    methods: {
      changeType(tab) {
        this.defaultTab = tab;
        this.getFlowOrderConfig(tab.type);
      },
      // 获取流量配置信息
      getFlowOrderConfig(type) {
        const _this = this;
        api.getFlowOrderConfig({
          memberLevel: _this.getMemberVersionLevel,
          type: type
        }).then(res => {
          if (res.status) {
            if (res.data.length > 0) {
              _this.orderList = res.data;
              _this.selectItem = res.data[0];
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })

      },
      change(value) {
        if (!value) {
          this.step = 'select';
          this.orderList = [];
          this.selectItem = {};
          // this.defaultTab = {
          //   text: '收藏加购订购',
          //   type: 'favorite_cart_flow'
          // };
          this.$emit('input', false);
        } else {
          this.defaultTab = {
            text: this.visitorFlowOrder ? '访客流量订购' :'收藏加购订购',
            type: this.visitorFlowOrder ? 'visitor_flow' :'favorite_cart_flow'
          };
          if (this.visitorFlowOrder) {
            this.getFlowOrderConfig('visitor_flow');
          } else {
            this.getFlowOrderConfig('favorite_cart_flow');
          }
        }
      },
      order() {
        this.payMoney = this.selectItem.price;
        this.step = 'pay';
      },
      confirmPayment(pwd) {
        const _this = this;
        _this.orderLoading = true;
        api.orderFlow({
          popularFlowConfigId: _this.selectItem.id,
          type: 1,
          platform: 'PC',
          payPwd: pwd
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.$store.dispatch('getFlowNumInfo');
            _this.step = 'select';
            _this.$Message.success('恭喜您，支付成功！');
            _this.selectItem = _this.orderList[0];
            _this.$emit('input', false);
            _this.$emit('on-success');
          } else {
            _this.$Message.error(res.msg);
          }
          _this.$refs.payModelRef.payLoading = false;
          _this.orderLoading = false;
        })
      },
    },
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
    .flow-option {
      width: 120px;
      background: #F7F7F7;
      &:hover {
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
      .order-price {
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
