<template>
  <div class="my-getoutmoney">
    <!--<div class="not-certification" v-show="changeBankIdCardShow.isCertification">-->
      <!--<h2>-->
        <!--<Icon type="close-circled" class="mr-10 vtc-mid icon"></Icon>-->
        <!--很抱歉，您未进行实名认证，无法提现-->
      <!--</h2>-->
      <!--<div class="how-todo"><span>你现在可以：</span>-->
        <!--<router-link to="/user/personal-setting/verified" class="ml-10">立即申请实名认证</router-link>-->
        <!--<span class="ml-10 mr-10">|</span>-->
        <!--<router-link class="ml-10" :to="{'path': '/user/help-center/faq', 'query': {'page': 'common', 'qusNum': '9'}}">查看如何进行实名认证</router-link>-->
      <!--</div>-->
    <!--</div>-->
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
        <iForm ref="formItem" :model="formItem" :label-width="200" :rules="formRuleItem">
          <Form-item label="开户人姓名:" prop="name">
            <iInput v-model="formItem.name"></iInput>
          </Form-item>
          <Form-item label="选择银行" prop="select">
            <iSelect v-model="formItem.select" :filterable="true" style="width:300px;height: 32px">
              <iOption value="中国建设银行">中国建设银行</iOption>
              <iOption value="中国工商银行">中国工商银行</iOption>
              <iOption value="中国农业银行">中国农业银行</iOption>
              <iOption value="招商银行">招商银行</iOption>
              <iOption value="中国银行">中国银行</iOption>
              <iOption value="兴业银行">兴业银行</iOption>
              <iOption value="上海浦东发展银行">上海浦东发展银行</iOption>
              <iOption value="中国邮政储蓄银行">中国邮政储蓄银行</iOption>
              <iOption value="中信银行">中信银行</iOption>
              <iOption value="广发银行">广发银行</iOption>
              <iOption value="民生银行">民生银行</iOption>
              <iOption value="光大银行">光大银行</iOption>
              <iOption value="交通银行">交通银行</iOption>
              <iOption value="北京银行">北京银行</iOption>
              <iOption value="渤海银行">渤海银行</iOption>
              <iOption value="杭州银行">杭州银行</iOption>
              <iOption value="华夏银行">华夏银行</iOption>
              <iOption value="汇丰银行">汇丰银行</iOption>
              <iOption value="恒生银行">恒生银行</iOption>
              <iOption value="花旗银行">花旗银行</iOption>
              <iOption value="江苏银行">江苏银行</iOption>
              <iOption value="浙商银行">浙商银行</iOption>
              <iOption value="渣打银行">渣打银行</iOption>
              <iOption value="平安银行">平安银行</iOption>
            </iSelect>
            <div class="main-color bank-tip" v-if="formItem.select === '中国邮政储蓄银行'">注：中国邮政储蓄银行提现到账时间会滞后两到三天，请耐心等待！</div>
          </Form-item>
          <Form-item label="银行卡号:" prop="bankNumber">
            <iInput v-model="formItem.bankNumber"></iInput>
          </Form-item>
          <!--<Form-item label="开户支行:" prop="bankBranch">
            <iInput v-model="formItem.bankBranch"></iInput>
          </Form-item>-->
          <Form-item label="手机号:">
            {{getUserPhone}}
          </Form-item>
          <Form-item label="图形验证码:" class="formPosition" prop="validateCode" style="width: 380px">
            <iInput v-model="formItem.validateCode"></iInput>
            <div style="width: 100px;" class="ibtn">
              <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
            </div>
          </Form-item>
          <Form-item label="短信验证码:" class="formPosition" prop="cord" style="width: 380px">
            <iInput v-model="formItem.cord" class="formiInput "></iInput>
            <SmsCountdown :on-success="sendCodeSuccess" style="top: 2px; right: -112px"
                          :phone="this.getUserPhone"
                          :purpose="formItem.purpose"
                          :validateCode="formItem.validateCode">
            </SmsCountdown>
          </Form-item>
          <Form-item>
            <iButton type="primary" @click="handleSubmit('formItem',addBankCardInfo)">提交</iButton>
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
          <Icon type="alert-circled" class="icon" size="32" color="#f9284f"></Icon>
          <div class="ml-56">
            中午12点之前申请提现的当天18点前返款；中午12点之后申请提现的是次日返款到账，遇到周末或者节假日往后顺延。 成功提现的订单即表示已经打款成功，具体到账时间以每个银行受理时间为准。
          </div>
        </div>
        <div class="get-out-do mt-22">
          <iForm ref="getoutMoney" :model="getoutMoney" :label-width="200" :rules="getOutMoneyRule">
            <Form-item label="请输入提现验证口令:" prop="getoutCommand" v-if="ifFirstWithDraw">
              <iInput type="number" v-model.number="getoutMoney.getoutCommand" class="iInput"></iInput>
              <!--<span @click="withdrawalCommandPop = true" class="blue cursor-p">查看如何获取验证口令</span>-->
              <Tooltip placement="bottom">
                <span class="blue cursor-p">查看如何获取验证口令</span>
                <div slot="content" style="width: 300px;" class="text-ct">
                  <div class="lht20">
                    <p>为保证资金安全申请</p>
                    <p>提现需要进行提现口令验证,成功后不再需要！</p>
                  </div>
                  <div class="lht20 mt-10">
                    <p>请扫描下方的二维码或者直接搜索添</p>
                    <p>加<span class="main-color">"xiubaxiaoba888"</span>为好友,查看朋友圈封面获取验证口令！</p>
                  </div>
                  <div class="pl-10 pr-10 pt-10 pb-10 text-ct">
                    <img src="~assets/img/common/contact-dabai.png" alt="" width="220" height="220">
                  </div>
                </div>
              </Tooltip>
            </Form-item>
            <Form-item label="请输入提现金额:" prop="getoutNumber">
              <iInput v-model.number="getoutMoney.getoutNumber" class="iInput"></iInput>
              <span>元（最低1元起提）</span>
            </Form-item>
            <Form-item label="提现银行卡号:">
              <span style="width: 202px;display: inline-block">{{userAccount.bankCardNum}}</span><span
              class=" main-color cursor-p" @click="getBankCardInformationApi">修改银行卡</span>
            </Form-item>
            <Form-item label="支付密码:" prop="password">
              <input type="password" style="width: 0;height: 0;border: none"/>
              <iInput v-model="getoutMoney.password" class="iInput" :type="psw" :icon="eye"
                      @on-click="seyPassword"></iInput>
              <p>
                <span v-show="!getIfEditPwdAlready">初始密码为<span class="f-b cl-red">888888</span>，为了你的账号安全，建议您
                <router-link :to="{'path':'/user/money-management/account-management','query':{'type':'resetPwd'}}" class="blue">重置支付密码。</router-link>
              </span>
              </p>
              <span v-show="getIfEditPwdAlready"><router-link to="/user/money-management/account-management">忘记支付密码？</router-link></span>
            </Form-item>
            <Form-item>
              <iButton type="primary" @click="applyGetOutMoney" class="ibtns">申请提现</iButton>
              <Modal
                v-model="getOutMoneyPopWindow"
                :styles="{top:'210px',width:'580px'}"
                @on-ok="success"
                title="">
                <p style="text-align: center;font-size: 40px;color: #FF6633;">
                  <Icon :type="iconType"></Icon>
                </p>
                <p class="mt-10 text-ct fs-14"><span style="color: #FF6633;">{{applyGetOut}}</span>
                </p>
                <p class="mt-10 text-ct fs-14">
                  中午12点之前申请提现的当天18点前返款；中午12点之后申请提现的是次日返款到账，遇到周末或者节假日往后顺延。 成功提现的订单即表示已经打款成功，具体到账时间以每个银行受理时间为准。
                </p>
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
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px"
                     format="yyyy-MM-dd HH:mm:ss"
                     @on-change="getBeginTimeFun"></Date-picker>
        <span>-</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px"
                     format="yyyy-MM-dd HH:mm:ss"
                     @on-change="getEndTimeFun"></Date-picker>
        <iButton class="ibtn1" @click="getWithDrawList">搜索</iButton>
      </div>
      <div class="content-select clear">
        <span class="left" v-for="(item,index)  in getOutStatus" :key="index" :class="{actives:getOutSelect===item.isSelect}"
              @click="getoutStatusFun(item.isSelect,item.state)">{{item.text}}</span>
      </div>
      <div class="personal-list-table mt-10">
        <table class="list-table">
          <thead>
          <tr>
            <th style="width:20%;">申请时间</th>
            <th style="width:30%;">流水号</th>
            <th style="width:10%;">提现金额（元）</th>
            <th style="width:10%;">代收手续费（元）</th>
            <th style="width:20%;">状态</th>
            <th style="width:10%;">操作</th>
          </tr>
          </thead>
          <tbody v-for="(item,index) in getOutResList" :key="index">
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
              {{getTradType(item.state)}}<span v-if="item.state === 'enchashment_audit_defeat' && item.refuseReason !== null" class="cl666">:{{item.refuseReason}}</span>
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
        <Page :total="totalElements" :page-size="pageSize" @on-change="changePages"></Page>
      </div>
    </div>
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10">
        <p>提现</p>
        <p>
          1、最低提现金额1元，
          <span v-if="$store.state.userInfo.role === 1">手续费0.1%，</span>
          <span v-if="$store.state.userInfo.role === 0">免手续费，</span>
          每天提现次数不限
        </p>
        <p>2、中午12点之前申请提现的当天18点前返款；中午12点之后申请提现的是次日返款到账，遇到周末或者节假日往后顺延。 成功提现的订单即表示已经打款成功，具体到账时间以每个银行受理时间为准。</p>
      </div>
    </div>
    <!--需要实名认证的提示框-->
    <Modal v-model="ifVerifiedTip" width="400" :styles="{top:'30%'}">
      <div style="text-align:center">
        <h3 class="mt-20">单笔提现金额100元以上或者累计提现金额1000元以上的，为保障资金安全，需要进行实名认证！</h3>
      </div>
      <div slot="footer">
        <router-link to="/user/personal-setting/verified" class="verify-btn">立即申请实名认证</router-link>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {Icon, Form, Page, Button, Modal, DatePicker, Select, Option, OptionGroup, Input, Tooltip} from 'iview'
  import api from '@/config/apiConfig'
  import SmsCountdown from '@/components/SmsCountdown'
  import {TaskErrorStatusList,isNumber, isChinaStr} from '@/config/utils'

  export default {
    name: 'getOutMoney',
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
      SmsCountdown: SmsCountdown,
      Tooltip: Tooltip,
    },
    data() {
      //表单验证
      const validatePayNumber = (rule, value, callback) => {
        if (!(/^\d+(\.\d{1,2})?$/.test(value))) {
          callback(new Error('输入的提现金额必须为数字且仅支持两位小数，请您重新输入'))
        } else {
          callback()
        }
      };
      const validateBankCard = (rule, value, callback) => {
        if (!(/^([1-9]{1})(\d{15}|\d{18}|\d{17}|d{16})$/.test(value))) {
          callback(new Error('请输入正确的银行卡号'));
        } else {
          callback()
        }
      };
      const validateBankName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择所属银行'));
        } else {
          callback()
        }
      };
      const validateCommand = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证口令'));
        } else {
          callback()
        }
      };
      const validateName = (rule, value, callback) => {
        let self = this;
        if (!value) {
          callback(new Error('请输入姓名'));
        }
        // else if(value !== self.$store.state.userInfo.realName){
        //   callback(new Error('为保证资金安全，开户行必须与实名认证姓名一致！'))
        // }
        else {
          callback()
        }
      };
      /*const validateBankBranch = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请输入所属银行支行'));
        } else {
          callback()
        }
      };*/
      const validatePass = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请输入支付密码'));
        } else {
          callback()
        }
      };
      const validateCode = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请输入图片验证码'));
        } else {
          callback()
        }
      };
      const validateSmsCode = (rule, value, callback) => {
        if (!value ) {
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
          /*bankBranch: [
            {validator: validateBankBranch, trigger: 'blur'}
          ]*/
        },
        getoutMoney: {
          getoutCommand:null,
          getoutNumber: null,
          password: null
        },
        getOutMoneyRule: {
          getoutCommand: [
            {validator: validateCommand, trigger: 'blur'}
          ],
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
        pageSize: 10,
        isChange: false,
        ifVerifiedTip: false,
        ifFirstWithDraw: null,
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
      this.getWithDrawList();
      // this.someAccountOrMoneyJudgement();
      this.getFirstWithdrawalCommand();
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
      getFirstWithdrawalCommand(){
        let self = this;
        api.getFirstWithdrawalCommand().then( res=>{
          if (res.status){
            self.ifFirstWithDraw = res.data
          }else {
            self.$Message.error(res.msg);
          }
        })
      },
      setFirstWithdrawalCommand(){
        let self = this;
        api.setFirstWithdrawalCommand().then( res=>{
          if (res.status){
            self.getFirstWithdrawalCommand();
          }else {
            self.$Message.error(res.msg);
          }
        })
      },
     /* someAccountOrMoneyJudgement(){
        let self = this;
        api.someAccountOrMoneyJudgement().then( res=>{
          if (res.status){
            self.ifFirstWithDraw = res.data.ifFirstWithDraw;
          }else {
            self.$Message.error(res.msg);
          }
        })
      },*/
      getBeginTimeFun(e){
       this.getoutRecord.applyFrom = e
      },
      getEndTimeFun(e){
        this.getoutRecord.applyTo = e
      },
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
        this.$store.dispatch('getUserInformation');
      },
      goBack() {
        if (this.$route.query.bandCard === 'bandCard') {
          this.$router.go(-1)
        } else {
          this.changeBankIdcardShowFun();
          this.changeBankIdCardShow.bondBankCard = false;

        }
      },
      handleSubmit(name, callback) {
        let res = false;
        this.$refs[name].validate((valid) => {
          res = !!valid
        });
        if (typeof callback === 'function' && res) {
          callback();
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
          self.$Message.error({
            content: res.msg,
            duration: 9
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
      // changeBankIdcardShowFun() {
      //   if (this.userList.ifCertification === false) {
      //     this.changeBankIdCardShow.isCertification = true;
      //     this.changeBankIdCardShow.isBondBankCard = false;
      //   } else if (this.userList.ifCertification === true) {
      //     if (this.userList.ifBandingBankCard === null) {
      //       this.changeBankIdCardShow.iScertification = false;
      //       this.changeBankIdCardShow.isBondBankCard = true;
      //     } else {
      //       for (let k in  this.changeBankIdCardShow) {
      //         this.changeBankIdCardShow[k] = k === 'getoutMoney';
      //       }
      //     }
      //   }
      // },
      //控制提现模块每个部分是否显示，根据账户信息(不用实名认证版本)
      changeBankIdcardShowFun(){
        if(this.userList.ifBandingBankCard){
          for (let k in  this.changeBankIdCardShow) {
            this.changeBankIdCardShow[k] = k === 'getoutMoney';
          }
        }else{
          this.changeBankIdCardShow.isBondBankCard = true;
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
          validateCode:  _this.formItem.validateCode,
          accountName: _this.formItem.name,
          bankName: _this.formItem.select,
          bankNo: _this.formItem.bankNumber,
          bankPart: _this.formItem.bankBranch,
          smsCode: _this.formItem.cord
        }).then(res => {
          if (res.status) {
            _this.$Message.success(res.msg);
            _this.formItem.validateCode = '';
            _this.formItem.cord = '';
            _this.showDifffentModel('getoutMoney');
            _this.$store.dispatch('getUserInformation');
            _this.getVrcode();
          } else {
            _this.getVrcode();
            _this.$Message.error(res.msg)
          }
        });
      },
      //申请提现
      // applyGetOutMoney() {
      //   let _this = this;
      //   _this.$refs.getoutMoney.validate((valid) => {
      //     if (valid) {
      //       _this.getOutMoneyPopWindow = true;
      //       api.applyGetoutMoney({
      //         fee: (_this.getoutMoney.getoutNumber * 100).toFixed(),
      //         bankCardNum: _this.userAccount.bankCardNum,
      //         payPwd: _this.getoutMoney.password
      //       }).then(res => {
      //         if (res.status) {
      //           _this.iconType = 'checkmark-circled';
      //           _this.applyGetOut = res.msg;
      //           _this.getoutMoney.getoutNumber = null;
      //           _this.getoutMoney.password = null;
      //         } else {
      //           _this.iconType = 'close-circled';
      //           _this.applyGetOut = res.msg;
      //           _this.getoutMoney.password = null;
      //         }
      //       });
      //     } else {
      //       _this.$Message.error('提现失败，请正确填写提现必要的信息！');
      //       // _this.$refs.getoutMoney.resetFields();
      //     }
      //   });
      // },

      //申请提现（根据提现金额判断是否需要实名认证）
      applyGetOutMoney() {
        let _this = this;
        if (_this.ifFirstWithDraw){
          if (!_this.getoutMoney.getoutCommand){
            _this.$Message.error('请输入提现验证口令');
            return;
          }
          if (_this.getoutMoney.getoutCommand !== 6088){
            _this.$Message.error('提现验证口令错误');
            return;
          }
        }
        if(_this.userList.ifCertification){
          //如果认证过，走从前的就好
          _this.$refs.getoutMoney.validate((valid) => {
            if (valid) {
              _this.getOutMoneyPopWindow = true;
              api.applyGetoutMoney({
                fee: (_this.getoutMoney.getoutNumber * 100).toFixed(),
                bankCardNum: _this.userAccount.bankCardNum,
                payPwd: _this.getoutMoney.password
              }).then(res => {
                if (res.status) {
                  _this.iconType = 'checkmark-circled';
                  _this.applyGetOut = res.msg;
                  _this.getoutMoney.getoutNumber = null;
                  _this.getoutMoney.password = null;
                  _this.setFirstWithdrawalCommand();
                } else {
                  _this.iconType = 'close-circled';
                  _this.applyGetOut = res.msg;
                  _this.getoutMoney.password = null;
                }
              });
            } else {
              _this.$Message.error('提现失败，请正确填写提现必要的信息！');
              // _this.$refs.getoutMoney.resetFields();
            }
          });
        }else{
          //如果没认证过，就根据金额判断是否需要认证
          _this.$refs.getoutMoney.validate((valid) => {
            if (valid) {
              api.applyGetoutMoney({
                fee: (_this.getoutMoney.getoutNumber * 100).toFixed(),
                bankCardNum: _this.userAccount.bankCardNum,
                payPwd: _this.getoutMoney.password
              }).then(res => {
                if (res.status===false && res.statusCode === 'not_certification') {
                  _this.ifVerifiedTip = true;
                  _this.getoutMoney.password = null;
                  // _this.iconType = 'close-circled';
                  // _this.applyGetOut = res.msg;
                } else {
                  if (res.status){
                    _this.setFirstWithdrawalCommand();
                  }
                  _this.getOutMoneyPopWindow = true;
                  _this.iconType = 'checkmark-circled';
                  _this.applyGetOut = res.msg;
                  _this.getoutMoney.getoutNumber = null;
                  _this.getoutMoney.password = null;
                }
              });
            } else {
              _this.$Message.error('提现失败，请正确填写提现必要的信息！');
              // _this.$refs.getoutMoney.resetFields();
            }
          });
        }

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
          size: _this.pageSize
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
            // _this.formItem.bankBranch= res.bankPart;
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
<style scoped>
  .verify-btn{
    width:100%;
    display: inline-block;
    height:40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    /*margin:0 auto;*/
    font-size:16px;
    color:#fff;
    background: #f9284f;
  }

  .bank-tip {
    width: 400px;
    margin-top: 4px;
  }
  .list-table td{
    word-break: break-all;
  }
</style>



