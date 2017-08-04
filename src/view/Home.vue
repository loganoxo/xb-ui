<template>
  <div>
    <top-tip></top-tip>
    <div class="home-top">
      <div class="container">
        <img src="~assets/img/common/top_logo.png" alt="" class="left mt-20">
        <div class="left">
          <div class="search-box">
            <div class="pos-rel">
              <div>
                <a href="" class="active">宝贝</a>
                <a href="">店铺</a>
              </div>
              <i class="ivu-icon ivu-icon-ios-search"></i>
              <input type="text" class="search-btn">
              <i data-v-fae95c8a="" class="ivu-icon ivu-icon-camera"></i>
            </div>
            <a href="">搜索</a>
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
        <a href="">首页</a>
        <a href="">潮流女装</a>
        <a href="">精品男装</a>
        <a href="">时尚配饰</a>
        <a href="">美容护肤</a>
        <a href="">家具日用</a>
        <a href="">鞋子箱包</a>
        <a href="">数码家电</a>
        <a href="">综合试用</a>
      </div>
    </div>
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
            <a href="" class="left">
              <img class="block" src="~assets/img/home/home_07.png" alt="">
            </a>
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
                <a class="active">常见问题</a>
                <a>秀客规则</a>
                <a>商家规则</a>
              </p>
              <div class="notice-text">
                <a href="" class="circle-text">
                  如何编辑和提交试用报告？
                </a>
                <a href="" class="circle-text">
                  如何到指定平台下单领取？
                </a>
                <a href="" class="circle-text">
                  发布试用品需要什么条件？
                </a>
                <a href="" class="circle-text">
                  试用担保金没有及时返还怎么办？
                </a>
                <a href="" class="circle-text">
                  如何领取试用担保金
                </a>
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
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </a>
            <a href="" class="home-commodity-details">
              <div class="home-commodity-img">
                <img class="block" src="~assets/img/home/home_19.png" alt="">
              </div>
              <div class="home-commodity-text">
                <p>【试潮品】迷你小音响</p>
                <p>
                  <span class="left">￥2999.00</span>
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
  import TopTip from "@/components/TopTip.vue";
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
  export default {
    name: 'home',
    components: {
      TopTip: TopTip,
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      Radio: Radio,
      Modal: Modal
    },
    data () {
      return {}
    },
    created(){
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfo() {
        return this.$store.state.userInfo
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
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
        width: 120px;
        text-align: center;
        font-size: 16px;
        height: 42px;
        line-height: 42px;
        color: #fff;

      }
    }
  }

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
          margin: 0 2px 30px 2px;
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
