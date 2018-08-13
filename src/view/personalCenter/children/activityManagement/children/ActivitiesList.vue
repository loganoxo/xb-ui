<template>
  <div class="activity-management">
    <div class="activity-title pl-10">活动管理</div>
    <div class="activity-title-s pl-10">
      共<span>{{taskData.taskTotalCount}}</span>个活动，其中待审核<span>{{taskData.taskWaitingAuditCount}}</span>个，进行中<span>{{taskData.taskUnderWayCount}}</span>个，已结束待申请结算<span>{{taskData.taskFinishedSettlementWaitingCount}}</span>个
    </div>
    <div class="select-status pl-10 clear">
      <div class="left mr-10" style="padding-top: 1px;">
        <checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全部</checkbox>
      </div>
      <div class="left">
        <checkbox-group v-model="taskStatusList" @on-change="checkAllGroupChange">
          <checkbox label="waiting_pay">
            <span>待付款</span>
          </checkbox>
          <checkbox label="waiting_audit">
            <span>待审核</span>
          </checkbox>
          <checkbox label="waiting_modify">
            <span>待修改</span>
          </checkbox>
          <checkbox label="under_way">
            <span>进行中</span>
          </checkbox>
          <checkbox label="finished">
            <span>已结束</span>
          </checkbox>
          <checkbox label="closed">
            <span>已关闭</span>
          </checkbox>
        </checkbox-group>
      </div>
      <div class="left">
        <checkbox-group v-model="settlementStatusList" @on-change="checkAllGroupChange">
          <checkbox label="cannot_settlement">
            <span>不可申请结算</span>
          </checkbox>
          <checkbox label="waiting_settlement">
            <span>待申请结算</span>
          </checkbox>
          <!--<Checkbox label="waiting_audit">
            <span>待结算审核</span>
          </Checkbox>-->
          <checkbox label="settlement_finished">
            <span>已结算</span>
          </checkbox>
        </checkbox-group>
      </div>
      <div class="left">
        <checkbox-group v-model="taskOnline" @on-change="checkAllGroupChange">
          <Checkbox label="online">
            <span>已下线</span>
          </Checkbox>
        </checkbox-group>
      </div>
    </div>
    <div class="list-sort clear">
      <i-select v-model="selectedStore" size="small" style="width:170px;" placeholder="全部店铺" :filterable="true" @on-change="filterStore" class="left mr-10">
        <i-option v-for="(item,index) in storeList" :key="index" :value="item">{{item}}</i-option>
      </i-select>
      <i-select v-model="activityCategory" size="small" style="width:108px" class="left mr-10" placeholder="全部类型活动" @on-change="changeActivityCategory">
        <i-option v-for="item in activityTypeList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
      </i-select>
      <button-group class="left">
        <i-button :class="[sortList.select === item.sortField ? 'active' : '']" size="small" v-for="(item,index) in sortList.defaultList" :key="index" @click="sortChange(item.sortField,index)">
          <span>{{item.name}}</span>
          <icon :type="item.sort === 'desc' ? 'arrow-down-c': 'arrow-up-c'"/>
        </i-button>
      </button-group>
      <i-input v-model="taskNumber" size="small" placeholder="使用活动编号或者订单号搜索" class="left ml-10" style="width: 280px;"
              @on-enter="getTaskList">
        <i-button slot="append" icon="ios-search" size="small" :loading="searchLoading" @click="searchTaskList"/>
      </i-input>
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
          <th width="24%">所需（担保金 / 推广费 / 增值费）已存入</th>
          <th width="12%">操作</th>
        </tr>
        </thead>
        <tbody v-if="taskList && taskList.length > 0">
          <template v-for="item in taskList">
            <tr class="task-number">
              <td colspan="7">
                <span>活动编号：{{item.number || '------'}}</span>
                <span class="ml-10">创建时间：{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</span>
                <span class="ml-10">活动类型：{{item.activityCategoryDesc}}</span>
              </td>
            </tr>
            <tr>
              <td @click="goTaskDetails(item.id)" class="cursor-p">
                <img class="left ml-10 border-radius-5" :src="item.taskMainImage | imageSrc('!thum54')" :alt="item.taskName">
                <a class="img-title left" :title="item.taskName">{{item.taskName}}</a>
              </td>
              <td>
                <p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</p>
                <p class="mt-10">{{item.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</p>
              </td>
              <td v-if="item.taskStatus !== 'waiting_modify'">
                <span v-if="item.taskStatus === 'under_way' && !item.online">已下线</span>
                <span v-else>{{item.taskStatusDesc}}</span><br/>{{item.settlementStatusDesc}}
              </td>
              <td class="cursor-p main-color" v-else>
                <tooltip :content="item.other.auditLogs[0].resultMsg" placement="top">
                  <icon color="#f9284f" type="information-circled"/>&nbsp;待修改
                </tooltip>
              </td>
              <td>{{item.showkerApplyTotalCount || 0}} / {{item.showkerApplyPassedCount || 0}}（人）</td>
              <td>{{(item.taskCount  - item.showkerApplySuccessCount)}}</td>
              <td>
                （ {{(item.totalMarginNeed / 100).toFixed(2)}} / {{((item.promotionExpensesNeed > 0 ? item.promotionExpensesNeed : 0) / 100).toFixed(2)}} / {{(item.vasFeeNeed / 100).toFixed(2)}}）
                <span v-if="item.createFrom === 'without_audit'">{{((item.totalMarginNeed + item.promotionExpensesNeed + item.vasFeeNeed) / 100).toFixed(2)}}</span>
                <span v-else>{{((item.marginPaid + item.promotionExpensesPaid + item.vasFeePaid) / 100).toFixed(2)}}</span>
              </td>
              <td v-if="item.taskStatus === 'waiting_pay'">
                <p class="del-edit">
                  <span v-if="item.createFrom !== 'without_audit'" class="mr-10" @click="editTask(item.id, item.createTime, item.fastPublish)">编辑</span>
                  <span @click="closeTask(item.id, item.fastPublish)">关闭</span>
                </p>
                <p class="bond mt-6">
                  <span @click="depositMoney(item.totalMarginNeed + item.promotionExpensesNeed + item.vasFeeNeed + item.redEnvelopeDeductionNeed, item.id, item.marginPaid + item.promotionExpensesPaid + item.vasFeePaid + item.redEnvelopeDeductionPaid, item.createTime, item.redEnvelopeDeductionPaid, item.marginPaid)">存担保金</span>
                </p>
                <p class="copy mt-6">
                  <span @click="copyTask(item.id)">复制活动</span>
                </p>
              </td>
              <td v-else-if="item.taskStatus === 'waiting_modify'">
                <p class="del-edit">
                  <span class="mr-10" @click="editTask(item.id, item.createTime, item.fastPublish)">编辑</span>
                  <span @click="closeTask(item.id, item.fastPublish)">关闭</span>
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
              <td v-else-if="item.settlementStatus === 'waiting_settlement' && (item.taskStatus === 'finished' || item.taskStatus === 'under_way')">
                <!--<p class="bond mt-6" v-if="isApproveExpire(item.endTime) && (item.taskCount - item.showkerApplySuccessCount) !== 0">-->
                <!--<span @click="approveShowker(item.id)">审批拿手</span>-->
                <!--</p>-->
                <p class="bond mt-6">
                  <span @click="settlementTask(item.id, item.number)">申请结算</span>
                </p>
                <p class="copy mt-6">
                  <span @click="lookTaskDetail(item.id)">查看详情</span>
                </p>
                <p class="copy mt-6">
                  <span @click="copyTask(item.id)">复制活动</span>
                </p>
                <p class="copy mt-6">
                  <span @click="exemption(item)">免审发布</span>
                  <tooltip content="以该活动为模板再次发布可免审核直接上线" placement="top">
                    <icon type="md-help-circle" color="#f9284f" size="16" class="vtc-text-btm"/>
                  </tooltip>
                </p>
              </td>
              <td v-else-if="item.settlementStatus === 'cannot_settlement' && item.taskStatus === 'finished'">
                <!--<p class="bond mt-6" v-if="isApproveExpire(item.endTime) && (item.taskCount - item.showkerApplySuccessCount) !== 0">-->
                <!--<span @click="approveShowker(item.id)">审批拿手</span>-->
                <!--</p>-->
                <p class="copy mt-6">
                  <span @click="lookTaskDetail(item.id)">查看详情</span>
                </p>
                <p class="copy mt-6">
                  <span @click="copyTask(item.id)">复制活动</span>
                </p>
                <p class="copy mt-6">
                  <span @click="exemption(item)">免审发布</span>
                  <tooltip content="以该活动为模板再次发布可免审核直接上线" placement="top">
                    <icon type="md-help-circle" color="#f9284f" size="16" class="vtc-text-btm"/>
                  </tooltip>
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
                <p class="copy mt-6">
                  <span @click="exemption(item)">免审发布</span>
                  <tooltip content="以该活动为模板再次发布可免审核直接上线" placement="top">
                    <icon type="md-help-circle" color="#f9284f" size="16-" class="vtc-text-btm"/>
                  </tooltip>
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
                <!--<p class="bond mt-6">-->
                <!--<span @click="approveShowker(item.id,item.endTime)">审批拿手</span>-->
                <!--</p>-->
                <p class="copy mt-6">
                  <span @click="lookTaskDetail(item.id)">查看详情</span>
                </p>
                <!--<tooltip v-if="!item.speedUp" class="mt-6" content="启用后，系统会匹配拿手进行审核，无需商家干预" placement="top">-->
                  <!--<span class="cursor-p main-color" @click="openSpeedUp(item.id, item.userId)">一键加速</span>-->
                <!--</tooltip>-->
                <!--<p v-else class="cl-red mt-6">已加速</p>-->
                <p class="copy mt-6">
                  <span @click="copyTask(item.id)">复制活动</span>
                </p>
              </td>
            </tr>
          </template>
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
      <page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"/>
    </div>
    <!--关闭任务弹框-->
    <modal v-model="closeModal" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">关闭确认</span>
      </p>
      <div class="text-ct">
        <p>此任务关闭后，任务将无法发布，若已存入保证金，</p>
        <p>将返回至平台账户中。</p>
        <p>是否确认关闭？</p>
      </div>
      <div slot="footer">
        <i-button type="primary" size="large" long :loading="modalLoading" @click="confirmClose">关闭</i-button>
      </div>
    </modal>
    <!--删除任务弹框-->
    <modal v-model="deleteModal" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">删除确认</span>
      </p>
      <div class="text-ct">
        <p>是否彻底删除该活动？</p>
      </div>
      <div slot="footer">
        <i-button type="primary" size="large" long :loading="modalLoading" @click="confirmDelete">删除</i-button>
      </div>
    </modal>
    <!--开启一键加速功能确认弹框-->
    <modal v-model="speedUpModal" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">一键加速</span>
      </p>
      <div class="text-ct">
        <p>启用后，该活动剩余名额将全部由系统进行匹配和审核，且无法修改，适合于需要快速消化单量的商家！</p>
      </div>
      <div slot="footer">
        <i-button type="primary" size="large" long :loading="speedUpLoading" @click="speedUp">确认开启</i-button>
      </div>
    </modal>
    <!--结算成功弹框-直接结算-->
    <modal v-model="directSettlementSuccess" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="checkmark-circled"/>
        <span class="main-color">结算成功</span>
      </p>
      <div class="text-ct">
        <p>该活动未产生需返还的多余费用，已直接结算成功！</p>
      </div>
      <div slot="footer" class="clear">
        <iButton class="left ml-28" type="primary" size="large" @click="lookBill">查看活动账单</iButton>
        <i-button class="right mr-30" type="primary" size="large" @click="directSettlementSuccess = false">我知道了</i-button>
      </div>
    </modal>
    <!--结算成功弹框-结算有返款-->
    <modal v-model="auditSettlementSuccess" width="360">
      <p slot="header" class="main-color text-ct">
        <icon color="#f9284f" type="checkmark-circled"/>
        <span class="main-color">结算成功</span>
      </p>
      <div class="text-ct">
        <p>结算说明：活动剩余资格{{settlementRefundDetails.taskCountLeft}}，返还担保金共{{settlementRefundDetails.marginRefund}}元</p>
        <p>返还推广费{{settlementRefundDetails.promotionRefund}}元。</p>
        <p>返还增值费{{settlementRefundDetails.vasFeeRefund}}元。</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button type="primary" size="large" long @click="auditSettlementSuccess = false">确认</i-button>
      </div>
    </modal>
    <!--结算详情弹框-->
    <modal v-model="billDetailsModel" width="420">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="checkmark-circled"/>
        <span class="main-color">结算详情</span>
      </p>
      <div>
        <p>活动标题：{{taskSettlementDetailInfo.storeName}}</p>
        <p class="mt-5">结算时间：{{taskSettlementDetailInfo.settlementTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
        <p class="mt-5">结算备注：活动剩余资格 {{taskSettlementDetailInfo.taskCountLeft}}</p>
        <p class="ml-60 mt-5">返还担保金共 {{taskSettlementDetailInfo.marginRefund}} 元</p>
        <p class="ml-60 mt-5">返还推广费 {{taskSettlementDetailInfo.promotionRefund}} 元</p>
        <p class="ml-60 mt-5">返还增值费 {{taskSettlementDetailInfo.vasFeeRefund}} 元</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button type="primary" size="large" long @click="billDetailsModel = false">确认</i-button>
      </div>
    </modal>
    <!--活动失效提示弹框-->
    <modal v-model="isTaskOverdueModel" width="420" :mask-closable="false" :closable="false">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">活动失效</span>
      </p>
      <div class="text-ct">
        <p class="fs-14">该活动已失效，请关闭！</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button type="primary" size="large" long :loading="taskOverdueLoading" @click="isTaskOverdueClose">关闭活动</i-button>
      </div>
    </modal>
    <!--支付保证金弹框-->
    <div class="pay-model" v-if="showPayModel">
      <pay-model ref="payModelRef" :orderMoney="needPayMoney" @confirmPayment="confirmPayment" :isShowUpgradeVIP="true"
                :isBalance="isBalance" :redEnvelopesState="redEnvelopesState" @change="redEnvelopesState = arguments[0]"
                 :redEnvelopeDeductionNumber="redEnvelopeDeductionNumber" :disabledRedEnvelopes="disabledRedEnvelopes">
        <i slot="closeModel" class="close-recharge" @click="showPayModel = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3"><icon color="#FF2424" size="18" type="ios-information"/>
            <span class="ml-10">亲，您的余额不足，请充值。</span>
          </span>还需充值<strong class="size-color3">{{needPayMoneyText}}</strong>元 <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="ios-information"/>
          <span class="ml-10">您本次需要支付金额为 <span class="size-color3">{{(orderMoneyAfter / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </div>
    <!--支付宝手续费说明弹框-->
    <modal v-model="isShowAliPayTip">
      <img src="~assets/img/common/ali-pay-tip.jpg"/>
    </modal>
    <!--删除首单免推广费活动提醒弹框-->
    <modal v-model="deleteFirstTaskModal" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">首单关闭提醒</span>
      </p>
      <div class="text-lf">该活动是您首次发布创建的活动，享有<span class="main-color">首单推广费减免</span>的特权，关闭后你将无法享受该优惠，是否确认关闭？</div>
      <div slot="footer" class="text-ct">
        <i-button class="mr-40 pr-40 pl-40" type="primary" size="large" :loading="speedUpLoading" @click="confirmClose">确认</i-button>
        <i-button class="ml-40 pr-40 pl-40" type="primary" size="large" @click="deleteFirstTaskModal = false">取消</i-button>
      </div>
    </modal>
    <!--免审发布弹框-->
    <exempt-release-modal v-model="exemptRelease" :data="taskInfo" @releaseSuccess="releaseSuccess"/>
  </div>
</template>

<script>
  import {Checkbox, Page, Modal, Icon, Button, Input, Tooltip, Select, Option} from 'iview'
  import api from '@/config/apiConfig'
  import PayModel from '@/components/PayModel'
  import ExemptReleaseModal from '@/components/ExemptReleaseModal'
  import {taskErrorStatusList, getSeverTime, encryption, decode,setStorage, getStorage,} from '@/config/utils'

  export default {
    name: 'activities-list',
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
      iSelect: Select,
      iOption: Option,
      PayModel: PayModel,
      ExemptReleaseModal: ExemptReleaseModal,
    },
    data() {
      return {
        taskList: null,
        checkAll: false,
        deleteModal: false,
        closeModal: false,
        modalLoading: false,
        isShowAliPayTip: false,
        taskStatusList: [],
        taskOnline:[],
        settlementStatusList: [],
        taskData: {},
        totalElements: null,
        pageIndex: 1,
        pageSize: 5,
        showPayModel: false,
        needDepositMoney: 0,
        hasDeposited: 0,
        taskPayId: null,
        taskId: null,
        directSettlementSuccess: false,
        auditSettlementSuccess: false,
        billDetailsModel: false,
        searchLoading: false,
        ActivityNumber: null,
        settlementRefundDetails: {},
        taskSettlementDetailInfo: {},
        title: null,
        taskNumber: null,
        activityCategory: null,
        isTaskOverdueModel: false,
        speedUpModal: false,
        taskOverdueLoading: false,
        speedUpLoading: false,
        speedUpInfo: {},
        activityTypeList: [
          {
            value: '',
            label: '全部类型活动'
          },
          {
            value: 'free_get',
            label: '免费领'
          },
          {
            value: 'present_get',
            label: '体验专区'
          },
        ],
        sortList: {
          select: 'createTime',
          defaultList: [
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
        },
        storeList: [],
        selectedStore: '',
        realStoreName: '',
        redEnvelopesState: true,
        redEnvelopeDeductionNumber: 0,
        disabledRedEnvelopes: false,
        deleteFirstTaskModal: false,
        exemptRelease: false,
        taskInfo: {}
      }
    },
    created() {
      let _this = this;
      let status = _this.$route.query.status;
      if (status) {
        if (status === 'under_way' || status === 'waiting_audit') {
          _this.taskStatusList.push(status);
          _this.getTaskList();
        } else if (status === 'waiting_settlement') {
          _this.settlementStatusList.push(status);
          _this.getTaskList();
        }
      } else {
        setTimeout(()=> {
          _this.getTaskList();
        }, 400)
      }
      _this.getStoreInfo();
    },
    computed: {
      getUserBalance() {
        return this.$store.getters.getUserBalance;
      },
      orderMoney() {
        return this.hasDeposited > 0 ? this.needDepositMoney - this.hasDeposited : this.needDepositMoney;
      },
      orderMoneyAfter() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber : this.orderMoney
      },
      isBalance() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber <= this.getUserBalance : this.orderMoney <= this.getUserBalance
      },
      needPayMoney() {
        return !this.hasBalance ? Math.abs(this.getUserBalance - this.orderMoneyAfter) : 0
      },
      needPayMoneyText() {
        return `${(this.needPayMoney / 100).toFixed(2)} + ${(((Math.ceil(this.needPayMoney / 0.994)) - this.needPayMoney) / 100).toFixed(2)}`
      },
    },
    methods: {
      editTask(id, createTime, fastPublish) {
        if(createTime <= 1529933415818) {
          this.isTaskOverdueModel = true;
          this.taskId = id;
        } else {
          if (fastPublish) {
            this.$router.push({name: 'FastTaskRelease', query: {q: encryption(id)}})
          } else {
            this.$router.push({name: 'TaskRelease', query: {q: encryption(id)}})
          }
        }
      },
      copyTask(id) {
        this.$router.push({name: 'TaskRelease', query: {q: encryption(id), type: 'copy'}})
      },
      openSpeedUp(taskId, userId) {
        this.speedUpModal = true;
        this.speedUpInfo.taskId = taskId;
        this.speedUpInfo.userId = userId;
      },
      speedUp() {
        const _this = this;
        _this.speedUpLoading = true;
        api.taskSpeedUp({
          taskId: _this.speedUpInfo.taskId,
          userId: _this.speedUpInfo.userId
        }).then(res => {
          if(res.status) {
            _this.$Message.success('一键加速开启成功！');
            _this.getTaskList();
          } else {
            _this.$Message.error(res.msg)
          }
          _this.speedUpModal = false;
          _this.speedUpLoading = false;
        })
      },
      lookTaskDetail(id) {
        this.$router.push({name: 'ActivityDetail', query: {q: encryption(id)}})
      },
      approveShowker(id, time) {
        this.$router.push({name: 'ApproveShowker', query: {q: encryption(id), endTime: time}})
      },
      isApproveExpire(endTime) {
        return getSeverTime() < endTime + 48 * 3600 * 1000;
      },
      goTaskDetails(id) {
        this.$router.push({name: 'TaskDetails', query: {q: encryption(id)}})
      },
      sortChange(name, index) {
        let _this = this;
        let sort = _this.sortList.defaultList[index].sort;
        _this.sortList.select = name;
        _this.sortList.defaultList[index].sort = sort === 'desc' ? 'asc' : 'desc';
        _this.getTaskList(name, _this.sortList.defaultList[index].sort);
      },
      searchTaskList()  {
        this.pageIndex = 1;
        this.getTaskList();
      },
      changeActivityCategory() {
        this.pageIndex = 1;
        this.getTaskList();
      },
      getTaskList(orderBy, sort) {
        let _this = this;
        let taskStatusList = JSON.stringify(_this.taskStatusList);
        let settlementStatusList = JSON.stringify(_this.settlementStatusList);
        let online = null;
        if (_this.taskStatusList.length === 0) {
          if (_this.taskOnline.length > 0) {
            taskStatusList = JSON.stringify(['under_way']);
            online = false;
          } else {
            online = null;
          }
        } else {
          _this.taskStatusList.forEach(item => {
            if (item === 'under_way') {
              online = _this.taskOnline.length > 0 ? null : true;
            }
          });
        }
        _this.searchLoading = true;
        if (_this.taskNumber) {
          taskStatusList = [];
          settlementStatusList = [];
        }
        api.getTaskList({
          taskStatusList: taskStatusList,
          settlementStatusList: settlementStatusList,
          taskNumber: _this.taskNumber,
          orderBy: orderBy ? orderBy : 'createTime',
          sort: sort ? sort : 'desc',
          activityCategory: _this.activityCategory,
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          online: online,
          realStoreName:_this.realStoreName
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
        return taskErrorStatusList(type);
      },
      closeTask(id, fastPublish) {
        this.taskId = id;
        if (fastPublish) {
          this.deleteFirstTaskModal = true
        } else {
          this.closeModal = true;
        }
      },
      deleteTask(id) {
        this.deleteModal = true;
        this.taskId = id;
      },
      confirmClose() {
        const _this = this;
        _this.modalLoading = true;
        _this.taskOverdueLoading = true;
        api.closeTask({
          taskId: _this.taskId
        }).then(res => {
          if (res.status) {
            setTimeout(()=> {
              _this.$Message.success('任务关闭成功！');
            }, 500);
            _this.$store.dispatch('getUserInformation');
            _this.getTaskList();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.closeModal = false;
          _this.isTaskOverdueModel = false;
          _this.modalLoading = false;
          _this.taskOverdueLoading = false;
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
          _this.deleteModal = false;
          _this.modalLoading = false;
        })
      },
      settlementTask(id, number) {
        let _this = this;
        _this.ActivityNumber = number;
        api.settlementTask({
          taskId: id
        }).then(res => {
          if (res.status) {
            if (res.data) {
              _this.auditSettlementSuccess = true;
              _this.settlementRefundDetails.marginRefund = res.data.marginRefund / 100 || 0;
              _this.settlementRefundDetails.promotionRefund = res.data.promotionRefund / 100 || 0;
              _this.settlementRefundDetails.vasFeeRefund = res.data.vasFeeRefund / 100 || 0;
              _this.settlementRefundDetails.taskCountLeft = res.data.taskCountLeft || 0;
            } else {
              _this.directSettlementSuccess = true;
            }
            _this.getTaskList();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      pageChange(data) {
        this.pageIndex = data;
        this.getTaskList();
      },
      handleCheckAll() {
        let _this = this;
        _this.checkAll = !_this.checkAll;
        if (_this.checkAll) {
          _this.taskStatusList = ['waiting_pay', 'waiting_audit', 'waiting_modify', 'under_way', 'finished', 'closed'];
          _this.settlementStatusList = ['waiting_settlement', 'waiting_audit', 'settlement_finished', 'cannot_settlement'];
          _this.taskOnline = ['online'];
        } else {
          _this.taskStatusList = [];
          _this.settlementStatusList = [];
          _this.taskOnline = [];
        }
        _this.pageIndex = 1;
        _this.getTaskList();
      },
      checkAllGroupChange() {
        let _this = this;
        if (_this.settlementStatusList.length === 4 && _this.taskStatusList.length === 6 && _this.taskOnline.length === 1) {
          _this.checkAll = true;
        } else if (_this.settlementStatusList.length > 0 || _this.taskStatusList.length > 0 || _this.taskOnline.length > 0) {
          _this.checkAll = false;
        } else {
          _this.checkAll = false;
        }
        _this.pageIndex = 1;
        _this.getTaskList();
      },
      isTaskOverdueClose() {
        this.confirmClose()
      },
      depositMoney(money, id, deposited, createTime, redEnvelopeDeductionPaid, marginPaid) {
        const _this = this;
        if (createTime <= 1529933400000) {
          _this.isTaskOverdueModel = true;
          _this.taskId = id;
        } else {
          _this.disabledRedEnvelopes = marginPaid > 0;
          _this.redEnvelopesState = marginPaid > 0 ? redEnvelopeDeductionPaid > 0 : true;
          _this.needDepositMoney = money;
          _this.hasDeposited = deposited;
          _this.taskPayId = id;
          api.redEnvelopeDeduction({
            taskId: id,
          }).then(res => {
            if (res.status) {
              _this.redEnvelopeDeductionNumber = res.data;
              _this.showPayModel = true;
            } else {
              _this.$Message.error(res.msg)
            }
          })
        }
      },
      confirmPayment(pwd) {
        const _this = this;
        api.editPromotion({
          redEnvelopesState: _this.redEnvelopesState,
          taskId: _this.taskPayId,
        }).then(res => {
          return res
        }).then(res => {
          if (res.status) {
            api.payByBalance({
              fee: _this.orderMoneyAfter,
              payPassword: pwd,
              taskId: _this.taskPayId,
              type: _this.hasDeposited > 0 ? 'supply_pay' : 'first_pay'
            }).then(res => {
              if (res.status) {
                _this.showPayModel = false;
                _this.$Message.success('支付成功！');
                _this.$store.dispatch('getUserInformation');
                setTimeout(()=> {
                  _this.getTaskList();
                }, 400);
              } else {
                _this.$Message.error(res.msg)
              }
              _this.$refs.payModelRef.payLoading = false;
            })
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      lookBill() {
        this.$router.push({name: 'TransactionRecord', query: {taskNumber: this.ActivityNumber}});
        this.directSettlementSuccess = false;
      },
      billDetails(taskId, storeName) {
        let _this = this;
        api.taskSettlementDetail({
          taskId: taskId
        }).then(res => {
          if (res.status) {
            _this.billDetailsModel = true;
            _this.taskSettlementDetailInfo.settlementTime = res.data.settlementTime;
            _this.taskSettlementDetailInfo.taskCountLeft = res.data.taskCountLeft;
            _this.taskSettlementDetailInfo.marginRefund = (res.data.marginRefund / 100).toFixed(2);
            _this.taskSettlementDetailInfo.promotionRefund = (res.data.promotionRefund / 100).toFixed(2);
            _this.taskSettlementDetailInfo.vasFeeRefund = (res.data.vasFeeRefund / 100).toFixed(2);
            _this.taskSettlementDetailInfo.storeName = storeName;
          } else {
            _this.$Message.error(res.msg)
          }
        })
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
        _this.getTaskList();
      },
      // 免审发布
      exemption(item) {
        this.taskInfo = item;
        this.exemptRelease = true;
      },
      releaseSuccess() {
        // 追加份数成功后，因后端数据返回有延迟，需要延迟更新列表数据
        this.pageIndex = 1;
        setTimeout(() => {
          this.getTaskList();
        }, 200)
      }
    }
  }
</script>
