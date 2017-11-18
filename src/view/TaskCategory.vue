<template>
  <div>
    <div class="task-category-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>秀吧</Breadcrumb-item>
            <Breadcrumb-item v-if="$store.state.TaskCategoryActive">{{$store.state.TaskCategoryActiveList[$store.state.TaskCategoryActive].text}}</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.cate">{{parentItemCatalog.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>
      <div class="container" >
        <div class="task-category-sel">
          <span v-show="$store.state.TaskCategoryActive" >{{$store.state.TaskCategoryActiveList[$store.state.TaskCategoryActive].text}}</span>：
          <a :class="[($store.state.TaskCategoryActive == 'all' || $store.state.TaskCategoryActive == 'discount') &&  !$route.query.cate ? 'active' : '']" @click="selTaskCategoryAllFunc">全部活动</a>
          <a v-if="nav.name != '美食/特产' && nav.name != '其它试用'" :class="[$route.query.cate == nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >{{nav.name}}</a>
        </div>
        <div v-show="$route.query.searchKey != 'all' && $route.query.searchKey"  class="task-category-sel">
          全部结果：<span style="color: #ff6633;" v-if="searchTaskParams.taskName">“{{searchTaskParams.taskName}}”</span>
        </div>
        <div v-show="$route.query.cate"  class="task-category-sel">
          {{parentItemCatalog.name}}：
          <router-link :class="[taskCategoryAll ? 'active' : '' ]" :to="{ 'path': '/task-category', 'query': {'cate': parentItemCatalog.id}}" >全部</router-link>
          <router-link :class="[category.id == $route.query.cate ? 'active' : 'default']"  v-for="category in categoryList" :key="category.id" :to="{ 'path': '/task-category', 'query': {'cate': category.id}}"  >
            {{category.name}}
          </router-link>
        </div>
        <div v-if="$store.state.TaskCategoryActive == 'price_low' || $store.state.TaskCategoryActive == 'goods_clearance'" class="task-category-sel" >
          折扣类型：
          <a v-for="(k,discountPrice) in $store.state.discountPriceType" :class="[discountTaskCategoryActive == discountPrice ? 'active' : '' ]" @click="selDiscountPriceTypeFunc(k,discountPrice)">{{discountPrice}}试用</a>
        </div>
      </div>
      <div class="container">
        <div class="task-category-sort">
          <div class="clear">
            <Button-group size="small" class="left mt-10">
              <iButton :class="[sortFieldDefault.name == sortField.name ? 'active' : '']" v-for="(sortField,index) in sortFieldList" :key="sortField.name" @click="getSortFieldFunc(sortField, index)">
                {{sortField.name}}
                <Icon v-show="sortField.sort == 'desc' " type="arrow-down-c"></Icon>
                <Icon v-show="sortField.sort == 'asc' " type="arrow-up-c"></Icon>
              </iButton>
            </Button-group>
            <Page class="right"
                  :current="searchTaskParams.pageIndex"
                  :total="pageCount"
                  :page-size = searchTaskParams.pageSize
                  @on-change = pageChange
                  simple
                  size="small"
            ></Page>
            <p class="right">
              共
              <span class=""> {{pageCount}} </span>件商品&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-category-checkbox">
          <div>
            <div class="left mt-10" style="width: 200px">
              <iInput placeholder="在结果中搜索" size="small" v-model="searchTaskParams.taskName">
                <iButton slot="append" size="small" icon="search" @click="searchTaskNameFunc"></iButton>
              </iInput>
            </div>
            <Checkbox-group class="left ml-20" v-model="searchTaskParams.taskTypes">
              <Checkbox label="pc_search">PC搜索下单（taobao.com）</Checkbox>
              <Checkbox label="app_search">手淘搜索下单（APP）</Checkbox>
              <Checkbox label="tao_code">淘口令下单（APP）</Checkbox>
              <Checkbox label="direct_access">宝贝链接下单（taobao.com）</Checkbox>
            </Checkbox-group>
            <Checkbox-group v-if="isLogin && getRole == 0" class="left ml-20" v-model="searchTaskParams.ifAccess">
              <Checkbox label="true">仅显示可接</Checkbox>
            </Checkbox-group>
          </div>
        </div>
      </div>
      <div class="container" style="background-color: #fff;">
        <div class="task-category-commodity">
          <div class="task-category-commodity-ctt">
            <router-link
              v-show="searchTaskList.length > 0"
              v-for="searchTask in searchTaskList"
              :title="searchTask.taskName.replace(new RegExp(/<\/font>/g),'').replace(new RegExp(/<font class='search-highlight'>/g),'')"
              :key= "searchTask.id"
              :to="{ 'path': '/task-details', 'query': {'q': encryptionId(searchTask.id)}}"
              class="task-category-commodity-details"
            >
              <div class="task-category-commodity-img">
                <img class="block" v-lazy="searchTask.taskMainImage + '!orgi75'" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="task-category-commodity-text">
                <p v-html="searchTask.taskName"></p>
                <p v-if="!$store.state.disCountTaskCategory" class="task-category-commodity-text-price">
                  <span class="left">￥{{searchTask.itemPrice/100}}</span>
                  <!--<span class="right">免费活动</span>-->
                </p>
                <p v-if="$store.state.disCountTaskCategory" class="home-commodity-price">
                  <span class="left" style="text-decoration: line-through; color: #ff6633;">￥{{searchTask.itemPrice/100}}</span>
                  <span v-if="(searchTask.activityCategory == 'price_low' || searchTask.activityCategory == 'goods_clearance') && searchTask.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(searchTask.discountPrice/100)].backgroundColor}" >
                    {{searchTask.discountPrice/100}}试用
                  </span>
                  <span v-if="(searchTask.activityCategory == 'price_low' || searchTask.activityCategory == 'goods_clearance') && searchTask.discountRate " class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(searchTask.discountRate/10) + '折'].backgroundColor}" >
                    {{searchTask.discountRate/10}}试用
                  </span>
                </p>
                <p class="cl000">
                  限量 <span style="color: #ff6600"> {{searchTask.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{searchTask.showkerApplyTotalCount || 0}} </span> 人已申请
                  <!--份数:{{searchTask.taskCount}}-->
                  <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
                  <!--申请人数:{{searchTask.showkerApplyTotalCount}}-->
                </p>
                <p class="cl000">
                  剩余时间：
                  <time-down  :endTime="searchTask.endTime" ></time-down>&nbsp;
                </p>
                <p >
                  <router-link :to="{ 'path': '/task-details','query': {'q': encryptionId(searchTask.id)}}" class="ivu-btn ivu-btn-long" >
                    免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
            <p class="text-ct" v-show="searchTaskList.length <= 0">暂无数据</p>
          </div>
          <div class="task-category-commodity-page" v-show="searchTaskList.length > 0" >
            <Page
              :current="searchTaskParams.pageIndex"
              :total= pageCount
              :page-size = searchTaskParams.pageSize
              @on-change = pageChange
              show-elevator
            ></Page>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-category-commodity mt-10">
          <div id="historyPage" class="home-commodity-title">
            <div class="part-title-img-box">
              <span class="fs-18">历史活动</span>
            </div>
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="task-category-commodity-ctt">
            <router-link
              v-show="historyTaskList.length > 0"
              v-for="historyTask in historyTaskList"
              :title="historyTask.taskName.replace(new RegExp(/<\/font>/g),'').replace(new RegExp(/<font class='search-highlight'>/g),'')"
              :key= "historyTask.id"
              :to="{ 'path': '/task-details', 'query': {'q': encryptionId(historyTask.id)}}"
              class="task-category-commodity-details"
            >
              <div class="task-category-commodity-img">
                <img class="block" v-lazy="historyTask.taskMainImage + '!orgi75'" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="task-category-commodity-text">
                <p v-html="historyTask.taskName"></p>
                <p v-if="!$store.state.disCountTaskCategory" class="task-category-commodity-text-price">
                  <span class="left">￥{{historyTask.itemPrice/100}}</span>
                  <!--<span class="right">免费活动</span>-->
                </p>
                <p v-if="$store.state.disCountTaskCategory" class="home-commodity-price ">
                  <span class="left" style="text-decoration: line-through; color: #ff6633;">￥{{historyTask.itemPrice/100}}</span>
                  <span v-if="historyTask.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(historyTask.discountPrice/100)].backgroundColor}" >
                    {{historyTask.discountPrice/100}}试用
                  </span>
                </p>
                <p class="cl000">
                  限量 <span style="color: #ff6600"> {{historyTask.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{historyTask.showkerApplyTotalCount || 0}} </span> 人已申请
                  <!--份数:{{searchTask.taskCount}}-->
                  <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
                  <!--申请人数:{{searchTask.showkerApplyTotalCount}}-->
                </p>
                <p class="cl000">
                  剩余时间：
                  <time-down  :endTime="historyTask.endTime" ></time-down>&nbsp;
                </p>
                <p >
                  <router-link :to="{ 'path': '/task-details','query': {'q': encryptionId(historyTask.id)}}" class="ivu-btn ivu-btn-long" >
                    查看详情
                  </router-link>
                </p>
              </div>
            </router-link>
            <p class="text-ct" v-show="historyTaskList.length <= 0">暂无数据</p>
          </div>
          <div class="task-category-commodity-page" v-show="historyTaskList.length > 0" >
            <Page
              :current="historyTaskListParams.pageIndex"
              :total= "historyTaskListTotal"
              :page-size = "historyTaskListParams.pageSize"
              @on-change = historyPageChange
              show-elevator
            ></Page>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/user/task-release" class="baicaijia-dialog" v-show="baicaijiaDialog && $store.state.disCountTaskCategory && getRole == 1 ">
      <b @click="baicaijiaDialog=false; $event.preventDefault();">&times;</b>
    </router-link>

  </div>

</template>

<script>
  import {setStorage, getStorage, encryption} from '@/config/utils'
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import Modal from 'iview/src/components/modal'
  import Breadcrumb from 'iview/src/components/breadcrumb'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  export default {
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
      Page: Page,
      TimeDown: TimeDown,
    },
    data () {
      return {
        showAll: false,
        baicaijiaDialog: true,
        parentItemCatalog: {
          name: '',
          id: ''
        },
        discountTaskCategoryActive: '不限',
        navList: [],
        pageCount: 1,
        historyTaskListTotal: 1,
        categoryList: [],
        taskCategoryAll: true,
        searchTaskList: [],
        historyTaskList: [],
        sortFieldList: [
          {
            name: '最新',
            sortField: 'upLineTime',
            sort: 'desc',
            again: false,
          },
          {
            name: '价值',
            sortField: 'itemPrice',
            sort: 'desc',
            again: false,
          },
          {
            name: '人气',
            sortField: 'showkerApplyTotalCount',
            sort: 'desc',
            again: false,
          },
          {
            name: '份数',
            sortField: 'taskCount',
            sort: 'desc',
            again: false,
          },
          {
            name: '剩余时间',
            sortField: 'endTime',
            sort: 'desc',
            again: false,
          },
        ],
        sortFieldDefault: {
          name: '最新',
          sortField: 'upLineTime',
        },
        taskTypes: [],
        itemCatalogs: [],
        searchTaskParams:{
          pageIndex: 1,
          pageSize: 20,
          taskName: '',
          taskTypes: [],
          itemCatalogs: [],
          sortField: 'upLineTime',
          sortOrder: 'desc',
          ifAccess: [],
          activityCategory: [],
          discountTypes: '',
        },
        historyTaskListParams:{
          pageIndex: 1,
          pageSize: 20,
          itemCatalogs: [],
          sortField: 'endTime',
        }
      }
    },
    created(){
      let self = this;
      let cate = self.$route.query.cate;
      let searchKey = self.$route.query.searchKey;
      let discount = self.$route.query.discount;
      self.getNavList();
      if(self.$route.query.activityCategory){
        self.searchTaskParams.activityCategory =  [self.$route.query.activityCategory];
      }
      if(getStorage('disCountTaskCategory')){
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: getStorage('disCountTaskCategory'),
        });
      }
      if(getStorage('TaskCategoryActive')){
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: getStorage('TaskCategoryActive'),
        });
      }
