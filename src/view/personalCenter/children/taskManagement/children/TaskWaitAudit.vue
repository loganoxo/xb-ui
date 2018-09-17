<template>
  <div class="mt-20">
    <div class="prompt">
      <icon type="md-alert"/>
      <span> 亲，请记得在活动结束前审批拿手哦，如果活动结束后48小时内仍未审批满，系统将自动按申请时间审批剩余名额！</span>
    </div>
    <div class="store-list pt-20 pb-20">
      <i-select v-model="selectedStore" style="width:170px;" placeholder="全部店铺" :filterable="true" @on-change="filterStore">
        <i-option v-for="(item,index) in storeList" :key="index" :value="item">{{item}}</i-option>
      </i-select>
    </div>
    <div class="search-list">
      <span>淘宝会员名：</span>
      <i-input v-model="alitmAccount" style="width: 100px;margin-right: 8px;"/>
      <span class="ml-10">活动编号：</span>
      <i-input v-model="taskNumber" style="width: 140px;margin-right: 8px;"/>
      <span class="ml-10">旺旺号信用等级大于等于：</span>
      <i-select v-model="wwFormValidate.creditLevel" style="width: 130px;" placeholder="不限">
        <i-option v-for="(item, index) in aliLevelList" :label='item.label'
                  :value="item.value" :key="item.value">
          <span v-show="index === 0">{{item.text}}</span>
          <img v-show="index !== 0" :src="item.text" alt="淘宝旺旺等级">
        </i-option>
      </i-select>
      <span class="ml-10">淘气值范围：</span>
      <i-select v-model="wwFormValidate.tqz" style="width: 120px;" placeholder="不限">
        <i-option v-for="item in aliTqzList" :label='item.label' :value="item.value" :key="item.value">
          {{item.label}}
        </i-option>
      </i-select>
      <i-button class="ml-10" type="primary" :loading="searchLoading" @click="searchAuditTask">搜索</i-button>
    </div>
    <div class="mt-10 mb-10">
      <span v-show="eyesStatus === 'off'" class="fire-eye-off" @click="changeEyesStatus('on')"><icon type="eye-disabled" size="16"/>&nbsp;火眼金睛</span>
      <span v-show="eyesStatus === 'off'" class="ml-10 cl999">打开火眼金睛，拿手数据一目了然！</span>
      <span v-show="eyesStatus === 'on'" class="fire-eye-on" @click="changeEyesStatus('off')"><icon type="eye" size="16"/>&nbsp;火眼金睛</span>
      <span v-show="eyesStatus === 'on' && !valueAddedServiceStatusInfo.isMemberOK" class="ml-10 cl999">距离服务结束还有&nbsp;<time-down v-if="valueAddedServiceStatusInfo.vasBlackListDeadlineTime" :endTime="valueAddedServiceStatusInfo.vasBlackListDeadlineTime" timeEndText="服务已到期" @timeEnd="timeEnd"/></span>
      <!--<span v-show="eyesStatus === 'on' && !valueAddedServiceStatusInfo.isMemberOK" class="blue text-decoration-underline ml-10 cursor-p" @click="renewalEyes">续费</span>-->
      <span v-show="eyesStatus === 'on' && valueAddedServiceStatusInfo.isMemberOK" class="ml-10 cl999">VIP免费使用火眼金睛功能 ^_^  </span>
    </div>
    <template v-if="taskWaitAuditList.length > 0">
      <div class="mt-12 pos-rel" v-for="(item,index) in taskWaitAuditList" :key="item.id">
        <div class="collapse-header clear" @click="collapseToggle(item.id,index)" :class="{noBorderRadius:selectId}">
          <div class="manage-img left">
            <img :src="item.taskMainImage | imageSrc('!thum54')" alt="活动主图">
            <span v-if="item.zone === 'certainly_hit'" class="certainly-hit-tip">推荐必中</span>
          </div>
          <div class="manage-text">
            <p>活动编号：{{item.number}}</p>
            <p>活动名称：{{item.taskName}}</p>
            <p>参与概况：总份数<span class="main-color">{{item.taskCount || 0}}</span>，
              <span class="main-color">{{item.trailOn || 0}}</span>人正在参与活动，<span class="main-color">{{item.trailDone || 0}}</span>人完成活动，剩余名额<span
                class="main-color">{{item.residueCount || 0}}</span>个 <i-button v-if="item.taskStatus === 'under_way' && !item.speedUp" type="primary" size="small" @click.stop="taskAdditionalQuota(item)">追加名额</i-button>
            </p>
          </div>
          <icon :class="{'show-table-styles' : selectId === item.id}" class="right mt-20 mr-5" size="20" type="md-arrow-dropright"/>
          <div class="right">
            <div class="waiting-task-number-wait">
              <p class="task-wait-fail">新增待审批<span>{{item.newestTaskApplyCount || 0}}</span>人</p>
              <p class="task-wait-fail">共有待审批<span>{{item.totalTaskApplyCount || 0}}</span>人</p>
            </div>
            <i-button v-if="item.taskStatus === 'under_way' && !item.speedUp && item.zone !== 'coin_earn'" type="error" @click.stop="openSpeedUp(item.id, item.userId)"><span class="mr-5">一键加速</span>
              <tooltip class="vtc-text-btm" style="line-height: 0" content="启用后，系统会匹配拿手进行审核，无需商家干预" placement="top">
                <icon type="help-circled" size="14" color="#fff"/>
              </tooltip>
            </i-button>
          </div>
        </div>
        <collapse-transition>
          <div class="task-table" v-show="selectId === item.id">
            <table>
              <thead>
              <tr>
                <th width="20%" class="pt-10 pb-10">
                  <p class="mb-5">淘宝账号（旺旺号）</p>
                  <i-button :class="[sortList.select === item.sortField ? 'ww-active' : '']" size="small" v-for="(item,index) in sortList.defaultList" :key="index" @click="sortChange(item.sortField,index)">
                    <span>{{item.name}}</span>
                    <icon :type="item.sort === 'desc' ? 'md-arrow-round-down' : 'md-arrow-up'"/>
                  </i-button>
                </th>
                <th width="20%">申请时间/IP地址</th>
                <th width="20%">拿手活动概况</th>
                <th width="20%">流程状态</th>
                <th width="20%">操作</th>
              </tr>
              </thead>
              <tbody v-for="allTask in item.applyAllTask" :key="allTask.id">
              <tr :class="{readBackground:allTask.newest}">
                <td>
                  <tooltip v-if="allTask.freshmanCheck" content="多给新人一点机会吧，他们可是很认真的 ^_^" placement="top">
                    <img src="/static/img/icon/newman.png">
                  </tooltip>
                  <div class="inline-block account-info">
                    <p>{{allTask.alitmAccount}}</p>
                    <img v-if="allTask.creditLevel" :src="allTask.creditLevel" alt="淘宝等级LOGO">
                    <p v-else>淘宝等级未知</p>
                    <p>淘气值：{{allTask.tqz}}</p>
                    <div class="value-added-info" v-if="!eyesServerPermissions">
                      <p>
                        <span>平台拉黑情况：</span>
                        <span class="cursor-p blue" @click="changeEyesStatus">
                        <tooltip content="打开火眼金睛，拿手数据一目了然！"><icon class="vtc-text-btm" type="eye-disabled" size="16"/>&nbsp;查看</tooltip>
                      </span>
                      </p>
                    </div>
                    <div class="value-added-info" v-if="eyesStatus === 'on'">
                      <p>
                        <span>平台拉黑情况：</span>
                        <span v-if="allTask.blackCount === 0 || allTask.blackCount < 4" class="blue text-decoration-underline">0</span>
                        <span v-else class="blue text-decoration-underline cursor-p" @click="lookBlackListInfo(allTask.alitmAccount, allTask.showkerId, allTask.creditLevel, allTask.tqz)">{{allTask.blackCount || 0}}</span>
                      </p>
                      <!-- <p class="mt-5">
                         <span>被平台商家打标：</span>
                         <span v-if="allTask.tagCount === 0" class="blue text-decoration-underline">0</span>
                         <span v-else class="blue text-decoration-underline cursor-p">{{allTask.tagCount || 0}}</span>
                       </p>-->
                    </div>
                  </div>
                </td>
                <td>
                  <p>{{allTask.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
                  <p class="mt-10">{{filterIp(allTask.regIp)}}</p>
                  <p class="mt-10" v-if="allTask.regIp && allTask.ipInfo">{{allTask.ipInfo.province}}-{{allTask.ipInfo.city}}-{{allTask.ipInfo.takeDistrict}}</p>
                  <p class="mt-10" v-if="!allTask.ipInfo">归属地未知</p>
                </td>
                <td class="registration">
                  <p class="mt-5 cl666" v-cloak>近七天通过次数：{{allTask.applySuccessCount7Days || 0}}</p>
                  <p v-cloak class="mt-5 mb-5" :style="{color: orderNumberColorTip(allTask.orderCount7Days)}">近七天下单次数：{{allTask.orderCount7Days || 0}}</p>
                  <a @click="openNewTrialReportFunc(encryptionId(allTask.showkerId))">查看TA的买家秀</a>
                  <p class="text-ct showker-tag mt-5">
                    <tooltip content="在客服引导下完成新人认证考试" placement="top">
                      <span v-show="allTask.examDone" class="mr-5">新人考试</span>
                    </tooltip>
                    <tooltip content="严格按照商家要求完成5个活动" placement="top">
                      <span v-show="allTask.trialDone" class="ml-5">五单出师</span>
                    </tooltip>
                  </p>
                </td>
                <td class="pos-rel">
                  <tooltip v-if="allTask.reason && allTask.status === 'waiting_resubmit'" :content="allTask.reason" placement="top" class="cursor-p">
                    <icon color="#f9284f" type="md-alert"/>
                    <span class="main-color">{{getStatusInfo(allTask.status)}}</span>
                  </tooltip>
                  <span v-else>{{getStatusInfo(allTask.status)}}</span>
                  <tooltip v-if="allTask.checkTag" placement="top" class="conformity" content="该旺旺号符合您的标签设置">
                    <img src="~assets/img/common/conformity-logo.png" alt="标签合格标志">
                  </tooltip>
                </td>
                <td>
                  <p class="del-edit">
                    <span class="ml-5" @click="checkShowkerApply(item.id, allTask.showkerId, allTask.id, allTask.applySuccessCount7Days)">通过</span>
                    <tooltip placement="top" content="加入黑名单后该用户将无法申请你发布的活动">
                      <span class="ml-5" @click="addToBlackListFun(allTask.alitmAccount)">加入黑名单</span>
                    </tooltip>
                    <span v-if="allTask.newest" class="ml-5" @click="markRead(item.id, allTask.id)">设为已读</span>
                  </p>
                </td>
              </tr>
              </tbody>
              <tbody>
              <tr>
                <td colspan="5">
                  <page :total="taskTotalElements" :page-size="taskPageSize" :current="taskPageIndex" @on-change="taskPageChange"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </collapse-transition>
      </div>
    </template>
    <div v-if="dataStatusTip" class="mt-40 text-ct">{{dataStatusTip}}</div>
    <div class="activity-page mt-20 right" v-if="taskWaitAuditList && taskWaitAuditList.length > 0">
      <page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"/>
    </div>
    <!--添加黑名单弹框-->
    <add-to-black-list-modal :blackListInfo="addBlackListInfo" :closable="closableModal" :on-success="addSuccess" @change="blackListModalChange"/>
    <!--拉黑详情列表弹框-->
    <modal v-model="blackListInfoModel">
      <div class="mt-20 clear">
        <img v-if="blackListInfo.portraitPic" class="left border-radius-50 mr-10" width="48" height="48"
             :src="getUserHeardUrl(blackListInfo.portraitPic)" alt="用户头像">
        <div class="left">
          <p>{{blackListInfo.alitmAccount}}</p>
          <img :src="blackListInfo.creditLevel" alt="淘宝LOGO">
          <p>淘气值：{{blackListInfo.tqz}}</p>
        </div>
      </div>
      <table class="width-pct-100 text-ct lht30 mt-10 border-ddd">
        <thead class="bg-ddd">
        <tr>
          <th>拉黑原因</th>
          <th>拉黑次数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in blackListInfo.list" :key="index">
          <td class="border-ddd">{{item.name}}</td>
          <td class="border-ddd">{{item.count}}</td>
        </tr>
        </tbody>
      </table>
      <div slot="footer"></div>
    </modal>
    <!--订购火眼金睛功能弹框-->
    <modal v-model="orderEyesModel">
      <div class="text-ct" slot="header">
        <icon type="ios-cart" color="#f9284f" size="20"/>
        <span class="ml-5 fs-14 main-color">订购火眼金睛</span></div>
      <div class="mt-20">
        <i-button class="mr-20 select-period" v-for="item in eyesPeriodList" :key="item.id" @click="changeSelectPeriod(item.id, item.intervalFee)" :class="{'is-select': selectEyesPeriodInfo.id === item.id}">
          <div>{{item.frontDisplay}}</div>
          <div>￥ {{(item.intervalFee / 100).toFixed(2) || 0}} 元</div>
        </i-button>
      </div>
      <div class="text-ct">
        <i-button v-if="hasBalance" type="error" class="pl-40 pr-40 mt-20 fs-14" @click="eyesPayModel = true">立即购买</i-button>
        <i-button v-else type="error" class="pl-40 pr-40 mt-20 fs-14" @click="eyesPayModel = true">立即充值</i-button>
        <i-button v-if="hasTrialQualification" class="pl-40 pr-40 mt-20 fs-14 ml-20" @click="openTheTrial">开通一天试用</i-button>
      </div>
      <div slot="footer">
        <div class="text-lf text-indent f-b"><span class="main-color">火眼金睛</span>是平台增值服务功能，激活该功能后可查看平台拿手旺旺号的私密数据，如被商家拉黑的次数及原因，完成活动后收到的商家评价和打标，旺旺号姓别、年龄、地址、购物标签等（功能陆续开发添加中...），使用火眼金睛让你对拿手审核一百个放心！</div>
        <div class="text-ct mt-10 clear">
          <div class="left ml-120" @click="changeLookScreenShot(1)">
            <img class="border-radius-5 border-ddd cursor-p" src="~assets/img/task-management/eyes-demo-01.png"
                 alt="火眼金睛功能截图1" width="92" height="92">
            <p>功能截图1</p>
          </div>
          <div class="left ml-20" @click="changeLookScreenShot(2)">
            <img class="border-radius-5 border-ddd cursor-p" src="~assets/img/task-management/eyes-demo-02.png"
                 alt="火眼金睛功能截图2" width="92" height="92">
            <p>功能截图2</p>
          </div>
        </div>
      </div>
    </modal>
    <!--支付弹框-->
    <div class="pay-model" v-if="eyesPayModel">
      <pay-model ref="orderPayModel" :orderMoney="needRechargeMoney" :orderType="2"
                 :vasFeeId="selectEyesPeriodInfo.id" :isBalance="hasBalance" @orderVipSuccess="orderVipSuccess"
                 @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="eyesPayModel = false">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="size-color3">
            <icon color="#FF2424" size="16" type="md-alert"/>
            <span class="">亲，您的余额不足，请充值。</span>
          </span>还需充值
          <strong class="size-color3">{{(needRechargeMoney / 100).toFixed(2)}}</strong> 元。
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-10">您本次需要支付金额为 <span
            class="size-color3">{{(selectEyesPeriodInfo.fee / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </div>
    <!--查看火眼金睛功能截图弹框-->
    <modal v-model="lookScreenShotModel" :closable="false">
      <img v-if="lookScreenShot === 1" class="border-radius-5 border-ddd cursor-p"
           src="~assets/img/task-management/eyes-demo-01.png" width="100%" alt="火眼金睛功能截图1">
      <img v-if="lookScreenShot === 2" class="border-radius-5 border-ddd cursor-p"
           src="~assets/img/task-management/eyes-demo-02.png" width="100%" alt="火眼金睛功能截图2">
    </modal>
    <!--开启一键加速功能确认弹框-->
    <modal v-model="speedUpModal" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">一键加速</span>
      </p>
      <div class="text-ct">
        <p>启用后，该活动剩余名额将全部由系统进行匹配和审核，且无法修改，适合于需要快速消化单量的商家！</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="speedUpLoading" @click="speedUp">确认开启</iButton>
      </div>
    </modal>
    <!--追加活动名额弹框-->
    <task-additional-quota-modal v-model="additionalQuotaModal" :data="taskAdditionalQuotaInfo" @addTaskSuccess="addTaskSuccess"/>
    <!--检测拿手近期申请活动情况弹框-->
    <modal v-model="showkerApplyInfoModal" width="480">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p v-html="showkerApplyInfoModalText"></p>
      </div>
      <div class="clear" slot="footer">
        <i-button class="left ml-40 pl-40 pr-40" type="error" size="large" :loading="speedUpLoading" @click="taskWaitToPass(taskApplyId)">仍然通过</i-button>
        <i-button class="right mr-40 pl-40 pr-40" type="error" size="large" :loading="speedUpLoading" @click="taskWaitToReject(taskApplyId)">拒绝试用</i-button>
      </div>
    </modal>
    <!--普通会员使用火眼金睛功能提示升级会员弹框-->
    <modal v-model="upgradeMembershipModal" :closable="false" :mask-closable="false" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p class="fs-16">该功能仅限VIP 使用 : (</p>
        <p class="mt-5">是否现在升级您的会员版本？</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button class="mr-60" type="error" size="large" @click="upgradeVip">升级会员版本</i-button>
        <i-button size="large" @click="upgradeMembershipModal = false">我知道了</i-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import {Select, Option, Checkbox, Page, Icon, Button, Input, Tooltip, Modal} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import PayModel from '@/components/PayModel'
  import TimeDown from '@/components/TimeDown'
  import Upload from '@/components/Upload'
  import AddToBlackListModal from '@/components/AddToBlackListModal'
  import TaskAdditionalQuotaModal from '@/components/TaskAdditionalQuotaModal'
  import {taskErrorStatusList, encryption} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import commonConfig from '@/config/commonConfig'
  import api from '@/config/apiConfig'

  export default {
    name: 'task-wait-audit',
    components: {
      iSelect: Select,
      iOption: Option,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      Page: Page,
      iButton: Button,
      iInput: Input,
      Icon: Icon,
      Tooltip: Tooltip,
      Modal: Modal,
      CollapseTransition: CollapseTransition,
      PayModel: PayModel,
      TimeDown: TimeDown,
      Upload: Upload,
      AddToBlackListModal: AddToBlackListModal,
      TaskAdditionalQuotaModal: TaskAdditionalQuotaModal,
    },
    data() {
      return {
        wwFormValidate: {
          creditLevel: null,
          tqz: null,
        },
        aliLevelList: commonConfig.aliLevelList,
        aliTqzList: commonConfig.aliTqzList,
        searchLoading: false,
        taskWaitAuditList: [],
        totalElements: 0,
        taskTotalElements: 0,
        pageIndex: 1,
        taskPageIndex: 1,
        pageSize: 5,
        taskPageSize: 5,
        alitmAccount: null,
        taskNumber: null,
        operateTaskId: null,
        taskApplyId: null,
        operateIndex: null,
        selectId: null,
        showApprovalPop: false,
        approvalPopInfo: {
          approvalPop: false,
          applyName: null,
          userScreenShotImg: null,
          passId: null,
          activeEndTime: null,
          index: null,
        },
        sortList: {
          select: 'createTime',
          defaultList: [
            {
              name: '按等级',
              sortField: 'alitm.creditLevel',
              sort: 'desc',
            },
            {
              name: '按淘气值',
              sortField: 'alitm.tqz',
              sort: 'desc',
            },
          ]
        },
        sortD: null,
        orderBy: null,
        dataStatusTip: '',
        eyesStatus: 'off',
        eyesPayModel: false,
        blackListInfoModel: false,
        lookScreenShotModel: false,
        orderEyesModel: false,
        lookScreenShot: 2,
        eyesPeriodList: [],
        valueAddedServiceStatusInfo: {},
        selectEyesPeriodInfo: {
          id: 100,
          fee: 100
        },
        blackListInfo: [],
        speedUpInfo: {},
        speedUpModal: false,
        speedUpLoading: false,
        hasTrialQualification: false,
        isEndTime: false,
        storeList: [],
        selectedStore: '',
        realStoreName: '',
        closableModal: false,
        addBlackListInfo: {},
        additionalQuotaModal: false,
        taskAdditionalQuotaInfo: {},
        showkerApplyInfoModal: false,
        showkerApplyInfoModalText: null,
        upgradeMembershipModal: false,
      }
    },
    created() {
      this.appliesWaitingAuditTask();
      this.$store.dispatch('getPersonalTrialCount');
      this.getValueAddedServiceStatus();
      this.getStoreInfo();
    },
    computed: {
      /** 获取用户账户余额
       * @return {Number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /** 计算用户账户余额是否足够支付选购的增值服务版本价格（true: 余额足够， false: 余额不足）
       * @return {boolean}
       */
      hasBalance() {
        return this.getUserBalance >= this.selectEyesPeriodInfo.fee
      },

      /** 计算当用户账户余额不够的时候需要充值的金额
       * @return {Number}
       */
      needRechargeMoney() {
        let money = this.selectEyesPeriodInfo.fee - this.getUserBalance;
        return money > 0 ? money : 0;
      },

      /** 计算用户是否有火眼金睛增值服务权限（true: 有，false: 无）
       * @return {boolean}
       */
      eyesServerPermissions() {
         return !((!this.valueAddedServiceStatusInfo.isMemberOK && !this.valueAddedServiceStatusInfo.vasBlackListDeadlineTime) || this.isEndTime)
      },

      /** 获取拿手近7天通过次数限制配置
       * @return {number}
       */
      showkerApplySuccessCount7Limit() {
        return this.$store.getters.getSysConfigValue('showkerApplySuccessCount7Limit').configValue
      }
    },
    methods: {
      changeLookScreenShot(num) {
        this.lookScreenShotModel = true;
        this.lookScreenShot = num;
      },
      openNewTrialReportFunc(id) {
        window.open('/trial-report?q=' + id)
      },
      upgradeVip() {
        this.$router.push({path: '/user/vip-member/order'})
      },
      blackListModalChange(value) {
        this.closableModal = value;
        this.addBlackListInfo = {};
      },
      orderNumberColorTip(num) {
        if (num < 10) {
          return `green`
        } else if (num >= 10 && num <= 20) {
          return `orange`
        } else {
          return `red`
        }
      },
      taskAdditionalQuota(item) {
        Object.assign(this.taskAdditionalQuotaInfo = {}, {
          taskId: item.id,
          taskMainImage: item.taskMainImage,
          taskName: item.taskName,
          taskCount: item.taskCount,
          trailOn: item.trailOn,
          trailDone: item.trailDone,
          residueCount: item.residueCount,
          totalTaskApplyCount: item.totalTaskApplyCount,
          pinkage: item.pinkage,
          itemPrice: item.itemPrice,
          orderQuantity: item.orderQuantity,
          activityCategory: item.activityCategory,
          promotionExpensesPaid: item.promotionExpensesPaid,
          vasFeePaid: item.vasFeePaid,
          tagVasFeePaid: item.tagVasFeePaid,
          redEnvelopeDeductionPaid: item.redEnvelopeDeductionPaid,
          itemReviewRequired: item.itemReviewRequired,
          keywordPlanNum: item.keywordPlanNum,
          isMoreKeywordsPlan: item.isMoreKeywordsPlan,
          searchKeywords: item.searchKeywords,
          autoAuditWaitHours: item.autoAuditWaitHours,
          finishTime: item.finishTime,
          endTime: item.endTime,
        });
        this.additionalQuotaModal = true;
      },
      addTaskSuccess() {
        // 追加份数成功后，因后端数据返回有延迟，需要延迟更新列表数据
        setTimeout(() => {
          this.appliesWaitingAuditTask()
        }, 200)
      },
      addSuccess() {
        this.appliesWaitingAuditAll(this.operateTaskId, this.operateIndex)
      },
      addToBlackListFun(wwName) {
        this.closableModal = true;
        this.addBlackListInfo.alitmAccount = wwName;
      },
      sortChange(name, index) {
        let sort = this.sortList.defaultList[index].sort;
        this.sortList.select = name;
        this.sortList.defaultList[index].sort = sort === 'desc' ? 'asc' : 'desc';
        this.sortD = sort === 'desc' ? 'asc' : 'desc';
        this.orderBy = name;
        this.appliesWaitingAuditAll(this.operateTaskId, this.operateIndex);
      },
      encryptionId(id) {
        return encryption(id)
      },
      getStatusInfo(status) {
        return taskErrorStatusList(status)
      },
      pageChange(data) {
        this.pageIndex = data;
        this.appliesWaitingAuditTask();
      },
      taskPageChange(data) {
        this.taskPageIndex = data;
        this.appliesWaitingAuditAll(this.operateTaskId, this.operateIndex);
      },
      searchAuditTask() {
        this.selectId = null;
        this.pageIndex = 1;
        this.appliesWaitingAuditTask();
      },
      checkShowkerApply(taskId, showkerId, taskApplyId, applySuccessCount7Days) {
        const _this = this;
        _this.taskApplyId = taskApplyId;
        if (applySuccessCount7Days >= _this.showkerApplySuccessCount7Limit * 1) {
          _this.showkerApplyInfoModal = true;
          _this.showkerApplyInfoModalText = '该用户近七天下单数较为频繁，请谨慎选择！'
        } else {
          api.merchantCheckShowkerApply({
            taskId: taskId,
            showkerId: showkerId,
          }).then(res => {
            if (res.status) {
              _this.showkerApplyInfoModal = true;
              _this.showkerApplyInfoModalText = `该用户在&nbsp;<span class="main-color">${res.data.daysAgo > 0 ? res.data.daysAgo + '天前' : '24小时'}</span>&nbsp;获得您该店铺的试用资格，${res.data.orderedIn30Days ? '并且已成功下单' : '但还未成功下单'}，是否仍然审批通过？`;
            } else {
              _this.taskWaitToPass(taskApplyId)
            }
          })
        }
      },
      taskWaitToPass(taskApplyId) {
        const _this = this;
        _this.speedUpLoading = true;
        api.setTaskShowkerPass({
          id: taskApplyId,
        }).then(res => {
          if (res.status) {
            _this.$Message.success('审核拿手成功！');
            _this.showkerApplyInfoModal = false;
            _this.$store.dispatch('getPersonalTrialCount');
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount -= 1
            }
            if (_this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount -= 1
            }
            if (_this.taskWaitAuditList[_this.operateIndex].residueCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].residueCount -= 1
            }
            _this.taskWaitAuditList[_this.operateIndex].trailOn += 1;
          } else {
            _this.$Message.error(res.msg)
          }
          _this.speedUpLoading = false;
        })
      },
      taskWaitToReject(taskApplyId) {
        const _this = this;
        _this.speedUpLoading = true;
        api.setTaskShowkerReject({
          taskApplyId: taskApplyId
        }).then(res => {
          if (res.status) {
            _this.$Message.success('拒绝拿手成功！');
            _this.showkerApplyInfoModal = false;
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount -= 1
            }
            if (_this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].totalTaskApplyCount -= 1
            }
          } else {
            _this.$Message.error(res.msg)
          }
          _this.speedUpLoading = false;
        })
      },
      appliesWaitingAuditTask() {
        const _this = this;
        _this.searchLoading = true;
        _this.dataStatusTip = '数据加载中';
        api.appliesWaitingAuditTask({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          taskNumber: _this.taskNumber,
          alitmAccount: _this.alitmAccount,
          tqz: _this.wwFormValidate.tqz,
          creditLevel: _this.wwFormValidate.creditLevel,
          realStoreName:_this.realStoreName
        }).then(res => {
          if (res.status) {
            _this.taskWaitAuditList = res.data.content;
            _this.dataStatusTip = _this.taskWaitAuditList.length === 0 ? '暂无待审批数据' : '';
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
          _this.searchLoading = false;
        })
      },
      appliesWaitingAuditAll(taskId, index) {
        const _this = this;
        _this.operateTaskId = taskId;
        _this.operateIndex = index;
        api.appliesWaitingAuditAll({
          taskId: taskId,
          alitmAccount: _this.alitmAccount,
          pageIndex: _this.taskPageIndex,
          tqz: _this.wwFormValidate.tqz,
          creditLevel: _this.wwFormValidate.creditLevel,
          orderBy: _this.orderBy,
          sortD: _this.sortD,
        }).then(res => {
          if (res.status) {
            if (res.data.content.length > 0) {
              _this.$set(_this.taskWaitAuditList[index], 'applyAllTask', res.data.content);
              _this.taskTotalElements = res.data.totalElements;
            } else {
              _this.taskWaitAuditList[index].applyAllTask = [];
              _this.selectId = null;
            }
          } else {
            if (res.statusCode === 'task_is_null') {
              _this.appliesWaitingAuditTask();
              _this.selectId = null;
            } else {
              _this.$Message.error(res.msg)
            }
          }
        })
      },
      markRead(taskId, taskApplyId) {
        const _this = this;
        api.waitingAuditNewestMarkRead({
          taskId: taskId,
          taskApplyId: taskApplyId
        }).then(res => {
          if (res.status) {
            _this.$Message.success("设置新增待审批已读成功！");
            _this.$store.dispatch('getPersonalTrialCount');
            _this.appliesWaitingAuditAll(_this.operateTaskId, _this.operateIndex);
            if (_this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount > 0) {
              _this.taskWaitAuditList[_this.operateIndex].newestTaskApplyCount -= 1;
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      collapseToggle(id, index) {
        this.taskPageIndex = 1;
        if (this.selectId === id) {
          this.selectId = null;
        } else {
          this.selectId = id;
          this.appliesWaitingAuditAll(id, index)
        }
      },
      openOrderEyesModel() {
        if (this.eyesPeriodList.length === 0) {
          this.getValueAddedServicePeriod()
        }
        this.getEyeTrialQualification();
        this.orderEyesModel = true;
      },
      changeEyesStatus(status) {
        if ((!this.valueAddedServiceStatusInfo.isMemberOK && !this.valueAddedServiceStatusInfo.vasBlackListDeadlineTime) || this.isEndTime) {
          // this.openOrderEyesModel()
          this.upgradeMembershipModal = true
        } else {
          this.eyesStatus = status
        }
      },
      renewalEyes() {
        if (this.eyesPeriodList.length === 0) {
          this.getValueAddedServicePeriod()
        } else {
          this.orderEyesModel = true;
        }
      },
      getValueAddedServiceStatus() {
        const _this = this;
        api.valueAddedServiceStatus().then(res => {
          if (res.status) {
            _this.valueAddedServiceStatusInfo = {};
            _this.valueAddedServiceStatusInfo = res.data;
            if (_this.valueAddedServiceStatusInfo.isMemberOK || (!this.valueAddedServiceStatusInfo.isMemberOK && _this.valueAddedServiceStatusInfo.vasBlackListDeadlineTime)) {
              _this.eyesStatus = 'on'
            } else {
              _this.eyesStatus = 'off'
            }
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      getValueAddedServicePeriod() {
        const _this = this;
        api.valueAddedServicePeriodQuery({
          species: 1,
          provision: 'interval'
        }).then(res => {
          if (res.status) {
            _this.eyesPeriodList = res.data;
            _this.$nextTick(() => {
              _this.orderEyesModel = true;
            });
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      changeSelectPeriod(id, fee) {
        this.selectEyesPeriodInfo.id = id;
        this.selectEyesPeriodInfo.fee = fee;
      },
      confirmPayment(pwd) {
        const _this = this;
        api.buyValueAddedService({
          vasFeeId: _this.selectEyesPeriodInfo.id,
          payPwd: pwd,
          platform: 'pc'
        }).then(res => {
          if (res.status) {
            _this.$Message.success('支付成功！');
            _this.$store.dispatch('getUserInformation');
            _this.getValueAddedServiceStatus();
            _this.getEyeTrialQualification();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.orderEyesModel = false;
          _this.eyesPayModel = false;
          _this.$refs.orderPayModel.payLoading = false;
        })
      },
      orderVipSuccess() {
        this.orderEyesModel = false;
        this.eyesPayModel = false;
        this.getValueAddedServiceStatus();
        this.getEyeTrialQualification();
      },
      lookBlackListInfo(alitmAccount, userId, creditLevel, tqz) {
        const _this = this;
        api.blackListByAlitmAccount({
          alitmAccount: alitmAccount,
          userId: userId
        }).then(res => {
          if (res.status) {
            _this.blackListInfo = [];
            _this.blackListInfo = res.data;
            _this.blackListInfo.alitmAccount = alitmAccount;
            _this.blackListInfo.creditLevel = creditLevel;
            _this.blackListInfo.tqz = tqz;
            _this.$nextTick(() => {
              _this.blackListInfoModel = true;
            });
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      orderVip() {
        this.$router.push({name: 'VipMemberOrder'})
      },
      getUserHeardUrl(url) {
        if (url.indexOf('head-image') >= 0) {
          return aliCallbackImgUrl + url + '!orgi75'
        } else if (url.indexOf('q.qlogo.cn') >= 0 || url.indexOf('wx.qlogo.cn') >= 0) {
          return url
        } else {
          return '/static/img/common/tx-default.png'
        }
      },
      getEyeTrialQualification() {
        const _this = this;
        api.eyeTrialQualification({
          species: 1
        }).then(res => {
          if (res.status) {
            _this.hasTrialQualification = res.data.showTrial;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      openTheTrial() {
        const _this = this;
        api.buyEyeTrialOneDay({
          species: 1,
          provision: 'interval',
          days: 1,
        }).then(res => {
          if (res.status) {
            _this.getValueAddedServiceStatus();
            _this.getEyeTrialQualification();
            _this.$Message.success('开通试用成功!');
            _this.orderEyesModel = false;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      timeEnd() {
        if (!this.valueAddedServiceStatusInfo.isMemberOK) {
          this.isEndTime = true;
          this.eyesStatus = 'off';
        }
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
          if (res.status) {
            _this.appliesWaitingAuditTask();
            _this.selectId = null;
            _this.$Message.success('一键加速开启成功！');
          } else {
            _this.$Message.error(res.msg)
          }
          _this.speedUpModal = false;
          _this.speedUpLoading = false;
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
        _this.appliesWaitingAuditTask();
      },
      // 过滤注册IP
      filterIp(ip) {
        if (!ip || ip === 'null') {
          return '';
        } else {
          return ip;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .select-period {
    &:hover:not(:disabled) {
      border-color: $mainColor;
      background-color: #FFF4F1;
      color: $mainColor;
    }
  }

  .is-select {
    border-color: $mainColor;
    background-color: #FFF4F1;
    color: $mainColor;
  }

  .showker-tag {
    span {
      padding: 3px 10px;
      background: #2D8cF0;
      color: #fff;
      border-radius: 3px;
      user-select: none;
    }
  }

  .conformity {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
