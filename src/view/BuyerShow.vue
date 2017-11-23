<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000" v-model="homeCarousel" loop>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" width="900" height="400" src="~assets/img/home/banner_02.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" width="900" height="400" src="~assets/img/home/banner_03.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" width="900" height="400" src="~assets/img/home/banner_04.jpg" alt="">
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
              <span class="left fs-18">{{index + 1}}</span>
              <img class="left ml-15" width="48px" :src="item.portrait" alt="">
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
              <p class="number">8863587位</p>
              <p class="dsc">真实秀客入驻</p>
            </div>
          </div>
          <div class="content left clear">
            <img class="left" src="~assets/img/buyer-show/des_02.png" alt="">
            <div class="left  ml-15">
              <p class="number">8863587位</p>
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
                <img style="vertical-align: middle" src="~assets/img/home/top_mjx.png" alt="">
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
                    <p class=" top-heart clear" @click="clickPraise(item.id,index)">
                      <Zan :iconType="item.whetherClick" :zanNumber='item.likeCount' :fontSize="zanFontSize"></Zan>
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
                                 class="user-head-box"><img width="48" height="48"
                                                            :src="getUserHead(item.showkerPortraitPic)" alt="">
                    </router-link>
                    <div class="left ml-10" style="margin-top: 5px">
                      <p style="color: #000">{{item.showkerPhone}}</p>
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
                <img style="vertical-align: middle" src="~assets/img/buyer-show/buyer_show_xdr.png" alt="">
                <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
              </div>
              <ul class="clear">
                <li v-for="(item,index) in getSuperBuyerShowList" :key="index" class="content cursor-p left pos-rel">
                  <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId)}}">
                    <div style="height: 180px" class="text-ct">
                      <img :src="getUserHead(item.portraitPic)" alt="" width="140">
                    </div>
                    <p class=" top-heart clear">
                      共发表({{item.num}})篇
                    </p>
                  </router-link>
                  <p class=" description pos-rel text-ct">
                    <span v-for="(value,key) in getShowkerTip(item.showkerTagsMap)" v-show="value >0"
                          class="left mt-10 ">{{key}}{{value}}</span>
                  </p>
                  <div class="clear bottom mt-10">
                    <a class="user-head-box">
                      <img class="showker-portrait-pic" width="48" height="48" :src="getUserHead(item.portraitPic)"
                           alt="">
                    </a>
                    <div class="left ml-10" style="margin-top: 5px">
                      <p style="color: #000">{{item.phone}}</p>
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
        <div class="buyer-show-all">
          <div class="title clear">
            <img style="vertical-align: middle" src="~assets/img/buyer-show/buyer-show-allmjx.png" alt="">
            <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
          </div>
          <div class="mt-10 clear ">
            <Waterfall :line-gap="290" :watch="getALLTrialReport">
              <!-- each component is wrapped by a waterfall slot -->
              <waterfall-slot
                v-for="(item, index) in getALLTrialReport"
                :width="item.width"
                :height="item.height"
                :order="index"
                :key="item.id"
              >
                <div class="content ">
                  <div class="pos-rel">
                    <img width="250" :src="item.trialReportImages" alt="">
                    <p class="mt-10 description pos-rel">
                      <span class="double-question-mark "></span>
                      <a class="des-text ">{{item.trialReportText}}</a>
                    </p>
                  </div>
                  <div class="clear bottom mt-20">
                    <a class="user-head-box">
                      <img class="showker-portrait-pic" width="48" height="48"
                           :src="getUserHead(item.showkerPortraitPic)" alt="">
                    </a>
                    <div class="left ml-10" style="margin-top: 5px">
                      <p style="color: #000">{{item.showkerPhone}}</p>
                      <img :src="item.creditLevel" alt="">
                      <div class="text-ct"><span>淘气值：{{item.tqz}}</span></div>
                    </div>
                  </div>
                </div>
              </waterfall-slot>
            </Waterfall>
            <!--<div class="content left" v-for="item in getALLTrialReport ">
              <div class="pos-rel">
                <img width="250" :src="item.trialReportImages" alt="">
                <p class="mt-10 description pos-rel">
                  <span class="double-question-mark "></span>
                  <a class="des-text ">{{item.trialReportText}}</a>
                </p>
              </div>
              <div class="clear bottom mt-20">
                <a class="user-head-box">
                  <img class="showker-portrait-pic" width="48" height="48" :src="getUserHead(item.showkerPortraitPic)" alt="">
                </a>
                <div class="left ml-10" style="margin-top: 5px">
                  <p style="color: #000">{{item.showkerPhone}}</p>
                  <img :src="item.creditLevel" alt="">
                  <div class="text-ct"><span>淘气值：{{item.tqz}}</span></div>
                </div>
              </div>
            </div>-->
            <!-- <div class="content left ">
               <div class="pos-rel">
                 <img width="250" src="~assets/img/buyer-show/des_01.png" alt="">
                 <p class="mt-10 description pos-rel">
                   <span class="double-question-mark "></span>
                   <a class="des-text ">kldfksdjfldskf</a>
                 </p>
               </div>
               <div class="clear bottom mt-20">
                 <a class="user-head-box">
                   <img class="showker-portrait-pic" width="48" height="48" :src="getUserHead()" alt="">
                 </a>
                 <div class="left ml-10" style="margin-top: 5px">
                   <p style="color: #000">15000000000</p>
                   <img src="" alt="">
                   <div class="text-ct"><span>淘气值：600-800</span></div>
                 </div>
               </div>
             </div>
             <div class="content left ">
               <div class="pos-rel">
                 <img width="250" src="~assets/img/home/banner_01.jpg" alt="">
                 <p class="mt-10 description pos-rel">
                   <span class="double-question-mark "></span>
                   <a class="des-text ">kldfksdjfldskf</a>
                 </p>
               </div>
               <div class="clear bottom mt-20">
                 <a class="user-head-box">
                   <img class="showker-portrait-pic" width="48" height="48" :src="getUserHead()" alt="">
                 </a>
                 <div class="left ml-10" style="margin-top: 5px">
                   <p style="color: #000">15000000000</p>
                   <img src="" alt="">
                   <div class="text-ct"><span>淘气值：600-800</span></div>
                 </div>
               </div>
             </div>
             <div class="content  left">
               <div class="pos-rel">
                 <img width="250" src="~assets/img/task-details/task_details_03.png" alt="">
                 <p class="mt-10 description pos-rel">
                   <span class="double-question-mark "></span>
                   <a class="des-text ">kldfksdjfldskf</a>
                 </p>
               </div>
               <div class="clear bottom mt-20">
                 <a class="user-head-box">
                   <img class="showker-portrait-pic" width="48" height="48" :src="getUserHead()" alt="">
                 </a>
                 <div class="left ml-10" style="margin-top: 5px">
                   <p style="color: #000">15000000000</p>
                   <img src="" alt="">
                   <div class="text-ct"><span>淘气值：600-800</span></div>
                 </div>
               </div>
             </div>-->
            <!-- <div class="masonry">
               <div class="column">
                 <div class="item">
                   <div class="item__content">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;medium">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
               </div>
               <div class="column">
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;medium">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;large">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;medium">
                   </div>
                 </div>
               </div>
               <div class="column">
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;large">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content">
                   </div>
                 </div>
               </div>
               <div class="column">
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;large">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;medium">
                   </div>
                 </div>
               </div>
               <div class="column">
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;medium">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content">
                   </div>
                 </div>
                 <div class="item">
                   <div class="item__content item__content&#45;&#45;small">
                   </div>
                 </div>
               </div>
             </div>-->
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
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import Tooltip from 'iview/src/components/tooltip'
  import Carousel from 'iview/src/components/carousel'
  import SmsCountdown from '@/components/SmsCountdown'
  import Zan from '@/components/Zan'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, encryption, removeStorage} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import {mapActions} from 'vuex'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {
    beforeMount() {
      let self = this;
      if (getStorage('weChartPop') == 1 && self.$store.state.userInfo.role == 0 && !getStorage('setWeChartshower' + self.$store.state.userInfo.phone)) {
        self.weChartShowkerAlertFunc();
      }
      self.$store.commit({
        type: 'SET_SHOW_TOP_CATEGORY_RES',
        result: false,
      });
    },
    name: 'home',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      Radio: Radio,
      Modal: Modal,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      Tooltip: Tooltip,
      Zan: Zan,
      Waterfall: Waterfall,
      WaterfallSlot: WaterfallSlot,
    },
    data() {
      return {
        slotWith: '290',
        slotHeight: '500',
        ZanIconType: 'ios-heart-outline',
        zanNumber: 0,
        zanFontSize: 12,
        whetherClickData: false,
        selectLogin: false,
        getShowkerReportList: [],
        getSuperBuyerShowList: [],
        reportRankList: [],
        getALLTrialReport: [],
        allReportNum: 0,
        allShowerNum: 0,
        confirmRechargeModel: true,
        command: '',
        wechartAlertShow: false,
        wechartShowAgain: [],
        leftTopSliderTimer: '',
        leftSliderTimer: '',
        leftTopSlider: false,
        leftSlider: false,
        trialCount: {},
        homeCommodityList: [],
        homeHistoryList: [],
        homeDisCountList: [],
        noticeActive: 'faq',
        taskTopLeftList: [],
        navList: [],
        buyerShowList: [],
        getMoreBuyerShow: false,
        homeCarousel: 0,

      }
    },
    created() {
      if (this.$store.state.login) {
        this.weChartAlertFunc();
      }
      this.getNavList();
      this.getHomeTaskList();
      this.getHomeTaskTopLeftList();
      this.personalTrialCount();
      this.getShowkerReportRank();
      this.getShowkerNumber();
      this.getBuyerShowInformation();
      this.getReportRankListFun();
      this.getALLTrialReportFun();
    },
    destroyed() {
      let self = this;
      self.$store.commit({
        type: 'SET_WECHART_SHOW',
        result: false
      });
      self.$store.commit({
        type: 'SET_WECHART_RES',
        result: false,
      });
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
      getMemberDeadline() {
        return this.$store.state.userInfo.memberDeadline
      },
      getMemberLevel() {
        return this.$store.state.userInfo.memberLevel
      },
      userHeadUrl() {
        return this.$store.getters.getUserHeadUrl
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

      getShowkerNumber() {
        let timestamp1 = Date.parse(new Date());
      },
      toTrialReport(showkerId, id) {
        let self = this;
        self.$router.push({
          path: '/trial-report',
          query: {q: encryption(showkerId), showReportDesc: true, id: encryption(id)}
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
      selTaskCategoryAllFunc() {
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all'
        });
        self.$router.push({'path': '/task-category', 'query': {'searchAll': 'yes'}});
      },
      selTaskCategoryActiveFunc(nav) {
        let self = this;
        self.$router.push({'path': '/task-category', 'query': {'cate': nav.id}});
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: false
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all',
        });
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
      weChartAlertFunc() {
        let self = this;
        api.checkWechartAlert().then((res) => {
          if (res.status && getStorage('weChartPop') === 1) {
            self.wechartAlertShow = true;
            setStorage('weChartPop', 2)
          } else {
            self.wechartAlertShow = false;
          }
        })
      },
      setWeChartAlertFunc(role) {
        let self = this;
        let commandList = {
          0: 1788,
          1: 9188
        };
        if (self.command === '') {
          self.$Message.error('口令不能为空');
        } else {
          if (parseInt(self.command) === parseInt(commandList[role])) {
            self.setWechartAlert()
          } else {
            self.$Message.error('口令输入错误');
          }
        }
      },
      setWechartAlert() {
        let self = this;
        api.setWechartAlert({
          command: self.command,
        }).then((res) => {
          if (res.status) {
            self.wechartAlertShow = false;
            self.$Message.success({
              content: '恭喜您成功获得一个月VIP会员',
              onClose: function () {
                self.$store.dispatch('getUserInformation');
              }
            });
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      cancelWeiChartFunc() {
        let self = this;
        if (self.wechartShowAgain !== '') {
          if (self.$store.state.userInfo.role === 1) {
            api.noWechartAlert().then((res) => {
              if (!res.status) {
                self.$Message.error(res.msg)
              }
            })
          } else {
            setStorage('setWeChartshower' + self.$store.state.userInfo.phone, '1')
          }
        }
        self.$store.commit({
          type: 'SET_WECHART_SHOW',
          info: false
        });
      },
      goOut() {
        let _this = this;
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'login'})
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      personalTrialCount() {
        let self = this;
        if (self.$store.state.login) {
          if (self.getUserInfoRole === 0) {
            api.showkerPersonalTrialCount().then((res) => {
              if (res.status) {
                self.trialCount = res.data
              } else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          } else {
            api.sellerPersonalTrialCount().then((res) => {
              if (res.status) {
                self.trialCount = res.data
              } else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          }
        }
      },
      getHomeTaskTopLeftList() {
        let self = this;
        api.getHomeTaskTopLeftList().then((res) => {
          if (res.status) {
            self.taskTopLeftList = res.data;

          } else {

          }
        })
      },
      getHomeTaskList() {
        let self = this;
        api.getIndexRecommend().then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeCommodityList = res.data;
            }
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
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
      getALLTrialReportFun() {
        let self = this;
        api.getALLTrialReport().then(res => {
          if (res.status) {
            for (let i = 0; i < res.data.length; i++) {
              if (JSON.parse(res.data[i].trialReportImages)[0]) {
                res.data[i].trialReportImages = JSON.parse(res.data[i].trialReportImages)[0]
              } else {
                res.data[i].trialReportImages = '';
              }

            }
            self.getALLTrialReport = res.data;
            console.log(self.getALLTrialReport);
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
              border: 1px solid #ff6600;
              border-radius: 3px;
              padding: 0 3px;

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
        width: 900px;
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
              top: 5px;
              right: 0px;
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
        .showker-portrait-pic {
          transform: translateY(8px);
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
