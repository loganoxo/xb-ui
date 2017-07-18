/**
 * Created by ycb on 2017/7/17.
 */
import {OUT_LOGIN} from './mutation-types.js'
export default {
  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.login = false;
  }
}
