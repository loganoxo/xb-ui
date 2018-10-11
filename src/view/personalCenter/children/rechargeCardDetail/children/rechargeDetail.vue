<template>
  <div class="recharge-detail">
    <div class="search-box pt-10 pb-10">
      <datePicker type="daterange" :options="dateOption" placeholder="使用日期区间进行搜索" format="yyyy-MM-dd" class="width-300" @on-change="dataPickerChange"></datePicker>
      <i-button :loading="loading" class="bg-main-color cl-fff ml-20">搜索</i-button>
    </div>
    <table width="100%" class="text-lf mt-10">
      <thead>
        <tr>
          <th width="33%">充值时间</th>
          <th width="33%">充值金额</th>
          <th width="33%">到账金额</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 10">
          <td>2018-10-10 00:00:00</td>
          <td>1000</td>
          <td class="light-green">+1500</td>
        </tr>
      </tbody>
      <tbody class="text-ct">
        <tr>
          <td colspan="3">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-10 clear">
      <page :total="totalElements" :current="pageIndex" :page-size="pageSize" class="right" @on-change="changePage"></page>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {getSeverTime} from '@/config/utils'
  import {DatePicker, Button, Page} from 'iview'
  export default {
    name: "recharge-detail",
    components: {
      DatePicker: DatePicker,
      iButton: Button,
      Page: Page
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
        pageIndex: 1,
        pageSize: 10,
        totalElements: 0,
        detailList: []
      }
    },
    computed: {

    },
    created() {

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
      changePage(page) {

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
  table {
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
</style>

