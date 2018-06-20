/**
 * Created by ycb on 2017/7/17.
 */
import api from '@/config/apiConfig'

export default {
  //用户退出登录
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

  //用户登录后按需重新获取用户信息
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

  //获取商家发布任务情况
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

  //获取商家任务管理活动数量信息
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

  //获取系统配置信息
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

  //获取商家用户是否有首发资格
  getTaskCreateFastStatus({commit}) {
    api.taskCreateFastStatus().then(res => {
      if (res.status) {
        commit('TASK_CREATE_FAST_STATUS', {status: res.data});
      } else {
        _this.$Message.error(res.msg)
      }
    })
  },
}
