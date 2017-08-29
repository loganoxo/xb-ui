<template>
  <div>
    <div class="container">
      <div class="mt-10">
        <div class="trial-right left">
          <div v-show="!showReportDesc">
            <p class="fs-16 trial-account">
              {{showkerInfo.phone}}的试用报告
            </p>
            <p class="trial-tag">
              Ta的标签：&nbsp;&nbsp;
              <a  v-for="(value, key) in showkerTag">
                <iButton size="small" v-if=" value > 0" >{{showkerTagDesc[key]}}({{value}})</iButton>
              </a>
            </p>
            <div  class="graphic-info-report">
              <ul v-if="trialReportList.length > 0">
                <li v-for="trialReport in trialReportList">
                  <div>
                    <img :src="trialReport.task.taskMainImage" alt="" style="width: 150px;">
                  </div>
                  <div>
                    <p>发表于 {{trialReport.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}} </p>
                    <p class="text">
                      {{trialReport.trialReportText}}
                      <a @click="showReportDescFunc(trialReport)">查看全文</a>
                    </p>
                    <p>
                      <a v-for="trialReportImage in trialReport.trialReportImages">
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
          <div v-show="showReportDesc">
            <p class="fs-16 trial-account">
              {{showkerReportDesc.showkerPhone}}的试用报告
               <a @click="showReportDesc = false;" class="right fs-14">返回上一页</a>
            </p>
            <div class="trial-account-details">
              <div class="task-info">
                <img :src="showkerReportDesc.task.taskMainImage" alt="" width="100px" class="left">
                <div class="left ml-20">
                  <p>{{showkerReportDesc.task.taskName}}</p>
                  <p>宝贝单价 {{showkerReportDesc.task.itemPrice / 100}} 元 。</p>
                </div>
              </div>
            </div>
            <div class="clear">
              <p class="fs-16 mt-20 mb-20">
                试用过程与体验：
              </p>
              <p class="fs-14 cl000 mb-40">{{showkerReportDesc.trialReportText}}</p>
              <p class="fs-16">试用图片：</p>
              <div style="margin: auto; width: 700px; border: 1px solid #F1EEEB" class="task-list-img-box">
                <Carousel v-model="value3"
                          :autoplay="setting.autoplay"
                          :autoplay-speed="setting.autoplaySpeed"
                          :dots="setting.dots"
                          :trigger="setting.trigger"
                          :arrow="setting.arrow">
                   <Carousel-item v-for="trialReportImage in showkerReportDesc.trialReportImages">
                     <img class="block mg-at" :src="trialReportImage" alt="" width="700px">
                  </Carousel-item>
                </Carousel>

                <!--<p class="mt-20 mb-20 text-ct task-list-img">-->
                  <!--<a href="">-->
                    <!--<img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">-->
                  <!--</a>-->
                  <!--<a href="">-->
                    <!--<img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">-->
                  <!--</a>-->
                  <!--<a href="">-->
                    <!--<img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">-->
                  <!--</a>-->
                  <!--<a href="">-->
                    <!--<img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">-->
                  <!--</a>-->
                <!--</p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
  import api from '@/config/apiConfig'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  import Carousel from 'iview/src/components/carousel'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
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
          showkerId: 182,
          pageIndex: 1,
          pageSize: 5
        },
        trialReportList: [],
        showReportDesc: false,
        showkerTagDesc: {
          100: '时尚女装',
          200: '精品男装',
          300: '男女童装',
          400: '鞋子箱包',
          500: '潮流配饰',
          600: '美食/特产',
          700: '数码家电',
          800: '家居日用',
          900: '美容护肤',
          1000: '其他试用',
        },
        showkerTag: {},
        showkerReportDesc: {
          task: {}
        },
        showkerInfo: {}
      }
    },
    created(){
        this.getTrialReportList();
    },
    computed: {
        getUser(){
          return this.$store.state.userInfo;
        }
    },
    methods: {
      getTrialReportList(){
        let self = this;
        api.getTrialReportList(self.trialReportParams).then((res) => {
          if(res.status){
            for(let i = 0, j = res.data.reportList.content.length; i < j; i++){
              res.data.reportList.content[i].trialReportImages = JSON.parse(res.data.reportList.content[i].trialReportImages);
            }
            self.trialReportList = res.data.reportList.content;
            self.totalPages = res.data.reportList.totalElements;
            self.showkerInfo = res.data.showkerInfo;
            self.showkerTag = res.data.showkerTag;
          } else {
            self.$Modal.error({
              content: res.msg
            });
          }

        })
      },
      pageChange(data){
        this.trialReportParams.pageIndex = data;
        this.getTrialReportList();
      },
      showReportDescFunc(trialReport){
         let self = this;
         this.showReportDesc = true;
         api.ShowkerReportOne({
           id: trialReport.id,
           showkerId: trialReport.showkerId
         }).then((res) => {
            if(res.status){
              self.showkerReportDesc = res.data;
              self.showkerReportDesc.trialReportImages = JSON.parse(self.showkerReportDesc.trialReportImages);
            }else {
              self.$Modal.error({
                content: res.msg
              });
            }

         })
      }
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
