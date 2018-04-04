<template>
  <div class="my-pay">
    <div class="clear my-pay-top">
      <span class="left">当前可用余额<span style="color:red ">{{getUserBalance}}</span>元</span>
      <router-link :to="{'path':'/user/money-management/transaction-record',query:{'activeType':1}}"
                   class="right cursor-p" style="color: blue;">查看充值记录
      </router-link>
    </div>
    <div class="my-pay-desc">
      <iForm :model="payMoney" :label-width="200" :rules="payMoneyRule">
        <Form-item label="请输入充值金额:" prop="number">
          <iInput v-model="payMoney.number" @on-blur="" style="width: 200px"></iInput>
          <span class="ml-10">元(最低1元起充)</span>
        </Form-item>
        <Form-item label="请选择支付方式:" prop="payMode">
          <Radio-group v-model.number="payMoney.payMode">
            <Radio label="ali">
              <img src="~assets/img/task-release/zfb_logo.png" alt="支付宝" class="vtc-mid">
            </Radio>
            <!--<Radio label="weiXin">-->
            <!--<img src="~assets/img/task-release/wechat_logo.png" class="vtc-mid">-->
            <!--</Radio>-->
          </Radio-group>
        </Form-item>
        <div class="pay-tip">
          <Icon color="#f9284f" size="16" type="alert-circled"></Icon>
          <span class="fs-14">使用支付宝充值支付，支付宝会收取0.6%的手续费，该笔费用需要商家承担，后续如有返款 / 退款，手续费不予退还，敬请谅解！<a @click="isShowAliPayTip = true">查看支付宝官方说明</a></span>
        </div>
        <Form-item>
          <iButton class="payMoneyBtn" @click="balanceOrderCreate()">提交</iButton>
          <!--<iButton class="payMoneyBtn" @click="stopRecharge = true">提交</iButton>-->
        </Form-item>
      </iForm>
      <Modal v-model="payPopWindow" width="360" :styles="{top:'310px',height:'300px'}">
        <div class="text-ct">
          <p>请前往充值页面进行充值</p>
        </div>
        <div slot="footer">
          <iButton type="success" style="width: 150px;" @click="success">已完成充值</iButton>
          <iButton type="error" style="width: 150px;" @click="error">充值遇到问题</iButton>
        </div>
      </Modal>
      <Modal v-model="payPopWindowWX"
             :styles="{top:'310px'}">
        <div slot="header" class="text-ct">微信支付二维码</div>
        <div class="text-ct">
          <img :src="imgSrc" alt="">
        </div>
        <div slot="footer" class="text-ct">
          <iButton type="success" style="width: 120px;padding: 10px 10px;background-color: #FF6600;border: none"
                   @click="success">充值成功
          </iButton>
          <iButton type="error"
                   style="width: 120px;padding: 10px 10px;margin-left: 50px;background-color: #3FC0C5;border: none"
                   @click="error">充值失败
          </iButton>
        </div>
      </Modal>
      <modal v-model="isShowAliPayTip">
        <img src="~assets/img/common/ali-pay-tip.png" style="width: 100%">
      </modal>
    </div>
    <!--<Modal v-model="stopRecharge" width="360">
      <p slot="header" style="color:#f9284f;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>系统维护</span>
      </p>
      <div style="text-align:center">
        <p style="height: 10px;"></p>
        <p class="fs-14">支付宝充值系统正在维护中，请稍后再试！</p>
        <p style="height: 10px;"></p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long @click="stopRecharge = false" >确定</iButton>
      </div>
    </Modal>-->
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10">
        <h3>1、充值多久后到账？</h3>
        <p>答：充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
      </div>
    </div>

  </div>
</template>
<script>
  import api from '@/config/apiConfig'
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import {isNumber} from '@/config/utils'
  import {aliPayUrl, weiXinPayUrl} from '@/config/env'

  export default {
    name: 'MoneyManagement',
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
      }
    },
    mounted() {
    },
    created() {
    },
    computed: {
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },
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
            feeToAccount: (_this.payMoney.number * 100).toFixed() * 1,
            finalFee: (_this.payMoney.number * 100 * 1.006).toFixed() * 1,
            orderPlatform: 'PC',
            payChannel: 1
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
            payChannel: 1
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
    }
  }
</script>



