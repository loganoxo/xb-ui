<template>
  <div class="place-order-step">
    <div class="place-type">
      <span>{{showkerTaskInfo.task.taskTypeDesc}}</span>
      <span v-if="showkerTaskInfo.currentGenerationEndTime" class="ml-20">下单剩余时间<time-down color='#ff4040' :fontWeight=600 :endTime="showkerTaskInfo.currentGenerationEndTime"></time-down>（超时未下单，即未在平台提交订单号，视为主动放弃活动资格）</span>
    </div>
    <div class="place-step mt-22" v-if="showkerTaskInfo.task.taskType === 'pc_search' || showkerTaskInfo.task.taskType === 'app_search'">
      <p
        v-if="hasCurrentSearchSchemeIndex ? showkerTaskInfo.task.taskType === 'pc_search' : showkerTaskInfo.taskType === 'pc_search'">
        第1步：打开浏览器输入【<span>www.taobao.com</span>】</p>
      <p
        v-if="hasCurrentSearchSchemeIndex ? showkerTaskInfo.task.taskType === 'app_search' : showkerTaskInfo.taskType === 'app_search'">
        第1步：打开【<span>手机淘宝APP</span>】</p>
      <p>第2步：搜索框输入关键词【<span>{{taskDetail.searchKeyword}}</span>】
        <span v-if="hasCurrentSearchSchemeIndex && isShowChangeKeyword && showkerTaskInfo.status !== 'trial_end'"
              class="ml-10 color cursor-p" @click="changeTaskPlaceInfo">找不到宝贝？点击换个关键词试试</span>
        <!--<span v-if="!hasCurrentSearchSchemeIndex && isShowChangeKeyword" class="ml-10 color cursor-p" @click="changeTaskPlaceInfo">找不到宝贝？点击换个关键词试试</span>-->
      </p>
      <p>第3步：选择【<span>{{getTaskStatus(taskDetail.searchSort)}}</span>】排序</p>
      <p
        v-if="hasCurrentSearchSchemeIndex ? showkerTaskInfo.task.taskType === 'app_search' : showkerTaskInfo.taskType === 'app_search'">
        第4步：从上往下数第【<span>{{taskDetail.searchRankPosition}}</span>】个宝贝左右</p>
      <p
        v-if="hasCurrentSearchSchemeIndex ? showkerTaskInfo.task.taskType === 'pc_search' : showkerTaskInfo.taskType === 'pc_search'">
        第4步：在【<span>{{taskDetail.searchPagePositionMin}}-{{taskDetail.searchPagePositionMax}}</span>】页附近找到下图宝贝。（由于千人千面的影响，位置仅供参考）
      </p>
      <p v-if="taskDetail.priceRangeMin > 0 || taskDetail.deliverAddress || checkText">第5步：<span class="minor-color"
                                                                                                 v-if="taskDetail.priceRangeMin > 0">搜索指定价格【<span>{{taskDetail.priceRangeMin / 100}}-{{taskDetail.priceRangeMax / 100}}</span>】，</span><span
        class="minor-color" v-if="taskDetail.deliverAddress">搜索指定发货地【<span>{{taskDetail.deliverAddress}}</span>】，</span><span
        class="minor-color" v-if="checkText">勾选【<span>{{checkText}}</span>】</span></p>
      <p
        v-if="showkerTaskInfo.task.needBrowseCollectAddCart && !(taskDetail.priceRangeMin > 0) && !taskDetail.deliverAddress && !checkText">
        第5步：请收藏宝贝，并加入购物车。</p>
      <p
        v-if="showkerTaskInfo.task.needBrowseCollectAddCart && (taskDetail.priceRangeMin > 0) && taskDetail.deliverAddress && checkText">
        第6步：请收藏宝贝，并加入购物车。</p>
    </div>
    <div class="tao-code-place-step" v-if="showkerTaskInfo.task.taskType === 'tao_code'">
      <p class="mb-10">淘口令【<span>{{taskDetail.taoCode}}</span>】<span class="ml-10 copy-btn" :data-clipboard-text="taskDetail.taoCode"> 点击复制口令</span></p>
      <p>入口说明：【<span>直接在手机端上复制淘口令，打开手淘会自动弹出宝贝链接</span>】</p>
      <div class="clear mt-10" v-if="taskDetail.homePageLockItemImage">
        <span class="left mt-28 mr-5 cl999">卡首屏宝贝主图：</span>
        <div class="tao-code-image mt-5 inline-block left">
          <img :src="taskDetail.homePageLockItemImage" alt="卡首屏宝贝主图">
          <div class="tao-code-image-cover" @click="isShowTaoCodeModel = true">
            <Icon type="ios-eye-outline"></Icon>
          </div>
        </div>
        <span class="main-color ml-5 mt-28 left">点击缩略图可查看原图</span>
      </div>
      <p v-if="taskDetail.homePageLockItemPrice">卡首屏宝贝价格：<span>{{(taskDetail.homePageLockItemPrice / 100).toFixed(2) + '元'}}</span>
      </p>
    </div>
    <div class="tao-link-place-step" v-if="showkerTaskInfo.task.taskType === 'direct_access'">
      <p class="clear"><strong class="left">宝贝链接：</strong><a class="left ml-5" :href="showkerTaskInfo.task.itemUrl" target="_blank">{{showkerTaskInfo.task.itemUrl}}</a></p>
    </div>
    <div class="baby-info clear mt-40" v-if="showkerTaskInfo.task.taskType === 'pc_search' || showkerTaskInfo.task.taskType === 'app_search'">
      <img class="left" :src="taskDetail.itemMainImage" alt="">
      <div class="left ml-20 mt-5">
        <p>
          <span>掌柜旺旺：</span>
          <span>{{getRealStoreName(showkerTaskInfo.task.storeName)}}</span>
        </p>
        <p>
          <span>店铺名称：</span>
          <span>{{getRealStoreName(showkerTaskInfo.task.realStoreName)}}</span>
        </p>
        <p>
          <span>价格：</span>
          <span>￥{{(showkerTaskInfo.task.itemPrice / 100).toFixed(2) || 0}}</span>
        </p>
        <p>
          <!--<router-link :to="{path:'/user/help-center/faq-showker',query:{page:'common',qusNum:9}}" class="color" target="_blank">找不到宝贝，怎么办？</router-link>-->
          <span class="color cursor-p" @click="showQrCodeModel = !showQrCodeModel" v-if="showkerTaskInfo.task.taskType === 'app_search'">关键词找不到宝贝？点我！</span>
        </p>
      </div>
    </div>
    <p class="pt-20 main-color">禁止从淘宝客等其他任何返利途径下单，一旦发现系统将扣除产生的淘客佣金，情节严重者直接扣除所有返款并冻结账号！如有疑问请及时联系客服。</p>
    <div class="precautions mt-20 pt-20" v-if="isShowPrecautions" :class="[!hasCurrentSearchSchemeIndex ? 'precautions-bg' : '']">
      <p>注意事项：</p>
      <p class="mt-10" v-if="showkerTaskInfo.task.showkerOrderTimeLimit">
        <span>下单速度：</span>
        <span>{{showkerTaskInfo.task.showkerOrderTimeLimit}}小时</span>
        <Tooltip content="通过审批后需要指定时间内完成淘宝下单并在本平台提交订单号，否则资格自动过期" placement="top">
          <Icon class="fs-14 ml-5" type="help-circled"></Icon>
        </Tooltip>
      </p>
      <p class="mt-10" v-if="showkerTaskInfo.task.orderQuantity">
        <span>拍下件数：</span>
        <span>{{showkerTaskInfo.task.orderQuantity || 1}}</span>
      </p>
      <p class="mt-10">
        <span>付款方式：</span>
        <span v-if="showkerTaskInfo.task.paymentMethod === 'all'">无所谓（可以使用花呗、信用卡等付款，也可以不用）</span>
        <span v-if="showkerTaskInfo.task.paymentMethod === 'no_hua_and_credit_pay'">禁止使用花呗和信用卡付款</span>
        <span v-if="showkerTaskInfo.task.paymentMethod === 'no_hua_pay'">禁止使用花呗付款</span>
        <span v-if="showkerTaskInfo.task.paymentMethod === 'no_credit_pay'">禁止使用信用卡付款</span>
      </p>
      <p class="mt-10 mr-10" v-if="showkerTaskInfo.task.remark">
        <span>商家备注：</span>
        <span>{{showkerTaskInfo.task.remark}}</span>
      </p>
    </div>
    <!--卡首屏宝贝主图截图查看-->
    <modal title="卡首屏宝贝主图截图查看" v-model="isShowTaoCodeModel">
      <img :src="taskDetail.homePageLockItemImage + '!orgi75'" style="width: 100%">
    </modal>
    <!--查看黑搜二维码弹窗-->
    <modal title="二维码关键词" v-model="showQrCodeModel">
      <p class="fs-14">如果所有关键词都找不到宝贝，请使用<span class="main-color">淘宝客户端</span>扫描下方二维码，即可找到商家要求下单的宝贝！</p>
      <p class="text-ct">
        <img :src="getCodeUrl" alt="二维码关键词">
      </p>
    </modal>
  </div>
