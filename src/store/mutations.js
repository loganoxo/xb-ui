/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import {setStorage, getStorage, removeStorage} from '@/config/utils'

export default {
  //退出登录后变更登陆状态和清除localStorage用户信息
  [types.OUT_LOGIN](state) {
    state.login = false;
    state.userInfo = {};
    removeStorage("userInfo");
  },

  //登陆成功后存储用户信息到localStorage和vuex
  [types.RECORD_USER_INFO](state, {info}) {
    state.userInfo = info;
    state.login = true;
    let userInfo = getStorage("userInfo");
    if (userInfo) {
      removeStorage("userInfo");
    }
    setStorage('userInfo', info);
  },

  //页面刷新的时候从本地缓存获取用户信息数据存储到vuex
  [types.INIT_USER_INFO](state) {
    let initUserInfo = getStorage('userInfo');
    if (initUserInfo) {
      state.userInfo = initUserInfo;
      state.login = true;
    } else {
      state.userInfo = {};
      state.login = false;
    }
  },

  //获取当前服务器时间和客户端时间存储到vuex
  [types.GET_SEVER_TIME](state, {time}) {
    state.severTime = time ? new Date(time.severTime).getTime() : new Date().getTime();
    state.clientTime = time.clientTime;
  },

  //存储用户页面权限到vuex
  [types.LOG_IN_AUTHORITY](state, {logInAuthority}) {
    state.logInAuthority = logInAuthority;
  },

  //商家任务管理活动数量信息（活动总数量，新增待审批，订单号带审批，买家秀待确认）
  [types.TASK_MANAGEMENT_COUNT_INFO](state, {countInfo}) {
    state.taskManagementCountInfo = countInfo;
  },

  //页面头部是否显示
  [types.CHANGE_TOP_SHOW_HIDE](state, {status}) {
    state.topShow = status;
  },

  //导航列表存入
  [types.TASK_CATEGORY_LIST](state, {info}) {
    state.TaskCategoryActive = info;
  },

  //首页秀客显示问题
  [types.ONLY_SHOWKER_SHOW](state) {
    state.onlyShowkerShow = true;
  },

  //商家引导遮罩层
  [types.SHOW_MERCHANT_GUIDE](state,{status}) {
    state.showMerchantGuide = status;
  },

  //
  [types.SET_WECHART_SHOW](state,{result}) {
    state.wechartShow = result;
  },

  [types.SET_WECHART_RES](state,{result}) {
    state.wechartRes = result;
  }
}
