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
  TaskCategoryActive: '',//导航栏对应选中的选项
  wechartShow: false,//是否弹出微信弹框
  wechartRes: true,
  disCountTaskCategory: false,//是否为白菜价判断
  showTopCategoryRes: true, //导航栏左侧列表显示
  TaskCategoryActiveList: {
    'home': {
      text: '全部活动'
    },
    'free_get': {
      text: '免费领',
      desc: '本模块商品，秀客无需支付任何费用，商家任性送！',
    },
    'price_low': {
      text: '白菜价',
      desc: '本模块商品，秀客或以类似9.9元一口价买下商品，或享受1折等极低折扣卖下商品！',
    },
    'pinkage_for_10': {
      text: '10元包邮',
      desc: '本模块商品，秀客仅需承担10元运费，商品就归您！',
    },
    'present_get': {
      text: '体验专区',
      desc: '本模块展示商品，为商家附赠之赠品，在淘宝拍下商品，需按照商家要求来。',
    },
    'goods_clearance': {
      text: '清仓断码',
      desc: '本模块商品为商家清仓断码尾货库存，秀客享极低折扣，但需注意尺码等描述哦！',
    }
  },//导航分类列表
  discountPriceType: {
    '不限': {
      backgroundColor:　'',
      discountTypes: ['discount_9_9','discount_49_9', 'discount_99_9','discount_r_10','discount_r_30','discount_r_50'],
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
    },
    '1折': {
      backgroundColor: '#ff9900',
      discountTypes: ['discount_r_10'],
    },
    '3折': {
      backgroundColor: '#cc3333',
      discountTypes: ['discount_r_30'],
    },
    '5折': {
      backgroundColor: '#ff3399',
      discountTypes: ['discount_r_50'],
    }
  },//白菜价列表
  goodsClearanceList: {
    '不限': {
      backgroundColor:　'',
      discountTypes: ['discount_r_10','discount_r_30','discount_r_50'],
    },
    '1折': {
      backgroundColor: '#ff9900',
      discountTypes: ['discount_r_10'],
    },
    '3折': {
      backgroundColor: '#cc3333',
      discountTypes: ['discount_r_30'],
    },
    '5折': {
      backgroundColor: '#ff3399',
      discountTypes: ['discount_r_50'],
    }
  },
  activityCategory: '',
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
