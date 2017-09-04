<template>
  <div class="personal-box">
    <div class="title">资金管理</div>
    <div class="personal-sel-top mt-20">
      <a v-for="(item,index) in myInfoSelects" :class="{active:infoSelect === item.isSelect}"
         @click="accountInit(item.isSelect);selectNavigate(item.isSelect)">{{item.text}}</a>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {setStorage, getStorage, removeStorage} from '@/config/utils'

  export default {
    name: 'MoneyManagement',

    data() {

      return {
        myInfoSelects: [
          {
            text: '账号信息',
            isSelect: 'AccountInfo',
          },
          {
            text: '充值',
            isSelect: 'PayMoney'
          },
          {
            text: '提现',
            isSelect: 'GetoutMoney'
          },
          {
            text: '交易记录',
            isSelect: 'TransactionRecord'
          },
          {
            text: '账户管理',
            isSelect: 'AccountManagement'
          }
        ],
        infoSelect: 'AccountInfo',
      }
    },
    mounted() {

    },
    created() {

      let type = getStorage("navChangeType");
      if(type){
        this.selectNavigate(type);
      }else{
        this.selectNavigate("accountInfo");
      }
    },
    computed: {

    },
    watch: {
      $route(to){
//        alert(1111)
        this.infoSelect = to.name;
      }
    },
    methods: {
      accountInit(name) {
        this.infoSelect = name;
        this.$router.push({name: name});
      },
      selectNavigate(type) {
        this.infoSelect = type;
        setStorage('navChangeType', type);
      },

    }
  }
</script>

