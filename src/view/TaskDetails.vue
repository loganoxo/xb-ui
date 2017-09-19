  <template>
  <div>
    <div class="task-details-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>秀吧</Breadcrumb-item>
            <Breadcrumb-item>秀品专区</Breadcrumb-item>
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
              单品活动担保金：<span class="fs-18">{{(commodityData.task.perMarginNeed/100).toFixed(2)}}</span>元
              &nbsp;&nbsp;&nbsp;&nbsp;
              活动份数：<span class="fs-18"> {{commodityData.task.taskCount}} </span>份
            </p>
            <p class="fs-14">（商家已存入总活动担保金&nbsp;{{commodityData.task.totalMarginNeed/100}}&nbsp;元，请放心申请）</p>
            <p class="fs-14">{{commodityData.task.showkerApplyTotalCount}} 人申请，{{parseInt(commodityData.trailOn) ? commodityData.trailOn : 0}} 人正在参与活动，{{parseInt(commodityData.trailDone) ? commodityData.trailDone : 0}} 人完成活动， 剩余 {{commodityData.task.taskCount - commodityData.task.showkerApplySuccessCount}} 份</p>
            <p class="fs-14">
              <i class="ivu-icon ivu-icon-clock fs-16"></i>
              距申请结束：
              <time-down color="#495060" size="20" :endTime="commodityData.task.endTime" ></time-down>&nbsp;
              <!--<span class="fs-24">17</span> 天 <span class="fs-24">02</span> 小时 <span class="fs-24">56</span> 分钟 <span class="fs-24">31</span> 秒-->
            </p>
            <div v-if="getRole === 0 && isLogin">
              <iButton v-show="!commodityData.taskApply" :disabled="taskApplyLoading"  size="large" class="fs-16 default-btn" long type="error" @click="applyForTrialFunc">申请活动</iButton>
              <iButton v-show="commodityData.taskApply" disabled size="large" class="fs-16 default-btn" long >已申请</iButton>
            </div>
            <iButton v-if="getRole === 1 && isLogin " size="large" class="fs-16 default-btn"  type="warning" style="width: 200px;">商家号不可以参加活动</iButton>
            <a v-if="!isLogin "  class="ivu-btn ivu-btn-error ivu-btn-large" @click="selectLogin = true" style="width: 150px;">
                申请活动
            </a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-details-step">
            <div class="left title"> 秀吧流程<span></span></div>
            <ul class="left ctt">
              <li>
                <span>1</span>
                <em>提交申请</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>2</span>
                <em>商家审核，通过后即可获得秀客资格 </em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>3</span>
                <em> 按照商家指定的方式，以{{(commodityData.task.perMarginNeed/100).toFixed(2)}}的价格购买本宝贝</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>4</span>
                <em>收到宝贝后，提交买家秀</em>
                <i class="ivu-icon ivu-icon-chevron-right" ></i>
              </li>
              <li>
                <span>5</span>
                <em> 商家返还{{(commodityData.task.perMarginNeed/100).toFixed(2)}}元到您的平台账户（可提现），圆满结束 </em>
              </li>
              <!--<li>-->
                <!--<span>6</span>-->
                <!--<em>获得试用资格</em>-->
              <!--</li>-->
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
            <div v-show="graphicInfoSelClass == 'activity'" class="graphic-info-details" >
              <div class="text-ct" v-if="!commodityData.cannotShowItemDescriptionOfQualification"  v-html="commodityData.task.itemDescription">

              </div>
              <div class="fs-18 text-ct" v-else >
                <Icon type="information-circled" color="#FF6633" size="30" style="vertical-align: sub;"></Icon> 获得资格后才能看到活动品信息哦~
                <div v-if="getRole === 0 && isLogin" style="display: inline-block">
                  <iButton v-show="!commodityData.taskApply" :disabled="taskApplyLoading"  style="width: 100px;" size="large" class="fs-16 default-btn ivu-btn-small"  type="error" @click="applyForTrialFunc">申请活动</iButton>
                  <iButton v-show="commodityData.taskApply" disabled size="large" class="fs-16 default-btn" long >已申请</iButton>
                </div>
                <a v-if="!isLogin "  class="ivu-btn ivu-btn-error ivu-btn-small" @click="selectLogin = true" style="width: 100px;">
                  申请活动
                </a>
              </div>

            </div>
            <div v-show="graphicInfoSelClass == 'report'" class="graphic-info-report">
              <ul v-if="detailsShowkerList.length > 0">
                <li v-for="detailsShowker in detailsShowkerList">
                  <div>
                    <img :src="detailsShowker.showkerPortraitPic" alt="" width="100px">
                    <p>{{detailsShowker.showkerPhone}}</p>
                  </div>
                  <div>
                    <p>发表于{{detailsShowker.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
                    <p class="text">
                      {{detailsShowker.trialReportText}}
                      <router-link :to="{'path':'/trial-report','query':{'showkerId': detailsShowker.showkerId, 'showReportDesc': true, 'id': detailsShowker.id }}">查看全文</router-link>
                    </p>
                    <p>
                      <a v-for="trialReportImage in detailsShowker.trialReportImages"   @click="trialReportPicShowFunc(trialReportImage)">
                        <img :src="trialReportImage" alt="">
                      </a>
                    </p>

                  </div>
                </li>
              </ul>
              <div v-if="detailsShowkerList.length <=0" class="fs-14 text-ct pt-20 pb-20">
                暂无数据
              </div>
              <div class="text-ct pd-tb-20" v-if="detailsShowkerList.length > 0">
                <Page
                  :total= totalElements
                  :page-size = 5
                  @on-change = pageChange
                  show-elevator
                ></Page>
              </div>
            </div>
            <div v-show="graphicInfoSelClass == 'audited'" class="graphic-audited-buyer">
              <router-link :to="{ 'path': '/trial-report','query': {'showkerId': detailsSuccessShowker.showkerId}}" :key="detailsSuccessShowker.id" v-show="detailsSuccessShowkerList.length > 0 "  v-for="detailsSuccessShowker in detailsSuccessShowkerList">
                <img :src="detailsSuccessShowker.showkerPortraitPic" width="68px" alt="">
                <p class="cl000">{{detailsSuccessShowker.showkerPhone}}</p>
              </router-link>
              <p v-show="detailsSuccessShowkerList.length <= 0 " class="text-ct fs-14">
                暂无已通过的申请秀客
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="selWw" class-name="vertical-center-modal" ok-text="确定" cancel-text="" @on-ok="selWwFunc(wwList)">
      <p class="fs-18 fb mt-20" style="color: #FF6600">请选择活动旺旺号:</p>
      <p class="fs-14 mt-10">注意：请 <span style="color: #FF6600">务必使用选的旺旺号下单购买</span>，否则订单审核将无法通过！</p>
      <Radio-group class="mt-20" v-model="selectedWw">
        <Radio v-for="ww in wwList" :label="ww.id" :key="ww.id" :disabled="wwState[ww.status].disabled">
          {{ww.alitmAccount}}
          <span v-if="wwState[ww.status].text">({{wwState[ww.status].text}})</span>
        </Radio>
      </Radio-group>
      <span v-if="!canUseWw" style="color: #FF6600">（无可用旺旺号）</span>
    </Modal>
    <Modal v-model="applySuccess" width="500">
      <p class="mt-20 mb-20 text-ct fs-22" style="height: 50px;line-height: 50px">
        <Icon type="checkmark-circled" color="#3E9D3E" :size="40" style="vertical-align: sub;"></Icon>
        提交申请成功，请耐心等待商家审核
      </p>
      <div slot="footer" class="text-ct">
        <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40" to="/user/my-probation/wait" style="color: #fff">看看我申请的宝贝</router-link>
        <a href="" class="ivu-btn ivu-btn-error ivu-btn-large" style="color: #fff">好的，明白了</a>
      </div>
    </Modal>
    <Modal v-model="selectLogin" width="500">
      <p class="mt-20 mb-40 text-ct fs-22 vtc-mid" style="height: 50px;line-height: 50px">
        <i class="ivu-icon ivu-icon-android-alert " style="color: #FF6600; font-size: 20px;"></i>
        亲，你还没登录哦~
        <br>
        <span class="fs-12">请先登录后再申请免费活动</span>
      </p>
      <div slot="footer" class="text-ct">
        <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40 ml-20" to="/login" style="color: #fff">马上登录</router-link>
        <router-link class="ivu-btn ivu-btn-error ivu-btn-large mr-40" to="/sel-role" style="color: #fff">新用户注册</router-link>
      </div>
    </Modal>
    <Modal v-model="trialReportPicShow" width="600">
      <div style="text-align:center">
        <img :src="trialReportPic" alt="" style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="alitNumSuccess" cancel-text="" ok-text="去绑定旺旺号" @on-ok="goWwBind()">
      <div class="ivu-modal-confirm-body"><div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning">
        <i class="ivu-icon ivu-icon-android-alert vtd-mid"></i></div><div><p class="fs-20 f-b">亲，你还没绑定旺旺号 </p><br> <span class="fs-12">请先绑定旺旺号在申请活动!</span></div>
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
  import api from '@/config/apiConfig'
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
        taskApplyLoading: false,
        alitNumSuccess: false,
        selectLogin: false,
        trialReportPicShow: false,
        trialReportPic: '',
        selWw: false,
        selectedWw: '',
        wwList: {},
        tryImgShow: false,
        applySuccess: false,
        totalElements: 1,
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
            isClass: 'activity',
            callback: ''
          },
          {
            text: '买家秀',
            num: '',
            isClass: 'report',
            callback: this.getDetailsShowkerList
          },
          {
            text: '已审批秀客',
            num: '',
            isClass: 'audited',
            callback:  this.getDetailsSuccessShowkerList
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
        detailsShowkerList: [],
        detailsSuccessShowkerList: [],
        wwState: [
          {
            state: 0,
            text: "未申请审核",
            disabled: true,
          },
          {
            state: 1,
            text: "审核中",
            disabled: true,
          },
          {
            state: 2,
            text: "",
            disabled: false,
          },
          {
            state: 3,
            text: "审核未通过",
            disabled: true,
          },
          {
            state: 4,
            text: "冻结",
            disabled: true,
          },
          {
            state: 5,
            text: "停用",
            disabled: true,
          },
        ],
        canUseWw: false,
      }
    },
    created(){
      let self = this;
      self.getTaskDetails();
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
        self.taskApplyLoading = true;
        api.getShowkerCanTrial({
          taskId: self.$route.query.taskId
        }).then((res) => {
          self.taskApplyLoading = false;
          if(res.status){
            self.selWw = true;
            let selRes = false;
            self.wwList = res.data;
            for(let i = 0, j = res.data.length; i < j; i++){
              if(res.data[i].status === 2){
                selRes = true;
                self.canUseWw = true;
                break;
              }
            }
          }else {
            if(res.statusCode === 'alitm_null'){
              self.alitNumSuccess = true;
            }else {
              self.$Modal.warning({
                content: '<p class="fs-14">' + res.msg + '</span>',
              });
            }
          }
        })
      },
      goWwBind(){
        this.$router.push({path: '/user/personal-setting/ww-bind'});
      },
      getDetailsShowkerList(){
        let self = this;
        self.detailsShowkerParams.taskId = self.$route.query.taskId;
        api.getDetailsShowkerList(self.detailsShowkerParams).then((res) => {
          if(res.status){
            for(let i = 0, j = res.data.content.length; i < j; i++){
              res.data.content[i].trialReportImages = JSON.parse(res.data.content[i].trialReportImages);
            }
            self.detailsShowkerList = res.data.content;
            self.totalElements = res.data.totalElements;
            self.graphicInfoSels[1].num = res.data.totalElements;
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getDetailsSuccessShowkerList(){
        let self = this;
        self.detailsSuccessShowkerParams.taskId = self.$route.query.taskId;
        api.getDetailsSuccessShowkerList(self.detailsSuccessShowkerParams).then((res) => {
          if(res.status){
            self.detailsSuccessShowkerList = res.data.content;

            this.graphicInfoSels[2].num = res.data.totalElements;
          }
        })
      },
      getTaskDetails(){
        let self = this;
        api.getTaskDetails({taskId: self.$route.query.taskId}).then((res) => {
          if(res.status){
            self.commodityData = res.data;
            self.$store.commit({
              type: 'TASK_CATEGORY_LIST',
              info: self.commodityData.task.itemCatalog.parentItemCatalog.id
            });
            parseInt(res.data.trailDone) ? self.graphicInfoSels[1].num = res.data.trailDone : self.graphicInfoSels[1].num = 0;
            if(parseInt(res.data.task.showkerApplySuccessCount) || parseInt(res.data.trialEnd)){
                debugger
              self.graphicInfoSels[2].num = parseInt(res.data.task.showkerApplySuccessCount) + parseInt(res.data.trailEnd)
            }else{
              self.graphicInfoSels[2].num = 0;
            }
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }

        })
      },
      selWwFunc(alitms){
        let self = this;
        let selRes = false;
        for(let i = 0, j = alitms.length; i < j; i++){
          if(alitms[i].status == 2){
            selRes = true;
            break;
          }
        }
        if(selRes){
          if(self.selectedWw == ''){
            this.$Message.info({
              content: '请选择旺旺号',
            });
          }else {
            api.ShowkerApplySelWwId({
              wangwangId: self.selectedWw,
              taskId: self.$route.query.taskId
            }).then((res) => {
              if(res.status){
                self.applySuccess = true;
              }else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          }

        }else {
          this.$Message.info({
            content: '无可用旺旺号',
          });
        }

      },
      graphicSelFunc(graphicSel){
        this.graphicInfoSelClass = graphicSel.isClass;
        if (typeof graphicSel.callback === 'function') {
          graphicSel.callback();
        }else {
          return;
        }
      },
      pageChange(data){
        this.detailsShowkerParams.pageIndex = data;
        this.getDetailsShowkerList();
      },
      trialReportPicShowFunc(trialReportImage){
        this.trialReportPicShow = true;
        this.trialReportPic = trialReportImage;
      },
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let taskId = this.$route.query.taskId;
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
        width: 770px;
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
          width: 20%;
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
              border-bottom: 1px solid #ddd;
              width: 100%;
              div{
                display: table-cell;
                vertical-align: middle;
              }
              >div:first-child{
                width: 150px;
                text-align: center;
              }
              >div:last-child{
                width: 1000px;
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
