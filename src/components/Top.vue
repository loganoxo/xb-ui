<template>
  <div>
    <top-tip></top-tip>
    <div class="home-top">
      <div class="container">
        <router-link  to="/" class="left mt-20">
          <img src="~assets/img/common/top_logo.png" alt="" >
        </router-link>
        <div class="left">
          <div class="search-box">
            <div class="pos-rel">
              <div>
                <a href="" class="active">宝贝</a>
                <!--<a href="">店铺</a>-->
              </div>
              <i class="ivu-icon ivu-icon-ios-search"></i>
              <input type="text" class="search-btn" v-model="searchKey">
              <!--<i data-v-fae95c8a="" class="ivu-icon ivu-icon-camera"></i>-->
            </div>
            <!--<router-link  :to="{ 'path': '/task-category', 'query': {'searchKey': searchKey }}">搜索</router-link>-->
            <a @click="goTaskCategory">搜索</a>
            <p class="link-text">
              <a class="active" href="">男士内裤</a>
              <a class="active" href="">时尚连衣裙</a>
              <a href="">新款男鞋</a>
              <a href="">时尚跑鞋</a>
              <a href="">T恤</a>
              <a class="active" href="">女士凉鞋</a>
              <a href="">休闲短裤</a>
              <a href="">背带裤</a>
              <a href="">沙发垫</a>
              <a href="">面膜</a>
              <a href="">理发器</a>
              <a href="">装饰画</a>
              <a href="">更多></a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="home-nav">
      <div class="container">
        <router-link to="/">首页</router-link>
        <router-link v-for="nav in navList" :key="nav.id" :to="{ 'path': '/task-category', 'query': {'cate': nav.id}}">{{nav.name}}</router-link>
      </div>
    </div>
  </div>

</template>

<script>
  import TopTip from '@/components/TopTip.vue'
  import api from '@/config/apiConfig'
  export default {
    name: 'home',
    components: {
      TopTip: TopTip,
      api: api
    },
    data () {
      return {
          searchKey: '',
          navList: []
      }
    },
    created(){
     this.getNavList();
    },
    methods: {
      getNavList(){
        let self = this;
        api.getNavList().then((res) =>{
          if(res.status){
            res.data.sort(function(a,b){
              return a.sortIndex-b.sortIndex
            });
            self.navList = res.data;
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      goTaskCategory(){
        let self = this;
        if(self.searchKey){
          self.$router.push({ path: '/task-category', query: { searchKey: self.searchKey }})
        }else {
          self.$Message.info('搜索词不能为空');
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
        margin-left: 75px;
        margin-top: 60px;
        > a {
          display: inline-block;
          background-color: $mainColor;
          color: #fff;
          width: 122px;
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
          width: 504px;
        }
      }

    }
  }

  .home-nav {
    height: 42px;
    background-color: $mainColor;
    > div {
      background-color: $mainColor;
      a {
        float: left;
        width: 109px;
        text-align: center;
        font-size: 16px;
        height: 42px;
        line-height: 42px;
        color: #fff;

      }
    }
  }

</style>
