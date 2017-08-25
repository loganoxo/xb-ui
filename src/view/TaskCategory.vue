<template>
  <div>
    <div class="task-category-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb >
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>试客联盟</Breadcrumb-item>
            <Breadcrumb-item>试用品专区</Breadcrumb-item>
            <Breadcrumb-item v-if="$route.query.cate">{{parentItemCatalog.name}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>
      <div class="container" v-show="$route.query.cate">
        <div class="task-category-sel">
          {{parentItemCatalog.name}}：
           <a  @click="taskCategoryAllFunc()" :class="[taskCategoryAll ? 'active' : '' ]">全部</a>
          <a :class="[itemCatalogs[0] == category.id && !taskCategoryAll ? 'active' : '']" v-for="category in categoryList" @click="taskCategoryFunc(category)">{{category.name}}</a>
        </div>
      </div>
      <div class="container">
        <div class="task-category-sort">
          <div>
            <Button-group size="small" class="left mt-10">
              <iButton :class="[sortFieldDefault == sortField.name ? 'active' : '']" v-for="sortField in sortFieldList" :key="sortField.name" @click="getSortFieldFunc(sortField)">
                {{sortField.name}}
                <Icon type="arrow-down-c"></Icon>
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
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-category-commodity">
          <div class="task-category-commodity-ctt">
            <router-link
              v-show="searchTaskList.length > 0"
              v-for="searchTask in searchTaskList"
              :title="searchTask.taskName"
              :key= "searchTask.id"
              :to="{ 'path': '/task-details', 'query': {'taskId': searchTask.id}}"
              class="task-category-commodity-details"
            >
              <div class="task-category-commodity-img">
                <img class="block" v-lazy="searchTask.taskMainImage" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="task-category-commodity-text">
                <p>{{searchTask.taskName}}</p>
                <p class="task-category-commodity-text-price">
                  <span class="left">￥{{searchTask.itemPrice/100}}</span>
                  <span class="right">免费试用</span>
                </p>
                <p class="cl000">
                  份数:{{searchTask.taskCount}}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  申请人数:{{searchTask.taskDaysDuration}}
                </p>
                <p class="cl000">
                  剩余时间：
                  <time-down  :endTime="searchTask.updateTime" ></time-down>&nbsp;
                </p>
              </div>
            </router-link>
            <p v-show="searchTaskList.length <= 0">暂无数据</p>
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
  import TimeDown from '@/components/TimeDown'
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
      Page: Page,
      TimeDown: TimeDown,
    },
    data () {
      return {
        parentItemCatalog: {
          name: '',
          id: ''
        },
        pageCount: 1,
        categoryList: [],
        taskCategoryAll: false,
        searchTaskList:[],
        sortFieldList: [
          {
            name: '最新',
            sortField: 'upLineTime',
          },
          {
            name: '价值',
            sortField: 'itemPrice',
          },
          {
            name: '人气',
            sortField: 'showkerApplyTotalCount',
          },
          {
            name: '份数',
            sortField: 'taskCount',
          },
          {
            name: '剩余时间',
            sortField: 'endTime',
          },
        ],
        sortFieldDefault: '最新',
        taskTypes: [],
        itemCatalogs: ['all'],
        searchTaskParams:{
          pageIndex: 1,
          pageSize: 2,
          taskName: '',
          taskTypes: [],
          itemCatalogs: [],
          sortField: 'upLineTime',
          sortOrder: 'desc'
        }
      }
    },
    created(){
      let cate = this.$route.query.cate;
      let searchKey = this.$route.query.searchKey;
      if(cate){
        this.getTaskCategoryList(cate);
      }
      if(searchKey){
        this.searchTaskParams.taskName = searchKey;
        this.getSearchTask();
      }
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
      searchTaskNameFunc(){
        this.getSearchTask();
      },
      pageChange(data){
        this.searchTaskParams.pageIndex = data;
        this.getSearchTask();
      },
      taskCategoryAllFunc(){
        let self = this;
        for(let i = 0; i < self.categoryList.length; i++){
          self.itemCatalogs[i] = self.categoryList[i].id;
        }
        self.taskCategoryAll = true;
        self.getSearchTask();
      },
      taskCategoryFunc(category){
        let self = this;
        self.taskCategoryAll = false;
        self.itemCatalogs = [category.id];
        this.getSearchTask();
      },
      getSortFieldFunc(sortField){
        this.sortFieldDefault = sortField.name;
        this.searchTaskParams.sortField = sortField.sortField;
        this.getSearchTask();
      },
      getSearchTask(){
        let self = this;
        self.searchTaskParams.itemCatalogs = self.itemCatalogs;
        api.getSearchTask({
          pageIndex: self.searchTaskParams.pageIndex,
          pageSize: self.searchTaskParams.pageSize,
          taskName: self.searchTaskParams.taskName,
          taskTypes: JSON.stringify(self.searchTaskParams.taskTypes),
          itemCatalogs: JSON.stringify(self.searchTaskParams.itemCatalogs),
          sortField: self.searchTaskParams.sortField,
          sortOrder: self.searchTaskParams.sortOrder
        }).then((res) => {
          if(res.status){
              self.pageCount = parseInt(res.data.total);
              self.searchTaskList = res.data.content;
              self.$set(self.searchTaskList)
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      getTaskCategoryList(cate){
        let self = this;
        self.itemCatalogs = [];
        api.getTaskCategoryList({cate:cate}).then((res) => {
          if(res.status){
            self.categoryList = res.data;
            self.parentItemCatalog.name =  res.data[0].parentItemCatalog.name;
            self.parentItemCatalog.id =  res.data[0].parentItemCatalog.id;
            for(let i = 0; i < self.categoryList.length; i++){
              self.itemCatalogs.push(self.categoryList[i].id);
            }
            this.getSearchTask()
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
    },
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let cate = this.$route.query.cate;
        let searchKey = this.$route.query.searchKey;
        if(cate){
          this.getTaskCategoryList(cate);
        }
        if(searchKey){
          this.searchTaskParams.taskName = searchKey;
          this.getSearchTask();
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
        padding: 0 13px;
        color: #000;
      }
      a.active{
        color: $mainColor;
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
      .task-category-commodity-page{
        padding:  0 20px 40px 20px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }



</style>
