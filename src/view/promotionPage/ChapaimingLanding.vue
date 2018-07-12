<template>
    <div class="chapaiming-landing">
      <top/>
      <div class="chapaiming-area">
        <div class="content">
          <div class="search-title">淘宝信誉/小号查询</div>
          <div class="search-box">
            <div class="search-area">
              <span class="search-name">旺旺账号：</span>
              <input type="text" v-model="alitm" placeholder="请输入旺旺账号" class="search-input">
              <span class="search-btn" @click="searchOperation">查小号/查信誉</span>
              <!--<span class="search-btn" @click="searchTest">查小号/查信誉</span>-->
            </div>
          </div>
          <div class="result-box fs-14" v-if="showResultBox">
            <p class="result-title clear">
              <span v-if="isSeller === 1" class="result-point">淘宝买家：</span>
              <span v-if="isSeller === 2" class="result-point">淘宝卖家：</span>
              <span class="result-name">{{wwName}}</span>
              <img src="~assets/img/common/ww-avatar.gif" alt="" class="vtc-mid">
              <img :src="tamllInfo" alt="">
              <span class="result-time right">当前查询时间：{{searchTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
            </p>
            <div v-if="showSearchResult" class="pos-rel">
              <div class="safe-level">
                <img v-if="safeLevel === 1" src="~assets/img/common/ww-search-level-safe.png" alt="">
                <img v-if="safeLevel === 2" src="~assets/img/common/ww-search-level-normal.png" alt="">
                <img v-if="safeLevel === 3" src="~assets/img/common/ww-search-level-dangerous.png" alt="">
              </div>
              <p>
                <span class="result-point">注册时间：</span>
                <span>{{wwRegisteTime}}</span>
              </p>
              <p>
                <span class="result-point">实名认证：</span>
                <span class="color-blue">{{wwVerified}}</span>
                <!--<img src="~assets/img/common/zfb_person_small.gif" alt="" class="vtc-mid">-->
                <img :src="wwVerifiedImg" alt="" class="vtc-mid">
              </p>
              <p>
                <span class="result-point">店铺信息：</span>
                <span v-if="!wwShopName" class="main-color">暂无店铺</span>
                <span v-if="wwShopName">进入<a :href="wwShopUrl" target="_blank">【{{wwShopName}}】</a>的店铺，（创建时间：{{wwShopTime}}）</span>
              </p>
              <p>
                <span class="result-point">当前主营：</span>
                <span v-if="!wwCurrentMain">暂无</span>
                <span v-if="wwCurrentMain">{{wwCurrentMain}}</span>
              </p>
              <p>
                <span class="result-point">当前地区：</span>
                <span>{{wwCurrentArea}}</span>
              </p>
              <p>
                <span class="result-point">给出评价：</span>
                <img src="~assets/img/common/zhongping.png" alt="" class="vtc-mid">
                <span class="color-orange">中评（{{wwNormalAssess}}）</span>
                <img src="~assets/img/common/chaping.png" alt="" class="vtc-mid">
                <span>差评（{{wwBadAssess}}）</span>
                <span class="main-color">给他人中差评比例（0%）</span>
              </p>
              <div class="result-bottom-box clear">
                <div class="result-left-box left">
                  <p>
                    <span class="result-point">买家信用</span>
                    <span class="color-blue">{{buyerCredit}}</span>
                    <img :src="buyerCreditImg" alt="">
                    <span class="main-color">好评率（{{buyerGoodRate}}）</span>
                  </p>
                  <p>
                    <span class="result-point">最近一周：</span>
                    <span v-if="isSeller === 1"><span class="color-orange">{{buyerRecentWeek}}</span> 点数</span>
                    <span v-if="isSeller === 2"><span class="color-orange">0</span> 点数</span>
                    <span class="result-point ml-40">周平均：</span>
                    <span><span class="color-orange">{{buyerAverageWeek}}</span> 单</span>
                  </p>
                  <p>
                    <span class="result-point">最近一月：</span>
                    <span v-if="isSeller === 1"><span class="color-orange">{{buyerRecentMonth}}</span> 点数</span>
                    <span v-if="isSeller === 2"><span class="color-orange">0</span> 点数</span>
                  </p>
                  <p>
                    <span class="result-point">最近半年：</span>
                    <span v-if="isSeller === 1"><span class="color-orange">{{buyerRecentHalfYear}}</span> 点数</span>
                    <span v-if="isSeller === 2"><span class="color-orange">0</span> 点数</span>
                  </p>
                  <p>
                    <span class="result-point">半年以前：</span>
                    <span v-if="isSeller === 1"><span class="color-orange">{{buyerOldHalfYear}}</span> 点数</span>
                    <span v-if="isSeller === 2"><span class="color-orange">0</span> 点数</span>
                  </p>
                </div>
                <div class="result-right-box left">
                  <p>
                    <span class="result-point">卖家信用：</span>
                    <span><span class="color-blue" v-if="!sellerCredit">0 点</span></span>
                    <span><span class="color-blue" v-if="sellerCredit">{{sellerCredit}} 点</span></span>
                    <img v-if="isSeller === 2" :src="sellerCreditImg" alt="">
                    <span v-if="isSeller === 2" class="main-color">好评率（{{sellerGoodRate}}）</span>
                    <span v-if="isSeller === 1" class="main-color">暂无店铺</span>
                  </p>
                  <p>
                    <span class="result-point">最近一周：</span>
                    <span><span class="color-orange">{{sellerRecentWeek}}</span> 点数</span>
                  </p>
                  <p>
                    <span class="result-point">最近一月：</span>
                    <span><span class="color-orange">{{sellerRecentMonth}}</span> 点数</span>
                  </p>
                  <p>
                    <span class="result-point">最近半年：</span>
                    <span><span class="color-orange">{{sellerRecentHalfYear}}</span> 点数</span>
                  </p>
                  <p>
                    <span class="result-point">半年以前：</span>
                    <span><span class="color-orange">{{sellerOldHalfYear}}</span> 点数</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-else @click="toRegister">
              <img src="~assets/img/landing-page/ww-search-noLogin.jpg" alt="">
            </div>
          </div>
          <div class="explain-box">
            <div class="explain-area">
              <p class="explain-title">淘宝信用/中差评查询使用说明：</p>
              <p class="explain-point">一、使用方法：</p>
              <p class="explain-content">请在输入框内输入淘宝帐号，并点击查询，等待结果</p>
              <p class="explain-point">二、注意事项：</p>
              <p class="explain-content">1，注册时间<span class="point">小于30天</span>的，被认定为小号/新号，有可能是骗子，应当谨慎交易，免得赚几块钱换来一个中差评。</p>
              <p class="explain-content">2，该工具可以查询<span class="point">买家中差评数量</span>以及<span class="point">中差评</span>信息，如果该用户的比例超过一定的比例，则有可能是中差评师，要十分注意了。</p>
              <p class="explain-content">3，经常刷的小号，当信用点数<span class="point">超过20点</span>（常购物的买家大号除外），有可能这个号被淘宝列入黑名单，他再拍的东西有可能会被认为虚假交易，<span class="point">再刷会有降权风险</span>。</p>
              <p class="explain-content">4，若同一时间查询人数过多，请耐心等待结果。</p>
            </div>
          </div>
        </div>
      </div>
      <modal v-model="isShowLoading" :closable="false" :mask-closable="false" width="360">
        <div slot="header"></div>
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="text-ct mt-46 fs-16">旺旺信息查询中，请稍后...</div>
        <div slot="footer"></div>
      </modal>
    </div>
</template>

<script>
  import Top from '@/components/Top.vue'
  import {Button, Progress, Modal} from 'iview'
  import {setStorage, getStorage} from "../../config/utils"
  import api from '@/config/apiConfig'

  export default {
    name: "chapaiming-landing",
    components: {
      Top: Top,
      iButton: Button,
      iProgress: Progress,
      Modal: Modal
    },
    data() {
      return {
        showResultBox: false,
        showSearchResult: false,
        alitm: '',
        isShowLoading: false,
        searchTime: null,
        isSeller:null,
        // safeLevel: null,
        averageNum: null,
        tamllInfo: null,
        wwName: null,
        wwRegisteTime: null,
        wwVerified: null,
        wwShopName: null,
        wwShopUrl: null,
        wwShopTime: null,
        wwCurrentMain: null,
        wwCurrentArea: null,
        wwNormalAssess: null,
        wwBadAssess: null,
        wwOfferAssess: null,
        buyerCredit: null,
        buyerGoodRate: null,
        buyerCreditImg: null,
        buyerRecentWeek: null,
        buyerAverageWeek: null,
        buyerRecentMonth: null,
        buyerRecentHalfYear: null,
        buyerOldHalfYear: null,
        sellerCredit: null,
        sellerCreditImg: null,
        sellerGoodRate: null,
        sellerRecentWeek: null,
        sellerRecentMonth: null,
        sellerRecentHalfYear: null,
        sellerOldHalfYear: null
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserRole() {
        return this.$store.getters.getUserRole
      },
      // 1 代表安全 2 代表一般 3 代表危险
      safeLevel() {
        if (this.averageNum >= 0 && this.averageNum <= 4.99) {
          return 1
        }
        if (this.averageNum >=5 && this.averageNum <= 19.99) {
          return 2
        }
        if (this.averageNum >= 20) {
          return 3
        }

      }
    },
    created() {
    },
    methods: {
      toRegister() {
        this.$router.replace({path: '/register/seller-register',query:{from:'chapaiming'}});
      },
      searchOperation() {
        const _this = this;
        if (!_this.alitm) {
          _this.$Message.info({
            content:'请输入要查询的旺旺名'
          });
          return
        }
        if (_this.isLogin && _this.getUserRole === 1) {
          _this.isShowLoading = true;
          api.searchCredit({
            alitm: encodeURIComponent(_this.alitm)
          }).then(res => {
            if (res.status) {
              let tempData = res.data;
              _this.searchTime = parseInt(tempData.UpdateTime.match(/\(([^)]*)\)/)[1]);
              _this.isSeller = tempData.IsSeller;
              _this.averageNum = parseInt(tempData.AverageNum);
              _this.tamllInfo = tempData.TamllInfo;
              _this.wwName = tempData.UserName;
              _this.wwRegisteTime = tempData.UserTime;
              _this.wwVerified = tempData.UserIdent;
              _this.wwVerifiedImg = tempData.UserIdentImg;
              _this.wwShopName = tempData.ShopName;
              _this.wwShopUrl = tempData.ShopUrl;
              _this.wwShopTime = tempData.ShopTime;
              _this.wwCurrentMain = tempData.ShopType;
              _this.wwCurrentArea = tempData.UserArea;
              _this.wwNormalAssess = tempData.TotalNormalCount;
              _this.wwBadAssess = tempData.TotalBadCount;
              _this.offerAssess = tempData.TotalBadCount;
              _this.buyerCredit = tempData.UserBuyerCount;
              _this.buyerGoodRate = tempData.UserBuyerGoodRate;
              _this.buyerCreditImg = tempData.UserBuyerImg;
              _this.buyerAverageWeek = tempData.AverageNum;
              _this.buyerRecentWeek = tempData.WeekRateGood;
              _this.buyerRecentMonth = tempData.MonthRateGood;
              _this.buyerRecentHalfYear = tempData.YearRateGood;
              _this.buyerOldHalfYear = tempData.YearOldRateGood;
              _this.sellerCredit = tempData.UserSellerCount;
              _this.sellerCreditImg = tempData.UserSellerImg;
              _this.sellerGoodRate = tempData.UserSellerGoodRate;
              _this.sellerRecentWeek = tempData.WeekRateGood;
              _this.sellerRecentMonth = tempData.MonthRateGood;
              _this.sellerRecentHalfYear = tempData.YearRateGood;
              _this.sellerOldHalfYear = tempData.YearOldRateGood;
              _this.showSearchResult = true;
              _this.showResultBox = true;
            } else {
              _this.$Message.error(res.msg);
            }
            _this.isShowLoading = false;
          });
        } else {
          _this.showResultBox = true;
        }
      },
      // 开发测试用
      searchTest() {
        const _this = this;
        if (!_this.alitm) {
          _this.$Message.info({
            content:'请输入要查询的旺旺名'
          });
          return
        }
        _this.isShowLoading = true;
        api.searchCredit({
          alitm: encodeURIComponent(_this.alitm)
        }).then(res => {
          if (res.status) {
            let tempData = res.data;
            _this.searchTime = parseInt(tempData.UpdateTime.match(/\(([^)]*)\)/)[1]);
            _this.wwName = tempData.UserName;
            _this.wwRegisteTime = tempData.UserTime;
            _this.wwVerified = tempData.UserIdent;
            _this.wwshopName = tempData.ShopName;
            _this.wwCurrentMain = tempData.ShopType;
            _this.wwCurrentArea = tempData.UserArea;
            _this.wwNormalAssess = tempData.TotalNormalCount;
            _this.wwBadAssess = tempData.TotalBadCount;
            _this.offerAssess = tempData.TotalBadCount;
            _this.buyerCredit = tempData.UserBuyerCount;
            _this.buyerGoodRate = tempData.UserBuyerGoodRate;
            _this.buyerCreditImg = tempData.UserBuyerImg;
            _this.buyerRecentWeek = tempData.WeekRateNormal;
            _this.buyerAverageWeek = tempData.AverageNum;
            _this.buyerRecentMonth = tempData.MonthRateNormal;
            _this.buyerRecentHalfYear = tempData.YearRateNormal;
            _this.buyerOldHalfYear = tempData.YearOldRateNormal;
            _this.sellerCredit = tempData.UserSellerCount;
            _this.sellerRecentWeek = tempData.WeekRateNormal;
            _this.sellerRecentMonth = tempData.MonthRateNormal;
            _this.sellerRecentHalfYear = tempData.YearRateNormal;
            _this.sellerOldHalfYear = tempData.YearOldRateNormal;
            _this.showSearchResult = true;
            _this.showResultBox = true;
          } else {
            _this.$Message.error(res.msg);
          }
          _this.isShowLoading = false;
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "src/css/mixin";
  .color-blue {
    color:#29a7e1
  }
  .color-orange {
    color:#ff6600;
  }
  .chapaiming-area {
    background: #F1F1F1;
    .content {
      width:1200px;
      margin:0 auto;
      overflow: hidden;
      .search-title {
        width:160px;
        height:38px;
        line-height: 38px;
        color:#fff;
        background: $mainColor;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        margin-top: 60px;
        border-radius: 5px 5px 0 0 ;
      }
      .result-box {
        background: #fff;
        padding:20px 125px;
        .safe-level {
          position: absolute;
          top:30px;
          right:0;
        }
        p {
          height:48px;
          line-height: 48px;
        }
        .result-title {
          border-bottom:1px solid #ddd;
          margin-bottom:20px;
        }
        .result-name {
          font-weight: bold;
          color:#29a7e1;
        }

        .result-point {
          display: inline-block;
          width:106px;
          height:58px;
          color:#6c6c6c;
          font-size: 14px;
          font-weight: bold;
        }
        .result-bottom-box {
          border-top:1px dashed #ddd;
          border-bottom:1px dashed #ddd;
          padding:10px 0;
        }
        .result-left-box {
          width:50%;
          border-right:1px solid #ddd;
        }
        .result-right-box {
          width:50%;
          padding-left:25px;
        }
      }
      .search-box {
        height:150px;
        border-top:1px solid $mainColor;
        border-left:1px solid #ddd;
        border-bottom:1px solid #ddd;
        border-right:1px solid #ddd;
        background: #fff;
      }
      .search-area {
        text-align: center;
        margin-top:60px;
        .search-name {
          font-size: 18px;
          font-weight: 700;
          color:#6c6c6c
        }
        .search-input {
          width:600px;
          height:30px;
          line-height: 30px;
          border:1px solid #ddd;
          padding-left:10px;
        }
        .search-btn {
          display: inline-block;
          font-size: 13px;
          text-align: center;
          color:#fff;
          border-radius: 2px;
          background: $mainColor;
          cursor: pointer;
          padding:6px 30px;
        }
      }
      .explain-box {
        width: 1200px;
        padding:20px;
        background: #fff;
        margin-top:30px;
        .explain-area {
          border:1px dashed #ddd;
          padding:20px;
          margin:auto;
        }
        .explain-title {
          font-size: 26px;
          font-weight: 700;
          color:$mainColor;
          padding:10px;
        }
        .explain-point {
          font-size: 16px;
          font-weight: 700;
          color:#999;
        }
        .explain-content {
          font-size: 14px;
          line-height: 40px;
          color:#999;
        }
        .point {
          color: $mainColor;
        }
      }
    }
  }
</style>
