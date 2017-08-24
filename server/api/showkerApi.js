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
 * 秀客申请列表
 * 待审核和未通过的
 * @param showkerId
 */
router.post('/api/showker-apply-list.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/list/apply/' + req.session.userData.id + '/' + req.body.pageIndex,
    qs: {
      selectStatus: req.body.selectStatus,
      searchValue: req.body.searchValue,
      status: req.body.status,
      pageSize: req.body.pageSize
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客申请列表
 * 审核通过的
 * @param showkerId
 */
router.post('/api/showker-success-list.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/list/success/' + req.session.userData.id + '/' + req.body.pageIndex,
    qs: {
      selectStatus: req.body.selectStatus,
      searchValue: req.body.searchValue,
      pageSize: req.body.pageSize,
      auditTimeStart: req.body.auditTimeStart,
      auditTimeEnd: req.body.auditTimeEnd
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客的试用报告
 * @param showkerId
 * @param pageIndex
 * @param pageSize
 * @param orderBy
 * @param sort
 * @return
 */
router.post('/api/task/showker/showkerTrialReports.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/showkerTrialReports',
    formData: {
      showkerId: req.body.showkerId,
      pageIndex: req.body.pageIndex,
      pageSize: req.body.pageSize,
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客终止试用
 * @param id
 * @param status
 */
router.post('/api/showker-end-trial.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/endTrial',
    formData: {
      id: req.body.id,
      status: req.body.status
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客删除未审核通过的记录
 * @param showkerId
 * @param id
 */
router.post('/api/showker-apply-delete.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/applyDelete',
    formData: {
      showkerId: req.body.showkerId,
      id: req.body.id
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客去下单
 * @param id
 */
router.post('/api/showker-to-process-order.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/toProcessOrder',
    formData: {
      id: req.body.id
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客保存或者修改订单号
 * @param orderNum
 * @param id
 * @param actualPayMoney
 */
router.post('/api/showker-save-or-update-order.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/saveOrUpdateOrder',
    formData: {
      id: req.body.id
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客保存或者修改试用报告
 * @param id
 * @param trialReportText
 * @param trialReportImages
 */
router.post('/api/showker-save-or-update-report.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/saveOrUpdateReport',
    formData: {
      id: req.body.id,
      trialReportText: req.body.trialReportText,
      trialReportImages: req.body.trialReportImages
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 秀客填写试用报告当前任务详情
 * @param id
 */
router.post('/api/showker-report-info.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/reportInfo',
    formData: {
      id: req.body.id,
    },
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

module.exports = router;