</template>

<script>
  import {Button, Input, Icon, Modal, Tooltip} from 'iview'
  import TimeDown from '@/components/TimeDown'
  import Clipboard from 'clipboard';
  import api from '@/config/apiConfig'
  import {taskErrorStatusList, getUrlParams} from '@/config/utils'

  export default {
    name: 'PlaceOrderStep',
    components: {
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      Modal: Modal,
      TimeDown: TimeDown,
      Tooltip: Tooltip,
    },
    props: {
      showkerTaskInfo: {
        required: true,
        type: Object,
        default() {
          return {}
        }
      },
      isShowPrecautions: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isShowTaoCodeModel: false,
        showQrCodeModel: false,
      }
    },
    created() {
      let _this = this;
      _this.$nextTick(() => {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on('success', () => {
          _this.$Message.success("复制成功！");
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制失败！");
          clipboard.destroy();
        });
      });
    },
    computed: {
      taskDetail() {
        let _this = this;
        let taskDetailObject = _this.showkerTaskInfo.task.taskDetailObject;
        if (_this.hasCurrentSearchSchemeIndex) {
          let index = _this.showkerTaskInfo.currentSearchSchemeIndex;
          for (let i = 0, len = taskDetailObject.length; i < len; i++) {
            if (taskDetailObject[i].index === index) {
              return taskDetailObject[i];
            }
          }
        } else {
          if (_this.showkerTaskInfo.task.taskType === 'tao_code') {
            // return taskDetailObject[0];
            return taskDetailObject?taskDetailObject[0]:{};
          } else if(_this.showkerTaskInfo.task.taskType === 'direct_access'){
            return {}
          } else {
            let len = _this.showkerTaskInfo.taskDetailObject.length;
            let index = Math.floor(Math.random() * len);
            return _this.showkerTaskInfo.taskDetailObject[index];
          }
        }
      },
      checkText() {
        return this.taskDetail.searchFilterDesc ? this.taskDetail.searchFilterDesc.split(',').join('、') : null;
      },
      hasCurrentSearchSchemeIndex() {
        return this.showkerTaskInfo.currentSearchSchemeIndex !== undefined && this.showkerTaskInfo.currentSearchSchemeIndex !== null;
      },
      isShowChangeKeyword() {
        return this.showkerTaskInfo.task.taskDetailObject.length > 1;
      },
      getCodeUrl() {
        const id = getUrlParams(this.showkerTaskInfo.task.itemUrl, 'id');
        if(this.showkerTaskInfo.task.taskDetailObject){
          return `/api/get-qr-image.json?id=${id}&keyWord=${this.showkerTaskInfo.task.taskDetailObject[0].searchKeyword}`;
        }
        // return `/api/get-qr-image.json?id=${id}&keyWord=${this.showkerTaskInfo.task.taskDetailObject[0].searchKeyword}`;
      }
    },
    methods: {
      getRealStoreName(name) {
        if (name) {
          return `${name.substr(0, 1)}****${ name.substr(-1)}`;
        }else {
          return '******'
        }
      },
      getTaskStatus(type) {
        return taskErrorStatusList(type);
      },
      changeTaskPlaceInfo() {
        let _this = this;
        if (_this.hasCurrentSearchSchemeIndex) {
          api.getSchemeReassign({
            showkerTaskId: _this.showkerTaskInfo.id,
          }).then(res => {
            if (res.status) {
              _this.$emit('changeTask');
            } else {
              _this.$Message.error(res.msg);
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .color {
    color: #2b85e4 !important;
  }

  .place-type {
    padding: 28px 0 12px 0;
    border-bottom: 2px solid #F6F6F6;
    span:nth-child(2) {
      font-size: 16px;
      color: #666;
    }
    span:last-child {
      color: red;
      font-size: 14px;
    }
  }

  .place-step,
  .tao-code-place-step,
  .tao-link-place-step {
    p {
      margin-top: 20px;
      color: #999;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }

  .baby-info {
    img {
      @include wh(124px, 124px);
    }
    p {
      color: #8C9BB6;
      margin-top: 8px;
    }
  }

  .tao-code-place-step {
    p {
      span:nth-child(2) {
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          color: darken(#2b85e4, 10%);
        }
      }
    }
  }

  .tao-link-place-step {
    strong {
      color: #999;
      font-weight: normal;
    }
    a {
      color: #2b85e4;
      max-width: 900px;
      word-break: break-all;
      display: inline-block;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .verification-link {
    border-top: 2px solid #F6F6F6;
    .link-right {
      color: #69B045;
    }
    .link-error {
      color: red;
    }
  }

  .precautions {
    border-top: 2px solid #F6F6F6;
    p:first-child {
      color: $mainColor;
      font-size: 18px;
      font-weight: bold;
    }
    P:nth-child(2),
    P:nth-child(3) {
      color: $mainColor;
      font-size: 12px;
    }
  }

  .precautions-bg {
    background-color: #eee;
    padding-left: 12px;
    padding-bottom: 26px;
  }

  .evaluation-content-tip {
    padding: 15px 10px;
    background-color: #F8F8F8;
    border: 1px solid #F2F2F2;
    margin-top: 8px;
  }

  .evaluation-content-tip-assign {
    background-color: #FFF4F1;
    border: 1px solid #FFB9B8;
    padding: 15px 10px;
    margin-top: 8px;
  }

  .copy-evaluation-tbn {
    width: 112px;
    height: 22px;
    line-height: 22px;
    background-color: #fff;
    border: 1px solid $mainColor;
    color: $mainColor;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }

  .serial-number {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #CCCCCC;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 16px;
  }

  .tao-code-image {
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
    &:hover .tao-code-image-cover {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .tao-code-image-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .tao-code-image-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
