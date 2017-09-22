<template>
  <div class="mt-20">
    <span>淘宝会员名：</span>
    <iInput v-model="alitmAccount" style="width: 160px;margin-right: 8px;"></iInput>
    <span class="ml-10">活动编号：</span>
    <iInput v-model="taskNumber" style="width: 160px;margin-right: 8px;"></iInput>
    <iButton type="primary" :loading="searchLoading" @click="appliesWaitingAuditTask">搜索</iButton>
    <Collapse class="mt-20" accordion>
      <Panel v-for="(item,index) in taskWaitAuditList" :key="item.id">
        <div @click="appliesWaitingAuditNewest(item.id,index)" style="width: 100%; height: 100%;">
          <div class="manage-img inline-block">
            <img :src="item.taskMainImage" alt="">
          </div>
          <div class="manage-text left ml-5 inline-block">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <div class="new-add-wait" v-if="item.newestTaskApplyCount > 0">新增待审批{{item.newestTaskApplyCount}}人</div>
        </div>
        <div slot="content" class="task-table">
          <table>
            <thead>
            <tr>
              <th width="25%">淘宝账号（旺旺号）</th>
              <th width="25%">申请时间</th>
              <th width="25%">已完成活动次数</th>
              <th width="25%">操作</th>
            </tr>
            </thead>
            <tbody v-for="item in item.applyNewestTask" :key="item.id" v-if="item.applyNewestTask && item.applyNewestTask.length > 0">
            <tr>
              <td>
                <p>{{item.alitmAccount}}</p>
                <p v-if="item.creditLevel"><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
              </td>
              <td>{{item.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
              <td class="registration">
                <router-link :to="{ 'path': '/trial-report','query': {'showkerId': item.showkerId}}">0</router-link>
              </td>
              <td>
                <p class="del-edit">
                  <span @click="taskWaitToPass(item.task.id, 'true', 'newest')">通过</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody v-for="item in item.applyAllTask" :key="item.id">
            <tr>
              <td>
                <p>{{item.alitmAccount}}</p>
                <p v-if="item.creditLevel"><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
              </td>
              <td>{{item.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
              <td class="registration">
                <router-link :to="{ 'path': '/trial-report','query': {'showkerId': item.showkerId}}">0</router-link>
              </td>
              <td>
                <p class="del-edit">
                  <span @click="taskWaitToPass(item.id, 'true', 'all')">通过</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody v-if="!taskWaitAuditList[index].applyNewestTask && (!taskWaitAuditList[index].applyAllTask || taskWaitAuditList[index].applyAllTask.length === 0)">
            <tr>
              <td colspan="4" width="100%">
                <p>
                  <span class="ml-10 cursor-p look_record" @click="appliesWaitingAuditAll(item.id,index)">暂无新增数据，查看全部记录</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody v-if="!taskWaitAuditList[index].applyAllTask && taskWaitAuditList[index].applyNewestTask">
            <tr>
              <td colspan="4" width="100%">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </Collapse>
    <div class="activity-page mt-20 right mr-10" v-if="taskWaitAuditList && taskWaitAuditList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import Collapse from 'iview/src/components/collapse'
  import Page from 'iview/src/components/page'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import api from '@/config/apiConfig'

  export default {
    name: 'TaskWaitAudit',
    components: {
      Collapse: Collapse,
      Panel: Collapse.Panel,
      Page: Page,
      iButton: Button,
      iInput: Input,
    },
    data() {
      return {
        searchLoading: false,
        taskWaitAuditList: [],
        taskId: null,
        totalElements: 0,
        pageIndex: 1,
        pageSize: 10,
        alitmAccount: null,
        taskNumber: null,
        operateTaskId: null,
        operateIndex: null,
      }
    },
    mounted() {

    },
    created() {
      this.appliesWaitingAuditTask();
    },
    computed: {},
    methods: {
      pageChange(data) {
        this.pageIndex = data;
        this.appliesWaitingAuditTask();
      },
      taskWaitToPass(id,status,type) {
        let _this = this;
        api.setTaskShowkerAudit({
          id: id,
          status: status
        }).then(res => {
          if (res.status) {
            _this.$Message.success("审核秀客成功！");
            if(type === 'newest'){
              _this.appliesWaitingAuditNewest(_this.operateTaskId, _this.operateIndex);
            }else{
              _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            }
          } else {
            _this.$Message.error(res.msg)
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
          }
        })
      },
      appliesWaitingAuditNewest(taskId, index) {
        let _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
       /* if (_this.taskWaitAuditList[index].applyAllTask) {
          _this.taskWaitAuditList[index].applyAllTask = [];
        }
        if (_this.taskWaitAuditList[index].applyNewestTask) {
          _this.taskWaitAuditList[index].applyNewestTask = [];
        }*/
        api.appliesWaitingAuditNewest({
          taskId: taskId,
          pageIndex: _this.pageIndex,
          alitmAccount: _this.alitmAccount,
        }).then(res => {
          if (res.status) {
            if (res.data) {
              _this.$set(_this.taskWaitAuditList[index], 'applyNewestTask', res.data.content);
              _this.taskWaitAuditList[index].applyNewestTask.forEach(item => {
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
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      appliesWaitingAuditAll(taskId, index) {
        let _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.appliesWaitingAuditAll({
          taskId: taskId,
          pageIndex: _this.pageIndex
        }).then(res => {
          if (res.status) {
            _this.$set(_this.taskWaitAuditList[index], 'applyAllTask', res.data.content);
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
            _this.$Message.error(res.msg);
          }
        })
      },
    }
  }
</script>

