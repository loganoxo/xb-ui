<template>
  <div class="my-account" >
    <div class="user-safe" v-show="myAccount.userSafe">
      <p class="fs-14">账户信息</p>
      <ul>
        <li>
          <ul>
            <li class="one">实名认证</li>
            <li class="two">
              未认证
            </li>
            <li class="three">
              <a href="javascript:;">去认证</a>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li class="one">绑定手机</li>
            <li class="two">
              13655816578
            </li>
            <li class="three">
              <a href="javascript:;">去设置</a>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li class="one">
              提现账号
            </li>
            <li class="two">
              未绑定
            </li>
            <li class="three">
              <a href="javascript:;">未绑定</a>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li class="one">
              支付密码
            </li>
            <li class="two">
              未设置
            </li>
            <li class="three">
              <a href="javascript:;" @click="myAccountPwdChangeFather('modifyPwd')">忘记支付密码？</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="modify-pwd clear" v-show="myAccount.modifyPwd">
      <div class="modify-pwd-sel clear">
        <p>重置支付密码</p>
        <div v-show="myAccountSon.selBox" class="sel-box clear">
          <p class="left">请选择重置的方式：</p>
          <div class="left">
            <div>
              <div @click="myAccountPwdChangeSon('selDefaultModify')" class="sel-canal">
                <p>
                  我忘记支付密码了
                  <br>
                  <span style="color: #999">忘记密码或者密码被锁定了</span>
                </p>
                <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                   style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
              </div>
              <div  @click="myAccountPwdChangeSon('selPhoneModify')" class="sel-canal">
                <p>
                  我记得原来的密码
                </p>
                <i data-v-5aa11427="" class="ivu-icon ivu-icon-chevron-right"
                   style="vertical-align: middle;display: table-cell; font-size: 20px;"></i>
              </div>
              <iButton @click="myAccountPwdChangeFather('userSafe')">
                返回上一页
              </iButton>
            </div>
          </div>

        </div>
        <div v-show="myAccountSon.selPhoneModify" class="sel-default-modify mt-20">
          <iForm ref="defaultModifyCustom" :model="defaultModifyCustom" :rules="defaultModifyRuleCustom" :label-width="400">
            <div class="clear form-input-box">
              <Form-item label="原始密码" class="left" style="width: 650px" prop="oldPwd">
                <iInput type="password" size="large" v-model="defaultModifyCustom.oldPwd"></iInput>
              </Form-item>
            </div>
            <div class="clear form-input-box">
              <Form-item label="新密码" class="left" style="width: 650px" prop="newPwd">
                <iInput type="password" size="large" v-model="defaultModifyCustom.newPwd"></iInput>
              </Form-item>
            </div>
            <div class="clear form-input-box">
              <Form-item label="确认密码" class="left" style="width: 650px" prop="repwd">
                <iInput type="password" size="large" v-model="defaultModifyCustom.repwd"></iInput>
              </Form-item>
            </div>
            <div>
              <Form-item>
                <iButton @click="handleSubmit('defaultModifyCustom',modifyDefaultPayPwdFunc)">
                  确定
                </iButton>
                <iButton @click="myAccountPwdChangeSon('selBox')">
                  返回上一页
                </iButton>
              </Form-item>
            </div>
          </iForm>
        </div>
        <div v-show="myAccountSon.selDefaultModify" class="sel-phone-modify mt-20">
          <iForm ref="payCustom" :model="payCustom" :rules="payRuleCustom" :label-width="400">
            <div class="clear form-input-box">
              <Form-item label="绑定手机" prop="phone" class="left" style="width: 650px">
                <iInput type="text" size="large" v-model="payCustom.phone" ></iInput>
              </Form-item>
            </div>
            <div class="clear form-input-box">
              <Form-item label="图形验证码"  prop="validateCode" class="left" style="width: 550px">
                <iInput type="text" size="large" v-model="payCustom.validateCode"></iInput>
              </Form-item>
              <div style="width: 100px; float:left;">
                <img :src="imgSrc" width="100%" alt="" @click="getVrcode">
              </div>
            </div>
            <div class="clear form-input-box">
              <Form-item label="手机验证码" class="left pos-rel" style="width: 650px">
                <iInput type="text" number size="large" v-model="payCustom.smsCode"></iInput>
                <SmsCountdown :on-success="sendCodeSuccess" style="top: 3px;"
                              :phone="payCustom.phone"
                              :purpose="payCustom.purpose"
                              :validateCode="payCustom.validateCode"
                              :timeout=120
                >
                </SmsCountdown>
              </Form-item>
            </div>
            <div>
              <Form-item>
                <iButton @click="handleSubmit('payCustom',modifyPayPwdFunc)">
                  确定
                </iButton>
                <iButton @click="myAccountPwdChangeSon('selBox')">
                  返回上一页
                </iButton>
              </Form-item>
            </div>
          </iForm>
        </div>
        <div v-show="myAccountSon.modifyPwd" class="mt-20">
          <iForm ref="trendsModifyCustom" :model="trendsModifyCustom" :rules="trendsModifyRuleCustom" :label-width="400">
            <div class="clear form-input-box">
              <Form-item label="新密码" prop="pwd" class="left" style="width: 650px" >
                <iInput type="password" size="large" v-model="trendsModifyCustom.pwd"></iInput>
              </Form-item>
            </div>
            <div class="clear form-input-box">
              <Form-item label="确认新密码" class="left" style="width: 650px" prop="repwd">
                <iInput type="password" size="large" v-model="trendsModifyCustom.repwd"></iInput>
              </Form-item>
            </div>
            <div>
              <Form-item>
                <iButton @click="handleSubmit('payCustom',modifyFinishPayPwdFunc)">
                  确定
                </iButton>
              </Form-item>
            </div>
          </iForm>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import api from '@/config/apiConfig'
  import Icon from 'iview/src/components/icon'
  import DatePicker  from 'iview/src/components/date-picker'
  import Alert from 'iview/src/components/alert'
  import Table  from 'iview/src/components/table'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Radio from 'iview/src/components/radio'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Page from 'iview/src/components/page'
  import {setStorage, getStorage} from '@/config/utils'
  import Modal from 'iview/src/components/modal'
  import TimeDown from '@/components/TimeDown'
  import SmsCountdown from '@/components/SmsCountdown'
  import PayModel from  '@/components/PayModel'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import {mapActions} from 'vuex'
  export default {
    name: 'MoneyManagement',
    components: {
      iTable:Table,
      Radio:Radio,
      RadioGroup:Radio.Group,
      DatePicker:DatePicker,
      iInput: Input,
      iForm: Form,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      TimeDown: TimeDown,
      Alert: Alert,
      SmsCountdown: SmsCountdown,
      PayModel:PayModel,
      Page:Page

    },
    data() {
      //表单验证
      const validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确手机号'));
        } else {
          callback()
        }
      };
      const  validatePayNumber =(rule,value,callback)=>{
        if (!(/^[1-9]\d*$/.test(value))){
          callback(new Error('金额为数字，请您重新输入'))
        }else {
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
      const validateBankName= (rule, value, callback) => {
        if (value==='') {
          callback(new Error('请选择所属银行'));
        } else {
          callback()
        }
      };
      const validateName= (rule, value, callback) => {
        if (value==='') {
          callback(new Error('请输入姓名'));
        } else {
          callback()
        }
      };
      const validateBankBranch= (rule, value, callback) => {
        if (value==='') {
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
        triangle:'arrow-down-b',
        imgSrc: null,
        psw:'password',
        eye:'eye',
        payCustom: {
          phone: null,
          validateCode: '',
          purpose:'forget',
          smsCode: '',
          role: 0,
        },
        payRuleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'},
          ],
          validateCode: [
            {validator: validateCode, trigger: 'blur'},
          ],
          smsCode: [
            {validator: validateSmsCode, trigger: 'blur'}
          ]

        },
        trendsModifyCustom:{
          pwd: '',
          repwd: ''
        },
        defaultModifyCustom: {
          oldPwd: '',
          newPwd: '',
          repwd: '',
        },
        defaultModifyRuleCustom: {
          oldPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          newPwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validateDefaultPassCheck, trigger: 'blur'},
          ]
        },
        trendsModifyRuleCustom: {
          pwd: [
            {validator: validatePass, trigger: 'blur'},
          ],
          repwd: [
            {validator: validatePassCheck, trigger: 'blur'},
          ],
        },
        myInfoSelects: [
          {
            text: '账号信息',
            isSelect: 'account',
            callback: this.accountInit
          },
          {
            text: '充值',
            isSelect: 'pay'
          },
          {
            text: '提现',
            isSelect: 'getOut'
          },
          {
            text: '交易记录',
            isSelect: 'jiaoYiJiLu'
          },
          {
            text: '账户管理',
            isSelect: 'accountInfo'
          }
        ],
        myTableDetails: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        myTableDetailsAll:[],
        infoSelect: 'account',
        detailSelect: 'false',
        userList: {},
        userAccount: {},
        userListDetails: null,
        showBigNotice:false,
        showBigNoticeAll:false,
        showNotice:false,
        beginTime:null,
        endTime:null,
        timeSelect:'oneMouth',
        choiceTime:[
          {
            text:'今天',
            isSelect:'today',
            id:0

          },
          {
            text:'昨天',
            isSelect:'yesterday',
            id:1
          },
          {
            text:'最近一个月',
            isSelect:'oneMouth',
            id:2
          },
          {
            text:'全部',
            isSelect:'all',
            id:3
          }
        ],
        checkAll: false,
        transactType:[],
        activityNumber:null,
        modal1: false,
        modal2:false,
        modal3:false,
        inputMoney:null,
        myAccount:{
          userSafe:true,
          modifyPwd:false,
        },
        myAccountSon:{
          selBox:true,
          selDefaultModify:false,
          selPhoneModify:false
        },
        formItem: {
          name: '',
          select: '',
          bankNumber:'',
          bankBranch:'',
          phone:null,
          validateCode:'',
          cord:'',
          purpose:'id_verify'
        },
        formRuleItem:{
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          validateCode: [
            {validator: validateCode, trigger: 'blur'}
          ],
          cord:[
            {validator:validateSmsCode,trigger:'blur'}
          ],
          bankNumber:[
            {validator:validateBankCard,trigger:'blur'}
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
        payMoney:{
          number:null,
          payMode: 'ali',
        },
        payMoneyRule:{
          number: [
            {validator: validatePayNumber, trigger: 'blur'}
          ]
        },
        getoutMoney:{
          getoutNumber:'',
          password:'',
        },
        getoutMoneyRule:{
          getoutNumber:[
            {validator: validatePayNumber, trigger: 'blur'}
          ],
          password:[
            {validator:validatePass,trigger:'blur'}
          ]
        },
        getoutStatus:[
          {
            text:'提现中',
            isSelect:'doing',
            state:"enchashment_audit_ing"
          },
          {
            text:'提现成功',
            isSelect:'success',
            state:"enchashment_audit_success"
          },
          {
            text:'提现失败',
            isSelect:'fail',
            state:"enchashment_audit_defeat"
          }
        ],
        getoutSelect:'doing',
        changeBankIDcardShow:{
          iScertification:false,
          iSbondBankCard:false,
          bondBankCard:false,
          getoutMoney:true,
          getoutRecord:false
        },
        getbankCardInformation:{},
        applyGetout:{},
        iconType:'checkmark-circled',
        getoutRecord:{
          serialNumber:null,
          applyFrom:'',
          applyTo:'',
        },
        getOutResList:{},
        getMoneyShowDetails:false
      }
    },
    mounted() {

    },
    created() {
      if(this.$route.query.infoSelect){
        this.infoSelect = this.$route.query.infoSelect;
        this.myAccountPwdChangeFather('modifyPwd');
      }
      this.getVrcode();
      this.getUserAccount();
      this.getTradList([]);
      this.getTradListAll([0,1,2]);
      this.getWithDrawList(this.getoutRecord)
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
      changeTriangle(){
        alert(  11111)
        if (this.triangle === 'arrow-down-b'){
          this.triangle = 'arrow-up-b'
        }else {
          this.triangle = 'arrow-down-b'
        }
      },
      seyPassword(){
        if(this.psw==='password'){
          this.psw = 'text';
          this.eye = 'eye-disabled';
        }else {
          this.psw = 'password';
          this.eye = 'eye';
        }

      },
      ok(){
        this.getBalance()
      },
      closable () {
        this.$Message.info({
          content: this.getbankCardInformation.msg,
          duration: 10,
          closable: true
        });
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
      modifyDefaultPayPwdFunc(){
        let self = this;
        api.modifyDefaultPayPwd({
          oldPwd: self.defaultModifyCustom.oldPwd,
          newPwd: self.defaultModifyCustom.newPwd,
          repwd: self.defaultModifyCustom.repwd
        }).then((res) => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.go(-1);
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      modifyPayPwdFunc(){
        let self = this;
        api.validatePaySmscode({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
        }).then((res) => {
          if(res.status){
            self.myAccountPwdChangeSon('modifyPwd');
          }else {
            self.$Modal.error({
              content: res.msg
            });
            self.getVrcode();
          }
        });
      },
      modifyFinishPayPwdFunc(){
        let self = this;
        api.modifyPayPwd({
          phone: self.payCustom.phone,
          smsCode: self.payCustom.smsCode,
          pwd: self.trendsModifyCustom.pwd,
          repwd: self.trendsModifyCustom.repwd,
        }).then(res => {
          if(res.status){
            self.$Modal.success({
              content: res.msg,
              onOk: function () {
                self.$router.go(-1);
              }
            });
          }else {
            self.$Modal.error({
              content: res.msg
            });
          }
        })
      },
      checkPhone() {
        this.$refs.loginTrendsCustom.validateField('phone');
      },
      sendCodeSuccess(res) {
        let self = this;
        if (res.status) {
          self.$Modal.success({
            content: res.msg
          });
        } else {
          self.$Modal.error({
            content: res.msg
          });
          self.getVrcode();
        }
      },
      accountInit(type) {
        this.infoSelect = type
      },
      detailsInit(type) {
        if (this.detailSelect === type) {
//          this.triangle = 'arrow-down-b'
          this.detailSelect = 'none'

        } else {
//          this.triangle = 'arrow-up-b'
          this.detailSelect = type;
          this.getTradListDetails(type);

        }
      },
      getVrcode() {
        this.imgSrc = "/api/vrcode.json?rand=" + new Date() / 100
      },
      getUserAccount() {
        let _this = this;
        api.getUserAccount().then(res => {
          if (res.status) {
            _this.userList = res.data;
            _this.userAccount = res.data.userAccount;
            _this.changeBankIdcardShowFun();
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getTradList (type) {
        let _this = this;
        if(type.length===0||type.length === 3){
          type = null;
        }else {
          type = JSON.stringify(type)
        }
        api.getTradList({
          createTimeStart: null,
          createTimeEnd: null,
          accountChangeTypeStr: type,
          reversePicUrl: null,
          taskSerial: null
        }).then(res => {
          if (res.status) {
            _this.myTableDetails = res.data.content.slice(0, 5);
            _this.showBigNotice = _this.myTableDetails.length === 0;

          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      getTradListAll(type) {
        let _this = this;
        if(type.length===0||type.length === 3){
          type = null;
        }else {
          type = JSON.stringify(type)
        }
        api.getTradList({
          createTimeStart: _this.beginTime||null,
          createTimeEnd:_this.endTime||null,
          accountChangeTypeStr: type,
          reversePicUrl: null,
          taskSerial: _this.activityNumber||null
        }).then(res => {
          if (res.status) {
            _this.myTableDetailsAll = res.data.content;
            _this.showBigNoticeAll = _this.myTableDetailsAll.length === 0;

          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      handleCheckAll () {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.transactType = ['0','1','2'];
        } else {
          this.transactType = [];
        }
      },
      checkAllGroupChange () {
        if (this.transactType.length === 3) {
          this.checkAll = true;
        } else if (this.transactType.length > 0) {
          this.checkAll = false;
        } else {
          this.checkAll = false;
        }
      },
      getTradListDetails(type) {
        let _this = this;
        api.getTradListDetails({
          tradId: type
        }).then(res => {
          if (res) {
            _this.userListDetails = res;
            _this.showNotice = _this.userListDetails.length === 0;
          } else {
            console.log("列表数据为空！")
          }
        });
      },
      changeTimeChoiceStyle(type){
        this.timeSelect = type
      },
      myAccountPwdChangeFather(type){
        for(let k in this.myAccount){
          this.myAccount[k] = k === type;
        }
      },
      myAccountPwdChangeSon(type){
        for(let k in this.myAccountSon){
          this.myAccountSon[k] = k === type;
        }
      },
      getTargetTime(type){
        let _this = this;
        function getDateStr(time) {
          let date = new Date();
          date.setDate(date.getDate()+time);
          let seperator1 = "-";
          let seperator2 = ":";
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + '00' + seperator2 + '00'
            + seperator2 + '00';
          return currentdate;
        }
        if(type===0){
          _this.beginTime = getDateStr(0);
          _this.endTime = getDateStr(1);
        }else if(type===1){
          _this.beginTime = getDateStr(-1);
          _this.endTime = getDateStr(0);
        }else if (type===2){
          _this.beginTime = getDateStr(-30);
          _this.endTime = getDateStr(1);
        }else {
          _this.beginTime=null;
          _this.endTime=null;
          _this.getTradListAll([0,1,2]);
        }


      },
      getoutStatusFun(type){
        this.getoutSelect = type
      },
      getTradType(type){
        switch (type){
          case 'enchashment':
            return '提现';
            break;
          case  'pay_for_task_deposit_seller':
            return '支付活动担保金';
            break;
          case  'task_return_seller':
            return '活动结算返款';
            break;
          case  'showker_task_supplementary_seller':
            return '补充任务担保金';
            break;
          case  'task_deposit_pay_shower':
            return '任务保证金退款';
            break;
          case  'task_deposit_return_shower':
            return '任务保证金返款';
            break;
          case  'task_delete_return_seller':
            return '删除活动返款';
            break;
          case  'enchashment_audit_ing':
            return '提现审核中';
            break;
          case  'enchashment_audit_success':
            return '提现审核通过';
            break;
          case  'enchashment_audit_defeat':
            return '提现审核未通过';
            break;
        }
      },
      geIifCertification(type){
        if (type===false){
          return '未认证';
        }else {
          return '已认证';
        }
      },
      getIfBandingBankCard(type){
        return type===null?'未添加':this.userAccount.bankCardNum;
      },
      changeBankIdcardShowFun(){
        if (this.userList.ifCertification ===false){
          this.changeBankIDcardShow.iScertification=true;
          this.changeBankIDcardShow.iSbondBankCard=false;
        }else if (this.userList.ifCertification===true){
          if(this.userList.ifBandingBankCard === null){
            this.changeBankIDcardShow.iScertification=false;
            this.changeBankIDcardShow.iSbondBankCard=true;
          }else {
            for (let k in  this.changeBankIDcardShow) {
              this.changeBankIDcardShow[k]=k==='getoutMoney';
            }
          }
        }
      },
      addBankCard(){
        this.changeBankIDcardShow.iScertification=false;
        this.changeBankIDcardShow.iSbondBankCard=false;
        this.changeBankIDcardShow.bondBankCard=true;
      },
      lookGetoutRecord(type){
        for (let k in  this.changeBankIDcardShow) {
          this.changeBankIDcardShow[k]=k===type;
        }
      },
      addBankCardInfo(type){
        let _this=this;
        api.addBankCardInfo({
          validateCode:type.validateCode,
          accountName:type.name,
          bankName:type.select,
          bankNo:type.bankNumber,
          bankPart:type.bankBranch,
          phoneNo:type.phone,
          smsCode:type.cord
        }).then(res=>{
          if(res.status){
            _this.getbankCardInformation=res;
            _this.closable();
          }else {
            _this.$Message.error(res.msg)
          }
        });
      },
      applyGetoutMoney(types){
        let _this=this;
        api.applyGetoutMoney({
          fee:types.getoutNumber*100,
          bankCardNum:_this.userAccount.bankCardNum,
          payPwd:types.password
        }).then(res=>{
          if(res.status){
            _this.iconType='checkmark-circled';
            _this.applyGetout=res.msg;
            _this.getoutMoney.getoutNumber='';
            _this.getoutMoney.password='';

          }else {
            _this.iconType='close-circled';
            _this.applyGetout=res.msg;
            _this.getoutMoney.getoutNumber='';
            _this.getoutMoney.password='';
          }
        });
      },
      getWithDrawList(type,state){
        let _this=this;
        api.getWithDrawList({
          serialNumber:type.serialNumber,
          applyTimeStart:type.applyFrom,
          applyTimeEnd:type.applyTo,
          state:state||null
        }).then(res=>{
          if (res.status){
            _this.getOutResList=res.data.content;
          }else {
            _this.$Message.error(res.msg)
          }
        });
      },
      getMoneyShowDetailsFun(type){
        if (this.getMoneyShowDetails === type){
          this.getMoneyShowDetails = 'none'
        }else {
          this.getMoneyShowDetails=type
        }
      }
    }
  }
</script>


