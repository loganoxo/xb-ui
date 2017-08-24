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

module.exports = router;
