<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left mr-10">
            <ul :class="[leftTopSlider ? 'slider-top-active' : 'slider-top-default']" @mouseover="clearLeftTopSliderFunc()" @mouseleave="leftTopSliderFunc()">
              <li v-for="taskTopLeft in taskTopLeftList">
                <router-link :to="{path:'/task-details', query:{taskId: taskTopLeft.task.id }}" :title="taskTopLeft.task.taskName" class="block">
                  <div class="left img-box">
                    <img :src="taskTopLeft.task.taskMainImage" alt="" width="54px">
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
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000">
              <Carousel-item>
                <router-link to="/sel-role" class="block">
                  <img class="block" src="~assets/img/home/banner_01.jpg" alt="">
                </router-link>

              </Carousel-item>
              <Carousel-item>
                <router-link to="/sel-role" class="block">
                  <img class="block" src="~assets/img/home/banner_02.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="/sel-role" class="block">
                 <img class="block" src="~assets/img/home/banner_03.jpg" alt="">
                </router-link>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="login-up-box" v-if="!isLogin">
              <div>
                <img src="~assets/img/common/home_24.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-10">
                <router-link  to="/sel-role">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 0">
              <div>
                <img class="left ml-20" src="~assets/img/common/home_24.png" alt="">
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>Hi~ 秀客 {{getUserInfoPhone}}</p>
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
                  <span class="left text-ct" style="width: 33.33%;">待领取</span>
                  <span class="left text-ct" style="width: 33.33%;">待交买家秀</span>
                  <span class="left text-ct" style="width: 33.33%;">待修改</span>
                </div>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 1">
              <div>
                <img class="left ml-20" src="~assets/img/common/home_24.png" alt="">
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>Hi~ 商家 {{getUserInfoPhone}}</p>
                  <router-link to="/user/user-home">个人中心</router-link>
                  <a @click="goOut">[ 退出登录 ]</a>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link  to="/user/activity-management/list">{{trialCount.underWayTask}} </router-link> 个
                  &nbsp;<router-link to="/user/task-release">免费发布活动</router-link>
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">{{trialCount.waitingAuditTaskApply}} </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">{{trialCount.orderNumWaitingAuditShowkerTask}}</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">{{trialCount.trialReportWaitingConfirmShowkerTask}}</router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;">待审秀客</span>
                  <span class="left text-ct" style="width: 33.33%;">待审订单</span>
                  <span class="left text-ct" style="width: 33.33%;">待审买家秀</span>
                </div>
              </div>
            </div>
            <div class="notice-box">
              <p>
                <a v-for="notice in noticeList" :class="[noticeActive == notice.active ? 'active' : '']" @click="changeNoticeTab(notice)">{{notice.title}}</a>
              </p>
              <div v-for="notice in noticeList" v-show="noticeActive == notice.active" class="notice-text animated fadeIn" >
                <a  v-for="content in notice.content" :href="content.url" class="circle-text">{{content.text}}</a>
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
              :to="{ 'path': '/task-details','query': {'taskId': homeCommodity.id}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeCommodity.taskMainImage" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="home-commodity-text">
                <p>{{homeCommodity.taskName}}</p>
                <p>
                  <span class="left">￥{{homeCommodity.itemPrice/100}}</span>
                  <span class="right">免费活动</span>
                </p>
              </div>
            </router-link>
            <p class="text-ct">
              <router-link class="ivu-btn" :to="{ 'path': '/task-category/all', 'query': {'searchKey': 'all'}}">查看全部活动</router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="home-bottom mt-20">
          <img src="~assets/img/home/home_23.png" alt="">
        </div>
      </div>
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
  import api from '@/config/apiConfig'
  import {setStorage, getStorage} from '../config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import Carousel from 'iview/src/components/carousel'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    beforeMount() {
      this.changeTopShow();
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
        leftTopSliderTimer: '',
        leftTopSlider: false,
        trialCount: {},
        homeCommodityList:[],
        noticeList:[
          {
            title: '常见问题',
            content: [
              {
                url: '',
                text: '如何编辑和提交买家秀？1'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布秀品活动需要什么条件？'
              },
              {
                url: '',
                text: '活动担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取活动担保金？'
              },
            ],
            active: 'faq'
          },
          {
            title: '秀客规则',
            content: [
              {
                url: '',
                text: '如何编辑和提交买家秀？2'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布秀品活动品需要什么条件？'
              },
              {
                url: '',
                text: '活动担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取活动担保金？'
              },
            ],
            active: 'buyerRule'
          },
          {
            title: '商家规则',
            content: [
              {
                url: '',
                text: '如何编辑和提交买家秀？3'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布秀品活动品需要什么条件？'
              },
              {
                url: '',
                text: '活动担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取活动担保金？'
              },
            ],
            active: 'sellerRule'
          },
        ],
        noticeActive: 'faq',
        taskTopLeftList: []
      }
    },
    created(){
      this.getHomeTaskList();
      this.getHomeTaskTopLeftList();
      this.personalTrialCount();
      this.$store.commit({
        type: 'TASK_CATEGORY_LIST',
        info: 'home'
      });
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfoPhone() {
        return this.$store.state.userInfo.phone
      },
      getUserInfoRole() {
        return this.$store.state.userInfo.role
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
          height: 172px;
          margin-bottom: 10px;
          img{
            display: block;
            margin: auto auto 15px auto;
          }
          p{
            text-align: center;
          }
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
        .login-in-box{
          background-color: #fff;
          padding: 15px;
          height: 172px;
          margin-bottom: 10px;
        }
        .notice-box{
          background-color: #fff;
          height: 218px;
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
          .home-commodity-img{
            border: 1px solid #ddd;
          }
          .home-commodity-text{
            background-color: #EEEEEE;
            padding:5px;
            p{
              line-height: 35px;
              height: 35px;
              font-size: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              &:first-child{
                color: #000;
                text-align: left;
              }
              &:last-child{
                color: #FF6633;
                span:last-child{
                  background-color: #FCE2E4;
                  padding: 0 10px;
                  height: 30px;
                  line-height: 30px;
                  margin-top: 2px;
                }
              }
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
