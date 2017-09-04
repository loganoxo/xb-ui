<template>
  <div class="my-pay">
    <div  class="clear my-pay-top">
      <span class="left">当前可用余额<span style="color:red ">{{getUserBalance}}</span>元</span>
      <span class="right cursor-p" style="color: blue;">查看充值记录</span>
    </div>
    <div class="my-pay-desc">
      <iForm :model="payMoney" :label-width="200" :rules="payMoneyRule">
        <Form-item label="请输入充值金额:" prop="number">
          <iInput v-model="payMoney.number"  style="width: 200px"></iInput>
          <span class="ml-10">元(最低1元起充)</span>
        </Form-item>
        <Form-item label="请选择支付方式:" prop="payMode">
          <Radio-group v-model.number="payMoney.payMode">
            <Radio label="ali">
              <img src="~assets/img/task-release/zfb_logo.png" alt="支付宝" class="vtc-mid">
            </Radio>
            <Radio label="weiXin">
              <img src="~assets/img/task-release/wechat_logo.png" class="vtc-mid">
            </Radio>
          </Radio-group>
        </Form-item>
        <Form-item>
          <iButton type="primary" style="width: 100px" @click="modal3 = true">提交</iButton>
          <Modal
            v-model="modal3"
            :styles="{top:'210px',width:'600px'}">
            <PayModel></PayModel>
          </Modal>
        </Form-item>
      </iForm>
    </div>
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10">
        <h3>1、充值多久后到账？</h3>
        <p>答：充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
      </div>
    </div>
  </div>
  <!--<PayModel></PayModel>-->
</template>
<script>
  import api from '@/config/apiConfig'
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import PayModel from  '@/components/PayModel'
  import {mapActions} from 'vuex'
  import {isNumber} from '@/config/utils'
  export default {
    name: 'MoneyManagement',
    components: {
      Radio:Radio,
      RadioGroup:Radio.Group,
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      PayModel:PayModel,

    },
    data() {
      //表单验证

      const  validatePayNumber =(rule,value,callback)=>{
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(value))){
          callback(new Error('金额为数字，请您重新输入'))
        }else {
          callback()
        }
      };

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };

      const validateDefaultPassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.defaultModifyCustom.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.trendsModifyCustom.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'));
        } else {
          callback()
        }
      };
      return {
        payMoney:{
          number:null,
          payMode: 'ali',
        },
        payMoneyRule:{
          number: [
            {validator: validatePayNumber, trigger: 'blur'}
          ]
        },
        imgSrc: null,
        modal3:false,
      }
    },
    mounted() {

    },
    created() {
      this.getUserAccount()
    },
    computed: {
      getUserBalance: function () {
        return this.$store.state.userBalance
      }

    },
    methods: {
      ...mapActions([
        'getBalance'
      ]),

      seyPassword(){
        if(this.psw==='password'){
          this.psw = 'text';
          this.eye = 'eye-disabled';
        }else {
          this.psw = 'password';
          this.eye = 'eye';
        }
      },
      getUserAccount() {
        let _this = this;
        api.getUserAccount().then(res => {
          if (res.status) {
            _this.userList = res.data;
            _this.userAccount = res.data.userAccount;
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
    }
  }
</script>


