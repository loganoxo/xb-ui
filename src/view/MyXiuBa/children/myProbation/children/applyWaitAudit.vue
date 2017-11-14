<template>
  <div class="probation-await mt-20">
    <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
      <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
    </iSelect>
    <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
    <iButton type="primary" :loading="searchLoading" @click="showkerApplyList">搜索</iButton>
    <div class="probation-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="30%">活动标题</th>
          <th width="15%">绑定淘宝会员名</th>
          <th width="15%">活动担保金（元）</th>
          <th width="15%">流程状态</th>
          <th width="15%">操作</th>
        </tr>
        </thead>
        <tbody v-if="applyList.length > 0" v-for="item in applyList" :key="item.id">
        <tr class="task-number">
          <td colspan="5">
            <span>活动编号：{{item.task.number || '------'}}</span>
            <span class="ml-10">申请日期：{{item.applyTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
          </td>
        </tr>
        <tr>
          <td class="cursor-p" @click="goTaskDetails(item.task.id)">
            <img class="left ml-10" :src="item.task.taskMainImage + '!thum54'">
            <a class="left img-title" :title="item.task.taskName">{{item.task.taskName}}</a>
          </td>
          <td>{{item.alitmAccount}}</td>
          <td>{{item.task.perMarginNeed / 100}}</td>
          <td>
            <Tooltip :content="item.rejectToResubmitReason || item.reason" placement="top" v-if="item.reason && item.status === 'waiting_resubmit'">
              <Icon color="#f60" type="information-circled"></Icon>
              <span class="main-color">{{getTaskStatus(item.status)}}</span>
            </Tooltip>
            <span v-else> {{getTaskStatus(item.status)}}</span>
          </td>
          <td>
            <p class="operation" v-show="item.status === 'waiting_resubmit'" @click="resubmitFun(item.task.id)">重新提交</p>
            <p v-show="item.task.needBrowseCollectAddCart" class="operation mt-5" @click="getUserScreenShot(item.id,item.reason,item.status,item.task.endTime)">查看详情</p>
            <p class="operation mt-5" @click="endTrialModel(item.id)">结束活动</p>
          </td>
        </tr>
        </tbody>
        <tbody v-if="applyList.length === 0">
        <tr>
          <td colspan="5" width="100%">暂无数据</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="activity-page mt-20 right mr-10" v-show="applyList.length > 0">
      <Page :total="totalElements" :page-size="pageSize" :current="pageIndex" @on-change="pageChange"></Page>
    </div>
    <!--删除活动确认弹框-->
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>结束确认</span>
      </p>
      <div style="text-align:center">
        <p>结束试用后将直接终止该活动的试用资格，并不可再次申请。</p>
        <p>是否确认结束？</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long :loading="modalLoading" @click="endTrial">结束</iButton>
      </div>
    </Modal>
    <!--查看详情弹窗-->
    <div v-if="getEndTime">
      <Modal v-model="approvalPop"
             width="600"
             :transfer="false">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>已提交的活动截图</span>
        </p>
        <div class="text-ct mt-20 ">
          <div v-if="userScreenShotImg.searchCondition " style="display: inline-block;padding: 0 10px">
            <img class="cursor-p" style="width:80px ;height: 80px" :src="userScreenShotImg.searchCondition" alt=""
                 @click="viewScreenShotFun(userScreenShotImg.searchCondition)">
            <p>搜索条件截图</p>
          </div>
          <div v-if="userScreenShotImg.itemLocation " style="display: inline-block;padding: 0 10px">
            <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.itemLocation" alt=""
                 @click="viewScreenShotFun(userScreenShotImg.itemLocation)">
            <p>所在位置截图</p>
          </div>
          <div v-if="userScreenShotImg.browseToBottom " style="display: inline-block;padding: 0 10px">
            <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.browseToBottom" alt=""
                 @click="viewScreenShotFun(userScreenShotImg.browseToBottom)">
            <p>宝贝浏览见底</p>
          </div>
          <div v-if="userScreenShotImg.enshrine " style="display: inline-block;padding: 0 10px">
            <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.enshrine" alt=""
                 @click="viewScreenShotFun(userScreenShotImg.enshrine)">
            <p>加入收藏夹</p>
          </div>
          <div v-if="userScreenShotImg.addToCart " style="display: inline-block;padding: 0 10px">
            <img class="cursor-p" style="width: 80px;height: 80px" :src="userScreenShotImg.addToCart" alt=""
                 @click="viewScreenShotFun(userScreenShotImg.addToCart)">
            <p>加入购物车</p>
          </div>
        </div>
        <div slot="footer" v-show="status === 'waiting_resubmit'" class="clear">
          <div class="left ml-20" style="color: #FF6636;font-size: 29px">
            <Icon type="alert-circled"></Icon>
          </div>
          <div class="left ml-20" style="text-align: left">
            <p>商家希望重新提交申请，理由：{{reason}}</p>
            <p> 您还有
              <time-down :endTime="getEndTime"></time-down>
              重新提交，若该时间内未提交，将视为放弃活动！
            </p>
          </div>
        </div>
      </Modal>
    </div>
    <!--照片查看器-->
    <Modal v-model="viewScreenShot" :transfer="false" width="580" title="照片查看器">
      <div class="text-ct">
        <img style="width: 550px" :src="viewScreenShotUrl" alt="">
      </div>
    </Modal>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Tooltip from 'iview/src/components/tooltip'
  import Page from 'iview/src/components/page'
  import Modal from 'iview/src/components/modal'
  import Icon from 'iview/src/components/icon'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList, encryption} from '@/config/utils'
  import TimeDown from '@/components/TimeDown'

  export default {
    name: 'ApplyWaitAudit',
    components: {
      iButton: Button,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Page: Page,
      Modal: Modal,
      Icon: Icon,
      TimeDown: TimeDown,
      Tooltip: Tooltip
    },
    data() {
      return {
        viewScreenShot: false,
        viewScreenShotUrl: null,
        SelectList: [
          {
            value: '1',
            label: '活动名称'
          },
          {
            value: '2',
            label: '淘宝会员名'
          }
        ],
        selectStatus: null,
        searchValue: null,
        orderNumber: null,
        totalElements: null,
        pageSize: 5,
        pageIndex: 1,
        applyList: [],
        modalLoading: false,
        deleteModal: false,
        deleteId: null,
        searchLoading: false,
        approvalPop: false,
        userScreenShotImg: {},
        reason: null,
        status: null,
        getEndTime: null,
      }
    },
    mounted() {
    },
    created() {
      this.showkerApplyList();
    },
    computed: {},
    watch: {
      approvalPop: function (val) {
        if (val === false) {
          this.showkerApplyList();
        }
      }
    },
    methods: {
      viewScreenShotFun(imgUrl) {
        this.viewScreenShotUrl = imgUrl;
        this.viewScreenShot = true;
      },
      resubmitFun(id) {
        this.$router.push({name: 'TaskDetails', query: {q: encryption(id), resubmit: 'resubmit'}})
      },
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      pageChange(data) {
        this.pageIndex = data;
        this.showkerApplyList();
      },
      goTaskDetails(id) {
        this.$router.push({name: 'TaskDetails', query: {q: encryption(id)}})
      },
      showkerApplyList() {
        let _this = this;
        _this.searchLoading = true;
        api.showkerApplyList({
          selectStatus: _this.selectStatus,
          searchValue: _this.searchValue,
          status: 'toAudit',
          pageIndex: _this.pageIndex,
          pageSize: 5,
        }).then(res => {
          if (res.status) {
            _this.searchLoading = false;
            _this.applyList = res.data.content;
            _this.totalElements = res.data.totalElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      endTrialModel(id) {
        this.deleteModal = true;
        this.deleteId = id;
      },
      endTrial() {
        let _this = this;
        _this.modalLoading = true;
        api.showkerApplyEed({
          id: _this.deleteId
        }).then(res => {
          if (res.status) {
            _this.modalLoading = false;
            _this.$Message.success({
              content: '结束活动成功！',
              duration: 6
            });
            _this.showkerApplyList();
            _this.deleteModal = false;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      getUserScreenShot(id, reason, status, time) {
        let _this = this;
        _this.reason = reason;
        _this.status = status;
        _this.getEndTime = parseInt(time);
        api.getUserScreenShot({
          id: id
        }).then(res => {
          if (res.status) {
            _this.approvalPop = true;
            _this.userScreenShotImg = res.data;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>

