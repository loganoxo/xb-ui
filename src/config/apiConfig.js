/**
 * Created by ycb on 2017/4/26.
 */
import {fetch} from '../config/axiosConfig'

export default {
  login (params) {
    return fetch("/login.json",params)
  },
  register (params) {
    return fetch("/sign-up.json",params)
  },
}
