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
          <th width="12%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr class="task-number">
          <td colspan="7">活动编号：{{item.number || '------'}}</td>
        </tr>
        <!--<tr>-->
          <!--<td>-->
            <!--<img class="left ml-10" :src="item.taskMainImage" :alt="item.taskName">-->
            <!--<span class="img-title left">{{item.taskName}}</span>-->
          <!--</td>-->
          <!--<td>-->
            <!--<p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '&#45;&#45;&#45;&#45;'}}</p>-->
            <!--<p class="mt-10">{{item.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '&#45;&#45;&#45;&#45;'}}</p>-->
          <!--</td>-->
          <!--<td v-if="item.taskStatus !== 'waiting_modify'">{{item.taskStatusDesc}}<br/>{{item.settlementStatusDesc}}</td>-->
          <!--<td class="cursor-p main-color" v-else>-->
            <!--<Tooltip :content="item.auditLogs[item.auditLogs.length - 1].resultMsg" placement="top">-->
              <!--<Icon color="#f60" type="information-circled"></Icon>&nbsp;待修改-->
            <!--</Tooltip>-->
          <!--</td>-->
          <!--<td class="registration">{{item.showkerApplyTotalCount || 0}} / {{item.showkerApplySuccessCount || 0}}（人）</td>-->
          <!--<td>{{item.taskCount}}</td>-->
          <!--<td>{{item.totalMarginNeed / 100}} / {{item.promotionExpensesNeed / 100}} / {{(item.marginPaid + item.promotionExpensesPaid) / 100 || 0}}</td>-->
          <!--<td v-if="item.taskStatus === 'waiting_pay'">-->
            <!--<p class="del-edit">-->
              <!--<span class="mr-10" @click="editTask(item.id,item.taskStatus)">编辑</span>-->
              <!--<span @click="closeTask(item.id)">关闭</span>-->
            <!--</p>-->
            <!--<p class="bond mt-6">-->
              <!--<span @click="depositMoney((item.totalMarginNeed + item.promotionExpensesNeed),item.id,item.marginPaid + item.promotionExpensesPaid)">存担保金</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else-if="item.taskStatus === 'waiting_modify'">-->
            <!--<p class="del-edit">-->
              <!--<span class="mr-10" @click="editTask(item.id,item.taskStatus)">编辑</span>-->
              <!--<span @click="closeTask(item.id)">关闭</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else-if="item.taskStatus === 'waiting_audit'">-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="lookTaskDetail(item.id)">查看详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else-if="item.settlementStatus === 'waiting_settlement'">-->
            <!--<p class="bond mt-6">-->
              <!--<span @click="approveShowker(item.id)">审批秀客</span>-->
            <!--</p>-->
            <!--<p class="bond mt-6">-->
              <!--<span @click="settlementTask(item.id, item.number)">申请结算</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="lookTaskDetail(item.id)">查看详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else-if="(item.settlementStatus === 'settlement_finished' || item.settlementStatus === 'waiting_audit') && item.taskStatus === 'finished'">-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="billDetails(item.id, item.storeName)">结算详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6" v-if="item.settlementStatus === 'settlement_finished'">-->
              <!--<router-link :to="{path:'/user/money-management/transaction-record',query:{taskNumber:item.number}}">查看活动账单</router-link>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="lookTaskDetail(item.id)">查看详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else-if="item.taskStatus === 'closed'">-->
            <!--<p class="bond mt-6">-->
              <!--<span @click="deleteTask(item.id)">彻底删除</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="lookTaskDetail(item.id)">查看详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
          <!--<td v-else>-->
            <!--<p class="bond mt-6">-->
              <!--<span @click="approveShowker(item.id)">审批秀客</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="lookTaskDetail(item.id)">查看详情</span>-->
            <!--</p>-->
            <!--<p class="copy mt-6">-->
              <!--<span @click="copyTask(item.id)">复制活动</span>-->
            <!--</p>-->
          <!--</td>-->
        <!--</tr>-->
        </tbody>
        <!--<tbody v-if="taskList && taskList.length === 0">-->
        <!--<tr>-->
          <!--<td colspan="7" width="100%">暂无数据</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      </table>
    </div>
    <router-view v-on:viewIn="saveTaskId"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'DetailAndLog',
    data() {
      return {
        showStatus: 'ActivityDetail',
        taskId: ''
      }
    },
    mounted() {},
    created() {},
    computed: {},
    watch: {
      $route(to) {
        this.showStatus = to.name;
      }
    },
    methods: {
      saveTaskId(data){
        this.taskId = data;
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
