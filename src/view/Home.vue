<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left mr-10">
            <ul :class="[leftTopSlider ? 'slider-top-active' : 'slider-top-default']" @mouseover="clearLeftTopSliderFunc()" @mouseleave="leftTopSliderFunc()">
              <li v-for="taskTopLeft in taskTopLeftList">
                <router-link :to="{path:'/task-details', query:{q: encryptionId(taskTopLeft.task.id)}}" :title="taskTopLeft.task.taskName" class="block">
                  <div class="left img-box">
                    <img :src="taskTopLeft.task.taskMainImage + '!thum54'" alt="" width="54" height="54">
                  </div>
                  <div class="left text-box ml-10">
                    <p>秀客{{taskTopLeft.showkerPhone}}免费领取了</p>
                    <p>
                      价值<span class="text ml-5">￥{{taskTopLeft.task.itemPrice / 100}}</span> 的宝贝
                    </p>
                    <span style="color: #999;">
                      {{
                                     (new Date() -taskTopLeft.createTime)/1000 < 60   ?  1 :
                                  (new Date() -taskTopLeft.createTime)/1000/60 < 60   ? parseInt((new Date() -taskTopLeft.createTime)/1000/60) :
                              (new Date() -taskTopLeft.createTime)/1000/60/60/24 < 1  ? parseInt((new Date() -taskTopLeft.createTime)/1000/60/60) :
                          parseInt((new Date() -taskTopLeft.createTime)/1000/60/60/24)
                      }}
                    </span>
                    <span style="color: #999;" v-if="(new Date() -taskTopLeft.createTime)/1000/60 < 60 || (new Date() -taskTopLeft.createTime)/1000 < 60">
                      分钟前
                    </span>
                    <span style="color: #999;" v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 < 1 && (new Date() -taskTopLeft.createTime)/1000/60 >= 60">
                      小时前
                    </span>
                    <span style="color: #999;" v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 >= 1">
                      天前
                    </span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div  class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000">
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/home/banner_01.jpg" alt="">
                </router-link>

              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/home/banner_02.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                 <img class="block" src="~assets/img/home/banner_03.jpg" alt="">
                </router-link>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="login-up-box" v-if="!isLogin">
              <div class="portrait-box">
                <img src="~assets/img/common/home_24.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-20 default-login">
                <router-link  to="/sel-role">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
              <div class="text-ct mt-10">
                <a  href="https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101432052&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fwww.xiuba365.com%2Fqq-login" >
                  <img style="vertical-align: -7px;"   src="~assets/img/common/qq_logo.png" alt="">
                  使用QQ登录秀吧
                </a>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 0">
              <div>
                <router-link to="/user/user-home" class="left">
                  <img class="block ml-20 portrait-img" :src="$store.state.userInfo.portraitPic" alt="">
                </router-link>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>
                    <router-link to="/user/user-home">
                     Hi~ 秀客 {{decodeURIComponent(getUserInfoPhone)}}
                    </router-link>
                  </p>
                  <router-link to="/user/user-home">个人中心</router-link>
                  <a @click="goOut">[ 退出登录 ]</a>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：<router-link  to="/user/my-probation/pass">{{trialCount.underWayShowkerTask}}</router-link> 个</p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/my-probation/pass',query:{status:'pass_and_unclaimed'}}">{{trialCount.passAndUnclaimedShowkerTask}}</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/my-probation/pass',query:{status:'trial_report_waiting_submit'}}">{{trialCount.trialReportWaitingSubmitShowkerTask}}</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/my-probation/pass',query:{status:'order_num_error'}}">{{trialCount.orderNumErrorShowkerTask + trialCount.trialReportUnqualifiedShowkerTask}}</router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;">待下单</span>
                  <span class="left text-ct" style="width: 33.33%;">待交买家秀</span>
                  <span class="left text-ct" style="width: 33.33%;">待修改</span>
                </div>
                <p class="clear-both pt-10">
                  <router-link to="/user/my-probation/pass" class="ivu-btn ivu-btn-long">
                    进入我的活动
                  </router-link>
                </p>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 1">
              <div>
                <router-link to="/user/user-home" class="left">
                  <img class=" ml-20 portrait-img block" :src="$store.state.userInfo.portraitPic" alt="">
                </router-link>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>
                    <router-link to="/user/user-home">
                      Hi~ 商家 {{decodeURIComponent(getUserInfoPhone)}}
                    </router-link>
                  </p>
                  <div v-if="getUserInfoRole === 1&& !getMemberLevel" class="fs-12">
                    <Icon type="social-vimeo" style="color: gray"></Icon>
                    <span>非会员</span>
                    <router-link to="/user/vip-member" >马上开通会员</router-link>
                  </div>
                  <div v-if="getUserInfoRole === 1&&getMemberLevel" class="fs-12">
                    <Icon type="social-vimeo" style="color: red"></Icon>
                    <span>到期时间:{{Math.ceil((parseInt(getMemberDeadline) -parseInt( (new Date().getTime())))/86400000)}}天</span>
                    <router-link to="/user/vip-member" >续费</router-link>
                  </div>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link  :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">{{trialCount.underWayTask}} </router-link> 个
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/task-management/wait'}">{{trialCount.waitingAuditTaskApply}} </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/task-management/pass',query:{status:'orderNum'}}">{{trialCount.orderNumWaitingAuditShowkerTask}}</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/task-management/pass',query:{status:'trialReport'}}">{{trialCount.trialReportWaitingConfirmShowkerTask}}</router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;">待审秀客</span>
                  <span class="left text-ct" style="width: 33.33%;">待审订单</span>
                  <span class="left text-ct" style="width: 33.33%;">待审买家秀</span>
                </div>
                <p class="clear-both pt-10">
                  <router-link v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) <= 0 " to="/user/task-release" class="ivu-btn ivu-btn-success ivu-btn-long">
                    免费发布活动
                  </router-link>
                  <router-link v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) > 0 " to="/user/task-release" class="ivu-btn ivu-btn-error ivu-btn-long">
                    继续发布活动
                  </router-link>
                </p>
              </div>
            </div>
            <div class="notice-box">
              <p>
                <a v-for="notice in noticeList" :class="[noticeActive == notice.active ? 'active' : '']" @click="changeNoticeTab(notice)">{{notice.title}}</a>
              </p>
              <div v-for="(notice,index) in noticeList" v-show="noticeActive == notice.active" :key="index" class="notice-text animated fadeIn" >
                <router-link  v-for="(content,index) in notice.content" :key="index" :to="{path: content.url, query: {page: content.page, qusNum: content.qusNum}}" class="circle-text">{{content.text}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="home-commodity">
          <div class="home-commodity-title">
            <img src="~assets/img/home/home_15.png" alt="">
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
              v-for="homeCommodity in homeCommodityList"
              :title="homeCommodity.taskName"
              :key="homeCommodity.id"
              :to="{ 'path': '/task-details','query': {'q': encryptionId(homeCommodity.id)}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeCommodity.taskMainImage + '!orgi75'" alt="" style="width: 100%; height: 208px;">
              </div>
              <div class="home-commodity-text">
                <p class="home-commodity-title">{{homeCommodity.taskName}}</p>
                <p class="home-commodity-price">
                  <span class="left">￥{{homeCommodity.itemPrice/100}}</span>
                  <!--<span class="right">免费活动</span>-->
                </p>
                <p class="home-commodity-apply">
                  限量 <span style="color: #ff6600"> {{homeCommodity.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{homeCommodity.showkerApplyTotalCount || 0}} </span> 人已申请
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeCommodity.id)}}" class="ivu-btn ivu-btn-long" >
                    免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
            <p class="text-ct">
              <router-link class="ivu-btn" :to="{ 'path': '/task-category', 'query': {'searchKey': 'all'}}">查看全部活动</router-link>
            </p>
          </div>
        </div>
      </div>
      <!--历史活动开始-->
      <div class="container" style="margin-top: 10px;">
        <div class="home-commodity">
          <div class="home-commodity-title">
            <img src="/static/img/home/home_25.png" alt="">
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         v-for="homeHistory in homeHistoryList"
                         :title="homeHistory.taskName"
                         :key="homeHistory.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeHistory.id)}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeHistory.taskMainImage + '!orgi75'" alt="" style="width: 100%; height: 208px;">
              </div>
              <div class="home-commodity-text">
                <p class="home-commodity-title">{{homeHistory.taskName}}</p>
                <p class="home-commodity-price">
                  <span class="left">￥{{homeHistory.itemPrice/100}}</span>
                  <!--<span class="right">免费活动</span>-->
                </p>
                <p class="home-commodity-apply">
                  限量 <span style="color: #ff6600"> {{homeHistory.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{homeHistory.showkerApplyTotalCount || 0}} </span> 人已申请
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeHistory.id)}}" class="ivu-btn ivu-btn-long" >
                    查看详情
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--历史活动结束-->
      <div class="container">
        <div class="home-bottom mt-20">
          <img v-if="!$store.state.onlyShowkerShow" class="ml-5" src="~assets/img/home/home_23.png" alt="">
          <img v-if="$store.state.onlyShowkerShow" class="ml-5" src="~assets/img/home/home_24.png" alt="">
        </div>
      </div>
    </div>
    <Modal v-model="wechartAlertShow" width="550" @on-cancel="cancelWeiChartFunc">
      <div style="text-align: right;margin-right: 11px;position: relative;top: -2px;">
        <Checkbox-group  v-model="wechartShowAgain">
          <Checkbox label="true">不再提醒</Checkbox>
        </Checkbox-group>

        <!--<p v-show="getUserInfoRole == 0" class="ml-10" style="position: absolute;bottom: 90px;left: 21px; height: 30px; line-height: 30px;">-->
          <!--<span class="left fs-14 mr-10" style="color: #ff6633;">特权口令：</span>-->
          <!--<iInput v-model="command"  class="left mr-10" style="width:150px;"></iInput>-->
          <!--<iButton class="left" type="error" @click="setWeChartAlertFunc(0)" >提交</iButton>-->
        <!--</p>-->
        <img style="position: absolute;top: 0;" src="/static/img/home/wechart_alert_01.png"  alt="">
        <img v-show="getUserInfoRole == 1" src="/static/img/home/wechart_alert_03.png" alt="" style="width: 100%; margin-top: 20px">
        <p v-show="getUserInfoRole == 1" class="ml-10" style="position: absolute;bottom: 111px;left: 21px; height: 30px; line-height: 30px;">
          <span class="left fs-12 ml-10" style="color: #ff6633;">特权口令：</span>
          <iInput v-model="command" class="left mr-10" style="width:150px;"></iInput>
          <iButton  class="left" type="error" @click="setWeChartAlertFunc(1)" >提交</iButton>
        </p>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="$store.state.wechartShow" width="550" @on-cancel="cancelWeiChartFunc">
      <div style="text-align: right;margin-right: 11px;position: relative;top: -2px;">
        <Checkbox-group  v-model="wechartShowAgain">
          <Checkbox label="true">不再提醒</Checkbox>
        </Checkbox-group>
        <img v-show="getUserInfoRole == 0" src="/static/img/home/wechart_alert_06.jpg" alt="" style="width: 100%; margin-top: 20px">
        <!--<p v-show="getUserInfoRole == 0" class="ml-10" style="position: absolute;bottom: 90px;left: 21px; height: 30px; line-height: 30px;">-->
        <!--<span class="left fs-14 mr-10" style="color: #ff6633;">特权口令：</span>-->
        <!--<iInput v-model="command"  class="left mr-10" style="width:150px;"></iInput>-->
        <!--<iButton class="left" type="error" @click="setWeChartAlertFunc(0)" >提交</iButton>-->
        <!--</p>-->
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>

