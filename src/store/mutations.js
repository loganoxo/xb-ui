/**
 * Created by ycb on 2017/7/17.
 */
import {OUT_LOGIN} from './mutation-types.js'
import {setStore, getStore} from '../config/utils'
export default {
  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.login = false;
  },
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
  }
}
