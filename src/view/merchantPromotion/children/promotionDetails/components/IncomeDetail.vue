<template>
  <div class="income-detail">
    <div class="clear date-picker">
      <div class="left">
        <span>起止日期：</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="beginTime" format="yyyy-MM-dd HH:mm:ss" @on-change="beginTimeFun">
        </Date-picker>
        <span>-</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="endTime" format="yyyy-MM-dd HH:mm:ss" @on-change="endTimeFun"/>
      </div>
      <div class="choice-time left">
        <span class="cursor-p" v-for="item in choiceTime" :class="{active:timeSelect === item.isSelect} " :key="item.id" @click="getTargetTime(item.id,item.isSelect)">{{item.text}}</span>
      </div>
    </div>
    <div class="phone-search mt-15">
      <span class="mr-10">手机号</span>
      <i-input v-model.number="phoneNumber" style="width: 25%;"/>
      <i-button class="pl-20 pr-20 cl-fff bg-main-color ml-20" @click="getRewardDetail">筛选</i-button>
    </div>
    <div class="income-record mt-20">
      <ul>
        <li class="record-head clear">
          <div>收入时间</div>
          <div>收入金额</div>
          <div>收入来源</div>
          <div>收入类型</div>
        </li>
        <li v-for="(item,index) in detailList" :key="index">
          <div>{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
          <div class="light-green">+{{(item.rewardFee/100).toFixed(2)}}</div>
          <div>{{item.other.initiatorPhone}}</div>
          <div>{{item.other.level}}级-{{incomeType(item.initiatorType)}}<span v-if="item.offerType === 2">（代理商提成）</span>  </div>
        </li>
      </ul>
    </div>
    <div v-if="!totalElements" class="text-ct mt-15">
      暂无数据
    </div>
    <div v-if="totalElements" class="right mt-15">
      <page :total="totalElements" :page-size="pageSize" @on-change="changePages"/>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Input, Button} from 'iview'
  import {merchantIncomeType} from '@/config/utils'
  export default {
    name: "income-detail",
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
        tradTimeStart: null,
        tradTimeEnd: null,
        pageSize: 10,
        pageIndex: 1,
        tradType: 1,
        phoneNumber: null,
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
        detailList: [],
        totalElements: 0,
      }
    },
    computed: {

    },
    created() {
      this.getRewardDetail();
    },
    mounted() {

    },
    methods: {
      incomeType(type) {
        return merchantIncomeType(type);
      },
      beginTimeFun(e) {
        this.beginTime = e;
        this.tradTimeStart = e;
      },
      endTimeFun(e) {
        this.endTime = e;
        this.tradTimeEnd = e;
      },
      getTargetTime(type, select) {
        const _this = this;
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
          _this.tradTimeStart = getDateStr(0);
          _this.endTime = getDateStr(1);
          _this.tradTimeEnd = getDateStr(1);
        } else if (type === 1) {
          _this.beginTime = getDateStr(-1);
          _this.tradTimeStart = getDateStr(-1);
          _this.endTime = getDateStr(0);
          _this.tradTimeEnd = getDateStr(0);
        } else if (type === 2) {
          _this.beginTime = getDateStr(-30);
          _this.tradTimeStart = getDateStr(-30);
          _this.endTime = getDateStr(1);
          _this.tradTimeEnd = getDateStr(1);
        } else {
          _this.beginTime = null;
          _this.tradTimeStart = null;
          _this.endTime = null;
          _this.tradTimeEnd = null;
          _this.getRewardDetail();
        }
      },
      getRewardDetail() {
        const _this = this;
        if (_this.phoneNumber) {
          if(!(/^1\d{10}$/.test(_this.phoneNumber))) {
            _this.$Message.error('请输入正确格式的电话号码');
            return;
          }
        }
        api.getRewardDetail({
          beginTime: _this.tradTimeStart,
          endTime: _this.tradTimeEnd,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          tradType: _this.tradType,
          phone: _this.phoneNumber
        }).then(res => {
          if (res.status) {
            _this.detailList = res.data.content;
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      changePages(page) {
        this.pageIndex = page;
        this.getRewardDetail();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .income-detail {
    /*单页面样式*/
    .light-green {
      color: #34CD3B;
    }
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
    .income-record {
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      li {
        height:35px;
        line-height: 35px;
        color: #000;
        border-bottom: 1px solid #eee;
        div {
          float: left;
          padding-left:10px;
        }
        div:nth-of-type(1) {
          width:24%;
        }
        div:nth-of-type(2) {
          width: 20%;
        }
        div:nth-of-type(3) {
          width: 26%;
        }
        div:nth-of-type(4) {
          width: 30%;
        }
      }
      .record-head {
        background: #eee;
        font-weight: bold;
      }
    }
  }
</style>
