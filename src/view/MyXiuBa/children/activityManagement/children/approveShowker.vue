<template>
  <div class="activity-management">
    <div class="activity-title pl-10 clear">
      <span class="left">审批秀客</span>
      <span class="right"><router-link to="/user/activity-management/list">返回上一页</router-link></span>
    </div>
    <div class="approve-manage-info mt-12">
      <div class="manage-info-con clear">
        <div class="manage-img left">
          <img :src="approveTaskInfo.taskMainImage" alt="">
        </div>
        <div class="manage-text left ml-5">
          <p>{{approveTaskInfo.taskName}}</p>
          <p class="mt-15">
            总份数<strong>&nbsp;{{approveTaskInfo.taskCount || 0}}&nbsp;</strong>，<strong>&nbsp;{{trailOn}}&nbsp;</strong>人正在参与活动，<strong>&nbsp;{{trailDone || 0}}&nbsp;</strong>人完成活动，剩余名额<strong>&nbsp;{{approveTaskInfo.taskCount - approveTaskInfo.showkerApplySuccessCount || 0}}&nbsp;</strong>个
          </p>
        </div>
      </div>
      <div class="approve-list mt-20">
        <div class="approve-list-title">
          <span :class="{isSelect:showApproveStatus === 'toAudit'}" @click="changeTitle('toAudit')">待审批</span>
          <span :class="{isSelect:showApproveStatus === 'passAudit'}" @click="changeTitle('passAudit')">已通过</span>
          <span :class="{isSelect:showApproveStatus === 'failAudit'}" @click="changeTitle('failAudit')">已终止</span>
        </div>
        <!--待审批-->
        <div class="await-approve mt-20" v-show="showApproveStatus === 'toAudit'">
          <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
            <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
          </iSelect>
          <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
          <iButton type="primary" :loading="searchLoading" @click="taskApplyList">搜索</iButton>
          <div class="activity-table mt-20">
            <table>
              <thead>
              <tr>
                <th width="20%">淘宝账号（旺旺号）</th>
                <th width="20%">申请时间</th>
                <th width="20%">秀客的买家秀记录</th>
                <th width="20%">流程状态</th>
                <th width="20%">操作</th>
              </tr>
              </thead>
              <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
              <tr>
                <td>
                  <p>{{item.alitmAccount}}</p>
                  <p><img :src="item.creditLevel" alt="" style="width: auto;height: auto;"></p>
                  <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
                </td>
                <td>{{item.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
                <td class="registration">
                  <router-link :to="{ 'path': '/trial-report','query': {'showkerId': item.showkerId}}">
                   查看
                  </router-link>
                </td>
                <td>{{getTaskStatus(item.status)}}</td>
                <td>
                  <p class="del-edit">
                    <span class="mr-40" v-show="approveTaskInfo.needBrowseCollectAddCart"  @click="getUserScreenShot(item.id)">审核</span>
                    <span  @click="showkerPassAudit(item.id, 'true')">通过</span>
                  </p>
                </td>
              </tr>
              </tbody>
              <tbody v-if="approveTableList.length === 0">
              <tr>
                <td colspan="5" width="100%">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Modal v-model="approvalPop"
                width="600">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>3333提交的活动申请截图</span>
          </p>
          <div class="text-ct mt-20 ">
            <div v-if="userScreenShotImg.searchCondition !== ''" style="display: inline-block;padding: 0 10px">
              <img style="width:80px ;height: 80px" :src="userScreenShotImg.searchCondition" alt="">
              <p>搜索条件截图</p>
            </div>
            <div  v-if="userScreenShotImg.itemLocation !== ''" style="display: inline-block;padding: 0 10px">
              <img style="width: 80px;height: 80px" :src="userScreenShotImg.itemLocation" alt="">
              <p>所在位置截图</p>
            </div>
            <div  v-if="userScreenShotImg.browseToBottom !== ''" style="display: inline-block;padding: 0 10px">
              <img style="width: 80px;height: 80px" :src="userScreenShotImg.browseToBottom" alt="">
              <p>宝贝浏览见底</p>
            </div>
            <div  v-if="userScreenShotImg.enshrine !== ''"  style="display: inline-block;padding: 0 10px">
              <img style="width: 80px;height: 80px" :src="userScreenShotImg.enshrine" alt="">
              <p>加入收藏夹</p>
            </div>
            <div  v-if="userScreenShotImg.addToCart !== ''" style="display: inline-block;padding: 0 10px" >
              <img style="width: 80px;height: 80px" :src="userScreenShotImg.addToCart" alt="">
              <p>加入购物车</p>
            </div>
          </div>
          <div class="text-ct mt-20">
            <Radio-group v-model="passOrNoPass" >
              <Radio  label=true ><span>通过</span></Radio>
              <Radio class="ml-20" label=false><span>希望重新提交</span></Radio>
            </Radio-group>
          </div>
          <div v-show="passOrNoPass ==='false'" class="mt-20 text-ct">
            <iInput style="width: 80%" placeholder="请填写截图不正确的地方，以便秀客修改" v-model="reason"></iInput>
          </div>
          <div class="text-ct mt-20">
            <iButton type="success"
                     style="width: 100px;height: 30px;background-color:#FF6636;border-color:#FF6636 "
                      @click="showkerPassAudit(passId,passOrNoPass)">确定</iButton>
          </div>
          <div slot="footer" class="clear">
           <div class="left ml-20" style="color: #FF6636;font-size: 29px"> <Icon type="alert-circled"></Icon></div>
           <div class="left ml-20" style="text-align: left">
             <p>通过秀客直接获得活动资金，希望重新提交将通知秀客重新修改截图！</p>
             <p> 您还有 <time-down :endTime="activeEndTime"></time-down> 进行审核，若该时间内未审核，系统将随机审核通过！</p>
           </div>
          </div>
        </Modal>
        <!--已通过-->
        <div class="fail-audit mt-20" v-show="showApproveStatus === 'passAudit'">
          <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
            <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
          </iSelect>
          <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
          <span>订单编号：</span>
          <iInput v-model="orderNum" style="width: 160px;margin-right: 8px;"></iInput>
          <iButton type="primary" :loading="searchLoading" @click="taskApplyList">搜索</iButton>
          <div class="clear mt-20">
            <div class="left mr-10" style="margin-top: 2px;">
              <Checkbox
                :value="checkAllByPass"
                @click.prevent.native="handleCheckPassAll">所有
              </Checkbox>
            </div>
            <div class="left">
              <Checkbox-group v-model="auditStatusList" @on-change="checkPassChange">
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
          <div class="activity-table mt-20">
            <table>
              <thead>
              <tr>
                <th width="25%">淘宝账号（旺旺号）</th>
                <th width="25%">状态</th>
                <th width="25%">订单号</th>
                <th width="25%">操作</th>
              </tr>
              </thead>
              <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
              <tr>
                <td>
                  <p>{{item.alitmAccount}}</p>
                  <p><img :src="item.creditLevel" alt="" style="width: auto; height: auto;"></p>
                  <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
                </td>
                <td>
                  <p>{{getTaskStatus(item.status)}}</p>
                  <p v-if="item.status !== 'trial_end' && item.status !== 'trial_finished'"><time-down color='#ff4040' :fontWeight=600 :endTime="item.currentGenerationEndTime"></time-down></p>
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
              <tbody v-if="approveTableList.length === 0">
              <tr>
                <td colspan="4" width="100%">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--已终止-->
        <div class="pass-audit mt-20" v-show="showApproveStatus === 'failAudit'">
          <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
            <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
          </iSelect>
          <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
          <span>订单编号：</span>
          <iInput v-model="orderNum" style="width: 160px;margin-right: 8px;"></iInput>
          <iButton type="primary" :loading="searchLoading" @click="taskApplyList">搜索</iButton>
          <div class="clear mt-20">
            <div class="left mr-10" style="margin-top: 2px;">
              <Checkbox
                :value="checkAllByFail"
                @click.prevent.native="handleCheckFailAll">所有
              </Checkbox>
            </div>
            <div class="left">
              <Checkbox-group v-model="endReasonList" @on-change="checkFailChange">
                <Checkbox label="timeout_auto_close">
                  <span>逾期系统终止</span>
                </Checkbox>
                <Checkbox label="buyer_manual_close">
                  <span>秀客放弃活动</span>
                </Checkbox>
                <Checkbox label="seller_manual_close">
                  <span>管理员终止/商家终止</span>
                </Checkbox>
              </Checkbox-group>
            </div>
          </div>
          <div class="activity-table mt-20">
            <table>
              <thead>
              <tr>
                <th width="20%">淘宝账号（旺旺号）</th>
                <th width="20%">订单号</th>
                <th width="20%">活动状态</th>
                <th width="20%">终止时间</th>
                <th width="20%">终止原因</th>
              </tr>
              </thead>
              <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
              <tr>
                <td>
                  <p>{{item.alitmAccount}}</p>
                  <p><img :src="item.creditLevel" alt="" style="width: auto; height: auto;"></p>
                  <p v-if="item.tqz">淘气值：{{item.tqz}}</p>
                </td>
                <td>{{item.orderNum || '------'}}</td>
                <td>{{getTaskStatus(item.status)}}</td>
                <td>{{item.updateTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
                <td>{{getTaskStatus(item.trialEndReason)}}</td>
              </tr>
              </tbody>
              <tbody v-if="approveTableList.length === 0">
              <tr>
                <td colspan="5" width="100%">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="activity-page mt-20 right mr-10" v-if="approveTableList && approveTableList.length > 0">
        <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
      </div>
      <!--审核订单号弹窗-->
      <div class="check-order-model" v-if="showCheckOrder">
        <div class="check-order-con">
          <i class="right" @click="closeCheckOrder">&times;</i>
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
          <div class="true-btn" v-show="orderReviewStatus === 'passAudit' && perMarginNeed >= orderInfo.orderPrice" @click="orderNumberAudit">确认</div>
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
  </div>
</template>

<script>
  import Checkbox from 'iview/src/components/checkbox'
  import Page from 'iview/src/components/page'
  import Modal from 'iview/src/components/modal'
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Radio from 'iview/src/components/radio'
  import PayModel from '@/components/PayModel'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ApproveShowker',
    components: {
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      Modal: Modal,
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Radio: Radio,
      RadioGroup: Radio.Group,
      TimeDown: TimeDown,
      PayModel: PayModel
    },
    data() {
      return {
        passOrNoPass:'true',
        reason:null,
        passId:null,
        approvalPop:false,
        activeEndTime:null,
        userScreenShotImg:{},
        showApproveStatus: 'toAudit',
        taskId: null,
        checkAllByPass: false,
        checkAllByFail: false,
        auditStatusList: [],
        endReasonList: [],
        pageIndex: 1,
        pageSize: 5,
        totalElements: 0,
        selectStatus: '2',
        searchValue: null,
        orderNum: null,
        approveTableList: [],
        approveTaskInfo: {},
        trailOn: 0,
        trailDone: 0,
        SelectList: [
          {
            value: '2',
            label: '淘宝会员名'
          }
        ],
        showCheckOrder: false,
        noPassReason: null,
        showRefundModel: false,
        refundPayPwd: null,
        orderReviewStatus: 'passAudit',
        orderNoPassReason: null,
        orderInfo: {},
        perMarginNeed: 0,
        payButtonText: '确认支付并通过',
        rechargeButtonText: '前去充值',
        searchLoading: false
      }
    },
    mounted() {},
    created() {
      this.taskId = this.$route.query.taskId;
      this.showApproveStatus = "toAudit";
      this.taskApplyList();
      this.activeEndTime = parseInt(this.$route.query.endTime)+24*2*60*60;
    },
    watch: {},
    computed: {
      needReplenishMoney: function () {
        return (this.orderInfo.orderPrice - this.perMarginNeed).toFixed(2) * 1
      }
    },
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      pageChange(data) {
        this.pageIndex = data;
        this.taskApplyList();
      },
      handleCheckPassAll() {
        this.checkAllByPass = !this.checkAllByPass;
        if (this.checkAllByPass) {
          this.auditStatusList = ['pass_and_unclaimed', 'order_num_waiting_audit', 'trial_report_waiting_submit', 'trial_report_waiting_confirm', 'trial_finished' ,'order_num_error' ,'trial_report_unqualified'];
        } else {
          this.auditStatusList = [];
        }
        this.pageIndex = 1;
        this.taskApplyList();
      },
      handleCheckFailAll() {
        this.checkAllByFail = !this.checkAllByFail;
        if (this.checkAllByFail) {
          this.endReasonList = ['timeout_auto_close', 'buyer_manual_close', 'seller_manual_close'];
        } else {
          this.endReasonList = [];
        }
        this.pageIndex = 1;
        this.taskApplyList();
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
        this.taskApplyList();
      },
      checkFailChange() {
        if (this.endReasonList.length === 3) {
          this.checkAllByFail = true;
        } else if (this.endReasonList.length > 0) {
          this.checkAllByFail = false;
        } else {
          this.checkAllByFail = false;
        }
        this.pageIndex = 1;
        this.taskApplyList();
      },
      changeTitle(type) {
        this.showApproveStatus = type;
        this.taskApplyList();
      },
      taskApplyList() {
        let _this = this;
        _this.approveTableList = [];
        _this.searchLoading = true;
        api.getTaskApplyList({
          taskId: _this.taskId,
          status: _this.showApproveStatus,
          selectStatus: _this.selectStatus,
          searchValue: _this.searchValue,
          orderNum: _this.orderNum,
          endReasonList: JSON.stringify(_this.endReasonList),
          auditStatusList: JSON.stringify(_this.auditStatusList),
          pageIndex: _this.pageIndex
        }).then(res => {
          if (res.status) {
            _this.searchLoading = false;
            _this.approveTableList = res.data.list.content;
            _this.approveTaskInfo = res.data.taskInfo;
            _this.trailOn = res.data.trailOn;
            _this.trailDone = res.data.trailDone;
            _this.totalElements = res.data.totalElements;
            _this.approveTableList.forEach(item => {
              api.getAlitmByAccount({
                account: item.alitmAccount,
              }).then((res) => {
                if (res.status) {
                  _this.$set(item, 'creditLevel', res.data.creditLevelUrl);
                  _this.$set(item, 'tqz', res.data.tqzNum);
                }
              });
            });
          }else{
            _this.$Message.error(res.msg);
          }
        })
      },
      showkerPassAudit(id, status) {
        this.setShowkerAudit(id, status);
      },
      setShowkerAudit(id, status) {
        let _this = this;
        api.setTaskShowkerAudit({
          id: id,
          status: status,
          reason:_this.reason
        }).then(res => {
          if (res.status) {
            _this.$Message.success("审核秀客成功！");
            _this.approvalPop = false;
            _this.taskApplyList();
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      closeRefundModel() {
        this.showRefundModel = false;
      },
      openRefundModel() {
        this.showRefundModel = true;
      },
      closeCheckOrder() {
        this.showCheckOrder = false;
      },
      openCheckOrder(id) {
        let _this = this;
        _this.showCheckOrder = true;
        api.orderNumberInfo({
          id: id
        }).then(res => {
          if (res.status) {
            _this.orderInfo = res.data;
            _this.orderInfo.orderPrice = _this.orderInfo.orderPrice / 100;
            _this.perMarginNeed = res.data.task.perMarginNeed / 100;
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
            _this.taskApplyList();
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 6
            })
          }
        })
      },
      goProbationReport(id) {
        this.$router.push({name: 'ProbationReport', query: {id: id}});
      },
      orderNumberAudit() {
        let _this = this;
        if( _this.orderReviewStatus === 'failAudit' && !_this.orderNoPassReason){
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
            _this.taskApplyList();
            _this.closeCheckOrder();
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 4
            });
            _this.closeCheckOrder();
          }
        })
      },
      getUserScreenShot(type){
        let _this = this ;
        _this.passId =type;
        api.getUserScreenShot({
          id:type
        }).then(res=>{
          if (res.status){
            _this.approvalPop = true;
            _this.userScreenShotImg =res.data;
          }else {
            _this.$Message.error(res.msg)
          }
        })
      }
    },
  }
</script>
