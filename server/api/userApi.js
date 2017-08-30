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
 */
router.post('/api/get-trad-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/get-trad-list',
    formData: {
      userId: req.session.userData.id,
      createTimeStart: req.body.createTimeStart,
      createTimeEnd: req.body.createTimeEnd,
      accountChangeType: req.body.accountChangeType,
      reversePicUrl: req.body.reversePicUrl,
      taskSerial: req.body.taskSerial
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});

/**
 * 获取交易明细列表
 * @param userId
 * @param tradId
 */
router.post("/api/get-trad-detail-list.json",function (req, res, next) {
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
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});


/**
 * 修改用户头像
 * @param userId
 * @param picStr
 */
router.post('/api/user/edit_portrait_pic.json', function (req, res, next) {
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});


module.exports = router;
