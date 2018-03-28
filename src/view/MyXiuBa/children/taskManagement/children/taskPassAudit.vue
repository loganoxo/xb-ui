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
            <span>买家秀不合格</span>
          </Checkbox>
          <Checkbox label="trial_end">
            <span>任务终止</span>
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
      <iButton type="primary" :loading="searchLoading" @click="searchPassesTask">搜索</iButton>
    </div>
    <div class="mt-12" v-for="(item,index) in taskPassAuditList" :key="item.id" v-if="taskPassAuditList.length > 0">
      <div class="collapse-header clear" @click="collapseToggle(item.id,index)" :class="{noBorderRadius:selectId}">
        <div class="manage-img inline-block">
          <img :src="item.taskMainImage + '!thum54'" alt="">
        </div>
        <div class="manage-text left ml-5 inline-block">
          <p>
            <span>
              活动编号：{{item.number}}
            </span>
            <span v-if="item.zone === 'certainly_hit'" class="certainly-hit-tip">推荐必中</span>
            <span class="ml-5">（{{item.taskStatusDesc}} / {{item.settlementStatusDesc}}）</span>
          </p>
          <p>活动名称：{{item.taskName}}</p>
        </div>
        <Icon :class="{showTableStyles:selectId === item.id}" class="right mr-10 mt-15" type="arrow-right-b"></Icon>
        <div class="waiting-task-number">
          <p class="task-pass"
             :class="{lineHeight:showkerTaskStatusList.length === 0 || showkerTaskStatusList.length === 8 || showkerTaskStatusList.length > 4}">
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
                  class="ml-5">订单号有误<span class="main-color">({{item.order_num_error || 0}})</span></span>
            <span v-show="showkerTaskStatusList.length === 0 || oneOf('trial_report_unqualified',showkerTaskStatusList)"
                  class="ml-5">买家秀不合格<span class="main-color">({{item.trial_report_unqualified || 0}})</span></span>
            <span v-show="showkerTaskStatusList.length === 0 || oneOf('trial_end',showkerTaskStatusList)" class="ml-5">任务终止<span
              class="main-color">({{item.trial_end || 0}})</span></span>
          </p>
        </div>
      </div>
      <collapse-transition>
        <div class="task-table" v-show="selectId === item.id">
          <table>
            <thead>
            <tr>
              <th width="25%">淘宝账号（旺旺号）</th>
              <th width="20%">状态</th>
              <th width="25%">订单号</th>
              <th width="10%">实付金额（元）</th>
              <th width="20%">操作</th>
            </tr>
            </thead>
            <tbody v-for="item in item.passTask" :key="item.id">
            <tr>
              <td>
                <p>{{item.alitmAccount}}</p>
                <p><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
                <p v-cloak>申请次数：{{item.applyCount || 0}}</p>
                <p v-cloak>成功次数：{{item.applySuccessCount || 0}}</p>
              </td>
              <td>
                <p v-if="item.status === 'order_num_error'|| item.status === 'trial_report_unqualified'">
                  <Tooltip
                    :content="item.auditDescription"
                    placement="top" class="cursor-p">
                    <Icon color="#f9284f" type="information-circled"></Icon>
                    <span class="main-color">{{getTaskStatus(item.status)}}</span>
                  </Tooltip>
                </p>
                <p v-if="item.status !== 'order_num_error' && item.status !== 'trial_end' && item.status !== 'trial_report_unqualified'">{{getTaskStatus(item.status)}}</p>
                <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'">
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
                <p v-if="item.status === 'trial_end'">
                  <Tooltip
                    :content="item.trialEndReason === 'admin_manual_close' ? getTaskStatus(item.trialEndReason) +'：'+ item.auditDescription : getTaskStatus(item.trialEndReason)"
                    placement="top" class="cursor-p">
                    <Icon color="#f9284f" type="information-circled"></Icon>
                    <span class="main-color">{{getTaskStatus(item.status)}}</span>
                  </Tooltip>
                </p>
              </td>
              <td>{{item.orderNum || '------'}}</td>
              <td>{{(item.orderPrice).toFixed(2)}}</td>
              <td>
                <p class="del-edit">
                  <span v-if="item.status === 'order_num_waiting_audit'" @click="openCheckOrder(item.id, item.needBrowseCollectAddCart, item.itemIssue)">审核订单信息</span>
                  <span v-if="item.status === 'trial_report_waiting_confirm'" @click="goProbationReport(item.id)">审核买家秀</span>
                  <span v-if="item.status === 'trial_finished' && !item.ifEvaluated" @click="getShowkerReportInfo(item.id,item.alitmAccount)">评价拿手</span>
                  <span v-if="item.status !== 'order_num_waiting_audit' && item.status !== 'trial_report_waiting_confirm' && !(item.status === 'trial_finished' && !item.ifEvaluated)">------</span>
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
      </collapse-transition>
    </div>
    <div class="text-ct mt-40" v-if="taskPassAuditList.length === 0">暂无已通过数据</div>
    <div class="activity-page mt-20 right mr-10" v-if="taskPassAuditList && taskPassAuditList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
    <!--审核订单号弹窗-->
    <div class="check-order-model" v-if="showCheckOrder">
      <div class="check-order-con">
        <i class="right" @click="showCheckOrder = false">&times;</i>
        <div class="f-b fs-14 main-color mt-28" v-if="needBrowseCollectAddCart || needIssue">1.请查看拿手提交的截图信息</div>
        <div class="clear">
          <!--<div class="left" v-if="needBrowseCollectAddCart">
            <div class="mt-5 cl00 fs-12 f-b">A.查看拿手提交的收藏加购截图</div>
            <div class="order-info-screenshot mt-5" v-for="(value, key) in orderInfo.screenshot" :key="key" v-if="value">
              <img :src="value + '!thum54'" alt="收藏加购截图">
              <div class="order-info-screenshot-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(value,key)"></Icon>
              </div>
            </div>
          </div>-->
          <!--<div class="left parting-line" v-if="needIssue"></div>-->
          <div class="left ml-10" v-if="needIssue">
            <div class="mt-5 cl00 fs-12 f-b"><!--<span>{{needIssue ? 'B.' : 'A.'}}</span>-->查看拿手提交的浏览答题截图</div>
            <div class="order-info-screenshot mt-5" v-for="(item, index) in orderInfo.issueAnswerScreenshot" :key="index" v-if="item">
              <img :src="item.screenshotSrc + '!thum54'" alt="浏览答题截图">
              <div class="order-info-screenshot-cover">
                <Icon type="ios-eye-outline" @click.native="handleViewIssue(item.screenshotSrc,item.issueText)"></Icon>
              </div>
            </div>
          </div>
        </div>
        <div class="f-b fs-14 main-color mt-10"><span v-if="needBrowseCollectAddCart || needIssue">2.</span>请仔细核对订单号与交易金额</div>
        <div class="order-info-con text-lf mt-10">
          <p>
            <span class="f-b">订单号：</span>
            <span class="main-color">{{orderInfo.orderNum}}</span>
          </p>
          <p class="mt-10">
            <span><span class="f-b">拿手实付金额：</span><span class="main-color">{{orderInfo.orderPrice || 0}}</span>元<span>（当前每单活动担保金<span>{{orderInfo.perMarginNeed}}</span>元）</span></span>
          </p>
        </div>
        <p class="cl-red mt-10 text-ct" v-if="orderInfo.orderPrice < orderInfo.perMarginNeed"><Icon type="information-circled" color="red" size="14" class="mr-5"></Icon>注意：拿手实付金额与活动担保金金额不一致，请仔细审核！</p>
        <p class="cl-red mt-10 text-ct" v-else><Icon type="information-circled" color="red" size="14" class="mr-5"></Icon>注意：为了防止不良拿手冒领担保金，请您仔细审核交易订单信息，确认不误再作提交！</p>
        <div class="mt-22 text-ct">
          <Radio-group v-model="orderReviewStatus">
            <Radio class="mr-30" label="passAudit">
              <span class="fs-16">通过</span>
            </Radio>
            <Radio label="failAudit">
              <span class="fs-16">不通过</span>
            </Radio>
          </Radio-group>
          <div class="no-pass-reason text-ct inline-block" v-show="orderReviewStatus === 'failAudit'">
            <i-select v-model="orderNoPassReason" style="width:200px" placeholder="请选择不通过原因">
              <!--<i-option value="收藏加购截图不合格">收藏加购截图不合格</i-option>-->
              <i-option value="浏览答题截图不合格">浏览答题截图不合格</i-option>
              <i-option value="订单号有误">订单号有误</i-option>
              <i-option value="实付金额有误">实付金额有误</i-option>
              <i-option value="下单旺旺和平台绑定旺旺不一致">下单旺旺和平台绑定旺旺不一致</i-option>
            </i-select>
          </div>
        </div>
        <div class="true-btn" v-show="orderReviewStatus === 'failAudit'" @click="orderNumberAudit">确认提交</div>
        <div class="true-btn" v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed >= getOderPrice" @click="orderNumberAudit">确认提交</div>
        <PayModel v-show="orderReviewStatus === 'passAudit' && orderInfo.perMarginNeed < getOderPrice"
                  :orderMoney="needReplenishMoney"
                  @confirmPayment="confirmPayment" :payButtonText="payButtonText"
                  :rechargeButtonText="rechargeButtonText" style="margin-top: 120px;width: 652px;margin-left: -326px;"
                  :style="{top:needBrowseCollectAddCart ? 45+'%' : 20 +'%'}">
          <div slot="isBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
            class="main-color">{{needReplenishMoney}}</strong>元
          </div>
          <div slot="noBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该拿手实付金额大于活动担保金，</span></span>需要补充担保金<strong
            class="main-color">{{needReplenishMoney}}</strong>元,请充值！
          </div>
        </PayModel>
      </div>
    </div>
    <!--收藏加购物和浏览答题截图查看-->
    <modal :title="checkScreenshotModleTitle" v-model="isShowCheckScreenshotModel">
      <img :src="checkScreenshotSrc + '!orgi75'" style="width: 100%">
    </modal>
    <!--评价秀客弹窗-->
    <Modal v-model="evaluateShowker" class="evaluate-showker-pop">
      <div class="pl-20 pr-20 mt-30">
        <div class="cl000">请对拿手<span class="main-color">秦贺</span>进行评价<span class="cl666">(你的评价将决定该拿手的整体评分)：</span></div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-20">
          <p class="title">
            <Tooltip content="你感该拿手的淘号质量如何？" placement="top">
              <Icon type="help-circled"></Icon>
            </Tooltip>
            <span class="cl000">买号质量：</span>
          </p>
          <RadioGroup v-model="wwQuality">
            <Radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span class="ml-5">好评</span></Radio>
            <Radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span class="ml-5">中评</span></Radio>
            <Radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span class="ml-5">差评</span></Radio>
          </RadioGroup>
        </div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-10">
          <p class="title">
            <Tooltip content="该拿手有没有完全按照您的要求执行任务？" placement="top">
              <Icon type="help-circled"></Icon>
            </Tooltip>
            <span class="cl000">下单配合度：</span>
          </p>
          <RadioGroup v-model="fillOrderCooperate">
            <Radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span class="ml-5">好评</span></Radio>
            <Radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span class="ml-5">中评</span></Radio>
            <Radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span class="ml-5">差评</span></Radio>
          </RadioGroup>
        </div>
        <div class="pt-10 pb-10 evaluate-showker-pop-box mt-10">
          <p class="title">
            <Tooltip content="该拿手提供的淘宝评价和晒图，是否满足您的要求？" placement="top">
              <Icon type="help-circled"></Icon>
            </Tooltip>
            <span class="cl000">买家秀质量：</span>
          </p>
          <RadioGroup v-model="buyerShowQuality">
            <Radio label="hao_ping"><img class="vtc-mid img" src="~assets/img/common/haoping.png" alt=""><span class="ml-5">好评</span></Radio>
            <Radio label="zhong_ping"><img class="vtc-mid img" src="~assets/img/common/zhongping.png" alt=""><span class="ml-5">中评</span></Radio>
            <Radio label="cha_ping"><img class="vtc-mid img" src="~assets/img/common/chaping.png" alt=""><span class="ml-5">差评</span></Radio>
          </RadioGroup>
        </div>
      </div>
      <div slot="footer" class="text-ct pb-20">
        <iButton class="pl-20 pr-20 btn" type="error" size="large" :loading="loading" @click="evaluateShowkerFun">确定提交</iButton>
      </div>
    </Modal>
  </div>

