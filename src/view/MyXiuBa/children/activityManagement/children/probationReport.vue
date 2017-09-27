<template>
  <div class="activity-management">
    <div class="activity-title pl-10" v-if="showType">
      <span class="left">{{showkerTaskInfo.showkerPhone}}的买家秀</span>
      <span v-if="showType === 'buyer'" class="right" @click="returnUpPage()">返回上一页</span>
      <span v-else class="right" @click="returnTaskPassAudit()">返回上一页</span>
    </div>
    <div class="activity-title pl-10" v-else>
      <span class="left">我的买家秀</span>
      <span class="right" @click="returnUpPageFrom()">返回上一页</span>
    </div>
    <div class="report-info mt-12">
      <div class="manage-info-con clear">
        <div class="manage-img left">
          <img :src="showkerTaskInfo.task.taskMainImage || ''" :alt="showkerTaskInfo.taskName">
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
        <div class="trial-experience-title">活动过程与体验：</div>
        <div class="trial-experience-con mt-22">{{showkerReportInfo.trialReportText || ''}}</div>
        <div class="trial-experience-title mt-22">买家秀图片：</div>
        <div class="trial-img-info" v-if="trialReportImages.length > 0">
          <div class="trial-img">
            <img :src="showNowImageSrc">
          </div>
          <ul class="trial-img-list clear mt-22">
            <li v-for="(imgSrc,index) in trialReportImages" @mouseenter="selectChangeImg(imgSrc,index)">
              <img :src="imgSrc">
            </li>
          </ul>
          <span class="left-btn" @click="leftChangeImg"><Icon type="chevron-left" size="32" color="#999"></Icon></span>
          <span class="right-btn" @click="rightChangeImg"><Icon type="chevron-right" size="32" color="#999"></Icon></span>
        </div>
        <div class="no-buyer-show" v-else>暂无买家秀图片</div>
        <div class="check-trial mt-40" v-if="!showType || (showType && showType === 'taskPassAudit')">
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
            <iInput v-model="noPassReason" placeholder="请填写买家秀不通过的理由，以便秀客修改" style="width: 420px"></iInput>
          </div>
          <div class="true-btn" v-show="trialCheckStatus === 'no_pass'" @click="confirmReport">确认</div>
          <div class="true-btn" v-show="trialCheckStatus === 'pass'" @click="openRefundModel">确认</div>
          <div class="remind mt-22 clear">
            <div class="left mr-10">
              <Icon type="alert-circled" color='#f60' size="36"></Icon>
            </div>
            <div class="left remind-con">
              <p>通过买家秀需要支付秀客秀客，不通过则会退回，交给秀客重新修改！</p>
              <p>您还有&nbsp;
                <time-down color='#ff4040' :fontWeight=600 :endTime="showkerTaskInfo.currentGenerationEndTime"></time-down>&nbsp;进行审核，若该时间内未审核，系统将默认审核通过，开始给秀客返款！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--商家通过试用报告返款给秀客弹框-->
    <div class="confirm-refund-model" v-if="showRefundModel">
      <div class="confirm-refund-con showSweetAlert">
        <i class="right mr-10" @click="closeRefundModel">&times;</i>
        <div class="confirm-refund-info mt-20">
          <p>
            <span>秀客返款：</span>
            <span>{{showkerTaskInfo.task.taskName}}</span>
          </p>
          <p class="mt-8">
            <span>返款金额：</span>
            <strong>{{showkerTaskInfo.orderPrice / 100}}</strong>
            <span>元</span>
          </p>
        </div>
        <div class="input-pwd mt-22 ml-35">
          <span>请输入您的支付密码：</span>
          <iInput v-model="refundPayPwd" type="password" style="width: 160px;margin-right: 16px;"></iInput>
          <iButton type="primary" @click="confirmRefund">确认</iButton>
          <span class="ml-10" v-if="isPwdAmend"><router-link :to="{path:'/user/money-management/account-management',query:{type:'findPwd'}}">忘记支付密码？</router-link></span>
        </div>
        <div class="refund-tip ml-35 mt-22" v-if="!isPwdAmend">
          <p>如果您的支付密码没有修改，初始密码为：888888。</p>
          <p class="mt-6">为了账户安全，建议您另外设置一个密码！
            <router-link :to="{path:'/user/money-management/account-management',query:{type:'resetPwd'}}">修改支付密码</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ProbationReport',
    components: {
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iInput: Input,
      TimeDown: TimeDown
    },
    data() {
      return {
        trialCheckStatus: 'pass',
        showRefundModel: false,
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
      }
    },
    mounted() {},
    created() {
      let id = this.$route.query.id;
      let from = this.$route.query.from;
      if (from === 'buyer') {
        this.showType = 'buyer';
      }
      if(from === 'taskPassAudit'){
        this.showType = 'taskPassAudit';
      }
      this.lookShowkerReport(id);
    },
    watch: {},
    computed: {
      isPwdAmend: function () {
        return this.$store.getters.getIsEditPwdAlready;
      },
    },
    methods: {
      returnUpPage() {
        this.$router.push({name: 'ApproveShowker', query: {taskId: this.showkerTaskInfo.task.id}})
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
            _this.trialReportImages = _this.showkerReportInfo.trialReportImages ? JSON.parse(_this.showkerReportInfo.trialReportImages) : [];
            _this.showNowImageSrc = _this.trialReportImages[0];
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      confirmReport() {
        let _this = this;
        if(!_this.noPassReason){
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
            _this.returnUpPage();
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
              content: '已向秀客返款成功！',
              duration: 4
            });
            _this.showRefundModel = false;
            _this.returnUpPage();
          } else {
            _this.$Message.error({
              content: res.msg,
              duration: 4
            })
          }
        })
      }
    },
  }
</script>
