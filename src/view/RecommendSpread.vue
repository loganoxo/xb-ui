<template>
  <div>
    <div class="seller-adv">
      <div class="text-ct pos-rel" >
        <img src="/static/img/recommend-spread/recommend_spread_01.jpg" class="block" alt="" style="width: 100%;" >
      </div>
    </div>
    <div class="spread-part2">
      <div class="container spread-part2-box">
        <div class="left spread-left ">
          <div v-show="isLogin" style="width: 370px">
            <div v-if="myRecommend.count > 0" class="desc fs-14  text-ct">
              <p style="padding-top: 23px;">
                一共邀请了
                <span class="main-color f-b">{{myRecommend.count}}</span>
                位好友，共获得
                <span class="main-color f-b">￥{{myRecommend.reward/100 || 0}}</span>
                奖励，排名
                <span class="main-color f-b">{{myRecommend.ranking}}</span>
                位
              </p>
              <router-link to="/user/recommend" class="inline-block desc-recommend mt-10" >
                查看邀请详情
              </router-link>
            </div>
            <div v-if="myRecommend.count === 0">
              <p class="fs-16 text-ct">
                您当前还
                <span class=" f-b">未邀请任何用户~~~</span>
              </p>
              <img  src="/static/img/recommend-spread/recommend_spread_10.jpg" class="block margin-auto" alt="">
            </div>
            <div class="mt-10 text-ct">
              <p class="fs-14 cl666 text-lf">赶紧将下方的邀请链接发送给你的好友吧~</p>
              <input  type="text" class="ivu-input block mt-5"  readonly="readonly" v-model="copyValue"/>
              <a class="copy-link copy-btn" :data-clipboard-text="copyValue">复制链接</a>
            </div>
            <div class="text-ct mt-10">
              一键分享：<div class="inline-block" v-html="copyHtml"></div>
            </div>
          </div>
          <div v-show="!isLogin" class="text-ct" style="width: 370px">
            <p style="line-height: 30px; margin-top: 30px;" class="fs-16">
              您当前还未登录
              <br>
              登录之后即可查看您的邀请情况！
            </p>
            <router-link to="/login" class="copy-link">
              立即登录
            </router-link>
            <p class="mt-10">
              还没有账号？点我 <router-link to="/register">注册</router-link>
            </p>
          </div>
        </div>
        <div class="right spread-right">
          <div class="mt-10">
            <p v-for="(ranking, index) in rankingList" v-show="ranking.reward">
              <span  class="one" :class="[index <= 2 ? 'active' : '' ]">{{index + 1}}</span>
              <span class="two" :class="[index <= 2 ? 'active' : '' ]">{{ranking.phone}}</span>
              <span class="three" :class="[index <= 2 ? 'active' : '' ]">￥{{ranking.reward/100 || 0}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img src="/static/img/recommend-spread/recommend_spread_07.jpg" class="block" alt="">
    </div>
    <div class="spread-part3">
      <div class="container spread-part3-box">
        <div class="desc">
          <p class="fs-20 f-b">奖励说明：</p>
          <ul class="mt-10">
            <li>
              <span>1</span>
              通过您的邀请链接成功进行注册，如果是拿手，成功注册并完成首个任务后，即可获得 <b class="main-color">￥3</b> 奖励， 且自该拿手注册
              起一年时间内，该拿手每完成一个任务，您都可以从对应活动的推广费中获得 <b class="main-color"> 15% </b> 的提成；
            </li>
            <li>
              <span>2</span>
              通过您的邀请链接成功进行注册，如果是商家，拿手完成其首个任务后，即可获得 <b class="main-color"> ￥3 </b> 奖励，且自该商家
              注册起一年时间内， 每个拿手完成该商家的一个任务时，您都可以从对应活动的推广费中获得 <b class="main-color"> 10% </b> 的提成
            </li>
            <li>
              <span>3</span>
              奖励的金额将直接充值到您的账户余额中，您可以用来提现；
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import RoleTop from '@/components/RoleTop.vue'
  import api from '@/config/apiConfig'
  import {domain} from '@/config/env'
  import Clipboard from 'clipboard';
  export default {
    name: 'RecommendSpread',
    components: {
      RoleTop: RoleTop,
    },
    data() {
      return {
        copyValue: '',
        copyHtml: '',
        rankingList: [],
        myRecommend: {},
      }
    },
    created() {
      let _this = this;
      _this.$nextTick(function () {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on('success', () => {
          _this.$Message.success("复制链接成功！");
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制链接失败！");
          clipboard.destroy();
        });
      });
      if(_this.$store.state.login){
        api.getMyRecommend().then((res) => {
          if(res.status){
            _this.myRecommend = res.data;
          }else {
            _this.$Message.error(res.msg);
          }
        });
      }
      api.getRecommendRankingPage().then((res) =>{
        if(res.status){
          function sortNumber(a,b)
          {
            return -(a.reward - b.reward)
          }
          _this.rankingList = res.data.sort(sortNumber);
        }else {
          _this.$Message.error(res.msg);
        }
      })
    },
    methods: {
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
    computed: {
      isLogin() {
        return this.$store.state.login
      },
    },
    mounted () {
      let _this = this;
      if(_this.$store.state.login){
        _this.$nextTick(function () {
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
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .spread-part2{
    background-color: #feb312;
  }
  .spread-part2-box{
    background: #F2AC02 url(/static/img/recommend-spread/recommend_spread_03.jpg) no-repeat;
    height: 588px;
    .spread-left{
      margin: 207px 0 0 140px;
    }
    .desc{
      width: 370px;
      background-color: #ECECEC;
      height: 100px;
      border-radius: 4px;
    }
    .desc-recommend{
      background-color: #5D5D5D;
      border-radius: 3px;
      color: #fff;
      padding: 2px 8px;
    }
    .copy-link{
      background-color: #ff6633;
      color: #fff;
      display: inline-block;
      padding: 4px 25px;
      font-size: 16px;
      margin-top: 10px;
      border-radius: 4px;
    }
    .spread-right{
      margin-top: 224px;
      margin-right: 140px;
      width: 370px;
      p{
        line-height: 25px;
        span{
          display: inline-block;
          font-size: 14px;
        }
        span.active{
          color: red;
          font-weight: bold;
        }
        span.one{
          width: 131px;
          padding-left: 10px;
        }
        span.two{
          width: 153px;
        }
        span.three{
          width: 60px;
        }
      }
    }
  }
  .spread-part3{
    background-color: #ffd030 ;
  }
  .spread-part3-box{
    background: #F2AC02 url(/static/img/recommend-spread/recommend_spread_09.jpg) no-repeat;
    height: 560px;
    div.desc{
      margin: 104px 0 0 160px;
      width: 880px;
      ul{
        line-height: 34px;
        font-size: 16px;
        li{
          margin-bottom: 10px;
          span{
            display: inline-block;
            color: #fff;
            background-color: #5D5D5D;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            text-align: center;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>