</template>

<script>
  import Checkbox from 'iview/src/components/checkbox'
  import Page from 'iview/src/components/page'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import {Select, Option} from 'iview/src/components/select'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Tooltip from 'iview/src/components/tooltip'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList, encryption} from '@/config/utils'
  import TimeDown from '@/components/TimeDown'
  import PayModel from '@/components/PayModel'

  export default {
    name: 'TaskFailAudit',
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
      CollapseTransition: CollapseTransition,
    },
    data() {
      return {
        evaluateShowker:false,
        wwQuality:'hao_ping',
        fillOrderCooperate:'hao_ping',
        buyerShowQuality:'hao_ping',
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
        payButtonText: '确认支付并通过',
        rechargeButtonText: '前去充值',
        showCheckOrder: false,
        orderInfo: {},
        orderReviewStatus: 'passAudit',
        orderNoPassReason: null,
        loading:false,
        showkerReportInfo:{},
        evaluateShowkerAlitmAccount:null,
      }
    },
    mounted() {
    },
    created() {
      let _this = this;
      let status = _this.$route.query.status;
      if (status) {
        if (status === 'orderNum') {
          _this.showkerTaskStatusList.push('order_num_waiting_audit');
          _this.passesTaskList();
        } else if (status === 'trialReport') {
          _this.showkerTaskStatusList.push('trial_report_waiting_confirm');
          _this.passesTaskList();
        }
      } else {
        this.passesTaskList();
      }
    },
    computed: {
      getOderPrice() {
        let _this = this;
        if (_this.orderInfo.discountPrice && _this.orderInfo.discountPrice > 0) {
          return _this.orderInfo.orderPrice - _this.orderInfo.discountPrice
        } else if (_this.orderInfo.discountRate && _this.orderInfo.discountRate > 0) {
          return _this.orderInfo.orderPrice * (1 - _this.orderInfo.discountRate)
        } else {
          return _this.orderInfo.orderPrice
        }
      },
      needReplenishMoney() {
        return (this.getOderPrice - this.orderInfo.perMarginNeed).toFixed(2) * 1
      }
    },
    methods: {
      getShowkerReportInfo(id,alitmAccount){
        let self = this;
        self.evaluateShowker = true;
        self.evaluateShowkerAlitmAccount = alitmAccount;
        api.showkerTaskReport({id: id}).then(res => {
          if (res.status) {
            self.showkerReportInfo = res.data
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      evaluateShowkerFun(){
        let self = this;
        self.loading = true;
        api.evaluateFormSellerToShowker({
          showkerId: self.showkerReportInfo.showkerId,
          showkerAlitmAccount: self.evaluateShowkerAlitmAccount,
          taskId: self.showkerReportInfo.task.id,
          taskNum: self.showkerReportInfo.task.number,
          buyerQuality: self.buyerShowQuality,
          orderTone: self.fillOrderCooperate,
          trialReportQuality: self.wwQuality,
          showkerTaskId: self.showkerReportInfo.showkerTaskId
        }).then( res => {
          if (res.status){
            self.evaluateShowker = false;
            self.$Message.success('评价成功！');
            self.loading = false;
            self.passesShowkerTask(self.showkerReportInfo.task.id,self.operateIndex)
          }else {
            self.$Message.error(res.msg)
          }
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
        return TaskErrorStatusList(type);
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
        this.passesTaskList();
      },
      passesTaskList() {
        let _this = this;
        _this.searchLoading = true;
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
            _this.$set(_this.taskPassAuditList[index], 'passTask', []);
            res.data.content.forEach(item => {
              _this.taskPassAuditList[index].passTask.push(item);
            });
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
      openCheckOrder(id, needBrowseCollectAddCart,itemIssue) {
        let _this = this;
        // _this.needBrowseCollectAddCart = needBrowseCollectAddCart;
        _this.needBrowseCollectAddCart = false;
        _this.needIssue = itemIssue;
        _this.showCheckOrder = true;
        _this.orderNoPassReason = '';
        api.orderNumberInfo({id: id}).then(res => {
          if (res.status) {
            _this.orderInfo = res.orderInfo;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      goProbationReport(id) {
        this.$router.push({name: 'ProbationReport', query: {id: encryption(id), from: 'taskPassAudit'}});
      },
      orderNumberAudit() {
        let _this = this;
        if (_this.orderReviewStatus === 'failAudit' && !_this.orderNoPassReason) {
          _this.$Message.error("亲，请填写不通过的理由！");
          return;
        }
        if(_this.orderReviewStatus === 'passAudit' && _this.orderNoPassReason) {
          _this.orderNoPassReason = null;
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
            _this.$store.dispatch('getPersonalTrialCount');
            _this.$store.dispatch('getUserInformation');
            _this.showCheckOrder = false;
            _this.passesShowkerTask(_this.operateTaskId, _this.operateIndex);
          } else {
            _this.$Message.error(res.msg);
            _this.closeCheckOrder();
          }
        })
      },
      collapseToggle(id, index) {
        if (this.selectId === id) {
          this.selectId = null;
        } else {
          this.selectId = id;
          this.passesShowkerTask(id, index);
        }
      },
      handleViewIssue(value, key) {
        let _this = this;
        _this.isShowCheckScreenshotModel = true;
        _this.checkScreenshotSrc = value;
        _this.checkScreenshotModleTitle = '浏览答题截图：（'+ key + '）';
      },
      handleView(value, key) {
        let _this = this;
        _this.isShowCheckScreenshotModel = true;
        _this.checkScreenshotSrc = value;
        switch (key) {
          case 'addToCart':
            _this.checkScreenshotModleTitle = '加入购物车截图';
            break;
          case 'enshrine':
            _this.checkScreenshotModleTitle = '加入收藏夹截图';
            break;
          case 'itemLocation':
            _this.checkScreenshotModleTitle = '宝贝所在位置截图';
            break;
          case 'searchCondition':
            _this.checkScreenshotModleTitle = '宝贝搜索条件置截图';
            break;

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .certainly-hit-tip{
    display: inline-block;
    background-color: #f9284f;
    color: #fff;
    padding: 0 5px;
    line-height: 22px;
    height: 21px;
    border-radius: 5px;
    margin-left: 10px;
  }
  .evaluate-showker-pop{
    .evaluate-showker-pop-box{
      border: 1px solid #eee;
      background-color: #F8F8F8;
    }
    .title{
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    .img {
      transform: translateY(-1px);
    }
    .btn{
      width: 200px;
    }
  }
</style>
