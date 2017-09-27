<template>
  <div class="mt-20">
    <div class="search-list">
      <span>淘宝会员名：</span>
      <iInput v-model="alitmAccount" style="width: 160px;margin-right: 8px;"></iInput>
      <span class="ml-10">活动编号：</span>
      <iInput v-model="taskNumber" style="width: 160px;margin-right: 8px;"></iInput>
      <iButton type="primary" :loading="searchLoading" @click="appliesWaitingAuditTask">搜索</iButton>
    </div>
    <Collapse class="mt-10" accordion v-if="taskWaitAuditList.length > 0">
      <Panel v-for="(item,index) in taskWaitAuditList" :key="item.id">
        <div @click="getAllWaitTask(item.id,index)" style="width: 100%; height: 100%;">
          <div class="manage-img inline-block">
            <img :src="item.taskMainImage" alt="">
          </div>
          <div class="manage-text left ml-5 inline-block">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <div class="waiting-task-number">
            <p>新增待审批<span>{{item.newestTaskApplyCount || 0}}</span>人</p>
            <p>共有待审批<span>{{item.totalTaskApplyCount || 0}}</span>人</p>
          </div>
        </div>
        <div slot="content" class="task-table">
          <table>
            <thead>
            <tr>
              <th width="25%">淘宝账号（旺旺号）</th>
              <th width="25%">申请时间</th>
              <th width="25%">秀客的买家秀记录</th>
              <th width="25%">操作</th>
            </tr>
            </thead>
            <!--           <tbody v-for="newest in item.applyNewestTask" :key="newest.id">
                       <tr style="background-color: #FDF2E9">
                         <td>
                           <p>{{newest.alitmAccount}}</p>
                           <p v-if="newest.creditLevel"><img :src="newest.creditLevel" alt="" style="width: auto;height: auto;">
                           </p>
                           <p v-if="newest.tqz">淘气值：{{newest.tqz}}</p>
                         </td>
                         <td>{{newest.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
                         <td class="registration">
                           <router-link :to="{ 'path': '/trial-report','query': {'showkerId': newest.showkerId}}">0</router-link>
                         </td>
                         <td>
                           <p class="del-edit">
                             <span @click="taskWaitToPass(newest.id, 'true', 'newest')">通过</span>
                             <span class="ml-5" @click="markRead(item.id,newest.id)">设为已读</span>
                           </p>
                         </td>
                       </tr>
                       </tbody>-->
            <tbody v-for="allTask in item.applyAllTask" :key="item.id">
            <tr :class="{readBackground:allTask.newest}">
              <td>
                <p>{{allTask.alitmAccount}}</p>
                <p v-if="allTask.creditLevel"><img :src="allTask.creditLevel" alt="" style="width: auto;height: auto;">
                </p>
                <p v-if="allTask.tqz">淘气值：{{allTask.tqz}}</p>
              </td>
              <td>{{allTask.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
              <td class="registration">
                <router-link :to="{ 'path': '/trial-report','query': {'showkerId': allTask.showkerId}}">0</router-link>
              </td>
              <td>
                <p class="del-edit">
                  <span @click="taskWaitToPass(allTask.id, 'true', 'all')">通过</span>
                  <span v-if="allTask.newest" class="ml-5" @click="markRead(item.id,newest.id)">设为已读</span>
                </p>
              </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td colspan="4" width="100%">
                <span v-if="item.hasMoreData" class="ml-10 cursor-p look_record" @click="lookMoreDate(item.id,index)">查看更多数据...</span>
                <span class="ml-10 cursor-p" v-else>没有更多数据了</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </Collapse>
    <div class="mt-40 text-ct" v-else>暂无待审批数据</div>
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
        pageSize: 5,
        morePageIndex: 1,
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
      taskWaitToPass(id, status, type) {
        let _this = this;
        api.setTaskShowkerAudit({
          id: id,
          status: status,
          reason: null
        }).then(res => {
          if (res.status) {
            _this.$Message.success("审核秀客成功！");
            /* if (type === 'newest') {
               _this.appliesWaitingAuditNewest(_this.operateTaskId, _this.operateIndex);
             } else {
             }*/
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'totalTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount - 1);
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
          }
        })
      },
      getAllWaitTask(taskId, index) {
        let _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
//        _this.appliesWaitingAuditNewest(taskId, index);
        _this.appliesWaitingAuditAll(taskId, index);
      },
      /*      appliesWaitingAuditNewest(taskId, index) {
              let _this = this;
              if (_this.taskWaitAuditList[index].applyAllTask) {
                _this.taskWaitAuditList[index].applyAllTask = [];
              }
              if (_this.taskWaitAuditList[index].applyNewestTask) {
                _this.taskWaitAuditList[index].applyNewestTask = [];
              }
              api.appliesWaitingAuditNewest({
                taskId: taskId,
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
            },*/
      lookMoreDate(taskId, index) {
        this.appliesWaitingAuditAll(taskId, index, 'more')
      },
      appliesWaitingAuditAll(taskId, index, type) {
        let _this = this;
        if (type && type === 'more') {
          this.morePageIndex++;
        } else {
          this.morePageIndex = 1;
        }
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.appliesWaitingAuditAll({
          taskId: taskId,
          pageIndex: _this.morePageIndex
        }).then(res => {
          if (res.status) {
            if (res.data.content.length > 0) {
              if (res.data.content.length > 5) {
                _this.$set(_this.taskWaitAuditList[index], 'hasMoreData', true);
              }
              _this.$set(_this.taskWaitAuditList[index], 'applyAllTask', []);
              res.data.content.forEach(item => {
                _this.taskWaitAuditList[index].applyAllTask.push(item);
              });
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
              _this.$set(_this.taskWaitAuditList[index], 'hasMoreData', false);
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
//            _this.appliesWaitingAuditNewest(_this.operateTaskId, _this.operateIndex);
            this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            _this.$set(_this.taskWaitAuditList[_this.operateIndex], 'newestTaskApplyCount', _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount - 1);
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
    }
  }
</script>