<style lang="scss" >
  @import 'src/css/mixin';
  .personal-box {
    .pay{
      display: block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: $mainColor;
      color: #fff;
      text-align: center;
      border-radius: 2px;
    }
    .triangle{
      transform: translate(180deg);
    }
    .main-color {
      color: $mainColor;
    }
    .title {
      height: 52px;
      line-height: 52px;
      font-size: 20px;
      color: #666;
      border-bottom: 2px solid #F6F6F6;
    }
    .personal-sel-top {
      border-bottom: 1px solid $mainColor;
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
        background-color: $mainColor;
        color: #fff;
      }
    }
    .my-count {
      .my-money {
        border: 1px solid #f9f9f9;
        background-color: #f9f9f9;
        width: 100%;
        .my-money-left {
          width: 60%;
        }
        .my-money-right {
          width: 40%;
          padding: 10px;
          div {
            padding-bottom: 8px;
          }
          p {
            font-weight: 900;
          }
        }
      }
      .moneyInfoLeft, .moneyInfoRight {
        height: 100%;
        border-right: 1px solid gray;
        padding: 10px;
        width: 50%;
        text-align: center;

        p {
          margin-left: 5px;
          text-align: left;
          padding-top: 5px;
        }
      }

      .number {
        border-bottom: 1px solid gray;
        font-size: 20px;
        color: $mainColor;
        padding-bottom: 10px;
        height: 40px;
      }
      .view-details {
        padding-top: 10px;
        border-top: 1px solid gray;
        a:first-of-type {
          padding-right: 15px;
        }
        a:last-of-type {
          padding-left: 15px;
        }
      }
      .moneyInfoRight {
        .view-details {
          margin-top: 28px;
        }
        .sp, .sa {
          padding: 5px;
        }

      }
      .get-more a {
        display: inline-block;
        padding: 5px 20px;
        margin-top: 10px;
        margin-left: 10px;
        background-color: $mainColor;
        color: #fff;
      }
    }
    .my-account {
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
          border: 1px solid  #f3f3f3;
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
                text-align: left;
                padding-left: 20px;
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
      .modify-pwd {
        margin-top: 20px;
        font-size: 14px;
        border: 1px solid  #f3f3f3; ;
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
    .trading-record {
      margin-top: 30px;
      width: 100%;
      ul {
        li {
          float: left;
          padding: 5px 10px;
        }
        li:active{
          color: $mainColor;
        }
      }
    }
    .personal-list-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }
    .personal-list-table table td,
    .personal-list-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    .personal-list-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .personal-list-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .personal-list-table tr table {
      width: 100%;
    }
    .details {
      cursor: pointer;
      position: relative;
    }
    .detailsSpc{
      cursor: pointer;
      position: relative;
    }
    .small-table td {
      padding: 10px;
    }
    .small-table tbody:last-child{
      text-align: center;

    }
    .common-question {
      margin-top: 80px;
      padding-left: 10px;
    }
    .my-pay{
      .my-pay-top{
        padding: 10px;
        font-size: 14px;
        border-bottom: 1px solid #f4f4f4;
      }
      .my-pay-desc{
        padding: 80px 0px 0px 100px;
        font-size: 16px;
        .iinput{
          width: 150px;
          height: 30px;
        }
      }
      .pay-choice{
        height: 30px;
        line-height: 30px;
        input{
          vertical-align: middle;
        }
        .wx,.zfb{
          vertical-align: middle;
        }
      }
      .btn > button{
        width: 150px ;
        background-color: $mainColor;
        height: 30px;
        border: none;
        color: #fff;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        margin: 30px 0px 0px 230px;
      }
    }
    .my-transact{
      .choice-time{
        padding: 15px;
        border-bottom: 1px solid #F6F6F6;
        span{
          display: inline-block;
          padding: 5px 20px;
          color: #9FADB7;
        }
        span:nth-of-type(1){
          margin-left: 45px;
        }
        span.active{
          background-color: #DAE1E8;
          border-radius: 13px;
          color: #000;
        }
      }
      .transact-type{
        position: relative;
        padding: 15px;
        .checkBox{
          position: absolute;
          top: 13px;
          left: 86px;

        }
      }
      .activity-number{
        padding: 10px 15px;
      }
      .ibtn{
        background-color:$mainColor;
        color: #fff;
        font-size: 14px;
        margin-left: 84px;
        margin-top: 12px;
        width: 100px;
      }
      .line{
        height: 1px;
        border-bottom: 1px solid #F6F6F6;
      }
      .transaction-amount{
        padding: 20px 10px;
        font-size: 16px;
        .number{
          color: $mainColor;
        }
      }
    }
    .theSpecialBtn{
      border: none;
      background-color: #f9f9f9;
      cursor: pointer;
      outline: none;
      color: blue;
    }
    .my-getoutmoney{
      .not-certification{
        text-align: center;
        h2{
          margin-top: 80px;
          color: #7C7C7C;
          .icon:before{
            font-size: 30px;
          }
        }
        .how-todo{
          font-size: 16px;
          margin-top: 52px;
          color: #50A6FF;
          span:nth-of-type(1),
          span:nth-of-type(3){
            color: #BABABA;
          }
        }
      }
      .bound-bankcard{
        text-align: center;
        .bankcard-title{
          margin-top: 80px;
          .icon{
            /*vertical-align: middle;*/
          }
          .icon:before{
            color: #FF7F57;
            font-size: 30px;
            /*vertical-align: middle;*/

          }
          span{
            font-family:Microsoft YaHei ;
            font-size: 18px;
            color: #808080;
          }
        }
        .addcard{
          background-color: #F8F8F8;
          height: 140px;
          width: 260px;
          border: 1px dashed #D3D3D3;
          margin: 40px auto;
          cursor: pointer;
          .icon{
            margin-top: 35px;
            color: #58C1E5;
          }
          .icon:before{
            font-size: 35px;
          }
          p{
            font-family: Microsoft YaHei;
            font-size: 20px;
            color: #48B4DC;
          }
        }
      }
      .add-bankcard{
        .title{
          color: #FF6F42;
          height: 50px;
          position: relative;
          width: 700px;
          background-color: #FFF6F3;
          margin: 0 auto;
          margin-top: 60px;
          .icon{
            position: absolute;
            top: 11px;
          }
          .icon:before{
            font-size: 30px;
          }
          span{
            font-family: Microsoft YaHei;
          }
        }
        .ipt-information{
          margin-left: 96px;
          margin-top:36px;
          width: 500px;
          select{
            box-sizing: border-box;
            width: 300px;
            padding: 4px 7px;
            height: 32px;
            border: 1px solid #DDDEE1;
            border-radius: 2px;
          }
          select:focus{
            border:1px solid #FF855C ;
          }
          .formPosition{
            position: relative;
            .ibtn{
              position: absolute;
              top: 0;
              right: -120px;
            }
          }

        }
      }
      .get-out-number{
        .title{
          font-size: 14px;
          border-bottom: 1px solid #F4F4F4;
          padding: 0px 10px;
        }
        .content{
          font-size: 16px;
          .warning{
            color: #FF6F42;
            height: 40px;
            line-height: 40px;
            position: relative;
            width: 1000px;
            background-color: #FFF6F3;
            margin: 0 auto;
            margin-top: 20px;
            .icon{
              position: absolute;
              top: 11px;
            }
            .icon:before{
              font-size: 20px;
            }
            span{
              font-size: 16px;
              font-family: Microsoft YaHei;
            }
          }
          .get-out-do{
            padding: 20px 80px;
            .iInput{
              width: 200px;
              height: 40px;
            }
          }
          .psw{
            padding-left:46px ;
            span{
              color: #5CAAFF;
              cursor: pointer;
            }
          }
          .ibtns{
            width: 120px;
          }

        }
      }
      .getout-record{
        .titel{
          font-size: 14px;
          padding: 10px 15px;
          border-bottom: 1px solid #F5F5F5;
          .spr{
            color: #86BCFF;
          }
        }
        .content-input{
          padding: 10px 15px;
          border-bottom: 1px solid #F5F5F5;
          .ibtn1{
            margin-left: 10px;
            background-color: $mainColor;
            color: #fff;
            width: 100px;
          }
        }
        .content-select{
          padding: 10px 10px;
          span{
            width: 120px;
            padding: 6px 15px;
            background-color: #F8F8F8;
            text-align: center;
            cursor: pointer;
          }
          span:nth-of-type(2){
            border-left: 1px solid #F0F0F0;
            border-right: 1px solid #F0F0F0;
          }
          span.actives{
            background-color: $mainColor;
            color: #fff;
          }
        }
      }
    }
  }

</style>
