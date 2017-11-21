<template>
  <div>
    <top-tip></top-tip>
    <div class="home-top">
      <div class="container">
        <router-link  to="/" class="left mt-20">
          <img v-if="!isLogin || getUserInfoRole == 1 " src="~assets/img/common/top_logo.png" alt="" >
          <img v-if="isLogin &&　getUserInfoRole == 0"  src="~assets/img/common/top_logo_xk.png" alt="" >
        </router-link >
        <div class="left">
          <div class="search-box">
            <div class="pos-rel">
              <div>
                <a href="" class="active">宝贝</a>
                <!--<a href="">店铺</a>-->
              </div>
              <i class="ivu-icon ivu-icon-ios-search"></i>
              <input type="text" class="search-btn left" v-model="searchKey" @keydown="goKeyEnterFunc"  autocomplete="off">
              <!--<i data-v-fae95c8a="" class="ivu-icon ivu-icon-camera"></i>-->
              <a @click="goTaskCategory" class="search left">搜索</a>
            </div>

            <!--<p class="link-text">-->
              <!--<a class="active" href="">男士内裤</a>-->
              <!--<a class="active" href="">时尚连衣裙</a>-->
              <!--<a href="">新款男鞋</a>-->
              <!--<a href="">时尚跑鞋</a>-->
              <!--<a href="">T恤</a>-->
              <!--<a class="active" href="">女士凉鞋</a>-->
              <!--<a href="">休闲短裤</a>-->
              <!--<a href="">背带裤</a>-->
              <!--<a href="">沙发垫</a>-->
              <!--<a href="">面膜</a>-->
              <!--<a href="">理发器</a>-->
              <!--<a href="">装饰画</a>-->
              <!--<a href="">更多></a>-->
            <!--</p>-->

          </div>
        </div>
        <router-link v-if="!($store.state.userInfo.role == 0)" to="/seller-adv" class="seller-guide">
          <img src="/static/img/common/seller-guide.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="home-nav">
      <div class="container">
        <div class="top-category">
          <p class=" text-ct">
            <Icon type="navicon" style="font-size: 20px;margin-top: 2px"></Icon>
            <span class="ml-5">活动分类</span>
          </p>
          <ul class="top-category-list" v-if="$store.state.showTopCategoryRes">
            <li  v-if="nav.name != '美食/特产' && nav.name != '其它试用'" :class="[$store.state.TaskCategoryActive == nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >
              <img width="16" height="16"  :src="nvaImgSrc[nav.id]" alt="" style="vertical-align: -3px;">
              <span class="ml-5">{{nav.name}}</span>
            </li>
            <li :class="[$store.state.TaskCategoryActive == 'all' ? 'active' : '']" @click="selTaskCategoryAllFunc">
              <img width="16" height="16"  src="/static/img/nav-picture/home_26.png" alt="">
              <span class="ml-5">全部活动</span>
            </li>
          </ul>
        </div>
        <div class="home-nav-list">
          <a :class="[$store.state.activityCategory == 'home' ? 'active' : '']" @click="selTaskCategoryHome">首页</a>
          <a :class="[$store.state.activityCategory == 'free_get' ? 'active' : '']" @click="selTaskCategoryFunc('free_get')" >免费领</a>
          <a :class="[$store.state.activityCategory == 'pinkage_for_10' ? 'active' : '']" @click="selTaskCategoryFunc('pinkage_for_10')" >
            <i style="position: absolute; top: -16px; left: 19px;">
              <img src="/static/img/icon/franking.gif" alt="" >
            </i>
            10元包邮
          </a>
          <a :class="[$store.state.activityCategory == 'present_get' ? 'active' : '']" @click="selTaskCategoryFunc('present_get')" >
            <i style="position: absolute; top: -16px; left: 9px;">
              <img src="/static/img/icon/giveaway.gif" alt="" >
            </i>
            体验专区
          </a>
          <a :class="[$store.state.activityCategory == 'price_low' ? 'active' : '']" @click="selTaskCategoryFunc('price_low')">
            <!--<i>-->
              <!--<img src="/static/img/common/new.gif" alt="">-->
            <!--</i>-->
            白菜价
          </a>
          <a :class="[$store.state.activityCategory == 'goods_clearance' ? 'active' : '']" @click="selTaskCategoryFunc('goods_clearance')" >
            <i style="position: absolute; top: -16px; left: 15px;">
              <img src="/static/img/icon/discount.gif" alt="" >
            </i>
            清仓断码
          </a>
          <a  @click="buyerShowPop = true">买家秀</a>
          <!--<a :class="[$store.state.TaskCategoryActive == 'all' ? 'active' : '']" @click="selTaskCategoryAllFunc">全部活动</a>-->
          <!--<a v-if="nav.name != '美食/特产' && nav.name != '其它试用'" :class="[$store.state.TaskCategoryActive == nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >{{nav.name}}</a>-->
        </div>
      </div>
    </div>
    <Modal v-model="buyerShowPop" width="300" height="400">
      <div class="text-ct">
        <div style="height: 20px"></div>
        Coming soon，敬请期待！
        <div style="height: 20px"></div>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" long large @click="buyerShowPop = false">确定</iButton>
      </div>
    </Modal>
  </div>

</template>

<script>
  import {setStorage, getStorage, encryption,removeStorage} from '@/config/utils'
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
      Icon: Icon
    },
    data () {
      return {
        searchKey: '',
        navList: [],
        buyerShowPop:false,
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
          1000: '/static/img/nav-picture/home_26.png',
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
    },
    methods: {
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
        self.$router.push({ 'path': '/task-category', 'query': {'searchAll': 'yes'}});
      },
      selTaskCategoryActiveFunc(nav){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'cate': nav.id}});
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
          self.$Message.info('搜索词不能为空');
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
            a {
              display: inline-block;
              height: 24px;
              width: 48px;
              text-align: center;
              background-color: #fff;
              color: $mainColor;
              line-height: 24px;
            }
            a.active {
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
        width: 150px;
        margin-top: 10px;
        margin-left: 33px;
        img{
          width: 100%;
        }
      }
    }
  }

  .home-nav {
    height: 42px;
    clear: both;
    background-color: $mainColor;
    .top-category{
      position: relative;
      width: 190px;
      float: left;
      background-color: #FF3600;
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
        li{
          padding: 7px 0;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          line-height: 31px;
          &:hover{
            background-color: #ffe4dc;
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
          background-color: #ff9966;
        }
      }
      a.active{
        background-color: #ff9966;
        border-left: 2px solid $mainColor;
        border-right:2px solid $mainColor;
      }
    }
  }

</style>
