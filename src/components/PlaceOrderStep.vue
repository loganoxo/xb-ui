<template>
  <div class="place-order-step">
    <div class="place-type">
      <span>{{taskPlaceInfo.taskTypeDesc}}</span>
      <span v-if="currentGenerationEndTime" class="ml-20">下单剩余时间<time-down color='#ff4040' :fontWeight=600 :endTime="currentGenerationEndTime"></time-down>（超时未下单，即未在平台提交订单号，视为主动放弃活动资格）</span>
    </div>
    <div class="place-step mt-22 fs-12"
         v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
      <p v-if="taskPlaceInfo.taskType === 'pc_search'">第1步：打开浏览器输入【<span>www.taobao.com</span>】</p>
      <p v-if="taskPlaceInfo.taskType === 'app_search'">第1步：打开【<span>手机淘宝APP</span>】</p>
      <p v-if="taskPlaceInfo.taskType === 'pc_search'">
        第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
      <p v-if="taskPlaceInfo.taskType === 'app_search'">
        第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
      <p>第3步：选择【<span>{{getTaskStatus(taskPlaceInfo.taskDetailObject.searchSort)}}</span>】排序</p>
      <p v-if="taskPlaceInfo.taskType === 'app_search'">
        第四步：从上往下数第【<span>{{taskPlaceInfo.taskDetailObject.searchRankPosition}}</span>】个宝贝左右</p>
      <p v-if="taskPlaceInfo.taskType === 'pc_search'">
        第4步：在【<span>{{taskPlaceInfo.taskDetailObject.searchPagePositionMin}}-{{taskPlaceInfo.taskDetailObject.searchPagePositionMax}}</span>】页附近找到下图宝贝。（由于千人千面的影响，位置仅供参考）
      </p>
      <p
        v-if="taskPlaceInfo.taskDetailObject.priceRangeMin > 0 || taskPlaceInfo.taskDetailObject.deliverAddress || checkText">
        第5步：<span class="minor-color"
                  v-if="taskPlaceInfo.taskDetailObject.priceRangeMin > 0">搜索指定价格【<span>{{taskPlaceInfo.taskDetailObject.priceRangeMin / 100}}-{{taskPlaceInfo.taskDetailObject.priceRangeMax / 100}}</span>】，</span><span
        class="minor-color"
        v-if="taskPlaceInfo.taskDetailObject.deliverAddress">搜索指定发货地【<span>{{taskPlaceInfo.taskDetailObject.deliverAddress}}</span>】，</span><span
        class="minor-color" v-if="checkText">勾选【<span>{{checkText}}</span>】</span>
      </p>
    </div>
    <div class="tao-code-place-step fs-12" v-if="taskPlaceInfo.taskType === 'tao_code'">
      <p class="mb-10">
        淘口令【<span id="copyCode">{{taskPlaceInfo.taskDetailObject.taoCode}}</span>】<span id="copyBtn"class="ml-10">点击复制口令</span>
      </p>
      <p>入口说明：【<span>直接在手机端上复制淘口令，打开手淘会自动弹出宝贝链接</span>】</p>
    </div>
    <div class="tao-link-place-step" v-if="taskPlaceInfo.taskType === 'direct_access'">
      <p class="clear"><strong class="left">宝贝链接：</strong><a class="left ml-5" :href="taskPlaceInfo.itemUrl"
                                                             target="_blank">{{taskPlaceInfo.itemUrl}}</a></p>
    </div>
    <div class="baby-info clear mt-40 fs-12"
         v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
      <img class="left" :src="taskPlaceInfo.taskDetailObject.itemMainImage" alt="">
      <div class="left ml-20 mt-20">
        <p>
          <span>掌柜旺旺：</span>
          <span>{{getStoreName}}</span>
        </p>
        <p>
          <span>价格：</span>
          <span>￥{{taskPlaceInfo.itemPrice / 100 || 0}}</span>
        </p>
      </div>
    </div>
    <div class="verification-link mt-20 pt-20 fs-12"
         v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
      <span>宝贝链接验证：</span>
      <iInput v-model="verificationLink" style="width: 300px;" placeholder="请输入宝贝链接地址"></iInput>
      <iButton type="primary" @click="verificationLinkIsRight">验证</iButton>
      <span class="link-right ml-5" v-show="verificationLinkStatus === 'success'"><Icon type="checkmark-circled" color="#69B045"></Icon>&nbsp;恭喜，找对啦！</span>
      <span class="link-error ml-5" v-show="verificationLinkStatus === 'error'"><Icon type="close-circled" color="red"></Icon>&nbsp;糟糕，不是这家哦~</span>
    </div>
    <div class="mt-10 ml-88" v-if="taskPlaceInfo.taskType === 'app_search'">
      <a @click="showGetAppUrlImage = true" class="fs-12">手淘宝贝如何获取链接地址？</a>
      <Modal v-model="showGetAppUrlImage" :width="600">
        <div class="text-ct">
          <img src="~assets/img/common/get-app-url-image.png" alt="">
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Icon from 'iview/src/components/icon'
  import Modal from 'iview/src/components/modal'
  import TimeDown from '@/components/TimeDown'
  import Clipboard from 'clipboard';
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList, getUrlParams} from '@/config/utils'

  export default {
    name: 'PlaceOrderStep',
    components: {
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      Modal: Modal,
      TimeDown: TimeDown,
    },
    props: {
      taskPlaceInfo: {
        required: true,
        type: Object,
        default: {}
      },
      currentGenerationEndTime: {
        required: true,
      }
    },
    data() {
      return {
        showGetAppUrlImage: false,
        verificationLink: null,
        verificationLinkStatus: null,
      }
    },
    mounted() {

    },
    created() {
    },
    computed: {
      checkText() {
        return this.taskPlaceInfo.taskDetailObject.searchFilterDesc ? this.taskPlaceInfo.taskDetailObject.searchFilterDesc.split(',').join('、') : null;
      },
      getStoreName() {
        let length = this.taskPlaceInfo.storeName.length;
        let name = this.taskPlaceInfo.storeName;
        if (length && length > 4) {
          return name.substr(0, 2) + '****' + name.substr(-2);
        } else if (length && length <= 4) {
          return name.substr(0, 1) + '****' + name.substr(-1);
        } else {
          return '****'
        }
      },
    },
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      verificationLinkIsRight() {
        if(!this.verificationLink){
          this.verificationLinkStatus = null;
          this.$Message.warning('亲，请输入需要验证的宝贝链接地址！');
          return;
        }
        let newId = getUrlParams(this.verificationLink, 'id');
        let oldId = getUrlParams(this.taskPlaceInfo.itemUrl, 'id');
        console.log(newId);
        console.log(oldId);
        this.verificationLinkStatus = newId === oldId ? 'success' : 'error';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .place-type {
    padding: 28px 0 12px 0;
    border-bottom: 2px solid #F6F6F6;
    span:first-child {
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
</style>
