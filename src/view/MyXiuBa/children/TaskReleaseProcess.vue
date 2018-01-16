<template>
  <div class="task-release">
    <div class="task-release-title">发布活动</div>
    <!--发布活动进度-->
    <div class="flow-title mt-10 mb-20">
      <Steps :current="current">
        <Step title="填写活动信息"></Step>
        <Step title="存入活动担保金"></Step>
        <Step title="等待审核"></Step>
        <Step title="活动上线"></Step>
      </Steps>
    </div>
    <div class="activity-tip mb-20">
      <Icon type="information-circled" color="#FF0100"></Icon>
      <span><b class="sizeColor3">注意：</b> 本站支持拍A发A（免费领），拍A发B（体验专区），满足商家的各种需求！</span>
    </div>
    <!--选择活动类型-->
    <div class="activity-type mt-20" v-show="stepName === 'information'">
      <div class="activity-type-title">选择活动类型：</div>
      <div class="clear mt-10">
        <div ref="showInsideText" class="left mr-10 activity-type-box" :class="{isSelect:taskRelease.activityCategory === 'free_get'}"
             @click="changeSelectActivity('free_get')">
          <p>免费领（拍A发A）</p>
          <p>秀客0元试用</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'free_get'"></span>
        </div>
        <div ref="showInsideText2" class="left activity-type-box mr-10" :class="{isSelect:taskRelease.activityCategory === 'present_get'}"
             @click="changeSelectActivity('present_get')">
          <p>体验专区（拍A发B）</p>
          <p>实际发的是赠品或体验装</p>
          <p>不可跨类目，否则会影响人群标签</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'present_get'"></span>
        </div>
       <!-- <div ref="showInsideText3" class="left activity-type-box mr-10" :class="{isSelect:taskRelease.activityCategory === 'pinkage_for_10'}"
             @click="changeSelectActivity('pinkage_for_10')">
          <p>10元包邮</p>
          <p>秀客承担10元邮费</p>
          <p>高人气活动类型</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'pinkage_for_10'"></span>
        </div>
        <div ref="showInsideText4" class="left activity-type-box mr-10" :class="{isSelect:taskRelease.activityCategory === 'price_low'}"
             @click="changeSelectActivity('price_low')">
          <p>白菜价</p>
          <p>帮商家测款定价</p>
          <p>真实卖货</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'price_low'"></span>
        </div>
        <div class="left activity-type-box mr-10" :class="{isSelect:taskRelease.activityCategory === 'goods_clearance'}"
             @click="changeSelectActivity('goods_clearance')">
          <p>清仓断码</p>
          <p>帮商家解决最为头疼的</p>
          <p>库存问题</p>
          <span class="is-select-gou" v-show="taskRelease.activityCategory === 'goods_clearance'"></span>
        </div>-->
      </div>
      <div class="pop-tip">
        <div v-show="taskRelease.activityCategory === 'free_get'">
          <div class="pop-tip-arrow free-get"></div>
          <div>该活动申请率极高，评价效果极好，商家能自主筛选秀客，迅速积攒销量。</div>
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
          <div>秀客以9.9元、49.9元、99.9元及1折、3折<!--、5折-->的价格购买宝贝，该活动也可适当降低活动成本，但更重要的是帮助商家真实成交，获得消费者的实际反馈。</div>
        </div>
        <div v-show="taskRelease.activityCategory === 'goods_clearance'">
          <div class="pop-tip-arrow goods-clearance"></div>
          <div>商家提供超乎想象的价格，目的不是为了赚取利润，而是尽快把仓库里积压的库存变成现金（比如断码，过季，尾货等），秀客也能真实选购到最最实惠的宝贝。</div>
        </div>
      </div>
    </div>
    <!--判断是否有权限能发布任务-->
    <div v-show="getMemberStatus === 'need_member_for_more_task' || getMemberStatus==='need_member_for_more_audit'"
         class="text-ct ">
      <div class="mt-80" style="font-size:20px;color: #949494" v-if="getMemberStatus === 'need_member_for_more_task'">
        <Icon style="font-size: 25px ;transform: translateY(3px)" type="close-circled"></Icon>
        <span><strong>很抱歉，当前你为非会员，购买会员后才能继续发布任务！</strong></span>
      </div>
      <div class="mt-80 ml-60" style="font-size:20px;color: #949494;text-align: left"
           v-if="getMemberStatus === 'need_member_for_more_audit'">
        <Icon class="mr-10" style="font-size: 25px ;transform: translateY(16px)" type="close-circled"></Icon>
        <span>
          <span><strong>很抱歉，当前你为非会员，仅支持免费发布一条活动（目前已存在一条待审核活动，请等待审核结果）。</strong></span><br>
          <span class="ml-38"><strong>请在购买会员后继续发布更多活动。</strong></span>
        </span>
      </div>
      <div class="mt-40 ">
        <iButton @click="openMember" class="check-member" type="success" size="large">购买会员</iButton>
      </div>
    </div>
    <!--任务发布相关-->
    <div v-show="blockOrNone" class="mt-30">
      <div class="activity-con" v-show="stepName === 'information'">
        <div class="activity-info">
          <div class="activity-info-title">填写活动信息</div>
          <div class="activity-type ml-60 mt-22">
            <span class="required">下单方式：</span>
            <Radio-group v-model="taskRelease.taskType">
              <Radio label="pc_search">
                <span>PC搜索下单（taobao.com）</span>
              </Radio>
              <Radio label="app_search">
                <span>手淘搜索下单（APP）</span>
              </Radio>
              <Radio label="tao_code">
                <span>淘口令下单（APP）</span>
              </Radio>
              <Radio label="direct_access">
                <span>宝贝链接下单（taobao.com）</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="activity-time ml-60 mt-20">
            <span class="required">活动时长：</span>
            <iInput v-model.number="taskRelease.taskDaysDuration" placeholder="请输入活动时长" style="width: 120px"></iInput>
            <span>天</span>
            <span class="main-color ml-10">请于活动结束后48小时内审批完成所有秀客资格，逾期系统将自动为您审批。</span>
            <p class="mt-6 pl-68">（单期活动时间为3-30天。）</p>
          </div>
          <div class="trial-condition ml-35 mt-20">
            <span class="ml-5">秀客申请条件：</span>
            <!--<Checkbox v-model="taskRelease.onlyShowForQualification">只有获得资格的秀客才可以查看活动信息</Checkbox>-->
            <!--<p class="pl-94 sizeColor mt-5">勾选后可以避免秀客私下索要资格，避免同行举报。但流量、收藏量、分享量会相对减少</p>-->
            <!--<p class="pl-94 mt-8">-->
              <Checkbox v-model="taskRelease.refuseOldShowker">拒绝已参加过本店活动的秀客再次申请</Checkbox>
            <!--</p>-->
          </div>
          <div class="trial-condition ml-60 mt-20">
            <span class="ml-4"> 收藏加购：</span>
            <Checkbox v-model="taskRelease.needBrowseCollectAddCart">需要</Checkbox>
            <span class="sizeColor">（系统会随机让部分秀客完成对宝贝的收藏加购，活动上线后您可以在生意参谋后台查看收藏加购有无增加）</span>
          </div>
          <div class="answer ml-60 mt-20">
            <span class="ml-4"> 浏览答题：</span>
            <Checkbox v-model="taskRelease.needBrowseCollectAddCart">需要</Checkbox>
            <span class="sizeColor">（保证秀客充分浏览详情首页，减少秒拍情况发生，最多可添加3个）</span>
            <p class="mt-10 pl-68">
              <i-input class="mr-5" v-for="(item,index) in browseAnswer" :key="index" type="text" placeholder="请输入浏览答题文案" style="width: 200px;"></i-input>
              <i-button class="ml-10" type="dashed" icon="plus-round" @click="addAnswer" v-show="browseAnswer < 3">添加</i-button>
              <i-button class="ml-10" type="dashed" icon="minus-round" @click="deleteAnswer" v-show="browseAnswer > 1">删除</i-button>
            </p>
            <p class="mt-6 pl-68 sizeColor">请在手机详情页面中挑选一段文案，建议5-10字左右，输入文本框内，秀客将提供本文案所在位置截图</p>
          </div>
          <div class="baby-info mt-22">
            <div class="activity-info-title">填写活动宝贝信息</div>
            <div class="complimentary-tip mt-20 pl-40" v-show="taskRelease.activityCategory === 'present_get'">
              <p class="sizeColor3">赠品活动发布说明：</p>
              <p class="sizeColor3 mt-6">1、活动标题、宝贝类型、活动主图、商品简介填写赠品相关信息；宝贝地址、掌柜旺旺、宝贝单价填写淘宝正品（即希望秀客拍下的SKU）相关信息；</p>
              <p class="sizeColor3">2、在备注中明确说明希望秀客拍下的SKU（否则秀客可能会找不到宝贝）。</p>
              <p class="sizeColor3">3、为了不影响人群标签，赠品类型必须与正品同属一个类目，否则后台审核不给予通过。</p>
            </div>
            <div class="baby-title ml-45 mt-20">
              <span class="required">活动标题：</span>
              <iInput v-model="taskRelease.taskName" placeholder="请输入活动标题" style="width: 296px"></iInput>
              <span class="ml-20 sizeColor"><Icon v-show="taskNameLength > 35" color="#f60"
                                                  type="information-circled"></Icon>&nbsp;最多支持35个字符，当前已输入 <span
                class="main-color">{{taskNameLength}}</span> / 35个字符。</span>
            </div>
            <div class="baby-title ml-45 mt-20">
              <span class="required">宝贝类型：</span>
              <iSelect v-model="taskRelease.itemType" style="width:200px">
                <Option-group v-for="parentItem in itemCatalogList" v-if="parentItem.level === 1" :label="parentItem.name" :key="parentItem.id">
                  <iOption
                    v-if="item.level === 2 && item.parentItemCatalog && item.parentItemCatalog.id === parentItem.id"
                    v-for="item in itemCatalogList" :value="item.id" :key="item.name">{{ item.name }}
                  </iOption>
                </Option-group>
              </iSelect>
              <span class="ml-20 main-color" v-if="taskRelease.itemType === 1003">旅行相关活动，仅支持飞猪的宝贝</span>
            </div>
            <div class="baby-img ml-45 mt-20">
              <span class="required left mt-20 mr-5">活动主图：</span>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="mainDefaultList"
                :on-remove="removeMainImage"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','gif','bmp']"
                :max-size="1024"
                name="task"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
              <p
                class="sizeColor pl-60 mt-10">点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致</p>
            </div>
            <div class="baby-url ml-45 mt-20">
              <span class="required">宝贝地址：</span>
              <iInput v-model="taskRelease.itemUrl" placeholder="请输入宝贝地址" style="width: 296px"></iInput>
            </div>
            <div class="store-name ml-45 mt-20">
              <span class="required">掌柜旺旺：</span>
              <iInput v-model="taskRelease.storeName" placeholder="请输入掌柜旺旺" style="width: 296px"></iInput>
            </div>
            <div class="baby-number ml-45 mt-20">
              <span class="required">宝贝数量：</span>
              <iInput v-model.number="taskRelease.taskCount" placeholder="请输入宝贝数量" style="width: 120px" @on-blur="addItemReviewList"></iInput>
              <span>份</span>
            </div>
            <div class="baby-price ml-45 mt-20">
              <span class="required">宝贝单价：</span>
              <iInput v-model.number="taskRelease.itemPrice" @on-change="clearDiscount" placeholder="请输入宝贝单价"
                      style="width: 120px"></iInput>
              <span>元</span>
              <span v-show="taskRelease.itemPrice && taskRelease.itemPrice < 1" class="main-color ml-20"><Icon
                color="#f60" type="information-circled"></Icon>&nbsp;每份试用品的价值必须在1元以上</span>
              <span
                v-show="taskRelease.itemPrice && taskRelease.itemPrice < 10 && taskRelease.activityCategory === 'pinkage_for_10'"
                class="main-color ml-20"><Icon color="#f60" type="information-circled"></Icon>&nbsp;10元包邮活动，宝贝最低价格不能低于10元</span>
              <p class="sizeColor pl-60 mt-8">活动活动期间，商家不允许修改下单页商品信息，经核查属实，本平台有权将活动担保金返还已获得资格的秀客，商家账号按相应规则处罚</p>
            </div>
