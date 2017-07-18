/**
 * Created by ycb on 2017/7/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)
const state = {

}

export default new Vuex.Store({
  state,
  action,
  mutations,
})
