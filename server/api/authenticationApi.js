const express = require('express');
const config = require('../config');
const logConfig = require('../logConfig');
const request = require('request-promise');

const router = express.Router();
const baseUrl = config.baseUrl;

/**
 * 实名认证提交认证
 * @param realname 姓名
 * @param idcard  身份证号
 * @param picUrl  身份证正面
 * @param reversePicUrl 身份证反面
 */
router.post('/api/user/identity/saveidentity.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/identity/saveidentity',
    formData: {
      phone: req.session.userData.phone,
      userId: req.session.userData.id,
      realname: req.body.realname,
      idcard: req.body.idcard,
      picUrl: req.body.picUrl,
      reversePicUrl: req.body.reversePicUrl
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
 * 实名认证初始化
 * @param realName 姓名
 * @param success   成功状态
 * @param processing  审核中
 */
router.post('/api/identity-index.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/identity/index',
    formData: {
      userId: req.session.userData.id
    }
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
 * 绑定旺旺号
 * @param userId
 * @param alitm_account
 * @param picUrl
 */
router.post('/api/alitm-bunding.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/alitm-bunding',
    formData: {
      userId: req.session.userData.id,
      alitmAccount: req.body.alitmAccount,
      picUrl: req.body.picUrl
    },
    json: true
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
 * 获取旺旺信息列表
 * @param userId
 */
router.post('/api/get-alitm-info-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/get-alitm-info-list',
    formData: {
      userId: req.session.userData.id,
    }
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
 * 解绑旺旺号
 * @param userId
 */
router.post('/api/alitm-unBunding.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/alitm-unBunding',
    formData: {
      id: req.body.id,
    }
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
 * 修改旺旺号
 * @param userId
 */
router.post('/api/alitm/resubmit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/resubmit',
    formData: {
      id: req.body.id,
      alitmAccount: req.body.alitmAccount,
      picUrl: req.body.picUrl
    }
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
