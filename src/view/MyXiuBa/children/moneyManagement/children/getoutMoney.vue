<template>
  <div class="my-getoutmoney">
    <div class="not-certification" v-show="changeBankIdCardShow.isCertification">
      <h2>
        <Icon type="close-circled" class="mr-10 vtc-mid icon"></Icon>
        很抱歉，您未进行实名认证，无法提现
      </h2>
      <div class="how-todo"><span>你现在可以：</span>
        <router-link to="/user/personal-setting/verified" class="ml-10">立即申请实名认证</router-link>
        <span class="ml-10 mr-10">|</span><a class="ml-10">查看如何进行实名认证</a></div>
    </div>
    <div class="bound-bankcard" v-show="changeBankIdCardShow.isBondBankCard">
      <div class="bankcard-title">
        <Icon class="icon vtc-btm" type="information-circled"></Icon>
        <span class="ml-10">请先绑定银行卡，再进行提现操作</span></div>
      <div class="addcard" @click="addBankCard">
        <Icon class="icon" type="plus-circled"></Icon>
        <p class="mt-10">添加银行卡</p>
      </div>
    </div>
    <div class="add-bankcard" v-show="changeBankIdCardShow.bondBankCard">
      <div class="title">
        <Icon type="information-circled" class="icon ml-20 over-hd"></Icon>
        <span>每个用户只能绑定一张银行卡，如需换卡建议修改银行卡信息</span>
      </div>
      <div class="ipt-information">
        <iForm :model="formItem" :label-width="200" :rules="formRuleItem">
          <Form-item label="开户人姓名:" prop="name">
            <iInput v-model="formItem.name"></iInput>
          </Form-item>
          <Form-item label="选择银行" prop="select">
            <iSelect v-model="formItem.select" style="width:300px;height: 32px">
              <iOption value="中国建设银行">中国建设银行</iOption>
              <iOption value="中国工商银行">中国工商银行</iOption>
              <iOption value="中国农业银行">中国农业银行</iOption>
              <iOption value="中国招商银行">中国招商银行</iOption>
            </iSelect>
          </Form-item>
          <Form-item label="银行卡号:" prop="bankNumber">
            <iInput v-model="formItem.bankNumber"></iInput>
          </Form-item>
          <Form-item label="开户支行:" prop="bankBranch">
            <iInput v-model="formItem.bankBranch"></iInput>
          </Form-item>
          <Form-item label="手机号:">
            {{getUserPhone}}
          </Form-item>
          <Form-item label="图形验证码:" class="formPosition" prop="validateCode" style="width: 380px">
            <iInput v-model="formItem.validateCode"></iInput>
            <div style="width: 100px; " class="ibtn">
              <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
            </div>
          </Form-item>
          <Form-item label="短信验证码:" class="formPosition" prop="cord" style="width: 380px">
            <iInput v-model="formItem.cord" class="formiInput "></iInput>
            <SmsCountdown :on-success="sendCodeSuccess" style="top: 2px; right: -112px"
                          :phone="this.getUserPhone"
                          :purpose="formItem.purpose"
                          :validateCode="formItem.validateCode"
            >
            </SmsCountdown>
          </Form-item>
          <Form-item>
            <iButton type="primary" @click=" addBankCardInfo(formItem)">提交</iButton>
            <iButton type="ghost" style="margin-left: 8px" @click="goBack">取消</iButton>
          </Form-item>
        </iForm>
      </div>
    </div>
    <div class="get-out-number" v-show="changeBankIdCardShow.getoutMoney">
      <div class="clear title">
        <span class="left">当前可用余额<span style="color:red ">{{getUserBalance}}</span>元</span>
        <span class="right cursor-p" style="color: blue;" @click="lookGetoutRecord('getoutRecord')">查看提现记录</span>
      </div>
      <div class="content">
        <div class="warning">
          <Icon type="information-circled" class="icon ml-20 over-hd"></Icon>
          <span class="ml-56">当日12:00-当日18:00间申请提现的，在当日18:00处理，当日18:00-次日12:00间申请提现的，在次日12:00处理</span>
        </div>
        <div class="get-out-do mt-22">
          <iForm :model="getoutMoney" :label-width="200" :rules="getOutMoneyRule">
            <Form-item label="请输入提现金额:" prop="getoutNumber">
              <iInput v-model="getoutMoney.getoutNumber" class="iInput"></iInput>
              <span>元（最低1元起提）</span>
            </Form-item>
            <Form-item label="提现银行卡号:">
              <span style="width: 202px;display: inline-block">{{userAccount.bankCardNum}}</span><span
              class=" main-color cursor-p" @click="getBankCardInformationApi">修改银行卡</span>
            </Form-item>
            <Form-item label="支付密码:" prop="password">
              <iInput v-model="getoutMoney.password" class="iInput" :type="psw" :icon="eye"
                      @on-click="seyPassword"></iInput>
              <span v-show="getIfEditPwdAlready === false">初始密码为888888，为了你的账号安全，建议您
                <router-link :to="{'path':'/user/money-management/account-management','query':{'type':'resetPwd'}}">重置支付密码。</router-link>
              </span>
              <span v-show="getIfEditPwdAlready === true"><router-link to="/user/money-management/account-management">忘记支付密码？</router-link></span>
            </Form-item>
            <Form-item>
              <iButton type="primary" @click="getOutMoneyPopWindow = true,applyGetoutMoney(getoutMoney)" class="ibtns">申请提现</iButton>
              <Modal
                v-model="getOutMoneyPopWindow"
                :styles="{top:'210px',width:'580px'}"
                @on-ok="success"
                title="">
                <p style="text-align: center;font-size: 40px;color: #FF6633;">
                  <Icon :type="iconType"></Icon>
                </p>
                <p class="mt-10 text-ct fs-14"><span style="color: #FF6633;">{{applyGetOut}}</span>当日12:00-当日18:00间申请提现的，在当日18:00处理
                </p>
                <p class="mt-10 text-ct fs-14">当日18:00-次日12:00间申请提现的，在次日12:00处理，你可以在提现记录中查看进度</p>
              </Modal>
            </Form-item>
          </iForm>
        </div>
      </div>
    </div>
    <div class="getout-record" v-show="changeBankIdCardShow.getoutRecord">
      <div class="titel clear">
        <span class="left spl">提现记录</span>
        <span class="right spr cursor-p" @click="lookGetoutRecord('getoutMoney')">返回上页</span>
      </div>
      <div class="content-input ">
        <span>流水号：</span>
        <iInput style="width: 150px" v-model="getoutRecord.serialNumber"></iInput>
        <span class="ml-10">申请时间：</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="getoutRecord.applyFrom"
                     format="yyyy-MM-dd HH:mm:ss" :key="getoutRecord.applyFrom"
                     @on-change="getoutRecord.applyFrom=$event"></Date-picker>
        <span>-</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="getoutRecord.applyTo"
                     format="yyyy-MM-dd HH:mm:ss" :key="getoutRecord.applyTo"
                     @on-change="getoutRecord.applyTo=$event"></Date-picker>
        <iButton class="ibtn1" @click="getWithDrawList(getoutRecord)">搜索</iButton>
      </div>
      <div class="content-select clear">
        <span class="left" v-for="item in getOutStatus" :class="{actives:getOutSelect===item.isSelect}"
              @click="getoutStatusFun(item.isSelect,item.state)">{{item.text}}</span>
      </div>
      <div class="personal-list-table mt-10">
        <table class="list-table">
          <thead>
          <tr>
            <th style="width:20%;">申请时间</th>
            <th style="width:30%;">流水号</th>
            <th style="width:10%;">提现金额（元）</th>
            <th style="width:20%;">代收手续费（元）</th>
            <th style="width:10%;">状态</th>
            <th style="width:10%;">操作</th>
          </tr>
          </thead>
          <tbody v-for="item in getOutResList">
          <tr>
            <td>
              {{item.applyTime | dateFormat('YYYY-MM-DD ')}}<br/>
              {{item.applyTime | dateFormat('hh:mm:ss ')}}
            </td>
            <td>
              {{item.serialNumber}}
            </td>
            <td>{{item.enCashMoney / 100}}</td>
            <td>
              {{item.poundage / 100}}
            </td>
            <td class="main-color">
              {{getTradType(item.state)}}
            </td>
            <td>
              <p style="color:blue;" class="detailsSpc" @click="getMoneyShowDetailsFun(item.id)">
                详情
                <Icon :type="getMoneyShowDetails===item.id?'arrow-up-b':'arrow-down-b'" class="ml-5 "></Icon>
              </p>
            </td>
          </tr>
          <tr v-show="getMoneyShowDetails===item.id">
            <td colspan="6" style="padding: 0px;">
              <table class="small-table" style="background-color: #f9f9f9;">
                <thead>
                <tr>
                  <th style="width:20%;">提现帐号类型</th>
                  <th style="width:30%;">提现帐号</th>
                  <th style="width:15%;">提现金额（元）</th>
                  <th style="width:15%;">代收手续费（元）</th>
                  <th style="width:20%;">实际到账金额（元）</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    {{item.bankName}}
                  </td>
                  <td>
                    {{item.bankCardNum}}
                  </td>
                  <td>
                    {{typeChang(item.enCashMoney / 100)}}
                  </td>
                  <td>
                    {{'-' + item.poundage / 100}}
                  </td>
                  <td>{{typeChang(item.realAmount / 100)}}</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
          <tbody v-show="getOutResList.length === 0">
          <tr>
            <td colspan="6">暂无数据</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="right mt-22" v-show="getOutResList && getOutResList.length > 0" v-if="!isChange">
        <Page :total="totalElements"  @on-change="changePages"></Page>
      </div>
    </div>
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10">
        <p>提现</p>
        <p>1、最低提现金额1元，手续费1%，每天提现次数不限</p>
        <p>2、当日12:00-当日18:00间申请提现的，在当日18:00处理，当日18:00-次日12:00间申请提现的，在次日12:00处理。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Page from 'iview/src/components/page'
  import Button from 'iview/src/components/button'
  import Modal from 'iview/src/components/modal'
  import DatePicker from 'iview/src/components/date-picker'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import api from '@/config/apiConfig'
  import Input from '@/components/Input'
  import SmsCountdown from '@/components/SmsCountdown'
  import {TaskErrorStatusList} from '@/config/utils'
  import {mapActions} from 'vuex'

  export default {
    name: 'MoneyManagement',
    components: {
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      iForm: Form,
      FormItem: Form.Item,
      Page:Page,
      DatePicker: DatePicker,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      SmsCountdown: SmsCountdown
    },
    data() {
      //表单验证
      const validatePayNumber = (rule, value, callback) => {
        if (!(/^[1-9]\d*$/.test(value))) {
          callback(new Error('金额为数字，请您重新输入'))
        } else {
          callback()
        }
      };
      const validateBankCard = (rule, value, callback) => {
        if (!(/^([1-9]{1})(\d{15}|\d{18})$/.test(value))) {
          callback(new Error('请输入正确的银行卡号'));
        } else {
          callback()
        }
      };
      const validateBankName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属银行'));
        } else {
          callback()
        }
      };
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback()
        }
      };
      const validateBankBranch = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入所属银行支行'));
        } else {
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
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入图片验证码'));
        } else {
          callback()
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
        imgSrc: null,
        psw: 'password',
        eye: 'eye',
        getOutMoneyPopWindow: false,
        formItem: {
          name: '',
          select: '',
          bankNumber: '',
          bankBranch: '',
          validateCode: '',
          cord: '',
          purpose: 'id_verify'
        },
        formRuleItem: {
          validateCode: [
            {validator: validateCode, trigger: 'blur'}
          ],
          cord: [
            {validator: validateSmsCode, trigger: 'blur'}
          ],
          bankNumber: [
            {validator: validateBankCard, trigger: 'blur'}
          ],
          select: [
            {validator: validateBankName, trigger: 'blur'}
          ],
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          bankBranch: [
            {validator: validateBankBranch, trigger: 'blur'}
          ]
        },
        getoutMoney: {
          getoutNumber: '',
          password: ''
        },
        getOutMoneyRule: {
          getoutNumber: [
            {validator: validatePayNumber, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        changeBankIdCardShow: {
          isCertification: false,
          isBondBankCard: false,
          bondBankCard: false,
          getoutMoney: false,
          getoutRecord: false
        },
        getOutSelect: 'all',
        getOutStatus: [
          {
            text: '全部',
            isSelect: 'all',
            state: null
          },
          {
            text: '提现中',
            isSelect: 'doing',
            state: "enchashment_audit_ing"
          },
          {
            text: '提现成功',
            isSelect: 'success',
            state: "enchashment_audit_success"
          },
          {
            text: '提现失败',
            isSelect: 'fail',
            state: "enchashment_audit_defeat"
          }
        ],
        applyGetOut: null,
        titleStatus: null,
        iconType: 'checkmark-circled',
        getoutRecord: {
          serialNumber: null,
          applyFrom: '',
          applyTo: '',
        },
        getOutResList: [],
        getMoneyShowDetails: false,
        getBankCardInfo:{},
        totalElements: null,
        pageIndex:1,
        isChange: false,
      }
    },
    mounted() {
    },
    created() {
      if (this.$route.query.bandCard === 'bandCard') {
        this.getBankCardInformationApi()
      }else if (this.$route.query.getOutMoneyRecord === 'getOutRecord'){
        this.showDifffentModel('getoutRecord')
      }else {
        this.changeBankIdcardShowFun();
      }
      this.getVrcode();
      this.getWithDrawList(this.titleStatus);
    },
    computed: {
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      getUserPhone: function () {
        return this.$store.state.userInfo.phone;
      },
      getIfEditPwdAlready: function () {
        return this.$store.getters.getIsEditPwdAlready;
      },
      userList: function () {
        return this.$store.getters.getPersonalInfo;
      },
      userAccount: function () {
        return this.$store.getters.getUserAccountInfo;
      }
    },
    methods: {
      ...mapActions([
        'getUserInformation'
      ]),

      //实现实名认证，添加银行卡，提现等模块的显示隐藏
      showDifffentModel(type) {
        for (let k in  this.changeBankIdCardShow) {
          this.changeBankIdCardShow[k] = k === type;
        }
      },

      //在金额为正前加+
      typeChang(num) {
        if (num > 0) {
          num = '+' + num;
        }
        return num
      },
      seyPassword() {
        if (this.psw === 'password') {
          this.psw = 'text';
          this.eye = 'eye-disabled';
        } else {
          this.psw = 'password';
          this.eye = 'eye';
        }
      },
      success() {
        this.getUserInformation();
      },
      goBack() {
        if (this.$route.query.bandCard === 'bandCard') {
          this.$router.go(-1)
        } else {
          this.changeBankIdcardShowFun();
          this.changeBankIdCardShow.bondBankCard = false;

        }
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Message.success({
            content: res.msg,
            duration: 1,
          });
        } else {
          self.$Modal.error({
            content: res.msg
          });
          self.getVrcode();
        }
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      //添加提现状态的样式锚点
      getoutStatusFun(type,status) {
        this.pageIndex = 1;
        this.getOutSelect = type;
        this.titleStatus = status;
        if(status !== null){
          this.isChange  = true;
        }
        this.getWithDrawList();
      },

      getTradType(type) {
        return TaskErrorStatusList(type);
      },

      //控制提现模块每个部分是否显示，根据账户信息
      changeBankIdcardShowFun() {
        if (this.userList.ifCertification === false) {
          this.changeBankIdCardShow.isCertification = true;
          this.changeBankIdCardShow.isBondBankCard = false;
        } else if (this.userList.ifCertification === true) {
          if (this.userList.ifBandingBankCard === null) {
            this.changeBankIdCardShow.iScertification = false;
            this.changeBankIdCardShow.isBondBankCard = true;
          } else {
            for (let k in  this.changeBankIdCardShow) {
              this.changeBankIdCardShow[k] = k === 'getoutMoney';
            }
          }
        }
      },

      //点击绑定银行卡，其它模块隐藏，绑定银行卡模块显示
      addBankCard() {
        this.showDifffentModel('bondBankCard')
      },
      //实现提现记录和提现操作间的跳转
      lookGetoutRecord(type) {
        for (let k in  this.changeBankIdCardShow) {
          this.changeBankIdCardShow[k] = k === type;
        }
      },

      //添加银行卡
      addBankCardInfo(type) {
        let _this = this;
        api.addBankCardInfo({
          validateCode: type.validateCode,
          accountName: type.name,
          bankName: type.select,
          bankNo: type.bankNumber,
          bankPart: type.bankBranch,
          smsCode: type.cord
        }).then(res => {
          if (res.status) {
            _this.$Message.success(res.msg);
            _this.formItem.validateCode = '';
            _this.formItem.cord = '';
            _this.showDifffentModel('getoutMoney');
            _this.getUserInformation();
            _this.getVrcode();
          } else {
            _this.getVrcode();
            _this.$Message.error(res.msg)
          }
        });
      },

      //申请提现
      applyGetoutMoney(types) {
        let _this = this;
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(parseInt(types.getoutNumber)))){
          _this.getOutMoneyPopWindow = false;
          return;
        }
        api.applyGetoutMoney({
          fee: types.getoutNumber * 100,
          bankCardNum: _this.userAccount.bankCardNum,
          payPwd: types.password
        }).then(res => {
          if (res.status) {
            _this.iconType = 'checkmark-circled';
            _this.applyGetOut = res.msg;
            _this.getoutMoney.getoutNumber = '';
            _this.getoutMoney.password = '';

          } else {
            _this.iconType = 'close-circled';
            _this.applyGetOut = res.msg;
            _this.getoutMoney.getoutNumber = '';
            _this.getoutMoney.password = '';
          }
        });
      },
      //获取提现信息
      getWithDrawList() {
        let _this = this;
        _this.getOutResList = {};
        api.getWithDrawList({
          serialNumber: _this.getoutRecord.serialNumber,
          applyTimeStart: _this.getoutRecord.applyFrom,
          applyTimeEnd: _this.getoutRecord.applyTo,
          state: _this.titleStatus,
          page: _this.pageIndex - 1,
          size: 10
        }).then(res => {
          if (res.status) {
            _this.isChange  = false;
            _this.getOutResList = res.data.content;
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      getBankCardInformationApi(){
        let  _this = this;
        _this.showDifffentModel('bondBankCard');
        api.getBankCardInformation().then(res=>{
          if (res !== ""){
            _this.formItem.name= res.accountName;
            _this.formItem.select= res.bankName;
            _this.formItem.bankNumber= res.bankNo;
            _this.formItem.bankBranch= res.bankPart;
          }
        })
      },
      //查看提现信息详情
      getMoneyShowDetailsFun(type) {
        if (this.getMoneyShowDetails === type) {
          this.getMoneyShowDetails = 'none'
        } else {
          this.getMoneyShowDetails = type
        }
      },
      changePages(data) {
        this.pageIndex = data;
        this.getWithDrawList();
      },
    }
  }
</script>


