<template>
  <div class="order-detail">
    <div class="filter-time clear pt-20 pb-20 pl-20">
      <div class="left">
        <span>订购日期：</span>
        <date-picker type="date" placeholder="选择日期" class="width-200" format="yyyy-MM-dd HH:mm:ss" v-model="startTime" @on-change="selectBeginTime"></date-picker>
        <span>-</span>
        <date-picker type="date" placeholder="选择日期" class="width-200" format="yyyy-MM-dd HH:mm:ss" v-model="endTime" @on-change="selectEndTime"></date-picker>
      </div>
      <div class="left filter-period ml-40">
        <span v-for="(item,index) in choiceTime" :key="index" :class="{'is-active':timeSelect === item.isSelect}" class="cursor-p" @click="getTargetTime(item.id,item.isSelect)">{{item.text}}</span>
        <i-button class="filter-btn bg-main-color cl-fff ml-15" :loading="filterLoading" @click="filterOrderDetail">筛选</i-button>
      </div>
    </div>
    <div class="pl-20 pt-10 pb-10 personal-list-table">
      <p><span>当前您共订购收藏加购流量： <span class="main-color">{{getFlowNumInfo.favoriteCartFlowLeft}}</span> 条，访客流量 <span class="main-color">{{getFlowNumInfo.visitorFlowLeft}}</span> 条。</span></p>
      <table class="table-list mt-15">
        <thead>
        <tr>
          <th style="width:16%">交易时间</th>
          <th style="width:30%">流水号</th>
          <th style="width:20%">交易明细</th>
          <th style="width:14%">交易金额（元）</th>
          <th style="width:20%">流量数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in orderDetailList" :key="index">
          <td>{{item.tradTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
          <td>{{item.serialNumber}}</td>
          <td>{{item.tradName}}</td>
          <td>{{(item.tradAmount/100).toFixed(2)}}</td>
          <td class="main-color">{{item.extension.count ? '+' + item.extension.count: null}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22" v-if="totalElements">
      <Page :total="totalElements" :page-size="pageSize" @on-change="changePages"></Page>
    </div>
    <div v-if="!totalElements" class="text-ct mt-20">暂无数据</div>

  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Button} from 'iview'
  export default {
    name: "order-detail",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      iButton: Button,

    },
    data() {
      return {
        startTime: null,
        endTime: null,
        tradTimeStart: null,
        tradTimeEnd: null,
        timeSelect: 'all',
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
        orderDetailList: [],
        totalElements: 0,
        pageSize: 10,
        pageIndex: 1,
        favoriteCartFlow: 0,
        visitorFlow: 0,
        filterLoading: false,
        accountChangeType: 13
      }
    },
    computed: {
      getFlowNumInfo() {
        return this.$store.state.flowNumberInfo
      }
    },
    created() {
      this.getFlowOrderDetail();
    },
    mounted() {

    },
    methods: {
      selectBeginTime(e) {
        this.startTime = e;
        this.tradTimeStart = e;
      },
      selectEndTime(e) {
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
          _this.startTime = getDateStr(0);
          _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(0);
          _this.tradTimeEnd = getDateStr(1);
        } else if (type === 1) {
          _this.startTime = getDateStr(-1);
          _this.endTime = getDateStr(0);
          _this.tradTimeStart = getDateStr(-1);
          _this.tradTimeEnd = getDateStr(0);
        } else if (type === 2) {
          _this.startTime = getDateStr(-30);
          _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(-30);
          _this.tradTimeEnd = getDateStr(1);
        } else {
          _this.startTime = null;
          _this.endTime = null;
          _this.tradTimeStart = null;
          _this.tradTimeEnd = null;
          _this.getFlowOrderDetail();
        }
      },
      getFlowOrderDetail() {
        const _this = this;
        api.getFlowOrderDetail({
          tradTimeStart: _this.tradTimeStart,
          tradTimeEnd: _this.tradTimeEnd,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          accountChangeType: _this.accountChangeType
        }).then(res => {
          if (res.status) {
            _this.orderDetailList = res.data.page.content;
            _this.favoriteCartFlow = res.data.favoriteCartFlow;
            _this.visitorFlow = res.data.visitorFlow;
            _this.totalElements = res.data.page.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      changePages(page) {
        this.pageIndex = page;
        this.getFlowOrderDetail();
      },
      filterOrderDetail() {
        this.getFlowOrderDetail();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .order-detail {
    .filter-time {
      border-bottom: 1px solid #F6F6F6;
    }
    .filter-period {
      span {
        display: inline-block;
        padding: 5px 20px;
        color: #9FADB7;
      }
      span.is-active {
        background-color: #DAE1E8;
        border-radius: 13px;
        color: #000;
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
    .personal-list-table .t-body tr:last-of-type{
      border: none;
    }
  }

</style>
