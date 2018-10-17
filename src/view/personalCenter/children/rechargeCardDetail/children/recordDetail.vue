<template>
  <div class="record-detail">
    <div class="search-box pt-10 pb-10">
      <datePicker type="daterange" :options="dateOption" placeholder="使用日期区间进行搜索" format="yyyy-MM-dd" class="width-300" @on-change="dataPickerChange"></datePicker>
      <i-button :loading="loading" class="bg-main-color cl-fff ml-20" @click="getRechargeCardRecordDetail">搜索</i-button>
    </div>
    <table width="100%" class="record-table text-lf mt-10">
      <thead>
      <tr>
        <th width="20%">交易时间</th>
        <th width="20%">交易类型</th>
        <th width="30%">活动编号</th>
        <th width="15%">支付金额</th>
        <th width="15%">详情</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in 10">
        <td>2018-10-10 00:00:00</td>
        <td>支付活动推广费-充值卡</td>
        <td>PS142251552825454548451854515</td>
        <td class="light-green">+150</td>
        <td class="cursor-p blue">查看</td>
      </tr>
      </tbody>
      <tbody class="text-ct">
      <tr>
        <td colspan="5">暂无数据</td>
      </tr>
      </tbody>
    </table>
    <div class="mt-10 clear">
      <page :total="recordPage.totalElements" :current="recordPage.pageIndex" :page-size="recordPage.pageSize" @on-change="changeRecordPage" class="right"></page>
    </div>
    <!--查看返还到充值卡的推广费明细-->
    <modal v-model="showRetrunDetailModal" width="800">
      <div slot="header">活动编号：<span style="color: red;">1515151515151555151,&nbsp;</span>共返还推广费：<span
        style="color: red;">{{(10000 / 100).toFixed(2)}}</span>&nbsp;元
      </div>
      <div>
        <table class="return-detail-table">
          <thead>
          <tr>
            <th width="25%">交易时间</th>
            <th width="25%">流水号</th>
            <th width="25%">任务编号</th>
            <th width="25%">交易金额（元）</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in 10">
            <td style="padding:10px 0px;">
              <p>2018-10-10</p>
              <p>00:00:00</p>
            </td>
            <td>asdjflk jlksd</td>
            <td>
              <p>青玉案</p>
            </td>
            <td class="main-color">
              {{'-' + 1000 / 100 || 0}}
            </td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <td colspan="4" class="pt-10 pb-10">暂无数据！</td>
          </tr>
          </tbody>
        </table>
        <div class="mt-10 clear">
          <page :total="returnPage.totalElements" :current="returnPage.pageIndex" :page-size="returnPage.pageSize" @on-change="changeReturnPage" class="right"></page>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {getSeverTime} from '@/config/utils'
  import {DatePicker, Button, Page, Modal} from 'iview'
  export default {
    name: "record-detail",
    components: {
      DatePicker: DatePicker,
      iButton: Button,
      Page: Page,
      Modal: Modal
    },
    data() {
      return {
        dateOption: {
          shortcuts: [
            {
              text: '今天',
              value() {
                const start = new Date(getSeverTime());
                const end = new Date(getSeverTime());
                return [start, end];
              }
            },
            {
              text: '昨天',
              value() {
                const start = new Date(getSeverTime() - 3600 * 1000 * 24);
                const end = new Date(getSeverTime() - 3600 * 1000 * 24);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value() {
                const start = new Date(getSeverTime() - 3600 * 1000 * 24 * 30);
                const end = new Date(getSeverTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
          ],
        },
        tradTimeStart: null,
        tradTimeEnd: null,
        loading: false,
        recordPage: {
          pageIndex: 1,
          pageSize: 10,
          totalElements: 0,
        },
        recordDetailList: [],
        returnPage: {
          pageIndex: 1,
          pageSize: 10,
          totalElements: 0,
        },
        returnDetailList: [],
        showRetrunDetailModal: true
      }
    },
    computed: {

    },
    created() {
      this.getRechargeCardRecordDetail();
    },
    mounted() {

    },
    methods: {
      dataPickerChange(date) {
        if (date[0] && date[1]) {
          this.tradTimeStart = `${date[0]} 00:00:00`;
          this.tradTimeEnd = `${date[1]} 23:59:59`;
        } else {
          this.tradTimeStart = null;
          this.tradTimeEnd = null;
        }
      },
      changeRecordPage(page) {

      },
      changeReturnPage(page) {

      },
      getRechargeCardRecordDetail() {
        const _this = this;
        _this.loading = true;
        api.getRechargeCardRecordDetail({
          tradTimeStart: _this.tradTimeStart,
          tradTimeEnd: _this.tradTimeEnd,
          pageIndex: _this.recordPage.pageIndex,
          pageSize: _this.recordPage.pageSize
        }).then(res => {
          if (res.status) {
            console.log(res.data);
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
        })
      }


    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  /*单页面内公共样式*/
  .light-green {
    color: #34CD3B;
  }
  .search-box {
    border-bottom: 1px solid #eee;
  }
  .record-table {
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
    tr {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
    }
    th {
      background: #eee;
      padding: 10px;
    }
    td {
      padding: 10px;
    }
  }
  .return-detail-table {
    width: 100%;
    border: 1px solid #F3F3F3;
    background-color:#F8F8F8;
    text-align: center;
    tr {
      border-bottom: 1px solid #F3F3F3
    }
    th {
      padding: 10px 0;
    }
  }
</style>

