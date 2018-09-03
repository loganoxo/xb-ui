/**
 * Created by ycb on 2017/4/26.
 */
import axiosConfig from '@/config/axiosConfig'

export default {
  /**
   * 用户普通登录
   */
  login(params) {
    return axiosConfig.post("/api/login.json", params)
  },

  /**
   * 第三方平台登录
   */
  thirdPartyLogin(params) {
    return axiosConfig.post("/api/user/sign-in-sync.json", params)
  },

  /**
   * 用户退出登录
   */
  loggedOut() {
    return axiosConfig.get("/api/logged-out.json")
  },

  /**
   * 获取短信验证码
   */
  getCode(params) {
    return axiosConfig.post("/api/send-verify-code.json", params)
  },

  /**
   * 获取银行卡信息
   */
  getBankCardInformation() {
    return axiosConfig.get("/api/get-bank-card-information.json")
  },

  /**
   * 获取用户截图
   */
  getUserScreenShot(params) {
    return axiosConfig.post("/api/get-user-screen-shot.json", params)
  },

  /**
   * 验证重置密码短信
   */
  validatePaySmscode(params) {
    return axiosConfig.post("/api/user/account/check-phone-message-before-reset-pwd.json", params)
  },

  /**
   * 通过手机短信验证码重置支付密码
   */
  modifyPayPwd(params) {
    return axiosConfig.post("/api/user/account/reset-pay-pwd-by-smscode.json", params)
  },

  /**
   * 未登录通过发送手机短信验证码重置支付密码
   */
  noLoginModifyPayPwdCode(params) {
    return axiosConfig.post("/api/user/account/checkApp.json", params)
  },

  /**
   * 未登录通过发送手机短信验证码重置支付密码
   */
  noLoginModifyPayPwd(params) {
    return axiosConfig.post("/api/user/account/resetAppPwd.json", params)
  },

  /**
   * 通过上一次的支付密码修改支付密码
   */
  modifyDefaultPayPwd(params) {
    return axiosConfig.post('/api/user/account/reset-pay-pwd-by-originPwd.json', params)
  },

  /**
   * 用户快速登录
   */
  checkFastSignIn(params) {
    return axiosConfig.post("/api/check-fast-sign-in.json", params)
  },

  /**
   * QQ快速登录
   */
  QQLoginFunc(params) {
    return axiosConfig.post("/api/user/qq/sign-in.json", params)
  },

  /**
   * 用户注册
   */
  register(params) {
    return axiosConfig.post("/api/sign-up.json", params)
  },

  /**
   * qq快速注册
   */
  qqRegister(params) {
    return axiosConfig.post("/api/user/qq/data-complete.json", params)
  },

  /**
   * 获取用户交易列表
   */
  getTradList(params) {
    return axiosConfig.post("/api/get-trad-list.json", params)
  },

  /**
   * 添加银行卡
   */
  addBankCardInfo(params) {
    return axiosConfig.post("/api/add-bank-card.json", params)
  },

  /**
   * 申请提现
   */
  applyGetoutMoney(params) {
    return axiosConfig.post("/api/with-draw-apply.json", params)
  },

  /**
   * 显示提现列表
   */
  getWithDrawList(params) {
    return axiosConfig.post("/api/get-with-draw-list.json", params)
  },

  /**
   * 获取交易明细列表
   */
  getTradListDetails(params) {
    return axiosConfig.post("/api/get-trad-detail-list.json", params)
  },

  /**
   * 获取某个活动的任务担保金返款列表
   */
  getDepositReturnList(params) {
    return axiosConfig.post("/api/get-deposit-return-list.json", params)
  },

  /**
   * 通过支付宝充值并支付金额
   */
  balanceOrderCreate(params) {
    return axiosConfig.post("/api/balance-order-create.json", params)
  },

  /**
   * 通过上一次的密码修改支付密码
   */
  findPwdOrigin(params) {
    return axiosConfig.post("/api/find-pwd-by-origin.json", params)
  },

  /**
   * 通过上一次的登录密码修改登录密码
   */
  modifyDefaultPwd(params) {
    return axiosConfig.post('/api/user/account/reset-login-pwd-by-originPwd.json', params)
  },

  /**
   * 通过手机短信验证码重置登录密码
   */
  modifyTrendsPwd(params) {
    return axiosConfig.post('/api/user/account/reset-login-pwd-by-smscode.json', params)
  },

  /**
   * 获取用户、账户、旺旺账号
   */
  getUserAccount(params) {
    return axiosConfig.get("/api/get-user-account.json", params)
  },

  /**
   * 平台宝贝类目列表
   */
  getCommodityCategories() {
    return axiosConfig.get("/api/task/item/catalog/main.json")
  },

  /**
   * 首页活动任务展示接口
   */
  getHomeTaskList() {
    return axiosConfig.get("/api/task/index/newest.json")
  },

  /**
   * 首页推荐
   */
  getIndexRecommend(params) {
    return axiosConfig.get("/api/task/index/recommend.json", params)
  },

  /**
   * 首页左上角类表接口
   */
  getHomeTaskTopLeftList() {
    return axiosConfig.get("/api/task/showker-newest.json")
  },

  /**
   * 分类页面请求
   */
  getTaskCategory(params) {
    return axiosConfig.get("/api/task/get/item/catalog/parent.json", params)
  },

  /**
   * 分类页面下的小类
   */
  getTaskCategoryList(params) {
    return axiosConfig.get('/api/task/item/catalog/child.json', params)
  },

  /**
   * 分类页面任务详情请求
   */
  getSearchTask(params) {
    return axiosConfig.post("/api/search/task/s.json", params)
  },

  /**
   * 分类页面历史活动任务详情请求
   */
  getSearchHistoryTask(params) {
    return axiosConfig.post('/api/search/task/his.json', params)
  },

  /**
   * 详情页页面
   */
  getTaskDetails(params) {
    return axiosConfig.get('/api/task/detail.json', params)
  },

  /**
   * 用户任务发布
   */
  taskCreate(params) {
    return axiosConfig.post("/api/task-create.json", params)
  },

  /**
   * 用户快速任务发布
   */
  taskCreateFast(params) {
    return axiosConfig.post("/api/task-create-fast.json", params)
  },

  /**
   * 获取用户快速任务发布资格
   */
  taskCreateFastStatus() {
    return axiosConfig.get("/api/task-create-fast-status.json")
  },

  /**
   * 获取商品类型
   */
  itemCatalog() {
    return axiosConfig.get("/api/item-catalog.json")
  },

  /**
   * 用户余额支付
   */
  payByBalance(params) {
    return axiosConfig.post("/api/pay-by-balance.json", params)
  },

  /**
   * 实名认证初始化
   */
  verifiedInit() {
    return axiosConfig.post("/api/identity-index.json")
  },

  /**
   * 实名认证提交
   */
  verifiedSubmit(params) {
    return axiosConfig.post("/api/user/identity/saveidentity.json", params)
  },

  /**
   * 绑定旺旺号
   */
  wwBind(params) {
    return axiosConfig.post("/api/alitm-bunding.json", params)
  },

  /**
   * 获取旺旺信息列表
   */
  wwBindList() {
    return axiosConfig.post("/api/get-alitm-info-list.json")
  },

  /**
   * 解绑旺旺号
   */
  wwUnbind(params) {
    return axiosConfig.post("/api/alitm-unBunding.json", params)
  },

  /**
   * 修改旺旺号
   */
  wwModify(params) {
    return axiosConfig.post("/api/alitm/resubmit.json", params)
  },

  /**
   * 获取活动活动管理列表
   */
  getTaskList(params) {
    return axiosConfig.post("/api/task-list.json", params)
  },

  /**
   * 商家活动活动管理任务关闭
   */
  closeTask(params) {
    return axiosConfig.post("/api/close-task.json", params)
  },

  /**
   * 商家活动活动管理任务删除
   */
  deleteTask(params) {
    return axiosConfig.post("/api/delete-task.json", params)
  },

  /**
   * 商家申请任务结算
   */
  settlementTask(params) {
    return axiosConfig.post("/api/task-settlement.json", params)
  },

  /**
   * 判断商家是否答题
   */
  checkSellerTest() {
    return axiosConfig.post('/api/user/quiz/check.json',)
  },

  /**
   * 赠送vip
   * **/
  giveSellerVip() {
    return axiosConfig.post('/api/user/quiz/done.json',)
  },

  /**
   * 任务数据获取
   */
  getTaskInfo(params) {
    return axiosConfig.get("/api/get-task.json", params)
  },

  /**
   * 商家获取已申请任务的拿手列表
   */
  getTaskApplyList(params) {
    return axiosConfig.post("/api/get-task-apply-list.json", params)
  },

  /**
   * 商家审核秀客允许通过
   */
  setTaskShowkerPass(params) {
    return axiosConfig.post("/api/set-task-showker-pass.json", params)
  },

  /**
   * 商家审核秀客拒绝通过
   */
  setTaskShowkerReject(params) {
    return axiosConfig.post("/api/set-task-showker-reject.json", params)
  },

  /**
   * 商家审核拿手订单号
   */
  orderNumberAudit(params) {
    return axiosConfig.post("/api/order-number-audit.json", params)
  },

  /**
   * 商家获取拿手订单详情
   */
  orderNumberInfo(params) {
    return axiosConfig.post("/api/order-number-info.json", params)
  },

  /**
   * 商家对任务补充担保金
   */
  depositSupplement(params) {
    return axiosConfig.post("/api/deposit-supplement.json", params)
  },

  /**
   * 商家审核买家秀
   */
  taskReportAudit(params) {
    return axiosConfig.post("/api/task-report-audit.json", params)
  },

  /**
   * 获取会员活动信息
   */
  getUserMemberAll() {
    return axiosConfig.post("/api/get-user-member-all.json")
  },

  /**
   * 获取所有会员版本周期列表
   */
  getMemberVersionPeriodList() {
    return axiosConfig.post("/api/get-member-version-period-list.json")
  },

  /**
   * 获取当前会员版本折扣
   */
  getMemberSurplusFee() {
    return axiosConfig.post("/api/get-member-surplus-fee.json")
  },


  /**
   * 获取会员等级详细信息
   */
  getUserMemberLevelInfo(params) {
    return axiosConfig.post("/api/get-user-member-level-info.json", params)
  },

  /**
   * 获取会员版本说明信息
   */
  getMemberInstructionsInfo() {
    return axiosConfig.post("/api/get-member-instructions-info.json")
  },

  /**
   * 判断是否可以发布活动
   */
  checkMemberForTask() {
    return axiosConfig.post("/api/get-check-Member-for-task.json")
  },

  /**
   * 通过账户余额购买会员
   */
  memberPurchase(params) {
    return axiosConfig.post("/api/user-member-purchase.json", params)
  },

  /**
   * 拿手申请列表
   * 待审核和未通过的
   */
  showkerApplyList(params) {
    return axiosConfig.post("/api/showker-apply-list.json", params)
  },

  /**
   * 拿手申请列表
   * 审核通过的
   */
  showkerSuccessList(params) {
    return axiosConfig.post("/api/showker-success-list.json", params)
  },

  /**
   * 拿手终止活动（针对申请成功的任务）
   */
  showkerTrialEed(params) {
    return axiosConfig.post("/api/showker-trial-end.json", params)
  },

  /**
   * 拿手终止活动（针对申请还没有审核结果的任务）
   */
  showkerApplyEed(params) {
    return axiosConfig.post("/api/showker-apply-end.json", params)
  },

  /**
   * 拿手删除未审核通过的记录
   */
  applyDelete(params) {
    return axiosConfig.post("/api/showker-apply-delete.json", params)
  },

  /**
   * 拿手去下单
   */
  showkerToProcessOrder(params) {
    return axiosConfig.post("/api/showker-to-process-order.json", params)
  },

  /**
   * 拿手保存订单号
   */
  showkerOrderSave(params) {
    return axiosConfig.post("/api/showker-order-save.json", params)
  },

  /**
   * 拿手保存买家秀
   */
  showkerSaveReport(params) {
    return axiosConfig.post("/api/showker-save-report.json", params)
  },

  /**
   *详情页拿手报告列表
   */
  getDetailsShowkerList(params) {
    return axiosConfig.get("/api/task/trial/report.json", params)
  },

  /**
   *详情页已审核拿手列表
   */
  getDetailsSuccessShowkerList(params) {
    return axiosConfig.get("/api/task/success.json", params)
  },

  /**
   * 拿手修改买家秀
   */
  showkerModifyReport(params) {
    return axiosConfig.post("/api/showker-modify-report.json", params)
  },

  /**
   * 拿手的买家秀（针对获取买家秀列表，分页查询）
   */
  getTrialReports(params) {
    return axiosConfig.post("/api/task/showker/trial/reports.json", params)
  },

  /**
   * 拿手的活动详情（针对获取拿手活动详情）
   */
  getTrialDetail(params) {
    return axiosConfig.post("/api/task/showker/trial/detail.json", params)
  },

  /**
   * 根据拿手任务ID获取拿手任务，用户ID兼容拿手角色和商家角色
   * 当uid为拿手的uid时，获取属于该拿手的任务
   * 当uid为商家的uid时，获取属于该商家活动的任务
   */
  showkerTaskInfo(params) {
    return axiosConfig.post("/api/showker-task-info.json", params)
  },

  /**
   * 根据拿手任务ID获取试用报告
   */
  showkerTaskReport(params) {
    return axiosConfig.post("/api/showker-task-report.json", params)
  },

  /**
   * 根据试用报告ID获取试用报告
   */
  getTrialReport(params) {
    return axiosConfig.post("/api/trial-report.json", params)
  },

  /**
   * 拿手能否申请活动
   */
  showkerCanTrial(params) {
    return axiosConfig.post("/api/task/showker/qualification/check.json", params)
  },

  /**
   * 拿手申请活动任务
   */
  showkerApplySelWwId(params) {
    return axiosConfig.post("/api/task/showker/apply.json", params)
  },

  /**
   * 修改用户头像
   */
  modifyPortraitPic(params) {
    return axiosConfig.post("/api/user/edit-portrait-pic.json", params)
  },

  /**
   * 获取买家秀列表
   */
  getBuyerShowList() {
    return axiosConfig.get("/api/task/showker/index/report.json")
  },

  /**
   * 点赞接口
   */
  clickPraise(params) {
    return axiosConfig.post("/api/task/showker/like/report.json", params)
  },

  /**
   * 判断是否已经点赞接口
   */
  whetherClickPraise(params) {
    return axiosConfig.get("/api/task/showker/liked/report.json", params)
  },

  /**
   * 商家个人主页活动提醒
   */
  sellerPersonalTrialCount() {
    return axiosConfig.get("/api/task/seller-personal-trial-count.json")
  },

  /**
   * 拿手个人主页活动提醒
   */
  showkerPersonalTrialCount() {
    return axiosConfig.get("/api/task/showker-personal-trial-count.json")
  },

  /**
   * 商家通过买家秀并返款
   */
  showkerDepositReturn(params) {
    return axiosConfig.post("/api/showker-deposit-return.json", params)
  },

  /**
   * 商家查看活动结算详情
   */
  taskSettlementDetail(params) {
    return axiosConfig.get("/api/task-settlement-detail.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（所有待审核活动）
   */
  appliesWaitingAuditTask(params) {
    return axiosConfig.post("/api/applies/waiting/audit/task.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务详情（待审核全部）
   */
  appliesWaitingAuditAll(params) {
    return axiosConfig.get("/api/applies/waiting/audit/all.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务详情（所有已通过核活动）
   */
  passesTask(params) {
    return axiosConfig.post("/api/passes/task.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（单号待审核数，买家秀待审核数）
   */
  passesShowkerTaskCountsInfo(params) {
    return axiosConfig.post("/api/passes/showker/task/counts/info.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（单号待审核数，买家秀待审核数）
   */
  passesShowkerTask(params) {
    return axiosConfig.post("/api/passes/showker/task.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（所有未通过审核的活动）
   */
  appliesEndTask(params) {
    return axiosConfig.post("/api/applies/end/task.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（所有未通过审核的任务）
   */
  appliesEndShowkerTask(params) {
    return axiosConfig.post("/api/applies/end/showker/task.json", params)
  },

  /**
   * 获取活动任务日志
   */
  getLogList(params) {
    return axiosConfig.get("/api/task-log.json", params)
  },

  /**
   * 商家进入拿手任务管理页任务列表（设置新增待审核为已读）
   */
  waitingAuditNewestMarkRead(params) {
    return axiosConfig.post("/api/applies/waiting/audit/newest/clear/one.json", params)
  },

  /**
   * 获取拿手活动进程任务日志
   */
  getShowkerLog(params) {
    return axiosConfig.get("/api/task-detail-log.json", params)
  },

  /**
   * 获取推荐链接
   */
  getMyRecommend() {
    return axiosConfig.get("/api/user/reward/getMyRecommend.json")
  },

  /**
   * 获取推荐链接
   */
  getRecommendUrl() {
    return axiosConfig.get("/api/recommend-code.json")
  },

  /**
   * 获取推荐列表
   */
  getRecommendPage(params) {
    return axiosConfig.get("/api/user/reward/getRecommendPage.json", params)
  },

  /**
   * 获取推荐排行版
   */
  getRecommendRankingPage() {
    return axiosConfig.get("/api/user/reward/getRecommendRankList.json",)
  },

  /**
   * 判断是否弹出微信弹框
   */
  checkWechartAlert() {
    return axiosConfig.get('/api/user/verify/check.json')
  },

  /**
   * 设置微信弹框
   */
  setWechartAlert(params) {
    return axiosConfig.post('/api/user/verify/set.json', params)
  },

  /**
   * 微信弹框不再提示
   */
  noWechartAlert() {
    return axiosConfig.post('/api/user/verify/stop.json')
  },

  /**
   * PC首页历史活动接口
   */
  getHomeHistoryList() {
    return axiosConfig.get('/api/task/index/history.json')
  },

  /**
   * 检测用户是否已关闭加群提示
   */
  detectionAddGroupTip() {
    return axiosConfig.get('/api/detection-add-group-tip.json')
  },

  /**
   * 设置用户关闭加群提示，关闭后不在显示（任务详情页面）
   */
  setAddGroupTip() {
    return axiosConfig.post('/api/set-add-group-tip.json')
  },

  /**
   * 检测用户是否已关闭服务条款提示
   */
  detectionUserClauseTip() {
    return axiosConfig.post('/api/detection-user-clause-tip.json')
  },

  /**
   * 设置用户关闭服务条款提示，关闭后不在显示
   */
  setUserClauseTip() {
    return axiosConfig.get('/api/set-user-clause-tip.json')
  },

  /**
   * 停用旺旺号
   */
  disuseWw(params) {
    return axiosConfig.post('/api/user/alitm/disable_alitm.json', params)
  },

  /**
   * 解停用旺旺号
   */
  unDisuseWw(params) {
    return axiosConfig.post('/api/user/alitm/un_disable_alitm.json', params)
  },

  /**
   * 获取买家秀排行榜列表
   */
  getShowkerReportRank() {
    return axiosConfig.get('/api/task/showker/getShowkerReportRank.json')
  },

  /**
   * 获取真实拿手数量、拿手已发表的买家秀数量、买家达人秀列表
   */
  getBuyerShowInfo() {
    return axiosConfig.get('/api/get-buyerShow-info.json')
  },

  /**
   * 获取买家秀轮播列表
   */
  getReportRankList() {
    return axiosConfig.get('/api/task/showker/getReportRank25.json')
  },

  /**
   * 获取所有买家秀
   */
  getALLTrialReport(params) {
    return axiosConfig.get('/api/task/showker/getALLTrialReport.json', params)
  },

  /**
   * 拿手获取换新的关键词方案
   */
  getSchemeReassign(params) {
    return axiosConfig.post('/api/task/showker/scheme/reassign.json', params)
  },

  /**
   * 获取拿手可申请活动的次数
   */
  getShowkerApplyCount() {
    return axiosConfig.get("/api/task/showker-apply-count.json")
  },

  /**
   * 获取首页轮播图信息
   */
  getAvailableBoardByAdTypeList(params) {
    return axiosConfig.get('/api/user/get-available-board-by-adType.json', params)
  },

  /**
   * 获取系统配置信息
   */
  getSysConfigInfo() {
    return axiosConfig.get("/api/user/config/sys.json")
  },

  /**
   * 获取公告信息
   */
  getUserGetAnnouncement(params) {
    return axiosConfig.get("/api/user-getAnnouncement.json", params)
  },

  /**
   * 获取二维码信息
   */
  getQrcodeQudaoInfo(params) {
    return axiosConfig.post("/api/user/getQRcode.json", params)
  },

  /**
   * 用户提交投诉接口
   */
  userComplaintCreate(params) {
    return axiosConfig.post("/api/user-complaint-create.json", params)
  },

  /**
   * 获取用户投诉列表
   */
  getUserAppealList(params) {
    return axiosConfig.post("/api/user-complaint-getComplaintsByUid.json", params)
  },

  /**
   * 商家将秀客加入黑名单
   */
  addShowkerToBlackList(params) {
    return axiosConfig.post("/api/task/apply/black/addToBlackList.json", params)
  },

  /**
   * 获取黑名单列表
   */
  getBlackList(params) {
    return axiosConfig.get("/api/task/apply/black/getAlitmBlackListByUid.json", params)
  },

  /**
   * 移除黑名单列表
   */
  removeFromBlackList(params) {
    return axiosConfig.post("/api/task/apply/black/removeFromBlackList.json", params)
  },

  /**
   * 给拿手进行评价
   */
  evaluateFormSellerToShowker(params) {
    return axiosConfig.post("/api/task/apply/black/evaluateFormSellerToShowker.json", params)
  },

  /**
   * 判断秀客是否是第一次提现
   */
  someAccountOrMoneyJudgement() {
    return axiosConfig.get('/api/user/account/someAccountOrMoneyJudgement.json');
  },

  /**
   * 设置第一次验证提现口令
   */
  setFirstWithdrawalCommand() {
    return axiosConfig.get('/api/set-first-fill-withdrawal-command.json')
  },

  /**
   * 获取是否是第一次验证提现口令
   */
  getFirstWithdrawalCommand() {
    return axiosConfig.get('/api/detection-first-fill-withdrawal-command.json')
  },

  /**
   * 获取商家绑定的店铺列表
   */
  getStoreBindInfo() {
    return axiosConfig.get('/api/store/get.json')
  },

  /**
   * 根据商品链接获取店铺信息(by-Id)
   */
  getItemInfoById(params) {
    return axiosConfig.get('/api/get-item-info-by-id.json', params)
  },

  /**
   * 根据商品链接获取店铺名称和店铺旺旺(by-link)
   */
  getStoreInfoByLink(params) {
    return axiosConfig.get('/api/get-store-info-by-link.json', params)
  },

  /**
   * 绑定店铺
   */
  bindStore(params) {
    return axiosConfig.post('/api/store/bind.json', params)
  },

  /**
   * 获取商家订单号待审核数量
   */
  getMerchantCountPassOrder() {
    return axiosConfig.get('/api/merchant/count/pass/order.json')
  },

  /**
   * 批量通过待审核订单
   */
  merchantBatchPassOrder() {
    return axiosConfig.get('/api/merchant/batch/pass/order.json')
  },

  /**
   * 获取批量导出订单的订单号
   */
  getMerchantExportOrderNumber(params) {
    return axiosConfig.get('/api/merchant/export/order.json', params)
  },

  /**
   * 统计用户点击会员购买按钮
   */
  clickBuyMemberCallback() {
    return axiosConfig.post('/api/user/member/clickBuyMember.json')
  },

  /**
   * 获取商家评价拿手时的违规标签
   */
  getViolationTag(params) {
    return axiosConfig.get('/api/get-violation-tag.json', params)
  },

  /**
   * 增值业务订购周期列表查询
   */
  valueAddedServicePeriodQuery(params) {
    return axiosConfig.get('/api/value-added-service-period-query.json', params)
  },

  /**
   * 购买增值业务
   */
  buyValueAddedService(params) {
    return axiosConfig.post('/api/buy-value-added-service.json', params)
  },

  /**
   * 获取当前用户增值服务使用状态
   */
  valueAddedServiceStatus() {
    return axiosConfig.get('/api/value-added-service-status.json')
  },

  /**
   * 获取拿手被商家拉黑情况
   */
  blackListByAlitmAccount(params) {
    return axiosConfig.get('/api/black-list-by-alitm-account.json', params)
  },

  /**
   * 获取拿手被商家打标情况
   */
  appraiseSituationByMerchant(params) {
    return axiosConfig.get('/api/appraise-situation-by-merchant.json', params)
  },

  /**
   * 商家开启活动一键加速功能
   */
  taskSpeedUp(params) {
    return axiosConfig.post('/api/task-speed-up.json', params)
  },

  /**
   * 获取用户是否有火眼金睛功能试用资格（每个用户仅有一次试用机会）
   */
  eyeTrialQualification(params) {
    return axiosConfig.get('/api/eye-trial-qualification.json', params)
  },

  /**
   * 购买火眼金睛功能一天试用资格
   */
  buyEyeTrialOneDay(params) {
    return axiosConfig.post('/api/buy-eye-trial-one-day.json', params)
  },

  /**
   * 获取发布任务页增值服务列表
   */
  taskVasList() {
    return axiosConfig.get('/api/task-value-added-services-list.json')
  },

  /**
   * 获取商家发布任务时选择的增值服务信息
   */
  taskVasSelectInfo(params) {
    return axiosConfig.get('/api/vas-select-info.json', params)
  },

  /**
   * 增值服务提交答案（截图）
   */
  submitVasAnswer(params) {
    return axiosConfig.post('/api/task-showker-vas-answer-submit.json', params)
  },

  /**
   * 提交浏览答题截图
   */
  submitAnswerScreenshots(params) {
    return axiosConfig.post('/api/task-showker-issue-answer-submit.json', params)
  },

  /**
   * 用户添加修改QQ号码
   */
  addOrEditQqNumber(params) {
    return axiosConfig.post('/api/user-add-or-edit-qq-number.json', params)
  },

  /**
   * 删除店铺
   */
  deleteStore(params) {
    return axiosConfig.post('/api/delete-store.json', params)
  },

  /**
   * 获取当前发布的活动可以抵扣金额的红包金额
   */
  redEnvelopeDeduction(params) {
    return axiosConfig.get('/api/get-red-envelope-deduction.json', params)
  },

  /**
   * 使用红包抵扣的时候修改活动推广费
   */
  editPromotion(params) {
    return axiosConfig.get('/api/edit-promotion.json', params)
  },

  /**
   * 商家追加活动份数
   */
  additionalTaskAccount(params) {
    return axiosConfig.post('/api/additional-task-account.json', params)
  },

  /**
   * 商家审批拿手的时验证拿手申请情况
   */
  merchantCheckShowkerApply(params) {
    return axiosConfig.get('/api/merchant-check-showker-apply.json', params)
  },

  /**
   * 查排名落地页查小号/查信誉接口
   */
  searchCredit(params) {
    return axiosConfig.get('/api/search-credit.json', params)
  },

  /**
   * 商家推荐系统收入支出明细查询
   */
  getRewardDetail(params) {
    return axiosConfig.get('/api/get-reward-detail.json', params)
  },

  /**
   * 商家推荐系统成员管理
   */
  getAllMember(params) {
    return axiosConfig.get('/api/get-all-member.json', params)
  },

  /**
   * 商家推荐系统成员管理查看子集成员
   */
  getChildrenMember(params) {
    return axiosConfig.get('/api/get-sub-children-member.json', params)
  },

  /**
   * 商家系统收入贡献榜
   */
  getRewardList(params) {
    return axiosConfig.get('/api/get-reward-list.json', params)
  },

  /**
   * 商家自定义延迟系统审核活动名额时间（待审批状态下）
   */
  autoAuditTime(params) {
    return axiosConfig.post('/api/auto-audit-time.json', params)
  },

  /**
   * 商家修改店铺的QQ号，（可以为每个店铺绑定QQ）
   */
  eidtStoreQQ(params) {
    return axiosConfig.post('/api/edit-store-qq.json',params)
  },

  /**
   * 拿手兴趣标签
   */
  getInterestTag(params) {
    return axiosConfig.get('/api/get-tag.json', params)
  },

  /**
   * 商家免审发布
   */
  releaseWithoutAudit(params) {
    return axiosConfig.post('/api/publish-without-audit.json', params)
  },

  /**
   * 商家完善店铺信息
   */
  completeContact(params) {
    return axiosConfig.post('/api/complete-store-contact.json', params)
  },

  /**
   * 获取新增商品，送出商品数据
   */
  newOutCommodity() {
    return axiosConfig.get('/api/get-new-out-commodity.json')
  },

  /**
   * 获取新增商品，送出商品数据
   */
  taskNewestPromotion(params) {
    return axiosConfig.get('/api/task-newest-promotion.json', params)
  },

  /**
   * 免手续费充值申请
   */
  rechargeApply(params) {
    return axiosConfig.post('/api/artificial-recharge.json', params)
  },

  /**
   * 获取收藏流量加购配置
   */
  getFlowOrderConfig(params) {
    return axiosConfig.get('/api/get-flow-config.json', params)
  },

  /**
   * 收藏加购流量订购
   */
  orderFlow(params) {
    return axiosConfig.post('/api/order-flow.json', params)
  },

  /**
   * 判断是否已经领取过免费领取的流量
   */
  checkIfAlreadyGetFreeFlow() {
    return axiosConfig.get('/api/check-already-got-freeFlow.json')
  },

  /**
   * 获取流量订购交易明细列表
   */
  getFlowOrderDetail(params) {
    return axiosConfig.get('/api/get-flow-order-detail.json', params)
  },

  /**
   * 获取流量数量信息
   */
  getFlowNumber() {
    return axiosConfig.get('/api/get-flow-number.json')
  },

  /**
   * 获取任务流量列表
   */
  getTaskFlowList(params) {
    return axiosConfig.get('/api/get-task-flow-list.json', params)
  },

  /**
   * 获取任务流量列表
   */
  getTaskFlowDetail(params) {
    return axiosConfig.get('/api/get-task-flow-detail.json', params)
  },

  /**
   * 任务流量补添
   */
  taskFlowSupplement(params) {
    return axiosConfig.post('/api/task-flow-supplement.json', params)
  },

  /**
   * 任务流量停止
   */
  taskFlowStop(params) {
    return axiosConfig.post('/api/task-flow-stop.json', params)
  },

}
