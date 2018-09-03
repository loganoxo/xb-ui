<template>
  <div class="order-detail">
    <div class="filter-time clear pt-20 pb-20 pl-20">
      <!--利用组件来筛选-->
      <date-picker type="daterange" :options="dataPickerOption" placeholder="请选择需要检索的日期区间" class="width-180 left" format="yyyy-MM-dd" @on-change="dataPickerChange"></date-picker>
      <i-button @click="getFlowOrderDetail" class="ml-20 bg-main-color cl-fff left ml-20">筛选</i-button>
    </div>
    <div class="pl-20 pt-10 pb-10 personal-list-table">
      <p><span>当前您共订购收藏加购流量： <span class="main-color">{{getFlowNumInfo.favoriteCartFlowLeft || 0}}</span> 条，访客流量 <span class="main-color">{{getFlowNumInfo.visitorFlowLeft || 0}}</span> 条。</span></p>
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
        <tbody v-if="orderDetailList.length > 0">
        <tr v-for="(item,index) in orderDetailList" :key="index">
          <td>{{item.tradTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
          <td>{{item.serialNumber}}</td>
          <td>{{item.tradName}}</td>
          <td>{{(item.tradAmount/100).toFixed(2)}}</td>
          <td class="main-color">{{item.extension.count ? '+' + item.extension.count: null}}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5">暂无数据</td>
        </tr>
        </tbody>
      </table>
    </div>
    <page class="text-align-rt" v-if="orderDetailList.length > 0" :current="page.pageIndex" :total="page.totalElements" :page-size="page.pageSize" @on-change="changePages"/>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Button} from 'iview'
  import {getSeverTime} from "@/config/utils";

  export default {
    name: "order-detail",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      iButton: Button,

    },
    data() {
      return {
        dataPickerOption: {
          shortcuts: [
            {
              text: '今天',
              value() {
                const end = new Date(getSeverTime());
                const start = new Date(getSeverTime());
                return [start, end];
              }
            },
            {
              text: '昨天',
              value() {
                const end = new Date(getSeverTime() - 3600 * 1000 * 24);
                const start = new Date(getSeverTime() - 3600 * 1000 * 24);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value() {
                const end = new Date(getSeverTime());
                const start = new Date(getSeverTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            }
          ]
        },
        datePickTime: {
          tradTimeStart: null,
          tradTimeEnd: null,
        },
        orderDetailList: [],
        page: {
          totalElements: 0,
          pageSize: 10,
          pageIndex: 1,
        },
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
      getFlowOrderDetail() {
        const _this = this;
        api.getFlowOrderDetail({
          tradTimeStart: _this.datePickTime.tradTimeStart,
          tradTimeEnd: _this.datePickTime.tradTimeEnd,
          pageIndex: _this.page.pageIndex,
          pageSize: _this.page.pageSize,
          accountChangeType: _this.accountChangeType
        }).then(res => {
          if (res.status) {
            _this.orderDetailList = res.data.page.content;
            _this.totalElements = res.data.page.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      changePages(page) {
        this.page.pageIndex = page;
        this.getFlowOrderDetail();
      },
      dataPickerChange(date) {
        if (date[0] && date[1]) {
          this.datePickTime.tradTimeStart = `${date[0]} 00:00:00`;
          this.datePickTime.tradTimeEnd = `${date[1]} 23:59:59`;
        } else {
          this.datePickTime.tradTimeStart = null;
          this.datePickTime.tradTimeEnd = null;
        }
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
