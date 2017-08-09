<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left mr-10">
            <ul>
              <li>
                <div class="left img-box">
                  <img src="~assets/img/home/home_10.png" alt="">
                </div>
                <div class="left text-box ml-10">
                  <p>136****6666成功领取了</p>
                  <p>
                    <span>免打孔 雅黑...</span>
                    <span class="text">￥35.00</span>
                  </p>
                </div>
              </li>
              <li>
                <div class="left img-box">
                  <img src="~assets/img/home/home_10.png" alt="">
                </div>
                <div class="left text-box ml-10">
                  <p>136****6666成功领取了</p>
                  <p>
                    <span>免打孔 雅黑...</span>
                    <span class="text">￥35.00</span>
                  </p>
                </div>
              </li>
              <li>
                <div class="left img-box">
                  <img src="~assets/img/home/home_10.png" alt="">
                </div>
                <div class="left text-box ml-10">
                  <p>136****6666成功领取了</p>
                  <p>
                    <span>免打孔 雅黑...</span>
                    <span class="text">￥35.00</span>
                  </p>
                </div>
              </li>
              <li>
                <div class="left img-box">
                  <img src="~assets/img/home/home_10.png" alt="">
                </div>
                <div class="left text-box ml-10">
                  <p>136****6666成功领取了</p>
                  <p>
                    <span>免打孔 雅黑...</span>
                    <span class="text">￥35.00</span>
                  </p>
                </div>
              </li>
              <li>
                <div class="left img-box">
                  <img src="~assets/img/home/home_10.png" alt="">
                </div>
                <div class="left text-box ml-10">
                  <p>136****6666成功领取了</p>
                  <p>
                    <span>免打孔 雅黑...</span>
                    <span class="text">￥35.00</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000">
              <Carousel-item>
                <img class="block" src="~assets/img/home/home_07.png" alt="">
              </Carousel-item>
              <Carousel-item>
                <img class="block" src="~assets/img/home/home_07.png" alt="">
              </Carousel-item>
              <Carousel-item>
                <img class="block" src="~assets/img/home/home_07.png" alt="">
              </Carousel-item>
              <Carousel-item>
                <img class="block" src="~assets/img/home/home_07.png" alt="">
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="login-up-box" v-show="!isLogin">
              <div>
                <img src="~assets/img/home/home_24.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-10">
                <router-link  to="/register">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
            </div>
            <div class="login-up-box" v-show="isLogin">
              <div>
                <img src="~assets/img/home/home_24.png" alt="">
                <p>{{getUserInfo.phone}}</p>
              </div>
              <div class="mt-10 text-ct">
                <router-link  to="/user">个人中心</router-link>
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
            <p class="text-ct fs-14">快乐试用，热爱分享</p>
          </div>
          <div class="home-commodity-ctt">
            <a href="" class="home-commodity-details" v-for="homeCommodity in homeCommodityList" :title="homeCommodity.taskName">
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
            </a>
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
  import api from '../config/apiConfig'
  import {setStorage, getStorage} from '../config/utils'
  import SmsCountdown from '@/components/SmsCountdown'
  import Modal from 'iview/src/components/modal'
  import Carousel from 'iview/src/components/carousel'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
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
        homeCommodityList:[
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsdaafsdafsdaafsdafsdaafsdafsdaafsdafsdaafsdafsdaafsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
          {
            "id": 287,
            "userId": 182,
            "taskType": "direct_access",
            "taskDaysDuration": 10,
            "onlyShowForQualification": true,
            "refuseOldShowker": false,
            "taskName": "afsdafsda",
            "itemCatalog":{"id": 102, "name": "下装", "level": 2, "parentItemCatalog":{}},
            "taskMainImage": "http://xiuba-dev.oss-cn-hangzhou.aliyuncs.com/task/20170803/ha6phaswe84 ",
            "itemUrl": "https://detail.tmall.com/item.htm?id=523786754479&spm=a223v.7835278.t0.1.469d35e6HXmkwL&pvid=85ef55f7-207d-4146-a277-b076d0bd76fb&scm=1007.12144.81309.9011_8949 ",
            "storeName": null,
            "taskCount": 10,
            "itemPrice": 2900000,
            "pinkage": true,
            "paymentMethod": "all",
            "itemDescription": "",
            "taskDetail": null,
            "showkerApplyTotalCount": 0,
            "showkerApplySuccessCount": 0,
            "taskStatus": "under_way",
            "settlementStatus": "cannot_settlement",
            "auditLogs":[{"id": 142, "taskId": 287, "auditSuccess": true, "resultMsg": null}],
            "createTime": 1501646191000,
            "upLineTime": 1501756109000,
            "finishTime": null,
            "updateTime": 1501756109000,
            "taskDetailObject": null,
            "taskTypeDesc": "宝贝链接下单",
            "settlementStatusDesc": "不可申请结算",
            "taskStatusDesc": "进行中"
          },
        ],
        noticeList:[
          {
            title: '常见问题',
            content: [
              {
                url: '',
                text: '如何编辑和提交试用报告？1'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布试用品需要什么条件？'
              },
              {
                url: '',
                text: '试用担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取试用担保金？'
              },
            ],
            active: 'faq'
          },
          {
            title: '秀客规则',
            content: [
              {
                url: '',
                text: '如何编辑和提交试用报告？2'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布试用品需要什么条件？'
              },
              {
                url: '',
                text: '试用担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取试用担保金？'
              },
            ],
            active: 'buyerRule'
          },
          {
            title: '商家规则',
            content: [
              {
                url: '',
                text: '如何编辑和提交试用报告？3'
              },
              {
                url: '',
                text: '如何到指定平台下单领取？？'
              },
              {
                url: '',
                text: '发布试用品需要什么条件？'
              },
              {
                url: '',
                text: '试用担保金没有及时返还怎么办？'
              },
              {
                url: '',
                text: '如何领取试用担保金？'
              },
            ],
            active: 'sellerRule'
          },
        ],
        noticeActive: 'faq'
      }
    },
    created(){
      this.getHomeTaskList()
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfo() {
        return this.$store.state.userInfo
      }
    },
    methods: {
      getHomeTaskList(){
        let self = this;
        api.getHomeTaskList().then((res) => {
            if(res.status){
              if(res.data.content != ''){
                self.homeCommodityList = res.data.content;
              }
            }else {
              self.$Modal.error({
                content: res.msg
              });
            }
        })
      },
      changeNoticeTab(notice){
        this.noticeActive = notice.active;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
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
            div.text-box{
              p{
                line-height: 26px;
                height: 26px;
                font-size: 14px;
                &:first-child{
                  color: #999;
                }
                &:last-child{
                  span.text{
                    color: $mainColor;
                    font-weight: bold;
                  }
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
      padding: auto 24px;
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
        text-align: center;
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



</style>
