<template>
  <div class="home">
    <top-tip></top-tip>
    <div class="home-top">
      <div class="container">
        <router-link  to="/" class="left mt-20">
          <img v-if="!isLogin || getUserInfoRole === 1" src="~assets/img/common/top-logo-sj.png" alt="" >
          <img v-if="isLogin && getUserInfoRole === 0" src="~assets/img/common/top-logo-xk.png" alt="" >
        </router-link >
        <div class="left">
          <div class="search-box">
            <div class="pos-rel">
              <div>
                <span class="active">宝贝</span>
              </div>
              <i class="ivu-icon ivu-icon-ios-search"></i>
              <input type="text" class="search-btn left" v-model="searchKey" @keydown="goKeyEnterFunc" autocomplete="off">
              <a @click="goTaskCategory" class="search left">搜索</a>
            </div>
          </div>
        </div>
       <!-- <router-link  to="/recommend-spread" class="seller-guide">
          <img src="/static/img/common/recommend_spread.gif" alt="">
        </router-link>-->
      </div>
    </div>
    <div class="home-nav">
      <div class="container">
        <div class="top-category">
          <p class=" text-ct">
            <Icon type="navicon" size="20" class="mt" style="margin-top: 2px"></Icon>
            <span class="ml-5">宝贝类目</span>
          </p>
          <ul class="top-category-list" v-if="$store.state.showTopCategoryRes">
            <li v-if="nav.id !== 600 && !isLogin" :class="[TaskCategoryActive === nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >
              <img width="16" height="16" :src="nvaImgSrc[nav.id]" class="vtc-mid"/>
              <span class="ml-5">{{nav.name}}</span>
            </li>
            <li v-if="isLogin" :class="[TaskCategoryActive === nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" style="padding: 4px 0">
              <img width="16" height="16" :src="nvaImgSrc[nav.id]" class="vtc-mid"/>
              <span class="ml-5">{{nav.name}}</span>
            </li>
            <li :class="[TaskCategoryActive === 'all' ? 'active' : '']" @click="selTaskCategoryAllFunc">
              <img width="16" height="16"  src="/static/img/nav-picture/home_26.png" class="vtc-mid"/>
              <span class="ml-5">全部活动</span>
            </li>
          </ul>
        </div>
        <div class="home-nav-list">
          <a :class="[activityCategory === 'home' ? 'active' : '']" @click="selTaskCategoryHome">首页</a>
          <a :class="[activityCategory === 'free_get' ? 'active' : '']" @click="selTaskCategoryFunc('free_get')" >
            <Tooltip :content="TaskCategoryActiveList['free_get'].desc" placement="bottom">
              免费领
            </Tooltip>
          </a>
          <a :class="[activityCategory === 'present_get' ? 'active' : '']" @click="selTaskCategoryFunc('present_get')" >
            <i style="position: absolute; top: -16px; left: 13px;">
              <img src="/static/img/icon/giveaway.gif" alt="" >
            </i>
            <Tooltip :content="TaskCategoryActiveList['present_get'].desc" placement="bottom">
              体验专区
            </Tooltip>
          </a>
          <!--<a :class="[activityCategory === 'pinkage_for_10' ? 'active' : '']" >-->
            <!--&lt;!&ndash;@click="selTaskCategoryFunc('pinkage_for_10')"&ndash;&gt;-->
            <!--<i style="position: absolute; top: -16px; left: 19px;">-->
              <!--<img src="/static/img/icon/franking.gif" alt="" >-->
            <!--</i>-->
            <!--<Tooltip :content="TaskCategoryActiveList['pinkage_for_10'].desc" placement="bottom">-->
              <!--10元包邮-->
            <!--</Tooltip>-->
          <!--</a>-->
          <!--<a :class="[activityCategory === 'price_low' ? 'active' : '']" >-->
            <!--&lt;!&ndash;@click="selTaskCategoryFunc('price_low')"&ndash;&gt;-->
            <!--<Tooltip :content="TaskCategoryActiveList['price_low'].desc" placement="bottom">-->
              <!--白菜价-->
            <!--</Tooltip>-->
          <!--</a>-->
          <!--<a :class="[$store.state.activityCategory == 'goods_clearance' ? 'active' : '']" @click="selTaskCategoryFunc('goods_clearance')" >-->
            <!--<i style="position: absolute; top: -16px; left: 15px;">-->
              <!--<img src="/static/img/icon/discount.gif" alt="" >-->
            <!--</i>-->
            <!--清仓断码-->

          <!--</a>-->
          <!--<a :class="[activityCategory === 'buyer-show' ? 'active' : '']" @click="linkToBuyerShow('buyer-show')">
            <i style="position: absolute; top: -17px; left: 34px;">
              <img src="/static/img/common/news.gif" alt="" >
            </i>
            买家秀</a>-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {setStorage, getStorage, encryption,removeStorage} from '@/config/utils'
  import Tooltip from 'iview/src/components/tooltip'
  import TopTip from '@/components/TopTip.vue'
  import api from '@/config/apiConfig'
  import Modal from 'iview/src/components/modal'
  import Button from 'iview/src/components/button'
  import Icon from 'iview/src/components/icon'
  export default {
    name: 'home',
    components: {
      TopTip: TopTip,
      api: api,
      Modal:Modal,
      iButton:Button,
      Icon: Icon,
      Tooltip: Tooltip,
    },
    data () {
      return {
        searchKey: '',
        navList: [],
        nvaImgSrc:{
          100: '/static/img/nav-picture/home_07.png',
          200: '/static/img/nav-picture/home_09.png',
          300: '/static/img/nav-picture/home_11.png',
          400: '/static/img/nav-picture/home_13.png',
          500: '/static/img/nav-picture/home_15.png',
          600: '/static/img/nav-picture/home_22.png',
          700: '/static/img/nav-picture/home_23.png',
          800: '/static/img/nav-picture/home_24.png',
          900: '/static/img/nav-picture/home_25.png',
          1000: '/static/img/nav-picture/home_27.png',
        },
      }
    },
    created(){
     this.getNavList();
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfoRole() {
        return this.$store.getters.getUserRole
      },
      TaskCategoryActive() {
        return this.$store.state.TaskCategoryActive
      },
      activityCategory() {
        return this.$store.state.activityCategory
      },
      TaskCategoryActiveList() {
        return this.$store.state.TaskCategoryActiveList
      },
    },
    methods: {
      linkToBuyerShow(activityCategory){
        let self = this;
        self.$router.push({ 'path': '/buyer-show'});
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: activityCategory
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: activityCategory
        });
      },
      selTaskCategoryHome(){
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'home'
        });
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: 'home'
        });
        self.$router.push({ 'path': '/'});
      },
      selTaskCategoryFunc(activityCategory){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'activityCategory' : activityCategory}});
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: activityCategory
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: activityCategory
        });
      },
      selTaskCategoryAllFunc(){
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all'
        });
        self.$router.push({ 'path': '/task-category', 'query': {'category': 'all', 'categoryId': 'all'}});
      },
      selTaskCategoryActiveFunc(nav){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'cate': nav.id, 'categoryId': nav.id}});
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: false
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all',
        });
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
      goKeyEnterFunc(ev){
        if(ev.keyCode === 13){
          this.goTaskCategory()
        }
      },
      goTaskCategory(){
        let self = this;
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: 'home'
        });
        if(self.searchKey){
          self.$router.push({ path: '/task-category', query: { searchKey: self.searchKey }})
        }else {
          self.$router.push({ 'path': '/task-category', 'query': {'category': 'all', 'categoryId': 'all'}});
        }

      }
    },
    watch: {
      '$route' (to, from) {
        let self = this;
        if(to.name === 'login'){
          self.searchKey = '';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .home-top {
    height: 142px;
    background-color: #fff;
    > div {
      background-color: #fff;
      div.search-box {
        margin-left: 20px;
        margin-top: 60px;
        a.search {
          display: inline-block;
          background-color: $mainColor;
          color: #fff;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
        }
        p.link-text {
          margin-top: 5px;
          a {
            color: #666;
            padding: 5px 1px;
            font-size: 13px;
          }
          a.active {
            color: $mainColor;
          }
        }
        > div.pos-rel {
          float: left;
          > div {
            position: absolute;
            top: -24px;
            left: 0;
            span {
              display: inline-block;
              height: 24px;
              width: 48px;
              text-align: center;
              background-color: #fff;
              color: $mainColor;
              line-height: 24px;
            }
            span.active {
              color: #fff;
              background-color: $mainColor;
            }

          }
        }
        i.ivu-icon-ios-search {
          position: absolute;
          top: 11px;
          left: 13px;
          font-size: 20px;
          color: #ccc;
          cursor: pointer;
        }
        i.ivu-icon-camera {
          position: absolute;
          top: 8px;
          right: 13px;
          font-size: 24px;
          color: #ccc;
          cursor: pointer;
        }
        input.search-btn {
          padding-left: 40px;
          padding-right: 40px;
          border: 3px solid $mainColor;
          height: 40px;
          outline: none;
          width: 400px;
        }
      }
      a.seller-guide{
        display: inline-block;
        margin-top: 35px;
        margin-left: 24px;
        img{
          width: 100%;
        }
      }
    }
  }
  .seller-enter{
    background: rgb(225, 41, 30) url("/static/img/icon/seller-icon.png") no-repeat 6px 7px;
  }
  .phone-enter{
    background: rgb(225, 41, 30) url("/static/img/icon/phone-icon.png") no-repeat 6px 7px;
  }
  .seller-enter,.phone-enter{
    color: rgb(255, 255, 255);
    float: right;
    height: 30px;
    line-height: 30px;
    padding: 0 20px 0 30px;
    border-radius: 4px;
    margin-top: 6px;
  }
  .home-nav {
    height: 42px;
    clear: both;
    background-color: $mainColor;
    .top-category{
      position: relative;
      width: 190px;
      float: left;
      background-color: $mainColor;
      &:hover .top-category-list{
        display: block;
      }
      > p {
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        i{
          font-size: 20px;
          vertical-align: -1px;
        }
      }
      .top-category-list{
        position: absolute;
        background-color: #fff;
        width: 190px;
        z-index: 3;
        border: 2px solid #ff6633;
        border-top: none;
        height: 411px;
        display: none;
        padding: 5px 0;
        li{
          padding: 6px 0;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          line-height: 28px;
          &:hover{
            background-color: #fdebee;
          }
        }
      }
    }
    div.home-nav-list {
      background-color: $mainColor;
      float: left;
      a {
        float: left;
        width: 100px;
        text-align: center;
        font-size: 16px;
        height: 42px;
        line-height: 42px;
        color: #fff;
        position: relative;
        i{
          position: absolute;
          top: -7px;
          right: -6px;
          img{
            display: block;
          }
        }
        &:hover{
          background-color: #fd5474;
        }
      }
      a.active{
        background-color: #fd5474;
        border-left: 2px solid $mainColor;
        border-right:2px solid $mainColor;
      }
    }
  }

</style>
