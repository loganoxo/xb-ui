<template>
  <div class="my-pay">
    <div class="clear my-pay-top">
      <span class="left">当前可用余额<span style="color:red ">{{(getUserBalance / 100).toFixed(2)}}</span>元</span>
      <router-link :to="{'path':'/user/money-management/transaction-record',query:{'activeType':1}}"
                   class="right cursor-p" style="color: blue;">查看充值记录
      </router-link>
    </div>
    <div v-show="status === 'aliPay'" class="aliPay">
      <div class="my-pay-desc">
        <i-form :model="payMoney" :label-width="200" :rules="payMoneyRule" ref="payForm">
          <form-item label="请输入充值金额:" prop="number">
            <i-input v-model="payMoney.number" @on-blur="" style="width: 200px"/>
            <span class="ml-10">元(最低1元起充)</span>
          </form-item>
          <form-item label="请选择支付方式:" prop="payMode">
            <radio-group v-model.number="payMoney.payMode">
              <radio label="ali">
                <img src="~assets/img/task-release/zfb_logo.png" alt="支付宝" class="vtc-mid">
              </radio>
              <!--<Radio label="weiXin">-->
              <!--<img src="~assets/img/task-release/wechat_logo.png" class="vtc-mid">-->
              <!--</Radio>-->
            </radio-group>
          </form-item>
          <div class="pay-tip">
            <icon color="#f9284f" size="16" type="alert-circled"/>
            <span class="fs-14">使用支付宝充值支付，支付宝会收取0.6%的手续费，该笔费用需要商家承担，手续费不予退还，敬请谅解！<a @click="isShowAliPayTip = true">查看支付宝官方说明</a></span>
          </div>
          <form-item>
            <i-button class="payMoneyBtn" @click="balanceOrderCreate()">提交</i-button>
            <i-button class="vipRecharge ml-20" @click="toArtificialPay"><span class="freeRecharge">免手续费充值</span>点击这里</i-button>
            <!--<i-button class="payMoneyBtn" @click="stopRecharge = true">提交</i-button>-->
          </form-item>
        </i-form>
      </div>
      <div class="common-question">
        <h2>常见问题</h2>
        <div class="mt-10">
          <h3>1、充值多久后到账？</h3>
          <p>答：充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
        </div>
      </div>
    </div>
    <div v-show="status === 'artificialPay'" class="artificialPay fs-14 cl000">
      <p class="pt-10 pb-10 pl-5">
        <icon type="md-information-circle" color="#f9284f" size="16" class="vtc-text-btm"/>
        7*24小时 自动到账
      </p>
      <div class="point-box">
        <p>银行卡注意事项：</p>
        <p>1，人工审核对账，免手续费</p>
        <p>2，建议使用手机银行APP转账，绝大多数手机银行APP都免手续费</p>
        <p>3，由于银行间转账存在一定的时差，建议您使用实时到账，联系客服确认到账</p>
        <p>4，当天充值金额请勿重复！否则只会到账一笔！</p>
      </div>
      <div class="step-box mt-10">
        <h2>第一步：转账到官方账号：</h2>
        <div class="step-one pt-20 pb-20 pl-15">
          <p>到账时间：<span class="main-color">自动到账，7*24小时</span></p>
          <p>浙商银行 <span class="main-color">6223 0933 1001 2598 036</span> （户名：胡红红 开户行：浙商银行运河支行）</p>
          <p class="qq-consult" @click="qqConsult"><img class="vtc-text-btm mr-5" src="~assets/img/common/qq-icon.png" alt="">转账问题点此咨询 QQ：3416123233</p>
        </div>
        <h2>第二步：每次打完钱都必需提交如下信息，否则<span>无法到账</span></h2>
        <div class="step-two">
          <i-form ref="form" :model="rechargeApplyInfo" :rules="applyRule">
            <form-item label="转账金额" prop="rechargeFee">
              <i-input class="width-150 mr-10" v-model="rechargeApplyInfo.rechargeFee" :maxlength="16"/>
              <span class="mr-10">元</span>
              <span class="main-color fs-16">当天充值金额请勿重复！</span>
            </form-item>
            <form-item label="支付渠道" prop="payChannel">
              <radio-group v-model="rechargeApplyInfo.payChannel" @on-change="channelChange">
                <radio label="ebank_pc">PC版网上银行</radio>
                <radio label="ebank_app">手机银行APP</radio>
                <radio label="alipay">支付宝转账到银行卡</radio>
              </radio-group>
            </form-item>
            <form-item :label="rechargeApplyInfo.payChannel === 'alipay' ? '支付宝绑定姓名': '转出银行卡持卡人姓名'" prop="name">
              <i-input v-model="rechargeApplyInfo.name" class="width-150"/>
            </form-item>
            <form-item v-if="rechargeApplyInfo.payChannel === 'alipay'" label="转出渠道" prop="outBank">
              <i-select v-model="rechargeApplyInfo.outBank" class="width-pct-39" disabled>
                <i-option value="支付宝" label="支付宝">支付宝</i-option>
              </i-select>
            </form-item>
            <form-item v-else label="转出银行名称" prop="outBank">
              <i-select v-model="rechargeApplyInfo.outBank" clearable filterable class="width-pct-39" ref="bankListSelect" placeholder="请选择（支持关键词搜索）">
                <i-option v-for="(bank,index) in bankList" :key="index" :value="bank" :label="bank">{{bank}}</i-option>
              </i-select>
            </form-item>
            <form-item label="转入银行名称" prop="inBank">
              <i-select v-model="rechargeApplyInfo.inBank" disabled class="width-pct-39">
                <i-option :value="item.label" :label="item.label" v-for="(item,index) in inBankList" :key="index">{{item.label}}</i-option>
              </i-select>
            </form-item>
          </i-form>
          <p class="main-color lht28 fs-18 f-b">当天充值金额请勿重复，每次充不同金额到银行（如充值5001元,5002元等做区分），转账金额不要重复！（目前平台已实现自动到账，确保功能稳定，请勿提交重复金额订单，谢谢支持）</p>
          <p class="main-color fs-16">注：请勿使用企业支付宝或者公司网银转账，否则不会自动到账！</p>
          <div class="mt-20">
            <i-button class="artificialPaySubmit" :loading="rechargeApplyLoading" @click="applySubmit" :disabled="disabled" :class="{'disabled-btn':disabled}">提交</i-button>
            <span v-if="showTimeDown" class="submit-limit">请于<time-down :endTime="limitTime" format="mm:ss" @timeEnd="timeEnd"/>后再提交</span>
          </div>
        </div>
      </div>
    </div>
    <modal v-model="payPopWindow" width="360" :styles="{top:'310px',height:'300px'}">
      <div class="text-ct">
        <p>请前往充值页面进行充值</p>
      </div>
      <div slot="footer">
        <i-button type="success" style="width: 150px;" @click="success">已完成充值</i-button>
        <i-button type="error" style="width: 150px;" @click="error">充值遇到问题</i-button>
      </div>
    </modal>
    <modal v-model="payPopWindowWX"
           :styles="{top:'310px'}">
      <div slot="header" class="text-ct">微信支付二维码</div>
      <div class="text-ct">
        <img :src="imgSrc" alt="">
      </div>
      <div slot="footer" class="text-ct">
        <i-button type="success" style="width: 120px;padding: 10px 10px;background-color: #FF6600;border: none"
                 @click="success">充值成功
        </i-button>
        <i-button type="error"
                 style="width: 120px;padding: 10px 10px;margin-left: 50px;background-color: #3FC0C5;border: none"
                 @click="error">充值失败
        </i-button>
      </div>
    </modal>
    <modal v-model="isShowAliPayTip">
      <img src="~assets/img/common/ali-pay-tip.jpg">
    </modal>
    <!--人工充值申请成功提交后的提示弹窗-->
    <modal v-model="isSuccessApply" title="提示">
      <p class="fs-16 f-b cl000">已成功提交，若15分钟后没到账请联系客服处理！</p>
    </modal>
    <!--充值提示-->
    <modal v-model="isShowPayTip">
      <p slot="header" class="text-ct">
        <icon type="md-information-circle" color="#f9284f" size="18"/>
        <span class="main-color">充值提示</span>
      </p>
      <div class="lht28 cl000">
        <p>1、请<span class="main-color">尽量使用手机银行</span>APP转账，绝大多数手机银行APP都免手续费,且即时到帐。</p>
        <p>2、<span class="main-color">不推荐使用支付宝</span>转账到银行卡，除超出额度会收取千分之一的手续费外，频繁支付宝对银行卡转出可能存在风险！</p>
      </div>
      <div class="announcement mt-20 main-color lht20">
        <p class="mb-20 text-ct"><icon type="md-information-circle" color="#f9284f" size="18"/><span class="ml-5 cl000 f-b vtc-mid">浙商银行关于数据中心搬迁暂停服务的公告</span></p>
        <p class="fs-16 f-b mb-20 text-ct">10月4日 0:00-24:00无法充值，请提前充值做好准备！</p>
        <p>浙商银行关于数据中心搬迁暂停服务的公告</p>
        <p>发布日期：2018-09-21</p>
        <p>尊敬的客户：</p>
        <p class="text-indent">为了能够向您提供更加优质、高效的金融服务，本行将于2018年10月4日（周四）0:00至24:00实施数据中心整体搬迁，业务受影响情况如下：</p>
        <p class="text-indent">一、10月4日0:00至12:00，除本行信用卡持卡交易（仅限非本行电子渠道）外，所有本行营业网点、电子渠道（包括但不限于网上银行、手机银行、电话银行、自助设备、POS、第三方支付等）均暂停服务。</p>
        <p class="text-indent">二、10月4日12:00至24:00，上述部分本行渠道服务可能会受到短暂影响。</p>
        <p class="text-indent">请您提前做好资金安排，避开此时段进行操作，如有疑问请咨询本行客服热线95527。搬迁期间给您带来的不便，敬请谅解！本行将努力缩短暂停服务时间，感谢您的理解与支持！</p>
        <p class="text-indent">特此公告。</p>
      </div>
      <div slot="footer">
        <i-button long type="error" @click="isShowPayTip = false">确定</i-button>
      </div>
    </modal>
    <artificial-recharge-model v-if="showFreePayModel" @colseFreePayModal="showFreePayModel=false"/>
  </div>
