<template>
  <div class="detail-and-log">
    <div class="detail-and-log-title pl-10 clear">
      <span class="left">试用活动管理</span>
      <span class="right"><router-link to="/user/activity-management/list">返回上一页</router-link></span>
    </div>
    <div class="detail-and-log-list mt-20">
      <div class="detail-and-log-list-title">
        <router-link :to="{'path':'/user/activity-management/detail-log/detail',query:{'taskId': taskId}}" tag="span":class="{isSelect:showStatus === 'ActivityDetail'}">
          活动详情
        </router-link>
        <router-link :to="{'path':'/user/activity-management/detail-log/log',query:{'taskId': taskId}}" tag="span":class="{isSelect:showStatus === 'ActivityLog'}">
          活动日志
        </router-link>
      </div>
    </div>

    <div class="activity-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="20%">活动标题</th>
          <th width="14%">活动开始 / 结束时间</th>
          <th width="10%">活动状态</th>
          <th width="12%">报名 / 已通过</th>
          <th width="8%">可审批名额</th>
          <th width="24%">活动所需担保金 / 活动所需推广费 / 已存入</th>
        </tr>
        </thead>
        <tbody>
        <tr class="task-number">
          <td colspan="7">活动编号：{{itemCatalog.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="itemCatalog.taskMainImage" :alt="itemCatalog.taskName">
            <span class="img-title left">{{itemCatalog.taskName}}</span>
          </td>
          <td>
            <p>{{itemCatalog.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{itemCatalog.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td v-if="itemCatalog.taskStatus !== 'waiting_modify'">{{itemCatalog.taskStatusDesc}}<br/>{{itemCatalog.settlementStatusDesc}}</td>
          <td class="cursor-p main-color" v-else>
            <Tooltip :content="itemCatalog.auditLogs[itemCatalog.auditLogs.length - 1].resultMsg" placement="top">
              <Icon color="#f60" type="information-circled"></Icon>&nbsp;待修改
            </Tooltip>
          </td>
          <td class="registration">{{itemCatalog.showkerApplyTotalCount || 0}} / {{itemCatalog.showkerApplySuccessCount || 0}}（人）</td>
          <td>{{itemCatalog.taskCount}}</td>
          <td>{{itemCatalog.totalMarginNeed / 100}} / {{itemCatalog.promotionExpensesNeed / 100}} / {{(itemCatalog.marginPaid + itemCatalog.promotionExpensesPaid) / 100 || 0}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <router-view v-on:viewIn="saveTaskId"></router-view>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  export default {
    name: 'DetailAndLog',
    data() {
      return {
        showStatus: 'ActivityDetail',
        taskId: '',
        itemCatalog: [],
      }

    },
    mounted() {},
    created() {
    },
    computed: {},
    watch: {
      $route(to) {
        this.showStatus = to.name;
      }
    },
    methods: {
      getTaskInfo() {
        let _this = this;
        api.getTaskInfo({
          taskId: _this.taskId
        }).then(res => {
          if (res.status) {
            _this.itemCatalog = res.data
          }
        })
      },
      saveTaskId(data){
        this.taskId = data;
        this.getTaskInfo();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .detail-and-log-title {
    height: 52px;
    line-height: 52px;
    @include sc(20px, #666);
    border-bottom: 2px solid #F6F6F6;
    span:last-child {
      font-size: 14px;
      color: #2b85e4;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .detail-and-log-list-title {
    height: 32px;
    border-bottom: 2px solid $mainColor;
    > span {
      display: inline-block;
      line-height: 32px;
      @include sc(14px, #000);
      width: 114px;
      text-align: center;
      cursor: pointer;
    }
    .isSelect {
      background-color: $mainColor;
      color: #fff;
    }
  }

  .activity-table table {
    width: 100%;
    border: 1px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
  }
  .activity-table table td,
  .activity-table table th {
    border-right: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
    text-align: center;
  }
  .activity-table table tr.task-number td {
    text-align: left;
    padding:6px 0 6px 10px;
  }
  .activity-table table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
  }
  .activity-table table td {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .activity-table table td img {
    width: 54px;
    height: 54px;
  }
  .activity-table table td .img-title {
    display: inline-block;
    width: 132px;
    height: 54px;
    padding-left: 10px;
    text-align: left;
  }
  .activity-table table td.registration {
    color: #2b85e4;
  }
  .activity-table table td .del-edit span {
    color: #2b85e4;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }
  .activity-table table td .del-edit span:last-child {
    color: #2b85e4;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }
  .activity-table table td .bond span {
    color: $mainColor;
    border-radius: 5px;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken($mainColor, 10%);
    }
  }
  .activity-table table td .copy span {
    color: #2b85e4;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }
</style>
