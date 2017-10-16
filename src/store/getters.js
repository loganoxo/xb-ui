export default {
  //从vuex中获取用户账户信息
  getUserAccountInfo: state => {
    return state.userInfo.userAccount;
  },

  //从vuex中获取用户个人基本信息
  getPersonalInfo: state => {
    return {
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
    }
  },

  //从vuex中获取用户账户余额
  getUserBalance: state => {
    return state.userInfo.userAccount ? state.userInfo.userAccount.accountBalance / 100 : 0;
  },

  //从vuex中获取用户是否修改过支付密码
  getIsEditPwdAlready: state => {
    return state.userInfo.userAccount ? state.userInfo.userAccount.ifEditPwdAlready : false;
  }
}
