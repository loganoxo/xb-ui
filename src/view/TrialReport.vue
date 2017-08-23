<template>
  <div>
    <div class="container">
      <div class="mt-10">
        <div class="trial-left left">
          <div>
            <img src="~assets/img/trial-report/trial_report_03.png" alt="">
            <p class="fs-16 mt-10 mb-10">136***6666</p>
            <p>申请次数：11,490 次</p>
            <p>成功申请：11 次</p>
            <p>上次申请成功：2017-06-06</p>
            <p>上次登录：2017-08-09</p>
          </div>
        </div>
        <div class="trial-right left">
          <div v-show="false">
            <p class="fs-16 trial-account">136***6666的试用报告</p>
            <p class="trial-tag">
              Ta的标签：&nbsp;&nbsp;
              <iButton size="small">潮流女装（2）</iButton>
              <iButton size="small">时尚配饰（2）</iButton>
              <iButton size="small">美容护肤（2）</iButton>
            </p>
            <div  class="graphic-info-report">
              <ul>
                <li>
                  <div>
                    <img src="~assets/img/common/home_24.png" alt="">
                    <p>136****666</p>
                  </div>
                  <div>
                    <p>发表于2017-08-07 10:45:49</p>
                    <p class="text">
                      真的很惊喜了哈，第一是速度，上午买了下午到，当日达效果不错，看来京东的物流确实很强大！照顾到买新机的人很着急！谢谢！速度666 第二，打开很惊艳，手感超级好！
                      试用了一个多小时，系统流畅，拍照效果好，666.第三，性价比很高！5.5英寸，
                      4G运行内存，64存储内存，电池容量大！很不错，处理器也还可以哈！如果你考虑在1500左右的手机这款就是值得购买的！好吧！上几张图片供大家看吧！
                      <a href="">查看全文</a>
                    </p>
                    <p>
                      <a ><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a ><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a ><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a ><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a ><img src="~assets/img/common/home_24.png" alt=""></a>
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="~assets/img/common/home_24.png" alt="">
                    <p>136****666</p>
                  </div>
                  <div>
                    <p>发表于2017-08-07 10:45:49</p>
                    <p class="text">
                      真的很惊喜了哈，第一是速度，上午买了下午到，当日达效果不错，看来京东的物流确实很强大！照顾到买新机的人很着急！谢谢！速度666 第二，打开很惊艳，手感超级好！
                      试用了一个多小时，系统流畅，拍照效果好，666.第三，性价比很高！5.5英寸，
                      4G运行内存，64存储内存，电池容量大！很不错，处理器也还可以哈！如果你考虑在1500左右的手机这款就是值得购买的！好吧！上几张图片供大家看吧！
                      <a href="">查看全文</a>
                    </p>
                    <p>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="~assets/img/common/home_24.png" alt="">
                    <p>136****666</p>
                  </div>
                  <div>
                    <p>发表于2017-08-07 10:45:49</p>
                    <p class="text">
                      真的很惊喜了哈，第一是速度，上午买了下午到，当日达效果不错，看来京东的物流确实很强大！照顾到买新机的人很着急！谢谢！速度666 第二，打开很惊艳，手感超级好！
                      试用了一个多小时，系统流畅，拍照效果好，666.第三，性价比很高！5.5英寸，
                      4G运行内存，64存储内存，电池容量大！很不错，处理器也还可以哈！如果你考虑在1500左右的手机这款就是值得购买的！好吧！上几张图片供大家看吧！
                      <a href="">查看全文</a>
                    </p>
                    <p>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                      <a href=""><img src="~assets/img/common/home_24.png" alt=""></a>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="text-ct pd-tb-20">
                <Page
                  :total= 100
                  :page-size = 10
                  @on-change = pageChange
                  show-elevator
                ></Page>
              </div>
            </div>
          </div>
          <div v-show="true">
            <p class="fs-16 trial-account">136***6666的试用报告</p>
            <div class="trial-account-details">
              <div class="task-info">
                <img src="~assets/img/trial-report/trial_report_03.png" alt="" width="100px" class="left">
                <div class="left ml-20">
                  <p>宠物衣服狗狗猫咪衣服棉袜狗脚</p>
                  <p>宝贝单价 2 元 。</p>
                </div>
              </div>
            </div>
            <div class="clear">
              <p class="fs-16 mt-20 mb-20">
                试用过程与体验：
              </p>
              <p class="fs-14 cl000 mb-40">
                首页感谢联盟，感谢商家能够给我的试用机会，收到宝贝后，打开一看，蛮好看的，简单而又不简约，韩范十足，很有个性，
                一摸手感也是超级不错，纯棉的T恤，穿在身上很舒服，很推荐，炎热夏天你怎么少得这样一件棉T，快来购买吧，宝贝们！！
              </p>
              <p class="fs-16">试用图片：</p>
              <div style="margin: auto; width: 700px; border: 1px solid #F1EEEB" class="task-list-img-box">
                <Carousel v-model="value3"
                          :autoplay="setting.autoplay"
                          :autoplay-speed="setting.autoplaySpeed"
                          :dots="setting.dots"
                          :trigger="setting.trigger"
                          :arrow="setting.arrow">
                  <Carousel-item>
                    <img class="block mg-at" src="~assets/img/trial-report/trial_report_04.png" alt="">
                  </Carousel-item>
                  <Carousel-item>
                     <img class="block mg-at" src="~assets/img/trial-report/trial_report_04.png" alt="">
                  </Carousel-item>
                  <Carousel-item>
                     <img class="block mg-at" src="~assets/img/trial-report/trial_report_04.png" alt="">
                  </Carousel-item>
                  <Carousel-item>
                    <img class="block mg-at" src="~assets/img/trial-report/trial_report_04.png" alt="">
                  </Carousel-item>
                </Carousel>

                <p class="mt-20 mb-20 text-ct task-list-img">
                  <a href="">
                    <img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">
                  </a>
                  <a href="">
                    <img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">
                  </a>
                  <a href="">
                    <img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">
                  </a>
                  <a href="">
                    <img class="mg-at" src="~assets/img/trial-report/trial_report_05.png" alt="">
                  </a>
                </p>
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
  import api from '../config/apiConfig'
  import {setStorage, getStorage} from '../config/utils'
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
    name: 'TrialReport',
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
        }
      }
    },
    created(){
    },
    computed: {
    },
    methods: {
      pageChange(){

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
        div{
          display: table-cell;
          vertical-align: middle;
        }
        >div:first-child{
          width: 15%;
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
