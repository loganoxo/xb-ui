<template>
  <div class="mt-20">
    <div class="clear mt-20">
      <div class="left mr-10" style="margin-top: 2px;">
        <Checkbox
          :value="checkAllByPass"
          @click.prevent.native="handleCheckPassAll">全部
        </Checkbox>
      </div>
      <div class="left">
        <checkbox-group v-model="showkerTaskStatusList" @on-change="checkPassChange">
          <checkbox label="pass_and_unclaimed">
            <span>已通过待下单</span>
          </checkbox>
          <checkbox label="order_num_waiting_audit">
            <span>订单信息待审核</span>
          </checkbox>
          <checkbox label="trial_report_waiting_submit">
            <span>已下订单待交买家秀</span>
          </checkbox>
          <checkbox label="trial_report_waiting_confirm">
            <span>买家秀待确认</span>
          </checkbox>
          <checkbox label="trial_finished">
            <span>活动完成</span>
          </checkbox>
          <checkbox label="order_num_error">
            <span>订单信息有误</span>
          </checkbox>
          <checkbox label="trial_report_unqualified">
            <span>买家秀不合格</span>
          </checkbox>
          <checkbox label="trial_end">
            <span>任务终止</span>
          </checkbox>
        </checkbox-group>
      </div>
    </div>
    <div class="mt-20 search-list">
      <i-select v-model="selectedStore" style="width:170px;margin-right:15px;" placeholder="全部店铺" :filterable="true" @on-change="filterStore">
        <i-option v-for="(item,index) in storeList" :key="index" :value="item">{{item}}</i-option>
      </i-select>
      <span>淘宝会员名：</span>
      <i-input v-model="alitmAccount" style="width: 160px;margin-right: 8px;"/>
      <span>活动编号：</span>
      <i-input v-model="taskNumber" style="width: 160px;margin-right: 8px;"/>
      <span>订单编号：</span>
      <i-input v-model="orderNum" style="width: 160px;margin-right: 8px;"/>
      <i-button type="primary" :loading="searchLoading" @click="searchPassesTask">搜索</i-button>
    </div>
    <div class="text-align-rt mt-10" v-if="taskPassAuditList.length > 0">
      <i-button size="large" class="mr-10" :loading="batchPassLoading" @click="readyBatchPass"><icon type="android-done-all"/>批量通过所有待审核订单</i-button>
      <i-button size="large" @click="batchExportModel = true"><icon type="ios-download-outline"/> 批量导出以下所有订单号</i-button>
    </div>
    <template v-if="taskPassAuditList.length > 0">
      <div class="mt-12" v-for="(item,index) in taskPassAuditList" :key="item.id">
        <div class="collapse-header clear" @click="collapseToggle(item.id,index)" :class="{noBorderRadius: selectId}">
          <div class="manage-img inline-block">
            <img :src="item.taskMainImage | imageSrc('!thum54')" alt="活动主图">
            <span v-if="item.zone === 'certainly_hit'" class="certainly-hit-tip">推荐必中</span>
          </div>
          <div class="manage-text left ml-5 inline-block mt-8">
            <p>
              <span>活动编号：{{item.number}}</span>
              <span class="ml-5">（{{item.taskStatusDesc}} / {{item.settlementStatusDesc}}）</span>
            </p>
            <p>活动名称：{{item.taskName}}</p>
          </div>
          <div class="waiting-task-number-pass">
            <p class="task-pass"
               :class="{'line-height':showkerTaskStatusList.length === 0 || showkerTaskStatusList.length === 8 || showkerTaskStatusList.length > 4}">
            <span v-show="showkerTaskStatusList.length === 0 || showkerTaskStatusList.length === 8">全部<span
              class="main-color">({{item.allTaskNum || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('pass_and_unclaimed',showkerTaskStatusList)"
                    class="ml-5">已通过待下单<span class="main-color">({{item.pass_and_unclaimed || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('order_num_waiting_audit',showkerTaskStatusList)"
                    class="ml-5">订单号待审核<span class="main-color">({{item.order_num_waiting_audit || 0}})</span></span>
              <span
                v-show="showkerTaskStatusList.length === 0 || oneOf('trial_report_waiting_submit',showkerTaskStatusList)"
                class="ml-5">已下单待交买家秀<span class="main-color">({{item.trial_report_waiting_submit || 0}})</span></span>
              <span
                v-show="showkerTaskStatusList.length === 0 || oneOf('trial_report_waiting_confirm',showkerTaskStatusList)">买家秀待确认<span
                class="main-color">({{item.trial_report_waiting_confirm || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('trial_finished',showkerTaskStatusList)"
                    class="ml-5">活动完成<span class="main-color">({{item.trial_finished || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('order_num_error',showkerTaskStatusList)"
                    class="ml-5">订单信息有误<span class="main-color">({{item.order_num_error || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('trial_report_unqualified',showkerTaskStatusList)"
                    class="ml-5">买家秀不合格<span class="main-color">({{item.trial_report_unqualified || 0}})</span></span>
              <span v-show="showkerTaskStatusList.length === 0 || oneOf('trial_end',showkerTaskStatusList)" class="ml-5">任务终止<span
                class="main-color">({{item.trial_end || 0}})</span></span>
            </p>
          </div>
          <icon :class="{'show-table-styles' : selectId === item.id}" class="mt-15" type="arrow-right-b"/>
        </div>
        <collapse-transition>
          <div class="task-table" v-show="selectId === item.id">
            <table>
              <thead>
              <tr>
                <th width="25%">淘宝账号（旺旺号）</th>
                <th width="15%">拿手联系方式</th>
                <th width="15%">状态</th>
                <th width="15%">订单号</th>
                <th width="10%">实付金额（元）</th>
                <th width="20%">操作</th>
              </tr>
              </thead>
              <tbody v-for="item in item.passTask" :key="item.applyId">
              <tr>
                <td>
                  <p>{{item.alitmAccount}}</p>
                  <p><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                  <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
                  <p v-cloak>申请次数：{{item.applyCount || 0}}</p>
                  <p v-cloak>成功次数：{{item.applySuccessCount || 0}}</p>
                </td>
                <td>
                  <p>QQ：{{item.qqNumber || '------'}}</p>
                  <p class="mt-10">微信号：{{item.wechatNum || '------'}}</p>
                  <p class="mt-10">手机号：
                    <span v-if="item.isShowPhone">{{item.phone || '------'}}</span>
                    <span v-else>未开启可见</span>
                  </p>
                </td>
                <td>
                  <p v-if="item.status === 'order_num_error'|| item.status === 'trial_report_unqualified'">
                    <tooltip
                      :content="item.auditDescription"
                      placement="top" class="cursor-p">
                      <icon color="#f9284f" type="md-alert"/>
                      <span class="main-color">{{getTaskStatus(item.status)}}</span>
                    </tooltip>
                  </p>
                  <p v-if="item.status !== 'order_num_error' && item.status !== 'trial_end' && item.status !== 'trial_report_unqualified'">
                    {{getTaskStatus(item.status)}}</p>
                  <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'">
                    <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"/>
                  </p>
                  <p v-if="item.status === 'trial_end'">
                    <tooltip :content="item.trialEndReason === 'admin_manual_close' ? getTaskStatus(item.trialEndReason) +'：'+ item.auditDescription : getTaskStatus(item.trialEndReason)"
                             placement="top" class="cursor-p">
                      <icon color="#f9284f" type="md-alert"/>
                      <span class="main-color">{{item.trialEndReason === 'admin_manual_close' ? getTaskStatus(item.trialEndReason) +'：'+ item.auditDescription : getTaskStatus(item.trialEndReason)}}</span><br/>
                      <!--<span>{{getTaskStatus(item.trialEndReason)}}</span>-->
                    </tooltip>

                  </p>
                </td>
                <td>{{item.orderNum || '------'}}</td>
                <td>{{(item.orderPrice).toFixed(2)}}</td>
                <td>
                  <p class="del-edit">
                  <span v-if="item.status === 'order_num_waiting_audit'"
                        @click="openCheckOrder(item.id, item.needBrowseCollectAddCart, item.itemIssue, index)">审核订单信息</span>
                    <span v-if="item.status === 'trial_report_waiting_confirm'"
                          @click="goProbationReport(item.id)">审核买家秀</span>
                    <!--<router-link target="_blank" :to="{path:'/user/activity-management/report',query:{id: encryptionId(item.id), from: 'taskPassAudit'}}" v-if="item.status === 'trial_report_waiting_confirm'">-->
                    <!--审核买家秀-->
                    <!--</router-link>-->
                    <span v-if="item.status === 'trial_finished' && !item.ifEvaluated"
                          @click="getShowkerReportInfo(item.id,item.alitmAccount)">评价拿手</span>
                    <span v-if="item.status !== 'order_num_waiting_audit' && item.status !== 'trial_report_waiting_confirm' && !(item.status === 'trial_finished' && !item.ifEvaluated)">------</span>
                  </p>
                </td>
              </tr>
              </tbody>
              <thead v-if="taskPassAuditList[index].passTask && taskPassAuditList[index].passTask.length > 0">
              <tr>
                <td colspan="6">
                  <page :total="taskTotalElements" :page-size="taskPageSize" :current="taskPageIndex" @on-change="TaskPageChange"/>
                </td>
              </tr>
              </thead>
              <thead v-if="taskPassAuditList[index].passTask && taskPassAuditList[index].passTask.length === 0">
              <tr>
                <td colspan="6" width="100%">暂无数据</td>
              </tr>
              </thead>
            </table>
          </div>
        </collapse-transition>
      </div>
    </template>
    <div class="text-ct mt-40">{{dataStatusTip}}</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskPassAuditList && taskPassAuditList.length > 0">
      <page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"/>
    </div>
    <!--审核订单号弹窗-->
    <audit-order-popup v-if="showCheckOrder && Object.keys(orderInfo).length > 0"
                       @closeAuditModel="closeModel"
                       :orderInfo="orderInfo"
                       :needIssue="needIssue"
                       :operateTaskId="operateTaskId"
                       :operateIndex="operateIndex"
                       :passesShowkerTask="passesShowkerTask"/>
    <!--收藏加购物和浏览答题截图查看-->
    <modal :title="checkScreenshotModleTitle" v-model="isShowCheckScreenshotModel">
      <img :src="checkScreenshotSrc + '!orgi75'" style="width: 100%">
    </modal>
    <!--评价秀客弹窗-->
    <modal v-model="evaluateShowker" class="evaluate-showker-pop">
      <div class="pl-20 pr-20 mt-30">
        <div class="cl000">请对拿手<span class="main-color">{{evaluateShowkerAlitmAccount}}</span>进行评价<span class="cl666">(你的评价将决定该拿手的整体评分)：</span>
        </div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-20">
          <p class="title">
            <tooltip content="你感觉该拿手的淘号质量如何？" placement="top">
              <icon type="help-circled"/>
            </tooltip>
            <span class="cl000">买号质量：</span>
          </p>
          <radio-group v-model="wwQuality">
            <radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span
              class="ml-5">好评</span></radio>
            <radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span
              class="ml-5">中评</span></radio>
            <radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span
              class="ml-5">差评</span></radio>
          </radio-group>
        </div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-10">
          <p class="title">
            <tooltip content="该拿手有没有完全按照您的要求执行任务？" placement="top">
              <icon type="help-circled"/>
            </tooltip>
            <span class="cl000">下单配合度：</span>
          </p>
          <radio-group v-model="fillOrderCooperate">
            <radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span
              class="ml-5">好评</span></radio>
            <radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span
              class="ml-5">中评</span></radio>
            <radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span
              class="ml-5">差评</span></radio>
          </radio-group>
        </div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-10">
          <p class="title">
            <tooltip content="该拿手提供的淘宝评价和晒图，是否满足您的要求？" placement="top">
              <icon type="help-circled"/>
            </tooltip>
            <span class="cl000">买家秀质量：</span>
          </p>
          <radio-group v-model="buyerShowQuality">
            <radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span
              class="ml-5">好评</span></radio>
            <radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span
              class="ml-5">中评</span></radio>
            <radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span
              class="ml-5">差评</span></radio>
          </radio-group>
        </div>
      </div>
      <div class="pl-20 pr-20 mt-30 violation-labels">
        <div class="cl000">TA是否有以下违规行为（没有可不选）</div>
        <div class="mt-10">
          <span v-for="(label,index) in violationLabelList" :key="index" :class="[label.selected ? 'selectActive' : '']" @click="selectLabel(label,index)">{{label.description}}</span>
        </div>
      </div>
      <div slot="footer" class="text-ct pb-20">
        <i-button class="pl-20 pr-20 btn" type="error" size="large" :loading="loading" @click="evaluateShowkerFun">确定提交</i-button>
      </div>
    </modal>
    <!--批量审核订单-->
    <modal v-model="batchPassModel" :closable="false" :mask-closable="false">
      <div v-show="batchPassStep === 'ready'" class="mt-20 text-ct fs-14">共有"<span class="main-color">订单号待审核</span>"任务<span class="main-color"> {{batchPassCount}} </span>条，是否对此进行批量通过操作？</div>
      <div v-show="batchPassStep === 'start'" class="mt-20 text-ct">
        <div class="fs-14">正在处理第 {{startToProcessNum}} 条，共 {{batchPassCount}} 条...</div>
        <i-progress :progressBarWidth="400" :progressWidth="progressWidth" class="mt-10"/>
      </div>
      <div v-show="batchPassStep === 'end'" class="text-ct fs-14 mt-20"><icon color="#2DAB2D" class="mr-5" type="checkmark-circled"/>恭喜，已成功处理 {{successToProcessNum}} 条任务，失败 {{errorToProcessNum}} 条</div>
      <div slot="footer" class="text-ct">
        <i-button type="error" size="large" class="mr-60 pl-20 pr-20" :disabled="batchPassCount === 0" v-show="batchPassStep === 'ready'" @click="startBatchPass">执行批量通过</i-button>
        <i-button class="ml-35 pl-40 pr-40" size="large" @click="batchPassModel = false" v-show="batchPassStep === 'ready'">取消</i-button>
        <i-button type="error" size="large" class="pl-60 pr-60" @click="endBatchPass" v-show="batchPassStep === 'end'">确定</i-button>
      </div>
    </modal>
    <!--批量导出订单号-->
    <modal v-model="batchExportModel">
      <div slot="header" class="text-ct mt-10">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color fs-14">温馨提示</span>
      </div>
      <div class="text-ct fs-14">您确定要批量导出以下所有订单号吗？</div>
      <div slot="footer" class="text-ct">
        <i-button class="pl-40 pr-40 mr-40" size="large" @click="batchExportModel = false">我再考虑下</i-button>
        <i-button class="pl-40 pr-40" type="error" size="large" :loading="batchExportLoading" @click="getExportOrderNumberAll">开始批量导出</i-button>
      </div>
    </modal>
  </div>

</template>

<script>
  import {Checkbox, Page, Icon, Button, Modal, Select, Option, Input, Radio, Tooltip} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import _csv from '@/csv/csv';
  import _exportCsv from '@/csv/export-csv';
  import Progress from '@/components/Progress'
  import TimeDown from '@/components/TimeDown'
  import PayModel from '@/components/PayModel'
  import AuditOrderPopup from '@/components/AuditOrderPopup'
  import api from '@/config/apiConfig'
  import {taskErrorStatusList, encryption, timeToDate} from '@/config/utils'

  export default {
    name: 'task-pass-audit',
    components: {
      Icon: Icon,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      Modal: Modal,
      iSelect: Select,
      iOption: Option,
      iButton: Button,
      iInput: Input,
      Tooltip: Tooltip,
      Radio: Radio,
      RadioGroup: Radio.Group,
      TimeDown: TimeDown,
      PayModel: PayModel,
      iProgress: Progress,
      CollapseTransition: CollapseTransition,
      AuditOrderPopup:AuditOrderPopup
    },
    data() {
      return {
        evaluateShowker: false,
        wwQuality: 'hao_ping',
        fillOrderCooperate: 'hao_ping',
        buyerShowQuality: 'hao_ping',
        isShowCheckScreenshotModel: false,
        checkScreenshotSrc: null,
        checkScreenshotModleTitle: null,
        needBrowseCollectAddCart: false,
        needIssue: false,
        carouselValue: 0,
        searchLoading: false,
        alitmAccount: null,
        orderNum: null,
        taskNumber: null,
        checkAllByPass: false,
        showkerTaskStatusList: [],
        pageIndex: 1,
        pageSize: 5,
        taskPassAuditList: [],
        totalElements: 0,
        operateTaskId: null,
        operateIndex: null,
        selectId: null,
        showCheckOrder: true,
        orderInfo: {},
        loading: false,
        evaluateShowkerAlitmAccount: null,
        dataStatusTip: '',
        showkerReportInfo:{},
        taskTotalElements: 0,
        taskPageIndex: 1,
        taskPageSize: 5,
        batchPassModel: false,
        batchPassLoading: false,
        batchExportModel: false,
        batchExportLoading: false,
        batchPassStep: 'ready',
        progressWidth: 0,
        batchPassCount: 0,
        startToProcessNum: 1,
        batchPassResult: null,
        violationLabelList: [],
        selectedLabelList: [],
        storeList: [],
        selectedStore: '',
        realStoreName: null
      }
    },
    created() {
      const status = this.$route.query.status;
      if (status) {
        if (status === 'orderNum') {
          this.showkerTaskStatusList.push('order_num_waiting_audit');
          this.passesTaskList();
        } else if (status === 'trialReport') {
          this.showkerTaskStatusList.push('trial_report_waiting_confirm');
          this.passesTaskList();
        }
      } else {
        this.passesTaskList();
      }
      this.getViolationTag();
      this.getStoreInfo();
    },
    computed: {
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },
      successToProcessNum() {
        return this.batchPassResult ? this.batchPassResult.data.success : 0
      },
      errorToProcessNum() {
        return this.batchPassResult ? this.batchPassResult.data.fail : 0
      }
    },
    methods: {
      encryptionId(id) {
        return encryption(id);
      },
      getShowkerReportInfo(id, alitmAccount) {
        const _this = this;
        _this.evaluateShowkerAlitmAccount = alitmAccount;
        _this.evaluateShowker = true;
        api.showkerTaskReport({id: id}).then(res => {
          if (res.status) {
            _this.showkerReportInfo = res.data
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      evaluateShowkerFun() {
        const _this = this;
        _this.loading = true;
        api.evaluateFormSellerToShowker({
          showkerId: _this.showkerReportInfo.showkerId,
          showkerAlitmAccount: _this.evaluateShowkerAlitmAccount,
          taskId: _this.showkerReportInfo.task.id,
          taskNum: _this.showkerReportInfo.task.number,
          buyerQuality: _this.buyerShowQuality,
          orderTone: _this.fillOrderCooperate,
          trialReportQuality: _this.wwQuality,
          showkerTaskId: _this.showkerReportInfo.showkerTaskId,
          tagGradeJson:JSON.stringify(_this.selectedLabelList)
        }).then(res => {
          if (res.status) {
            _this.$Message.success('评价成功！');
            _this.wwQuality= 'hao_ping';
            _this.fillOrderCooperate = 'hao_ping';
            _this.buyerShowQuality = 'hao_ping';
            _this.selectedLabelList = [];
            _this.violationLabelList.forEach(item =>{
              item.selected = false
            });
            _this.passesShowkerTask(_this.showkerReportInfo.task.id, _this.operateIndex)
          } else {
            _this.$Message.error(res.msg)
          }
          _this.evaluateShowker = false;
          _this.loading = false;
        })
      },
      oneOf(value, validList) {
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true;
          }
        }
        return false;
      },
      getTaskStatus(type) {
        return taskErrorStatusList(type);
      },
      handleCheckPassAll() {
        this.checkAllByPass = !this.checkAllByPass;
        if (this.checkAllByPass) {
          this.showkerTaskStatusList = ['pass_and_unclaimed', 'order_num_waiting_audit', 'trial_report_waiting_submit', 'trial_report_waiting_confirm', 'trial_finished', 'order_num_error', 'trial_report_unqualified', 'trial_end'];
        } else {
          this.showkerTaskStatusList = [];
        }
        this.pageIndex = 1;
        this.selectId = null;
        this.passesTaskList();
      },
      checkPassChange() {
        if (this.showkerTaskStatusList.length === 8) {
          this.checkAllByPass = true;
        } else if (this.showkerTaskStatusList.length > 0) {
          this.checkAllByPass = false;
        } else {
          this.checkAllByPass = false;
        }
        this.pageIndex = 1;
        this.selectId = null;
        this.passesTaskList();
      },
      pageChange(data) {
        this.pageIndex = data;
        this.passesTaskList();
      },
      searchPassesTask() {
        this.pageIndex = 1;
        this.selectId = null;
        this.passesTaskList();
      },
      passesTaskList() {
        const _this = this;
        _this.searchLoading = true;
        _this.dataStatusTip = '数据加载中';
        let showkerTaskStatusList = JSON.stringify(_this.showkerTaskStatusList);
        if (_this.taskNumber || _this.alitmAccount || _this.orderNum) {
          showkerTaskStatusList = [];
        }
        api.passesTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          orderNum: _this.orderNum,
          showkerTaskStatusList: showkerTaskStatusList,
          realStoreName:_this.realStoreName
        }).then(res => {
          if (res.status) {
            _this.taskPassAuditList = res.data.content;
            _this.totalElements = res.data.totalElements;
            _this.taskPassAuditList.forEach(item => {
              api.passesShowkerTaskCountsInfo({
                taskId: item.id
              }).then(res => {
                if (res.status) {
                  let allTaskNum = 0;
                  Object.keys(res.data).forEach(key => {
                    _this.$set(item, key, res.data[key]);
                    allTaskNum += res.data[key];
                  });
                  _this.$set(item, 'allTaskNum', allTaskNum);
                }
              })
            });
            _this.searchLoading = false;
            _this.dataStatusTip = _this.taskPassAuditList.length === 0 ? '暂无已通过数据' : '';
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      passesShowkerTask(taskId, index, pageIndex) {
        const _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.passesShowkerTask({
          taskId: taskId,
          alitmAccount: _this.alitmAccount,
          orderNum: _this.orderNum,
          showkerTaskStatusList: JSON.stringify(_this.showkerTaskStatusList),
          pageIndex: pageIndex ? pageIndex : 1,
          pageSize: _this.taskPageSize,
        }).then(res => {
          if (res.status) {
            _this.$set(_this.taskPassAuditList[index], 'passTask', []);
            res.data.content.forEach(item => {
              _this.taskPassAuditList[index].passTask.push(item);
            });
            _this.taskTotalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      openCheckOrder(id, needBrowseCollectAddCart, itemIssue, index) {
        const _this = this;
        _this.needIssue = itemIssue;
        _this.showCheckOrder = true;
        _this.orderNoPassReason = null;
        api.orderNumberInfo({id: id}).then(res => {
          if (res.status) {
            _this.orderInfo = res.orderInfo;
            if (_this.taskPassAuditList[index].order_num_waiting_audit > 0) {
              _this.taskPassAuditList[index].order_num_waiting_audit--;
            }
            _this.taskPassAuditList[index].trial_report_waiting_submit++;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      goProbationReport(id) {
        this.$router.push({name: 'ProbationReport', query: {id: encryption(id), from: 'taskPassAudit'}});
      },
      collapseToggle(id, index) {
        this.taskPageIndex = 1;
        if (this.selectId === id) {
          this.selectId = null;
        } else {
          this.selectId = id;
          this.passesShowkerTask(id, index, this.taskPageIndex);
        }
      },
      TaskPageChange(data) {
        this.taskPageIndex = data;
        this.passesShowkerTask(this.operateTaskId, this.operateIndex, this.taskPageIndex);
      },
      readyBatchPass() {
        const _this = this;
        _this.batchPassLoading = true;
        api.getMerchantCountPassOrder().then(res => {
          if(res.status) {
            _this.batchPassModel = true;
            _this.batchPassCount = res.data
          } else {
            _this.$Message.error(res.msg)
          }
          _this.batchPassLoading = false;
        })
      },
      startBatchPass() {
        const _this = this;
        _this.batchExportLoading = true;
        _this.batchPassResult = null;
        _this.batchPassStep = 'start';
        let num = parseInt(400 / _this.batchPassCount);

        // 自动模拟批量处理待审核订单进度
        const progress = setInterval(()=> {
          if(_this.startToProcessNum < _this.batchPassCount) {
            _this.startToProcessNum++
          } else {
            _this.startToProcessNum = _this.batchPassCount
          }
          if(_this.progressWidth < 400 ) {
            _this.progressWidth += num
          } else {
            _this.progressWidth = 400;
            if(_this.batchPassResult && _this.batchPassResult.status) {
              clearInterval(progress);
              _this.batchPassStep = 'end';
              _this.batchExportLoading = false;
            }
          }
        }, 500);

        // 开始发起批量处理待审核订单请求
        api.merchantBatchPassOrder().then(res => {
          if(res.status) {
            _this.batchPassResult = res;
          } else {
            _this.$Message.error(res.msg);
            _this.batchPassModel = false;
          }
        })
      },
      endBatchPass () {
        this.batchPassModel = false;
        this.batchPassStep = 'ready';
      },
      getExportOrderNumberAll() {
        const _this = this;
        _this.batchExportModel = false;
        let showkerTaskStatusList = JSON.stringify(_this.showkerTaskStatusList);
        if (_this.taskNumber || _this.alitmAccount || _this.orderNum) {
          showkerTaskStatusList = [];
        }
        api.getMerchantExportOrderNumber({
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          orderNum: _this.orderNum,
          showkerTaskStatusList: showkerTaskStatusList,
          realStoreName: _this.realStoreName
        }).then(res => {
          if(res.status) {
            const rowData = [];
            // 根据提交订单号时间对数据降序处理
            res.data.sort((a, b) => {
              return b.orderTime - a.orderTime
            });
            // 生成表格需要的数组数据
            res.data.forEach(item => {
              rowData.push({'提交订单号时间': _this.$options.filters.dateFormat(item.orderTime, 'YYYY-MM-DD hh:mm:ss'), '订单号': item.orderNum, '旺旺号': item.alitmAccount})
            });
            // 开始执行批量导出订单号
            const downloadData = _csv([{key: '提交订单号时间'}, {key: '订单号'}, {key: '旺旺号'}], rowData);
            _exportCsv.download(`${timeToDate()}.csv`, downloadData, () => {
              _this.$Message.success('批量导出订单成功！')
            })
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      // 选择违规标签
      selectLabel(label,index) {
        const _this = this;
        let isSelected = _this.violationLabelList[index].selected;
        _this.violationLabelList[index].selected = !isSelected;
        if (isSelected) {
          let tempIndex = _this.selectedLabelList.findIndex( item => {
            return item === label.tagGrade;
          });
          _this.selectedLabelList.splice(tempIndex,1);
        } else {
          _this.selectedLabelList.push(label.tagGrade);
        }
      },
      // 获取违规标签
      getViolationTag() {
        const _this = this;
        api.getViolationTag({
          state:true
        }).then(res => {
          if (res.status) {
            let tempDate = res.data;
            let tempList = [];
            tempDate.forEach(item => {
              item.selected = false;
              tempList.push(item);
            });
            _this.violationLabelList = tempList;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 子组件向父组件传值，关闭审核订单弹窗
      closeModel() {
        this.orderInfo = {};
        this.showCheckOrder = false;
      },
      closeCheckOrder() {
        this.showCheckOrder = false;
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
            _this.$Message.error(res.msg)
          }
        })
      },
      // 筛选店铺
      filterStore(res) {
        this.realStoreName = res === '全部店铺' ? '' : res;
        this.pageIndex = 1;
        this.passesTaskList();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';
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

  .evaluate-showker-pop {
    .evaluate-showker-pop-box {
      border: 1px solid #eee;
      background-color: #F8F8F8;
    }
    .title {
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    .img {
      transform: translateY(-1px);
    }
    .btn {
      width: 200px;
    }
    .violation-labels {
      span{
        margin-top:10px;
        margin-right:10px;
        display: inline-block;
        padding:5px 10px;
        border:1px solid #dddee1;
        border-radius: 5px;
        background-color: #f7f7f7;
        cursor: pointer;
        &:hover{
          color:$mainColor;
          border-color:$mainColor;
        }
      }
      .selectActive {
        color:$mainColor;
        border-color:$mainColor;
      }
    }
  }
</style>
