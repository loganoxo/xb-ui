<template>
  <div class="task-release">
    <div class="task-release-title">发布活动</div>
    <!--发布活动流程说明-->
    <div class="flow-title mt-10 mb-20 clear">
      <div class="inline-block flow-title-first left">平台流程</div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">1</div>
        <div class="inline-block step-text left">商家提交活动申请，预付活动担保金，等待平台审核。</div>
        <icon class="left mt-20" type="ios-arrow-forward" size="26" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">2</div>
        <div class="inline-block step-text left">活动上线后，商家可审核来申请评测的拿手旺旺号。</div>
        <icon class="left mt-20" type="ios-arrow-forward" size="26" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">3</div>
        <div class="inline-block step-text left">通过的拿手按商家指定的下单方式去淘宝下单（拿手先垫付）。</div>
        <icon class="left mt-20" type="ios-arrow-forward" size="26" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">4</div>
        <div class="inline-block step-text left">拿手收到宝贝之后，针对商品做出真实客观的评价，并在平台提交。</div>
        <icon class="left mt-20" type="ios-arrow-forward" size="26" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">5</div>
        <div class="inline-block step-text left">商家查看拿手的评价内容，向拿手返款，活动圆满结束。</div>
      </div>
    </div>
    <div class="activity-tip-new mb-20">
      <div class="text-ct fs-14 f-b main-color pb-10">本平台为商品测评平台，目的是商家在提供免费商品的前提下，获取消费者对商品真实客观的评价，严禁出现发送货品与实际拍下商品不一致的情况！</div>
      <icon type="md-alert" color="#FF0100"/>
      <span><b class="sizeColor3">注意：</b> 1、请关闭活动链接淘客计划；2、请确认关键词能够找到；3、严厉杜绝活动期间改价；</span>
    </div>
    <div class="service-statement cl666 text-ct">
      声明：为避免纠纷，发布活动前请先阅读本平台的服务条款，凡成功提交活动申请皆默认亲已仔细阅读并同意平台的<span class="blue cursor-p" @click="isShowUserClause = true">《服务条款》</span>
    </div>
  <!--  <div class="text-ct mt-20" v-if="(getTaskCreateFastStatus || isFastPublish) && stepName === 'information'">
      <i-button type="primary" @click="goTaskCreateFast">启用首单快速发布通道</i-button>
    </div>-->
    <!--选择绑定的店铺-->
    <div class="activity-type mt-20" v-show="stepName === 'information'">
      <div class="activity-type-title">请选择店铺：</div>
      <div class="clear mt-10" v-if="storeBindInfoList.length > 0">
        <div :class="{isSelect: selectStoreInfo.storeName === item.storeName}" v-for="item in storeBindInfoList"
             :key="item.id" class="select-store text-ct left mr-10"
             @click="selectStoreChange(item.storeName, item.storeAlitm, item.shopId, item.sellerId, item.weChatNum)">
          <img v-if="item.storeType === 'taobao'" src="~assets/img/common/taobao-logo.png" alt="淘宝LOGO"/>
          <img v-if="item.storeType === 'tmall'" src="~assets/img/common/tmall-logo.png" alt="天猫LOGO"/>
          <p class="fs-14 f-b">{{decodeURI(item.storeName)}}</p>
          <p class="mt-4">
            <span>店铺旺旺：</span>
            <span class="f-b">{{decodeURI(item.storeAlitm)}}</span>
          </p>
        </div>
      </div>
    </div>
    <!--选择活动类型-->
   <!-- <div class="activity-type mt-20" v-show="stepName === 'information'">
      <div class="activity-type-title">请选择活动模版：</div>
      <div class="clear mt-10">
        <div class="left mr-10 activity-type-box" :class="{isSelect:taskRelease.activityCategory === 'free_get'}" @click="changeSelectActivity('free_get')">
          <p class="mt-22">模版A</p>
        </div>
        <div class="left activity-type-box mr-10" :class="{isSelect:taskRelease.activityCategory === 'present_get'}" @click="changeSelectActivity('present_get')">
          <p class="mt-22">模版B</p>
        </div>
        &lt;!&ndash;<div class="left activity-type-box mr-10" @click="toTaskFans">&ndash;&gt;
          &lt;!&ndash;<p>微信加粉</p>&ndash;&gt;
          &lt;!&ndash;<p>尾货/评测商品/赠品</p>&ndash;&gt;
          &lt;!&ndash;<p>均可兑换高质量粉丝</p>&ndash;&gt;
        &lt;!&ndash;</div>&ndash;&gt;
      </div>
    </div>-->
    <div class="activity-con mt-20">
      <!--填写活动详情-->
      <div class="activity-info" v-show="stepName === 'information'">
        <div class="activity-info-title">填写活动信息<span class="main-color fs-18 f-b ml-10">（该模块填写信息是为了使参与测评的拿手能在规定时间内完成测评任务。）</span></div>
        <div class="activity-type ml-20 mt-22">
          <span class="required">下单方式：</span>
          <radio-group v-model="taskRelease.orderType" @on-change="taskSalesChange">
            <radio label="normal">
              <span>普通销量单</span>
            </radio>
            <radio label="day_now">
              <tooltip content="活动发布当日22点前有效，并在24点后自动取消未下单的拿手资格，仅限VIP" placement="top" :transfer="true">
                <span>当日单</span>
                <img src="~assets/img/common/vip.png" alt="vipLogo"/>
              </tooltip>
            </radio>
            <radio label="day_reserve">
              <tooltip content="活动发布当日24点前加入购物车，次日下单购买，系统会自动终止未按要求操作的拿手资格，仅限VIP" placement="top" :transfer="true">
                <span>预约单</span>
                <img src="~assets/img/common/vip.png" alt="vipLogo"/>
              </tooltip>
            </radio>
          </radio-group>
        </div>
        <div class="activity-time ml-20 mt-20">
          <span class="required">活动时长：</span>
          <i-input v-model.number="taskRelease.taskDaysDuration" :disabled="taskCountInputDisabled"
                   :placeholder="taskCountInputPlaceholder" style="width: 120px"/>
          <span>天</span>
          <span class="main-color ml-10">
            <i class="ivu-icon ivu-icon-md-alert cle60012"></i>
            <span
              v-show="taskRelease.orderType === 'normal'">（注意：单期活动时间为3-10天，请于活动结束后48小时内审批完成所有拿手资格，逾期系统将自动为您审批）</span>
            <span v-show="taskRelease.orderType === 'day_now' || taskRelease.orderType === 'day_reserve'">（注意：请于当日22:20分前审批完成所有拿手资格，逾期系统将自动为您审批）</span>
          </span>
        </div>
        <div class="ml-15 mt-20" v-if="taskRelease.orderType === 'day_reserve'">
          <i class="ivu-icon ivu-icon-md-alert cle60012"></i>
          <span>转当日单：</span>
          <checkbox v-model="taskRelease.dayReserveToNow">需要</checkbox>
          <span class="main-color f-b">建议勾选！</span>
          <span class="sizeColor2">（若审核通过的拿手当日未加入购物车，在次日仍可继续下单购买，活动剩余名额也自动转为当日单）</span>
        </div>
        <div class="trial-condition ml-20 mt-20 clear">
          <span class="ml-8 left">申请条件：</span>
          <radio-group v-model="trialCondition" class="left">
            <radio label="all" class="">不限制</radio>
            <radio label="refuseOldShowkerFor15Days" class="ml-10">拒绝15天内本店下过单的拿手再次申请</radio>
            <radio label="refuseOldShowkerFor30Days" class="ml-10">拒绝30天内本店下过单的拿手再次申请</radio><br/>
            <radio label="refuseOldShowkerForMerchant15Days" class="mt-10">拒绝15天内本账号下过单的拿手再次申请</radio>
            <radio label="refuseOldShowkerForMerchant30Days" class="ml-10 mt-10">拒绝30天内本账号下过单的拿手再次申请</radio>
            <!--<radio label="refuseOldShowker">拒绝已参加过本店活动的拿手再次申请</radio>-->
          </radio-group>
        </div>
        <div class="order-speed ml-20 mt-20">
          <span class="ml-8">下单速度：</span>
          <radio-group v-model="taskRelease.showkerOrderTimeLimit">
            <radio :label="''" v-show="taskRelease.orderType === 'day_now'"><span>2小时内下单（当日24点前有效）</span></radio>
            <radio :label="''" v-show="taskRelease.orderType === 'day_reserve'"><span>2小时内加入购物车（当日24点前有效），次日下单购买</span></radio>
            <radio :label="24" v-show="taskRelease.orderType === 'normal'"><span>24小时内</span></radio>
            <radio :label="12" v-show="taskRelease.orderType === 'normal'"><span>12小时内</span></radio>
            <radio :label="6" v-show="taskRelease.orderType === 'normal'"><span>6小时内</span></radio>
            <radio :label="3" v-show="taskRelease.orderType === 'normal'"><span>3小时内</span></radio>
          </radio-group>
          <span class="sizeColor2" v-show="taskRelease.orderType === 'normal'">（拿手通过审批后需要指定时间内完成淘宝下单并在本平台提交订单号，否则资格自动过期）</span>
          <span class="sizeColor2" v-show="taskRelease.orderType === 'day_reserve'">（拿手通过审批后需要在当日24点前加入购物车，次日在淘宝下单并在平台提交订单号，否则资格自动过期）</span>
        </div>
        <!--<div class="trial-condition ml-20 mt-20">-->
          <!--<span class="ml-8"> 收藏加购：</span>-->
          <!--<checkbox v-model="taskRelease.needBrowseCollectAddCart">需要</checkbox>-->
          <!--<span class="sizeColor2">（系统会随机让部分拿手完成对宝贝的收藏加购，活动上线后您可以在生意参谋后台查看收藏加购有无增加）</span>-->
        <!--</div>-->
        <div class="answer ml-20 mt-20">
          <span class="ml-8"> 浏览答题：</span>
          <checkbox v-model="needBrowseAnswer" @on-change="needBrowseAnswerChange">需要</checkbox>
          <span class="sizeColor2">（保证拿手充分浏览详情页，减少秒拍情况发生，最多可添加3个）</span>
          <div class="mt-10 pl-68 clear" v-if="needBrowseAnswer">
            <div class="clear mt-10" v-for="(item,index) in browseAnswer" :key="index">
              <span class="left mt-20 fs-14">{{index + 1}}.</span>
              <i-input class="mr-5 mt-12 ml-10 left" type="text" @on-change="answerInputChange(index)"
                       v-model="item.issue" placeholder="请输入浏览答题文案" style="width: 124px;"/>
              <upload class="ml-20 left"
                      :disabled="!item.issue"
                      :default-file-list="answerDefaultList[index]"
                      :on-remove="removeAnswerImage"
                      :on-success="answerImageSuccess"
                      :format="['jpg','jpeg','png','gif','bmp']"
                      :max-size="1024"
                      name="task"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      type="drag">
                <div class="camera">
                  <icon type="ios-camera" size="20" :class="{'disabled-fs-color':!item.issue}"/>
                </div>
              </upload>
              <span class="left mt-20 ml-5 sizeColor2">（请上传文案所在位置截图）</span>
              <i-button :disabled="browseAnswer.length > 2 || !allAnswerIsOk" class="ml-20 left mt-12" type="dashed" icon="plus-round" @click="addAnswer" v-show="index === 0">添加
              </i-button>
              <i-button class="ml-20 left mt-12" type="dashed" icon="minus-round" @click="deleteAnswer(index)" v-show="index > 0">删除
            </i-button>
              <span class="blue cursor-p ml-5 left mt-17" @click="changeExampleImageUrl('answer')">【查看示例图】</span>
            </div>
          </div>
          <div class="mt-12 pl-68 sizeColor2" v-show="needBrowseAnswer">请在手机详情页中挑选一段文案，建议3-8字，输入文本框内，拿手将提供本文案所在位置截图
          </div>
        </div>
        <div class="task-speed-up ml-20 mt-20">
          <span class="ml-8">审批托管：</span>
          <checkbox v-model="taskRelease.speedUp">需要</checkbox>
          <span class="sizeColor2"><span
            v-show="taskRelease.orderType === 'day_now' || taskRelease.orderType === 'day_reserve'"
            class="main-color f-b">强烈建议勾选！</span>（选择后，该活动所有名额的审批由系统推荐和控制，适合需要快速消化单量的商家）</span>
        </div>
        <div class="mt-20">
          <div class="activity-info-title">店铺宝贝信息 <span class="main-color fs-18 f-b ml-10">（该模块请正确填写用于测评的宝贝链接，以及愿意提供几份商品进行测评）</span></div>
          <div class="baby-url ml-20 mt-20">
            <span class="required">宝贝链接：</span>
            <i-input v-model="taskRelease.itemUrl" placeholder="请输入宝贝链接" class="width-300"/>
            <span class="sizeColor2" v-if="getMemberVersionLevel === 200">（根据你的会员版本，每天同一宝贝可以发布5次）</span>
            <span class="sizeColor2" v-else-if="getMemberVersionLevel === 300">（每天同一宝贝可以发布10次）</span>
            <span class="sizeColor2" v-else>（根据你的会员版本，每天同一宝贝可以发布2次）</span>
            <span v-if="getMemberVersionLevel !== 200" class="svip-upgrade ml-10 mr-5"
                  @click="upgradeSvip">不够用？+1次</span>
            <tooltip v-if="getMemberVersionLevel !== 200" content="同一宝贝每日发布活动次数：免费商家2次，VIP商家5次" placement="top" :transfer="true">
              <icon class="cursor-p" size="16" type="help-circled"/>
            </tooltip>
          </div>
          <div class="baby-price ml-20 mt-20">
            <span class="required">宝贝单价：</span>
            <i-input v-model.number="taskRelease.itemPrice" placeholder="请输入宝贝单价" style="width: 120px"/>
            <span>元</span>
            <span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 0.1" class="main-color ml-15"><icon
              color="#f9284f" type="md-alert"/>&nbsp;每份评测品的价值必须在0.1元以上</span>
            <!--<span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 10 && taskRelease.activityCategory === 'pinkage_for_10'" class="main-color ml-20"><Icon color="#f9284f" type="md-alert"></Icon>&nbsp;10元包邮活动，宝贝最低价格不能低于10元</span>-->
            <span class="sizeColor2 ml-5" v-show="!taskRelease.itemPrice || taskRelease.itemPrice > 0.1">（活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的拿手，商家账号按相应规则处罚）</span>
          </div>
          <div v-show="taskRelease.activityCategory === 'present_get'" class="order-quantity  ml-20 mt-20 mb-20">
            <span class="required">拍下数量：</span>
            <i-input v-model.number="taskRelease.orderQuantity" placeholder="请输入拍下数量"
                     style="width: 120px"/>
            <span>份</span>
            <span class="sizeColor2 ml-4">（每单需要拍下的件数）</span>
          </div>
          <div class="baby-pinkage ml-20 mt-20">
            <span class="required left">是否包邮：</span>
            <radio-group v-model="taskRelease.pinkage">
              <radio label="true">
                <span>宝贝包邮，无需修改运费</span>
              </radio>
              <br>
              <radio class="mt-10" label="false">
                <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
              </radio>
            </radio-group>
          </div>
        </div>
        <div class="activity-info-title mt-20">白拿拿活动展示信息<span class="main-color fs-18 f-b ml-10">（该模块请详细描述用于测评的宝贝情况，更具吸引力的描述将带来更多测评拿手的申请哦）</span></div>
        <div class="baby-title ml-20 mt-20">
          <span class="required">活动标题：</span>
          <i-input v-model="taskRelease.taskName" placeholder="请输入活动标题" style="width: 296px"/>
          <pop-tip trigger="hover">
            <span class="ml-10 cursor-p">名称实例<icon type="md-help-circle" size="14" class="vtc-text-btm"/></span>
            <div slot="content" class="pt-10 pb-10">
              <p class="cl666 f-b">展示名称填写规范与示例：</p>
              <p class="mt-5">1、标题<span class="cl-red f-b">不要超过60个字，不要带有“【】”</span>等标点符号；</p>
              <p class="mt-5">2、标题事发货商品的名字，可以用<span class="cl-red f-b">修饰词+商品核心词</span>来命名，如：2018新款真皮淑女,<br/>高跟鞋；不要有“只拍xxx”、“送蓝色的”、“不要晒图”等不相关词；</p>
              <p class="mt-5">3、规格是具体重量或数量的商品，需要在标题<span class="cl-red f-b">写明发货商品重量或数量</span>，如：百香果5<br/>斤，不要直接写成百香果；</p>
              <p class="mt-5">4、规格是通过尺寸大小来区分的，<span class="cl-red f-b">需写明商品尺寸大小</span>，如：纯棉床单1.8*2M；</p>
            </div>
          </pop-tip>
          <span class="sizeColor2">（<icon v-show="taskNameLength > 60" color="#f9284f" type="md-alert"/>&nbsp;突出宝贝特点，勿填无关内容，最多支持60个字符，当前已输入&nbsp;<span
            class="main-color">{{taskNameLength}}</span> / 60个字符）</span>
        </div>
        <div class="baby-title ml-20 mt-20">
          <span class="required">宝贝类型：</span>
          <i-select v-model="taskRelease.itemType" class="width-150">
            <template v-for="parentItem in itemCatalogList">
              <option-group v-if="parentItem.level === 1" :label="parentItem.name" :key="parentItem.id">
                <template v-for="item in itemCatalogList">
                  <i-option
                    v-if="item.level === 2 && item.parentItemCatalog && item.parentItemCatalog.id === parentItem.id"
                    :value="item.id">{{ item.name }}
                  </i-option>
                </template>
              </option-group>
            </template>
          </i-select>
          <span class="ml-20 main-color" v-if="taskRelease.itemType === 1003">旅行相关活动，仅支持飞猪的宝贝</span>
        </div>
        <div class="baby-img ml-20 mt-20">
          <div class="clear">
            <span class="required left mt-20 mr-5">活动主图：</span>
            <upload class="left"
                    :default-file-list="mainDefaultList"
                    :on-remove="removeMainImage"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <icon type="ios-camera" size="20"/>
              </div>
            </upload>
            <span class="blue left mt-20 ml-10 cursor-p" @click="changeExampleImageUrl('main')">【查看示例图】</span>
          </div>
          <p class="sizeColor2 ml-70 mt-10">上传的宝贝主图将在平台上展示，支持jpg \ jpeg \ png \ gif \
            bmp格式，最佳尺寸400*400（像素），不超过1M</p>
          <p class="ml-70 mt-5 sizeColor3">主图要求：白底背景，主图必须清晰，必须是所送的商品，且不能出现图片拼接、水印、logo及其它文字</p>
        </div>
        <div v-show="taskRelease.activityCategory === 'present_get'" class="baby-price ml-20 mt-20">
          <span class="required">展示价格：</span>
          <i-input v-model.number="taskRelease.presentPrice" placeholder="请输入活动展示价格" class="width-150"/>
          <span>元</span>
        </div>
        <div class="baby-number ml-20 mt-20">
          <p>
            <span class="required">活动份数：</span>
            <i-input v-model.number="taskRelease.taskCount" placeholder="请输入活动份数" class="width-120" @on-change="taskCountChange"/>
            <span>份</span>
            <span v-show="taskRelease.orderType === 'normal'" class="sizeColor3 ml-5">（平台会按照1/5的比例进行计算，部分中奖名额将会由系统进行推荐）</span>
          </p>
          <p class="mt-10 ml-70" v-show="systemApprovalTaskNumber > 0 && taskRelease.orderType === 'normal'">
            <icon color="#f9284f" type="md-alert"/>
            <span class="sizeColor3">商家审批份数：{{taskRelease.taskCount - systemApprovalTaskNumber || 0}} 份</span>
            <span class="sizeColor3 ml-10">平台审批份数：{{systemApprovalTaskNumber || 0}} 份</span>
          </p>
        </div>
        <div class="baby-payment ml-20 mt-20 clear">
          <span class="required left">付款方式：</span>
          <radio-group class="left" v-model="taskRelease.paymentMethod">
            <radio label="all" class="mb-10"><span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span></radio>
            <br/>
            <radio label="no_hua_and_credit_pay" class="mb-10"><span>禁止使用花呗和信用卡付款</span></radio>
            <br/>
            <radio label="no_hua_pay" class="mb-10"><span>禁止使用花呗</span></radio>
            <br/>
            <radio label="no_credit_pay"><span>禁止使信用卡付款</span></radio>
          </radio-group>
        </div>
        <!--<div v-show="taskRelease.activityCategory === 'present_get'" class="donotPostPhoto ml-20 mt-20 clear">-->
          <!--<span class="left required">晒图要求：</span>-->
          <!--<radio-group v-model="taskRelease.donotPostPhoto">-->
            <!--<radio label="true">-->
              <!--<span>请勿晒图</span>-->
            <!--</radio>-->
            <!--<radio label="false">-->
              <!--<span>无所谓</span>-->
            <!--</radio>-->
          <!--</radio-group>-->
        <!--</div>-->
        <div class="evaluation-requirements clear">
          <!--<span class="left ml-20 mt-5 required">评价期望：</span>-->
          <span class="ml-28">评价相关：</span>
          <!--<div class="left">-->
            <!--<radio-group v-model="taskRelease.itemReviewRequired" :vertical="true" @on-change="changeSelectEvaluation">-->
              <!--<radio label="review_by_showker_self">-->
                <!--<span>无需求（拿手自主发挥评价更客观。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>-->
              <!--</radio>-->
              <!--<radio label="offer_review_summary"><span>有个大概要求（可以写下评价的大概要求，因每个人理解不一样，可能评价结果会与期望有偏差。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>-->
              <!--</radio>-->
              <!--<i-input v-if="taskRelease.itemReviewRequired === 'offer_review_summary'" v-model="taskRelease.itemReviewSummary" class="mb-10 width-500" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价要求，如：需晒图/勿晒图、希望出现的关键词等~"/>-->
              <!--<radio label="assign_review_detail">-->
                <!--<span>参考范本（拿手有可能直接拷贝该范本，为防止评价重复，建议每个名额提供一种范本。）</span>-->
              <!--</radio>-->
            <!--</radio-group>-->
            <!--<p v-show="taskRelease.itemReviewRequired === 'assign_review_detail'" class="main-color ml-20">-->
              <!--最多为每份名额提供一份内容，可以不添加（不添加表示无要求），系统会对已添加内容进行唯一分配，保证内容不重复。</p>-->
            <!--<div class="afford-evaluation-list mt-10" v-show="taskRelease.itemReviewRequired === 'assign_review_detail'">-->
              <!--<p class="clear" v-for="(item, index) in itemReviewList" :key="item.index">-->
                <!--<span class="vtc-sup left mt-20">{{`评价${index + 1}`}}：</span>-->
                <!--<i-input v-model="item.reviewContent" class="mb-10 width-400 mt-8 left" type="textarea" :autosize="{minRows: 2,maxRows: 2}" placeholder="请输入你的评价内容"/>-->
                <!--<upload class="inline-block left ml-10"-->
                        <!--:default-file-list="defaultItemReviewImages[index]"-->
                        <!--:item-index="index"-->
                        <!--:on-remove="removeEvaluateImage"-->
                        <!--:on-success="evaluateImageSuccess"-->
                        <!--:format="['jpg','jpeg','png','gif','bmp']"-->
                        <!--:max-size="1024"-->
                        <!--:uploadLength="5"-->
                        <!--name="task"-->
                        <!--:on-format-error="handleFormatError"-->
                        <!--:on-exceeded-size="handleMaxSize"-->
                        <!--type="drag">-->
                  <!--<div class="camera">-->
                    <!--<icon type="ios-camera" size="20"/>-->
                  <!--</div>-->
                <!--</upload>-->
                <!--<i-button :disabled="itemReviewList.length === 1" class="ml-10 mt-15 left" type="dashed" icon="plus-round" @click="deleteItemReviewList(index)">删除</i-button>-->
              <!--</p>-->
              <!--<i-button :disabled="itemReviewList.length === taskRelease.taskCount || !taskRelease.taskCount" class="ml-45 mt-6 mb-5" type="dashed" icon="plus-round" @click="addItemReviewList">添加</i-button>-->
              <!--<span class="ml-10"><icon type="md-alert" color="#f9284f"/>图文评价2元/条，文字评价1元/条；近期免费，收费待定。</span>-->
            <!--</div>-->
          <!--</div>-->
          <span class="main-color">本平台要求拿手根据实际收货情况对商品做出客观真实评价，如果有疑问请联系平台客服！ <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAxOTQwNF80ODQ2MjlfODAwMDE5NDA0XzJf" target="_blank" class="common-service qq-service text-ct">点击咨询</a></span>
        </div>
        <div class="task-remark ml-52 mt-15 clear">
          <!--<span class="left">下单要求：</span>-->
          <span class="left">备注：</span>
          <div class="left">
            <!--<i-input class="task-remark-input" type="textarea" :maxlength="30" v-model="taskRelease.remark"/>-->
            <i-input class="task-remark-input" type="textarea" v-model="taskRelease.remark"/>
            <!--<p class="lht20 mt-10 cl999">1、限制（30字），如果您有指定下单规格，请在下单要求中填写。</p>-->
            <!--<p class="lht20 cl999">2、请勿在未勾选增值服务的情况要求拿手执行，若拿手未执行，不算违规。</p>-->
            <!--<p class="lht20 cl999">3、如果对拿手有特别的要求，此处填写拿手可以看到，但平台只负责传达，无法强制拿手按要求执行！</p>-->
            <p class="cl999 mt-10">如果与拿手需要沟通，此处填写拿手可以看到，但平台只负责传达，无法强制拿手按要求执行！</p>
          </div>
        </div>
        <div class="product-introduction ml-10 mt-20">
          <span class="left ml-5 required">商品简介：</span>
          <quill-editor ref="myTextEditorPresent"
                        v-model="taskRelease.itemDescription"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
          </quill-editor>
          <input v-show="false" id="presentGet" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImgPresentGet">
        </div>
        <div class="activity-info-title mt-20">进店方式设置<span class="main-color fs-18 f-b ml-10">（该模块填写内容用于指导测评拿手能正确快速的找到被测评的宝贝）</span></div>
        <div class="required mt-20 ml-40">
          <span>进店方式：</span>
          <radio-group v-model="taskRelease.taskType" @on-change="taskTypeChange">
            <radio label="pc_search">
              <span>PC搜索下单（taobao.com）</span>
            </radio>
            <radio label="app_search">
              <span>手淘搜索下单（APP）</span>
            </radio>
            <radio label="tao_code">
              <span>淘口令下单（APP）</span>
            </radio>
            <radio label="direct_access">
              <span>宝贝链接下单（taobao.com）</span>
            </radio>
          </radio-group>
        </div>
        <!--PC搜索下单设置-->
        <template v-if="taskRelease.taskType === 'pc_search'">
          <div class="baby-main-img ml-40 mt-20 clear">
            <span class="required left mr-5 mt-20">搜索页展示主图：</span>
            <upload key="pcDefaultList" class="left ml-4"
                    name="task"
                    :default-file-list="pcDefaultList"
                    :on-remove="removePcImage"
                    :on-success="pcBabyImgSuccess"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <icon type="ios-camera" size="20"/>
              </div>
            </upload>
            <p class="sizeColor2 left mt-20 ml-15">（点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \
              bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致）</p>
          </div>
          <div class="more-keyword-scheme ml-40 mr-40">
            <div>
              <div class="inline-block tag" v-for="item in pcTaskDetail" :key="item.index" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                <span @click="selectChangeScheme(item.index)">{{item.searchKeyword ? item.searchKeyword : `关键词方案${item.index + 1}`}}</span>
                <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
                <span v-if="item.index === pcTaskDetail.length - 1 && item.index !== 0" class="close-tag" @click="handleClose(item.index)"><icon type="ios-close"/></span>
              </div>
              <i-button class="ml-5 mt-15" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加关键词方案</i-button>
            </div>
            <div class="mt-10 sizeColor2">（最多可为1份宝贝匹配1个进店关键词，<span class="main-color">剩余匹配数： {{residualMatchNumber}}</span>）</div>
          </div>
          <div class="keyword-plan" v-for="item in pcTaskDetail" v-show="item.index === selectKeywordScheme">
            <div class="keyword-plan-tip">关键词方案 {{item.index + 1}}</div>
            <div class="matching-num ml-5 mt-20">
              <span class="required">关键词匹配人数：</span>
              <i-input v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px" @on-change="countAssignedChange"/>
              <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <i-input v-model="item.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"/>
              <span class="sizeColor2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
              <span class="required">排序方式：</span>
              <radio-group v-model="item.searchSort">
                <radio label="zong_he">
                  <span>综合排序</span>
                </radio>
                <radio label="xiao_liang">
                  <span>销量排序</span>
                </radio>
                <radio label="ren_qi">
                  <span>人气排序</span>
                </radio>
              </radio-group>
            </div>
            <div class="search-price ml-40 mt-20">
              <span class="required">展示价格：</span>
              <i-input v-model.number="item.searchPagePrice" placeholder="请输入搜索列表页展示价格" style="width: 160px"/>
              <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">-
              <span class="required">宝贝搜索位置：</span>
              <span>第</span>
              <i-input v-model.number="item.searchPagePositionMin" style="width: 40px"/>
              <span>---</span>
              <i-input v-model.number="item.searchPagePositionMax" style="width: 40px"/>
              <span>页</span>
              <span class="sizeColor2 ml-15">（宝贝参考位置页数差值最大值不大于3页，如果PC端排名在10页以后， 可使用下面的卡条件功能）</span>
            </div>
            <div class="screen-condition ml-45 mt-20 clear">
              <span class="left">筛选条件：</span>
              <div class="left ml-5">
                <checkbox-group v-model="item.searchFilter">
                  <checkbox label="pinkage">
                    <span>包邮</span>
                  </checkbox>
                  <checkbox label="mobile_exclusive">
                    <span>手机专享</span>
                  </checkbox>
                  <checkbox label="tao_coin_deduction">
                    <span>淘金币抵扣</span>
                  </checkbox>
                  <checkbox label="sales_return_7_plus">
                    <span>7+天退货</span>
                  </checkbox>
                  <checkbox label="tmall">
                    <span>天猫</span>
                  </checkbox>
                  <p style="height: 10px;"></p>
                  <checkbox label="global_shopping">
                    <span>全球购</span>
                  </checkbox>
                  <checkbox label="overseas_goods">
                    <span>海外商品</span>
                  </checkbox>
                  <checkbox label="consumer_protect">
                    <span>消费者保障</span>
                  </checkbox>
                  <checkbox label="pay_after_receive">
                    <span>货到付款</span>
                  </checkbox>
                  <checkbox label="hua_pay_installment">
                    <span>花呗分期</span>
                  </checkbox>
                  <checkbox label="wangwang_online">
                    <span>旺旺在线</span>
                  </checkbox>
                </checkbox-group>
              </div>
            </div>
            <div class="price-select ml-45 mt-20">
              <span>价格区间：</span>
              <i-input v-model.number="item.priceRangeMin" style="width: 40px"/>
              <span>---</span>
              <i-input v-model.number="item.priceRangeMax" style="width: 40px"/>
              <span>元</span>
            </div>
            <div class="deliver-address ml-56 mt-20">
              <span>发货地：</span>
              <i-input v-model="item.deliverAddress" style="width: 120px"/>
              <span class="sizeColor2 ml-5">（出于安全考虑，请勿大量使用）</span>
            </div>
          </div>
        </template>
        <!--APP搜索下单设置-->
        <template v-else-if="taskRelease.taskType === 'app_search'">
          <div class="baby-main-img ml-40 mt-20 clear">
            <span class="required left mr-5 mt-20">搜索页展示主图：</span>
            <upload key="appDefaultList" class="left ml-4"
                    :on-success="appBabyImgSuccess"
                    :default-file-list="appDefaultList"
                    :on-remove="removeAppImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <icon type="ios-camera" size="20"/>
              </div>
            </upload>
            <p class="sizeColor2 left ml-15 mt-20">（点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \
              bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致）</p>
          </div>
          <div class="more-keyword-scheme ml-40 mt-20">
            <div>
              <div class="inline-block tag" v-for="item in appTaskDetail" :key="item.index" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                <span @click="selectChangeScheme(item.index)">{{item.searchKeyword ? item.searchKeyword : `关键词方案${item.index + 1}`}}</span>
                <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
                <span v-if="item.index === appTaskDetail.length - 1 && item.index !== 0" class="close-tag" @click="handleClose(item.index)"><icon type="ios-close"/></span>
              </div>
              <i-button class="mt-15" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加关键词方案</i-button>
            </div>
            <div class="mt-10 sizeColor2">（最多可为1份宝贝匹配1个进店关键词，<span class="main-color">剩余匹配数： {{residualMatchNumber}}</span>）</div>
          </div>
          <div class="keyword-plan" v-for="item in appTaskDetail" v-show="item.index === selectKeywordScheme">
            <div class="keyword-plan-tip">关键词方案 {{item.index + 1}}</div>
            <div class="matching-num ml-40 mt-20">
              <span class="required">关键词匹配人数：</span>
              <i-input v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px" @on-change="countAssignedChange"/>
              <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <i-input v-model="item.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"/>
              <span class="sizeColor2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
              <span class="required">排序方式：</span>
              <radio-group v-model="item.searchSort">
                <radio label="zong_he">
                  <span>综合排序</span>
                </radio>
                <radio label="xiao_liang">
                  <span>销量排序</span>
                </radio>
              </radio-group>
            </div>
            <div class="search-price ml-40 mt-20">
              <span class="required">展示价格：</span>
              <i-input v-model="item.searchPagePrice" placeholder="请输入搜索列表页展示价格" style="width: 160px"/>
              <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>从上往下数第</span>
              <i-input v-model="item.searchRankPosition" style="width: 40px"/>
              <span>个宝贝左右</span>
              <p class="sizeColor2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以后，可使用下面的卡条件功能）</p>
            </div>
            <div class="screen-condition ml-45 mt-20 clear">
              <span class="left">筛选条件：</span>
              <div class="left ml-5">
                <checkbox-group v-model="item.searchFilter">
                  <checkbox label="pinkage">
                    <span>包邮</span>
                  </checkbox>
                  <checkbox label="mobile_exclusive">
                    <span>手机专享</span>
                  </checkbox>
                  <checkbox label="tao_coin_deduction">
                    <span>淘金币抵扣</span>
                  </checkbox>
                  <checkbox label="sales_return_7_plus">
                    <span>7+天退货</span>
                  </checkbox>
                  <checkbox label="tmall">
                    <span>天猫</span>
                  </checkbox>
                  <p style="height: 10px;"></p>
                  <checkbox label="global_shopping">
                    <span>全球购</span>
                  </checkbox>
                  <checkbox label="overseas_goods">
                    <span>海外商品</span>
                  </checkbox>
                  <checkbox label="consumer_protect">
                    <span>消费者保障</span>
                  </checkbox>
                  <checkbox label="pay_after_receive">
                    <span>货到付款</span>
                  </checkbox>
                  <checkbox label="hua_pay_installment">
                    <span>花呗分期</span>
                  </checkbox>
                </checkbox-group>
              </div>
            </div>
            <div class="price-select ml-45 mt-20">
              <span>价格区间：</span>
              <i-input v-model.number="item.priceRangeMin" style="width: 40px"/>
              <span>---</span>
              <i-input v-model.number="item.priceRangeMax" style="width: 40px"/>
              <span>元</span>
            </div>
            <div class="deliver-address ml-56 mt-20">
              <span>发货地：</span>
              <i-input v-model="item.deliverAddress" style="width: 120px"/>
              <span class="sizeColor2 ml-5">出于安全考虑，请勿大量使用</span>
            </div>
          </div>
        </template>
        <!--淘口令下单设置-->
        <template v-else-if="taskRelease.taskType === 'tao_code'">
          <div class="tao-code ml-56 mt-20">
            <span class="required">淘口令：</span>
            <i-input v-model="taoCodeTaskDetail[0].taoCode" placeholder="请输入任务宝贝的淘口令" style="width: 320px"/>
          </div>
          <div class="tao-code mt-20 clear">
            <span class="left ml-15 mt-20">卡首屏宝贝主图：</span>
            <upload class="left ml-4"
                    :on-success="taoCodeImgSuccess"
                    :default-file-list="taoCodeDefaultList"
                    :on-remove="removeTaoCodeImage"
                    :format="['jpg','jpeg','png','gif','bmp']"
                    :max-size="1024"
                    name="task"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag">
              <div class="camera">
                <icon type="ios-camera" size="20"/>
              </div>
            </upload>
            <span class="sizeColor2 left ml-15 mt-20">（点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致）</span>
          </div>
          <div class="tao-code ml-15 mt-20 mb-20">
            <span>卡首屏宝贝价格：</span>
            <i-input v-model.number="taoCodeTaskDetail[0].homePageLockItemPrice" placeholder="请输入卡首屏宝贝价格" style="width: 140px"/>
            <span>元</span>
          </div>
        </template>
        <!--增值服务设置-->
        <!--<template>
          <div class="activity-info-title mt-20">增值服务设置</div>
          <div class="value-added-services mt-20">
            <p class="main-color"><img src="~assets/img/common/vip.png" alt="vipLogo"/>&nbsp;增值服务（平台已保证所有拿手安全下单，但您仍不放心，可选择以下增值服务，该服务会要求拿手上传截图留证）</p>
            <p class="f-b cl000 pt-10 mb-10">若拿手未按要求截图，<span class="fs-14">请在<span class="main-color">通过订单号之前</span>向客服反馈</span>，平台可退还相应截图费用！</p>
            <template v-for="item in vasMainItem">
              <checkbox
                v-show="item.id !== 1 ? taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp : taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'"
                class="mt-10 mr-0" v-model="item.isSelect" :disabled="item.isDisabled">
                <span>{{item.name}}</span>
                <span class="sizeColor2">({{item.price / 100 || 0}}元)</span>
              </checkbox>
              <tooltip class="mr-15" content="查看示例图" placement="top" :transfer="true"
                       v-show="item.id !== 1 ? taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp : taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'">
              <span class="value-added-services-demo-image"
                    @click="openSampleImageModal(taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.pcTipsPicture : item.appTipsPicture)">图</span>
              </tooltip>
            </template>
            <checkbox class="mt-10" v-model="shopAroundStatus" @on-change="shopAroundStatusChange"
                      v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'">
              <span>货比三家</span>
              <span class="sizeColor2">(最多添加3个)</span>
            </checkbox>
            <template v-for="(keys, index) in vasSimilarItem">
              <div v-show="shopAroundStatus" class="cl999 mt-10">同类宝贝{{index + 1}}：</div>
              <div v-show="shopAroundStatus">
                <template v-for="item in keys">
                  <checkbox
                    v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp"
                    class="mt-10 mr-0" v-model="item.isSelect" :disabled="item.isDisabled">
                    <span>{{item.name}}</span>
                    <span class="sizeColor2">({{item.price / 100 || 0}}元)</span>
                  </checkbox>
                  <tooltip class="mr-15" content="查看示例图" placement="top" :transfer="true"
                           v-show="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.showForPc : item.showForApp">
                  <span class="value-added-services-demo-image"
                        @click="openSampleImageModal(taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'direct_access' ? item.pcTipsPicture : item.appTipsPicture)">图</span>
                  </tooltip>
                </template>
              </div>
            </template>
            <i-button v-show="shopAroundStatus" :disabled="vasSimilarItem.length > 2" class="mt-12 add-btn-bg-color"
                      type="dashed" icon="plus-round" @click="addShopAroundList">添加
            </i-button>
            <i-button v-show="shopAroundStatus" :disabled="vasSimilarItem.length === 1"
                      class="ml-20 mt-12 add-btn-bg-color" type="dashed" icon="minus-round" @click="delShopAroundList">删除
            </i-button>
            <div class="value-added-charge mt-15">单品增值服务费合计：{{(oneValueAddedCost / 100).toFixed(2)}} 元</div>
          </div>
        </template>-->
        <!--拿手审批条件设置-->
        <template>
          <div class="activity-info-title">拿手审批条件限制<span class="main-color fs-18 f-b ml-10">（您可以使用该模块，对商品测评的拿手进行提前筛选）</span></div>
          <div class="sizeColor2 ml-20 mt-20">说明：此处设置符合标签的拿手旺旺才可被系统审批通过。过多限制可能造成展示量/申请量下降，请综合考虑。</div>
          <div class="mt-20 ml-20 mb-20 clear">
            <span class="ml-5 left">拿手旺旺标签设置：</span>
            <div class="left">
              <checkbox v-model="showkerConditionRequireStatus.aliWwLabelSet" @on-change="aliWwLabelSetChange">需要</checkbox>
              <img src="~assets/img/common/vip.png" alt="vipLogo"/>
            </div>
          </div>
          <template v-if="showkerConditionRequireStatus.aliWwLabelSet">
            <div class="mt-20 ml-20 clear">
              <span class="left ml-5">平台周下单数限制：</span>
              <div class="left">
                <checkbox v-model="showkerConditionRequireStatus.weekOrder.require">需要</checkbox>
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
                <checkbox v-model="showkerConditionRequireStatus.creditLevel.require">需要 <span class="sizeColor2">（<span>4心起+0.2元/单，</span>
                    <span class="cl999 text-decoration-through">原价0.6元</span>；<span>5心起+0.3元/单，</span><span class="cl999 text-decoration-through">原价1.4元</span>；
                   <span> 1钻起+0.4元/单，</span><span class="cl999 text-decoration-through">原价2元</span>；
                    <span>2钻起+0.5元/单，</span><span class="cl999 text-decoration-through">原价3元</span>）</span>
                </checkbox>
                <div class="mt-10" v-show="showkerConditionRequireStatus.creditLevel.require">
                  <i-select v-model="showkerCondition.creditLevelRequire" class="width-150" placeholder="不限">
                    <i-option v-for="(item, index) in aliLevelList" :label='item.label' :value="item.value" :key="item.value">
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
                <checkbox v-model="showkerConditionRequireStatus.other.tqz.require">需要<span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价1元</span>）</span></checkbox>
                <checkbox-group v-model="showkerCondition.tqzRequire" v-show="showkerConditionRequireStatus.other.tqz.require" class="mt-10">
                  <template v-for="item in aliTqzList">
                    <checkbox v-if="item.value" class="mr-15" :label='item.value' :key="item.value">{{item.label}}</checkbox>
                  </template>
                </checkbox-group>
              </div>
            </div>
            <div class="mt-20 ml-20 clear">
              <span class="left ml-52">地区要求：</span>
              <div class="inline-block left width-pct-86">
                <checkbox v-model="showkerConditionRequireStatus.other.address.require">需要<span class="sizeColor2">（+0.2元/单，</span><span class="cl999 text-decoration-through">原价0.5元</span><span class="sizeColor2">，注：拿手在平台填写的收货地获取）</span></checkbox>
                <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.address.require">勾选以下“<span class="main-color">不想要</span>”的地区，最多选5个</div>
                <checkbox-group class="mt-10" v-model="showkerCondition.addressExclude" v-show="showkerConditionRequireStatus.other.address.require" @on-change="addressExcludeChange">
                  <checkbox class="mr-30 mt-10" v-for="(item, index) in regionRequireList" :label="item" :key="index">{{item}}</checkbox>
                </checkbox-group>
              </div>
            </div>
            <div class="mt-20 ml-20 clear">
              <span class="left ml-52">性别要求：</span>
              <div class="inline-block left">
                <checkbox v-model="showkerConditionRequireStatus.other.gender.require">需要 <span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价0.5元</span>）</span></checkbox>
                <div class="mt-10" v-show="showkerConditionRequireStatus.other.gender.require">
                  <radio-group v-model="showkerCondition.genderRequire">
                    <radio :label="0">男</radio>
                    <radio :label="1">女</radio>
                  </radio-group>
                </div>
              </div>
            </div>
            <div class="mt-20 ml-20 clear">
              <span class="left ml-52">年龄要求：</span>
              <div class="inline-block left">
                <checkbox v-model="showkerConditionRequireStatus.other.age.require">需要 <span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价0.5元</span>）</span></checkbox>
                <checkbox-group class="mt-10" v-show="showkerConditionRequireStatus.other.age.require" v-model="showkerCondition.ageRequire">
                  <checkbox label="18-25">18-25</checkbox>
                  <checkbox label="26-35">26-35</checkbox>
                  <checkbox label="35-">35及以上</checkbox>
                </checkbox-group>
              </div>
            </div>
            <div class="mt-20 ml-20 mb-20 clear">
              <span class="ml-28 left">是否开通花呗：</span>
              <checkbox class="left" v-model="showkerConditionRequireStatus.other.antPay.require">需要<span class="sizeColor2">（+0.5元/单，<span class="cl999 text-decoration-through">原价2元，</span>注：指开通了花呗的旺旺号，开通了花呗的买号在淘宝内部被认为是优质的账号，用这些账号很安全，权重高）</span></checkbox>
            </div>
            <div class="mt-20 ml-20 mb-20 clear">
              <span class="left ml-52">类目要求：</span>
              <div class="inline-block left width-pct-86">
                <checkbox v-model="showkerConditionRequireStatus.other.showkerTag.require">需要<span class="sizeColor2">（+0.2元/单，<span class="cl999 text-decoration-through">原价1元</span>）</span></checkbox>
                <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.showkerTag.require">类目最少选择4个</div>
                <checkbox-group v-show="showkerConditionRequireStatus.other.showkerTag.require" v-model="showkerCondition.showkerTagRequire" @on-change="showkerTagRequireChange">
                  <checkbox class="mr-15 mt-10" v-for="item in interestTagList" :key="item.id" :label="item.id">{{item.name}}</checkbox>
                </checkbox-group>
              </div>
            </div>
            <div v-show="taskRelease.orderType === 'normal'" class="mt-20 ml-20 clear">
              <span class="left">审批时间/份数要求：</span>
              <div class="inline-block left">
                <checkbox v-model="showkerConditionRequireStatus.other.auditTimeCount.require">需要 <span class="sizeColor2">（+0.5元/单，<span class="cl999 text-decoration-through">原价2元</span>）</span></checkbox>
                <div class="sizeColor2 mt-10" v-show="showkerConditionRequireStatus.other.auditTimeCount.require">（需将系统审批名额全部设置完成，若有剩余名额未设置，则由系统自由审批。系统名额剩余数：<span class="main-color">{{systemSurplusApprovalTaskNumber.count}}</span>）</div>
                <div class="clear border-ddd border-radius-5 mt-10 min-width-750" v-show="showkerConditionRequireStatus.other.auditTimeCount.require">
                  <div class="pt-10 pb-10">
                    <div class="inline-block width-pct-20 text-ct">日期</div>
                    <div class="inline-block width-pct-39 text-ct">
                      <span>时段</span>
                      <tooltip content="请尽量扩大时间范围，提高任务成功率，时间段不可重叠" placement="top" :transfer="true"><icon size="14" class="cursor-p vtc-text-btm" type="md-help-circle"/></tooltip>
                    </div>
                    <div class="inline-block width-pct-39 text-ct">
                      <span>最多可审批数</span>
                      <tooltip content="系统审批不会超出设定份数但可能少于该份数" placement="top" :transfer="true"><icon size="14" class="cursor-p vtc-text-btm" type="md-help-circle"/></tooltip>
                    </div>
                  </div>
                  <div class="border-top pt-10 pb-10" v-for="(item, index) in showkerCondition.auditTimeCountRequire" :key="index">
                    <div class="inline-block width-pct-20 text-ct">
                      <datePicker :value="showkerCondition.auditTimeCountRequire[index].date" :options="datePickerOptions" @on-change="datePickerValueChange(arguments[0],index)" type="date" placeholder="请选择日期" class="width-100"/>
                    </div>
                    <div class="inline-block width-pct-39 text-ct">
                      <i-select v-model="item.hourStart" class="width-100" @on-change="limitTimeChange('startTime',item.hourStart,index)">
                        <i-option v-for="(hour, index) in showkerConditionRequireStatus.period" :key="index" :value="hour" :label="hour"/>
                      </i-select>
                      <span>点-</span>
                      <i-select v-model="item.hourEnd" class="width-100" @on-change="limitTimeChange('endTime',item.hourEnd,index)">
                        <i-option v-for="(hour, index) in showkerConditionRequireStatus.period" :key="index" :value="hour" :label="hour"/>
                      </i-select>
                      <span>点</span>
                    </div>
                    <div class="inline-block width-pct-39 text-ct">
                      <i-input v-model.number="item.count" placeholder="请输入审批数" class="width-100"/>
                      <i-button class="ml-10" size="small" type="dashed" icon="plus-round" @click="addTimeBucket" v-show="index === 0">添加时间段</i-button>
                      <i-button class="ml-10" size="small" type="dashed" icon="minus-round" @click="deleteTimeBucket(index)" v-show="index !== 0">删除时间段</i-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tag-price mb-20">单品标签增值服务费合计：{{(showkerConditionAllPrice / 100).toFixed(2)}}&nbsp;元</div>
          </template>
        </template>
        <!--收藏加购及访客流量设置-->
        <template v-if="taskRelease.taskType === 'pc_search' || taskRelease.taskType === 'app_search'">
          <div class="activity-info-title">收藏加购及访客流量<span class="ml-10">（该模块服务为合作平台提供，请联系客服取得相关服务人员联系方式）</span></div>
          <div class="mt-20 ml-20">
            <span class="ml-5">收藏加购/访客：</span>
            <checkbox v-model="favoriteCartFlowInfo.favoriteCartFlowStatus">需要</checkbox>
          </div>
          <template v-if="favoriteCartFlowInfo.favoriteCartFlowStatus">
            <div class="collection-purchased-tip mt-20">
              <icon type="md-alert" size="14" class="vtc-text-btm"/>当前您的账户剩余收藏加购流量：<span class="main-color">{{getFlowNumInfo.favoriteCartFlowLeft}}</span>&nbsp;条，访客流量 <span class="main-color">{{getFlowNumInfo.visitorFlowLeft}}</span> 条，若数量不足，系统将立即停止发布相关任务。
              <span class="flow-order" @click="showFlowOrderModel = true">流量订购</span> <span v-if="isMember && !getFreeFlow" class="free-get-flow" @click="showGetFreeFlow = true">VIP免费领取100条流量</span>
            </div>
            <radio-group :vertical="true" v-model="favoriteCartFlowInfo.popularFlow" class="ml-110 mt-20">
              <radio label="match_by_apply">
                <span class="f-b">按申请数量匹配</span>
                <span class="sizeColor2">（按拿手申请数量匹配对应的收藏加购，若设置多关键词，则关键词随机分配；适合新品推广，收藏加购流量不可控）</span>
              </radio>
              <div v-show="favoriteCartFlowInfo.popularFlow === 'match_by_apply'">
                <template v-for="key in Object.keys(favoriteCartFlowInfo.matchByApplyInfo)">
                  <div class="mt-15">
                    <checkbox v-model="favoriteCartFlowInfo.require[key + '_require']">需要</checkbox>
                    <input-number v-model="favoriteCartFlowInfo.matchByApplyInfo[key].applyCount" :disabled="!favoriteCartFlowInfo.require[key + '_require']" size="small" :min="1" :step="1" class="width-50"></input-number>
                    <span>个申请：</span>
                    <input-number v-model="favoriteCartFlowInfo.matchByApplyInfo[key].flowCount" :disabled="!favoriteCartFlowInfo.require[key + '_require']" size="small" :min="1" :step="1" class="width-50"></input-number>
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
                      <span>共需{{favoriteCartFlowInfo.map[favoriteCartFlowInfo.flowTypeDefault]}}数</span>
                      <tooltip content="系统会根据你的时间段按分钟平均分配该流量" placement="top" :transfer="true"><icon size="14" class="cursor-p vtc-text-btm" type="md-help-circle"/></tooltip>
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
                                  <i-option v-for="t in (taskRelease.taskDaysDuration > 0 ? taskRelease.taskDaysDuration + 1 : 1)" :key="t" :value="t - 1" :label="`第${t}天`"/>
                                </i-select>
                              </div>
                              <div class="inline-block width-pct-39 text-ct">
                                <i-select v-model="item.hourStart" class="width-80" @on-change="setFlowTimeCheck(i-1, k, index, 'startTime')">
                                  <i-option v-for="hour in favoriteCartFlowInfo.period" :key="hour" :value="hour" :label="hour"/>
                                </i-select>
                                <span>点-</span>
                                <i-select v-model="item.hourEnd" class="width-80" @on-change="setFlowTimeCheck(i-1, k, index, 'endTime')">
                                  <i-option v-for="hour in favoriteCartFlowInfo.period" :key="hour" :value="hour" :label="hour"/>
                                </i-select>
                                <span>点</span>
                              </div>
                              <div class="inline-block width-pct-39 text-ct">
                                <i-input v-model.number="item.count" placeholder="每小时最大60条" class="width-110"/>
                                <i-button class="ml-10" size="small" type="dashed" icon="plus-round" :disabled="!item.count" @click="addTimeBucketForFlowType(i-1, k, index)" v-show="index === 0">添加时间段</i-button>
                                <i-button class="ml-10" size="small" type="dashed" icon="minus-round" @click="deleteTimeBucketForFlowType(i-1, k, index)" v-show="index !== 0">删除时间段</i-button>
                              </div>
                            </div>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
                <div class="mt-20">预计共需要收藏加购流量：<span class="main-color">{{favoriteCartFlowCount.favoriteCartCount}}</span>&nbsp;条，访客流量：<span class="main-color">{{favoriteCartFlowCount.visitorCount}}</span>&nbsp;条。</div>
                <div class="mt-20">
                  <p class="sizeColor2">1、根据每天时段平均分配收藏加购流量。譬如12:00至14:00需要加购流量为100条，会约1.2分钟发出一个任务。</p>
                  <p class="mt-10 sizeColor2">2、最多每分钟发出一条收藏加购任务，所以每小时最大可配置60条，超出部分不会执行，若由于特殊原因未完成，只收取完成部分的流量数。</p>
                  <p class="mt-10 sizeColor2">3、仅在活动上线时间内发出任务，若活动下线或者结束或未上线时段，不会发布任务。</p>
                  <p class="mt-10 sizeColor2">4、收藏 + 加购每个任务消耗2条收藏加购流量，加购、收藏分别每个任务消耗1条收藏加购流量，访客数每个任务消耗1条访客流量。</p>
                </div>
              </div>
            </radio-group>
          </template>
        </template>
      </div>
      <!--存入担保金详情-->
      <div class="deposits-received" v-show="stepName === 'deposit'">
        <div class="deposits-received-title mt-20 mb-20">活动信息已成功保存，请您存入本次活动的活动担保金。</div>
        <div class="deposits-received-info">您现在为 <span class="second-color">{{taskRelease.taskName}}</span> 存入活动担保金
          <span class="second-color">{{(orderMoney / 100).toFixed(2)}}</span>
          元，此笔款项将作为发布活动诚信担保的重要工具，待拿手完成活动流程后将返还给每个拿手
          <span v-if="taskRelease.activityCategory === 'free_get'"
                class="second-color">{{(oneBond / 100).toFixed(2)}}</span>
          <span v-if="taskRelease.activityCategory === 'present_get'" class="second-color">{{(oneBondAToB / 100).toFixed(2)}}</span>
          元.
        </div>
        <div class="description-fees mt-40">
          <h3>费用说明：</h3>
          <div class="description-fees-con mt-10">
            <p>活动担保金 = 份数 × 单品活动担保金 = <span>{{oneBondMarginText}}</span> 元</p>
            <p class="mt-6">总推广费 = 单品推广费 × 份数 = <span>{{(onePromotionExpenses / 100).toFixed(2)}}</span> × <span>{{taskRelease.taskCount}} = <span>{{(allPromotionExpenses / 100).toFixed(2)}}</span></span>
              元 &nbsp;&nbsp;<span v-if="getTaskCreateFastStatus || isFastPublish" class="main-color">（您是首次放单，享受首单推广费减免）</span>
            </p>
            <p class="mt-6">总增值费 = 单品增值费 × 份数 = <span>{{((oneValueAddedCost + showkerConditionAllPrice) / 100).toFixed(2)}}</span> × <span>{{taskRelease.taskCount}}</span> = {{(allValueAddedCost / 100).toFixed(2)}} 元</p>
            <p class="mt-6">总费用 = 活动担保金 + 总推广费 + 总增值费用 = <span>{{(orderMoney / 100).toFixed(2)}}</span> 元</p>
            <p class="mt-6" v-if="!isBalance">手续费说明： 使用支付宝充值支付，支付宝会收取0.6%的手续费，该笔费用需要商家承担，手续费不予退还，敬请谅解！<a
              @click="isShowAliPayTip = true">查看支付宝官方说明</a></p>
          </div>
        </div>
        <div class="pay-info mt-40" v-if="isBalance && !priceHasChange">本次总共要支付的金额为：<span class="second-color">{{(orderMoney / 100).toFixed(2)}}</span>&nbsp;元。您的账户的当前余额为：<strong>{{(getUserBalance / 100).toFixed(2)}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalance && !priceHasChange">本次总共要支付的金额为：<strong>{{(orderMoney / 100).toFixed(2)}}</strong>&nbsp;元。您账户余额为：<strong>{{(getUserBalance / 100).toFixed(2)}}</strong>&nbsp;元，还需充值：<span
          class="second-color">{{(needPayMoneyBefore / 100).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="pay-info mt-28" v-if="isBalanceReplenish && priceHasChange">
          <p>该任务已付总费用&nbsp;<strong>{{(paidDeposit / 100).toFixed(2)}}</strong>&nbsp;元（包含红包抵扣&nbsp;{{(redEnvelopeDeductionPaid / 100).toFixed(2)}}&nbsp;元）。</p>
          <p class="mt-10">本次修改需要支付超出部分的金额为：<strong class="main-color">{{((needPayMoneyAfterAsRedEnvelopes > 0 ? needPayMoneyAfterAsRedEnvelopes : 0) / 100).toFixed(2)}}</strong>
            &nbsp;元<span v-if="redEnvelopesState">（包含红包抵扣&nbsp;{{(redEnvelopeDeductionNumber / 100).toFixed(2)}}&nbsp;元）</span>。</p>
          <p class="mt-10">您账号的当前余额为：<strong>{{(getUserBalance / 100).toFixed(2)}}</strong>&nbsp;元。</p>
        </div>
        <div class="pay-info mt-28" v-if="!isBalanceReplenish && priceHasChange">
          <p>该任务已付总费用&nbsp;<strong>{{((paidDeposit / 100)).toFixed(2)}}</strong>&nbsp;元（包含红包抵扣&nbsp;{{(redEnvelopeDeductionPaid / 100).toFixed(2)}}&nbsp;元）。</p>
          <p>本次修改需要支付超出部分的金额为：<strong class="main-color">{{((needPayMoneyBeforeAsRedEnvelopes > 0 ? needPayMoneyBeforeAsRedEnvelopes : 0) / 100).toFixed(2)}}</strong>
            &nbsp;元<span v-if="redEnvelopesState">（包含红包抵扣&nbsp;{{(redEnvelopeDeductionNumber / 100).toFixed(2)}}&nbsp;元）</span></p>
          <p>您账号的当前余额为：<strong>{{(getUserBalance / 100).toFixed(2)}}</strong>&nbsp;元,还需充值：<span class="second-color">{{((needPayMoneyBeforeAsRedEnvelopes > 0 ? needPayMoneyBeforeAsRedEnvelopes : 0) / 100).toFixed(2)}}</span>&nbsp;元。</p>
        </div>
        <div class="description-fees-footer">
          <span class="pay-btn" v-if="isBalance" @click="openRecharge">{{(needPayMoneyBeforeAsRedEnvelopes <= 0 && needPayMoneyAfterAsRedEnvelopes <= 0) ? '确认提交' : '前去支付'}}</span>
          <span class="pay-btn" v-else @click="openRecharge">前去充值</span>
          <span class="return" @click="returnUpStep">返回上一步</span>
          <router-link to="/user/activity-management/list">查看活动管理</router-link>
        </div>
      </div>
      <!--活动提交成功提示-->
      <div class="audit" v-show="stepName === 'audit'">
        <div class="audit-title">
          <icon type="checkmark-circled" size=28 color="#309630"/>
          <span>活动已提交</span>
        </div>
        <div class="audit-con mt-20">亲当前的活动已提交，工作人员会在一个工作日内审核您的活动！敬请关注~</div>
        <div class="audit-footer mt-40">
          <router-link to="/user/activity-management/list">点此查看活动管理</router-link>
          <span class="ml-20">有问题？联系客服</span>
        </div>
      </div>
    </div>
    <!--填写完成活动信息下一步按钮，免审相关按钮-->
    <div v-show="stepName === 'information'">
      <div class="do-not-audit text-ct mt-20" v-if="doNotAudit.couldCheck && doNotAudit.checked">
        <checkbox v-model="doNotAudit.doNotAuditStatus"><span class="f-b fs-14">使用免审发布</span></checkbox>
        <span class="blue cursor-p text-decoration-underline" @click="stopDoNotAudit">关闭免审功能</span>
        <span class="blue cursor-p text-decoration-underline" @click="doNotAudit.doNotAuditModal = true">查看免审发布条款</span>
      </div>
      <div class="activity-tip mb-20" v-if="doNotAudit.limitCountLeft > 0">
        <icon type="md-alert" color="#FF0100"/>
        <span>由于您免审发布活动存在违规行为，<span class="main-color">当前免审资格被禁用，将在您正常审核发布 {{doNotAudit.limitCountLeft}} 次后解锁</span>，请注意遵守平台发布规则，共同维护平台环境！</span>
      </div>
      <i-button v-if="doNotAudit.couldCheck && !doNotAudit.checked && doNotAudit.limitCountLeft === 0 && !getTaskCreateFastStatus" class="fs-18 mt-20" type="info" long @click="doNotAudit.doNotAuditModal = true">开通免审发布</i-button>
      <i-button class="fs-18 mt-20" type="primary" long :loading="taskLoading" @click="stepNext">下一步</i-button>
    </div>
    <!--活动担保金支付弹框-->
    <div class="pay-model" v-if="showPayModel">
      <pay-model ref="payModelRef" :orderMoney="needPayMoneyBeforeAsRedEnvelopes" @confirmPayment="confirmPayment"
                 :isShowUpgradeVIP="true" :isBalance="isBalance" :redEnvelopesState="redEnvelopesState"
                 @change="redEnvelopesState = arguments[0]" :redEnvelopeDeductionNumber="redEnvelopeDeductionNumber"
                 :disabledRedEnvelopes="disabledRedEnvelopes">
        <i slot="closeModel" class="close-recharge" @click="closeRecharge">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyBeforeText}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-5">您本次需要支付金额为 <span
            class="sizeColor3">{{(needPayMoneyAfterAsRedEnvelopes / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </pay-model>
    </div>
    <!--用户修改价格比原始价格高需要补差价提示弹框-->
    <modal v-model="editPriceAfterModel">
      <div class="clear mt-10">
        <div class="left mt-5">
          <icon color="#f9284f" size="32" type="md-alert"/>
        </div>
        <div class="left ml-10">
          <p class="fs-14">由于您修改了当前活动信息，且修改后的</p>
          <p class="fs-14">费用高于原费用，因此需要对超出部分进行支付。</p>
        </div>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" @click="continueNextStep">我已了解，继续下一步</i-button>
        <i-button style="margin-left: 35px;" type="error" size="large" @click="IThink">我再想想</i-button>
      </div>
    </modal>
    <!--用户修改价格比原始价格低提示弹框-->
    <modal v-model="editPriceToLowAfterModel">
      <div class="clear mt-40">
        <div class="left mt-5">
          <icon color="#f9284f" size="32" type="md-alert"/>
        </div>
        <div class="left ml-10">
          <p style="font-size: 14px;">由于您修改了当前活动信息，且修改后的</p>
          <p style="font-size: 14px;">费用低于原费用，对于超出部分的费用将在活动结算时返还给您。</p>
        </div>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" @click="toLowContinueNextStep">我已了解，继续下一步</i-button>
        <i-button class="ml-35" type="error" size="large" @click="IThink">我再想想</i-button>
      </div>
    </modal>
    <!--商家改低宝贝数量并且关键词方案大于当前宝贝数量弹框-->
    <modal v-model="keywordLowerChangeModel" :mask-closable="false" :closable="false" width="368">
      <div slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">关键词方案修改确认</span>
      </div>
      <div class="ml-10 text-ct">
        <p class="fs-14">您当前的宝贝数量发生变更，请重新设定关键词方案</p>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" long @click="keywordLowerChange">确定</i-button>
      </div>
    </modal>
    <!--服务条款弹框-->
    <div v-if="isShowUserClause" class="user-clause-model">
      <user-clause @closeClauseModel="isShowUserClause = false"/>
    </div>
    <!--收藏加购物、浏览答题、增值服务示例图查看-->
    <modal title="示例图片查看" v-model="isShowExampleImageModel">
      <img :src="exampleImageUrl" style="width: 100%">
    </modal>
    <!--支付宝手续费说明弹框-->
    <modal v-model="isShowAliPayTip">
      <img src="~assets/img/common/ali-pay-tip.jpg"/>
    </modal>
    <!--店铺信息检测loading弹框-->
    <modal v-model="isShowStoreInfoLoading" :closable="false" :mask-closable="false" width="360">
      <div slot="header"></div>
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="text-ct mt-46 fs-16">店铺信息校验中，请稍后...</div>
      <div slot="footer"></div>
    </modal>
    <!--宝贝链接不属于绑定店铺提示弹框-->
    <modal v-model="isSelectStoreUrl" :closable="false" :mask-closable="false" width="360">
      <p slot="header" class="text-ct">
        <Icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p>您发布的宝贝链接不属于您当前绑定的店铺</p>
        <p>请核实宝贝链接后重新尝试发布</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long @click="isSelectStoreUrl = false">我知道了</iButton>
      </div>
    </modal>
    <!--爬虫抓取宝贝链接对应的店铺信息失败提示弹框-->
    <modal v-model="isGetStoreInfoError" :closable="false" :mask-closable="false" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p>宝贝链接对应的店铺信息获取失败</p>
        <p>请核实宝贝链接的完整性或者稍后重试</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long @click="isGetStoreInfoError = false">我知道了</iButton>
      </div>
    </modal>
    <!--用户没有绑定任何店铺弹框提示-->
    <modal v-model="isBindStore" :closable="false" :mask-closable="false" :scrollable="true" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p>亲，你当前未绑定任何店铺信息</p>
        <p>请先绑定店铺后在发布活动</p>
      </div>
      <div slot="footer">
        <p>
          <i-button type="error" size="large" long @click="goStoreBind">前去绑定店铺</i-button>
        </p>
   <!--     <template v-if="getTaskCreateFastStatus">
          <p class="fs-14 f-b mt-10 text-ct">或者，亲想先简单试试效果再说？</p>
          <p class="mt-10 cl999 text-ct">为快速体验平台服务，新商家可通过以下通道快速完成首发活动，该方法仅支持新商家首次发布！</p>
          <p class="mt-10">
            <i-button type="success" size="large" long @click="goTaskCreateFast">首单快速发布通道</i-button>
          </p>
        </template>-->
      </div>
    </modal>
    <!--普通会员用户使用当日单或预约单提示升级会员版本弹框-->
    <modal v-model="upgradeMembershipModal" :closable="false" :mask-closable="false" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="md-alert"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p class="fs-16">该功能仅限VIP 使用 : (</p>
        <p class="mt-5">是否现在升级您的会员版本？</p>
      </div>
      <div slot="footer" class="text-ct">
        <i-button class="mr-60" type="error" size="large" @click="upgradeSvip">升级会员版本</i-button>
        <i-button size="large" @click="closeUpgradeMembershipModal">我知道了</i-button>
      </div>
    </modal>
    <!--商家推荐奖励广告弹框-->
    <modal v-model="recommendAdvertising.recommendAdvertisingModal" width="700" :mask-closable="false">
      <div slot="header" class="text-align-rt mr-20">
        <checkbox v-model="recommendAdvertising.showRecommendAdvertisingStatus" @on-change="recommendAdvertisingStatusChange">不在显示</checkbox>
      </div>
      <div class="pos-rel">
        <img width="100%" src="~assets/img/task-release/recommend-advertising-image.jpg" alt="商家推荐奖励广告">
        <div @click="goRecommend" style="position: absolute; width: 246px; height: 46px;left: 50%; margin-left: -123px; bottom: 14px; cursor: pointer"></div>
      </div>
      <div slot="footer"></div>
    </modal>
    <!--商家店铺绑定微信的弹窗-->
    <modal v-model="perfectStoreConcatInfo">
      <div slot="header" class="text-ct">
        <icon type="md-information-circle" size="16" color="#ED4834" class="vtc-text-btm"/>
        <span class="main-color">温馨提示</span>
      </div>
      <p class="fs-14 text-ct">
        当前店铺联系方式未补全，为了与拿手及时沟通，建议补全联系方式！
      </p>
      <div slot="footer" class="text-ct">
        <i-button type="error" class="width-pct-39 mr-10" :to="{name:'StoreBindRules'}">马上去补全店铺联系方式</i-button>
        <i-button type="error" class="width-pct-20" @click="perfectStoreConcatInfo = false">稍后再说</i-button>
      </div>
    </modal>
    <!--商家须知-->
    <modal v-model="merchantInformationModal.status" :closable="false" :mask-closable="false" :scrollable="true">
      <div slot="header" class="text-ct main-color fs-16 f-b">
        <div class="fs-18 pb-10">免费提供商品，获取真实客观评价！</div>
        <span>商家须知</span>
      </div>
      <p class="fs-14">白拿拿平台旨在为大家提供更优质的评测服务，为保证评测活动的顺利进行，也为了保证商家朋友的权益，以下条款请务必认真阅读并遵守：</p>
      <p class="mt-10 fs-14">1、实际发货的商品须与平台上发布活动所展示的商品一致；</p>
      <p class="mt-10 fs-14">2、请认真审核拿手提交的订单编号，确认无误之后，及时安排发货；</p>
      <p class="mt-10 fs-14">3、请确保平台上预留的电话和QQ等联系方式真实有效，可以联系上；</p>
      <p class="mt-10 fs-14">4、对于审核通过的拿手活动商家不得无故随意终止；</p>
      <p class="mt-10 fs-14">5、因物流或者其他不可抗因素导致商品破损或者丢件的及时跟平台客服沟通配合处理；</p>
      <p class="main-color mt-10 fs-14">6、任务期间请关闭淘宝客、村淘、分享有赏等淘客活动，若因淘客活动引起的佣金支出由商家自己承担！</p>
      <p class="mt-10 fs-14">以上条款如有违反，造成不良后果，商家自行承担。</p>
      <div slot="footer" class="text-ct">
        <i-button type="error" class="width-pct-39 mr-10 fs-14" :disabled="merchantInformationModal.disabled" @click="closeMerchantInformationModal">{{merchantInformationModal.btnText}}</i-button>
      </div>
    </modal>
    <!--流量订购弹窗-->
    <flow-order-model v-model="showFlowOrderModel"/>
    <!--免费领流量弹窗-->
    <modal v-model="showGetFreeFlow">
      <p slot="header" class="text-ct">免费领取流量</p>
      <div class="cl000">
        <p>1、每个VIP账户可免费领取1次。</p>
        <p>2、流量包含40条收藏加购流量及60条访客流量</p>
      </div>
      <div slot="footer">
        <i-button type="error" long :loading="getFreeFlowLoading" @click="freeFlowConfirm">确定领取</i-button>
      </div>
    </modal>
    <!--开启免审条款弹框-->
    <modal v-model="doNotAudit.doNotAuditModal" :mask-closable="false">
      <div slot="header" class="text-ct main-color fs-16 f-b pt-20">同意以下条款可即时开通活动免审核服务</div>
      <p class="mt-20">1、活动发布前请仔细检查宝贝价格是否正确，宝贝价格关系到拿手垫付金额，若因价格不对造成拿手终止活动甚至店铺申请退款的行为，<span class="main-color">由商家自行承担！</span></p>
      <p class="mt-20">2、请自觉监督活动商品与活动描述的一致性，若因为拿手收到的商品与活动描述商品不一致而导致的退款/差评等行为，<span class="main-color">由商家自行承担！</span></p>
      <p class="mt-20">3、活动标题、活动主图及下单要求中，禁止出现红包、返现、奖金等与S单相关的信息，若经发现平台有权马上终止活动，由此产生的退款行为，<span class="main-color">由商家自行承担！</span></p>
      <p class="mt-20">4、由于商家活动信息设置错误（如商品分类错误等），<span class="main-color">平台有权在不通知商家的情况下对活动信息做修改！</span></p>
      <div slot="footer">
        <i-button v-if="doNotAudit.couldCheck && !doNotAudit.checked" type="info" long class="fs-14" @click="openDoNotAudit">同意以上条款并开通免审核服务</i-button>
        <i-button v-else type="info" long class="fs-14" @click="stopDoNotAudit">终止免审核服务</i-button>
      </div>
      <div slot="footer" class="mt-10">
        <i-button long class="fs-14" @click="doNotAudit.doNotAuditModal = false">取消</i-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import {Icon, Input, Checkbox, Button, Radio, Modal, Alert, Select, Option, OptionGroup, Tooltip, DatePicker, inputNumber, Poptip } from 'iview'
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Upload from '@/components/Upload'
  import PayModel from '@/components/PayModel'
  import UserClause from '@/components/UserClause'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {isPositiveInteger, isNumber, isInteger, isAliUrl, randomString, extendDeep, decode, setStorage, getStorage, getUrlParams, isInternetUrl, getSeverTime} from '@/config/utils'
  import aliUploadConfig from '@/config/aliUploadConfig'
  import commonConfig from '@/config/commonConfig'
  import FlowOrderModel from '@/components/FlowOrderModel'

  export default {
    name: 'task-release',
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
      Upload: Upload,
      OptionGroup: OptionGroup,
      Modal: Modal,
      Alert: Alert,
      PopTip : Poptip ,
      Tooltip: Tooltip,
      PayModel: PayModel,
      UserClause: UserClause,
      DatePicker: DatePicker,
      inputNumber: inputNumber,
      FlowOrderModel: FlowOrderModel
    },
    data() {
      return {
        addImgRangePresentGet: null,
        editorOption: {
          placeholder: "有吸引力的产品介绍，将吸引更多的拿手来申请活动哦！请在这里编辑您的商品简介（商品简介中至少包含一张图片，可以直接复制淘宝的宝贝详情到这里），但请注意，不要在该简介中，放置任何外链，比如店铺或者商品链接，以免申请的拿手绕过相应的下单条件，造成损失！",
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],
                [{'align': []}],
                ['image']
              ],
              handlers: {
                image: function (image) {
                  if (image) {
                    let fileInput = document.getElementById('presentGet');
                    fileInput.click();
                  }
                }
              }
            }
          }
        },
        showPayModel: false,
        stepName: 'information',
        taskLoading: false,
        storeCheckFailCount: 0,
        taskPayId: null,
        itemCatalogList: [],
        answerDefaultList: [],
        mainDefaultList: [],
        pcDefaultList: [],
        appDefaultList: [],
        taoCodeDefaultList: [],
        pcTaskDetailItemMainImage: null,
        pcTaskDetail: [
          {
            index: 0,
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
        appTaskDetailItemMainImage: null,
        appTaskDetail: [
          {
            index: 0,
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
        taoCodeTaskDetailItemMainImage: null,
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
          showkerOrderTimeLimit: 24,
          dayReserveToNow: false,
          refuseOldShowker: false,
          refuseOldShowkerFor30Days: false,
          refuseOldShowkerFor15Days: false,
          refuseOldShowkerForMerchant30Days: false,
          refuseOldShowkerForMerchant15Days: false,
          needBrowseCollectAddCart: false,
          speedUp: false,
          itemIssue: [],
          taskName: null,
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
          activityCategory: 'present_get',
          pinkage: "true",
          donotPostPhoto: "false",
          paymentMethod: "all",
          remark: null,
          itemDescription: null,
          taskId: null,
          taskDetail: [],
          itemReviewRequired: 'review_by_showker_self',
          itemReviewSummary: null,
          itemReviewAssignString: [],
          mainTaskVasConfigIds: [],
          similarTaskVasConfigIds: [],
          showkerApplyRequireString: null,
          popularFlow: null,
          popularFlowConfig: null,
          withoutAudit: false,
        },
        trialCondition: 'all',
        taskCountInputPlaceholder: '请输入活动时长',
        taskCountInputDisabled: false,
        editPriceAfterModel: false,
        editPriceToLowAfterModel: false,
        keywordLowerChangeModel: false,
        priceHasChange: false,
        paidDeposit: 0,
        taskStatus: null,
        editTaskId: null,
        itemReviewList: [{
          reviewContent: '',
          reviewPictures: [],
      }],
        defaultItemReviewImages: [],
        selectKeywordScheme: 0,
        addKeywordScheme: 0,
        isShowUserClause: false,
        browseAnswer: [
          {
            issue: null,
            image: null
          }
        ],
        needBrowseAnswer: false,
        isShowAnswerTip: false,
        isShowExampleImageModel: false,
        exampleImageUrl: null,
        isShowAliPayTip: false,
        selectAnswerIndex: 0,
        selectStoreInfo: {},
        storeBindInfoList: [],
        isRightItemUrl: true,
        isShowStoreInfoLoading: false,
        isSelectStoreUrl: false,
        isGetStoreInfoError: false,
        isBindStore: false,
        noMoreTip: false,
        vasMainItem: [],
        vasSimilarItem: [],
        shopAroundStatus: false,
        originalVasMainItem: [],
        upgradeMembershipModal: false,
        createFastTaskStatus: false,
        redEnvelopesState: true,
        disabledRedEnvelopes: false,
        redEnvelopeDeductionPaid: 0,
        redEnvelopeDeductionNumber: 0,
        residualMatchNumber: 0,
        isMatchNumberOk: true,
        isFastPublish: false,
        aliLevelList: commonConfig.aliLevelList,
        aliTqzList: commonConfig.aliTqzList,
        regionRequireList: Object.freeze([
          '新疆','西藏','甘肃','宁夏','青海','内蒙古','上海','江苏'
          ,'浙江','安徽','江西','北京','天津','山西','山东','河北'
          ,'四川','湖南','湖北','河南','广东','广西','福建','海南','辽宁'
          ,'吉林','黑龙江','陕西','重庆','云南','贵州','台湾','香港','澳门',
        ]),
        datePickerOptions: {
          disabledDate(date) {
            return date && date.valueOf() < getSeverTime()
          }
        },
        interestTagList: [],
        showkerConditionRequireStatus: {
          showkerTagRequireChangeLengthFor4: null,
          aliWwLabelSet: false,
          period: Array.from({length: 24},(v, k) => {return `${k}`}),
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
              date: this.getDateTime(),
              hourStart: '0',
              hourEnd: '23',
              count: null
            }
          ]
        },
        recommendAdvertising: {
          showRecommendAdvertisingStatus: false,
          recommendAdvertisingModal: false
        },
        perfectStoreConcatInfo: false,
        merchantInformationModal: {
          status: false,
          btnText: '确定',
          disabled: true
        },
        favoriteCartFlowInfo: {
          error: {
            status: false,
            msg: ''
          },
          favoriteCartFlowStatus: true,
          popularFlow: 'match_diy',
          period: Array.from({length: 25},(v, k) => {return `${k}`}),
          require: {
            'favorite_cart_flow_require': true,
            'favorite_flow_require': false,
            'cart_flow_require': false,
            'visitor_flow_require': false,
          },
          map: Object.freeze({
            'favorite_cart_flow': '收藏 + 加购',
            'cart_flow': '加购',
            'favorite_flow': '收藏',
            'visitor_flow': '访客',
          }),
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
        showFlowOrderModel: false,
        getFreeFlow: true,
        showGetFreeFlow: false,
        getFreeFlowLoading: false,
        doNotAudit: {
          doNotAuditModal: false,
          doNotAuditStatus: false,
        }
      }
    },
    // 当用户有首发资格路由重定向到快速发布通道反之则停留在此页面
    // 此处需要注意在 beforeRouteEnter 守卫中不能直接访问当前组件实例，通过传一个回调给 next 来访问组件实例
  /*  beforeRouteEnter(to, from, next) {
      // 通过快速发布通道进入此页面不执行任何回调操作
      next(vm => {
        if (from.name !== 'FastTaskRelease') {
          vm.$store.dispatch('getTaskCreateFastStatus').then(res => {
            if (res.status) {
              res.data && vm.$router.push({name: 'FastTaskRelease'})
            } else {
              vm.$Message.error(res.msg)
            }
          })
        }
        vm.merchantInformationInterval();
        vm.merchantInformationModal.status = true;
        // 防止页面跳转绑定店铺弹框闪烁需要将店铺请求放此处执行
        vm.getStoreBindInfoList()
      })
    },*/
/*
    mounted() {
      const _this = this;
      const imgHandlerPresentGet = async function (image) {
        _this.addImgRangePresentGet = _this.$refs.myTextEditorPresent.quill.getSelection();
        if (image) {
          let fileInput = document.getElementById('presentGet');
          fileInput.click()
        }
      };
      _this.$refs.myTextEditorPresent.quill.getModule("toolbar").addHandler("image", imgHandlerPresentGet);
    },
*/
    created() {
      this.getItemCatalog();
      this.getTaskVasList();
      this.checkIfAlreadyGetFreeFlow();
      this.getTaskMerchantAuditConfig();
      this.getStoreBindInfoList();
      this.merchantInformationModal.status = true;
      this.merchantInformationInterval();
      this.$store.dispatch('getTaskCreateFastStatus');
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
       * 从vuex中获取用户账户余额
       * @return {number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /**
       * 从vuex中获取用户QQ号码
       * @return {number}
       */
      qqNumber() {
        return this.$store.getters.getQQNumber
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /** 获取用户会员状态
       * @return {boolean}
       */
      isMember() {
        return this.$store.getters.isMemberOk
      },

      /**
       * 计算拍A发A最终商家发布单品活动担保金（宝贝单价 + 邮费）
       * @return {number}
       */
      oneBond() {
        return this.taskRelease.pinkage === 'true' ? this.taskRelease.itemPrice * 100 : (this.taskRelease.itemPrice * 100 + 1000);
      },

      /**
       * 计算拍A发B最终商家发布单品活动担保金（A宝贝单价 * 拍下数量 + 邮费）
       * @return {number}
       */
      oneBondAToB() {
        return this.taskRelease.pinkage === 'true' ? this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 : (this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 + 1000);
      },

      /**
       * 计算最终单品推广费用（打赏费）
       * 如果用户有首单资格推广费为0
       * @return {number}
       */
      onePromotionExpenses() {
        const type = this.taskRelease.activityCategory === 'free_get' ? 'AA' : 'AB';
        return this.isFastPublish ? 0 : this.$store.getters.getPromotionExpenses[type].limit;
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
       * 计算活动总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.taskRelease.taskCount;
      },

      /**
       * 计算活动总金额
       * @return {number}
       */
      orderMoney() {
        if (this.taskRelease.activityCategory === 'free_get') {
          return (this.taskRelease.taskCount * this.oneBond) + this.allPromotionExpenses + this.allValueAddedCost
        }
        if (this.taskRelease.activityCategory === 'present_get') {
          return (this.taskRelease.taskCount * this.oneBondAToB) + this.allPromotionExpenses + this.allValueAddedCost
        }
      },

      /**
       * 计算修改价格后需要补充的金额
       * @return {number}
       */
      replenishMoney() {
        return this.priceHasChange ? this.orderMoney - this.paidDeposit : 0;
      },

      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance() {
        if (this.priceHasChange) {
          return this.redEnvelopesState ? this.replenishMoney - this.redEnvelopeDeductionNumber <= this.getUserBalance : this.replenishMoney <= this.getUserBalance
        } else {
          return this.redEnvelopesState ? this.orderMoney - this.redEnvelopeDeductionNumber <= this.getUserBalance : this.orderMoney <= this.getUserBalance
        }
      },

      /**
       * 计算余额是否足够支付需要补充的订单金额
       * @return {boolean}
       */
      isBalanceReplenish() {
        return this.replenishMoney <= this.getUserBalance;
      },

      /**
       * 计算当用户账户余额足以支付活动所需金额时要支付的金额
       * @return {number}
       */
      needPayMoneyAfter() {
        if (this.isBalance && !this.priceHasChange) {
          return this.orderMoney
        } else if (this.isBalance && this.priceHasChange) {
          return this.replenishMoney
        } else {
          return 0
        }
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要额外充值的金额
       * @return {number}
       */
      needPayMoneyBefore() {
        if (!this.isBalance && !this.priceHasChange) {
          let money = this.orderMoney - this.getUserBalance;
          return money > 0 ? money : 0
        } else if (!this.isBalanceReplenish && this.priceHasChange) {
          let money = this.replenishMoney - this.getUserBalance;
          return money > 0 ? money : 0
        } else {
          return 0
        }
      },

      /**
       * 计算当用户账户余额足以支付活动所需金额时要支付的金额（包含是否启用红包金额，此金额为最终需要支付金额）
       * @return {number}
       */
      needPayMoneyAfterAsRedEnvelopes() {
        return this.isBalance ? this.redEnvelopesState ? this.needPayMoneyAfter - this.redEnvelopeDeductionNumber : this.needPayMoneyAfter : 0
      },

      /**
       * 计算当用户账户余额不足以支付活动所需金额要充值的金额（包含是否启用红包金额，此金额为最终需要充值金额）
       * @return {number}
       */
      needPayMoneyBeforeAsRedEnvelopes() {
        return !this.isBalance ? this.redEnvelopesState ? this.needPayMoneyBefore - this.redEnvelopeDeductionNumber : this.needPayMoneyBefore : 0
      },

      /** 计算充值界面上的金额文本显示
       * @return {String}
       */
      needPayMoneyBeforeText() {
        return !this.isBalance ? `${(this.needPayMoneyBeforeAsRedEnvelopes / 100).toFixed(2)} + ${(((Math.ceil(this.needPayMoneyBeforeAsRedEnvelopes / 0.994)) - this.needPayMoneyBeforeAsRedEnvelopes) / 100).toFixed(2)}` : ''
      },

      /**
       * 计算活动标题输入字符数
       * @return {number}
       */
      taskNameLength() {
        return this.taskRelease.taskName ? this.taskRelease.taskName.replace(/[\u0391-\uFFE5]/g, "aa").length : 0
      },

      /**
       * 计算商家发布任务份数中系统可审批的份数
       * @return {number}
       */
      systemApprovalTaskNumber() {
        return this.taskRelease.taskCount > 0 ? Math.round(this.taskRelease.taskCount * 0.2) : 0
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
          status: this.systemApprovalTaskNumber - num > 0
        }
      },

      /**
       * 计算商家选填浏览答题后，是否答题和图片都已输入
       * @return {number}
       */
      allAnswerIsOk() {
        return this.browseAnswer.every(item => {
          return !!item.issue && !!item.image;
        })
      },

      /**
       * 计算平台占发布活动的比例
       * @return {number}
       */
      taskSystemHoldPercent() {
        return this.$store.getters.getSysConfigValue('taskSystemHoldPercent');
      },

      /**
       * 计算用户选择的增值服务费用（不包含‘货比三家’服务）
       * @return {number}
       */
      vasMainItemCost() {
        let cost = 0;
        this.vasMainItem.forEach(item => {
          if (item.isSelect) {
            if (this.getMemberVersionLevel === 100) {
              this.upgradeMembershipModal = true;
            } else {
              cost += item.price
            }
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
        if (this.shopAroundStatus) {
          this.vasSimilarItem.forEach(keys => {
            keys.forEach(key => {
              if (key.isSelect) {
                cost += key.price
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
       * 获取商家用户是否有首发资格
       * @return {number}
       */
      getTaskCreateFastStatus() {
        return this.$store.state.taskCreateFastStatus
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

      /**
       * 获取流量数量信息
       * @return {object}
       */
      getFlowNumInfo() {
        return this.$store.state.flowNumberInfo
      }

    },
    methods: {
      formatNumber(num) {
        return num.toString().padStart(2, '0')
      },
      getDateTime(time = 86400000) {
        const nowTime = getSeverTime() + time;
        return `${new Date(nowTime).getFullYear()}-${this.formatNumber(new Date(nowTime).getMonth() + 1)}-${this.formatNumber(new Date(nowTime).getDate())}`
      },
      changeSelectActivity(type) {
        this.taskRelease.activityCategory = type;
      },
      goRecommend() {
        this.$router.push({name: 'PromotionRegulation'})
      },
      recommendAdvertisingStatusChange(status) {
        status && setStorage('recommendAdvertisingStatus', true)
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
      goStoreBind() {
        this.$router.push({name: 'StoreBindRules', query: {from: 'taskRelease'}});
      },
      goTaskCreateFast() {
        const query = this.$route.query.q;
        if (query) {
          this.$router.push({name: 'FastTaskRelease', query:{q: query}})
        } else {
          this.$router.push({name: 'FastTaskRelease'})
        }
      },
      openSampleImageModal(src) {
        this.isShowExampleImageModel = true;
        this.exampleImageUrl = src;
      },
      upgradeSvip() {
        this.$router.push({path: '/user/vip-member/order'})
      },
      getStoreBindInfoList() {
        const _this = this;
        api.getStoreBindInfo().then(res => {
          if (res.status) {
            _this.storeBindInfoList = res.data.filter(item => {
              return item.applyStatus === 2
            });
            _this.isBindStore = _this.storeBindInfoList.length === 0;
            if (_this.storeBindInfoList.length > 0) {
              _this.selectStoreInfo.storeName = decodeURI(_this.storeBindInfoList[0].storeName);
              _this.selectStoreInfo.storeAlitm = decodeURI(_this.storeBindInfoList[0].storeAlitm);
              _this.selectStoreInfo.sellerId = _this.storeBindInfoList[0].sellerId;
              _this.selectStoreInfo.shopId = _this.storeBindInfoList[0].shopId;
              if (!_this.merchantInformationModal.status && !_this.storeBindInfoList[0].weChatNum) {
                _this.perfectStoreConcatInfo = true;
              }
            }
          } else {
            _this.$Message.error(res.msg)
          }
          const taskId = decode(_this.$route.query.q);
          if (taskId) {
            _this.editTaskId = taskId;
            _this.getTaskInfo();
          }
        })
      },
      selectStoreChange(storeName, alitm, shopId, sellerId, weChatNum) {
        this.selectStoreInfo = {};
        this.selectStoreInfo.storeName = storeName;
        this.selectStoreInfo.storeAlitm = alitm;
        this.selectStoreInfo.shopId = shopId;
        this.selectStoreInfo.sellerId = sellerId;
        if (!weChatNum) {
          this.perfectStoreConcatInfo = true;
        }
      },
      changeExampleImageUrl(type) {
        this.isShowExampleImageModel = true;
        if (type === 'main') {
          this.exampleImageUrl = '/static/img/demo/taskRelease/task-main-image.jpg'
        } else {
          this.exampleImageUrl = '/static/img/demo/taskRelease/browse-answer-image.png'
        }
      },
      taskTypeChange(type) {
        if (type === 'pc_search') {
          this.addKeywordScheme = this.pcTaskDetail.length - 1;
          this.selectKeywordScheme = 0;
          this.pcTaskDetail.forEach(item => {
            if (!item.countAssigned) {
              item.countAssigned = 1
            }
          });
          this.countAssignedChange();
        }
        if (type === 'app_search') {
          this.addKeywordScheme = this.appTaskDetail.length - 1;
          this.selectKeywordScheme = 0;
          this.appTaskDetail.forEach(item => {
            if (!item.countAssigned) {
              item.countAssigned = 1
            }
          });
          this.countAssignedChange();
        }
        if (this.pcTaskDetail[0].itemMainImage) {
          this.pcDefaultList = [];
          this.pcDefaultList.push({src: this.pcTaskDetail[0].itemMainImage})
        }
        if (this.appTaskDetail[0].itemMainImage) {
          this.appDefaultList = [];
          this.appDefaultList.push({src: this.appTaskDetail[0].itemMainImage})
        }
        if (type === 'pc_search' || type === 'direct_access') {
          this.vasMainItem.forEach(key => {
            if (key.id === 6 && key.isSelect) {
              key.isSelect = false;
            }
          });
          if (this.shopAroundStatus) {
            this.vasSimilarItem.forEach(keys => {
              keys.forEach(key => {
                if (key.id === 12 && key.isSelect) {
                  key.isSelect = false;
                }
              })
            })
          }
        }
        if (type === 'direct_access' || type === 'tao_code') {
          this.vasMainItem.forEach(key => {
            if (key.id === 1 && key.isSelect) {
              key.isSelect = false;
            }
          });
          if (this.shopAroundStatus) {
            this.shopAroundStatus = false;
          }
        }
      },
      closeUpgradeMembershipModal() {
        this.upgradeMembershipModal = false;
        this.showkerConditionRequireStatus.aliWwLabelSet = false;
        this.taskRelease.orderType = 'normal';
        this.taskCountInputPlaceholder = '请输入活动时长';
        this.taskCountInputDisabled = false;
        this.taskRelease.showkerOrderTimeLimit = 24;
        if (this.shopAroundStatus) {
          this.shopAroundStatus = false;
        }
        this.vasMainItem.forEach(item => {
          if (item.isSelect) {
            item.isSelect = false;
          }
        })
      },
      taskSalesChange(type) {
        if ((type === 'day_now' || type === 'day_reserve') && this.getMemberVersionLevel === 100) {
          this.upgradeMembershipModal = true;
          return;
        }
        if (type === 'day_now' || type === 'day_reserve') {
          this.taskRelease.taskDaysDuration = null;
          this.taskCountInputPlaceholder = '当日22点前有效';
          this.taskRelease.showkerOrderTimeLimit = '';
          this.taskCountInputDisabled = true;
        }
        if (type === 'day_reserve') {
          this.vasMainItem.forEach(item => {
            if (item.id === 3) {
              item.isSelect = true;
              item.isDisabled = true;
            }
          })
        } else {
          this.vasMainItem.forEach(item => {
            if (item.id === 3 && item.isSelect) {
              item.isDisabled = false;
              item.isSelect = false;
            }
          })
        }
        if (type === 'normal') {
          this.taskCountInputPlaceholder = '请输入活动时长';
          this.taskCountInputDisabled = false;
          this.taskRelease.showkerOrderTimeLimit = 24;
        }
      },
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
      answerInputChange(index) {
        this.selectAnswerIndex = index;
      },
      answerImageSuccess(res) {
        this.browseAnswer[this.selectAnswerIndex].image = aliCallbackImgUrl + res.name;
        this.answerDefaultList.push([{src: aliCallbackImgUrl + res.name}]);
      },
      handleSuccess(res) {
        this.taskRelease.taskMainImage = aliCallbackImgUrl + res.name;
      },
      pcBabyImgSuccess(res) {
        this.pcTaskDetailItemMainImage = aliCallbackImgUrl + res.name;
      },
      appBabyImgSuccess(res) {
        this.appTaskDetailItemMainImage = aliCallbackImgUrl + res.name;
      },
      taoCodeImgSuccess(res) {
        this.taoCodeTaskDetailItemMainImage = aliCallbackImgUrl + res.name;
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
          content: '图片 ' + file.name + ' 太大，不能超过 1M'
        });
      },
      stepNext() {
        let _this = this;
        if (_this.taskRelease.orderType === 'normal' && !_this.taskRelease.taskDaysDuration) {
          _this.$Message.warning('亲，活动时长不能为空！');
          return;
        }
        if (_this.taskRelease.orderType === 'normal' && !isInteger(_this.taskRelease.taskDaysDuration)) {
          _this.$Message.warning('亲，活动时长必须为数字！');
          return;
        }
        if (_this.taskRelease.orderType === 'normal' && _this.taskRelease.taskDaysDuration < 3) {
          _this.$Message.warning('亲，活动时长最短为3天起！');
          return;
        }
        if (_this.taskRelease.orderType === 'normal' && _this.taskRelease.taskDaysDuration > 30) {
          _this.$Message.warning('亲，活动时长最长为30天！');
          return;
        }
        if (_this.needBrowseAnswer && !_this.allAnswerIsOk) {
          _this.$Message.warning('亲，请填写浏览答题文案或者上传对应图片！');
          return;
        }
        if (_this.isShowAnswerTip) {
          _this.$Message.warning('亲，浏览答题文案字数不能超过8个字！');
          return;
        }
        if (!_this.taskRelease.taskName) {
          _this.$Message.warning('亲，宝贝标题不能为空！');
          return;
        }
        if (_this.taskRelease.taskName.length > 60) {
          _this.$Message.warning('亲，宝贝标题最多60个字符！');
          return;
        }
        if (!_this.taskRelease.itemType) {
          _this.$Message.warning('亲，宝贝类型不能为空！');
          return;
        }
        if (!_this.taskRelease.taskMainImage) {
          _this.$Message.warning('亲，请上传宝贝主图！');
          return;
        }
        if (!_this.taskRelease.itemUrl) {
          _this.$Message.warning('亲，宝贝链接不能为空！');
          return;
        }
        if (!isInternetUrl(_this.taskRelease.itemUrl)) {
          _this.$Message.warning('亲，宝贝链接格式不正确！');
          return;
        }
        if (!isAliUrl(_this.taskRelease.itemUrl)) {
          _this.$Message.warning('亲，仅支持淘宝、天猫、飞猪链接！');
          return;
        }
        if (!_this.taskRelease.taskCount) {
          _this.$Message.warning('亲，宝贝数量不能为空或者0！');
          return;
        }
        if (!isInteger(_this.taskRelease.taskCount * 1)) {
          _this.$Message.warning('亲，宝贝数量必须为数字！');
          return;
        }
        if (_this.getTaskCreateFastStatus && _this.taskRelease.taskCount > 20) {
          _this.$Message.warning('亲，首单0推广费免费体验最大支持20份名额！');
          return;
        }
        if (!_this.taskRelease.itemPrice) {
          _this.$Message.warning('亲，宝贝单价不能为空！');
          return;
        }
        if (!isNumber(_this.taskRelease.itemPrice)) {
          _this.$Message.warning('亲，宝贝单价必须为数字！');
          return;
        }
        if (_this.taskRelease.itemPrice < 0.1) {
          _this.$Message.warning('亲，每份评测品的价值必须在0.1元以上！');
          return;
        }
        if (_this.taskRelease.activityCategory === 'present_get') {
          if (!_this.taskRelease.orderQuantity) {
            _this.$Message.warning('亲，拍下数量不能为空！');
            return;
          }
          if (!_this.taskRelease.presentPrice) {
            _this.$Message.warning('亲，赠品价格不能为空！');
            return;
          }
          if (!isNumber(_this.taskRelease.presentPrice)) {
            _this.$Message.warning('亲，赠品价格必须为数字！');
            return;
          }
          // if (_this.taskRelease.presentPrice < 10) {
          //   _this.$Message.warning('亲，为保证活动质量和效果，平台展示价格需要在10元以上！');
          //   return;
          // }
        }
        if (_this.taskRelease.itemPrice < 10 && _this.taskRelease.activityCategory === 'pinkage_for_10') {
          _this.$Message.warning('亲，10元包邮活动宝贝最低价格不能低于10元！');
          return;
        }
        if ((_this.taskRelease.activityCategory === 'price_low' || _this.taskRelease.activityCategory === 'goods_clearance') && _this.taskRelease.discountType === 'discount_0') {
          _this.$Message.warning('亲，请选择评测折扣！');
          return;
        }
       /* if (_this.taskRelease.remark && _this.taskRelease.remark.length > 300) {
          _this.$Message.warning('亲，下单要求说明不能超过300个字！');
          return;
        }*/
        if (_this.taskRelease.itemReviewRequired === 'offer_review_summary' && !_this.taskRelease.itemReviewSummary) {
          _this.$Message.warning('亲，请填写你对评价的大概要求！');
          return;
        }
        if (_this.taskRelease.itemReviewRequired === 'assign_review_detail') {
          const itemReviewRequiredOk =_this.itemReviewList.every(item => {
            return item.reviewContent
          });
          if (!itemReviewRequiredOk) {
            _this.$Message.warning('亲，请填写你要提供的评价内容！');
            return;
          }
        }
        if (!_this.taskRelease.itemDescription) {
          _this.$Message.warning('亲，请填写您要发布宝贝的商品简介！');
          return;
        }
        const IMG_TAG = /<img[^>]+>/g;
        if (!IMG_TAG.test(_this.taskRelease.itemDescription)) {
          _this.$Message.warning('亲，商品简介中至少需要包含一张图片！');
          return;
        }
        if (_this.needBrowseAnswer) {
          _this.taskRelease.itemIssue = JSON.stringify(_this.browseAnswer);
        } else {
          _this.taskRelease.itemIssue = JSON.stringify([]);
        }
        if (_this.taskRelease.taskType === 'pc_search') {
          for (let i = 0, len = _this.pcTaskDetail.length; i < len; i++) {
            _this.pcTaskDetail[i].itemMainImage = _this.pcTaskDetailItemMainImage;
            let index = _this.pcTaskDetail[i].index + 1;
            if (!_this.pcTaskDetail[i].itemMainImage) {
              _this.$Message.warning('亲，请上传关键词方案' + index + '中的PC搜索宝贝主图！');
              return;
            }
            if (!_this.pcTaskDetail[i].countAssigned) {
              _this.$Message.warning('亲，关键词方案' + index + '中的匹配人数不能空！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchKeyword) {
              _this.$Message.warning('亲，关键词方案' + index + '中的搜索关键词不能空！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePrice) {
              _this.$Message.warning('亲，关键词方案' + index + '中的展示价格不能空！');
              return;
            }
            if (!isNumber(_this.pcTaskDetail[i].searchPagePrice)) {
              _this.$Message.warning('亲，关键词方案' + index + '中的展示价格必须为数字！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePositionMin) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索起始位置不能空！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePositionMax) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索结束位置不能空！');
              return;
            }
            if (!isInteger(_this.pcTaskDetail[i].searchPagePositionMin)) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索起始位置必须为正整数！');
              return;
            }
            if (!isInteger(_this.pcTaskDetail[i].searchPagePositionMax)) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索结束位置必须为正整数！');
              return;
            }
            if (_this.pcTaskDetail[i].searchPagePositionMax < _this.pcTaskDetail[i].searchPagePositionMin) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置起始页不能大于结束页！');
              return;
            }
            if (_this.pcTaskDetail[i].searchPagePositionMax - _this.pcTaskDetail[i].searchPagePositionMin > 2) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置页数差值最大不大于3页！');
              return;
            }
            if (_this.pcTaskDetail[i].priceRangeMin) {
              if (!isInteger(_this.pcTaskDetail[i].priceRangeMin)) {
                _this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
            if (_this.pcTaskDetail[i].priceRangeMax) {
              if (!isInteger(_this.pcTaskDetail[i].priceRangeMax)) {
                _this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
          }
           if (_this.residualMatchNumber > 0) {
             _this.$Message.warning('亲，当前还有剩余宝贝数未进行关键词匹配！');
             return;
           }
        }
        if (_this.taskRelease.taskType === 'app_search') {
          for (let i = 0, len = _this.appTaskDetail.length; i < len; i++) {
            _this.appTaskDetail[i].itemMainImage = _this.appTaskDetailItemMainImage;
            let index = _this.appTaskDetail[i].index + 1;
            if (!_this.appTaskDetail[i].itemMainImage) {
              _this.$Message.warning('亲，请上传关键词方案' + index + '中的手淘搜索宝贝主图！');
              return;
            }
            if (!_this.appTaskDetail[i].countAssigned) {
              _this.$Message.warning('亲，关键词方案' + index + '中的匹配人数不能空！');
              return;
            }
            if (!_this.appTaskDetail[i].searchKeyword) {
              _this.$Message.warning('亲，关键词方案' + index + '中的搜索关键词不能空！');
              return;
            }
            if (!_this.appTaskDetail[i].searchPagePrice) {
              _this.$Message.warning('亲，关键词方案' + index + '中的展示价格不能空！');
              return;
            }
            if (!isNumber(_this.appTaskDetail[i].searchPagePrice)) {
              _this.$Message.warning('亲，关键词方案' + index + '中的展示价格必须为数字！');
              return;
            }
            if (!_this.appTaskDetail[i].searchRankPosition) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置不能空！');
              return;
            }
            if (!isInteger(_this.appTaskDetail[i].searchRankPosition)) {
              _this.$Message.warning('亲，关键词方案' + index + '中的宝贝搜索位置需为正整数！');
              return;
            }
            if (_this.appTaskDetail[i].priceRangeMin) {
              if (!isInteger(_this.appTaskDetail[i].priceRangeMin)) {
                _this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
            if (_this.appTaskDetail[i].priceRangeMax) {
              if (!isInteger(_this.appTaskDetail[i].priceRangeMax)) {
                _this.$Message.warning('亲，关键词方案中的价格区间位置需为正整数！');
                return;
              }
            }
          }
          if (_this.residualMatchNumber > 0) {
            _this.$Message.warning('亲，当前还有剩余宝贝数未进行关键词匹配！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'app_search' || _this.taskRelease.taskType === 'pc_search') {
          if (!_this.isMatchNumberOk) {
            _this.$Message.warning('亲，当前剩余匹配数不足,请重新分配！');
            return;
          }
          if (_this.showkerConditionRequireStatus.aliWwLabelSet) {
            const isNotRequire = Object.keys(_this.showkerConditionRequireStatus.other).every(item => {
              return !_this.showkerConditionRequireStatus.other[item].require
            });
            if (!_this.showkerConditionRequireStatus.creditLevel.require && !_this.showkerConditionRequireStatus.weekOrder.require && isNotRequire) {
              _this.$Message.warning(`亲，请选择您需要的旺旺标签设置！`);
              return;
            }
            if (_this.showkerConditionRequireStatus.other.tqz.require && _this.showkerCondition.tqzRequire.length === 0) {
              _this.$Message.warning(`亲，请选择拿手审批条件限制中的淘气值要求！`);
              return;
            }
            if (_this.showkerConditionRequireStatus.other.address.require && _this.showkerCondition.addressExclude.length === 0) {
              _this.$Message.warning(`亲，请选择拿手审批条件限制中的地区要求！`);
              return;
            }
            if (_this.showkerConditionRequireStatus.other.age.require && _this.showkerCondition.ageRequire.length === 0) {
              _this.$Message.warning(`亲，请选择拿手审批条件限制中的年龄要求！`);
              return;
            }
            if (_this.showkerConditionRequireStatus.other.auditTimeCount.require && _this.taskRelease.orderType === 'normal') {
              for (let i = 0, len = _this.showkerCondition.auditTimeCountRequire.length; i < len; i++) {
                if (!_this.showkerCondition.auditTimeCountRequire[i].count) {
                  _this.$Message.warning(`亲，拿手审批条件限制中时间段${i + 1}的可审批数不能为空！`);
                  return;
                }
                if (_this.showkerCondition.auditTimeCountRequire[i].hourStart * 1 >= _this.showkerCondition.auditTimeCountRequire[i].hourEnd * 1) {
                  _this.$Message.warning(`亲，拿手审批条件限制中时间段${i + 1}的开始时间大于结束时间，请重新设置！`);
                  return;
                }
                if (Date.parse(new Date(_this.showkerCondition.auditTimeCountRequire[i].date)) < getSeverTime()) {
                  this.$Message.warning(`亲，拿手审批条件限制中时间段${i + 1}选择的日期已过期，请重新选择日期！`);
                  return;
                }
                if (Date.parse(new Date(_this.showkerCondition.auditTimeCountRequire[i].date)) > getSeverTime() + 86400000 * _this.taskRelease.taskDaysDuration) {
                  this.$Message.warning(`亲，拿手审批条件限制中时间段${i + 1}选择的日期大于活动时长，请重新选择日期！`);
                  return;
                }
                for (let j = i + 1; j < len; j++) {
                  if (_this.showkerCondition.auditTimeCountRequire[i].date === _this.showkerCondition.auditTimeCountRequire[j].date &&
                    _this.showkerCondition.auditTimeCountRequire[i].hourEnd * 1 > _this.showkerCondition.auditTimeCountRequire[j].hourStart * 1) {
                    _this.$Message.warning(`亲，时间段${i + 1}与时间段${j + 1}存在时段重复，请重新选择时段！`);
                    return false;
                  }
                }

              }
              if (_this.systemSurplusApprovalTaskNumber.status) {
                _this.$Message.warning(`亲，审批时间/份数要求还有剩余名额未分配！`);
                return;
              }
            }
          }
          if (_this.favoriteCartFlowInfo.favoriteCartFlowStatus) {
            if (!_this.favoriteCartFlowInfo.popularFlow) {
              _this.$Message.warning('亲，请设置收藏加购/访客流量！');
              return;
            }
            // 校验按申请数量匹配是否存在没有设置流量的情况
            if (_this.favoriteCartFlowInfo.popularFlow === 'match_by_apply') {
              const require = _this.favoriteCartFlowInfo.require;
              const isAllRequire = Object.keys(require).some(key => {
                return require[key]
              });
              if (!isAllRequire) {
                _this.$Message.warning('亲，请设置收藏加购及访客流量中的申请数量匹配！');
                return;
              }
            }
            if (_this.favoriteCartFlowInfo.popularFlow === 'match_diy') {
              // 校验自定义流量中设置日期时段是否符合规则
              if (_this.favoriteCartFlowInfo.error.status) {
                _this.$Message.warning(_this.favoriteCartFlowInfo.error.msg);
                return;
              }
              // 校验自定义流量中收藏加购数是否存在输入为空（从时间段 2 开始）
              const matchDiyInfo = _this.favoriteCartFlowInfo.matchDiyInfo;
              let isAfterCountOk = true;
              let isBeforeCountOk = false;
              let keyword = null;
              Object.keys(matchDiyInfo).forEach((key, index) => {
                if (_this.taskRelease.taskType === 'pc_search') {
                  keyword = _this.pcTaskDetail[index].searchKeyword;
                }
                if (_this.taskRelease.taskType === 'app_search') {
                  keyword = _this.appTaskDetail[index].searchKeyword;
                }
                if (isAfterCountOk) {
                  Object.keys(matchDiyInfo[key]).forEach(childKey => {
                    if (isAfterCountOk) {
                      const len = matchDiyInfo[key][childKey].length;
                      const child = matchDiyInfo[key][childKey];
                      if (child[0].count) {
                        isBeforeCountOk = true
                      }
                      for (let i = 1; i < len; i++) {
                        if (!child[i].count) {
                          isAfterCountOk = false;
                          _this.$Message.warning(`亲，关键词方案“${keyword}”中设置“${_this.favoriteCartFlowInfo.map[childKey]}数”中时间段${i + 1}收藏加购数为空！`);
                          break;
                        }
                      }
                    }
                  })
                }
              });
              if (!isBeforeCountOk) {
                _this.$Message.warning('亲，请设置收藏加购及访客流量中的自定义匹配！');
                return;
              }
              if (!isAfterCountOk) return;
            }
          }
        }
        if (_this.taskRelease.taskType === 'tao_code') {
          if (!_this.taoCodeTaskDetail[0].taoCode) {
            _this.$Message.warning('亲，任务宝贝淘口令不能为空！');
            return;
          }
          _this.taoCodeTaskDetail[0].homePageLockItemImage = _this.taoCodeTaskDetailItemMainImage;
        }
        switch (_this.trialCondition) {
          case 'refuseOldShowkerFor30Days' :
            _this.taskRelease.refuseOldShowkerFor30Days = true;
            break;
          case 'refuseOldShowkerFor15Days' :
            _this.taskRelease.refuseOldShowkerFor15Days = true;
            break;
          case 'refuseOldShowkerForMerchant15Days' :
            _this.taskRelease.refuseOldShowkerForMerchant15Days = true;
            break;
          case 'refuseOldShowkerForMerchant30Days' :
            _this.taskRelease.refuseOldShowkerForMerchant30Days = true;
            break;
          case 'refuseOldShowker' :
            _this.taskRelease.refuseOldShowker = true;
            break;
          case 'all' :
            _this.taskRelease.refuseOldShowkerFor30Days = false;
            _this.taskRelease.refuseOldShowkerFor15Days = false;
            _this.taskRelease.refuseOldShowkerForMerchant15Days = false;
            _this.taskRelease.refuseOldShowkerForMerchant30Days = false;
            _this.taskRelease.refuseOldShowker = false;
            break;
        }
        const IMG_HREF_ATTRIBUTE = /(href|target)=["|'].*?["|']/g;
        if (IMG_HREF_ATTRIBUTE.test(_this.taskRelease.itemDescription)) {
          _this.taskRelease.itemDescription = _this.taskRelease.itemDescription.replace(IMG_HREF_ATTRIBUTE, '');
        }
        let status = _this.taskStatus;
        const type = _this.$route.query.type;
        if (status === 'waiting_modify' && _this.paidDeposit === _this.orderMoney) {
          _this.taskCreate(true);
        } else if (status === 'waiting_pay' && _this.paidDeposit === 0) {
          _this.taskCreate(false);
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > _this.orderMoney) {
          _this.editPriceToLowAfterModel = true;
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > 0 && _this.paidDeposit < _this.orderMoney) {
          _this.editPriceAfterModel = true;
          _this.priceHasChange = true;
        } else if (type && type === 'copy') {
          _this.taskCreate(false);
        } else {
          _this.taskCreate(false);
        }
      },
      // 爬虫抓取校验活动店铺信息（如果店铺信息抓取失败，自动重新抓取一次，若再次抓取失败则弹框提示用户）
      async checkStoreInfo() {
        const _this = this;
        _this.taskLoading = true;
        let detectionStoreInfo = null;
        try {
          _this.isShowStoreInfoLoading = true;
          await _this.$store.dispatch('getUserInformation');
          detectionStoreInfo = await api.getStoreInfoByLink({link: _this.taskRelease.itemUrl});
        } catch (err) {
          _this.taskLoading = false;
          throw Error(err);
        }
        _this.isShowStoreInfoLoading = false;
        if (detectionStoreInfo.status) {
          _this.taskLoading = false;
          if (detectionStoreInfo.data) {
            _this.isSelectStoreUrl = !(detectionStoreInfo.data.sellerId.toString() === _this.selectStoreInfo.sellerId && detectionStoreInfo.data.shopId.toString() === _this.selectStoreInfo.shopId);
            return !_this.isSelectStoreUrl;
          } else {
            // _this.storeCheckFailCount++;
            // if (_this.storeCheckFailCount > 1) {
            //   // 当爬虫重试后还是失败的话 则默认校验通过
            //   return true;
            // } else {
            //   _this.checkStoreInfo();
            // }
            return true
          }
        } else {
          _this.$Message.error(detectionStoreInfo.msg);
          _this.taskLoading = false;
          return true
        }
      },
      // 发布活动
      async taskCreate(type) {
        const _this = this;
        _this.taskLoading = true;

        let isCheckOk = null;
        try {
          isCheckOk = await _this.checkStoreInfo();
        } catch (e) {
          isCheckOk = false;
        }
        if (!isCheckOk) return;
        _this.taskRelease.storeName = _this.selectStoreInfo.storeAlitm;
        _this.taskRelease.realStoreName = _this.selectStoreInfo.storeName;
        _this.taskRelease.itemReviewAssignString = JSON.stringify(_this.itemReviewList);
        const mainTaskVasId = [];
        const similarTaskVasId = [];
        _this.vasMainItem.forEach(item => {
          if (item.isSelect) {
            mainTaskVasId.push(item.id);
          }
        });
        if (_this.shopAroundStatus) {
          _this.vasSimilarItem.forEach(keys => {
            let i = [];
            keys.forEach(item => {
              if (item.isSelect) {
                i.push(item.id)
              }
            });
            if (i.length > 0) {
              similarTaskVasId.push(i)
            }
          });
        }
        _this.taskRelease.mainTaskVasConfigIds = JSON.stringify(mainTaskVasId);
        _this.taskRelease.similarTaskVasConfigIds = JSON.stringify(similarTaskVasId);
        const pcTaskDetailClone = extendDeep(_this.pcTaskDetail, []);
        const appTaskDetailClone = extendDeep(_this.appTaskDetail, []);
        const taoCodeTaskDetailClone = extendDeep(_this.taoCodeTaskDetail, []);
        if (_this.taskRelease.activityCategory === 'free_get') {
          _this.taskRelease.donotPostPhoto = 'false'
        }
        switch (_this.taskRelease.taskType) {
          case 'pc_search' :
            pcTaskDetailClone.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice * 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax * 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin * 100).toFixed(2) * 1 : null;
            });
            _this.taskRelease.taskDetail = JSON.stringify(pcTaskDetailClone);
            break;
          case 'app_search' :
            appTaskDetailClone.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice * 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax * 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin * 100).toFixed(2) * 1 : null;
            });
            _this.taskRelease.taskDetail = JSON.stringify(appTaskDetailClone);
            break;
          case 'tao_code' :
            taoCodeTaskDetailClone.forEach(item => {
              item.homePageLockItemPrice = item.homePageLockItemPrice > 0 ? (item.homePageLockItemPrice * 100).toFixed(2) * 1 : null;
            });
            _this.taskRelease.taskDetail = JSON.stringify(taoCodeTaskDetailClone);
            break;
          case 'direct_access' :
            _this.taskRelease.taskDetail = JSON.stringify([]);
            break;
        }

        // 拿手审批条件限制
        if (_this.showkerConditionRequireStatus.aliWwLabelSet) {
          _this.showkerCondition.antPayRequire = _this.showkerConditionRequireStatus.other.antPay.require;
          const copyShowkerCondition = extendDeep(_this.showkerCondition, {});
          if (!_this.showkerConditionRequireStatus.weekOrder.require) {
            copyShowkerCondition.weekOrderRequire = null
          }
          if (!_this.showkerConditionRequireStatus.creditLevel.require) {
            copyShowkerCondition.creditLevelRequire = null
          }
          if (!_this.showkerConditionRequireStatus.other.tqz.require) {
            copyShowkerCondition.tqzRequire = []
          }
          if (!_this.showkerConditionRequireStatus.other.address.require) {
            copyShowkerCondition.addressExclude = []
          }
          if (!_this.showkerConditionRequireStatus.other.gender.require) {
            copyShowkerCondition.genderRequire = null
          }
          if (!_this.showkerConditionRequireStatus.other.age.require) {
            copyShowkerCondition.ageRequire = []
          }
          if (!_this.showkerConditionRequireStatus.other.showkerTag.require) {
            copyShowkerCondition.showkerTagRequire = []
          }
          if (!_this.showkerConditionRequireStatus.other.auditTimeCount.require || _this.taskRelease.orderType === 'day_now' || _this.taskRelease.orderType === 'day_reserve') {
            copyShowkerCondition.auditTimeCountRequire = []
          }
          copyShowkerCondition.creditLevelRequire = copyShowkerCondition.creditLevelRequire === 0 ? null : copyShowkerCondition.creditLevelRequire;
          _this.taskRelease.showkerApplyRequireString = JSON.stringify(copyShowkerCondition);
        } else {
          _this.taskRelease.showkerApplyRequireString = null
        }
        // 收藏加购访客
        if (_this.favoriteCartFlowInfo.favoriteCartFlowStatus) {
          _this.taskRelease.popularFlow = _this.favoriteCartFlowInfo.popularFlow;
          if (_this.favoriteCartFlowInfo.popularFlow === 'match_by_apply') {
            // 根据用户是否勾选‘需要’确定匹配流量数量（没有勾则为0，反之取用户实际输入数量）
            const config = [];
            const matchByApplyInfo = _this.favoriteCartFlowInfo.matchByApplyInfo;
            Object.keys(matchByApplyInfo).forEach(item => {
              config.push({
                flowType: item,
                applyCount: _this.favoriteCartFlowInfo.require[item + '_require'] ? matchByApplyInfo[item].applyCount : 0,
                flowCount: _this.favoriteCartFlowInfo.require[item + '_require'] ? matchByApplyInfo[item].flowCount : 0,
              })
            });
            _this.taskRelease.popularFlowConfig = JSON.stringify(config);
          }
          if (_this.favoriteCartFlowInfo.popularFlow === 'match_diy') {
            // 如果用户没有输入收藏加购数，需要将对应关键词下的对应流量类型的数据从对象中删除
            const matchDiyInfo = extendDeep(_this.favoriteCartFlowInfo.matchDiyInfo, {});
            Object.keys(matchDiyInfo).forEach(i => {
              const keys = Object.keys(matchDiyInfo[i]);
              keys.forEach(k => {
                if (!matchDiyInfo[i][k][0].count) {
                  delete matchDiyInfo[i][k]
                }
                if (keys.length === 0) {
                  delete matchDiyInfo[i]
                }
              })
            });
            _this.taskRelease.popularFlowConfig = JSON.stringify(matchDiyInfo);
          }
        } else {
          _this.taskRelease.popularFlow = null;
          _this.taskRelease.popularFlowConfig = null;
        }
        _this.taskRelease.withoutAudit = _this.doNotAudit.doNotAuditStatus;
        const queryType = _this.$route.query.type;
        if ((_this.getTaskCreateFastStatus || _this.isFastPublish) && queryType !== 'copy') {
          // 首单发布任务接口（包括首单对活动的编辑修改）
          api.taskCreateFast(_this.taskRelease).then(res => {
            if (res.status) {
              _this.taskPayId = res.data.id;
              // 重置是否是首发活动标识
              _this.isFastPublish = res.data.fastPublish ? res.data.fastPublish : false;
              if (!_this.taskRelease.taskId) {
                _this.taskRelease.taskId = res.data.id;
              }
              _this.stepName = 'deposit';
            } else {
              _this.$Message.error(res.msg);
            }
            _this.taskLoading = false;
          });
        } else {
          // 非首单发布任务接口
          api.taskCreate(_this.taskRelease).then(res => {
            if (res.status) {
              _this.taskPayId = res.data.id;
              // 重置是否是首发活动标识
              _this.isFastPublish = res.data.fastPublish ? res.data.fastPublish : false;
              // 重新计算活动红包抵扣金额和活动已支付金额
              _this.redEnvelopeDeductionPaid = res.data.redEnvelopeDeductionPaid;
              _this.paidDeposit = res.data.marginPaid + res.data.promotionExpensesPaid + res.data.vasFeePaid + res.data.redEnvelopeDeductionPaid + res.data.tagVasFeePaid;

              if (!_this.taskRelease.taskId) {
                _this.taskRelease.taskId = res.data.id;
              }
              if (type === true) {
                _this.$router.push({name: 'ActivitiesList'});
              } else {
                _this.stepName = 'deposit';
              }
            } else {
              _this.$Message.error(res.msg)
            }
            _this.taskLoading = false;
            return res.status;
          }).then(status => {
            if (status) {
              api.redEnvelopeDeduction({
                taskId: _this.taskPayId,
              }).then(res => {
                if (res.status) {
                  _this.redEnvelopeDeductionNumber = res.data
                } else {
                  _this.$Message.error(res.msg)
                }
              })
            }
          })
        }
      },
      returnUpStep() {
       /* const type = this.$route.query.type;
        if ((type && type === 'copy') || !type) {
          this.editTaskId = this.taskPayId;
        }
        this.getTaskInfo();*/
        this.stepName = 'information';
        this.taskRelease.taskId = this.taskPayId;
      },
      IThink() {
        this.editPriceAfterModel = false;
        this.editPriceToLowAfterModel = false;
      },
      continueNextStep() {
        this.taskCreate(false);
        this.editPriceAfterModel = false;
      },
      toLowContinueNextStep() {
        this.taskCreate(true);
      },
      getTaskInfo() {
        const _this = this;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            if (res.data.orderType === 'day_reserve') {
              _this.getTaskVasSelectInfo(_this.editTaskId);
            }
            _this.mainDefaultList = [];
            _this.pcDefaultList = [];
            _this.appDefaultList = [];
            _this.taoCodeDefaultList = [];
            _this.answerDefaultList = [];
            _this.redEnvelopeDeductionPaid = res.data.redEnvelopeDeductionPaid;
            _this.paidDeposit = res.data.marginPaid + res.data.promotionExpensesPaid + res.data.vasFeePaid + res.data.redEnvelopeDeductionPaid + res.data.tagVasFeePaid;
            _this.taskStatus = res.data.taskStatus;
            const type = _this.$route.query.type;
            if (type === 'edit') {
              _this.taskRelease.taskId = res.data.id;
            }
            if ((_this.taskStatus === 'waiting_modify' || _this.taskStatus === 'waiting_pay') && _this.paidDeposit > 0 && type !== 'copy') {
              _this.redEnvelopesState = res.data.redEnvelopeDeductionPaid > 0;
              _this.disabledRedEnvelopes = true;
            }
            _this.mainDefaultList.push({src: res.data.taskMainImage});
            Object.keys(_this.taskRelease).forEach(key => {
              if (res.data.hasOwnProperty(key)) {
                _this.taskRelease[key] = res.data[key]
              }
            });
            _this.taskRelease.activityCategory = 'present_get';
            // 复制活动时活动份数为taskCount + returnCount
            _this.taskRelease.taskCount = res.data.taskCount + res.data.returnCount * 1;
            _this.taskRelease.dayReserveToNow = _this.taskRelease.dayReserveToNow ? _this.taskRelease.dayReserveToNow : false;
            _this.taskRelease.speedUp = _this.taskRelease.speedUp ? _this.taskRelease.speedUp : false;
            _this.taskRelease.pinkage = _this.taskRelease.pinkage.toString();
            _this.taskRelease.donotPostPhoto = _this.taskRelease.donotPostPhoto.toString();

            // 活动免审状态
            _this.doNotAudit.doNotAuditStatus = res.data.withoutAudit ? res.data.withoutAudit : false;

            // 评价期望统一重置为：无需求
            _this.taskRelease.itemReviewRequired = 'review_by_showker_self';

            // 晒图需求统一重置为: 无所谓
            _this.taskRelease.donotPostPhoto = 'false';

            // 是否是首发活动标识
            _this.isFastPublish = res.data.fastPublish ? res.data.fastPublish : false;

            // 取消了收藏加购，复制历史活动时默认为false
            _this.taskRelease.needBrowseCollectAddCart = false;

            if (_this.taskRelease.orderType === 'day_reserve' || _this.taskRelease.orderType === 'day_now') {
              _this.taskRelease.taskDaysDuration = null;
              _this.taskCountInputPlaceholder = '当日22点前有效';
              _this.taskCountInputDisabled = true;
              _this.taskRelease.showkerOrderTimeLimit = '';
            }

            // 复制历史活动的时候如果掌柜旺旺信息不能匹配到绑定店铺的旺旺名则默认自动选择第一个店铺，反之取接口实时数据
            _this.selectStoreInfo = {};
            const hasStoreBind = _this.storeBindInfoList.every(item => {
              return decodeURI(item.storeAlitm) !== _this.taskRelease.storeName && decodeURI(item.storeName !== _this.taskRelease.realStoreName)
            });
            if (hasStoreBind) {
              _this.selectStoreInfo.storeName = _this.storeBindInfoList[0].storeName;
              _this.selectStoreInfo.storeAlitm = _this.storeBindInfoList[0].storeAlitm;
              _this.selectStoreInfo.sellerId = _this.storeBindInfoList[0].sellerId;
              _this.selectStoreInfo.shopId = _this.storeBindInfoList[0].shopId;
            } else {
              _this.selectStoreInfo.storeName = _this.taskRelease.realStoreName;
              _this.selectStoreInfo.storeAlitm = _this.taskRelease.storeName;
              _this.storeBindInfoList.forEach(item => {
                if (item.storeName === _this.taskRelease.realStoreName && item.storeAlitm === _this.taskRelease.storeName) {
                  _this.selectStoreInfo.sellerId = item.sellerId;
                  _this.selectStoreInfo.shopId = item.shopId;
                }
              })
            }

            // 处理 10元包邮，白菜价活动下线复制历史活动
            const activityCategory = res.data.activityCategory;
            if (activityCategory === 'pinkage_for_10' || activityCategory === 'price_low') {
              _this.taskRelease.discountType = 'discount_0';
              _this.taskRelease.activityCategory = 'free_get';
            }

            // 处理复制历史活动拍A发A淘宝评价要求重置为false
            if (res.data.donotPostPhoto && activityCategory === 'free_get') {
              _this.taskRelease.donotPostPhoto = 'false';
            }

            if (res.data.refuseOldShowkerFor30Days) {
              _this.trialCondition = 'refuseOldShowkerFor30Days'
            } else if (res.data.refuseOldShowkerFor15Days) {
              _this.trialCondition = 'refuseOldShowkerFor15Days'
            } else if (res.data.refuseOldShowkerForMerchant30Days) {
              _this.trialCondition = 'refuseOldShowkerForMerchant30Days'
            } else if (res.data.refuseOldShowkerForMerchant15Days) {
              _this.trialCondition = 'refuseOldShowkerForMerchant15Days'
            } else {
              _this.trialCondition = 'all'
            }

            if (_this.taskRelease.onlyShowForQualification) {
              _this.taskRelease.onlyShowForQualification = false;
            }

            // 参考范本评论 编辑
            let itemReviewAssignsData = res.data.itemReviewAssigns;
            if (type === 'edit' && itemReviewAssignsData && itemReviewAssignsData.length > 0) {
              const _itemReviewList = [];
              const _defaultItemReviewImages = [];
              itemReviewAssignsData.forEach((item, index) => {
                const _reviewPictures = JSON.parse(item.reviewPictures);
                _itemReviewList.push({
                  reviewPictures: JSON.parse(item.reviewPictures),
                  reviewContent: item.reviewContent
                });
                _defaultItemReviewImages[index] = [];
                _reviewPictures.forEach(key => {
                  _defaultItemReviewImages[index].push({
                    src: key
                  })
                })
              });
              _this.itemReviewList = _itemReviewList;
              _this.defaultItemReviewImages = _defaultItemReviewImages;
            }

            _this.taskRelease.presentPrice = _this.taskRelease.presentPrice / 100;
            _this.taskRelease.itemPrice = _this.taskRelease.itemPrice / 100;
            let itemIssue = JSON.parse(res.data.itemIssue);
            if (itemIssue && itemIssue.length > 0) {
              _this.needBrowseAnswer = true;
              _this.browseAnswer = itemIssue;
              _this.browseAnswer.forEach(item => {
                let answerDefault = [];
                answerDefault.push({src: item.image});
                _this.answerDefaultList.push(answerDefault);
              });
            }

            // 处理复制、编辑活动拿手审批条件限制数据
            // 如果用户没有勾选则手动重置为初始化数据，反之取接口实时数据
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
                _this.showkerConditionRequireStatus.other.showkerTag.require = true;
              }

              _this.interestTagList.length === 0 && _this.interestTag();

              if (_this.showkerCondition.auditTimeCountRequire.length > 0) {
                _this.showkerConditionRequireStatus.other.auditTimeCount.require = true;
                // 复制活动的时候如果时间段日期没有过期维持历史活动的时间段日期否则自动延期（过期的条件为：小于当前日期+2天）
                // 延期日期时间根据历史活动数据为参照基础
                if (type && type === 'copy') {
                  const auditTimeCountRequireFirstDate = _this.showkerCondition.auditTimeCountRequire[0].date;
                  for (let l = 0, len = _this.showkerCondition.auditTimeCountRequire.length; l < len; l++) {
                    let nowDate = Date.parse(new Date(_this.showkerCondition.auditTimeCountRequire[l].date));
                    if (nowDate < Date.parse(_this.getDateTime(86400000 * 2))) {
                      if (nowDate === Date.parse(new Date(auditTimeCountRequireFirstDate))) {
                        _this.showkerCondition.auditTimeCountRequire[l].date = _this.getDateTime()
                      } else {
                        let time = nowDate - Date.parse(new Date(auditTimeCountRequireFirstDate)) + 86400000;
                        _this.showkerCondition.auditTimeCountRequire[l].date = _this.getDateTime(time);
                      }
                    }
                  }
                }
              } else {
                _this.showkerCondition.auditTimeCountRequire.push({
                  date: _this.getDateTime(),
                  hourStart: '0',
                  hourEnd: '23',
                  count: null
                })
              }
            }
            // 按申请数量匹配流量数（复制、编辑活动）
            if (res.data.popularFlow === 'match_by_apply') {
              _this.favoriteCartFlowInfo.popularFlow = 'match_by_apply';
              res.data.other.popularFlowConfig.forEach(item => {
                const flowType = item.flowType;
                const applyCount = item.applyCount;
                const flowCount = item.flowCount;
                _this.favoriteCartFlowInfo.require[flowType + '_require'] = applyCount > 0;
                if (applyCount > 0 && flowCount > 0) {
                  _this.favoriteCartFlowInfo.matchByApplyInfo[flowType].applyCount = applyCount;
                  _this.favoriteCartFlowInfo.matchByApplyInfo[flowType].flowCount = flowCount;
                }
              })
            }
            // 自定义匹配流量数（复制、编辑活动）
            if (res.data.popularFlow === 'match_diy') {
              _this.favoriteCartFlowInfo.popularFlow = 'match_diy';
              const matchDiyInfo = {};
              res.data.other.popularFlowConfig.forEach(item => {
                // 动态生成对象初始化key
                const schemeIndex = item.schemeIndex;
                const flowType = item.flowType;
                const keys = Object.keys(matchDiyInfo);
                if (!keys.includes(schemeIndex.toString())) {
                  matchDiyInfo[schemeIndex] = {};
                  Object.keys(_this.favoriteCartFlowInfo.map).forEach(key => {
                    matchDiyInfo[schemeIndex][key] = [{
                      dateIndex: 0,
                      hourStart: `0`,
                      hourEnd: `24`,
                      count: null,
                    }]
                  })
                }
                if (flowType && item.dateIndex === 0) {
                  matchDiyInfo[schemeIndex][flowType] = [];
                }
                // 根据对象的对应key生成接口返回的对应数据
                matchDiyInfo[schemeIndex][flowType].push({
                  dateIndex: item.dateIndex,
                  hourStart: `${item.hourStart}`,
                  hourEnd: `${item.hourEnd}`,
                  count: item.count,
                })
              });
              // 合并数据
              _this.favoriteCartFlowInfo.matchDiyInfo = Object.assign({}, _this.favoriteCartFlowInfo.matchDiyInfo, matchDiyInfo);
            }
            switch (res.data.taskType) {
              case 'tao_code':
                const image = _this.taoCodeTaskDetail[0].homePageLockItemImage;
                image && _this.taoCodeDefaultList.push({src: image});
                _this.taoCodeTaskDetailItemMainImage = image;
                _this.conversionPrice('tao_code');
                break;
              case 'pc_search':
                _this.pcTaskDetail = res.data.taskDetailObject;
                _this.pcTaskDetail.forEach(item => {
                  if (!item.searchFilter) {
                    item.searchFilter = [];
                  }
                  if (!item.countAssigned) {
                    item.countAssigned = 1
                  }
                });
                _this.addKeywordScheme = _this.pcTaskDetail.length - 1;
                _this.pcDefaultList.push({src: _this.pcTaskDetail[0].itemMainImage});
                _this.pcTaskDetailItemMainImage = _this.pcTaskDetail[0].itemMainImage;
                _this.conversionPrice('pc_search');
                break;
              case 'app_search':
                _this.appTaskDetail = res.data.taskDetailObject;
                _this.appTaskDetail.forEach(item => {
                  if (!item.searchFilter) {
                    item.searchFilter = []
                  }
                  if (!item.countAssigned) {
                    item.countAssigned = 1
                  }
                });
                _this.addKeywordScheme = _this.appTaskDetail.length - 1;
                _this.appDefaultList.push({src: _this.appTaskDetail[0].itemMainImage});
                _this.appTaskDetailItemMainImage = _this.appTaskDetail[0].itemMainImage;
                _this.conversionPrice('app_search');
                break;
              case 'direct_access':
                break;
            }
            _this.countAssignedChange();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      conversionPrice(type) {
        switch (type) {
          case 'pc_search' :
            this.pcTaskDetail.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice / 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax / 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin / 100).toFixed(2) * 1 : null;
            });
            break;
          case 'app_search' :
            this.appTaskDetail.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice / 100).toFixed(2) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax / 100).toFixed(2) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin / 100).toFixed(2) * 1 : null;
            });
            break;
          case 'tao_code':
            this.taoCodeTaskDetail.forEach(item => {
              item.homePageLockItemPrice = item.homePageLockItemPrice > 0 ? (item.homePageLockItemPrice / 100).toFixed(2) * 1 : null;
            });
            break;
        }
      },
      getItemCatalog() {
        const _this = this;
        const itemCatalog = getStorage('itemCatalog');
        if (!itemCatalog) {
          api.itemCatalog().then(res => {
            if (res.status) {
              _this.itemCatalogList = res.data;
              setStorage('itemCatalog', _this.itemCatalogList);
            } else {
              _this.$Message.error(res.msg);
            }
          })
        } else {
          _this.itemCatalogList = itemCatalog;
        }
      },
      uploadImgPresentGet(e) {
        const _this = this;
        const file = e.target.files[0];
        const key = `task/${randomString()}`;
        aliUploadConfig.aliUploadImg(key, file).then(res => {
          if (res) {
            let value = aliCallbackImgUrl + res.name + '!orgi75';
            _this.addImgRangePresentGet = _this.$refs.myTextEditorPresent.quill.getSelection();
            _this.$refs.myTextEditorPresent.quill.insertEmbed(_this.addImgRangePresentGet !== null ? _this.addImgRangePresentGet.index : 0, 'image', value, Quill.sources.USER);
            document.getElementById('presentGet').value = '';
            _this.$Message.success('商品简介图片上传成功！');
          }
        }).catch(err => {
          console.error(err);
          document.getElementById('presentGet').value = '';
          _this.$Message.warning('商品简介图片上传失败，请重试！');
        })
      },
      removeAnswerImage(file) {
        this.browseAnswer.forEach((item, index) => {
          if (item.image === file.src) {
            this.browseAnswer.splice(index, 1);
            this.answerDefaultList.splice(index, 1);
          }
        });
        if (this.browseAnswer.length === 0) {
          this.needBrowseAnswer = false;
        }
      },
      removeMainImage() {
        this.taskRelease.taskMainImage = null;
      },
      removeAppImage() {
        this.appTaskDetailItemMainImage = null;
      },
      removePcImage() {
        this.pcTaskDetailItemMainImage = null;
      },
      removeTaoCodeImage() {
        this.taoCodeTaskDetailItemMainImage = null;
      },
      openRecharge() {
        if (this.needPayMoneyBeforeAsRedEnvelopes <= 0 && this.needPayMoneyAfterAsRedEnvelopes <= 0) {
          this.$router.push({name: 'ActivitiesList'});
        } else {
          this.showPayModel = true
        }
      },
      closeRecharge() {
        this.showPayModel = false;
      },
      confirmPayment(pwd) {
        const _this = this;
        api.editPromotion({
          redEnvelopesState: _this.redEnvelopesState,
          taskId: _this.taskPayId,
        }).then(res => {
          return res
        }).then(res => {
          if (res.status) {
            api.payByBalance({
              fee: _this.needPayMoneyAfterAsRedEnvelopes,
              payPassword: pwd,
              taskId: _this.taskPayId,
              type: _this.priceHasChange ? 'supply_pay' : 'first_pay'
            }).then(res => {
              if (res.status) {
                _this.$store.dispatch('getUserInformation');
                _this.showPayModel = false;
                _this.$Message.success('恭喜您，支付成功！');
                _this.stepName = 'audit';
                _this.recommendAdvertising.recommendAdvertisingModal = !getStorage('recommendAdvertisingStatus');
              } else {
                _this.$Message.error(res.msg)
              }
              _this.$refs.payModelRef.payLoading = false;
            })
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      addItemReviewList() {
        this.itemReviewList.push({reviewContent: '', reviewPictures: []});
      },
      deleteItemReviewList(index) {
        this.itemReviewList.splice(index, 1);
      },
      removeEvaluateImage(file, itemIndex) {
        const _reviewPictures = this.itemReviewList[itemIndex].reviewPictures;
        const _index = _reviewPictures.findIndex(item => {
          return item === file.src;
        });
        _reviewPictures.splice(_index, 1);
      },
      evaluateImageSuccess(res, index) {
        this.itemReviewList[index].reviewPictures.push(`${aliCallbackImgUrl}${res.name}`);
      },
      taskCountChange(e) {
        if (e.target.value > 0) {
          this.pcTaskDetail[0].countAssigned = 1;
          this.appTaskDetail[0].countAssigned = 1;
        } else {
          this.pcTaskDetail[0].countAssigned = null;
          this.appTaskDetail[0].countAssigned = null;
        }
        this.countAssignedChange();
      },
      changeSelectEvaluation(type) {
        if (type === 'assign_review_detail') {
          this.taskRelease.itemReviewSummary = null;
        }
      },
      allPlanNumber() {
        let num = 0;
        if (this.taskRelease.taskType === 'pc_search') {
          num = this.pcTaskDetail.reduce((prev, cur) => {
            return (cur.countAssigned > 0 ? cur.countAssigned : 0) + prev
          }, 0)
        } else if (this.taskRelease.taskType === 'app_search') {
          num = this.appTaskDetail.reduce((prev, cur) => {
            return (cur.countAssigned > 0 ? cur.countAssigned : 0) + prev
          }, 0)
        }
        return num
      },
      countAssignedChange() {
        const num = this.allPlanNumber();
        if (num > this.taskRelease.taskCount) {
          this.isMatchNumberOk = false;
          this.taskRelease.taskCount && this.$Message.warning('亲，当前剩余匹配数不足,请重新分配！');
        } else {
          this.isMatchNumberOk = true;
        }
       this.residualMatchNumber = this.taskRelease.taskCount > 0 ? (this.taskRelease.taskCount - num > 0 ? this.taskRelease.taskCount - num : 0) : 0;
      },
      handleAdd() {
        if (this.residualMatchNumber === 0) {
           this.$Message.warning('亲，剩余匹配数为0，无法新增关键词了！');
           return;
        }
        let initialValue = this.taskRelease.taskCount > 0 ? 1 : null;
        this.addKeywordScheme++;
        if (this.taskRelease.taskType === 'pc_search') {
          this.pcTaskDetail.push({
            index: this.addKeywordScheme,
            itemMainImage: null,
            countAssigned: initialValue,
            searchKeyword: null,
            searchSort: 'zong_he',
            searchPagePrice: null,
            searchPagePositionMin: null,
            searchPagePositionMax: null,
            searchFilter: [],
            priceRangeMin: null,
            priceRangeMax: null,
            deliverAddress: null,
          })
        }
        if (this.taskRelease.taskType === 'app_search') {
          this.appTaskDetail.push({
            index: this.addKeywordScheme,
            itemMainImage: null,
            countAssigned: initialValue,
            searchKeyword: null,
            searchSort: 'zong_he',
            searchPagePrice: null,
            searchPagePositionMin: null,
            searchPagePositionMax: null,
            searchFilter: [],
            priceRangeMin: null,
            priceRangeMax: null,
            deliverAddress: null,
          })
        }
        this.selectKeywordScheme = this.addKeywordScheme;
        this.countAssignedChange();
      },
      handleClose(index) {
        const _matchDiyInfo = this.favoriteCartFlowInfo.matchDiyInfo;
        if (this.taskRelease.taskType === 'pc_search') {
          this.pcTaskDetail.splice(index, 1);
        } else {
          this.appTaskDetail.splice(index, 1);
        }
        if (Object.keys(_matchDiyInfo).length > 1) {
          delete _matchDiyInfo[index];
        }
        this.addKeywordScheme -= 1;
        this.selectKeywordScheme = index - 1;
        this.countAssignedChange();
      },
      selectChangeScheme(index) {
        this.selectKeywordScheme = index;
      },
      keywordLowerChange () {
        const _this = this;
        const type = _this.taskRelease.taskType;
        let initialValue = this.taskRelease.taskCount > 0 ? 1 : null;
        _this.keywordLowerChangeModel = false;
        if (type === 'pc_search') {
          _this.pcTaskDetail = [
            {
              index: 0,
              itemMainImage: null,
              countAssigned: initialValue,
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
          ];
          _this.addKeywordScheme = 0;
          _this.selectKeywordScheme = 0;
        }
        if (type === 'app_search') {
          _this.appTaskDetail = [
            {
              index: 0,
              itemMainImage: null,
              countAssigned: initialValue,
              searchKeyword: null,
              searchSort: 'zong_he',
              searchPagePrice: null,
              searchRankPosition: null,
              searchFilter: [],
              priceRangeMin: null,
              priceRangeMax: null,
              deliverAddress: null,
            }
          ];
          _this.addKeywordScheme = 0;
          _this.selectKeywordScheme = 0;
        }
        _this.countAssignedChange();
      },
      addAnswer() {
        if (this.browseAnswer.length < 3) {
          this.browseAnswer.push({
            issue: null,
            image: null,
          })
        }
      },
      deleteAnswer(index) {
        this.browseAnswer.splice(index, 1);
        this.answerDefaultList.splice(index, 1);
      },
      needBrowseAnswerChange(value) {
        if (value) {
          this.browseAnswer = [{image: null, issue: null}];
          this.answerDefaultList = [];
        }
      },
      addShopAroundList() {
        // 深度复制对象，防止数据对象共享
        const copy = extendDeep(this.originalVasMainItem, []);
        this.vasSimilarItem.push(copy);
      },
      delShopAroundList() {
        this.vasSimilarItem.splice(this.vasSimilarItem.length - 1, 1)
      },
      shopAroundStatusChange() {
        if (!this.shopAroundStatus) {
          if (this.vasSimilarItem.length > 1) {
            this.vasSimilarItem.splice(1, this.vasSimilarItem.length - 1)
          }
          this.vasSimilarItem[0].forEach(item => {
            if (!item.isDisabled && item.isSelect) {
              item.isSelect = false
            }
          })
        }
        if (this.getMemberVersionLevel === 100) {
          this.upgradeMembershipModal = true
        }
      },
      addTimeBucket() {
        this.showkerCondition.auditTimeCountRequire.push({
          date: this.getDateTime(),
          hourStart: '0',
          hourEnd: '23',
          count: null
        })
      },
      deleteTimeBucket(index) {
        this.showkerCondition.auditTimeCountRequire.splice(index, 1)
      },
      datePickerValueChange(data, index) {
        let timeStamp = Date.parse(new Date(data));
        if (timeStamp > getSeverTime() + 86400000 * this.taskRelease.taskDaysDuration) {
          this.$Message.warning('您选择的日期大于活动时长，请重新选择')
        }
        this.showkerCondition.auditTimeCountRequire[index].date = data;
      },
      // 当拿手旺旺标签设置状态改变处理，1.免费会员弹出升级会员弹框 2.当状态为false自动取消所有标签选项
      aliWwLabelSetChange(value) {
        if (value) {
          this.interestTagList.length === 0 && this.interestTag();
          if (this.getMemberVersionLevel === 100) {
            this.upgradeMembershipModal = true;
          }
        } else {
          this.showkerConditionRequireStatus.creditLevel.require = false;
          this.showkerConditionRequireStatus.weekOrder.require = false;
          Object.keys(this.showkerConditionRequireStatus.other).forEach(item => {
            if (this.showkerConditionRequireStatus.other[item].require) {
              this.showkerConditionRequireStatus.other[item].require = false
            }
          })
        }
      },
      // 标签设置地区选择改变处理，最多选5个地区，当用户选中超过5个地区自动取消勾选超出的地区选项
      addressExcludeChange(data) {
        if (data.length > 5) {
          this.$Message.warning('亲，拿手审批条件限制地区要求最多选择5个！');
          this.showkerCondition.addressExclude.splice(5, 1);
        }
      },
      // 标签设置类目选择改变处理，最少选4个类目，当用户选中少于4个地区自动勾选将要取消勾选的地区选项
      showkerTagRequireChange(data) {
        if (data.length === 4) {
          this.showkerConditionRequireStatus.showkerTagRequireChangeLengthFor4 = data
        }
        if (data.length < 4) {
          this.$Message.warning('亲，拿手审批条件限制类目要求最少选择4个！');
          this.showkerConditionRequireStatus.showkerTagRequireChangeLengthFor4.forEach(item => {
            if (!this.showkerCondition.showkerTagRequire.includes(item)) {
              this.showkerCondition.showkerTagRequire.push(item)
            }
          })
        }
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
      limitTimeChange(type, time, index) {
        const value = this.showkerCondition.auditTimeCountRequire;
        if (type === 'startTime' && time * 1 >= value[index].hourEnd * 1) {
          this.$Message.warning(`亲，时间段${index + 1}开始时间点应小于结束时间点，请重新选择开始时间！`);
          return;
        }
        if (type === 'endTime' && time * 1 <= value[index].hourStart * 1) {
          this.$Message.warning(`亲，时间段${index + 1}结束时间点应大于开始时间点，请重新选择结束时间！`);
          return;
        }
        for (let i = 0, len = value.length; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            if (value[i].date === value[j].date && value[i].hourEnd * 1 > value[j].hourStart * 1) {
              this.$Message.warning(`亲，时间段${i + 1}与时间段${j + 1}存在时段重复，请重新选择时段！`);
              return false;
            }
          }
        }
      },
      // 商家须知按钮倒计时
      merchantInformationInterval() {
        let time = 3;
        const interval = setInterval(() => {
          time--;
          if (time === 0) {
            clearInterval(interval);
            this.merchantInformationModal.btnText = '确定';
            this.merchantInformationModal.disabled = false;
          } else {
            this.merchantInformationModal.btnText = `确定（${time}秒）`
          }
        }, 1000)
      },
      closeMerchantInformationModal() {
        this.merchantInformationModal.status = false;
        if (this.storeBindInfoList.length > 0 && !this.storeBindInfoList[0].weChatNum) {
          this.perfectStoreConcatInfo = true;
        }
      },
      selectKeywordFlowType(type) {
        this.favoriteCartFlowInfo.flowTypeDefault = type;
      },
      // 收藏加购流量自定义匹配设置流量选择关键词
      // 出于页面渲染性能考虑，除了‘关键词1’外只有用户主动触发其他关键词的时候才会生成对应DOM
      selectKeywordTag(index) {
        this.favoriteCartFlowInfo.keywordTagIndex = index;
        const keys = Object.keys(this.favoriteCartFlowInfo.matchDiyInfo);
        if (!keys.includes(index.toString())) {
          this.$set(this.favoriteCartFlowInfo.matchDiyInfo, index, {
            'favorite_cart_flow': [
              {
                flowType: 'favorite_cart_flow',
                dateIndex: 0,
                hourStart: '0',
                hourEnd: '24',
                count: null
              }
            ],
            'favorite_flow': [
              {
                flowType: 'favorite_flow',
                dateIndex: 0,
                hourStart: '0',
                hourEnd: '24',
                count: null
              }
            ],
            'cart_flow': [
              {
                flowType: 'cart_flow',
                dateIndex: 0,
                hourStart: '0',
                hourEnd: '24',
                count: null
              }
            ],
            'visitor_flow': [
              {
                flowType: 'visitor_flow',
                dateIndex: 0,
                hourStart: '0',
                hourEnd: '24',
                count: null
              }
            ]
          })
        }
      },
      // 添加收藏加购流量自定义匹配设置流量时间区间
      addTimeBucketForFlowType(i, key, index) {
        const len = this.favoriteCartFlowInfo.matchDiyInfo[i][key].length;
        this.favoriteCartFlowInfo.matchDiyInfo[i][key].push({
          flowType: key,
          dateIndex: len,
          hourStart: '0',
          hourEnd: '24',
          count: null
        });
        this.setFlowTimeCheck(i, key, index);
      },
      // 删除收藏加购流量自定义匹配设置流量时间区间
      deleteTimeBucketForFlowType(i, key, index) {
        this.favoriteCartFlowInfo.matchDiyInfo[i][key].splice(index, 1);
        if (this.favoriteCartFlowInfo.matchDiyInfo[i][key].length > 1) {
          this.setFlowTimeCheck(i, key, index);
        } else {
          this.favoriteCartFlowInfo.error.status = false;
          this.favoriteCartFlowInfo.error.msg = '';
        }
      },
      // 校验收藏加购流量自定义匹配设置流量时间区间
      setFlowTimeCheck(i, key, index, type = '') {
        const value = this.favoriteCartFlowInfo.matchDiyInfo[i][key];
        const hourStart = value[index].hourStart;
        const hourEnd = value[index].hourEnd;
        let keyword = '';
        if (this.taskRelease.taskType === 'pc_search') {
          keyword = this.pcTaskDetail[i].searchKeyword;
        }
        if (this.taskRelease.taskType === 'app_search') {
          keyword = this.appTaskDetail[i].searchKeyword;
        }
        if (type === 'startTime' && hourStart * 1 >= hourEnd * 1) {
          this.$Message.warning(`亲，时间段${index + 1}开始时间点应小于结束时间点，请重新选择开始时间！`);
          this.favoriteCartFlowInfo.error.status = true;
          this.favoriteCartFlowInfo.error.msg =`亲，关键词方案“${keyword}”中设置“${this.favoriteCartFlowInfo.map[key]}数”时间段${index + 1}开始时间点应小于结束时间点，请重新选择开始时间！`;
          return;
        }
        if (type === 'endTime' && hourEnd * 1 <= hourStart * 1) {
          this.$Message.warning(`亲，时间段${index + 1}结束时间点应大于开始时间点，请重新选择结束时间！`);
          this.favoriteCartFlowInfo.error.status = true;
          this.favoriteCartFlowInfo.error.msg =`亲，关键词方案“${keyword}”中设置“${this.favoriteCartFlowInfo.map[key]}数”时间段${index + 1}结束时间点应大于开始时间点，请重新选择结束时间！`;
          return;
        }
        for (let i = 0, len = value.length; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            if (value[i].dateIndex === value[j].dateIndex && value[i].hourEnd * 1 > value[j].hourStart * 1) {
              this.$Message.warning(`亲，时间段${i + 1}与时间段${j + 1}存在时段重复，请重新选择时段！`);
              this.favoriteCartFlowInfo.error.status = true;
              this.favoriteCartFlowInfo.error.msg = `亲，关键词方案“${keyword}”中设置“${this.favoriteCartFlowInfo.map[key]}数”时间段${i + 1}与时间段${j + 1}存在时段重复，请重新选择时段！`;
              return false;
            } else {
              this.favoriteCartFlowInfo.error.status = false;
              this.favoriteCartFlowInfo.error.msg = '';
            }
          }
        }
      },
      // 检查是否已经领取过免费流量
      checkIfAlreadyGetFreeFlow() {
        const _this = this;
        api.checkIfAlreadyGetFreeFlow().then(res => {
          if (res.status) {
            _this.getFreeFlow = res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      // 免费领取流量
      freeFlowConfirm() {
        const _this = this;
        _this.getFreeFlowLoading = true;
        api.orderFlow({
          type: 0,
          platform: 'PC',
        }).then(res => {
          if (res.status) {
            _this.showGetFreeFlow = false;
            _this.$Message.success('您已成功领取流量！');
            _this.$store.dispatch('getFlowNumInfo');
            _this.checkIfAlreadyGetFreeFlow();
          } else {
            _this.$Message.error(res.msg);
          }
          _this.getFreeFlowLoading = false;
        })
      },
      toTaskFans() {
        this.$router.push('/user/task-fans');
      },
      getTaskMerchantAuditConfig() {
        const _this = this;
        api.taskMerchantAuditConfig().then(res => {
          if (res.status) {
            _this.doNotAudit = Object.assign({}, _this.doNotAudit, {
              checked: res.data.checked,
              couldCheck: res.data.couldCheck,
              limitCountLeft: res.data.limitCountLeft ? res.data.limitCountLeft: 0,
              limitTimeEnd: res.data.limitTimeEnd,
            });
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      setAuditStatus(type) {
        const _this = this;
        const map = {
          'open': 'true',
          'close': 'false',
        };
        api.setAuditStatus({
          withoutAudit: map[type]
        }).then(res => {
          if (res.status) {
            if (type === 'open') {
              _this.$Message.success('开通活动发布免审成功！');
            } else {
              _this.$Message.success('关闭活动发布免审成功！');
            }
            _this.getTaskMerchantAuditConfig();
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      openDoNotAudit() {
        this.doNotAudit.doNotAuditModal = false;
        this.doNotAudit.doNotAuditStatus = true;
        this.setAuditStatus('open');
      },
      stopDoNotAudit() {
        this.doNotAudit.doNotAuditStatus = false;
        this.doNotAudit.doNotAuditModal = false;
        this.setAuditStatus('close');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .task-release {
    .flow-title {
      height: 72px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #eee;
    }

    .flow-title-first:after {
      content: '';
      position: absolute;
      left: 100%;
      bottom: 28px;
      width: 0;
      height: 0;
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-left-width: 8px;
      border-left-color: currentColor;
      color: $mainColor;
    }

    .flow-title-first {
      position: relative;
      background-color: $mainColor;
      width: 46px;
      font-size: 18px;
      text-align: center;
      color: #fff;
      line-height: 24px;
      padding-top: 10px;
      height: 100%;
      border-radius: 5px 0 0 5px;
      margin-right: 12px;
    }

    .step {
      height: 100%;
    }

    .step-number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: #fff;
      font-size: 16px;
      background-color: #FD5574;
      text-align: center;
      line-height: 28px;
      margin-top: 20px;
      margin-right: 10px;
    }

    .step-text {
      width: 130px;
      color: #000;
      line-height: 18px;
      margin-top: 8px;
    }

    .check-member {
      width: 200px;
      font-size: 18px;
      height: 40px;
      background-color: $mainColor;
      border-color: $mainColor;
    }

    .second-color {
      color: $secondColor;
    }

    .sizeColor {
      color: #A5A5A5;
    }

    .sizeColor2 {
      color: #91A2BD;
    }

    .sizeColor3 {
      color: #FF0100;
    }

    .task-release-title {
      height: 52px;
      line-height: 52px;
      @include sc(20px, #666)
    }

    .activity-con {
      border: 1px solid #F5F5F5;
      padding-bottom: 20px;
      border-radius: 5px;
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
      @include sc(24px, #fff);
      background-color: $mainColor;
      text-align: center;
      margin: 20px auto 42px auto;
      @include transition;
      cursor: pointer;
      &:hover {
        background-color: darken($mainColor, 10%);
      }
    }

    .deposits-received {
      padding-bottom: 226px;
      .deposits-received-title {
        @include sc(16px, #000);
        text-align: center;
      }
      .deposits-received-info {
        text-align: left;
        padding: 0 120px;
        line-height: 32px;
        @include sc(14px, #333);
      }
      .description-fees {
        padding: 0 42px;
      }
      .pay-info {
        @include sc(16px, #000);
        text-align: left;
        margin-left: 42px;
      }
      .description-fees-footer {
        margin-top: 20px;
        text-align: center;
        .pay-btn {
          display: inline-block;
          @include wh(160px, 36px);
          line-height: 36px;
          @include sc(18px, #fff);
          background-color: $mainColor;
          text-align: center;
          margin: 20px auto 42px auto;
          @include transition;
          cursor: pointer;
          border-radius: 5px;
          &:hover {
            background-color: darken($mainColor, 10%);
          }
        }
        .return {
          color: #5980D4;
          margin-left: 20px;
          margin-right: 20px;
          @include transition;
          cursor: pointer;
          &:hover {
            color: darken(#5980D4, 10%);
            text-decoration: underline;
          }
        }
      }
    }
    .description-fees-con {
      padding: 12px;
      border: 1px solid #FFD6D0;
      background-color: #FFF5E0;
      border-radius: 5px;
    }
    .audit {
      .audit-title {
        @include sc(22px, #5C5C5C);
        line-height: 46px;
        text-align: center;
      }
      .audit-con {
        text-align: center;
        font-size: 16px;
      }
      .audit-footer {
        text-align: center;
        color: #50B9DB;
        font-size: 16px;
        a {
          color: #50B9DB;
          @include transition;
          &:hover {
            color: darken(#50B9DB, 10%);
            text-decoration: underline;
          }
        }
        span {
          cursor: pointer;
          @include transition;
          &:hover {
            color: darken(#50B9DB, 10%);
            text-decoration: underline;
          }
        }
      }
    }
    .ivu-steps-item {
      line-height: 26px;
    }
    .task-remark-input {
      width: 600px;
    }
    .activity-tip-new{
      border: 1px solid #FFB9B8;
      border-radius: 5px;
      background-color: #FFF4F1;
      text-align: center;
      color: #000;
      font-size: 14px;
      padding: 10px;
    }
    .activity-tip {
      height: 36px;
      line-height: 36px;
      border: 1px solid #FFB9B8;
      border-radius: 5px;
      background-color: #FFF4F1;
      text-align: center;
      color: #000;
      font-size: 14px;
    }
    .discount-btn {
      display: inline-block;
      width: 140px;
      height: 40px;
      text-align: center;
      padding: 1px 0;
      color: #fff;
      cursor: pointer;
      position: relative;
      span {
        display: block;
        &:first-child {
          font-weight: bold;
        }
      }
      &.discount-charge {
        background-color: #c4c71d;
        border: 2px solid #c4c71d;
        &:hover {
          border-color: #000;
        }
      }
      &.discount-9-9 {
        background-color: #c4c71d;
        border: 2px solid #c4c71d;
        &:hover {
          border-color: #000;
        }
      }
      &.discount-49-9 {
        background-color: #c4c71d;
        border: 2px solid #c4c71d;
        &:hover {
          border-color: #000;
        }
      }
      &.discount-999 {
        background-color: #c4c71d;
        border: 2px solid #c4c71d;
        &:hover {
          border-color: #000;
        }
      }
      &.isSelect {
        border-color: #000;
      }
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
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
      height: 94px;
      width: 156px;
      padding: 10px;
      border-radius: 5px;
      border: 2px solid transparent;
      @include transition;
      P:first-child {
        font-weight: bold;
        font-size: 16px;
      }
      &:hover {
        border-color: $mainColor;
      }
      &.isSelect {
        border-color: $mainColor;
      }
    }
    .ivu-modal-footer {
      display: none;
    }
    .default-text {
      background-color: #fff;
      height: 52px;
      border-radius: 15px;
      padding: 0 20px;
      line-height: 52px;
      text-align: center;
      font-size: 18px;
      color: rgb(241, 140, 107);
      margin-bottom: 20px;
    }
    .active-text {
      background-color: #000;
    }
    .afford-evaluation-list {
      max-height: 250px;
      overflow-y: auto;
    }

    .tag {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      margin: 16px 12px 2px 0;
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
    .close-tag {
      display: inline-block;
      font-size: 14px;
      transform: scale(1.42857143) rotate(0);
      cursor: pointer;
      margin-left: 8px;
      color: inherit;
      opacity: .66;
      position: relative;
      top: 0;
      line-height: 20px;
    }
    .select-tag-bg {
      background-color: $mainColor;
      color: #fff;
      border-color: $mainColor;
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

    .user-clause-model {
      @include fullScreenModel;
    }

    .camera {
      width: 58px;
      height: 58px;
      line-height: 58px;
    }

    .baby-info-present {
      width: 97%;
      margin: 20px auto;
      .baby-info-present-title {
        height: 36px;
        line-height: 36px;
        background-color: #DDDDDD;
        padding-left: 6px;
        font-size: 14px;
        color: #000;
        border-radius: 5px 5px 0 0;
      }
      .baby-info-present-con {
        border: 2px solid #ddd;
        border-radius: 0 0 5px 5px;
      }
    }

    .select-store {
      background-color: #FFF4F1;
      color: $mainColor;
      cursor: pointer;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 5px;
      position: relative;
      @include transition;
      &:hover {
        border-color: $mainColor;
      }
      &.isSelect {
        border-color: $mainColor;
      }

    }

    .svip-upgrade {
      display: inline-block;
      border-radius: 5px;
      border: 1px solid #FFCD00;
      text-align: center;
      padding: 2px 8px;
      color: #FF8C2B;
      background-color: #FFFC00;
      cursor: pointer;
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

    .add-btn-bg-color {
      background-color: #fff;
    }

    .value-added-charge {
      border-top: 2px solid #EFE8DB;
      padding: 10px 0 0 0;
    }

    .keyword-plan {
      margin: 20px 16px;
      border: 2px solid #ddd;
      padding-bottom: 20px;
      border-radius: 5px;
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

    .camera-evaluation {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }

    .pt-18 {
      padding-top: 18px;
    }

    .text-orange {
      color: #fd6b22;
    }

    .common-service {
      display: inline-block;
      width: 86px;
      height: 24px;
      background-color: #E5E5E5;
      border: 1px solid #ccc;
      border-radius: 12px;
      background-repeat: no-repeat;
      background-position: 4px 2px;
      padding-left: 25px;
      text-align: left;
      font-size: 14px;
      color: #000;
      margin-top: 10px;
      &.qq-service {
        background-image: url("~assets/img/common/qq-icon.png");
      }
    }
  }

</style>
