<template>
  <div class="black-list-management">
    <div class="pt-10 pb-10 black-list-management-title fs-18">黑名单管理</div>
    <div class="pl-10 pt-20 pb-20 border-bottom-eee">
      <span>淘宝会员名：</span>
      <iInput class="input" v-model="blackListWwName"></iInput>
      <iButton type="error" class="ml-10" @click="searchWw">搜索</iButton>
      <iButton type="error" class="ml-10" @click="addToBlackListPop = true">+添加黑名单</iButton>
    </div>
    <div class="black-list">
      <p class="pt-20 pb-20">添加黑名单的旺旺号（该用户）将无法申请您发布的活动，从黑名单移除后该用户可恢复申请。</p>
      <table class="black-list-table">
        <thead>
        <tr>
            <th width="25%">淘宝账号（旺旺号）</th>
            <th width="25%">拉黑理由</th>
            <th width="25%">拉黑时间</th>
            <th width="25%">操作</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in blackListArr" :key="index">
          <td>
            <p>{{item.alitmAccount}}</p>
            <img :src="item.creditLevel" alt="">
            <p>淘气值：{{item.tqz}}</p>
            <p>申请次数：{{item.applyCount || 0}}</p>
            <p>成功次数次数：{{item.applySuccessCount || 0}}</p>
          </td>
          <td>{{item.reason}}</td>
          <td>{{item.createTime | dateFormat('YYYY-MM-DD hh:mmm:ss')}}</td>
          <td class="blue cursor-p" @click="removeFromBlackList(item.id,index)">从黑名单移除</td>
        </tr>
        </tbody>
      </table>
      <div class="pt-20 pb-20 text-ct main-color f-b" v-show="noListNow">暂无数据！</div>
      <div class="clear"><Page class="right mr-20 mt-20" :total="totalPages*10" @on-change="changePagesFun"></Page></div>
    </div>
    <!--弹窗开始-->
    <Modal v-model="addToBlackListPop" title="添加黑名单" class="black-list-pop">
      <div><span class="inline-block title">淘宝账号（旺旺ID）：</span><iInput class="ww-name" v-model="wwName"></iInput></div>
      <div class="mt-20">
        <span class="inline-block title">拉黑原因：</span>
        <i-select v-model="addToBlackListReason" style="width:300px">
          <i-option v-for="(item ,index) in reasonList" :value="item.reasonStatus" :key="index">{{item.reasonDec}}</i-option>
        </i-select>
      </div>
      <div class="mt-20" v-show="addToBlackListReason === 'other_reason'">
        <span class="inline-block title">填写原因：</span>
        <iInput type="textarea" v-model="addToBlackOtherReason" placeholder="100字以内" style="width:300px"></iInput>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" size="large" class="button" @click="addShowkerToBlackList">确认</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {Select, Option, Button, Icon, Page, Modal, Input} from 'iview'
  import api from '@/config/apiConfig'

  export default {
    name: 'BlackListManagement',
    components: {
      iButton: Button,
      Page: Page,
      Modal: Modal,
      iInput: Input,
      Icon: Icon,
      iSelect: Select,
      iOption: Option,
    },
    data() {
      return {
        addToBlackOtherReason: null,
        addToBlackListReason: null,
        reasonList: [
          {
            reasonStatus: 'none_reason',
            reasonDec: '无理由（仅屏蔽此用户申请，不计入征信体系）'
          },
          {
            reasonStatus: 'illegal_operation',
            reasonDec: '不按要求操作'
          },
          {
            reasonStatus: 'danger_account',
            reasonDec: '此号不安全'
          },
          {
            reasonStatus: 'sales_return',
            reasonDec: '有退货行为'
          },
          {
            reasonStatus: 'other_reason',
            reasonDec: '其他'
          },
        ],
        addToBlackListPop:false,
        blackListWwName:'',
        blackListArr:[],
        wwName:null,
        noListNow:false,
        page:0,
        size:4,
        totalPages:0,
      }
    },
    created() {
      let self = this;
      self.getBlackList();
    },
    computed: {
    },
    mounted() {

    },
    methods: {
      getBlackList(){
        let self = this;
        self.noListNow = false;
        api.getBlackList({
          acc: self.blackListWwName,
          page:self.page,
          size:self.size,
        }).then( res => {
          if (res.status){
           self.blackListArr = res.data;
           self.totalPages = res.totalPages;
           if (self.blackListArr.length === 0){
             self.noListNow = true;
            }
          }
        })
      },
      searchWw(){
        let self = this;
        if (!self.blackListWwName){
          self.$Message.error("请输入旺旺名！");
        }
        self.page = 0;
        self.getBlackList();
      },
      removeFromBlackList(id,index){
        let self = this;
        api.removeFromBlackList({
          id:id
        }).then( res => {
          if (res.status){
            self.$Message.success("移除黑名单成功！");
            self.blackListArr.splice(index,1);
            if (self.blackListArr.length === 0){
              self.noListNow = true;
            }
          }
        })
      },
      changePagesFun(page){
        this.noListNow = false;
        this.page = page - 1;
        this.getBlackList();
      },
      addShowkerToBlackList(){
        const self = this;
        if (!self.wwName){
          self.$Message.error("请填写要拉黑的旺旺号！");
          return
        }
        if (!self.addToBlackListReason){
          self.$Message.error("请填写拉黑原因！");
          return
        }
        api.addShowkerToBlackList({
          alitmAccount: self.wwName,
          reasonCode: self.addToBlackListReason,
          reasonText: self.addToBlackOtherReason,
        }).then( res => {
          if (res.status){
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
          }else {
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
    .input{
      width: 200px;
    }
    .border-bottom-eee{
      border-bottom: 1px solid #eee;
    }
  }
  .black-list-pop{
    .ww-name{
      width: 200px;
      margin-left: 3px;
    }
    .title{
      width: 120px;
      text-align: right;
    }
    .button{
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .black-list-table{
    text-align: center;
    width: 100%;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    th,td{
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    th{
      background-color: #F8F8F9;
      color: #000;
    }
    td{

    }
  }
</style>

