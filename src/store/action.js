/**
 * Created by ycb on 2017/7/17.
 */
import api from '@/config/apiConfig'

export default {
  // 用户退出登录操作
  loggedOut({commit}) {
    return new Promise((resolve, reject) => {
      api.loggedOut().then(res => {
        if (res.status) {
          commit('OUT_LOGIN');
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },

  // 用户登录后按需重新获取用户信息
  getUserInformation({commit}) {
    return new Promise((resolve, reject) => {
      api.getUserAccount({
        platForm: 'PC'
      }).then(res => {
        if (res.status) {
          commit({
            type: 'RECORD_USER_INFO',
            info: res.data
          })
        } else {
          console.error('获取用户信息：', res.msg);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },

  // 获取商家发布任务情况
  getSellerTaskInfo({commit}) {
    return new Promise((resolve, reject) => {
      api.sellerPersonalTrialCount().then(res => {
        commit('SELLER_TASK_INFO', {result: res.data});
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },

  // 获取商家任务管理活动数量信息
  getPersonalTrialCount({commit}) {
    api.sellerPersonalTrialCount().then(res => {
      if (res.status) {
        commit({
          type: 'TASK_MANAGEMENT_COUNT_INFO',
          countInfo: res.data
        })
      } else {
        console.error('获取商家任务管理活动数量信息：', res.msg);
      }
    })
  },

  // 获取系统配置信息
  getSysConfigInfo({commit}) {
    api.getSysConfigInfo().then((res) => {
      if (res.status && res.data) {
        commit({
          type: 'SYSTEM_CONFIG_INFORMATION',
          result: res.data
        });
      } else {
        console.error('获取系统配置信息错误：', res.msg)
      }
    })
  },

  // 获取商家用户是否有首发资格
  getTaskCreateFastStatus({commit}) {
    return new Promise((resolve, reject) => {
      api.taskCreateFastStatus().then(res => {
        res.status && commit('TASK_CREATE_FAST_STATUS', {status: res.data});
        resolve(res);
      }).catch(err => {
        console.error(err);
        reject(err);
      })
    })
  },

  // 获取平台宝贝类目列表
  getCommodityCategoriesList({commit}) {
    api.getCommodityCategories().then(res => {
      if (res.status) {
        const list = res.data.sort((a, b) => {
          return a.sortIndex - b.sortIndex
        });
        commit('COMMODITY_CATEGORIES_LIST', {list: list})
      } else {
        console.error('获取平台宝贝类目列表错误：', res.msg)
      }
    })
  },

  // 获取流量数量相关信息
  getFlowNumInfo({commit}) {
    return new Promise((resolve,reject) => {
      api.getFlowNumber().then(res => {
        if (res.status) {
          commit({
            type: 'FLOW_NUMBER_INFO',
            info: res.data
          })
        } else {
          console.error('获取流量信息失败：', res.msg);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },

  //首页平台相关数据（入驻商家，登录拿手，新增商品，送出商品数）
  getPlatformData({commit}) {
    return new Promise((resolve,reject) => {
      api.newOutCommodity().then(res => {
        if (res.status) {
          commit({
            type: 'PLATFORM_DATA',
            result: res.data
          })
        } else {
          console.error('获取平台数据信息失败：', res.msg);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}
