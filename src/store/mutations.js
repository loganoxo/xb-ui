/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import {setStorage, getStorage, removeStorage} from '@/config/utils'

export default {
  //退出登录后清除用户信息
  [types.OUT_LOGIN](state) {
    state.login = false;
    removeStorage("userInfo");
  },
  //存储用户信息到vuex
  [types.RECORD_USER_INFO](state, {info}) {
    state.userInfo = info;
    state.login = true;
    let userInfo = getStorage("userInfo");
    if(userInfo){
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
  //存储用户页面权限到vuex
  [types.LOG_IN_AUTHORITY](state, {logInAuthority}) {
    state.logInAuthority = logInAuthority;
  },
  //更改头部显示
  [types.CHANGE_TOP_SHOW](state) {
    state.topShow = true;
  },
  //更改头部显示
  [types.CHANGE_TOP_HIDE](state) {
    state.topShow = false;
  },
  // //存入用户账户余额到vuex
  // [types.RECORD_USER_BALANCE](state, {balance}) {
  //   state.userBalance = balance / 100;
  // },
  //存入服务器时间到vuex
  [types.RECORD_SEVER_TIME](state, {balance}) {
    state.userBalance = balance / 100;
  },

  //导航列表存入
  [types.TASK_CATEGORY_LIST](state,info){
    state.TaskCategoryActive = info;
  }
}
