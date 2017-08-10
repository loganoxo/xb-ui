<template>
  <div class="activity-management">
    <div class="activity-title pl-10">试用活动管理</div>
    <div class="activity-title-s pl-10">
      共<span>{{taskTotalCount}}</span>个活动，其中待审核<span>{{taskWaitingAuditCount}}</span>个，进行中<span>{{taskUnderWayCount}}</span>个，已结束尚未结算<span>{{settlementWaitingAuditCount}}</span>个
    </div>
    <div class="select-status pl-10 clear">
      <div class="left mr-10" style="padding-top: 1px;">
        <Checkbox
          :value="checkAll"
          @click.prevent.native="handleCheckAll">所有状态
        </Checkbox>
      </div>
      <div class="left">
        <Checkbox-group v-model="taskStatusList" @on-change="checkAllGroupChange">
          <Checkbox label="waiting_pay">
            <span>待付款</span>
          </Checkbox>
          <Checkbox label="waiting_audit">
            <span>待审核</span>
          </Checkbox>
          <Checkbox label="waiting_modify">
            <span>待修改</span>
          </Checkbox>
          <Checkbox label="under_way">
            <span>进行中</span>
          </Checkbox>
          <Checkbox label="finished">
            <span>已结束</span>
          </Checkbox>
        </Checkbox-group>
      </div>
      <div class="left">
        <Checkbox-group v-model="settlementStatusList" @on-change="checkAllGroupChange">
          <Checkbox label="waiting_settlement">
            <span>待申请结算</span>
          </Checkbox>
          <Checkbox label="waiting_audit">
            <span>结算待审核</span>
          </Checkbox>
          <Checkbox label="settlement_finished">
            <span>已结算</span>
          </Checkbox>
        </Checkbox-group>
      </div>
    </div>
    <div class="activity-table">
      <table>
        <thead>
        <tr>
          <th width="20%">活动标题</th>
          <th width="20%">活动开始/结束时间</th>
          <th width="12%">活动状态</th>
          <th width="12%">报名/已通过</th>
          <th width="12%">可审批名额</th>
          <th width="12%">存入担保金</th>
          <th width="12%">操作</th>
        </tr>
        </thead>
        <tbody v-for="item in taskList" :key="item.id">
        <tr>
          <td>
            <img class="left ml-10" :src="item.taskMainImage" :alt="item.taskName">
            <span class="img-title left">{{item.taskName}}</span>
          </td>
          <td>
            <p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{(item.upLineTime ? item.upLineTime + item.taskDaysDuration * 3600 * 24 : item.upLineTime) | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td>{{item.taskStatusDesc}}</td>
          <td class="registration">{{item.showkerApplyTotalCount}} / {{item.showkerApplySuccessCount}}（人）</td>
          <td>{{item.taskCount}}</td>
          <td>{{item.pinkage ? (item.itemPrice / 100 + 10) * item.taskCount : item.itemPrice / 100 * item.taskCount}}</td>
          <td v-if="item.taskStatus !== 'under_way'">
            <p class="del-edit">
              <span class="mr-10" @click="editTask(item.id)">编辑</span>
              <span @click="deleteTask(item.id)">删除</span>
            </p>
            <p class="bond mt-6">
              <span>存担保金</span>
            </p>
            <p class="copy mt-6">
              <span>复制活动</span>
            </p>
          </td>
          <td v-else>
            <p class="bond mt-6">
              <span>审批秀客</span>
            </p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="activity-page mt-20 right mr-10">
      <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
    </div>
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此任务删除后，任务将无法执行。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="confirmDelete">删除</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox'
  import Table from 'iview/src/components/table'
  import Page from 'iview/src/components/page'
  import Modal from 'iview/src/components/modal'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import api from '@/config/apiConfig'

  export default {
    name: 'ActivityManagement',
    components: {
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      Modal: Modal,
      iButton: Button,
      Icon: Icon
    },
    data() {
      return {
        deleteModal: false,
        modalLoading: false,
        taskId: null,
        taskList: null,
        checkAll: false,
        taskStatusList: [],
        settlementStatusList: [],
        taskWaitingAuditCount: null,
        taskUnderWayCount: null,
        settlementWaitingAuditCount: null,
        taskTotalCount: null,
        totalElements: null,
        pageIndex: 1,
        pageSize: 5
      }
    },
    mounted() {
    },
    created() {
      this.getTaskList();
    },
    computed: {

    },
    methods: {
      editTask(id) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id}})
      },
      getTaskList() {
        api.getTaskList({
          taskStatusList: JSON.stringify(this.taskStatusList),
          settlementStatusList: JSON.stringify(this.settlementStatusList),
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          if (res.status) {
            this.totalElements = res.data.taskPage.totalElements;
            this.taskTotalCount = res.data.taskTotalCount;
            this.taskWaitingAuditCount = res.data.taskWaitingAuditCount;
            this.taskUnderWayCount = res.data.taskUnderWayCount;
            this.settlementWaitingAuditCount = res.data.settlementWaitingAuditCount;
            this.taskList = res.data.taskPage.content;
          }
        })
      },
      deleteTask(id) {
        this.deleteModal = true;
        this.taskId = id;
      },
      confirmDelete() {
        let _this = this;
        _this.modalLoading = true;
        api.deleteTask({
          taskId: this.taskId
        }).then(res => {
          if (res.status) {
            _this.deleteModal = false;
            _this.modalLoading = false;
            setTimeout(function () {
              _this.$Message.success('任务删除成功');
            },500);
            _this.getTaskList();
          }else{
            _this.deleteModal = false;
            _this.modalLoading = false;
            _this.$Message.error("抱歉，任务删除失败！");
          }
        })
      },
      pageChange(data) {
        this.pageIndex = data;
        this.getTaskList();
      },
      handleCheckAll() {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.taskStatusList = ['waiting_pay', 'waiting_audit', 'waiting_modify', 'under_way', 'finished'];
          this.settlementStatusList = ['waiting_settlement', 'waiting_audit', 'settlement_finished'];
          this.getTaskList();
        } else {
          this.taskStatusList = [];
          this.settlementStatusList = [];
        }
      },
      checkAllGroupChange() {
        if (this.settlementStatusList.length === 3 && this.taskStatusList.length === 5) {
          this.checkAll = true;
        } else if (this.settlementStatusList.length > 0 || this.taskStatusList.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
        this.getTaskList();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/common';
  @import 'src/css/mixin';

  .activity-management {
    .activity-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
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
    .select-status {
      height: 52px;
      line-height: 52px;
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
      display: inline-block;
      padding: 4px 6px;
      background-color: #2b85e4;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .del-edit span:last-child {
      background-color: #2b85e4;
      @include transition;
      &:hover {
        background-color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .bond span {
      display: inline-block;
      padding: 4px 6px;
      background-color: $mainColor;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }
    .activity-table table td .copy span {
      display: inline-block;
      padding: 4px 6px;
      background-color: #2b85e4;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken(#2b85e4, 10%);
      }
    }
  }
</style>
