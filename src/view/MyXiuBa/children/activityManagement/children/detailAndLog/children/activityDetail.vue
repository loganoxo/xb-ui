<template>
  <div class="activity-detail">
    <div class="activity-con">
      <div class="activity-info">
        <div class="activity-info-title mt-20">填写秀品活动信息</div>
        <div class="activity-type ml-60 mt-22">
          <span class="required">活动类型：</span>
          <Radio-group v-model="taskRelease.taskType">
            <Radio label="pc_search" disabled>
              <span>PC搜索下单（taobao.com）</span>
            </Radio>
            <Radio label="app_search" disabled>
              <span>手淘搜索下单（APP）</span>
            </Radio>
            <Radio label="tao_code" disabled>
              <span>淘口令下单（APP）</span>
            </Radio>
            <Radio label="direct_access" disabled>
              <span>宝贝链接下单（taobao.com）</span>
            </Radio>
          </Radio-group>
        </div>
        <div class="activity-time ml-60 mt-20">
          <span class="required">活动时长：</span>
          <iInput v-model.number="taskRelease.taskDaysDuration" placeholder="请输入活动时长" :disabled ="true" style="width: 120px"></iInput>
          <span>天</span>
          <span class="second-color ml-10">请于活动结束后48小时内审批完成所有秀客资格，逾期系统将自动为您审批。</span>
          <p class="mt-6 pl-60">（单期活动时间为3-30天。）</p>
        </div>
        <div class="trial-condition ml-35 mt-20">
          <span class="ml-5">秀客申请条件：</span>
          <Checkbox v-model="taskRelease.onlyShowForQualification" disabled>只有获得资格的秀客才可以查看活动信息</Checkbox>
          <p class="pl-94 size-color">勾选后可以避免秀客私下索要资格，避免同行举报。但流量、收藏量、分享量会相对减少</p>
          <p class="pl-94 mt-8">
            <Checkbox v-model="taskRelease.refuseOldShowker" disabled>拒绝已参加过本店活动的秀客再次申请</Checkbox>
          </p>
        </div>
        <div class="baby-info mt-22">
          <div class="activity-info-title">填写秀品活动宝贝信息</div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">活动标题：</span>
            <iInput v-model="taskRelease.taskName" placeholder="请输入活动标题" :disabled ="true" style="width: 296px"></iInput>
          </div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">宝贝类型：</span>
            <iSelect v-model="taskRelease.itemType" disabled style="width:200px">
              <Option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level == 1" :label="parentItem.name"
                            :key="parentItem.id">
                <iOption v-if="item.level == 2 && item.parentItemCatalog && item.parentItemCatalog.id == parentItem.id"
                         v-for="item in itemCatalogList" :value="item.id" :key="item.name">{{ item.name }}
                </iOption>
              </Option-group>
            </iSelect>
          </div>
          <div class="baby-img ml-45 mt-20">
            <span class="required left mt-20">活动主图：</span>
            <div class="demo-upload-list">
              <img :src="mainDefaultList" alt="">
            </div>
          </div>
          <div class="baby-url ml-45 mt-20">
            <span class="required">宝贝地址：</span>
            <iInput v-model="taskRelease.itemUrl" placeholder="请输入宝贝地址" :disabled ="true" style="width: 296px"></iInput>
          </div>
          <div class="store-name ml-45 mt-20">
            <span class="required">店铺名称：</span>
            <iInput v-model="taskRelease.storeName" placeholder="请输入店铺名称" :disabled ="true" style="width: 296px"></iInput>
          </div>
          <div class="baby-number ml-45 mt-20">
            <span class="required">宝贝数量：</span>
            <iInput v-model="taskRelease.taskCount" placeholder="请输入宝贝数量" :disabled ="true" style="width: 120px"></iInput>
            <span>份</span>
          </div>
          <div class="baby-price ml-45 mt-20">
            <span class="required">宝贝单价：</span>
            <iInput v-model.number="taskRelease.itemPrice" placeholder="请输入宝贝单价" :disabled ="true" style="width: 120px"></iInput>
            <span>元</span>
            <p class="size-color pl-60 mt-8">活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的秀客，商家账号按相应规则处罚</p>
          </div>
          <div class="baby-pinkage ml-45 mt-20">
            <span class="required left">是否包邮：</span>
            <Radio-group v-model="taskRelease.pinkage">
              <Radio label="true" disabled>
                <span>宝贝包邮，无需修改运费</span>
              </Radio>
              <p style="height: 10px;"></p>
              <Radio label="false" disabled>
                <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="baby-payment ml-45 mt-20">
            <span class="required left">付款方式：</span>
            <Radio-group v-model="taskRelease.paymentMethod">
              <Radio label="all" disabled>
                <span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span>
              </Radio>
              <p style="height: 10px;"></p>
              <Radio label="no_hua_and_credit_pay" disabled>
                <span>禁止使用花呗、信用卡付款</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="product-introduction ml-45 mt-20">
            <span class="left ml-5">商品简介：</span>
            <quill-editor ref="myTextEditor" v-model="taskRelease.itemDescription" :options="editorOption">
            </quill-editor>
          </div>
        </div>
        <div class="order-set mt-22">
          <div class="activity-info-title" v-if="taskRelease.taskType !== 'direct_access'">{{getSetType}}下单条件设置</div>
          <!--PC搜索下单设置-->
          <template v-if="taskRelease.taskType === 'pc_search'">
            <div class="baby-main-img ml-40 mt-20">
              <span class="required left mr-5 mt-20">宝贝主图：</span>
              <div class="demo-upload-list">
                <img :src="pcDefaultList" alt="">
              </div>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <iInput v-model="PcTaskDetail.searchKeyword" placeholder="请输入搜索关键词" :disabled ="true" style="width: 260px"></iInput>
              <span class="size-color2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
              <span class="required">排序方式：</span>
              <Radio-group v-model="PcTaskDetail.searchSort">
                <Radio label="zong_he" disabled>
                  <span>综合排序</span>
                </Radio>
                <Radio label="xiao_liang" disabled>
                  <span>销售排序</span>
                </Radio>
                <Radio label="ren_qi" disabled>
                  <span>人气排序</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="search-price ml-40 mt-20">
              <span class="required">展示价格：</span>
              <iInput v-model.number="PcTaskDetail.searchPagePrice" :disabled ="true" placeholder="请输入搜索列表页展示价格" style="width: 160px"></iInput>
              <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>第</span>
              <iInput v-model.number="PcTaskDetail.searchPagePositionMin" :disabled ="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model.number="PcTaskDetail.searchPagePositionMax" :disabled ="true" style="width: 40px"></iInput>
              <span>页</span>
              <p class="size-color2 ml-80 mt-6">宝贝参考位置页数差值最大值不大于3页（如果PC端排名在10页以后， 可使用下面的卡条件功能）</p>
            </div>
            <div class="screen-condition ml-45 mt-20 clear">
              <span class="left">刷选条件：</span>
              <div class="left ml-5">
                <Checkbox-group v-model="PcTaskDetail.searchFilter">
                  <Checkbox label="pinkage" disabled>
                    <span>包邮</span>
                  </Checkbox>
                  <Checkbox label="mobile_exclusive" disabled>
                    <span>手机专享</span>
                  </Checkbox>
                  <Checkbox label="tao_coin_deduction" disabled>
                    <span>淘金币抵扣</span>
                  </Checkbox>
                  <Checkbox label="sales_return_7_plus" disabled>
                    <span>7+天退货</span>
                  </Checkbox>
                  <Checkbox label="tmall" disabled>
                    <span>天猫</span>
                  </Checkbox>
                  <p style="height: 10px;"></p>
                  <Checkbox label="global_shopping" disabled>
                    <span>全球购</span>
                  </Checkbox>
                  <Checkbox label="overseas_goods" disabled>
                    <span>海外商品</span>
                  </Checkbox>
                  <Checkbox label="consumer_protect" disabled>
                    <span>消费者保障</span>
                  </Checkbox>
                  <Checkbox label="pay_after_receive" disabled>
                    <span>货到付款</span>
                  </Checkbox>
                  <Checkbox label="hua_pay_installment" disabled>
                    <span>花呗分期</span>
                  </Checkbox>
                  <Checkbox label="wangwang_online" disabled>
                    <span>旺旺在线</span>
                  </Checkbox>
                </Checkbox-group>
              </div>
            </div>
            <div class="price-select ml-45 mt-20">
              <span>价格区间：</span>
              <iInput v-model="PcTaskDetail.priceRangeMin" :disabled ="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model="PcTaskDetail.priceRangeMax" :disabled ="true" style="width: 40px"></iInput>
              <span>元</span>
            </div>
          </template>
          <!--APP搜索下单设置-->
          <template v-else-if="taskRelease.taskType === 'app_search'">
            <div class="baby-main-img ml-40 mt-20">
              <span class="required left mr-5 mt-20">宝贝主图：</span>
              <div class="demo-upload-list">
                <img :src="appDefaultList" alt="">
              </div>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <iInput v-model="AppTaskDetail.searchKeyword" placeholder="请输入搜索关键词" :disabled ="true" style="width: 260px"></iInput>
              <span class="size-color2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
              <span class="required">排序方式：</span>
              <Radio-group v-model="AppTaskDetail.searchSort">
                <Radio label="zong_he" disabled>
                  <span>综合排序</span>
                </Radio>
                <Radio label="xiao_liang" disabled>
                  <span>销售排序</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="search-price ml-40 mt-20">
              <span class="required">展示价格：</span>
              <iInput v-model="AppTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格" :disabled ="true" style="width: 160px"></iInput>
              <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>从上往下数第</span>
              <iInput v-model="AppTaskDetail.searchRankPosition" :disabled ="true" style="width: 40px"></iInput>
              <span>个宝贝左右</span>
              <p class="size-color2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以内，可使用下面的卡条件功能）</p>
            </div>
            <div class="screen-condition ml-45 mt-20 clear">
              <span class="left">刷选条件：</span>
              <div class="left ml-5">
                <Checkbox-group v-model="AppTaskDetail.searchFilter">
                  <Checkbox label="pinkage" disabled>
                    <span>包邮</span>
                  </Checkbox>
                  <Checkbox label="mobile_exclusive" disabled>
                    <span>手机专享</span>
                  </Checkbox>
                  <Checkbox label="tao_coin_deduction" disabled>
                    <span>淘金币抵扣</span>
                  </Checkbox>
                  <Checkbox label="sales_return_7_plus" disabled>
                    <span>7+天退货</span>
                  </Checkbox>
                  <Checkbox label="tmall" disabled>
                    <span>天猫</span>
                  </Checkbox>
                  <p style="height: 10px;"></p>
                  <Checkbox label="global_shopping" disabled>
                    <span>全球购</span>
                  </Checkbox>
                  <Checkbox label="overseas_goods" disabled>
                    <span>海外商品</span>
                  </Checkbox>
                  <Checkbox label="consumer_protect" disabled>
                    <span>消费者保障</span>
                  </Checkbox>
                  <Checkbox label="pay_after_receive" disabled>
                    <span>货到付款</span>
                  </Checkbox>
                  <Checkbox label="hua_pay_installment" disabled>
                    <span>花呗分期</span>
                  </Checkbox>
                </Checkbox-group>
              </div>
            </div>
            <div class="price-select ml-45 mt-20">
              <span>价格区间：</span>
              <iInput v-model.number="AppTaskDetail.priceRangeMin" :disabled ="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model.number="AppTaskDetail.priceRangeMax" :disabled ="true" style="width: 40px"></iInput>
              <span>元</span>
            </div>
            <div class="deliver-address ml-56 mt-20">
              <span>发货地：</span>
              <iInput v-model="AppTaskDetail.deliverAddress" :disabled ="true" style="width: 120px"></iInput>
              <span class="size-color2">出于安全考虑，请勿大量使用</span>
            </div>
          </template>
          <!--淘口令下单设置-->
          <template v-else-if="taskRelease.taskType === 'tao_code'">
            <div class="tao_code ml-56 mt-20">
              <span class="required">淘口令：</span>
              <iInput v-model="taoCodeTaskDetail.taoCode" placeholder="请输入任务宝贝的淘口令" :disabled ="true" style="width: 320px"></iInput>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="description-fees mt-40">
      <h3>费用说明：</h3>
      <div class="description-fees-con mt-10">
        <p>活动担保金 = 份数 × 单品活动担保金 =<span>{{taskRelease.taskCount}}</span>×<span>{{oneBond}}</span>= <span>{{taskRelease.taskCount * oneBond}}</span>元</p>
        <p class="mt-6">单品推广费 = 单品活动担保金 × 费率 =<span>{{oneBond}}</span>× <span>6%</span> = <span>{{(oneBond * 0.06).toFixed(2)}}</span>元<span v-if="taskRelease.itemPrice * 0.06 > 3">（单品推广费超过平台设定的最高上限3.00元，本次实际收取的单品推广费用为3.00元）</span></p>
        <p class="mt-6">总推广费用 = 单品推广费用 × 份数 =<span>{{onePromotionExpenses}}</span>× <span>{{taskRelease.taskCount}} = <span>{{allPromotionExpenses}}</span></span>元</p>
        <p class="mt-6">总费用 = 活动担保金 + 总推广费用 = <span>{{orderMoney}}</span>元</p>
      </div>
    </div>
    <div class="footer-btn"><router-link to="/user/activity-management/list">返回上一页</router-link></div>
  </div>
