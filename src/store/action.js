/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import api from '@/config/apiConfig'

export default {
  //用户退出登陆
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

  //用户登陆后按需重新获取用户信息
  getUserInformation({commit}) {
    api.getUserAccount().then(res => {
      if (res.status) {
        commit({
          type: types.RECORD_USER_INFO,
          info: res.data
        })
      } else {
        console.log('获取用户信息：' + res.msg);
      }
    });
  },

  //获取商家任务管理活动数量信息
  getPersonalTrialCount({commit}) {
    api.sellerPersonalTrialCount().then(res => {
      if (res.status) {
        commit({
          type: types.TASK_MANAGEMENT_COUNT_INFO,
          countInfo: res.data
        })
      } else {
        console.log('获取商家任务管理活动数量信息：' + res.msg);
      }
    })
  },

}
