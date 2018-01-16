<template>
  <div class="personal-setting">
    <div class="personal-sel-top">
      <router-link :to="myInfoSelect.link" :key="myInfoSelect.link" v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect === myInfoSelect.isSelect}" v-if="myInfoFunc(index)">
        {{myInfoSelect.text}}
      </router-link>
    </div>
    <div class="personal-sel-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personalSetting',
    components: {},
    data() {
      return {
        userData: {},
        myInfoSelects: [
          {
            text: '账号信息',
            isSelect: 'PersonalAccountInfo',
            link: '/user/personal-setting/personal-account-info'
          },
          {
            text: '旺旺号绑定',
            isSelect: 'WwBind',
            link: '/user/personal-setting/ww-bind'
          },
          {
            text: '实名认证',
            link: '/user/personal-setting/verified',
            isSelect: 'Verfied',
          },
        ],
        infoSelect: '',
      }
    },
    mounted() {

    },
    created() {
      let self = this;
      self.infoSelect = self.$route.name;
    },
    computed: {},
    methods: {
      myInfoFunc(index){
        if(index === 1){
          return this.$store.state.userInfo.role !== 1;
        }else {
          return true;
        }
      },
    },
    watch: {
      $route(to){
        this.infoSelect = to.name;
      }
    },
  }
</script>

<style lang="scss">
  .personal-setting{
    .personal-sel-top {
      border-bottom: 1px solid #FF845B;
      a {
        background-color: #fff;
        color: #666;
        display: inline-block;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        width: 144px;
        text-align: center;
      }
      a.active {
        background-color: #FF845B;
        color: #fff;
      }
    }

    .user-info-box {
      margin-top: 20px;
      .user-basic {
        border: 1px solid #EEEEEE;
        overflow: hidden;
        P.user-basic-title {
          padding: 0 20px;
          height: 36px;
          line-height: 36px;
          background-color: #f8f8f8;
        }
        p.img-box {
          width: 800px;
          img {
            margin: 0 10px 5px 10px;
          }
        }
        .user-basic-ctt {
          padding: 25px 0;
          > div {
            width: 13%;
          }
          > ul {
            margin-top: 5px;
            width: 80%;
            line-height: 30px;
            font-size: 14px;
          }
        }
        .edit-head {
          padding-left: 33px;
          margin-top: 12px;
          padding-bottom: 26px;
        }
      }
      .user-safe {
        margin-top: 20px;
        P {
          padding: 0 20px;
          height: 36px;
          line-height: 36px;
          background-color: #f8f8f8;
        }
        ul {
          width: 100%;
          li {
            ul {
              display: table;
              height: 60px;
              font-size: 14px;
              li {
                display: table-cell;
                vertical-align: middle;
                text-align: center;
              }
              li.one {
                width: 30%;
              }
              li.two {
                width: 50%;
                text-align: left;
              }
              li.three {
                width: 20%;
              }
            }
          }
        }
      }
      .my-account {
        .modify-pwd {
          margin-top: 20px;
          font-size: 14px;
          border: 1px solid #f3f3f3;;
          padding-bottom: 20px;
          .modify-pwd-sel {
            > P {
              padding: 0 20px;
              height: 36px;
              line-height: 36px;
              background-color: #f8f8f8;
            }
            .sel-box {
              margin-top: 50px;
              > p {
                width: 20%;
                text-align: center;
              }
              > div {
                width: 80%;
                .sel-canal {
                  border: 1px solid #E8E8E8;
                  width: 500px;
                  height: 70px;
                  display: table;
                  margin-bottom: 15px;
                  padding-left: 20px;
                  cursor: pointer;
                  p {
                    display: table-cell;
                    vertical-align: middle;
                    width: 95%;
                  }
                }
              }
            }
          }
        }
      }
    }

    .verified-box {
      width: 830px;
      margin: 30px auto auto auto;
      .verified-form {
        margin-top: 20px;
        width: 400px;
        float: left;
        .verified-btn {
          background-color: #FF6865;
          color: #fff;
        }
      }
      .verified-cue {
        p {
          height: 36px;
          line-height: 36px;
          margin-bottom: 21px;
          margin-left: 30px;
          a {
            margin-right: 30px;
          }
        }
      }
      .error-result-text {
        margin-left: 116px;
        clear: both;
        font-size: 14px;
      }
      .verified-result {
        p:first-child {
          font-size: 30pt;
          margin: auto;
          width: 500px;
          color: #666;
        }
        p:last-child {
          font-size: 14px;
          margin: 60px auto;
          width: 600px;
          color: #999;
        }
      }
      .ver-tip {
        margin-left: 116px;
        width: 600px;
        line-height: 30px;
        font-size: 14px;
        color: #999;
        padding-bottom: 30px;
      }
    }

    .ww-account-box {
      .ww-account-list {
        > a {
          margin: 20px 0 20px 10px;
          display: block;
          background-color: #F8F8F8;
          border: 1px solid #E8E8E8;
          color: #666;
          width: 120px;
          text-align: center;
          height: 36px;
          line-height: 36px;
          font-size: 12px;
        }
        .ww-account-title {
          display: table;
          width: 100%;
          background-color: #DDDDDD;
          color: #000;
          height: 38px;
          text-align: center;
          margin-top: 20px;
          li {
            display: table-cell;
            vertical-align: middle;
            width: 20%;
          }
        }
        .ww-account-ctt {
          display: table;
          width: 100%;
          background-color: #FFFFFF;
          color: #999;
          height: 38px;
          border: 1px solid #E2E2E2;
          border-top: none;
          text-align: center;
          li {
            display: table-cell;
            vertical-align: middle;
            word-wrap: break-word;
            word-break: break-all;
            width: 20%;
          }
        }
      }
      .ww-account-bind {
        width: 830px;
        margin: 30px auto auto auto;
        .ww-account-form {
          width: 400px;
          float: left;
          .ww-bind-btn {
            background-color: #FF6865;
            color: #fff
          }
        }
        .ww-account-cue {
          p {
            height: 36px;
            line-height: 36px;
            margin-bottom: 21px;
            margin-left: 30px;
            a {
              margin-right: 30px;
            }
          }
        }
        .error-result-text {
          margin-left: 102px;
          clear: both;
          font-size: 14px;
        }
      }
      .ww-tip{
        margin-left: 102px;
        width: 600px;
        line-height: 30px;
        font-size: 14px;
        color: #999;
        padding-bottom: 30px;
      }
      .look-image {
        margin-left: 150px;
      }

      .look-image-tip-text {
        margin-left: 150px;
        margin-top: 4px;
        width: 392px;
        line-height: 24px;
      }
    }

  }
</style>
