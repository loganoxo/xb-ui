<template>
  <div class="task-release">
    <div class="task-release-title">发布活动</div>
    <!--发布活动流程说明-->
    <div class="flow-title mt-10 mb-20 clear">
      <div class="inline-block flow-title-first left">平台流程</div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">1</div>
        <div class="inline-block step-text left">商家提交活动申请，预付活动担保金，等待平台审核。</div>
        <icon class="left mt-20 mr-5" type="chevron-right" size="30" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">2</div>
        <div class="inline-block step-text left">活动上线后，商家可审核来申请评测的拿手旺旺号。</div>
        <icon class="left mt-20 mr-5" type="chevron-right" size="30" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">3</div>
        <div class="inline-block step-text left">通过的拿手按商家指定的下单方式去淘宝下单（拿手先垫付）。</div>
        <icon class="left mt-20 mr-5" type="chevron-right" size="30" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">4</div>
        <div class="inline-block step-text left">拿手收到宝贝后，提交买家秀（即淘宝评价）。</div>
        <icon class="left mt-20 mr-5" type="chevron-right" size="30" color="#ccc"/>
      </div>
      <div class="inline-block step left clear">
        <div class="inline-block step-number left">5</div>
        <div class="inline-block step-text left">商家审核完买家秀后向拿手返款，活动圆满结束。</div>
      </div>
    </div>
    <div class="activity-tip mb-20">
      <icon type="information-circled" color="#FF0100"/>
      <span><b class="sizeColor3">注意：</b> 1、请关闭活动链接淘客计划；2、请确认关键词能够找到；3、严厉杜绝活动期间改价；</span>
    </div>
    <div class="service-statement cl666 text-ct">
      声明：为避免纠纷，发布活动前请先阅读本平台的服务条款，凡成功提交活动申请皆默认亲已仔细阅读并同意平台的<span class="blue cursor-p" @click="isShowUserClause = true">《服务条款》</span></div>
    <div class="text-ct mt-20" v-if="stepName === 'information'">
      <i-button type="primary" @click="goTaskCreate">启用完整版发布通道</i-button>
    </div>
    <!--选择活动类型-->
    <!--<div class="activity-type mt-20" v-show="stepName === 'information'">
      <div class="activity-type-title">请选择活动类型：</div>
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
    <!--填写活动信息详情-->
    <div class="activity-con mt-20">
      <div class="activity-info" v-show="stepName === 'information'">
        <div class="activity-info-title">目标推广宝贝信息</div>
        <div class="baby-url ml-20 mt-20">
          <span class="required">宝贝链接：</span>
          <i-input v-model="taskRelease.itemUrl" placeholder="请输入宝贝链接" class="width-300" @on-blur="getStoreInfo"/>
        </div>
        <div class="baby-title ml-20 mt-20">
          <span class="required">店铺名称：</span>
          <i-input v-model="taskRelease.realStoreName" placeholder="请输入店铺名称" style="width: 296px"/>
        </div>
        <div class="baby-title ml-20 mt-20">
          <span class="required">掌柜旺旺：</span>
          <i-input v-model="taskRelease.storeName" placeholder="请输入掌柜旺旺" style="width: 296px"/>
        </div>
        <div class="baby-price ml-20 mt-20">
          <span class="required">宝贝单价：</span>
          <i-input v-model.number="taskRelease.itemPrice" placeholder="请输入宝贝单价" style="width: 120px"/>
          <span>元</span>
          <span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 1" class="main-color ml-15"><icon
            color="#f9284f" type="information-circled"/>&nbsp;每份评测品的价值必须在1元以上</span>
          <span class="sizeColor2 ml-5" v-show="!taskRelease.itemPrice || taskRelease.itemPrice > 1">（活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的拿手，商家账号按相应规则处罚）</span>
        </div>
        <div v-show="taskRelease.activityCategory === 'present_get'" class="order-quantity  ml-20 mt-20 mb-20">
          <span class="required">拍下数量：</span>
          <i-input v-model.number="taskRelease.orderQuantity" placeholder="请输入拍下数量"
                   style="width: 120px"/>
          <span>份</span>
          <span class="sizeColor2 ml-4">（每单需要拍下的件数）</span>
        </div>
        <div class="activity-info-title mt-20">白拿拿活动展示信息</div>
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
          <span class="sizeColor2">（<icon v-show="taskNameLength > 60" color="#f9284f" type="information-circled"/>&nbsp;此处填宝贝名称，突出宝贝特点，勿填无关内容，最多支持60个字符，当前已输入  <span
            class="main-color">{{taskNameLength}}</span> / 60个字符）</span>
        </div>
        <div class="baby-title ml-20 mt-20">
          <span class="required">宝贝类型：</span>
          <i-select v-model="taskRelease.itemType" style="width:200px">
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
            <upload class="left ml-4"
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
        <div v-show="taskRelease.activityCategory === 'present_get'" class="baby-price ml-10 mt-20">
          <span class="required">展示价格：</span>
          <i-input v-model.number="taskRelease.presentPrice" placeholder="请输入活动展示价格" style="width: 120px"/>
          <span>元</span>
        </div>
        <div class="baby-number ml-10 mt-20">
          <p>
            <span class="required">活动份数：</span>
            <i-input v-model.number="taskRelease.taskCount" placeholder="请输入活动份数" style="width: 120px"/>
            <span>份</span>
          </p>
        </div>
        <div class="product-introduction ml-10 mt-20">
          <span class="left required">商品简介：</span>
          <quill-editor ref="myTextEditorPresent" v-model="taskRelease.itemDescription" :options="editorOption">
          </quill-editor>
          <input v-show="false" id="presentGet" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImgPresentGet">
        </div>
        <div class="order-set mt-22">
          <div class="activity-info-title">进店方式设置</div>
          <div class="activity-type ml-40 mt-22">
            <span class="required">进店方式：</span>
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
            <div class="baby-main-img ml-5 mt-20 clear">
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
            <div class="matching-num ml-5 mt-20">
              <span class="required">关键词匹配人数：</span>
              <i-input v-model.number="pcTaskDetail.countAssigned" placeholder="请输入匹配人数" style="width: 160px"/>
              <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <i-input v-model="pcTaskDetail.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"/>
              <span class="sizeColor2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
                <span class="required">排序方式：</span>
                <radio-group v-model="pcTaskDetail.searchSort">
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
              <i-input v-model.number="pcTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格" style="width: 160px"/>
              <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>第</span>
              <i-input v-model.number="pcTaskDetail.searchPagePositionMin" style="width: 40px"/>
              <span>---</span>
              <i-input v-model.number="pcTaskDetail.searchPagePositionMax" style="width: 40px"/>
              <span>页</span>
              <span class="sizeColor2 ml-15">（宝贝参考位置页数差值最大值不大于3页，如果PC端排名在10页以后， 可使用下面的卡条件功能）</span>
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
            <div class="matching-num ml-40 mt-20">
              <span class="required">关键词匹配人数：</span>
              <i-input v-model.number="appTaskDetail.countAssigned" placeholder="请输入匹配人数" style="width: 160px"/>
              <span class="sizeColor2">（为当前关键词分配拿手，表示需要几个拿手使用该关键词进店成交，最小为1）</span>
            </div>
            <div class="search-keyword mt-20 ml-28">
              <span class="required">搜索关键词：</span>
              <i-input v-model="appTaskDetail.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"/>
              <span class="sizeColor2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
            </div>
            <div class="sort-by ml-40 mt-20">
              <span class="required">排序方式：</span>
              <radio-group v-model="appTaskDetail.searchSort">
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
              <i-input v-model="appTaskDetail.searchPagePrice" placeholder="请输入搜索列表页展示价格" style="width: 160px"/>
              <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
            </div>
            <div class="baby-location ml-15 mt-20">
              <span class="required">宝贝搜索位置：</span>
              <span>从上往下数第</span>
              <i-input v-model="appTaskDetail.searchRankPosition" style="width: 40px"/>
              <span>个宝贝左右</span>
              <p class="sizeColor2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以后，可使用下面的卡条件功能）</p>
            </div>
            </template>
          <!--淘口令下单设置-->
          <template v-else-if="taskRelease.taskType === 'tao_code'">
            <div class="tao-code ml-56 mt-20">
              <span class="required">淘口令：</span>
              <i-input v-model="taoCodeTaskDetail.taoCode" placeholder="请输入任务宝贝的淘口令" style="width: 320px"/>
            </div>
          </template>
        </div>
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
              元 &nbsp;<span class="main-color">（您是首次放单，享受首单推广费减免）</span>
            </p>
            <p class="mt-6">总费用 = 活动担保金 + 总推广费 = <span>{{(orderMoney / 100).toFixed(2)}}</span> 元</p>
            <p class="mt-6" v-if="!isBalance">手续费说明： 使用支付宝充值支付，支付宝会收取0.6%的手续费，该笔费用需要商家承担，手续费不予退还，敬请谅解！<a
              @click="isShowAliPayTip = true">查看支付宝官方说明</a></p>
          </div>
        </div>
        <div class="pay-info mt-40" v-if="isBalance && !priceHasChange">本次总共要支付的金额为：<span class="second-color">{{(orderMoney / 100).toFixed(2)}}</span>&nbsp;元。您的账户的当前余额为：<strong>{{(getUserBalance
          / 100).toFixed(2)}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalance && !priceHasChange">本次总共要支付的金额为：<strong>{{(orderMoney / 100).toFixed(2)}}</strong>&nbsp;元。您账户余额为：<strong>{{(getUserBalance / 100).toFixed(2)}}</strong>&nbsp;元，还需充值：<span
          class="second-color">{{(needPayMoneyBefore / 100).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="pay-info mt-40" v-if="isBalanceReplenish && priceHasChange">
          该任务已付总费用 <strong>{{paidDeposit.toFixed(2)}}</strong>元，本次修改需要支付超出部分的金额为：<strong class="main-color">{{(replenishMoney
          / 100).toFixed(2)}}</strong>元。您账号的当前余额为：<strong>{{(getUserBalance / 100).toFixed(2) || 0}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalanceReplenish && priceHasChange">该任务已付担保金 <strong>{{(paidDeposit).toFixed(2)}}</strong>元，本次修改需要支付超出部分的金额为：<strong
          class="main-color">{{(replenishMoney / 100).toFixed(2)}}</strong>元。您账号的当前余额为：<strong>{{(getUserBalance /
          100).toFixed(2)
          || 0}}</strong>&nbsp;元,还需充值：<span
          class="second-color">{{(needPayMoneyBefore / 100).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="description-fees-footer">
          <span class="pay-btn" v-if="isBalance" @click="openRecharge">前去支付</span>
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
    <!--填写完成活动信息下一步按钮-->
    <i-button class="fs-18 mt-20" type="primary" long :loading="taskLoading" v-show="stepName === 'information'" @click="stepNext">下一步</i-button>
    <!--活动担保金支付弹框-->
    <div class="pay-model" v-if="showPayModel">
      <PayModel ref="payModelRef" :orderMoney="needPayMoneyBefore" @confirmPayment="confirmPayment"
                :isShowUpgradeVIP="true" :isBalance="isBalance">
        <i slot="closeModel" class="close-recharge" @click="closeRecharge">&times;</i>
        <div slot="noBalance" class="title-tip">
          <span class="sizeColor3"><icon color="#FF2424" size="18px" type="md-alert"/><span class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{needPayMoneyAfterText}}</strong>元
          <span @click="isShowAliPayTip = true">【<span class="blue cursor-p">支付宝手续费</span>】</span>
        </div>
        <div slot="isBalance" class="title-tip">
          <icon color="#FF2424" size="18px" type="md-alert"/>
          <span class="ml-10">您本次需要支付金额为 <span class="sizeColor3">{{!priceHasChange ? (orderMoney / 100).toFixed(2) : (replenishMoney / 100).toFixed(2)}}</span> 元。</span>
        </div>
      </PayModel>
    </div>
    <!--用户修改价格比原始价格高需要补差价提示弹框-->
    <modal v-model="editPriceAfterModel">.
      <div class="clear mt-10">
        <div class="left mt-5">
          <icon color="#f9284f" size="32" type="information-circled"/>
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
          <icon color="#f9284f" size="32" type="information-circled"/>
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
    <!--示例图查看-->
    <modal title="示例图片查看" v-model="isShowExampleImageModel">
      <img :src="exampleImageUrl" style="width: 100%">
    </modal>
    <!--支付宝手续费说明弹框-->
    <modal v-model="isShowAliPayTip">
      <img src="~assets/img/common/ali-pay-tip.jpg"/>
    </modal>
    <!--服务条款弹框-->
    <div v-if="isShowUserClause" class="user-clause-model">
      <user-clause @closeClauseModel="closeClauseModel"/>
    </div>
    <!--店铺信息检测loading弹框-->
    <modal v-model="isShowInfoLoading" :closable="false" :mask-closable="false" width="360">
      <div slot="header"></div>
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="text-ct mt-46 fs-16">宝贝信息获取中，请稍后...</div>
      <div slot="footer"></div>
    </modal>
    <!--爬虫抓取宝贝链接对应的店铺信息失败提示弹框-->
    <modal v-model="isGetInfoError" :closable="false" :mask-closable="false" width="360">
      <p slot="header" class="text-ct">
        <icon color="#f9284f" type="information-circled"/>
        <span class="main-color">温馨提示</span>
      </p>
      <div class="text-ct">
        <p>宝贝链接对应的店铺信息获取失败</p>
        <p>请核实宝贝链接的完整性或者稍后重试</p>
      </div>
      <div slot="footer">
        <iButton type="error" size="large" long @click="isGetInfoError = false">我知道了</iButton>
      </div>
    </modal>
  </div>
</template>

<script>
  import {Icon, Form, Input, Button, Radio, Modal, Select, Option, OptionGroup, Poptip} from 'iview'
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Upload from '@/components/Upload'
  import PayModel from '@/components/PayModel'
  import UserClause from '@/components/UserClause'
  import {aliCallbackImgUrl} from '@/config/env'
  import api from '@/config/apiConfig'
  import {isPositiveInteger, isNumber, isInteger, isAliUrl, randomString, extendDeep, decode, setStorage, getStorage, getUrlParams, isInternetUrl, delHtmlTag} from '@/config/utils'
  import aliUploadConfig from '@/config/aliUploadConfig'

  export default {
    name: 'fast-task-release',
    components: {
      quillEditor: quillEditor,
      iInput: Input,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iSelect: Select,
      iOption: Option,
      PopTip: Poptip,
      Upload: Upload,
      OptionGroup: OptionGroup,
      Modal: Modal,
      PayModel: PayModel,
      UserClause: UserClause,
    },
    data() {
      return {
        name: 'base-example',
        uniqueId: 'uniqueId',
        addImgRangeFreeGet: null,
        addImgRangePresentGet: null,
        editorOption: {
          placeholder: "有吸引力的产品介绍，将吸引更多的拿手来申请活动哦！请在这里编辑您的商品简介（商品简介中至少包含一张图片，可以直接复制淘宝的宝贝详情到这里），但请注意，不要在该简介中，放置任何外链，比如店铺或者商品链接，以免申请的拿手绕过相应的下单条件，造成损失！",
          modules: {
            toolbar: [
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
        },
        showPayModel: false,
        stepName: 'information',
        taskLoading: false,
        taskPayId: null,
        editTaskId: null,
        itemCatalogList: [],
        mainDefaultList: [],
        pcDefaultList: [],
        appDefaultList: [],
        taoCodeDefaultList: [],
        pcTaskDetail: {
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
        },
        appTaskDetail: {
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
        },
        taoCodeTaskDetail: {
          taoCode: null,
          accessDescription: null,
          homePageLockItemImage: null,
          homePageLockItemPrice: null,
        },
        taskRelease: {
          taskType: 'pc_search',
          orderType: 'normal',
          taskDaysDuration: 3,
          onlyShowForQualification: false,
          showkerOrderTimeLimit: 24,
          dayReserveToNow: false,
          refuseOldShowker: false,
          refuseOldShowkerFor30Days: false,
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
          pinkage: true,
          donotPostPhoto: true,
          paymentMethod: 'no_hua_and_credit_pay',
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
        },
        editPriceAfterModel: false,
        editPriceToLowAfterModel: false,
        priceHasChange: false,
        paidDeposit: 0,
        taskStatus: null,
        isShowUserClause: false,
        isShowExampleImageModel: false,
        exampleImageUrl: null,
        isShowAliPayTip: false,
        isShowInfoLoading: false,
        isGetInfoError: false,
        upgradeMembershipModal: false,
        temporaryImageSrc: null,
        temporaryTaskName: null,
      }
    },
    mounted() {
    /*  const _this = this;
      const imgHandlerPresentGet = async function (image) {
        _this.addImgRangePresentGet = _this.$refs.myTextEditorPresent.quill.getSelection();
        if (image) {
          let fileInput = document.getElementById('presentGet');
          fileInput.click()
        }
      };
      _this.$refs.myTextEditorPresent.quill.getModule("toolbar").addHandler("image", imgHandlerPresentGet);*/
    },
    created() {
      this.getItemCatalog();
      const taskId = decode(this.$route.query.q);
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
       * 从vuex中获取用户账户余额
       * @return {number}
       */
      getUserBalance() {
        return this.$store.getters.getUserBalance
      },

      /** 获取用户会员版本等级（100：普通用户， 200：VIP， 300：SVIP）
       * @return {Number}
       */
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },

      /**
       * 计算拍A发A最终商家发布单品活动担保金（宝贝单价 + 邮费）
       * @return {number}
       */
      oneBond() {
        return this.taskRelease.pinkage ? 100 * this.taskRelease.itemPrice : (100 * this.taskRelease.itemPrice + 1000);
      },

      /**
       * 计算拍A发B最终商家发布单品活动担保金（A宝贝单价 * 拍下数量 + 邮费）
       * @return {number}
       */
      oneBondAToB() {
        return this.taskRelease.pinkage ? this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 : (this.taskRelease.itemPrice * this.taskRelease.orderQuantity * 100 + 1000);
      },

      /**
       * 计算最终单品推广费用（打赏费）
       * @return {number}
       */
      onePromotionExpenses() {
        return 0
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
       * 计算总推广费用
       * @return {number}
       */
      allPromotionExpenses() {
        return this.onePromotionExpenses * this.taskRelease.taskCount;
      },

      /**
       * 计算订单总金额
       * @return {number}
       */
      orderMoney() {
        if (this.taskRelease.activityCategory === 'free_get') {
          return (this.taskRelease.taskCount * this.oneBond) + this.allPromotionExpenses
        }
        if (this.taskRelease.activityCategory === 'present_get') {
          return (this.taskRelease.taskCount * this.oneBondAToB) + this.allPromotionExpenses
        }
      },

      /**
       * 计算修改价格后需要补充的金额
       * @return {number}
       */
      replenishMoney() {
        return this.priceHasChange ? this.orderMoney - this.paidDeposit * 100 : 0;
      },

      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance() {
        if (this.priceHasChange) {
          return this.replenishMoney <= this.getUserBalance
        } else {
          return this.orderMoney <= this.getUserBalance
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
       * 计算当用户账户余额足以支付活动所需金额要额外充值的金额
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

      /** 计算充值界面上的金额文本显示
       * @return {String}
       */
      needPayMoneyAfterText() {
        return !this.isBalance ? `${(this.needPayMoneyBefore / 100).toFixed(2)} + ${(((Math.ceil(this.needPayMoneyBefore / 0.994)) - this.needPayMoneyBefore) / 100).toFixed(2)}` : ''
      },

      /**
       * 计算活动标题输入字符数
       * @return {number}
       */
      taskNameLength() {
        return this.taskRelease.taskName ? this.taskRelease.taskName.replace(/[\u0391-\uFFE5]/g,"aa").length : 0
      },
    },
    methods: {
      changeSelectActivity(type) {
        const _this = this;
        _this.taskRelease.activityCategory = type;
        if (type === 'present_get') {
          _this.taskRelease.taskName = null;
          _this.taskRelease.taskMainImage = null;
          _this.pcTaskDetail.itemMainImage = null;
          _this.appTaskDetail.itemMainImage = null;
          _this.mainDefaultList = [];
          _this.pcDefaultList = [];
          _this.appDefaultList = [];
        } else {
          if (_this.temporaryImageSrc) {
            _this.taskRelease.taskMainImage = _this.temporaryImageSrc;
            _this.pcTaskDetail.itemMainImage = _this.temporaryImageSrc;
            _this.appTaskDetail.itemMainImage = _this.temporaryImageSrc;
            _this.mainDefaultList.push({src: _this.temporaryImageSrc});
            _this.pcDefaultList.push({src: _this.temporaryImageSrc});
            _this.appDefaultList.push({src: _this.temporaryImageSrc});
          }
          if (_this.temporaryTaskName) {
            _this.taskRelease.taskName = _this.temporaryTaskName;
          }
        }

      },
      goTaskCreate() {
        const query = this.$route.query.q;
        if (query) {
          this.$router.push({name: 'TaskRelease', query:{q: query}})
        } else {
          this.$router.push({name: 'TaskRelease'})
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
      getStoreInfo() {
        const _this = this;
        if (!_this.taskRelease.itemUrl) {
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
        const commodityId = getUrlParams(_this.taskRelease.itemUrl, 'id');
        _this.isShowInfoLoading = true;
        api.getItemInfoById({
          commodityId: commodityId
        }).then(res => {
          _this.isShowInfoLoading = false;
          if (res.status) {
            if (res.data) {
              _this.taskRelease.realStoreName = res.data.store.name;
              _this.taskRelease.storeName = res.data.store.wangwangId;
              _this.temporaryImageSrc = res.data.picUrl;
              _this.temporaryTaskName = (delHtmlTag(decodeURI(res.data.title))).replace(/\s+/g,'');
              if (_this.taskRelease.activityCategory === 'free_get') {
                _this.taskRelease.taskName = delHtmlTag(decodeURI(res.data.title));
                _this.taskRelease.taskMainImage = res.data.picUrl;
                _this.pcTaskDetail.itemMainImage = res.data.picUrl;
                _this.appTaskDetail.itemMainImage = res.data.picUrl;
                _this.mainDefaultList = [];
                _this.mainDefaultList.push({src: res.data.picUrl});
                _this.pcDefaultList = [];
                _this.pcDefaultList.push({src: res.data.picUrl});
                _this.appDefaultList = [];
                _this.appDefaultList.push({src: res.data.picUrl});
              }
            } else {
              _this.isGetInfoError = true;
            }
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      taskTypeChange() {
        if (this.pcTaskDetail.itemMainImage) {
          this.pcDefaultList = [];
          this.pcDefaultList.push({src: this.pcTaskDetail.itemMainImage})
        }
        if (this.appTaskDetail.itemMainImage) {
          this.appDefaultList = [];
          this.appDefaultList.push({src: this.appTaskDetail.itemMainImage})
        }
      },
      handleSuccess(res) {
        this.taskRelease.taskMainImage = aliCallbackImgUrl + res.name;
      },
      pcBabyImgSuccess(res) {
        this.pcTaskDetail.itemMainImage = aliCallbackImgUrl + res.name;
      },
      appBabyImgSuccess(res) {
        this.appTaskDetail.itemMainImage = aliCallbackImgUrl + res.name;
      },
      taoCodeImgSuccess(res) {
        this.taoCodeTaskDetail.itemMainImage = aliCallbackImgUrl + res.name;
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
        const _this = this;
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
        if (!_this.taskRelease.taskCount) {
          _this.$Message.warning('亲，宝贝数量不能为空或者0！');
          return;
        }
        if (!isInteger(_this.taskRelease.taskCount * 1)) {
          _this.$Message.warning('亲，宝贝数量必须为数字！');
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
        if (_this.taskRelease.itemPrice < 1) {
          _this.$Message.warning('亲，每份评测品的价值必须在1元以上！');
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
          if (_this.taskRelease.presentPrice < 10) {
            _this.$Message.warning('亲，为保证活动质量和效果，平台展示价格需要在10元以上！');
            return;
          }
        }

        if (_this.taskRelease.remark && _this.taskRelease.remark.length > 300) {
          _this.$Message.warning('亲，下单要求说明不能超过300个字！');
          return;
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
        if (_this.taskRelease.taskType === 'pc_search') {
          if (!_this.pcTaskDetail.itemMainImage) {
            _this.$Message.warning('亲，请上传PC搜索宝贝主图！');
            return;
          }
          if (!_this.pcTaskDetail.countAssigned) {
            _this.$Message.warning('亲，请输入关键词匹配人数！');
            return;
          }
          if (_this.pcTaskDetail.countAssigned !== _this.taskRelease.taskCount) {
            _this.$Message.warning('亲，关键词匹配人数需要跟宝贝份数一致！');
            return;
          }
          if (!_this.pcTaskDetail.searchKeyword) {
            _this.$Message.warning('亲，PC搜索关键词不能空！');
            return;
          }
          if (!_this.pcTaskDetail.searchPagePrice) {
            _this.$Message.warning('亲，PC搜索中的展示价格不能空！');
            return;
          }
          if (!isNumber(_this.pcTaskDetail.searchPagePrice)) {
            _this.$Message.warning('亲，PC搜索中的展示价格必须为数字！');
            return;
          }
          if (!_this.pcTaskDetail.searchPagePositionMin) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索起始位置不能空！');
            return;
          }
          if (!_this.pcTaskDetail.searchPagePositionMax) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索结束位置不能空！');
            return;
          }
          if (!isInteger(_this.pcTaskDetail.searchPagePositionMin)) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索起始位置必须为正整数！');
            return;
          }
          if (!isInteger(_this.pcTaskDetail.searchPagePositionMax)) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索结束位置必须为正整数！');
            return;
          }
          if (_this.pcTaskDetail.searchPagePositionMax < _this.pcTaskDetail.searchPagePositionMin) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索位置起始页不能大于结束页！');
            return;
          }
          if (_this.pcTaskDetail.searchPagePositionMax - _this.pcTaskDetail.searchPagePositionMin > 2) {
            _this.$Message.warning('亲，PC搜索中的宝贝搜索位置页数差值最大不大于3页！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'app_search') {
          if (!_this.appTaskDetail.itemMainImage) {
            _this.$Message.warning('亲，请上传手淘搜索宝贝主图！');
            return;
          }
          if (_this.appTaskDetail.countAssigned !== _this.taskRelease.taskCount) {
            _this.$Message.warning('亲，关键词匹配人数需要跟宝贝份数一致！');
            return;
          }
          if (_this.appTaskDetail.countAssigned > _this.taskRelease.taskCount) {
            _this.$Message.warning('亲，关键词匹配人数不能大于宝贝数量！');
            return;
          }
          if (!_this.appTaskDetail.searchKeyword) {
            _this.$Message.warning('亲，手淘搜索中的搜索关键词不能空！');
            return;
          }
          if (!_this.appTaskDetail.searchPagePrice) {
            _this.$Message.warning('亲，手淘搜索中的展示价格不能空！');
            return;
          }
          if (!isNumber(_this.appTaskDetail.searchPagePrice)) {
            _this.$Message.warning('亲，手淘搜索中的展示价格必须为数字！');
            return;
          }
          if (!_this.appTaskDetail.searchRankPosition) {
            _this.$Message.warning('亲，手淘搜索中的宝贝搜索位置不能空！');
            return;
          }
          if (!isInteger(_this.appTaskDetail.searchRankPosition)) {
            _this.$Message.warning('亲，手淘搜索中的宝贝搜索位置需为正整数！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'tao_code') {
          if (!_this.taoCodeTaskDetail.taoCode) {
            _this.$Message.warning('亲，任务宝贝淘口令不能为空！');
            return;
          }
        }
        const IMG_HREF_ATTRIBUTE = /(href|target)=["|'].*?["|']/g;
        if (IMG_HREF_ATTRIBUTE.test(_this.taskRelease.itemDescription)) {
          _this.taskRelease.itemDescription = _this.taskRelease.itemDescription.replace(IMG_HREF_ATTRIBUTE, '');
        }
        let status = _this.taskStatus;
        if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit * 100 === _this.orderMoney) {
          _this.taskCreate(true);
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit * 100 > _this.orderMoney) {
          this.editPriceToLowAfterModel = true;
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > 0 && _this.paidDeposit * 100 < _this.orderMoney) {
          _this.editPriceAfterModel = true;
          _this.priceHasChange = true;
        } else {
          _this.taskCreate(false);
        }
      },
      taskCreate (type) {
        const _this = this;
        _this.taskLoading = true;
        _this.taskRelease.itemIssue = JSON.stringify([]);
        _this.taskRelease.itemReviewAssignString = JSON.stringify([]);
        _this.taskRelease.mainTaskVasConfigIds = JSON.stringify([]);
        _this.taskRelease.similarTaskVasConfigIds = JSON.stringify([]);
        const pcTaskDetailClone = [extendDeep(_this.pcTaskDetail)];
        const appTaskDetailClone = [extendDeep(_this.appTaskDetail)];
        const taoCodeTaskDetailClone = [extendDeep(_this.taoCodeTaskDetail)];
        switch (_this.taskRelease.taskType) {
          case 'pc_search' :
            pcTaskDetailClone[0].searchPagePrice = (pcTaskDetailClone[0].searchPagePrice * 100).toFixed(2) * 1;
            pcTaskDetailClone[0].priceRangeMax = pcTaskDetailClone[0].priceRangeMax > 0 ? (pcTaskDetailClone[0].priceRangeMax * 100).toFixed(2) * 1 : null;
            pcTaskDetailClone[0].priceRangeMin = pcTaskDetailClone[0].priceRangeMin > 0 ? (pcTaskDetailClone[0].priceRangeMin * 100).toFixed(2) * 1 : null;
            _this.taskRelease.taskDetail = JSON.stringify(pcTaskDetailClone);
            break;
          case 'app_search' :
            appTaskDetailClone[0].searchPagePrice = (appTaskDetailClone[0].searchPagePrice * 100).toFixed(2) * 1;
            appTaskDetailClone[0].priceRangeMax = appTaskDetailClone[0].priceRangeMax > 0 ? (appTaskDetailClone[0].priceRangeMax * 100).toFixed(2) * 1 : null;
            appTaskDetailClone[0].priceRangeMin = appTaskDetailClone[0].priceRangeMin > 0 ? (appTaskDetailClone[0].priceRangeMin * 100).toFixed(2) * 1 : null;
            _this.taskRelease.taskDetail = JSON.stringify(appTaskDetailClone);
            break;
          case 'tao_code' :
            taoCodeTaskDetailClone[0].homePageLockItemPrice = taoCodeTaskDetailClone[0].homePageLockItemPrice > 0 ? (taoCodeTaskDetailClone[0].homePageLockItemPrice * 100).toFixed(2) * 1 : null;
            _this.taskRelease.taskDetail = JSON.stringify(taoCodeTaskDetailClone);
            break;
          case 'direct_access' :
            _this.taskRelease.taskDetail = JSON.stringify([]);
            break;
        }
        api.taskCreateFast(_this.taskRelease).then(res => {
          if (res.status) {
            _this.taskPayId = res.data.id;
            if (!_this.taskRelease.taskId) {
              _this.taskRelease.taskId = res.data.id;
            }
            if (type === true) {
              _this.$router.push({name: 'ActivitiesList'});
            } else {
              _this.stepName = 'deposit';
            }
          } else {
            _this.$Message.error(res.msg);
          }
          _this.taskLoading = false;
        });
      },
      getTaskInfo() {
        const _this = this;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            _this.taskRelease.taskId = res.data.id;
            _this.mainDefaultList = [];
            _this.pcDefaultList = [];
            _this.appDefaultList = [];
            _this.taoCodeDefaultList = [];
            _this.answerDefaultList = [];
            _this.paidDeposit = (res.data.marginPaid + res.data.promotionExpensesPaid + res.data.vasFeePaid) / 100 || 0;
            _this.taskStatus = res.data.taskStatus;
            _this.mainDefaultList.push({src: res.data.taskMainImage});
            for (let k in _this.taskRelease) {
              for (let i in res.data) {
                if (k === i) {
                  _this.taskRelease[k] = res.data[i]
                }
              }
            }
            _this.taskRelease.presentPrice = _this.taskRelease.presentPrice / 100;
            _this.taskRelease.itemPrice = _this.taskRelease.itemPrice / 100;
            _this.taskRelease.taskDetail = {};
            if (res.data.taskType === 'tao_code') {
              _this.taoCodeTaskDetail = res.data.taskDetailObject[0];
              const image = _this.taoCodeTaskDetail.homePageLockItemImage;
              image && _this.taoCodeDefaultList.push({src: image});
              _this.taoCodeTaskDetail.itemMainImage = image;
              _this.conversionPrice('tao_code');
            } else if (res.data.taskType === 'pc_search') {
              _this.pcTaskDetail = res.data.taskDetailObject[0];
              _this.pcDefaultList.push({src: _this.pcTaskDetail.itemMainImage});
              _this.conversionPrice('pc_search');
            } else if (res.data.taskType === 'app_search') {
              _this.appTaskDetail = res.data.taskDetailObject[0];
              _this.appDefaultList.push({src: _this.appTaskDetail.itemMainImage});
              _this.conversionPrice('app_search');
            } else {
              _this.taskRelease.taskDetail = {};
            }
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      returnUpStep() {
        this.editTaskId = this.taskPayId;
        this.getTaskInfo();
        this.stepName = 'information';
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
      conversionPrice(type) {
        switch (type) {
          case 'pc_search' :
            this.pcTaskDetail.searchPagePrice = (this.pcTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            this.pcTaskDetail.priceRangeMax = this.pcTaskDetail.priceRangeMax > 0 ? (this.pcTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            this.pcTaskDetail.priceRangeMin = this.pcTaskDetail.priceRangeMin > 0 ? (this.pcTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
            break;
          case 'app_search' :
            this.appTaskDetail.searchPagePrice = (this.appTaskDetail.searchPagePrice / 100).toFixed(2) * 1;
            this.appTaskDetail.priceRangeMax = this.appTaskDetail.priceRangeMax > 0 ? (this.appTaskDetail.priceRangeMax / 100).toFixed(2) * 1 : null;
            this.appTaskDetail.priceRangeMin = this.appTaskDetail.priceRangeMin > 0 ? (this.appTaskDetail.priceRangeMin / 100).toFixed(2) * 1 : null;
            break;
          case 'tao_code':
            this.taoCodeTaskDetail.homePageLockItemPrice = this.taoCodeTaskDetail.homePageLockItemPrice > 0 ? (this.taoCodeTaskDetail.homePageLockItemPrice / 100).toFixed(2) * 1 : null;
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
        const key = 'task' + '/' + randomString();
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
      removeMainImage() {
        this.taskRelease.taskMainImage = null;
      },
      removeAppImage() {
        this.appTaskDetail.itemMainImage = null;
      },
      removePcImage() {
        this.pcTaskDetail.itemMainImage = null;
      },
      removeTaoCodeImage() {
        this.taoCodeTaskDetailItemMainImage = null;
      },
      openRecharge() {
        this.showPayModel = true;
      },
      closeRecharge() {
        this.showPayModel = false;
      },
      confirmPayment(pwd) {
        let _this = this;
        api.payByBalance({
          fee: _this.needPayMoneyAfter,
          payPassword: pwd,
          taskId: _this.taskPayId,
          type: _this.priceHasChange ? 'supply_pay' : 'first_pay'
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.showPayModel = false;
            _this.$Message.success('恭喜您，支付成功！');
            _this.stepName = 'audit';
          } else {
            _this.$Message.error(res.msg);
          }
          _this.$refs.payModelRef.payLoading = false;
        })
      },
      closeClauseModel() {
        this.isShowUserClause = false;
      },
      toTaskFans() {
        this.$router.push('/user/task-fans');
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
      margin-right: 5px;
    }

    .step {
      margin-left: 10px;
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

    .ml-38 {
      margin-left: 38px;
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
        @include sc(18px, #000);
        text-align: center;
      }
      .description-fees-footer {
        text-align: center;
        .pay-btn {
          display: inline-block;
          @include wh(120px, 36px);
          line-height: 36px;
          @include sc(18px, #fff);
          background-color: $mainColor;
          text-align: center;
          margin: 20px auto 42px auto;
          @include transition;
          cursor: pointer;
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
    .close-tag {
      display: inline-block;
      font-size: 14px;
      transform: scale(1.42857143) rotate(0);
      cursor: pointer;
      margin-left: 8px;
      color: inherit;
      opacity: .66;
      position: relative;
      top: 1px;
      line-height: 20px;
    }
    .select-tag-bg {
      background-color: $mainColor;
      color: #fff;
      border-color: $mainColor;
    }
    .tag-alert {
      width: 586px;
      margin: 20px 0 0 32px;
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
      }
      .baby-info-present-con {
        border: 2px solid #ddd;
      }
    }

  }
  .text-orange {
    color: #fd6b22;
  }
</style>
