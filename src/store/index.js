/**
 * Created by ycb on 2017/7/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex);
const state = {
  userInfo: {}, //用户信息
  login: false,//是否登录
  topShow: true,//头部切换
  // userBalance: 0,//用户账户余额
  logInAuthority: true,//用户页面权限
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
