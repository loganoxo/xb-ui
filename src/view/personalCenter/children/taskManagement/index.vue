<template>
  <div class="task-management">
    <div class="task-management-title pl-10">拿手任务管理</div>
    <div class="activity-title-s pl-10">
      共<span>{{personalTrialCount.taskTotalCount}}</span>个活动，其中新增待审批拿手<span>{{personalTrialCount.new_number_of_pending_audit}}</span>个，订单号待审核<span>{{personalTrialCount.orderNumWaitingAuditShowkerTask}}</span>个，买家秀待确认<span>{{personalTrialCount.trialReportWaitingConfirmShowkerTask}}</span>个
    </div>
    <div class="task-management-list mt-20">
      <div class="task-management-list-title">
        <router-link to="/user/task-management/wait" tag="span" :class="{isSelect:showTaskStatus === 'TaskWaitAudit'}">
          待审批
        </router-link>
        <router-link to="/user/task-management/pass" tag="span" :class="{isSelect:showTaskStatus === 'TaskPassAudit'}">
          已通过
        </router-link>
        <router-link to="/user/task-management/fail" tag="span" :class="{isSelect:showTaskStatus === 'TaskFailAudit'}">
          未通过
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'

  export default {
    name: 'TaskManagement',
    data() {
      return {
        showTaskStatus: 'TaskWaitAudit',
      }
    },
    mounted() {
    },
    created() {
      this.showTaskStatus = this.$route.name;
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

  .task-management {
    .prompt {
      height: 36px;
      line-height: 36px;
      border: 1px solid #FFB9B8;
      border-radius: 5px;
      background-color: #FFF4F1;
      text-align: center;
      color: red;
      font-size: 14px;
    }

    .ww-active {
      background-color: $mainColor;
      color: #fff;
    }

    .readBackground {
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

    .search-list {
      border-top: 1px solid #F7F7F7;
      border-bottom: 1px solid #F7F7F7;
      padding: 20px 0;
    }

    .collapse-header {
      line-height: 62px;
      padding: 10px 0;
      color: #666;
      cursor: pointer;
      position: relative;
      background-color: #F7F7F7;
      border: 1px solid #dddee1;
      border-radius: 5px;
      > i.show-table-styles {
        transform: rotate(90deg);
        transition: transform .2s ease-in-out;
      }
    }

    .noBorderRadius {
      border-radius: 5px 5px 0 0;
    }

    .manage-img {
      height: 54px;
      width: 54px;
      float: left;
      margin-left: 20px;
      margin-top: 3px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .manage-text {
      float: left;
      margin-left: 10px;
      p {
        height: 21px;
        line-height: 21px;
      }
    }

    .new-add-wait {
      float: right;
      height: 42px;
      line-height: 42px;
      color: $mainColor;
      margin-right: 28px;
    }

    .waiting-task-number {
      float: right;
      height: 42px;
      line-height: 42px;
      color: #666;
      margin-right: 20px;
      p.task-wait-fail {
        height: 21px;
        line-height: 21px;
        text-align: right;
      }
      p.task-pass {
        text-align: right;
        width: 400px;
      }
      p.task-pass.line-height {
        line-height: 21px;
      }
    }

    .task-table table {
      width: 100%;
      border-left: 1px solid #dddee1;
      border-right: 1px solid #dddee1;
      border-bottom: 1px solid #dddee1;
    }

    .task-table table td,
    .task-table table th {
      border-right: 1px solid #e9eaec;
      text-align: center;
    }

    .task-table table td {
      border-top: 1px solid #e9eaec;
    }

    .task-table table td:last-child,
    .task-table table th:last-child {
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

    .task-table table td img.level {
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

    .task-table table td .del-edit span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }

    .task-table table td span.look_record {
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
      width: 652px;
      background-color: #fff;
      border-radius: 5px;
      left: 50%;
      margin-left: -300px;
      top: 30%;
      padding: 0 18px 26px 18px;
      > i {
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

    .carousel {
      width: 800px;
      height: 800px;
    }

    .order-info-screenshot {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
      margin-right: 4px;
      &:hover .order-info-screenshot-cover {
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }

    .order-info-screenshot-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .6);
    }

    .order-info-screenshot-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }

    .certainly-hit-tip {
      position: absolute;
      background-color: #f9284f;
      color: #fff;
      line-height: 14px;
      height: 14px;
      width: 54px;
      text-align: center;
      left: 0;
      bottom: -4px;
      font-size: 12px !important;
    }

    .new-man-tip {
      width: 50px;
    }

    .account-info {
      width: 140px;
    }

    .parting-line {
      border-left: 1px dashed #999;
      height: 60px;
      margin-top: 28px;
      margin-left: 14px;
    }

    .order-info-con {
      border: 1px dashed #999;
      border-radius: 5px;
      padding: 10px;
    }

    .fire-eye-off {
      display: inline-block;
      padding: 0 12px;
      height: 28px;
      font-size: 14px;
      line-height: 28px;
      border-radius: 5px;
      text-align: center;
      color: #fff;
      background-color: #999;
      cursor: pointer;
    }

    .fire-eye-on {
      display: inline-block;
      padding: 0 12px;
      height: 28px;
      font-size: 14px;
      line-height: 28px;
      border-radius: 5px;
      text-align: center;
      color: #fff;
      background-color: $mainColor;
      cursor: pointer;
    }

    .value-added-info {
      padding: 10px 0;
      background-color: #fff;
      border-radius: 5px;
      margin-top: 5px;
    }

    .black-list-table {
      border-color: #999;
      border-radius: 5px;
    }


  }
</style>
