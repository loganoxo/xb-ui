<template>
  <div>
    <div class="home-ctt">
      <div class="container">
        <div class="home-section">
          <div class="left-ctt left ">
            <ul>
              <li  v-if="nav.name != '美食/特产' && nav.name != '其它试用'" :class="[$store.state.TaskCategoryActive == nav.id ? 'active' : '']" @click="selTaskCategoryActiveFunc(nav)" v-for="nav in navList" >
                <img width="16" height="16"  :src="nvaImgSrc[nav.id]" alt="">
                <span class="ml-5">{{nav.name}}</span>
              </li>
              <li :class="[$store.state.TaskCategoryActive == 'all' ? 'active' : '']" @click="selTaskCategoryAllFunc">
                <img width="16" height="16"  src="/static/img/nav-picture/home_26.png" alt="">
                <span class="ml-5">全部活动</span>
              </li>
            </ul>
          </div>
          <div class="middle-ctt left">
            <Carousel autoplay :autoplay-speed="5000" v-model="homeCarousel" loop>
              <!--<Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/home/banner_01.jpg" alt="">
                </router-link>

              </Carousel-item>-->
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/home/banner_02.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                 <img class="block" src="~assets/img/home/banner_03.jpg" alt="">
                </router-link>
              </Carousel-item>
              <Carousel-item>
                <router-link to="" class="block">
                  <img class="block" src="~assets/img/home/banner_04.jpg" alt="">
                </router-link>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="right-ctt">
            <div class="login-up-box" v-if="!isLogin">
              <div class="portrait-box">
                <img src="~assets/img/common/home_24.png" alt="">
                <p>hi，你还没登录哦~</p>
              </div>
              <div class="mt-20 default-login">
                <router-link to="/sel-role">免费注册</router-link>
                <router-link to="/login">马上登录</router-link>
              </div>
              <div class="text-ct mt-10">
                <a
                  href="https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101432052&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fwww.xiuba365.com%2Fqq-login">
                  <img style="vertical-align: -7px;" src="~assets/img/common/qq_logo.png" alt="">
                  使用QQ登录秀吧
                </a>
              </div>
            </div>
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 0">
              <div>
                <router-link to="/user/user-home" class="left">
                  <img class="block ml-20 portrait-img" :src="userHeadUrl" alt="">
                </router-link>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <router-link to="/user/personal-setting/personal-account-info" :title="decodeURIComponent(getUserInfoPhone)" class="ellipsis user-name">
                    Hi~ 秀客 {{decodeURIComponent(getUserInfoPhone)}}
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
            <div class="login-in-box" v-if="isLogin && getUserInfoRole　== 1">
              <div class="clear">
                <Tooltip content="上传自定义个性头像，可以提高活动申请通过率哦，点击修改头像！" placement="bottom" class="left">
                  <router-link tag="img" to="/user/personal-setting/personal-account-info" width="56" :src="userHeadUrl" class="cursor-p"></router-link>
                </Tooltip>
                <div class="left fs-14 ml-20" style="margin-left: 10px;line-height: 28px;">
                  <router-link to="/user/user-home" :title="decodeURIComponent(getUserInfoPhone)" class="ellipsis user-name">
                    Hi~ 商家 {{decodeURIComponent(getUserInfoPhone)}}
                  </router-link>
                  <div v-if="getUserInfoRole === 1&& !getMemberLevel" class="fs-12">
                    <Icon type="social-vimeo" style="color: gray"></Icon>
                    <span>非会员</span>
                    <router-link to="/user/vip-member">马上开通会员</router-link>
                  </div>
                  <div v-if="getUserInfoRole === 1&&getMemberLevel" class="fs-12">
                    <Icon type="social-vimeo" style="color: red"></Icon>
                    <span>到期时间:{{Math.floor((parseInt(getMemberDeadline) - parseInt((new Date().getTime()))) / 86400000)}}天</span>
                    <router-link to="/user/vip-member">续费</router-link>
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
                  <span class="left text-ct" style="width: 33.33%;">待审秀客</span>
                  <span class="left text-ct" style="width: 33.33%;">待审订单</span>
                  <span class="left text-ct" style="width: 33.33%;">待审买家秀</span>
                </div>
                <p class="clear-both pt-10">
                  <router-link v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) <= 0 "
                               to="/user/task-release" class="ivu-btn ivu-btn-success ivu-btn-long">
                    免费发布活动
                  </router-link>
                  <router-link v-if="parseInt(trialCount.finishedTaskCount) + parseInt(trialCount.underWayTask) > 0 "
                               to="/user/task-release" class="ivu-btn ivu-btn-error ivu-btn-long">
                    继续发布活动
                  </router-link>
                </p>
              </div>
            </div>
            <div class="notice-box">
              <p>
                <a v-show="!(getUserInfoRole == 0 && notice.title == '商家问题')" v-for="notice in noticeList" :class="[noticeActive == notice.active ? 'active' : '']"
                   @click="changeNoticeTab(notice)">{{notice.title}}</a>
              </p>
              <div v-for="(notice,index) in noticeList" v-show="noticeActive == notice.active" :key="index"
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
                <img  style="vertical-align: middle" src="~assets/img/home/top_mjx.png" alt="">
                <span class="ml-10" style="font-size: 13px;color: #999;transform: translateY(2px)">给你最精彩</span>
                <span class="right cursor-p" @click="getMoreBuyerShow = true">更多买家秀...</span>
              </div>
              <ul class="clear" :class="[leftSlider ? 'slider-top-active-left' : 'slider-top-default-left']"
                  @mouseover="clearLeftSliderFunc()" @mouseleave="leftSliderFunc()">
                <li v-for="item in buyerShowList" class="content cursor-p left pos-rel" >
                  <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId),showReportDesc:true,id:encryptionId(item.id)}}" :title="item.taskName">
                    <div style="height: 260px">
                      <img :src="item.trialReportImages+'!thum200'" alt="" width="200" height="260">
                    </div>
                     <p class=" top-heart clear" >
                       <Icon type="heart" class="left" style="font-size: 14px;margin-top: 2px"></Icon>
                       <span class="left ml-5" >赞({{item.likeCount}})</span>
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
                    <router-link :to="{path:'/trial-report',query:{q:encryptionId(item.showkerId)}}" class="user-head-box ml-10"><img  width="48" height="48" :src="getUserHead(item.showkerPortraitPic)" alt=""></router-link>
                    <div class="left ml-10" style="margin-top: 5px">
                      <p style="color: #000">{{item.showkerPhone}}</p>
                      <img :src="item.creditLevel" alt="">
                      <p>淘气值：{{item.tqz}}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-ctt right ml-10">
            <div style="overflow: hidden">
              <ul :class="[leftTopSlider ? 'slider-top-active-right' : 'slider-top-default-right']"
                  @mouseover="clearLeftTopSliderFunc()" @mouseleave="leftTopSliderFunc()">
                <li v-for="taskTopLeft in taskTopLeftList">
                  <router-link :to="{path:'/task-details', query:{q: encryptionId(taskTopLeft.task.id)}}"
                               :title="taskTopLeft.task.taskName" class="block">
                    <div class="left img-box">
                      <img :src="taskTopLeft.task.taskMainImage + '!thum54'" alt="" width="54" height="54">
                    </div>
                    <div class="left text-box ml-10">
                      <p>秀客{{taskTopLeft.showkerPhone}}免费领取了</p>
                      <p>
                        价值<span class="text ml-5">￥{{taskTopLeft.task.itemPrice / 100}}</span> 的宝贝
                      </p>
                      <span style="color: #999;">
                      {{
                        (new Date() - taskTopLeft.createTime) / 1000 < 60 ? 1 :
                          (new Date() - taskTopLeft.createTime) / 1000 / 60 < 60 ? parseInt((new Date() - taskTopLeft.createTime) / 1000 / 60) :
                            (new Date() - taskTopLeft.createTime) / 1000 / 60 / 60 / 24 < 1 ? parseInt((new Date() - taskTopLeft.createTime) / 1000 / 60 / 60) :
                              parseInt((new Date() - taskTopLeft.createTime) / 1000 / 60 / 60 / 24)
                        }}
                      </span>
                      <span style="color: #999;"
                            v-if="(new Date() -taskTopLeft.createTime)/1000/60 < 60 || (new Date() -taskTopLeft.createTime)/1000 < 60">
                        分钟前
                      </span>
                      <span style="color: #999;"
                            v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 < 1 && (new Date() -taskTopLeft.createTime)/1000/60 >= 60">
                        小时前
                      </span>
                      <span style="color: #999;" v-if="(new Date() -taskTopLeft.createTime)/1000/60/60/24 >= 1">
                        天前
                      </span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="home-commodity">
          <div class="home-commodity-title">
            <div class="home-commodity-img-title">
              <div class="part-title-img-box">
                <span class="fs-18">免费领</span>
              </div>
            </div>
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         v-for="homeCommodity in homeCommodityList"
                         :title="homeCommodity.taskName"
                         :key="homeCommodity.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeCommodity.id)}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeCommodity.taskMainImage + '!orgi75'" alt=""
                     style="width: 100%; height: 208px;">
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeCommodity.taskName}}</p>
                <p class="home-commodity-price">
                  <em style="float: left;" class="price-list">
                    <span style="color: #666; display: block; text-decoration: line-through;">￥{{homeCommodity.itemPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="homeCommodity.discountPrice">￥{{homeCommodity.discountPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="!homeCommodity.discountPrice && homeCommodity.discountRate">
                      ￥{{(Math.floor((homeCommodity.discountRate/100) * homeCommodity.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span style="font-weight: bold;" v-if="!homeCommodity.discountPrice && !homeCommodity.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em  class="price-icon mt-10">
                    <span v-if="homeCommodity.activityCategory == 'price_low' && homeCommodity.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountPrice/100)].backgroundColor}" >
                      {{homeCommodity.discountPrice/100}}试用
                    </span>
                    <span v-if="homeCommodity.activityCategory == 'price_low' && homeCommodity.discountRate" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeCommodity.discountRate/10) + '折'].backgroundColor}" >
                      {{homeCommodity.discountRate/10}}折试用
                    </span>
                  </em>
                </p>
                <p class="home-commodity-apply">
                  限量 <span style="color: #ff6600"> {{homeCommodity.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{homeCommodity.showkerApplyTotalCount || 0}} </span> 人已申请
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeCommodity.id)}}"
                               class="ivu-btn ivu-btn-long">
                    免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
            <p class="text-ct">
              <router-link class="ivu-btn" :to="{ 'path': '/task-category', 'query': {'searchAll': 'yes'}}">查看全部活动
              </router-link>
            </p>
          </div>
        </div>
      </div>
      <!--白菜价开始-->
      <div class="container" style="margin-top: 10px;">
        <div class="home-commodity">
          <div class="home-commodity-title">
            <div class="home-commodity-img-title">
              <div class="part-title-img-box">
                <span class="fs-18">白菜价</span>
              </div>
            </div>
            <p class="text-ct fs-14">我型我秀，分享精彩</p>
          </div>
          <div class="home-commodity-ctt">
            <router-link class="home-commodity-details"
                         v-for="homeDisCount in homeDisCountList"
                         :title="homeDisCount.taskName"
                         :key="homeDisCount.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeDisCount.id), 'discount': true,}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeDisCount.taskMainImage + '!orgi75'" alt="" style="width: 100%; height: 208px;">
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeDisCount.taskName}}</p>
                <p class="home-commodity-price" >
                  <em style="float: left;" class="price-list">
                    <span style="color: #666; display: block; text-decoration: line-through;">￥{{homeDisCount.itemPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="homeDisCount.discountPrice">￥{{homeDisCount.discountPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="!homeDisCount.discountPrice && homeDisCount.discountRate">
                      ￥{{(Math.floor((homeDisCount.discountRate/100) * homeDisCount.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span style="font-weight: bold;" v-if="!homeDisCount.discountPrice && !homeDisCount.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em  class="price-icon mt-10">
                    <span v-if="homeDisCount.activityCategory == 'price_low' && homeDisCount.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeDisCount.discountPrice/100)].backgroundColor}" >
                      {{homeDisCount.discountPrice/100}}试用
                    </span>
                    <span v-if="homeDisCount.activityCategory == 'price_low' && homeDisCount.discountRate" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeDisCount.discountRate/10) + '折'].backgroundColor}" >
                      {{homeDisCount.discountRate/10}}折试用
                    </span>
                  </em>
                </p>
                <p class="home-commodity-apply">
                  限量 <span style="color: #ff6600"> {{homeDisCount.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{homeDisCount.showkerApplyTotalCount || 0}} </span> 人已申请
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeDisCount.id)}}" class="ivu-btn ivu-btn-long" >
                    免费领取
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--白菜价结束-->

      <!--历史活动开始-->
      <div class="container" style="margin-top: 10px;">
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
                         v-for="homeHistory in homeHistoryList"
                         :title="homeHistory.taskName"
                         :key="homeHistory.id"
                         :to="{ 'path': '/task-details','query': {'q': encryptionId(homeHistory.id)}}">
              <div class="home-commodity-img">
                <img class="block" v-lazy="homeHistory.taskMainImage + '!orgi75'" alt=""
                     style="width: 100%; height: 208px;">
              </div>
              <div class="home-commodity-text">
                <p class="cl000">{{homeHistory.taskName}}</p>
                <p class="home-commodity-price">
                  <em style="float: left;" class="price-list">
                    <span style="color: #666; display: block; text-decoration: line-through;">￥{{homeHistory.itemPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="homeHistory.discountPrice">￥{{homeHistory.discountPrice / 100}}</span>
                    <span style="font-weight: bold;" v-if="!homeHistory.discountPrice && homeHistory.discountRate">
                      ￥{{(Math.floor((homeHistory.discountRate/100) * homeHistory.itemPrice)/100).toFixed(2)}}
                    </span>
                    <span style="font-weight: bold;" v-if="!homeHistory.discountPrice && !homeHistory.discountRate">
                      ￥0
                    </span>
                  </em>
                  <em  class="price-icon mt-10">
                    <span v-if="homeHistory.activityCategory == 'price_low' && homeHistory.discountPrice" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeHistory.discountPrice/100)].backgroundColor}" >
                      {{homeHistory.discountPrice/100}}试用
                    </span>
                    <span v-if="homeHistory.activityCategory == 'price_low' && homeHistory.discountRate" class="left home-discount-price mt-5" :style="{backgroundColor: $store.state.discountPriceType[parseFloat(homeHistory.discountRate/10) + '折'].backgroundColor}" >
                      {{homeHistory.discountRate/10}}折试用
                    </span>
                  </em>
                </p>
                <p class="home-commodity-apply">
                  限量 <span style="color: #ff6600"> {{homeHistory.taskCount || 0 }} </span> 份，
                  <span style="color: #ff6600"> {{homeHistory.showkerApplyTotalCount || 0}} </span> 人已申请
                </p>
                <p class="home-commodity-take">
                  <router-link :to="{ 'path': '/task-details','query': {'q':encryptionId(homeHistory.id)}}"
                               class="ivu-btn ivu-btn-long">
                    查看详情
                  </router-link>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--历史活动结束-->
      <div class="container">
        <div class="home-bottom mt-20">
          <img v-if="!isLogin || getUserInfoRole == 1" class="ml-5" src="~assets/img/home/home_23.png" alt="">
          <img v-if="isLogin &&　getUserInfoRole == 0" class="ml-5" src="~assets/img/home/home_24.png" alt="">
        </div>
      </div>
    </div>
    <Modal v-model="wechartAlertShow" width="550" @on-cancel="cancelWeiChartFunc">
      <div style="text-align: right;margin-right: 11px;position: relative;top: -2px;">
        <Checkbox-group v-model="wechartShowAgain">
          <Checkbox label="true">不再提醒</Checkbox>
        </Checkbox-group>
        <!--<p v-show="getUserInfoRole == 0" class="ml-10" style="position: absolute;bottom: 90px;left: 21px; height: 30px; line-height: 30px;">-->
        <!--<span class="left fs-14 mr-10" style="color: #ff6633;">特权口令：</span>-->
        <!--<iInput v-model="command"  class="left mr-10" style="width:150px;"></iInput>-->
        <!--<iButton class="left" type="error" @click="setWeChartAlertFunc(0)" >提交</iButton>-->
        <!--</p>-->
        <img style="position: absolute;top: 0;" src="/static/img/home/wechart_alert_01.png" alt="">
        <img v-show="getUserInfoRole == 1" src="/static/img/home/wechart_alert_03.png" alt=""
             style="width: 100%; margin-top: 20px">
        <p v-show="getUserInfoRole == 1" class="ml-10"
           style="position: absolute;bottom: 111px;left: 21px; height: 30px; line-height: 30px;">
          <span class="left fs-12 ml-10" style="color: #ff6633;">特权口令：</span>
          <iInput v-model="command" class="left mr-10" style="width:150px;"></iInput>
          <iButton class="left" type="error" @click="setWeChartAlertFunc(1)">提交</iButton>
        </p>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <div class="confirm-recharge-model" v-show="$store.state.wechartShow">
      <div class="confirm-recharge-con">
        <div class="pos-rel">
          <Checkbox-group v-model="wechartShowAgain" style="position: absolute;top:25px;right: 30px;">
            <Checkbox label="true">不再提醒</Checkbox>
          </Checkbox-group>
          <div style="position: absolute;top:27px;right: 15px;cursor: pointer;color: #FF6633" @click="cancelWeiChartFunc">
            <Icon type="close" ></Icon>
          </div>
          <img v-show="getUserInfoRole == 0" src="/static/img/home/wechart_alert_07.png" alt=""
               style="width: 507px;height: 340px; margin-top: 20px">
        </div>
      </div>
    </div>
    <Modal v-model="getMoreBuyerShow" width="300" >
      <div class="text-ct">
        <div style="height: 20px"></div>
        Coming soon，敬请期待！
        <div style="height: 20px"></div>
      </div>
      <div slot="footer" class="text-ct">
        <iButton type="error" long large @click="getMoreBuyerShow = false">确定</iButton>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Form from 'iview/src/components/form'
  import Input from 'iview/src/components/input'
  import Checkbox from 'iview/src/components/checkbox'
  import Button from 'iview/src/components/button'
  import Radio from 'iview/src/components/radio'
  import Modal from 'iview/src/components/modal'
  import Tooltip from 'iview/src/components/tooltip'
  import Carousel from 'iview/src/components/carousel'
  import SmsCountdown from '@/components/SmsCountdown'
  import api from '@/config/apiConfig'
  import {setStorage, getStorage, encryption,removeStorage} from '@/config/utils'
  import {aliCallbackImgUrl} from '@/config/env'
  import {mapActions} from 'vuex'

  export default {
    beforeMount() {
      let self = this;
      if (getStorage('weChartPop') === 1 && self.$store.state.userInfo.role === 0 && !getStorage('setWeChartshower' + self.$store.state.userInfo.phone)) {
        self.weChartShowkerAlertFunc();
      }
      self.$store.commit({
        type: 'SET_SHOW_TOP_CATEGORY_RES',
        result: false,
      });
    },
    name: 'home',
    components: {
      iInput: Input,
      iForm: Form,
      FormItem: Form.Item,
      Checkbox: Checkbox,
      CheckboxGroup: Checkbox.Group,
      iButton: Button,
      Icon: Icon,
      SmsCountdown: SmsCountdown,
      Radio: Radio,
      Modal: Modal,
      Carousel: Carousel,
      CarouselItem: Carousel.Item,
      Tooltip:Tooltip
    },
    data() {
      return {
        confirmRechargeModel:true,
        command: '',
        wechartAlertShow: false,
        wechartShowAgain: [],
        leftTopSliderTimer: '',
        leftSliderTimer: '',
        leftTopSlider: false,
        leftSlider:false,
        trialCount: {},
        homeCommodityList: [],
        homeHistoryList: [],
        homeDisCountList: [],
        noticeList:[
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
                text: '注册秀吧收费么？',
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
            title: '秀客问题',
            content: [
              {
                url: '/user/help-center/faq-showker',
                text: '秀客完整流程？',
                page: 'special'
              },
              {
                url: '/user/help-center/faq-showker',
                text: '秀客下单规则？',
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
        nvaImgSrc:{
          100: '/static/img/nav-picture/home_07.png',
          200: '/static/img/nav-picture/home_09.png',
          300: '/static/img/nav-picture/home_11.png',
          400: '/static/img/nav-picture/home_13.png',
          500: '/static/img/nav-picture/home_15.png',
          600: '/static/img/nav-picture/home_22.png',
          700: '/static/img/nav-picture/home_23.png',
          800: '/static/img/nav-picture/home_24.png',
          900: '/static/img/nav-picture/home_25.png',
          1000: '/static/img/nav-picture/home_26.png',
        },
        buyerShowList:[],
        getMoreBuyerShow:false,
        homeCarousel: 0
      }
    },
    created() {
      if (this.$store.state.login) {
        this.weChartAlertFunc();
      }
      this.getNavList();
      this.getHomeTaskList();
      this.getHomeTaskTopLeftList();
      this.personalTrialCount();
      this.getHomeHistoryList();
      this.getBuyerShowList();
      this.getHomeDisCountList();
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
      getMemberLevel() {
        return this.$store.state.userInfo.memberLevel
      },
      userHeadUrl() {
        return this.$store.getters.getUserHeadUrl
      },
      getUserRole () {
        return this.$store.getters.getUserRole
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        let self = this;
        self.leftTopSliderFunc();
      });
        this.$nextTick(function () {
        let self = this;
        self.leftSliderFunc();
      })
    },

    methods: {
      ...mapActions([
        'loggedOut'
      ]),
      getUserHead(src) {
        if (src && src.indexOf('head-image') >= 0) {
          return aliCallbackImgUrl + src + '!orgi75'
        } else if (src && src.indexOf('q.qlogo.cn/qq') >= 0) {
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
              if (JSON.parse(self.buyerShowList[i].trialReportImages)[0][0] !== 'h'){
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
      selTaskCategoryAllFunc(){
        let self = this;
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all'
        });
        self.$router.push({ 'path': '/task-category', 'query': {'searchAll': 'yes'}});
      },
      selTaskCategoryActiveFunc(nav){
        let self = this;
        self.$router.push({ 'path': '/task-category', 'query': {'cate': nav.id}});
        self.$store.commit({
          type: 'SET_DISCOUNT_TASK_CATEGORY',
          result: false
        });
        self.$store.commit({
          type: 'TASK_CATEGORY_LIST',
          info: 'all',
        });
      },
      getNavList(){
        let self = this;
        api.getNavList().then((res) =>{
          if(res.status){
            res.data.sort(function(a,b){
              return a.sortIndex-b.sortIndex
            });
            self.navList = res.data;
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
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
        _this.loggedOut().then(res => {
          if (res.status) {
            _this.$router.push({name: 'login'})
          } else {
            _this.$Message.error(res.msg)
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
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          } else {
            api.sellerPersonalTrialCount().then((res) => {
              if (res.status) {
                self.trialCount = res.data
              } else {
                self.$Message.error({
                  content: res.msg,
                  duration: 9
                });
              }
            })
          }
        }
      },
      getHomeTaskTopLeftList() {
        let self = this;
        api.getHomeTaskTopLeftList().then((res) => {
          if (res.status) {
            self.taskTopLeftList = res.data;

          } else {

          }
        })
      },
      getHomeTaskList() {
        let self = this;
        api.getIndexRecommend().then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeCommodityList = res.data;
            }
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      getHomeHistoryList() {
        let self = this;
        api.getHomeHistoryList().then((res) => {
          if (res.status) {
            if (res.data) {
              self.homeHistoryList = res.data;
            }
          } else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
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
      getHomeDisCountList(){
        let self = this;
        api.getHomeDisCountList().then((res) => {
          if(res.status){
            res.data ? self.homeDisCountList = res.data : self.homeDisCountList = [];
          }else {
            self.$Message.error({
              content: res.msg,
              duration: 9
            });
          }
        })
      },
      leftTopSliderFunc(){
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
      clearLeftSliderFunc(){
        let self = this;
        clearInterval(self.leftSliderTimer);
      },
      changeNoticeTab(notice) {
        this.noticeActive = notice.active;
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
      .masterImgBox{
        width: 200px;
        height: 260px;
        overflow: hidden;
        display:table-cell;
        vertical-align:middle;
        text-align: center;
        background-color:#F1F2F6;
      }
      .left-ctt {
        padding: 0 10px;
        background-color: #fff;
        width: 900px;
        height: 500px;
        overflow: hidden;
        .title{
          padding: 15px 10px 10px 10px;
          border-bottom: 1px solid #F6F6F6;
          img{
          }
        }
        ul{
          padding: 10px 10px;
          width: 10000px;
          li{
            padding: 0px 20px 0 0 ;
            width: 220px;
            margin-bottom: 52px;
            .top-heart{
              position: absolute;
              top: 5px;
              right: 22px;
              background-color: #fff;
              border: 1px solid #fff;
              border-radius: 3px;
              color: #FF0000;
              padding: 0 3px;
              img{
                margin-top: 3px;
              }
            }
            .price{
              position: absolute;
              width: 200px;
              top: 230px;
              left: 0px;
              height: 30px;
              line-height: 30px;
              padding: 0px 3px;
              color: #fff;
              background-color: rgba(0,0,0,0.5);
              span:first-child{
                width: 128px;
              }
              span:last-child{
                color: #FFFF00;
              }
            }
            .description{
              padding-left: 25px;
              height: 30px;
              overflow: hidden;
              img{
                position: absolute;
                left: 0;
                top: -3px;
              }
              .double-question-mark{
                position: absolute;
                left: 0;
                top: -3px;
                display: inline-block;
                width: 18px;
                height: 34px;
                background:url("~assets/img/home/double_marks.png");
              }
              .des-text{
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
            .icon-heart{
              font-size: 16px;
            }
            .bottom{
              font-size: 14px;
              .click-good{
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
        padding-top: 10px;
        .left-ctt-top{
          height: 50px;
          line-height: 50px;
          background-color: $mainColor;
          color: #fff;
          font-size: 16px;
        }
        ul {
          li {
            padding: 7px 0;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            line-height: 30px;
            img{
              vertical-align: middle;
            }
          }
          li.active{
            color: $mainColor;
          }
          li:hover{
            background-color: #ffe4dc;
          }
        }
      }
      .middle-ctt {
        width: 700px;
        margin: 0 10px;
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
          padding: 15px;
          height: 205px;
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
            p.home-commodity-price {
              color: #FF6633;
              height: 40px;
              line-height: normal;
              em{
                font-style: normal;
              }
              em.price-list{
                float: left;
              }
              em.price-icon{
                span{
                  margin-top: 16px;
                  margin-left: 10px;
                }
              }
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

  .user-head-box{
    float: left;
    width: 48px;
    height: 48px;
    img{
      border-radius: 50%;
    }
  }

  .home-discount-price{
    color: #fff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    margin-right: 15px;
    margin-top: 3px;
    margin-left: 5px
  }
  .slider-top-active{
    margin-top: -77px;
    animation: sliderTop 1s;
  }

  .slider-top-default {
    margin-top: 0;
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
</style>
