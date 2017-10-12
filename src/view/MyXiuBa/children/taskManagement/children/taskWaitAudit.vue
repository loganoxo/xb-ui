<template>
  <div class="mt-20">
    <div class="search-list">
      <span>淘宝会员名：</span>
      <iInput v-model="alitmAccount" style="width: 100px;margin-right: 8px;"></iInput>
      <span class="ml-10">活动编号：</span>
      <iInput v-model="taskNumber" style="width: 140px;margin-right: 8px;"></iInput>
      <span class="ml-10">旺旺号信用等级大于等于：</span>
      <iSelect v-model="wwFormValidate.creditLevel" style="width: 130px;">
        <iOption v-for="(taobaoLevelImg,index) in taobaoLevelImgs" :label='taobaoLevelImg.label' :value="taobaoLevelImg.value" :key="taobaoLevelImg.value">
          <span v-show="index === 0">{{taobaoLevelImg.text}}</span>
          <img v-show="index !== 0" :src="taobaoLevelImg.text" alt="">
        </iOption>
      </iSelect>
      <span class="ml-10">淘气值范围：</span>
      <iSelect v-model="wwFormValidate.tqz" style="width: 120px;">
        <iOption v-for="taoqizhi in taoqizhiList" :label='taoqizhi.label' :value="taoqizhi.value" :key="taoqizhi.value">
          {{taoqizhi.label}}
        </iOption>
      </iSelect>
      <iButton class="ml-10" type="primary" :loading="searchLoading" @click="searchAuditTask">搜索</iButton>
    </div>
    <div class="mt-12" v-for="(item,index) in taskWaitAuditList" :key="item.id" v-if="taskWaitAuditList.length > 0">
      <div class="collapse-header clear" @click="collapseToggle(item.id,index)">
        <div class="manage-img inline-block">
          <img :src="item.taskMainImage + '!thum54'" alt="">
        </div>
        <div class="manage-text left ml-5 inline-block">
          <p>活动编号：{{item.number}}</p>
          <p>活动名称：{{item.taskName}}</p>
          <p>参与概况：总份数<span class="main-color">{{item.taskCount || 0}}</span>，<span
            class="main-color">{{item.trailOn || 0}}</span>人正在参与活动，<span
            class="main-color">{{item.trailDone || 0}}</span>人完成活动，剩余名额<span class="main-color">{{item.residueCount || 0}}</span>个
          </p>
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
                <router-link :to="{ 'path': '/trial-report','query': {'q': encryptionId(allTask.showkerId)}}">查看
                </router-link>
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
                  <span v-if="item.needBrowseCollectAddCart"
                        @click="taskWaitToAudit(allTask.id,allTask.alitmAccount,allTask.screenshot,item.endTime,allTaskIndex)">审批</span>
                  <span class="ml-5" @click="taskWaitToPass(allTask.id, 'true',allTaskIndex)">通过</span>
                  <span v-if="allTask.newest" class="ml-5" @click="markRead(item.id,allTask.id)">设为已读</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td colspan="5">
                <Page :total="taskTotalElements" :page-size="taskPageSize" :current="taskPageIndex"
                      @on-change="TaskPageChange"></Page>
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
  import Form from 'iview/src/components/form'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Checkbox from 'iview/src/components/checkbox'
  import Page from 'iview/src/components/page'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Tooltip from 'iview/src/components/tooltip'
  import Modal from 'iview/src/components/modal'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import AuditShowker from '@/components/AuditShowker'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList, encryption} from '@/config/utils'

  export default {
    name: 'TaskWaitAudit',
    components: {
      iForm: Form,
      iSelect: Select,
      iOption: Option,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      FormItem: Form.Item,
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
        wwFormValidate: {
          creditLevel: null,
          tqz: null,
        },
        taobaoLevelImgs: [
          {
            value: '',
            text: '不限',
            label: '不限'
          },
          {
            value: 2,
            text: 'https://img.alicdn.com/newrank/b_red_2.gif',
            label: '2心'
          },
          {
            value: 3,
            text: 'https://img.alicdn.com/newrank/b_red_3.gif',
            label: '3心'
          },
          {
            value: 4,
            text: 'https://img.alicdn.com/newrank/b_red_4.gif',
            label: '4心'
          },
          {
            value: 5,
            text: 'https://img.alicdn.com/newrank/b_red_5.gif',
            label: '5心'
          },
          {
            value: 6,
            text: 'https://img.alicdn.com/newrank/b_blue_1.gif',
            label: '1钻'
          },
          {
            value: 7,
            text: 'https://img.alicdn.com/newrank/b_blue_2.gif',
            label: '2钻'
          },
          {
            value: 8,
            text: 'https://img.alicdn.com/newrank/b_blue_3.gif',
            label: '3钻'
          },
          {
            value: 9,
            text: 'https://img.alicdn.com/newrank/b_blue_4.gif',
            label: '4钻'
          },
          {
            value: 10,
            text: 'https://img.alicdn.com/newrank/b_blue_5.gif',
            label: '5钻'
          },
          {
            value: 11,
            text: 'https://img.alicdn.com/newrank/s_crown_1.gif',
            label: '1皇冠'
          },
          {
            value: 12,
            text: 'https://img.alicdn.com/newrank/s_crown_2.gif',
            label: '2皇冠'
          },
          {
            value: 13,
            text: 'https://img.alicdn.com/newrank/s_crown_3.gif',
            label: '3皇冠'
          },
          {
            value: 14,
            text: 'https://img.alicdn.com/newrank/s_crown_4.gif',
            label: '4皇冠'
          },
          {
            value: 15,
            text: 'https://img.alicdn.com/newrank/s_crown_5.gif',
            label: '5皇冠'
          },
        ],
        taoqizhiList: [
          {
            value: '',
            label: '不限'
          },
          {
            value: 1,
            label: '0-199'
          },
          {
            value: 2,
            label: '200-399'
          },
          {
            value: 3,
            label: '400-599'
          },
          {
            value: 4,
            label: '600-799'
          },
          {
            value: 5,
            label: '800-999'
          },
          {
            value: 6,
            label: '1000-1999'
          },
          {
            value: 7,
            label: '2000-2499'
          },
          {
            value: 8,
            label: '2500以上'
          },
        ],
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
      encryptionId(id) {
        return encryption(id)
      },
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
      searchAuditTask(){
        this.selectId = null;
        this.appliesWaitingAuditTask();
      },
      taskWaitToPass(id, status) {
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
            if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
            }
            if (_this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'totalTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount - 1);
            }
            if (_this.taskWaitAuditList[_this.operateIndex].residueCount > 0) {
              _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'residueCount', _this.taskWaitAuditList[_this.operateIndex].residueCount - 1);
            }
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'trailOn', _this.taskWaitAuditList[_this.operateIndex].trailOn + 1);
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
          tqz: _this.wwFormValidate.tqz,
          creditLevel: _this.wwFormValidate.creditLevel
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
          pageIndex: _this.taskPageIndex,
          tqz: _this.wwFormValidate.tqz,
          creditLevel: _this.wwFormValidate.creditLevel
        }).then(res => {
          if (res.status) {
            if (res.data.content.length > 0) {
              if (!_this.taskWaitAuditList[index].applyAllTask) {
                _this.$set(_this.taskWaitAuditList[index], 'applyAllTask', []);
              }
              _this.taskWaitAuditList[index].applyAllTask = res.data.content;
              _this.taskTotalElements = res.data.totalElements;
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
          if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
          }
          if (_this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'totalTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount - 1);
          }
          if (_this.taskWaitAuditList[_this.operateIndex].residueCount > 0) {
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'residueCount', _this.taskWaitAuditList[_this.operateIndex].residueCount - 1);
          }
          _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'trailOn', _this.taskWaitAuditList[_this.operateIndex].trailOn + 1);
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

