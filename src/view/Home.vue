<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left mr-10">
            <ul>
              <li v-for="taskTopLeft in taskTopLeftList">
                <div class="left img-box">
                  <img :src="taskTopLeft.task.taskMainImage" alt="" width="54px">
                </div>
                <div class="left text-box ml-10">
                  <p>{{taskTopLeft.showkerPhone}}成功领取了</p>
                  <p>
                    <span class="left"
                          style="width: 84px; overflow: hidden; text-overflow: ellipsis; white-space:nowrap;">{{taskTopLeft.task.taskName}}</span>
                    <span class="text left ml-5">￥{{taskTopLeft.task.itemPrice / 100}}</span>
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
                <img src="~assets/img/common/home_24.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-10">
                <router-link to="/register">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
            </div>
            <div class="login-in-box" v-show="isLogin &&　getUserInfoRole　== 0">
              <div>
                <img class="left ml-20" src="~assets/img/common/home_24.png" alt="">
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>Hi~{{getUserInfo.phone}}</p>
                  <router-link to="/user/user-home">个人中心</router-link>
                  <a @click="goOut">[ 退出登录 ]</a>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link to="/user">8</router-link>
                  个
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">10</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">0</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">0</router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待领取</span>
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待下单</span>
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待交报告</span>
                </div>
              </div>
            </div>
            <div class="login-in-box" v-show="isLogin &&　getUserInfoRole　== 1">
              <div>
                <img class="left ml-20" src="~assets/img/common/home_24.png" alt="">
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <p>Hi~{{getUserInfo.phone}}</p>
                  <router-link to="/user">个人中心</router-link>
                  <a @click="goOut">[ 退出登录 ]</a>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link to="/user">8</router-link>
                  个
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">10</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">0</router-link>
                  <router-link class="left text-ct" style="width: 33.33%;" to="/user">0</router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待审秀客</span>
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待审订单</span>
                  <span class="left text-ct" style="width: 33.33%;" to="/user">待审报告</span>
                </div>
              </div>
            </div>
            <div class="notice-box">
              <p>
                <a v-for="notice in noticeList" :class="[noticeActive == notice.active ? 'active' : '']"
                   @click="changeNoticeTab(notice)">{{notice.title}}</a>
              </p>
              <div v-for="notice in noticeList" v-show="noticeActive == notice.active"
                   class="notice-text animated fadeIn">
                <a v-for="content in notice.content" :href="content.url" class="circle-text">{{content.text}}</a>
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
            <router-link class="home-commodity-details"
                         v-for="homeCommodity in homeCommodityList"
                         :title="homeCommodity.taskName"
                         :key="homeCommodity.id"
                         :to="{ 'path': '/task-details','query': {'taskId': homeCommodity.id}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeCommodity.taskMainImage" alt="" style="width: 220px; height: 220px;">
              </div>
              <div class="home-commodity-text">
                <p>{{homeCommodity.taskName}}</p>
                <p>
                  <span class="left">￥{{homeCommodity.itemPrice / 100}}</span>
                  <span class="right">免费试用</span>
                </p>
              </div>
            </router-link>
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
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    beforeMount() {
      this.changeTopShow();
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
    data() {
      return {
        homeCommodityList: [],
        noticeList: [
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
        noticeActive: 'faq',
        taskTopLeftList: []
      }
    },
    created() {
      this.getHomeTaskList();
      this.getHomeTaskTopLeftList();
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfo() {
        return this.$store.state.userInfo
      },
      getUserInfoRole() {
        return this.$store.state.userInfo.role
      }
    },
    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      ...mapMutations({
        changeTopShow: 'CHANGE_TOP_SHOW'
      }),
      goOut() {
        let _this = this;
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'login'})
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      getHomeTaskTopLeftList() {
        let self = this;
        api.getHomeTaskTopLeftList().then((res) => {
          if (res.status) {
            self.taskTopLeftList = res.data;
          }
        })
      },
      getHomeTaskList() {
        let self = this;
        api.getHomeTaskList().then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeCommodityList = res.data;
            }
          } else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      changeNoticeTab(notice) {
        this.noticeActive = notice.active;
      }
    }
  }
</script>

<style lang="scss" scoped>

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
            div.text-box {
              p {
                line-height: 26px;
                height: 26px;
                font-size: 14px;
                &:first-child {
                  color: #999;
                }
                &:last-child {
                  span.text {
                    color: $mainColor;
                    font-weight: bold;
                  }
                }
              }

            }
          }
        }
      }
      .middle-ctt {
        width: 610px;
      }
      .right-ctt {
        float: right;
        width: 285px;
        height: 400px;
        .login-up-box {
          background-color: #fff;
          padding: 15px;
          height: 172px;
          margin-bottom: 10px;
          img {
            display: block;
            margin: auto auto 15px auto;
          }
          p {
            text-align: center;
          }
          a {
            display: inline-block;
            width: 119px;
            background-color: $mainColor;
            color: #fff;
            text-align: center;
            height: 30px;
            line-height: 30px;
            &:first-child {
              margin-right: 10px;
            }
          }
        }
        .login-in-box {
          background-color: #fff;
          padding: 15px;
          height: 172px;
          margin-bottom: 10px;
        }
        .notice-box {
          background-color: #fff;
          height: 218px;
          p {
            display: table;
            width: 100%;
            height: 30px;
            a {
              color: #999;
              text-align: center;
              display: table-cell;
              vertical-align: middle;
              width: 33.33%;
              border-bottom: 1px solid #ddd;
            }
            a.active {
              border-right: 1px solid #ddd;
              border-left: 1px solid #ddd;
              border-top: 1px solid #ddd;
              border-bottom: none;
            }
          }
          .notice-text {
            padding: 8px 0 0 20px;
            a {
              display: block;
              line-height: 35px;
              height: 35px;
              color: #999;
            }
          }
        }
      }
    }
    .home-commodity {
      background-color: #fff;
      border: 1px solid #E8E8E8;
      .home-commodity-title {
        img {
          display: block;
          margin: 28px auto 10px auto;
        }
        p {
          color: #999;
        }
      }
      .home-commodity-ctt {
        padding: 24px;
        text-align: left;
        .home-commodity-details {
          width: 222px;
          display: inline-block;
          margin: 0 4px 30px 4px;
          .home-commodity-img {
            border: 1px solid #ddd;
          }
          .home-commodity-text {
            background-color: #EEEEEE;
            padding: 5px;
            p {
              line-height: 35px;
              height: 35px;
              font-size: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              &:first-child {
                color: #000;
                text-align: left;
              }
              &:last-child {
                color: #FF6633;
                span:last-child {
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
