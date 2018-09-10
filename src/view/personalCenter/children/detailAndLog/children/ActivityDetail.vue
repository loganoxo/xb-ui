
<template>
  <div class="activity-detail">
    <table class="mt-20">
      <thead>
        <tr>
          <th width="20%">活动标题</th>
          <th width="14%">活动开始 / 结束时间</th>
          <th width="10%">活动状态</th>
          <th width="12%">报名 / 已通过</th>
          <th width="8%">可审批名额</th>
          <th width="24%">所需（担保金 / 推广费 / 增值费）已存入</th>
        </tr>
        </thead>
      <tbody>
        <tr class="task-number">
          <td colspan="7">活动编号：{{task.number || '------'}}</td>
        </tr>
        <tr>
          <td>
            <img class="left ml-10" :src="task.taskMainImage | imageSrc('!thum54')" :alt="task.taskName">
            <span class="img-title left">{{task.taskName}}</span>
          </td>
          <td>
            <p>{{task.upLineTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
            <p class="mt-10">{{task.endTime | dateFormat('YYYY-MM-DD hh:mm:ss') || '----'}}</p>
          </td>
          <td v-if="task.taskStatus !== 'waiting_modify'">
            {{task.taskStatusDesc}}<br/>{{task.settlementStatusDesc}}
          </td>
          <td class="cursor-p main-color" v-else>
            <tooltip :content="task.auditLogs[task.auditLogs.length - 1].resultMsg" placement="top">
              <icon color="#f9284f" type="information-circled"/>&nbsp;待修改
            </tooltip>
          </td>
          <td class="registration">
            {{task.showkerApplyTotalCount || 0}} / {{task.showkerApplySuccessCount || 0}}（人）
          </td>
          <td>{{task.taskCount  - task.showkerApplySuccessCount}}</td>
          <td>
            （ {{(task.totalMarginNeed / 100).toFixed(2)}} / {{(task.promotionExpensesNeed / 100).toFixed(2)}} / {{((task.vasFeeNeed + task.tagVasFeeNeed) / 100).toFixed(2)}}）{{((task.marginPaid + task.promotionExpensesPaid + task.vasFeePaid + task.tagVasFeePaid) / 100).toFixed(2)}}
          </td>
        </tr>
        </tbody>
      </table>
    <div class="activity-type mt-20">
      <!--选择绑定的店铺-->
      <div class="activity-type mt-20" v-if="!fastPublish">
        <div class="activity-type-title">请选择店铺：</div>
        <div class="clear mt-10" v-if="storeBindInfoList.length > 0">
          <div :class="{isSelect: selectStoreInfo.storeName === item.storeName}" v-for="item in storeBindInfoList" class="select-store text-ct left mr-10 disabled">
            <img v-if="item.storeType === 'taobao'" src="~assets/img/common/taobao-logo.png" alt="淘宝LOGO">
            <img v-if="item.storeType === 'tmall'" src="~assets/img/common/tmall-logo.png" alt="天猫LOGO">
            <p class="fs-14 f-b">{{item.storeName}}</p>
            <p class="mt-4">
              <span>店铺旺旺：</span>
              <span class="f-b">{{item.storeAlitm}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="activity-type-title mt-20">请选择活动类型：</div>
      <div class="clear mt-10">
        <div class="left mr-10 activity-type-box disabled" :class="{isSelect:taskRelease.activityCategory === 'free_get'}">
          <p>免费领（拍A发A）</p>
          <p>拿手0元试用</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'free_get'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'present_get'}">
          <p>体验专区（拍A发B）</p>
          <p>实际发的是赠品或体验装</p>
          <p>不可跨类目，否则会影响人群标签</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'present_get'"></span>
        </div>
       <!-- <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'pinkage_for_10'}">
          <p>10元包邮</p>
          <p>拿手承担10元邮费</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'pinkage_for_10'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'price_low'}">
          <p>白菜价</p>
          <p>帮商家测款定价</p>
          <p>真实卖货</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'price_low'"></span>
        </div>
        <div class="left activity-type-box mr-10 disabled" :class="{isSelect:taskRelease.activityCategory === 'goods_clearance'}">
          <p>清仓断码</p>
          <p>帮商家解决最为头疼的</p>
          <p>库存问题</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'goods_clearance'"></span>
        </div>-->
      </div>
      <div class="pop-tip mt-15">
        <div v-show="taskRelease.activityCategory === 'free_get'">
          <div class="pop-tip-arrow free-get"></div>
          <div>该活动申请率极高，评价效果极好，商家能自主筛选拿手，迅速积攒销量。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'pinkage_for_10'">
          <div class="pop-tip-arrow pinkage-for-10"></div>
          <div>该活动申请率较高，评价效果较好，适用于中低客单的走量产品。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'present_get'">
          <div class="pop-tip-arrow present-get"></div>
          <div>拿手拍下付款的是主宝贝（高客单的商品），为主宝贝带来成交转化，但实际发货的是体验装或赠品。该活动可大幅降低活动成本，但要规避拿手在淘宝上晒图。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'price_low'">
          <div class="pop-tip-arrow price-low"></div>
          <div>拿手以9.9元、49.9元、99.9元及1折、3折、5折的价格购买宝贝，该活动也可适当降低活动成本，但更重要的是帮助商家真实成交，获得消费者的实际反馈。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'goods_clearance'">
          <div class="pop-tip-arrow goods-clearance"></div>
          <div>商家提供超乎想象的价格，目的不是为了赚取利润，而是尽快把仓库里积压的库存变成现金（比如断码，过季，尾货等），拿手也能真实选购到最最实惠的宝贝。</div>
        </div>
      </div>
    </div>
    <div class="activity-con mt-20">
      <div class="activity-info">
        <div class="activity-info-title">填写活动信息</div>
        <div class="activity-type ml-60 mt-22">
          <span class="required">下单方式：</span>
          <radio-group v-model="taskRelease.orderType">
            <radio label="normal" disabled>
              <span>普通销量单</span>
            </radio>
            <radio label="day_now" disabled>
              <span>当日单</span>
              <img src="~assets/img/common/vip.png" alt="vipLogo">
            </radio>
            <radio label="day_reserve" disabled>
              <span>预约单</span>
              <img src="~assets/img/common/svip.png" alt="svipLogo">
            </radio>
          </radio-group>
          <div class="mt-10 ml-70">
            <radio-group v-model="taskRelease.taskType">
              <radio label="pc_search" disabled>
                <span>PC搜索下单（taobao.com）</span>
              </radio>
              <radio label="app_search" disabled>
                <span>手淘搜索下单（APP）</span>
              </radio>
              <radio label="tao_code" disabled>
                <span>淘口令下单（APP）</span>
              </radio>
              <radio label="direct_access" disabled>
                <span>宝贝链接下单（taobao.com）</span>
              </radio>
            </radio-group>
          </div>
        </div>
        <div class="activity-time ml-60 mt-20">
          <span class="required">活动时长：</span>
          <i-input v-model="taskRelease.taskDaysDuration" placeholder="请输入活动时长" :disabled="true"
                  style="width: 120px"/>
          <span>天</span>
          <span class="main-color ml-10">
            <i class="ivu-icon ivu-icon-information-circled cle60012"></i>
            <span v-show="taskRelease.orderType === 'normal'">（注意：单期活动时间为3-10天，请于活动结束后48小时内审批完成所有拿手资格，逾期系统将自动为您审批）</span>
            <span v-show="taskRelease.orderType === 'day_now' || taskRelease.orderType === 'day_reserve'">（注意：请于当日22:20分前审批完成所有拿手资格，逾期系统将自动为您审批）</span>
          </span>
        </div>
        <div class="ml-15 mt-20" v-if="taskRelease.orderType === 'day_reserve'">
          <i class="ivu-icon ivu-icon-information-circled cle60012"></i>
          <span>转当日单：</span>
          <checkbox v-model="taskRelease.dayReserveToNow" disabled>需要</checkbox>
          <span class="main-color f-b">建议勾选！</span>
          <span class="sizeColor2">（若审核通过的拿手当日未加入购物车，在次日扔可继续下单购买，活动剩余名额也自动转为当日单）</span>
        </div>
        <div class="trial-condition ml-35 mt-20">
          <span class="ml-5">拿手申请条件：</span>
          <radio-group v-model="trialCondition">
            <radio label="all" disabled>不限制</radio>
            <radio label="refuseOldShowkerFor30Days" disabled>拒绝30天内参加过本店铺的拿手再次申请</radio>
            <!--<radio label="refuseOldShowker" disabled>拒绝已参加过本店活动的拿手再次申请</radio>-->
          </radio-group>
        </div>
        <div class="order-speed ml-35 mt-20">
          <span class="ml-5">拿手下单速度：</span>
          <radio-group v-model="taskRelease.showkerOrderTimeLimit">
            <radio :label="''" v-show="taskRelease.orderType === 'day_now'" disabled><span>当日24点前</span></radio>
            <radio :label="''" v-show="taskRelease.orderType === 'day_reserve'" disabled><span>当日24点前加入购物车，次日下单购买</span></radio>
            <radio :label="24" v-show="taskRelease.orderType === 'normal'" disabled><span>24小时内</span></radio>
            <radio :label="12" v-show="taskRelease.orderType === 'normal'" disabled><span>12小时内</span></radio>
            <radio :label="6" v-show="taskRelease.orderType === 'normal'" disabled><span>6小时内</span></radio>
            <radio :label="3" v-show="taskRelease.orderType === 'normal'" disabled><span>3小时内</span></radio>
          </radio-group>
          <span class="sizeColor2" v-show="taskRelease.orderType === 'normal'">（拿手通过审批后需要指定时间内完成淘宝下单并在本平台提交订单号，否则资格自动过期）</span>
          <span class="sizeColor2" v-show="taskRelease.orderType === 'day_reserve'">（拿手通过审批后需要在当日24点前加入购物车，次日在淘宝下单并在平台提交订单号，否则资格自动过期）</span>
        </div>
        <!--<div class="trial-condition ml-60 mt-20">-->
          <!--<span class="ml-4"> 收藏加购：</span>-->
          <!--<checkbox v-model="taskRelease.needBrowseCollectAddCart" disabled>需要</checkbox>-->
          <!--<span class="size-color">（系统会随机让部分拿手完成对宝贝的收藏加购，活动上线后您可以在生意参谋后台查看收藏加购有无增加）</span>-->
        <!--</div>-->
        <div class="answer ml-60 mt-20">
          <span class="ml-4"> 浏览答题：</span>
          <checkbox v-model="needBrowseAnswer" disabled>需要</checkbox>
          <span class="sizeColor">（保证拿手充分浏览详情首页，减少秒拍情况发生，最多可添加3个）</span>
          <div class="mt-20 mt-10 pl-68 clear" v-if="needBrowseAnswer" v-for="(item, index) in browseAnswer" :key="index">
            <i-input class="mr-5 left mt-12 mr-20" type="text" v-model="item.issue" :disabled="true" placeholder="请输入浏览答题文案" style="width: 124px;"/>
            <div class="demo-upload-list left">
              <img :src="item.image + '!thum54'" alt="">
            </div>
          </div>
          <p class="mt-6 pl-68 sizeColor" v-show="needBrowseAnswer">请在手机详情页面中挑选一段文案，输入文本框内的文案最长不能超过8个字（建议3-8字）拿手将提供本文案所在位置截图</p>
        </div>
        <div class="task-speed-up ml-60 mt-20">
          <span class="ml-4">一键加速：</span>
          <checkbox v-model="taskRelease.speedUp" :disabled="true">需要</checkbox>
          <span class="sizeColor2"><span v-show="taskRelease.orderType === 'day_now' || taskRelease.orderType === 'day_reserve'" class="main-color f-b">强烈建议勾选！</span>（选择后，该活动所有名额的审批由系统推荐和控制，适合需要快速消化单量的商家）</span>
        </div>
        <div v-if="getMemberVersionLevel !== 100" class="value-added-services">
          <p class="main-color">增值服务（平台已保证所有拿手安全下单，但您仍不放心，可选择以下增值服务，该服务会要求拿手上传截图留证）</p>
          <template v-for="item in vasMainItem">
            <checkbox v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp" class="mt-10 mr-15"
                      v-model="item.isSelect" disabled>
              <span>{{item.name}}</span>
              <span class="sizeColor2">({{item.price / 100 || 0}}元)</span>
              <span class="value-added-services-demo-image">图</span>
            </checkbox>
          </template>
          <checkbox class="mt-10" v-model="shopAroundStatus" disabled v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'">
            <span>货比三家</span>
            <span class="sizeColor2">(最多添加3个)</span>
          </checkbox>
          <template v-for="(keys, index) in vasSimilarItem">
            <div v-show="shopAroundStatus" class="cl999 mt-10">同类宝贝{{index + 1}}：</div>
            <div v-show="shopAroundStatus">
              <template v-for="item in keys">
                <checkbox v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp" class="mt-10 mr-15"
                          v-model="item.isSelect" disabled>
                  <span>{{item.name}}</span>
                  <span class="sizeColor2">({{item.price / 100 || 0}}元)</span>
                  <span class="value-added-services-demo-image">图</span>
                </checkbox>
              </template>
            </div>
          </template>
          <div class="value-added-charge mt-15">增值服务费合计：{{(oneValueAddedCost / 100).toFixed(2)}} 元 </div>
        </div>
        <div class="baby-info mt-22" v-if="taskRelease.activityCategory === 'free_get'">
          <div class="activity-info-title">填写活动宝贝信息</div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">宝贝标题：</span>
            <i-input v-model="taskRelease.taskName" placeholder="请输入活动标题" :disabled="true" style="width: 296px"/>
          </div>
          <div class="baby-title ml-45 mt-20">
            <span class="required">宝贝类型：</span>
            <i-select v-model="taskRelease.itemType" disabled style="width:200px">
              <option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level === 1" :label="parentItem.name" :key="parentItem.id">
                <i-option v-if="item.level === 2 && item.parentItemCatalog && item.parentItemCatalog.id === parentItem.id" v-for="item in itemCatalogList" :value="item.id" :key="item.id">{{ item.name }}
                </i-option>
              </option-group>
            </i-select>
          </div>
          <div class="baby-img ml-45 mt-20">
            <span class="required left mt-20">宝贝主图：</span>
            <div class="demo-upload-list">
              <img :src="mainDefaultList | imageSrc('!thum54')" alt="">
            </div>
          </div>
          <div class="baby-url ml-45 mt-20">
            <span class="required">宝贝地址：</span>
            <i-input v-model="taskRelease.itemUrl" placeholder="请输入宝贝地址" :disabled="true" style="width: 296px"/>
          </div>
          <div class="baby-number ml-45 mt-20">
            <span class="required">宝贝数量：</span>
            <i-input v-model="taskRelease.taskCount" placeholder="请输入宝贝数量" :disabled="true" style="width: 120px"/>
            <span>份</span>
          </div>
          <div class="baby-price ml-45 mt-20">
            <span class="required">宝贝单价：</span>
            <i-input v-model="taskRelease.itemPrice" placeholder="请输入宝贝单价" :disabled="true"
                    style="width: 120px"/>
            <span>元</span>
            <p class="size-color pl-60 mt-8">活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的拿手，商家账号按相应规则处罚</p>
          </div>
          <div class="baby-pinkage ml-45 mt-20">
            <span class="required left">是否包邮：</span>
            <radio-group v-model="taskRelease.pinkage">
              <radio label="true" disabled>
                <span>宝贝包邮，无需修改运费</span>
              </radio>
              <br/>
              <radio class="mt-20" label="false" disabled>
                <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
              </radio>
            </radio-group>
          </div>
          <div class="baby-payment ml-45 mt-20">
            <span class="required left">付款方式：</span>
            <radio-group v-model="taskRelease.paymentMethod">
              <radio label="all" class="mb-10" disabled><span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span></radio>
              <br/>
              <radio label="no_hua_and_credit_pay" class="mb-10" disabled><span>禁止使用花呗和信用卡付款</span></radio>
              <br/>
              <radio label="no_hua_pay" class="mb-10" disabled><span>禁止使用花呗</span></radio>
              <br/>
              <radio label="no_credit_pay" disabled><span>禁止使信用卡付款</span></radio>
            </radio-group>
          </div>
          <div class="task-remark ml-45 mt-20 clear">
            <span class="left ml-5">下单备注：</span>
            <div class="left">
              <i-input class="task-remark-input" type="textarea" :autosize="{minRows: 6,  maxRows: 12}" :disabled="true" placeholder="请在这里输入需要拿手注意的事项，例如：SKU信息等，这里的信息会无条件展示出来。" v-model="taskRelease.remark"/>
            </div>
          </div>
          <div class="evaluation-requirements ml-15 mt-20 clear">
            <span class="left mt-5 required">淘宝评价要求：</span>
            <div class="left">
              <radio-group v-model="taskRelease.itemReviewRequired" :vertical="true">
                <radio label="review_by_showker_self" :disabled="true">
                  <span>由拿手自主发挥（拿手自主发挥评价更客观更真实。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                </radio>
                <radio label="offer_review_summary" :disabled="true">
                  <span>有个大概要求（可以写下评价的大概要求，因每个人理解不一样，可能评价结果会与期望有偏差。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                </radio>
                <i-input :disabled="true" v-if="taskRelease.itemReviewRequired === 'offer_review_summary'" v-model="taskRelease.itemReviewSummary" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价要求，如：需晒图/勿晒图、希望出现的关键词等~"/>
                <radio label="assign_review_detail" :disabled="true">
                  <span>我来提供评价内容（拿手将直接拷贝亲提供的评价内容在淘宝上进行评价，每个名额需要提供一份评价内容。）</span>
                </radio>
              </radio-group>
              <p v-show="taskRelease.itemReviewRequired === 'assign_review_detail'" class="main-color ml-20">可自定义的评价数跟您发布宝贝数量相同，系统会随机分配给申请通过的拿手每人一条评论，以保证评价内容的唯一性。</p>
              <div class="afford-evaluation-list mt-10" v-if="taskRelease.itemReviewRequired === 'assign_review_detail' && taskRelease.taskCount > 0">
                <p v-for="item in itemReviewList">
                  <span class="vtc-sup">{{'评价' + item.index}}：</span>
                  <i-input v-model="item.value" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" :disabled="true" placeholder="请输入你的评价内容" style="width: 620px;"/>
                </p>
              </div>
            </div>
          </div>
          <div class="product-introduction ml-45 mt-20 clear">
            <span class="left ml-5">商品简介：</span>
            <div class="quill left" v-html="taskRelease.itemDescription"></div>
          </div>
        </div>
        <div class="baby-info mt-22" v-if="taskRelease.activityCategory === 'present_get'">
          <div class="activity-info-title">填写活动宝贝信息</div>
          <div class="complimentary-tip mt-20 pl-15">
            <p class="sizeColor3">赠品活动发布说明：</p>
            <p class="sizeColor3 mt-6">1、宝贝标题、宝贝类型、宝贝主图、商品简介填写赠品相关信息；宝贝地址、掌柜旺旺、宝贝单价填写淘宝正品（即希望拿手拍下的SKU）相关信息；</p>
            <p class="sizeColor3">2、在下单要求中明确说明希望拿手拍下的SKU（否则拿手可能会找不到宝贝）。</p>
            <p class="sizeColor3">3、为了不影响人群标签，赠品类型必须与正品同属一个类目，否则后台审核不给予通过。</p>
          </div>
          <div class="baby-info-present">
            <div class="baby-info-present-title">A宝贝信息（用户在淘宝拍下的宝贝）</div>
            <div class="baby-info-present-con">
              <div class="baby-url ml-10 mt-20">
                <span class="required">宝贝地址：</span>
                <i-input v-model="taskRelease.itemUrl" disabled placeholder="请输入宝贝地址" style="width: 296px"/>
              </div>
              <div class="baby-price ml-10 mt-20">
                <span class="required">宝贝单价：</span>
                <i-input v-model.number="taskRelease.itemPrice" disabled placeholder="请输入宝贝单价" style="width: 120px"/>
                <span>元</span>
                <span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 1" class="main-color ml-15"><Icon color="#f9284f" type="information-circled"></Icon>&nbsp;每份试用品的价值必须在1元以上</span>
                <span class="sizeColor2 ml-4" v-show="!taskRelease.itemPrice || taskRelease.itemPrice > 1">（活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的拿手，商家账号按相应规则处罚）</span>
              </div>
              <div class="order-quantity  ml-10 mt-20 mb-20">
                <span class="required">拍下数量：</span>
                <iInput v-model.number="taskRelease.orderQuantity" disabled placeholder="请输入拍下数量" style="width: 120px"/>
                <span>份</span>
                <span class="sizeColor2 ml-4">（每单需要拍下的件数）</span>
              </div>
              <div class="baby-pinkage ml-10 mt-20">
                <span class="required left">是否包邮：</span>
                <radio-group v-model="taskRelease.pinkage" disabled>
                  <radio label="true" disabled>
                    <span>宝贝包邮，无需修改运费</span>
                  </radio>
                  <br>
                  <radio class="mt-10" label="false" disabled>
                    <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
                  </radio>
                </radio-group>
              </div>
              <div class="baby-payment ml-10 mt-20">
                <span class="required left">付款方式：</span>
                <radio-group v-model="taskRelease.paymentMethod">
                  <radio label="all" class="mb-10" disabled><span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span></radio>
                  <br/>
                  <radio label="no_hua_and_credit_pay" class="mb-10" disabled><span>禁止使用花呗和信用卡付款</span></radio>
                  <br/>
                  <radio label="no_hua_pay" class="mb-10" disabled><span>禁止使用花呗</span></radio>
                  <br/>
                  <radio label="no_credit_pay" disabled><span>禁止使信用卡付款</span></radio>
                </radio-group>
              </div>
              <div class="task-remark ml-10 mt-20 clear">
                <span class="left ml-5">下单要求：</span>
                <div class="left">
                  <i-input class="task-remark-input" disabled type="textarea" :autosize="{minRows: 6,  maxRows: 12}" placeholder="请在这里输入需要拿手注意的事项，例如：SKU信息等，这里的信息会无条件展示出来。" v-model="taskRelease.remark"/>
                  <p class="sizeColor3 mt-10">下单要求中明确说明希望拿手拍下的SKU（否则拿手可能会找不到宝贝）</p>
                  <p class="sizeColor3 mt-6">建议商家下单要求中明确说明：“请勿在淘宝中评价及晒图！”，若未注明，拿手在淘宝中进行评价或晒图后可能会影响主宝贝的评价情况。</p>
                </div>
              </div>
              <div class="donotPostPhoto ml-15 mt-20 clear">
                <span class="left required">是否在淘宝评价中晒图：</span>
                <radio-group v-model="taskRelease.donotPostPhoto">
                  <radio label="true" disabled>
                    <span>请勿晒图</span>
                  </radio>
                  <radio label="false" disabled>
                    <span>无所谓（拿手可能晒出B宝贝图片）</span>
                  </radio>
                </radio-group>
              </div>
              <div class="evaluation-requirements ml-15 mt-10 clear">
                <span class="left mt-5 required">淘宝评价要求：</span>
                <div class="left">
                  <radio-group v-model="taskRelease.itemReviewRequired" :vertical="true">
                    <radio label="review_by_showker_self" disabled>
                      <span>由拿手自主发挥（拿手自主发挥评价更客观更真实。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                    </radio>
                    <radio label="offer_review_summary" disabled>
                      <span>有个大概要求（可以写下评价的大概要求，因每个人理解不一样，可能评价结果会与期望有偏差。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                    </radio>
                    <i-input v-if="taskRelease.itemReviewRequired === 'offer_review_summary'" v-model="taskRelease.itemReviewSummary" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价要求，如：需晒图/勿晒图、希望出现的关键词等~"/>
                    <radio label="assign_review_detail" disabled>
                      <span>我来提供评价内容（拿手将直接拷贝亲提供的评价内容在淘宝上进行评价，每个名额需要提供一份评价内容。）</span>
                    </radio>
                  </radio-group>
                  <p v-show="taskRelease.itemReviewRequired === 'assign_review_detail'" class="main-color ml-20">可自定义的评价数跟您发布宝贝数量相同，系统会随机分配给申请通过的拿手每人一条评论，以保证评价内容的唯一性。</p>
                  <div class="afford-evaluation-list mt-10" v-if="taskRelease.itemReviewRequired === 'assign_review_detail' && taskRelease.taskCount > 0">
                    <p v-for="item in itemReviewList">
                      <span class="vtc-sup">{{'评价' + item.index}}：</span>
                      <i-input v-model="item.value" disabled class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价内容" style="width: 620px;"/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="baby-info-present-title mt-20">B宝贝信息（实际发货的宝贝）</div>
            <div class="baby-info-present-con pb-20">
              <div class="baby-title ml-10 mt-20">
                <span class="required">宝贝标题：</span>
                <i-input v-model="taskRelease.taskName" disabled placeholder="请输入宝贝标题" style="width: 296px"/>
              </div>
              <div class="baby-title ml-10 mt-20">
                <span class="required">宝贝类型：</span>
                <iSelect v-model="taskRelease.itemType" disabled style="width:200px">
                  <Option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level === 1" :label="parentItem.name" :key="parentItem.id">
                    <iOption
                      v-if="item.level === 2 && item.parentItemCatalog && item.parentItemCatalog.id === parentItem.id"
                      v-for="item in itemCatalogList" :value="item.id" :key="item.name">{{ item.name }}
                    </iOption>
                  </Option-group>
                </iSelect>
                <span class="ml-20 main-color" v-if="taskRelease.itemType === 1003">旅行相关活动，仅支持飞猪的宝贝</span>
              </div>
              <div class="baby-img ml-10 mt-20">
                <span class="required left mt-20">活动主图：</span>
                <div class="demo-upload-list">
                  <img :src="mainDefaultList + '!thum54'" alt="">
                </div>
              </div>
              <div class="baby-price ml-10 mt-20">
                <span class="required">赠品价格：</span>
                <i-input v-model.number="taskRelease.presentPrice" disabled placeholder="请输入赠品价格" style="width: 120px"/>
                <span>元</span>
                <span class="sizeColor2 ml-10">（为保证活动质量和效果，赠品的价格需要在10元以上）</span>
              </div>
              <div class="baby-number ml-10 mt-20">
                <p>
                  <span class="required">宝贝数量：</span>
                  <i-input v-model.number="taskRelease.taskCount" disabled placeholder="请输入宝贝数量" style="width: 120px" @on-blur="addItemReviewList"/>
                  <span>份</span>
                  <span class="sizeColor3 ml-5">（平台会按照1/5的比例进行计算，部分中奖名额将会由系统进行推荐）</span>
                </p>
              </div>
              <div class="product-introduction ml-10 mt-20 clear">
                <span class="left ml-5">商品简介：</span>
                <div class="quill left" v-html="taskRelease.itemDescription"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-set mt-22">
          <div class="activity-info-title" v-if="taskRelease.taskType !== 'direct_access'">{{getSetType}}下单条件设置 <span class="ml-15 fs-14" v-if="taskRelease.activityCategory === 'present_get'">A宝贝信息（用户在淘宝拍下的宝贝）</span></div>
          <!--PC搜索下单设置-->
          <template v-if="taskRelease.taskType === 'pc_search'">
            <div class="baby-main-img ml-40 mt-20">
              <span class="required left mr-5 mt-20">宝贝主图：</span>
              <div class="demo-upload-list">
                <img :src="pcDefaultList | imageSrc('!thum54')" alt="">
              </div>
            </div>
            <div class="more-keyword-scheme ml-40 mt-20" v-if="!fastPublish">
              <div class="inline-block tag" v-for="item in pcTaskDetail" :key="item.index" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                <span @click="selectChangeScheme(item.index)">{{ item.searchKeyword}}</span>
                <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
              </div>
            </div>
            <div class="keyword-plan" v-for="item in pcTaskDetail" v-show="item.index === selectKeywordScheme">
              <div class="keyword-plan-tip">关键词方案 {{item.index + 1}}</div>
              <div class="matching-num ml-40 mt-20">
                <span>匹配人数：</span>
                <i-input v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px" :disabled="true"/>
                <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
              </div>
              <div class="search-keyword mt-20 ml-28">
                <span class="required">搜索关键词：</span>
                <i-input v-model="item.searchKeyword" placeholder="请输入搜索关键词" :disabled="true" style="width: 260px"/>
                <span class="size-color2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
              </div>
              <div class="sort-by ml-40 mt-20">
                <span class="required">排序方式：</span>
                <radio-group v-model="item.searchSort">
                  <radio label="zong_he" disabled>
                    <span>综合排序</span>
                  </radio>
                  <radio label="xiao_liang" disabled>
                    <span>销售排序</span>
                  </radio>
                  <radio label="ren_qi" disabled>
                    <span>人气排序</span>
                  </radio>
                </radio-group>
              </div>
              <div class="search-price ml-40 mt-20">
                <span class="required">展示价格：</span>
                <i-input v-model="item.searchPagePrice" :disabled="true" placeholder="请输入搜索列表页展示价格"
                         style="width: 160px"/>
                <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
              </div>
              <div class="baby-location ml-15 mt-20">
                <span class="required">宝贝搜索位置：</span>
                <span>第</span>
                <i-input v-model="item.searchPagePositionMin" :disabled="true" style="width: 40px"/>
                <span>---</span>
                <i-input v-model="item.searchPagePositionMax" :disabled="true" style="width: 40px"/>
                <span>页</span>
                <p class="size-color2 ml-80 mt-6">宝贝参考位置页数差值最大值不大于3页（如果PC端排名在10页以后， 可使用下面的卡条件功能）</p>
              </div>
              <div class="screen-condition ml-45 mt-20 clear">
                <span class="left">刷选条件：</span>
                <div class="left ml-5">
                  <checkbox-group v-model="item.searchFilter">
                    <checkbox label="pinkage" disabled>
                      <span>包邮</span>
                    </checkbox>
                    <checkbox label="mobile_exclusive" disabled>
                      <span>手机专享</span>
                    </checkbox>
                    <checkbox label="tao_coin_deduction" disabled>
                      <span>淘金币抵扣</span>
                    </checkbox>
                    <checkbox label="sales_return_7_plus" disabled>
                      <span>7+天退货</span>
                    </checkbox>
                    <checkbox label="tmall" disabled>
                      <span>天猫</span>
                    </checkbox>
                    <p style="height: 10px;"></p>
                    <checkbox label="global_shopping" disabled>
                      <span>全球购</span>
                    </checkbox>
                    <checkbox label="overseas_goods" disabled>
                      <span>海外商品</span>
                    </checkbox>
                    <checkbox label="consumer_protect" disabled>
                      <span>消费者保障</span>
                    </checkbox>
                    <checkbox label="pay_after_receive" disabled>
                      <span>货到付款</span>
                    </checkbox>
                    <checkbox label="hua_pay_installment" disabled>
                      <span>花呗分期</span>
                    </checkbox>
                    <checkbox label="wangwang_online" disabled>
                      <span>旺旺在线</span>
                    </checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div class="price-select ml-45 mt-20">
                <span>价格区间：</span>
                <i-input v-model="item.priceRangeMin" :disabled="true" style="width: 40px"/>
                <span>---</span>
                <i-input v-model="item.priceRangeMax" :disabled="true" style="width: 40px"/>
                <span>元</span>
              </div>
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
            <div class="more-keyword-scheme ml-40 mt-20" v-if="!fastPublish">
              <div class="inline-block tag" v-for="item in appTaskDetail" :key="item.index" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                <span @click="selectChangeScheme(item.index)">{{ item.searchKeyword}}</span>
                <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
              </div>
            </div>
            <div class="keyword-plan" v-for="item in appTaskDetail" v-show="item.index === selectKeywordScheme">
              <div class="keyword-plan-tip">关键词方案 {{item.index + 1}}</div>
              <div class="matching-num ml-40 mt-20">
                <span>匹配人数：</span>
                <i-input v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px" :disabled="true"/>
                <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
              </div>
              <div class="search-keyword mt-20 ml-28">
                <span class="required">搜索关键词：</span>
                <i-input v-model="item.searchKeyword" placeholder="请输入搜索关键词" :disabled="true" style="width: 260px"/>
                <span class="size-color2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
              </div>
              <div class="sort-by ml-40 mt-20">
                <span class="required">排序方式：</span>
                <radio-group v-model="item.searchSort">
                  <radio label="zong_he" disabled>
                    <span>综合排序</span>
                  </radio>
                  <radio label="xiao_liang" disabled>
                    <span>销售排序</span>
                  </radio>
                </radio-group>
              </div>
              <div class="search-price ml-40 mt-20">
                <span class="required">展示价格：</span>
                <i-input v-model="item.searchPagePrice" placeholder="请输入搜索列表页展示价格" :disabled="true"
                         style="width: 160px"/>
                <span class="size-color2">（务必亲自搜索，确认价格准确）</span>
              </div>
              <div class="baby-location ml-15 mt-20">
                <span class="required">宝贝搜索位置：</span>
                <span>从上往下数第</span>
                <i-input v-model="item.searchRankPosition" :disabled="true" style="width: 40px"/>
                <span>个宝贝左右</span>
                <p class="size-color2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以内，可使用下面的卡条件功能）</p>
              </div>
              <div class="screen-condition ml-45 mt-20 clear">
                <span class="left">筛选条件：</span>
                <div class="left ml-5">
                  <checkbox-group v-model="item.searchFilter">
                    <checkbox label="pinkage" disabled>
                      <span>包邮</span>
                    </checkbox>
                    <checkbox label="mobile_exclusive" disabled>
                      <span>手机专享</span>
                    </checkbox>
                    <checkbox label="tao_coin_deduction" disabled>
                      <span>淘金币抵扣</span>
                    </checkbox>
                    <checkbox label="sales_return_7_plus" disabled>
                      <span>7+天退货</span>
                    </checkbox>
                    <checkbox label="tmall" disabled>
                      <span>天猫</span>
                    </checkbox>
                    <p style="height: 10px;"></p>
                    <checkbox label="global_shopping" disabled>
                      <span>全球购</span>
                    </checkbox>
                    <Checkbox label="overseas_goods" disabled>
                      <span>海外商品</span>
                    </Checkbox>
                    <checkbox label="consumer_protect" disabled>
                      <span>消费者保障</span>
                    </checkbox>
                    <checkbox label="pay_after_receive" disabled>
                      <span>货到付款</span>
                    </checkbox>
                    <checkbox label="hua_pay_installment" disabled>
                      <span>花呗分期</span>
                    </checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div class="price-select ml-45 mt-20">
                <span>价格区间：</span>
                <i-input v-model="item.priceRangeMin" :disabled="true" style="width: 40px"/>
                <span>---</span>
                <i-input v-model="item.priceRangeMax" :disabled="true" style="width: 40px"/>
                <span>元</span>
              </div>
              <div class="deliver-address ml-56 mt-20">
                <span>发货地：</span>
                <i-input v-model="item.deliverAddress" :disabled="true" style="width: 120px"/>
                <span class="size-color2">出于安全考虑，请勿大量使用</span>
              </div>
            </div>
          </template>
          <!--淘口令下单设置-->
          <template v-else-if="taskRelease.taskType === 'tao_code'">
            <div class="tao_code ml-56 mt-20">
              <span class="required">淘口令：</span>
              <i-input v-model="taoCodeTaskDetail[0].taoCode" placeholder="请输入任务宝贝的淘口令" :disabled="true" style="width: 320px"/>
            </div>
            <div class="tao-code mt-20 clear" v-if="taoCodeDefaultList">
              <span class="left ml-15 mt-20">卡首屏宝贝主图：</span>
              <div class="demo-upload-list">
                <img :src="taoCodeDefaultList + '!thum54'" alt="">
              </div>
            </div>
            <div class="tao-code ml-15 mt-20" v-if="taoCodeTaskDetail[0].homePageLockItemPrice">
              <span>卡首屏宝贝价格：</span>
              <i-input v-model.number="taoCodeTaskDetail[0].homePageLockItemPrice" placeholder="请输入卡首屏宝贝价格" style="width: 140px" :disabled="true"/>
              <span>元</span>
            </div>
          </template>
          <!--拿手审批条件设置-->
          <template>
            <div class="activity-info-title">拿手申请条件设置</div>
            <div class="sizeColor2 ml-20 mt-10">说明：该活动有名额为系统审批，此处标签设置后，系统将按此条件审批拿手。过多限制可能造成展示量/申请量下降，请综合考虑。</div>
            <div class="mt-20 ml-20 mb-20 clear">
              <span class="ml-5 left">拿手旺旺标签设置：</span>
              <div class="left">
                <checkbox v-model="showkerConditionRequireStatus.aliWwLabelSet" :disabled="true">需要</checkbox>
                <img src="~assets/img/common/vip.png" alt="vipLogo"/>
              </div>
            </div>
            <template v-if="showkerConditionRequireStatus.aliWwLabelSet">
              <div class="mt-20 ml-20 clear">
                <span class="left ml-5">平台周下单数限制：</span>
                <div class="left">
                  <checkbox v-model="showkerConditionRequireStatus.weekOrder.require" :disabled="true">需要</checkbox>
                  <span class="sizeColor2">（<span>7单以下 +0.2元/单，</span><span class="cl999 text-decoration-through">原价1元</span><span class="sizeColor2">；3单以下 +0.5元/单，</span><span class="cl999 text-decoration-through">原价2元</span>）</span>
                  <div class="mt-10" v-show="showkerConditionRequireStatus.weekOrder.require">
                    <i-select v-model="showkerCondition.weekOrderRequire" class="width-100">
                      <i-option label='7单以下' :value="7"/>
                      <i-option label='3单以下' :value="3"/>
                    </i-select>
                  </div>
                </div>
              </div>
              <div class="mt-20 ml-20 clear">
                <span class="left ml-28">旺旺等级要求：</span>
                <div class="inline-block left">
                  <checkbox v-model="showkerConditionRequireStatus.creditLevel.require" :disabled="true">需要 <span class="sizeColor2">（<span>4心起+0.2元/单，</span>
                    <span class="cl999 text-decoration-through">原价0.6元</span>；<span>5心起+0.3元/单，</span><span class="cl999 text-decoration-through">原价1.4元</span>；
                   <span> 1钻起+0.4元/单，</span><span class="cl999 text-decoration-through">原价2元</span>；
                    <span>2钻起+0.5元/单，</span><span class="cl999 text-decoration-through">原价3元</span>）</span>
                  </checkbox>
                  <div class="mt-10" v-show="showkerConditionRequireStatus.creditLevel.require">
                    <i-select v-model="showkerCondition.creditLevelRequire" :disabled="true" class="width-150" placeholder="不限">
                      <i-option v-for="(item, index) in aliLevelList" :label='item.label' :value="item.value" :key="item.value">
                        <span v-show="index === 0">{{item.text}}</span>
                        <img v-show="index !== 0" :src="item.text" alt="旺旺等级"/>
                      </i-option>
                    </i-select>
                    <span class="ml-4" v-show="showkerCondition.creditLevelRequire > 0">起</span>
                  </div>
                </div>
              </div>
              <div class="mt-20 ml-20 clear">
                <span class="left ml-40">淘气值要求：</span>
                <div class="inline-block left">
                  <checkbox v-model="showkerConditionRequireStatus.other.tqz.require" :disabled="true">需要<span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价1元</span>）</span></checkbox>
                  <checkbox-group v-model="showkerCondition.tqzRequire" v-show="showkerConditionRequireStatus.other.tqz.require" class="mt-10">
                    <template v-for="item in aliTqzList">
                      <checkbox v-if="item.value" class="mr-15" :label='item.value' :key="item.value" :disabled="true">{{item.label}}</checkbox>
                    </template>
                  </checkbox-group>
                </div>
              </div>
              <div class="mt-20 ml-20 clear">
                <span class="left ml-52">地区要求：</span>
                <div class="inline-block left width-pct-86">
                  <checkbox v-model="showkerConditionRequireStatus.other.address.require" :disabled="true">需要<span class="sizeColor2">（+0.2元/单，</span><span class="cl999 text-decoration-through">原价0.5元</span><span class="sizeColor2">，注：拿手在平台填写的收货地获取）</span></checkbox>
                  <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.address.require">勾选以下“<span class="main-color">不想要</span>”的地区，最多选5个</div>
                  <checkbox-group class="mt-10" v-model="showkerCondition.addressExclude" v-show="showkerConditionRequireStatus.other.address.require" :disabled="true">
                    <checkbox class="mr-30 mt-10" v-for="(item, index) in regionRequireList" :disabled="true" :label="item" :key="index">{{item}}</checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div class="mt-20 ml-20 clear">
                <span class="left ml-52">性别要求：</span>
                <div class="inline-block left">
                  <checkbox v-model="showkerConditionRequireStatus.other.gender.require" :disabled="true">需要 <span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价0.5元</span>）</span></checkbox>
                  <div class="mt-10" v-show="showkerConditionRequireStatus.other.gender.require">
                    <radio-group v-model="showkerCondition.genderRequire">
                      <radio :label="0" :disabled="true">男</radio>
                      <radio :label="1" :disabled="true">女</radio>
                    </radio-group>
                  </div>
                </div>
              </div>
              <div class="mt-20 ml-20 clear">
                <span class="left ml-52">年龄要求：</span>
                <div class="inline-block left">
                  <checkbox v-model="showkerConditionRequireStatus.other.age.require" :disabled="true">需要 <span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价0.5元</span>）</span></checkbox>
                  <checkbox-group class="mt-10" v-show="showkerConditionRequireStatus.other.age.require" v-model="showkerCondition.ageRequire">
                    <checkbox label="18-25" :disabled="true">18-25</checkbox>
                    <checkbox label="26-35" :disabled="true">26-35</checkbox>
                    <checkbox label="35-" :disabled="true">35及以上</checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div class="mt-20 ml-20 mb-20 clear">
                <span class="ml-28 left">是否开通花呗：</span>
                <checkbox class="left" v-model="showkerConditionRequireStatus.other.antPay.require" :disabled="true">需要<span class="sizeColor2">（+0.5元/单，<span class="cl999 text-decoration-through">原价2元，</span>注：指开通了花呗的旺旺号，开通了花呗的买号在淘宝内部被认为是优质的账号，用这些账号很安全，权重高）</span></checkbox>
              </div>
              <div class="mt-20 ml-20 mb-20 clear">
                <span class="left ml-52">类目要求：</span>
                <div class="inline-block left width-pct-86">
                  <checkbox v-model="showkerConditionRequireStatus.other.showkerTag.require" :disabled="true">需要<span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价1元</span>）</span></checkbox>
                  <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.showkerTag.require">类目最少选择4个</div>
                  <checkbox-group v-show="showkerConditionRequireStatus.other.showkerTag.require" v-model="showkerCondition.showkerTagRequire">
                    <checkbox class="mr-15 mt-10" v-for="item in interestTagList" :disabled="true" :key="item.id" :label="item.id">{{item.name}}</checkbox>
                  </checkbox-group>
                </div>
              </div>
              <div v-show="taskRelease.orderType === 'normal'" class="mt-20 ml-20 clear">
                <span class="left">审批时间/份数要求：</span>
                <div class="inline-block left">
                  <checkbox v-model="showkerConditionRequireStatus.other.auditTimeCount.require" :disabled="true">需要 <span class="sizeColor2">（+0.5元/单，<span class="cl999 text-decoration-through">原价2元</span>）</span></checkbox>
                  <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.auditTimeCount.require">（需将系统审批名额全部设置完成，若有剩余名额未设置，则由系统自由审批。系统名额剩余数：<span class="main-color">{{systemSurplusApprovalTaskNumber.count}}</span>）</div>
                  <div class="clear border-ddd border-radius-5 mt-10 min-width-750" v-show="showkerConditionRequireStatus.other.auditTimeCount.require">
                    <div class="pt-10 pb-10">
                      <div class="inline-block width-pct-20 text-ct">日期</div>
                      <div class="inline-block width-pct-39 text-ct">
                        <span>时段</span>
                      </div>
                      <div class="inline-block width-pct-39 text-ct">
                        <span>最多可审批数</span>
                      </div>
                    </div>
                    <div class="border-top pt-10 pb-10" v-for="(item, index) in showkerCondition.auditTimeCountRequire" :key="index">
                      <div class="inline-block width-pct-20 text-ct">
                        <i-input class="width-100" v-model="showkerCondition.auditTimeCountRequire[index].date" :disabled="true"/>
                      </div>
                      <div class="inline-block width-pct-39 text-ct">
                        <i-input class="width-50" v-model="item.hourStart" :disabled="true"/>
                        <span>点-</span>
                        <i-input class="width-50" v-model="item.hourEnd" :disabled="true"/>
                        <span>点</span>
                      </div>
                      <div class="inline-block width-pct-39 text-ct">
                        <i-input v-model.number="item.count" :disabled="true" placeholder="请输入审批数" class="width-100"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tag-price">单品标签增值服务费合计：{{(showkerConditionAllPrice / 100).toFixed(2)}}&nbsp;元</div>
            </template>
          </template>
          <!--收藏加购及访客流量-->
          <template v-if="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'">
            <div class="activity-info-title">收藏加购及访客流量</div>
            <div class="mt-20 ml-20">
              <span class="ml-5">收藏加购/访客：</span>
              <checkbox v-model="favoriteCartFlowInfo.favoriteCartFlowStatus" :disabled="true">需要</checkbox>
            </div>
            <template v-if="favoriteCartFlowInfo.favoriteCartFlowStatus">
              <radio-group :vertical="true" v-model="favoriteCartFlowInfo.popularFlow" class="ml-110 mt-20">
                <radio label="match_by_apply">
                  <span class="f-b">按申请数量匹配</span>
                  <span class="sizeColor2">（按拿手申请数量匹配对应的收藏加购，若设置多关键词，则关键词随机分配；适合新品推广，收藏加购流量不可控）</span>
                </radio>
                <div v-show="favoriteCartFlowInfo.popularFlow === 'match_by_apply'">
                  <template v-for="key in Object.keys(favoriteCartFlowInfo.matchByApplyInfo)">
                    <div class="mt-15">
                      <checkbox v-model="favoriteCartFlowInfo.require[key + '_require']">需要</checkbox>
                      <input-number v-model="favoriteCartFlowInfo.matchByApplyInfo[key].applyCount" :disabled="true" size="small" :min="1" :step="1" class="width-50"></input-number>
                      <span>个申请：</span>
                      <input-number v-model="favoriteCartFlowInfo.matchByApplyInfo[key].flowCount" :disabled="true" size="small" :min="1" :step="1" class="width-50"></input-number>
                      <span>个{{favoriteCartFlowInfo.map[key]}}</span>
                      <span class="sizeColor2">（<span class="main-color">{{favoriteCartFlowInfo.matchByApplyInfo[key].applyCount}}</span>个申请匹配<span class="main-color">{{favoriteCartFlowInfo.matchByApplyInfo[key].flowCount}}</span>个{{favoriteCartFlowInfo.matchByApplyInfo[key].tipText}})</span>
                    </div>
                  </template>
                </div>
                <radio label="match_diy" class="mt-20">
                  <span class="f-b">自定义匹配</span>
                  <span class="sizeColor2">（按设置匹配，自控流量，适合已成熟的宝贝）</span>
                </radio>
                <div v-show="favoriteCartFlowInfo.popularFlow === 'match_diy'">
                  <template v-if="taskRelease.taskType === 'pc_search'">
                    <span class="tag mr-10" :class="{'select-tag-bg': favoriteCartFlowInfo.keywordTagIndex === index}" v-for="(item, index) in pcTaskDetail" @click="selectKeywordTag(index)">{{item.searchKeyword ? item.searchKeyword : `关键词方案${index + 1}`}}</span>
                    <div class="mt-20">为“<span class="main-color f-b">{{pcTaskDetail[favoriteCartFlowInfo.keywordTagIndex].searchKeyword ? pcTaskDetail[favoriteCartFlowInfo.keywordTagIndex].searchKeyword : `关键词方案${favoriteCartFlowInfo.keywordTagIndex + 1}`}}</span>”设置流量：</div>
                  </template>
                  <template v-if="taskRelease.taskType === 'app_search'">
                    <span class="tag mr-10" :class="{'select-tag-bg': favoriteCartFlowInfo.keywordTagIndex === index}" v-for="(item, index) in appTaskDetail" @click="selectKeywordTag(index)">{{item.searchKeyword ? item.searchKeyword : `关键词方案${index + 1}`}}</span>
                    <div class="mt-20">为“<span class="main-color f-b">{{appTaskDetail[favoriteCartFlowInfo.keywordTagIndex].searchKeyword ? appTaskDetail[favoriteCartFlowInfo.keywordTagIndex].searchKeyword : `关键词方案${favoriteCartFlowInfo.keywordTagIndex + 1}`}}</span>”设置流量：</div>
                  </template>
                  <div class="set-flow-btn-box mt-20">
                    <span class="set-flow-btn inline-block" v-for="key in Object.keys(favoriteCartFlowInfo.map)" :key="key" :class="{'set-flow-btn-select': favoriteCartFlowInfo.flowTypeDefault === key}" @click="selectKeywordFlowType(key)">设置<span class="main-color">{{favoriteCartFlowInfo.map[key]}}数</span></span>
                  </div>
                  <div class="set-flow-task clear min-width-750">
                    <div class="pt-10 pb-10">
                      <div class="inline-block width-pct-20 text-ct">日期</div>
                      <div class="inline-block width-pct-39 text-ct">
                        <span>每天时段</span>
                        <tooltip content="请尽量扩大时间范围，提高任务成功率，时间段不可重叠" placement="top" :transfer="true"><icon size="14" class="cursor-p vtc-text-btm" type="md-help-circle"/></tooltip>
                      </div>
                      <div class="inline-block width-pct-39 text-ct">
                        <span>收藏加购数</span>
                        <tooltip content="系统审批不会超出设定份数但可能少于该份数" placement="top" :transfer="true"><icon size="14" class="cursor-p vtc-text-btm" type="md-help-circle"/></tooltip>
                      </div>
                    </div>
                    <template v-for="i in Object.keys(favoriteCartFlowInfo.matchDiyInfo).length">
                      <div v-show="favoriteCartFlowInfo.keywordTagIndex === i - 1" :key="i">
                        <template v-for="k in Object.keys(favoriteCartFlowInfo.matchDiyInfo[i-1])">
                          <div :key="k" v-show="favoriteCartFlowInfo.flowTypeDefault === k">
                            <template v-for="(item, index) in favoriteCartFlowInfo.matchDiyInfo[i-1][k]">
                              <div class="border-top pt-10 pb-10" >
                                <div class="inline-block width-pct-20 text-ct">
                                  <i-select v-model="item.dateIndex" class="width-100" @on-change="setFlowTimeCheck(i-1, k, index)">
                                    <i-option :disabled="true" v-for="t in (taskRelease.taskDaysDuration > 0 ? taskRelease.taskDaysDuration + 1 : 1)" :key="t" :value="t - 1" :label="`第${t}天`"/>
                                  </i-select>
                                </div>
                                <div class="inline-block width-pct-39 text-ct">
                                  <i-select v-model="item.hourStart" class="width-80" @on-change="setFlowTimeCheck(i-1, k, index, 'startTime')">
                                    <i-option :disabled="true" v-for="hour in favoriteCartFlowInfo.period" :key="hour" :value="hour" :label="hour"/>
                                  </i-select>
                                  <span>点-</span>
                                  <i-select v-model="item.hourEnd" class="width-80" @on-change="setFlowTimeCheck(i-1, k, index, 'endTime')">
                                    <i-option :disabled="true" v-for="hour in favoriteCartFlowInfo.period" :key="hour" :value="hour" :label="hour"/>
                                  </i-select>
                                  <span>点</span>
                                </div>
                                <div class="inline-block width-pct-39 text-ct">
                                  <i-input :disabled="true" v-model.number="item.count" placeholder="每小时最大60条" class="width-110"/>
                                </div>
                              </div>
                            </template>
                          </div>
                        </template>
                      </div>
                    </template>
                  </div>
                  <div class="mt-20">收藏加购流量：<span class="main-color">{{favoriteCartFlowCount.favoriteCartCount}}</span>&nbsp;条，访客流量：<span class="main-color">{{favoriteCartFlowCount.visitorCount}}</span>&nbsp;条。</div>
                  <div class="mt-20">
                    <p class="sizeColor2">1、根据每天时段平均分配收藏加购流量。譬如12:00至14：00需要加购流量为100条，会为12:00至13:00分配50条，13:00-14:00分配50条。</p>
                    <p class="mt-10 sizeColor2">2、最多每分钟发出一条收藏加购任务，所以每小时最大可配置60条，若由于特殊原因未完成，只收取完成部分的流量数。</p>
                    <p class="mt-10 sizeColor2">3、仅在活动上线时间内发出任务，若活动下线或者结束或未上线时段，不会发布任务。</p>
                    <p class="mt-10 sizeColor2">4、收藏 + 加购每个任务消耗2条收藏加购流量，加购、收藏分别每个任务消耗1条收藏加购流量，访客数每个任务消耗1条访客流量。</p>
                  </div>
                </div>
              </radio-group>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class="description-fees mt-40">
      <h3>费用说明：</h3>
      <div class="description-fees-con mt-10">
        <p>活动担保金 = 份数 × 单品活动担保金 = <span>{{oneBondMarginText}}</span> 元</p>
        <!--<p class="mt-6">单品推广费 = 单品试用担保金 × 费率 =<span>{{onePromotionExpensesBeforeText}}</span> 元<span>{{onePromotionExpensesTipText}}</span></p>-->
        <p class="mt-6">总推广费 = 单品推广费用 × 份数 = <span>{{(onePromotionExpensesAfter / 100).toFixed(2)}}</span> × <span>{{taskRelease.taskCount}} = <span>{{(allPromotionExpenses / 100).toFixed(2)}}</span></span> 元 <span class="main-color" v-if="fastPublish">（您是首次放单，享受首单推广减免）</span></p>
        <p v-if="!fastPublish" class="mt-6">总增值费 = 单品增值费 × 份数 =  <span>{{((oneValueAddedCost + showkerConditionAllPrice) / 100).toFixed(2)}}</span> × <span>{{taskRelease.taskCount}}</span> = {{(allValueAddedCost / 100).toFixed(2)}} 元</p>
        <p class="mt-6">总费用 = 活动担保金 + 总推广费 + 总增值费用 = <span>{{(orderMoney / 100).toFixed(2)}}</span> 元</p>
      </div>
    </div>
    <router-link class="footer-btn" tag="div" to="/user/activity-management/list">返回上一页</router-link>
  </div>
