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
  login: false,//是否登录标识
  topShow: true,//头部切换标识
  bottomShow: true,//底部标签
  logInAuthority: true,//用户页面权限标识
  severTime: null,//当前服务器时间
  clientTime: null,//当前客户端时间
  taskManagementCountInfo: {},//商家任务管理活动数量信息
  showMerchantGuide: true,//商家引导遮罩层是否显示标识 true:已读 false:未读
  TaskCategoryActive: '',
  wechartShow: false,
  wechartRes: true,
  disCountTaskCategory: false,
  TaskCategoryActiveList: {
    'home': {
      text: '首页'
    },
    'all': {
      text: '免费领'
    },
    'discount': {
      text: '白菜价'
    }
  },
  discountPriceType: {
    '不限': {
      backgroundColor:　'',
      discountTypes: ['discount_9_9','discount_49_9', 'discount_99_9'],
    },
    9.9: {
      backgroundColor: '#ff9900',
      discountTypes: ['discount_9_9'],
    },
    49.9: {
      backgroundColor: '#cc3333',
      discountTypes: ['discount_49_9'],
    },
    99.9: {
      backgroundColor: '#ff3399',
      discountTypes: ['discount_99_9'],
    }
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
