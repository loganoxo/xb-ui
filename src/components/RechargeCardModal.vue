<template>
  <modal :value="value" :mask-closable="false" @on-visible-change="change" width="600">
    <div slot="header">
      <img src="~assets/img/icon/recharge-card-icon.png" alt="">
      <span class="fs-18 ml-10 vtc-sup">充值卡充值</span>
    </div>
    <div class="card-list">
      <i-button class="card-order" v-for="item in cardList" :key="item.id" @click="selectCard = item" :class="{'is-active': selectCard.id === item.id}">
        <span class="fs-16 cl666 f-b">￥{{item.price / 100}}</span><br/>
        <span>赠送{{item.gift / 100}}元</span>
      </i-button>
    </div>
    <div class="terms-box">
      <p>使用充值业务，表示您已阅读、理解并同意接受以下条款及规则的约束。</p>
      <p>1、成功充值后，充值金额和赠送金额将显示于充值卡中。仅限对自己账户充值，充值金额和赠送金额不可转赠或提现。</p>
      <p>2、充值卡仅用限于支付活动推广费，不支持支付其它消费。</p>
      <p>3、充值卡不能与平台其它优惠同时使用。</p>
      <p>4、当你同时具有充值金额及赠送金额，在您进行消费时，优先使用充值金额。多次充值情况下，将优先消耗所有的充值金额后再消耗赠送金额。</p>
      <p>5、使用充值卡消费时，若任务结算时未完成</p>
    </div>
    <div class="hasRead">
      <checkbox v-model="hasRead"/>
      <span>本人已阅读并同意</span>
      <span>《特惠返利充值条款》</span>
    </div>
    <div class="operate">
      <div class="recharge-info">
        <p>
          <span>到账</span>
          <span>￥1500</span>
        </p>
        <p>充值卡仅限支付推广费</p>
      </div>
      <i-button>去支付1000元</i-button>
    </div>
  </modal>
</template>

<script>
  import api from '@/config/apiConfig'
  import {Modal, Button, Icon, Checkbox} from 'iview'
  import PayModel from '@/components/PayModel'
  export default {
    name: "recharge-card-modal",
    components: {
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      Checkbox: Checkbox,
      PayModel: PayModel
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        cardList:[
          {
            price: 50000,
            gift: 10000,
            id: 1
          },
          {
            price: 80000,
            gift: 30000,
            id: 2
          },
          {
            price: 100000,
            gift: 50000,
            id: 3
          },
        ],
        selectCard: {
          price: 100000,
          gift: 50000,
          id: 3
        },
        hasRead: false
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      change(value) {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .card-list {
    padding-top: 20px;
    padding-bottom: 20px;
    .card-order {
      width: 120px;
      background: #F7F7F7;
      padding: 10px 5px;
      margin-left: 25px;
      &:hover {
        border-color: $mainColor;
        background-color: #FFF4F1;
        color: $mainColor;
      }
      &:last-of-type {
        span {

        }
      }
    }
    .is-active {
      color: $mainColor;
      background: #FFF4F1;
      border-color: $mainColor;
    }
  }
</style>
