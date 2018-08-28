<template>
  <div class="my-appeal">
    <div class="pt-10 pb-10 my-appeal-title fs-18">我的建议</div>
    <div class="clear date-picker">
      <div>
        <span>提交时间：</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="beginTime"
                     format="yyyy-MM-dd HH:mm:ss" @on-change="beginTimeFun"></Date-picker>
        <span>-</span>
        <Date-picker type="datetime" placeholder="选择日期" style="width: 200px" v-model="endTime"
                     format="yyyy-MM-dd HH:mm:ss" @on-change="endTimeFun"></Date-picker>
        <span class="ml-20">问题分类：</span>
        <i-select v-model="appealReason" style="width:140px">
          <i-option value="all">全部</i-option>
          <i-option value="task_flow_related">活动流程相关</i-option>
          <i-option value="good_logistics_related">商品物流相关</i-option>
          <i-option value="payment_amount_related">款项金额相关</i-option>
          <i-option value="platform_suggest_related">平台建议相关</i-option>
          <i-option value="other">其它</i-option>
        </i-select>
        <i-button class="appeal-button ml-10" @click="getUserAppealList">查询</i-button>
      </div>
      <div class="transact-type  ">
        <span>状态类型：</span>
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">
          全部
        </Checkbox>
        <Checkbox-group v-model="transactType" @on-change="checkAllGroupChange" class="checkbox">
          <Checkbox label="waiting_handle">待处理</Checkbox>
          <Checkbox label="in_hand">处理中</Checkbox>
          <Checkbox label="handled">已处理</Checkbox>
        </Checkbox-group>
      </div>
      <div>
        <i-button class="appeal-button" @click="submitNewAppeal = true">+提交新建议</i-button>
      </div>
    </div>
    <div class="appeal-list">
      <table class="appeal-table">
        <thead>
        <tr>
          <th style="width: 20%">提交时间</th>
          <th style="width: 20%">问题分类</th>
          <th style="width: 30%">建议标题</th>
          <th style="width: 20%">处理状态</th>
          <th style="width: 10%">操作</th>
        </tr>
        </thead>
        <tbody v-for="(item,index) in appealList" :key="index">
        <tr>
          <td>{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</td>
          <td>{{getAppealCategorization(item.categorization)}}</td>
          <td>{{item.title}}</td>
          <td>{{getAppealCategorization(item.status)}}</td>
          <td class="blue cursor-p" @click="getAppealDetails(item)">详情</td>
        </tr>
        </tbody>
        <tbody v-if="appealList.length === 0">
        <tr>
          <td colspan="5" style="text-align: center" class="main-color">
            暂无数据！
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right mt-22" v-if="!isChange">
      <Page :total="totalPages*10" :page-size="pageSize" @on-change="changePages"></Page>
    </div>
    <Modal
      v-model="submitNewAppeal"
      :styles="{top:'200px',width:'700px',zIndex:'1000'}"
      :mask-closable="false"
      :closable="false">
      <div slot="header" class="clear">
        <div class="right" @click="cancelFun">
          <Icon type="md-close-circle" class="cursor-p fs-16"/>
        </div>
        <span>提交新建议</span>
      </div>
      <div class="appeal-content">
        <div>
          <span class="main-color">*</span><span>问题分类：</span>
          <i-select v-model="categorization" style="width:140px" placeHolder="请选择问题分类">
            <i-option value="task_flow_related">活动流程相关</i-option>
            <i-option value="good_logistics_related">商品物流相关</i-option>
            <i-option value="payment_amount_related">款项金额相关</i-option>
            <i-option value="platform_suggest_related">平台建议相关</i-option>
            <i-option value="other">其它</i-option>
          </i-select>
        </div>
        <div class="mt-20">
          <span class="main-color">*</span><span>建议标题：</span>
          <i-input style="width: 200px" placeholder="请输入建议标题" v-model="appealTitle"></i-input>
          <span class="ml-10">最多支持35个字符，当前已输入<span class="main-color">{{getTitleLength}}</span>/35个字符</span>
        </div>
        <div class="mt-20">
          <span class="main-color">*</span><span>建议描述：</span>
          <i-input v-model="appealDes" style="width: 600px" type="textarea"
                   placeholder="请描述相关建议"></i-input>
        </div>
        <div class="mt-20 clear img-pop">
          <span class="left ml-8">相关截图：</span>
          <Upload
            ref="screenshotsUpload"
            class="left"
            :default-file-list="defaultImage"
            :on-remove="removeMainImage"
            :on-success="uploadSuccess"
            :format="['jpg','jpeg','png','gif','bmp']"
            :max-size="10240"
            name="task"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :uploadLength="5"
            type="drag">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
        <div class="mt-10">
          <p class="cl999 ml-70">支持jpg/jpeg/png/gif/bmp格式，大小不超过10M，最多可上传5张</p>
        </div>
      </div>
      <div slot="footer" class="text-ct">
        <i-button class="bg-main-color cl-fff" @click="userComplaintCreate">确认提交</i-button>
      </div>
    </Modal>
    <div v-if="appealDetailsPop">
      <Modal
        v-model="appealDetailsPop"
        :styles="{top:'200px',width:'700px'}"
        title="查看建议详情"
        :mask-closable="false"
      >
        <div class="appeal-content">
          <div class="clear">
            <span class="main-color">*</span><span>问题分类：</span>
            <i-select v-model="appealDetailsObj.categorization" style="width:140px" disabled>
              <i-option value="task_flow_related">活动流程相关</i-option>
              <i-option value="good_logistics_related">商品物流相关</i-option>
              <i-option value="payment_amount_related">款项金额相关</i-option>
              <i-option value="platform_suggest_related">平台建议相关</i-option>
              <i-option value="other">其它</i-option>
            </i-select>
            <span class="right main-color f-b fs-italic">{{getAppealCategorization(appealDetailsObj.status)}}</span>
          </div>
          <div class="mt-20">
            <span class="main-color">*</span><span>建议标题：</span>
            <i-input style="width: 200px" placeholder="请输入建议标题" v-model="appealDetailsObj.title" disabled></i-input>
          </div>
          <div class="mt-20">
            <span class="main-color">*</span><span>建议描述：</span>
            <i-input v-model="appealDetailsObj.description" style="width: 600px" type="textarea" disabled></i-input>
          </div>
          <div class="mt-20 clear screen-shot">
            <span class="left">相关截图：</span>
            <img @click="lookImgFun(item)" v-if="appealDetailsObj.screenshotsJson"
                 v-for="item in appealDetailsObj.screenshotsJson" :src="item" alt="" width="58" height="58"
                 class="ml-8 cursor-p">
            <span class="ml-5" v-if="!appealDetailsObj.screenshotsJson">暂无截图！</span>
          </div>
          <div class="mt-20 ">
            <span>处理意见：</span>
            <i-input v-model="appealDetailsObj.suggestion" style="width: 600px" type="textarea" disabled
                     placeholder="客服人员处理后会显示相关内容"></i-input>
          </div>
        </div>
        <div slot="footer" class="text-ct">
          <i-button class="bg-main-color cl-fff" @click="appealDetailsPop = false">确认</i-button>
        </div>
      </Modal>
    </div>
    <div v-if="lookImgPop" class="img-pop">
      <Modal v-model="lookImgPop" title="照片查看器" width="566" :styles="{top:'20px'}">
        <div class="text-ct">
          <img :src="imgSrc + '!thum800'" alt="" width="500">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {DatePicker, Select, Option, OptionGroup, Checkbox, Button, Icon, Page, Modal, Input} from 'iview'
  import api from '@/config/apiConfig'
  import Upload from '@/components/Upload'
  import {aliCallbackImgUrl, domain} from '@/config/env'
  import {encryption, appealCategorization} from '@/config/utils'

  export default {
    name: 'MyAppeal',
    components: {
      DatePicker: DatePicker,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Page: Page,
      Modal: Modal,
      iInput: Input,
      Upload: Upload,
      Icon: Icon,
    },
    data() {
      return {
        appealList: [],
        beginTime: null,
        endTime: null,
        tradTimeStart: null,
        tradTimeEnd: null,
        appealReason: null,
        checkAll: false,
        transactType: [],
        isChange: false,
        totalPages: 1,
        pageSize: 10,
        pageIndex: 0,
        submitNewAppeal: false,
        categorization: null,
        defaultImage: [],
        appealImage: [],
        appealTitle: null,
        appealDes: null,
        appealDetailsPop: false,
        appealDetailsObj: null,
        imgSrc: null,
        lookImgPop: false,
      }
    },
    created() {
      let self = this;
      self.getUserAppealList();
    },
    computed: {
      getUserInfoRole() {
        return this.$store.state.userInfo.role;
      },
      getTitleLength() {
        return this.appealTitle ? this.appealTitle.length : 0;
      },
    },
    mounted() {

    },
    methods: {
      cancelFun() {
        let self = this;
        self.submitNewAppeal = false;
        self.categorization = null;
        self.appealTitle = null;
        self.appealDes = null;
        self.$refs.screenshotsUpload.clearFiles();
      },
      lookImgFun(src) {
        this.lookImgPop = true;
        this.imgSrc = src;
      },
      getAppealDetails(appealDetails) {
        let self = this;
        self.appealDetailsPop = true;
        self.appealDetailsObj = appealDetails;
      },
      beginTimeFun(e) {
        let self = this;
        self.beginTime = e;
        self.tradTimeStart = e;
      },
      endTimeFun(e) {
        this.endTime = e;
        this.tradTimeEnd = e;
      },
      handleCheckAll() {
        this.checkAll = !this.checkAll;
        if (this.checkAll) {
          this.transactType = ['waiting_handle', 'in_hand', 'handled'];
        } else {
          this.transactType = [];
        }
      },
      checkAllGroupChange() {
        this.checkAll = this.transactType.length === 3;
        this.getUserAppealList();
      },
      getUserAppealList() {
        let self = this;
        if (self.appealReason === 'all') {
          self.appealReason = ''
        }
        let statusListJsonStr = self.transactType.length > 0 ? JSON.stringify(self.transactType) : '';
        api.getUserAppealList({
          sort: 'createTime,desc',
          categorization: self.appealReason || null,
          statusListJsonStr: statusListJsonStr,
          createTimeStart: self.tradTimeStart || null,
          createTimeEnd: self.tradTimeEnd || null,
          page: self.pageIndex,
          size: self.pageSize,
        }).then((res) => {
          if (res.status) {
            self.appealList = res.data.content;
            self.totalPages = res.data.totalPages
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getAppealCategorization(type) {
        return appealCategorization(type)
      },
      changePages(data) {
        this.pageIndex = data - 1;
        this.getUserAppealList();
      },
      removeMainImage(file) {
        let self = this;
        self.appealImage.forEach((item, index) => {
          if (item === file.src) {
            self.appealImage.splice(index, 1)
          }
        });
      },
      uploadSuccess(res) {
        this.appealImage.push(aliCallbackImgUrl + res.name)
      },
      handleFormatError(file) {
        this.$Modal.warning({
          title: '文件格式不正确',
          content: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 jpeg 或 gif 或 bmp 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Modal.warning({
          title: '超出文件大小限制',
          content: '图片 ' + file.name + ' 太大，不能超过 10M'
        });
      },
      userComplaintCreate() {
        let self = this;
        if (!self.categorization) {
          self.$Message.error('请选择问题分类！');
          return
        }
        if (!self.appealTitle) {
          self.$Message.error('请输入建议标题！');
          return
        }
        if (self.appealTitle && self.appealTitle.length > 35) {
          self.$Message.error('标题最多输入35个字！');
          return
        }
        if (!self.appealDes) {
          self.$Message.error('请输入建议描述！');
          return
        }
        api.userComplaintCreate({
          categorization: self.categorization,
          title: self.appealTitle,
          description: self.appealDes,
          screenshots: self.appealImage.length > 0 ? JSON.stringify(self.appealImage) : null,
        }).then((res) => {
          if (res.status) {
            self.$Message.success('提交成功');
            self.getUserAppealList();
            self.submitNewAppeal = false;
            self.categorization = null;
            self.appealTitle = null;
            self.appealDes = null;
            self.$refs.screenshotsUpload.clearFiles();
          } else {
            self.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .my-appeal {
    .my-appeal-title {
      border-bottom: 1px solid #eee;
    }
    .under-dispose {
      font-weight: bold;
      font-style: italic;
    }
    .date-picker {
      padding: 15px;
      border-bottom: 1px solid #F6F6F6;
    }
    .img-pop {
      z-index: 2000;
    }
    .transact-type {
      margin: 0 auto;
      padding: 15px 0;
      .checkbox {
        display: inline-block;
      }
    }
    .appeal-button {
      background-color: $mainColor;
      color: #fff;
    }
    .appeal-list {
      padding: 15px;
      width: 100%;
      .appeal-table {
        width: 100%;
        th, td {
          text-align: left;
          padding: 10px 20px 10px 0;
        }
      }
    }
    .appeal-content {
      .appeal-img {
        margin-right: 8px;
      }
    }
    .des {
      margin-left: 70px;
    }
  }
</style>

