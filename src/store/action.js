/**
 * Created by ycb on 2017/7/17.
 */
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
    api.getUserAccount({
      platForm: 'PC'
    }).then(res => {
      if (res.status) {
        commit({
          type: 'RECORD_USER_INFO',
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
          type: 'TASK_MANAGEMENT_COUNT_INFO',
          countInfo: res.data
        })
      } else {
        console.log('获取商家任务管理活动数量信息：' + res.msg);
      }
    })
  },

  //获取系统配置信息
  getSysConfigInfo(){
    let self = this;
    api.getSysConfigInfo(
    ).then((res) => {
      if (res){
        self.$store.commit({
          type: 'SYSTEM_CONFIG_INFORMATION',
          result: res
        });
      }else {
        alert(res)
      }
    })
  },
}
