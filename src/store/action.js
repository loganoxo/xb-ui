/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import api from '@/config/apiConfig'

export default {
  //获取用户账户余额
  getBalance({commit}) {
    api.getAccountBalance().then(res => {
      if (res.status) {
        commit({
          type: types.RECORD_USER_BALANCE,
          balance: res.data
        })
      } else {
        alert('获取用户账户余额：' + res.msg);
      }
    })
  },
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
  //获取当前服务器时间
  getSeverTime({commit}) {
    api.getSeverTime().then(res =>{
      if(res.status){

      }
    })
  }
}
