<template>
  <div class="activity-management">
    <!--活动管理-->
    <div v-show="showContent === 'manage'">
      <div class="activity-title pl-10">试用活动管理</div>
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
          </Checkbox-group>
        </div>
        <div class="left">
          <Checkbox-group v-model="settlementStatusList" @on-change="checkAllGroupChange">
            <Checkbox label="waiting_settlement">
              <span>待申请结算</span>
            </Checkbox>
            <Checkbox label="waiting_audit">
              <span>结算待审核</span>
            </Checkbox>
            <Checkbox label="settlement_finished">
              <span>已结算</span>
            </Checkbox>
          </Checkbox-group>
        </div>
      </div>
      <div class="activity-table">
        <table>
          <thead>
          <tr>
            <th width="20%">活动标题</th>
            <th width="20%">活动开始/结束时间</th>
            <th width="12%">活动状态</th>
            <th width="12%">报名/已通过</th>
            <th width="12%">可审批名额</th>
            <th width="12%">存入担保金</th>
            <th width="12%">操作</th>
          </tr>
          </thead>
          <tbody v-for="item in taskList" :key="item.id">
          <tr>
            <td>
              <img class="left ml-10" :src="item.taskMainImage" :alt="item.taskName">
              <span class="img-title left">{{item.taskName}}</span>
            </td>
            <td>
              <p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
              <p class="mt-10">
                {{(item.upLineTime ? (item.upLineTime + item.taskDaysDuration * 3600 * 24) : item.upLineTime) | dateFormat('YYYY-MM-DD hh:mm:ss')}}
              </p>
            </td>
            <td>{{item.taskStatusDesc}}</td>
            <td class="registration">{{item.showkerApplyTotalCount}} / {{item.showkerApplySuccessCount}}（人）</td>
            <td>{{item.taskCount}}</td>
            <td>
              {{!item.pinkage ? (item.itemPrice / 100 + 10) * item.taskCount : item.itemPrice / 100 * item.taskCount}}
            </td>
            <td v-if="item.taskStatus !== 'under_way'">
              <p class="del-edit">
                <span class="mr-10" @click="editTask(item.id)">编辑</span>
                <span @click="deleteTask(item.id)">删除</span>
              </p>
              <p class="bond mt-6">
                <span>存担保金</span>
              </p>
              <p class="copy mt-6">
                <span>复制活动</span>
              </p>
            </td>
            <td v-else>
              <p class="bond mt-6">
                <span @click="approveGuest(item.id)">审批秀客</span>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="activity-page mt-20 right mr-10">
        <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
      </div>
      <Modal v-model="deleteModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此任务删除后，任务将无法执行。</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" long :loading="modalLoading" @click="confirmDelete">删除</iButton>
        </div>
      </Modal>
    </div>
    <!--审批秀客-->
    <div v-show="showContent === 'approve'">
      <div class="activity-title pl-10">
        <span class="left">审批秀客</span>
        <span class="right" @click="ReturnManagePage('manage')">返回上一页</span>
      </div>
      <div class="approve-manage-info mt-12">
        <div class="manage-info-con clear">
          <div class="manage-img left">
            <img src="" alt="">
          </div>
          <div class="manage-text left ml-5">
            <p>宠物狗衣服狗狗猫咪衣服棉袜狗脚</p>
            <p class="mt-15">总份数<strong>&nbsp;2&nbsp;</strong>，<strong>&nbsp;0&nbsp;</strong>人正在参与试用，<strong>&nbsp;0&nbsp;</strong>人完成试用，剩余名额<strong>&nbsp;2&nbsp;</strong>个
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
            <iSelect v-model="shokeyName" style="width: 120px;margin-right: 12px;">
              <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
            </iSelect>
            <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
            <iButton type="primary">搜索</iButton>
            <div class="activity-table mt-20">
              <table>
                <thead>
                <tr>
                  <th width="20%">秀客名称</th>
                  <th width="20%">淘宝账号（旺旺号）</th>
                  <th width="20%">申请时间</th>
                  <th width="20%">已完成试用次数</th>
                  <th width="20%">操作</th>
                </tr>
                </thead>
                <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
                <tr>
                  <td>{{item.showkerName}}</td>
                  <td>{{item.alitmAccount}}</td>
                  <td>{{item.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
                  <td class="registration">{{item.task.showkerApplySuccessCount}}</td>
                  <td>
                    <p class="del-edit">
                      <span class="mr-10" @click="showkePassAudit(item.id,'passAudit')">通过</span>
                      <span @click="showkeFailAudit(item.id,'failAudit')">不通过</span>
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
          <!--已通过-->
          <div class="fail-audit mt-20" v-show="showApproveStatus === 'passAudit'">
            <iSelect v-model="shokeyName" style="width: 120px;margin-right: 12px;">
              <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
            </iSelect>
            <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
            <span>订单编号：</span>
            <iInput v-model="searchOrderNumber" style="width: 160px;margin-right: 8px;"></iInput>
            <iButton type="primary">搜索</iButton>
            <div class="clear mt-20">
              <div class="left mr-10" style="margin-top: 2px;">
                <Checkbox
                  :value="checkAllByPass"
                  @click.prevent.native="handleCheckPassAll">所有
                </Checkbox>
              </div>
              <div class="left">
                <Checkbox-group v-model="checkPassList" @on-change="checkPassChange">
                  <Checkbox label="香蕉">
                    <span>已通过待领取</span>
                  </Checkbox>
                  <Checkbox label="苹果">
                    <span>订单号待审核</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>已下订单待交试用报告</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>报告待确认</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>试用完成</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>订单号有误</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>报告不合格</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>待返款</span>
                  </Checkbox>
                </Checkbox-group>
              </div>
            </div>
            <div class="activity-table mt-20">
              <table>
                <thead>
                <tr>
                  <th width="20%">秀客名称</th>
                  <th width="20%">淘宝账号（旺旺号）</th>
                  <th width="20%">状态</th>
                  <th width="20%">订单号</th>
                  <th width="20%">操作</th>
                </tr>
                </thead>
                <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
                <tr>
                  <td>{{item.showkerName}}</td>
                  <td>{{item.alitmAccount}}</td>
                  <td>{{item.applyTime}}</td>
                  <td class="registration">{{item.task.showkerApplySuccessCount}}</td>
                  <td>
                    <p class="del-edit">
                      <span @click="editTask(item.id)">审核订单号</span>
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
          <!--已终止-->
          <div class="pass-audit mt-20" v-show="showApproveStatus === 'failAudit'">
            <iSelect v-model="shokeyName" style="width: 120px;margin-right: 12px;">
              <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
            </iSelect>
            <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
            <span>订单编号：</span>
            <iInput v-model="searchOrderNumber" style="width: 160px;margin-right: 8px;"></iInput>
            <iButton type="primary">搜索</iButton>
            <div class="clear mt-20">
              <div class="left mr-10" style="margin-top: 2px;">
                <Checkbox
                  :value="checkAllByFail"
                  @click.prevent.native="handleCheckFailAll">所有
                </Checkbox>
              </div>
              <div class="left">
                <Checkbox-group v-model="checkFailList" @on-change="checkFailChange">
                  <Checkbox label="香蕉">
                    <span>逾期系统终止</span>
                  </Checkbox>
                  <Checkbox label="苹果">
                    <span>试客放弃试用</span>
                  </Checkbox>
                  <Checkbox label="西瓜">
                    <span>管理员终止/商家终止</span>
                  </Checkbox>
                </Checkbox-group>
              </div>
            </div>
            <div class="activity-table mt-20">
              <table>
                <thead>
                <tr>
                  <th width="16%">秀客名称</th>
                  <th width="16%">淘宝账号（旺旺号）</th>
                  <th width="16%">订单号</th>
                  <th width="16%">试用状态</th>
                  <th width="20%">终止时间</th>
                  <th width="16%">终止原因</th>
                </tr>
                </thead>
                <tbody v-if="approveTableList.length > 0" v-for="item in approveTableList" :key="item.id">
                <tr>
                  <td>{{item.showkerName}}</td>
                  <td>{{item.alitmAccount}}</td>
                  <td>{{item.applyTime}}</td>
                  <td>{{item.task.showkerApplySuccessCount}}</td>
                  <td>{{item.showkerName}}</td>
                  <td>{{item.showkerName}}</td>
                </tr>
                </tbody>
                <tbody v-if="approveTableList.length === 0">
                <tr>
                  <td colspan="6" width="100%">暂无数据</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="check-order-model" v-show="showCheckOrder">
          <div class="check-order-con">
            <i class="right" @click="closeCheckOrder">&times;</i>
            <p class="mt-40">为了防止不良秀客冒领担保金，请您仔细核对下面的订单号是否与你店铺宝贝的交易订单号一致！</p>
            <p class="mt-22">
              <span>订单号：</span>
              <span class="main-color">1313246546546</span>
            </p>
            <p class="mt-15">
              <span>秀客实付金额：<span class="main-color">110</span>元<span>（当前每单试用保证金100元）</span></span>
            </p>
            <div class="mt-22">
              <Radio-group v-model="orderReviewStatus">
                <Radio label="pass" style="margin-right: 32px;">
                  <span style="font-size: 16px;">通过</span>
                </Radio>
                <Radio label="no_pass">
                  <span style="font-size: 16px;">不通过</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="no-pass-reason mt-22" v-show="orderReviewStatus === 'no_pass'">
              <iInput v-model="orderNoPassReason" placeholder="请填写不通过理由，如订单号不符或实付金额不符" style="width: 420px"></iInput>
            </div>
            <div class="true-btn" v-show="orderReviewStatus === 'no_pass'">确认</div>
            <div class="true-btn" v-show="orderReviewStatus === 'pass' && securityMoney >= orderMoney" @click="openRefundModel">确认</div>
            <PayModel v-show="orderReviewStatus === 'pass' && securityMoney < orderMoney" :orderMoney="orderMoney" @confirmPayment="confirmPayment" :payButtonText="payButtonText" :rechargeButtonText="rechargeButtonText" style="margin-top: 120px;">
                <div slot="isBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该秀客实付金额大于试用保证金，</span></span>需要补充担保金<strong
                  class="main-color">{{Math.abs(securityMoney - orderMoney)}}</strong>元
                </div>
                <div slot="noBalance" class="title-tip">
                <span class="size-color3">
                <Icon color="#FF2424" size="18" type="ios-information"></Icon>
                <span class="ml-10">注意：该秀客实付金额大于试用保证金，</span></span>需要补充担保金<strong
                  class="main-color">{{Math.abs(securityMoney - orderMoney)}}</strong>元,请充值！
                </div>
              </PayModel>
          </div>
        </div>
      </div>
    </div>
    <!--试用报告-->
    <div v-show="showContent === 'report'">
      <div class="activity-title pl-10">
        <span class="left">******的试用报告</span>
        <span class="right" @click="ReturnManagePage('approve')">返回上一页</span>
      </div>
      <div class="report-info mt-12">
        <div class="manage-info-con clear">
          <div class="manage-img left">
            <img src="" alt="">
          </div>
          <div class="manage-text left ml-5">
            <p>宠物狗衣服狗狗猫咪衣服棉袜狗脚</p>
            <p class="mt-15">总份数<strong>&nbsp;2&nbsp;</strong>，宝贝单价<strong>&nbsp;2&nbsp;</strong>元</p>
          </div>
        </div>
        <div class="order-info mt-6">
          <p>
            <span>订单号：</span>
            <strong>123456788</strong>
          </p>
          <p>
            <span>订单金额：</span>
            <strong>2</strong>
            <span>元</span>
          </p>
          <p>
            <span>订单状态：</span>
            <strong>报告待确认</strong>
            <span class="main-color">（0天24小时0时0分）</span>
          </p>
        </div>
        <div class="trial-experience mt-20">
          <div class="trial-experience-title">试用过程与体验：</div>
          <div
            class="trial-experience-con mt-22">独立访客撒了会计法撒开龙卷风拉萨附近开了撒就分开了撒娇地方卢萨卡就分开了撒酒疯离开撒酒疯拉萨附近拉萨减肥萨拉；福利卡减肥拉萨空间法拉盛看风景撒了附近；老师、附近啊；附近爱上；冷风机啊、龙卷风按时交付了；按时交付；</div>
          <div class="trial-experience-title mt-22">试用图片：</div>
          <div class="trial-img-info">
            <div class="trial-img">
              <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
            </div>
            <ul class="trial-img-list clear mt-22">
              <li>
                <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
              </li>
              <li>
                <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
              </li>
              <li>
                <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
              </li>
              <li>
                <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
              </li>
              <li>
                <img src="~assets/img/case-demo/taobao-account-info.png" alt="">
              </li>
            </ul>
            <span class="left-btn"><Icon type="chevron-left" size="32" color="#999"></Icon></span>
            <span class="right-btn"><Icon type="chevron-right" size="32" color="#999"></Icon></span>
          </div>
          <div class="check-trial mt-40">
            <div class="select-check">
              <Radio-group v-model="trialCheckStatus">
                <Radio label="pass" style="margin-right: 32px;">
                  <span style="font-size: 16px;">通过</span>
                </Radio>
                <Radio label="no_pass">
                  <span style="font-size: 16px;">不通过</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="no-pass-reason mt-22" v-show="trialCheckStatus === 'no_pass'">
              <iInput v-model="noPassReason" placeholder="请填写不通过的理由，以便秀客修改" style="width: 420px"></iInput>
            </div>
            <div class="true-btn" v-show="trialCheckStatus === 'no_pass'">确认</div>
            <div class="true-btn" v-show="trialCheckStatus === 'pass'" @click="openRefundModel">确认</div>
            <div class="remind mt-22 clear">
              <div class="left mr-10">
                <Icon type="alert-circled" color='#f60' size="36"></Icon>
              </div>
              <div class="left remind-con">
                <p>通过试用报告需要支付秀客保证金，不通过报告则将报告退回，交给秀客重新修改！</p>
                <p>您还有&nbsp;
                  <time-down color='#ff4040' :fontWeight=600></time-down>&nbsp;进行审核，若该时间内未审核，系统将默认审核通过，开始给秀客返款！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm-refund-model" v-if="showRefundModel">
        <div class="confirm-refund-con">
          <i class="right mr-10" @click="closeRefundModel">&times;</i>
          <div class="confirm-refund-info mt-20">
            <p>
              <span>秀客返款：</span>
              <span>宠物衣服狗狗猫咪衣服</span>
            </p>
            <p class="mt-8">
              <span>返款金额：</span>
              <strong>2</strong>
              <span>元</span>
            </p>
          </div>
          <div class="input-pwd mt-22 ml-35">
            <span>请输入您的支付密码：</span>
            <iInput v-model="refundPayPwd" type="password" style="width: 160px;margin-right: 16px;"></iInput>
            <iButton type="primary">确认</iButton>
          </div>
          <div class="refund-tip ml-35 mt-22">
            <p>如果您的支付密码没有修改，那么支付密码与登陆密码一致。</p>
            <p class="mt-6">为了账户安全，建议您另外设置一个密码！
              <router-link to="">修改支付密码</router-link>
            </p>
          </div>
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

  export default {
    name: 'ActivityManagement',
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
      PayModel:PayModel
    },
    data() {
      return {
        showContent: 'manage',
        showApproveStatus: 'toAudit',
        deleteModal: false,
        modalLoading: false,
        taskId: null,
        taskList: null,
        checkAll: false,
        checkAllByPass: false,
        checkAllByFail: false,
        taskStatusList: [],
        settlementStatusList: [],
        checkPassList: [],
        checkFailList: [],
        taskData: {},
        totalElements: null,
        pageIndex: 1,
        approvePageIndex: 1,
        pageSize: 5,
        shokeyName: null,
        searchValue: null,
        searchOrderNumber: null,
        approveTableList: [],
        SelectList: [
          {
            value: 'name',
            label: '试客名称'
          },
          {
            value: 'account',
            label: '淘宝会员名'
          }
        ],
        showCheckOrder:true,
        trialCheckStatus: 'pass',
        noPassReason: null,
        orderEndTime: null,
        trialEndTime: null,
        showRefundModel: false,
        refundPayPwd: null,
        orderReviewStatus: 'pass',
        orderNoPassReason: null,
        orderMoney:110,
        securityMoney:100,
        payButtonText:'确认支付并通过',
        rechargeButtonText:'确认支付并通过',
      }
    },
    mounted() {
    },
    created() {
      this.getTaskList();
    },
    computed: {},
    methods: {
      editTask(id) {
        this.$router.push({name: 'TaskReleaseProcess', query: {taskId: id}})
      },
      getTaskList() {
        let _this = this;
        api.getTaskList({
          taskStatusList: JSON.stringify(_this.taskStatusList),
          settlementStatusList: JSON.stringify(_this.settlementStatusList),
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize
        }).then(res => {
          if (res.status) {
            _this.taskData = res.data;
            _this.totalElements = res.data.taskPage.totalElements;
            _this.taskList = res.data.taskPage.content;
          }
        })
      },
      deleteTask(id) {
        this.deleteModal = true;
        this.taskId = id;
      },
      confirmDelete() {
        let _this = this;
        _this.modalLoading = true;
        api.deleteTask({
          taskId: this.taskId
        }).then(res => {
          if (res.status) {
            _this.deleteModal = false;
            _this.modalLoading = false;
            setTimeout(function () {
              _this.$Message.success('任务删除成功');
            }, 500);
            _this.getTaskList();
          } else {
            _this.deleteModal = false;
            _this.modalLoading = false;
            _this.$Message.error("抱歉，任务删除失败！");
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
          this.taskStatusList = ['waiting_pay', 'waiting_audit', 'waiting_modify', 'under_way', 'finished'];
          this.settlementStatusList = ['waiting_settlement', 'waiting_audit', 'settlement_finished'];
          this.getTaskList();
        } else {
          this.taskStatusList = [];
          this.settlementStatusList = [];
        }
      },
      handleCheckPassAll() {

      },
      handleCheckFailAll() {

      },
      checkAllGroupChange() {
        if (this.settlementStatusList.length === 3 && this.taskStatusList.length === 5) {
          this.checkAll = true;
        } else if (this.settlementStatusList.length > 0 || this.taskStatusList.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
        this.getTaskList();
      },
      checkPassChange() {

      },
      checkFailChange() {

      },
      ReturnManagePage(type) {
        this.showContent = type
      },
      approveGuest(taskId) {
        this.showContent = 'approve';
        this.taskId = taskId;
        this.taskApplyList();
      },
      changeTitle(type) {
        this.showApproveStatus = type;
        this.taskApplyList();
      },
      taskApplyList() {
        api.getTaskApplyList({
          taskId: this.taskId,
          status: this.showApproveStatus,
          pageIndex: this.approvePageIndex,
        }).then(res => {
          let _this = this;
          if (res.status) {
            _this.approveTableList = res.data.content;
          }
        })
      },
      showkePassAudit(id, status) {
        this.setShoukeAudit(id, status);
      },
      showkeFailAudit(id, status) {
        this.setShoukeAudit(id, status);
      },
      setShoukeAudit(id, status) {
        let _this = this;
        api.setTaskShoukeAudit({
          id: id,
          status: status
        }).then(res => {
          if (res.status) {
            _this.$Message("审核秀客成功！");
            _this.taskApplyList();
          } else {
            _this.$Message(res.msg)
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
      confirmPayment() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .activity-management {
    .main-color {
      color: $mainColor;
    }
    .activity-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
      span {
        display: inline-block;
      }
      span:last-child {
        font-size: 12px;
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .activity-title-s {
      height: 52px;
      line-height: 52px;
      @include sc(14px, #666);
      border-bottom: 2px solid #F6F6F6;
      span {
        color: $mainColor;
      }
    }
    .select-status {
      height: 52px;
      line-height: 52px;
    }
    .activity-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }
    .activity-table table td,
    .activity-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    .activity-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .activity-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .activity-table table td img {
      width: 54px;
      height: 54px;
    }
    .activity-table table td .img-title {
      display: inline-block;
      width: 132px;
      height: 54px;
      padding-left: 10px;
      text-align: left;
    }
    .activity-table table td.registration {
      color: #2b85e4;
    }
    .activity-table table td .del-edit span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .del-edit span:last-child {
      color: #2b85e4;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .activity-table table td .bond span {
      color: $mainColor;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken($mainColor, 10%);
      }
    }
    .activity-table table td .copy span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .approve-manage-info {

    }
    .manage-img img {
      @include wh(54px, 54px)
    }
    .manage-info-con {
      padding: 15px 0 15px 10px;
      height: 88px;
      background-color: #F8F8F8;
    }
    .manage-text {
      color: #000;
      strong {
        color: $mainColor;
      }
    }
    .approve-list-title {
      height: 32px;
      border-bottom: 2px solid $mainColor;
      span {
        display: inline-block;
        line-height: 32px;
        @include sc(14px, #000);
        width: 114px;
        text-align: center;
        cursor: pointer;
      }
      .isSelect {
        background-color: $mainColor;
        color: #fff;
      }
    }
    .order-info {
      padding: 10px 0 16px 12px;
      background-color: #F8F8F8;
      p {
        margin-top: 6px;
      }
    }
    .trial-experience-con {
      color: #000;
      font-weight: 600;
      line-height: 24px;
    }
    .trial-img-info {
      @include wh(884px, 662px);
      border: 1px solid #F8F6F5;
      margin: 20px auto 0 auto;
      position: relative;
      .trial-img {
        @include wh(420px, 500px);
        margin: 26px auto 0 auto;
        img {
          @include wh(420px, 500px);
        }
      }
      .left-btn {
        position: absolute;
        top: 260px;
        left: 140px;
        cursor: pointer;
      }
      .right-btn {
        position: absolute;
        top: 260px;
        right: 140px;
        cursor: pointer;
      }
    }
    .trial-img-list {
      border: 1px solid #f8f6f5;
      margin: 24px 6px;
      padding: 8px 0;
      li {
        float: left;
        margin-left: 46px;
        cursor: pointer;
        img {
          @include wh(120px, 80px);
          border: 1px solid #f8f6f5;
        }
      }
    }
    .check-trial {
      text-align: center;
    }
    .true-btn {
      @include wh(120px, 32px);
      line-height: 32px;
      background-color: $mainColor;
      color: #fff;
      text-align: center;
      margin: 24px auto 0 auto;
      font-size: 14px;
      cursor: pointer;
      @include transition;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }
    .remind {
      width: 600px;
      margin: 24px auto 0 auto;
      .remind-con {
        text-align: left;
      }
    }
    .confirm-refund-model,
    .check-order-model {
      @include fullScreenModel;
    }
    .confirm-refund-con {
      @include fullScreenModelCon(552px, 286px);
      i {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .confirm-refund-info {
      @include wh(514px, 68px);
      padding: 12px 24px;
      background-color: #EEEEEE;
      margin: 46px auto 0 auto;
      p:first-child {
        span:first-child {
          color: #000;
        }
      }
      p:last-child {
        span {
          font-size: 16px;
          color: #000;
        }
        strong {
          font-size: 16px;
          color: #f60;
        }
      }
    }
    .refund-tip {
      color: #ACACAC;
    }
    .check-order-con {
      position: absolute;
      width: 600px;
      background-color: #fff;
      border-radius: 5px;
      left: 50%;
      margin-left: -300px;
      top: 30%;
      padding: 0 32px 26px 32px;
      text-align: center;
      i {
        font-size: 24px;
        cursor: pointer;
      }
      > p:nth-child(2) {
        span {
          font-size: 16px;
        }
      }
      > p:nth-child(3) {
        font-size: 14px;
      }
    }
    .title-tip {
      height: 36px;
      line-height: 36px;
      margin: 20px auto 20px auto;
      color: #000;
      background-color: #FFF6F3;
      font-size: 14px;
    }
  }

</style>
