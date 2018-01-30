<template>
  <div class="user-home clear">
    <p class="user-home-account">邀请有礼</p>
    <div>
      <p class="mt-20">
        <span class="fs-18">我的邀请链接：</span>
        <input type="text" class="ivu-input" style="width: 30%" readonly="readonly" v-model="copyValue"/>
        <a class="ivu-btn ivu-btn-button ivu-btn-primary copy-btn" :data-clipboard-text="copyValue">复制链接</a>
      </p>
      <div class="mt-20 fs-18">
        <span>一键分享：</span>
        <div v-html="copyHtml" style="display: inline-block;"></div>
      </div>
      <div class="award-box">
        <p class="fs-18">奖励说明：</p>
        <ul v-if="getUserInfoRole === 0">
          <li>
            1.通过您的邀请链接成功进行注册，如果是拿手，成功注册并完成首个任务后，即可获得 <span style="color: #ff6600">￥{{$store.state.sysConfigInfo.showkerInviteShowkerFee/100}}</span> 奖励;
          </li>
          <li>
            2.通过您的邀请链接成功进行注册，如果是商家，那么当商家成功发布一个活动后，即可获得 <span style="color: #ff6600">￥{{$store.state.sysConfigInfo.showkerInviteSellerFee/100}}</span> 奖励;
          </li>
          <li>
            3.奖励的金额将直接充值到您的账户余额中，您可以用来提现；
          </li>
        </ul>
        <ul v-if="getUserInfoRole === 1">
          <li>
            通过您的邀请链接成功进行注册，无论是拿手还是商家，只要满30人，即可获赠 <span class="main-color">“一个月VIP时长”</span>
          </li>
        </ul>
      </div>
      <div class="mt-30">
        <div class="fs-18">
          <span>我邀请的好友：</span>
          <p class="fs-14 cl000 " style="display: inline-block;" v-if="getUserInfoRole===0">
            一共邀请了 <span style="color: #ff6600"> {{count}} </span> 位好友，共获得 <span
            style="color: #ff6600"> ￥{{reward/100}} </span> 奖励
          </p>
          <p class="fs-14 cl000 " style="display: inline-block;" v-if="getUserInfoRole===1">
            一共邀请了 <span style="color: #ff6600"> {{count}} </span> 位好友，
            共获赠<span style="color: #ff6600"> {{Math.floor(count/30)}} </span> 月VIP时长。
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
                      <div class="ivu-table-cell"><span>类型</span></div>
                    </th>
                    <th class="main-color" v-if="getUserInfoRole === 0">
                      <div class="ivu-table-cell">
                        <span style="color: #495060;">获得奖励</span>
                      </div>
                    </th>
                    <!--<th class="main-color">-->
                    <!--<div class="ivu-table-cell">-->
                    <!--<span style="color: #495060;">累计奖励</span>-->
                    <!--</div>-->
                    <!--</th>-->
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="ivu-table-body">
                <table cellspacing="0" cellpadding="0" border="0" style="width: 1031px;" v-show="recommendData.length">
                  <tbody class="ivu-table-tbody">
                  <tr class="ivu-table-row" v-for="recommend in recommendData">
                    <td class="">
                      <div class="ivu-table-cell"><span>{{recommend.inviteePhone}}</span></div>
                    </td>
                    <td class="">
                      <div class="ivu-table-cell"><span>{{recommend.inviteeRegisterTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
                      </div>
                    </td>
                    <td class="">
                      <div class="ivu-table-cell">
                        <span v-if="recommend.inviteeRole === 0">拿手</span>
                        <span v-if="recommend.inviteeRole === 1">商家</span>
                      </div>
                    </td>
                    <td class="main-color" v-if="getUserInfoRole === 0">
                      <div class="ivu-table-cell"><span>￥{{recommend.singleReward/100}}</span></div>
                    </td>
                    <!--<td class="main-color">-->
                    <!--<div class="ivu-table-cell"> <span>￥{{recommend.todayReward/100}}</span> </div>-->
                    <!--</td>-->
                    <!--<td class="main-color">-->
                    <!--<div class="ivu-table-cell"> <span>￥{{recommend.accumulativeReward/100}}</span> </div>-->
                    <!--</td>-->
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
        <Page :total="count" :page-size="size" :current="page" @on-change="pageChange"></Page>
      </div>

    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import Carousel from 'iview/src/components/carousel'
  import Table from 'iview/src/components/table'
  import Clipboard from 'clipboard';
  import {domain} from '@/config/env'
  import api from '@/config/apiConfig'

  export default {

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
        page: 1,
        size: 10,
      }
    },
    created() {
      let _this = this;
      _this.getRecommendPage();
      _this.$nextTick(function () {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on('success', () => {
          _this.$Message.success("复制链接成功！");
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制链接失败！");
          clipboard.destroy();
        });

      })
    },
    computed: {
      getUserInfoRole() {
        return this.$store.state.userInfo.role
      },
    },
    mounted() {
      let _this = this;
      api.getRecommendUrl().then(res => {
        if(res.status){
          _this.initJS();
          _this.initCss();
          _this.copyValue = domain + '/sel-role?recommendCode='+ res.recommendCode;
          _this.copyHtml = '<div style="display: inline-block;" data-sites="qzone, qq, weibo" data-title="白拿拿，邀你共享好礼，秀出精彩！" data-image="https://www.xiuba365.com/static/avatar/xiuba-icon.png" data-description="秀出精彩，畅享好礼！我已经在白拿拿了，你还在等什么呢！" class="social-share" data-url=' + _this.copyValue + '  ></div>';
        } else {
          _this.$Message.error(res.msg)
        }
      });
    },
    methods: {
      getRecommendPage() {
        let self = this;
        api.getRecommendPage({
          page: self.page,
          size: self.size,
        }).then((res) => {
          if (res.status) {
            self.count = res.data.count;
            self.reward = res.data.reward;
            self.recommendData = res.data.page.content;
          }
        })
      },
      pageChange(data) {
        this.page = data - 1;
        this.getRecommendPage();
      },
      initJS() {
        const url = 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js';
        const script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script)
      },
      initCss() {
        const url = 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css';
        const link = document.createElement('link');
        link.setAttribute('href', url);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(link)
      },
    },

  }

</script>

<style lang="scss" scoped>

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
