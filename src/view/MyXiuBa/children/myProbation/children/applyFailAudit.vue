<template>
  <div class="probation-fail mt-20">
    <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
      <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
    </iSelect>
    <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
    <iButton type="primary" @click="showkerApplyList">搜索</iButton>
    <div class="probation-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="30%">活动标题</th>
          <th width="15%">绑定淘宝会员名</th>
          <th width="15%">结束时间</th>
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
          <td>{{item.currentGenerationEndTime | dateFormat('YYYY-MM-DD hh-mm-ss')}}</td>
          <td>{{getTaskStatus(item.status)}}</td>
          <td>
            <p class="operation" @click="applyDelete(item.id)">删除</p>
          </td>
        </tr>
        </tbody>
        <tbody v-if="applyList.length === 0">
        <tr>
          <td colspan="6" width="100%">暂无数据</td>
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
  import Icon from 'iview/src/components/icon'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Page from 'iview/src/components/page'
  import Checkbox from 'iview/src/components/checkbox'
  import DatePicker from 'iview/src/components/date-picker'
  import Tooltip from 'iview/src/components/tooltip'
  import Upload from '@/components/upload'
  import TimeDown from '@/components/TimeDown'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {TaskErrorStatusList} from '@/config/utils'

  export default {
    name: 'ApplyFailAudit',
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
        applyList: []
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
        _this.applyList = [];
        let _this = this;
        api.showkerApplyList({
          selectStatus: _this.selectStatus,
          searchValue: _this.searchValue,
          status: 'failAudit',
          pageIndex: _this.pageIndex,
          pageSize: 5,
        }).then(res => {
          if (res.status) {
            _this.applyList = res.data.content;
            _this.totalElements = res.data.numberOfElements;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      applyDelete(id) {
        let _this = this;
        api.applyDelete({
          id: id,
        }).then(res => {
          if (res.status) {
            _this.$Message.success({
              content: '删除试用成功！',
              duration: 6
            });
            _this.showkerApplyList();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>
