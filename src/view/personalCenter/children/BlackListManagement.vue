<template>
  <div class="black-list-management">
    <div class="pt-10 pb-10 black-list-management-title fs-18">黑名单管理</div>
    <div class="pl-10 pt-20 pb-20 border-bottom-eee">
      <span>淘宝会员名：</span>
      <i-input class="input" v-model="blackListWwName"/>
      <i-button type="error" class="ml-10" @click="searchWw">搜索</i-button>
      <i-button type="error" class="ml-10" @click="closableModal = true">+添加黑名单</i-button>
    </div>
    <div class="black-list">
      <p class="pt-20 pb-20">添加黑名单的旺旺号（该用户）将无法申请您发布的活动，从黑名单移除后该用户可恢复申请。</p>
      <table class="black-list-table">
        <thead>
        <tr>
          <th width="20%">淘宝账号（旺旺号）</th>
          <th width="20%">拉黑理由</th>
          <th width="20%">拉黑时间</th>
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
              <p class="blue cursor-p mt-5" v-if="!item.addToCredit && item.reasonCode !== 'none_reason' && item.reasonCode !== 'tao_ke'" @click="applyToAdd(item.alitmAccount, item.id, item.reasonCode)">（申请添加）</p>
              <p class="blue cursor-p mt-5" v-if="item.auditStatus === 1 && item.addToCredit">（<span @click="seeDetails(item, true)">查看详情</span><span @click="revoke(item)" class="ml-10">撤销</span>）</p>
            </template>
            <template v-else>
              <p>
               <icon color="#f9284f" type="information-circled"/>
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
  </div>
</template>

<script>
  import {Button, Icon, Page, Input, Tooltip} from 'iview'
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
        addBlackListInfo: {}
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
</style>

