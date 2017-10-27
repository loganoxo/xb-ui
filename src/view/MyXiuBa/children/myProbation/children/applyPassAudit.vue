<template>
  <div class="clear">
    <!--已通过-->
    <div class="probation-pass mt-20" v-show="!showPassOperation">
      <div class="check-status clear">
        <div class="left mr-10" style="margin-top: 2px;">
          <Checkbox
            :value="checkAll"
            @click.prevent.native="handleCheckAll">所有
          </Checkbox>
        </div>
        <div class="left">
          <Checkbox-group v-model="checkPassList" @on-change="checkChange">
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
              <span>活动终止</span>
            </Checkbox>
          </Checkbox-group>
        </div>
      </div>
      <div class="order-query">
        <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
          <iOption placeholder="请选择类型查询" v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label}}</iOption>
        </iSelect>
        <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
        <span class="ml-10">订单号：</span>
        <iInput v-model="orderNumber" placement="请输入订单号查询" style="width: 160px;margin-right: 8px;"></iInput>
        <span class="ml-10">通过日期：</span>
        <Date-picker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期查询" style="width: 200px" @on-change="handleDataChange"></Date-picker>
        <iButton type="primary" class="ml-20" :loading="searchLoading" @click="showkerSuccessList">搜索</iButton>
      </div>
      <div class="probation-table mt-20">
        <table>
          <thead>
          <tr>
            <th width="25%">活动标题</th>
            <th width="12%">绑定淘宝会员名</th>
            <th width="12%">活动担保金（元）</th>
            <th width="17%">订单号</th>
            <th width="12%">流程状态</th>
            <th width="12%">操作</th>
          </tr>
          </thead>
          <tbody v-if="applySuccessList.length > 0" v-for="item in applySuccessList" :key="item.id">
          <tr class="task-number">
            <td colspan="6">
              <span>活动编号：{{item.orderNumber || '------'}}</span>
              <span class="ml-20">通过日期：{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
            </td>
          </tr>
          <tr>
            <td class="cursor-p" @click="goTaskDetails(item.taskId)">
              <img class="left ml-10" :src="item.taskMainImage + '!thum54'">
              <a class="img-title left" :title="item.taskName">{{item.taskName}}</a>
            </td>
            <td>{{item.alitmAccount}}</td>
            <td>{{item.perMarginNeed / 100 || 0}}</td>
            <td>{{item.orderNum || '-----'}}</td>
            <td>
              <div
                v-if="item.status !== 'trial_end' && item.status !== 'order_num_error' && item.status !== 'trial_report_unqualified'">
                <p>{{getTaskStatus(item.status)}}</p>
                <p v-if="item.status !== 'trial_finished'">
                  <time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down>
                </p>
              </div>
              <p class="mt-5 main-color cursor-p" v-if="item.status === 'order_num_error'">
                <Tooltip :content="item.auditDescription" placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>订单号有误</span>
                </Tooltip>
              </p>
              <p class="mt-5 main-color" v-if="item.status === 'trial_report_unqualified'">
                <Tooltip :content="item.auditDescription" placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>报告不合格</span>
                </Tooltip>
              </p>
              <p class="mt-5 main-color cursor-p" v-if="item.status === 'trial_end'">
                <Tooltip :content="getTaskStatus(item.trialEndReason)" placement="top">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>活动终止</span>
                </Tooltip>
              </p>
            </td>
            <td>
              <p v-if="item.status === 'pass_and_unclaimed' || item.status === 'order_num_error'" class="operation"
                 @click="changePassOperation('place','',item.id,item.taskType)">去下单</p>
              <p v-if="item.status === 'trial_report_waiting_submit'" class="operation"
                 @click="changePassOperation('report','write',item.id)">制作买家秀</p>
              <p v-if="item.status === 'trial_report_unqualified'" class="operation"
                 @click="changePassOperation('report','amend',item.id)">修改买家秀</p>
              <p v-if="item.status === 'pass_and_unclaimed'" class="operation mt-5"
                 @click="openAuditOrder(item.id,item.taskType)">填订单号</p>
              <p v-if="item.status === 'order_num_error'" class="operation mt-5"
                 @click="openAuditOrder(item.id,item.taskType)">修改订单号</p>
              <p v-if="item.status === 'trial_report_waiting_confirm' || item.status === 'trial_finished'" class="operation mt-5"
                 @click="lookReportInfo(item.id)">查看买家秀详情</p>
              <p v-if="item.status === 'trial_finished'" class="operation mt-5">
                <router-link :to="{path:'/user/money-management/transaction-record',query:{taskNumber:item.orderNumber}}">查看活动账单</router-link>
              </p>
              <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'" class="operation mt-5"
                 @click="endTrialModel(item.id)">结束活动</p>
            </td>
          </tr>
          </tbody>
          <tbody v-if="applySuccessList.length === 0">
          <tr>
            <td colspan="6" width="100%">暂无数据</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="activity-page mt-20 right mr-10" v-show="applySuccessList.length > 0 && !showPassOperation">
        <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
      </div>
    </div>
    <!--已通过-去下单-->
    <div class="pass-place" v-if="showPassOperation === 'place'">
      <div class="my-probation-title pl-10">
        <span class="left">去下单</span>
        <span class="right mr-30" @click="returnUpPage">返回上页</span>
      </div>
      <div class="commodity-info clear mt-20">
        <div class="commodity-img left">
          <img :src="taskPlaceInfo.taskMainImage + '!thum54'" alt="">
        </div>
        <div class="commodity-text left ml-5">
          <p>{{taskPlaceInfo.taskName}}</p>
          <p class="mt-15">
            总份数<strong>&nbsp;{{taskPlaceInfo.taskCount || 0}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{taskPlaceInfo.itemPrice / 100 || 0}}&nbsp;</strong>元
          </p>
        </div>
      </div>
      <p class="place-type">
        <span>{{taskPlaceInfo.taskTypeDesc}}</span>
        <span v-if="showkerTask.currentGenerationEndTime" class="ml-20">下单剩余时间<time-down color='#ff4040' :fontWeight=600 :endTime="showkerTask.currentGenerationEndTime"></time-down>（超时未下单，即未在平台提交订单号，视为主动放弃活动资格）</span>
      </p>
      <div class="place-step mt-22" v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
        <p v-if="taskPlaceInfo.taskType === 'pc_search'">第1步：打开浏览器输入【<span>www.taobao.com</span>】</p>
        <p v-if="taskPlaceInfo.taskType === 'app_search'">第1步：打开【<span>手机淘宝APP</span>】</p>
        <p v-if="taskPlaceInfo.taskType === 'pc_search'"> 第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
        <p v-if="taskPlaceInfo.taskType === 'app_search'">第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
        <p>第3步：选择【<span>{{getTaskStatus(taskPlaceInfo.taskDetailObject.searchSort)}}</span>】排序</p>
        <p v-if="taskPlaceInfo.taskType === 'app_search'">第四步：从上往下数第【<span>{{taskPlaceInfo.taskDetailObject.searchRankPosition}}</span>】个宝贝左右</p>
        <p v-if="taskPlaceInfo.taskType === 'pc_search'"> 第4步：在【<span>{{taskPlaceInfo.taskDetailObject.searchPagePositionMin}}-{{taskPlaceInfo.taskDetailObject.searchPagePositionMax}}</span>】页附近找到下图宝贝。（由于千人千面的影响，位置仅供参考）</p>
        <p v-if="taskPlaceInfo.taskDetailObject.priceRangeMin > 0 || taskPlaceInfo.taskDetailObject.deliverAddress || checkText">
          第5步：<span class="minor-color" v-if="taskPlaceInfo.taskDetailObject.priceRangeMin > 0">搜索指定价格【<span>{{taskPlaceInfo.taskDetailObject.priceRangeMin / 100}}-{{taskPlaceInfo.taskDetailObject.priceRangeMax / 100}}</span>】，</span><span
          class="minor-color" v-if="taskPlaceInfo.taskDetailObject.deliverAddress">搜索指定发货地【<span>{{taskPlaceInfo.taskDetailObject.deliverAddress}}</span>】，</span><span class="minor-color" v-if="checkText">勾选【<span>{{checkText}}</span>】</span>
        </p>
      </div>
      <div class="tao-code-place-step" v-if="taskPlaceInfo.taskType === 'tao_code'">
        <p class="mb-10">淘口令【<span id="copyCode">{{taskPlaceInfo.taskDetailObject.taoCode}}</span>】<span id="copyBtn" class="ml-10">点击复制口令</span></p>
        <p>入口说明：【<span>直接在手机端上复制淘口令，打开手淘会自动弹出宝贝链接</span>】</p>
      </div>
      <div v-if="taskPlaceInfo.taskType === 'direct_access'" class="tao-link-place-step">
        <p>宝贝链接：<a :href="taskPlaceInfo.itemUrl" target="_blank">{{taskPlaceInfo.itemUrl}}</a>
        </p>
      </div>
      <div class="baby-info clear mt-40"
           v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
        <img class="left" :src="taskPlaceInfo.taskDetailObject.itemMainImage" alt="">
        <div class="left ml-20 mt-20">
          <p>
            <span>掌柜旺旺：</span>
            <span>{{getStoreName}}</span>
          </p>
          <p>
            <span>价格：</span>
            <span>￥{{taskPlaceInfo.itemPrice / 100 || 0}}</span>
          </p>
        </div>
      </div>
      <div class="write-order-number mt-40">
        <span @click="openAuditOrder(null,orderType)">下单完成，填订单号</span>
        <span class="ml-35" @click="returnUpPage">返回上页</span>
      </div>
    </div>
    <!--已通过-制作买家秀-->
    <div class="fill-report" v-if="showPassOperation === 'report'">
      <div class="my-probation-title pl-10">
        <span class="left">制作买家秀</span>
        <span class="right mr-30" @click="returnUpPage">返回上页</span>
      </div>
      <div class="commodity-info clear mt-20">
        <div class="commodity-img left">
          <img :src="showkerTask.task.taskMainImage + '!thum54'">
        </div>
        <div class="commodity-text left ml-5">
          <p>{{showkerTask.task.taskName}}</p>
          <p class="mt-15">
            总份数<strong>&nbsp;{{showkerTask.task.taskCount || 0}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{showkerTask.task.itemPrice / 100 || 0}}&nbsp;</strong>元
          </p>
        </div>
      </div>
      <div class="order-info mt-10">
        <p>
          <span>订单号：</span>
          <span>{{showkerTask.orderNum}}</span>
        </p>
        <p>
          <span>实付金额：</span>
          <span>{{showkerTask.orderPrice / 100 || 0}}</span>
          <span>元</span>
        </p>
        <p>
          <span>订单状态：</span>
          <span>{{getTaskStatus(showkerTask.status)}}</span>
          <span class="main-color"><time-down color='#ff4040' :fontWeight=600 :endTime="showkerTask.currentGenerationEndTime"></time-down></span>
        </p>
      </div>
      <div class="experience mt-22">
        <p class="mb-10">活动过程与体验：</p>
        <iInput v-model="trialReportText" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
                placeholder="请输入宝贝评价"></iInput>
      </div>
      <div class="experience-img mt-22">
        <p class="mb-10">买家秀图片：</p>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultImageList"
          :on-success="uploadImgSuccess"
          :on-remove="removeImage"
          :format="['jpg','jpeg','png','gif','bmp']"
          :max-size="2000"
          name="report"
          :uploadLength="5"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          type="drag">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
      </div>
      <div class="write-order-number mt-40">
        <span @click="submitReport">提交买家秀</span>
        <span class="ml-35" @click="returnUpPage">返回上页</span>
      </div>
    </div>
    <!--填写订单号弹窗-->
    <div class="audit-order-number-model" v-if="showAuditOrderNumber">
      <div class="audit-order-number-con showSweetAlert">
        <i class="close-model right mr-10" @click="closeAuditOrder">&times;</i>
        <p class="tip-title mt-20">
          <span>注意：订单号及实付金额提交后商家审核前不能修改，请正确填写！</span>
        </p>
        <div class="mt-20 ml-45">
          <span>请输入订单号：</span>
          <iInput v-model="affirmOrderNumber" style="width: 300px;"></iInput>
          <iButton @click="orderImg = true">什么是订单号？</iButton>
          <Modal v-if="pcOrApp === 'pcOrder'" v-model="orderImg" width="1000" :transfer="false">
            <div class="text-ct">
              <img style="width: 900px;height: 750px;" src="~assets/img/order-number/order_pc.png" alt="">
            </div>
          </Modal>
          <Modal v-else v-model="orderImg" width="360" :transfer="false">
            <div class="text-ct">
              <img style="width: 300px;height: 450px;" src="~assets/img/order-number/order_phone.png" alt="">
            </div>
          </Modal>
        </div>

        <p class="mt-20 ml-35">
          <span>请输入实付金额：</span>
          <iInput v-model.number="payMoney" style="width: 120px;"></iInput>
          <span class="ml-5">元</span>
        </p>
        <div class="submit-btn mt-40" @click="saveOrUpdateOrderNumber">确认提交</div>
      </div>
    </div>
    <!--删除活动确认弹框-->
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>结束确认</span>
      </p>
      <div style="text-align:center">
        <p>结束后将视为放弃活动资格，商家将不会返还任务担保金。</p>
        <p>是否确认结束？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="endTrial">结束</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Icon from 'iview/src/components/icon'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Page from 'iview/src/components/page'
  import Checkbox from 'iview/src/components/checkbox'
  import DatePicker from 'iview/src/components/date-picker'
  import Tooltip from 'iview/src/components/tooltip'
  import Modal from 'iview/src/components/modal'
  import Clipboard from 'clipboard';
  import Upload from '@/components/upload'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {TaskErrorStatusList, isNumber, encryption} from '@/config/utils'

  export default {
    name: 'ApplyPassAudit',
    components: {
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Page: Page,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      DatePicker: DatePicker,
      Tooltip: Tooltip,
      Modal: Modal,
      Upload: Upload,
      TimeDown: TimeDown,
    },
    data() {
      return {
        downloadButton: false,
        showPassOperation: '',
        showAuditOrderNumber: false,
        SelectList: [
          {
            value: '1',
            label: '活动名称'
          },
          {
            value: '2',
            label: '淘宝会员名'
          }
        ],
        searchLoading: false,
        selectStatus: null,
        searchValue: null,
        orderNumber: null,
        totalElements: null,
        pageSize: 5,
        checkAll: false,
        checkPassList: [],
        queryToData: [],
        pageIndex: 1,
        applySuccessList: [],
        taskPlaceInfo: {},
        showkerTask: {},
        itemId: null,
        orderStatus: null,
        reportStatus: null,
        affirmOrderNumber: null,
        payMoney: null,
        auditTimeStart: '',
        auditTimeEnd: '',
        trialReportImages: [],
        trialReportText: null,
        defaultImageList: [],
        modalLoading: false,
        deleteModal: false,
        deleteId: null,
        orderImg: false,
        orderType: null,
        taskOrderType: null
      }
    },
    mounted() {
    },
    created() {
      let _this = this;
      let status = _this.$route.query.status;
      if (status) {
        if (status === 'order_num_error') {
          _this.checkPassList.push('order_num_error');
          _this.checkPassList.push('trial_report_unqualified');
          _this.showkerSuccessList();
        } else {
          _this.checkPassList.push(status);
          _this.showkerSuccessList();
        }
      } else {
        _this.showkerSuccessList();
      }
      _this.$nextTick(function () {
        let clipboard = new Clipboard('#copyBtn', {
          target: () => document.getElementById('copyCode')
        });
        clipboard.on('success', () => {
          _this.$Message.success("复制口令成功！");
          clipboard.destroy();
        });
        clipboard.on('error', () => {
          _this.$Message.error("复制口令失败！");
          clipboard.destroy();
        });
      })
    },
    computed: {
      checkText: function () {
        return this.taskPlaceInfo.taskDetailObject.searchFilterDesc ? this.taskPlaceInfo.taskDetailObject.searchFilterDesc.split(',').join('、') : null;
      },
      getStoreName: function () {
        let length = this.taskPlaceInfo.storeName.length;
        let name = this.taskPlaceInfo.storeName;
        if (length && length > 4) {
          return name.substr(0, 2) + '****' + name.substr(-2);
        } else if (length && length <= 4) {
          return name.substr(0, 1) + '****' + name.substr(-1);
        } else {
          return '****'
        }
      },
      pcOrApp: function () {
        let type = this.orderType;
        return type === 'pc_search' || type === 'direct_access' ? 'pcOrder' : 'appOrder';
      }
    },
    methods: {
      encryptionId(id){
        return encryption(id)
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      goTaskDetails(id) {
        this.$router.push({name: 'TaskDetails', query: {q: encryption(id)}})
      },
      changePassOperation(type, status, id, orderType) {
        let _this = this;
        _this.reportStatus = status;
        _this.itemId = id;
        _this.orderType = orderType;
        if (type === 'report') {
          api.showkerTaskInfo({id: id,}).then(res => {
            if (res.status) {
              _this.showPassOperation = type;
              _this.showkerTask = res.data;
              if (status === 'write') {
                _this.trialReportImages = [];
                _this.trialReportText = null;
              } else {
                api.showkerTaskReport({id: id,}).then(res => {
                  if(res.status){
                    _this.trialReportImages = [];
                    let ImageList = JSON.parse(res.data.trialReportImages);
                    _this.trialReportImages = ImageList;
                    for (let i = 0, len = ImageList.length; i < len; i++) {
                      _this.defaultImageList.push({src: ImageList[i]});
                    }
                    _this.trialReportText = res.data.trialReportText;
                  } else {
                    _this.$Message.error(res.msg);
                  }
                });
              }
            } else {
              _this.$Message.error(res.msg);
            }
          });
        } else {
          api.showkerToProcessOrder({id: id}).then(res => {
            if (res.status) {
              _this.showPassOperation = type;
              _this.taskPlaceInfo = res.data.taskInfo;
              _this.showkerTask = res.data.showkerTask;
            } else {
              _this.$Message.error(res.msg);
            }
          })
        }
      },

      pageChange(data) {
        this.pageIndex = data;
        this.showkerSuccessList();
      },
      returnUpPage() {
        this.showPassOperation = '';
        this.trialReportImages = [];
        this.defaultImageList = [];
        this.trialReportText = null;
      },
      handleCheckAll() {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.checkPassList = ['pass_and_unclaimed', 'order_num_waiting_audit', 'trial_report_waiting_submit', 'trial_report_waiting_confirm', 'trial_finished', 'order_num_error', 'trial_report_unqualified', 'trial_end'];
        } else {
          this.checkPassList = [];
        }
        this.pageIndex = 1;
        this.showkerSuccessList()
      },
      checkChange() {
        if (this.checkPassList.length === 8) {
          this.checkAll = true;
        } else if (this.checkPassList.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
        this.pageIndex = 1;
        this.showkerSuccessList();
      },
      handleDataChange(data) {
        this.auditTimeStart = data[0];
        this.auditTimeEnd = data[1];
      },
      closeAuditOrder() {
        this.showAuditOrderNumber = false;
      },
      openAuditOrder(id, type) {
        this.orderType = type;
        this.showAuditOrderNumber = true;
        if (id && !this.itemId) {
          this.itemId = id;
        }
      },
      uploadImgSuccess(res) {
        this.trialReportImages.push(aliCallbackImgUrl + res.name);
      },
      removeImage(file) {
        let index = this.trialReportImages.indexOf(file.src);
        this.trialReportImages.splice(index, 1);
      },
      handleFormatError(file) {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: '图片 ' + file.name + ' 太大，不能超过 2M'
        });
      },
      showkerSuccessList() {
        let _this = this;
        _this.searchLoading = true;
        api.showkerSuccessList({
          selectStatus: _this.selectStatus,
          orderNum: _this.orderNumber,
          searchValue: _this.searchValue,
          auditTimeStart: _this.auditTimeStart,
          auditTimeEnd: _this.auditTimeEnd,
          statusList: JSON.stringify(_this.checkPassList),
          pageSize: 5,
          pageIndex: _this.pageIndex,
        }).then(res => {
          if (res.status) {
            _this.searchLoading = false;
            _this.applySuccessList = [];
            let content = res.data.content;
            content.forEach(function (item) {
              let data = {};
              data.id = item.id;
              data.taskId = item.task.id;
              data.alitmAccount = item.alitmAccount;
              data.currentGenerationEndTime = item.currentGenerationEndTime;
              data.orderNum = item.orderNum;
              data.status = item.status;
              data.trialEndReason = item.trialEndReason;
              data.taskMainImage = item.task.taskMainImage;
              data.taskName = item.task.taskName;
              data.perMarginNeed = item.task.perMarginNeed;
              data.createTime = item.createTime;
              data.orderNumber = item.task.number;
              data.taskType = item.task.taskType;
              if (item.latestShowkerTaskOpLog) {
                data.auditDescription = item.latestShowkerTaskOpLog.auditDescription;
              } else {
                data.auditDescription = '';
              }
              _this.applySuccessList.push(data);
            });
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      saveOrUpdateOrderNumber() {
        let _this = this;
        if (!_this.affirmOrderNumber) {
          _this.$Message.error("亲，请输入订单号！");
          return;
        }
        if (_this.affirmOrderNumber.length > 22) {
          _this.$Message.error("亲，订单号长度过长，请输入正确的订单号！");
          return;
        }
        if (!_this.payMoney) {
          _this.$Message.error("亲，请输入订单金额！");
          return;
        }
        if (!isNumber(_this.payMoney)) {
          _this.$Message.error("亲，输入的金额格式有误！");
          return;
        }
        api.showkerOrderSave({
          id: _this.itemId,
          orderNum: _this.affirmOrderNumber,
          actualPayMoney: _this.payMoney
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '订单号提交成功，请耐心等待商家审核！',
              duration: 6
            });
            _this.showkerSuccessList();
            _this.showAuditOrderNumber = false;
            _this.returnUpPage();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      submitReport() {
        let _this = this;
        if (!_this.trialReportText) {
          _this.$Message.error("亲，请描述您的活动过程与体验！");
          return;
        }
        if (_this.trialReportImages.length > 5) {
          _this.$Message.error("亲，图片上传数量最多5张！");
          return;
        }
        if (_this.reportStatus === 'write') {
          api.showkerSaveReport({
            id: _this.itemId,
            trialReportText: _this.trialReportText,
            trialReportImages: JSON.stringify(_this.trialReportImages)
          }).then(res => {
            if (res.status) {
              _this.$Message.success({
                content: '买家秀提交成功，请耐心等待商家审核！',
                duration: 6
              });
              _this.showkerSuccessList();
              _this.returnUpPage();
            } else {
              _this.$Message.error(res.msg);
            }
          })
        } else {
          api.showkerModifyReport({
            id: _this.itemId,
            trialReportText: _this.trialReportText,
            trialReportImages: JSON.stringify(_this.trialReportImages)
          }).then(res => {
            if (res.status) {
              _this.$Message.success({
                content: '买家秀修改成功，请耐心等待商家审核！',
                duration: 6
              });
              _this.showkerSuccessList();
              _this.returnUpPage();
            } else {
              _this.$Message.error(res.msg);
            }
          })
        }
      },
      endTrialModel(id) {
        this.deleteModal = true;
        this.deleteId = id;
      },
      endTrial() {
        let _this = this;
        _this.modalLoading = true;
        api.showkerTrialEed({
          id: _this.deleteId
        }).then(res => {
          if (res.status) {
            _this.modalLoading = false;
            _this.$Message.success({
              content: '结束活动成功！',
              duration: 6
            });
            this.deleteModal = false;
            _this.showkerSuccessList();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      lookReportInfo(id) {
        this.$router.push({path: '/user/my-probation/report', query: {id: encryption(id), from: 'buyer'}});
      }
    }
  }
</script>