</template>

<script>
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Icon from 'iview/src/components/icon'
  import Input from '@/components/Input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import api from '@/config/apiConfig'

  export default {
    name: 'ActivityDetail',
    components: {
      quillEditor: quillEditor,
      iInput: Input,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iSelect: Select,
      iOption: Option,
      OptionGroup: OptionGroup,
    },
    data() {
      return {
        name: 'base-example',
        uniqueId: 'uniqueId',
        editorOption: {
          placeholder: "暂无您的商品简介！",
          modules: {
            toolbar: []
          }
        },
        itemCatalogList: [],
        mainDefaultList: null,
        appDefaultList: null,
        pcDefaultList: null,
        PcTaskDetail: {
          itemMainImage: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchPagePositionMin: null,
          searchPagePositionMax: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
        },
        AppTaskDetail: {
          itemMainImage: null,
          searchKeyword: null,
          searchSort: 'zong_he',
          searchPagePrice: null,
          searchRankPosition: null,
          searchFilter: [],
          priceRangeMin: null,
          priceRangeMax: null,
          deliverAddress: null,
        },
        taoCodeTaskDetail: {
          taoCode: null,
          accessDescription: null
        },
        taskRelease: {
          taskType: 'pc_search',
          taskDaysDuration: null,
          onlyShowForQualification: false,
          refuseOldShowker: false,
          taskName: null,
          itemType: null,
          taskMainImage: null,
          itemUrl: null,
          storeName: null,
          taskCount: null,
          itemPrice: null,
          pinkage: "true",
          paymentMethod: "all",
          itemDescription: '',
          taskId: null,
          taskDetail: {}
        },
        editTaskId: null,
      }
    },
    mounted() {},
    created() {
      this.getItemCatalog();
      let taskId = this.$route.query.taskId;
      if (taskId) {
        this.editTaskId = taskId;
        this.getTaskInfo();
      }
    },
    computed: {
      /**
       * 活动类型名称
       * @return {string}
       */
      getSetType: function () {
        if (this.taskRelease.taskType === "pc_search") {
          return "PC搜索"
        } else if (this.taskRelease.taskType === "app_search") {
          return "手淘搜索"
        } else if (this.taskRelease.taskType === "tao_code") {
          return "淘口令"
        } else {
          return "宝贝链接"
        }
      },
      /**
       * 计算单品试用担保金
       * @return {number}
       */
      oneBond: function () {
        return this.taskRelease.pinkage === 'true' ? (this.taskRelease.itemPrice * 100).toFixed(2) / 100 : (this.taskRelease.itemPrice * 100).toFixed(2) / 100 + 10;
      },
      /**
       * 计算实际单品推广费用（单品推广费最高上限3元）
       * @return {number}
       */
      onePromotionExpenses:function () {
        return  this.taskRelease.itemPrice * 0.06 > 3 ? 3 : ((this.taskRelease.itemPrice * 100).toFixed(2) / 100 * 0.06).toFixed(2) * 1;
      },
      /**
       * 计算总推广费用
       * @return {number}
       */
      allPromotionExpenses: function () {
        return (this.onePromotionExpenses * this.taskRelease.taskCount).toFixed(2) * 1;
      },
      /**
       * 计算订单总金额
       * @return {number}
       */
      orderMoney: function () {
        return (((this.taskRelease.taskCount * this.oneBond * 100) + this.allPromotionExpenses * 100) / 100).toFixed(2) * 1;
      },
    },
    methods: {
      getTaskInfo() {
        let _this = this;
        let type = _this.$route.query.type;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            _this.mainDefaultList = null;
            _this.pcDefaultList = null;
            _this.appDefaultList = null;
            if(!type){
              _this.taskRelease.taskId = res.data.id;
            }
            _this.paidDeposit = (res.data.marginPaid + res.data.promotionExpensesPaid) / 100 || 0;
            _this.taskStatus = res.data.taskStatus;
            _this.mainDefaultList = res.data.taskMainImage;
            res.data.pinkage = res.data.pinkage.toString();
            _this.taskRelease.itemType = res.data.itemCatalog.id;
            for (let k in _this.taskRelease) {
              for (let i in res.data) {
                if (k === i) {
                  _this.taskRelease[k] = res.data[i];
                }
              }
            }
            _this.taskRelease.itemPrice = _this.taskRelease.itemPrice / 100;
            _this.taskRelease.taskDetail = {};
            if (res.data.taskType === 'tao_code') {
              _this.taoCodeTaskDetail = JSON.parse(res.data.taskDetail);
            } else if (res.data.taskType === 'pc_search') {
              _this.PcTaskDetail = JSON.parse(res.data.taskDetail);
              _this.pcDefaultList = _this.PcTaskDetail.itemMainImage;
              _this.conversionPrice('pc_search');
            } else if (res.data.taskType === 'app_search') {
              _this.AppTaskDetail = JSON.parse(res.data.taskDetail);
              _this.appDefaultList = _this.AppTaskDetail.itemMainImage;
              _this.conversionPrice('app_search');
            } else {
              _this.taskRelease.taskDetail = {};
            }
          }
        })
      },
      conversionPrice(type) {
        let _this = this;
        switch (type) {
          case 'pc_search' :
            _this.PcTaskDetail.searchPagePrice = _this.PcTaskDetail.searchPagePrice / 100;
            _this.PcTaskDetail.priceRangeMax = _this.PcTaskDetail.priceRangeMax / 100;
            _this.PcTaskDetail.priceRangeMin = _this.PcTaskDetail.priceRangeMin / 100;
            break;
          case 'app_search' :
            _this.AppTaskDetail.searchPagePrice = _this.AppTaskDetail.searchPagePrice / 100;
            _this.AppTaskDetail.priceRangeMax = _this.AppTaskDetail.priceRangeMax / 100;
            _this.AppTaskDetail.priceRangeMin = _this.AppTaskDetail.priceRangeMin / 100;
            break;
        }
      },
      getItemCatalog() {
        let _this = this;
        api.itemCatalog().then(res => {
          if (res.status) {
            _this.itemCatalogList = res.data
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .activity-detail{
    .main-color{
      color: $mainColor;
    }

    .second-color {
      color: $secondColor;
    }

    .size-color {
      color: #A5A5A5;
    }

    .size-color2 {
      color: #91A2BD;
    }

    .size-color3 {
      color: #FF0100;
    }

    .task-release-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666)
    }

    .activity-con {
      border: 1px solid #F5F5F5;
      padding-bottom: 42px;
    }

    .activity-info-title {
      height: 40px;
      line-height: 40px;
      background-color: #F8F8F8;
      border-bottom: 1px solid #f5f5f5;
      padding-left: 16px;
      @include sc(16px, #666)
    }

    .quill-editor {
      width: 880px;
      display: inline-block;
      height: 200px;
    }

    .footer-btn {
      @include wh(240px, 42px);
      line-height: 42px;
      @include sc(18px, #fff);
      background-color: $mainColor;
      text-align: center;
      margin: 20px auto 42px auto;
      @include transition;
      cursor: pointer;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
      a{
        color: #fff;
      }
    }

    .description-fees-con {
      padding: 12px;
      border: 1px solid #FFD6D0;
      background-color: #FFF5E0;
    }
    .demo-upload-list {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
      margin-right: 4px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
