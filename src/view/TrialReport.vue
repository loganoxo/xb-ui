<template>
    <div class="container" >
      <div class="mt-10 clear">
        <div class="trial-left left">
          <div>
            <img class="user-head" :src="getUserHead(showkerInfo.portraitPic)" alt="" width="120" height="120">
            <p v-show="showReportDesc === true" class=" fs-14 mt-10"> <a @click="showReportDesc = false" >查看Ta的全部买家秀</a></p>
            <p class="fs-16 mt-10 mb-10">{{showkerInfo.nickname}}</p>
            <img :src="creditLevel" alt="">
            <p>淘气值：{{tqz}}</p>
            <p>申请次数：{{applyCount || 0}} 次</p>
            <p>成功申请：{{applySuccessCount || 0}} 次</p>
            <p>上次申请成功：{{lastApplySuccessTime | dateFormat('YYYY-MM-DD') || '-----'}}</p>
            <p>上次登录：{{getLastLoginTime | dateFormat('YYYY-MM-DD') || '-----'}}</p>
          </div>
        </div>
        <div class="trial-right left">
          <div v-if="!showReportDesc">
            <p class="fs-16 trial-account">{{showkerInfo.nickname}}的买家秀&nbsp;(共获得<span style="color: #FF6633">{{zanTotalNumbers}}</span>个赞）</p>
            <div class="trial-tag clear pb-10">
              <div class="mt-10 left tag-title">
                Ta的标签:
              </div>
              <div class="tag-box">
                <a v-for="(value, key) in showkerTag" v-if="value" class="mr-20" @click="getTagTrialReports(key)">
                  <iButton size="small" v-if=" value > 0" class="mt-10" >{{key}}({{value}})</iButton></a>
              </div>
            </div>
            <div  class="graphic-info-report">
              <ul v-if="trialReportList.length > 0">
                <li v-for="trialReport in trialReportList">
                  <div>
                    <img v-if="trialReport.task" :src="trialReport.task.taskMainImage +'!orgi75'" alt="" style="width: 150px">
                  </div>
                  <div>
                    <p>{{trialReport.task.taskName}}</p>
                    <p>发表于{{trialReport.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}} </p>
                    <p class="text">
                      {{trialReport.trialReportText}}
                     <a @click="showReportDescFunc(trialReport)">查看全文</a>
                    </p>
                    <p>
                      <a v-for="(trialReportImage,index) in trialReport.trialReportImages"   @click="trialReportPicShowFunc(trialReportImage)">
                        <img :src="trialReportImage + '!orgi75'" alt="">
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
              <p v-if="trialReportList.length <= 0" class="mt-20 mb-20 fs-14">暂无数据</p>
              <div class="text-ct pd-tb-20" v-if="trialReportList.length > 0">
                <Page
                  :total= totalPages
                  :page-size = trialReportParams.pageSize
                  @on-change = pageChange
                  show-elevator></Page>
              </div>
            </div>
          </div>
          <div v-if="showReportDesc && showkerReportDesc.task">
            <div class="fs-16 trial-account">
              {{showkerReportDesc.other.nickname}}的买家秀
              <div class="right fs-14 " style="margin-top: -2px;">
                分享精彩：<div v-html="copyHtml" style="display: inline-block;" ></div>
              </div>
            </div>
            <div class="trial-account-details">
              <div class="task-info">
                <router-link tag="img" :to="{path: '/task-details',query:{q: encryptionId(showkerReportDesc.task.id)}}" :src="showkerReportDesc.task.taskMainImage + '!orgi75'" alt="" width="100" class="left cursor-p"></router-link>
                <div class="left ml-20">
                  <router-link :to="{path: '/task-details',query:{q: encryptionId(showkerReportDesc.task.id)}}">{{showkerReportDesc.task.taskName}}</router-link>
                  <p>宝贝单价&nbsp;<span>{{showkerReportDesc.task.itemPrice / 100}}</span>&nbsp;元 。</p>
                  <iButton type="primary" class="mt-10" @click="applyingActivity">前去申请活动</iButton>
                </div>
              </div>
            </div>
            <div class="clear">
              <p class="fs-16 mt-20 mb-20">
                活动过程与体验：
              </p>
              <p class="fs-14 cl000 mb-40">{{showkerReportDesc.trialReportText}}</p>
              <p class="fs-16">买家秀图片：</p>
              <div class="zan-btn text-ct" @click="clickPraise" style="margin-top: -31px" v-show="showkerReportDesc.trialReportImages.length !== 0">
                <zan
                  :iconType="ZanIconType"
                  :zanNumber = 'zanNumber'>
                </zan>
              </div>
              <div class="task-list-img-box">
                <Carousel v-model="value3"
                          :autoplay="setting.autoplay"
                          :autoplay-speed="setting.autoplaySpeed"
                          :dots="setting.dots"
                          :trigger="setting.trigger"
                          :arrow="setting.arrow">
                  <Carousel-item v-for="trialReportImage in showkerReportDesc.trialReportImages" :key="trialReportImage">
                    <img class="block mg-at" :src="trialReportImage + '!orgi75'" alt="" width="700px">
                  </Carousel-item>
                </Carousel>
              </div>
            </div>
            <div class="xiuba-zan">
              <div class="fs-16">不顺手来个点赞？</div>
              <div class="zan-btn" @click="clickPraise" >
                <zan
                  :iconType="ZanIconType"
                  :zanNumber = 'zanNumber'>
                </zan>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal v-model="trialReportPicShow" width="600">
        <div style="text-align:center">
          <img :src="trialReportPic + '!orgi75'" alt="" style="width: 100%;margin-top: 20px;">
        </div>
        <div slot="footer"></div>
      </Modal>
      <Modal v-model="selectLogin" width="500">
        <p class="mt-20 mb-40 text-ct fs-22 vtc-mid" style="height: 50px;line-height: 50px">
          <i class="ivu-icon ivu-icon-android-alert " style="color: #FF6600; font-size: 20px;"></i>
          亲，你还没登录哦~
          <br>
          <span class="fs-12">请先登录后再点赞</span>
        </p>
        <div slot="footer" class="text-ct">
          <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40 ml-40" to="/login" style="color: #fff; width: 102px;">马上登录</router-link>
          <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40" to="/sel-role" style="color: #fff;  width: 102px;">新用户注册</router-link>
        </div>
      </Modal>
    </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Alert from 'iview/src/components/alert'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Carousel from 'iview/src/components/carousel'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, decode, encryption} from '@/config/utils'
  import TimeDown from '@/components/TimeDown'
  import Zan from '@/components/Zan'
  import {aliCallbackImgUrl} from '@/config/env'
  export default {

    name: 'MyTrialReport',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      TimeDown: TimeDown,
      Alert: Alert,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      Zan: Zan
    },
    data () {
      return {
        zanTotalNumbers:0,
        zanNumber:0,
        ZanIconType:'ios-heart-outline',
        selectLogin:false,
        copyHtml: '',
        copyValue: '',
        trialReportPicShow: false,
        trialReportPic: '',
        applyCount: '',
        applySuccessCount: '',
        value3: 0,
        showkerInfo: {},
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover'
        },
        totalPages: 1,
        trialReportParams: {
          showkerId: '',
          pageIndex: 1,
          pageSize: 5,
          itemCatalogname: '',
        },
        trialReportList: [],
        showReportDesc: false,
        showkerTag: {},
        showkerReportDesc: {},
        lastApplySuccessTime: null,
        trialReportId:null,
        trialReports:{},
        creditLevel:'',
        tqz:'',
      }
    },
    created(){
      let self = this;
      if(self.$route.query.q){
        self.trialReportParams.showkerId = decode(self.$route.query.q);
      }
      if(self.$route.query.showReportDesc){
        let trialReport = {
          id: decode(self.$route.query.id),
          showkerId: decode(self.$route.query.q)
        };
        self.trialReports = trialReport;
        self.showReportDescFunc(trialReport);
      }
      this.getTrialReports();
      this.getTrialDetail();

    },
    computed: {
      getUser(){
        return this.$store.state.userInfo;
      },
      getLastLoginTime() {
        return Math.max(this.showkerInfo.lastLoginTimeAPP, this.showkerInfo.lastLoginTimePC);
      },
      getWhetherLogin(){
        return this.$store.state.login;
      }
    },
    methods: {
      clickPraise(){
        let self = this;
        if(!self.getWhetherLogin){
         return self.selectLogin = true;
        }
        api.clickPraise({
          trialReportId : self.showkerReportDesc.id
        }).then((res) =>{
          if (res.status){
            self.$Message.success('点赞成功!');
            self.showReportDescFunc(self.trialReports);
            self.ZanIconType = 'ios-heart-outline';
          }else {
            self.$Message.error(res.msg)
          }
        })
      },
      whetherClickPraise(){
        let self = this;
        api.whetherClickPraise({
          trialReportId : self.showkerReportDesc.id
        }).then((res) =>{
          if (res.status){
            if (res.data){
              self.ZanIconType = 'ios-heart';
            }else {
              self.ZanIconType = 'ios-heart-outline';
            }
          }else {
            self.$Message.error(res.msg)
          }
        })
      },
      encryptionId(id) {
        return encryption(id);
      },
      applyingActivity() {
        this.$router.push({path: '/task-details',query:{q: encryption(this.showkerReportDesc.task.id)}})
      },
      getTagTrialReports(key){
        this.trialReportParams.itemCatalogname = key;
        this.getTrialReports();
      },
      getUserHead(src) {
        if (src && src.indexOf('head-image') >= 0) {
          return aliCallbackImgUrl + src + '!orgi75'
        } else if (src && (src.indexOf('wx.qlogo.cn') >= 0 || src.indexOf('q.qlogo.cn') >= 0)) {
          return src
        } else {
          return '/static/img/common/tx-default.png'
        }
      },
      getTrialReports(){
        let self = this;
        api.getTrialReports(self.trialReportParams).then((res) => {
          if(res.status){
            if(res.data.content !== ''){
              for(let i = 0, j = res.data.content.length; i < j; i++){
                res.data.content[i].trialReportImages = JSON.parse(res.data.content[i].trialReportImages);
              }
            }
            self.trialReportList = res.data.content;
            self.totalPages = res.data.totalElements;
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getTrialDetail(){
        let self = this;
        api.getTrialDetail(self.trialReportParams).then((res) => {
          if(res.status){
            self.applyCount = res.data.applyCount;
            self.applySuccessCount = res.data.applySuccessCount;
            self.showkerInfo = res.data.showkerInfo;
            self.showkerTag = res.data.showkerTag;
            self.lastApplySuccessTime = res.data.lastApplySuccessTime;
            self.creditLevel = res.data.creditLevel;
            self.tqz = res.data.tqz;
            self.zanTotalNumbers = res.data.likeCount;
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      trialReportPicShowFunc(trialReportImage){
        this.trialReportPicShow = true;
        this.trialReportPic = trialReportImage;
      },
      pageChange(data){
        this.trialReportParams.pageIndex = data;
        this.getTrialReports();
        document.getElementById('historyPage').scrollIntoView(true);
      },
      showReportDescFunc(trialReport){
        let self = this;
        self.showReportDesc = true;
        self.trialReports= trialReport;
        api.getTrialReport({
          id: trialReport.id
        }).then((res) => {
          if(res.status){
            self.showkerReportDesc = res.data;
            self.zanNumber = res.data.other.likeCount;
            if (self.getWhetherLogin){
              self.whetherClickPraise();
            }
            self.showkerReportDesc.trialReportImages = JSON.parse(self.showkerReportDesc.trialReportImages);
            let trialReportImages = null;
            if(self.showkerReportDesc.trialReportImages.length > 0){
              trialReportImages = self.showkerReportDesc.trialReportImages[0];
            }else {
              trialReportImages = "http://" + window.location.host + "/static/img/common/logo.png";
            }
            self.$nextTick(function () {
              self.initJS();
              self.initCss();
              self.copyValue =  window.location.href;
              self.copyHtml = '<div style="display: inline-block;" data-sites="qzone, qq, weibo" data-title="白拿拿365，精彩秀出每一天" data-image=' + trialReportImages + ' data-description="我在白拿拿365上查看了'+ self.showkerReportDesc.task.taskName +'精彩买家秀，心动不如行动，赶快和我一起加入，只要分享自己真实的使用体会，即可免费获得万千商品！" class="social-share" data-url=' + self.copyValue + '  ></div>';
            });
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
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
        link.setAttribute('type','text/css');
        document.getElementsByTagName('head')[0].appendChild(link)
      },
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .trial-left{
    >div{
      border-radius: 3px;
      padding: 5px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      margin-right: 10px;
      img.user-head{
        margin-left: 12px;
        border-radius: 50%;
      }
      p{
        line-height: 25px;
      }
    }
  }
  .trial-right{
    background-color: #fff;
    width: 1008px;
    .trial-account{
      line-height: 50px;
      height: 50px;
    }
    .trial-tag{
      border: 1px solid #EEEEEE;
      border-left: none;
      border-right: none;
      .tag-title{
        width:60px;
      }
      .tag-box{
        margin-left:70px;
      }
    }
    .trial-account-details{
      background-color: #f8f8f8;
      padding: 15px 15px;
      border: 1px solid #eee;
      overflow: hidden;
      width: 100%;
      margin-top: 5px;
      .task-info{
        a,p{
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
  .task-list-img-box{
    margin: auto;
    width: 700px;
    border: 1px solid #F1EEEB;
    .task-list-img{
      a{
        display: inline-block;
        margin-right: 50px;
      }
    }
  }
  .xiuba-zan{
    width: 182px;
    height: 62px;
    margin: 20px auto;
    text-align: center;
  }
  .zan-btn{
    width: 150px;
    line-height: 30px;
    border-radius: 3px;
    background-color: $mainColor;
    margin: 4px auto;
    padding-top: 4px;
    @include transition;
    &:hover{
      background-color: darken($mainColor, 10%);
    }
  }
  .graphic-info-report{
    width: 1000px;
    ul{
      li{
        display: table;
        padding: 30px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        width: 100%;
        div{
          display: table-cell;
          vertical-align: middle;
        }
        >div:first-child{
          width: 200px;
          text-align: center;
        }
        >div:last-child{
          width: 850px;
          p{
            line-height: 30px;
            font-size: 14px;
            &:first-child{
              color: #999;
            }
            &:last-child{
              margin-top: 10px;
              a{
                border: 1px solid #ddd;
                display: inline-block;
                margin-right: 10px;
                padding: 5px;
                border-radius: 5px;
                img{
                  vertical-align: middle;
                  width: 38px;
                }
              }
            }
          }
        }
      }
    }
  }


</style>
