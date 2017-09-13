<template>
  <div class="probation-await mt-20">
    <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
      <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
    </iSelect>
    <iInput v-model="searchValue" :autocomplete="false" style="width: 160px;margin-right: 8px;"></iInput>
    <iButton type="primary" :loading="searchLoading" @click="showkerApplyList">搜索</iButton>
    <div class="probation-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="30%">活动标题</th>
          <th width="15%">绑定淘宝会员名</th>
          <th width="15%">试用担保金（元）</th>
          <th width="15%">流程状态</th>
          <th width="15%">操作</th>
        </tr>
        </thead>
        <tbody v-if="applyList.length > 0" v-for="item in applyList" :key="item.id">
        <tr class="task-number">
          <td colspan="5">活动编号：{{item.task.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="item.task.taskMainImage">
            <p class="left img-title">
              <span>{{item.task.taskName}}</span>
              <span>{{item.task.createTime | dateFormat('YYYY-MM-DD hh-mm-ss')}}</span>
            </p>
          </td>
          <td>{{item.alitmAccount}}</td>
          <td>{{item.task.perMarginNeed / 100}}</td>
          <td>{{getTaskStatus(item.status)}}</td>
          <td>
            <p class="operation" @click="endTrial(item.id)">结束试用</p>
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
      <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import Button from 'iview/src/components/button'
  import Input from 'iview/src/components/input'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Page from 'iview/src/components/page'
  import api from '@/config/apiConfig'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ApplyWaitAudit',
    components: {
      iButton: Button,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Page: Page,
    },
    data() {
      return {
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
        searchLoading: false
      }
    },
    mounted() {

    },
    created() {
      this.showkerApplyList();
    },
    computed: {},
    methods: {
      getTaskStatus(type) {
        return TaskErrorStatusList(type);
      },
      pageChange(data) {
        this.pageIndex = data;
        this.showkerApplyList();
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
            _this.totalElements = res.data.numberOfElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      endTrial(id) {
        let _this = this;
        api.showkerApplyEed({
          id: id
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '结束试用成功！',
              duration: 6
            });
            if (type === 'passAudit') {
              _this.showkerSuccessList();
            } else {
              _this.showkerApplyList();
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>

