<template>
  <div class="use-detail">
    <div class="filter-time clear pt-20 pb-20 pl-20">
      <div class="left">
        <span>活动开始日期：</span>
        <date-picker type="date" placeholder="选择日期" class="width-200" format="yyyy-MM-dd" @on-change="selectBeginTime"></date-picker>
        <span>-</span>
        <date-picker type="date" placeholder="选择日期" class="width-200" format="yyyy-MM-dd" @on-change="selectEndTime"></date-picker>
      </div>
      <div class="left filter-period ml-40">
        <span v-for="(item,index) in choiceTime" :key="index" :class="{'is-active':timeSelect === item.isSelect}" class="cursor-p" @click="getTargetTime(item.id,item.isSelect)">{{item.text}}</span>
      </div>
    </div>
    <div class="pl-20 pt-10 pb-10 personal-list-table">
      <p><span>当前您共订购收藏加购流量： <span class="main-color">20</span> 条，访客流量 <span class="main-color">40</span> 条。</span></p>
      <table class="table-list mt-15">
        <thead>
        <tr>
          <th style="width:15%">活动标题</th>
          <th style="width:16%">活动开始/结束时间</th>
          <th style="width:8%">活动状态</th>
          <th style="width:15%">任务类型/关键词数</th>
          <th style="width:8%">匹配方式</th>
          <th style="width:20%">共使用<Icon type="md-help-circle" />（成功/失败<Icon type="md-help-circle" />/待处理<Icon type="md-help-circle" />）</th>
          <th style="width:10%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr class="task-number">
          <td colspan="7">
            <span>活动编号：AS10222012545D545665452245J</span>
            <span>创建时间：2018-08-08 10:00:00</span>
            <span>活动类型：免费领（拍A发A）</span>
          </td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10 border-radius-5" src="~assets/img/home/chenyuqi.jpg" alt="">
            <a class="img-title left">流量订购收代理费凉快圣诞节疯狂了是觉得离开房间</a>
          </td>
          <td>
            <p>2018-02-01 10:00:00</p>
            <p>2018-02-01 10:00:00</p>
          </td>
          <td>
            <p>进行中</p>
            <p>不可进行结算</p>
          </td>
          <td class="cl000">
            <p>手淘所搜下单</p>
            <p>5个关键词</p>
          </td>
          <td class="cl000">
            申请数匹配
          </td>
          <td class="cl000">
            <p>收藏加购流量：20条 （16/4/20）</p>
            <p>访客流量：40条 （32/8/20）</p>
          </td>
          <td>
            <p class="cursor-p blue">查看活动详情</p>
            <p class="cursor-p blue">查看流量详情</p>
          </td>
        </tr>
        <tr class="expand">
          <td colspan="7" style="padding: 0px;border: none">
            <collapse-transition>
              <div v-show="true">
                <table class="small-table" style="background-color: #f9f9f9;">
                  <thead>
                  <tr>
                    <th style="width:9%;">状态</th>
                    <th style="width:10%;">关键词</th>
                    <th style="width:10%;">收藏+加购</th>
                    <th style="width:8%;">加入购物车</th>
                    <th style="width:8%;">宝贝收藏</th>
                    <th style="width:15%;">收藏加购流量（成功/失败/待处理）</th>
                    <th style="width:5%;">访客数</th>
                    <th style="width:15%;">访客数（成功/失败/待处理）</th>
                    <th style="width:10%;">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      进行中
                    </td>
                    <td>
                      mp3 随身听
                    </td>
                    <td>
                      2条
                    </td>
                    <td>
                      2条
                    </td>
                    <td>
                      4条
                    </td>
                    <td>
                      共10条（8/2/10）
                    </td>
                    <td>
                      32条
                    </td>
                    <td>
                      共10条（8/2/10）
                    </td>
                    <td class="operate-area">
                      <span>补添</span>
                      <span>停止</span>
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
      </table>
    </div>
    <div class="right mt-22" v-if="!isChange">
      <Page :total="totalPages*10" :page-size="pageSize" @on-change="changePages"></Page>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Icon} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  export default {
    name: "use-detail",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      Icon: Icon,
      CollapseTransition: CollapseTransition
    },
    data() {
      return {
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
        isChange: false,
        pageSize: 10,
        totalPages: 1,
        showNotice: false
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      selectBeginTime(e) {
        this.tradTimeStart = e;
      },
      selectEndTime(e) {
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
          // _this.beginTime = getDateStr(0);
          // _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(0);
          _this.tradTimeEnd = getDateStr(1);
        } else if (type === 1) {
          // _this.beginTime = getDateStr(-1);
          // _this.endTime = getDateStr(0);
          _this.tradTimeStart = getDateStr(-1);
          _this.tradTimeEnd = getDateStr(0);
        } else if (type === 2) {
          // _this.beginTime = getDateStr(-30);
          // _this.endTime = getDateStr(1);
          _this.tradTimeStart = getDateStr(-30);
          _this.tradTimeEnd = getDateStr(1);
        } else {
          // _this.beginTime = null;
          // _this.endTime = null;
          _this.tradTimeStart = null;
          _this.tradTimeEnd = null;
          _this.isChange = true;
          _this.transactType = [];
          _this.getTradListAll();
        }
      },
      changePages() {

      },
      getTradListAll() {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .use-detail {
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
    .personal-list-table table td img{
      width: 54px;
      height: 54px;
    }
    .personal-list-table table td.operate-area span{
      padding: 2px;
      border-radius: 5px;
      border: 1px solid orange;
      color: orange;
    }
    .personal-list-table table td .img-title {
      display: block;
      color: #666;
      width: 98px;
      padding-left: 5px;
      text-align: left;
      max-height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all ;
      -webkit-box-orient: vertical;
      &:hover{
        text-decoration: underline;
        color: #2b85e4;
      }
    }
    .personal-list-table table tr.task-number td {
      text-align: left;
      padding:6px 0 6px 10px;
    }

    .personal-list-table table tr.expand table {
      border: none;
    }

    .personal-list-table tr table {
      width: 100%;
    }
    .personal-list-table .t-body tr:last-of-type{
      border: none;
    }
  }
</style>
