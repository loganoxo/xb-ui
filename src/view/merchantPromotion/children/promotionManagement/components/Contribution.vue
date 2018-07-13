<template>
  <div class="contribution">
    <div class="clear date-picker">
      <div class="left">
        <span>起止日期：</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="beginTime" format="yyyy-MM-dd HH:mm:ss" @on-change="beginTimeFun">
        </Date-picker>
        <span>-</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="endTime" format="yyyy-MM-dd HH:mm:ss" @on-change="endTimeFun"></Date-picker>
      </div>
      <div class="choice-time left">
        <span class="cursor-p" v-for="item in choiceTime" :class="{active:timeSelect === item.isSelect} " @click="getTargetTime(item.id,item.isSelect)">{{item.text}}</span>
      </div>
    </div>
    <div class="phone-search mt-15">
      <span class="mr-10">手机号</span>
      <i-input v-model="phoneNumber" style="width: 25%;"></i-input>
      <i-button class="pl-20 pr-20 cl-fff bg-main-color ml-20">筛选</i-button>
    </div>
    <div class="table-area mt-20">
      <ul class="table">
        <li class="t-head">
          <div>提成来源</div>
          <div>总提成</div>
          <div>最近一次提成时间</div>
          <div>TA的上级</div>
          <div>TA的代理商</div>
          <div>操作</div>
        </li>
        <li>
          <div>13000000000</div>
          <div>+1000.00</div>
          <div>2018-05-06 11:11:11</div>
          <div>13000000001</div>
          <div>13000000002</div>
          <div class="blue">查看明细</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Input, Button} from 'iview'
  export default {
    name: "contribution",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      iInput: Input,
      iButton: Button
    },
    data() {
      return {
        beginTime: null,
        endTime: null,
        choiceTime: [
          {
            text: '今天',
            isSelect: 'today',
            id: 0

          },
          {
            text: '昨天',
            isSelect: 'yesterday',
            id: 1
          },
          {
            text: '最近一个月',
            isSelect: 'oneMouth',
            id: 2
          },
          {
            text: '全部',
            isSelect: 'all',
            id: 3
          }
        ],
        timeSelect: 'all',
        phoneNumber: null
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      beginTimeFun(e) {
        this.beginTime = e;
        this.tradTimeStart = e;
      },
      endTimeFun(e) {
        this.endTime = e;
        this.tradTimeEnd = e;
      },
      getTargetTime(type, select) {
        let _this = this;
        _this.timeSelect = select;

        function getDateStr(time) {
          let date = new Date();
          date.setDate(date.getDate() + time);
          let seperator1 = "-";
          let seperator2 = ":";
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          return date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + '00' + seperator2 + '00' + seperator2 + '00';
        }

        if (type === 0) {
          _this.beginTime = getDateStr(0);
          _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(0);
          _this.tradTimeEnd = getDateStr(1);
        } else if (type === 1) {
          _this.beginTime = getDateStr(-1);
          _this.endTime = getDateStr(0);
          _this.tradTimeStart = getDateStr(-1);
          _this.tradTimeEnd = getDateStr(0);
        } else if (type === 2) {
          _this.beginTime = getDateStr(-30);
          _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(-30);
          _this.tradTimeEnd = getDateStr(1);
        } else {
          _this.beginTime = null;
          _this.endTime = null;
          _this.tradTimeStart = null;
          _this.tradTimeEnd = null;
          _this.isChange = true;
          _this.transactType = [];
          _this.getTradListAll();
        }
      },
      getTradListAll(type) {
        let _this = this;
        if (type && (type.length === 0 || type.length === 5)) {
          type = null;
        } else {
          type = JSON.stringify(type);
        }
        api.getTradList({
          tradTimeStart: _this.tradTimeStart,
          tradTimeEnd: _this.tradTimeEnd,
          accountChangeTypeStr: type || null,
          reversePicUrl: null,
          taskSerial: _this.activityNumber,
          page: _this.pageIndex,
          size: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.isChange = false;
            _this.totalPages = res.data.tradPage.totalPages;
            _this.myTableDetailsAll = res.data.tradPage.content;
            _this.accountIncomes = res.data.income;
            _this.accountPayout = res.data.expense;
            _this.showBigNoticeAll = _this.myTableDetailsAll.length === 0;

          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .contribution{
    .date-picker {
      padding: 15px;
      border-bottom: 1px solid #F6F6F6;
    }
    .choice-time {
      span {
        display: inline-block;
        padding: 5px 20px;
        color: #9FADB7;
      }
      span:nth-of-type(1) {
        margin-left: 15px;
      }
      span.active {
        background-color: #DAE1E8;
        border-radius: 13px;
        color: #000;
      }
    }
    .table {
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      li {
        height:35px;
        line-height: 35px;
        color: #000;
        border-bottom: 1px solid #eee;
        &.t-head {
          background: #eee;
        }
        div {
          float: left;
          padding-left:10px;
        }
        div:nth-of-type(1) {
          width:15%;
        }
        div:nth-of-type(2) {
          width: 15%;
        }
        div:nth-of-type(3) {
          width: 25%;
        }
        div:nth-of-type(4) {
          width: 15%;
        }
        div:nth-of-type(5) {
          width: 15%;
        }
        div:nth-of-type(6) {
          width: 15%;
        }
      }
    }
  }
</style>
