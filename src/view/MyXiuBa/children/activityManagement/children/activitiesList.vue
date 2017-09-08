<template>
  <div class="activity-management">
    <div class="activity-title pl-10">试用活动管理</div>
    <div class="activity-title-s pl-10">
      共<span>{{taskData.taskTotalCount}}</span>个活动，其中待审核<span>{{taskData.taskWaitingAuditCount}}</span>个，进行中<span>{{taskData.taskUnderWayCount}}</span>个，已结束尚未结算<span>{{taskData.settlementWaitingAuditCount}}</span>个
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
          <th width="14%">活动开始 / 结束时间</th>
          <th width="10%">活动状态</th>
          <th width="12%">报名 / 已通过</th>
          <th width="8%">可审批名额</th>
          <th width="24%">活动所需担保金 / 活动所需推广费 / 已存入</th>
          <th width="12%">操作</th>
        </tr>
        </thead>
        <tbody v-for="item in taskList" :key="item.id" v-if="taskList && taskList.length > 0">
        <tr class="task-number">
          <td colspan="7">活动编号：{{item.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="item.taskMainImage" :alt="item.taskName">
            <span class="img-title left">{{item.taskName}}</span>
          </td>
          <td>
            <p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{item.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td v-if="item.taskStatus !== 'waiting_modify'">{{item.taskStatusDesc}}</td>
          <td class="cursor-p main-color" v-else>
            <Tooltip :content="item.auditLogs[item.auditLogs.length - 1].resultMsg" placement="top">
              <Icon color="#f60" type="information-circled"></Icon>&nbsp;待修改
            </Tooltip>
          </td>
          <td class="registration">{{item.showkerApplyTotalCount || 0}} / {{item.showkerApplySuccessCount || 0}}（人）</td>
          <td>{{item.taskCount}}</td>
          <td>{{item.totalMarginNeed / 100}} / {{item.promotionExpensesNeed / 100}} / {{(item.marginPaid + item.promotionExpensesPaid) / 100 || 0}}</td>
          <td v-if="item.taskStatus === 'waiting_pay'">
            <p class="del-edit">
              <span class="mr-10" @click="editTask(item.id,item.taskStatus)">编辑</span>
              <span @click="deleteTask(item.id)">删除</span>
            </p>
            <p class="bond mt-6">
              <span>存担保金</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'waiting_modify'">
            <p class="del-edit">
              <span class="mr-10" @click="editTask(item.id,item.taskStatus)">编辑</span>
              <span @click="deleteTask(item.id)">删除</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'waiting_audit' || item.taskStatus === 'cannot_settlement'">
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'waiting_settlement'">
            <p class="copy mt-6">
              <span>申请结算</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'settlement_finished'">
            <p class="copy mt-6">
              <span>结算详情</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else>
            <p class="bond mt-6">
              <span @click="approveShowker(item.id)">审批秀客</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
        </tr>
        </tbody>
        <tbody v-if="taskList && taskList.length === 0">
        <tr>
          <td colspan="7" width="100%">暂无数据</td>
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
  import Page from 'iview/src/components/page'
  import Modal from 'iview/src/components/modal'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Tooltip from 'iview/src/components/tooltip'
  import PayModel from '@/components/PayModel'
  import api from '@/config/apiConfig'
  import {mapActions} from 'vuex'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ActivitiesList',
    components: {
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      Icon: Icon,
      iButton: Button,
      Modal: Modal,
      iInput: Input,
      Tooltip: Tooltip,
      PayModel: PayModel
    },
    data() {
      return {
        taskList: null,
        checkAll: false,
        deleteModal: false,
        modalLoading: false,
        taskStatusList: [],
        settlementStatusList: [],
        taskData: {},
        totalElements: null,
        pageIndex: 1,
        approvePageIndex: 1,
        pageSize: 5,
      }
    },
    mounted() {

    },
    created() {
      this.getTaskList();
    },
    computed: {},
    methods: {
      ...mapActions([
        'getBalance'
      ]),
      editTask(id,status) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id}})
      },
      copyTask(id) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id, type: 'copy'}})
      },
      approveShowker(id) {
        this.$router.push({name: 'ApproveShowker', query: {taskId: id}})
      },
      getTaskList() {
        let _this = this;
        api.getTaskList({
          taskStatusList: JSON.stringify(_this.taskStatusList),
          settlementStatusList: JSON.stringify(_this.settlementStatusList),
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.taskData = res.data;
            _this.totalElements = res.data.taskPage.totalElements;
            _this.taskList = res.data.taskPage.content;
          }
        })
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
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
            }, 500);
            _this.getTaskList();
          } else {
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
        } else {
          this.taskStatusList = [];
          this.settlementStatusList = [];
        }
        this.getTaskList();
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

