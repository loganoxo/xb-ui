<template>
  <div class="black-list-management">
    <div class="pt-10 pb-10 black-list-management-title fs-18">黑名单管理</div>
    <div class="pl-10 pt-20 pb-20 border-bottom-eee">
      <span>淘宝会员名：</span>
      <i-input class="input" v-model="blackListWwName"></i-input>
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
        <tbody>
        <tr v-for="(item,index) in blackListArr" :key="index">
          <td>
            <p>{{item.alitmAccount}}</p>
            <img :src="item.creditLevel" alt="旺旺等级">
            <p>淘气值：{{item.tqz}}</p>
            <p>申请次数：{{item.applyCount || 0}}</p>
            <p>成功次数次数：{{item.applySuccessCount || 0}}</p>
          </td>
          <td>{{item.reason}}</td>
          <td>{{item.createTime | dateFormat('YYYY-MM-DD hh:mmm:ss')}}</td>
          <td>{{item.createTime | dateFormat('YYYY-MM-DD hh:mmm:ss')}}</td>
          <td class="blue cursor-p" @click="removeFromBlackList(item.id,index)">从黑名单移除</td>
        </tr>
        </tbody>
      </table>
      <div class="pt-20 pb-20 text-ct main-color f-b" v-show="noListNow">暂无数据！</div>
      <div class="clear">
        <page class="right mr-20 mt-20" :total="totalElements" @on-change="changePagesFun"></page>
      </div>
    </div>
    <!--添加黑名单弹框-->
    <add-to-black-list-modal :closable="closableModal"></add-to-black-list-modal>
  </div>
</template>

<script>
  import {Select, Option, Button, Icon, Page, Modal, Input} from 'iview'
  import AddToBlackListModal from '@/components/AddToBlackListModal'
  import api from '@/config/apiConfig'

  export default {
    name: 'black-list-management',
    components: {
      iButton: Button,
      Page: Page,
      Modal: Modal,
      iInput: Input,
      Icon: Icon,
      iSelect: Select,
      iOption: Option,
      AddToBlackListModal: AddToBlackListModal,
    },
    data() {
      return {
        addToBlackOtherReason: null,
        addToBlackListReason: null,
        addToBlackListPop: false,
        blackListWwName: '',
        blackListArr: [],
        wwName: null,
        noListNow: false,
        page: 0,
        size: 4,
        totalElements: 0,
        closableModal: true
      }
    },
    created() {
      let self = this;
      self.getBlackList();
    },
    computed: {},
    mounted() {

    },
    methods: {
      getBlackList() {
        let self = this;
        self.noListNow = false;
        api.getBlackList({
          acc: self.blackListWwName,
          page: self.page,
          size: self.size,
        }).then(res => {
          if (res.status) {
            self.blackListArr = res.data;
            self.totalElements = res.totalElements;
            if (self.blackListArr.length === 0) {
              self.noListNow = true;
            }
          }
        })
      },
      searchWw() {
        let self = this;
        if (!self.blackListWwName) {
          self.$Message.error("请输入旺旺名！");
          return;
        }
        self.page = 0;
        self.getBlackList();
      },
      removeFromBlackList(id, index) {
        let self = this;
        api.removeFromBlackList({
          id: id
        }).then(res => {
          if (res.status) {
            self.$Message.success("移除黑名单成功！");
            self.blackListArr.splice(index, 1);
            if (self.blackListArr.length === 0) {
              self.noListNow = true;
            }
          }
        })
      },
      changePagesFun(page) {
        this.noListNow = false;
        this.page = page - 1;
        this.getBlackList();
      },
      addShowkerToBlackList() {
        const self = this;
        if (!self.wwName) {
          self.$Message.error("请填写要拉黑的旺旺号！");
          return
        }
        if (!self.addToBlackListReason) {
          self.$Message.error("请填写拉黑原因！");
          return
        }
        api.addShowkerToBlackList({
          alitmAccount: self.wwName,
          reasonCode: self.addToBlackListReason,
          reasonText: self.addToBlackOtherReason,
        }).then(res => {
          if (res.status) {
            self.addToBlackListPop = false;
            self.$Message.success("添加黑名单成功！");
            self.wwName = '';
            self.addToBlackListReason = '';
            self.addToBlackOtherReason = '';
            self.page = 0;
            self.wwName = '';
            self.addToBlackListReason = '';
            self.addToBlackOtherReason = '';
            self.getBlackList();
          } else {
            self.$Message.error(res.msg);
          }
        })
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

