<template>
  <div class="flow-order-detail">
    <p class="title">收藏加购及访客流量</p>
    <div class="flow-info pt-20 pb-20 fs-12 pl-5">
      <icon type="md-alert" color="#000"/>
      <span class="vtc-mid">当前您的账户剩余收藏加购流量： <span class="main-color">{{flowNumInfo.favoriteCartFlowLeft}}</span> 条（可支配 <span class="main-color">{{usefulFavoriteCartFlow}}</span> 条），访客流量 <span class="main-color">{{flowNumInfo.visitorFlowLeft}}</span> 条（可支配 <span class="main-color">{{usefulVisitorFlow}}</span> 条），若数量不足则无法发布相关任务。</span>
      <span class="flow-order" @click="showOrder">流量订购</span>
      <span v-if="isMember && !notGet" class="free-get-flow" @click="showFreeGetFlow = true">VIP免费领取100条流量</span>
    </div>
    <div class="tabs clear">
      <div class="tab left cursor-p" v-for="tab in tabs" :key="tab.id" :class="{active:currentTab.id === tab.id}" @click="currentTab = tab">{{tab.name}}</div>
    </div>
    <div class="mt-15">
      <component :is="currentTab.component"></component>
    </div>
    <!--免费领流量弹窗-->
    <modal v-model="showFreeGetFlow">
      <p slot="header" class="text-ct">免费领取流量</p>
      <div class="cl000">
        <p>1、每个VIP账户可免费领取1次。</p>
        <p>2、流量包含40条收藏加购流量及60条访客流量</p>
      </div>
      <div slot="footer">
        <i-button type="error" long :loading="loading" @click="getFreeFlow">确定领取</i-button>
      </div>
    </modal>
    <!--流量订购弹窗-->
    <flow-order-model v-model="showOrderModel" />
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import OrderDetail from './children/OrderDetail'
  import UseDetail from './children/UseDetail'
  import {Icon, Modal, Button} from 'iview'
  import FlowOrderModel from '@/components/FlowOrderModel'
  export default {
    name: "flow-order-detail",
    components: {
      Icon: Icon,
      Modal: Modal,
      iButton: Button,
      FlowOrderModel: FlowOrderModel
    },
    data() {
      return {
        tabs: [
          {
            name: '使用明细',
            component: UseDetail,
            id: 1
          },
          {
            name: '订购明细',
            component: OrderDetail,
            id: 2
          },
        ],
        currentTab: {
          name: '使用明细',
          component: UseDetail,
          id: 1
        },
        showFreeGetFlow: false,
        loading: false,
        notGet: true,
        showOrderModel: false,
        orderModal: false
      }
    },
    computed: {
      /** 获取用户会员状态
       * @return {boolean}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },
      flowNumInfo() {
        return this.$store.state.flowNumberInfo
      },
      usefulFavoriteCartFlow() {
        return (this.flowNumInfo.favoriteCartFlowLeft - this.flowNumInfo.favoriteCartFlowFrozen) > 0 ? this.flowNumInfo.favoriteCartFlowLeft - this.flowNumInfo.favoriteCartFlowFrozen : 0 ;
      },
      usefulVisitorFlow() {
        return (this.flowNumInfo.visitorFlowLeft - this.flowNumInfo.visitorFlowFrozen) > 0 ? this.flowNumInfo.visitorFlowLeft - this.flowNumInfo.visitorFlowFrozen : 0 ;
      },
    },
    created() {
      if (this.isMember) {
        this.checkIfAlreadyGetFreeFlow();
      }
    },
    mounted() {

    },
    methods: {
      // 检查是否已经领取过免费流量
      checkIfAlreadyGetFreeFlow() {
        const _this = this;
        api.checkIfAlreadyGetFreeFlow().then(res => {
          if (res.status) {
            _this.notGet = res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      getFreeFlow() {
        const _this = this;
        _this.loading = true;
        api.orderFlow({
          type: 0,
          platform: 'PC',
        }).then(res => {
          if (res.status) {
            _this.showFreeGetFlow = false;
            _this.$Message.success('您已成功领取流量！');
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
        })
      },
      showOrder() {
        this.showOrderModel = true;
      },
      orderSuccess() {
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .flow-order-detail {
    .title {
      line-height: 50px;
      height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #eee;
      padding-left: 10px;
    }
    .flow-info {
      .flow-order {
        padding: 3px 7px;
        border-radius: 5px;
        background: $mainColor;
        color: #fff;
        cursor: pointer;
      }
      .free-get-flow {
        padding: 3px 7px;
        background-color: #F0EA39;
        color: $mainColor;
        border: 1px solid $mainColor;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .tabs {
      .tab {
        width: 150px;
        height: 40px;
        line-height:  40px;
        text-align: center;
        background: #F7F6F5;
        &.active {
          background: $mainColor;
          color: #fff;
        }
      }
    }

  }
</style>
