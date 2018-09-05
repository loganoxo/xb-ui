<template>
  <div class="use-detail">
    <div class="filter-time clear pt-20 pb-20">
      <date-picker type="daterange" :options="dataPickerOption" placeholder="使用日期区间进行搜索" class="width-180 left" format="yyyy-MM-dd" @on-change="dataPickerChange"/>
      <i-input v-model="searchTaskNumber" :clearable="true" class="left width-260 ml-10" placeholder="使用活动编号进行搜索"/>
      <i-button type="primary" class="left ml-8" :loading="loading" @click="searchTask">搜索</i-button>
      <i-button icon="md-refresh" class="left ml-8" :loading="loading" @click="searchTask">刷新</i-button>
    </div>
    <div class="personal-list-table">
      <p class="mt-20"><span>当前您共使用收藏加购流量：<span class="main-color">{{getFlowNumInfo.favoriteCartFlowUse}}</span>&nbsp;条，访客流量：<span class="main-color">{{getFlowNumInfo.visitorFlowUse}}</span>&nbsp;条。</span></p>
      <p class="border-top pt-20 mt-20 clear">
        <checkbox class="left mr-10 mt-2" :indeterminate="checkbox.indeterminate" :value="checkbox.checkAll" @click.prevent.native="handleCheckAll">全选</checkbox>
        <checkbox-group class="left" v-model="checkbox.checkAllGroup" @on-change="checkAllGroupChange">
          <checkbox label="finished">已结束</checkbox>
          <checkbox label="under_way">进行中</checkbox>
        </checkbox-group>
      </p>
      <table class="table-list mt-15">
        <thead>
        <tr class="bgF1F1F1">
          <th style="width:15%">活动标题</th>
          <th style="width:16%">活动开始/结束时间</th>
          <th style="width:8%">活动状态</th>
          <th style="width:13%">任务类型/关键词数</th>
          <th style="width:10%">匹配方式</th>
          <th class="pos-rel" style="width:20%">共使用
            <tooltip placement="top" content="共使用：指已经完成的任务，为处理成功+处理失败的任务。">
              <icon size="14" class="vtc-text-btm" type="md-help-circle"/>
            </tooltip>
            （成功/失败
            <tooltip placement="top-end" content="失败：指已经完成的任务，但未在搜索范围前300条找到宝贝（区域、用户标签影响），该情况仍然计算流量任务；若未找到宝贝过多，可停止计划止损。">
              <icon size="14" class="vtc-text-btm" type="md-help-circle"/>
            </tooltip>
            /待处理
            <tooltip placement="top" content="待处理：指平台已成功发出的任务-已经处理完成的任务。">
              <icon size="14" class="vtc-text-btm" type="md-help-circle"/>
            </tooltip>
            ）
          </th>
          <th style="width:10%">操作</th>
        </tr>
        </thead>
        <tbody v-if="flowList.length > 0">
          <template v-for="item in flowList">
          <tr class="task-number">
            <td colspan="7">
              <span>活动编号：{{item.number}}</span>
              <span class="ml-10">创建时间：{{item.createTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</span>
              <span class="ml-10">活动类型：{{item.activityCategoryDesc}}</span>
            </td>
          </tr>
          <tr>
            <td class="task-title clear">
              <img class="left ml-10 border-radius-5" :src="item.taskMainImage | imageSrc('!thum54')" :alt="item.taskName">
              <router-link to="/" class="left" :title="item.taskName">{{item.taskName}}</router-link>
            </td>
            <td>
              <p>{{item.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</p>
              <p class="mt-6">{{item.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '------'}}</p>
            </td>
            <td>
              <p>{{item.taskStatusDesc}}</p>
              <p class="mt-6">{{item.settlementStatusDesc}}</p>
            </td>
            <td class="cl000">
              <p>{{item.taskTypeDesc}}</p>
              <p class="mt-6">{{item.keywrodCount}}个关键词</p>
            </td>
            <td class="cl000">{{popularFlowType(item.popularFlow)}}</td>
            <td class="cl000">
              <p>收藏加购流量：{{item.flowCountOfFavoriteCartFlow.useCount}}条（{{item.flowCountOfFavoriteCartFlow.successCount}} / {{item.flowCountOfFavoriteCartFlow.failCount}} / {{item.flowCountOfFavoriteCartFlow.pendingCount}}）</p>
              <p class="mt-6">访客流量：{{item.flowCountOfVisitorFlow.useCount}}条（{{item.flowCountOfVisitorFlow.successCount}} / {{item.flowCountOfVisitorFlow.failCount}} / {{item.flowCountOfVisitorFlow.pendingCount}}）</p>
            </td>
            <td>
              <p class="cursor-p blue" @click="lookTaskDetail(item.id)">查看活动详情</p>
              <p class="cursor-p blue mt-6" @click="openDetail(item.id)">查看流量详情</p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="detail-table-td">
              <collapse-transition>
                <div v-show="item.id === selectId">
                  <table class="detail-table">
                    <thead>
                    <tr>
                      <th style="width:6%;">状态</th>
                      <th style="width:10%;">关键词</th>
                      <th style="width:8%;">收藏+加购</th>
                      <th style="width:8%;">加入购物车</th>
                      <th style="width:8%;">宝贝收藏</th>
                      <th style="width:18%;">收藏加购流量（成功/失败/待处理）</th>
                      <th style="width:7%;">访客</th>
                      <th style="width:15%;">访客流量（成功/失败/待处理）</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(childItem, childIndex) in flowDetail">
                      <tr>
                        <td>{{item.taskStatusDesc}}</td>
                        <td>{{item.keywrodList.length > 0 ?item.keywrodList[childIndex] : '------'}}</td>
                        <td>成功：{{childItem.favoriteCartFlowTotalCount}}条</td>
                        <td>成功：{{childItem.cartFlowTotalCount}}条</td>
                        <td>成功：{{childItem.favoriteFlowTotalCount}}条</td>
                        <td>共使用：{{childItem.favoriteCartFlowSuccessCount + childItem.favoriteCartFlowFailCount}}条（{{childItem.favoriteCartFlowSuccessCount}} / {{childItem.favoriteCartFlowFailCount}} / {{childItem.favoriteCartFlowPendingCount}}）
                        </td>
                        <td>成功：{{childItem.visitorFlowTotalCount}}条</td>
                        <td>共使用：{{childItem.visitorFlowSuccessCount + childItem.visitorFlowFailCount}}条（{{childItem.visitorFlowSuccessCount}} / {{childItem.visitorFlowFailCount}} / {{childItem.visitorFlowPendingCount}}）
                        </td>
                        <td class="operate-area">
                          <template v-if="item.taskStatus === 'under_way'">
                            <span @click="openAddFlowModal(item.id, item.number, item.taskName, item.taskMainImage, item.keywrodList[childIndex], childIndex)">补添</span>
                            <span class="ml-5" @click="openStopFlowModal(item.id, childIndex)">停止</span>
                          </template>
                          <p v-else>------</p>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </collapse-transition>
            </td>
          </tr>
        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="7">暂无数据</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--翻页-->
    <page v-if="flowList.length > 0" class="mt-22 text-align-rt" :total="page.totalPages" :page-size="page.pageSize" :current="page.pageIndex" @on-change="pageChange"/>
    <!--补添流量任务弹框-->
    <modal v-model="addFlowModal" :mask-closable="false" title="手工补添流量" width="580">
      <div class="clear">
        <div class="left">
          <img class="border-radius-5" width="54" height="54" :src="addFlowInfo.taskMainImage | imageSrc('!thum54')" :alt="addFlowInfo.taskName">
        </div>
        <div class="left ml-20" style="height: 54px;">
          <p>活动编号：{{addFlowInfo.taskNumber}}</p>
          <p class="mt-6">活动名称：{{addFlowInfo.taskName}}</p>
        </div>
        <div></div>
      </div>
      <div class="border-top">
        <p class="mt-20 ml-20">为“<span class="main-color f-b">{{addFlowInfo.keyword}}</span>”补添流量：</p>
        <p class="mt-20 ml-40">
          <span class="cl000">补添&nbsp;收藏+加购：</span>
          <input-number v-model="addFlowCount['favorite_cart_flow']" size="small" :min="0" :step="1" class="width-50"></input-number>&nbsp;个
          <span class="cl999">（每个任务消耗2条收藏加购流量）</span>
        </p>
        <p class="mt-20 ml-70">
          <span class="cl000">补添&nbsp;加购：</span>
          <input-number v-model="addFlowCount['favorite_flow']" size="small" :min="0" :step="1" class="width-50"></input-number>&nbsp;个
          <span class="cl999">（每个任务消耗1条收藏加购流量）</span>
        </p>
        <p class="mt-20 ml-70">
          <span class="cl000">补添&nbsp;收藏：</span>
          <input-number v-model="addFlowCount['cart_flow']" size="small" :min="0" :step="1" class="width-50"></input-number>&nbsp;个
          <span class="cl999">（每个任务消耗1条收藏加购流量）</span>
        </p>
        <p class="mt-20 ml-70">
          <span class="cl000">补添&nbsp;访客：</span>
          <input-number v-model="addFlowCount['visitor_flow']" size="small" :min="0" :step="1" class="width-50"></input-number>&nbsp;个
          <span class="cl999">（每个任务消耗1条访客流量）</span>
        </p>
      </div>
      <div class="border-top mt-20">
        <p class="mt-20 cl000">预计共需要收藏加购流量：<span class="main-color">{{favoriteCartFlowCount}}</span>&nbsp;条，访客流量：<span class="main-color">{{addFlowCount['visitor_flow']}}</span>&nbsp;条</p>
        <p class="mt-10 cl999">1、确认后平台将自动为您发出对应的流量任务，请确保您的流量剩余数充足，否则任务发布会失败！</p>
        <p class="mt-6 cl999">2、任务成功发出后，最多1小时内开始处理。请合理控制转化时间。</p>
      </div>
      <i-button slot="footer" type="error" :loading="loading" size="large" long @click="taskFlowSupplement">确定</i-button>
    </modal>
    <!--停止流量任务确认弹框-->
    <modal v-model="stopFlowModal" :mask-closable="false" width="380">
      <div slot="header" class="text-ct">
        <icon class="vtc-btm" color="#f9284f" type="md-alert"/>
        <span class="main-color">停止流量任务</span>
      </div>
      <div class="cl000 f-b">停止流量任务会删除所有待处理任务（包括收藏 + 加购、加购、收藏、访客任务），若为申请数匹配的流量，停止后将不再发出任务。是否确认停止？</div>
      <i-button slot="footer" type="error" size="large" :loading="loading" long @click="taskFlowStop">确定</i-button>
    </modal>
    <!--流量不足提醒弹框-->
    <modal v-model="flowNotEnoughModal" :mask-closable="false" width="420">
      <div slot="header" class="text-ct">
        <icon class="vtc-btm" color="#f9284f" type="md-alert"/>
        <span class="main-color">流量不足</span>
      </div>
      <div class="cl000" v-if="!isFavoriteCartFlowEnough">您的可支配收藏加购流量不足，预计需要：{{favoriteCartFlowCount}}条，当前可支配：{{usefulFavoriteCartFlow}}条</div>
      <div class="mt-6 cl000" v-if="!isVisitorFlowEnough">您的可支配访客流量不足，预计需要：{{addFlowCount['visitor_flow']}}条，当前可支配：{{usefulVisitorFlow}}条</div>
      <div class="mt-6 cl000">请先补足流量再发布！</div>
      <i-button slot="footer" type="error" size="large" :loading="loading" long @click="orderImmediately">马上订购</i-button>
    </modal>
  </div>
</template>

<script>
  import api from '@/config/apiConfig'
  import {DatePicker, Page, Icon, Button, Modal, InputNumber, Tooltip, Checkbox, Input} from 'iview'
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import {getSeverTime, encryption} from '@/config/utils'
  import FlowOrderModel from '@/components/FlowOrderModel'

  export default {
    name: "use-detail",
    components: {
      DatePicker: DatePicker,
      Page: Page,
      Icon: Icon,
      iButton: Button,
      iInput: Input,
      Modal: Modal,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      InputNumber: InputNumber,
      Tooltip: Tooltip,
      CollapseTransition: CollapseTransition,
      FlowOrderModel: FlowOrderModel
    },
    data() {
      return {
        dataPickerOption: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
          shortcuts: [
            {
              text: '今天',
              value() {
                const end = new Date(getSeverTime());
                const start = new Date(getSeverTime());
                return [start, end];
              }
            },
            {
              text: '昨天',
              value() {
                const end = new Date(getSeverTime() - 3600 * 1000 * 24);
                const start = new Date(getSeverTime() - 3600 * 1000 * 24);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value() {
                const end = new Date(getSeverTime());
                const start = new Date(getSeverTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            }
          ]
        },
        datePickTime: {
          tradTimeStart: null,
          tradTimeEnd: null,
        },
        page: {
          pageIndex: 1,
          pageSize: 5,
          totalPages: 1,
        },
        flowList: [],
        flowDetail: [],
        addFlowModal: false,
        stopFlowModal: false,
        flowNotEnoughModal: false,
        addFlowInfo: {},
        stopFlowInfo: {},
        loading: false,
        addFlowCount: {
          'favorite_cart_flow': 0,
          'favorite_flow': 0,
          'cart_flow': 0,
          'visitor_flow': 0,
        },
        selectId: null,
        checkbox: {
          checkAllGroup: [],
          checkAll: false,
          indeterminate: true,
        },
        searchTaskNumber: null,
      }
    },
    inject: ['showOrder'],
    computed: {
      /**
       * 获取商家流量数量信息
       * @return {object}
       */
      getFlowNumInfo() {
        return this.$store.state.flowNumberInfo;
      },

      /**
       * 计算商家可支配收藏加购流量数量
       * @return {number}
       */
      usefulFavoriteCartFlow() {
        return (this.getFlowNumInfo.favoriteCartFlowLeft - this.getFlowNumInfo.favoriteCartFlowFrozen) > 0 ? this.getFlowNumInfo.favoriteCartFlowLeft - this.getFlowNumInfo.favoriteCartFlowFrozen : 0;
      },

      /**
       * 计算商家可支配访客流量数量
       * @return {number}
       */
      usefulVisitorFlow() {
        return (this.getFlowNumInfo.visitorFlowLeft - this.getFlowNumInfo.visitorFlowFrozen) > 0 ? this.getFlowNumInfo.visitorFlowLeft - this.getFlowNumInfo.visitorFlowFrozen : 0;
      },

      /**
       * 计算补添收藏加购流量数量（除访客）
       * @return {object}
       */
      favoriteCartFlowCount() {
        return this.addFlowCount['favorite_cart_flow'] * 2 + this.addFlowCount['favorite_flow'] + this.addFlowCount['cart_flow'];
      },

      /**
       * 计算商家可支配收藏加购流量是否足够支付补添的收藏加购流量
       * @return {boolean}
       */
      isFavoriteCartFlowEnough() {
        return this.usefulFavoriteCartFlow >= this.favoriteCartFlowCount;
      },

      /**
       * 计算商家可支配收藏加购流量是否足够支付补添的收藏加购流量
       * @return {boolean}
       */
      isVisitorFlowEnough() {
        return this.usefulVisitorFlow >= this.addFlowCount['visitor_flow'];
      },
    },
    created() {
      if (this.$route.query.number) {
        this.getQueryTaskNumber();
      } else {
        this.getFlowList();
      }
    },
    methods: {
      popularFlowType(type) {
        if (type === 'match_diy') {
          return '自定义匹配'
        } else if (type === 'match_by_apply') {
          return '按申请数量匹配'
        } else {
          return '------'
        }
      },
      getQueryTaskNumber () {
        const number = this.$route.query.number;
        if (number) {
          this.searchTaskNumber = number;
          this.getFlowList();
          setTimeout(()=> {
            if (this.flowList.length > 0) {
              const taskId = this.flowList[0].id;
              this.getTaskFlowDetail(taskId);
              this.selectId = taskId;
            }
          },1000)
        }
      },
      dataPickerChange(date) {
        if (date[0] && date[1]) {
          this.datePickTime.tradTimeStart = `${date[0]} 00:00:00`;
          this.datePickTime.tradTimeEnd = `${date[1]} 23:59:59`;
        } else {
          this.datePickTime.tradTimeStart = null;
          this.datePickTime.tradTimeEnd = null;
        }
      },
      pageChange(pageIndex) {
        this.page.pageIndex = pageIndex;
        this.getFlowList()
      },
      getFlowList() {
        const _this = this;
        _this.loading = true;
        api.getTaskFlowList({
          pageIndex: _this.page.pageIndex,
          upLineTimeStart: _this.datePickTime.tradTimeStart,
          upLineTimeEnd: _this.datePickTime.tradTimeEnd,
          taskStatusListString: JSON.stringify(_this.checkbox.checkAllGroup),
          taskNumber: _this.searchTaskNumber,
        }).then(res => {
          if (res.status) {
            _this.page.totalPages = res.totalPages;
            _this.flowList = res.content;
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
        })
      },
      openDetail(id) {
        if (this.selectId === id) {
          this.selectId = null;
        } else {
          this.selectId = id;
          this.getTaskFlowDetail(id);
        }
      },
      getTaskFlowDetail(id) {
        const _this = this;
        api.getTaskFlowDetail({
          taskId: id
        }).then(res => {
          if (res.status) {
            _this.flowDetail = res.content;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      openAddFlowModal(taskId, taskNumber, taskName, taskMainImage, keyword, index) {
        this.addFlowInfo = Object.assign({}, {
          taskId: taskId,
          taskNumber: taskNumber,
          taskName: taskName,
          taskMainImage: taskMainImage,
          keyword: keyword,
          index: index,
        });
        Object.keys(this.addFlowCount).forEach(key => {
          this.addFlowCount[key] = 0;
        });
        this.addFlowModal = true;
      },
      taskFlowSupplement() {
        const _this = this;
        if (!_this.isFavoriteCartFlowEnough || !_this.isVisitorFlowEnough) {
          _this.flowNotEnoughModal = true;
        } else {
          const keys = Object.keys(_this.addFlowCount);
          const hasInput = keys.some(key => {
            return _this.addFlowCount[key] > 0
          });
          if (!hasInput) {
            _this.$Message.warning('亲，请输入需要补添的流量类型个数');
            return;
          }
          _this.loading = true;
          api.taskFlowSupplement({
            taskId: _this.addFlowInfo.taskId,
            schemeIndex: _this.addFlowInfo.index,
            countMapString: JSON.stringify(_this.addFlowCount),
          }).then(res => {
            if (res.status) {
             setTimeout(() => {
               _this.getFlowList();
               _this.getTaskFlowDetail(_this.addFlowInfo.taskId);
               _this.selectId = _this.addFlowInfo.taskId;
               _this.$Message.success('流量任务补添成功！');
               _this.$store.dispatch('getFlowNumInfo');
             }, 600);
            } else {
              _this.$Message.error(res.msg)
            }
            _this.loading = false;
            _this.addFlowModal = false;
          })
        }
      },
      openStopFlowModal(taskId, schemeIndex) {
        this.stopFlowInfo = Object.assign({}, {
          taskId: taskId,
          schemeIndex: schemeIndex
        });
        this.stopFlowModal = true;
      },
      taskFlowStop() {
        const _this = this;
        _this.loading = true;
        api.taskFlowStop({
          taskId: _this.stopFlowInfo.taskId,
          schemeIndex: _this.stopFlowInfo.schemeIndex
        }).then(res => {
          if (res.status) {
            _this.getFlowList();
            _this.getTaskFlowDetail(_this.stopFlowInfo.taskId);
            _this.selectId = _this.stopFlowInfo.taskId;
            _this.$Message.success('流量任务停止成功！');
            _this.$store.dispatch('getFlowNumInfo');
          } else {
            _this.$Message.error(res.msg);
          }
          _this.loading = false;
          _this.stopFlowModal = false;
        })
      },
      orderImmediately() {
        this.flowNotEnoughModal = false;
        this.addFlowModal = false;
        const needVisitorFlow = this.usefulVisitorFlow < this.addFlowCount['visitor_flow'];
        this.$store.commit({
          type: 'NEED_ORDER_VISITOR_FLOW',
          status: needVisitorFlow
        });
        this.showOrder();
      },
      lookTaskDetail(id) {
        this.$router.push({name: 'ActivityDetail', query: {q: encryption(id)}})
      },
      checkAllGroupChange(data) {
        if (data.length === 2) {
          this.checkbox.indeterminate = false;
          this.checkbox.checkAll = true;
        } else if (data.length > 0) {
          this.checkbox.indeterminate = true;
          this.checkbox.checkAll = false;
        } else {
          this.checkbox.indeterminate = false;
          this.checkbox.checkAll = false;
        }
        this.getFlowList();
      },
      handleCheckAll() {
        if (this.checkbox.indeterminate) {
          this.checkbox.checkAll = false;
        } else {
          this.checkbox.checkAll = !this.checkbox.checkAll;
        }
        this.checkbox.indeterminate = false;

        if (this.checkbox.checkAll) {
          this.checkbox.checkAllGroup = ['under_way', 'finished'];
        } else {
          this.checkbox.checkAllGroup = [];
        }
        this.getFlowList();
      },
      searchTask() {
        this.selectId = null;
        this.getFlowList();
      },
    },
  }
</script>

<style scoped lang="scss">
  @import 'src/css/mixin';

  .filter-time {
    border-bottom: 1px solid #F6F6F6;
  }

  .filter-period {
    span {
      display: inline-block;
      padding: 5px 20px;
      color: #9FADB7;
    }
    span.is-active {
      background-color: #DAE1E8;
      border-radius: 13px;
      color: #000;
    }
  }

  .table-list {
    width: 100%;
    border: 1px solid #dddee1;
    .task-title {
      img {
        width: 54px;
        height: 54px;
      }
      a {
        display: block;
        color: #666;
        width: 98px;
        padding-left: 5px;
        text-align: left;
        max-height: 54px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        &:hover {
          text-decoration: underline;
          color: #2b85e4;
        }
      }
    }
    > thead > tr > th {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
    }
    > tbody > tr > td {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    > tbody > tr.task-number td {
      padding: 8px 0 8px 10px;
      text-align: left;
    }
    > tbody > tr .detail-table-td {
      padding: 0;
    }
  }

  .detail-table {
    width: 100%;
    background-color: #f9f9f9;
    > thead > tr > th {
      padding: 8px 0;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      &:last-child {
        border-right: 0;
      }
    }
    > tbody > tr > td {
      padding: 15px 0;
      border-right: 1px solid #e9eaec;
      border-top: 1px solid #e9eaec;
      text-align: center;
      &:last-child {
        border-right: 0;
      }
      &.operate-area {
        span {
          display: inline-block;
          background-color: #fff;
          width: 36px;
          height: 18px;
          line-height: 18px;
          border-radius: 5px;
          text-align: center;
          color: #EA7430;
          border: 1px solid #EA7430;
          cursor: pointer;
        }
      }
    }
  }
</style>
