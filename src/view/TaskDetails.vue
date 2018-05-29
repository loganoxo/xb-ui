<template>
  <div>
    <div class="task-details-ctt">
      <div class="container">
        <div class="breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>当前位置：</Breadcrumb-item>
            <Breadcrumb-item>白拿拿</Breadcrumb-item>
            <Breadcrumb-item v-if="commodityData.task.activityCategory">
              {{$store.state.TaskCategoryActiveList[commodityData.task.activityCategory].text}}
            </Breadcrumb-item>
            <Breadcrumb-item>{{commodityData.task.itemCatalog.parentItemCatalog.name}}</Breadcrumb-item>
            <Breadcrumb-item>{{commodityData.task.itemCatalog.name}}</Breadcrumb-item>
            <Breadcrumb-item v-if="commodityData.task.discountType === 'price_low'">
              {{parseFloat(commodityData.task.discountPrice/100)}}试用
            </Breadcrumb-item>
          </Breadcrumb>
        </div>
      </div>

      <div class="container">
        <div class="task-details-top">
          <div class="task-details-top-left left">
            <img :src="commodityData.task.taskMainImage + '!orgi75'" alt="">
          </div>
          <div class="task-details-top-right left">
            <h3 class="fs-18">
              {{commodityData.task.taskName}}
              <span v-if="commodityData.task.activityCategory === 'pinkage_for_10'"
                    style=" font-size:14px; padding: 0 4px; background: #ff9966; color: #fff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">10元包邮</span>
              <span v-if="commodityData.task.activityCategory === 'present_get'"
                    style="font-size:14px; padding: 0 4px; background: #00cc66; color: #ffffff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">体验专区</span>
              <span v-if="commodityData.task.activityCategory === 'price_low' && commodityData.task.discountPrice"
                    class=" clfff home-discount-price mt-5"
                    :style="{backgroundColor: $store.state.discountPriceType[parseFloat(commodityData.task.discountPrice/100)].backgroundColor}">
                    {{commodityData.task.discountPrice/100}}试用
                  </span>
              <span v-if="commodityData.task.activityCategory === 'price_low' && commodityData.task.discountRate"
                    class=" clfff home-discount-price mt-5"
                    :style="{backgroundColor: $store.state.discountPriceType[parseFloat(commodityData.task.discountRate/10) + '折'].backgroundColor}">
                    {{commodityData.task.discountRate/10}}折试用
                  </span>
              <span v-if=" commodityData.task.activityCategory === 'goods_clearance' && commodityData.task.discountRate "
                    class=" clfff home-discount-price mt-5"
                    :style="{backgroundColor: $store.state.discountPriceType[parseFloat(commodityData.task.discountRate/10) + '折'].backgroundColor}">
                    {{commodityData.task.discountRate/10}}折清仓
                  </span>
            </h3>
            <p class="fs-14">
              活动类型：
              <span class="fs-18">{{commodityData.task.taskTypeDesc}}</span>
              <span v-if="commodityData.task.discountType === 'price_low'" class="fs-14"
                    style="color: #fff; padding: 2px 5px;"
                    :style="{backgroundColor: $store.state.discountPriceType[parseFloat(commodityData.task.discountPrice/100)].backgroundColor}">{{parseFloat(commodityData.task.discountPrice/100)}}试用</span>
            </p>
            <p class="fs-14">
              宝贝单价：<span class="fs-18" style="text-decoration: line-through;">{{(commodityData.task.itemPrice/100).toFixed(2)}}</span>

              &nbsp;&nbsp;
              <span style="font-weight: bold; font-size: 20px" v-if="commodityData.task.discountPrice">￥{{commodityData.task.discountPrice / 100}}</span>
              <span style="font-weight: bold; font-size: 20px"
                    v-if="!commodityData.task.discountPrice && commodityData.task.discountRate">
                ￥{{(Math.floor((commodityData.task.discountRate/100) * commodityData.task.itemPrice)/100).toFixed(2)}}
              </span>
              <span style="font-weight: bold; font-size: 20px"
                    v-if="!commodityData.task.discountPrice && !commodityData.task.discountRate">
                ￥0
              </span>元
              <span class="cl999">（需垫付约{{(commodityData.task.perMarginNeed/100).toFixed(2)}}）</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              活动份数：<span class="fs-18"> {{commodityData.task.taskCount}} </span>份
            </p>
            <!--打赏费，勿删-->
            <!--<div v-if="getUserRole === 0 && isLogin === true">-->
              <!--<p class="f-b cl000 fs-14" v-if="commodityData.task.createTime>=1526464800000">完成该活动可额外获得打赏费<span v-if="commodityData.task.activityCategory === 'free_get'">1</span><span v-else-if="commodityData.task.activityCategory === 'present_get'">2</span>元</p>-->
              <!--<p class="f-b cl000 fs-14" v-else>完成该活动可额外获得打赏费0元</p>-->
            <!--</div>-->
            <p class="fs-14">（商家已存入总活动担保金&nbsp;{{commodityData.task.totalMarginNeed/100}}&nbsp;元，请放心申请）</p>
            <p class="fs-14">{{commodityData.task.showkerApplyTotalCount}} 人申请，{{parseInt(commodityData.trailOn) ?
              commodityData.trailOn: 0}} 人正在参与活动，{{parseInt(commodityData.trailDone) ? commodityData.trailDone : 0}}
              人完成活动， 剩余 {{commodityData.task.taskCount - commodityData.task.showkerApplySuccessCount >= 0 ? commodityData.task.taskCount - commodityData.task.showkerApplySuccessCount : 0}} 份
              <span class="inline-block tag" v-if="getRole === 0 && isShowAddGroupTip">
              <a href="http://shang.qq.com/wpa/qunwpa?idkey=c8b3150dbd8821f50cced9a08831de701636de9ae107e707114150d0050df9a4"
                target="_blank">内部QQ群：478360486 ，据说里面的人都抢到了！</a>
              <span class="close-tag" @click="handleCloseTag()"><Icon type="ios-close-empty"></Icon></span>
            </span>
              <span class="inline-block tag" v-if="getRole === 1 && isShowAddGroupTip">
              <a :href="pcMerchantQqGroup.remark"
                target="_blank">加入商家QQ群：{{pcMerchantQqGroup.configValue}} ，学习怎样有效放单！</a>
              <span class="close-tag" @click="handleCloseTag()"><Icon type="ios-close-empty"></Icon></span>
            </span>
            </p>
            <div class="fs-14">
              <i class="ivu-icon ivu-icon-clock fs-16"></i>
              距申请结束：
              <time-down
                v-show="applyBtnShow === 'buyerTasking' || applyBtnShow === 'noLogin' || applyBtnShow === 'sellerTasking' "
                color="#495060" size="20" :endTime="commodityData.task.endTime"></time-down>
              <span v-show="applyBtnShow === 'taskEnd'">已结束</span>
            </div>
            <div style="margin: 0; line-height: 40px; font-size: 14px;">
              好东西要分享：
              <div class="inline-block" v-html="copyHtml"></div>
            </div>
            <div class="task-details-btn-box">
              <iButton v-show="applyBtnShow === 'taskEnd'" disabled size="large" class="fs-16 default-btn" long
                       style="width: 150px;">已结束
              </iButton>
              <div>
                <div v-if="applyBtnShow === 'buyerTasking'&& commodityData.task.online">
                  <div>
                    <iButton style="width: 150px;" v-show="!commodityData.taskApply" :disabled="taskApplyLoading"
                             size="large" class="fs-16 default-btn" long type="primary" @click="applyForTrialFunc">申请活动
                    </iButton>
                    <span
                      v-show="!commodityData.taskApply && (commodityData.task.taskCount - commodityData.task.showkerApplySuccessCount <= 0) "
                      class="cl999 inline-block ml-10 fs-14">还有{{parseInt(commodityData.task.taskCount) - parseInt(commodityData.trailDone)}}人未完成活动，仍有机会获得活动资格</span>
                  </div>
                  <iButton style="width: 150px;" v-show="commodityData.taskApply||disabled" disabled size="large"
                           class="fs-16 default-btn" long>已申请
                  </iButton>
                </div>
                <div v-if="applyBtnShow === 'buyerTasking'&& !commodityData.task.online">
                  <iButton size="large" v-if="commodityData.taskApply" disabled class="fs-16 default-btn" style="width: 150px;">已申请</iButton>
                  <iButton size="large" v-if="!commodityData.taskApply" disabled class="fs-16 default-btn" style="width: 150px;">已下线</iButton>
                </div>
                <div v-if="applyBtnShow === 'sellerTasking'">
                  <iButton size="large" v-if="!commodityData.task.online" disabled class="fs-16 default-btn" style="width: 150px;">已下线</iButton>
                  <iButton v-else size="large" class="fs-16 default-btn" type="warning"
                           style="width: 200px;">商家号不可以参加活动
                  </iButton>
                </div>
                <div v-if="applyBtnShow === 'noLogin' && commodityData.task.online">
                  <a class="ivu-btn ivu-btn-primary ivu-btn-large" @click="selectLogin = true" style="width: 150px;">
                    申请活动
                  </a>
                  <span
                    v-show="!commodityData.taskApply && (commodityData.task.taskCount - commodityData.task.showkerApplySuccessCount <= 0) "
                    class="cl999 inline-block ml-10 fs-14">还有{{parseInt(commodityData.task.taskCount) - parseInt(commodityData.trailDone)}}人未完成活动，仍有机会获得活动资格</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="task-details-step">
          <div class="left title">平台流程<span></span></div>
          <ul class="left ctt">
            <li>
              <span>1</span>
              <em>提交申请</em>
              <i class="ivu-icon ivu-icon-chevron-right"></i>
            </li>
            <li>
              <span>2</span>
              <em>商家审核，通过后即可获得拿手资格 </em>
              <i class="ivu-icon ivu-icon-chevron-right"></i>
            </li>
            <li>
              <span>3</span>
              <em> 按照商家指定的方式，以{{(commodityData.task.itemPrice/100).toFixed(2)}}的价格购买本宝贝</em>
              <i class="ivu-icon ivu-icon-chevron-right"></i>
            </li>
            <li>
              <span>4</span>
              <em>收到宝贝后，提交买家秀</em>
              <i class="ivu-icon ivu-icon-chevron-right"></i>
            </li>
            <li>
              <span>5</span>
              <em v-if="!commodityData.task.discountPrice && !commodityData.task.discountRate">
                商家返还{{(parseInt(commodityData.task.itemPrice)/100).toFixed(2)}}元到您的平台账户（可提现），圆满结束 </em>
              <em v-if="commodityData.task.discountPrice"> 商家返还{{((parseInt(commodityData.task.itemPrice) -
                parseInt(commodityData.task.discountPrice))/100).toFixed(2)}}元到您的平台账户（可提现），圆满结束 </em>
              <em v-if="!commodityData.task.discountPrice && commodityData.task.discountRate">
                商家返还{{(Math.ceil(commodityData.task.itemPrice * (1 -
                commodityData.task.discountRate/100))/100).toFixed(2)}}元到您的平台账户（可提现），圆满结束 </em>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="graphic-info">
          <div class="graphic-info-sel">
            <a :class="[graphicInfoSelClass == graphicSel.isClass ? 'active' : '' ]"
               v-for="graphicSel in graphicInfoSels" :key="graphicSel.isClass" @click="graphicSelFunc(graphicSel)">
              {{graphicSel.text}}
              <span v-if=graphicSel.num>({{graphicSel.num}})</span>
            </a>
          </div>
          <div class="graphic-info-ctt">
            <div v-show="graphicInfoSelClass === 'activity'" class="graphic-info-details">
              <div v-if="commodityData.showkerTask" class="bgF1F1F1 pd-20 task-step-explain mb-20">
                <place-order-step v-if="Object.keys(showkerTask).length > 0" :showkerTaskInfo="showkerTask" :isShowPrecautions="false" @changeTask="getShowkerToProcessOrder"></place-order-step>
              </div>
              <div class="fs-18 text-ct">
                <div class="precautions mb-20 pt-10">
                  <p>注意事项：</p>
                  <p class="mt-10" v-if="commodityData.task.showkerOrderTimeLimit">
                    <span>下单速度：</span>
                    <span>{{commodityData.task.showkerOrderTimeLimit}}小时</span>
                    <Tooltip content="通过审批后需要指定时间内完成淘宝下单并在本平台提交订单号，否则资格自动过期" placement="top-start">
                      <Icon class="fs-14 ml-5" type="help-circled"></Icon>
                    </Tooltip>
                  </p>
                  <p class="mt-10" v-if="commodityData.task.orderQuantity">
                    <span>拍下件数：</span>
                    <span>{{commodityData.task.orderQuantity || 1}}</span>
                  </p>
                  <p class="mt-10">
                    <span>付款方式：</span>
                    <span v-if="commodityData.task.paymentMethod === 'all'">无所谓（可以使用花呗、信用卡等付款，也可以不用）</span>
                    <span v-if="commodityData.task.paymentMethod === 'no_hua_and_credit_pay'">禁止使用花呗和信用卡付款</span>
                    <span v-if="commodityData.task.paymentMethod === 'no_hua_pay'">禁止使用花呗付款</span>
                    <span v-if="commodityData.task.paymentMethod === 'no_credit_pay'">禁止使用信用卡付款</span>
                  </p>
                  <p class="mt-10 mr-10" v-if="commodityData.task.remark && commodityData.showkerTask">
                    <span>商家备注：</span>
                    <span>{{commodityData.task.remark}}</span>
                  </p>
                  <p class="mt-10"
                     v-if="!commodityData.showkerTask && commodityData.task.itemReviewRequired !== 'review_by_showker_self'">
                    <span>评价要求：</span>
                    <span>商家对淘宝评价有要求，</span>
                    <span class="cl000">获得活动资格后需按商家要求进行评价！</span>
                  </p>
                  <p class="mt-10"
                     v-if="commodityData.task.itemReviewRequired === 'offer_review_summary' && commodityData.showkerTask">
                    <span>评论要求：</span>
                    <span class="cl000">商家希望亲</span>
                    <span class="cl-red">在淘宝</span>
                    <span class="cl000">从以下角度进行评价！</span>
                  </p>
                  <p class="evaluation-content-tip cl666"
                     v-if="commodityData.task.itemReviewRequired === 'offer_review_summary' && commodityData.showkerTask">
                    {{commodityData.task.itemReviewSummary}}</p>
                  <p class="mt-10"
                     v-if="commodityData.task.itemReviewRequired === 'assign_review_detail' && commodityData.showkerTask">
                    <span>评论要求：</span>
                    <span class="cl000">商家要求</span>
                    <span class="cl-red">在淘宝</span>
                    <span class="cl000">使用下方提供的内容进行评价，为避免纠纷，</span>
                    <span>请务必按照要求操作！</span>
                  </p>
                  <div class="evaluation-content-tip cl666"
                       v-if="commodityData.task.itemReviewRequired === 'assign_review_detail' && commodityData.showkerTask">
                    <div v-if="showkerTask.other && showkerTask.other.itemReviewAssign">{{showkerTask.other.itemReviewAssign.reviewContent}}</div>
                    <!--<div class="copy-evaluation-tbn mt-10 copy-btn" :data-clipboard-text="showkerTask.other.itemReviewAssign.reviewContent">复制评价内容</div>-->
                  </div>
                </div>
                <div v-if="commodityData.cannotShowItemDescriptionOfQualification">
                  <Icon type="information-circled" color="#FF6633" size="30" style="vertical-align: sub;"></Icon>
                  获得资格后才能看到活动品信息哦~
                  <div v-if="applyBtnShow === 'buyerTasking'" class="inline-block">
                    <iButton v-show="!commodityData.taskApply" :disabled="taskApplyLoading" style="width: 100px;"
                             size="large" class="fs-16 default-btn ivu-btn-small" type="error"
                             @click="applyForTrialFunc">申请活动
                    </iButton>
                    <iButton v-show="commodityData.taskApply" disabled size="large" class="fs-16 default-btn" long>已申请
                    </iButton>
                  </div>
                  <a v-if="applyBtnShow === 'noLogin'" class="ivu-btn ivu-btn-primary ivu-btn-small"
                     @click="selectLogin = true" style="width: 100px;">
                    申请活动
                  </a>
                  <iButton v-show="timeEndShow" disabled size="small" class="fs-16 default-btn" long
                           style="width: 100px;">已结束
                  </iButton>
                </div>
              </div>

              <div class="text-ct mt-20 graphic-info-itemDescription" v-show="!commodityData.cannotShowItemDescriptionOfQualification">
                <div v-html="commodityData.task.itemDescription"></div>
              </div>
            </div>
            <div v-show="graphicInfoSelClass == 'report'" class="graphic-info-report">
              <ul v-if="detailsShowkerList.length > 0">
                <li v-for="detailsShowker in detailsShowkerList">
                  <div>
                    <router-link class="block"
                                 :to="{path:'/trial-report',query:{q:encryptionId(detailsShowker.showkerId)}}">
                      <img :src="getUserHead(detailsShowker.showkerPortraitPic)" alt="" width="86" height="86"
                           class="border-radius-50">
                    </router-link>

                    <p>{{detailsShowker.other.nickname}}</p>
                  </div>
                  <div>
                    <p>发表于{{detailsShowker.createTime | dateFormat('YYYY-MM-DD hh:mm:ss')}}</p>
                    <p class="text">
                      {{detailsShowker.trialReportText}}
                      <router-link
                        :to="{'path':'/trial-report','query':{'q': encryptionId(detailsShowker.showkerId), 'showReportDesc': true, 'id': encryptionId(detailsShowker.id)}}">
                        查看全文
                      </router-link>
                    </p>
                    <p>
                      <a v-for="trialReportImage in detailsShowker.trialReportImages"
                         @click="trialReportPicShowFunc(trialReportImage)">
                        <img :src="trialReportImage + '!thum54'" alt="">
                      </a>
                    </p>

                  </div>
                </li>
              </ul>
              <div v-if="detailsShowkerList.length <=0" class="fs-14 text-ct pt-20 pb-20">
                暂无数据
              </div>
              <div class="text-ct pd-tb-20" v-if="detailsShowkerList.length > 0">
                <Page
                  :total=totalElements
                  :page-size=5
                  @on-change=pageChange
                  show-elevator
                ></Page>
              </div>
            </div>
            <div v-show="graphicInfoSelClass === 'audited'" class="graphic-audited-buyer">
              <router-link
                :to="{ 'path': '/trial-report','query': {'q': encryptionId(detailsSuccessShowker.showkerId)}}"
                :key="detailsSuccessShowker.id" v-show="detailsSuccessShowkerList.length > 0 "
                v-for="detailsSuccessShowker in detailsSuccessShowkerList">
                <img :src="getUserHead(detailsSuccessShowker.showkerPortraitPic)" width="68" height="68" alt=""
                     class="user-head">
                <p class="cl000">{{detailsSuccessShowker.showkerNickName}}</p>
                <img :src="detailsSuccessShowker.creditLevel" alt="">
                <p class="cl000"><span>淘气值：{{detailsSuccessShowker.tqz}}</span></p>
              </router-link>
              <p v-show="detailsSuccessShowkerList.length <= 0 " class="text-ct fs-14">
                暂无已通过的申请拿手
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="selWwModel" class-name="vertical-center-modal" ok-text="确定" cancel-text="" @on-ok="selWwFunc()">
      <p class="fs-18 fb mt-20" style="color: #FF6600">请选择活动旺旺号:</p>
      <p class="fs-14 mt-10">注意：请 <span style="color: #FF6600">务必使用选择的旺旺号下单购买</span>，否则订单审核将无法通过！</p>
      <Radio-group class="mt-20" v-model="selectedWw">
        <Radio v-for="ww in wwList" :label="ww.id" :key="ww.id" :disabled="wwState[ww.status].disabled">
          <span :class="[ww.status !== 2 ? 'cl999':'']">{{ww.alitmAccount}}</span>
          <span v-if="wwState[ww.status].text" :class="[ww.status !== 2 ? 'cl999':'']">({{wwState[ww.status].text}})</span>
        </Radio>
      </Radio-group>
      <span v-if="!canUseWw" style="color: #FF6600">（无可用旺旺号）</span>
      <div v-if="limit">
        <p class="mt-10">本次申请将消耗 <span class="clff6633"> “1次” </span> 申请次数，当前您的剩余次数为 <span class="clff6633"> “{{residue}}次” </span> </p>
        <div class="mt-10">
          <a class="pos-rel apply-num">
            想要更多申请次数
            <i class="up-icon"></i>
            <p>
              每个拿手每天都有{{showkerApplyTotal}}次申请活动的机会，扫描以下二维码，关注51白拿拿公众号并分享宝贝，获取更多申请次数！
              <img style="width: 200px" src="/static/img/common/qr_code_bainana.png" alt="" class="mt-10 block">
            </p>
          </a>
        </div>
      </div>
    </Modal>
    <Modal v-model="applySuccess" width="500">
      <p class="mt-20 mb-20 text-ct fs-22" style="height: 50px;line-height: 50px">
        <Icon type="checkmark-circled" color="#3E9D3E" :size="40" style="vertical-align: sub;"></Icon>
        提交申请成功，请耐心等待商家审核
      </p>
      <div slot="footer" class="text-ct">
        <router-link class="ivu-btn ivu-btn-primary ivu-btn-large mr-40" to="/user/my-probation/wait" style="color: #fff">
          看看我申请的宝贝
        </router-link>
        <span @click="refreshPage" class="ivu-btn ivu-btn-primary ivu-btn-large cl-fff">好的，明白了</span>
      </div>
    </Modal>
    <Modal v-model="selectLogin" width="500">
      <p class="mt-20 mb-40 text-ct fs-22 vtc-mid" style="height: 50px;line-height: 50px">
        <Icon type="android-alert" size="20" color="#f9284f"></Icon>
        亲，你还没登录哦~
        <br>
        <span class="fs-12">请先登录后再申请免费活动</span>
      </p>
      <div slot="footer" class="text-ct">
        <router-link class="ivu-btn ivu-btn-primary ivu-btn-large mr-40 ml-40" to="/login"
                     style="color: #fff; width: 102px;">马上登录
        </router-link>
        <router-link class="ivu-btn ivu-btn-primary ivu-btn-large mr-40" to="/sel-role"
                     style="color: #fff;  width: 102px;">新用户注册
        </router-link>
      </div>
    </Modal>
    <Modal v-model="trialReportPicShow" width="600">
      <div style="text-align:center">
        <img :src="trialReportPic" alt="" style="width: 100%;margin-top: 20px;">
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="alitNumSuccess" cancel-text="" ok-text="去绑定旺旺号" @on-ok="goWwBind()">
      <div class="ivu-modal-confirm-body">
        <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning">
          <i class="ivu-icon ivu-icon-android-alert vtd-mid"></i></div>
        <div><p class="fs-20 f-b">亲，你还没绑定旺旺号 </p><br> <span class="fs-12">请先绑定旺旺号在申请活动!</span></div>
      </div>
    </Modal>
    <Modal v-model="inBlackListPop" class="text-ct">
      <div class="fs-20 f-b mt-30"><Icon type="information-circled" class="main-color mr-5"></Icon><span>糟糕，出事儿了~</span></div>
      <div class="mt-20 mb-20">你的旺旺号已被此商家拉黑，无权申请该活动~</div>
      <div slot="footer" class="text-ct">
      </div>
    </Modal>
  </div>

