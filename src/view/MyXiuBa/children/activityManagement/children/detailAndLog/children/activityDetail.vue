<template>
  <div class="activity-detail">
    <div class="activity-table mt-20">
      <table>
        <thead>
        <tr>
          <th width="20%">活动标题</th>
          <th width="14%">活动开始 / 结束时间</th>
          <th width="10%">活动状态</th>
          <th width="12%">报名 / 已通过</th>
          <th width="8%">可审批名额</th>
          <th width="24%">活动所需担保金 / 活动所需推广费 / 已存入</th>
        </tr>
        </thead>
        <tbody>
        <tr class="task-number">
          <td colspan="7">活动编号：{{itemCatalog.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="itemCatalog.taskMainImage" :alt="itemCatalog.taskName">
            <span class="img-title left">{{itemCatalog.taskName}}</span>
          </td>
          <td>
            <p>{{itemCatalog.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{itemCatalog.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td v-if="itemCatalog.taskStatus !== 'waiting_modify'">
            {{itemCatalog.taskStatusDesc}}<br/>{{itemCatalog.settlementStatusDesc}}
          </td>
          <td class="cursor-p main-color" v-else>
            <Tooltip :content="itemCatalog.auditLogs[itemCatalog.auditLogs.length - 1].resultMsg" placement="top">
              <Icon color="#f60" type="information-circled"></Icon>&nbsp;待修改
            </Tooltip>
          </td>
          <td class="registration">
            {{itemCatalog.showkerApplyTotalCount || 0}} / {{itemCatalog.showkerApplySuccessCount || 0}}（人）
          </td>
          <td>{{itemCatalog.taskCount  - itemCatalog.showkerApplySuccessCount}}</td>
          <td>
            {{itemCatalog.totalMarginNeed / 100}} / {{itemCatalog.promotionExpensesNeed / 100}} / {{(itemCatalog.marginPaid + itemCatalog.promotionExpensesPaid) / 100 || 0}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="activity-type mt-20">
      <div class="activity-type-title">选择活动类型：</div>
      <div class="clear mt-10">
        <div class="left mr-10 activity-type-box disabled" :class="{isSelect:taskRelease.activityCategory === 'free_get'}" @click="changeSelectActivity('free_get')">
          <p>免费领（拍A发A）</p>
          <p>秀客0元试用</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'free_get'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'present_get'}" @click="changeSelectActivity('present_get')">
          <p>体验专区（拍A发B）</p>
          <p>实际发的是赠品或体验装</p>
          <p>不可跨类目，否则会影响人群标签</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'present_get'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'pinkage_for_10'}" @click="changeSelectActivity('pinkage_for_10')">
          <p>10元包邮</p>
          <p>秀客承担10元邮费</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'pinkage_for_10'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'price_low'}" @click="changeSelectActivity('price_low')">
          <p>白菜价</p>
          <p>帮商家测款定价</p>
          <p>真实卖货</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'price_low'"></span>
        </div>
       <!-- <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'goods_clearance'}" @click="changeSelectActivity('goods_clearance')">
          <p>清仓断码</p>
          <p>帮商家解决最为头疼的</p>
          <p>库存问题</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'goods_clearance'"></span>
        </div>-->
      </div>
      <div class="pop-tip mt-15">
        <div v-show="taskRelease.activityCategory === 'free_get'">
          <div class="pop-tip-arrow free-get"></div>
          <div>该活动申请率极高，评价效果极好，商家能自主筛选秀客，迅速积攒销54量。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'pinkage_for_10'">
          <div class="pop-tip-arrow pinkage-for-10"></div>
          <div>该活动申请率较高，评价效果较好，适用于中低客单的走量产品。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'present_get'">
          <div class="pop-tip-arrow present-get"></div>
          <div>秀客拍下付款的是主宝贝（高客单的商品），为主宝贝带来成交转化，但实际发货的是体验装或赠品。该活动可大幅降低活动成本，但要规避秀客在淘宝上晒图。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'price_low'">
          <div class="pop-tip-arrow price-low"></div>
          <div>秀客以9.9元、49.9元、99.9元及1折、3折、5折的价格购买宝贝，该活动也可适当降低活动成本，但更重要的是帮助商家真实成交，获得消费者的实际反馈。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'goods_clearance'">
          <div class="pop-tip-arrow goods-clearance"></div>
          <div>商家提供超乎想象的价格，目的不是为了赚取利润，而是尽快把仓库里积压的库存变成现金（比如断码，过季，尾货等），秀客也能真实选购到最最实惠的宝贝。</div>
        </div>
      </div>
    </div>
    <div class="activity-con mt-20">
      <div class="activity-info">
        <div class="activity-info-title">填写活动信息</div>
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
          <iInput v-model="taskRelease.taskDaysDuration" placeholder="请输入活动时长" :disabled="true"
                  style="width: 120px"></iInput>
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
          <p class="pl-94 mt-8">
            <Checkbox v-model="taskRelease.needBrowseCollectAddCart" disabled>必须先完成浏览、收藏、加购，才可以申请活动资格</Checkbox>
          </p>
        </div>
        <div class="baby-info mt-22">
          <div class="activity-info-title">填写活动宝贝信息</div>
          <div class="complimentary-tip mt-20 pl-40" v-show="taskRelease.activityCategory === 'present_get'">
            <p class="size-color3">赠品活动发布说明：</p>
            <p class="size-color3 mt-6">1、活动标题、宝贝类型、活动主图、宝贝单价、商品简介填写赠品相关信息；宝贝地址、掌柜旺旺填写淘宝正品（即希望秀客拍下的SKU）相关信息；</p>
            <p class="size-color3">2、在备注中明确说明希望秀客拍下的SKU（否则秀客可能会找不到宝贝）。</p>
            <p class="size-color3">3、为了不影响人群标签，赠品类型必须与正品同属一个类目，否则后台审核不给予通过。</p>
          </div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">活动标题：</span>
            <iInput v-model="taskRelease.taskName" placeholder="请输入活动标题" :disabled="true" style="width: 296px"></iInput>
          </div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">宝贝类型：</span>
            <iSelect v-model="taskRelease.itemType" disabled style="width:200px">
              <Option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level == 1" :label="parentItem.name" :key="parentItem.id">
                <iOption v-if="item.level == 2 && item.parentItemCatalog && item.parentItemCatalog.id == parentItem.id" v-for="item in itemCatalogList" :value="item.id" :key="item.id">{{ item.name }}
                </iOption>
              </Option-group>
            </iSelect>
          </div>
          <div class="baby-img ml-45 mt-20">
            <span class="required left mt-20">活动主图：</span>
            <div class="demo-upload-list">
              <img :src="mainDefaultList + '!thum54'" alt="">
            </div>
          </div>
          <div class="baby-url ml-45 mt-20">
            <span class="required">宝贝地址：</span>
            <iInput v-model="taskRelease.itemUrl" placeholder="请输入宝贝地址" :disabled="true" style="width: 296px"></iInput>
          </div>
          <div class="store-name ml-45 mt-20">
            <span class="required">掌柜旺旺：</span>
            <iInput v-model="taskRelease.storeName" placeholder="请输入掌柜旺旺" :disabled="true"
                    style="width: 296px"></iInput>
          </div>
          <div class="baby-number ml-45 mt-20">
            <span class="required">宝贝数量：</span>
            <iInput v-model="taskRelease.taskCount" placeholder="请输入宝贝数量" :disabled="true"
                    style="width: 120px"></iInput>
            <span>份</span>
          </div>
          <div class="baby-price ml-45 mt-20">
            <span class="required">宝贝单价：</span>
            <iInput v-model="taskRelease.itemPrice" placeholder="请输入宝贝单价" :disabled="true"
                    style="width: 120px"></iInput>
            <span>元</span>
            <p class="size-color pl-60 mt-8">活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的秀客，商家账号按相应规则处罚</p>
          </div>
          <div class="discount ml-40 mt-20" v-show="taskRelease.activityCategory !== 'free_get' && taskRelease.activityCategory !== 'present_get'">
            <div class="clear" v-show="taskRelease.activityCategory !== 'pinkage_for_10'">
              <span class="required mt-8 left">折扣/活动：</span>
              <div class="left">
                <div class="clear" v-show="taskRelease.activityCategory !== 'goods_clearance'">
                  <div class="discount-btn left ml-10 discount-9-9 disabled" :class="{isSelect:taskRelease.discountType === 'discount_9_9'}" v-show="discountDisabled.discount_9_9.disabled">
                    <span> 9.9试用</span>
                    <span>（50元以上宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_9_9'"></span>
                  </div>
                  <div class="discount-btn left ml-10 discount-49-9 disabled" :class="{isSelect:taskRelease.discountType === 'discount_49_9'}" v-show="discountDisabled.discount_49_9.disabled">
                    <span> 49.9试用</span>
                    <span>（150元以上宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_49_9'"></span>
                  </div>
                  <div class="discount-btn left ml-10 discount-999 disabled" :class="{isSelect:taskRelease.discountType === 'discount_99_9'}" v-show="discountDisabled.discount_99_9.disabled">
                    <span> 99.9试用</span>
                    <span>（250元以上宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_99_9'"></span>
                  </div>
                </div>
                <div class="clear mt-10">
                  <div class="discount-btn left ml-10 discount-9-9 disabled" :class="{isSelect:taskRelease.discountType === 'discount_r_10'}">
                    <span> 1折试用</span>
                    <span>（所有宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_10'"></span>
                  </div>
                  <div class="discount-btn left ml-10 discount-49-9 disabled" :class="{isSelect:taskRelease.discountType === 'discount_r_30'}">
                    <span> 3折试用</span>
                    <span>（所有宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_30'"></span>
                  </div>
                  <div class="discount-btn left ml-10 discount-999 disabled" :class="{isSelect:taskRelease.discountType === 'discount_r_50'}">
                    <span> 5折试用</span>
                    <span>（所有宝贝可选）</span>
                    <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_50'"></span>
                  </div>
                </div>
              </div>
            </div>
            <p class="sizeColor pl-60 mt-20" v-show="taskRelease.itemPrice && taskRelease.discountType && taskRelease.activityCategory !== 'pinkage_for_10'">秀客以<span class="main-color">{{taskRelease.itemPrice}}</span>元价格在淘宝上购买，活动成功后返款<span class="main-color">{{newItemPrice.toFixed(2)}}</span>元给秀客！</p>
            <p class="sizeColor pl-60" v-show="taskRelease.itemPrice && taskRelease.itemPrice >= 10 && taskRelease.activityCategory === 'pinkage_for_10'">秀客以<span class="main-color">{{taskRelease.itemPrice}}</span>元价格在淘宝上购买，活动成功后返款<span class="main-color">{{taskRelease.itemPrice > 10 ? taskRelease.itemPrice - 10 : 0}}</span>元给秀客！</p>
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
          <div class="task-remark ml-45 mt-20 clear">
            <span class="left ml-5">下单备注：</span>
            <div class="left">
              <iInput class="task-remark-input" type="textarea" :autosize="{minRows: 6,  maxRows: 12}" :disabled="true" placeholder="请在这里输入需要秀客注意的事项，例如：SKU信息等，这里的信息会无条件展示出来。" v-model="taskRelease.remark"></iInput>
              <p class="size-color3 mt-10" v-show="taskRelease.activityCategory === 'present_get'">备注中明确说明希望秀客拍下的SKU（否则秀客可能会找不到宝贝）</p>
              <p class="size-color3 mt-6" v-show="taskRelease.activityCategory === 'present_get'">建议商家备注中明确说明：“请勿在淘宝中评价及晒图！”，若未注明，秀客在淘宝中进行评价或晒图后可能会影响主宝贝的评价情况。</p>
            </div>
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
                <img :src="pcDefaultList + '!thum54'" alt="">
              </div>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <iInput v-model="PcTaskDetail.searchKeyword" placeholder="请输入搜索关键词" :disabled="true"
                      style="width: 260px"></iInput>
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
              <iInput v-model="PcTaskDetail.searchPagePrice" :disabled="true" placeholder="请输入搜索列表页展示价格"
                      style="width: 160px"></iInput>
              <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>第</span>
              <iInput v-model="PcTaskDetail.searchPagePositionMin" :disabled="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model="PcTaskDetail.searchPagePositionMax" :disabled="true" style="width: 40px"></iInput>
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
              <iInput v-model="PcTaskDetail.priceRangeMin" :disabled="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model="PcTaskDetail.priceRangeMax" :disabled="true" style="width: 40px"></iInput>
              <span>元</span>
            </div>
          </template>
          <!--APP搜索下单设置-->
          <template v-else-if="taskRelease.taskType === 'app_search'">
            <div class="baby-main-img ml-40 mt-20">
              <span class="required left mr-5 mt-20">宝贝主图：</span>
              <div class="demo-upload-list">
                <img :src="appDefaultList + '!thum54'" alt="">
              </div>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <iInput v-model="AppTaskDetail.searchKeyword" placeholder="请输入搜索关键词" :disabled="true"
                      style="width: 260px"></iInput>
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
              <iInput v-model="AppTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格" :disabled="true"
                      style="width: 160px"></iInput>
              <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>从上往下数第</span>
              <iInput v-model="AppTaskDetail.searchRankPosition" :disabled="true" style="width: 40px"></iInput>
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
              <iInput v-model="AppTaskDetail.priceRangeMin" :disabled="true" style="width: 40px"></iInput>
              <span>---</span>
              <iInput v-model="AppTaskDetail.priceRangeMax" :disabled="true" style="width: 40px"></iInput>
              <span>元</span>
            </div>
            <div class="deliver-address ml-56 mt-20">
              <span>发货地：</span>
              <iInput v-model="AppTaskDetail.deliverAddress" :disabled="true" style="width: 120px"></iInput>
              <span class="size-color2">出于安全考虑，请勿大量使用</span>
            </div>
          </template>
          <!--淘口令下单设置-->
          <template v-else-if="taskRelease.taskType === 'tao_code'">
            <div class="tao_code ml-56 mt-20">
              <span class="required">淘口令：</span>
              <iInput v-model="taoCodeTaskDetail.taoCode" placeholder="请输入任务宝贝的淘口令" :disabled="true"
                      style="width: 320px"></iInput>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="description-fees mt-40">
      <h3>费用说明：</h3>
      <div class="description-fees-con mt-10">
        <p>活动担保金 = 份数 × 单品活动担保金 =<span>{{taskRelease.taskCount}}</span>×<span>{{oneBond}}</span>= <span>{{(taskRelease.taskCount * oneBond).toFixed(2)}}</span>元</p>
        <p class="mt-6">单品推广费 = （宝贝单价 + 邮费） × 费率 =<span>（{{taskRelease.itemPrice}} + {{taskRelease.pinkage === 'true' ? 0 : 10}}）</span>×<span>6%</span>= <span>{{onePromotionExpenses}}</span>元<span v-if="onePromotionExpenses > 3">（单品推广费超过平台设定的最高上限3.00元，本次实际收取的单品推广费用为3.00元）</span></p>
        <p class="mt-6">总推广费用 = 单品推广费用 × 份数 =<span>{{onePromotionExpenses}}</span>× <span>{{taskRelease.taskCount}} = <span>{{allPromotionExpenses}}</span></span>元</p>
        <p class="mt-6">总费用 = 活动担保金 + 总推广费用 = <span>{{orderMoney}}</span>元</p>
      </div>
    </div>
    <router-link class="footer-btn" tag="div" to="/user/activity-management/list">返回上一页</router-link>
  </div>
</template>

<script>
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Icon from 'iview/src/components/icon'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import {decode} from '@/config/utils'
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
        itemCatalog: [],
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
          needBrowseCollectAddCart: false,
          taskName: null,
          itemType: null,
          taskMainImage: null,
          itemUrl: null,
          storeName: null,
          taskCount: null,
          itemPrice: null,
          discountType: 'discount_0',
          activityCategory: 'free_get',
          pinkage: "true",
          paymentMethod: "all",
          itemDescription: '',
          taskId: null,
          taskDetail: {}
        },
        editTaskId: null,
        discountDisabled: {
          discount_0: {
            isDiscount: false,
            disabled: false,
            buyPrice: 0,
            returnPrice: 0,
          },
          discount_9_9: {
            isDiscount: false,
            disabled: true,
            buyPrice: 50,
            returnPrice: 9.9,
          },
          discount_10: {
            isDiscount: false,
            disabled: true,
            buyPrice: 0,
            returnPrice: 10,
          },
          discount_49_9: {
            isDiscount: false,
            disabled: true,
            buyPrice: 150,
            returnPrice: 49.9,
          },
          discount_99_9: {
            isDiscount: false,
            disabled: true,
            buyPrice: 250,
            returnPrice: 99.9,
          },
          discount_r_10: {
            isDiscount: true,
            discount: 0.1,
            returnPrice: 0.1,
          },
          discount_r_30: {
            isDiscount: true,
            discount: 0.3,
            returnPrice: 0.3,
          },
          discount_r_50: {
            isDiscount: true,
            discount: 0.5,
            returnPrice: 0.5,
          },
        },
      }
    },
    mounted() {
    },
    created() {
      this.getItemCatalog();
      let taskId = decode(this.$route.query.q);
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
       * 计算商家需要存入的担保金（当用户勾选折扣试用的时候：宝贝单价 - 对应的折扣价格）
       * @return {number}
       */
      newItemPrice: function () {
        let type = this.taskRelease.discountType;
        if (!this.discountDisabled[type].isDiscount) {
          return this.taskRelease.itemPrice - this.discountDisabled[type].returnPrice;
        } else {
          return this.taskRelease.itemPrice - this.taskRelease.itemPrice * this.discountDisabled[type].returnPrice
        }
      },

      /**
       * 计算最终商家发布单品活动担保金（商家需要存入的担保金 + 是否包邮）
       * @return {number}
       */
      oneBond: function () {
        return this.taskRelease.pinkage === 'true' ? (this.newItemPrice * 100).toFixed(2) / 100 : ((this.newItemPrice * 100).toFixed(2) / 100 + 10).toFixed(2);
      },

      /**
       * 计算单品推广费用（宝贝单价+ 邮费，单品推广费最高上限3元）
       * @return {number}
       */
      onePromotionExpenses: function () {
        let price = this.taskRelease.pinkage === 'true' ? this.taskRelease.itemPrice : this.taskRelease.itemPrice + 10;
        return price * 0.06 > 3 ? 3.00 : (price * 0.06).toFixed(2) * 1;
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
            _this.itemCatalog = res.data;
            _this.mainDefaultList = null;
            _this.pcDefaultList = null;
            _this.appDefaultList = null;
            if (!type) {
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
            _this.PcTaskDetail.searchPagePrice = (_this.PcTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            _this.PcTaskDetail.priceRangeMax = _this.PcTaskDetail.priceRangeMax > 0 ? (_this.PcTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            _this.PcTaskDetail.priceRangeMin = _this.PcTaskDetail.priceRangeMin > 0 ? (_this.PcTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
            break;
          case 'app_search' :
            _this.AppTaskDetail.searchPagePrice = (_this.AppTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            _this.AppTaskDetail.priceRangeMax = _this.AppTaskDetail.priceRangeMax > 0 ? (_this.AppTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            _this.AppTaskDetail.priceRangeMin = _this.AppTaskDetail.priceRangeMin > 0 ? (_this.AppTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
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

  .activity-table table {
    width: 100%;
    border: 1px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
  }

  .activity-table table td,
  .activity-table table th {
    border-right: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
    text-align: center;
  }

  .activity-table table tr.task-number td {
    text-align: left;
    padding: 6px 0 6px 10px;
  }

  .activity-table table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
  }

  .activity-table table td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .activity-table table td img {
    width: 54px;
    height: 54px;
  }

  .activity-table table td .img-title {
    display: inline-block;
    width: 132px;
    height: 54px;
    padding-left: 10px;
    text-align: left;
  }

  /*.activity-table table td.registration {*/
    /*color: #2b85e4;*/
  /*}*/

  .activity-table table td .del-edit span {
    color: #2b85e4;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }

  .activity-table table td .del-edit span:last-child {
    color: #2b85e4;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }

  .activity-table table td .bond span {
    color: $mainColor;
    border-radius: 5px;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken($mainColor, 10%);
    }
  }

  .activity-table table td .copy span {
    color: #2b85e4;
    cursor: pointer;
    @include transition;
    &:hover {
      color: darken(#2b85e4, 10%);
    }
  }

  .activity-detail {
    .main-color {
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
      a {
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
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .discount-btn{
    display: inline-block;
    width: 140px;
    height: 40px;
    text-align: center;
    padding: 1px 0;
    color: #fff;
    cursor: pointer;
    position: relative;
    span{
      display: block;
      &:first-child{
        font-weight: bold;
      }
    }
    &.discount-charge{
      background-color: #00CD36;
      border:2px solid #00CD36;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-9-9{
      background-color: #FF9900;
      border:2px solid #FF9900;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-49-9{
      background-color: #CD3636;
      border:2px solid #CD3636;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-999{
      background-color: #FF3699;
      border:2px solid #FF3699;
      &:hover{
        border-color:#000;
      }
    }
    &.isSelect{
      border-color:#000;
    }
    &.disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }
    .is-select-gou{
      position: absolute;
      display: inline-block;
      top: 28px;
      right: -2px;
      width: 11px;
      height: 10px;
      background-image: url("~assets/img/common/select-gou.png");
      background-repeat: no-repeat;
    }
  }
  .task-remark-input {
    width: 600px;
  }
  .activity-type-title {
    font-size: 16px;
    color: #666;
  }
  .activity-type-box {
    width: 192px;
    height: 72px;
    background-color: #FFF4F1;
    color: #FF9675;
    border: 1px solid #FF9675;
    text-align: center;
    cursor: pointer;
    position: relative;
    @include transition;
    P:first-child {
      font-weight: bold;
      font-size: 16px;
      margin-top: 6px;
    }
    &.isSelect {
      border: 2px solid #000;
      background-color: $mainColor;
      color: #fff;
    }
    &.disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }
    .is-select-gou {
      position: absolute;
      display: inline-block;
      bottom: 0;
      right: 0;
      width: 11px;
      height: 10px;
      background-image: url("~assets/img/common/select-gou.png");
      background-repeat: no-repeat;
    }
  }
  .pop-tip {
    height: 40px;
    line-height: 40px;
    background-color: #F8F8F8;
    font-size: 14px;
    color: #666;
    padding-left: 12px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  .pop-tip-arrow {
    top: -6px;
    border-width: 0 14px 0 14px;
    border-bottom-color: #666;
    margin-left: -5px;
    position: absolute;
    &:after {
      width: 0;
      height: 0;
      position: absolute;
      border-color: transparent;
      border-style: solid;
      content: "";
      border-width: 14px;
      top: -8px;
      margin-left: -5px;
      border-top-width: 0;
      border-bottom-color: #F8F8F8;
    }
    &.free-get {
      left: 9%;
    }
    &.pinkage-for-10 {
      left: 49%;
    }
    &.present-get {
      left: 29%;
    }
    &.price-low {
      left: 69%;
    }
    &.goods-clearance {
      left: 89%;
    }
  }

</style>
