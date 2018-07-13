<template>
  <div class="withdrawal-operate">
    <div class="notice">
      <icon type="alert-circled" color="#e60012" size="16"></icon>
      所有当日提交的提现申请，统一次日中午进行返款。成功提现的订单即表示已经打款成功，具体到账时间以每个银行受理时间为准。如遇到周末或者节假日，则统一顺延。
    </div>
    <div class="form-area">
      <iForm ref="withdrawal" v-model="getoutMoney" :label-width="200" :rules="getOutMoneyRule">
        <form-item label="请输入提现金额" prop="amount">
          <i-input v-model.number="getoutMoney.amount" style="width:30%;"></i-input>
          <span>元（最低1元起）</span>
        </form-item>
        <form-item label="开户人姓名" prop="name">
          <i-input v-model="getoutMoney.name" style="width:30%;"></i-input>
        </form-item>
        <form-item label="选择银行" prop="bank">
          <i-select v-model="getoutMoney.bank" :filterable="true" style="width:30%;">
            <i-option v-for="(item,index) in bankList" :key="index" :value="item">{{item}}</i-option>
          </i-select>
        </form-item>
        <form-item label="提现银行卡号" prop="cardNumber">
          <i-input v-model="getoutMoney.cardNumber" style="width:30%;"></i-input>
        </form-item>
      </iForm>
    </div>
    <div class="btn-area mt-50">
      <i-button class="submit-btn" @click="submit">申请提现</i-button>
    </div>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import bankList from '@/config/bankList';
  import {Form, Input, Select, Option, Icon, Button} from 'iview'
  export default {
    name: "withdrawal-operate",
    components: {
      iForm: Form,
      FormItem: Form.Item,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      Icon: Icon,
      iButton: Button
    },
    data() {
      // 表单验证
      const validateAmount = (rule, value, callback) => {
        if (!(/^\d+(\.\d{1,2})?$/.test(value))) {
          callback(new Error('输入的提现金额必须为数字且仅支持两位小数，请您重新输入'))
        } else {
          callback()
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入姓名'));
        }
        else {
          callback()
        }
      };
      const validateBank = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          callback(new Error('请选择所属银行'));
        } else {
          callback()
        }
      };
      const validateBankNumber = (rule, value, callback) => {
        if (!(/^([1-9]{1})(\d{15}|\d{18}|\d{17}|d{16})$/.test(value))) {
          callback(new Error('请输入正确的银行卡号'));
        } else {
          callback()
        }
      };
      return {
        getoutMoney: {
          amount: null,
          name: null,
          bank: null,
          cardNumber: null
        },
        getOutMoneyRule: {
          amount: [
            {validator: validateAmount, trigger: 'blur'}
          ],
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          bank: [
            {validator: validateBank, trigger: 'blur'}
          ],
          cardNumber: [
            {validator: validateBankNumber, trigger: 'blur'}
          ]
        },
        bankList: bankList
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      submit() {
        console.log(this.getoutMoney.bank)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';
  .withdrawal-operate {
    .notice {
      margin: 20px;
      padding: 15px 10px;
      background: #FFF6F3;
      width:65%;
      font-size: 14px;
      color: #FF6F48;
    }
    .submit-btn {
      margin-left: 195px;
      padding: 10px 40px;
      color: #fff;
      background: $mainColor;
    }
  }
</style>
