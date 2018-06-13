<template>
  <div class="vip-member-box">
    <div class="banner text-ct">
      <img src="~assets/img/vip-member/vip-banner.png" class="mt-28"/>
    </div>
    <div class="content-box pt-20">
      <div class="tabs-box">
        <span v-if="getUserAccountRole === item.disabledRole" v-for="item in infoSelectList" :class="{active:infoSelect === item.isSelect}" @click="switchTab(item.isSelect)">{{item.text}}</span>
      </div>
      <router-view></router-view>
      <div class="vip-footer">
        <div class="title">
          <icon type="android-walk" size="25"/>
          <strong class="ml-10">他们在奔跑，你呢...</strong></div>
        <div class="ml-20 mt-20">
          <h3>Q：我们是谁？</h3>
          <p class="mt-10">A：宝贝深度优化专家，我们只做2件事：1.提权重 2.促转化</p>
        </div>
        <div class="ml-20 mt-30">
          <h3>Q：我们是怎么做到的？</h3>
          <p class="mt-10 cl666">A：1. 我们是如何提高权重的？</p>
          <p class="ml-22 mt-5 we-do">1.1 从点击浏览，到收藏加购，再到下单转化，加上买家秀，实现一站式全链路的排名提升！</p>
          <p class="ml-22 mt-5 we-do">1.2 多种任务类型（搜索，预售，复购，问大家，淘口令等等），充分匹配各大流量入口！</p>
          <p class="ml-22 mt-5 we-do">1.3 真实消费者，真实交易，永远不会担心降权被罚，在阳光下享受流量猛增的快感！</p>
          <p class="mt-20 ml-22 cl666">2. 我们是如何促进转化的？</p>
          <p class="ml-22 mt-5 we-do">2.1 精准人群，带来精准标签，远非刷单可比</p>
          <p class="ml-22 mt-5 we-do">2.2 优质买家秀带来疯狂转化，文字，图片，短视频三管齐下，顺应内容营销的风口</p>
          <p class="ml-22 mt-5 we-do">2.3 飙升的收藏和加购数，充分反映了消费者对于该宝贝的兴趣和信任，有利于真实成交</p>
        </div>
        <div class="ml-20 mt-30">
          <h3>Q：适合谁来用？</h3>
          <p class="mt-10">A：1.新品新店一直起不来</p>
          <p class="ml-22 mt-5">2.宝贝权重低，排名落后，自然流量少</p>
          <p class="ml-22 mt-5">3.基础销量很低，甚至无法破零，又不敢刷单</p>
          <p class="ml-22 mt-5">4.人群标签混乱，虽有流量但质量偏低，持续无转化</p>
          <p class="ml-22 mt-5">5.找不到好的推广渠道，报不上活动，又吃不消直通车钻展的高昂费用</p>
        </div>
        <div class="ml-20 mt-30">
          <h3>Q：我们的优势</h3>
          <p class="mt-10">A：1.账号优质：<span class="we-do">我们的拿手都是真实的消费者，和刷单平台相比，有质的区别</span></p>
          <p class="ml-22 mt-5">2.人群标签：<span class="we-do">拿手根据兴趣选择宝贝，自带人群标签</span></p>
          <p class="ml-22 mt-5">3.公开透明：<span class="we-do">每个环节都做到严格可控，商家自己审核拿手，杜绝了暗箱操作的可能性</span></p>
          <p class="ml-22 mt-5">4.流程完整：<span class="we-do">包括了点击浏览收藏加购下单评价的所有环节，缺一不可</span></p>
          <p class="ml-22 mt-5">5.真实有效：<span class="we-do">不仅仅能提升排名，带来真实流量，还能提高转化！宝贝深度优化专家，实至名归！</span></p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "vip-member",
    data() {
      return {
        infoSelectList: [
          {
            text: '会员订购',
            isSelect: 'VipMemberOrder',
            disabledRole: 1,
          },
          {
            text: '版本说明',
            isSelect: 'VipMemberInstructions',
            disabledRole: 1,
          },
        ],
        infoSelect: 'VipMemberOrder',
      }
    },
    computed: {
      getUserAccountRole() {
        return this.$store.getters.getUserRole;
      }
    },
    watch: {
      $route(to) {
        this.infoSelect = to.name;
      },
    },
    created() {
      this.infoSelect = this.$route.query.q ? this.$route.query.q : this.infoSelect;
    },

    methods: {
      switchTab(name) {
        this.$router.push({name: name});
      }
    },


  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .banner {
    height: 152px;
    line-height: 152px;
    background-color: #f3f3f3;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #f8f8f8;
  }

  .content-box {
    background: #f8f8f8;
    .tabs-box {
      border-bottom: 1px solid $mainColor;
      padding-left: 40px;
      margin-left: 20px;
      margin-right: 20px;
      span {
        background-color: #ccc;
        color: #fff;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
        cursor: pointer;
        margin-right: 10px;
      }
      span.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }

  .vip-footer {
    border-top: 12px solid #fff;
    padding: 20px 40px 40px 40px;
    .title {
      border-bottom: 1px solid #E7E7E7;
      color: #D6D6D6;
      font-size: 18px;
    }
    h3 {
      font-size: 18px;
      color: #666666;
    }
    p {
      font-size: 14px;
    }
    .we-do {
      color: #999;
    }
  }

  .tip {
    height: 36px;
    line-height: 36px;
    border: 1px solid #FFB9B8;
    border-radius: 5px;
    background-color: #FFF4F1;
    text-align: center;
    color: $mainColor;
    font-size: 14px;
  }

</style>
