<template>
  <div class="transfer-balance-record">
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
        <tbody v-for="(tbodyDetails,index) in myTableDetailsAll" :key="index">
        <tr>
          <td>
            <p>{{tbodyDetails.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
            <p>{{tbodyDetails.tradTime | dateFormat('hh:mm:ss ')}}</p>
          </td>
          <td>
            <p>{{getTradType(tbodyDetails.accountChangeType)}}</p>
            <p v-if="tbodyDetails.accountChangeType !== 1 && tbodyDetails.accountChangeType !== 2 && tbodyDetails.accountChangeType !== 3 && tbodyDetails.accountChangeType !== 10 && tbodyDetails.accountChangeType !== 11">活动编号：{{tbodyDetails.taskSerialNum}}</p>
          </td>
          <td :class="{tdColor:tbodyDetails.amountChange<0 , tdColorGreen:tbodyDetails.amountChange>0}">
            {{typeChang(tbodyDetails.amountChange / 100) || 0}}
          </td>
          <td>
            <p class="details blue" @click="detailsInit(tbodyDetails.id)">详情
              <Icon :type="detailSelect===tbodyDetails.id?'arrow-up-b':'arrow-down-b'" class="ml-5 "></Icon>
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="4" style="padding: 0px;border: none">
            <collapse-transition>
              <div v-show="detailSelect===tbodyDetails.id">
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
                  <tr v-for="item in userListDetails">
                    <td>
                      <p>{{item.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
                      <p>{{item.tradTime | dateFormat('hh:mm:ss ')}}</p>
                    </td>
                    <td>
                      {{item.serialNumber}}
                    </td>
                    <td>
                      <p v-if="getTradType(item.tradName)">{{getTradType(item.tradName) }}</p>
                      <p v-else>{{item.tradName}}</p>
                    </td>
                    <td :class="{tdColor:item.tradAmount<0 , tdColorGreen:item.tradAmount>0}">
                      {{typeChang(item.tradAmount / 100) || 0}}
                    </td>
                  </tr>
                  <tr v-show="showNotice">
                    <td colspan="4">暂无数据！</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </collapse-transition>
          </td>
        </tr>
        </tbody>
        <tbody>
        <tr v-show="showBigNoticeAll">
          <td colspan="4">暂无数据！</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22" v-if="!isChange">
      <Page :total="totalPages*10" :page-size="pageSize" @on-change="changePages"></Page>
    </div>
  </div>
</template>

<script>
  import {Page, Icon, DatePicker} from 'iview'
  import api from '@/config/apiConfig'
  import {taskErrorStatusList} from '@/config/utils'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  export default {
    name: "transfer-balance-record",
    components: {
      Page: Page,
      Icon: Icon,
      DatePicker: DatePicker,
      CollapseTransition: CollapseTransition,
    },
    data() {
      return {
        beginTime: null,
        endTime: null,
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
        myTableDetailsAll: [],
        detailSelect: 'false',
        userListDetails: null,
        showNotice: false,
        showBigNoticeAll: false,
        isChange: false,
        totalPages: 1,
        pageSize: 10,
        pageIndex: 0,
        tradTimeStart: null,
        tradTimeEnd: null,
        activityNumber: null,
        accountIncomes: 0,
        accountPayout: 0,
      }
    },
    computed: {

    },
    created() {
      this.getTradListAll();
    },
    mounted() {

    },
    methods: {
      beginTimeFun(e) {
        let self = this;
        self.beginTime = e;
        self.tradTimeStart = e;
      },
      endTimeFun(e) {
        this.endTime = e;
        this.tradTimeEnd = e;
      },
      changePageShow(type) {
        if (!this.endTime) {
          this.tradTimeEnd = null
        }
        if (!this.beginTime) {
          this.tradTimeStart = null
        }
        if (!this.endTime && !this.beginTime) {
          this.timeSelect = 'all'
        }
        this.pageIndex = 0;
        this.isChange = true;
        this.getTradListAll(type);
      },
      typeChang(num) {
        if (num > 0) {
          num = '+' + num;
        }
        return num
      },
      getTradType(type) {
        return taskErrorStatusList(type);
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
      detailsInit(type) {
        if (this.detailSelect === type) {
          this.detailSelect = 'none'
        } else {
          this.detailSelect = type;
          this.getTradListDetails(type);
        }
      },
      getTradListDetails(type) {
        let _this = this;
        api.getTradListDetails({
          tradId: type
        }).then(res => {
          if (res) {
            _this.userListDetails = res;
            _this.showNotice = _this.userListDetails.length === 0;
          } else {
            console.log("列表数据为空！");
          }
        });
      },
      changePages(data) {
        this.pageIndex = data - 1;
        this.getTradListAll(this.transactType);
      }

    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .transfer-balance-record {
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
    .details {
      cursor: pointer;
      position: relative;
    }
    .detailsSpc {
      cursor: pointer;
      position: relative;
    }
    .personal-list-table .small-table{
      border: none;
      background-color: #f9f9f9;
    }
    .small-table td {
      padding: 10px;
    }
    .small-table tbody:last-child {
      text-align: center;

    }
  }
</style>
