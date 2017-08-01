/**
 * Created by ycb on 2017/4/26.
 */
import {fetch} from '../config/axiosConfig'

export default {
  /**
   *用户普通登陆
   */
  login (params) {
    return fetch("/api/login.json",params)
  },

  /**
   *用户退出登陆
   */
  signOut (params) {
    return fetch("/api/sign-out.json",params)
  },

  /**
   *获取短信验证码
   */
  getCode(params) {
    return fetch("/api/send-verify-code.json",params)
  },

  /**
   *用户快速登陆
   */
  checkFastSignIn(params) {
    return fetch("/api/check-fast-sign-in.json",params)
  },

  /**
   *用户注册
   */
  register (params) {
    return fetch("/api/sign-up.json",params)
  },

  /**
  *任务发布
  */
  taskCreate (params) {
    return fetch("/aip/task-create.json",params)
  },

  /**
   *实名认证初始化
   */
  verifiedInit (params) {
    return fetch("/api/identity-index.json",params)
  },

  /**
   *实名认证提交
   */
  verifiedSubmit (params) {
    return fetch("/api/user/identity/saveidentity.json",params)
  },

}
