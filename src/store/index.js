/**
 * Created by ycb on 2017/7/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
import {setStorage, getStorage} from '../config/utils'
Vue.use(Vuex);
const state = {
  userInfo: {}, //用户信息
  login: false,//是否登录
  topShow: true,
};

export default new Vuex.Store({
  state,
  action,
  mutations,
})
