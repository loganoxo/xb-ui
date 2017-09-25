<template>
  <div class="mt-20">
    <div class="clear mt-20">
      <div class="left mr-10" style="margin-top: 2px;">
        <Checkbox
          :value="checkAllByPass"
          @click.prevent.native="handleCheckPassAll">所有
        </Checkbox>
      </div>
      <div class="left">
        <Checkbox-group v-model="showkerTaskStatusList" @on-change="checkPassChange">
          <Checkbox label="pass_and_unclaimed">
            <span>已通过待下单</span>
          </Checkbox>
          <Checkbox label="order_num_waiting_audit">
            <span>订单号待审核</span>
          </Checkbox>
          <Checkbox label="trial_report_waiting_submit">
            <span>已下订单待交买家秀</span>
          </Checkbox>
          <Checkbox label="trial_report_waiting_confirm">
            <span>买家秀待确认</span>
          </Checkbox>
          <Checkbox label="trial_finished">
            <span>活动完成</span>
          </Checkbox>
          <Checkbox label="order_num_error">
            <span>订单号有误</span>
          </Checkbox>
          <Checkbox label="trial_report_unqualified">
            <span>报告不合格</span>
          </Checkbox>
        </Checkbox-group>
      </div>
    </div>
    <div class="mt-20 search-list">
      <span>淘宝会员名：</span>
      <iInput v-model="alitmAccount" style="width: 160px;margin-right: 8px;"></iInput>
      <span>活动编号：</span>
      <iInput v-model="taskNumber" style="width: 160px;margin-right: 8px;"></iInput>
      <span>订单编号：</span>
      <iInput v-model="orderNum" style="width: 160px;margin-right: 8px;"></iInput>
      <iButton type="primary" :loading="searchLoading" @click="passesTaskList">搜索</iButton>
    </div>
    <Collapse class="mt-10" accordion v-if="taskPassAuditList.length > 0">
      <Panel v-for="(item,index) in taskPassAuditList" :key="item.id">
        <div @click="passesShowkerTask(item.id,index)" style="width: 100%; height: 100%;">
          <div class="manage-img inline-block">
            <img :src="item.taskMainImage" alt="">
          </div>
          <div class="manage-text left ml-5 inline-block">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <div class="waiting-task-number">
            <p>订单号待审核<span>{{item.orderNumWaitingAuditShowkerTask || 0}}</span>个</p>
            <p>买家秀待确认<span>{{item.trialReportWaitingConfirmShowkerTask || 0}}</span>个</p>
          </div>
        </div>
        <div slot="content" class="task-table">
          <table>
            <thead>
            <tr>
              <th width="25%">淘宝账号（旺旺号）</th>
              <th width="25%">状态</th>
              <th width="25%">订单号</th>
              <th width="25%">操作</th>
            </tr>
            </thead>
            <tbody v-for="item in item.passTask" :key="item.id">
            <tr>
              <td>
                <p>{{item.alitmAccount}}</p>
                <p><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
              </td>
              <td>
                <p>{{getTaskStatus(item.status)}}</p>
                <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'">
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
              </td>
              <td>{{item.orderNum || '------'}}</td>
              <td>
               <p class="del-edit">
                 <span v-if="item.status === 'order_num_waiting_audit'" @click="openCheckOrder(item.id)">审核订单号</span>
                 <span v-else-if="item.status === 'trial_report_waiting_confirm'" @click="goProbationReport(item.id)">审核买家秀</span>
                 <span v-else>------</span>
               </p>
              </td>
            </tr>
            </tbody>
            <tbody v-if=" taskPassAuditList[index].passTask && taskPassAuditList[index].passTask.length === 0">
            <tr>
              <td colspan="4" width="100%">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </Collapse>
    <div class="text-ct mt-40" v-else>暂无已通过数据</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskPassAuditList && taskPassAuditList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
    <!--审核订单号弹窗-->
    <div class="check-order-model" v-if="showCheckOrder">
      <div class="check-order-con">
        <i class="right" @click="showCheckOrder = false">&times;</i>
        <p class="mt-40">为了防止不良秀客冒领担保金，请您仔细核对下面的订单号是否与你店铺宝贝的交易订单号一致！</p>
        <p class="mt-22">
          <span>订单号：</span>
          <span class="main-color">{{orderInfo.orderNum}}</span>
        </p>
        <p class="mt-15">
              <span>秀客实付金额：<span
                class="main-color">{{orderInfo.orderPrice || 0}}</span>元<span>（当前每单活动担保金<span>{{perMarginNeed}}</span>元）</span></span>
        </p>
        <div class="mt-22">
          <Radio-group v-model="orderReviewStatus">
            <Radio label="passAudit" style="margin-right: 32px;">
              <span style="font-size: 16px;">通过</span>
            </Radio>
            <Radio label="failAudit">
              <span style="font-size: 16px;">不通过</span>
            </Radio>
          </Radio-group>
        </div>
        <div class="no-pass-reason mt-22" v-show="orderReviewStatus === 'failAudit'">
          <iInput v-model="orderNoPassReason" placeholder="请填写不通过理由，如订单号不符或实付金额不符" style="width: 420px"></iInput>
        </div>
        <div class="true-btn" v-show="orderReviewStatus === 'failAudit'" @click="orderNumberAudit">确认</div>
        <div class="true-btn" v-show="orderReviewStatus === 'passAudit' && perMarginNeed >= orderInfo.orderPrice"
             @click="orderNumberAudit">确认</div>
        <PayModel v-show="orderReviewStatus === 'passAudit' && perMarginNeed < orderInfo.orderPrice"
                  :orderMoney="needReplenishMoney"
                  @confirmPayment="confirmPayment" :payButtonText="payButtonText"
                  :rechargeButtonText="rechargeButtonText" style="margin-top: 120px;">
          <div slot="isBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该秀客实付金额大于活动担保金，</span></span>需要补充担保金<strong
            class="main-color">{{needReplenishMoney}}</strong>元
          </div>
          <div slot="noBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该秀客实付金额大于活动担保金，</span></span>需要补充担保金<strong
            class="main-color">{{needReplenishMoney}}</strong>元,请充值！
          </div>
        </PayModel>
      </div>
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
  import Radio from 'iview/src/components/radio'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'
  import TimeDown from '@/components/TimeDown'
  import PayModel from '@/components/PayModel'

  export default {
    name: 'TaskFailAudit',
    components: {
      Collapse: Collapse,
      Panel: Collapse.Panel,
      Icon: Icon,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      iButton: Button,
      iInput: Input,
      Radio: Radio,
      RadioGroup: Radio.Group,
      TimeDown: TimeDown,
      PayModel: PayModel
    },
    data() {
      return {
        searchLoading: false,
        alitmAccount: null,
        orderNum: null,
        taskNumber: null,
        checkAllByPass: false,
        auditStatusList: [],
        showkerTaskStatusList: [],
        pageIndex: 1,
        pageSize: 5,
        taskPassAuditList: [],
        totalElements: 0,
        operateTaskId: null,
        operateIndex: null,
        payButtonText: '确认支付并通过',
        rechargeButtonText: '前去充值',
        showCheckOrder: false,
        orderInfo: {},
        orderReviewStatus: 'passAudit',
        orderNoPassReason: null,
        perMarginNeed: 0
      }
    },
    mounted() {

    },
    created() {
      this.passesTaskList();
    },
    computed: {
      needReplenishMoney: function () {
        return (this.orderInfo.orderPrice - this.perMarginNeed).toFixed(2) * 1
      }
    },
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      handleCheckPassAll() {
        this.checkAllByPass = !this.checkAllByPass;
        if (this.checkAllByPass) {
          this.auditStatusList = ['pass_and_unclaimed', 'order_num_waiting_audit', 'trial_report_waiting_submit', 'trial_report_waiting_confirm', 'trial_finished', 'order_num_error', 'trial_report_unqualified'];
        } else {
          this.auditStatusList = [];
        }
        this.pageIndex = 1;
        this.passesTaskList();
      },
      checkPassChange() {
        if (this.auditStatusList.length === 7) {
          this.checkAllByPass = true;
        } else if (this.auditStatusList.length > 0) {
          this.checkAllByPass = false;
        } else {
          this.checkAllByPass = false;
        }
        this.pageIndex = 1;
        this.passesTaskList();
      },
      pageChange(data) {
        this.pageIndex = data;
        this.passesTaskList();
      },
      passesTaskList() {
        let _this = this;
        _this.searchLoading = true;
        api.passesTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          orderNum: _this.orderNum,
          showkerTaskStatusList: JSON.stringify(_this.showkerTaskStatusList),
        }).then(res => {
          if (res.status) {
            _this.taskPassAuditList = res.data.content;
            _this.totalElements = res.data.totalElements;
            _this.taskPassAuditList.forEach(item => {
              api.passesShowkerTaskCountsInfo({
                taskId: item.id
              }).then(res => {
                _this.$set(item, 'orderNumWaitingAuditShowkerTask', res.data.orderNumWaitingAuditShowkerTask);
                _this.$set(item, 'trialReportWaitingConfirmShowkerTask', res.data.trialReportWaitingConfirmShowkerTask);
              })
            });
            _this.searchLoading = false;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      passesShowkerTask(taskId, index) {
        let _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.passesShowkerTask({
          taskId: taskId,
          alitmAccount: _this.alitmAccount,
          orderNum: _this.orderNum,
          showkerTaskStatusList: JSON.stringify(_this.showkerTaskStatusList),
        }).then(res => {
          if (res.status) {
            _this.$set(_this.taskPassAuditList[index], 'passTask', res.data.content);
            _this.taskPassAuditList[index].passTask.forEach(item => {
              api.getAlitmByAccount({
                account: item.alitmAccount,
              }).then(res => {
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
      confirmPayment(pwd) {
        let _this = this;
        api.depositSupplement({
          payPassword: pwd,
          taskId: _this.orderInfo.id
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.showCheckOrder = false;
            _this.$Message.success({
              content: '支付成功！',
              duration: 6
            });
            _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 6
            })
          }
        })
      },
      openCheckOrder(id) {
        let _this = this;
        _this.showCheckOrder = true;
        api.orderNumberInfo({id: id}).then(res => {
          if (res.status) {
            _this.orderInfo = res.data;
            _this.orderInfo.orderPrice = _this.orderInfo.orderPrice / 100;
            _this.perMarginNeed = res.data.task.perMarginNeed / 100;
          }
        })
      },
      goProbationReport(id) {
        this.$router.push({name: 'ProbationReport', query: {id: id}});
      },
      orderNumberAudit() {
        let _this = this;
        if (_this.orderReviewStatus === 'failAudit' && !_this.orderNoPassReason) {
          _this.$Message.error("亲，请填写不通过的理由！");
          return
        }
        api.orderNumberAudit({
          id: _this.orderInfo.id,
          status: _this.orderReviewStatus === 'passAudit' ? 'true' : 'false',
          msg: _this.orderNoPassReason
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '订单号审核成功！',
              duration: 4
            });
            _this.$store.dispatch('getUserInformation');
            _this.showCheckOrder = false;
            _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 4
            });
            _this.closeCheckOrder();
          }
        })
      }
    }
  }
</script>
