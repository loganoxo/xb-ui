<template>
  <div class="mt-20">
    <div class="clear mt-20 mb-20">
      <div class="left mr-10" style="margin-top: 2px;">
        <Checkbox
          :value="checkAllByFail"
          @click.prevent.native="handleCheckFailAll">所有
        </Checkbox>
      </div>
      <div class="left">
        <Checkbox-group v-model="rejectReasonList" @on-change="checkFailChange">
          <Checkbox label="system_reject">
            <span>系统终止</span>
          </Checkbox>
          <Checkbox label="showker_give_up">
            <span>秀客放弃</span>
          </Checkbox>
          <Checkbox label="merchant_reject">
            <span>商家终止</span>
          </Checkbox>
        </Checkbox-group>
      </div>
    </div>
    <div class="search-list">
      <span>淘宝会员名：</span>
      <iInput v-model="alitmAccount" style="width: 160px;margin-right: 8px;"></iInput>
      <span>活动编号：</span>
      <iInput v-model="taskNumber" style="width: 160px;margin-right: 8px;"></iInput>
      <iButton type="primary" :loading="searchLoading" @click="appliesEndTask">搜索</iButton>
    </div>
    <Collapse class="mt-10" accordion v-if="taskFailAuditList.length > 0">
      <Panel v-for="(item,index) in taskFailAuditList" :key="item.id">
        <div @click="appliesEndShowkerTask(item.id,index)" style="width: 100%; height: 100%;">
          <div class="manage-img inline-block">
            <img :src="item.taskMainImage" alt="">
          </div>
          <div class="manage-text left ml-5 inline-block">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <div class="waiting-task-number">
            <p class="mt-12">共 0 人</p>
          </div>
        </div>
        <div slot="content" class="task-table">
          <table>
            <thead>
            <tr>
              <th width="25%">淘宝账号（旺旺号）</th>
              <th width="25%">状态</th>
              <th width="25%">终止时间</th>
              <th width="25%">终止原因</th>
            </tr>
            </thead>
            <tbody v-for="item in item.failTask" :key="item.id">
            <tr>
              <td>
                <p>{{item.alitmAccount}}</p>
                <p><img :src="item.creditLevel" alt="" style="width: auto; height: auto;"></p>
                <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
              </td>
              <td>{{getTaskStatus(item.status)}}</td>
              <td>{{item.updateTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</td>
              <td>{{item.rejectReasonDesc || '------'}}</td>
            </tr>
            </tbody>
            <tbody v-if="taskFailAuditList[index].failTask && taskFailAuditList[index].failTask.length === 0">
            <tr>
              <td colspan="5" width="100%">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </Collapse>
    <div class="mt-40 text-ct" v-else>暂无已终止数据</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskFailAuditList && taskFailAuditList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import Collapse from 'iview/src/components/collapse'
  import Checkbox from 'iview/src/components/checkbox'
  import Page from 'iview/src/components/page'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'
  import TimeDown from '@/components/TimeDown'

  export default {
    name: 'TaskPassAudit',
    components: {
      Collapse: Collapse,
      Panel: Collapse.Panel,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      iButton: Button,
      iInput: Input,
    },
    data() {
      return {
        pageIndex: 1,
        pageSize: 5,
        alitmAccount: null,
        taskNumber: null,
        orderNum: null,
        searchLoading: false,
        checkAllByFail: false,
        rejectReasonList: [],
        taskFailAuditList: [],
        totalElements: 0,
      }
    },
    mounted() {

    },
    created() {
      this.appliesEndTask();
    },
    computed: {},
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      handleCheckFailAll() {
        this.checkAllByFail = !this.checkAllByFail;
        if (this.checkAllByFail) {
          this.rejectReasonList = ['system_reject', 'merchant_reject', 'showker_give_up'];
        } else {
          this.rejectReasonList = [];
        }
        this.pageIndex = 1;
        this.appliesEndTask();
      },
      checkFailChange() {
        if (this.rejectReasonList.length === 3) {
          this.checkAllByFail = true;
        } else if (this.rejectReasonList.length > 0) {
          this.checkAllByFail = false;
        } else {
          this.checkAllByFail = false;
        }
        this.pageIndex = 1;
        this.appliesEndTask();
      },
      pageChange(data) {
        this.pageIndex = data;
        this.appliesEndTask();
      },
      appliesEndTask() {
        let _this = this;
        _this.taskFailAuditList = [];
        _this.searchLoading = true;
        api.appliesEndTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          rejectReasonList: JSON.stringify(_this.rejectReasonList)
        }).then(res => {
          if (res.status) {
            _this.taskFailAuditList = res.data.content;
            _this.taskFailAuditList.forEach(item => {
              api.appliesEndShowkerTaskCount({
                taskId: item.id,
                alitmAccount: _this.alitmAccount,
                rejectReasonList: JSON.stringify(_this.rejectReasonList)
              }).then(res => {
                if (res.status) {
                  _this.$set(item, 'data', res.data);
                }
              })
            });
            _this.searchLoading = false;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      appliesEndShowkerTask(taskId, index) {
        let _this = this;
        api.appliesEndShowkerTask({
          taskId: taskId,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          alitmAccount: _this.alitmAccount,
          rejectReasonList: JSON.stringify(_this.rejectReasonList)
        }).then(res => {
          if (res.status) {
            _this.$set(_this.taskFailAuditList[index], 'failTask', res.data.content);
            _this.taskFailAuditList[index].failTask.forEach(item => {
              api.getAlitmByAccount({
                account: item.alitmAccount,
              }).then((res) => {
                if (res.status) {
                  _this.$set(item, 'creditLevel', res.data.creditLevelUrl);
                  _this.$set(item, 'tqz', res.data.tqzNum);
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

