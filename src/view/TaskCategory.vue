<template>
  <div>
    <div class="task-category-ctt">
      <div class="container" id="historyPosition">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>白拿拿</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.searchAll">全部活动</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.searchKey">搜索结果</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.activityCategory">{{$store.state.TaskCategoryActiveList[$store.state.activityCategory].text}}</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.cate">{{parentItemCatalog.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>

      <div class="container" >
        <div v-show="!$route.query.searchKey" class="task-category-sel">
          <span v-if="$route.query.activityCategory">{{$store.state.TaskCategoryActiveList[$store.state.activityCategory].text}}：</span>
          <span v-if="!$route.query.activityCategory">宝贝类型：</span>
          <a :class="[!$route.query.cate ? 'active' : '']" @click="selTaskCategoryAllFunc">全部活动</a>
          <a v-if="nav.id !== 600 && !isLogin" :class="[($route.query.cate === nav.id || parentItemCatalog.id === nav.id) && $route.query.cate ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >{{nav.name}}</a>
          <a v-if="isLogin" :class="[($route.query.cate === nav.id || parentItemCatalog.id === nav.id) && $route.query.cate ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >{{nav.name}}</a>
        </div>
        <div v-show="$route.query.searchKey">
          <div class="task-category-sel">
            搜索关键词：<span class="main-color">“{{$route.query.searchKey}}”</span>
          </div>
        </div>
        <div v-show="$route.query.cate"  class="task-category-sel">
          {{parentItemCatalog.name}}：
          <a :class="[taskCategoryAll ? 'active' : '' ]"  @click="selTaskCategoryAllChildActiveFunc" >全部</a>
          <a v-if="category.id !== 1003 && !isLogin" :class="[category.id === $route.query.cate ? 'active' : 'default']" @click="selTaskCategoryChildActiveFunc(category)"  v-for="category in categoryList" :key="category.id"   >
            {{category.name}}
          </a>
          <a v-if="isLogin" :class="[category.id === $route.query.cate ? 'active' : 'default']" @click="selTaskCategoryChildActiveFunc(category)"  v-for="category in categoryList" :key="category.id"   >
            {{category.name}}
          </a>
        </div>
        <div v-show="!$route.query.searchKey">
          <div v-if="$store.state.TaskCategoryActive === 'price_low'" class="task-category-sel" >
            折扣类型：
            <a v-for="(k,discountPrice) in $store.state.discountPriceType" :class="[discountTaskCategoryActive === discountPrice ? 'active' : '' ]" @click="selDiscountPriceTypeFunc(k,discountPrice)">{{discountPrice}}试用</a>
          </div>
          <div v-if=" $store.state.TaskCategoryActive === 'goods_clearance'" class="task-category-sel" >
            折扣类型：
            <a v-for="(k,discountPrice) in $store.state.goodsClearanceList" :class="[discountTaskCategoryActive === discountPrice ? 'active' : '' ]" @click="selDiscountPriceTypeFunc(k,discountPrice)">{{discountPrice}}清仓</a>
          </div>
        </div>
        <div v-if="!$route.query.activityCategory || $route.query.categroyId || $route.query.categroy" class="task-category-sel">
          <span>活动类型：</span>
          <a :class="[category === k ? 'active' : '']"  v-for="(TaskCategoryCate,k) in $store.state.TaskCategoryActiveList" v-if="k != 'pinkage_for_10' && k != 'price_low'" @click="selTaskDefaultFunc(k)">{{TaskCategoryCate.text}}</a>
        </div>
      </div>
      <div class="container">
        <div class="task-category-sort">
          <div class="clear">
            <Button-group size="small" class="left mt-10">
              <iButton :class="[sortFieldDefault.name === sortField.name ? 'active' : '']" v-for="(sortField,index) in sortFieldList" :key="sortField.name" @click="getSortFieldFunc(sortField, index)">
                {{sortField.name}}
                <Icon v-show="sortField.sort === 'desc' " type="arrow-down-c"></Icon>
                <Icon v-show="sortField.sort === 'asc' " type="arrow-up-c"></Icon>
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
              共<span class=""> {{pageCount}} </span>件商品&nbsp;&nbsp;&nbsp;</p>
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
            <Checkbox-group v-if="isLogin && getRole === 0" class="left ml-20" v-model="searchTaskParams.ifAccess">
              <Checkbox label="true">仅显示可接</Checkbox>
            </Checkbox-group>
          </div>
        </div>
      </div>
      <div class="container bgfff">
        <div class="task-category-commodity">
          <div class="task-category-commodity-ctt">
            <router-link
              target="_blank"
              v-show="searchTaskList.length > 0"
              v-for="searchTask in searchTaskList"
              :title="searchTask.taskName.replace(/<\/font>/g,'').replace(/<font class='search-highlight'>/g,'')"
              :key= "searchTask.id"
              :to="{ 'path': '/task-details', 'query': {'q': encryptionId(searchTask.id)}}"
              class="task-category-commodity-details">
              <div class="task-category-commodity-img pos-rel">
                <img class="block" v-lazy="searchTask.taskMainImage +'!thum400'" height="220" width="220">
                <span class="applied"> {{searchTask.showkerApplyTotalCount || 0}} 人已申请</span>
              </div>
              <div class="task-category-commodity-text">
                <p v-html="searchTask.taskName"></p>
                <p class="home-commodity-price">
                  <em class="price-list left">
                    <span class="cl666 block text-decoration-through">￥{{searchTask.itemPrice }}</span>
                    <span class="f-b main-color" v-if="searchTask.discountPrice">￥{{(searchTask.discountPrice / 100).toFixed(2)}}</span>
                    <span class="f-b main-color" v-if="!searchTask.discountPrice && searchTask.discountRate">
                      ￥{{(Math.floor((searchTask.discountRate/100) * searchTask.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span class="f-b main-color" v-if="!searchTask.discountPrice && !searchTask.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em class="price-icon mt-10">
                    <span v-if= "searchTask.activityCategory === 'pinkage_for_10'" style="padding: 0 4px; background: #75c5ff; color: #fff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">10元包邮</span>
                    <span v-if= "searchTask.activityCategory === 'present_get'" style="padding: 0 4px; background: #00cc66; color: #ffffff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">体验专区</span>
                  </em>
                </p>
                <p class="cl000">
                  限量 <span class="main-color"> {{searchTask.taskCount || 0 }} </span> 份，剩余
                  <span class="main-color"> {{searchTask.taskCount - searchTask.showkerApplySuccessCount || 0}} </span> 份
                </p>
                <p class="cl000">剩余时间：<time-down  :endTime="searchTask.endTime" ></time-down>&nbsp;</p>
                <p >
                  <router-link :to="{ 'path': '/task-details','query': {'q': encryptionId(searchTask.id)}}" class="ivu-btn ivu-btn-long" >免费领取</router-link>
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
      <div class="container" id="historyActivity">
        <div class="task-category-commodity mt-10">
          <div  class="home-commodity-title">
            <div class="part-title-img-box">
              <span class="fs-18">历史活动</span>
            </div>
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="task-category-commodity-ctt">
            <router-link
              target="_blank"
              v-show="historyTaskList.length > 0"
              v-for="historyTask in historyTaskList"
              :title="historyTask.taskName.replace(/<\/font>/g,'').replace(/<font class='search-highlight'>/g,'')"
              :key= "historyTask.id"
              :to="{ 'path': '/task-details', 'query': {'q': encryptionId(historyTask.id)}}"
              class="task-category-commodity-details">
              <div class="task-category-commodity-img pos-rel">
                <img class="block" v-lazy="historyTask.taskMainImage +'!thum400'" alt="" width="220" height="220">
                <span class="applied"> {{historyTask.showkerApplyTotalCount || 0}} 人已申请</span>
              </div>
              <div class="task-category-commodity-text">
                <p v-html="historyTask.taskName"></p>
                <p class="home-commodity-price ">
                  <em class="price-list left">
                    <span class="cl666 block text-decoration-through">￥{{historyTask.itemPrice / 100}}</span>
                    <span class="main-color f-b" v-if="historyTask.discountPrice">￥{{(historyTask.discountPrice / 100).toFixed(2)}}</span>
                    <span class="main-color f-b" v-if="!historyTask.discountPrice && historyTask.discountRate">
                      ￥{{(Math.floor((historyTask.discountRate/100) * historyTask.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span class="main-color f-b" v-if="!historyTask.discountPrice && !historyTask.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em  class="price-icon mt-10">
                    <span v-if= "historyTask.activityCategory === 'pinkage_for_10'" style="padding: 0 4px; background: #75c5ff; color: #fff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">10元包邮</span>
                    <span v-if= "historyTask.activityCategory === 'present_get'" style="padding: 0 4px; background: #00cc66; color: #ffffff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">体验专区</span>
                    <span v-if="historyTask.activityCategory === 'price_low' && historyTask.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(historyTask.discountPrice/100)].backgroundColor}" >
                      {{historyTask.discountPrice/100}}试用
                    </span>
                    <span v-if="historyTask.activityCategory === 'price_low' && historyTask.discountRate" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(historyTask.discountRate/10) + '折'].backgroundColor}" >
                      {{historyTask.discountRate/10}}折试用
                    </span>
                    <span v-if="historyTask.activityCategory === 'goods_clearance' && historyTask.discountRate " class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(historyTask.discountRate/10) + '折'].backgroundColor}" >
                      {{historyTask.discountRate/10}}折清仓
                    </span>
                  </em>
                </p>
                <p class="cl000">
                  限量 <span class="main-color"> {{historyTask.taskCount || 0 }} </span> 份，剩余
                  <span class="main-color"> {{historyTask.taskCount - historyTask.showkerApplySuccessCount || 0}} </span> 份
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
    <router-link to="/user/task-release" class="baicaijia-dialog" v-show="baicaijiaDialog && $store.state.disCountTaskCategory && getRole === 1 ">
      <b @click.stop="baicaijiaDialog = false">&times;</b>
    </router-link>

  </div>

</template>

<script>
  import {Icon, Form, Input, Checkbox, Button, Radio, Modal, Breadcrumb} from 'iview'
  import {setStorage, getStorage, encryption, removeStorage} from '@/config/utils'
  import api from '@/config/apiConfig'
  import Page from 'iview/src/components/page'
  import TimeDown from '@/components/TimeDown'
  export default {
    name: 'TaskCategory',
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
        category: '',
        discountType: {
          'discount_r_10': true,
          'discount_r_30': true,
          'discount_r_50': true,
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
        disableCategoryList: [601,602,603,604,605,606,607,608,609,610,699,1003],
        searchTaskParams:{
          pageIndex: 1,
          pageSize: 20,
          taskName: '',
          taskTypes: [],
          itemCatalogs: [],
          sortField: 'upLineTime',
          sortOrder: 'desc',
          ifAccess: [],
          activityCategories: [],
          discountTypes: '',
          countLeft0ToEnd: true,
          itemCatalogFilters: [],
          zoneFilters: ['freshman_hit'],
          onlyAvailableCertainlyHit:false,

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
      self.searchInit()
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
      selTaskDefaultFunc(activityCategory){
        let self = this;
        self.category = activityCategory;
        if(self.$route.query.categoryId === 'all'){
          self.$route.query.cate = '';
          self.$route.query.category = '';
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': '',
            'categoryId': 'all',
            'category': self.category,
          }});
        }else {
          if(activityCategory === 'home'){
            self.searchTaskParams.activityCategories = '';
            self.$router.push({ 'path': '/task-category', 'query': {
              'cate': self.parentItemCatalog.id,
              'categoryId': 'all',
              'category': 'home',
            }});
          }else {
            self.$router.push({ 'path': '/task-category', 'query': {
              'cate': self.parentItemCatalog.id,
              'categoryId': self.parentItemCatalog.id,
              'category': self.category,
            }});
          }
        }

      },
      selTaskCategoryAllChildActiveFunc(){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {
          'cate': self.parentItemCatalog.id,
          'activityCategory': self.$route.query.activityCategory
        }});
      },
      searchTaskNameFunc(){
        this.getSearchTask();
      },
      searchInit(){
        let self = this;
        self.selSearchTaskParamsFunc();
        self.getNavList();
      },
      selSearchTaskParamsFunc(){
        let self = this;
        let cate = self.$route.query.cate;
        let searchKey = self.$route.query.searchKey;
        let activityCategory = self.$route.query.activityCategory;
        let searchAll = self.$route.query.searchAll;
        let category = self.$route.query.category;
        let categoryId = self.$route.query.categoryId;
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: self.$route.query.activityCategory,
        });
        self.searchTaskParams.pageIndex = 1;
        self.historyTaskListParams.pageIndex = 1;
        self.searchTaskParams.itemCatalogs = [];
        self.searchTaskParams.discountTypes = [];
        self.searchTaskParams.taskName = '';
        if(activityCategory){
          self.searchTaskParams.activityCategories = [activityCategory];
        }else {
          self.searchTaskParams.activityCategories = [];
        }
        if(categoryId){
          self.category = '';
        }
        if(category){
          self.category = category;
          if(category === 'all' || category === 'home'){
            self.searchTaskParams.activityCategories = [];
          }else {
            self.searchTaskParams.activityCategories = [category];
          }

        }
        if(searchAll){
          self.searchTaskParams.activityCategories = [];
        }
        if(searchKey){
          self.searchTaskParams.taskName = searchKey;
        }
        if(cate){
          self.getTaskCategoryList(cate, self.getSearchTask);
          return;
        }
        self.getSearchTask();
        self.getSearchHistoryTask();
      },

      pageChange(data){
        this.searchTaskParams.pageIndex = data;
        this.getSearchTask();
        document.getElementById('historyPosition').scrollIntoView(true);
      },
      historyPageChange(data){
        this.historyTaskListParams.pageIndex = data;
        this.getSearchHistoryTask();
        document.getElementById('historyActivity').scrollIntoView(true);

      },
      selTaskCategoryAllFunc(){
        let self = this;
        if(self.$route.query.categoryId){
          self.$router.push({ 'path': '/task-category', 'query': {
            'category': 'all',
            'categoryId': 'all'
          }});
        }else if(self.$route.query.activityCategory){
          self.$router.push({ 'path': '/task-category', 'query': {
            'activityCategory': self.$route.query.activityCategory
          }});
        }else {
          self.$router.push({ 'path': '/task-category', 'query': {
            'searchAll': 'yes',
          }});
        }
      },
      selTaskCategoryActiveFunc(nav){
        let self = this;
        if(self.$route.query.categoryId){
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': nav.id,
            'categoryId': nav.id,
            'category': self.category,
          }});
        }else if(self.$route.query.activityCategory){
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': nav.id,
            'activityCategory': self.$route.query.activityCategory,
          }});
        }else {
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': nav.id,
          }});
        }
      },
      selTaskCategoryChildActiveFunc(category){
        let self = this;
        if(self.$route.query.categoryId){
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': category.id,
            'categoryId': category.id,
            'category': self.category,
          }});
        }else {
          self.$router.push({ 'path': '/task-category', 'query': {
            'cate': category.id,
            'activityCategory': self.$route.query.activityCategory,
          }});
        }
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
        let showkerId = '';
        if(self.$store.state.userInfo && self.$store.state.userInfo.role === 0){
          showkerId = self.$store.state.userInfo.id
        }else {
          showkerId = '';
        }
        if(self.$store.state.login){
          self.searchTaskParams.itemCatalogFilters = [];
        }else {
          self.searchTaskParams.itemCatalogFilters = self.disableCategoryList;
        }
        let option = {
          pageIndex: self.searchTaskParams.pageIndex,
          pageSize: self.searchTaskParams.pageSize,
          taskName: self.searchTaskParams.taskName,
          taskTypes: JSON.stringify(self.searchTaskParams.taskTypes),
          itemCatalogs: JSON.stringify(self.searchTaskParams.itemCatalogs),
          sortField: self.searchTaskParams.sortField,
          sortOrder: self.searchTaskParams.sortOrder,
          showkerId: showkerId,
          ifAccess: self.searchTaskParams.ifAccess.length > 0,
          discountTypes: self.searchTaskParams.discountTypes ? JSON.stringify(self.searchTaskParams.discountTypes) : '',
          activityCategories: self.searchTaskParams.activityCategories ? JSON.stringify(self.searchTaskParams.activityCategories) : '',
          countLeft0ToEnd: self.searchTaskParams.countLeft0ToEnd,
          zoneFilters: self.searchTaskParams.zoneFilters ? JSON.stringify(self.searchTaskParams.zoneFilters) : '',
          onlyAvailableCertainlyHit:self.searchTaskParams.onlyAvailableCertainlyHit
        };
        api.getSearchTask(option).then((res) => {
          if(res.status){
            self.pageCount = res.data.total;
            if(!self.isLogin){
              self.searchTaskList = res.data.content.filter(item => {
                return item.itemCatalog.id !== 1003 && item.itemCatalog.parentItemCatalog.id !== 600;
              });
            } else {
              self.searchTaskList = res.data.content;
            }
          }else {
            self.$Message.error(res.msg);
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
            if(!self.isLogin){
              self.historyTaskList = res.data.content.filter(item => {
                return item.itemCatalog.id !== 1003 && item.itemCatalog.parentItemCatalog.id !== 600;
              });
            } else {
              self.historyTaskList = res.data.content;
            }
            self.historyTaskListTotal = res.data.total;
          }else {
            self.$Message.error(res.msg);
          }
        })
      },
      getTaskCategoryList(cate, callback){
        let self = this;
        api.getTaskCategoryList({cate:cate}).then((res) => {
          if(res.status){
            let  itemCatalogs = [];
            self.categoryList = res.data;
            self.parentItemCatalog.name =  res.data[0].parentItemCatalog.name;
            self.parentItemCatalog.id =  res.data[0].parentItemCatalog.id;
            for(let i = 0; i < self.categoryList.length; i++){
              itemCatalogs.push(self.categoryList[i].id);
              self.historyTaskListParams.itemCatalogs.push(self.categoryList[i].id);
              if(cate === self.categoryList[i].id){
                self.searchTaskParams.itemCatalogs = [parseInt(cate)];
                self.taskCategoryAll = false;
                break
              }else {
                self.taskCategoryAll = true;
              }
            }
            if(self.taskCategoryAll){
              self.searchTaskParams.itemCatalogs = itemCatalogs;
            }
            if (typeof callback === 'function' && res) {
              callback();
            }
            self.getSearchHistoryTask();
          }else {
            self.$Message.error(res.msg);
          }
        })
      },
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let self = this;
        self.searchInit();
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
    padding-top: 30px;
    img{
      display: block;
      margin: 28px auto 10px auto;
    }
  }
  .activity-category-tips-left{
    display: inline-block;
    width: 0;
    height: 0;
    border: 22px solid transparent;
    vertical-align: -17px;
    margin-right: -4px;
  }
  .activity-category-tips-right{
    display: inline-block;
    width: 0;
    height: 0;
    border: 22px solid transparent;
    vertical-align: -17px;
    margin-left: -4px;
  }
  .activity-category-tips{
    display: inline-block;
    color: #fff;
    padding: 8px 20px;
    font-size: 18px;
    height: 44px;
    border-radius: 1px;
  }
  .home-discount-price{
    color: #fff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    margin-right: 15px;
    margin-left: 5px
  }

  p.home-commodity-price {
    height: 40px !important;
    line-height: normal !important;
    color: #FF6633;
    em{
      font-style: normal;
    }
    em.price-list{
      float: left;
    }
    em.price-icon{

      span{
        margin-top: 16px;
        margin-left: 10px;
      }
    }
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

  .applied{
    position: absolute;
    top:0;
    right: 0;
    background-color: $mainColor;
    padding: 0 6px;
    color: #fff;
  }
</style>
