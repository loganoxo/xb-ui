<template>
  <div class="mt-20">
    <div class="search-list">
      <span>淘宝会员名：</span>
      <iInput v-model="alitmAccount" style="width: 160px;margin-right: 8px;"></iInput>
      <span class="ml-10">活动编号：</span>
      <iInput v-model="taskNumber" style="width: 160px;margin-right: 8px;"></iInput>
      <iButton type="primary" :loading="searchLoading" @click="appliesWaitingAuditTask">搜索</iButton>
    </div>
    <div class="mt-12" v-for="(item,index) in taskWaitAuditList" :key="item.id" v-if="taskWaitAuditList.length > 0">
      <div class="collapse-header clear" @click="collapseToggle(item.id,index)">
        <div class="manage-img inline-block mt-10">
          <img :src="item.taskMainImage" alt="">
        </div>
        <div class="manage-text left ml-5 inline-block">
          <p>活动编号：{{item.number}}</p>
          <p>活动名称：{{item.taskName}}</p>
          <p>参与概况：总份数<span class="main-color">{{item.taskCount}}</span>，<span class="main-color">{{item.trailOn}}</span>人正在参与活动，<span class="main-color">{{item.trailDone }}</span>人完成活动，剩余名额<span class="main-color">{{item.taskCount - item.showkerApplySuccessCount}}</span>个</p>
        </div>
        <Icon :class="{showTableStyles:selectId === item.id}" class="right mr-30 mt-28" type="arrow-right-b"></Icon>
        <div class="waiting-task-number mt-10">
          <p class="task-wait-fail">新增待审批<span>{{item.newestTaskApplyCount || 0}}</span>人</p>
          <p class="task-wait-fail">共有待审批<span>{{item.totalTaskApplyCount || 0}}</span>人</p>
        </div>
      </div>
      <collapse-transition>
        <div class="task-table" v-show="selectId === item.id">
          <table>
            <thead>
            <tr>
              <th width="20%">淘宝账号（旺旺号）</th>
              <th width="20%">申请时间</th>
              <th width="20%">秀客的买家秀记录</th>
              <th width="20%">流程状态</th>
              <th width="20%">操作</th>
            </tr>
            </thead>
            <tbody v-for="(allTask,allTaskIndex) in item.applyAllTask" :key="allTask.id">
            <tr :class="{readBackground:allTask.newest}">
              <td>
                <p>{{allTask.alitmAccount}}</p>
                <p v-if="allTask.creditLevel"><img :src="allTask.creditLevel" alt="" style="width: auto;height: auto;">
                </p>
                <p v-if="allTask.tqz">淘气值：{{allTask.tqz}}</p>
              </td>
              <td>{{allTask.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
              <td class="registration">
                <router-link :to="{ 'path': '/trial-report','query': {'showkerId': allTask.showkerId}}">查看</router-link>
              </td>
              <td>
                <Tooltip v-if="allTask.reason && allTask.status === 'waiting_resubmit'" :content="allTask.reason"
                         placement="top" class="cursor-p">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span class="main-color">{{getStatusInfo(allTask.status)}}</span>
                </Tooltip>
                <span v-else>{{getStatusInfo(allTask.status)}}</span>
              </td>
              <td>
                <p class="del-edit">
                  <span v-if="item.needBrowseCollectAddCart" @click="taskWaitToAudit(allTask.id,allTask.alitmAccount,allTask.screenshot,item.endTime,allTaskIndex)">审批</span>
                  <span class="ml-5" @click="taskWaitToPass(allTask.id, 'true',allTaskIndex)">通过</span>
                  <span v-if="allTask.newest" class="ml-5" @click="markRead(item.id,allTask.id)">设为已读</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td colspan="5">
                <Page :total="taskTotalElements" :page-size="taskPageSize" :current="taskPageIndex" @on-change="TaskPageChange"></Page>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </collapse-transition>
    </div>
    <div class="mt-40 text-ct" v-if="taskWaitAuditList.length === 0">暂无待审批数据</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskWaitAuditList && taskWaitAuditList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
    <!--审核秀客图片-->
    <template v-if="showApprovalPop">
      <Modal v-model="approvalPopInfo.approvalPop" :transfer="false" width="600">
        <AuditShowker
          :applyName="approvalPopInfo.applyName"
          :userScreenShotImg="approvalPopInfo.userScreenShotImg"
          :passId="approvalPopInfo.passId"
          :activeEndTime="approvalPopInfo.activeEndTime"
          @request="auditSuccess">
        </AuditShowker>
        <div slot="footer" style="padding: 0px ; border: none"></div>
      </Modal>
    </template>
  </div>
</template>

<script>
  import Page from 'iview/src/components/page'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Tooltip from 'iview/src/components/tooltip'
  import Modal from 'iview/src/components/modal'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import AuditShowker from '@/components/AuditShowker'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'TaskWaitAudit',
    components: {
      Page: Page,
      iButton: Button,
      iInput: Input,
      Icon: Icon,
      Tooltip: Tooltip,
      Modal: Modal,
      AuditShowker: AuditShowker,
      CollapseTransition: CollapseTransition
    },
    data() {
      return {
        searchLoading: false,
        taskWaitAuditList: [],
        taskId: null,
        totalElements: 0,
        taskTotalElements: 0,
        pageIndex: 1,
        taskPageIndex: 1,
        pageSize: 5,
        taskPageSize: 5,
        alitmAccount: null,
        taskNumber: null,
        operateTaskId: null,
        operateIndex: null,
        selectId: null,
        showApprovalPop: false,
        approvalPopInfo: {
          approvalPop: false,
          applyName: null,
          userScreenShotImg: null,
          passId: null,
          activeEndTime: null,
          index: null,
        }
      }
    },
    mounted() {

    },
    created() {
      this.appliesWaitingAuditTask();
    },
    computed: {},
    methods: {
      getStatusInfo(status) {
        return TaskErrorStatusList(status)
      },
      pageChange(data) {
        this.pageIndex = data;
        this.appliesWaitingAuditTask();
      },
      TaskPageChange(data) {
        this.taskPageIndex = data;
        this.appliesWaitingAuditAll(this.operateTaskId, this.operateIndex);
      },
      taskWaitToPass(id, status, index) {
        let _this = this;
        api.setTaskShowkerAudit({
          id: id,
          status: status,
          reason: null
        }).then(res => {
          if (res.status) {
            _this.$Message.success("审核秀客成功！");
            _this.$store.dispatch('getPersonalTrialCount');
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            if (_this.taskWaitAuditList[_this.operateIndex].applyAllTask[index].newest && _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
            }
            if (!_this.taskWaitAuditList[_this.operateIndex].applyAllTask[index].newest && _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'totalTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount - 1);
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      appliesWaitingAuditTask() {
        let _this = this;
        _this.searchLoading = true;
        api.appliesWaitingAuditTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
        }).then(res => {
          if (res.status) {
            _this.taskWaitAuditList = res.data.content;
            _this.totalElements = res.data.totalElements;
            _this.searchLoading = false;
          } else {
            _this.$Message.error(res.msg);
            _this.searchLoading = false;
          }
        })
      },
      appliesWaitingAuditAll(taskId, index) {
        let _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.appliesWaitingAuditAll({
          taskId: taskId,
          pageIndex: _this.taskPageIndex
        }).then(res => {
          if (res.status) {
            if (res.data.content.length > 0) {
              if (!_this.taskWaitAuditList[index].applyAllTask) {
                _this.$set(_this.taskWaitAuditList[index], 'applyAllTask', []);
              }
              _this.taskWaitAuditList[index].applyAllTask = res.data.content;
              _this.taskTotalElements = res.data.totalElements;
              _this.taskWaitAuditList[index].applyAllTask.forEach(item => {
                api.getAlitmByAccount({
                  account: item.alitmAccount,
                }).then((res) => {
                  if (res.status) {
                    if (Object.keys(res.data).length > 0) {
                      _this.$set(item, 'creditLevel', res.data.creditLevelUrl);
                      _this.$set(item, 'tqz', res.data.tqzNum);
                    }
                  }
                });
              })
            } else {
              _this.taskWaitAuditList[index].applyAllTask = [];
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      markRead(taskId, taskApplyId) {
        let _this = this;
        api.waitingAuditNewestMarkRead({
          taskId: taskId,
          taskApplyId: taskApplyId
        }).then(res => {
          if (res.status) {
            _this.$Message.success("设置新增待审批已读成功！");
            _this.$store.dispatch('getPersonalTrialCount');
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      taskWaitToAudit(id, account, screenshot, time, index) {
        this.showApprovalPop = true;
        this.approvalPopInfo.approvalPop = true;
        this.approvalPopInfo.passId = id;
        this.approvalPopInfo.applyName = account;
        this.approvalPopInfo.userScreenShotImg = JSON.parse(screenshot);
        this.approvalPopInfo.activeEndTime = time;
        this.approvalPopInfo.index = index;
      },
      auditSuccess(closePop, type) {
        let _this = this;
        _this.approvalPopInfo.approvalPop = closePop;
        _this.$store.dispatch('getPersonalTrialCount');
        _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
        if (type === 'true') {
          if (_this.taskWaitAuditList[_this.operateIndex].applyAllTask[_this.approvalPopInfo.index].newest && _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
          }
          if (!_this.taskWaitAuditList[_this.operateIndex].applyAllTask[_this.approvalPopInfo.index].newest && _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'totalTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount - 1);
          }
        }
      },
      collapseToggle(id, index) {
        this.taskPageIndex = 1;
        if (this.selectId === id) {
          this.selectId = null;
          this.taskWaitAuditList.forEach(item => {
            if (item.applyAllTask) {
              item.applyAllTask = [];
            }
          });
        } else {
          this.selectId = id;
          this.appliesWaitingAuditAll(id, index)
        }
      },
    }
  }
</script>

