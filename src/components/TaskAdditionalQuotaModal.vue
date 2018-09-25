<template>
  <modal :value="currentValue" :title="title" :width="modalWidth" :mask-closable="false" @on-visible-change="change">
    <template v-if="step === 'create'">
      <div class="clear">
        <div class="left">
          <img class="border-radius-5" width="54" height="54" :src="data.taskMainImage" alt="活动主图">
        </div>
        <div class="left ml-10">
          <p>活动名称：{{data.taskName}}</p>
          <p>参与概括：总份数 <span class="main-color">{{data.taskCount}}</span>，<span
            class="main-color">{{data.trailOn}} </span>人正在参与活动
            ，<span class="main-color">{{data.trailDone}}</span>人完成活动，剩余名额 <span
              class="main-color">{{data.residueCount}}</span> 个
          </p>
          <p>单品活动担保金：<span class="main-color">{{(oneBondLast / 100).toFixed(2)}}</span>
            元&nbsp;&nbsp;&nbsp;&nbsp;单品推广费：<span class="main-color">{{(data.promotionExpensesPaid / data.taskCount / 100).toFixed(2)}}</span> 元&nbsp;&nbsp;&nbsp;&nbsp;单品增值服务费：<span
              class="main-color">{{((data.vasFeePaid + data.tagVasFeePaid) / data.taskCount / 100).toFixed(2)}}</span> 元</p>
        </div>
      </div>
      <div class="mt-10 border-top pt-10">
        <p>当前待审核：<span class="main-color">{{data.totalTaskApplyCount}}</span> 人</p>
        <template v-if="data.isMoreKeywordsPlan">
          <div class="inline-block tag" v-for="item in keywordPlanInfo" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
            <span @click="selectChangeScheme(item.index)">{{item.searchKeyword ? item.searchKeyword : `关键词方案${item.index + 1}`}}</span>
            <sup class="badge-count" v-show="item.addTaskNumber > 0">{{item.addTaskNumber}}</sup>
            <span v-if="!item.oldKeyword && item.index === keywordPlanInfo.length - 1 && item.index !== 0" class="close-tag" @click="handleClose(item.index)"><icon type="ios-close"/></span>
          </div>
          <i-button class="ml-5 mt-15" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加关键词方案</i-button>
        </template>
        <div v-for="item in keywordPlanInfo" v-show="selectKeywordScheme === item.index">
          <div class="keyword-plan-detail">
            <div class="search-keyword mt-10">
              <span class="required">搜索关键词：</span>
              <i-input v-model="item.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"/>
            </div>
            <div class="sort-by mt-10">
              <span class="required">排序方式：</span>
              <radio-group v-model="item.searchSort">
                <radio label="zong_he">
                  <span>综合排序</span>
                </radio>
                <radio label="xiao_liang">
                  <span>销量排序</span>
                </radio>
              </radio-group>
            </div>
            <div class="search-price mt-10">
              <span class="required">展示价格：</span>
              <i-input v-model="item.searchPagePrice" placeholder="请输入搜索列表页展示价格" style="width: 160px"/>
            </div>
            <div class="baby-location mt-10 clear">
              <span class="required">宝贝搜索位置：</span>
              <span>第</span>
              <i-input v-model.number="item.searchPagePositionMin" style="width: 40px"/>
              <span>---</span>
              <i-input v-model.number="item.searchPagePositionMax" style="width: 40px"/>
              <span>页</span>
              <span class="blue right mr-15 cursor-p select-none" @click="moreDetail">更多设置 <icon type="md-arrow-dropdown" color="#2D8cF0" size="20" :class="{'select-style' : hasSelect}"/></span>
            </div>
            <div v-show="hasSelect">
              <div class="line"></div>
              <div class="baby-main-image">
                <span class="lht48">搜索页展示主图</span>
                <upload class="inline-block vtc-top ml-10"
                        :on-remove="removeMainImage"
                        :on-success="changeMainImageSuccess"
                        :format="['jpg','jpeg','png','gif','bmp']"
                        :max-size="1024"
                        :uploadLength="5"
                        name="task"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        type="drag">
                  <div class="camera">
                    <icon type="ios-camera" size="20"/>
                  </div>
                </upload>
                <span class="ml-20">（可更换搜索页展示主图）</span>
              </div>
              <div class="screen-condition mt-10 clear">
                <span class="left">筛选条件：</span>
                <div class="left ml-5">
                  <checkbox-group v-model="item.searchFilter">
                    <checkbox label="pinkage">
                      <span>包邮</span>
                    </checkbox>
                    <checkbox label="mobile_exclusive">
                      <span>手机专享</span>
                    </checkbox>
                    <checkbox label="tao_coin_deduction">
                      <span>淘金币抵扣</span>
                    </checkbox>
                    <checkbox label="sales_return_7_plus">
                      <span>7+天退货</span>
                    </checkbox>
                    <checkbox label="tmall">
                      <span>天猫</span>
                    </checkbox>
                    <p style="height: 10px;"></p>
                    <checkbox label="global_shopping">
                      <span>全球购</span>
                    </checkbox>
                    <checkbox label="overseas_goods">
                      <span>海外商品</span>
                    </checkbox>
                    <checkbox label="consumer_protect">
                      <span>消费者保障</span>
                    </checkbox>
                    <checkbox label="pay_after_receive">
                      <span>货到付款</span>
                    </checkbox>
                    <checkbox label="hua_pay_installment">
                      <span>花呗分期</span>
                    </checkbox>
                    <checkbox label="wangwang_online">
                      <span>旺旺在线</span>
                    </checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div class="price-select mt-10">
                <span>价格区间：</span>
                <i-input v-model.number="item.priceRangeMin" style="width: 40px"/>
                <span>---</span>
                <i-input v-model.number="item.priceRangeMax" style="width: 40px"/>
                <span>元</span>
              </div>
              <div class="deliver-address mt-10">
                <span>发货地：</span>
                <i-input v-model="item.deliverAddress" style="width: 120px"/>
                <span class="sizeColor2 ml-5">（出于安全考虑，请勿大量使用）</span>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <span>追加份数：</span>
            <i-input v-model.number="item.addTaskNumber" placeholder="请输入追加份数" class="width-100"/>
            <span class="ml-10 cl000 fs-14" v-if="item.searchKeyword">为{{` "${item.searchKeyword}" `}}追加的份数</span>
          </div>
        </div>
        <div class="mt-10 border-top pt-10 addition-item" v-if="data.itemReviewRequired === 'assign_review_detail'">
          <p class="mb-10">是否对追加份数添加评价范本（选填）</p>
          <p class="mt-5" v-for="(item, index) in itemReviewList">
            <span class="vtc-sup">{{`评价${index + 1}`}}：</span>
            <i-input v-model="item.reviewContent" class="mb-10 width-300 mt-4" type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="请输入你的评价内容"/>
            <upload class="inline-block vtc-top ml-10"
                    :item-index="index"
                    :on-remove="removeEvaluateImage"
                    :on-success="evaluateImageSuccess"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    :uploadLength="5"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <icon type="ios-camera" size="20"/>
              </div>
            </upload>
            <i-button :disabled="itemReviewList.length === 1" type="dashed" icon="plus-round" @click="deleteItemReviewList(index)">删除</i-button>
          </p>
          <i-button :disabled="itemReviewList.length === allAddTaskNumber || allAddTaskNumber === 0" class="ml-45 mt-6 mb-5" type="dashed" icon="plus-round" @click="addItemReviewList">添加</i-button>
          <span class="ml-10"><icon type="md-alert" color="#f9284f"/>图文评价2元/条，文字评价1元/条；9月测试期免费，10月以后按标准收取。</span>
        </div>
      </div>
      <div class="mt-10 border-top pt-10">
        <span>系统审批延期：</span>
        <i-input v-model="delayDays" placeholder="请输入延期天数" class="width-100"/>
        <span class="pl-5 pr-5">天</span>
        (一次最多延期30天 距系统审批还有 <span v-if="currentValue"><time-down :endTime="getDistanceSysAuditTime" color="#495060"/></span>)
      </div>
      <div class="mt-10 border-top pt-10">共追加&nbsp;<span class="main-color">{{allAddTaskNumber}}</span>&nbsp;份</div>
      <i-button slot="footer" type="primary" size="large" long :loding="buttonLoading" @click="nextStep">下一步</i-button>
    </template>
    <template v-else>
      <pay-model ref="payModelRef" :orderMoney="needPayMoneyBeforeAsRedEnvelopes" @confirmPayment="confirmPayment"
                 :isBalance="isBalance" :redEnvelopesState="redEnvelopesState"
                 @change="redEnvelopesState = arguments[0]" :redEnvelopeDeductionNumber="redEnvelopeDeductionNumber"
                 :disabledRedEnvelopes="true">
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyBeforeText}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-5">您本次需要支付金额为 <span class="sizeColor3">{{(needPayMoneyAfterAsRedEnvelopes / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
      <div slot="footer"></div>
    </template>
  </modal>
