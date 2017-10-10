<template>
  <div class="user-home clear">
    <p class="user-home-account">推荐有礼</p>
    <div>
      <p class="mt-20">
        <span class="fs-18">我的邀请链接：</span>
        <input type="text" class="ivu-input" style="width: 30%" readonly="readonly" v-model="copyValue" id="copyCode"/>
        <a class="ivu-btn ivu-btn-button ivu-btn-primary" id="copyBtn">复制链接</a>
      </p>
      <div class="mt-20 fs-18">
        <span>一键分享：</span>
        <div v-html="copyHtml" style="display: inline-block;"></div>
      </div>
      <div class="award-box">
        <p class="fs-18">奖励说明：</p>
        <ul>
          <li>
            1.通过您的邀请链接成功进行注册，如果是秀客，成功注册并完成首个任务后，即可获得 <span style="color: #ff6600">￥3</span> 奖励，
            且自该秀客注册起一年时间内，该秀客每完成一个任务，您都可以从对应活动的推广费中获得
            <span style="color: #ff6600">15%</span> 的提成；
          </li>
          <li>
            2.通过您的邀请链接成功进行注册，如果是商家，秀客完成其首个任务后，即可获得 <span style="color: #ff6600">￥3</span> 奖励，且自该商家注册起一年时间内，
            每个秀客完成该商家的一个任务时，您都可以从对应活动的推广费中获得 <span style="color: #ff6600">10%</span> 的提成；
          </li>
          <li>
            3.奖励的金额将直接充值到您的账户余额中，您可以用来提现；
          </li>
        </ul>
      </div>
      <div class="mt-30">
        <div class="fs-18">
          <span >我邀请的好友：</span>
          <p class="fs-14 cl000 " style="display: inline-block;">
            一共邀请了 <span style="color: #ff6600"> {{count}} </span> 位好友，共获得 <span style="color: #ff6600"> ￥{{reward/100}} </span> 奖励
          </p>
        </div>
        <div class="mt-20 clear-both">
          <div data-v-616de780="" class="ivu-table-wrapper">
            <div class="ivu-table"><!---->
              <div class="ivu-table-header">
                <table cellspacing="0" cellpadding="0" border="0" style="width: 1031px;">
                  <thead>
                  <tr>
                    <th class="">
                      <div class="ivu-table-cell"><span>用户</span></div>
                    </th>
                    <th class="">
                      <div class="ivu-table-cell"><span>注册时间</span></div>
                    </th>
                    <th class="">
                      <div class="ivu-table-cell"><span>类型</span> </div>
                    </th>
                    <th class="main-color">
                      <div class="ivu-table-cell">
                        <span style="color: #495060;">今日奖励</span>
                      </div>
                    </th>
                    <th class="main-color">
                      <div class="ivu-table-cell">
                        <span style="color: #495060;">累计奖励</span>
                      </div>
                    </th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="ivu-table-body">
                <table cellspacing="0" cellpadding="0" border="0" style="width: 1031px;" v-show="recommendData.length">
                  <tbody class="ivu-table-tbody">
                    <tr class="ivu-table-row" v-for="recommend in recommendData">
                      <td class="">
                        <div class="ivu-table-cell"> <span>{{recommend.inviteePhone}}</span> </div>
                      </td>
                      <td class="">
                        <div class="ivu-table-cell"><span>{{recommend.inviteeRegisterTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span> </div>
                      </td>
                      <td class="">
                        <div class="ivu-table-cell">
                          <span v-if="recommend.inviteeRole == 0">秀客</span>
                          <span v-if="recommend.inviteeRole == 1">商家</span>
                        </div>
                      </td>
                      <td class="main-color">
                        <div class="ivu-table-cell"> <span>￥{{recommend.todayReward/100}}</span> </div>
                      </td>
                      <td class="main-color">
                        <div class="ivu-table-cell"> <span>￥{{recommend.accumulativeReward/100}}</span> </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="ivu-table-tip" v-show="!recommendData.length">
                <table cellspacing="0" cellpadding="0" border="0">
                  <tbody>
                  <tr>
                    <td><span>暂无筛选结果</span></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20 right">
        <Page :total="count" :page-size="size" :current="page + 1" @on-change="pageChange"></Page>
      </div>

    </div>
  </div>
</template>

<script>
  import 'social-share.js/dist/css/share.min.css'
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
      });
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
        copyHtml: '',
        totalElements: 10,
        copyStatue: false,
        recommendData: [],
        count: 0,
        reward: 0,
        page: 0,
        size: 10,
      }
    },
    created() {
      let _this = this;
      _this.getRecommendPage();
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
    mounted () {
      let _this = this;
      api.getRecommendUrl().then((res) => {
        _this.init();
        _this.copyValue = res;
        _this.copyHtml = '<div style="display: inline-block;" data-sites="qzone, qq, weibo" data-title="秀吧，邀你共享好礼，秀出精彩！" data-image="https://www.xiuba365.com/static/avatar/xiuba_icon.png" data-description="秀出精彩，畅享好礼！我已经在秀吧了，你还在等什么呢！" class="social-share" data-url=' + _this.copyValue + '  ></div>';

      });
    },
    methods: {
      getRecommendPage(){
        let self = this;
        api.getRecommendPage({
          page: self.page,
          size: self.size,
        }).then((res) => {
          if(res.status){
              self.count = res.data.count;
              self.reward = res.data.reward;
              self.recommendData = res.data.page.content;
          }
        })
      },
      pageChange(data) {
        this.page = data -1;
        this.getRecommendPage();
      },
      init: function () {
        let url = '/static/js/social-share.min.js';
        let script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script)
      }
    },
    watch: {}
  }


//  import 'social-share.js/dist/js/social-share.min.js'
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