</template>
<script>
  import {Icon, Form, Input, Radio, Button, Modal, Select, Option} from 'iview'
  import api from '@/config/apiConfig'
  import {isNumber, getSeverTime, setStorage, getStorage, removeStorage, verifyChinese} from '@/config/utils'
  import {aliPayUrl, weiXinPayUrl} from '@/config/env'
  import ArtificialRechargeModel from '@/components/ArtificialRechargeModel'
  import TimeDown from '@/components/TimeDown'
  import commonConfig from '@/config/commonConfig'

  export default {
    name: 'PayMoney',
    components: {
      Radio: Radio,
      RadioGroup: Radio.Group,
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      iSelect: Select,
      iOption: Option,
      ArtificialRechargeModel: ArtificialRechargeModel,
      TimeDown: TimeDown
    },
    data() {
      const validatePayNumber = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请输入需要充值的金额'))
        }else if (value && !(/^[0-9]+(.[0-9]{1,2})?$/.test(value))) {
          callback(new Error('金额必须为正数，请您重新输入'))
        } else if (value < 1) {
          callback(new Error('最低一元起充,请您重新输入'))
        } else {
          callback()
        }
      };
      const validateRechargeFee = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入充值金额'));
        } else if (value * 100 === this.seasonVipFee || value * 100 === this.halfYearVipFee || value * 100 === this.yearVipFee) {
          callback(new Error('转账金额请勿与VIP价格（1199、1999、2999）相同！'));
        }else if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.rechargeApplyInfo.rechargeFee))) {
          callback(new Error('请输入数字，如果金额带小数，请保留两位小数'));
        } else {
          callback();
        }
      };
      const validateChannel = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入充值渠道'));
        } else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入持卡人姓名'));
        } else if (value.length > 20) {
          callback(new Error('姓名的字符长度不能超过20'));
        } else if (!verifyChinese(value)) {
          callback(new Error('绑定姓名仅支持中文，请输入中文字符'))
        } else {
          callback();
        }
      };
      const validateOutBank = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入转出银行名称'));
        } else {
          callback();
        }
      };
      const validateInBank = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择转入银行名称'));
        } else {
          callback();
        }
      };
      return {
        stopRecharge: false,
        payMoney: {
          number: null,
          payMode: 'ali',
        },
        payMoneyRule: {
          number: [
            {validator: validatePayNumber, trigger: 'blur'}
          ]
        },
        imgSrc: null,
        payPopWindow: false,
        payPopWindowWX: false,
        isShowAliPayTip: false,
        showFreePayModel: false,
        status: 'aliPay',
        rechargeApplyInfo: {
          rechargeFee: null,
          payChannel: null,
          name: null,
          outBank: null,
          inBank: '浙商银行',
        },
        rechargeApplyLoading: false,
        inBankList: [
          {
            label: '浙商银行',
            value: '浙商银行'
          },
        ],
        bankList: commonConfig.bankList,
        applyRule: {
          rechargeFee: [
            {validator: validateRechargeFee, trigger: 'blur'}
          ],
          payChannel: [
            {validator: validateChannel, trigger: 'change'}
          ],
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          outBank: [
            {validator: validateOutBank, trigger: 'blur'}
          ],
          inBank: [
            {validator: validateInBank, trigger: 'change'}
          ]
        },
        seasonVipFee: null,
        halfYearVipFee: null,
        yearVipFee: null,
        isSuccessApply: false,
        showTimeDown: false,
        limitTime: null,
        disabled: false,
        isShowPayTip: false
      }
    },
    mounted() {
      if (this.status === 'aliPay') {
        this.$refs.form.resetFields();
      } else if (this.status === 'artificialPay') {
        this.$refs.payForm.resetFields();
        this.isShowPayTip = true;
      }
    },
    created() {
      this.getMemberVersionPeriodList();
      if (this.stage) {
        this.status = 'artificialPay'
      }
      if (getStorage('limitTime')) {
        this.limitTime = getStorage('limitTime');
        this.showTimeDown = true;
        this.disabled = true;
      }
    },
    computed: {
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      memberLevel(){
        return this.$store.getters.getMemberLevel;
      },
      stage() {
        return this.$route.query ? this.$route.query.stage : false
      }
    },
    methods: {
      success() {
        this.$store.dispatch('getUserInformation');
        this.payPopWindow = false;
        this.payPopWindowWX = false;
        this.payMoney.number = null;
      },
      error() {
        this.payPopWindow = false;
        this.payPopWindowWX = false;
      },
      balanceOrderCreate() {
        let _this = this;
        if (!_this.payMoney.number) {
          return;
        }
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(_this.payMoney.number))) {
          return;
        }
        if (_this.payMoney.number < 1) {
          return;
        }
        if (_this.payMoney.payMode === 'ali') {
          const newWindowUrl = window.open('about:blank');
          api.balanceOrderCreate({
            feeToAccount: Math.ceil(_this.payMoney.number * 100),
            finalFee: (Math.ceil(Math.ceil(_this.payMoney.number * 100) / 0.994)),
            orderPlatform: 'PC',
            payChannel: 1,
            orderType: 0
          }).then(res => {
            if (res.status) {
              _this.payPopWindow = true;
              newWindowUrl.location.href = aliPayUrl + 'orderSerial=' + res.data.orderSerial;
              _this.payMoney.number = null;
            } else {
              _this.$Message.error(res.msg);
            }
          });
        } else {
          api.balanceOrderCreate({
            feeToAccount: (_this.payMoney.number * 100).toFixed() * 1,
            finalFee: (_this.payMoney.number * 100 * 1.006).toFixed() * 1,
            orderPlatform: 'PC',
            payChannel: 2,
            memberId: null,
            orderType: 0
          }).then(res => {
            if (res.status) {
              _this.payPopWindowWX = true;
              _this.imgSrc = weiXinPayUrl + 'orderSerial=' + res.data.orderSerial + '&userId=' + res.data.uid;
              _this.payMoney.number = null;
            } else {
              _this.$Message.error(res.msg);
            }
          });
        }
      },
      // 获取所有会员版本周期列表
      getMemberVersionPeriodList() {
        const _this = this;
        api.getMemberVersionPeriodList().then(res => {
          if (res.status) {
            let tempData = res.data;
            let seasonVip = tempData.find(item => {
              return item.level === 200 && item.validDays === 91;
            });
            let halfYearVip = tempData.find(item => {
              return item.level === 200 && item.validDays === 182;
            });
            let yearVip = tempData.find(item => {
              return item.level === 200 && item.validDays === 365;
            });
            _this.seasonVipFee = seasonVip.fee;
            _this.halfYearVipFee = halfYearVip.fee;
            _this.yearVipFee = yearVip.fee;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      channelChange(value) {
        if (value === 'alipay') {
          this.rechargeApplyInfo.outBank = '支付宝';
        } else {
          this.$nextTick(function () {
            this.$refs.bankListSelect.clearSingleSelect();
          });
          this.rechargeApplyInfo.outBank = null;
        }
        this.rechargeApplyInfo.name = null;
      },
      timeEnd() {
        this.showTimeDown = false;
        this.disabled = false;
        removeStorage('limitTime');
      },
      // 人工充值申请提交
      applySubmit() {
        const _this = this;
        if (!_this.rechargeApplyInfo.rechargeFee) {
          _this.$Message.info('请输入充值金额');
          return
        }
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(_this.rechargeApplyInfo.rechargeFee))) {
          _this.$Message.info('请输入数字，如果金额有小数，请保留两位');
          return
        }
        if (!_this.rechargeApplyInfo.payChannel) {
          _this.$Message.info('请选择充值渠道');
          return
        }
        if (!_this.rechargeApplyInfo.name) {
          _this.$Message.info('请输入持卡人姓名');
          return
        }
        if (_this.rechargeApplyInfo.name.length > 20) {
          _this.$Message.info('姓名字符长度不可超过20');
          return
        }
        if (!verifyChinese(_this.rechargeApplyInfo.name)) {
          _this.$Message.info('绑定姓名仅支持中文，请输入中文字符');
          return
        }
        if (!_this.rechargeApplyInfo.outBank) {
          _this.$Message.info('请输入转出银行名称');
          return
        }
        if (!_this.rechargeApplyInfo.inBank) {
          _this.$Message.info('请选择转入银行名称');
          return
        }
        _this.rechargeApplyLoading = true;
        api.rechargeApply({
          money: Math.ceil(_this.rechargeApplyInfo.rechargeFee * 100),
          channel: _this.rechargeApplyInfo.payChannel,
          payName: _this.rechargeApplyInfo.name,
          bankFrom: _this.rechargeApplyInfo.outBank,
          bankIn: _this.rechargeApplyInfo.inBank,
          payDay: getSeverTime()
        }).then(res => {
          if (res.status) {
            _this.isSuccessApply = true;
            _this.$store.dispatch('getUserInformation');
            _this.limitTime = getSeverTime() + 5 * 60 * 1000;
            setStorage('limitTime',_this.limitTime);
            _this.disabled = true;
            _this.showTimeDown = true;
            if (_this.rechargeApplyInfo.payChannel !== 'alipay') {
              this.$refs.bankListSelect.clearSingleSelect();
            }
            for(let key in _this.rechargeApplyInfo) {
              _this.rechargeApplyInfo[key] = null;
            }
            _this.rechargeApplyInfo.inBank = '浙商银行';
            _this.$refs.payForm.resetFields();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.rechargeApplyLoading = false;
        })
      },
      toArtificialPay() {
        this.status = 'artificialPay';
        this.isShowPayTip = true;
      },
      qqConsult() {
        window.open('http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=3416123233')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/css/mixin';
  .upgroup-btn{
    display: inline-block;
    padding:0 10px;
    border-radius: 5px;
    border:1px solid $mainColor;
    color:$mainColor;
    background: #ffd700;
  }
  .vipRecharge{
    color:#fff;
    background: #25b2f0;
    padding:10px 20px;
    .freeRecharge{
      color: #f7fc08;
    }
  }
  .artificialPay {
    .point-box {
      background: #FFF5E2;
      border-radius: 3px;
      line-height: 30px;
      padding: 15px 10px;
    }
    .step-box {
      border: 1px solid #f8f8f8;
      h2 {
        background: #F8F8F8;
        padding: 15px;
      }
      .step-two {
        padding: 20px 0 40px 40px;
      }
      .artificialPaySubmit {
        background: $mainColor;
        color: #fff;
        width: 200px;
        margin-left: 10%;
      }
      .disabled-btn {
        background: #ccc;
      }
    }
    .submit-limit {
      padding: 5px 15px;
      border:1px solid #ccc;
      border-radius: 5px;
      margin-left: 20px;
      transform: translateY(20px);
    }

    .qq-consult {
      width: 272px;
      height: 26px;
      line-height: 26px;
      background-color: #E5E5E5;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 10px;
    }
  }
</style>



