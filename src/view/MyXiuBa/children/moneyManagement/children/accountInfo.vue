<template>
  <div class="my-count mt-10">
    <div class="my-money clear">
      <div class="my-money-left left">
        <div class="moneyInfoLeft left">
          <div>可用余额（元）</div>
          <div class="number mt-5 ">{{userBalance}}</div>
          <p>收入金额（元）：{{userAccount.amountIncomes / 100 || 0}}</p>
          <p>支出金额（元）：{{userAccount.amountPayment / 100 || 0}}</p>
          <div class="view-details mt-10">
            <a v-if="getUserAccountRole===1" class="iWantPay" href="javascript:;"
               @click="accountInit('PayMoney')">我要充值</a>
            <router-link v-if="getUserAccountRole===1"
                         :to="{'path':'/user/money-management/transaction-record',query:{'activeType':1}}">充值记录
            </router-link>
          </div>
        </div>
        <div class="moneyInfoRight right">
          <div>提现中（元）</div>
          <div class="number1 mt-5 ">{{userAccount.enChashingMoney / 100 || 0}}</div>
          <div class="clear">
            <span class="sp left">提现帐号：{{getIfBandingBankCard(userList.ifBandingBankCard)}}</span>
            <a class="sa right" v-show="userList.ifBandingBankCard === null" @click="bandCard">添加</a>
            <a class="sa right" v-show="userList.ifBandingBankCard !== null" @click="bandCard">修改</a>
          </div>
          <div class="view-details ">
            <a class="iWantPay" href="javascript:;" @click="accountInit('GetoutMoney')">我要提现</a>
            <router-link
              :to="{'path':'/user/money-management/getout-money',query:{'getOutMoneyRecord':'getOutRecord'}}">提现记录
            </router-link>
          </div>
        </div>
      </div>
      <div class="my-money-right  right">
        <div>账户名：{{userList.phone}}</div>
        <div>真实姓名：{{userList.realName}}</div>
        <div>
          <span>实名认证：{{getIfCertification(userList.ifCertification)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<router-link
          to="/user/personal-setting/verified" v-show="userList.ifCertification===false">去认证
        </router-link>
        </div>
        <div>绑定手机：{{userList.phone}}</div>
        <div>注册时间：{{userList.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</div>
        <p>上次登录时间：{{userList.lastLoginTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
      </div>
    </div>
    <div class="trading-record ">
      <ul class="clear" v-if="getUserAccountRole===1">
        <li>最近交易记录</li>
        <li v-for="(item ,index) in lis ">
          <a href="javascript:;" :class="{lisColor:iSelect === item.isSelect}"
             @click="getTradList(index===0?[]:[index-1]),changeLiColor(item.isSelect)">{{item.text}}</a>
        </li>
      </ul>
      <ul class="clear" v-if="getUserAccountRole===0">
        <li>最近交易记录</li>
        <li v-for="(item ,index) in lis " v-if="item.isSelect!=='pay'">
          <a href="javascript:;" :class="{lisColor:iSelect === item.isSelect}"
             @click="getTradList(index===0?[]:[index-1]),changeLiColor(item.isSelect)">{{item.text}}</a>
        </li>
      </ul>
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
        <tbody v-for="(item,index) in myTableDetails" class="t-body" :key="index">
        <tr>
          <td>
            <p>{{item.tradTime | dateFormat('YYYY-MM-DD ')}}</p>
            <p>{{item.tradTime | dateFormat('hh:mm:ss ')}}</p>
          </td>
          <td>
            <p>{{getTradType(item.accountChangeType)}}</p>
            <p>活动编号：{{item.taskSerialNum}}</p>
          </td>
          <td :class="{tdColor:item.amountChange<0 , tdColorGreen:item.amountChange>0}">
            {{typeChang(item.amountChange / 100) || 0}}
          </td>
          <td>
            <p style="color:blue;" class="details" @click="detailsInit(item.id)">详情
              <Icon :type="detailSelect===item.id?'arrow-up-b':'arrow-down-b'" class="ml-5 "></Icon>
            </p>
          </td>
        </tr>
        <tr >
          <td colspan="4" style="padding: 0px;border: none">
            <collapse-transition>
              <div v-show="detailSelect===item.id">
                <table class="small-table">
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
                      <p v-if="getTradType(item.tradName)">{{getTradType(item.tradName) }}</p>
                      <p v-else>{{item.tradName}}</p>
                    </td>
                    <td :class="{tdColor:item.tradAmount<0 , tdColorGreen:item.tradAmount>0}">
                      {{typeChang(item.tradAmount / 100) || 0}}
                    </td>
                  </tr>
                  <tr v-show="showNotice">
                    <td colspan="4">暂无数据！</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </collapse-transition>
          </td>
        </tr>
        </tbody>
        <tbody>
        <tr v-show="showBigNotice">
          <td colspan="4">暂无数据！</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="get-more">
      <a href="javascript:;" @click="accountInit('TransactionRecord')">查看所有交易记录</a>
    </div>
    <div class="common-question">
      <h2>常见问题</h2>
      <div class="mt-10" v-if="getUserAccountRole === 1">
        <h3>充值多久后到账？</h3>
        <p>充值成功后，如果账户显示的余额不变，请您不要惊慌，我们的系统是有缓冲时间的，您只需要耐心稍等即可。</p>
      </div>
      <div class="mt-10">
        <h3>提现需要注意的事项？</h3>
        <p>1、一次提现的金额限额（最大金额）是20000元；</p>
        <p>2、每日提现次数不超过三次，每日的时间节点为今日凌晨零点到次日凌晨零点；</p>
        <p>3、按提现金额收取0.1%/笔的手续费，每笔手续费最低2元，最高30元；</p>
      </div>
      <div class="mt-10">
        <h3>提现多久后到账？</h3>
        <p>每天进行两提现处理。当日12:00-当日18:00间申请提现的，在当日18:00处理；当日18:00-次日12:00间申请提现的，在次日12:00处理。
          成功提现的订单即表示已经打款成功，具体到账时间以每个银行受理时间为准。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import Icon from 'iview/src/components/icon'
  import Button from 'iview/src/components/button'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'

  export default {
    name: 'MoneyManagement',
    components: {
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      CollapseTransition: CollapseTransition,
    },
    data() {
      return {
        bigListId: null,
        expand: null,
        transitionName: 'expand',
        imgSrc: null,
        userListDetails: null,
        showBigNotice: false,
        showBigNoticeAll: false,
        showNotice: false,
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
        detailSelect: 'false',
        infoSelect: '',
        lis: [
          {
            text: '全部',
            isSelect: 'all'
          },
          {
            text: '活动记录',
            isSelect: 'activity'
          },
          {
            text: '充值记录',
            isSelect: 'pay'
          },
          {
            text: '提现记录',
            isSelect: 'getout'
          },
          {
            text: '其它',
            isSelect: 'other'
          }
        ],
        iSelect: 'all',
      }
    },
    mounted() {

    },
    created() {
      this.getTradList([]);
      this.$store.dispatch('getUserInformation');
    },
    computed: {
      userAccount: function () {
        return this.$store.getters.getUserAccountInfo || {};
      },
      userList: function () {
        return this.$store.getters.getPersonalInfo || {};
      },
      userBalance: function () {
        return this.$store.getters.getUserBalance;
      },
      getUserAccountRole: function () {
        return this.$store.getters.getUserAccountInfo.role
      }
    },
    methods: {
      accountInit(name) {
        this.infoSelect = name;
        this.$router.push({name: name});
      },
      bandCard() {
        if (this.userList.ifCertification === false) {
          this.$Message.error('您还未实名认证，请您前往个人中心实名认证后再绑定银行卡')
        } else {
          this.$router.push({name: 'GetoutMoney', query: {bandCard: 'bandCard'}});
        }
      },
      typeChang(num) {
        if (num > 0) {
          num = '+' + num;
        }
        return num
      },
      changeLiColor(type) {
        this.iSelect = type
      },
      detailsInit(type) {
        if (this.detailSelect === type) {
          this.detailSelect = 'none';
          this.userListDetails = []
        } else {
          this.detailSelect = type;
          this.getTradListDetails(type);
        }
      },
      getTradList(type) {
        let _this = this;
        if (type.length === 0 || type.length === 3) {
          type = null;
        } else {
          type = JSON.stringify(type)
        }
        api.getTradList({
          tradTimeStart: null,
          tradTimeEnd: null,
          accountChangeTypeStr: type,
          reversePicUrl: null,
          taskSerial: null,
          page: 0,
          size: 5
        }).then(res => {
          if (res.status) {
            _this.myTableDetails = res.data.tradPage.content.slice(0, 5);
            _this.showBigNotice = _this.myTableDetails.length === 0;

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
      getTradType(type) {
        return TaskErrorStatusList(type)
      },
      getIfCertification(type) {
        return type === false ? '未认证' : '已认证';
      },
      getIfBandingBankCard(type) {
        return type === null ? '未添加' : this.userAccount.bankCardNum;
      },
    }
  }
</script>


