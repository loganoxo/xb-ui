<template>
  <div class="withdrawal-record">
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
    <div class="content-select clear">
      <span class="left" v-for="(item,index)  in getOutStatus" :key="index" :class="{actives:getOutSelect===item.isSelect}"
            @click="getoutStatusFun(item.isSelect,item.state)">{{item.text}}</span>
    </div>
    <div class="personal-list-table mt-10">
      <table class="list-table">
        <thead>
        <tr>
          <th style="width:20%;">申请时间</th>
          <th style="width:30%;">流水号</th>
          <th style="width:10%;">提现金额（元）</th>
          <th style="width:10%;">代收手续费（元）</th>
          <th style="width:20%;">状态</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody v-for="(item,index) in getOutResList" :key="index">
        <tr>
          <td>
            {{item.applyTime | dateFormat('YYYY-MM-DD ')}}<br/>
            {{item.applyTime | dateFormat('hh:mm:ss ')}}
          </td>
          <td>
            {{item.serialNumber}}
          </td>
          <td>{{item.enCashMoney / 100}}</td>
          <td>
            {{item.poundage / 100}}
          </td>
          <td class="main-color cursor-p"  v-if="item.state === 'enchashment_audit_defeat' && item.refuseReason !== null">
            <Tooltip :content="item.refuseReason" placement="top">
              <Icon type="information-circled" color="main-color"></Icon>
              {{getTradType(item.state)}}
            </Tooltip>
          </td>
          <td class="main-color cursor-p" v-else>
            {{getTradType(item.state)}}
          </td>
          <td>
            <p style="color:blue;" class="detailsSpc" @click="getMoneyShowDetailsFun(item.id)">
              详情
              <Icon :type="getMoneyShowDetails===item.id?'arrow-up-b':'arrow-down-b'" class="ml-5 "></Icon>
            </p>
          </td>
        </tr>
        <tr v-show="getMoneyShowDetails===item.id">
          <td colspan="6" style="padding: 0px;">
            <table class="small-table" style="background-color: #f9f9f9;">
              <thead>
              <tr>
                <th style="width:20%;">提现帐号类型</th>
                <th style="width:30%;">提现帐号</th>
                <th style="width:15%;">提现金额（元）</th>
                <th style="width:15%;">代收手续费（元）</th>
                <th style="width:20%;">实际到账金额（元）</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  {{item.bankName}}
                </td>
                <td>
                  {{item.bankCardNum}}
                </td>
                <td>
                  {{typeChang(item.enCashMoney / 100)}}
                </td>
                <td>
                  {{'-' + item.poundage / 100}}
                </td>
                <td>{{typeChang(item.realAmount / 100)}}</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
        <tbody v-show="getOutResList.length === 0">
        <tr>
          <td colspan="6">暂无数据</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22" v-show="getOutResList && getOutResList.length > 0" v-if="!isChange">
      <Page :total="totalElements" :page-size="pageSize" @on-change="changePages"></Page>
    </div>
  </div>
</template>

<script>
  import {Input, Page, Icon, Tooltip, Button, DatePicker} from 'iview'
  import api from '@/config/apiConfig'
  import {taskErrorStatusList} from '@/config/utils'
  export default {
    name: "withdrawal-record",
    components: {
      iInput: Input,
      iButton: Button,
      Tooltip: Tooltip,
      DatePicker: DatePicker,
      Page: Page,
      Icon: Icon
    },
    data() {
      return {
        getoutRecord: {
          serialNumber: null,
          applyFrom: '',
          applyTo: '',
        },
        getOutSelect: 'all',
        getOutStatus: [
          {
            text: '全部',
            isSelect: 'all',
            state: null
          },
          {
            text: '提现中',
            isSelect: 'doing',
            state: "enchashment_audit_ing"
          },
          {
            text: '提现成功',
            isSelect: 'success',
            state: "enchashment_audit_success"
          },
          {
            text: '提现失败',
            isSelect: 'fail',
            state: "enchashment_audit_defeat"
          }
        ],
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
        beginTime: null,
        endTime: null,
        tradTimeStart: null,
        tradTimeEnd: null,
        timeSelect: 'all',
        getOutResList: [],
        getMoneyShowDetails: false,
        totalElements: null,
        pageIndex:1,
        pageSize: 10,
        isChange: false,
        titleStatus: null,
        activityNumber: null
      }
    },
    computed: {

    },
    created() {
      this.getWithDrawList();
    },
    mounted() {

    },
    methods: {
      beginTimeFun(e){
        this.getoutRecord.applyFrom = e;
        this.tradTimeStart = e;
      },
      endTimeFun(e){
        this.getoutRecord.applyTo = e;
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
      getTradType(type) {
        return taskErrorStatusList(type);
      },
      // 在金额为正前加+
      typeChang(num) {
        if (num > 0) {
          num = '+' + num;
        }
        return num
      },
      // 获取提现信息
      getWithDrawList() {
        let _this = this;
        _this.getOutResList = {};
        api.getWithDrawList({
          serialNumber: _this.getoutRecord.serialNumber,
          applyTimeStart: _this.getoutRecord.applyFrom,
          applyTimeEnd: _this.getoutRecord.applyTo,
          state: _this.titleStatus,
          page: _this.pageIndex - 1,
          size: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.isChange  = false;
            _this.getOutResList = res.data.content;
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      // 添加提现状态的样式锚点
      getoutStatusFun(type,status) {
        this.pageIndex = 1;
        this.getOutSelect = type;
        this.titleStatus = status;
        if(status !== null){
          this.isChange  = true;
        }
        this.getWithDrawList();
      },
      // 查看提现信息详情
      getMoneyShowDetailsFun(type) {
        if (this.getMoneyShowDetails === type) {
          this.getMoneyShowDetails = 'none'
        } else {
          this.getMoneyShowDetails = type
        }
      },
      changePages(data) {
        this.pageIndex = data;
        this.getWithDrawList();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .withdrawal-record {
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
    .content-input {
      padding: 10px 15px;
      border-bottom: 1px solid #F5F5F5;
      .ibtn1 {
        margin-left: 10px;
        background-color: $mainColor;
        color: #fff;
        width: 100px;
      }
    }
    .content-select {
      padding: 10px 10px;
      span {
        width: 120px;
        padding: 6px 15px;
        background-color: #F8F8F8;
        text-align: center;
        cursor: pointer;
      }
      span:nth-of-type(2) {
        border-left: 1px solid #F0F0F0;
        border-right: 1px solid #F0F0F0;
      }
      span.actives {
        background-color: $mainColor;
        color: #fff;
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

