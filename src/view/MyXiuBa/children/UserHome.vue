<template>
  <div>
    <div class="container">
      <div class="mt-10">
        <div class="user-home-right left">
          <div >
            <p class="fs-16 user-home-account">我的主页</p>
            <div class="fs-14 user-info-box">
              <div class="left">
                <img class="left" :src="userData.portraitPic" alt="" width="68px">
              </div>
              <div class="left ml-20">
                <p>
                  <span>账号：{{userData.phone}} </span>
                  <span >
                    支付密码：    未设置  设置
                  </span>
                  <span v-if="userData.alitmNum <= 0 ">
                    淘宝账号：
                    <Icon type="information-circled" color="#FF6633"></Icon> 未绑定
                    <router-link to="/user/personal-setting">去绑定</router-link>
                  </span>
                  <span v-else>
                    淘宝账号：
                    <Icon color="#70CF70" type="checkmark-circled"></Icon>
                    绑定成功
                  </span>
                  <span v-if="Boolean(userData.ifCertification)">
                    实名认证：
                    <Icon color="#70CF70" type="checkmark-circled"></Icon> 已认证
                  </span>
                  <span v-else>
                    实名认证：
                    <Icon type="information-circled" color="#FF6633"></Icon> 未认证
                    <router-link to="/user/personal-setting">去认证</router-link>
                  </span>
                </p>
                <p>
                  <span>可用金额：{{userData.userAccount.freezeMoney}} 元 </span>
                  <span>提现中：{{userData.userAccount.enChashingMoney ? userData.userAccount.enChashingMoney : '0' }} 元  </span>
                  <a href="">充值</a>  <a href="">提现</a>
                </p>
              </div>
            </div>
            <div class="left clear-both fs-14 pd-tb-20" style="border-bottom: 1px solid #eee;">
              <p v-if="getUserInfoRole == 0">
                试用提醒：待审核 {{trialCount.waitingAuditTaskApply}} 个，进行中 {{trialCount.underWayShowkerTask}} 个
                （已通过待领取
                <router-link to="/user/personal-setting">{{trialCount.orderNumErrorShowkerTask}}</router-link>
                个；
                已下单待交试用报告
                <router-link to="/user/personal-setting">{{trialCount.passAndUnclaimedShowkerTask}}</router-link>
                个；
                待修改订单号/报告
                <router-link to="/user/personal-setting">{{trialCount.trialReportWaitingSubmitShowkerTask}}</router-link>
                个）。 进入我的试用
              </p>
              <p v-if="getUserInfoRole == 1">
                试用提醒：待审核 {{trialCount.waitingAuditTask}} 个，进行中 {{trialCount.underWayTask}} 个
                （已通过待领取<router-link to="/user/personal-setting">{{trialCount.trialReportWaitingConfirmShowkerTask}}</router-link> 个；
                已下单待交试用报告<router-link to="/user/personal-setting">{{trialCount.waitingAuditTaskApply}}</router-link>个；
                待修改订单号/报告<router-link to="/user/personal-setting">{{trialCount.orderNumWaitingAuditShowkerTask}}</router-link>个）。
                已结束尚未结算 {{}} 个
                <router-link to="/user/personal-setting">进入试用活动管理</router-link>
              </p>
            </div>
            <p  v-if="getUserInfoRole == 0" class="fs-16 clear-both user-home-account" style="border-bottom: 1px solid #eee;">最新试用宝贝</p>
            <div v-if="getUserInfoRole == 0" class="home-commodity-ctt">
              <router-link
                class="home-commodity-details"
                v-for="homeCommodity in homeCommodityList"
                :title="homeCommodity.taskName"
                :key="homeCommodity.id"
                :to="{ 'path': '/task-details','query': {'taskId': homeCommodity.id}}"
              >
                <!--:to="{ 'path': '/task-details', 'query': {'taskId': searchTask.id}}"-->
                <div class="home-commodity-img">
                  <img class="block" v-lazy="homeCommodity.taskMainImage" alt="" style="width: 220px; height: 220px;">
                </div>
                <div class="home-commodity-text">
                  <p>{{homeCommodity.taskName}}</p>
                  <p>
                    <span class="left">￥{{homeCommodity.itemPrice/100}}</span>
                    <span class="right">免费试用</span>
                  </p>
                </div>
              </router-link>
            </div>
            <div v-if="getUserInfoRole == 1" class="user-seller-tips-box">
              <div class="fs-14 left user-seller-tips">
                <p class="fs-16 mb-10">商家常见问题</p>
                <ul>
                  <li>发布试用品需要什么条件？</li>
                  <li>什么是试用担保金？</li>
                  <li>如产品价格出现变动商家怎么办？</li>
                  <li>试客被通过审批后迟迟不下单，并联系不到人，怎么办？</li>
                  <li>什么情况下可以取消会员的通过资格？</li>
                </ul>
              </div>
              <div class="fs-14 left user-seller-tips">
                <p class="fs-16 mb-10">客服工作时间</p>
                <ul>
                  <li> 周一至周五：</li>
                  <li>早上9:00-12:00</li>
                  <li>下午14:00-18:00</li>
                  <li>周六、周日全天休息,请在工作时间联系我们。</li>
                </ul>
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
    name: 'UserHome',
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
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover'
        },
        trialCount: {},
        homeCommodityList:[],
        userData: {
          userAccount: {

          }
        },
      }
    },
    created(){
      this.getUserAccount();
      this.getHomeTaskList();
      this.personalTrialCount();
    },
    computed: {
      getUserInfoRole(){
        return this.$store.state.userInfo.role;
      }
    },
    methods: {
      getHomeTaskList(){
        let self = this;
        api.getHomeTaskList().then((res) => {
          if(res.status){
            if(res.data){
              self.homeCommodityList = res.data;
            }
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      personalTrialCount(){
        let self = this;
        if(self.$store.state.userInfo.role == 0){
          api.showkerPersonalTrialCount().then((res) => {
            if(res.status){
              self.trialCount = res.data
            }else {
              self.$Modal.error({
                content: res.msg
              });
            }
          })
        }else {
          api.sellerPersonalTrialCount().then((res) => {
            if(res.status){
              self.trialCount = res.data
            }else {
              self.$Modal.error({
                content: res.msg
              });
            }
          })
        }

      },
      getUserAccount(){
        var self = this;
        api.getUserAccount().then((res) => {
          if(res.status){
            self.userData = res.data;
          }
        })
      },
      pageChange(){

      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .user-home-left{
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
  .user-home-right{
    background-color: #fff;
    width: 1008px;
    .user-home-account{
      line-height: 50px;
      height: 50px;
    }
    .user-info-box{
      padding: 40px 0;
      overflow: hidden;
      border: 1px solid #EEEEEE;
      border-left: none;
      border-right: none;
      p{
        line-height: 30px;
        span{
          display: inline-block;
          margin-right: 20px;
        }
        a{
          display: inline-block;
          margin-right: 20px;
        }
      }
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
  .user-seller-tips-box{
    margin-top: 20px;
    text-align: center;
    .user-seller-tips{
      text-align: left;
      width: 40%;
      margin: 2%;
      ul{
        background-color: #f8f8f8;
        padding: 20px;
        height: 180px;
        overflow: hidden;
        li{
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }



</style>
