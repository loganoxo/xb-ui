<template>
    <div class="promotion-regulation">
      <div class="title">
      <img src="~assets/img/merchant-promotion/purse-on.png" alt="" class="purse-icon">
      <span class="fs-18 cl666 ml-10">赚点钱儿</span>
    </div>
      <h2 class="text-ct mt-20 mb-40">有商家资源？我们一起来赚钱吧！</h2>
      <div class="regulation-module pos-rel text-ct cl000">
        <div class="regulation-title fs-14 f-b">如果你的普通推荐者（推荐人数小于30人）</div>
        <p class="fs-16">推荐一个商家注册并成功发布1个活动，他将享受<span class="point">首单推广费全免</span></p>
        <p class="fs-16 mt-5">你将获得<span class="point">{{firstTaskReward/100}}元</span>奖励，并且以后他每成功消费一次，你将获得<span class="point">{{fatherRewardPercent}}%</span>的提成（包含推广费，会员订购，增值服务及功能等）！</p>
      </div>
      <div class="regulation-module pos-rel text-ct cl000 mt-40">
        <div class="regulation-title fs-14 f-b">如果你成为代理商（推荐人数大于30人）</div>
        <p class="fs-16">除了普通推荐者的所有奖励外，</p>
        <p class="fs-16 mt-5">你将额外获得<span class="point">N级下家（非代理商）的{{foreFatherRewardPercent}}%消费提成</span></p>
        <p class="fs-16 mt-5">即你邀请的A，A邀请B，B邀请C...邀请N，你可获得所有A-N的消费提成，（包含推广费，会员订购，增值服务及功能等）！</p>
      </div>
      <div class="mt-40 cl000">
        <h2 class="text-ct">复制你的推荐链接（或者可将此链接分享到你的朋友圈及微博等...）</h2>
        <p class="share-link f-b fs-16">{{recommendLink}}</p>
        <div class="text-ct">
          <div class="copy-btn" :data-clipboard-text="recommendLink">复制链接</div>
        </div>
      </div>
      <div class="mt-40 cl000">
        <h3 class="fs-16 f-b mt-30">奖励是如何发放的呢？</h3>
        <p class="fs-14">奖励以现金的方式存入到你的“赚点钱儿”账户中，该账户可直接体现，也可以转入余额。</p>
        <h3 class="fs-16 f-b mt-30">什么是普通推荐者？什么是代理商？</h3>
        <p class="fs-14">成功推荐商家数小于30人为普通推荐者，成功推荐商家数大于30人即成为代理商</p>
        <h3 class="fs-16 f-b mt-30">N级下家（非代理商）的消费提成是怎么计算的？</h3>
        <p class="fs-14">你成功邀请的下级，若他未成为代理商（即他邀请的下级未达到30人），你不但可享受他10%的消费提成，还享受他邀请的所有下级的{{foreFatherRewardPercent}}%的消费提成</p>
        <p class="fs-14">若他升级为代理商（即他邀请到的下级大于30人），你将不再享受到他及他所有下级的消费提成。</p>
        <h3 class="fs-16 f-b mt-30">如何查看我获得的奖励？</h3>
        <p class="fs-14">点击左侧菜单“赚钱明细”中，可详细查看每一笔收入来源</p>
        <h3 class="fs-16 f-b mt-30">如何知道我推荐了多少人？</h3>
        <p class="fs-14">点击左侧菜单“推荐管理”中，可详情查看每一位你成功邀请的商家</p>
        <h3 class="fs-16 f-b mt-30">推荐奖励的规则说明</h3>
        <p class="fs-14">以上代理细则有效期至9月30日，后续若有调整，另行通知。</p>
        <p class="fs-14">本平台有权随时对奖励规则进行合理的调整，最终解释权归品台所有</p>
      </div>
    </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import {domain} from '@/config/env'
  import api from '@/config/apiConfig'
  export default {
    name: "promotion-regulation",
    components: {

    },
    data() {
      return {
        recommendLink:''
      }
    },
    computed: {
      //被邀请人首单奖励
      firstTaskReward() {
        return this.$store.state.sysConfigInfo.sellerInvitationRewardFirstTaskFather.configValue
      },
      // 子级消费提成
      fatherRewardPercent() {
        return this.$store.state.sysConfigInfo.sellerInvitationRewardFatherPercent.configValue
      },
      // N级下家消费提成
      foreFatherRewardPercent() {
        return this.$store.state.sysConfigInfo.sellerInvitationRewardForefatherPercent.configValue
      }
    },
    created() {
      const _this = this;
      _this.$nextTick(function () {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on('success',() => {
          _this.$Message.success("复制链接成功！");
          clipboard.destroy();
        });
        clipboard.on('error',() => {
          _this.$Message.error("复制链接失败，可能是您的浏览器不支持此功能，请手动复制");
          clipboard.destroy();
        })
      })
    },
    mounted() {
      const _this = this;
      api.getRecommendUrl().then(res => {
        if(res.status){
          _this.initJS();
          _this.initCss();
          _this.recommendLink = domain + '/register/seller-register?recommendCode='+ res.recommendCode + '&acceptDisciple=acceptDisciple';
          _this.copyHtml = '<div style="display: inline-block;" data-sites="qzone, qq, weibo" data-title="白拿拿，邀你共享好礼，秀出精彩！" data-image="https://www.xiuba365.com/static/avatar/xiuba-icon.png" data-description="秀出精彩，畅享好礼！我已经在白拿拿了，你还在等什么呢！" class="social-share" data-url=' + _this.recommendLink + '  ></div>';
        } else {
          _this.$Message.error(res.msg)
        }
      });
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
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .promotion-regulation {
    .title {
      padding: 5px;
      border-bottom: 1px solid #ccc;
      .purse-icon {
        width:24px;
        height:24px;
        vertical-align: top;
      }
    }
    .regulation-module {
      background: #F8F8F8;
      padding:25px 15px;
      border:1px solid #ccc;
      border-radius: 10px;
      .regulation-title {
        position: absolute;
        padding:5px 10px;
        border-radius: 10px;
        background: #ddd;
        top:-16px;
        left:50%;
        margin-left: -145px;
      }
      .point {
        font-size: 16px;
        font-weight: bold;
        background: #FFC26C;
        padding:3px 3px;
        margin:0 3px;
      }
    }
    .share-link {
      width:80%;
      background: #FFC26C;
      padding:15px 15px;
      border:2px solid #000;
      border-radius: 10px;
      margin:10px auto;
    }
    .copy-btn {
      padding: 10px 30px;
      border: 2px solid #000;
      background: #FFC26C;
      margin: 0 auto;
      display: inline-block;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
