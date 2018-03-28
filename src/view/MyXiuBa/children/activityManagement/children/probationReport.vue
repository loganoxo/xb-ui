<template>
  <div class="activity-management">
    <div class="activity-title pl-10" v-if="!showType">
      <span class="left">{{showkerTaskInfo.showkerPhone}}的买家秀</span>
      <span class="right" @click="returnUpPage()">返回上一页</span>
    </div>
    <div class="activity-title pl-10" v-else-if="showType && showType === 'taskPassAudit'">
      <span class="left">{{showkerTaskInfo.showkerPhone}}的买家秀</span>
      <span class="right" @click="returnTaskPassAudit()">返回上一页</span>
    </div>
    <div class="activity-title pl-10" v-else-if="showType && showType === 'buyer'">
      <span class="left">我的买家秀</span>
      <span class="right" @click="returnUpPageFrom()">返回上一页</span>
    </div>
    <div class="report-info mt-12">
      <div class="manage-info-con clear">
        <div class="manage-img left">
          <img :src="showkerTaskInfo.task.taskMainImage + '!thum54' || ''" :alt="showkerTaskInfo.taskName">
        </div>
        <div class="manage-text left ml-5">
          <p>{{showkerTaskInfo.taskName}}</p>
          <p class="mt-15">
            总份数<strong>&nbsp;{{showkerTaskInfo.task.taskCount}}&nbsp;</strong>，宝贝单价<strong>&nbsp;{{showkerTaskInfo.task.itemPrice / 100}}&nbsp;</strong>元
          </p>
        </div>
      </div>
      <div class="order-info mt-6">
        <p>
          <span>订单号：</span>
          <strong>{{showkerTaskInfo.orderNum}}</strong>
        </p>
        <p>
          <span>实付金额：</span>
          <strong>{{showkerTaskInfo.orderPrice / 100 || 0}}</strong>
          <span>元</span>
        </p>
        <p>
          <span>订单状态：</span>
          <strong>{{getTaskStatus(showkerTaskInfo.status)}}</strong>
          <span class="main-color"><time-down color='#ff4040' :fontWeight=600 :endTime="showkerTaskInfo.currentGenerationEndTime"></time-down></span>
        </p>
      </div>
      <div class="trial-experience mt-20">
        <div class="trial-experience-title f-b">1.淘宝评价截图，点击可查看原图（商家返款凭证）</div>
        <div class="mt-5" @click="isShowImgModel = true">
         <img :src="showkerReportInfo.taobaoCommentImage + '!thum80'" width="80" height="80">
        </div>
        <div class="trial-experience-title mt-20 f-b">2.拿手活动过程与体验评价：（白拿拿平台展示）</div>
        <RadioGroup v-model="selectEvaluate" class="mt-10">
          <Radio label="5" disabled>东西棒棒哒</Radio>
          <Radio label="3" disabled>还阔以</Radio>
          <Radio label="1" disabled>质量太差了</Radio>
        </RadioGroup>
        <div class="trial-experience-con mt-22">{{showkerReportInfo.trialReportText || ''}}</div>
        <div class="trial-experience-title mt-22 f-b">3.买家秀图片：（白拿拿平台展示）</div>
        <div class="trial-img-info" v-if="trialReportImages.length > 0">
          <div class="trial-img" style="min-height: 400px">
            <img :src="showNowImageSrc">
          </div>
          <span class="left-btn" @click="leftChangeImg"><Icon type="chevron-left" size="32" color="#999"></Icon></span>
          <span class="right-btn" @click="rightChangeImg"><Icon type="chevron-right" size="32" color="#999"></Icon></span>

        </div>
        <ul v-if="trialReportImages.length > 0" class="trial-img-list clear mt-22">
          <li v-for="(imgSrc,index) in trialReportImages" @mouseenter="selectChangeImg(imgSrc,index)">
            <img :src="imgSrc + '!orgi75'">
          </li>
        </ul>
        <div class="no-buyer-show" v-else>暂无买家秀图片</div>
        <div class="check-trial mt-40" v-if="!showType || (showType && showType === 'taskPassAudit')">
          <div class="select-check">
            <Radio-group v-model="trialCheckStatus">
              <Radio label="pass" style="margin-right: 32px;">
                <span class="fs-16">通过</span>
              </Radio>
              <Radio label="no_pass">
                <span class="fs-16">不通过</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="no-pass-reason mt-22" v-show="trialCheckStatus === 'no_pass'">
            <iInput v-model="noPassReason" placeholder="请填写买家秀不通过的理由，以便拿手修改" style="width: 420px"></iInput>
          </div>
          <div class="true-btn" v-show="trialCheckStatus === 'no_pass'" @click="confirmReport">确认</div>
          <div class="true-btn" v-show="trialCheckStatus === 'pass'" @click="openRefundModel">确认</div>
          <p class="pt-20 clff3300">请在“审核买家秀”环节确定拿手是否有走淘宝客等其他任何返利途径下单的，一旦发现，请拒绝通过买家秀，并写上拒绝通过买家秀的原因！如有疑问请及时联系客服。</p>
          <div class="remind mt-22 clear">
            <div class="left mr-10">
              <Icon type="alert-circled" color='#f9284f' size="36"></Icon>
            </div>
            <div class="left remind-con">
              <p>通过买家秀需要支付拿手拿手，不通过则会退回，交给拿手重新修改！</p>
              <p>您还有&nbsp;
                <time-down color='#ff4040' :fontWeight=600 :endTime="showkerTaskInfo.currentGenerationEndTime"></time-down>&nbsp;进行审核，若该时间内未审核，系统将默认审核通过，开始给拿手返款！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--商家通过试用报告返款给拿手弹框-->
    <div class="confirm-refund-model" v-if="showRefundModel">
      <div class="confirm-refund-con fadeIn">
        <i class="right mr-10" @click="closeRefundModel">&times;</i>
        <div class="confirm-refund-info mt-20">
          <p>
            <span>拿手返款：</span>
            <span>{{showkerTaskInfo.task.taskName}}</span>
          </p>
          <p class="mt-8">
            <span>返款金额：</span>
            <strong>{{(countRefundAmount / 100).toFixed(2)}}</strong>
            <span>元</span>
          </p>
        </div>
        <div class="input-pwd mt-22 ml-35">
          <span>请输入您的支付密码：</span>
          <iInput v-model="refundPayPwd" type="password" style="width: 160px;margin-right: 16px;"></iInput>
          <iButton type="primary" @click="confirmRefund">确认</iButton>
          <span class="ml-10" v-if="isPwdAmend"><router-link
            :to="{path:'/user/money-management/account-management',query:{type:'findPwd'}}">忘记支付密码？</router-link></span>
        </div>
        <div class="refund-tip ml-35 mt-22" v-if="!isPwdAmend">
          <p>如果您的支付密码没有修改，初始密码为：888888。</p>
          <p class="mt-6">为了账户安全，建议您另外设置一个密码！
            <router-link :to="{path:'/user/money-management/account-management',query:{type:'resetPwd'}}">修改支付密码</router-link>
          </p>
        </div>
      </div>
    </div>
    <Modal title="图片查看器" v-model="isShowImgModel">
      <img :src="showkerReportInfo.taobaoCommentImage + '!orgi75'" style="width: 100%">
    </Modal>
    <Modal v-model="evaluateShowker" class="evaluate-showker-pop" @on-visible-change="changeEvaluatePop">
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
  import Icon from 'iview/src/components/icon'
  import Tooltip from 'iview/src/components/tooltip'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {TaskErrorStatusList, decode, encryption} from '@/config/utils'

  export default {
    name: 'ProbationReport',
    components: {
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iInput: Input,
      TimeDown: TimeDown,
      Modal: Modal,
      Tooltip:Tooltip,
    },
    data() {
      return {
        selectEvaluate:'5',
        evaluateShowker:false,
        wwQuality:'hao_ping',
        fillOrderCooperate:'hao_ping',
        buyerShowQuality:'hao_ping',
        trialCheckStatus: 'pass',
        showRefundModel: false,
        isShowImgModel: false,
        refundPayPwd: null,
        showkerReportInfo: {},
        showkerTaskInfo: {
          task: {}
        },
        noPassReason: null,
        trialReportImages: [],
        showNowImageSrc: null,
        reportImagesIndex: 0,
        showType: null,
        from: null,
        loading:false
      }
    },
    mounted() {},
    created() {
      let id = decode(this.$route.query.id);
      let from = this.$route.query.from;
      this.from = from;
      if (from === 'buyer') {
        this.showType = 'buyer';
      }
      if (from === 'taskPassAudit') {
        this.showType = 'taskPassAudit';
      }
      this.lookShowkerReport(id);
    },
    watch: {},
    computed: {
      countRefundAmount() {
        if(this.showkerTaskInfo.task.discountPrice && this.showkerTaskInfo.task.discountPrice >= 0){
          return this.showkerTaskInfo.orderPrice - this.showkerTaskInfo.task.discountPrice
        }else if(this.showkerTaskInfo.task.discountRate && this.showkerTaskInfo.task.discountRate > 0){
          return this.showkerTaskInfo.orderPrice * (1 - this.showkerTaskInfo.task.discountRate / 100)
        } else {
          return this.showkerTaskInfo.orderPrice
        }
      },
      isPwdAmend() {
        return this.$store.getters.getIsEditPwdAlready
      },
    },
    methods: {
      changeEvaluatePop(status){
        if (!status){
          this.returnUpPage();
        }
      },
      evaluateShowkerFun(){
        let self = this;
        api.evaluateFormSellerToShowker({
          showkerId: self.showkerReportInfo.showkerId,
          showkerAlitmAccount: self.showkerTaskInfo.alitm.alitmAccount,
          taskId: self.showkerReportInfo.task.id,
          taskNum: self.showkerReportInfo.task.number,
          buyerQuality: self.buyerShowQuality,
          orderTone: self.fillOrderCooperate,
          trialReportQuality: self.wwQuality,
          showkerTaskId: self.showkerReportInfo.showkerTaskId
        }).then( res => {
          if (res.status){
            self.evaluateShowker = false;
            self.$Message.success('评价成功！')
          }else {
            self.$Message.error(res.msg)
          }
        })
      },
      returnUpPage() {
        this.$router.push({name: 'ApproveShowker', query: {q: encryption(this.showkerTaskInfo.task.id)}})
      },
      returnUpPageFrom() {
        this.$router.push({name: 'ApplyPassAudit'})
      },
      returnTaskPassAudit() {
        this.$router.push({path: '/user/task-management/pass'})
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      closeRefundModel() {
        this.showRefundModel = false;
      },
      openRefundModel() {
        this.showRefundModel = true;
      },
      lookShowkerReport(id) {
        let _this = this;
        api.showkerTaskInfo({id: id}).then(res => {
          if (res.status) {
            _this.showkerTaskInfo = res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        });
        api.showkerTaskReport({id: id}).then(res => {
          if (res.status) {
            _this.showkerReportInfo = res.data;
            _this.selectEvaluate = res.data.other.itemStars.toString();
            _this.trialReportImages = _this.showkerReportInfo.trialReportImages ? JSON.parse(_this.showkerReportInfo.trialReportImages) : [];
            for(let i =0, len = _this.trialReportImages.length; i < len; i++){
              _this.trialReportImages[i] =  _this.trialReportImages[i].indexOf('aliyuncs') > 0 ? _this.trialReportImages[i] : aliCallbackImgUrl + _this.trialReportImages[i];
            }
            _this.showNowImageSrc = _this.trialReportImages[0];
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      confirmReport() {
        let _this = this;
        if (!_this.noPassReason) {
          _this.$Message.info('请填写买家秀不通过理由！');
          return;
        }
        api.taskReportAudit({
          id: _this.showkerTaskInfo.id,
          status: _this.trialCheckStatus === 'pass' ? 'true' : 'false',
          msg: _this.noPassReason
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '买家秀审核成功！',
              duration: 4
            });
            if (_this.from && _this.from === 'taskPassAudit') {
              _this.returnTaskPassAudit();
            } else {
              _this.returnUpPage();
            }
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 4
            })
          }
        })
      },
      selectChangeImg(src, index) {
        this.showNowImageSrc = src;
        this.reportImagesIndex = index;
      },
      leftChangeImg() {
        let _this = this;
        let length = _this.trialReportImages.length;
        _this.reportImagesIndex--;
        if (_this.reportImagesIndex < 0) {
          _this.reportImagesIndex = length - 1;
        }
        _this.showNowImageSrc = _this.trialReportImages[_this.reportImagesIndex];
      },
      rightChangeImg() {
        let _this = this;
        let length = _this.trialReportImages.length;
        _this.reportImagesIndex++;
        if (_this.reportImagesIndex > length - 1) {
          _this.reportImagesIndex = 0;
        }
        _this.showNowImageSrc = _this.trialReportImages[_this.reportImagesIndex];
      },
      confirmRefund() {
        let _this = this;
        api.showkerDepositReturn({
          showkerTaskId: _this.showkerTaskInfo.id,
          payPwd: _this.refundPayPwd,
          platform: "pc"
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '已向拿手返款成功！',
              duration: 4
            });
            _this.showRefundModel = false;
            _this.evaluateShowker = true;
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 4
            })
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';
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
