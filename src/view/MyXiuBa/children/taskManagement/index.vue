<template>
  <div class="task-management">
    <div class="task-management-title pl-10">秀客任务管理</div>
    <div class="activity-title-s pl-10">
      共<span>{{personalTrialCount.taskTotalCount}}</span>个活动，其中新增待审批秀客<span>{{personalTrialCount.new_number_of_pending_audit}}</span>个，订单号待审核<span>{{personalTrialCount.orderNumWaitingAuditShowkerTask}}</span>个，买家秀待确认<span>{{personalTrialCount.trialReportWaitingConfirmShowkerTask}}</span>个
    </div>
    <div class="task-management-list mt-20">
      <div class="task-management-list-title">
        <router-link to="/user/task-management/wait" tag="span" :class="{isSelect:showTaskStatus === 'TaskWaitAudit'}">待审批</router-link>
        <router-link to="/user/task-management/pass" tag="span" :class="{isSelect:showTaskStatus === 'TaskPassAudit'}">已通过</router-link>
        <router-link to="/user/task-management/fail" tag="span" :class="{isSelect:showTaskStatus === 'TaskFailAudit'}">已终止</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  export default {
    name:'TaskManagement',
    data() {
      return {
        showTaskStatus: 'TaskWaitAudit',
      }
    },
    mounted() {},
    created() {
      this.showTaskStatus = this.$route.name;
      this.$store.dispatch('getPersonalTrialCount')
    },
    watch: {
      $route(to) {
        this.showTaskStatus = to.name;
      }
    },
    computed: {
      personalTrialCount: function () {
        return this.$store.state.taskManagementCountInfo
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import 'src/css/mixin';

  .task-management{
    .main-color {
      color: $mainColor;
    }
    .readBackground{
      background-color: #FDF2E9;
    }
    .task-management-title {
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

    .task-management-list-title {
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
    .activity-title-s {
      height: 52px;
      line-height: 52px;
      @include sc(14px, #666);
      border-bottom: 2px solid #F6F6F6;
      span {
        color: $mainColor;
      }
    }
    .search-list{
      border-top: 1px solid #F7F7F7;
      padding: 20px 0;
    }
    .collapse-header{
      line-height: 62px;
      padding: 10px 0;
      color: #666;
      cursor: pointer;
      position: relative;
      background-color: #F7F7F7;
      border: 1px solid #dddee1;
      > i.showTableStyles{
        transform: rotate(90deg);
        transition: transform .2s ease-in-out ;
      }
    }
    .manage-img {
      height: 42px;
      width: 42px;
      float: left;
      margin-left: 20px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .manage-text{
      float: left;
      margin-left: 10px;
      p{
        height: 21px;
        line-height: 21px;
      }
    }
    .new-add-wait{
      float: right;
      height: 42px;
      line-height: 42px;
      color: $mainColor;
      margin-right: 28px;
    }
    .waiting-task-number{
      float: right;
      height: 42px;
      line-height: 42px;
      color: #666;
      margin-right: 20px;
      p.task-wait-fail{
        height: 21px;
        line-height: 21px;
        text-align: right;
      }
      p.task-pass{
        text-align: right;
        width: 438px;
      }
      p.task-pass.lineHeight{
        line-height: 21px;
      }
    }
    .task-table table{
      width: 100%;
      border-left: 1px solid #dddee1;
      border-right: 1px solid #dddee1;
      border-bottom: 1px solid #dddee1;
    }
    .task-table table td,
    .task-table table th{
      border-right: 1px solid #e9eaec;
      text-align: center;
    }
    .task-table table td{
      border-top: 1px solid #e9eaec;
    }
    .task-table table td:last-child,
    .task-table table th:last-child{
      border-right: 0;
    }
    .task-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .task-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .task-table table td img {
      width: 54px;
      height: 54px;
    }
    .task-table table td .img-title {
      display: inline-block;
      width: 132px;
      height: 54px;
      padding-left: 10px;
      text-align: left;
    }
    .task-table table td.registration {
      color: #2b85e4;
    }
    .task-table table td .del-edit > span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .task-table table td span.look_record{
      color: #2b85e4;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .check-order-model {
      @include fullScreenModel;
    }
    .check-order-con {
      position: absolute;
      width: 600px;
      background-color: #fff;
      border-radius: 5px;
      left: 50%;
      margin-left: -300px;
      top: 30%;
      padding: 0 32px 26px 32px;
      text-align: center;
      i {
        font-size: 24px;
        cursor: pointer;
      }
      > p:nth-child(2) {
        span {
          font-size: 16px;
        }
      }
      > p:nth-child(3) {
        font-size: 14px;
      }
    }
    .true-btn {
      @include wh(120px, 32px);
      line-height: 32px;
      background-color: $mainColor;
      color: #fff;
      text-align: center;
      margin: 24px auto 0 auto;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }
    .title-tip {
      height: 36px;
      line-height: 36px;
      margin: 56px auto 20px auto;
      color: #000;
      background-color: #FFF6F3;
      font-size: 14px;
    }
  }
</style>
