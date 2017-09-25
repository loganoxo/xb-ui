<template>
  <div class="activity-management">
    <div class="activity-title pl-10">活动管理</div>
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
          <Checkbox label="closed">
            <span>已关闭</span>
          </Checkbox>
        </Checkbox-group>
      </div>
      <div class="left">
        <Checkbox-group v-model="settlementStatusList" @on-change="checkAllGroupChange">
          <Checkbox label="cannot_settlement">
            <span>不可申请结算</span>
          </Checkbox>
          <Checkbox label="waiting_settlement">
            <span>待申请结算</span>
          </Checkbox>
          <Checkbox label="waiting_audit">
            <span>待结算审核</span>
          </Checkbox>
          <Checkbox label="settlement_finished">
            <span>已结算</span>
          </Checkbox>
        </Checkbox-group>
      </div>
    </div>
    <div class="list-sort clear">
      <ButtonGroup class="left">
        <iButton :class="[sortList.select === item.sortField ? 'active' : '']" size="small" v-for="(item,index) in sortList.defaultList" :key="index" @click="sortChange(item.sortField)">
          <span>{{item.name}}</span>
          <Icon type="arrow-down-c"></Icon>
        </iButton>
      </ButtonGroup>
      <iInput v-model="taskNumber" size="small" placeholder="使用活动编号搜索" class="left ml-10" style="width: 280px;" @on-enter="getTaskList">
        <iButton slot="append" icon="ios-search" size="small" :loading="searchLoading" @click="getTaskList"></iButton>
      </iInput>
    </div>
    <!--管理列表-->
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
          <td colspan="7">
            <span>活动编号：{{item.number || '------'}}</span>
            <span class="ml-10">创建时间：{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</span>
          </td>
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
          <td v-if="item.taskStatus !== 'waiting_modify'">{{item.taskStatusDesc}}<br/>{{item.settlementStatusDesc}}</td>
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
              <span @click="closeTask(item.id)">关闭</span>
            </p>
            <p class="bond mt-6">
              <span @click="depositMoney((item.totalMarginNeed + item.promotionExpensesNeed),item.id,item.marginPaid + item.promotionExpensesPaid)">存担保金</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'waiting_modify'">
            <p class="del-edit">
              <span class="mr-10" @click="editTask(item.id,item.taskStatus)">编辑</span>
              <span @click="closeTask(item.id)">关闭</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'waiting_audit'">
            <p class="copy mt-6">
              <span @click="lookTaskDetail(item.id)">查看详情</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.settlementStatus === 'waiting_settlement'">
            <p class="bond mt-6" v-if="isApproveExpire(item.endTime)">
              <span @click="approveShowker(item.id)">审批秀客</span>
            </p>
            <p class="bond mt-6">
              <span @click="settlementTask(item.id, item.number)">申请结算</span>
            </p>
            <p class="copy mt-6">
              <span @click="lookTaskDetail(item.id)">查看详情</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="(item.settlementStatus === 'settlement_finished' || item.settlementStatus === 'waiting_audit') && item.taskStatus === 'finished'">
            <p class="copy mt-6">
              <span @click="billDetails(item.id, item.storeName)">结算详情</span>
            </p>
            <p class="copy mt-6" v-if="item.settlementStatus === 'settlement_finished'">
              <router-link :to="{path:'/user/money-management/transaction-record',query:{taskNumber:item.number}}">查看活动账单</router-link>
            </p>
            <p class="copy mt-6">
              <span @click="lookTaskDetail(item.id)">查看详情</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else-if="item.taskStatus === 'closed'">
            <p class="bond mt-6">
              <span @click="deleteTask(item.id)">彻底删除</span>
            </p>
            <p class="copy mt-6">
              <span @click="lookTaskDetail(item.id)">查看详情</span>
            </p>
            <p class="copy mt-6">
              <span @click="copyTask(item.id)">复制活动</span>
            </p>
          </td>
          <td v-else>
            <p class="bond mt-6">
              <span @click="approveShowker(item.id,item.endTime)">审批秀客</span>
            </p>
            <p class="copy mt-6">
              <span @click="lookTaskDetail(item.id)">查看详情</span>
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
    <!--列表分页-->
    <div class="activity-page mt-20 right mr-10" v-show="taskList && taskList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
    <!--关闭任务弹框-->
    <Modal v-model="closeModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>关闭确认</span>
      </p>
      <div class="text-ct">
        <p>此任务关闭后，任务将无法发布，若已存入保证金，</p>
        <p>将返回至平台账户中。</p>
        <p>是否确认关闭？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="confirmClose">关闭</iButton>
      </div>
    </Modal>
    <!--删除任务弹框-->
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div class="text-ct">
        <p>是否彻底删除该活动？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="confirmDelete">删除</iButton>
      </div>
    </Modal>
    <!--结算成功弹框-直接结算-->
    <Modal v-model="directSettlementSuccess" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="checkmark-circled"></Icon>
        <span>结算成功</span>
      </p>
      <div class="text-ct">
        <p>该活动未产生需返还的多余费用，已直接结算成功！</p>
      </div>
      <div slot="footer" class="clear">
        <iButton class="left ml-28" type="error" size="large" @click="lookBill">查看活动账单</iButton>
        <iButton class="right mr-30" type="error" size="large" @click="directSettlementSuccess = false">我知道了</iButton>
      </div>
    </Modal>
    <!--结算成功弹框-结算待审核-->
    <Modal v-model="auditSettlementSuccess" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="checkmark-circled"></Icon>
        <span>结算审核提交成功</span>
      </p>
      <div class="text-ct">
        <p>结算说明：活动剩余资格{{taskCountLeft}}，返还担保金共{{marginRefund}}元</p>
        <p>返还推广费{{promotionRefund}}元。</p>
        <p>我们将在1个 工作日内完成结算审核！</p>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" size="large" long @click="auditSettlementSuccess = false">确认</iButton>
      </div>
    </Modal>
    <!--结算详情弹框-->
    <Modal v-model="billDetailsModel" width="420">
      <p slot="header" style="color:#f60;text-align:center">
        <span>结算详情</span>
      </p>
      <div>
        <p>活动标题：{{taskSettlementDetailInfo.storeName}}</p>
        <p>结算时间：{{taskSettlementDetailInfo.settlementTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
        <p>结算备注：活动剩余资格{{taskSettlementDetailInfo.taskCountLeft}}，返还担保金共{{taskSettlementDetailInfo.marginRefund}}元，返还推广费{{taskSettlementDetailInfo.promotionRefund}}元。</p>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" size="large" long @click="billDetailsModel = false">确认</iButton>
      </div>
    </Modal>
    <!--支付保证金弹框-->
    <div class="pay-model" v-if="showPayModel">
      <PayModel :orderMoney="orderMoney" @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="showPayModel = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3"><Icon color="#FF2424" size="18" type="ios-information"></Icon>
            <span class="ml-10">亲，您的余额不足，请充值。</span>
          </span>还需充值<strong class="size-color3">{{(orderMoney - getUserBalance).toFixed(2)}}</strong>元</div>
        <div slot="isBalance" class="title-tip">
          <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
          <span class="ml-10">您本次需要支付金额为 <span class="size-color3">{{orderMoney}}</span> 元。</span>
        </div>
      </PayModel>
    </div>
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
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ActivitiesList',
    components: {
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      Icon: Icon,
      iButton: Button,
      ButtonGroup: Button.Group,
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
        closeModal: false,
        modalLoading: false,
        taskStatusList: [],
        settlementStatusList: [],
        taskData: {},
        totalElements: null,
        pageIndex: 1,
        pageSize: 5,
        showPayModel: false,
        needDepositMoney: 0,
        hasDeposited: 0,
        taskPayId: null,
        directSettlementSuccess: false,
        auditSettlementSuccess: false,
        billDetailsModel: false,
        searchLoading: false,
        ActivityNumber: null,
        marginRefund: 0,
        promotionRefund: 0,
        taskCountLeft: 0,
        taskSettlementDetailInfo: {},
        title:null,
        taskNumber: null,
        sortList:{
          select: 'createTime',
          defaultList:[
            {
              name: '创建时间',
              sortField: 'createTime',
              sort: 'desc',
            },
            {
              name: '开始时间',
              sortField: 'upLineTime',
              sort: 'desc',
            },
            {
              name: '结束时间',
              sortField: 'endTime',
              sort: 'desc',
            },
          ]
        }
      }
    },
    mounted() {

    },
    created() {
      let _this = this;
      let status = _this.$route.query.status;
      if(status){
        if(status === 'under_way' || status === 'waiting_audit'){
          _this.taskStatusList.push(status);
          _this.getTaskList();
        } else if(status === 'waiting_settlement'){
          _this.settlementStatusList.push(status);
          _this.getTaskList();
        }
      }else{
        setTimeout(function () {
          _this.getTaskList();
        },400)
      }
    },
    computed: {
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      orderMoney: function () {
        return this.hasDeposited > 0 ? (this.needDepositMoney - this.hasDeposited).toFixed(2) * 1 : this.needDepositMoney;
      }
    },
    methods: {
      editTask(id) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id}})
      },
      copyTask(id) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id, type: 'copy'}})
      },
      lookTaskDetail(id) {
        this.$router.push({name: 'ActivityDetail', query: {taskId: id}})
      },
      approveShowker(id,time) {
        this.$router.push({name: 'ApproveShowker', query: {taskId: id,endTime:time}})
      },
      isApproveExpire(endTime) {
        return new Date().getTime() < endTime + 48 * 3600 * 1000;
      },
      sortChange(name){
        this.sortList.select = name;
        this.getTaskList(name);
      },
      getTaskList(orderBy) {
        let _this = this;
        _this.searchLoading = true;
        api.getTaskList({
          taskStatusList: JSON.stringify(_this.taskStatusList),
          settlementStatusList: JSON.stringify(_this.settlementStatusList),
          taskNumber: _this.taskNumber,
          orderBy: orderBy ? orderBy : 'createTime',
          sort: 'desc',
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.taskData = res.data;
            _this.totalElements = res.data.taskPage.totalElements;
            _this.taskList = res.data.taskPage.content;
          } else {
            _this.$Message.error(res.msg);
          }
          _this.searchLoading = false;
        })
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      closeTask(id) {
        this.closeModal = true;
        this.taskId = id;
      },
      deleteTask(id) {
        this.deleteModal = true;
        this.taskId = id;
      },
      confirmClose() {
        let _this = this;
        _this.modalLoading = true;
        api.closeTask({
          taskId: _this.taskId
        }).then(res => {
          if (res.status) {
            setTimeout(function () {
              _this.$Message.success('任务关闭成功！');
            }, 500);
            _this.$store.dispatch('getUserInformation');
            _this.getTaskList();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.closeModal = false;
          _this.modalLoading = false;
        })
      },
      confirmDelete() {
        let _this = this;
        _this.modalLoading = true;
        api.deleteTask({
          taskId: _this.taskId
        }).then(res => {
          if (res.status) {
            setTimeout(function () {
              _this.$Message.success('任务删除成功！');
            }, 500);
            _this.getTaskList();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.closeModal = false;
          _this.modalLoading = false;
        })
      },
      settlementTask(id, number) {
        let _this =  this;
        _this.ActivityNumber = number;
        api.settlementTask({
          taskId: id
        }).then(res =>{
          if(res.status){
            if(res.statusCode === 'waiting_audit'){
              _this.auditSettlementSuccess = true;
              _this.marginRefund = res.data.marginRefund / 100 || 0;
              _this.promotionRefund = res.data.promotionRefund / 100 || 0;
              _this.taskCountLeft = res.data.taskCountLeft || 0;
            }else{
              _this.directSettlementSuccess = true;
            }
            _this.getTaskList();
          }else{
            _this.$Message.error(res.msg);
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
          this.taskStatusList = ['waiting_pay', 'waiting_audit', 'waiting_modify', 'under_way', 'finished', 'closed'];
          this.settlementStatusList = ['waiting_settlement', 'waiting_audit', 'settlement_finished', 'cannot_settlement'];
        } else {
          this.taskStatusList = [];
          this.settlementStatusList = [];
        }
        this.pageIndex = 1;
        this.getTaskList();
      },
      checkAllGroupChange() {
        if (this.settlementStatusList.length === 4 && this.taskStatusList.length === 6) {
          this.checkAll = true;
        } else if (this.settlementStatusList.length > 0 || this.taskStatusList.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
        this.pageIndex = 1;
        this.getTaskList();
      },
      depositMoney(money, id, deposited) {
        this.needDepositMoney = money / 100 || 0;
        this.hasDeposited = deposited / 100 || 0;
        this.taskPayId = id;
        this.showPayModel = true;
      },
      confirmPayment(pwd) {
        let _this = this;
        api.payByBalance({
          fee: _this.orderMoney,
          payPassword: pwd,
          taskId: _this.taskPayId,
          type: _this.hasDeposited > 0 ? 'supply_pay' : 'first_pay'
        }).then(res => {
          if(res.status){
            _this.$Message.success({
              content:'支付成功！',
              duration: 6
            });
            _this.$store.dispatch('getUserInformation');
            setTimeout(function () {
              _this.getTaskList();
            },400);
          }else{
            _this.$Message.error({
              content:res.msg,
              duration: 6
            })
          }
          _this.showPayModel = false;
        })
      },
      lookBill() {
        this.$router.push({name:'TransactionRecord',query:{taskNumber:this.ActivityNumber}});
        this.directSettlementSuccess = false;
      },
      billDetails(taskId, storeName) {
        let _this = this;
        api.taskSettlementDetail({
          taskId: taskId
        }).then(res =>{
          if(res.status){
            _this.billDetailsModel = true;
            _this.taskSettlementDetailInfo.settlementTime = res.data.settlementTime;
            _this.taskSettlementDetailInfo.taskCountLeft = res.data.taskCountLeft;
            _this.taskSettlementDetailInfo.marginRefund = res.data.marginRefund / 100;
            _this.taskSettlementDetailInfo.promotionRefund = res.data.promotionRefund / 100;
            _this.taskSettlementDetailInfo.storeName = storeName;
          }else{
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>