//      if(!self.$store.state.disCountTaskCategory){
//        self.searchTaskParams.discountTypes = ['discount_0']
//      }
      if(getStorage('activityCategory')){
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: getStorage('activityCategory'),
        });
        self.searchTaskParams.activityCategory =  [getStorage('activityCategory')];
      }
      if(discount){
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: true
        });
      }
      if(self.$route.query.activityCategory){
        console.log(self.$route.query.activityCategory);
        self.itemCatalogs = [];
        self.searchTaskParams.activityCategory =  [self.$route.query.activityCategory];
        if(self.$route.query.activityCategory == 'price_low' || self.$route.query.activityCategory == 'goods_clearance' ){
          self.searchTaskParams.discountTypes = self.$store.state.discountPriceType['不限'].discountTypes;
        }else {
          self.searchTaskParams.discountTypes = ''
        }
        self.getSearchTask();
        self.getSearchHistoryTask();
      }
      if(cate){
        self.searchTaskParams.pageIndex = 1;
        self.itemCatalogs = [parseInt(cate)];
        self.getTaskCategoryList(cate);
      }
      if(searchKey){
        if(searchKey === 'all'){
          self.searchTaskParams.taskName = '';
          self.itemCatalogs = [];
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: 'all'
          });
        }else {
          self.searchTaskParams.taskName = searchKey;
        }
        self.getSearchTask();
        self.getSearchHistoryTask();
      }

    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getRole() {
        return this.$store.state.userInfo.role
      },
      getUserInfo() {
        return this.$store.state.userInfo
      }
    },
    mounted: function () {

    },
    methods: {
      encryptionId(id){
        return encryption(id)
      },
      searchTaskNameFunc(){
        this.getSearchTask();
      },
      pageChange(data){
        this.searchTaskParams.pageIndex = data;
        this.getSearchTask();
      },
      historyPageChange(data){
        this.historyTaskListParams.pageIndex = data;
        this.getSearchHistoryTask();
        document.getElementById('historyPage').scrollIntoView(true);
      },
      selTaskCategoryAllFunc(){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'searchKey': 'all'}});
      },
      selTaskCategoryActiveFunc(nav){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'cate': nav.id}});
      },
      selDiscountPriceTypeFunc(k,discountPrice){
        let self = this;
        self.searchTaskParams.discountTypes = k.discountTypes;
        self.discountTaskCategoryActive = discountPrice;
        self.getSearchTask();
        self.getSearchHistoryTask()
      },
      getNavList(){
        let self = this;
        api.getNavList().then((res) =>{
          if(res.status){
            res.data.sort(function(a,b){
              return a.sortIndex-b.sortIndex
            });
            self.navList = res.data;
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getSortFieldFunc(sortField,index){
        if(this.sortFieldDefault.name === sortField.name){
          if(sortField.sort === 'desc'){
            sortField.sort = 'asc';
            this.searchTaskParams.sortOrder= 'asc';
          }else {
            sortField.sort = 'desc';
            this.searchTaskParams.sortOrder= 'desc';
          }
        }else {
          this.searchTaskParams.sortOrder= 'desc';
        }
        this.sortFieldDefault = sortField;
        for(let i = 0, j = this.sortFieldList.length; i < j; i++){
          if(i !== index){
            this.sortFieldList[i].sort = 'desc';
          }
        }
        this.searchTaskParams.sortField = this.sortFieldDefault.sortField;
        this.getSearchTask();
      },
      getSearchTask(){
        let self = this;
        self.searchTaskParams.itemCatalogs = self.itemCatalogs;
        let showkerId = '';
        if(self.$store.state.userInfo && self.$store.state.userInfo.role == 0){
          showkerId = self.$store.state.userInfo.id
        }else {
          showkerId = '';
        }
        api.getSearchTask({
          pageIndex: self.searchTaskParams.pageIndex,
          pageSize: self.searchTaskParams.pageSize,
          taskName: self.searchTaskParams.taskName,
          taskTypes: JSON.stringify(self.searchTaskParams.taskTypes),
          itemCatalogs: JSON.stringify(self.searchTaskParams.itemCatalogs),
          sortField: self.searchTaskParams.sortField,
          sortOrder: self.searchTaskParams.sortOrder,
          showkerId: showkerId,
          ifAccess: self.searchTaskParams.ifAccess == '' ? '' : true,
          discountTypes: self.searchTaskParams.discountTypes ? JSON.stringify(self.searchTaskParams.discountTypes) : '',
          activityCategories: self.searchTaskParams.activityCategory ? JSON.stringify(self.searchTaskParams.activityCategory) : '',
        }).then((res) => {
          window.scrollTo(0, 0);
          if(res.status){
            self.pageCount = parseInt(res.data.total);
            self.searchTaskList = res.data.content;
            self.$set(self.searchTaskList);
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getSearchHistoryTask(){
        let self = this;
        api.getSearchHistoryTask({
          pageIndex: self.historyTaskListParams.pageIndex,
          pageSize: self.historyTaskListParams.pageSize,
          itemCatalogs: JSON.stringify(self.historyTaskListParams.itemCatalogs),
          sortField: 'endTime',
          discountTypes: self.searchTaskParams.discountTypes ? JSON.stringify(self.searchTaskParams.discountTypes) : '',
          activityCategories: self.searchTaskParams.activityCategory ? JSON.stringify(self.searchTaskParams.activityCategory) : '',
        }).then((res) => {
          if(res.status){
            self.historyTaskList = res.data.content;
            self.historyTaskListTotal = parseInt(res.data.total);
            self.$set(self.historyTaskList);
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getTaskCategoryList(cate){
        let self = this;
        api.getTaskCategoryList({cate:cate}).then((res) => {
          if(res.status){
            let  itemCatalogs = [];
            self.categoryList = res.data;
            self.parentItemCatalog.name =  res.data[0].parentItemCatalog.name;
            self.parentItemCatalog.id =  res.data[0].parentItemCatalog.id;
//            self.$store.commit({
//              type: 'TASK_CATEGORY_LIST',
//              info: res.data[0].parentItemCatalog.id,
//            });
            for(let i = 0; i < self.categoryList.length; i++){
              itemCatalogs.push(self.categoryList[i].id);
              self.historyTaskListParams.itemCatalogs.push(self.categoryList[i].id);
              if(cate == self.categoryList[i].id){
                self.itemCatalogs = [parseInt(cate)];
                self.taskCategoryAll = false;
                break
              }else {
                self.taskCategoryAll = true;
              }
            }
            if(self.taskCategoryAll){
              self.itemCatalogs = itemCatalogs;
            }
            self.getSearchTask();
            self.getSearchHistoryTask();
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let self = this;
        self.searchTaskParams.taskName = '';
        self.searchTaskParams.pageIndex = 1;
        let cate = this.$route.query.cate;
        let searchKey = this.$route.query.searchKey;
        let discount = this.$route.query.discount;
        self.historyTaskListParams.itemCatalogs = [];
        if(getStorage('disCountTaskCategory')){
          self.$store.commit({
            type: 'SET_DISCOUNT_TASK_CATEGORY',
            result: getStorage('disCountTaskCategory'),
          });
        }
        if(getStorage('TaskCategoryActive')){
          self.$store.commit({
            type: 'TASK_CATEGORY_LIST',
            info: getStorage('TaskCategoryActive'),
          });
        }
        if(getStorage('activityCategory')){
          self.$store.commit({
            type: 'SET_ACTIVITY_CATEGORY',
            info: getStorage('activityCategory'),
          });
          self.searchTaskParams.activityCategory =  [getStorage('activityCategory')];
        }
        if(discount){
          self.$store.commit({
            type: 'SET_DISCOUNT_TASK_CATEGORY',
            result: true
          });
        }
        if(self.$route.query.activityCategory){
//          console.log(self.$route.query.activityCategory);
          self.itemCatalogs = [];
          self.searchTaskParams.activityCategory =  [self.$route.query.activityCategory];
          if(self.$route.query.activityCategory == 'price_low' || self.$route.query.activityCategory == 'goods_clearance' ){
            self.searchTaskParams.discountTypes = self.$store.state.discountPriceType['不限'].discountTypes;
          }else {
            self.searchTaskParams.discountTypes = ''
          }
          self.getSearchTask();
          self.getSearchHistoryTask();
        }

//        if(!self.$store.state.disCountTaskCategory){
//          self.searchTaskParams.discountTypes = ['discount_0'];
//        }
        if(cate){
          self.searchTaskParams.pageIndex = 1;
          self.itemCatalogs = [parseInt(cate)];
          self.getTaskCategoryList(cate);
        }
        if(searchKey){
          if(searchKey == 'all'){
            self.searchTaskParams.taskName = '';
            self.itemCatalogs = [];
          }else {
            self.searchTaskParams.taskName = searchKey;
          }
          self.getSearchTask();
          self.getSearchHistoryTask();
        }
      },
      'searchTaskParams'(){
        deep:true;
        this.getSearchTask();
      },
      'searchTaskParams.taskTypes'(){
        deep:true;
        this.getSearchTask();
      },
      'searchTaskParams.ifAccess'(){
        deep:true;
        this.getSearchTask();
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .breadcrumb{
    height: 36px;
    background-color: #fff;
    line-height: 36px;
    margin: 10px 0;
    padding: 0 10px;
  }
  .home-commodity-title{
    overflow: hidden;
    img{
      display: block;
      margin: 28px auto 10px auto;
    }
  }
  .home-discount-price{
    color: #fff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    margin-right: 15px;
    margin-left: 5px
  }
  .task-category-ctt {
    background-color: #F1F1F1;
    .task-category-sel{
      font-size: 14px;
      background-color: #fff;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      a{
        display: inline-block;
        font-size: 14px;
        padding: 0 13px;
        color: #000;
      }
      a.active{
        color: $mainColor;
      }
      a.default{
        color: #000;
      }
    }
    .task-category-sort{
      height: 44px;
      background-color: #fff;
      button.active{
        background-color: $mainColor;
        color: #fff;
      }
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
              color: #000;
              &:first-child{
                color: #000;
                text-align: left;
              }

            }
            p.task-category-commodity-text-price{
              color: #FF6633;
              /*span:last-child{*/
                /*background-color: #FCE2E4;*/
                /*padding: 0 10px;*/
                /*height: 30px;*/
                /*line-height: 30px;*/
                /*margin-top: 2px;*/
              /*}*/
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
  .baicaijia-dialog{
    position: fixed;
    top: 25%;
    left: 5%;
    width: 136px;
    height: 180px;
    background: url("/static/img/dialog/baicaijia_dialog.png") no-repeat;
    b{
      font-size: 20px;
      color: rgb(255, 255, 255);
      float: right;
      margin: 1px 8px 0 0;
      font-weight: normal;
    }
  }



</style>
