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
  bottomShow: true,//底部切换标识
  logInAuthority: true,//用户登录页面权限控制
  roleAuthority: null,//用户角色页面权限控制
  severTime: null,//当前服务器时间
  clientTime: null,//当前客户端时间
  taskManagementCountInfo: {},//商家任务管理活动数量信息
  TaskCategoryActive: '',//导航栏对应选中的选项
  wechartShow: false,//是否弹出微信弹框
  wechartRes: true,
  disCountTaskCategory: false,//是否为白菜价判断
  showTopCategoryRes: true, //导航栏左侧列表显示
  sysConfigInfo: {},//系统配置信息
  taskCreateFastStatus: false, //商家用户是否用首发资格
  activityCategory: '',
  sellerTaskInfo: {},
  activityStatus: '', //活动管理的状态（待审批，已通过，未通过）
  commodityCategoriesList: [], //平台宝贝类目列表
  flowNumberInfo: {}, //流量数量相关信息
  needOrderVisitorFlow: false,  //补添流量时是否需要订购访客流量
  platformData: {},  //平台首页展示数据（今日新增商品数，今日送出商品数，已入驻评测商家，昨日登录拿手数）
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
