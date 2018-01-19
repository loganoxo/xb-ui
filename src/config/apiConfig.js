/**
 * Created by ycb on 2017/4/26.
 */
import {fetch} from '../config/axiosConfig'

export default {
  /**
   * 用户普通登陆
   */
  login(params) {
    return fetch("/api/login.json", params)
  },

  /**
   * 第三方平台登陆
   */
  thirdPartyLogin(params) {
    return fetch("/api/user/sign-in-sync.json", params)
  },

  /**
   * 用户退出登陆
   */
  loggedOut() {
    return fetch("/api/logged-out.json")
  },

  /**
   * 获取短信验证码
   */
  getCode(params) {
    return fetch("/api/send-verify-code.json", params)
  },

  /**
   * 获取银行卡信息
   */
  getBankCardInformation() {
    return fetch("/api/get-bank-card-information.json")
  },

  /**
   * 获取用户截图
   */
  getUserScreenShot(params) {
    return fetch("/api/get-user-screen-shot.json", params)
  },

  /**
   * 验证重置密码短信
   */
  validatePaySmscode(params) {
    return fetch("/api/user/account/check-phone-message-before-reset-pwd.json", params)
  },

  /**
   * 通过手机短信验证码重置支付密码
   */
  modifyPayPwd(params) {
    return fetch("/api/user/account/reset-pay-pwd-by-smscode.json", params)
  },

  /**
   * 未登录通过发送手机短信验证码重置支付密码
   */
  noLoginModifyPayPwdCode(params) {
    return fetch("/api/user/account/checkApp.json", params)
  },
  /**
   * 未登录通过发送手机短信验证码重置支付密码
   */
  noLoginModifyPayPwd(params) {
    return fetch("/api/user/account/resetAppPwd.json", params)
  },

  /**
   * 通过上一次的支付密码修改支付密码
   */
  modifyDefaultPayPwd(params) {
    return fetch('/api/user/account/reset-pay-pwd-by-originPwd.json', params)
  },

  /**
   * 用户快速登陆
   */
  checkFastSignIn(params) {
    return fetch("/api/check-fast-sign-in.json", params)
  },

  /**
   * QQ快速登录
   */
  QQLoginFunc(params) {
    return fetch("/api/user/qq/sign-in.json", params)
  },

  /**
   * 用户注册
   */
  register(params) {
    return fetch("/api/sign-up.json", params)
  },

  /**
   * qq快速注册
   */
  qqRegister(params) {
    return fetch("/api/user/qq/data-complete.json", params)
  },

  /**
   *获取用户交易列表
   */
  getTradList(params) {
    return fetch("/api/get-trad-list.json", params)
  },

  /**
   * 添加银行卡
   */
  addBankCardInfo(params) {
    return fetch("/api/add-bank-card.json", params)
  },

  /**
   * 申请提现
   */
  applyGetoutMoney(params) {
    return fetch("/api/with-draw-apply.json", params)
  },

  /**
   * 显示提现列表
   */
  getWithDrawList(params) {
    return fetch("/api/get-with-draw-list.json", params)
  },

  /**
   * 获取交易明细列表
   */
  getTradListDetails(params) {
    return fetch("/api/get-trad-detail-list.json", params)
  },

  /**
   * 获取某个活动的任务担保金返款列表
   */
  getDepositReturnList(params) {
    return fetch("/api/get-deposit-return-list.json", params)
  },

  /**
   * 余额充值
   */
  balanceOrderCreate(params) {
    return fetch("/api/balance-order-create.json", params)
  },

  /**
   *通过上一次的密码修改支付密码
   */
  findPwdOrigin(params) {
    return fetch("/api/find-pwd-by-origin.json", params)
  },

  /**
   * 通过上一次的登录密码修改登录密码
   */
  modifyDefaultPwd(params) {
    return fetch('/api/user/account/reset-login-pwd-by-originPwd.json', params)
  },

  /**
   * 通过手机短信验证码重置登录密码
   */
  modifyTrendsPwd(params) {
    return fetch('/api/user/account/reset-login-pwd-by-smscode.json', params)
  },

  /**
   *获取用户、账户、旺旺账号
   */
  getUserAccount(params) {
    return fetch("/api/get-user-account.json", params)
  },

  /**
   * 首页导航列表
   */
  getNavList() {
    return fetch("/api/task/item/catalog/main.json")
  },

  /**
   * 首页活动任务展示接口
   */
  getHomeTaskList() {
    return fetch("/api/task/index/newest.json")
  },

  /**
   * 首页推荐
   */
  getIndexRecommend(params) {
    return fetch("/api/task/index/recommend.json", params)
  },

  /**
   * 首页左上角类表接口
   */
  getHomeTaskTopLeftList() {
    return fetch("/api/task/showker-newest.json")
  },

  /**
   * 分类页面请求
   */
  getTaskCategory(params) {
    return fetch("/api/task/get/item/catalog/parent.json", params)
  },

  /**
   * 分类页面下的小类
   */
  getTaskCategoryList(params) {
    return fetch('/api/task/item/catalog/child.json', params)
  },

  /**
   * 分类页面任务详情请求
   */
  getSearchTask(params) {
    return fetch("/api/search/task/s.json", params)
  },

  /**
   * 分类页面历史活动任务详情请求
   */
  getSearchHistoryTask(params) {
    return fetch('/api/search/task/his.json', params)
  },

  /**
   * 详情页页面
   */
  getTaskDetails(params) {
    return fetch('/api/task/detail.json', params)
  },

  /**
   * 用户任务发布
   */
  taskCreate(params) {
    return fetch("/api/task-create.json", params)
  },

  /**
   * 获取商品类型
   */
  itemCatalog() {
    return fetch("/api/item-catalog.json")
  },

  /**
   * 用户余额支付
   */
  payByBalance(params) {
    return fetch("/api/pay-by-balance.json", params)
  },

  /**
   * 实名认证初始化
   */
  verifiedInit() {
    return fetch("/api/identity-index.json")
  },

  /**
   * 实名认证提交
   */
  verifiedSubmit(params) {
    return fetch("/api/user/identity/saveidentity.json", params)
  },

  /**
   * 绑定旺旺号
   */
  wwBind(params) {
    return fetch("/api/alitm-bunding.json", params)
  },

  /**
   * 获取旺旺信息列表
   */
  wwBindList() {
    return fetch("/api/get-alitm-info-list.json")
  },

  /**
   * 解绑旺旺号
   */
  wwUnbind(params) {
    return fetch("/api/alitm-unBunding.json", params)
  },

  /**
   * 修改旺旺号
   */
  wwModify(params) {
    return fetch("/api/alitm/resubmit.json", params)
  },

  /**
   * 获取活动活动管理列表
   */
  getTaskList(params) {
    return fetch("/api/task-list.json", params)
  },

  /**
   * 商家活动活动管理任务关闭
   */
  closeTask(params) {
    return fetch("/api/close-task.json", params)
  },

  /**
   * 商家活动活动管理任务删除
   */
  deleteTask(params) {
    return fetch("/api/delete-task.json", params)
  },

  /**
   * 商家申请任务结算
   */
  settlementTask(params) {
    return fetch("/api/task-settlement.json", params)
  },

  /**
   * 判断商家是否答题
   */
  checkSellerTest() {
    return fetch('/api/user/quiz/check.json',)
  },

  /**
   * 赠送vip
   * **/
  giveSellerVip() {
    return fetch('/api/user/quiz/done.json',)
  },

  /**
   * 任务数据获取
   */
  getTaskInfo(params) {
    return fetch("/api/get-task.json", params)
  },

  /**
   * 商家获取已申请任务的秀客列表
   */
  getTaskApplyList(params) {
    return fetch("/api/get-task-apply-list.json", params)
  },

  /**
   * 商家审核秀客是否通过
   */
  setTaskShowkerAudit(params) {
    return fetch("/api/set-task-showker-audit.json", params)
  },

  /**
   * 商家审核秀客订单号
   */
  orderNumberAudit(params) {
    return fetch("/api/order-number-audit.json", params)
  },

  /**
   * 商家获取秀客订单详情
   */
  orderNumberInfo(params) {
    return fetch("/api/order-number-info.json", params)
  },

  /**
   * 商家对任务补充担保金
   */
  depositSupplement(params) {
    return fetch("/api/deposit-supplement.json", params)
  },

  /**
   * 商家审核买家秀
   */
  taskReportAudit(params) {
    return fetch("/api/task-report-audit.json", params)
  },

  /**
   * 获取会员活动信息
   */
  getUserMemberAll() {
    return fetch("/api/get-user-member-all.json")
  },

  /**
   * 获取会员等级详细信息
   */
  getUserMemberLevelInfo(params) {
    return fetch("/api/get-user-member-level-info.json", params)
  },

  /**
   * 判断是否可以发布活动
   */
  checkMemberForTask() {
    return fetch("/api/get-check-Member-for-task.json")
  },

  /**
   * 充值会员
   */
  memberPurchase(params) {
    return fetch("/api/user-member-purchase.json", params)
  },

  /**
   * 秀客申请列表
   * 待审核和未通过的
   */
  showkerApplyList(params) {
    return fetch("/api/showker-apply-list.json", params)
  },

  /**
   * 秀客申请列表
   * 审核通过的
   */
  showkerSuccessList(params) {
    return fetch("/api/showker-success-list.json", params)
  },

  /**
   * 秀客终止活动（针对申请成功的任务）
   */
  showkerTrialEed(params) {
    return fetch("/api/showker-trial-end.json", params)
  },

  /**
   * 秀客终止活动（针对申请还没有审核结果的任务）
   */
  showkerApplyEed(params) {
    return fetch("/api/showker-apply-end.json", params)
  },

  /**
   * 秀客删除未审核通过的记录
   */
  applyDelete(params) {
    return fetch("/api/showker-apply-delete.json", params)
  },

  /**
   * 秀客去下单
   */
  showkerToProcessOrder(params) {
    return fetch("/api/showker-to-process-order.json", params)
  },

  /**
   * 秀客保存订单号
   */
  showkerOrderSave(params) {
    return fetch("/api/showker-order-save.json", params)
  },

  /**
   * 秀客保存买家秀
   */
  showkerSaveReport(params) {
    return fetch("/api/showker-save-report.json", params)
  },

  /**
   *详情页秀客报告列表
   */
  getDetailsShowkerList(params) {
    return fetch("/api/task/trial/report.json", params)
  },

  /**
   *详情页已审核秀客列表
   */
  getDetailsSuccessShowkerList(params) {
    return fetch("/api/task/success.json", params)
  },

  /**
   * 秀客修改买家秀
   */
  showkerModifyReport(params) {
    return fetch("/api/showker-modify-report.json", params)
  },

  /**
   * 秀客的买家秀（针对获取买家秀列表，分页查询）
   */
  getTrialReports(params) {
    return fetch("/api/task/showker/trial/reports.json", params)
  },

  /**
   * 秀客的活动详情（针对获取秀客活动详情）
   */
  getTrialDetail(params) {
    return fetch("/api/task/showker/trial/detail.json", params)
  },

  /**
   * 根据秀客任务ID获取秀客任务，用户ID兼容秀客角色和商家角色
   * 当uid为秀客的uid时，获取属于该秀客的任务
   * 当uid为商家的uid时，获取属于该商家活动的任务
   */
  showkerTaskInfo(params) {
    return fetch("/api/showker-task-info.json", params)
  },

  /**
   * 根据秀客任务ID获取试用报告
   */
  showkerTaskReport(params) {
    return fetch("/api/showker-task-report.json", params)
  },

  /**
   * 根据试用报告ID获取试用报告
   */
  getTrialReport(params) {
    return fetch("/api/trial-report.json", params)
  },

  /**
   * 秀客能否申请活动
   */
  showkerCanTrial(params) {
    return fetch("/api/task/showker/qualification/check.json", params)
  },

  /**
   * 秀客申请活动任务
   */
  showkerApplySelWwId(params) {
    return fetch("/api/task/showker/apply.json", params)
  },

  /**
   * 修改用户头像
   */
  modifyPortraitPic(params) {
    return fetch("/api/user/edit-portrait-pic.json", params)
  },

  /**
   * 获取买家秀列表
   */
  getBuyerShowList() {
    return fetch("/api/task/showker/index/report.json")
  },

  /**
   * 点赞接口
   */
  clickPraise(params) {
    return fetch("/api/task/showker/like/report.json",params)
  },

  /**
   * 判断是否已经点赞接口
   */
  whetherClickPraise(params) {
    return fetch("/api/task/showker/liked/report.json",params)
  },

  /**
   * 商家个人主页活动提醒
   */
  sellerPersonalTrialCount() {
    return fetch("/api/task/seller-personal-trial-count.json")
  },

  /**
   * 秀客个人主页活动提醒
   */
  showkerPersonalTrialCount(params) {
    return fetch("/api/task/showker-personal-trial-count.json", params)
  },

  /**
   * 商家通过买家秀并返款
   */
  showkerDepositReturn(params) {
    return fetch("/api/showker-deposit-return.json", params)
  },

  /**
   * 商家查看活动结算详情
   */
  taskSettlementDetail(params) {
    return fetch("/api/task-settlement-detail.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（所有待审核活动）
   */
  appliesWaitingAuditTask(params) {
    return fetch("/api/applies/waiting/audit/task.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务详情（待审核全部）
   */
  appliesWaitingAuditAll(params) {
    return fetch("/api/applies/waiting/audit/all.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务详情（所有已通过核活动）
   */
  passesTask(params) {
    return fetch("/api/passes/task.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（单号待审核数，买家秀待审核数）
   */
  passesShowkerTaskCountsInfo(params) {
    return fetch("/api/passes/showker/task/counts/info.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（单号待审核数，买家秀待审核数）
   */
  passesShowkerTask(params) {
    return fetch("/api/passes/showker/task.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（所有未通过审核的活动）
   */
  appliesEndTask(params) {
    return fetch("/api/applies/end/task.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（所有未通过审核的任务）
   */
  appliesEndShowkerTask(params) {
    return fetch("/api/applies/end/showker/task.json", params)
  },

  /**
   * 获取活动任务日志
   */
  getLogList(params) {
    return fetch("/api/task-log.json", params)
  },

  /**
   * 商家进入秀客任务管理页任务列表（设置新增待审核为已读）
   */
  waitingAuditNewestMarkRead(params) {
    return fetch("/api/applies/waiting/audit/newest/clear/one.json", params)
  },

  /**
   * 获取秀客活动进程任务日志
   */
  getShowkerLog(params) {
    return fetch("/api/task-detail-log.json", params)
  },

  /**
   * 获取推荐链接
   * */
  getMyRecommend() {
    return fetch("/api/user/reward/getMyRecommend.json")
  },

  /**
   * 获取推荐链接
   * */
  getRecommendUrl() {
    return fetch("/api/recommend-url.json")
  },

  /**
   * 获取推荐列表
   * */
  getRecommendPage(params) {
    return fetch("/api/user/reward/getRecommendPage.json", params)
  },

  /**
   * 获取推荐排行版
   * */
  getRecommendRankingPage() {
    return fetch("/api/user/reward/getRecommendRankList.json", )
  },

  /**
   * 判断是否弹出微信弹框
   */
  checkWechartAlert() {
    return fetch('/api/user/verify/check.json')
  },

  /**
   * 设置微信弹框
   */
  setWechartAlert(params) {
    return fetch('/api/user/verify/set.json', params)
  },

  /**
   * 微信弹框不再提示
   */
  noWechartAlert() {
    return fetch('/api/user/verify/stop.json')
  },

  /**
   * PC首页历史活动接口
   */
  getHomeHistoryList() {
    return fetch('/api/task/index/history.json')
  },

  /**
   * 检测用户是否已关闭加群提示
   */
  detectionAddGroupTip() {
    return fetch('/api/detection-add-group-tip.json')
  },

  /**
   * 设置用户关闭加群提示，关闭后不在显示（任务详情页面）
   */
  setAddGroupTip() {
    return fetch('/api/set-add-group-tip.json')
  },

  /**
   * 检测用户是否已关闭服务条款提示
   */
  detectionUserClauseTip() {
    return fetch('/api/detection-user-clause-tip.json')
  },

  /**
   * 设置用户关闭服务条款提示，关闭后不在显示
   */
  setUserClauseTip() {
    return fetch('/api/set-user-clause-tip.json')
  },

  /**
   * 停用旺旺号
   */
  disuseWw(params) {
    return fetch('/api/user/alitm/disable_alitm.json',params)
  },

  /**
   * 解停用旺旺号
   */
  unDisuseWw(params) {
    return fetch('/api/user/alitm/un_disable_alitm.json',params)
  },

  /**
   * 获取买家秀排行榜列表
   */
  getShowkerReportRank() {
    return fetch('/api/task/showker/getShowkerReportRank.json')
  },

  /**
   * 获取真实秀客数量、秀客已发表的买家秀数量、买家达人秀列表
   */
  getBuyerShowInfo() {
    return fetch('/api/get-buyerShow-info.json')
  },

  /**
   * 获取买家秀轮播列表
   */
  getReportRankList() {
    return fetch('/api/task/showker/getReportRank25.json')
  },

  /**
   * 获取所有买家秀
   */
  getALLTrialReport(params) {
    return fetch('/api/task/showker/getALLTrialReport.json',params)
  },

  /**
   * 秀客获取换新的关键词方案
   */
  getSchemeReassign(params) {
    return fetch('/api/task/showker/scheme/reassign.json',params)
  },

  /**
   * 获取秀客可申请活动的次数
   */
  getShowkerApplyCount() {
    return fetch("/api/task/showker-apply-count.json")
  },
}