</template>

<script>
  import {Tooltip, Icon, Alert, Form, Input, Button, Radio, Modal, Page, Breadcrumb} from 'iview'
  import api from '@/config/apiConfig'
  import PlaceOrderStep from '@/components/PlaceOrderStep'
  import {setStorage, getStorage, getSeverTime, decode, encryption, taskErrorStatusList} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import TimeDown from '@/components/TimeDown'
  import TaskApplyBefore from '@/components/TaskApplyBefore'

  export default {
    name: 'TaskDetails',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      iButton: Button,
      ButtonGroup: Button.Group,
      Icon: Icon,
      Radio: Radio,
      RadioGroup: Radio.Group,
      Modal: Modal,
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item,
      Page: Page,
      TimeDown: TimeDown,
      PlaceOrderStep: PlaceOrderStep,
      Alert: Alert,
      TaskApplyBefore: TaskApplyBefore,
      Tooltip: Tooltip,
    },
    data() {
      return {
        inBlackListPop: false,
        copyHtml: '',
        copyValue: '',
        showkerTask: {},
        disabled: false,
        timeEndShow: false,
        applyBtnShow: '',
        taskApplyLoading: false,
        alitNumSuccess: false,
        selectLogin: false,
        trialReportPicShow: false,
        trialReportPic: '',
        selWwModel: false,
        residue: null,
        showkerApplyTotal: null,
        selectedWw: '',
        wwList: {},
        tryImgShow: false,
        applySuccess: false,
        totalElements: 1,
        commodityData: {
          showkerTask: {},
          taskApply: {},
          task: {
            itemCatalog: {
              parentItemCatalog: {}
            }
          }
        },
        graphicInfoSels: [
          {
            text: '活动详情',
            num: '',
            isClass: 'activity',
            callback: ''
          },
          {
            text: '买家秀',
            num: '',
            isClass: 'report',
            callback: this.getDetailsShowkerList
          },
          {
            text: '已审批拿手',
            num: '',
            isClass: 'audited',
            callback: this.getDetailsSuccessShowkerList
          }
        ],
        graphicInfoSelClass: 'activity',
        detailsShowkerParams: {
          taskId: '',
          pageIndex: 1
        },
        detailsSuccessShowkerParams: {
          taskId: '',
          pageIndex: 1
        },
        detailsShowkerList: [],
        detailsSuccessShowkerList: [],
        wwState: [
          {
            state: 0,
            text: "未申请审核",
            disabled: true,
          },
          {
            state: 1,
            text: "审核中",
            disabled: true,
          },
          {
            state: 2,
            text: "",
            disabled: false,
          },
          {
            state: 3,
            text: "审核未通过",
            disabled: true,
          },
          {
            state: 4,
            text: "冻结",
            disabled: true,
          },
          {
            state: 5,
            text: "停用",
            disabled: true,
          },
        ],
        canUseWw: false,
        isShowAddGroupTip: true,
        limit: false,
      }
    },
    created() {
      let self = this;
      self.copyValue = window.location.href;
      let discount = self.$route.query.discount;
      if (getStorage('disCountTaskCategory')) {
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: getStorage('disCountTaskCategory'),
        });
      }
      if (discount) {
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: true
        });
      } else {
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: false
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all'
        });
      }
      if (self.$store.state.login) {
        self.getShowkerApplyCount()
      }
      self.getTaskDetails();
      self.getDetectionAddGroupTip();
    },
    mounted() {
    },
    destroyed() {
      let self = this;
      self.$store.commit({
        type: 'TASK_CATEGORY_LIST',
        info: 'home'
      });
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getRole() {
        return this.$store.state.userInfo.role
      },
      pcMerchantQqGroup() {
        return this.$store.getters.getPcMerchantQqGroup
      },
      getUserRole() {
        return this.$store.getters.getUserRole
      },
    },
    methods: {
      encryptionId(id) {
        return encryption(id);
      },
      getUserHead(src) {
        if (src && src.indexOf('head-image') >= 0) {
          return aliCallbackImgUrl + src + '!thum80'
        } else if (src && (src.indexOf('q.qlogo.cn/qq') >= 0 || src.indexOf('wx.qlogo.cn') >= 0)) {
          return src
        } else {
          return '/static/img/common/tx-default.png'
        }
      },
      refreshPage() {
        let self = this;
        this.applySuccess = false;
        self.getTaskDetails();
      },
      applyForTrialFunc() {
        let self = this;
        if (!self.$store.state.login) {
          self.$Modal.warning({
            content: '亲，先登录哦！',
            onOk: function () {
              self.$router.push({name: 'login'});
            }
          });
        } else {
          self.getShowkerCanTrial();
        }
      },
      getShowkerApplyCount() {
        let self = this;
        api.getShowkerApplyCount().then(res => {
          if (res.status) {
            self.limit = res.data.limit;
            self.residue = res.data.left;
            self.showkerApplyTotal = res.data.baseShareGet;
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getShowkerCanTrial() {
        let self = this;
        self.taskApplyLoading = true;
        api.showkerCanTrial({
          taskId: decode(self.$route.query.q)
        }).then((res) => {
          self.taskApplyLoading = false;
          if (res.status) {
            self.selWwModel = true;
            // let selRes = false;
            self.wwList = res.data.alitmList;
            for (let i = 0, j = res.data.alitmList.length; i < j; i++) {
              if (res.data.alitmList[i].status === 2) {
                // selRes = true;
                self.canUseWw = true;
                break;
              }
            }
          } else {
            if (res.statusCode === 'alitm_null') {
              self.alitNumSuccess = true;
            } else {
              self.$Modal.warning({
                content: '<p class="fs-14">' + res.msg + '</span>',
              });
            }
          }
        })
      },
      goWwBind() {
        this.$router.push({path: '/user/personal-setting/ww-bind'});
      },
      getDetailsShowkerList() {
        let self = this;
        self.detailsShowkerParams.taskId = decode(self.$route.query.q);
        api.getDetailsShowkerList(self.detailsShowkerParams).then((res) => {
          if (res.status) {
            for (let i = 0, j = res.data.content.length; i < j; i++) {
              res.data.content[i].trialReportImages = JSON.parse(res.data.content[i].trialReportImages);
            }
            self.detailsShowkerList = res.data.content;
            self.totalElements = res.data.totalElements;
            self.graphicInfoSels[1].num = res.data.totalElements;
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getDetailsSuccessShowkerList() {
        let self = this;
        self.detailsSuccessShowkerParams.taskId = decode(self.$route.query.q);
        api.getDetailsSuccessShowkerList(self.detailsSuccessShowkerParams).then((res) => {
          if (res.status) {
            self.detailsSuccessShowkerList = res.data;
            this.graphicInfoSels[2].num = res.totalElements;
          }
        })
      },
      getShowkerToProcessOrder() {
        let self = this;
        api.showkerToProcessOrder({
          id: self.commodityData.showkerTask.id
        }).then((res) => {
          self.showkerTask = res.data.showkerTask;
        })
      },
      getTaskDetails() {
        let self = this;
        self.commodityData = {
          showkerTask: {},
          taskApply: {},
          task: {
            itemCatalog: {
              parentItemCatalog: {}
            }
          }
        };
        api.getTaskDetails({taskId: decode(self.$route.query.q)}).then((res) => {
          if (res.status) {
            self.commodityData = res.data;
            self.$set(self.commodityData);
            if (self.commodityData.task.discountPrice) {
              self.$store.commit({
                type: 'TASK_CATEGORY_LIST',
                info: 'discount'
              });
            }
            self.$store.commit({
              type: 'SET_ACTIVITY_CATEGORY',
              info: self.commodityData.task.activityCategory
            });
            if (self.commodityData.showkerTask) {
              self.getShowkerToProcessOrder();
            }
            parseInt(res.data.task.endTime) - parseInt(getSeverTime()) > 0 ? self.timeEndShow = false : self.timeEndShow = true;
            if (self.timeEndShow || parseInt(self.commodityData.task.taskCount) <= parseInt(self.commodityData.trailDone) || res.data.task.taskStatus === 'finished') {
              self.applyBtnShow = "taskEnd";
            } else {
              if (self.$store.state.login) {
                if (self.$store.state.userInfo.role === 1) {
                  self.applyBtnShow = "sellerTasking";
                } else {
                  self.applyBtnShow = "buyerTasking"
                }
              } else {
                self.applyBtnShow = 'noLogin';
              }
            }
            if (self.$route.query.resubmit === 'resubmit') {
              self.applyForTrialFunc()
            }
            parseInt(res.data.trailDone) ? self.graphicInfoSels[1].num = res.data.trailDone : self.graphicInfoSels[1].num = 0;
            if (parseInt(res.data.task.showkerApplySuccessCount) || parseInt(res.data.trailEnd)) {
              self.graphicInfoSels[2].num = parseInt(res.data.task.showkerApplySuccessCount) + parseInt(res.data.trailEnd)
            } else {
              self.graphicInfoSels[2].num = 0;
            }
            self.$nextTick(() => {
              self.initJS();
              self.initCss();
              self.copyHtml = '<div style="display: inline-block" data-sites="qzone, qq, weibo" data-title="【秀吧365】' + self.commodityData.task.taskName + '" data-image=' + self.commodityData.task.taskMainImage + ' data-description= " ' + self.commodityData.task.taskName + ' ' + self.copyValue + '秀吧365，万千商品每日更新，赶快和我一起来免费试用吧！" class="social-share" data-url=' + self.copyValue + '></div>';
            });
          } else {
            self.$Message.error(res.msg);
          }

        })
      },
      selWwFunc() {
        let self = this;
        let selRes = false;
        if (self.residue > 0) {
          for (let i = 0, j = self.wwList.length; i < j; i++) {
            if (self.wwList[i].status === 2) {
              selRes = true;
              break;
            }
          }
          if (selRes) {
            if (self.selectedWw === '') {
              self.$Message.info('请选择旺旺号');
            } else {
              api.showkerApplySelWwId({
                wangwangId: self.selectedWw,
                taskId: decode(self.$route.query.q),
                searchCondition: null,
                itemLocation: null,
                browseToBottom: null,
                enshrine: null,
                addToCart: null
              }).then((res) => {
                if (res.status) {
                  self.applySuccess = true;
                } else {
                  if (res.msg === '你的旺旺号已被此商家拉黑,无权申请该活动') {
                    self.inBlackListPop = true;
                  } else {
                    self.$Message.error(res.msg);
                  }
                }
              })
            }

          } else {
            self.$Message.info('无可用旺旺号');
          }
        } else {
          self.$Message.warning('亲，申请次数已用完');
        }
      },
      graphicSelFunc(graphicSel) {
        this.graphicInfoSelClass = graphicSel.isClass;
        if (typeof graphicSel.callback === 'function') {
          graphicSel.callback();
        }
      },
      pageChange(data) {
        this.detailsShowkerParams.pageIndex = data;
        this.getDetailsShowkerList();
      },
      trialReportPicShowFunc(trialReportImage) {
        this.trialReportPicShow = true;
        this.trialReportPic = trialReportImage;
      },
      initJS() {
        const url = 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js';
        const script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script)
      },
      initCss() {
        const url = 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css';
        const link = document.createElement('link');
        link.setAttribute('href', url);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(link)
      },
      handleCloseTag() {
        let _this = this;
        api.setAddGroupTip().then(res => {
          if (res.status) {
            _this.$Message.success('关闭成功！');
            _this.isShowAddGroupTip = false;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
      getDetectionAddGroupTip() {
        let _this = this;
        api.detectionAddGroupTip().then(res => {
          if (res.status) {
            _this.isShowAddGroupTip = !res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        })
      },
    },
    watch: {
      '$route'(to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        let taskId = decode(this.$route.query.q);
        this.getTaskDetails(taskId);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';

  .home-discount-price {
    color: #fff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    margin-right: 15px;
    margin-left: 5px;
    font-size: 14px;
    font-weight: normal;
  }

  .ivu-modal-footer {
    border: none;
  }

  .task-step-explain {
    padding: 2px 50px 30px 50px;
    p.task-step-title {
      font-size: 24px;
      color: #666;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }
    ul {
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      li {
        line-height: 40px;
        height: 40px;
        span {
          color: #000;
          font-weight: bold;
        }
      }

    }
  }

  .task-details-ctt {
    background-color: #f1f1f1;
    .my-pop {
      position: relative;

    }
    .task-details-top {
      background-color: #fff;
      padding: 10px;
      height: 380px;
      .task-details-top-left {
        margin-right: 50px;
        img {
          width: 360px;
          height: 360px;
          display: block;
        }
      }
      .task-details-top-right {
        width: 770px;
        padding: 15px 0;
        p {
          line-height: 40px;
        }
        div.task-details-btn-box {
          margin-top: 10px;
        }
      }
    }
    .task-details-step {
      height: 80px;
      background-color: #fff;
      margin: 10px 0;
      div.title {
        position: relative;
        width: 60px;
        font-size: 18px;
        padding: 13px 10px 10px 10px;
        background-color: $mainColor;
        font-weight: bold;
        color: #fff;
        text-align: center;
        height: 100%;
        span {
          position: absolute;
          right: -12px;
          top: 50%;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          margin-top: -3px;
          border-left-color: $mainColor;
        }
      }
      ul.ctt {
        display: table;
        height: 100%;
        padding: 0 10px;
        width: 1140px;
        li {
          display: table-cell;
          vertical-align: middle;
          font-size: 14px;
          width: 20%;
          span {
            display: inline-block;
            width: 38px;
            height: 38px;
            line-height: 38px;
            border-radius: 50%;
            background-color: #fd5474;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin: 0 2px;
          }
          em {
            font-style: normal;
            width: 58%;
            display: inline-block;
            vertical-align: middle;
          }
          i {
            font-size: 38px;
            vertical-align: middle;
            color: #ccc;
          }
        }
      }
    }
    .graphic-info {
      background-color: #fff;
      margin-bottom: 60px;

      .graphic-info-sel {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        a {
          display: inline-block;
          font-size: 18px;
          color: #666;
          padding: 0 30px;
          text-align: center;
          border-bottom: 2px solid transparent;
        }
        a.active {
          border-bottom: 2px solid $mainColor;
        }
      }
      .graphic-info-ctt {
        .graphic-info-details {
          padding: 20px 20px 40px 20px;
          .graphic-info-itemDescription p img {
            max-width: 800px !important;
          }
          ul {
            line-height: 36px;
          }
        }
        .graphic-info-report {
          ul {
            li {
              display: table;
              padding: 30px 0;
              border-bottom: 1px solid #ddd;
              width: 100%;
              div {
                display: table-cell;
                vertical-align: middle;
              }
              > div:first-child {
                width: 150px;
                text-align: center;
              }
              > div:last-child {
                width: 1000px;
                p {
                  line-height: 30px;
                  font-size: 14px;
                  &:first-child {
                    color: #999;
                  }
                  &:last-child {
                    margin-top: 10px;
                    a {
                      border: 1px solid #ddd;
                      display: inline-block;
                      margin-right: 10px;
                      padding: 5px;
                      border-radius: 5px;
                      img {
                        vertical-align: middle;
                        width: 38px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .graphic-audited-buyer {
          padding: 40px 0 40px 74px;
          overflow: hidden;
          a {
            display: block;
            margin-right: 66px;
            margin-bottom: 30px;
            float: left;
            img.user-head {
              border-radius: 50%;
            }
          }
        }
      }
    }

    .precautions {
      background-color: #F1F1F1;
      padding-left: 20px;
      text-align: left;
      color: $mainColor;
      font-size: 12px;
      padding-bottom: 10px;
      P:first-child {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .evaluation-content-tip {
      padding: 15px 10px;
      background-color: #F8F8F8;
      border: 1px solid #F2F2F2;
      margin-top: 8px;
    }

    .evaluation-content-tip-assign {
      background-color: #FFF4F1;
      border: 1px solid #FFB9B8;
      padding: 15px 10px;
      margin-top: 8px;
    }

    .copy-evaluation-tbn {
      width: 112px;
      height: 22px;
      line-height: 22px;
      background-color: #fff;
      border: 1px solid $mainColor;
      color: $mainColor;
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
    }
  }

  .tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 2px 12px 2px 20px;
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

  .apply-num {
    &:hover p, &:hover i {
      display: block;
    }
    p {
      display: none;
      position: absolute;
      top: 19px;
      right: -66px;
      background-color: rgba(70, 76, 91, 0.9);
      color: rgb(255, 255, 255);
      padding: 10px;
    }
    .up-icon {
      width: 0;
      height: 0;
      border: 9px solid transparent;
      border-bottom-color: rgba(70, 76, 91, 0.9);
      position: absolute;
      bottom: -5px;
      left: 39px;
      display: none;
    }
  }
</style>
