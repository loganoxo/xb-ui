<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000" v-model="homeCarousel" loop>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block"  src="~assets/img/buyer-show/buyer_show_banner_01.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/buyer-show/buyer_show_banner_02.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/buyer-show/buyer_show_banner_03.jpg" alt="">
                </router-link>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="title">
              <Icon type="trophy" class="cup-icon"></Icon>
              <span class="ml-5">买家秀排行榜</span>
            </div>
            <div v-for="(item,index) in getShowkerReportList" :key="index" class="content clear">
              <span :class="{ranking:index<3}" class="left fs-18 ">{{index + 1}}</span>
              <div class="left ml-15 cursor-p" style="width: 48px" @click="toTrialReportDetails(item.uid)">
                <img class="border50" width="48px" :src="getUserHead(item.portrait)" alt="">
              </div>
              <div class="left ml-10 ">
                <p class="mt-5 fs-14">{{item.phone}}</p>
                <p><span class="main-color">{{item.reportCount}}</span>篇买家秀，共获得<span class="main-color">{{item.likeCount}}</span>个赞
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="data-information clear">
          <div class="content left clear">
            <img class="left" src="~assets/img/buyer-show/des_01.png" alt="">
            <div class="left  ml-15">
              <p class="number">{{allShowerNum*5}}位</p>
              <p class="dsc">真实秀客入驻</p>
            </div>
          </div>
          <div class="content left clear">
            <img class="left" src="~assets/img/buyer-show/des_02.png" alt="">
            <div class="left  ml-15">
              <p class="number">{{allReportNum*5}}篇</p>
              <p class="dsc">买家秀已发表</p>
            </div>
          </div>
          <div class="content left clear">
            <img class="left" src="~assets/img/buyer-show/des_03.png" alt="">
            <div class="left  ml-15">
              <p class="number">100%</p>
              <p class="dsc">真实原创</p>
            </div>
          </div>
          <div class="content left clear">
            <img class="left" src="~assets/img/buyer-show/des_04.png" alt="">
            <div class="left  ml-15">
              <p class="number">85%以上</p>
              <p class="dsc">高质量秀客</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="buyer-xiu clear">
          <div class="left-ctt left">
            <div style="overflow: hidden">
              <div class="title clear">
                <img class="vtc-mid" src="~assets/img/home/top_mjx.png" alt="">
                <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
              </div>
              <ul class="clear" :class="[leftSlider ? 'slider-top-active-left' : 'slider-top-default-left']"
                  @mouseover="clearLeftSliderFunc()" @mouseleave="leftSliderFunc()">
                <li v-for="(item,index) in reportRankList" :key="index" class="content cursor-p left pos-rel">
                  <a :title="item.taskName">
                    <div style="height: 260px">
                      <img :src="item.trialReportImages+'!thum200'" alt="" width="200" height="260"
                           @click="toTrialReport(item.showkerId,item.id)">
                    </div>
                    <p class="top-heart clear" v-show="item.likeCount !== 0">
                      <Icon type="heart" class="left" style="font-size: 14px;margin-top: 2px"></Icon>
                      <span class="left ml-5" >赞({{item.likeCount}})</span>
                    </p>
                    <p class="price clear">
                      <span class="left ellipsis">{{item.taskName}}</span>
                      <span class="right pl-10">￥{{item.itemPrice / 100}}</span>
                    </p>
                  </a>
                  <p class="mt-10 description pos-rel">
                    <span class="double-question-mark"></span>
                    <a class="des-text" :title="item.trialReportText">{{item.trialReportText}}</a>
                  </p>
                  <div class="clear bottom mt-20">
                    <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId)}}"
                                 class="user-head-box"><img width="48" height="48" class="showker-portrait-pic"
                                                            :src="getUserHead(item.showkerPortraitPic)" alt="">
                    </router-link>
                    <div class="left ml-10 mt-5">
                      <p class="cl000">{{item.showkerPhone}}</p>
                      <img :src="item.creditLevel" alt="">
                      <div class="text-ct"><span>淘气值：{{item.tqz}}</span></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="super-showker clear">
          <div class="left-ctt left">
            <div>
              <div class="title clear">
                <img class="vtc-mid" src="~assets/img/buyer-show/buyer_show_xdr.png" alt="">
                <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
              </div>
              <ul class="clear">
                <li v-for="(item,index) in getSuperBuyerShowList" :key="index" class="content cursor-p left pos-rel">
                  <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId)}}">
                    <div style="height: 110px" class="text-ct">
                      <img class="user-head" :src="getUserHead(item.portraitPic)" alt="" width="96">
                    </div>
                    <p class="top-heart clear">
                      共发表({{item.num}})篇
                    </p>
                  </router-link>
                  <div class="clear bottom mt-10">
                    <div class=" ml-10 text-ct" style="margin-top: 5px">
                      <p class="cl000">{{item.phone}}</p>
                      <img :src="item.creditLevel" alt="">
                      <div class="text-ct"><span>淘气值：{{item.tqz}}</span></div>
                    </div>
                  </div>
                  <p class=" description pos-rel text-ct">
                    <span @click="toTrialReportDetails(item.showkerId)"  v-for="(value,key) in getShowkerTip(item.showkerTagsMap)" v-show="value > 0" class="left mt-10 ">{{key}}{{value}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="buyer-show-all">
          <div class="title clear">
            <img class="left vtc-mid" src="~assets/img/buyer-show/buyer-show-allmjx.png" alt="">
            <span  class="ml-10 left" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
            <ul class="right clear">
              <li @click="getALLTrialReportFun(null)" :class="{active:allReportClassifySelect === null }" class="left report-classify">全部分类</li>
              <li @click="getALLTrialReportFun(item.name)" :class="{active:item.name === allReportClassifySelect }" class="left report-classify" v-for="item in navList">{{item.name}}</li>
            </ul>
          </div>
          <div class="mt-10  ">
            <div class="con">
              <div class="pic" v-for="item in getALLTrialReport" :key="item.id">
                <div class="pos-rel" @click="toTrialReport(item.showkerId,item.id)">
                  <img width="220" v-show="item.trialReportImages !== ''" class="cursor-p" v-lazy="item.trialReportImages" alt="" >
                  <p class="mt-10 description pos-rel">
                    <span class="double-question-mark "></span>
                    <a class="des-text " style="margin-left: 26px;color: #666">{{item.trialReportText}}</a>
                  </p>
                </div>
                <div class="clear bottom mt-20">
                  <a class="user-head-box">
                    <img @click="toTrialReportDetails(item.showkerId)" class="showker-portrait-pic cursor-p" width="48" height="48" :src="getUserHead(item.showkerPortraitPic)"
                         alt="">
                  </a>
                  <div class="left ml-10" style="margin-top: 5px">
                    <p class="cl000">{{item.showkerPhone}}</p>
                    <img :src="item.creditLevel" alt="">
                    <div class="text-ct"><span>淘气值：{{item.tqz}}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="no-more-list" v-show="pageIndex === totalPages -1">没有更多内容了!</div>
            <div class="no-more-list" v-show="getALLTrialReport.length === 0">暂无数据!</div>
          </div>
        </div>
      </div>
      <!--折扣专区开始-->
      <Modal v-model="selectLogin" width="500">
        <p class="mt-20 mb-40 text-ct fs-22 vtc-mid" style="height: 50px;line-height: 50px">
          <i class="ivu-icon ivu-icon-android-alert " style="color: #FF6600; font-size: 20px;"></i>
          亲，你还没登录哦~
          <br>
          <span class="fs-12">请先登录后再点赞</span>
        </p>
        <div slot="footer" class="text-ct">
          <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40 ml-40" to="/login"
                       style="color: #fff; width: 102px;">马上登录
          </router-link>
          <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40" to="/sel-role"
                       style="color: #fff;  width: 102px;">新用户注册
          </router-link>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import Tooltip from 'iview/src/components/tooltip'
  import Carousel from 'iview/src/components/carousel'
  import Zan from '@/components/Zan'
  import api from '@/config/apiConfig'
  import { encryption} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import {mapActions} from 'vuex'

  export default {
    beforeMount() {
      let self = this;
      self.$store.commit({
        type: 'SET_SHOW_TOP_CATEGORY_RES',
        result: true,
      });
    },
    name: 'BuyerShow',
    components: {
      iButton: Button,
      Icon: Icon,
      Modal: Modal,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      Tooltip: Tooltip,
      Zan: Zan,
    },
    data() {
      return {
        ZanIconType: 'ios-heart-outline',
        zanNumber: 0,
        zanFontSize: 12,
        whetherClickData: false,
        selectLogin: false,
        getShowkerReportList: [],
        getSuperBuyerShowList: [],
        reportRankList: [],
        getALLTrialReport: [],
        getALLTrialReportLength:21,
        allReportNum: 0,
        allShowerNum: 0,
        allReportClassifySelect:null,
        itemCatalogname:'',
        pageIndex:0,
        totalPages:0,
        leftSliderTimer: '',
        leftSlider: false,
        navList: [],
        buyerShowList: [],
        homeCarousel: 0,
      }
    },
    created() {
      this.getNavList();
      this.getShowkerReportRank();
      this.getBuyerShowInformation();
      this.getReportRankListFun();
      this.getALLTrialReportFun(null);
      this.whetherGoToBotton();
    },
    destroyed() {
      let self = this;
      self.$store.commit({
        type: 'SET_SHOW_TOP_CATEGORY_RES',
        result: true,
      });
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfoPhone() {
        return this.$store.state.userInfo.nickname
      },
      getUserInfoRole() {
        return this.$store.state.userInfo.role
      },
      getUserRole() {
        return this.$store.getters.getUserRole
      },

    },
    mounted: function () {
      this.$nextTick(function () {
        let self = this;
        self.leftSliderFunc();
      })
    },


    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      whetherGoToBotton(){
        let self = this;
        function getScrollTop(){
          let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
          if(document.body){
            bodyScrollTop = document.body.scrollTop;
          }
          if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
          }
          scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
          return scrollTop;
        }
        function getScrollHeight(){
          let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
          if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
          }
          if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
          }
          scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
          return scrollHeight;
        }
        function getWindowHeight(){
          let windowHeight = 0;
          if(document.compatMode === "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
          }else{
            windowHeight = document.body.clientHeight;
          }
          return windowHeight;
        }
        window.onscroll = function(){
          if(getScrollTop() + getWindowHeight() === getScrollHeight()){
            if(self.pageIndex < self.totalPages-1 ){
              self.pageIndex++;
              self.allReportClassifySelect = self.itemCatalogname;
              self.getALLTrialReportFun(self.itemCatalogname);
            }
          }
        };
      },
      toTrialReport(showkerId, id) {
        let self = this;
        self.$router.push({
          path: '/trial-report',
          query: {q: encryption(showkerId), showReportDesc: true, id: encryption(id)}
        });
      },
      toTrialReportDetails(showkerId) {
        let self = this;
        self.$router.push({
          path: '/trial-report',
          query: {q: encryption(showkerId)}
        });
      },
      getUserHead(src) {
        if (src && src.indexOf('head-image') >= 0) {
          return aliCallbackImgUrl + src + '!orgi75'
        } else if (src && src.indexOf('q.qlogo.cn/qq') >= 0) {
          return src
        } else {
          return '/static/img/common/tx-default.png'
        }
      },
      clickPraise(id, index) {
        let self = this;
        if (!self.isLogin) {
          return self.selectLogin = true;
        }
        api.clickPraise({
          trialReportId: id
        }).then((res) => {
          if (res.status) {
            self.$Message.success('点赞成功!');
            self.whetherClickPraise(id, index);
            self.ZanIconType = 'ios-heart-outline';
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      whetherClickPraise(id, index) {
        let self = this;
        api.whetherClickPraise({
          trialReportId: id
        }).then((res) => {
          if (res.status) {
            if (res.data) {
              self.$set(self.reportRankList[index], 'whetherClick', 'ios-heart');
            } else {
              self.$set(self.reportRankList[index], 'whetherClick', 'ios-heart-outline');
            }
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      getShowkerReportRank() {
        let self = this;
        api.getShowkerReportRank().then((res) => {
          if (res.status) {
            self.getShowkerReportList = res.data
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      getNavList() {
        let self = this;
        api.getNavList().then((res) => {
          if (res.status) {
            res.data.sort(function (a, b) {
              return a.sortIndex - b.sortIndex
            });
            self.navList = res.data;
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      encryptionId(id) {
        return encryption(id);
      },
      weChartShowkerAlertFunc() {
        let self = this;
        self.$store.commit({
          type: 'SET_WECHART_SHOW',
          result: true
        });
        setStorage('weChartPop', 2);
      },
      leftSliderFunc() {
        let self = this;
        self.leftSliderTimer = setInterval(function () {
          if (self.leftSlider) {
            let part = self.reportRankList.splice(0, 1);
            self.reportRankList = self.reportRankList.concat(part);
          }
          self.leftSlider = !self.leftSlider;
        }, 1500)
      },
      clearLeftSliderFunc() {
        let self = this;
        clearInterval(self.leftSliderTimer);
      },
      getBuyerShowInformation() {
        let self = this;
        api.getBuyerShowInfo().then(res => {
          if (res.status) {
            self.getSuperBuyerShowList = res.data.showkerList;
            self.allReportNum = res.data.allReportNum;
            self.allShowerNum = res.data.allShowerNum;
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      getShowkerTip(object) {
        let sdic = Object.keys(object).sort(function (a, b) {
          return object[b] - object[a]
        }).splice(0, 4);
        let newObjetc = {};
        for (let ki in sdic) {
          newObjetc[sdic[ki]] = object[sdic[ki]]
        }
        return newObjetc;
      },
      getReportRankListFun() {
        let self = this;
        api.getReportRankList().then(res => {
          if (res.status) {
            self.reportRankList = res.data;
            for (let i = 0, len = self.reportRankList.length; i < len; i++) {
              if (self.isLogin) {
                self.whetherClickPraise(self.reportRankList[i].id, i);
              }
              if (JSON.parse(self.reportRankList[i].trialReportImages)[0][0] !== 'h') {
                self.reportRankList[i].trialReportImages = aliCallbackImgUrl + JSON.parse(self.reportRankList[i].trialReportImages)[0]
              } else {
                self.reportRankList[i].trialReportImages = JSON.parse(self.reportRankList[i].trialReportImages)[0];
              }
            }
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      getALLTrialReportFun(type) {
        let self = this;
        if (self.itemCatalogname !== type){
          self.pageIndex = 0;
          self.itemCatalogname = type;
          self.getALLTrialReport = [];
          self.getALLTrialReportLength = 0;
        }
        self.allReportClassifySelect = type;
        api.getALLTrialReport({
          itemCatalogname:self.itemCatalogname||null,
          page:self.pageIndex,
          size:16
      }).then(res => {
          if (res.status) {
            for (let i = 0; i < res.data.length; i++) {
              if (JSON.parse(res.data[i].trialReportImages)[0]) {
                res.data[i].trialReportImages = JSON.parse(res.data[i].trialReportImages)[0]
              } else {
                res.data[i].trialReportImages = '';
              }
            }
            if (self.pageIndex>0){
              self.getALLTrialReport =self.getALLTrialReport.concat( res.data);
              self.getALLTrialReportLength  = self.getALLTrialReport.length;
            }else {
              self.getALLTrialReport = res.data;
            }
            self.totalPages = res.totalPages;
          } else {
            self.$Message.error(res.msg)
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>

  @import 'src/css/mixin';

  .con {
    width: 1160px;
    margin: 0px auto;
    /*padding: 20px;*/
    -moz-column-count: 4;
    -moz-column-gap: 30px;
    -moz-column-rule: 0px solid #ff0000;
    -webkit-column-count: 4;
    -webkit-column-gap: 30px;
    -webkit-column-rule: 0px solid #ff0000;
    -o-column-count: 4;
    -o-column-gap: 30px;
    -o-column-rule: 0px solid #ff0000;
  }

  .con .pic {
    width: 250px;
    min-height: 100px;
    box-shadow: 2px 2px 6px #b5b5b5;
    padding: 20px 15px;
    margin: 10px;
    display: inline-block
  }


  .confirm-recharge-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(55, 55, 55, .6);
  }

  .confirm-recharge-con {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 507px;
    margin-left: -254px;

  }

  .main-color {
    color: #FF0000;
  }

  .home-ctt {
    background-color: #F1F1F1;
    .user-name {
      display: block;
      max-width: 160px;
    }
    .double-question-mark {
      position: absolute;
      left: 0;
      top: -3px;
      display: inline-block;
      width: 18px;
      height: 34px;
      background: url("~assets/img/home/double_marks.png");
    }
    .buyer-xiu {
      margin: 10px auto 10px auto;
      overflow: hidden;
      .masterImgBox {
        width: 200px;
        height: 260px;
        overflow: hidden;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        background-color: #F1F2F6;
      }
      .showker-portrait-pic {
        transform: translateY(10px);
      }
      .left-ctt {
        padding: 0 25px;
        background-color: #fff;
        width: 1200px;
        height: 500px;
        overflow: hidden;
        .title {
          padding: 15px 10px 10px 10px;
          border-bottom: 1px solid #F6F6F6;
          img {
          }
        }
        ul {
          padding: 10px 0;
          width: 10000px;
          li {
            padding: 0px 15px;
            width: 230px;
            margin-bottom: 52px;
            .top-heart {
              position: absolute;
              z-index: 10;
              top: 5px;
              right: 18px;
              background-color: #ff6600;
              border: 1px solid #fff;
              border-radius: 3px;
              padding: 0 3px;
              color: #ff6600;
            }

            .price {
              position: absolute;
              width: 200px;
              top: 230px;
              left: 15px;
              height: 30px;
              line-height: 30px;
              padding: 0px 3px;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.5);
              span:first-child {
                width: 128px;
              }
              span:last-child {
                color: #FFFF00;
              }
            }
            .description {
              padding-left: 25px;
              height: 30px;
              overflow: hidden;
              img {
                position: absolute;
                left: 0;
                top: -3px;
              }
              .double-question-mark {
                position: absolute;
                left: 0;
                top: -3px;
                display: inline-block;
                width: 18px;
                height: 34px;
                background: url("~assets/img/home/double_marks.png");
              }
              .des-text {
                max-height: 40px;
                line-height: 16px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                word-wrap: break-word;
                color: #666;
              }
            }
            .icon-heart {
              font-size: 16px;
            }
            .bottom {
              font-size: 14px;
              .click-good {
                color: #FF0000;
              }
            }
          }
        }
      }
    }
    .home-section {
      margin: 10px auto 0 auto;
      .middle-ctt {
        width: 899px;
        overflow: hidden;
      }
      .right-ctt {
        float: right;
        width: 290px;
        height: 400px;
        padding: 0 10px;
        background-color: #fff;
        .title {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #eee;
          font-size: 18px;
          color: #ff6600;
          font-weight: bold;
          .cup-icon {
            font-size: 25px;
            transform: translateY(2px);
          }
        }
        .content {
          height: 48px;
          margin-top: 18px;
          > span {
            line-height: 48px;
            color: #ADADAD;
          }
          .ranking{
            color: #FF7B4E;
          }
        }
      }
    }
    .data-information {
      height: 135px;
      background-color: #fff;
      margin-top: 10px;
      .content {
        width: 300px;
        height: 135px;
        padding: 23px 0px 0px 28px;
        > div {
          margin-top: 18px;
          .number {
            font-size: 18px;
          }
          .dsc {
            font-size: 16px;
            color: #666;
            margin-top: 5px;
          }
        }
      }
    }
    .super-showker {
      margin: 0px auto 10px auto;
      overflow: hidden;
      .masterImgBox {
        width: 200px;
        height: 260px;
        overflow: hidden;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        background-color: #F1F2F6;
      }
      .user-head{
        border-radius: 50%;
      }
      .left-ctt {
        padding: 0 25px;
        background-color: #fff;
        width: 1200px;
        height: 350px;
        overflow: hidden;
        .title {
          padding: 15px 10px 10px 10px;
          border-bottom: 1px solid #F6F6F6;
          img {
          }
        }
        ul {
          padding: 10px 0;
          width: 10000px;
          li {
            padding: 0px 15px;
            width: 230px;
            margin-bottom: 52px;
            .top-heart {
              position: absolute;
              top: 5px;
              right: -15px;
              background-color: #FF6633;
              border: 1px solid #FF6633;
              color: #fff;
              border-radius: 3px;
              padding: 0 3px;

            }
            .description {
              overflow: hidden;
              padding: 0 10px;
              height: 70px;
              span {
                width: 80px;
                height: 25px;
                line-height: 25px;
                background-color: #F7F7F7;
                border: 1px solid #DDDEE1;
                border-radius: 3px;
              }
              span:nth-of-type(1) {
                margin-right: 20px;
              }
              span:nth-of-type(3) {
                margin-right: 20px;
              }
            }
            .icon-heart {
              font-size: 16px;
            }
            .bottom {
              font-size: 14px;
              .click-good {
                color: #FF0000;
              }
              .showker-portrait-pic {
                transform: translateY(10px);
              }
            }
          }
        }
      }
    }
    .buyer-show-all {
      padding: 0px 20px;
      width: 1200px;
      background-color: #fff;
      .title {
        padding: 15px 10px 10px 10px;
        border-bottom: 1px solid #F6F6F6;
        .report-classify{
          padding: 0px 5px;
          border-right: 1px solid #C6C6C6;
          font-size: 13px;
          cursor: pointer;
          color: #C6C6C6;
        }
        .report-classify.active{
          color: #000;
        }
        .report-classify:last-child{
          border: none;
        }
      }
      .no-more-list{
        text-align: center;
        padding: 20px;
      }
      .showker-portrait-pic {
        transform: translateY(8px);
      }
      .content {
        padding: 15px 20px;
        width: 290px;
        border: 1px solid #666;
        .double-question-mark {
          position: absolute;
          left: 0;
          top: -3px;
          display: inline-block;
          width: 18px;
          height: 34px;
          background: url("~assets/img/home/double_marks.png");
        }
        .des-text {
          max-height: 40px;
          line-height: 16px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-wrap: break-word;
          color: #666;
          margin-left: 26px;
        }

      }
    }

    .user-head-box {
      float: left;
      width: 48px;
      height: 48px;
      margin-left: 10px;
      img {
        border-radius: 50%;
      }
    }

    .home-discount-price {
      color: #fff;
      line-height: 20px;
      height: 20px;
      padding: 0 5px;
      margin-right: 15px;
      margin-top: 3px;
      margin-left: 5px
    }

    .slider-top-active-left {
      margin-left: -230px;
      animation: sliderTopLeft 1s;
    }

    .slider-top-default-left {
      margin-left: 0;
    }

    @keyframes sliderTopLeft {
      0% {
        margin-left: 0;
      }
      100% {
        margin-left: -230px;
      }
    }
  }
</style>
