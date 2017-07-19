/**
 * Created by ycb on 2017/7/17.
 */
import * as types from './mutation-types'
import {setStorage, getStorage} from '../config/utils'
export default {
  //退出登录
  [types.OUT_LOGIN](state) {
    state.userInfo = {};
    state.login = false;
  },
  // 记录用户信息
  [types.RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStorage('user_id', info.user_id);
  }
}
