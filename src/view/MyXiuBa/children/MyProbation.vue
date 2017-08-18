<template>
  <div class="my-probation">
    <div class="mg-probation-title pl-10">我的试用</div>
    <div class="my-probation-list mt-20">
     <div class="my-probation-list-title">
       <span :class="{isSelect:showProbationStatus === 'toAudit'}" @click="changeTitle('toAudit')">待审批</span>
       <span :class="{isSelect:showProbationStatus === 'passAudit'}" @click="changeTitle('passAudit')">已通过</span>
       <span :class="{isSelect:showProbationStatus === 'failAudit'}" @click="changeTitle('failAudit')">已终止</span>
     </div>
      <!--待审批-->
      <div class="probation-await mt-20" v-show="showProbationStatus === 'toAudit'">
        <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
          <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
        </iSelect>
        <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
        <iButton type="primary">搜索</iButton>
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
            <tbody>
            <tr>
              <td>
                <img class="left ml-10" src="">
                <p class="left img-title">
                  <span>奋斗的撒发撒发撒地方撒发撒地方撒发啊</span>
                  <span>2017-08-06 15:20</span>
                </p>
              </td>
              <td>fasdfsfsaf</td>
              <td>100</td>
              <td>待审批</td>
              <td>
               <p class="operation">结束试用</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--已通过-->
      <div class="probation-pass mt-20" v-show="showProbationStatus === 'passAudit'">
        <div class="check-status clear">
          <div class="left mr-10" style="margin-top: 2px;">
            <Checkbox
              :value="checkAll"
              @click.prevent.native="handleCheckAll">所有
            </Checkbox>
          </div>
          <div class="left">
            <Checkbox-group v-model="checkPassList" @on-change="checkChange">
              <Checkbox label="香蕉">
                <span>已通过待领取</span>
              </Checkbox>
              <Checkbox label="苹果">
                <span>订单号待审核</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>已下订单待交试用报告</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>报告待确认</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>试用完成</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>订单号有误</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>报告不合格</span>
              </Checkbox>
              <Checkbox label="西瓜">
                <span>试用终止</span>
              </Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="order-query">
          <iSelect v-model="selectStatus" style="width: 120px;margin-right: 12px;">
            <iOption v-for="item in SelectList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
          </iSelect>
          <iInput v-model="searchValue" style="width: 160px;margin-right: 8px;"></iInput>
          <span class="ml-10">订单号：</span>
          <iInput v-model="orderNumber" style="width: 160px;margin-right: 8px;"></iInput>
          <span class="ml-10">通过时间：</span>
          <Date-picker format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"  @on-change="handleDataChange"></Date-picker>
          <iButton type="primary" class="ml-20">搜索</iButton>
        </div>
        <div class="probation-table mt-20">
          <table>
            <thead>
            <tr>
              <th width="25%">活动标题</th>
              <th width="12%">绑定淘宝会员名</th>
              <th width="12%">试用担保金（元）</th>
              <th width="17%">订单号</th>
              <th width="12%">流程状态</th>
              <th width="12%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <img class="left ml-10" src="">
                <p class="left img-title">
                  <span>奋斗的撒发撒发撒地方撒发撒地方撒发啊</span>
                  <span>2017-08-06 15:20</span>
                </p>
              </td>
              <td>fsadfsafsa</td>
              <td>100</td>
              <td>21321231321231231</td>
              <td>
                <p>已通过领取</p>
                <p class="mt-5 main-color">
                  <Icon color="#f60" type="information-circled"></Icon>
                  <span>订单号有误</span>
                </p>
                <p class="mt-5">24小时0分0秒</p>
              </td>
              <td>
                <p class="operation">去下单</p>
                <p class="operation mt-5">填订单号</p>
                <p class="operation mt-5">结束试用</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="activity-page mt-20 right mr-10">
        <Page :total="totalElements" :page-size="pageSize" @on-change="pageChange"></Page>
      </div>
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
  export default {
    components: {
      iButton: Button,
      Icon: Icon,
      iInput: Input,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
      Page:Page,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      DatePicker:DatePicker
    },
    data() {
      return {
        showProbationStatus:'toAudit',
        SelectList: [
          {
            value: '1',
            label: '试客名称'
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
        pageSize: null,
        checkAll: false,
        checkPassList: [],
        queryToData:[],
      }
    },
    mounted() {

    },
    created() {

    },
    computed: {},
    methods: {
      changeTitle(type) {
        this.showProbationStatus = type;
      },
      pageChange(data) {
        this.pageIndex = data;
//        this.getTaskList();
      },
      handleCheckAll() {

      },
      checkChange() {

      },
      handleDataChange(data) {
        console.log(data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .my-probation {
    .main-color{
      color: $mainColor;
    }
    .mg-probation-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
    }
    .my-probation-list-title{
      height: 32px;
      border-bottom: 2px solid $mainColor;
      span {
        display: inline-block;
        line-height: 32px;
        @include sc(14px, #000);
        width: 114px;
        text-align: center;
        cursor: pointer;
      }
      .isSelect {
        background-color: $mainColor;
        color: #fff;
      }
    }
    .probation-table table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }
    .probation-table table td,
    .probation-table table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }
    .probation-table table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    .probation-table table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .probation-table table td img {
      width: 54px;
      height: 54px;
    }
    .probation-table table td .img-title {
      width: 200px;
      height: 54px;
      padding-left: 10px;
      text-align: left;
      span{
        display: block;
      }
    }
    .probation-table table td .operation{
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .check-status{
      padding-bottom: 20px;
      border-bottom: 1px solid #F4F4F4;
    }
    .order-query{
      padding: 20px 0;
    }
  }
</style>
