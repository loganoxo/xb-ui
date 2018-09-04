<template>
  <div class="black-list-management">
    <div class="pt-10 pb-10 black-list-management-title fs-18">拿手违规申诉</div>
    <div class="pl-10 pt-20 pb-20 border-bottom-eee">
      <span>淘宝会员名：</span>
      <i-input class="input" v-model="blackListWwName"/>
      <i-button type="error" class="ml-10" @click="searchWw">搜索</i-button>
      <i-button type="error" class="ml-10" @click="closableModal = true">+提交违规行为</i-button>
    </div>
    <div class="black-list">
      <p class="pt-10 main-color">提交成功之后，该旺旺号对应的用户将自动添加到黑名单，并无法申请您发布的活动，从黑名单移除该用户后可恢复申请。</p>
      <p class="pt-10 pb-10 main-color">关于拿手计入征信的违规行为，提交并经客服审核后，会依据实际情况对拿手进行相应的处罚。<span class="blue cursor-p" @click="isShowRules = true">点我查看拿手处罚细则</span></p>
      <table class="black-list-table">
        <thead>
        <tr>
          <th width="20%">淘宝账号（旺旺号）</th>
          <th width="20%">违规行为</th>
          <th width="20%">申述时间</th>
          <th width="20%">征信处理</th>
          <th width="20%">操作</th>
        </tr>
        </thead>
        <tbody v-if="blackListArr.length > 0">
        <tr v-for="item in blackListArr" :key="item.id">
          <td>
            <p>{{item.alitmAccount}}</p>
            <img v-if="item.creditLevel" :src="item.creditLevel" alt="旺旺等级">
            <p v-else>旺旺等级：未知</p>
            <p>淘气值：{{item.tqz}}</p>
            <p>申请次数：{{item.applyCount || 0}}</p>
            <p>成功次数：{{item.applySuccessCount || 0}}</p>
          </td>
          <td>{{item.reasonStr}}</td>
          <td>{{item.createTime | dateFormat('YYYY-MM-DD hh:mmm:ss')}}</td>
          <td>
            <template v-if="item.auditStatus !== 3">
              <p>{{item.auditStatusStr}}</p>
              <p class="blue cursor-p mt-5" v-if="!item.addToCredit && item.reasonCode !== 'none_reason'" @click="applyToAdd(item.alitmAccount, item.id, item.reasonCode)">（申请添加）</p>
              <p class="blue cursor-p mt-5" v-if="item.auditStatus === 1 && item.addToCredit">（<span @click="seeDetails(item, true)">查看详情</span><span @click="revoke(item)" class="ml-10">撤销</span>）</p>
            </template>
            <template v-else>
              <p>
               <icon color="#f9284f" type="md-alert"/>
               <tooltip :content="item.refuseReason" placement="top" class="main-color cursor-p">{{item.auditStatusStr}}</tooltip>
             </p>
              <p class="mt-5 blue">（<span class="cursor-p" @click="seeDetails(item, false)">重新提交</span><span class="ml-10 cursor-p" @click="revoke(item)">撤销</span>）</p>
            </template>
          </td>
          <td class="blue cursor-p" @click="removeFromBlackList(item.id)">从黑名单移除</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="5">
            暂无黑名单数据！
          </td>
        </tr>
        </tbody>
      </table>
      <div class="clear" v-if="blackListArr.length > 0">
        <page class="right mr-20 mt-20" :total="totalElements" :page-size="size" @on-change="changePagesFun"/>
      </div>
    </div>
    <!--添加黑名单弹框-->
    <add-to-black-list-modal :blackListInfo="addBlackListInfo" :disabled="disabled" :closable="closableModal" :on-success="addSuccess" @change="blackListModalChange"/>
    <!--拿手处罚细则弹窗-->
    <modal v-model="isShowRules" :closable="false" width="650">
      <p slot="header" class="rule-title">拿手处罚细则</p>
      <div class="fs-14">
        <p>根据平台的实际情况以及用户的反馈，按照违规行为的轻重程度，特此制定对应的处罚细则！</p>
        <h3 class="main-color mt-10">轻重程度：低 （禁止申请必中宝盒7天）</h3>
        <p>1、未及时提交订单号、评价截图以及买家秀；</p>
        <p>2、下单完成之后，随意终止活动；</p>
        <p>3、淘宝上给了中差评，改成好评。</p>
        <h3 class="main-color mt-10">轻重程度：中低 （禁止中奖3天）</h3>
        <p>1、淘宝上晒错图之后配合删除；</p>
        <p>2、走返利下单，返还佣金；</p>
        <p>3、违规使用信用卡花呗付款，返还手续费；</p>
        <p>4、下单之后私自申请退款，配合撤销退款；</p>
        <p>5、没有按照要求的内容评价或者直接无脑复制其他评价内容。</p>
        <h3 class="main-color mt-10">轻重程度：一般 （禁止中奖5天）</h3>
        <p>1、秒拍秒退或者扫码进店；</p>
        <p>2、商家未发货私自申请退款之后，不撤销退款；</p>
        <p>3、使用错误的旺旺号下单。</p>
        <h3 class="main-color mt-10">轻重程度：重 （禁止中奖7天）</h3>
        <p>1、淘宝旺旺上直接提及或影射自己是活动用户，非真实买家的。</p>
        <h3 class="main-color mt-10">轻重程度：严重 （禁止中奖7天，禁止提现3天）</h3>
        <p>1、返利下单，不返还佣金；</p>
        <p>2、违规使用信用卡花呗付款，不返还手续费；</p>
        <p>3、淘宝乱晒图并拒绝修改和补救；</p>
        <p>4、淘宝上给中差评，并拒绝修改和补救；</p>
        <p>5、商家已发货，私自申请退款之后，不撤销退款。</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button type="error" class="rule-confirm-btn" @click="isShowRules = false">确定</i-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import {Button, Icon, Page, Input, Tooltip, Modal} from 'iview'
  import AddToBlackListModal from '@/components/AddToBlackListModal'
  import api from '@/config/apiConfig'

  export default {
    name: 'black-list-management',
    components: {
      iButton: Button,
      Page: Page,
      iInput: Input,
      Tooltip: Tooltip,
      Icon: Icon,
      Modal: Modal,
      AddToBlackListModal: AddToBlackListModal,
    },
    data() {
      return {
        blackListWwName: '',
        blackListArr: [],
        page: 0,
        size: 4,
        totalElements: 0,
        closableModal: false,
        disabled: false,
        addBlackListInfo: {},
        isShowRules: false
      }
    },
    created() {
      this.getBlackList()
    },
    methods: {
      blackListModalChange(value) {
        this.closableModal = value;
        this.disabled = false;
        this.addBlackListInfo = {};
      },
      seeDetails(item, disabled) {
        this.addBlackListInfo.alitmAccount = item.alitmAccount;
        this.addBlackListInfo.reasonCode = item.reasonCode;
        this.addBlackListInfo.refuseReason = item.refuseReason;
        this.addBlackListInfo.screenshot = item.screenshot;
        this.addBlackListInfo.taskNum = item.taskNum;
        this.addBlackListInfo.auditStatus = item.auditStatus;
        this.addBlackListInfo.addToCredit = item.addToCredit;
        this.addBlackListInfo.id = item.id;
        this.closableModal = true;
        this.disabled = disabled;
      },
      applyToAdd (alitmAccount, id, reasonCode) {
        this.addBlackListInfo.alitmAccount = alitmAccount;
        this.addBlackListInfo.id = id;
        this.addBlackListInfo.reasonCode = reasonCode;
        this.addBlackListInfo.addToCredit = true;
        this.closableModal = true;
      },
      revoke(item) {
        const _this = this;
        api.addShowkerToBlackList({
          id: item.id,
          alitmAccount: item.alitmAccount,
          reasonCode: item.reasonCode,
          reasonText: null,
          addToCredit: false,
          taskNum: null,
          screenshot: '[]',
        }).then(res => {
          if (res.status) {
            _this.$Message.success('撤销成功！');
            _this.getBlackList();
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      getBlackList() {
        const self = this;
        api.getBlackList({
          acc: self.blackListWwName,
          page: self.page,
          size: self.size,
        }).then(res => {
          if (res.status) {
            self.blackListArr = res.data;
            self.totalElements = res.totalElements;
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      searchWw() {
        this.page = 0;
        this.getBlackList();
      },
      removeFromBlackList(id) {
        const self = this;
        api.removeFromBlackList({
          id: id
        }).then(res => {
          if (res.status) {
            self.$Message.success("移除黑名单成功！");
            self.getBlackList();
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      changePagesFun(page) {
        this.page = page - 1;
        this.getBlackList();
      },
      addSuccess() {
        this.page = 0;
        this.getBlackList();
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .black-list-management {
    .black-list-management-title {
      border-bottom: 1px solid #eee;
    }
    .input {
      width: 200px;
    }
    .border-bottom-eee {
      border-bottom: 1px solid #eee;
    }
  }

  .black-list-pop {
    .ww-name {
      width: 200px;
      margin-left: 3px;
    }
    .title {
      width: 120px;
      text-align: right;
    }
    .button {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .black-list-table {
    text-align: center;
    width: 100%;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    th, td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    th {
      background-color: #F8F8F9;
      color: #000;
    }
    td {

    }
  }
  .rule-title {
    color: $mainColor;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  .rule-confirm-btn {
    width: 120px;
  }
</style>