</template>

<script>
  import {Icon, Input, Checkbox, Button, Alert, Radio, Select, Option, OptionGroup, Tooltip, InputNumber} from 'iview'
  import {decode, getStorage, extendDeep, getSeverTime} from '@/config/utils'
  import commonConfig from '@/config/commonConfig'
  import api from '@/config/apiConfig'

  export default {
    name: 'activity-detail',
    components: {
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
      Tooltip: Tooltip,
      Alert: Alert,
      InputNumber: InputNumber,
    },
    data() {
      return {
        itemCatalogList: [],
        task: {},
        mainDefaultList: null,
        appDefaultList: null,
        pcDefaultList: null,
        taoCodeDefaultList: null,
        pcTaskDetail: [
          {
            index:0,
            itemMainImage: null,
            countAssigned: null,
            searchKeyword: null,
            searchSort: 'zong_he',
            searchPagePrice: null,
            searchPagePositionMin: null,
            searchPagePositionMax: null,
            searchFilter: [],
            priceRangeMin: null,
            priceRangeMax: null,
            deliverAddress: null,
          }
        ],
        appTaskDetail: [
          {
            index:0,
            itemMainImage: null,
            countAssigned: null,
            searchKeyword: null,
            searchSort: 'zong_he',
            searchPagePrice: null,
            searchRankPosition: null,
            searchFilter: [],
            priceRangeMin: null,
            priceRangeMax: null,
            deliverAddress: null,
          }
        ],
        taoCodeTaskDetail: [
          {
            taoCode: null,
            accessDescription: null,
            homePageLockItemImage: null,
            homePageLockItemPrice: null,
          }
        ],
        taskRelease: {
          taskType: 'pc_search',
          orderType: 'normal',
          taskDaysDuration: null,
          onlyShowForQualification: false,
          refuseOldShowker: false,
          showkerOrderTimeLimit: 24,
          needBrowseCollectAddCart: false,
          dayReserveToNow: false,
          taskName: null,
          remark: null,
          speedUp: false,
          itemType: null,
          taskMainImage: null,
          itemUrl: null,
          storeName: null,
          realStoreName: null,
          taskCount: null,
          itemPrice: null,
          orderQuantity: null,
          presentPrice: null,
          discountType: 'discount_0',
          activityCategory: 'free_get',
          pinkage: "true",
          donotPostPhoto: "true",
          paymentMethod: "all",
          itemDescription: '',
          taskId: null,
          taskDetail: {},
          itemReviewRequired: 'review_by_showker_self',
          itemReviewSummary: null,
          itemReviewAssignString: [],
        },
        trialCondition: 'all',
        taskCountInputPlaceholder: '请输入活动时长',
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
        itemReviewList: [],
        itemReviewPushList: [],
        selectKeywordScheme: 0,
        addKeywordScheme: 0,
        browseAnswer: [{answerContent: null}],
        needBrowseAnswer: false,
        storeBindInfoList: [],
        selectStoreInfo: {},
        shopAroundStatus: false,
        vasMainItem: [],
        vasSimilarItem: [],
        fastPublish: false,
        redEnvelopeDeductionPaid: 0,
        aliLevelList: commonConfig.aliLevelList,
        aliTqzList: commonConfig.aliTqzList,
        regionRequireList: [
          '新疆','西藏','甘肃','宁夏','青海','内蒙古','上海','江苏'
          ,'浙江','安徽','江西','北京','天津','山西','山东','河北'
          ,'四川','湖南','湖北','河南','广东','广西','福建','海南','辽宁'
          ,'吉林','黑龙江','陕西','重庆','云南','贵州','台湾','香港','澳门',
        ],
        interestTagList: [],
        showkerConditionRequireStatus: {
          aliWwLabelSet: false,
          creditLevel: {
            require: false,
            price: {
              2: 0,
              4: 20,
              5: 30,
              6: 40,
              7: 50
            },
          },
          weekOrder: {
            require: false,
            price: {
              7: 20,
              3: 50
            }
          },
          other: {
            tqz: {
              require: false,
              price: 20,
            },
            address: {
              require: false,
              price: 20,
            },
            gender: {
              require: false,
              price: 20,
            },
            age: {
              require: false,
              price: 20,
            },
            antPay: {
              require: false,
              price: 50,
            },
            showkerTag: {
              require: false,
              price: 20,
            },
            auditTimeCount: {
              require: false,
              price: 50,
            }
          }
        },
        showkerCondition: {
          weekOrderRequire: 7,
          creditLevelRequire: 2,
          tqzRequire: [3,4,5,6,7,8],
          addressExclude: ['新疆','西藏'],
          genderRequire: 0,
          antPayRequire: false,
          ageRequire: ['18-25'],
          showkerTagRequire: [],
          auditTimeCountRequire: [
            {
              date: `${new Date(getSeverTime()).getFullYear()}-${new Date(getSeverTime()).getMonth() + 1}-${new Date(getSeverTime()).getDate() + 1}`,
              hourStart: '0',
              hourEnd: '23',
              count: null
            }
          ]
        },
        favoriteCartFlowInfo: {
          error: {
            status: false,
            msg: ''
          },
          favoriteCartFlowStatus: false,
          popularFlow: '',
          period: Array.from({length: 25},(v, k) => {return `${k}`}),
          require: {
            'favorite_cart_flow_require': true,
            'favorite_flow_require': false,
            'cart_flow_require': false,
            'visitor_flow_require': false,
          },
          map: {
            'favorite_cart_flow': '收藏 + 加购',
            'cart_flow': '加购',
            'favorite_flow': '收藏',
            'visitor_flow': '访客',
          },
          matchByApplyInfo: {
            'favorite_cart_flow': {
              tipText: '加入购物车+加入收藏夹流量，系统建议1:1匹配，每个任务消耗2条收藏加购流量',
              disabled: false,
              applyCount: 1,
              flowCount: 1,
            },
            'favorite_flow': {
              tipText: '加入收藏夹数，系统建议5:1匹配，每个任务消耗1条收藏加购流量',
              disabled: true,
              applyCount: 3,
              flowCount: 1,
            },
            'cart_flow': {
              tipText: '加入购物车数，系统建议3:1匹配，每个任务消耗1条收藏加购流量',
              disabled: true,
              applyCount: 5,
              flowCount: 1,
            },
            'visitor_flow': {
              tipText: '访客数，系统建议1:1匹配，每个任务消耗1条访客流量',
              disabled: true,
              applyCount: 1,
              flowCount: 1,
            }
          },
          flowTypeDefault: 'favorite_cart_flow',
          keywordTagIndex: 0,
          matchDiyInfo: {
            0: {
              'favorite_cart_flow': [
                {
                  dateIndex: 0,
                  hourStart: '0',
                  hourEnd: '24',
                  count: null
                }
              ],
              'favorite_flow': [
                {
                  dateIndex: 0,
                  hourStart: '0',
                  hourEnd: '24',
                  count: null
                }
              ],
              'cart_flow': [
                {
                  dateIndex: 0,
                  hourStart: '0',
                  hourEnd: '24',
                  count: null
                }
              ],
              'visitor_flow': [
                {
                  dateIndex: 0,
                  hourStart: '0',
                  hourEnd: '24',
                  count: null
                }
              ]
            }
          }
        },
      }
    },
    created() {
      this.getItemCatalog();
      this.getStoreBindInfoList();
      this.getMemberVersionLevel !== 100 && this.getTaskVasList();
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
      getSetType() {
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
      newItemPrice() {
        let type = this.taskRelease.discountType;
        if (!this.discountDisabled[type].isDiscount) {
          return (this.taskRelease.itemPrice - this.discountDisabled[type].returnPrice) * 100;
        } else {
          return Math.ceil(100 * this.taskRelease.itemPrice * (1 - this.discountDisabled[type].returnPrice));
        }
      },

      /**
       * 计算拍A发A最终商家发布单品活动担保金（商家需要存入的单品担保金 + 邮费）
       * @return {number}
       */
      oneBond() {
        return this.taskRelease.pinkage === 'true' ? this.newItemPrice : this.newItemPrice + 1000;
      },

      /**
       * 计算拍A发B最终商家发布单品活动担保金（A宝贝单价 * 拍下数量 + 邮费）
       * @return {number}
       */
      oneBondAToB() {
        return this.taskRelease.pinkage === 'true' ? this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 : this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 + 1000;
      },

      /**
       * 计算单品活动保证金公式文本
       * @return {String}
       */
      oneBondMarginText() {
        if (this.taskRelease.activityCategory === 'free_get') {
          return `${this.taskRelease.taskCount} × ${(this.oneBond / 100).toFixed(2)} = ${((this.taskRelease.taskCount * this.oneBond) / 100).toFixed(2)}`
        }
        if (this.taskRelease.activityCategory === 'present_get') {
          return `${this.taskRelease.taskCount} × ${(this.oneBondAToB / 100).toFixed(2)} = ${((this.taskRelease.taskCount * this.oneBondAToB) / 100).toFixed(2)}`
        }
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /**
       * 计算原始单品推广费用公式文本
       * @return {String}
       */
      onePromotionExpensesBeforeText() {
        if (this.taskRelease.activityCategory === 'free_get') {
          if (this.getMemberVersionLevel === 100) {
            return `${(this.oneBond / 100).toFixed(2)} × 4% = ${(this.oneBond * 0.04).toFixed(2)}`
          }
          if (this.getMemberVersionLevel === 200) {
            return `${(this.oneBond / 100).toFixed(2)} × 2% = ${(this.oneBond * 0.02).toFixed(2)}`
          }
          if (this.getMemberVersionLevel === 300) {
            return `${(this.oneBond / 100).toFixed(2)} × 0 = 0`
          }
        }
        if (this.taskRelease.activityCategory === 'present_get') {
          if (this.getMemberVersionLevel === 100) {
            return `${(this.oneBondAToB / 100).toFixed(2)} × 4% = ${(this.oneBondAToB * 0.04).toFixed(2)}`
          }
          if (this.getMemberVersionLevel === 200) {
            return `${(this.oneBondAToB / 100).toFixed(2)} × 4% = ${(this.oneBondAToB * 0.02).toFixed(2)}`
          }
          if (this.getMemberVersionLevel === 300) {
            return `${(this.oneBondAToB / 100).toFixed(2)} × 0 = 0`
          }
        }
      },

      /**
       * 计算最终单品推广费用（原始推广费）
       * @return {number}
       */
      onePromotionExpenses() {
        const type = this.taskRelease.activityCategory === 'free_get' ? 'AA' : 'AB';
        return this.fastPublish ? 0 : this.$store.getters.getPromotionExpenses[type].limit;
      },

      /**
       * 计算最终单品推广费用（最终推广费，扣除抵扣红包金额）
       * @return {number}
       */
      onePromotionExpensesAfter() {
        return  this.redEnvelopeDeductionPaid > 0 ? this.onePromotionExpenses - (this.redEnvelopeDeductionPaid / this.taskRelease.taskCount) : this.onePromotionExpenses
      },

      /**
       * 计算单品推广费用文本说明
       * @return {String}
       */
      onePromotionExpensesTipText() {
        if (this.getMemberVersionLevel === 100) {
          return this.onePromotionExpenses >= 500 ? `（单品推广费用超过平台设定的最高上限5.00元，本次实际收取的单品推广费用为5元）` : ''
        }
        if (this.getMemberVersionLevel === 200) {
          return this.onePromotionExpenses >= 300 ? `（单品推广费用超过平台设定的最高上限3.00元，本次实际收取的单品推广费用为3元）` : ''
        }
      },

      /**
       * 计算总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.taskRelease.taskCount - this.redEnvelopeDeductionPaid
      },

      /**
       * 计算订单总金额
       * @return {number}
       */
      orderMoney() {
        if (this.taskRelease.activityCategory === 'free_get') {
          return this.taskRelease.taskCount * this.oneBond + this.allPromotionExpenses + this.allValueAddedCost
        }
        if (this.taskRelease.activityCategory === 'present_get') {
          return this.taskRelease.taskCount * this.oneBondAToB + this.allPromotionExpenses + this.allValueAddedCost
        }
      },

      /**
       * 计算用户选择的增值服务费用（不包含‘货比三家’服务）
       * @return {number}
       */
      vasMainItemCost() {
        let cost = 0;
        this.vasMainItem.forEach(item => {
          if(item.isSelect) {
            cost += item.price
          }
        });
        return cost
      },

      /**
       * 计算用户选择的‘货比三家’增值服务费用
       * @return {number}
       */
      vasSimilarItemCost() {
        let cost = 0;
        if(this.shopAroundStatus) {
          this.vasSimilarItem.forEach(keys => {
            keys.forEach(item => {
              if(item.isSelect) {
                cost += item.price
              }
            })
          })
        }
        return cost
      },

      /**
       * 计算用户选择的单品总增值服务费用
       * @return {number}
       */
      oneValueAddedCost() {
        return this.vasMainItemCost + this.vasSimilarItemCost
      },

      /**
       * 计算用户总增值服务费用（单品增值总服务费用 * 宝贝数量）
       * 单品增值总服务费用 = 单品增值服务费 + 单品申请条件设置增值服务费
       * @return {number}
       */
      allValueAddedCost() {
        return (this.oneValueAddedCost + this.showkerConditionAllPrice) * this.taskRelease.taskCount
      },

      /**
       * 计算商家设置拿手审批名额剩余份数和名额剩余状态
       * @return {object}
       */
      systemSurplusApprovalTaskNumber() {
        const num = this.showkerCondition.auditTimeCountRequire.reduce((prev, cur) => {
          return (cur.count > 0 ? cur.count : 0) + prev
        }, 0);
        return {
          count: this.systemApprovalTaskNumber - num > 0 ? this.systemApprovalTaskNumber - num : 0,
          status: this.systemApprovalTaskNumber - num >= 0
        }
      },

      /**
       * 计算拿手申请设置平台周下单数限制价格
       * @return {number}
       */
      weekOrderRequireOncePrice() {
        if (this.showkerConditionRequireStatus.weekOrder.require) {
          if (this.showkerCondition.weekOrderRequire === 7) {
            return this.showkerConditionRequireStatus.weekOrder.price[7]
          }
          if (this.showkerCondition.weekOrderRequire === 3) {
            return this.showkerConditionRequireStatus.weekOrder.price[3]
          }
        } else {
          return 0
        }
      },


      /**
       * 计算拿手申请设置旺旺等级需求价格
       * @return {number}
       */
      creditLevelRequireOncePrice() {
        if (this.showkerConditionRequireStatus.creditLevel.require) {
          if (!this.showkerCondition.creditLevelRequire) {
            return 0
          }
          if (this.showkerCondition.creditLevelRequire >= 2 && this.showkerCondition.creditLevelRequire < 4) {
            return this.showkerConditionRequireStatus.creditLevel.price[2]
          }
          if (this.showkerCondition.creditLevelRequire === 4) {
            return this.showkerConditionRequireStatus.creditLevel.price[4]
          }
          if (this.showkerCondition.creditLevelRequire === 5) {
            return this.showkerConditionRequireStatus.creditLevel.price[5]
          }
          if (this.showkerCondition.creditLevelRequire === 6) {
            return this.showkerConditionRequireStatus.creditLevel.price[6]
          }
          if (this.showkerCondition.creditLevelRequire >= 7) {
            return this.showkerConditionRequireStatus.creditLevel.price[7]
          }
        } else {
          return 0
        }
      },

      /**
       * 计算拿手申请设置活动总共所需的增值服务费用
       * @return {number}
       */
      showkerConditionAllPrice() {
        const price = Object.keys(this.showkerConditionRequireStatus.other).reduce((prev, cur) => {
          return (this.showkerConditionRequireStatus.other[cur].require ? this.showkerConditionRequireStatus.other[cur].price : 0) + prev
        }, 0);
        return price + this.creditLevelRequireOncePrice + this.weekOrderRequireOncePrice
      },

      /**
       * 计算自定义收藏加购和访客需要数量
       * @return {number}
       */
      favoriteCartFlowCount() {
        const matchDiyInfo = this.favoriteCartFlowInfo.matchDiyInfo;
        let favoriteCartCount = 0;
        let visitorCount = 0;
        Object.keys(matchDiyInfo).forEach(i => {
          Object.keys(matchDiyInfo[i]).forEach(k => {
            if (k === 'visitor_flow') {
              matchDiyInfo[i][k].forEach(item => {
                visitorCount += item.count ? item.count : 0;
              })
            } else {
              if (k === 'favorite_cart_flow') {
                matchDiyInfo[i][k].forEach(item => {
                  favoriteCartCount += item.count ? item.count * 2 : 0;
                })
              } else {
                matchDiyInfo[i][k].forEach(item => {
                  favoriteCartCount += item.count ? item.count : 0;
                })
              }
            }
          })
        });
        return {
          favoriteCartCount: favoriteCartCount,
          visitorCount: visitorCount
        }
      },

    },
    methods: {
      getStoreBindInfoList() {
        const _this = this;
        api.getStoreBindInfo().then(res =>{
          if(res.status) {
            _this.storeBindInfoList = res.data;
            _this.isBindStore = res.data.length === 0;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      getTaskVasSelectInfo(id) {
        const _this = this;
        api.taskVasSelectInfo({
          taskId: id
        }).then(res => {
          if (res.status) {
            res.data.mainVasSettings.forEach(keys => {
              _this.vasMainItem.forEach(key => {
                if (keys.id === key.id) {
                  key.isSelect = true;
                }
              })
            });
            const similarVasSettings = res.data.similarVasSettings;
            const len = similarVasSettings ? similarVasSettings.length : 0;
            if (len > 0) {
              _this.shopAroundStatus = true;
              if (len > 1) {
                if (_this.vasSimilarItem.length > 1) {
                  _this.vasSimilarItem.splice(1, _this.vasSimilarItem.length - 1);
                }
                for (let i = 0; i < len - 1; i++) {
                  _this.addShopAroundList()
                }
              }
              _this.vasSimilarItem.forEach((keys, i) => {
                let tempArr = similarVasSettings[i];
                if (tempArr.length > 0) {
                  tempArr.forEach(items => {
                    keys.forEach(item => {
                      if (items.id === item.id) {
                        item.isSelect = true;
                      }
                    })
                  })
                }
              })
            }
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      addShopAroundList() {
        // 深度复制数组，防止每次取到的数据在内存中指向同一地址造成数据监听异常
        const copy = extendDeep(this.originalVasMainItem, []);
        this.vasSimilarItem.push(copy);
      },
      getTaskVasList() {
        const _this = this;
        api.taskVasList().then(res => {
          if (res.status) {
            _this.vasSimilarItem.push(res.data.vasSimilarItem);
            _this.originalVasMainItem = extendDeep(res.data.vasSimilarItem, []);
            _this.vasMainItem = res.data.vasMainItem;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      getTaskInfo() {
        const _this = this;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            _this.getMemberVersionLevel !== 100 && _this.getTaskVasSelectInfo(_this.editTaskId);
            _this.task = res.data;
            _this.selectStoreInfo.storeName = res.data.realStoreName;
            _this.mainDefaultList = null;
            _this.pcDefaultList = null;
            _this.appDefaultList = null;
            _this.taskStatus = res.data.taskStatus;
            _this.mainDefaultList = res.data.taskMainImage;
            _this.redEnvelopeDeductionPaid = res.data.redEnvelopeDeductionPaid;
            _this.fastPublish = res.data.fastPublish;
            Object.keys(_this.taskRelease).forEach(key => {
              if (res.data.hasOwnProperty(key)) {
                _this.taskRelease[key] = res.data[key]
              }
            });
            // _this.taskRelease.itemType = res.data.itemCatalog.id;
            _this.taskRelease.pinkage =  _this.taskRelease.pinkage.toString();
            _this.taskRelease.donotPostPhoto = _this.taskRelease.donotPostPhoto.toString();

            if (_this.taskRelease.orderType === 'day_reserve' || _this.taskRelease.orderType === 'day_now') {
              _this.taskRelease.taskDaysDuration = null;
              _this.taskCountInputDisabled = true;
            }

            if (_this.taskRelease.orderType === 'day_reserve' || _this.taskRelease.orderType === 'day_now') {
              _this.taskRelease.taskDaysDuration = null;
              _this.taskCountInputPlaceholder = '当日22点前有效';
              _this.taskCountInputDisabled = true;
            }

            // 临时处理 10元包邮，白菜价活动下线复制历史活动
            const activityCategory = res.data.activityCategory;
            if(activityCategory === 'pinkage_for_10' || activityCategory === 'price_low'){
              _this.taskRelease.discountType = 'discount_0';
              _this.taskRelease.activityCategory = 'free_get';
            }

            if (res.data.refuseOldShowker) {
              _this.trialCondition = 'refuseOldShowker'
            } else if (res.data.refuseOldShowkerFor30Days) {
              _this.trialCondition = 'refuseOldShowkerFor30Days'
            } else {
              _this.trialCondition = 'all'
            }

            let itemIssue = JSON.parse(res.data.itemIssue);
            if(itemIssue && itemIssue.length > 0) {
              _this.needBrowseAnswer = true;
              _this.browseAnswer =  itemIssue;
            }
            let itemReviewAssignsData = res.data.itemReviewAssigns;
            if(itemReviewAssignsData){
              itemReviewAssignsData.forEach((item,index) => {
                _this.itemReviewList.push({
                  index: index + 1,
                  value: item.reviewContent
                })
              })
            }
            _this.taskRelease.itemPrice = _this.taskRelease.itemPrice / 100;
            _this.taskRelease.presentPrice = _this.taskRelease.presentPrice / 100;
            // 处理拿手申请条件设置数据
            _this.showkerConditionRequireStatus.aliWwLabelSet = res.data.showkerApplyRequire;
            if (res.data.showkerApplyRequire && res.data.showkerApplyRequireData) {
              Object.keys(_this.showkerCondition).forEach(key => {
                _this.showkerCondition[key] = res.data.showkerApplyRequireData[key]
              });
              if (_this.showkerCondition.weekOrderRequire) {
                _this.showkerConditionRequireStatus.weekOrder.require = true
              } else {
                _this.showkerCondition.weekOrderRequire = 7
              }
              if (_this.showkerCondition.creditLevelRequire) {
                _this.showkerConditionRequireStatus.creditLevel.require = true
              } else {
                _this.showkerCondition.creditLevelRequire = 2
              }
              if (_this.showkerCondition.tqzRequire.length > 0) {
                _this.showkerConditionRequireStatus.other.tqz.require = true
              } else {
                _this.showkerCondition.tqzRequire = [3,4,5,6,7,8]
              }
              if (_this.showkerCondition.addressExclude.length > 0) {
                _this.showkerConditionRequireStatus.other.address.require = true
              } else {
                _this.showkerCondition.addressExclude = ['新疆','西藏']
              }
              if (_this.showkerCondition.genderRequire !== null) {
                _this.showkerConditionRequireStatus.other.gender.require = true
              } else {
                _this.showkerCondition.genderRequire = 0
              }
              _this.showkerConditionRequireStatus.other.antPay.require = _this.showkerCondition.antPayRequire;
              if (_this.showkerCondition.ageRequire.length > 0) {
                _this.showkerConditionRequireStatus.other.age.require = true
              } else {
                _this.showkerCondition.ageRequire = ['18-25']
              }
              if (_this.showkerCondition.showkerTagRequire.length > 0) {
                _this.showkerConditionRequireStatus.other.showkerTag.require = true
              }
              _this.interestTagList.length === 0 && _this.interestTag();
              if (_this.showkerCondition.auditTimeCountRequire.length > 0) {
                _this.showkerConditionRequireStatus.other.auditTimeCount.require = true;
                _this.showkerCondition.auditTimeCountRequire.forEach(item => {
                  if (Date.parse(new Date(item.date)) < getSeverTime()) {
                    item.date = `${new Date(getSeverTime()).getFullYear()}-${new Date(getSeverTime()).getMonth() + 1}-${new Date(getSeverTime()).getDate() + 1}`
                  }
                })
              } else {
                _this.showkerCondition.auditTimeCountRequire.push({
                  date: `${new Date(getSeverTime()).getFullYear()}-${new Date(getSeverTime()).getMonth() + 1}-${new Date(getSeverTime()).getDate() + 1}`,
                  hourStart: '0',
                  hourEnd: '23',
                  count: null
                })
              }
            }
            _this.favoriteCartFlowInfo.favoriteCartFlowStatus = res.data.popularFlow !== 'none';
            // 按申请数量匹配流量数（复制、编辑活动）
            if (res.data.popularFlow === 'match_by_apply') {
              _this.favoriteCartFlowInfo.popularFlow = 'match_by_apply';
              res.data.other.popularFlowConfig.forEach(item => {
                _this.favoriteCartFlowInfo.require[item.flowType + '_require'] = item.applyCount > 0;
                if (item.flowType === 'favorite_cart_flow') {
                  if (item.applyCount > 0) {
                    _this.favoriteCartFlowInfo.matchByApplyInfo['favorite_cart_flow'].applyCount = item.applyCount;
                    _this.favoriteCartFlowInfo.matchByApplyInfo['favorite_cart_flow'].flowCount = item.flowCount;
                  }
                }
              })
            }

            // 自定义匹配流量数（复制、编辑活动）
            if (res.data.popularFlow === 'match_diy') {
              _this.favoriteCartFlowInfo.popularFlow = 'match_diy';
              res.data.other.popularFlowConfig.forEach(item => {
                // 当存在多个关键词的时候动态生成对象初始化key
                if (item.schemeIndex > 0) {
                  const keys = Object.keys(_this.favoriteCartFlowInfo.matchDiyInfo);
                  if (!keys.includes(item.schemeIndex.toString())) {
                    _this.$set(_this.favoriteCartFlowInfo.matchDiyInfo, item.schemeIndex, {});
                    Object.keys(_this.favoriteCartFlowInfo.map).forEach(key => {
                      _this.$set(_this.favoriteCartFlowInfo.matchDiyInfo[item.schemeIndex], key, [
                        {
                          dateIndex: 0,
                          hourStart: `24`,
                          hourEnd: `0`,
                          count: null,
                        }
                      ]);
                    });
                  }
                  if (item.flowType) {
                    _this.favoriteCartFlowInfo.matchDiyInfo[item.schemeIndex][item.flowType] = [];
                  }
                } else {
                  // 一个关键词的时候将对应的流量类型初始化数据置空，防止合并数据的时候重复
                  _this.favoriteCartFlowInfo.matchDiyInfo[0][item.flowType] = [];
                }
                // 根据对象的对应key合并接口返回的对应数据
                _this.favoriteCartFlowInfo.matchDiyInfo[item.schemeIndex][item.flowType].push({
                  dateIndex: item.dateIndex,
                  hourStart: `${item.hourStart}`,
                  hourEnd: `${item.hourEnd}`,
                  count: item.count,
                })
              })
            }
            _this.taskRelease.taskDetail = {};
            if (res.data.taskType === 'tao_code') {
              _this.taoCodeTaskDetail = JSON.parse(res.data.taskDetail);
              const image = _this.taoCodeTaskDetail[0].homePageLockItemImage;
              if(image) {
                _this.taoCodeDefaultList = image;
              }
              _this.conversionPrice('tao_code');
            } else if (res.data.taskType === 'pc_search') {
              _this.pcTaskDetail = JSON.parse(res.data.taskDetail);
              _this.selectKeywordScheme = _this.pcTaskDetail.length - 1;
              _this.pcDefaultList = _this.pcTaskDetail[0].itemMainImage;
              _this.conversionPrice('pc_search');
            } else if (res.data.taskType === 'app_search') {
              _this.appTaskDetail = JSON.parse(res.data.taskDetail);
              _this.selectKeywordScheme = _this.appTaskDetail.length - 1;
              _this.appDefaultList = _this.appTaskDetail[0].itemMainImage;
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
            _this.pcTaskDetail.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice / 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax / 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin / 100).toFixed(2) * 1 : null;
            });
            break;
          case 'app_search' :
            _this.appTaskDetail.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice / 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax / 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin / 100).toFixed(2) * 1 : null;
            });
            break;
          case 'tao_code':
            _this.taoCodeTaskDetail.forEach(item => {
              item.homePageLockItemPrice = item.homePageLockItemPrice > 0 ? (item.homePageLockItemPrice / 100).toFixed(2) * 1 : null;
            });
            break
        }
      },
      getItemCatalog() {
        this.itemCatalogList = getStorage('itemCatalog');
      },
      addItemReviewList() {
        this.itemReviewList = [];
        for (let i =1; i <= this.taskRelease.taskCount; i++){
          this.itemReviewList.push({
            value: '',
            index: i,
          });
        }
      },
      selectChangeScheme(name) {
        this.selectKeywordScheme = name
      },
      // 拿手兴趣标签，如果以后有多个业务也需要此配置，可将抽离到Vuex action
      interestTag() {
        const _this = this;
        api.getInterestTag({
          categoryId: 50000,
          enable: true
        }).then(res => {
          if (res.status) {
            _this.interestTagList = res.data;
            if (!_this.showkerConditionRequireStatus.other.showkerTag.require) {
              _this.interestTagList.forEach(item => {
                _this.showkerCondition.showkerTagRequire.push(item.id)
              });
            }
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      selectKeywordFlowType(type) {
        this.favoriteCartFlowInfo.flowTypeDefault = type;
      },
      selectKeywordTag(index) {
        this.favoriteCartFlowInfo.keywordTagIndex = index;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

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

    table {
      width: 100%;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
    }

    table td,
    table th {
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-align: center;
    }

    table tr.task-number td {
      text-align: left;
      padding: 6px 0 6px 10px;
    }

    table th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }

    table td {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    table td img {
      width: 54px;
      height: 54px;
    }

    table td .img-title {
      display: inline-block;
      width: 132px;
      height: 54px;
      padding-left: 10px;
      text-align: left;
    }

    table td .del-edit span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }

    table td .del-edit span:last-child {
      color: #2b85e4;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
    }

    table td .bond span {
      color: $mainColor;
      border-radius: 5px;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken($mainColor, 10%);
      }
    }

    table td .copy span {
      color: #2b85e4;
      cursor: pointer;
      @include transition;
      &:hover {
        color: darken(#2b85e4, 10%);
      }
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
      border-radius: 5px;
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
      background-color: #c4c71d;
      border:2px solid #c4c71d;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-9-9{
      background-color: #c4c71d;
      border:2px solid #c4c71d;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-49-9{
      background-color: #c4c71d;
      border:2px solid #c4c71d;
      &:hover{
        border-color:#000;
      }
    }
    &.discount-999{
      background-color: #c4c71d;
      border:2px solid #c4c71d;
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
  }
  .task-remark-input {
    width: 600px;
  }
  .activity-type-title {
    font-size: 16px;
    color: #666;
  }
  .activity-type-box {
    background-color: #FFF4F1;
    color: $mainColor;
    text-align: center;
    cursor: pointer;
    position: relative;
    border-radius: 2px;
    padding: 10px;
    border: 2px solid transparent;
    @include transition;
    P:first-child {
      font-weight: bold;
      font-size: 16px;
      margin-top: 6px;
    }
    &.isSelect {
      border-color: $mainColor;
    }
    &.disabled{
      opacity: 0.5;
      cursor: not-allowed;
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
  .afford-evaluation-list{
    max-height: 250px;
    overflow-y: auto;
  }
  .tag{
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 2px 12px 2px 0;
    padding: 0 8px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    cursor: pointer;
    position: relative;
  }
  .select-tag-bg{
    background-color: $mainColor;
    color: #fff;
    border-color: $mainColor;
  }
  .tag-alert{
    width: 586px;
    margin: 20px 0 0 32px;
  }

  .badge-count{
    position: absolute;
    transform: translateX(50%);
    top: -16px;
    right: 0;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
    background: #ed3f14;
    border: 1px solid transparent;
    color: #fff;
    line-height: 18px;
    text-align: center;
    padding: 0 6px;
    font-size: 12px;
    white-space: nowrap;
    transform-origin: -10% center;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
  }

  .quill{
    width: 666px;
    height: 260px;
    overflow-y: auto;
    border: 1px solid #eee;
  }

  .baby-info-present {
    width: 97%;
    margin: 20px auto;
    .baby-info-present-title{
      height: 36px;
      line-height: 36px;
      background-color: #DDDDDD;
      padding-left: 6px;
      font-size: 14px;
      color: #000;
    }
    .baby-info-present-con{
      border: 2px solid #ddd;
    }
  }

  .select-store {
    background-color: #FFF4F1;
    color: $mainColor;
    cursor: pointer;
    padding: 10px;
    border: 2px solid transparent;
    position: relative;
    border-radius: 2px;
    @include transition;
    &.isSelect {
      border-color: $mainColor;
    }
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .value-added-services {
    width: 96%;
    background-color: #FFF5E2;
    padding: 15px;
    margin: 20px auto 20px auto;
    border-radius: 4px;
  }

  .value-added-services-demo-image {
    padding: 0 1px;
    border-radius: 2px;
    color: #fff;
    background-color: #17A1FF;
    cursor: pointer;
  }

  .value-added-charge {
    border-top: 2px solid #EFE8DB;
    padding: 10px 0 0 0;
  }


  .keyword-plan {
    margin: 20px;
    border: 2px solid #ddd;
    padding-bottom: 20px;
  }

  .keyword-plan-tip {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-weight: bold;
    background-color: #ddd;
    padding-left: 10px;
  }

  .tag-price {
    height: 40px;
    line-height: 40px;
    background-color: #FFF5E2;
    padding-left: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 40px;
    border-radius: 5px;
  }

  .collection-purchased-tip {
    height: 38px;
    line-height: 38px;
    border-radius: 5px;
    background-color: #eee;
    margin-left: 110px;
    margin-right: 26px;
    padding-left: 10px;
    font-weight: bold;
    .flow-order {
      padding: 3px 7px;
      border-radius: 5px;
      background: $mainColor;
      color: #fff;
      cursor: pointer;
    }
    .free-get-flow {
      padding: 3px 7px;
      background-color: #F0EA39;
      color: $mainColor;
      border: 1px solid $mainColor;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .set-flow-btn-box {
    border-bottom: 1px solid #ddd;
    border-radius: 0 0 5px 0;
    height: 33px;
  }

  .set-flow-btn {
    width: 152px;
    height: 32px;
    line-height: 32px;
    border-radius: 5px 5px 0 0;
    text-align: center;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    cursor: pointer;
    font-weight: bold;
    margin-right: 6px;
  }

  .set-flow-btn-select {
    background-color: #ffff;
    height: 33px;
  }

  .set-flow-task {
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-radius: 0 5px 5px 5px;
  }
</style>
