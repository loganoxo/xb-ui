<template>
  <div class="mt-20">
    <div class="clear mt-20 mb-20">
      <div class="left mr-10 mt-4">
        <checkbox :value="checkAllByFail" @click.prevent.native="handleCheckFailAll">全部</checkbox>
      </div>
      <div class="left">
        <checkbox-group v-model="rejectReasonList" @on-change="checkFailChange">
          <checkbox label="system_reject">
            <span>系统终止</span>
          </checkbox>
          <checkbox label="showker_give_up">
            <span>拿手放弃</span>
          </checkbox>
          <checkbox label="merchant_reject">
            <span>商家终止</span>
          </checkbox>
        </checkbox-group>
      </div>
    </div>
    <div class="search-list">
      <i-select v-model="selectedStore" style="width:170px;margin-right:15px;" placeholder="全部店铺" :filterable="true" @on-change="filterStore">
        <i-option v-for="(item,index) in storeList" :key="index" :value="item">{{item}}</i-option>
      </i-select>
      <span>淘宝会员名：</span>
      <i-input v-model="alitmAccount" style="width: 160px;margin-right: 8px;"/>
      <span>活动编号：</span>
      <i-input v-model="taskNumber" style="width: 160px;margin-right: 8px;"/>
      <i-button type="primary" :loading="searchLoading" @click="searchFailTask">搜索</i-button>
    </div>
    <template v-if="taskFailAuditList.length > 0">
      <div class="mt-12 collapse-header" v-for="(item,index) in taskFailAuditList" :key="item.id">
        <div class="clear task-remarks">
          <span v-if="item.activityCategory === 'free_get'">活动模板：模板A</span>
          <span v-if="item.activityCategory === 'present_get'">活动模板：模板B</span>
          <span class="ml-10">结束时间：{{item.endTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
          <span class="blue right cursor-p" @click="modifyRemarks(item)">修改</span>
          <span class="width-pct-45 right text-align-rt ellipsis">辜负当年林下语，对床夜雨听萧瑟。恨此生，长向别离中，凋华发代理商科技考虑到口令就流口水的。</span>
        </div>
        <div class="clear pt-5" @click="collapseToggle(item.id,index)" :class="{noBorderRadius:selectId}">
          <div class="manage-img left">
            <img :src="item.taskMainImage | imageSrc('!thum54')" alt="活动主图">
            <span v-if="item.zone === 'certainly_hit'" class="certainly-hit-tip">推荐必中</span>
          </div>
          <div class="manage-text left ml-5 inline-block mt-8">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <icon :class="{'show-table-styles':selectId === item.id}" class="mt-17 right mr-5" size="20" type="md-arrow-dropright"/>
          <div class="waiting-task-number-fail right">
            <p class="task-wait-fail">共{{item.count}}人</p>
          </div>
        </div>
        <collapse-transition>
          <div class="task-table" v-show="selectId === item.id">
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
                  <img :src="item.creditLevel" alt="淘宝等级LOGO">
                  <p>淘气值：{{item.tqz}}</p>
                  <p v-cloak>申请次数：{{item.applyCount || 0}}</p>
                  <p v-cloak>成功次数：{{item.applySuccessCount || 0}}</p>
                </td>
                <td>{{getTaskStatus(item.status)}}</td>
                <td>{{item.auditTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</td>
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
        </collapse-transition>
      </div>
    </template>
    <div class="mt-40 text-ct">{{dataStatusTip}}</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskFailAuditList && taskFailAuditList.length > 0">
      <page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"/>
    </div>
    <!--修改活动备注弹窗-->
    <task-remarks-modal v-model="showRemarksModal" :activityInfo="activityInfo"/>
  </div>
</template>

<script>
  import {Collapse, Checkbox, Page, Icon, Button, Input, Select, Option} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import TaskRemarksModal from '@/components/TaskRemarksModal'
  import {taskErrorStatusList} from '@/config/utils'
  import api from '@/config/apiConfig'

  export default {
    name: 'task-fail-audit',
    components: {
      Collapse: Collapse,
      Panel: Collapse.Panel,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      iButton: Button,
      iInput: Input,
      Icon: Icon,
      CollapseTransition: CollapseTransition,
      iSelect:Select,
      iOption:Option,
      TaskRemarksModal: TaskRemarksModal
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
        selectId: null,
        dataStatusTip: '',
        storeList:[],
        selectedStore:'',
        realStoreName:'',
        activityInfo: {},
        showRemarksModal: false
      }
    },
    created() {
      this.appliesEndTask();
      this.getStoreInfo();
    },
    computed: {},
    methods: {
      getTaskStatus(type) {
        return taskErrorStatusList(type);
      },
      handleCheckFailAll() {
        this.checkAllByFail = !this.checkAllByFail;
        if (this.checkAllByFail) {
          this.rejectReasonList = ['system_reject', 'merchant_reject', 'showker_give_up'];
        } else {
          this.rejectReasonList = [];
        }
        this.pageIndex = 1;
        this.selectId = null;
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
        this.selectId = null;
        this.appliesEndTask();
      },
      pageChange(data) {
        this.pageIndex = data;
        this.appliesEndTask();
      },
      searchFailTask() {
        this.pageIndex = 1;
        this.appliesEndTask();
      },
      appliesEndTask() {
        let _this = this;
        _this.taskFailAuditList = [];
        _this.searchLoading = true;
        _this.dataStatusTip = '数据加载中';
        let rejectReasonList = JSON.stringify(_this.rejectReasonList);
        if (_this.taskNumber || _this.alitmAccount) {
          rejectReasonList = [];
        }
        api.appliesEndTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          rejectReasonList: rejectReasonList,
          realStoreName:_this.realStoreName
        }).then(res => {
          if (res.status) {
            _this.taskFailAuditList = res.data.content;
            _this.totalElements = res.data.totalElements;
            _this.searchLoading = false;
            _this.dataStatusTip = _this.taskFailAuditList.length === 0? '暂无已终止数据':'';
          } else {
            _this.$Message.error(res.msg);
            _this.searchLoading = false;
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
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      collapseToggle(id, index) {
        if (this.selectId === id) {
          this.selectId = null;
        } else {
          this.selectId = id;
          this.appliesEndShowkerTask(id, index)
        }
      },
      // 获取商家已绑定的店铺列表（用于筛选店铺）
      getStoreInfo() {
        const _this = this;
        api.getStoreBindInfo().then(res => {
          if (res.status) {
            let tempList = res.data;
            _this.storeList = tempList.map(item => {
              return item.storeName;
            });
            _this.storeList.unshift('全部店铺');
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 筛选店铺
      filterStore(res) {
        const _this = this;
        _this.realStoreName = res === '全部店铺' ? '' : res;
        _this.pageIndex = 1;
        _this.appliesEndTask();
      },
      // 修改活动备注
      modifyRemarks(info) {
        this.activityInfo = info;
        this.showRemarksModal = true;
      }
    }
  }
</script>
<style scoped>
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
</style>

