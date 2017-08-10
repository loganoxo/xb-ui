/**
 * Created by ycb on 2017/4/26.
 */
import {fetch} from '../config/axiosConfig'

export default {
  /**
   *用户普通登陆
   */
  login(params) {
    return fetch("/api/login.json", params)
  },

  /**
   *用户退出登陆
   */
  signOut() {
    return fetch("/api/sign-out.json")
  },

  /**
   *获取短信验证码
   */
  getCode(params) {
    return fetch("/api/send-verify-code.json", params)
  },

  /**
   *用户快速登陆
   */
  checkFastSignIn(params) {
    return fetch("/api/check-fast-sign-in.json", params)
  },

  /**
   *用户注册
   */
  register(params) {
    return fetch("/api/sign-up.json", params)
  },
  /**
   *首页导航列表
   */
  getNavList () {
    return fetch("/api/task/search/item/catalog/main.json")
  },

  /**
   *首页试用任务展示接口
   */
  getHomeTaskList () {
    return fetch("/api/task/search/index/newest.json")
  },

  /**
   *分类页面请求
   */
  getTaskCategory(params) {
    return fetch("/api/task/get/item/catalog/parent.json", params)
  },

  /**
   *用户任务发布
   */
  taskCreate(params) {
    return fetch("/api/task-create.json", params)
  },

  /**
   *获取商品类型
   */
  itemCatalog() {
    return fetch("/api/item-catalog.json")
  },

  /**
   *获取用户余额
   */
  getAccountBalance() {
    return fetch("/api/get-account-balance.json")
  },

  /**
   *实名认证初始化
   */
  verifiedInit() {
    return fetch("/api/identity-index.json")
  },

  /**
   *实名认证提交
   */
  verifiedSubmit(params) {
    return fetch("/api/user/identity/saveidentity.json", params)
  },

  /**
   * 绑定旺旺号
   */
  wwBind (params) {
    return fetch("/api/alitm-bunding.json",params)
  },

  /**
   * 获取旺旺信息列表
   */
  wwBindList () {
    return fetch("/api/get-alitm-info-list.json")
  },
  /**
   * 解绑旺旺号
   */
  wwUnbind (params) {
    return fetch("/api/alitm-unBunding.json",params)
  },

  /**
   * 修改旺旺号
   */
  wwModify (params) {
    return fetch("/api/alitm/resubmit.json",params)
  },

}
