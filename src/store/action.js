/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import api from '@/config/apiConfig'

export default {
   getBalance({commit}) {
    api.getAccountBalance().then(res => {
      if (res.status) {
        commit({
          type:types.RECORD_USER_BALANCE,
          balance:res.data
        })
      }else{
        console.error(res.msg);
      }
    })
  },
  loggedOut({commit}) {
    return new Promise((resolve, reject) => {
      api.loggedOut().then(res => {
        if (res.status) {
         commit({
            type: 'OUT_LOGIN'
          });
        }
        resolve(res);
      }).catch(err =>{
        reject(err);
      });
    })
  },
}
