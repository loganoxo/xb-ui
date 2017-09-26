<template>
  <div class="user-home clear">
    <p class="user-home-account">推荐有礼</p>
    <div>
      <p class="mt-20">
        <span class="fs-18">我的邀请链接：</span>
        <input type="text" class="ivu-input" style="width: 30%" v-model="copyValue" readonly="readonly" id="copyCode"/>
        <a class="ivu-btn ivu-btn-button ivu-btn-primary" id="copyBtn">复制链接</a>
      </p>
      <div class="mt-20 fs-18">
        <span>一键分享：</span>
        <div  class="social-share inline-block" :data-url="copyValue" data-sites="qzone, qq, weibo, wechat, douban" data-description="秀吧 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣"></div>
      </div>
      <div class="award-box">
        <p class="fs-18">奖励说明：</p>
        <ul>
          <li>1.通过您的邀请链接成功进行注册，如果是秀客，成功注册并完成首个任务后，即可获得￥3奖励，且自该秀客注册起一年时间内，该秀客每完成一个任务，您都可以从对应活动的推广费中获得15%的提成；</li>
          <li>2.通过您的邀请链接成功进行注册，如果是商家，秀客完成其首个任务后，即可获得￥3奖励，且自该商家注册起一年时间内，每个秀客完成该商家的一个任务时，您都可以从对应活动的推广费中获得10%的提成；</li>
          <li>3.奖励的金额将直接充值到您的账户余额中，您可以用来提现；</li>
        </ul>
      </div>
      <div class="mt-30">
        <div class="fs-18">
          <span class="left">我邀请的好友：</span>
          <p class="fs-14 cl000 left">
            一共邀请了 <span style="color: #ff6600"> 3 </span> 位好友，共获得 <span style="color: #ff6600"> ￥15 </span> 奖励
          </p>
        </div>
        <div class="mt-20 clear-both">
          <iTable :columns="columns1" :data="data1"></iTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import Carousel from 'iview/src/components/carousel'
  import Table from 'iview/src/components/table'
  import Clipboard from 'clipboard';
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'Recommend',
    components: {
      Icon: Icon,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      iTable: Table
    },
    data() {
      return {
        copyValue: '',
        columns1: [
          {
            title: '用户',
            key: 'phone'
          },
          {
            title: '注册时间',
            key: 'age'
          },
          {
            title: '类型',
            key: 'type'
          },
          {
            title: '<span style="color: #495060;">今日奖励</span>',
            key: 'nowAward',
            className: 'main-color'
          },
          {
            title: '<span style="color: #495060;">累计奖励</span>',
            key: 'countAward',
            className: 'main-color'
          },
        ],
        data1: [
          {
            phone: '136****6578',
            age: 18,
            address: '北京市朝阳区芍药居',
            type: '秀客',
            nowAward: '6',
            countAward: '20'
          },
          {
            phone: '136****6578',
            age: 25,
            address: '北京市海淀区西二旗',
            type: '秀客',
            nowAward: '6',
            countAward: '20',
          },
          {
            phone: '136****6578',
            age: 30,
            address: '上海市浦东新区世纪大道',
            type: '秀客',
            nowAward: '6',
            countAward: '20'
          },
          {
            phone: '136****6578',
            age: 26,
            address: '深圳市南山区深南大道',
            type: '秀客',
            nowAward: '6',
            countAward: '20'
          }
        ]
      }
    },
    created() {
      let _this = this;
      api.getRecommendUrl().then((res) => {
          _this.copyValue = res;
      });
      _this.$nextTick(function () {
        let clipboard = new Clipboard('#copyBtn', {
          target: () => document.getElementById('copyCode')
        });
        clipboard.on('success', () => {
          _this.$Message.success("复制链接成功！");
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制链接失败！");
          clipboard.destroy();
        });
      })
    },
    computed: {},
    methods: {},
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .user-home {
    .user-home-account {
      line-height: 50px;
      height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #eee;
    }
    .award-box {
      background-color: #F2F2F2;
      padding: 20px;
      margin-top: 20px;
      ul {
        line-height: 30px;
        font-size: 14px;
      }
    }
  }


</style>
