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
  logInAuthority: true,//用户登陆页面权限控制
  roleAuthority: null,//用户角色页面权限控制
  severTime: null,//当前服务器时间
  clientTime: null,//当前客户端时间
  taskManagementCountInfo: {},//商家任务管理活动数量信息
  TaskCategoryActive: '',//导航栏对应选中的选项
  wechartShow: false,//是否弹出微信弹框
  wechartRes: true,
  disCountTaskCategory: false,//是否为白菜价判断
  showTopCategoryRes: true, //导航栏左侧列表显示
  //导航分类列表
  TaskCategoryActiveList: {
    'home': {
      text: '全部活动'
    },
    'free_get': {
      text: '免费领',
      desc: '本模块商品，拿手无需支付任何费用，商家任性送！',
      color: '#99cc33',
    },
    'price_low': {
      text: '白菜价',
      // desc: '本模块商品，拿手或以类似9.9元一口价买下商品，或享受1折等极低折扣买下商品！',
      desc: '亲爱的用户，10元包邮与白菜价专区即将下线哦，如您有正在进行中的活动，请尽快结束',
      color: '#cccc33',
    },
    'pinkage_for_10': {
      text: '10元包邮',
      // desc: '本模块商品，拿手仅需承担10元运费，商品就归您！',
      desc: '亲爱的用户，10元包邮与白菜价专区即将下线哦，如您有正在进行中的活动，请尽快结束',
      color: '#75c5ff',
    },
    'present_get': {
      text: '体验专区',
      desc: '本模块展示商品，为商家附赠的赠品，在淘宝上需按照商家要求拍下指定商品。',
      color: '#33cc99',
    },
    'goods_clearance': {
      text: '清仓断码',
      desc: '本模块商品为商家清仓断码尾货库存，拿手享极低折扣，但需注意尺码等描述哦！',
      color: '#cccc33',
    }
  },
  //白菜价列表
  discountPriceType: {
    '不限': {
      backgroundColor:　'',
      discountTypes: ['discount_9_9','discount_49_9', 'discount_99_9','discount_r_10','discount_r_30','discount_r_50'],
    },
    9.9: {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_9_9'],
    },
    49.9: {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_49_9'],
    },
    99.9: {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_99_9'],
    },
    '1折': {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_r_10'],
    },
    '3折': {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_r_30'],
    },
    '5折': {
      backgroundColor: '#c4c71d',
      discountTypes: ['discount_r_50'],
    }
  },
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
