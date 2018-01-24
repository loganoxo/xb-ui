<template>
  <div>
    <div class="container">
      <div class="mt-10">
        <div class="trial-right left">
          <div v-show="!showReportDesc">
            <p class="fs-16 trial-account">{{showkerInfo.phone}}的买家秀&nbsp;(共获得<span style="color: #FF6633">{{zanTotalNumbers}}</span>个赞）</p>
            <p class="trial-tag">
              Ta的标签：&nbsp;&nbsp;
              <a  v-for="(value, key) in showkerTag" v-if="value" style="margin-right: 20px;" @click="getTagTrialReports(key)">
                <iButton size="small" v-if=" value > 0" >{{key}}({{value}})</iButton>
              </a>
            </p>
            <div class="graphic-info-report">
              <ul v-if="trialReportList.length > 0">
                <li v-for="trialReport in trialReportList" :key="trialReport.id">
                  <div>
                    <img :src="trialReport.task.taskMainImage + '!orgi75'" alt="" style="width: 150px;">
                  </div>
                  <div>
                    <p>{{trialReport.task.taskName}}</p>
                    <p>成功发布于 {{trialReport.passTime | dateFormat('YYYY-MM-DD hh:mm:ss')}} </p>
                    <p class="text">
                      {{trialReport.trialReportText}}
                      <a @click="showReportDescFunc(trialReport)">查看全文</a>
                    </p>
                    <p>
                      <a v-for="(trialReportImage,index) in trialReport.trialReportImages" @click="trialReportPicShowFunc(trialReportImage)">
                        <img :src="trialReportImage" alt="">
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
                  show-elevator
                ></Page>
              </div>
            </div>
          </div>
          <div v-if="showReportDesc">
            <div class="fs-16 trial-account">
              {{showkerReportDesc.showkerPhone}}的买家秀
               <a @click="showReportDesc = false;" class="right fs-14">返回上一页</a>
               <div class="right fs-14 mr-40" style="margin-top: -2px;" >
                分享精彩：<div v-html="copyHtml" style="display: inline-block;" ></div>
               </div>
            </div>
            <div class="trial-account-details">
              <div class="task-info">
                <img :src="showkerReportDesc.task.taskMainImage + '!orgi75'" alt="" width="100px" class="left">
                <div class="left ml-20">
                  <p>{{showkerReportDesc.task.taskName}}</p>
                  <p>宝贝单价&nbsp;<span>{{showkerReportDesc.task.itemPrice / 100}}</span>&nbsp;元 。</p>
                </div>
              </div>
            </div>
            <div class="clear">
              <p class="fs-16 mt-20 mb-20">
                活动过程与体验：
              </p>
              <p class="fs-14 cl000 mb-40">{{showkerReportDesc.trialReportText}}</p>
              <p class="fs-16">买家秀图片：</p>
              <div style="margin: auto; width: 700px; border: 1px solid #F1EEEB" class="task-list-img-box">
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
              <p class="text-ct mt-20 fs-16">共获得<span style="color: #FF6633">{{showkerReportDesc.other.likeCount}}</span>赞</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="trialReportPicShow" width="600">
      <div style="text-align:center">
        <img :src="trialReportPic" alt="" style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">
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
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import Carousel from 'iview/src/components/carousel'
  import api from '@/config/apiConfig'
  import TimeDown from '@/components/TimeDown'
  import {setStorage, getStorage, decode, encryption} from '@/config/utils'
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
    },
    data () {
      return {
        zanTotalNumbers:1,
        copyHtml: '',
        copyValue: '',
        trialReportPicShow: false,
        trialReportPic: '',
        value3: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover'
        },
        totalPages: 1,
        trialReportParams: {
          showkerId: this.$store.state.userInfo.id,
          pageIndex: 1,
          pageSize: 5,
          itemCatalogname: '',
        },
        trialReportList: [],
        showReportDesc: false,
        showkerTag: {},
        showkerReportDesc: {
          task: {}
        },
        showkerInfo: {}
      }
    },
    created(){
        this.getTrialReports();
        this.getTrialDetail();
    },
    computed: {
        getUser(){
          return this.$store.state.userInfo;
        }
    },
    methods: {
      getTagTrialReports(key){
          this.trialReportParams.itemCatalogname = key;
          this.getTrialReports();
      },
      getTrialReports(){
        let self = this;
        api.getTrialReports(self.trialReportParams).then((res) => {
          if(res.status){
            for(let i = 0, j = res.data.content.length; i < j; i++){
              res.data.content[i].trialReportImages = JSON.parse(res.data.content[i].trialReportImages);
            }
            self.trialReportList = res.data.content;
            self.totalPages = res.data.totalElements;
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getTrialDetail(){
        let self = this;
        api.getTrialDetail(self.trialReportParams).then((res) => {
          if(res.status){
            self.showkerInfo = res.data.showkerInfo;
            self.showkerTag = res.data.showkerTag;
            self.zanTotalNumbers = res.data.likeCount;
          } else {
            self.$Message.error(res.msg);
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
      },
      showReportDescFunc(trialReport){
         let self = this;
         this.showReportDesc = true;
         api.getTrialReport({
           id: trialReport.id
         }).then((res) => {
            if(res.status){
              self.showkerReportDesc = res.data;
              self.showkerReportDesc.trialReportImages = JSON.parse(self.showkerReportDesc.trialReportImages);
              self.$nextTick(function () {
                self.initJS();
                self.initCss();
                self.copyValue =  window.location.href;
                let trialReportImages = null;
                if(self.showkerReportDesc.trialReportImages.length > 0){
                  trialReportImages = self.showkerReportDesc.trialReportImages[0];
                }else {
                  trialReportImages = "https://" + window.location.host + "/static/img/common/logo.png";
                }
                self.copyHtml = '<div style="display: inline-block;" data-sites="qzone, qq, weibo" data-title="白拿拿，精彩秀出每一天" data-image=' + trialReportImages + ' data-description="我在白拿拿365上查看了+活动名称+精彩买家秀，心动不如行动，赶快和我一起加入，只要分享自己真实的使用体会，即可免费获得万千商品！" class="social-share" data-url=' + self.copyValue + '  ></div>';
              });

            }else {
              self.$Message.error(res.msg);
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
        link.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(link)
      },
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  .trial-left{
    >div{
      border-radius: 3px;
      padding: 5px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      margin-right: 20px;
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
      line-height: 50px;
      height: 50px;
    }
    .trial-account-details{
      background-color: #f8f8f8;
      padding: 15px 15px;
      border: 1px solid #eee;
      overflow: hidden;
      width: 100%;
      margin-top: 5px;
      .task-info{
        p{
          line-height: 30px;
          font-size: 14px;
        }
      }
      .task-list-img-box{
        .task-list-img{
          a{
            display: inline-block;
            margin-right: 50px;
          }
        }
      }

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
          width: 20%;
          text-align: center;
        }
        >div:last-child{
          width: 85%;
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
