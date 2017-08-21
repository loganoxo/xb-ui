<template>
  <div class="my-probation">
    <div class="my-probation-title pl-10">我的试用</div>
    <div class="my-probation-list mt-20">
      <div class="my-probation-list-title">
        <span :class="{isSelect:showProbationStatus === 'toAudit'}" @click="changeTitle('toAudit')">待审批</span>
        <span :class="{isSelect:showProbationStatus === 'passAudit'}" @click="changeTitle('passAudit')">已通过</span>
        <span :class="{isSelect:showProbationStatus === 'failAudit'}" @click="changeTitle('failAudit')">未通过</span>
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
      <div class="probation-pass mt-20" v-show="showProbationStatus === 'passAudit' && !showPassOperation">
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
          <Date-picker format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期"
                       style="width: 200px" @on-change="handleDataChange"></Date-picker>
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
                <p class="operation" @click="changePassOperation('place')">去下单</p>
                <p class="operation mt-5">填订单号</p>
                <p class="operation mt-5">结束试用</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--已通过去下单-->
      <div class="pass-place" v-show="showProbationStatus === 'passAudit' && showPassOperation === 'place'">
        <div class="my-probation-title pl-10">
          <span class="left">去下单</span>
          <span class="right mr-30" @click="returnUpPage">返回上页</span>
        </div>
        <div class="commodity-info clear">
          <div class="commodity-img left">
            <img alt="">
          </div>
          <div class="commodity-text left ml-5">
            <p>fsafsafasfsa</p>
            <p class="mt-15">
              总份数<strong>&nbsp;0&nbsp;</strong>，宝贝单价<strong>&nbsp;0&nbsp;</strong>元
            </p>
          </div>
        </div>
        <p class="place-type">
          <span>PC搜索下单</span>
          <span class="ml-20">下单剩余时间23:50:59（超时未下单，即未在平台提交订单号，视为主动放弃试用资格）</span>
        </p>
        <div class="place-step mt-22">
          <p>第1步：打开浏览器输入【<span>www.taobao.com</span>】</p>
          <p>第1步：打开浏览器输入【<span>手机淘宝APP</span>】</p>
          <p>第2步：搜索框输入关键词【<span>12315454</span>】</p>
          <p>第3步：选择【<span>综合</span>】排序</p>
          <p>第4步：搜索指定价格【<span>100-120</span>】，搜索指定发货地【<span>杭州</span>】，勾选【<span>包邮</span>】、【<span>曾东退货运费险</span>】</p>
          <p>第5步：在【<span>1-3</span>】页附近找到下图宝贝。（由于千人千面的影响，位置仅供参考）</p>
        </div>
        <div class="tao-code-place-step">
          <p>淘口令【<span>1224556546</span>】<span>复制口令</span></p>
          <img src="" alt="">
          <p><span>入口说明：【<span>直接在手机端上复制淘口令，打开手淘会自动弹出宝贝链接，或直接用手淘扫描上方二维码</span>】</span></p>
        </div>
        <div class="tao-link-place-step">
          <p>
            <span>宝贝链接：</span>
            <a href="https://tower.im/projects/45acecee017e41d2b0b48d29be2738e9/todos/9ebac8c5e424411e86bec0b68d00d822/"></a>
          </p>
        </div>
        <div class="baby-info clear mt-40">
          <img class="left" src="" alt="">
          <div class="left ml-20 mt-20">
            <p>
              <span>店铺名称：</span>
              <span>分撒发生分专卖店</span>
            </p>
            <p>
              <span>商家旺旺：</span>
              <span>分撒发生分专卖店</span>
            </p>
            <p>
              <span>价格：</span>
              <span>100</span>
            </p>
          </div>
        </div>
        <div class="write-order-number mt-40">
          <span>下单完成，填订单号</span>
          <span class="ml-35" @click="returnUpPage">返回上页</span>
        </div>
      </div>
      <!--未通过-->
      <div class="probation-fail mt-20" v-show="showProbationStatus === 'failAudit'">
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
              <th width="15%">结束时间</th>
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
              <td>2017-08-06 15:02</td>
              <td>未通过</td>
              <td>
                <p class="operation">删除</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="activity-page mt-20 right mr-10" v-show="!showPassOperation">
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
      Page: Page,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      DatePicker: DatePicker
    },
    data() {
      return {
        showProbationStatus: 'toAudit',
        showPassOperation: '',
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
        queryToData: [],
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
      changePassOperation(type) {
        this.showPassOperation = type;
      },
      pageChange(data) {
        this.pageIndex = data;
//        this.getTaskList();
      },
      returnUpPage() {
        this.showPassOperation = '';
        this.showProbationStatus = "passAudit";
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
    .main-color {
      color: $mainColor;
    }
    .my-probation-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666);
      border-bottom: 2px solid #F6F6F6;
      span:last-child {
        font-size: 14px;
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .my-probation-list-title {
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
      span {
        display: block;
      }
    }
    .probation-table table td .operation {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }
    .check-status {
      padding-bottom: 20px;
      border-bottom: 1px solid #F4F4F4;
    }
    .order-query {
      padding: 20px 0;
    }
    .commodity-info{
      padding: 15px 0 15px 10px;
      height: 88px;
      background-color: #F8F8F8;
    }
    .commodity-img img {
      @include wh(54px, 54px)
    }
    .commodity-text {
      color: #000;
      strong {
        color: $mainColor;
      }
    }
    .place-type{
      padding: 28px 0 12px 0;
      border-bottom: 2px solid #F6F6F6;
      span:first-child{
        font-size: 16px;
        color: #666;
      }
      span:last-child{
        color: red;
        font-size: 14px;
      }
    }
    .place-step{
      p{
        margin-top: 20px;
        color: #999;
        span{
          color: #000;
          font-weight: bold;
        }
      }
    }
    .baby-info{
      img{
        @include wh(124px,124px);
      }
      p{
        color: #8C9BB6;
        margin-top: 8px;
      }
    }
    .write-order-number{
      span:first-child{
        display: inline-block;
        font-size: 18px;
        background-color: $mainColor;
        padding: 6px 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        @include transition;
        &:hover {
          background-color: darken($mainColor, 10%);
        }
      }
      span:last-child {
        font-size: 14px;
        color: #2b85e4;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