</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, encryption} from '@/config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import Carousel from 'iview/src/components/carousel'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    beforeMount() {
      let self = this;
      self.changeTopShow();
      if( getStorage('weChartPop') == 1 && self.$store.state.userInfo.role == 0 && !  getStorage('setWeChartshower' + self.$store.state.userInfo.phone)){
        self.weChartShowkerAlertFunc();
      }
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
    },
    data () {
      return {
        command: '',
        wechartAlertShow: false,
        wechartShowAgain: [],
        leftTopSliderTimer: '',
        leftTopSlider: false,
        trialCount: {},
        homeCommodityList:[],
        homeHistoryList: [],
        noticeList:[
          {
            title: '常见问题',
            content: [
              {
                url: '/user/help-center/faq',
                text: '平台有哪些活动？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq',
                text: '注册秀吧收费么？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq',
                text: '支持哪几个平台试用活动？',
                page: 'common',
                qusNum: '4'
              },
              {
                url: '/user/help-center/faq',
                text: '平台能提现吗？提现需要手续费吗？',
                page: 'common',
                qusNum: '11'
              },
            ],
            active: 'faq'
          },
          {
            title: '秀客问题',
            content: [
              {
                url: '/user/help-center/faq-showker',
                text: '秀客完整流程？',
                page: 'special'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '秀客下单规则？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '下单需要垫付么？',
                page: 'common',
                qusNum: '3'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '商家如何返款？',
                page: 'common',
                qusNum: '7'
              },
            ],
            active: 'buyerRule'
          },
          {
            title: '商家问题',
            content: [
              {
                url: '/user/help-center/faq-seller',
                text: '商家活动完整流程？',
                page: 'special'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '商家活动支持哪几种搜索/下单渠道？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '商家发布活动如何收费？',
                page: 'common',
                qusNum: '5'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '什么条件下可以申请活动结算？',
                page: 'common',
                qusNum: '11'
              },
            ],
            active: 'sellerRule'
          },
        ],
        noticeActive: 'faq',
        taskTopLeftList: [],
      }
    },
    created(){
      if(this.$store.state.login){
        this.weChartAlertFunc();
      }
      this.getHomeTaskList();
      this.getHomeTaskTopLeftList();
      this.personalTrialCount();
      this.getHomeHistoryList();
//      this.$store.commit({
//        type: 'TASK_CATEGORY_LIST',
//        info: 'home'
//      });
//      if(this.$route.query.onlyShowkerShow){
//        this.$store.commit({
//          type: 'ONLY_SHOWKER_SHOW',
//        });
//      }
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
      getMemberDeadline:function () {
        return this.$store.state.userInfo.memberDeadline
      },
      getMemberLevel:function () {
        return this.$store.state.userInfo.memberLevel
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        let self = this;
        self.leftTopSliderFunc();
      })
    },

    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      ...mapMutations({
        changeTopShow: 'CHANGE_TOP_SHOW'
      }),
      encryptionId(id){
        return encryption(id);
      },
      weChartShowkerAlertFunc(){
        let self = this;
        self.$store.commit({
          type: 'SET_WECHART_SHOW',
          result: true
        });
        setStorage('weChartPop', 2);
      },
      weChartAlertFunc(){
        let self = this;
        api.checkWechartAlert().then((res) => {
          if(res.status && getStorage('weChartPop') == 1){
            self.wechartAlertShow = true;
            setStorage('weChartPop',2)
          }else {
            self.wechartAlertShow = false;
          }
        })
      },

      setWeChartAlertFunc(role){
        let self = this;
        let commandList = {
          0: 1788,
          1: 9188
        };
        if(self.command === ''){
          self.$Message.error('口令不能为空');
        }else {
          if(parseInt(self.command) === parseInt(commandList[role])){
            self.setWechartAlert()
          }else {
            self.$Message.error('口令输入错误');
          }
        }
      },
      setWechartAlert(){
        let self = this;
        api.setWechartAlert({
          command: self.command,
        }).then((res) => {
          if(res.status){
            self.wechartAlertShow = false;
            self.$Message.success({
              content:'恭喜您成功获得一个月VIP会员',
              onClose: function () {
                self.$store.dispatch('getUserInformation');
              }
            });
          }else {
            self.$Message.error(res.msg);
          }
        });
      },
      cancelWeiChartFunc(){
        let self = this;
        if(self.wechartShowAgain != ''){
          if(self.$store.state.userInfo.role == 1){
            api.noWechartAlert().then((res) => {
              if(!res.status){
                self.$Message.error(res.msg)
              }
            })
          }else {
            setStorage('setWeChartshower' + self.$store.state.userInfo.phone , '1')
          }
        }
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
      personalTrialCount(){
        let self = this;
        if(self.$store.state.login){
          if(self.getUserInfoRole === 0){
            api.showkerPersonalTrialCount().then((res) => {
              if(res.status){
                self.trialCount = res.data
              }else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          }else {
            api.sellerPersonalTrialCount().then((res) => {
              if(res.status){
                self.trialCount = res.data
              }else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          }
        }
      },
      getHomeTaskTopLeftList(){
        let self = this;
        api.getHomeTaskTopLeftList().then((res) => {
          if(res.status){
            self.taskTopLeftList = res.data;

          }else {

          }
        })
      },
      getHomeTaskList(){
        let self = this;
        api.getHomeTaskList().then((res) => {
          if(res.status){
            if(res.data){
              self.homeCommodityList = res.data;
            }
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getHomeHistoryList(){
        let self = this;
        api.getHomeHistoryList().then((res) => {
          if(res.status){
            if(res.data){
              self.homeHistoryList = res.data;
            }
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      leftTopSliderFunc(){
        let self = this;
        self.leftTopSliderTimer = setInterval(function () {
          if(self.leftTopSlider){
            let part = self.taskTopLeftList.splice(0,1);
            self.taskTopLeftList = self.taskTopLeftList.concat(part);
          }
          self.leftTopSlider = !self.leftTopSlider;
        },1500)
      },
      clearLeftTopSliderFunc(){
        let self = this;
        clearInterval(self.leftTopSliderTimer);
      },
      changeNoticeTab(notice){
        this.noticeActive = notice.active;
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import 'src/css/mixin';
  .home-ctt {
    background-color: #F1F1F1;
    .home-section {
      margin: 10px auto 10px auto;
      overflow: hidden;
      .left-ctt {
        background-color: #fff;
        width: 285px;
        height: 400px;
        ul {
          padding: 15px 20px;
          li {
            margin-bottom: 20px;
            overflow: hidden;
            height: 57px;
            div.text-box{
              p{
                font-size: 14px;
                color: #999;
                span.text{
                  color: $mainColor;
                  font-weight: bold;
                }
              }

            }
          }
        }
      }
      .middle-ctt{
        width: 610px;
      }
      .right-ctt{
        float: right;
        width: 285px;
        height: 400px;
        .login-up-box{
          background-color: #fff;
          padding: 15px;
          height: 205px;
          margin-bottom: 10px;
          .portrait-box{
            img{
              display: block;
              margin: auto auto 15px auto;
              width: 56px;
            }
          }

          p{
            text-align: center;
          }
          .default-login{
            a{
              display: inline-block;
              width: 119px;
              background-color: $mainColor;
              color: #fff;
              text-align: center;
              height: 30px;
              line-height: 30px;
              &:first-child{
                margin-right: 10px;
              }
            }
          }

        }
        .login-in-box{
          background-color: #fff;
          padding: 15px;
          height: 205px;
          margin-bottom: 10px;
          img.portrait-img{
            width: 56px;
            border-radius: 50%;
          }
        }
        .notice-box{
          background-color: #fff;
          height: 185px;
          p{
            display: table;
            width: 100%;
            height: 30px;
            a{
              color: #999;
              text-align: center;
              display: table-cell;
              vertical-align: middle;
              width: 33.33%;
              border-bottom: 1px solid #ddd;
            }
            a.active{
              border-right: 1px solid #ddd;
              border-left: 1px solid #ddd;
              border-top: 1px solid #ddd;
              border-bottom: none;
            }
          }
          .notice-text{
            padding: 8px 0 0 20px;
            a{
              display: block;
              line-height: 35px;
              height: 35px;
              color: #999;
            }
          }
        }
      }
    }
    .home-commodity{
      background-color: #fff;
      border: 1px solid #E8E8E8;
      .home-commodity-title{
        img{
          display: block;
          margin: 28px auto 10px auto;
        }
        p{
          color: #999;
        }
      }
      .home-commodity-ctt{
        padding: 24px;
        text-align: left;
        .home-commodity-details{
          width: 222px;
          display: inline-block;
          margin: 0 4px 30px 4px;
          padding: 0 5px 20px 5px;
          .home-commodity-img{
            border: 1px solid #ddd;
          }
          .home-commodity-text{
            background-color: #EEEEEE;
            padding: 5px 5px 8px 5px;
            p{
              line-height: 28px;
              height: 28px;
              font-size: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            p.home-commodity-title{
              color: #000;
              text-align: left;
            }
            p.home-commodity-price{
              color: #FF6633;
            }
            p.home-commodity-apply{
              color: #000;
            }
            p.home-commodity-take{
              height: 40px;
              line-height: 40px;
            }
          }
        }

      }
    }
  }

  .slider-top-active{
    margin-top: -77px;
    animation: sliderTop 1s;
  }
  .slider-top-default{
    margin-top: 0;
  }
  @keyframes  sliderTop{
    0% {
      margin-top: 0;
    }
    100%{
      margin-top: -77px;
    }
  }

</style>
