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
 * 秀客个人主页试用提醒
 * @param showkerId
 */
router.post('/api/task/showker-personal-trial-count.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/personal/trial/count/' + req.session.userData.id,
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
 * 秀客的试用报告（针对获取试用报告列表，分页查询）
 * @param showkerId
 * @param pageIndex
 * @param pageSize
 */
router.post('/api/task/showker/trial/reports.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/trial/reports',
    qs: {
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
 * 秀客的试用详情（针对获取秀客试用详情）
 * @param showkerId
 */
router.post('/api/task/showker/trial/detail.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/trial/detail',
    qs: {
      showkerId: req.body.showkerId,
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
 * 秀客终止试用（针对申请成功的任务）
 * @param id
 * @param status
 */
router.post('/api/showker-trial-end.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/trial/end',
    formData: {
      showkerTaskId: req.body.id,
      showkerId: req.session.userData.id,
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
 * 秀客终止试用（针对申请还没有审核结果的任务）
 * @param id
 * @param status
 */
router.post('/api/showker-apply-end.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/apply/end',
    formData: {
      showkerTaskId: req.body.id,
      showkerId: req.session.userData.id,
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
    uri: baseUrl + '/task/showker/apply/delete',
    formData: {
      showkerId: req.session.userData.id,
      showkerTaskId: req.body.id
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
 * 秀客修改/保存订单号
 * @param orderNum
 * @param id
 * @param actualPayMoney
 */
router.post('/api/showker-order-save.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/order/save',
    formData: {
      showkerTaskId: req.body.id,
      showkerId: req.session.userData.id,
      orderNum: req.body.orderNum,
      orderPrice: req.body.actualPayMoney * 100
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
 * 秀客保存试用报告
 * @param id
 * @param trialReportText
 * @param trialReportImages
 */
router.post('/api/showker-save-report.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/trial/report/save',
    formData: {
      showkerTaskId: req.body.id,
      showkerId: req.session.userData.id,
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
 * 秀客修改试用报告
 * @param id
 * @param trialReportText
 * @param trialReportImages
 */
router.post('/api/showker-modify-report.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/trial/report/modify',
    formData: {
      showkerTaskId: req.body.id,
      showkerId: req.session.userData.id,
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
    method: 'GET',
    uri: baseUrl + '/task/showker/report/info',
    qs: {
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

/**
 * 秀客能否申请试用
 * @param showkerId
 * @param taskId
 */
router.post('/api/task/showker/qualification/check.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/qualification/check/' + req.session.userData.id + '/' + req.body.taskId,
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
 * 秀客所选旺旺
 * @param wangwangId
 * @param taskId
 */
router.post('/api/task/showker/apply.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/showker/apply/' + req.session.userData.id + '/' + req.body.wangwangId + '/' + req.body.taskId,
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