<!--            <div class="discount ml-40 mt-20"
                 v-show="taskRelease.activityCategory !== 'free_get' && taskRelease.activityCategory !== 'present_get'">
              <div class="clear" v-show="taskRelease.activityCategory !== 'pinkage_for_10'">
                <span class="required mt-8 left">折扣/活动：</span>
                <div class="left">
                  <div class="clear" v-show="taskRelease.activityCategory !== 'goods_clearance'">
                    <div class="discount-btn left ml-10 discount-9-9" v-show="!discountDisabled.discount_9_9.disabled"
                         :class="{isSelect:taskRelease.discountType === 'discount_9_9'}"
                         @click="changeSelectDiscount('discount_9_9')">
                      <span> 9.9试用</span>
                      <span>（50元以上宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_9_9'"></span>
                    </div>
                    <div class="discount-btn left ml-10 discount-9-9 disabled"
                         v-show="discountDisabled.discount_9_9.disabled">
                      <span> 9.9试用</span>
                      <span>（50元以上宝贝可选）</span>
                    </div>
                    <div class="discount-btn left ml-10 discount-49-9" v-show="!discountDisabled.discount_49_9.disabled"
                         :class="{isSelect:taskRelease.discountType === 'discount_49_9'}"
                         @click="changeSelectDiscount('discount_49_9')">
                      <span> 49.9试用</span>
                      <span>（150元以上宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_49_9'"></span>
                    </div>
                    <div class="discount-btn left ml-10 discount-49-9 disabled"
                         v-show="discountDisabled.discount_49_9.disabled">
                      <span> 49.9试用</span>
                      <span>（150元以上宝贝可选）</span>
                    </div>
                    <div class="discount-btn left ml-10 discount-999" v-show="!discountDisabled.discount_99_9.disabled"
                         :class="{isSelect:taskRelease.discountType === 'discount_99_9'}"
                         @click="changeSelectDiscount('discount_99_9')">
                      <span> 99.9试用</span>
                      <span>（250元以上宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_99_9'"></span>
                    </div>
                    <div class="discount-btn left ml-10 discount-999 disabled"
                         v-show="discountDisabled.discount_99_9.disabled">
                      <span> 99.9试用</span>
                      <span>（250元以上宝贝可选）</span>
                    </div>
                  </div>
                  <div class="clear mt-10">
                    <div class="discount-btn left ml-10 discount-9-9"
                         :class="{isSelect:taskRelease.discountType === 'discount_r_10'}"
                         @click="changeSelectDiscount('discount_r_10')">
                      <span> 1折试用</span>
                      <span>（所有宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_10'"></span>
                    </div>
                    <div class="discount-btn left ml-10 discount-49-9"
                         :class="{isSelect:taskRelease.discountType === 'discount_r_30'}"
                         @click="changeSelectDiscount('discount_r_30')">
                      <span> 3折试用</span>
                      <span>（所有宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_30'"></span>
                    </div>
         &lt;!&ndash;           <div class="discount-btn left ml-10 discount-999"
                         :class="{isSelect:taskRelease.discountType === 'discount_r_50'}"
                         @click="changeSelectDiscount('discount_r_50')">
                      <span> 5折试用</span>
                      <span>（所有宝贝可选）</span>
                      <span class="is-select-gou" v-show="taskRelease.discountType === 'discount_r_50'"></span>
                    </div>&ndash;&gt;
                  </div>
                </div>
              </div>
              <p class="sizeColor pl-60 mt-20"
                 v-show="taskRelease.itemPrice && taskRelease.discountType && taskRelease.activityCategory !== 'pinkage_for_10'">
                秀客以<span class="main-color">{{taskRelease.itemPrice}}</span>元价格在淘宝上购买，活动成功后返款<span
                class="main-color">{{(newItemPrice / 100).toFixed(2)}}</span>元给秀客！</p>
              <p class="sizeColor pl-60"
                 v-show="taskRelease.itemPrice && taskRelease.itemPrice >= 10 && taskRelease.activityCategory === 'pinkage_for_10'">
                秀客以<span class="main-color">{{taskRelease.itemPrice}}</span>元价格在淘宝上购买，活动成功后返款<span
                class="main-color">{{taskRelease.itemPrice > 10 ? taskRelease.itemPrice - 10 : 0}}</span>元给秀客！</p>
            </div>-->
            <div class="baby-pinkage ml-45 mt-20">
              <span class="required left">是否包邮：</span>
              <Radio-group v-model="taskRelease.pinkage">
                <Radio label="true">
                  <span>宝贝包邮，无需修改运费</span>
                </Radio>
                <p style="height: 10px;"></p>
                <Radio label="false">
                  <span>宝贝不包邮，需要额外多垫付10元邮费，随货款一起对买手实行多退少补返还！</span>
                </Radio>
              </Radio-group>
            </div>
            <div class="baby-payment ml-45 mt-20">
              <span class="required left">付款方式：</span>
              <Radio-group v-model="taskRelease.paymentMethod">
                <Radio label="all"><span>无所谓（可以使用花呗、信用卡等付款，也可以不用）</span></Radio>
                <p style="height: 10px;"></p>
                <Radio label="no_hua_and_credit_pay"><span>禁止使用花呗、信用卡付款</span></Radio>
              </Radio-group>
            </div>
            <div class="task-remark ml-45 mt-20 clear">
              <span class="left ml-5">下单备注：</span>
              <div class="left">
                <iInput class="task-remark-input" type="textarea" :autosize="{minRows: 6,  maxRows: 12}"
                        placeholder="请在这里输入需要秀客注意的事项，例如：SKU信息等，这里的信息会无条件展示出来。" v-model="taskRelease.remark"></iInput>
                <p class="sizeColor3 mt-10"
                   v-show="taskRelease.activityCategory === 'present_get'">备注中明确说明希望秀客拍下的SKU（否则秀客可能会找不到宝贝）</p>
                <p class="sizeColor3 mt-6"
                   v-show="taskRelease.activityCategory === 'present_get'">建议商家备注中明确说明：“请勿在淘宝中评价及晒图！”，若未注明，秀客在淘宝中进行评价或晒图后可能会影响主宝贝的评价情况。</p>
              </div>
            </div>
            <div class="evaluation-requirements ml-15 mt-20 clear">
              <span class="left mt-5 required">淘宝评价要求：</span>
              <div class="left">
                <RadioGroup v-model="taskRelease.itemReviewRequired" :vertical="true" @on-change="changeSelectEvaluation">
                  <Radio label="review_by_showker_self">
                    <span>由秀客自主发挥（秀客自主发挥评价更客观更真实。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                  </Radio>
                  <Radio label="offer_review_summary">
                    <span>有个大概要求（可以写下评价的大概要求，因每个人理解不一样，可能评价结果会与期望有偏差。<span class="main-color">选择此项不可因主观喜好对评价结果有异议。</span>）</span>
                  </Radio>
                  <iInput v-if="taskRelease.itemReviewRequired === 'offer_review_summary'" v-model="taskRelease.itemReviewSummary" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价要求，如：需晒图/勿晒图、希望出现的关键词等~"></iInput>
                  <Radio label="assign_review_detail">
                    <span>我来提供评价内容（秀客将直接拷贝亲提供的评价内容在淘宝上进行评价，每个名额需要提供一份评价内容。）</span>
                  </Radio>
                </RadioGroup>
                <p v-show="taskRelease.itemReviewRequired === 'assign_review_detail'" class="main-color ml-20">可自定义的评价数跟您发布宝贝数量相同，系统会随机分配给申请通过的秀客每人一条评论，以保证评价内容的唯一性。</p>
                <div class="afford-evaluation-list mt-10" v-if="taskRelease.itemReviewRequired === 'assign_review_detail' && taskRelease.taskCount > 0">
                  <p v-for="item in itemReviewList">
                    <span class="vtc-sup">{{'评价' + item.index}}：</span>
                    <iInput v-model="item.value" class="mb-10" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="请输入你的评价内容" style="width: 620px;"></iInput>
                  </p>
                </div>
              </div>
            </div>
            <div class="product-introduction ml-45 mt-20">
              <span class="left ml-5 required">商品简介：</span>
              <quill-editor ref="myTextEditor"
                            v-model="taskRelease.itemDescription"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
              <form method="post" enctype="multipart/form-data" id="uploadFormMulti">
                <input v-show="false" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg">
              </form>
            </div>
          </div>
          <div class="order-set mt-22">
            <div class="activity-info-title" v-if="taskRelease.taskType !== 'direct_access'">{{getSetType}}下单条件设置</div>
            <!--PC搜索下单设置-->
            <template v-if="taskRelease.taskType === 'pc_search'">
              <div class="baby-main-img ml-40 mt-20">
                <span class="required left mr-5 mt-20">宝贝主图：</span>
                <Upload
                  key="pc-upload"
                  ref="upload"
                  name="task"
                  :show-upload-list="false"
                  :default-file-list="pcDefaultList"
                  :on-remove="removePcImage"
                  :on-success="pcBabyImgSuccess"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="1024"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <p class="sizeColor pl-60 mt-10">点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致</p>
              </div>
              <div class="more-keyword-scheme ml-40 mt-20">
                <div>
                  <div class="inline-block tag" v-for="item in pcTaskDetail" :key="item.index" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                    <span @click="selectChangeScheme(item.index)">关键词方案{{ item.index + 1 }}</span>
                    <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
                    <span v-if="item.index === pcTaskDetail.length - 1 && item.index !== 0" class="close-tag" @click="handleClose(item.index)">
                      <Icon type="ios-close-empty" ></Icon>
                    </span>
                  </div>
                  <iButton class="ml-5" v-show="pcTaskDetail.length < 5" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加关键词方案</iButton>
                </div>
                <div class="mt-10 sizeColor">（请确保提供的关键词能够搜索到宝贝，同时为了避免秀客找不到对应的宝贝，您最多可以添加5组关键词方案）</div>
              </div>
              <template v-for="item in pcTaskDetail" v-if="item.index === selectKeywordScheme">
                <Alert show-icon class="tag-alert">
                  您当前选择的是关键词方案 {{item.index + 1}}
                  <Icon type="ios-lightbulb-outline" slot="icon" size="18"></Icon>
                </Alert>
                <div class="matching-num ml-40 mt-20">
                  <span>匹配人数：</span>
                  <iInput v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px"></iInput>
                  <p class="sizeColor mt-10">（系统会按照审批秀客通过数量以及匹配人数，依次展示对应的关键词。<span class="main-color">注意：匹配人数可以不设定，一旦设定则每个关键词方案的匹配人数之和必须等于宝贝数量）</span></p>
                </div>
                <div class="search-keyword mt-20 ml-28">
                  <span class="required">搜索关键词：</span>
                  <iInput v-model="item.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"></iInput>
                  <span class="sizeColor2">（PC端请确保10页以内，若是长尾关键词请不要过量补单）</span>
                </div>
                <div class="sort-by ml-40 mt-20">
                  <span class="required">排序方式：</span>
                  <Radio-group v-model="item.searchSort">
                    <Radio label="zong_he">
                      <span>综合排序</span>
                    </Radio>
                    <Radio label="xiao_liang">
                      <span>销量排序</span>
                    </Radio>
                    <Radio label="ren_qi">
                      <span>人气排序</span>
                    </Radio>
                  </Radio-group>
                </div>
                <div class="search-price ml-40 mt-20">
                  <span class="required">展示价格：</span>
                  <iInput v-model.number="item.searchPagePrice" placeholder="请输入搜索列表页展示价格"
                          style="width: 160px"></iInput>
                  <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
                </div>
                <div class="baby-location ml-15 mt-20">
                  <span class="required">宝贝搜索位置：</span>
                  <span>第</span>
                  <iInput v-model.number="item.searchPagePositionMin" style="width: 40px"></iInput>
                  <span>---</span>
                  <iInput v-model.number="item.searchPagePositionMax" style="width: 40px"></iInput>
                  <span>页</span>
                  <p class="sizeColor2 ml-80 mt-6">宝贝参考位置页数差值最大值不大于3页（如果PC端排名在10页以后， 可使用下面的卡条件功能）</p>
                </div>
                <div class="screen-condition ml-45 mt-20 clear">
                  <span class="left">筛选条件：</span>
                  <div class="left ml-5">
                    <Checkbox-group v-model="item.searchFilter">
                      <Checkbox label="pinkage">
                        <span>包邮</span>
                      </Checkbox>
                      <Checkbox label="mobile_exclusive">
                        <span>手机专享</span>
                      </Checkbox>
                      <Checkbox label="tao_coin_deduction">
                        <span>淘金币抵扣</span>
                      </Checkbox>
                      <Checkbox label="sales_return_7_plus">
                        <span>7+天退货</span>
                      </Checkbox>
                      <Checkbox label="tmall">
                        <span>天猫</span>
                      </Checkbox>
                      <p style="height: 10px;"></p>
                      <Checkbox label="global_shopping">
                        <span>全球购</span>
                      </Checkbox>
                      <Checkbox label="overseas_goods">
                        <span>海外商品</span>
                      </Checkbox>
                      <Checkbox label="consumer_protect">
                        <span>消费者保障</span>
                      </Checkbox>
                      <Checkbox label="pay_after_receive">
                        <span>货到付款</span>
                      </Checkbox>
                      <Checkbox label="hua_pay_installment">
                        <span>花呗分期</span>
                      </Checkbox>
                      <Checkbox label="wangwang_online">
                        <span>旺旺在线</span>
                      </Checkbox>
                    </Checkbox-group>
                  </div>
                </div>
                <div class="price-select ml-45 mt-20">
                  <span>价格区间：</span>
                  <iInput v-model.number="item.priceRangeMin" style="width: 40px"></iInput>
                  <span>---</span>
                  <iInput v-model.number="item.priceRangeMax" style="width: 40px"></iInput>
                  <span>元</span>
                </div>
                <div class="deliver-address ml-56 mt-20">
                  <span>发货地：</span>
                  <iInput v-model="item.deliverAddress" style="width: 120px"></iInput>
                  <span class="sizeColor2 ml-5">出于安全考虑，请勿大量使用</span>
                </div>
              </template>
            </template>
            <!--APP搜索下单设置-->
            <template v-else-if="taskRelease.taskType === 'app_search'">
              <div class="baby-main-img ml-40 mt-20">
                <span class="required left mr-5 mt-20">宝贝主图：</span>
                <Upload
                  ref="upload"
                  key="app-upload"
                  :show-upload-list="false"
                  :on-success="appBabyImgSuccess"
                  :default-file-list="appDefaultList"
                  :on-remove="removeAppImage"
                  :format="['jpg','jpeg','png','gif','bmp']"
                  :max-size="1024"
                  name="task"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  type="drag">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <p class="sizeColor pl-60 mt-10">点击或者拖拽自主上传图片，支持jpg \ jpeg \ png \ gif \ bmp格式，最佳尺寸400*400（像素），不超过1M，可与宝贝主图一致</p>
              </div>
              <div class="more-keyword-scheme ml-40 mt-20">
                <div>
                  <div class="inline-block tag" v-for="item in appTaskDetail" :key="item" :class="selectKeywordScheme === item.index ? 'select-tag-bg' : ''">
                    <span @click="selectChangeScheme(item.index)">关键词方案{{ item.index + 1 }}</span>
                    <sup class="badge-count" v-show="item.countAssigned > 0">{{item.countAssigned}}</sup>
                    <span v-if="item.index === appTaskDetail.length - 1 && item.index !== 0" class="close-tag" @click="handleClose(item.index)">
                      <Icon type="ios-close-empty" ></Icon>
                    </span>
                  </div>
                  <iButton v-show="appTaskDetail.length < 5" icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加关键词方案</iButton>
                </div>
                <div class="mt-10 sizeColor">（请确保提供的关键词能够搜索到宝贝，同时为了避免秀客找不到对应的宝贝，您最多可以添加5组关键词方案）</div>
              </div>
              <template v-for="item in appTaskDetail" v-if="item.index === selectKeywordScheme">
                <Alert show-icon class="tag-alert">
                  您当前选择的是关键词方案 {{item.index + 1}}
                  <Icon type="ios-lightbulb-outline" slot="icon" size="18"></Icon>
                </Alert>
                <div class="matching-num ml-40 mt-20">
                  <span>匹配人数：</span>
                  <iInput v-model.number="item.countAssigned" placeholder="请输入匹配人数" style="width: 160px"></iInput>
                  <p class="sizeColor mt-10">（系统会按照审批秀客通过数量以及匹配人数，依次展示对应的关键词。<span class="main-color">注意：每个关键词的匹配人数之和不能大于宝贝数量，并且宝贝数量大于等于关键词方案数量）</span></p>
                </div>
                <div class="search-keyword mt-20 ml-28">
                  <span class="required">搜索关键词：</span>
                  <iInput v-model="item.searchKeyword" placeholder="请输入搜索关键词" style="width: 260px"></iInput>
                  <span class="sizeColor2">（APP端请确保在120位以内，若是长尾关键词请不要过量补单）</span>
                </div>
                <div class="sort-by ml-40 mt-20">
                  <span class="required">排序方式：</span>
                  <Radio-group v-model="item.searchSort">
                    <Radio label="zong_he">
                      <span>综合排序</span>
                    </Radio>
                    <Radio label="xiao_liang">
                      <span>销量排序</span>
                    </Radio>
                  </Radio-group>
                </div>
                <div class="search-price ml-40 mt-20">
                  <span class="required">展示价格：</span>
                  <iInput v-model="item.searchPagePrice" placeholder="请输入搜索列表页展示价格"
                          style="width: 160px"></iInput>
                  <span class="sizeColor2">（务必亲自搜索，确认价格准确）</span>
                </div>
                <div class="baby-location ml-15 mt-20">
                  <span class="required">宝贝搜索位置：</span>
                  <span>从上往下数第</span>
                  <iInput v-model="item.searchRankPosition" style="width: 40px"></iInput>
                  <span>个宝贝左右</span>
                  <p class="sizeColor2 ml-80 mt-6">位置统一切换为一列展示后，在数位置。（如果移动端排名在100名以后，可使用下面的卡条件功能）</p>
                </div>
                <div class="screen-condition ml-45 mt-20 clear">
                  <span class="left">筛选条件：</span>
                  <div class="left ml-5">
                    <Checkbox-group v-model="appTaskDetail.searchFilter">
                      <Checkbox label="pinkage">
                        <span>包邮</span>
                      </Checkbox>
                      <Checkbox label="mobile_exclusive">
                        <span>手机专享</span>
                      </Checkbox>
                      <Checkbox label="tao_coin_deduction">
                        <span>淘金币抵扣</span>
                      </Checkbox>
                      <Checkbox label="sales_return_7_plus">
                        <span>7+天退货</span>
                      </Checkbox>
                      <Checkbox label="tmall">
                        <span>天猫</span>
                      </Checkbox>
                      <p style="height: 10px;"></p>
                      <Checkbox label="global_shopping">
                        <span>全球购</span>
                      </Checkbox>
                      <Checkbox label="overseas_goods">
                        <span>海外商品</span>
                      </Checkbox>
                      <Checkbox label="consumer_protect">
                        <span>消费者保障</span>
                      </Checkbox>
                      <Checkbox label="pay_after_receive">
                        <span>货到付款</span>
                      </Checkbox>
                      <Checkbox label="hua_pay_installment">
                        <span>花呗分期</span>
                      </Checkbox>
                    </Checkbox-group>
                  </div>
                </div>
                <div class="price-select ml-45 mt-20">
                  <span>价格区间：</span>
                  <iInput v-model.number="item.priceRangeMin" style="width: 40px"></iInput>
                  <span>---</span>
                  <iInput v-model.number="item.priceRangeMax" style="width: 40px"></iInput>
                  <span>元</span>
                </div>
                <div class="deliver-address ml-56 mt-20">
                  <span>发货地：</span>
                  <iInput v-model="item.deliverAddress" style="width: 120px"></iInput>
                  <span class="sizeColor2 ml-5">出于安全考虑，请勿大量使用</span>
                </div>
              </template>
            </template>
            <!--淘口令下单设置-->
            <template v-else-if="taskRelease.taskType === 'tao_code'">
              <div class="tao_code ml-56 mt-20">
                <span class="required">淘口令：</span>
                <iInput v-model="taoCodeTaskDetail[0].taoCode" placeholder="请输入任务宝贝的淘口令" style="width: 320px"></iInput>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="footer-btn" v-show="stepName === 'information'" @click="stepNext">下一步</div>
      <!--存入担保金详情-->
      <div class="deposits-received" v-show="stepName === 'deposit'">
        <div class="deposits-received-title mt-20 mb-20">活动活动信息已成功保存，请您存入本次活动的活动担保金。</div>
        <div class="deposits-received-info">您现在为 <span class="second-color">{{taskRelease.taskName}}</span> 存入活动担保金<span
          class="second-color">{{(taskRelease.taskCount * oneBond).toFixed(2)}}</span>元，此笔款项将作为发布活动活动诚信担保的重要工具，待秀客完成活动流程后将返还给每个秀客 <span
          class="second-color">{{oneBond}}</span> 元.
        </div>
        <div class="description-fees mt-40">
          <h3>费用说明：</h3>
          <div class="description-fees-con mt-10">
            <p>
              活动担保金 = 份数 × 单品活动担保金 =<span>{{taskRelease.taskCount}}</span> × <span>{{oneBond}}</span> = <span>{{(taskRelease.taskCount * oneBond).toFixed(2)}}</span>元
            </p>
            <!--<p class="mt-6">
              单品推广费 = （宝贝单价 + 邮费） × 费率 =<span>（{{taskRelease.itemPrice}} + {{taskRelease.pinkage === 'true' ? 0 : 10}}）</span>× <span>6%</span> = <span>{{onePromotionExpenses}}</span>元<span
              v-if="isShowExpensesTip">（单品推广费超过平台设定的最高上限3.00元，本次实际收取的单品推广费用为3.00元）</span></p>-->
            <p class="mt-6">总推广费用 = 单品推广费用 × 份数 =<span>{{onePromotionExpenses}}</span> × <span>{{taskRelease.taskCount}} = <span>{{allPromotionExpenses}}</span></span>元</p>
            <p class="mt-6">总费用 = 活动担保金 + 总推广费用 = <span>{{orderMoney}}</span>元</p>
          </div>
        </div>
        <div class="pay-info mt-40" v-if="isBalance && !priceHasChange">本次总共要支付的金额为：<span class="second-color">{{orderMoney}}</span>&nbsp;元。您的账户的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalance && !priceHasChange">本次总共要支付的金额为：<strong>{{orderMoney}}</strong>&nbsp;元。您账户余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元，还需充值：<span
          class="second-color">{{(orderMoney - getUserBalance).toFixed(2)}}</span>&nbsp;元。
        </div>
        <div class="pay-info mt-40" v-if="isBalanceReplenish && priceHasChange">
          该任务已付担保金 <strong>{{paidDeposit.toFixed(2)}}</strong>元，本次修改需要支付超出部分的金额为：<strong class="main-color">{{replenishMoney}}</strong>元。您账号的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元
        </div>
        <div class="pay-info mt-40" v-if="!isBalanceReplenish && priceHasChange">该任务已付担保金 <strong>{{paidDeposit}}</strong>元，本次修改需要支付超出部分的金额为：<strong
          class="main-color">{{replenishMoney}}</strong>元。您账号的当前余额为：<strong>{{getUserBalance || 0}}</strong>&nbsp;元,还需充值：<span
          class="second-color">{{(replenishMoney - getUserBalance).toFixed(2) }}</span>&nbsp;元。
        </div>
        <div class="description-fees-footer">
          <span class="pay-btn" v-if="isBalance" @click="openRecharge">前去支付</span>
          <span class="pay-btn" v-else @click="openRecharge">前去充值</span>
          <span class="return" @click="returnUpStep">返回上一步</span>
          <router-link to="/user/activity-management/list">秀品活动管理</router-link>
        </div>
      </div>
      <!--活动提交成功提示-->
      <div class="audit" v-show="stepName === 'audit'">
        <div class="audit-title">
          <Icon type="checkmark-circled" color="#309630" size=28></Icon>
          <span>活动已提交</span>
        </div>
        <div class="audit-con mt-20">亲当前的活动已提交，工作人员会在一个工作日内审核您的活动！敬请关注~</div>
        <div class="audit-footer mt-40">
          <router-link to="/user/activity-management/list">点此查看活动管理</router-link>
          <span class="ml-20">有问题？联系客服</span>
        </div>
      </div>
    </div>
    <!--担保金支付弹框-->
    <div class="pay-model" v-if="showPayModel">
      <PayModel :orderMoney="!priceHasChange ? orderMoney : replenishMoney" @confirmPayment="confirmPayment">
        <i slot="closeModel" class="close-recharge" @click="closeRecharge">&times;</i>
        <div slot="noBalance" class="title-tip">
            <span class="sizeColor3"><Icon color="#FF2424" size="18px" type="ios-information"></Icon><span
              class="ml-10">亲，您的余额不足，请充值。</span></span>还需充值<strong
          class="sizeColor3">{{(orderMoney - getUserBalance).toFixed(2)}}</strong>元
        </div>
        <div slot="isBalance" class="title-tip">
          <Icon color="#FF2424" size="18px" type="ios-information"></Icon>
          <span class="ml-10">您本次需要支付金额为 <span
            class="sizeColor3">{{!priceHasChange ? orderMoney : replenishMoney}}</span> 元。</span></div>
      </PayModel>
    </div>
    <!--用户修改价格比原始价格高需要补差价提示弹框-->
    <div class="editPriceModel">
      <Modal v-model="editPriceAfterModel">
        <div class="clear mt-40">
          <div class="left mt-5">
            <Icon color="#f60" size="32" type="information-circled"></Icon>
          </div>
          <div class="left ml-10">
            <p class="fs-14">由于您修改了当前宝贝价格/包邮条件/发放数量等，且修改后的</p>
            <p class="fs-14">价格高于原活动担保金，因此需要对超出部分进行支付。</p>
          </div>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" @click="continueNextStep">我已了解，继续下一步</iButton>
          <iButton style="margin-left: 35px;" type="error" size="large" @click="IThink">我再想想</iButton>
        </div>
      </Modal>
    </div>
    <!--用户修改价格比原始价格低提示弹框-->
    <div class="editPriceToLow">
      <Modal v-model="editPriceToLowAfterModel">
        <div class="clear mt-40">
          <div class="left mt-5">
            <Icon color="#f60" size="32" type="information-circled"></Icon>
          </div>
          <div class="left ml-10">
            <p style="font-size: 14px;">由于您修改了当前宝贝价格/包邮条件/发放数量等，且修改后的</p>
            <p style="font-size: 14px;">价格低于原价格，对于超出部分的费用将在活动结算时返还给您。</p>
          </div>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" @click="toLowContinueNextStep">我已了解，继续下一步</iButton>
          <iButton style="margin-left: 35px;" type="error" size="large" @click="IThink">我再想想</iButton>
        </div>
      </Modal>
    </div>
    <!--商家发布任务活动总价低于500元提醒弹框-->
    <!--  <Modal v-model="price500Model" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>温馨提示</span>
        </p>
        <div class="text-ct">
          <p>您发布的活动总价值必须在500元以上</p>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" long @click="price500Model = false">我知道了</iButton>
        </div>
      </Modal>-->
    <!--商家改低宝贝数量并且关键词方案大于当前宝贝数量弹框-->
    <div class="keywordLowerChange">
      <Modal v-model="keywordLowerChangeModel" :mask-closable="false" :closable="false" width="368">
        <p slot="header" class="text-ct">
          <Icon color="#f60" type="information-circled"></Icon>
          <span class="main-color">关键词方案修改确认</span>
        </p>
        <div class="ml-10 text-ct">
          <p class="fs-14">您当前的宝贝数量发生变更，请重新设定关键词方案</p>
        </div>
        <div slot="footer">
          <iButton type="error" size="large" long @click="keywordLowerChange">确定</iButton>
        </div>
      </Modal>
    </div>
    <!--服务条款弹框-->
    <div v-if="isShowUserClause" class="user-clause-model">
      <user-clause @closeClauseModel="closeClauseModel"></user-clause>
    </div>
  </div>
