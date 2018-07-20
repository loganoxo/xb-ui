import {aliCallbackImgUrl} from '@/config/env'

export default {
  // 从userInfo中提取用户账户信息
  getUserAccountInfo: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount : {};
  },

  // 从userInfo中提取用户个人基本信息
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
      status: state.userInfo.status,
      extension: state.userInfo.extension,
    } : {}
  },

  // 从userInfo中提取用户账户余额
  getUserBalance: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.accountBalance : 0
  },

  // 从userInfo中提取用户是否修改过支付密码
  getIsEditPwdAlready: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.ifEditPwdAlready : false
  },

  // 从userInfo中提取用红包抵扣限额
  getRedEnvelopeDeductionLimit: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.extension.redEnvelopeDeductionLimit : 0
  },

  // 从userInfo中提取用户类型（1：商家，0拿手）
  getUserRole: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.role : 0
  },

  // 从userInfo中提取用户头像地址
  getUserHeadUrl: state => {
    if (Object.keys(state.userInfo).length > 0) {
      if (state.userInfo.portraitPic.indexOf('head-image') >= 0) {
        return aliCallbackImgUrl + state.userInfo.portraitPic + '!orgi75'
      } else if (state.userInfo.portraitPic.indexOf('q.qlogo.cn') >= 0 || state.userInfo.portraitPic.indexOf('wx.qlogo.cn') >= 0) {
        return state.userInfo.portraitPic
      } else {
        return '/static/img/common/tx-default.png'
      }
    } else {
      return null
    }
  },

  // 从userInfo中提取用户会员状态（是否是会员 true: 是 false: 否）
  isMemberOk: state => {
    return state.userInfo.memberOK
  },

  // 从userInfo中提取用户是否是VIP会员
  getMemberLevel: state => {
    if (!state.userInfo.memberOK) {
      return 100
    } else {
      return state.userInfo.memberLevel
    }
  },

  // 从userInfo中提取用户QQ号码
  getQQNumber: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.qqNumber : null
  },

  // 从userInfo中获取红包到期时间
  getRedEnvelopesExpirationTime: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.redEnvelopeSellerDeadLine : null
  },

  // 从sysConfigInfo中提取对应配置信息
  getSysConfigValue: (state) => (type) => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo[type] : {}
  }
}
