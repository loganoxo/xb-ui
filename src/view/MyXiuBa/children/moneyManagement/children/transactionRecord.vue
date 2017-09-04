<template>
  <div class="my-transact" >
    <div class="choice-time">
      起止日期：<Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="beginTime"   format="yyyy-MM-dd HH:mm:ss" :key="beginTime"  @on-change="beginTime=$event"></Date-picker>
      &nbsp;&nbsp;到 &nbsp;
      <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="endTime" format="yyyy-MM-dd HH:mm:ss" :key="endTime"  @on-change="endTime=$event"></Date-picker>
      <span class="cursor-p" v-for="item in choiceTime" :class="{active:timeSelect === item.isSelect} " @click="changeTimeChoiceStyle(item.isSelect),getTargetTime(item.id)" >{{item.text}}</span>
    </div>
    <div class="transact-type " >
      <span class="left">交易类型：</span>
      <div class="left ml-5">
        <Checkbox
          :value="checkAll"
          @click.prevent.native="handleCheckAll">全部</Checkbox>
      </div>
      <div class="left">
        <Checkbox-group v-model="transactType" class="checkBox  ml-45" @on-change="checkAllGroupChange">
          <Checkbox label="0">活动</Checkbox>
          <Checkbox label="1">充值</Checkbox>
          <Checkbox label="2">提现</Checkbox>
        </Checkbox-group>
      </div>
    </div>
    <div class="activity-number mt-20">
      活动编号：<iInput v-model="activityNumber" style="width: 200px;height: 30px" class="ml-10"></iInput>
    </div>
    <iButton class="ibtn" @click="getTradListAll(transactType)">筛选</iButton>
    <div class="mt-22 line"></div>
    <div class="transaction-amount">
      <span>收入：<span class="number">{{userAccount.amountIncomes||0}}</span>元</span>
      <span class="ml-20">支出：<span class="number">{{userAccount.amountPayment||0}}</span>元</span>
    </div>
    <div class="personal-list-table mt-10">
      <table class="list-table">
        <thead>
        <tr>
          <th style="width: 20%">交易时间</th>
          <th style="width: 40%">交易类型</th>
          <th style="width: 20%">交易金额（元）</th>
          <th style="width: 20%">操作</th>
        </tr>
        </thead>
        <tbody v-for="(item,index) in myTableDetailsAll" >
        <tr>
          <td>
            <p>{{item.createTime | dateFormat('YYYY-MM-DD ')}}</p>
            <p>{{item.createTime | dateFormat('hh:mm:ss ')}}</p>
          </td>
          <td>
            <p>{{item.changeName}}</p>
            <p>活动编号：{{item.taskSerialNum}}</p>
          </td>
          <td class="main-color">{{item.amountChange/100||0}}</td>
          <td>
            <p style="color:blue;" class="details" @click="detailsInit(item.id)">详情<Icon :type="detailSelect===item.id?'arrow-up-b':'arrow-down-b'" class="ml-5 "></Icon></p>
          </td>
        </tr>
        <tr v-show="detailSelect===item.id">
          <td colspan="4" style="padding: 0px;">
            <table class="small-table" style="background-color: #f9f9f9;">
              <thead>
              <tr>
                <th style="width:20%;">交易时间</th>
                <th style="width:30%;">流水号</th>
                <th style="width:30%;">交易明细</th>
                <th style="width:10%;">交易金额（元）</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in userListDetails">
                <td>
                  <p>{{item.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
                  <p>{{item.tradTime | dateFormat('hh:mm:ss ')}}</p>
                </td>
                <td>
                  {{item.serialNumber}}
                </td>
                <td>
                  <p>{{getTradType(item.tradName)}}</p>
                  <p>活动编号：11113244325324</p>
                </td>
                <td>
                  {{item.tradAmount/100||0}}
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <Button @click="modal1 = true; getDepositReturnList(item.taskId)" class="theSpecialBtn">查看任务担保金支出明细</Button>
                  <Modal
                    v-model="modal1"
                    title="普通的Modal对话框标题"
                    :styles="{top:'200px',width:'800px'}"
                    class-name	="pop-up-window">
                    <div slot="header">活动编号：<span style="color: red;">12345678&nbsp;,&nbsp;</span>共支付活动担保金：<span style="color: red;">80</span>&nbsp;元</div>
                    <div slot="">
                      <table class="alert-table-list" style="width: 100%;border: 1px solid #F3F3F3;background-color:#F8F8F8;text-align: center" >
                        <thead>
                        <tr style="border-bottom: 1px solid #F3F3F3;">
                          <th style="width: 20%;padding: 10px 0px;">交易时间</th>
                          <th style="width: 20%">流水号</th>
                          <th style="width: 40%">交易明细</th>
                          <th style="width: 20%">交易金额（元）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="border-bottom: 1px solid #F3F3F3;" v-for="item in getDepositList">
                          <td style="padding:10px 0px;">
                            <p>{{item.tradTime|dateFormat('YYYY-MM-DD ') }}</p>
                            <p>{{item.tradTime | dateFormat('hh:mm:ss ')}}</p>
                          </td>
                          <td>{{item.serialNumber}}</td>
                          <td>
                            <p>{{getTradType(item.tradName)}}</p>
                            <p>任务编号：{{item.showkerSerial||'无'}}</p>
                          </td>
                          <td>
                            {{item.tradAmount}}
                          </td>
                        </tr>

                        </tbody>
                      </table>
                    </div>
                  </Modal>
                </td>
              </tr>
              <tr v-show="showNotice"><td colspan="4" style="color:red;font-size: 14px;">暂无数据！</td></tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
        <tbody>
        <tr v-show="showBigNoticeAll"><td colspan="4" style="color: red;font-size: 14px" >暂无数据！</td></tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22">
      <Page :total="100"></Page>
    </div>
  </div>

</template>
<script>
  import api from '@/config/apiConfig'
  import Icon from 'iview/src/components/icon'
  import DatePicker  from 'iview/src/components/date-picker'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Page from 'iview/src/components/page'
  import Modal from 'iview/src/components/modal'
  import {mapActions} from 'vuex'
  export default {
    name: 'MoneyManagement',
    components: {
      DatePicker:DatePicker,
      iInput: Input,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Modal: Modal,
      Page:Page

    },
    data() {
      return {
        imgSrc: null,
        myTableDetailsAll:[],
        userListDetails: null,
        infoSelect: 'account',
        detailSelect: 'false',
        userList: {},
        userAccount: {},
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
        getDepositList:{}
      }
    },
    mounted() {

    },
    created() {
      this.getUserAccount();
      this.getTradListAll([0,1,2]);
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
      accountInit(type) {
        this.infoSelect = type
      },
      detailsInit(type) {
        if (this.detailSelect === type) {
          this.detailSelect = 'none'
        } else {
          this.detailSelect = type;
          this.getTradListDetails(type);

        }
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
      changeTimeChoiceStyle(type){
        this.timeSelect = type
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
      getDepositReturnList(type){
        let _this = this;
        api.getDepositReturnList({
          taskId:type
        }).then(res => {
          if (res) {
            _this.getDepositList=res
          } else {
            _this.$Message.error('数据列表为空');
          }
        });
      }
    }
  }
</script>


