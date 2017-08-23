<template>
  <div class="personal-box">
    <div class="title">资金管理</div>
    <div class="personal-sel-top mt-20">
      <a v-for="(myInfoSelect,index) in myInfoSelects" :class="{active:infoSelect === myInfoSelect.isSelect}" @click="accountInit(myInfoSelect.isSelect)">{{myInfoSelect.text}}</a>
    </div>
    <div class="my-count mt-10" v-show="infoSelect === 'account'">
      <div class="my-money clear" v-model="userList">
          <div class="my-money-left left">
            <div class="moneyInfoLeft left">
              <div >可用余额（元）</div>
              <div class="number mt-5 ">{{userList.userAccount.accountBalance}}</div>
              <p>收入金额（元）：{{userList.userAccount.amountIncomes}}</p>
              <p >支出金额（元）：{{userList.userAccount.amountPayment}}</p>
              <div class="view-details mt-10">
                <a>我要充值</a>
                <a>查看明细</a>
              </div>
            </div>
            <div class="moneyInfoRight right">
              <div >提现金额（元）</div>
              <div class="number mt-5 ">{{userList.userAccount.enChashingMoney}}</div>
             <div class="clear">
               <span class="sp left">提现帐号：未添加</span>
               <a href="javascript:;" class="sa right">添加</a>
             </div>
              <div class="view-details ">
                <a href="javascript:;">我要充值</a>
                <a href="javascript:;">查看明细</a>
              </div>
            </div>
          </div>
          <div class="my-money-right  right">
            <div>账户名：{{userList.phone}}</div>
            <div>真实姓名：{{userList.realName}}</div>
            <div>
              <span>实名认证：未认证</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">去认证</a>
            </div>
            <div>绑定手机：{{userList.phone}}</div>
            <div >注册时间：{{userList.createTime | dateFormat('YYYY-MM-DD hh-mm-ss')}}</div>
            <p>上次登录时间：{{userList.lastLoginTime| dateFormat('YYYY-MM-DD hh-mm-ss')}}</p>
          </div>
      </div>
      <div class="trading-record ">
        <ul class="clear">
          <li>最近交易记录</li>
          <li><a href="javascript:;" @click="getTradList(null)">全部</a></li>
          <li><a href="javascript:;" @click="getTradList(0)">充值记录</a></li>
          <li><a href="javascript:;" @click="getTradList(1)">提现记录</a></li>
          <li><a href="javascript:;" @click="getTradList(2)">活动记录</a></li>
          <li><a href="javascript:;" @click="getTradList(3)">其它</a></li>
        </ul>
      </div>
      <div class="personal-list-table mt-10">
        <table class="list-table">
          <thead>
          <tr>
            <th style="width: 20%">交易时间</th>
            <th style="width: 40%">交易类型</th>
            <th style="width: 20%">交易金额（元）</th>
            <th style="width: 20%">操作</th>
          </tr>
          </thead>
          <tbody v-for="item in myTableDetails">
          <tr>
            <td>
              <p>2017-08-03</p>
              <p>14:20</p>
            </td>
            <td>
              <p>活动</p>
              <p>活动编号：11111111</p>
            </td>
            <td class="main-color">-100</td>
            <td>
              <p style="color:blue;" class="details" @click="detailsInit(item.id)">详情</p>
            </td>
          </tr>
          <tr v-show="detailSelect===item.id" >
           <td colspan="4" style="padding: 0px;">
             <table class="small-table" style="background-color: #f9f9f9;">
               <thead>
               <tr>
                 <th style="width:20%;">交易时间</th>
                 <th style="width:30%;">流水号</th>
                 <th style="width:30%;">交易明细</th>
                 <th style="width:10%;">交易金额（元）</th>
               </tr>
               </thead>
               <tbody>
                <tr>
                  <td>
                    <p>2017-08-03</p>
                    <p>14:20</p>
                  </td>
                  <td>
                    1924-1111111111-222
                  </td>
                  <td>
                    <p>任务结算返款</p>
                    <p>活动编号：11113244325324</p>
                  </td>
                  <td>
                    +10
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>2017-08-02</p>
                    <p>10:20</p>
                  </td>
                  <td>
                    1924-234455656-222
                  </td>
                  <td>
                    <p>补充任务担保金</p>
                    <p>活动编号：11113244325324</p>
                  </td>
                  <td>
                    +10
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>2017-08-02</p>
                    <p>10:20</p>
                  </td>
                  <td>
                    1924-234455656-222
                  </td>
                  <td>
                    <p>补充任务担保金</p>
                    <p>活动编号：11113244325324</p>
                  </td>
                  <td>
                    +10
                  </td>
                </tr>
               </tbody>
             </table>
           </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="get-more">
        <a href="javascript:;">查看所有交易记录</a>
      </div>
    </div>
    <div class="my-pay" v-show="infoSelect === 'pay'">
      slflasfjkdlasfjksldafjksldfjsldfjsdlfsjdkdlfjsldfjsldjflksjdflskjfsljfsfjkfjkffdk
    </div>
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10">
        <h3>充值多久后到账？</h3>
        <p>充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
      </div>
      <div class="mt-10">
        <h3>提现需要注意的事项？</h3>
        <p>1、一次提现的金额限额（最大金额）是20000元；</p>
        <p>2、每日提现次数不超过三次，每日的时间节点为今日凌晨零点到次日凌晨零点；</p>
        <p>3、按提现金额收取1%/笔的手续费，每笔手续费最低2元，最高30元；</p>
      </div>
      <div class="mt-10">
        <h3>提现多久后到账？</h3>
        <p> 提现申请提交后，工作人员会在1-2个工作日内为您办理提现手续（遇节假日或其它特殊情况，以网站公告的具体处理时限为准），工作日<br/>
          不包括星期六和星期日，银行卡提现可能会因为跨行转账导致到账时间有所延迟。
        </p>
        <p>注：工作日怎么计算呢？举个例子来说，如果您星期五提交的提现申请，从星期一开始计算，星期一算是1个工作日，星期二算是2个工作<br/>
          日，会在星期二24：00前处理，当然啦，如果遇到节假日，那节假日是不算在工作日里的</p>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import dateFormat from  '@/filter/custom'

  export default {
    name: 'MoneyManagement',
    data() {
      return{
        myInfoSelects:[
          {
            text: '账号信息',
            isSelect: 'account',
            callback:this.accountInit
          },
          {
            text: '充值',
            isSelect: 'pay'
          },
          {
            text: '提现',
            isSelect: 'getOut'
          },
          {
            text: '交易记录',
            isSelect: 'jiaoYiJiLu'
          },
          {
            text: '账户管理',
            isSelect: 'accountInfo'
          }
        ],
        myTableDetails:[
          {
            id:1
          },
          {
            id:2
          },
          {
            id:3
          }
        ],
        infoSelect:'account',
        detailSelect:'false',
        userList:{},

      }
    },
    mounted() {

    },
    created() {
      this.getUserAccount();
      this.getTradList(null)
    },
    computed: {},
    methods: {
      accountInit(type){
        this.infoSelect = type
      },
      detailsInit(type){
       if ( this.detailSelect===type){
         this.detailSelect = 'none'
       }else {
         this.detailSelect=type
       }
      },
//      获取账户信息
      getUserAccount(){
        let _this = this;
        api.getUserAccount().then(res => {
          if (res.status) {
            _this.userList = res.data;
//            console.log( _this.userList);
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getTradList(type){
        let _this = this;
        api.getTradList({
          createTimeStart:null,
          createTimeEnd: null,
          accountChangeType: type,
          reversePicUrl: null,
          taskSerial: null
        }).then(res => {
          if (res.status) {
            console.log( res.data);
          } else {
            _this.$Message.error(res.msg);
          }
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .personal-box {
    .mian-color{
      color: $mainColor;
    }
    .title{
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
    .my-count{
      .my-money{
        border: 1px solid #f9f9f9;
        background-color: #f9f9f9;
        width: 100%;
        .my-money-left{
          width: 60%;
        }
        .my-money-right{
          width: 40%;
          padding: 10px;
          div{
            padding-bottom: 8px;
          }
          p{
            font-weight: 900;
          }
        }
      }
      .moneyInfoLeft,.moneyInfoRight{
        height: 100%;
        border-right: 1px solid gray;
        padding: 10px;
        width: 50%;
        text-align: center;

        p{
          margin-left: 5px;
          text-align: left;
          padding-top: 5px;
        }
      }

      .number{
        border-bottom: 1px solid gray;
        font-size: 20px;
        color: $mainColor;
        padding-bottom: 10px;
        height: 40px;
      }
      .view-details{
        padding-top: 10px;
        border-top: 1px solid gray;
        a:first-of-type{
          padding-right: 15px;
        }
        a:last-of-type{
          padding-left: 15px;
        }
      }
      .moneyInfoRight{
        .view-details{
          margin-top: 28px;
        }
        .sp,.sa{
          padding: 5px;
        }

      }
      .get-more a{
        display: inline-block;
        padding: 5px 20px ;
        margin-top: 10px;
        margin-left: 10px;
        background-color: $mainColor;
        color: #fff;
      }
    }
    .trading-record{
      margin-top: 30px;
      width: 100%;
      ul{
        li{
          float: left;
          padding: 5px 10px;
        }
      }
    }
    .personal-list-table table{
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
    .personal-list-table tr table{
      width: 100%;
    }
    .details{
      cursor:pointer;
      position: relative;
    }
    .details::before{
      content: "▲";
      color: blue;
      position: absolute;
      top: 0;
      right: 70px;
    }
    .details.active .details::before{
      transform: rotate(90deg);
    }
    .small-table td{
      padding: 10px;
    }
    .common-question{
      margin-top: 80px;
      padding-left: 10px;
    }


  }

</style>
