/**
 * 注意：（请使用JS严格模式语法）
 */
'use strict';

const express = require('express');
const config = require('../config');
const logConfig = require('../logConfig');
const request = require('request-promise');

const router = express.Router();
const baseUrl = config.baseUrl;

/**
 * 获取用户交易列表
 * @param pageable
 * @param userId
 * @param createTimeStart
 * @param createTimeEnd
 * @param accountChangeType
 * @param taskSerial
 * @param page
 * @param size
 */
router.post('/api/get-trad-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get-trad-list',
    formData: {
      userId: req.session.userData.id,
      tradTimeStart: req.body.tradTimeStart,
      tradTimeEnd: req.body.tradTimeEnd,
      accountChangeTypeStr: req.body.accountChangeTypeStr,
      reversePicUrl: req.body.reversePicUrl,
      taskSerial: req.body.taskSerial,
      page: req.body.page,
      size: req.body.size
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取银行卡信息
 */
router.post('/api/get-bank-card-information.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/user/account/getBankCardByUid/' + req.session.userData.id,
    json: true
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});

/**
 * 获取用户、账户、旺旺账号
 * @param userId
 */
router.post('/api/get-user-account.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get-user-account',
    formData: {
      userId: req.session.userData.id,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的密码修改支付密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/find-pwd-by-origin.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/reset-pwd-by-originPwd',
    formData: {
      userId: req.session.userData.id,
      oldPwd: req.body.oldPwd,
      newPwd: req.body.newPwd,
      repwd: req.body.repwd
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取交易明细列表
 * @param userId
 * @param tradId
 */
router.post("/api/get-trad-detail-list.json", function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get-trad-detail-list',
    formData: {
      userId: req.session.userData.id,
      tradId: req.body.tradId
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 添加银行卡
 * @param accountName
 * @param bankName
 * @param bankNo
 * @param bankPart
 * @param phoneNo
 * @param smsCode
 * @param uid
 */
router.post('/api/add-bank-card.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/add_bank_card',
    formData: {
      uid: req.session.userData.id,
      accountName: req.body.accountName,
      bankName: req.body.bankName,
      bankNo: req.body.bankNo,
      bankPart: req.body.bankPart,
      smsCode: req.body.smsCode,
    },
    json: true,
  };
  let validateCode = parseInt(req.body.validateCode);
  let time = new Date().getTime();
  let vrCode = req.session.vrCode;
  if (validateCode === vrCode.code) {
    if (vrCode.expireTime > time) {
      request(options).then(function (parsedBody) {
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(req.originalUrl + ':' + err);
        res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
        res.end();
      });
    } else {
      res.json({status: false, msg: "图形验证码过期！"});
      res.end();
    }
  } else {
    res.json({status: false, msg: "图形验证码错误！"});
    res.end();
  }
});

/**
 * 申请提现
 * @param fee
 * @param platform
 * @param uid
 * @param bankCardNum
 * @param payPwd
 * @return
 */
router.post('/api/with-draw-apply.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/with_draw_apply',
    formData: {
      uid: req.session.userData.id,
      fee: req.body.fee,
      bankCardNum: req.body.bankCardNum,
      payPwd: req.body.payPwd
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 显示提现列表
 * @param pageable
 * @param userId
 * @param serialNumber
 * @param applyTimeStart
 * @param applyTimeEnd
 * @param state
 * @return
 */
router.post('/api/get-with-draw-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get_with_draw_list',
    formData: {
      userId: req.session.userData.id,
      serialNumber: req.body.serialNumber,
      applyTimeStart: req.body.applyTimeStart,
      applyTimeEnd: req.body.applyTimeEnd,
      state: req.body.state,
      page: req.body.page,
      size: req.body.size
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取某个活动的任务担保金返款列表
 * @param taskId
 * @return
 */
router.post('/api/get-deposit-return-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get_deposit_return_list',
    formData: {
      taskId: req.body.taskId
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});


/**
 * 修改用户头像
 * @param userId
 * @param picStr
 */
router.post('/api/user/edit-portrait-pic.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/edit_portrait_pic',
    formData: {
      uid: req.session.userData.id,
      picStr: req.body.picStr
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 余额充值
 * @param uid
 * @param finalFee
 * @param orderPlatform
 * @param payChannel
 */
router.post('/api/balance-order-create.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/order/balance-order-create',
    formData: {
      uid: req.session.userData.id,
      finalFee: req.body.finalFee,
      orderPlatform: req.body.orderPlatform,
      payChannel: req.body.payChannel
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的支付密码修改支付密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/user/account/reset-pay-pwd-by-originPwd.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/reset-pay-pwd-by-originPwd',
    formData: {
      userId: req.session.userData.id,
      oldPwd: req.body.oldPwd,
      newPwd: req.body.newPwd,
      repwd: req.body.repwd,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的登录密码修改登录密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/user/account/reset-login-pwd-by-originPwd.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/reset-login-pwd-by-originPwd',
    formData: {
      userId: req.session.userData.id,
      oldPwd: req.body.oldPwd,
      newPwd: req.body.newPwd,
      repwd: req.body.repwd,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过手机短信验证码重置登录密码
 * @param userId
 * @param pwd
 * @param repwd
 * @return
 */
router.post('/api/user/account/reset-login-pwd-by-smscode.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/reset-login-pwd-by-smscode',
    formData: {
      userId: req.session.userData.id,
      pwd: req.body.pwd,
      repwd: req.body.repwd,
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过手机短信验证码重置支付密码
 * @param userId
 * @param pwd
 * @param repwd
 */
router.post('/api/user/account/reset-pay-pwd-by-smscode.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/reset-pay-pwd-by-smscode',
    formData: {
      userId: req.session.userData.id,
      pwd: req.body.pwd,
      repwd: req.body.repwd,
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 验证重置密码短信
 * @param phone
 * @param smsCode
 */
router.post('/api/user/account/check-phone-message-before-reset-pwd.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/check-phone-message-before-reset-pwd',
    formData: {
      uid: req.session.userData.id,
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过旺旺名获取信息
 * @param phone
 * @param smsCode
 */
router.post('/api/user/alitm/getAlitmByAccount.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/getAlitmByAccount/' + req.body.account,
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});


module.exports = router;
