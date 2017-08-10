<template>
  <div>
    <div class="task-category-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>试客联盟</Breadcrumb-item>
            <Breadcrumb-item>试用品专区</Breadcrumb-item>
            <Breadcrumb-item>{{$route.query.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>
      <div class="container">
        <div class="task-category-sel">
          {{$route.query.name}}：
          <a href="" class="active" >全部</a>
          <a href="" v-for="category in categoryList">{{category.name}}</a>
        </div>
      </div>
      <div class="container">
        <div class="task-category-sort">
          <div>
            <Button-group size="small" class="left mt-10">
              <iButton>
                最新
                <Icon type="arrow-down-c"></Icon>
              </iButton>
              <iButton>
                价值
                <Icon type="arrow-down-c"></Icon>
              </iButton>
              <iButton>
                人气
                <Icon type="arrow-down-c"></Icon>
              </iButton>
              <iButton>
                份数
                <Icon type="arrow-down-c"></Icon>
              </iButton>
              <iButton>
                剩余时间
                <Icon type="arrow-down-c"></Icon>
              </iButton>
            </Button-group>
            <p class="right">
              共
              <span class="">119</span>万+件商品&nbsp;&nbsp;&nbsp;
              <span>1</span> / <span>100</span>&nbsp;&nbsp;&nbsp;
              <Button-group size="small">
                <iButton icon="chevron-left"></iButton>
                <iButton icon="chevron-right"></iButton>
              </Button-group>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-category-checkbox">
          <div>
            <div class="left mt-10" style="width: 200px">
              <iInput placeholder="在结果中搜索" size="small" >
                <iButton slot="append" size="small" icon="search"></iButton>
              </iInput>
            </div>
            <Checkbox-group class="left ml-20">
              <Checkbox label="PC搜索下单（taobao.com）"></Checkbox>
              <Checkbox label="手淘搜索下单（APP）"></Checkbox>
              <Checkbox label="淘口令下单（APP）"></Checkbox>
              <Checkbox label="宝贝链接下单（taobao.com）"></Checkbox>
            </Checkbox-group>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-category-commodity">
          <div class="task-category-commodity-ctt">
            <a href="" class="task-category-commodity-details" v-for="homeCommodity in homeCommodityList" :title="homeCommodity.taskName">
              <div class="task-category-commodity-img">
                <img class="block" v-lazy="homeCommodity.taskMainImage" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="task-category-commodity-text">
                <p>{{homeCommodity.taskName}}</p>
                <p>
                  <span class="left">￥{{homeCommodity.itemPrice/100}}</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
          </div>
          <div class="task-category-commodity-page">
            <Page :total="100" show-elevator></Page>
          </div>
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
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  export default {
    beforeMount() {
      this.$store.commit({
        type: 'CHANGE_TOP_SHOW'
      })
    },
    name: 'task-category',
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
      Page: Page
    },
    data () {
      return {
        categoryList: [],
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
      this.getHomeTaskList();
      let id = this.$route.query.id;
      this.getTaskCategory(id);
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
      getTaskCategory(id){
        let self = this;
        api.getTaskCategory({id:id}).then((res) => {
          if(res.status){
            self.categoryList = res.data;
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
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let id = this.$route.query.id;
        this.getTaskCategory(id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';


  .breadcrumb{
    height: 36px;
    background-color: #fff;
    line-height: 36px;
    margin: 10px 0;
    padding: 0 10px;
  }
  .task-category-ctt {
    background-color: #F1F1F1;
    .task-category-sel{
      font-size: 14px;
      background-color: #fff;
      height: 64px;
      line-height: 64px;
      padding: 0 15px;
      a{
        display: inline-block;
        font-size: 14px;
        padding: 0 15px;
        color: #000;
      }
    }
    .task-category-sort{
      height: 44px;
      background-color: #fff;
      >div{
        border-top: 1px solid #ddd;
        height: 44px;
        line-height: 44px;
        padding: 0 10px;
        background-color: #F1F1F1;
        margin: 0 10px;
      }
    }
    .task-category-checkbox{
      height: 44px;
      background-color: #fff;
      >div{
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 44px;
        line-height: 44px;
        padding: 0 10px;
        margin: 0 10px;
      }
    }
    .task-category-commodity{
      background-color: #fff;
      .task-category-commodity-ctt{
        padding: 24px;
        text-align: left;
        .task-category-commodity-details{
          width: 222px;
          display: inline-block;
          margin: 0 4px 30px 4px;
          .task-category-commodity-img{
            border: 1px solid #ddd;
          }
          .task-category-commodity-text{
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
      .task-category-commodity-page{
        padding:  0 20px 40px 20px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }



</style>