</template>

<script>
  import {Modal, Input, Button, Icon, Radio, Checkbox} from 'iview'
  import PayModel from '@/components/PayModel'
  import TimeDown from '@/components/TimeDown'
  import Upload from '@/components/Upload'
  import api from '@/config/apiConfig'
  import {isInteger, delSpace, debounce, isNumber} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'

  export default {
    name: "task-additional-quota-modal",
    data() {
      return {
        currentValue: this.value,
        buttonLoading: false,
        modalWidth: 800,
        oldAddTaskNumber: null,
        itemReviewList: [{
          reviewContent: '',
          reviewPictures: [],
        }],
        step: 'create',
        title: '活动追加名额',
        keywordPlanInfo: [],
        keywordDetail: {
          index: 0,
          addTaskNumber: null,
          itemMainImage: null,
          countAssigned: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchPagePositionMin: null,
          searchPagePositionMax: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
          deliverAddress: null,
        },
        selectKeywordScheme: 0,
        addKeywordScheme: 0,
        timer: null,
        delayDays: null,
        hasSelect: false
      }
    },
    components: {
      Modal: Modal,
      Icon: Icon,
      IInput: Input,
      IButton: Button,
      PayModel: PayModel,
      TimeDown: TimeDown,
      Upload: Upload,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      /**
       * 计算距离系统自动审批剩余时间
       */
      getDistanceSysAuditTime(){
        const autoAuditWaitHours = this.data.autoAuditWaitHours * 3600 * 1000;
        return this.data.finishTime ? this.data.finishTime + autoAuditWaitHours : this.data.endTime + autoAuditWaitHours;
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /**
       * 获取用户账户余额
       * @return {number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /**
       * 计算红包启用状态
       * @return {number}
       */
      redEnvelopesState() {
        return this.data.redEnvelopeDeductionPaid > 0
      },

      /**
       * 计算红包抵扣金额
       * @return {number}
       */
      redEnvelopeDeductionNumber() {
        return this.data.redEnvelopeDeductionPaid > 0 ? this.data.redEnvelopeDeductionPaid / this.data.taskCount * this.allAddTaskNumber : 0
      },

      /**
       * 计算拍A发A最终商家发布单品活动担保金（宝贝单价 + 邮费）
       * @return {number}
       */
      oneBondAToA() {
        return this.data.pinkage ? this.data.itemPrice : (this.data.itemPrice + 1000)
      },

      /**
       * 计算拍A发B最终商家发布单品活动担保金（A宝贝单价 * 拍下数量 + 邮费）
       * @return {number}
       */
      oneBondAToB() {
        return this.data.pinkage ? this.data.itemPrice * this.data.orderQuantity : (this.data.itemPrice * this.data.orderQuantity + 1000)
      },

      /**
       * 计算最终的单品活动保证金
       * @return {number}
       */
      oneBondLast() {
        if (this.data.activityCategory === 'free_get') {
          return this.oneBondAToA
        }
        if (this.data.activityCategory === 'present_get') {
          return this.oneBondAToB
        }
      },

      /**
       * 计算最终单品推广费用（打赏费）
       * @return {number}
       */
      onePromotionExpenses() {
        const type = this.data.activityCategory === 'free_get' ? 'AA' : 'AB';
        return this.data.fastPublish ? 0 : this.$store.getters.getPromotionExpenses[type].limit;
      },

      /**
       * 计算活动总增值费
       * @return {number}
       */
      allValueAddedCost() {
        return ((this.data.vasFeePaid + this.data.tagVasFeePaid) / this.data.taskCount) * this.allAddTaskNumber
      },

      /**
       * 计算活动总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.allAddTaskNumber
      },

      /**
       * 计算活动总金额
       * @return {number}
       */
      orderMoney() {
        if (this.data.activityCategory === 'free_get') {
          return (this.allAddTaskNumber * this.oneBondAToA) + this.allPromotionExpenses + this.allValueAddedCost
        }
        if (this.data.activityCategory === 'present_get') {
          return (this.allAddTaskNumber * this.oneBondAToB) + this.allPromotionExpenses + this.allValueAddedCost
        }
      },

      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber <= this.getUserBalance : this.orderMoney <= this.getUserBalance
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要额外充值的金额
       * @return {number}
       */
      needPayMoneyBefore() {
        const money = this.orderMoney - this.getUserBalance;
        return !this.isBalance ? money > 0 ? money : 0 : 0;
      },

      /**
       * 计算当用户账户余额足以支付活动所需金额时要支付的金额（包含是否启用红包金额，此金额为最终需要支付金额）
       * @return {number}
       */
      needPayMoneyAfterAsRedEnvelopes() {
        return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber : this.orderMoney
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要额外充值的金额（包含是否启用红包金额，此金额为最终需要充值金额）
       * @return {number}
       */
      needPayMoneyBeforeAsRedEnvelopes() {
        return this.redEnvelopesState ? this.needPayMoneyBefore - this.redEnvelopeDeductionNumber : this.needPayMoneyBefore
      },

      /** 计算充值界面上的金额文本显示
       * @return {String}
       */
      needPayMoneyBeforeText() {
        return !this.isBalance ? `${(this.needPayMoneyBeforeAsRedEnvelopes / 100).toFixed(2)} + ${((Math.ceil(this.needPayMoneyBeforeAsRedEnvelopes / 0.994) - this.needPayMoneyBeforeAsRedEnvelopes) / 100).toFixed(2)}` : ''
      },

      /** 计算总追加份数
       * @return {number}
       */
      allAddTaskNumber() {
       return this.keywordPlanInfo.reduce((prev, cur) => {
         return (cur.addTaskNumber > 0 ? cur.addTaskNumber : 0) + prev
        }, 0)
      },

      /** 计算首单任务可追加份数，目前最多只支持追加20份
       *  可追加份数：20 - 已发布的活动总份数
       * @return {number}
       */
      canAddTaskCount() {
        return 20 - this.data.taskCount
      }
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      change(value) {
        if (!value) {
          this.$emit('input', false);
          this.keywordPlanInfo = [];
          this.itemReviewList = [{
            reviewContent: '',
            reviewPictures: [],
          }];
          this.hasSelect = false;
          this.selectKeywordScheme = 0;
          this.oldAddTaskNumber = null;
          this.delayDays = null;
          // 关闭弹框时延迟渲染创建活动界面
          setTimeout(() => {
            this.step = 'create';
            this.modalWidth = 800;
          }, 200);
        }
      },
      handleAdd() {
        this.addKeywordScheme = this.keywordPlanInfo.length - 1;
        this.addKeywordScheme ++ ;
        this.selectKeywordScheme = this.addKeywordScheme;
        this.keywordPlanInfo.push({
          index: this.addKeywordScheme,
          itemMainImage: null,
          countAssigned: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchPagePositionMin: null,
          searchPagePositionMax: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
          deliverAddress: null,
          oldKeyword: false,
          addTaskNumber: 1,
        })
      },
      handleClose(index) {
        this.keywordPlanInfo.splice(index,1);
        this.addKeywordScheme -= 1;
        this.selectKeywordScheme = index - 1;
      },
      moreDetail() {
        this.$nextTick(() => {
          this.hasSelect = !this.hasSelect;
        })
      },
      removeMainImage() {

      },
      changeMainImageSuccess() {

      },
      nextStep() {
        let isItemReviewOk = true;
        if (!this.data.isMoreKeywordsPlan) {
          // 老活动的校验逻辑（没有关键词人数分配）
          if (this.keywordPlanInfo[0].addTaskNumber <= 0 || !isInteger(this.keywordPlanInfo[0].addTaskNumber)) {
            this.$Message.warning(`亲，请输入需要追加的活动份数！`);
            return;
          }
        } else {
          // 新活动的校验逻辑（有关键词人数分配）
          for(let i = 0,len = this.keywordPlanInfo.length; i < len; i ++) {
            let index = this.keywordPlanInfo[i].index + 1;
            if (!this.keywordPlanInfo[i].searchKeyword) {
              this.$Message.warning('亲，关键词方案' + index + '中的搜索关键词不能空！');
              return;
            }
            if (!this.keywordPlanInfo[i].searchPagePrice) {
              this.$Message.warning('亲，关键词方案' + index + '中的展示价格不能空！');
              return;
            }
            if (!isNumber(this.keywordPlanInfo[i].searchPagePrice)) {
              this.$Message.warning('亲，关键词方案' + index + '中的展示价格必须为数字！');
              return;
            }
            if (!this.keywordPlanInfo[i].searchPagePositionMin) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索起始位置不能空！');
              return;
            }
            if (!this.keywordPlanInfo[i].searchPagePositionMax) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索结束位置不能空！');
              return;
            }
            if (!isInteger(this.keywordPlanInfo[i].searchPagePositionMin)) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索起始位置必须为正整数！');
              return;
            }
            if (!isInteger(this.keywordPlanInfo[i].searchPagePositionMax)) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索结束位置必须为正整数！');
              return;
            }
            if (this.keywordPlanInfo[i].searchPagePositionMax < this.keywordPlanInfo[i].searchPagePositionMin) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置起始页不能大于结束页！');
              return;
            }
            if (this.keywordPlanInfo[i].searchPagePositionMax - this.keywordPlanInfo[i].searchPagePositionMin > 2) {
              this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置页数差值最大不大于3页！');
              return;
            }
            if (this.keywordPlanInfo[i].priceRangeMin) {
              if (!isInteger(this.keywordPlanInfo[i].priceRangeMin)) {
                this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
            if (this.keywordPlanInfo[i].priceRangeMax) {
              if (!isInteger(this.keywordPlanInfo[i].priceRangeMax)) {
                this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
          }

          // let keywordPlanInfoIndex = 0;
          // const allOk = this.keywordPlanInfo.some((item, index) => {
          //   keywordPlanInfoIndex = index;
          //   return item.addTaskNumber && item.addTaskNumber > 0
          // });
          // if (!allOk) {
          //   this.$Message.warning(`亲，请输入"${this.keywordPlanInfo[keywordPlanInfoIndex].searchKeyword}"中需要追加的活动份数！`);
          //   return;
          // }
        }
   /*     if (this.data.itemReviewRequired === 'assign_review_detail') {
          for (let l = 0, len = this.itemReviewList.length; l < len; l++) {
            if (!this.itemReviewList[l].value || !delSpace(this.itemReviewList[l].value)) {
              // 当用户输入连续空格的时候自动将空格去除
              this.itemReviewList[l].value = delSpace(this.itemReviewList[l].value);
              this.$Message.warning(`亲，追加评价 ${l + 1} 内容不能为空！`);
              isItemReviewOk = false;
              break;
            }
          }
        }*/
        if (this.data.fastPublish && this.allAddTaskNumber > this.canAddTaskCount) {
          this.$Message.warning(`亲，首单0推广费免费体验最大支持20份名额！`);
          return;
        }
        if (this.delayDays && !isInteger(this.delayDays)){
          this.$Message.warning(`亲，延期天数必须为正整数数字！`);
          return;
        }
        if (this.delayDays > 30){
          this.$Message.warning(`亲，最多延期30天！`);
          return;
        }
        if (isItemReviewOk) {
          this.title = '支付充值活动费用';
          this.step = 'pay';
          this.modalWidth = 600;
        }
      },
      addTaskNumberChange() {
        if (this.data.itemReviewRequired === 'assign_review_detail') {
          // 函数防抖处理（等待用户输入完成后600毫秒后触发逻辑，防止逻辑不停触发造成不必要的性能损失）
          // 动态增删追加评价输入框DOM
          const _this = this;
          if (_this.timer) {
            clearTimeout(_this.timer)
          }
          _this.timer = setTimeout(() => {
            if (_this.allAddTaskNumber > _this.oldAddTaskNumber) {
              for (let i = 0, len = _this.allAddTaskNumber - _this.oldAddTaskNumber; i < len; i++) {
                this.itemReviewList.push({
                  value: null,
                  index: i + 1,
                })
              }
            } else if (_this.allAddTaskNumber < _this.oldAddTaskNumber) {
              this.itemReviewList.splice(_this.allAddTaskNumber, _this.oldAddTaskNumber - _this.allAddTaskNumber)
            }
            this.oldAddTaskNumber = _this.allAddTaskNumber
          }, 600)
        }
      },
      selectChangeScheme(index) {
        this.selectKeywordScheme = index
      },
      confirmPayment(pwd) {
        const _this = this;
       /* const itemReviewPushList = [];
        if (_this.itemReviewList.length > 0) {
          _this.itemReviewList.forEach(item => {
            itemReviewPushList.push(delSpace(item.value));
          })
        }*/
        const additionSearchScheme = _this.keywordPlanInfo.map(item => {
          return item.addTaskNumber > 0 ? item.addTaskNumber : 0;
        });
        if (_this.delayDays) {
          api.autoAuditTime({
            taskId: _this.data.taskId,
            days: _this.delayDays,
          }).then(res => {
            if (res.status){
              _this.delayDays = null;
              api.additionalTaskAccount({
                payPwd: pwd,
                taskId: _this.data.taskId,
                additionCount: _this.allAddTaskNumber,
                additionSearchScheme: JSON.stringify(additionSearchScheme),
                additionItemReview: JSON.stringify(_this.itemReviewList),
              }).then(res => {
                if (res.status) {
                  _this.keywordPlanInfo = [];
                  _this.itemReviewList = [{
                    reviewContent: '',
                    reviewPictures: [],
                  }];
                  _this.$emit('addTaskSuccess');
                  _this.$emit('input', false);
                  _this.$Message.success("追加延期时间和份数成功！");
                } else {
                  _this.$Message.error("追加延期时间成功、追加份数失败！");
                }
                _this.$refs.payModelRef.payLoading = false;
              });
            } else {
              _this.$Message.error(res.msg)
            }
          })
        } else {
          api.additionalTaskAccount({
            payPwd: pwd,
            taskId: _this.data.taskId,
            additionCount: _this.allAddTaskNumber,
            additionItemReview: JSON.stringify(_this.itemReviewList),
            additionSearchScheme: JSON.stringify(additionSearchScheme),
          }).then(res => {
            if (res.status) {
              _this.keywordPlanInfo = [];
              _this.itemReviewList = [{
                reviewContent: '',
                reviewPictures: [],
              }];
              _this.$Message.success("追加份数成功！");
              _this.$emit('addTaskSuccess');
              _this.$emit('input', false);
            } else {
              _this.$Message.error(res.msg)
            }
            _this.$refs.payModelRef.payLoading = false;
          });
        }
      },
      addItemReviewList() {
        this.itemReviewList.push({reviewContent: '', reviewPictures: []});
      },
      deleteItemReviewList(index) {
        this.itemReviewList.splice(index, 1);
      },
      removeEvaluateImage(file, itemIndex) {
        const _reviewPictures = this.itemReviewList[itemIndex].reviewPictures;
        const _index = _reviewPictures.findIndex(item => {
          return item === file.src;
        });
        _reviewPictures.splice(_index, 1);
      },
      evaluateImageSuccess(res, index) {
        this.itemReviewList[index].reviewPictures.push(`${aliCallbackImgUrl}${res.name}`);
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
          content: '图片 ' + file.name + ' 太大，不能超过 1M'
        });
      },
    },
    watch: {
      value(val) {
        this.setCurrentValue(val)
      },
      'data.keywordPlanNum': {
        deep: true,
        handler(val) {
          let len = val > 0 ? val : 1;
          for (let i = 0; i < len; i++) {
            this.keywordPlanInfo.push(Object.assign({},this.keywordDetail,{
              addTaskNumber: null,
              index: i,
              searchKeyword: this.data.searchKeywords[i] ? this.data.searchKeywords[i] : null,
              oldKeyword: true
            }))
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .addition-item {
    overflow-y: auto;
    max-height: 200px;
  }

  .tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 20px 12px 10px 0;
    padding: 0 8px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    cursor: pointer;
    position: relative;
  }

  .close-tag {
    display: inline-block;
    font-size: 14px;
    transform: scale(1.42857143) rotate(0);
    cursor: pointer;
    margin-left: 5px;
    color: inherit;
    opacity: .66;
    position: relative;
    top: 0;
    line-height: 20px;
  }

  .select-tag-bg {
    background-color: $mainColor;
    color: #fff;
    border-color: $mainColor;
  }

  .badge-count {
    position: absolute;
    transform: translateX(50%);
    top: -16px;
    right: 0;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
    background: #ed3f14;
    border: 1px solid transparent;
    color: #fff;
    line-height: 18px;
    text-align: center;
    padding: 0 6px;
    font-size: 12px;
    white-space: nowrap;
    transform-origin: -10% center;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
  }

  .keyword-plan-detail {
    background: #F7F7F7;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 10px 20px;
  }
  .select-style {
    transform: rotate(180deg);
  }
  .line {
    margin: 15px auto;
    border-bottom: 1px solid #ddd;
  }
</style>
