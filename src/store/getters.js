import {aliCallbackImgUrl} from '@/config/env'

export default {
  //从userInfo中获取用户账户信息
  getUserAccountInfo: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount : {};
  },

  //从userInfo中获取用户个人基本信息
  getPersonalInfo: state => {
    return Object.keys(state.userInfo).length > 0 ? {
      alitmNum: state.userInfo.alitmNum,
      alitms: state.userInfo.alitms,
      createTime: state.userInfo.createTime,
      id: state.userInfo.id,
      ifBandingBankCard: state.userInfo.ifBandingBankCard,
      ifCertification: state.userInfo.ifCertification,
      lastLoginTime: state.userInfo.lastLoginTime,
      nickname: state.userInfo.nickname,
      password: state.userInfo.password,
      phone: state.userInfo.phone,
      portraitPic: state.userInfo.portraitPic,
      realName: state.userInfo.realName,
      role: state.userInfo.role,
      salt: state.userInfo.salt,
      status: state.userInfo.status
    } : {}
  },

  //从userInfo中获取用户账户余额
  getUserBalance: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.accountBalance / 100 : 0;
  },

  //从userInfo中获取用户是否修改过支付密码
  getIsEditPwdAlready: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.ifEditPwdAlready : false;
  },

  //从userInfo中获取用户类型（1：商家，0秀客）
  getUserRole: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.role : 0;
  },

  //从userInfo中获取用户头像地址
  getUserHeadUrl: state => {
    if (Object.keys(state.userInfo).length > 0) {
      if (state.userInfo.portraitPic.indexOf('head-image') >= 0) {
        return aliCallbackImgUrl + state.userInfo.portraitPic + '!orgi75'
      } else if (state.userInfo.portraitPic.indexOf('q.qlogo.cn/qq') >= 0) {
        return state.userInfo.portraitPic
      } else {
        return '/static/img/common/tx-default.png'
      }
    } else {
      return null
    }
  }
}
