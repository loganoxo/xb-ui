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
        alert('获取用户信息：' + res.msg);
      }
    });
  },
}
