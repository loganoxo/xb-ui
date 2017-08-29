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
   * 用户快速登陆
   */
  checkFastSignIn(params) {
    return fetch("/api/check-fast-sign-in.json", params)
  },

  /**
   * 用户注册
   */
  register(params) {
    return fetch("/api/sign-up.json", params)
  },

  /**
   *获取用户交易列表
   */
  getTradList(params) {
    return fetch("/api/get-trad-list.json", params)
  },

  /**
   * 获取交易明细列表
   */
  getTradListDetails(params) {
    return fetch("/api/get-trad-detail-list.json", params)
  },

  /**
   *通过上一次的密码修改支付密码
   */
  findPwdOrigin(params) {
    return fetch("/api/find-pwd-by-origin.json", params)
  },

  /**
   *获取用户、账户、旺旺账号
   */
  getUserAccount() {
    return fetch("/api/get-user-account.json")
  },

  /**
   * 首页导航列表
   */
  getNavList() {
    return fetch("/api/task/item/catalog/main.json")
  },

  /**
   * 首页试用任务展示接口
   */
  getHomeTaskList() {
    return fetch("/api/task/index/newest.json")
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
   * 获取用户余额
   */
  getAccountBalance() {
    return fetch("/api/get-account-balance.json")
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
   * 获取试用活动管理列表
   */
  getTaskList(params) {
    return fetch("/api/task-list.json", params)
  },

  /**
   * 试用活动管理任务删除
   */
  deleteTask(params) {
    return fetch("/api/delete-task.json", params)
  },

  /**
   * 任务数据获取
   */
  getTaskInfo(params) {
    return fetch("/api/get-task.json", params)
  },

  /**
   * 商家获取审批秀客列表
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
   * 商家对任务补充保证金
   */
  depositSupplement(params) {
    return fetch("/api/deposit-supplement.json", params)
  },

  /**
   * 商家审核试用报告当前任务详情
   */
  taskReportInfo(params) {
    return fetch("/api/task-report-info.json", params)
  },

  /**
   * 商家审核试用报告
   */
  taskReportAudit(params) {
    return fetch("/api/task-report-audit.json", params)
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
   * 秀客终止试用
   */
  endTrial(params) {
    return fetch("/api/showker-end-trial.json", params)
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
  showkerSaveOrder(params) {
    return fetch("/api/showker-save-order.json", params)
  },

  /**
   * 秀客修改订单号
   */
  showkerModifyOrder(params) {
    return fetch("/api/showker-modify-order.json", params)
  },

  /**
   * 秀客保存试用报告
   */
  showkerSaveReport(params) {
    return fetch("/api/showker-save-report.json", params)
  },

  /**
   *详情页试客报告列表
   */
  getDetailsShowkerList(params){
    return fetch("/api/task/showker/trial/report.json",params)
  },

  /**
   *详情页已审核试客列表
   */
  getDetailsSuccessShowkerList(params){
    return fetch("/api/task/showker/success.json",params)
  },

  /**
   * 秀客修改试用报告
   */
  showkerModifyReport(params) {
    return fetch("/api/showker-modify-report.json", params)
  },

  /**
   * 获取秀客试用报告
   */
  getTrialReportList(params){
    return fetch("/api/task/showker/showkerTrialReports.json", params)
  },

  /**
   * 秀客填写试用报告当前任务详情
  /**
   * 秀客填写试用报告或修改试用报告当前任务详情
   */
  showkerReportInfo(params) {
    return fetch("/api/showker-report-info.json", params)
  },

  /**
   * 秀客能否申请试用
   */
  getShowkerCanTrial(params) {
    return fetch("/api/task/showker/qualification/check.json", params)
  },

  /**
   * 秀客申请试用任务
   */
  ShowkerApplySelWwId(params) {
    return fetch("/api/task/showker/apply.json", params)
  },

  /**
   * 试客报告，点击查看全部
   */
  ShowkerReportOne(params) {
    return fetch("/api/task/showker/trialReport.json", params)
  },

  /**
   * 修改用户头像
   */
  modifyPortraitPic(params) {
    return fetch("/api/user/edit_portrait_pic.json", params)
  },

  /**
   * 商家个人主页试用提醒
   */
  sellerPersonalTrialCount(params) {
    return fetch("/api/task/seller-personal-trial-count.json", params)
  },

  /**
   * 秀客个人主页试用提醒
   */
  showkerPersonalTrialCount(params) {
    return fetch("/api/task/showker-personal-trial-count.json", params)
  },

  /**
   * 商家通过试用报告并返款
   */
  showkerDepositReturn(params) {
    return fetch("/api/showker-deposit-return.json", params)
  },
}
