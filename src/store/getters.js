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
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.accountBalance : 0;
  },

  // 从userInfo中提取用户是否修改过支付密码
  getIsEditPwdAlready: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.userAccount.ifEditPwdAlready : false;
  },

  // 从userInfo中提取用户类型（1：商家，0拿手）
  getUserRole: state => {
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.role : 0;
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
    return Object.keys(state.userInfo).length > 0 ? state.userInfo.qqNumber : null;
  },

  // 从sysConfigInfo中提取pcMerchantQqGroup信息
  getPcMerchantQqGroup: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.pcMerchantQqGroup : {};
  },

  // 从sysConfigInfo中提取taskApplyBaseCountFreshman信息
  getTaskApplyBaseCountFreshman: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.taskApplyBaseCountFreshman : {};
  },

  // 从sysConfigInfo中提取taskApplyBaseCountOldman信息
  getTaskApplyBaseCountOldman: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.taskApplyBaseCountOldman : {};
  },

  // 从sysConfigInfo中提取showkerInviteShowkerFee信息
  getShowkerInviteShowkerFee: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.showkerInviteShowkerFee : {};
  },

  // 从sysConfigInfo中提取showkerInviteSellerFee信息
  getShowkerInviteSellerFee: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.showkerInviteSellerFee : {};
  },

  // 从sysConfigInfo中提取taskSystemHoldPercent信息
  getTaskSystemHoldPercent: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.taskSystemHoldPercent : {};
  },

  // 从sysConfigInfo中提取客服QQ信息
  getSellerCustomerQq: state => {
    return Object.keys(state.sysConfigInfo).length > 0 ? state.sysConfigInfo.sellerCustomerQq : {};
  }
}