</template>

<script>
  import {Quill, quillEditor} from 'vue-quill-editor'
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import Alert from 'iview/src/components/alert'
  import {Select, Option, OptionGroup} from 'iview/src/components/select'
  import Upload from '@/components/upload'
  import Steps from 'iview/src/components/steps'
  import PayModel from '@/components/PayModel'
  import UserClause from '@/components/UserClause'
  import api from '@/config/apiConfig'
  import {aliCallbackImgUrl} from '@/config/env'
  import {aliUploadImg, isNumber, isInteger, isAliUrl, randomString, extendDeep, decode} from '@/config/utils'

  export default {
    name: 'TaskReleaseProcess',
    components: {
      quillEditor: quillEditor,
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      iSelect: Select,
      iOption: Option,
      Upload: Upload,
      Steps: Steps,
      Step: Steps.Step,
      OptionGroup: OptionGroup,
      Modal: Modal,
      Alert: Alert,
      PayModel: PayModel,
      UserClause: UserClause,
    },
    data() {
      return {
        blockOrNone: false,
        name: 'base-example',
        uniqueId: 'uniqueId',
        addImgRange: null,
        editorOption: {
          placeholder: "有吸引力的产品介绍，将吸引更多的秀客来申请活动哦！请在这里编辑您的商品简介（商品简介中至少包含一张图片，可以直接复制淘宝的宝贝详情到这里），但请注意，不要在该简介中，放置任何外链，比如店铺或者商品链接，以免申请的秀客绕过相应的下单条件，造成损失！",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['image']
            ]
          }
        },
        showInside:{
          showInsideText: false,
          showInsideText2: false,
          showInsideText3: false,
          showInsideText4: false,
        },
        showPayModel: false,
        current: 0,
        stepName: 'information',
        taskPayId: null,
        itemCatalogList: [],
        mainDefaultList: [],
        appDefaultList: [],
        pcDefaultList: [],
        pcTaskDetailItemMainImage: null,
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
        appTaskDetailItemMainImage: null,
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
            accessDescription: null
          }
        ],
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
          remark: null,
          itemDescription: '',
          taskId: null,
          taskDetail: [],
          itemReviewRequired: 'review_by_showker_self',
          itemReviewSummary: null,
          itemReviewAssignString: [],
        },
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
        editPriceAfterModel: false,
        editPriceToLowAfterModel: false,
        keywordLowerChangeModel: false,
        price500Model: false,
        priceHasChange: false,
        paidDeposit: 0,
        taskStatus: null,
        editTaskId: null,
        getMemberStatus: null,
        itemReviewList: [],
        itemReviewPushList: [],
        selectKeywordScheme: 0,
        addKeywordScheme: 0,
        isCountAssigned: null,
        isShowUserClause: false,
        browseAnswer: 1,
      }
    },
    mounted() {
      let _this = this;
      let imgHandler = async function (image) {
        _this.addImgRange = _this.$refs.myTextEditor.quill.getSelection();
        if (image) {
          let fileInput = document.getElementById(_this.uniqueId);
          fileInput.click()
        }
      };
      _this.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
    },
    created() {
      this.checkMemberForTask();
      this.getItemCatalog();
      this.getDetectionUserClauseTip();
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
       * 从vuex中获取用户账户余额
       * @return {number}
       */
      getUserBalance: function () {
        return this.$store.getters.getUserBalance;
      },

      /**
       * 计算商家需要存入的担保金（当用户勾选折扣试用的时候：宝贝单价 - 对应的折扣价格）
       * 单位为分
       * @return {number}
       */
      newItemPrice: function () {
        let type = this.taskRelease.discountType;
        if (!this.discountDisabled[type].isDiscount) {
          return (this.taskRelease.itemPrice - this.discountDisabled[type].returnPrice) * 100;
        } else {
          return Math.ceil(100 * this.taskRelease.itemPrice * (1 - this.discountDisabled[type].returnPrice));
        }
      },

      /**
       * 计算最终商家发布单品活动担保金（商家需要存入的担保金 + 是否包邮）
       * @return {number}
       */
      oneBond: function () {
        return this.taskRelease.pinkage === 'true' ? (this.newItemPrice / 100).toFixed(2) * 1 : (this.newItemPrice / 100 + 10).toFixed(2) * 1;
      },

      /**
       * 计算单品推广费用（宝贝单价+ 邮费，单品推广费最高上限3元）
       * @return {number}
       */
      onePromotionExpenses: function () {
       /* let price = this.taskRelease.pinkage === 'true' ? this.taskRelease.itemPrice : this.taskRelease.itemPrice + 10;
        return price * 0.06 > 3 ? 3.00 : (price * 0.06).toFixed(2) * 1;*/
       return 0
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

      /**
       * 计算修改价格后需要补充的金额
       * @return {number}
       */
      replenishMoney: function () {
        return this.priceHasChange ? ((this.orderMoney * 100 - this.paidDeposit * 100) / 100).toFixed(2) * 1 : 0;
      },

      /**
       * 计算余额是否足够支付订单金额
       * @return {boolean}
       */
      isBalance: function () {
        return this.orderMoney <= this.getUserBalance;
      },

      /**
       * 计算余额是否足够支付需要补充的订单金额
       * @return {boolean}
       */
      isBalanceReplenish: function () {
        return this.replenishMoney <= this.getUserBalance;
      },

      /**
       * 计算活动标题输入字符数
       * @return {number}
       */
      taskNameLength: function () {
        return this.taskRelease.taskName ? this.taskRelease.taskName.length : 0;
      },

      /**
       * 是否显示单品推广费超过3元的提示
       * @return {boolean}
       */
      isShowExpensesTip: function () {
        let postage = this.taskRelease.pinkage === 'true' ? 0 : 10;
        return (this.taskRelease.itemPrice + postage) * 0.06 > 3
      },
    },
    destroyed(){},
    methods: {
      changeSelectActivity(type) {
        let _this = this;
        _this.taskRelease.activityCategory = type;
        if (type === 'pinkage_for_10') {
          _this.taskRelease.discountType = 'discount_10';
        } else {
          if (_this.taskRelease.discountType !== 'discount_0') {
            _this.taskRelease.discountType = 'discount_0';
          }
        }
      },
      clearDiscount() {
        let _this = this;
        let itemPrice = _this.taskRelease.itemPrice;
        let type = _this.taskRelease.activityCategory;
        if (type === 'price_low') {
          if (itemPrice < 50 || itemPrice < 150 || itemPrice < 250) {
            if (!_this.discountDisabled.discount_9_9.disabled) {
              _this.discountDisabled.discount_9_9.disabled = true;
            }
            if (!_this.discountDisabled.discount_49_9.disabled) {
              _this.discountDisabled.discount_49_9.disabled = true;
            }
            if (!_this.discountDisabled.discount_99_9.disabled) {
              _this.discountDisabled.discount_99_9.disabled = true;
            }
          }
          if (itemPrice >= 50) {
            _this.discountDisabled.discount_9_9.disabled = false;
          }
          if (itemPrice >= 150) {
            _this.discountDisabled.discount_49_9.disabled = false;
          }
          if (itemPrice >= 250) {
            _this.discountDisabled.discount_99_9.disabled = false;
          }
        }
      },
      checkMemberForTask() {
        let _this = this;
        api.checkMemberForTask().then(res => {
          if (res) {
            _this.getMemberStatus = res.statusCode;
            _this.blockOrNone = res.statusCode !== 'need_member_for_more_task' && res.statusCode !== 'need_member_for_more_audit';
          } else {
            _this.$Message.error(res.msg)
          }
        });
      },
      openMember() {
        this.$router.push({name: 'VipMember'})
      },
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
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
      stepNext: function () {
        let _this = this;
        if (!_this.taskRelease.taskDaysDuration) {
          _this.$Message.warning('亲，活动时长不能为空！');
          return;
        }
        if (!isInteger(_this.taskRelease.taskDaysDuration)) {
          _this.$Message.warning('亲，活动时长必须为数字！');
          return;
        }
        if (_this.taskRelease.taskDaysDuration < 3) {
          _this.$Message.warning('亲，活动时长最短为3天起！');
          return;
        }
        if (_this.taskRelease.taskDaysDuration > 30) {
          _this.$Message.warning('亲，活动时长最长为30天！');
          return;
        }
        if (!_this.taskRelease.taskName) {
          _this.$Message.warning('亲，活动标题不能为空！');
          return;
        }
        if (_this.taskRelease.taskName.length > 35) {
          _this.$Message.warning('亲，活动标题最多35个字符！');
          return;
        }
        if (!_this.taskRelease.itemType) {
          _this.$Message.warning('亲，宝贝类型不能为空！');
          return;
        }
        if (!_this.taskRelease.taskMainImage) {
          _this.$Message.warning('亲，请上传活动主图！');
          return;
        }
        if (!_this.taskRelease.itemUrl) {
          _this.$Message.warning('亲，宝贝地址不能为空！');
          return;
        }
        if (!isAliUrl(_this.taskRelease.itemUrl)) {
          _this.$Message.warning('亲，仅支持淘宝、天猫、飞猪链接！');
          return;
        }
        if (!_this.taskRelease.storeName) {
          _this.$Message.warning('亲，掌柜旺旺不能为空！');
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
          _this.$Message.warning('亲，每份试用品的价值必须在1元以上！');
          return;
        }
        if (_this.taskRelease.itemPrice < 10 && _this.taskRelease.activityCategory === 'pinkage_for_10') {
          _this.$Message.warning('亲，10元包邮活动宝贝最低价格不能低于10元！');
          return;
        }
        if ((_this.taskRelease.activityCategory === 'price_low' || _this.taskRelease.activityCategory === 'goods_clearance') && _this.taskRelease.discountType === 'discount_0') {
          _this.$Message.warning('亲，请选择试用折扣！');
          return;
        }
        if (_this.taskRelease.itemReviewRequired === 'offer_review_summary' && !_this.taskRelease.itemReviewSummary) {
          _this.$Message.warning('亲，请填写你对评价的大概要求！');
          return;
        }
        if (_this.itemReviewList.length > 0) {
          _this.itemReviewPushList = [];
          _this.itemReviewList.forEach(item => {
            if (item.value !== '') {
              _this.itemReviewPushList.push(item.value);
            }
          })
        }
        if (_this.taskRelease.itemReviewRequired === 'assign_review_detail' && _this.itemReviewPushList.length < _this.taskRelease.taskCount) {
          _this.$Message.warning('亲，请填写你要提供的评价内容！');
          return;
        }
        if(!_this.taskRelease.itemDescription){
          _this.$Message.warning('亲，请填写您要发布宝贝的商品简介！');
          return;
        }
        const IMG_TAG = /<img[^>]+>/g;
        if(!IMG_TAG.test(_this.taskRelease.itemDescription)){
          _this.$Message.warning('亲，商品简介中至少需要包含一张图片！');
          return;
        }
        if (_this.taskRelease.taskType === 'pc_search') {
          let countAssigned = 0;
          _this.isCountAssigned = _this.pcTaskDetail.every(item => {
            return item.countAssigned > 0;
          });
          if(!_this.isCountAssigned) {
            let len = _this.pcTaskDetail.length;
            let count = _this.taskRelease.taskCount;
            let remainder = count % len;
            let integer = Math.floor(count / len);
            for (let i = 0, len = _this.pcTaskDetail.length; i < len; i++) {
              if(i === len - 1) {
                _this.pcTaskDetail[i].countAssigned = integer + remainder;
              } else {
                _this.pcTaskDetail[i].countAssigned = integer;
              }
            }
          }
          for (let i = 0, len = _this.pcTaskDetail.length; i < len; i++) {
            _this.pcTaskDetail[i].itemMainImage = _this.pcTaskDetailItemMainImage;
            let index = _this.pcTaskDetail[i].index + 1;
            countAssigned += _this.pcTaskDetail[i].countAssigned;
            if (!_this.pcTaskDetail[i].itemMainImage) {
              _this.$Message.warning('亲，请上传关键词方案' + index + '中的宝贝主图！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchKeyword) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的搜索关键词不能空！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePrice) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的展示价格不能空！');
              return;
            }
            if (!isNumber(_this.pcTaskDetail[i].searchPagePrice)) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的展示价格必须为数字！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePositionMin) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的宝贝搜索起始位置不能空！');
              return;
            }
            if (!_this.pcTaskDetail[i].searchPagePositionMax) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的宝贝搜索结束位置不能空！');
              return;
            }
            if (_this.pcTaskDetail[i].searchPagePositionMax < _this.pcTaskDetail[i].searchPagePositionMin) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的宝贝搜索位置起始页不能大于结束页！');
              return;
            }
            if (_this.pcTaskDetail[i].searchPagePositionMax - _this.pcTaskDetail[i].searchPagePositionMin > 2) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的宝贝搜索位置页数差值最大不大于3页！');
              return;
            }
          }
          if(countAssigned !== _this.taskRelease.taskCount) {
            _this.$Message.warning('亲，你分配的人数与宝贝数量不符，请重新分配人数！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'app_search') {
          let countAssigned = 0;
          _this.isCountAssigned = _this.appTaskDetail.every(item => {
            return item.countAssigned > 0;
          });
          if(!_this.isCountAssigned) {
            let len = _this.appTaskDetail.length;
            let count = _this.taskRelease.taskCount;
            let remainder = count % len;
            let integer = Math.floor(count / len);
            for (let i = 0, len = _this.appTaskDetail.length; i < len; i++) {
              if(i === len - 1) {
                _this.appTaskDetail[i].countAssigned = integer + remainder;
              } else {
                _this.appTaskDetail[i].countAssigned = integer;
              }
            }
          }
          for (let i = 0, len = _this.appTaskDetail.length; i < len; i++) {
            _this.appTaskDetail[i].itemMainImage = _this.appTaskDetailItemMainImage;
            let index = _this.appTaskDetail[i].index + 1;
            countAssigned += _this.appTaskDetail[i].countAssigned;
            if (!_this.appTaskDetail[i].itemMainImage) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的请上传手淘搜索宝贝主图！');
              return;
            }
            if (!_this.appTaskDetail[i].searchKeyword) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的搜索关键词不能空！');
              return;
            }
            if (!_this.appTaskDetail[i].searchPagePrice) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的展示价格不能空！');
              return;
            }
            if (!isNumber(_this.appTaskDetail[i].searchPagePrice)) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的展示价格必须为数字！');
              return;
            }
            if (!_this.appTaskDetail[i].searchRankPosition) {
              _this.$Message.warning('亲，关键词方案'+ index + '中的宝贝搜索位置不能空！');
              return;
            }
          }
          if(countAssigned !== _this.taskRelease.taskCount){
            _this.$Message.warning('亲，你分配的人数与宝贝数量不符，请重新分配人数！');
            return;
          }
        }
        if (_this.taskRelease.taskType === 'tao_code') {
          if (!_this.taoCodeTaskDetail[0].taoCode) {
            _this.$Message.warning('亲，任务宝贝淘口令不能为空！');
            return;
          }
        }
        const IMG_HREF_ATTRIBUTE = /(href|target)=["|'].*?["|']/g;
        if(IMG_HREF_ATTRIBUTE.test(_this.taskRelease.itemDescription)){
          _this.taskRelease.itemDescription = _this.taskRelease.itemDescription.replace(IMG_HREF_ATTRIBUTE,'');
        }
        let status = _this.taskStatus;
        let type = _this.$route.query.type;
        /* if (_this.taskRelease.taskCount * _this.oneBond < 500) {
           _this.price500Model = true;
           return;
         }*/
        if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit === _this.orderMoney && !type) {
          _this.taskCreate(true);
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > _this.orderMoney && !type) {
          this.editPriceToLowAfterModel = true;
        } else if ((status === 'waiting_modify' || status === 'waiting_pay') && _this.paidDeposit > 0 && _this.paidDeposit < _this.orderMoney && !type) {
          _this.editPriceAfterModel = true;
          _this.priceHasChange = true;
        } else if (type && type === 'copy') {
          _this.taskCreate(false);
        } else {
          _this.taskCreate(false);
        }
      },
      taskCreate(type) {
        let _this = this;
        _this.taskRelease.itemReviewAssignString = JSON.stringify(_this.itemReviewPushList);
        let pcTaskDetailClone = extendDeep(_this.pcTaskDetail,[]);
        let appTaskDetailClone = extendDeep(_this.appTaskDetail,[]);
        switch (_this.taskRelease.taskType) {
          case 'pc_search' :
            pcTaskDetailClone.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice * 100).toFixed(0) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax * 100).toFixed(0) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin * 100).toFixed(0) * 1 : null;
            });
            _this.taskRelease.taskDetail = JSON.stringify(pcTaskDetailClone);
            break;
          case 'app_search' :
            appTaskDetailClone.forEach(item => {
              item.searchPagePrice = (item.searchPagePrice * 100).toFixed(0) * 1;
              item.priceRangeMax = item.priceRangeMax > 0 ? (item.priceRangeMax * 100).toFixed(0) * 1 : null;
              item.priceRangeMin = item.priceRangeMin > 0 ? (item.priceRangeMin * 100).toFixed(0) * 1 : null;
            });
            _this.taskRelease.taskDetail = JSON.stringify(appTaskDetailClone);
            break;
          case 'tao_code' :
            _this.taskRelease.taskDetail = JSON.stringify(_this.taoCodeTaskDetail);
            break;
          case 'direct_access' :
            _this.taskRelease.taskDetail = JSON.stringify([]);
            break;
        }
        api.taskCreate(_this.taskRelease).then(res => {
          if (res.status) {
            _this.taskPayId = res.data.id;
            if (!_this.taskRelease.taskId) {
              _this.taskRelease.taskId = res.data.id;
            }
            if (type === true) {
              _this.$router.push({name: 'ActivitiesList'});
            } else {
              _this.nextCurrent();
              _this.stepName = 'deposit';
            }
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      returnUpStep() {
        let _this = this;
        let type = _this.$route.query.type;
        if ((type && type === 'copy') || !type) {
          _this.editTaskId = _this.taskPayId;
          _this.getTaskInfo();
        } else {
          _this.getTaskInfo();
        }
        _this.stepName = 'information';
        _this.current = 0;
      },
      nextCurrent() {
        this.current += 1;
      },
      IThink() {
        let _this = this;
        _this.editPriceAfterModel = false;
        _this.editPriceToLowAfterModel = false;
      },
      continueNextStep() {
        let _this = this;
        _this.taskCreate(false);
        _this.editPriceAfterModel = false;
      },
      toLowContinueNextStep() {
        this.taskCreate(true);
      },
      getTaskInfo() {
        let _this = this;
        let type = _this.$route.query.type;
        api.getTaskInfo({
          taskId: _this.editTaskId
        }).then(res => {
          if (res.status) {
            _this.mainDefaultList = [];
            _this.pcDefaultList = [];
            _this.appDefaultList = [];
            if (!type) {
              _this.taskRelease.taskId = res.data.id;
            }
            _this.paidDeposit = (res.data.marginPaid + res.data.promotionExpensesPaid) / 100 || 0;
            _this.taskStatus = res.data.taskStatus;
            _this.mainDefaultList.push({src: res.data.taskMainImage});
            res.data.pinkage = res.data.pinkage.toString();
            _this.taskRelease.itemType = res.data.itemCatalog.id;
            for (let k in _this.taskRelease) {
              for (let i in res.data) {
                if (k === i) {
                  _this.taskRelease[k] = res.data[i];
                }
              }
            }
            //start 临时处理 10元包邮，白菜价活动下线复制历史活动
            const activityCategory = res.data.activityCategory;
            if(activityCategory === 'pinkage_for_10' || activityCategory === 'price_low'){
              _this.taskRelease.discountType = 'discount_0';
              _this.taskRelease.activityCategory = 'free_get';
            }
            //end
            if( _this.taskRelease.onlyShowForQualification){
              _this.taskRelease.onlyShowForQualification = false;
            }
            _this.itemReviewList = [];
            _this.itemReviewPushList = [];
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
            _this.taskRelease.taskDetail = {};
            if (res.data.taskType === 'tao_code') {
              _this.taoCodeTaskDetail = JSON.parse(res.data.taskDetail);
            } else if (res.data.taskType === 'pc_search') {
              _this.pcTaskDetail = JSON.parse(res.data.taskDetail);
              _this.addKeywordScheme = _this.pcTaskDetail.length - 1;
              _this.pcDefaultList.push({src: _this.pcTaskDetail[0].itemMainImage});
              _this.pcTaskDetailItemMainImage = _this.pcTaskDetail[0].itemMainImage;
              _this.conversionPrice('pc_search');
              if(!_this.isCountAssigned) {
                _this.pcTaskDetail.forEach(item => {
                  item.countAssigned = null;
                })
              }
              _this.isCountAssigned = null;
            } else if (res.data.taskType === 'app_search') {
              _this.appTaskDetail = JSON.parse(res.data.taskDetail);
              _this.addKeywordScheme = _this.appTaskDetail.length - 1;
              _this.appDefaultList.push({src: _this.appTaskDetail[0].itemMainImage});
              _this.appTaskDetailItemMainImage = _this.appTaskDetail[0].itemMainImage;
              _this.conversionPrice('app_search');
              if(!_this.isCountAssigned) {
                _this.appTaskDetail.forEach(item => {
                  item.countAssigned = null;
                })
              }
              _this.isCountAssigned = null;
            } else {
              _this.taskRelease.taskDetail = {};
            }
            if (_this.taskRelease.itemPrice >= 50) {
              _this.discountDisabled.discount_9_9.disabled = false;
            }
            if (_this.taskRelease.itemPrice >= 150) {
              _this.discountDisabled.discount_49_9.disabled = false;
            }
            if (_this.taskRelease.itemPrice >= 250) {
              _this.discountDisabled.discount_99_9.disabled = false;
            }
          } else {
            _this.$Message.error(res.msg);
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
        }
      },
      getItemCatalog() {
        let _this = this;
        api.itemCatalog().then(res => {
          if (res.status) {
            _this.itemCatalogList = res.data
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      uploadImg(e) {
        let _this = this;
        let file = e.target.files[0];
        let key = 'task' + '/' + randomString();
        aliUploadImg(key, file).then(res => {
          if (res) {
            let value = aliCallbackImgUrl + res.name + '!orgi75';
            _this.addImgRange = _this.$refs.myTextEditor.quill.getSelection();
            _this.$refs.myTextEditor.quill.insertEmbed(_this.addImgRange !== null ? _this.addImgRange.index : 0, 'image', value, Quill.sources.USER);
            document.getElementById(_this.uniqueId).value = '';
            _this.$Message.success('亲，图片上传成功！');
          }
        }).catch(err => {
          document.getElementById(_this.uniqueId).value = '';
          _this.$Message.warning('亲，图片上传失败！');
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
      openRecharge() {
        this.showPayModel = true;
      },
      closeRecharge() {
        this.showPayModel = false;
      },
      confirmPayment(pwd) {
        let _this = this;
        api.payByBalance({
          fee: _this.orderMoney,
          payPassword: pwd,
          taskId: _this.taskPayId,
          type: _this.priceHasChange ? 'supply_pay' : 'first_pay'
        }).then(res => {
          if (res.status) {
            _this.$store.dispatch('getUserInformation');
            _this.showPayModel = false;
            _this.$Message.success('恭喜您，支付成功！');
            _this.nextCurrent();
            _this.stepName = 'audit';
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      addItemReviewList() {
        let _this = this;
        let type = _this.taskRelease.taskType;
        _this.itemReviewList = [];
        let count =  _this.taskRelease.taskCount;
        for(let i =1; i <= count; i++){
          _this.itemReviewList.push({
            value: '',
            index: i,
          });
        }
        if(count > 0 && (type === 'pc_search' || type === 'app_search') && (count < _this.pcTaskDetail.length || count < _this.appTaskDetail.length)){
          _this.keywordLowerChangeModel = true;
        }
      },
      changeSelectEvaluation() {
        if(this.taskRelease.itemReviewSummary){
          this.taskRelease.itemReviewSummary = null;
        }
        if(this.itemReviewList.length > 0){
          this.itemReviewList.map(item =>{
            item.value = '';
          })
        }
        if(this.taskRelease.taskCount > 0){
          this.addItemReviewList();
        }
      },
      handleAdd () {
        let _this = this;
        let keywordLen = _this.taskRelease.taskCount > 0 ? _this.taskRelease.taskCount : 1;
        if(keywordLen > _this.addKeywordScheme + 1){
          _this.addKeywordScheme++;
        } else {
          _this.$Message.error('亲，您当前最多只能添加' + keywordLen + '套关键词方案');
          return;
        }
        if(_this.taskRelease.taskType === 'pc_search') {
          _this.pcTaskDetail.push({
            index: _this.addKeywordScheme,
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
          })
        }
        if(_this.taskRelease.taskType === 'app_search') {
          _this.appTaskDetail.push({
            index: _this.addKeywordScheme,
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
          })
        }
        _this.selectKeywordScheme = _this.addKeywordScheme;
      },
      handleClose (name) {
        let _this = this;
        let thisIndex;
        if(_this.taskRelease.taskType === 'pc_search') {
          _this.pcTaskDetail.forEach(item => {
            if(item.index === name){
              thisIndex = _this.pcTaskDetail.indexOf(item);
            }
          });
          _this.pcTaskDetail.splice(thisIndex, 1);
        }
        if(_this.taskRelease.taskType === 'app_search') {
          _this.appTaskDetail.forEach(item => {
            if(item.index === name){
              thisIndex = _this.appTaskDetail.indexOf(item);
            }
          });
          _this.appTaskDetail.splice(thisIndex, 1);
        }
        _this.addKeywordScheme -= 1;
        _this.selectKeywordScheme = thisIndex - 1;
      },
      selectChangeScheme(name) {
        this.selectKeywordScheme = name;
      },
      keywordLowerChange () {
        let _this = this;
        let type = _this.taskRelease.taskType;
        _this.keywordLowerChangeModel = false;
        if(type === 'pc_search'){
          _this.pcTaskDetail = [
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
          ];
          _this.addKeywordScheme = 0;
          _this.selectKeywordScheme = 0;
        }
        if(type === "app_search"){
          _this.appTaskDetail = [
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
          ];
          _this.addKeywordScheme = 0;
          _this.selectKeywordScheme = 0;
        }
      },
      closeClauseModel() {
        this.isShowUserClause = false;
      },
      getDetectionUserClauseTip() {
        let _this = this;
        api.detectionUserClauseTip().then(res =>{
          if(res.status){
            _this.isShowUserClause = !res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      addAnswer() {
        let _this = this;
        if(_this.browseAnswer < 3) {
          _this.browseAnswer++;
        }
      },
      deleteAnswer() {
        let _this = this;
        if(_this.browseAnswer > 1) {
          _this.browseAnswer--;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .task-release {
    [v-cloak] {
      display: none
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
    .main-color {
      color: $mainColor;
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
    .pay-model {
      @include fullScreenModel
    }
    .title-tip {
      height: 36px;
      line-height: 36px;
      margin: 52px auto 28px auto;
      color: #000;
      background-color: #FFF6F3;
      padding-left: 26px;
      font-size: 16px;
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
      .is-select-gou {
        position: absolute;
        display: inline-block;
        top: 26px;
        right: 0;
        width: 11px;
        height: 10px;
        background-image: url("~assets/img/common/select-gou.png");
        background-repeat: no-repeat;
      }
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
      &:hover {
        border: 2px solid #000;
        background-color: $mainColor;
        color: #fff;
      }
      &.isSelect {
        border: 2px solid #000;
        background-color: $mainColor;
        color: #fff;
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
      border: 1px solid #ddd;
      margin-top: 18px;
      position: relative;
    }
    .pop-tip-arrow {
      top: -18px;
      position: absolute;
      background: url("~assets/img/common/release-jt-iamge.png") no-repeat;
      width: 20px;
      height: 18px;
      &.free-get {
        left: 9%;
      }
      &.pinkage-for-10 {
        left: 48%;
      }
      &.present-get {
        left: 29%;
      }
      &.price-low {
        left: 68%;
      }
      &.goods-clearance {
        left: 88%;
      }
    }
    .ivu-modal-footer{
      display: none;
    }
    .default-text{
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
    .active-text{
      background-color: #000;
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
    .close-tag{
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
    .user-clause-model{
      @include fullScreenModel;
    }
  }

</style>

