<template>
  <div>
    <div class="task-details-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>试客联盟</Breadcrumb-item>
            <Breadcrumb-item>试用品专区</Breadcrumb-item>
            <Breadcrumb-item>{{commodityData.task.itemCatalog.parentItemCatalog.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>
      <div class="container">
        <div class="task-details-top">
          <div class="task-details-top-left left">
            <!--<img src="~assets/img/task-details/task_details_03.png"  alt="">-->
            <img :src="commodityData.task.taskMainImage"  alt="" >
          </div>
          <div class="task-details-top-right left">
            <h3 class="fs-18" >{{commodityData.task.taskName}}</h3>
            <p class="fs-14">
              活动类型：
              <span class="fs-18">{{commodityData.task.taskTypeDesc}}</span>
            </p>
            <p class="fs-14">
              单品试用担保金：<span class="fs-18">{{(commodityData.task.perMarginNeed/100).toFixed(2)}}</span>元
              &nbsp;&nbsp;&nbsp;&nbsp;
              试用份数：<span class="fs-18"> {{commodityData.task.taskCount}} </span>份
            </p>
            <p class="fs-14">
              （商家已存入总试用担保金 {{commodityData.task.totalMarginNeed}} 元，请放心申请）
            </p>
            <p class="fs-14">
              {{commodityData.apply}} 人申请， {{commodityData.trailOn}} 人正在参与试用， {{commodityData.applySuccess}} 人完成试用， 剩余 {{commodityData.task.taskCount - commodityData.applySuccess}} 份
            </p>
            <p class="fs-14">
              <i class="ivu-icon ivu-icon-clock fs-16"></i>
              距申请结束：
              <time-down color="#495060" size="20" :endTime="commodityData.task.endTime" ></time-down>&nbsp;
              <!--<span class="fs-24">17</span> 天 <span class="fs-24">02</span> 小时 <span class="fs-24">56</span> 分钟 <span class="fs-24">31</span> 秒-->
            </p>
            <div>
              <iButton  v-if="getRole == 0 ? true : false" size="large" class="fs-16 default-btn" long type="error" @click="applyForTrialFunc">申请试用</iButton>
            </div>
            <iButton  v-if="getRole == 1 ? true : false" size="large" class="fs-16 default-btn" long type="warning" >商家号不可以参加试用</iButton>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-details-step">
            <div class="left title">
              试用
              流程
              <span></span>
            </div>
            <ul class="left ctt">
              <li>
                <span>1</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>2</span>
                <em>以{{(commodityData.task.perMarginNeed/100).toFixed(2)}}元到指定平台购买试用品</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>3</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>4</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>5</span>
                <em>获得试用资格</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>6</span>
                <em>获得试用资格</em>
              </li>
            </ul>
        </div>
      </div>
      <div class="container">
        <div class="graphic-info">
          <div class="graphic-info-sel">
            <a :class="[graphicInfoSelClass == graphicSel.isClass ? 'active' : '' ]" v-for="graphicSel in graphicInfoSels" :key="graphicSel.isClass" @click="graphicSelFunc(graphicSel)">
              {{graphicSel.text}}
              <span v-if = graphicSel.num>({{graphicSel.num}})</span>
            </a>
          </div>
          <div class="graphic-info-ctt">
            <div v-show="graphicInfoSelClass == 'activity'" class="graphic-info-details" v-html="commodityData.task.itemDescription">
              <!--<p class="fs-18 mb-40">-->
                <!--该活动为9.9元试用活动，请您获得资格后以139.00元到指定平台购买试用品，在您试用完成后试客联盟将返还129.10元至您的互联支付账号；-->
              <!--</p>-->
              <!--<p class="fs-18">温馨提示：</p>-->
              <!--<ul class="fs-18 mb-20">-->
                <!--<li>-->
                  <!--1、请不要使用信用卡、花呗等产生手续费的付款方式下单-->
                <!--</li>-->
                <!--<li>-->
                  <!--2、请不要旺旺索要资格及催促商家返款-->
                <!--</li>-->
                <!--<li>-->
                  <!--3、默认快递：中通快递-->
                <!--</li>-->
              <!--</ul>-->
              <!--<img class="block margin" src="~assets/img/task-details/task_details_07.png" alt="">-->
            </div>
            <div v-show="graphicInfoSelClass == 'report'" class="graphic-info-report">
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
                      <a @click="tryImgShowFunc" ><img src="~assets/img/common/home_24.png" alt=""></a>
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
            <div v-show="graphicInfoSelClass == 'audited'" class="graphic-audited-buyer">
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
              <a href="">
                <img src="~assets/img/common/home_24.png" alt="">
                <p class="cl000">136****666</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="tryImgShow" width="600">
      <div style="text-align:center">
        <img  src="../assets/img/case-demo/taobao-account-demo.jpg" alt="" style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">

      </div>
    </Modal>
    <Modal
      v-model="selWw"
      class-name="vertical-center-modal" ok-text="确定申请" cancel-text="" @on-ok="selWwFunc">
      <p class="fs-18 fb mt-20" style="color: #FF6600">请选择试用旺旺号:</p>
      <p class="fs-14 mt-10">注意：请 <span style="color: #FF6600">务必使用选的旺旺号下单购买</span>，否则订单审核将无法通过！</p>
      <Radio-group class="mt-20" v-model="selectedWw">
        <Radio v-for="ww in wwList.alitms" :label="ww.id">{{ww.alitmAccount}}</Radio>
      </Radio-group>
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
  import api from '../config/apiConfig'
  import {setStorage, getStorage} from '../config/utils'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'task-details',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      TimeDown: TimeDown,
      Alert: Alert
    },
    data () {
      return {
        selWw: false,
        selectedWw: '',
        wwList: {},
        tryImgShow: false,
        commodityData: {
            task:{
              itemCatalog: {
                parentItemCatalog:{

                  }
              }
            }
        },
        graphicInfoSels: [
          {
            text: '活动详情',
            num: '',
            isClass: 'activity'
          },
          {
            text: '试用报告',
            num: '0',
            isClass: 'report'
          },
          {
            text: '已审批秀客',
            num: '9',
            isClass: 'audited'
          }
        ],
        graphicInfoSelClass: 'activity',
        detailsShowkerParams: {
          taskId: '',
          pageIndex: 1
        },
        detailsSuccessShowkerParams: {
          taskId: '',
          pageIndex: 1
        },
      }
    },
    created(){
      let taskId = this.$route.query.taskId;
//      taskId = 423;
      this.getTaskDetails(taskId);
      this.getDetailsShowkerList(taskId);
      this.getDetailsSuccessShowkerList(taskId);
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getRole() {
        return this.$store.state.userInfo.role
      }
    },
    methods: {
      applyForTrialFunc(){
        let self = this;
        if(!self.$store.state.login){
          self.$Modal.warning({
            content: '亲，先登陆哦！',
            onOk: function () {
              self.$router.push({name: 'login'});
            }
          });
        }else {
          this.getShowkerCanTrial();
        }
      },
      getShowkerCanTrial(){
          let self = this;
          api.getShowkerCanTrial({
            taskId: self.$route.query.taskId
          }).then((res) => {
              console.log(res);
              if(res.status){
                self.selWw = true;
                self.wwList = res.data;
              }else {
                if(res.statusCode == 'already_applied'){
                  self.$Modal.warning({
                    content: '<p class="fs-14">亲，你已成功申请，不能二次申请</span>',
                  });
                }else {
                  self.$Modal.warning({
                    content: '<p class="fs-20 f-b">亲，你还没绑定旺旺号 </p><br> <span class="fs-12">请先绑定旺旺号在申请试用!</span>',
                    okText: '去绑定旺旺号',
                    cancelText: '取消',
                    onOk: function () {
                      self.$router.push({path: '/user/personal-setting'});
                    }
                  });
                }

              }
          })
      },
      getDetailsShowkerList(taskId){
        let self = this;
        self.detailsShowkerParams.taskId = taskId;
        api.getDetailsShowkerList(self.detailsShowkerParams).then((res) => {
          console.log(res);
        })
      },
      getDetailsSuccessShowkerList(taskId){
        let self = this;
        self.detailsSuccessShowkerParams.taskId = taskId;
        api.getDetailsSuccessShowkerList(self.detailsSuccessShowkerParams).then((res) => {
          console.log(res);
        })
      },
      getTaskDetails(taskId){
        api.getTaskDetails({taskId: taskId}).then((res) => {
          if(res.status){
            this.commodityData = res.data;
            this.graphicInfoSels[2].num = this.commodityData.showkerApplySuccessCount;
          }else {
            self.$Modal.error({
              content: res.msg,
            });
          }

        })
      },
      selWwFunc(){
        let self = this;
        api.ShowkerApplySelWwId({
          wangwangId: self.selectedWw,
          taskId: self.$route.query.taskId
        }).then((res) => {
          console.log(res)
          if(res.status){
            self.$Modal.success({
              content: '申请成功',
              onOk: function () {
                self.$router.push({name: 'home'});
              }
            });
          }else {
            self.$Modal.error({
              content: res.statusCode,
            });
          }
        })
      },
      tryImgShowFunc(){
        this.tryImgShow = true;
      },
      graphicSelFunc(graphicSel){
        this.graphicInfoSelClass = graphicSel.isClass;
      },
      pageChange(){

      }
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let taskId = this.$route.query.taskId;
//        taskId = 423;
        this.getTaskDetails(taskId);
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .task-details-ctt{
    background-color: #f1f1f1;
    .task-details-top{
      background-color: #fff;
      padding: 10px;
      height: 380px;
      .task-details-top-left{
        margin-right: 50px;
        img{
          width: 360px;
          height: 360px;
          display: block;
        }
      }
      .task-details-top-right{
        padding: 15px 0;
        p{
          line-height: 48px;
        }
        div{
          margin-top: 10px;
          width: 150px;
        }
      }
    }
    .task-details-step{
      height: 80px;
      background-color: #fff;
      margin: 10px 0;
      div.title{
        position: relative;
        width: 60px;
        font-size: 18px;
        padding: 13px 10px 10px 10px;
        background-color: $mainColor;
        font-weight: bold;
        color: #fff;
        text-align: center;
        height: 100%;
        span{
          position: absolute;
          right: -12px;
          top: 50%;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          margin-top: -3px;
          border-left-color:  $mainColor;
        }
      }
      ul.ctt{
        display: table;
        height: 100%;
        padding: 0 10px;
        width: 1140px;
        li{
          display: table-cell;
          vertical-align: middle;
          font-size: 14px;
          width: 16.666%;
          span{
            display: inline-block;
            width: 38px;
            height: 38px;
            line-height: 38px;
            border-radius: 50%;
            background-color: #FFB299;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin: 0 2px;
          }
          em{
            font-style: normal;
            width: 58%;
            display: inline-block;
            vertical-align: middle;
          }
          i{
            font-size: 38px;
            vertical-align: middle;
            color: #ccc;
          }
        }
      }
    }
    .graphic-info{
      background-color: #fff;
      margin-bottom: 60px;
      .graphic-info-sel{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        a{
          display: inline-block;
          font-size: 18px;
          color: #666;
          padding: 0 30px;
          text-align: center;
          border-bottom: 2px solid transparent;
        }
        a.active{
          border-bottom: 2px solid $mainColor;
        }
      }
      .graphic-info-ctt{
        .graphic-info-details{
          padding:20px 20px 40px 20px;
          ul{
            line-height: 36px;
          }
        }
        .graphic-info-report{
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
        .graphic-audited-buyer{
          padding: 40px 0 40px 74px;
          overflow: hidden;
          a{
            display: block;
            margin-right: 66px;
            margin-bottom: 30px;
            float: left;
          }
        }
      }
    }

  }

</style>
