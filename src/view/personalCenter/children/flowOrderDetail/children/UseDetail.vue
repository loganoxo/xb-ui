<template>
  <div class="use-detail">
    <div class="filter-time clear pt-20 pb-20 pl-20">
      <div class="left">
        <date-picker type="daterange" :options="dataPickerOption" placeholder="请选择需要检索的日期区间" class="width-180" format="yyyy-MM-dd" @on-change="dataPickerChange"></date-picker>
      </div>
      <i-button class="left ml-8">搜索</i-button>
    </div>
    <div class="pl-20 pt-10 pb-10 personal-list-table">
      <p><span>当前您共订购收藏加购流量： <span class="main-color">0</span> 条，访客流量 <span class="main-color">40</span> 条。</span></p>
      <table class="table-list mt-15">
        <thead>
        <tr>
          <th style="width:15%">活动标题</th>
          <th style="width:16%">活动开始/结束时间</th>
          <th style="width:8%">活动状态</th>
          <th style="width:15%">任务类型/关键词数</th>
          <th style="width:8%">匹配方式</th>
          <th style="width:20%">共使用
            <icon class="vtc-text-btm" type="md-help-circle"/>
            （成功/失败
            <icon type="md-help-circle"/>
            /待处理
            <icon class="vtc-text-btm" type="md-help-circle"/>
            ）
          </th>
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
          <td class="task-title clear">
            <img class="left ml-10 border-radius-5" src="~assets/img/home/chenyuqi.jpg" alt="活动主图">
            <router-link to="/" class="left" title="流量订购收代理费凉快圣诞节疯狂了是觉得离开房间">流量订购收代理费凉快圣诞节疯狂了是觉得离开房间</router-link>
          </td>
          <td>
            <p>2018-02-01 10:00:00</p>
            <p class="mt-6">2018-02-01 10:00:00</p>
          </td>
          <td>
            <p>进行中</p>
            <p class="mt-6">不可进行结算</p>
          </td>
          <td class="cl000">
            <p>手淘所搜下单</p>
            <p class="mt-6">5个关键词</p>
          </td>
          <td class="cl000">
            申请数匹配
          </td>
          <td class="cl000">
            <p>收藏加购流量：20条 （16/4/20）</p>
            <p class="mt-6">访客流量：40条 （32/8/20）</p>
          </td>
          <td>
            <p class="cursor-p blue">查看活动详情</p>
            <p class="cursor-p blue mt-6">查看流量详情</p>
          </td>
        </tr>
        <tr>
          <td colspan="7" class="detail-table-td">
            <collapse-transition>
              <div v-show="true">
                <table class="detail-table" style="background-color: #f9f9f9;">
                  <thead>
                  <tr>
                    <th style="width:8%;">状态</th>
                    <th style="width:10%;">关键词</th>
                    <th style="width:8%;">收藏+加购</th>
                    <th style="width:8%;">加入购物车</th>
                    <th style="width:8%;">宝贝收藏</th>
                    <th style="width:20%;">收藏加购流量（成功/失败/待处理）</th>
                    <th style="width:5%;">访客数</th>
                    <th style="width:15%;">访客数（成功/失败/待处理）</th>
                    <th style="width:8%;">操作</th>
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
                 <!-- <tr>
                    <td colspan="4">暂无数据！</td>
                  </tr>-->
                  </tbody>
                </table>
              </div>
            </collapse-transition>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22">
      <page :total="page.totalPages" :page-size="page.pageSize" @on-change="changePages"></page>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Icon, Button} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import {getSeverTime} from '@/config/utils'

  export default {
    name: "use-detail",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      Icon: Icon,
      iButton: Button,
      CollapseTransition: CollapseTransition
    },
    data() {
      return {
        dataPickerOption: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
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
        page: {
          pageIndex: 1,
          pageSize: 5,
          totalPages: 1,
        },
        flowList: null,
      }
    },
    computed: {},
    created() {
      this.getFlowList()
    },
    methods: {
      dataPickerChange(date) {
        this.datePickTime.tradTimeStart = date[0];
        this.datePickTime.tradTimeEnd = date[1];
      },
      changePages() {

      },
      getFlowList() {
        const _this = this;
        api.getTaskFlowList({
          pageIndex: this.page.pageIndex
        }).then(res => {
          if (res.status) {
            _this.page.totalPages = res.totalPages;
            _this.flowList = res.content;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';

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

  .table-list {
    width: 100%;
    border: 1px solid #dddee1;
    .task-title {
      img {
        width: 54px;
        height: 54px;
      }
      a {
        display: block;
        color: #666;
        width: 98px;
        padding-left: 5px;
        text-align: left;
        max-height: 54px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        &:hover {
          text-decoration: underline;
          color: #2b85e4;
        }
      }
    }
    > thead > tr > th {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
    }
    > tbody > tr > td {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    > tbody > tr.task-number td {
      padding: 8px 0 8px 10px;
      text-align: left;
    }
    > tbody > tr .detail-table-td {
      padding: 0;
    }
  }

  .detail-table {
    width: 100%;
    > thead > tr > th {
      padding: 8px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      &:last-child {
        border-right: 0;
      }
    }
    > tbody > tr > td {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      text-align: center;
      &:last-child {
        border-right: 0;
      }
    }
  }
</style>
