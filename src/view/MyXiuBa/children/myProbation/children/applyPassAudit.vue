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
             <span>已通过待领取</span>
           </Checkbox>
           <Checkbox label="order_num_waiting_audit">
             <span>订单号待审核</span>
           </Checkbox>
           <Checkbox label="trial_report_waiting_submit">
             <span>已下订单待交试用报告</span>
           </Checkbox>
           <Checkbox label="trial_report_waiting_confirm">
             <span>报告待确认</span>
           </Checkbox>
           <Checkbox label="trial_finished">
             <span>试用完成</span>
           </Checkbox>
           <Checkbox label="order_num_error">
             <span>订单号有误</span>
           </Checkbox>
           <Checkbox label="trial_report_unqualified">
             <span>报告不合格</span>
           </Checkbox>
           <Checkbox label="trial_end">
             <span>试用终止</span>
           </Checkbox>
         </Checkbox-group>
       </div>
     </div>
     <div class="order-query">
       <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
         <iOption placeholder="请选择类型查询" v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
       </iSelect>
       <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
       <span class="ml-10">订单号：</span>
       <iInput v-model="orderNumber" placement="请输入订单号查询" style="width: 160px;margin-right: 8px;"></iInput>
       <span class="ml-10">通过日期：</span>
       <Date-picker format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期查询"
                    style="width: 200px" @on-change="handleDataChange"></Date-picker>
       <iButton type="primary" class="ml-20">搜索</iButton>
     </div>
     <div class="probation-table mt-20">
       <table>
         <thead>
         <tr>
           <th width="25%">活动标题</th>
           <th width="12%">绑定淘宝会员名</th>
           <th width="12%">试用担保金（元）</th>
           <th width="17%">订单号</th>
           <th width="12%">流程状态</th>
           <th width="12%">操作</th>
         </tr>
         </thead>
         <tbody v-if="applySuccessList.length > 0" v-for="item in applySuccessList" :key="item.id">
         <tr>
           <td>
             <img class="left ml-10" :src="item.taskMainImage">
             <p class="left img-title">
               <span>{{item.taskName}}</span>
               <span>{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
             </p>
           </td>
           <td>{{item.alitmAccount}}</td>
           <td>{{item.perMarginNeed  / 100 || 0}}</td>
           <td>{{item.orderNum || '-----'}}</td>
           <td>
             <div v-if="item.status !== 'trial_end' && item.status !== 'order_num_error' && item.status !== 'trial_report_unqualified'">
               <p>{{getTaskStatus(item.status)}}</p>
               <p v-if="item.status !== 'trial_finished'"><time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down></p>
             </div>
             <p class="mt-5 main-color" v-if="item.status === 'order_num_error'">
               <Icon color="#f60" type="information-circled"></Icon>
               <span>订单号有误</span>
             </p>
             <p class="mt-5 main-color" v-if="item.status === 'trial_report_unqualified'">
               <Icon color="#f60" type="information-circled"></Icon>
               <span>报告不合格</span>
             </p>
             <p class="mt-5 main-color cursor-p" v-if="item.status === 'trial_end'">
               <Tooltip :content="getTaskStatus(item.trialEndReason)" placement="top">
                 <Icon color="#f60" type="information-circled"></Icon>
                 <span>试用终止</span>
               </Tooltip>
             </p>
           </td>
           <td>
             <p v-if="item.status === 'pass_and_unclaimed'" class="operation"
                @click="changePassOperation('place','',item.id)">去下单</p>
             <p v-if="item.status === 'trial_report_waiting_submit'" class="operation"
                @click="changePassOperation('report','write',item.id)">填写试用报告</p>
             <p v-if="item.status === 'trial_report_unqualified'" class="operation"
                @click="changePassOperation('report','amend',item.id)">修改试用报告</p>
             <p v-if="item.status === 'pass_and_unclaimed'" class="operation mt-5"
                @click="openAuditOrder(item.id)">填订单号</p>
             <p v-if="item.status === 'order_num_error'" class="operation mt-5"
                @click="openAuditOrder(item.id)">修改订单号</p>
             <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'" class="operation mt-5"
                @click="endTrial(item.id)">结束试用</p>
             <p v-if="item.status === 'trial_finished'" class="operation mt-5">查看试用详情</p>
             <p v-if="item.status === 'trial_finished'" class="operation mt-5">查看试用返款</p>
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
       <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
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
         <img :src="taskPlaceInfo.taskMainImage" alt="">
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
       <span class="ml-20">下单剩余时间<time-down color='#ff4040' :fontWeight=600 :endTime="showkerTask.currentGenerationEndTime"></time-down>（超时未下单，即未在平台提交订单号，视为主动放弃试用资格）</span>
     </p>
     <div class="place-step mt-22"
          v-if="taskPlaceInfo.taskType === 'pc_search' || taskPlaceInfo.taskType === 'app_search'">
       <p v-if="taskPlaceInfo.taskType === 'pc_search'">第1步：打开浏览器输入【<span>www.taobao.com</span>】</p>
       <p v-if="taskPlaceInfo.taskType === 'app_search'">第1步：打开【<span>手机淘宝APP</span>】</p>
       <p v-if="taskPlaceInfo.taskType === 'pc_search'">
         第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
       <p v-if="taskPlaceInfo.taskType === 'app_search'">
         第2步：搜索框输入关键词【<span>{{taskPlaceInfo.taskDetailObject.searchKeyword}}</span>】</p>
       <p>第3步：选择【<span>{{getTaskStatus(taskPlaceInfo.taskDetailObject.searchSort)}}</span>】排序</p>
       <p>
         第4步：搜索指定价格【<span>{{taskPlaceInfo.taskDetailObject.priceRangeMin / 100}}-{{taskPlaceInfo.taskDetailObject.priceRangeMax / 100}}</span>】<span
         v-if="taskPlaceInfo.taskDetailObject.deliverAddress">，搜索指定发货地【<span>{{taskPlaceInfo.taskDetailObject.deliverAddress}}</span>】</span>，勾选【<span>{{checkText}}</span>】
       </p>
       <p>
         第5步：在【<span>{{taskPlaceInfo.taskDetailObject.searchPagePositionMin}}-{{taskPlaceInfo.taskDetailObject.searchPagePositionMax}}</span>】页附近找到下图宝贝。（由于千人千面的影响，位置仅供参考）
       </p>
     </div>
     <div class="tao-code-place-step" v-if="taskPlaceInfo.taskType === 'tao_code'">
       <p>淘口令【<span>1224556546</span>】<span>复制口令</span></p>
       <img src="" alt="">
       <p>入口说明：【<span>直接在手机端上复制淘口令，打开手淘会自动弹出宝贝链接，或直接用手淘扫描上方二维码</span>】</p>
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
           <span>店铺名称：</span>
           <span>{{taskPlaceInfo.storeName}}</span>
         </p>
         <p>
           <span>价格：</span>
           <span>￥{{taskPlaceInfo.itemPrice / 100 || 0}}</span>
         </p>
       </div>
     </div>
     <div class="write-order-number mt-40">
       <span @click="openAuditOrder()">下单完成，填订单号</span>
       <span class="ml-35" @click="returnUpPage">返回上页</span>
     </div>
   </div>
   <!--已通过-填写试用报告-->
   <div class="fill-report" v-if="showPassOperation === 'report'">
     <div class="my-probation-title pl-10">
       <span class="left">填写试用报告</span>
       <span class="right mr-30" @click="returnUpPage">返回上页</span>
     </div>
     <div class="commodity-info clear mt-20">
       <div class="commodity-img left">
         <img :src="reportInfo.task.taskMainImage">
       </div>
       <div class="commodity-text left ml-5">
         <p>{{reportInfo.task.taskName}}</p>
         <p class="mt-15">
           总份数<strong>&nbsp;{{reportInfo.task.taskCount || 0}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{reportInfo.task.itemPrice / 100 || 0}}&nbsp;</strong>元
         </p>
       </div>
     </div>
     <div class="order-info mt-10">
       <p>
         <span>订单号：</span>
         <span>{{reportInfo.orderNum}}</span>
       </p>
       <p>
         <span>订单金额：</span>
         <span>{{reportInfo.orderPrice / 100 || 0}}</span>
         <span>元</span>
       </p>
       <p>
         <span>订单状态：</span>
         <span>{{getTaskStatus(reportInfo.status)}}</span>
         <span class="main-color"><time-down color='#ff4040' :fontWeight=600 :endTime="reportInfo.currentGenerationEndTime"></time-down></span>
       </p>
     </div>
     <div class="experience mt-22">
       <p class="mb-10">试用过程与体验：</p>
       <iInput v-model="trialReportText" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
               placeholder="请输入宝贝评价"></iInput>
     </div>
     <div class="experience-img mt-22">
       <p class="mb-10">试用图片：</p>
       <Upload
         ref="upload"
         :show-upload-list="false"
         :default-file-list="defaultImageList"
         :on-success="uploadImgSuccess"
         :on-remove="removeImage"
         :format="['jpg','jpeg','png','gif','bmp']"
         :max-size="300"
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
       <span @click="submitReport">提交报告</span>
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
       <p class="mt-20 ml-45">
         <span>请输入订单号：</span>
         <iInput v-model="affirmOrderNumber" style="width: 300px;"></iInput>
         <Tooltip class="ml-5 cursor-p" content="Top Center 文字提示" placement="top">
           <span>什么是订单号？</span>
         </Tooltip>
       </p>
       <p class="mt-20 ml-35">
         <span>请输入实付金额：</span>
         <iInput v-model.number="payMoney" style="width: 120px;"></iInput>
         <span class="ml-5">元</span>
       </p>
       <div class="submit-btn mt-40" @click="saveOrUpdateOrderNumber">确认提交</div>
     </div>
   </div>
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
  import Upload from '@/components/upload'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {TaskErrorStatusList} from '@/config/utils'

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
      Upload: Upload,
      TimeDown: TimeDown
    },
    data() {
      return {
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
        reportInfo: {},
        defaultImageList: [],
      }
    },
    mounted() {

    },
    created() {
      this.showkerSuccessList();
    },
    computed: {
      checkText: function () {
        return this.taskPlaceInfo.taskDetailObject.searchFilterDesc.split(',').join('、');
      }
    },
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      changePassOperation(type, status, id) {
        let _this = this;
        _this.reportStatus = status;
        _this.itemId = id;
        if (type === 'report') {
          api.showkerReportInfo({
            id: id
          }).then(res => {
            if (res.status) {
              _this.showPassOperation = type;
              _this.reportInfo = res.data.showkerTask;
              if (status === 'write') {
                _this.trialReportImages = [];
                _this.trialReportText = null;
              } else {
                _this.trialReportImages = [];
                let ImageList = JSON.parse(res.data.trialReport.trialReportImages);
                _this.trialReportImages = ImageList;
                for (let i = 0, len = ImageList.length; i < len; i++) {
                  _this.defaultImageList.push({src: ImageList[i]});
                }
                _this.trialReportText = res.data.trialReport.trialReportText;
              }
            } else {
              _this.$Message.error(res.msg);
            }
          });
        } else {
          api.showkerToProcessOrder({
            id: id
          }).then(res => {
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
        this.showkerApplyList();
      },
      returnUpPage() {
        this.showPassOperation = '';
      },
      handleCheckAll() {

      },
      checkChange() {

      },
      handleDataChange(data) {
        this.auditTimeStart = data[0];
        this.auditTimeEnd = data[1];
      },
      closeAuditOrder() {
        this.showAuditOrderNumber = false;
      },
      openAuditOrder(id) {
        this.showAuditOrderNumber = true;
        if (!this.itemId) {
          this.itemId = id;
        }
      },
      uploadImgSuccess(res) {
        this.trialReportImages.push(aliCallbackImgUrl + res.name);
      },
      removeImage(file) {
        let src = file.src;
        let index = this.trialReportImages.indexOf(src);
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
          content: '图片 ' + file.name + ' 太大，不能超过 300K'
        });
      },
      showkerSuccessList() {
        let _this = this;
        _this.applySuccessList = [];
        api.showkerSuccessList({
          selectStatus: _this.selectStatus,
          searchValue: _this.searchValue,
          pageIndex: _this.pageIndex,
          auditTimeStart: _this.auditTimeStart,
          auditTimeEnd: _this.auditTimeEnd,
          pageSize: 5,
        }).then(res => {
          if (res.status) {
            let content = res.data.content;
            content.forEach(function (item) {
              let data = {};
              data.id = item.id;
              data.alitmAccount = item.alitmAccount;
              data.currentGenerationEndTime = item.currentGenerationEndTime;
              data.orderNum = item.orderNum;
              data.status = item.status;
              data.trialEndReason = item.trialEndReason;
              data.taskMainImage = item.task.taskMainImage;
              data.taskName = item.task.taskName;
              data.perMarginNeed = item.task.perMarginNeed;
              data.createTime = item.task.createTime;
              _this.applySuccessList.push(data);
            });
            _this.totalElements = res.data.numberOfElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      saveOrUpdateOrderNumber() {
        let _this = this;
        if(!_this.affirmOrderNumber){
          _this.$Message.error("亲，请输入订单号！");
          return;
        }
        if(!_this.payMoney){
          _this.$Message.error("亲，请输入订单金额！");
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
        if(!_this.trialReportText){
          _this.$Message.error("亲，请描述您的试用过程与体验！");
          return;
        }
        if (_this.trialReportImages.length < 5) {
          _this.$Message.error("亲，图片上传数量不能少于5张！");
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
                content: '试用报告提交成功，请耐心等待商家审核！',
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
                content: '试用报告修改成功，请耐心等待商家审核！',
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
      endTrial(id) {
        let _this = this;
        api.showkerTrialEed({
          id: id
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '结束试用成功！',
              duration: 6
            });
              _this.showkerSuccessList();
            } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>
