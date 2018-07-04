<template>
  <div class="home">
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left ">
            <ul>
              <li v-if="nav.id !== 600 && !isLogin" :class="[TaskCategoryActive === nav.id ? 'active' : '']"
                  @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList">
                <img width="16" height="16" :src="nvaImgSrc[nav.id]">
                <span class="ml-5">{{nav.name}}</span>
              </li>
              <li v-if="isLogin" :class="[TaskCategoryActive === nav.id ? 'active' : '']"
                  @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" style="padding: 4px 0">
                <img width="16" height="16" :src="nvaImgSrc[nav.id]">
                <span class="ml-5">{{nav.name}}</span>
              </li>
              <li :class="[TaskCategoryActive === 'all' ? 'active' : '']" @click="selTaskCategoryAllFunc">
                <img src="/static/img/nav-picture/home_26.png" width="16" height="16">
                <span class="ml-5">全部活动</span>
              </li>
            </ul>
          </div>
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000" v-model="homeCarousel" loop>
              <Carousel-item v-for="swipeItem in swipeItemList" :key="swipeItem.src">
                <a :href="swipeItem.adUrl" class="block" target="_blank">
                  <img :src="getSwipeHead(swipeItem.adImg)" alt="">
                </a>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="login-up-box" v-if="!isLogin">
              <div class="portrait-box">
                <img src="/static/img/common/xiuba-icon.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-20 default-login">
                <router-link to="/sel-role">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
              <div class="text-ct mt-10">
                <a
                  href="https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101432052&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fwww.51bainana.com%2Fqq-login">
                  <img style="vertical-align: -7px;" src="~assets/img/common/qq_logo.png" alt="">
                  使用QQ登录白拿拿
                </a>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　=== 0">
              <div  @click="cancelActivityCategory">
                <Tooltip content="上传自定义个性头像，可以提高活动申请通过率哦，点击修改头像！" placement="bottom" class="left">
                  <router-link tag="img" to="/user/personal-setting/personal-account-info" :src="userHeadUrl"
                               class="cursor-p heard-img"></router-link>
                </Tooltip>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <router-link to="/user/personal-setting/personal-account-info"
                               :title="decodeURIComponent(getUserInfoPhone)" class="ellipsis user-name">
                    Hi~ 拿手 {{decodeURIComponent(getUserInfoPhone)}}
                  </router-link>

                  <router-link to="/user/user-home">个人中心</router-link>
                  <a @click="goOut">[ 退出登录 ]</a>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link to="/user/my-probation/pass">{{trialCount.underWayShowkerTask}}</router-link>
                  个
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;"
                               :to="{path:'/user/my-probation/pass',query:{status:'pass_and_unclaimed'}}">
                    {{trialCount.passAndUnclaimedShowkerTask}}
                  </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;"
                               :to="{path:'/user/my-probation/pass',query:{status:'trial_report_waiting_submit'}}">
                    {{trialCount.trialReportWaitingSubmitShowkerTask}}
                  </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;"
                               :to="{path:'/user/my-probation/pass',query:{status:'order_num_error'}}">
                    {{trialCount.orderNumErrorShowkerTask + trialCount.trialReportUnqualifiedShowkerTask}}
                  </router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;">待下单</span>
                  <span class="left text-ct" style="width: 33.33%;">待交买家秀</span>
                  <span class="left text-ct" style="width: 33.33%;">待修改</span>
                </div>
                <p class="clear-both pt-10">
                  <router-link to="/user/my-probation/pass" class="ivu-btn ivu-btn-long">
                    进入我的活动
                  </router-link>
                </p>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　=== 1">
              <div class="clear" @click="cancelActivityCategory">
                <Tooltip content="上传自定义个性头像，可以提高活动申请通过率哦，点击修改头像！" placement="bottom" class="left">
                  <router-link style="border-radius: 50%" tag="img" to="/user/personal-setting/personal-account-info"
                               width="56" :src="userHeadUrl" class="cursor-p"></router-link>
                </Tooltip>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <router-link to="/user/user-home" :title="decodeURIComponent(getUserInfoPhone)"
                               class="ellipsis user-name">
                    Hi~ 商家 {{decodeURIComponent(getUserInfoPhone)}}
                  </router-link>
                  <div v-if="getUserInfoRole === 1 && !isMember" class="fs-12">
                    <span>免费会员</span>
                    <router-link to="/user/vip-member/order">马上开通会员</router-link>
                  </div>
                  <div v-if="getUserInfoRole === 1 && isMember" class="fs-12">
                    <img v-if="getMemberVersionLevel === 200" src="~assets/img/common/vip.png" alt="vipLogo">
                    <img v-if="getMemberVersionLevel === 300" src="~assets/img/common/svip.png" alt="svipLogo">
                    <span class="cl-red" v-if="getMemberVersionLevel === 200">您已是VIP，<router-link to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>
                    <span class="cl-red" v-if="getMemberVersionLevel === 300">您已是SVIP，<router-link to="/user/vip-member/instructions?q=VipMemberInstructions">查看我的权限</router-link></span>
                  </div>
                </div>
                <p class="clear-both fs-14 mt-10 left ml-20">当前进行的活动：
                  <router-link :to="{path:'/user/activity-management/list',query:{status:'under_way'}}">
                    {{trialCount.underWayTask}}
                  </router-link>
                  个
                </p>
                <div class="left clear-both mt-10" style="width: 100%;">
                  <router-link class="left text-ct" style="width: 33.33%;" :to="{path:'/user/task-management/wait'}">
                    {{trialCount.waitingAuditTaskApply}}
                  </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;"
                               :to="{path:'/user/task-management/pass',query:{status:'orderNum'}}">
                    {{trialCount.orderNumWaitingAuditShowkerTask}}
                  </router-link>
                  <router-link class="left text-ct" style="width: 33.33%;"
                               :to="{path:'/user/task-management/pass',query:{status:'trialReport'}}">
                    {{trialCount.trialReportWaitingConfirmShowkerTask}}
                  </router-link>
                </div>
                <div class="left clear-both mt-5" style="width: 100%;">
                  <span class="left text-ct" style="width: 33.33%;">待审拿手</span>
                  <span class="left text-ct" style="width: 33.33%;">待审订单</span>
                  <span class="left text-ct" style="width: 33.33%;">待审买家秀</span>
                </div>
                <p class="clear-both pt-10">
                  <router-link to="/user/task-release"
                               v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) <= 0 "
                               class="ivu-btn ivu-btn-success ivu-btn-long">
                    免费发布活动
                  </router-link>
                  <a @click="changeIsBuyVipPopupFunc"
                     v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) > 0 "
                     class="ivu-btn ivu-btn-primary ivu-btn-long">
                    继续发布活动
                  </a>
                </p>
              </div>
            </div>
            <div class="notice-box">
              <p>
                <a v-show="!(getUserInfoRole === 0 && notice.title === '商家问题')" v-for="notice in noticeList"
                   :class="[noticeActive === notice.active ? 'active' : '']"
                   @click="changeNoticeTab(notice)">{{notice.title}}</a>
              </p>
              <div v-for="(notice,index) in noticeList" v-show="noticeActive === notice.active" :key="index"
                   class="notice-text animated fadeIn">
                <router-link v-for="(content,index) in notice.content" :key="index"
                             :to="{path: content.url, query: {page: content.page, qusNum: content.qusNum}}"
                             class="circle-text">{{content.text}}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="buyer-xiu clear">
          <div class="left-ctt left">
            <div style="overflow: hidden">
              <div class="title clear">
                <img class="vtc-mid" src="~assets/img/home/top_mjx.png" alt="">
                <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
                <span class="right cursor-p" @click="toBuyerShow">更多买家秀...</span>
              </div>
              <ul class="clear" :class="[leftSlider ? 'slider-top-active-left' : 'slider-top-default-left']"
                  @mouseover="clearLeftSliderFunc()" @mouseleave="leftSliderFunc()">
                <li v-for="item in buyerShowList" class="content cursor-p left pos-rel">
                  <router-link
                    :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId),showReportDesc:true,id:encryptionId(item.id)}}"
                    :title="item.taskName" target="_blank">
                    <div style="height: 260px">
                      <img :src="item.trialReportImages | imageSrc('!thum400')" alt="" width="200" height="260"/>
                    </div>
                    <p class="top-heart clear" v-show="item.likeCount !== 0">
                      <icon type="heart" class="left fs-14 mt" style="margin-top: 2px"/>
                      <span class="left ml-5">赞({{item.likeCount}})</span>
                    </p>
                    <p class="price clear">
                      <span class="left ellipsis">{{item.taskName}}</span>
                      <span class="right pl-10">￥{{item.itemPrice/100}}</span>
                    </p>
                  </router-link>
                  <p class="mt-10 description pos-rel">
                    <span class="double-question-mark"></span>
                    <a class="des-text" :title="item.trialReportText">{{item.trialReportText}}</a>
                  </p>
                  <div class="clear bottom mt-20">
                    <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId)}}" class="user-head-box ml-10"><img width="48" height="48" :src="getUserHead(item.showkerPortraitPic)" alt=""></router-link>
                    <div class="left ml-10 mt-5">
                      <p class="cl000">{{item.nickName}}</p>
                      <img :src="item.creditLevel" alt="">
                      <p>淘气值：{{item.tqz}}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-ctt right ml-5">
            <div style="overflow: hidden">
              <ul :class="[leftTopSlider ? 'slider-top-active-right' : 'slider-top-default-right']"
                  @mouseover="clearLeftTopSliderFunc()" @mouseleave="leftTopSliderFunc()">
                <li v-for="taskTopLeft in taskTopLeftList">
                  <router-link :to="{path:'/task-details', query:{q: encryptionId(taskTopLeft.task.id)}}"
                               :title="taskTopLeft.task.taskName" class="block">
                    <div class="left img-box">
                      <img :src="taskTopLeft.task.taskMainImage | imageSrc('!thum54')" alt="" width="54" height="54">
                    </div>
                    <div class="left text-box ml-10">
                      <p>拿手 {{taskTopLeft.other.nickname}} 免费领取了</p>
                      <p>
                        价值<span class="text ml-5">￥{{taskTopLeft.task.itemPrice / 100}}</span> 的宝贝
                      </p>
                      <span class="cl999">{{getReceiveTime(taskTopLeft.createTime)}}</span>
                      <span class="cl999"
                            v-if="(new Date() -taskTopLeft.createTime)/1000/60 < 60 || (new Date() -taskTopLeft.createTime)/1000 < 60">分钟前</span>
                      <span class="cl999"
                            v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 < 1 && (new Date() -taskTopLeft.createTime)/1000/60 >= 60">小时前</span>
                      <span class="cl999" v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 >= 1">天前</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <!--免费领开始-->
        <div class="home-commodity-half mr-10">
          <div class="home-commodity-title">
            <p>
              <img src="/static/img/icon/free_get_heart.png" alt="">
              <span class="fs-18 f-b clf99563">免费领</span>
              <span class="fs-12 cl666">拿手无需支付任何费用，商家任性送！</span>
              <router-link to="/task-category?activityCategory=free_get" class="cl666 right mr-20">更多></router-link>
            </p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         target="_blank"
                         v-for="homeCommodity in homeCommodityList"
                         :key="homeCommodity.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeCommodity.id)}}">
              <div class="home-commodity-img pos-rel">
                <img class="block" :src="homeCommodity.taskMainImage | imageSrc('!thum400')" alt=""/>
                <span class="applied"> {{homeCommodity.showkerApplyTotalCount || 0}} 人已申请</span>
                <!--<img src="~assets/img/common/hot-top-subscript.png" class="hot-top-icon">-->
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeCommodity.taskName}}</p>
                <p class="price">
                  <em>
                    <span class="cl666 text-decoration-through">￥{{homeCommodity.itemPrice / 100}}</span>
                  </em>
                  <!--<em class="vas-fee-return ml-10 pl-5 pr-5" v-if="(homeCommodity.perVasFee || homeCommodity.promotionExpensesPaid && (uplineTime < homeCommodity.createTime))">-->
                  <span class="vas-fee-return ml-10 pl-5 pr-5" v-if="(homeCommodity.perVasFee || homeCommodity.promotionExpensesPaid && (uplineTime < homeCommodity.createTime))">
                    奖励{{computeVasReturnFee(homeCommodity.perVasFee,homeCommodity.systemVasFeeCommissionPercent,homeCommodity.activityCategory,homeCommodity.promotionExpensesPaid,homeCommodity.taskCount,homeCommodity.createTime)}}元
                  </span>
                </p>
                <p class="discount-price">
                  <em>
                    <span class="f-b" v-if="!homeCommodity.discountPrice && homeCommodity.discountRate">
                      ￥{{(Math.floor((homeCommodity.discountRate/100) * homeCommodity.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span class="f-b" v-if="!homeCommodity.discountPrice && !homeCommodity.discountRate">￥0</span>
                  </em>
                  <em class="price-icon mt-10">
                    <span v-if="homeCommodity.activityCategory === 'price_low' && homeCommodity.discountPrice"
                          class="left home-discount-price mt-5"
                          :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountPrice/100)].backgroundColor}">
                      {{homeCommodity.discountPrice/100}}试用
                    </span>
                    <span v-if="homeCommodity.activityCategory === 'price_low' && homeCommodity.discountRate"
                          class="left home-discount-price mt-5"
                          :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountRate/10) + '折'].backgroundColor}">
                      {{homeCommodity.discountRate/10}}折试用
                    </span>
                  </em>
                </p>
                <p class="home-commodity-apply">限量 <span class="main-color"> {{homeCommodity.taskCount || 0 }} </span>
                  份，剩余
                  <span
                    class="main-color"> {{homeCommodity.taskCount - homeCommodity.showkerApplySuccessCount || 0}} </span>
                  份
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeCommodity.id)}}"
                               class="ivu-btn ivu-btn-long">免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <!--免费领结束-->

        <!--体验专区开始-->
        <div class="home-commodity-half">
          <div class="home-commodity-title">
            <p>
              <img src="/static/img/icon/present_get_heart.png" alt="">
              <span class="fs-18 f-b cl57C78D">体验专区</span>
              <span class="fs-12 cl666">为商家附赠的赠品，在淘宝上需按照商家要求拍下指定商品。</span>
              <router-link to="/task-category?activityCategory=present_get" class="cl666 right mr-20">更多></router-link>
            </p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         target="_blank"
                         v-for="homeCommodity in presentGet"
                         :key="homeCommodity.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeCommodity.id)}}">
              <div class="home-commodity-img pos-rel">
                <img class="block" :src="homeCommodity.taskMainImage | imageSrc('!thum400')" alt=""/>
                <span class="applied"> {{homeCommodity.showkerApplyTotalCount || 0}} 人已申请</span>
                <!--<img src="~assets/img/common/hot-top-subscript.png" class="hot-top-icon">-->
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeCommodity.taskName}}</p>
                <p class="price">
                  <span class="cl666 text-decoration-through">￥{{homeCommodity.itemPrice / 100}}</span>
                  <span class="vas-fee-return ml-10 pl-5 pr-5" v-if="(homeCommodity.perVasFee || homeCommodity.promotionExpensesPaid && (uplineTime < homeCommodity.createTime))">
                    奖励{{computeVasReturnFee(homeCommodity.perVasFee,homeCommodity.systemVasFeeCommissionPercent,homeCommodity.activityCategory,homeCommodity.promotionExpensesPaid,homeCommodity.taskCount,homeCommodity.createTime)}}元
                  </span>
                </p>
                <p class="discount-price">
                  <em class="price-list">
                    <span class="f-b" v-if="homeCommodity.discountPrice">￥{{homeCommodity.discountPrice / 100}}</span>
                    <span class="f-b" v-if="!homeCommodity.discountPrice && homeCommodity.discountRate">
                      ￥{{(Math.floor((homeCommodity.discountRate/100) * homeCommodity.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span class="f-b" v-if="!homeCommodity.discountPrice && !homeCommodity.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em class="price-icon">
                    <span v-if="homeCommodity.activityCategory === 'pinkage_for_10'"
                          style="padding: 0 4px; background: #ff9966; color: #fff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">10元包邮</span>
                    <span v-if="homeCommodity.activityCategory === 'present_get'"
                          style="padding: 0 4px; background: #00cc66; color: #ffffff; margin-left: 10px; display: inline-block;height: 20px;line-height: 20px;">体验专区</span>
                    <span v-if="homeCommodity.activityCategory === 'price_low' && homeCommodity.discountPrice"
                          class="left home-discount-price mt-5"
                          :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountPrice/100)].backgroundColor}">
                      {{homeCommodity.discountPrice/100}}试用
                    </span>
                    <span v-if="homeCommodity.activityCategory === 'price_low' && homeCommodity.discountRate"
                          class="left home-discount-price mt-5"
                          :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountRate/10) + '折'].backgroundColor}">
                      {{homeCommodity.discountRate/10}}折试用
                    </span>
                    <span v-if="homeCommodity.activityCategory === 'goods_clearance' && homeCommodity.discountRate "
                          class="left home-discount-price mt-5"
                          :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountRate/10) + '折'].backgroundColor}">
                      {{homeCommodity.discountRate/10}}折清仓
                    </span>
                  </em>
                </p>
                <p class="home-commodity-apply">
                  限量 <span class="main-color"> {{homeCommodity.taskCount || 0 }} </span> 份，剩余
                  <span
                    class="main-color"> {{homeCommodity.taskCount - homeCommodity.showkerApplySuccessCount || 0}} </span>
                  份
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeCommodity.id)}}"
                               class="ivu-btn ivu-btn-long">
                    免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <!--体验专区结束-->
      </div>

      <!--历史活动开始-->
      <div class="container mt-10">
        <div class="home-commodity">
          <div class="home-commodity-title">
            <div class="home-commodity-img-title">
              <div class="part-title-img-box">
                <span class="fs-18">历史活动</span>
              </div>
            </div>
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         target="_blank"
                         v-for="homeHistory in homeHistoryList"
                         :key="homeHistory.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeHistory.id)}}">
              <div class="home-commodity-img pos-rel">
                <img class="block" :src="homeHistory.taskMainImage | imageSrc('!thum400')" height="208" width="210">
                <span class="applied"> {{homeHistory.showkerApplyTotalCount || 0}} 人已申请</span>
                <!--<img src="~assets/img/common/hot-top-subscript.png" class="hot-top-icon">-->
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeHistory.taskName}}</p>
                <p class="price">
                  <span class="cl666 text-decoration-through">￥{{homeHistory.itemPrice / 100}}</span>
                  <span class="vas-fee-return ml-10 pl-5 pr-5" v-if="(homeHistory.perVasFee || homeHistory.promotionExpensesPaid && (uplineTime < homeHistory.createTime))">
                    奖励{{computeVasReturnFee(homeHistory.perVasFee,homeHistory.systemVasFeeCommissionPercent,homeHistory.activityCategory,homeHistory.promotionExpensesPaid,homeHistory.taskCount,homeHistory.createTime)}}元
                  </span>
                </p>
                <p class="discount-price">
                  <span>
                    <span class="f-b" v-if="homeHistory.discountPrice">￥{{homeHistory.discountPrice / 100}}</span>
                    <span class="f-b" v-if="!homeHistory.discountPrice && homeHistory.discountRate">
                    ￥{{(Math.floor((homeHistory.discountRate/100) * homeHistory.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span class="f-b" v-if="!homeHistory.discountPrice && !homeHistory.discountRate">
                    ￥0
                    </span>
                  </span>
                  <span>
                    <span v-if="homeHistory.activityCategory === 'price_low' && homeHistory.discountPrice"
                      class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeHistory.discountPrice/100)].backgroundColor}">
                    {{homeHistory.discountPrice/100}}试用
                    </span>
                    <span v-if="homeHistory.activityCategory === 'price_low' && homeHistory.discountRate" class="left home-discount-price mt-5"
                    :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeHistory.discountRate/10) + '折'].backgroundColor}">
                    {{homeHistory.discountRate/10}}折试用
                    </span>
                  </span>
                </p>
                <p class="home-commodity-apply">限量 <span class="main-color"> {{homeHistory.taskCount || 0 }} </span>
                  份，剩余
                  <span
                    class="main-color"> {{homeHistory.taskCount - homeHistory.showkerApplySuccessCount || 0}} </span> 份
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeHistory.id)}}"
                               class="ivu-btn ivu-btn-long">查看详情
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--历史活动结束-->
    </div>
    <!--添加微信弹窗-->
    <div class="confirm-recharge-model" v-show="$store.state.wechartShow">
      <div class="confirm-recharge-con">
        <div class="pos-rel">
          <Checkbox-group v-model="wechartShowAgain" style="position: absolute;top:25px;right: 30px;">
            <Checkbox label="true">不再提醒</Checkbox>
          </Checkbox-group>
          <div style="position: absolute;top:27px;right: 15px;cursor: pointer;color: #FF6633"
               @click="cancelWeiChartFunc">
            <Icon type="close"></Icon>
          </div>
          <div v-if="getUserInfoRole === 0">
            <img src="/static/img/home/wechart_alert_07.png" alt=""
                 style="width: 507px;height: 340px; margin-top: 20px">
            <img src="/static/img/common/qr_code_bainana.png" alt=""
                 style="position: absolute;
                      bottom: 55px;
                      left: 307px;
                      width: 150px;"
            >
            <p class="text-ct"
               style="position: absolute;
                    bottom: 26px;
                    right: 67px;
                    font-size: 16px;
                    color: #ff6633;"
            >打开微信扫一扫</p>
          </div>

        </div>
      </div>
    </div>
    <!--商家首次登陆平台卡快速发布任务引导弹窗-->
    <modal v-model="showFirstVisitModel" width="1000" :mask-closable="false" :closable="false" class="first-release-activity">
      <div slot="header" class="m-header">
        <img src="~assets/img/home/tit.png" alt="" class="m-icon">
        HI，<span class="main-color">{{getUserInfoPhone}}</span>&nbsp;这是您第一次访问白拿拿，您的身份是<span class="main-color">淘宝商家</span> 。
      </div>
      <div class="m-body">
        <p class="m-title">平台都是精准定位的<span class="main-color">真实消费群体</span>，看我们如何做到<span class="main-color">安全、合理的转化</span>！</p>
        <ul class="clear mt-20">
          <li class="left">
            <span class="step">1、平均20分钟就有1人申请</span>
            <div class="mt-20">
              <img src="~assets/img/home/m-1.png" alt="">
            </div>
            <p class="desc mt-25">活动成功上线后，平均20分钟就有1人申请试用。由<span class="main-color">亲自己决定什么时间通过、通过多少名额（通过后才能去淘宝下单）</span>，合理控制转化。</p>
          </li>
          <li class="left">
            <span class="step">2、商家自己选择下单旺旺号</span>
            <div class="mt-20">
              <img src="~assets/img/home/m-2.png" alt="">
            </div>
            <p class="desc mt-10">在申请列表中，商家可以看到申请旺旺号的各类信息，如历史申请类目、数量、所在地等，<span class="main-color">商家自行选择旺旺号</span>，主权交给商家，更安全更放心!</p>
          </li>
          <li class="left">
            <span class="step">3、先看淘宝评价在返款</span>
            <div class="mt-20">
              <img src="~assets/img/home/m-3.png" alt="">
            </div>
            <p class="desc mt-25">平台的优质买手通常能发表精致的买家秀，效果堪比网红，<span class="main-color">商家可先审核淘宝评论</span>再决定是否向买手返款。</p>
          </li>
        </ul>
      </div>
      <div slot="footer" class="m-footer text-ct">
        <i-button type="default" class="later-btn" @click="showFirstVisitModel = false">先逛逛再说~</i-button>
        <i-button class="release-btn" @click="goTaskCreateFast">马上免费发布活动（试用）</i-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import {Icon, Input, Checkbox, Button, Modal, Tooltip, Carousel} from 'iview'
  import SmsCountdown from '@/components/SmsCountdown'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, encryption, removeStorage, getSeverTime} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'

  export default {
    name: 'home',
    components: {
      iInput: Input,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      Modal: Modal,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      Tooltip: Tooltip,
    },
    data() {
      return {
        swipeItemList: [],
        confirmRechargeModel: true,
        command: '',
        recommendPageSize: 6,
        wechartAlertShow: false,
        wechartShowAgain: [],
        leftTopSliderTimer: '',
        leftSliderTimer: '',
        leftTopSlider: false,
        leftSlider: false,
        trialCount: {},
        homeCommodityList: [],
        homeHistoryList: [],
        homeDisCountList: [],
        noticeList: [
          {
            title: '常见问题',
            content: [
              {
                url: '/user/help-center/faq',
                text: '平台有哪些活动？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq',
                text: '注册白拿拿收费么？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq',
                text: '支持哪几个平台试用活动？',
                page: 'common',
                qusNum: '4'
              },
              {
                url: '/user/help-center/faq',
                text: '平台能提现吗？提现需要手续费吗？',
                page: 'common',
                qusNum: '11'
              },
            ],
            active: 'faq'
          },
          {
            title: '拿手问题',
            content: [
              {
                url: '/user/help-center/faq-showker',
                text: '拿手完整流程？',
                page: 'special'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '拿手下单规则？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '下单需要垫付么？',
                page: 'common',
                qusNum: '3'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '商家如何返款？',
                page: 'common',
                qusNum: '7'
              },
            ],
            active: 'buyerRule'
          },
          {
            title: '商家问题',
            content: [
              {
                url: '/user/help-center/faq-seller',
                text: '商家活动完整流程？',
                page: 'special'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '商家活动支持哪几种搜索/下单渠道？',
                page: 'common',
                qusNum: '1'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '商家发布活动如何收费？',
                page: 'common',
                qusNum: '5'
              },
              {
                url: '/user/help-center/faq-seller',
                text: '什么条件下可以申请活动结算？',
                page: 'common',
                qusNum: '11'
              },
            ],
            active: 'sellerRule'
          },
        ],
        noticeActive: 'faq',
        taskTopLeftList: [],
        navList: [],
        nvaImgSrc: {
          100: '/static/img/nav-picture/home_07.png',
          200: '/static/img/nav-picture/home_09.png',
          300: '/static/img/nav-picture/home_11.png',
          400: '/static/img/nav-picture/home_13.png',
          500: '/static/img/nav-picture/home_15.png',
          600: '/static/img/nav-picture/home_22.png',
          700: '/static/img/nav-picture/home_23.png',
          800: '/static/img/nav-picture/home_24.png',
          900: '/static/img/nav-picture/home_25.png',
          1000: '/static/img/nav-picture/home_27.png',
        },
        buyerShowList: [],
        homeCarousel: 0,
        searchTaskParams: {
          pageIndex: 1,
          pageSize: 6,
          taskName: '',
          taskTypes: [],
          itemCatalogs: [],
          sortField: 'upLineTime',
          sortOrder: 'desc',
          ifAccess: [],
          activityCategories: [],
          discountTypes: '',
        },
        // showSellerVipPopup: false,
        pinkageFor10: [],
        presentGet: [],
        showFirstVisitModel: false,
        uplineTime: 1529933400000
      }
    },
    beforeMount() {
      let self = this;
      if (getStorage('weChartPop') === 1 && self.$store.state.userInfo.role === 0 && !getStorage('setWeChartshower' + self.$store.state.userInfo.phone)) {
        self.weChartShowkerAlertFunc();
      }
    },
    created() {
      const self = this;
      if (self.$store.state.login) {
        self.weChartAlertFunc();
        if (self.$store.getters.getUserRole === 1) {
          self.$store.dispatch('getTaskCreateFastStatus').then(res => {
            if (res.status) {
              self.showFirstVisitModel = res.data
            }
          });
        }
      }
      if (self.$store.state.userInfo.role === 0) {
        self.getAvailableBoardByAdTypeList('showker_pc_home_page_slide_show');
      } else if (self.$store.state.userInfo.role === 1) {
        if (self.getMemberVersionLevel === 100) {
          self.getAvailableBoardByAdTypeList('free_seller_pc_home_page_slide_show');
        } else {
          self.getAvailableBoardByAdTypeList('seller_pc_home_page_slide_show');
        }
      } else {
        self.getAvailableBoardByAdTypeList('seller_pc_home_page_slide_show');
      }
      self.getSearchPinkageFor10Task();
      self.getSearchPresentGetTask();
      self.getNavList();
      self.getHomeTaskList();
      self.getHomeTaskTopLeftList();
      self.personalTrialCount();
      self.getHomeHistoryList();
      self.getBuyerShowList();
      self.getHomeDisCountList();
    },
    destroyed() {
      let self = this;
      self.$store.commit({
        type: 'SET_WECHART_SHOW',
        result: false
      });
      self.$store.commit({
        type: 'SET_WECHART_RES',
        result: false,
      });
      self.$store.commit({
        type: 'SET_SHOW_TOP_CATEGORY_RES',
        result: true,
      });
    },
    computed: {
      isLogin() {
        return this.$store.state.login
      },
      getUserInfoPhone() {
        return this.$store.state.userInfo.nickname
      },
      getUserInfoRole() {
        return this.$store.state.userInfo.role
      },
      getMemberDeadline() {
        return this.$store.state.userInfo.memberDeadline
      },
      getMemberVersionLevel() {
        return this.$store.getters.getMemberLevel
      },
      isMember() {
        return this.$store.getters.isMemberOk
      },
      userHeadUrl() {
        return this.$store.getters.getUserHeadUrl
      },
      getUserRole() {
        return this.$store.getters.getUserRole
      },
      TaskCategoryActive() {
        return this.$store.state.TaskCategoryActive
      },

    },
    mounted() {
      this.$nextTick(() => {
        this.leftTopSliderFunc();
        this.leftSliderFunc();
      });
    },
    methods: {
      computeVasReturnFee(perVasFee,sysHold,type,promotion,taskCount,createTime) {
        const newActivity = this.uplineTime - createTime < 0;
        if (promotion && newActivity) {
          if (type === 'free_get') {
            return (perVasFee / 100 * (1 - sysHold / 100) + 1).toFixed(2);
          } else if (type === 'present_get') {
            if (promotion /taskCount <= 300) {
              return (perVasFee / 100 * (1 - sysHold / 100) + 1).toFixed(2);
            } else {
              return (perVasFee / 100 * (1 - sysHold / 100) + 3).toFixed(2);
            }
          }
        } else {
          return (perVasFee / 100 * (1 - sysHold / 100)).toFixed(2);
        }
      },
      changeIsBuyVipPopupFunc() {
        this.$router.push({name: 'TaskRelease'});
      },
      getReceiveTime(createTime) {
        let nowTime = getSeverTime();
        return (nowTime - createTime) / 1000 < 60 ? 1 :
          (nowTime - createTime) / 1000 / 60 < 60 ? parseInt((nowTime - createTime) / 1000 / 60) :
            (nowTime - createTime) / 1000 / 60 / 60 / 24 < 1 ? parseInt((nowTime - createTime) / 1000 / 60 / 60) :
              parseInt((nowTime - createTime) / 1000 / 60 / 60 / 24);
      },
      toBuyerShow() {
        this.$router.push({path: 'buyer-show'});
      },
      getSwipeHead(src) {
        return aliCallbackImgUrl + src
      },
      goTaskCreateFast() {
        this.$router.push({name: 'FastTaskRelease'});
        this.showFirstVisitModel = false;
      },
      getAvailableBoardByAdTypeList(advertType) {
        let self = this;
        api.getAvailableBoardByAdTypeList({advertType: advertType}).then((res) => {
          let data = res;
          let z = 0;
          if (self.$store.state.login) {
            for (let i = 0, j = data.length; i < j; i++) {
              if (data[i].showMode !== 'logout') {
                self.$set(self.swipeItemList, z, data[i]);
                z++;
              }
            }
          } else if (!self.$store.state.login) {
            for (let i = 0, j = data.length; i < j; i++) {
              if (data[i].showMode !== 'login') {
                self.$set(self.swipeItemList, z, data[i]);
                z++;
              }
            }
          }

        })
      },
      getSearchPinkageFor10Task() {
        let self = this;
        api.getIndexRecommend({
          count: 6,
          activityCategory: 'pinkage_for_10',
        }).then((res) => {
          if (res.status) {
            if (res.data) {
              self.pinkageFor10 = res.data;
              // self.$set(self.pinkageFor10);
            }
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      getSearchPresentGetTask() {
        let self = this;
        api.getIndexRecommend({
          count: 6,
          activityCategory: 'present_get',
        }).then((res) => {
          if (res.status) {
            if (res.data) {
              self.presentGet = res.data;
              // self.$set(self.presentGet);
            }
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      getHomeDisCountList() {
        let self = this;
        api.getIndexRecommend({
          count: 6,
          activityCategory: 'price_low',
        }).then((res) => {
          if (res.status) {
            self.homeDisCountList = res.data ? res.data : self.homeDisCountList = [];
          } else {
            self.$Message.error(res.msg);
          }
        });
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
      getBuyerShowList() {
        let self = this;
        api.getBuyerShowList().then((res) => {
          if (res.status) {
            self.buyerShowList = res.data;
            for (let i = 0, len = self.buyerShowList.length; i < len; i++) {
              if (JSON.parse(self.buyerShowList[i].trialReportImages)[0][0] !== 'h') {
                self.buyerShowList[i].trialReportImages = aliCallbackImgUrl + JSON.parse(self.buyerShowList[i].trialReportImages)[0]
              } else {
                self.buyerShowList[i].trialReportImages = JSON.parse(self.buyerShowList[i].trialReportImages)[0];
              }
            }
          } else {
            self.$Message.error(res.msg)
          }
        })
      },
      getHomeTaskList() {
        let self = this;
        api.getIndexRecommend({
          count: 6,
          activityCategory: '',
        }).then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeCommodityList = res.data;
            }
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getNavList() {
        let self = this;
        api.getNavList().then((res) => {
          if (res.status) {
            if (res.data) {
              res.data.sort(function (a, b) {
                return a.sortIndex - b.sortIndex
              });
              self.navList = res.data;
            }
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getHomeTaskTopLeftList() {
        let self = this;
        api.getHomeTaskTopLeftList().then((res) => {
          if (res.status) {
            if (res.data) {
              self.taskTopLeftList = res.data;
            }
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      getHomeHistoryList() {
        let self = this;
        api.getHomeHistoryList().then((res) => {
          if (res.status) {
            if (res.data) {
              if (!self.isLogin) {
                self.homeHistoryList = res.data.filter(item => {
                  return item.itemCatalog.id !== 1003 && item.itemCatalog.parentItemCatalog.id !== 600;
                });
              } else {
                self.homeHistoryList = res.data;
              }
            }
          } else {
            self.$Message.error(res.msg);
          }
        })
      },
      selTaskCategoryAllFunc() {
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all'
        });
        self.$router.push({'path': '/task-category', 'query': {'category': 'all', 'categoryId': 'all'}});
      },
      selTaskCategoryActiveFunc(nav) {
        let self = this;
        self.$router.push({'path': '/task-category', 'query': {'cate': nav.id, 'categoryId': nav.id}});
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: false
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all',
        });
      },
      encryptionId(id) {
        return encryption(id);
      },
      weChartShowkerAlertFunc() {
        let self = this;
        self.$store.commit({
          type: 'SET_WECHART_SHOW',
          result: true
        });
        setStorage('weChartPop', 2);
      },
      weChartAlertFunc() {
        let self = this;
        api.checkWechartAlert().then((res) => {
          if (res.status && getStorage('weChartPop') === 1) {
            self.wechartAlertShow = true;
            setStorage('weChartPop', 2)
          } else {
            self.wechartAlertShow = false;
          }
        })
      },
      setWeChartAlertFunc(role) {
        let self = this;
        let commandList = {
          0: 1788,
          1: 9188
        };
        if (self.command === '') {
          self.$Message.error('口令不能为空');
        } else {
          if (parseInt(self.command) === parseInt(commandList[role])) {
            self.setWechartAlert()
          } else {
            self.$Message.error('口令输入错误');
          }
        }
      },
      setWechartAlert() {
        let self = this;
        api.setWechartAlert({
          command: self.command,
        }).then((res) => {
          if (res.status) {
            self.wechartAlertShow = false;
            self.$Message.success({
              content: '恭喜您成功获得一个月VIP会员',
              onClose: function () {
                self.$store.dispatch('getUserInformation');
              }
            });
          } else {
            self.$Message.error(res.msg);
          }
        });
      },
      cancelWeiChartFunc() {
        let self = this;
        if (self.wechartShowAgain !== '') {
          if (self.$store.state.userInfo.role === 1) {
            api.noWechartAlert().then((res) => {
              if (!res.status) {
                self.$Message.error(res.msg)
              }
            })
          } else {
            setStorage('setWeChartshower' + self.$store.state.userInfo.phone, '1')
          }
        }
        self.$store.commit({
          type: 'SET_WECHART_SHOW',
          info: false
        });
      },
      goOut() {
        let _this = this;
        _this.$store.dispatch('loggedOut').then(res => {
          if (res.status) {
            _this.$router.push({name: 'Login'})
          } else {
            _this.$Message.error(res.msg);
          }
        });
      },
      personalTrialCount() {
        let self = this;
        if (self.$store.state.login) {
          if (self.getUserInfoRole === 0) {
            api.showkerPersonalTrialCount().then((res) => {
              if (res.status) {
                self.trialCount = res.data
              } else {
                self.$Message.error(res.msg);
              }
            })
          } else {
            api.sellerPersonalTrialCount().then((res) => {
              if (res.status) {
                self.trialCount = res.data
              } else {
                self.$Message.error(res.msg);
              }
            })
          }
        }
      },
      leftSliderFunc() {
        let self = this;
        self.leftSliderTimer = setInterval(function () {
          if (self.leftSlider) {
            let part = self.buyerShowList.splice(0, 1);
            self.buyerShowList = self.buyerShowList.concat(part);
          }
          self.leftSlider = !self.leftSlider;
        }, 1500)
      },

      leftTopSliderFunc() {
        let self = this;
        self.leftTopSliderTimer = setInterval(function () {
          if (self.leftTopSlider) {
            let part = self.taskTopLeftList.splice(0, 1);
            self.taskTopLeftList = self.taskTopLeftList.concat(part);
          }
          self.leftTopSlider = !self.leftTopSlider;
        }, 1500)
      },

      clearLeftTopSliderFunc() {
        let self = this;
        clearInterval(self.leftTopSliderTimer);
      },
      clearLeftSliderFunc() {
        let self = this;
        clearInterval(self.leftSliderTimer);
      },
      changeNoticeTab(notice) {
        this.noticeActive = notice.active;
      },
      cancelActivityCategory(){
        let self = this;
        // self.$store.commit({
        //   type: 'TASK_CATEGORY_LIST',
        //   info: ''
        // });
        self.$store.commit({
          type: 'SET_ACTIVITY_CATEGORY',
          info: ''
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import 'src/css/mixin';

  .confirm-recharge-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(55, 55, 55, .6);
  }

  .confirm-recharge-con {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 507px;
    margin-left: -254px;
  }

  .home-ctt {
    background-color: #F1F1F1;
    .user-name {
      display: block;
      max-width: 160px;
    }
    .buyer-xiu {
      margin: 10px auto 10px auto;
      overflow: hidden;
      .masterImgBox {
        width: 200px;
        height: 260px;
        overflow: hidden;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        background-color: #F1F2F6;
      }
      .left-ctt {
        padding: 0 10px;
        background-color: #fff;
        width: 900px;
        height: 500px;
        overflow: hidden;
        .title {
          padding: 15px 10px 10px 10px;
          border-bottom: 1px solid #F6F6F6;
          img {
          }
        }
        ul {
          padding: 10px 10px;
          width: 10000px;
          li {
            padding: 0 20px 0 0;
            width: 220px;
            margin-bottom: 52px;
            .top-heart {
              position: absolute;
              top: 5px;
              right: 22px;
              background-color: #fff;
              border: 1px solid #fff;
              border-radius: 3px;
              color: #FF0000;
              padding: 0 3px;
              img {
                margin-top: 3px;
              }
            }
            .price {
              position: absolute;
              width: 200px;
              top: 230px;
              left: 0;
              height: 30px;
              line-height: 30px;
              padding: 0 3px;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.5);
              span:first-child {
                width: 128px;
              }
              span:last-child {
                color: #FFFF00;
              }
            }
            .description {
              padding-left: 25px;
              height: 30px;
              overflow: hidden;
              img {
                position: absolute;
                left: 0;
                top: -3px;
              }
              .double-question-mark {
                position: absolute;
                left: 0;
                top: -3px;
                display: inline-block;
                width: 18px;
                height: 34px;
                background: url("~assets/img/home/double_marks.png");
              }
              .des-text {
                max-height: 40px;
                line-height: 16px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                word-wrap: break-word;
                color: #666;
              }
            }
            .icon-heart {
              font-size: 16px;
            }
            .bottom {
              font-size: 14px;
              .click-good {
                color: #FF0000;
              }
            }
          }
        }
      }
      .right-ctt {
        background-color: #fff;
        width: 290px;
        height: 500px;
        padding: 10px 0;
        ul {
          padding: 15px 20px;
          li {
            overflow: hidden;
            height: 80px;
            div.text-box {
              p {
                font-size: 14px;
                color: #999;
                span.text {
                  color: $mainColor;
                  font-weight: bold;
                }
              }

            }
          }
        }
      }
    }
    .home-section {
      margin: 10px auto 0 auto;
      .left-ctt {
        background-color: #fff;
        width: 190px;
        height: 410px;
        margin-top: -10px;
        .left-ctt-top {
          height: 50px;
          line-height: 50px;
          background-color: $mainColor;
          color: #fff;
          font-size: 16px;
        }
        ul {
          padding: 5px 0;
          li {
            padding: 6px 0;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            line-height: 28px;
            img {
              vertical-align: middle;
            }
          }
          li.active {
            color: $mainColor;
          }
          li:hover {
            background-color: #fdebee;
          }
        }
      }
      .middle-ctt {
        width: 700px;
        margin: 0 10px;
        box-sizing: border-box;
      }
      .right-ctt {
        float: right;
        width: 290px;
        height: 400px;
        .login-up-box {
          background-color: #fff;
          padding: 15px;
          height: 205px;
          margin-bottom: 10px;
          .portrait-box {
            img {
              display: block;
              margin: auto auto 15px auto;
              width: 56px;
            }
          }
          p {
            text-align: center;
          }
          .default-login {
            a {
              display: inline-block;
              width: 119px;
              background-color: $mainColor;
              color: #fff;
              text-align: center;
              height: 30px;
              line-height: 30px;
              &:first-child {
                margin-right: 10px;
              }
            }
          }
        }
        .login-in-box {
          background-color: #fff;
          padding: 15px 8px;
          margin-bottom: 10px;
          img.portrait-img {
            width: 56px;
            border-radius: 50%;
          }
        }
        .notice-box {
          background-color: #fff;
          height: 185px;
          p {
            display: table;
            width: 100%;
            height: 30px;
            a {
              color: #999;
              text-align: center;
              display: table-cell;
              vertical-align: middle;
              width: 33.33%;
              border-bottom: 1px solid #ddd;
            }
            a.active {
              border-right: 1px solid #ddd;
              border-left: 1px solid #ddd;
              border-top: 1px solid #ddd;
              border-bottom: none;
            }
          }
          .notice-text {
            padding: 8px 0 0 20px;
            a {
              display: block;
              line-height: 35px;
              height: 35px;
              color: #999;
            }
          }
        }
      }
    }
    .home-commodity {
      background-color: #fff;
      border: 1px solid #E8E8E8;
      .home-commodity-title {
        padding-top: 30px;
        img {
          display: block;
          margin: 28px auto 10px auto;
        }
        p {
          color: #999;
        }
      }
      .home-commodity-ctt {
        padding: 24px;
        text-align: left;
        .home-commodity-details {
          width: 222px;
          display: inline-block;
          margin: 0 4px 30px 4px;
          padding: 0 5px 20px 5px;
          .home-commodity-img {
            border: 1px solid #ddd;
            .hot-top-icon {
              position: absolute;
              top:0;
              left:-4px;
              width:50px;
              height:50px;
            }
          }
          .home-commodity-text {
            background-color: #EEEEEE;
            padding: 5px 5px 8px 5px;
            p {
              line-height: 25px;
              height: 25px;
              font-size: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            p.home-commodity-title {
              color: #000;
              text-align: left;
            }
            .vas-fee-return{
              color:#fff;
              background: $mainColor;
            }
            p.discount-price {
              color: #FF6633;
            }
            p.home-commodity-apply {
              color: #000;
            }
            p.home-commodity-take {
              height: 40px;
              line-height: 40px;
            }
          }
        }
      }
    }
    .home-commodity-half {
      background-color: #fff;
      border: 1px solid #E8E8E8;
      width: 595px;
      float: left;
      margin-bottom: 10px;
      .home-commodity-title {
        height: 60px;
        line-height: 60px;
        margin-bottom: 10px;
        p {
          padding-left: 20px;
          img {
            vertical-align: -4px;
            margin-left: 5px;
          }
        }
      }
      .home-commodity-ctt {
        text-align: left;
        padding-left: 15px;
        .home-commodity-details {
          width: 180px;
          display: inline-block;
          margin: 0 4px 0 4px;
          padding: 0 5px 20px 5px;
          text-align: left;
          .home-commodity-img {
            border: 1px solid #ddd;
            .hot-top-icon {
              position: absolute;
              top:0;
              left:-4px;
              width:50px;
              height:50px;
            }
            img {
              width: 168px;
              height: 168px;
            }
          }
          .home-commodity-text {
            background-color: #EEEEEE;
            padding: 5px 5px 8px 5px;
            p {
              line-height: 28px;
              height: 28px;
              font-size: 14px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            p.home-commodity-title {
              color: #000;
              text-align: left;
            }
            p.price {
              .vas-fee-return{
                color:#fff;
                background: $mainColor;
              }
            }
            p.discount-price {
              color: #FF6633;
            }
            p.home-commodity-apply {
              color: #000;
            }
            p.home-commodity-take {
              height: 40px;
              line-height: 40px;
            }
          }
        }
      }
    }
  }

  .user-head-box {
    float: left;
    width: 48px;
    height: 48px;
    img {
      border-radius: 50%;
    }
  }

  .applied {
    position: absolute;
    top: 0;
    right: 0;
    background-color: $mainColor;
    padding: 0 6px;
    color: #fff;
  }

  .home-discount-price {
    color: #fff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    margin-right: 15px;
    margin-top: 3px;
    margin-left: 5px
  }

  .slider-top-active {
    margin-top: -77px;
    animation: sliderTop 1s;
  }

  .slider-top-default {
    margin-top: 0;
  }

  .heard-img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  @keyframes sliderTop {
    0% {
      margin-top: 0;
    }
    100% {
      margin-top: -77px;
    }
  }

  .slider-top-active-right {
    margin-top: -80px;
    animation: sliderTopRight 1s;
  }

  .slider-top-default-right {
    margin-top: 0;
  }

  @keyframes sliderTopRight {
    0% {
      margin-top: 0;
    }
    100% {
      margin-top: -80px;
    }
  }

  .slider-top-active-left {
    margin-left: -220px;
    animation: sliderTopLeft 1s;
  }

  .slider-top-default-left {
    margin-left: 0;
  }

  @keyframes sliderTopLeft {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -220px;
    }
  }
  /*弹窗*/
  .m-header{
    padding:40px 0 10px 0;
    font-size: 16px;
    text-align: center;
    background-color: #eeeeee;
    position: relative;
    .m-icon{
      position: absolute;
      top:8px;
      left:60px;
    }
  }
  .m-body {
    padding:20px 0;
    .m-title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .step {
      padding:2px 15px;
      background: #000;
      color: #fff;
      font-weight:bold;
      font-size:16px;
    }
    li {
      width:33.33%;
      padding:0 20px;
      text-align: center;
    }
    .desc {
      text-align: left;
    }
  }
  .m-footer {
    .later-btn {
      margin-right:10%;
      padding-left:40px;
      padding-right:40px;
    }
    .release-btn {
      margin-left:10%;
      color:#fff;
      background: $mainColor;
    }
  }

</style>
