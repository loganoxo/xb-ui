/**
 * 注意：（请使用JS严格模式语法）
 */
'use strict';

const express = require('express');
const logConfig = require('../logConfig');
const request = require('request-promise');
const apiConfig = require('../apiConfig');
const router = express.Router();

/**
 * 秀客申请列表
 * 待审核和未通过的
 * @param showkerId
 */
router.post('/api/showker-apply-list.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/list/apply/' + req.session.userData.id + '/' + req.body.pageIndex, req, {
    selectStatus: req.body.selectStatus,
    searchValue: req.body.searchValue,
    status: req.body.status,
    pageSize: req.body.pageSize,
    rejectReasonList: req.body.rejectReasonList
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客个人主页活动提醒
 * @param showkerId
 */
router.post('/api/task/showker-personal-trial-count.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/personal/trial/count/' + req.session.userData.id, req);
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客申请列表
 * 审核通过的
 * @param showkerId
 */
router.post('/api/showker-success-list.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/list/success/' + req.session.userData.id + '/' + req.body.pageIndex, req, {
    selectStatus: req.body.selectStatus,
    searchValue: req.body.searchValue,
    pageSize: req.body.pageSize,
    auditTimeStart: req.body.auditTimeStart,
    auditTimeEnd: req.body.auditTimeEnd,
    pageIndex: req.body.pageIndex,
    statusList: req.body.statusList,
    orderNum: req.body.orderNum
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客的买家秀（针对获取买家秀列表，分页查询）
 * @param showkerId
 * @param pageIndex
 * @param pageSize
 */
router.post('/api/task/showker/trial/reports.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/trial/reports', req, {
    showkerId: req.body.showkerId,
    pageIndex: req.body.pageIndex,
    pageSize: req.body.pageSize,
    itemCatalogname: req.body.itemCatalogname,
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客的活动详情（针对获取秀客活动详情）
 * @param showkerId
 */
router.post('/api/task/showker/trial/detail.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/trial/detail', req, {
    showkerId: req.body.showkerId,
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客终止活动（针对申请成功的任务）
 * @param id
 * @param status
 */
router.post('/api/showker-trial-end.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/trial/end', req, {
    showkerTaskId: req.body.id,
    showkerId: req.session.userData.id,
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客终止活动（针对申请还没有审核结果的任务）
 * @param id
 * @param status
 */
router.post('/api/showker-apply-end.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/apply/end', req, {
    taskApplyId: req.body.id,
    showkerId: req.session.userData.id,
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客删除未审核通过的记录
 * @param showkerId
 * @param id
 */
router.post('/api/showker-apply-delete.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/apply/delete', req, {
    showkerId: req.session.userData.id,
    taskApplyId: req.body.id
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客去下单
 * @param id
 */
router.post('/api/showker-to-process-order.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/order/process', req, {
    showkerTaskId: req.body.id,
    showkerId: req.session.userData.id
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
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
  let options = apiConfig.postOptions('/task/showker/order/save', req, {
    showkerTaskId: req.body.id,
    showkerId: req.session.userData.id,
    orderNum: req.body.orderNum,
    orderPrice: (req.body.actualPayMoney * 100).toFixed(2) * 1
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客保存买家秀
 * @param id
 * @param trialReportText
 * @param trialReportImages
 */
router.post('/api/showker-save-report.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/trial/report/save', req, {
    showkerTaskId: req.body.id,
    showkerId: req.session.userData.id,
    trialReportText: req.body.trialReportText,
    trialReportImages: req.body.trialReportImages
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客修改买家秀
 * @param id
 * @param trialReportText
 * @param trialReportImages
 */
router.post('/api/showker-modify-report.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/trial/report/modify', req, {
    showkerTaskId: req.body.id,
    showkerId: req.session.userData.id,
    trialReportText: req.body.trialReportText,
    trialReportImages: req.body.trialReportImages
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 根据秀客任务ID获取秀客任务，用户ID兼容秀客角色和商家角色
 * 当uid为秀客的uid时，获取属于该秀客的任务
 * 当uid为商家的uid时，获取属于该商家活动的任务
 * @param id
 */
router.post('/api/showker-task-info.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/get/stid/' + req.body.id + '/uid/' + req.session.userData.id, req);
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 根据秀客任务ID获取试用报告
 * @param id
 */
router.post('/api/showker-task-report.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/report/get/stid/' + req.body.id, req);
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 根据试用报告ID获取试用报告
 * @param id
 */
router.post('/api/trial-report.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/report/get/trid/' + req.body.id, req);
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客能否申请活动
 * @param showkerId
 * @param taskId
 */
router.post('/api/task/showker/qualification/check.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/showker/qualification/check/' + req.session.userData.id + '/' + req.body.taskId, req);
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 秀客所选旺旺
 * @param wangwangId
 * @param taskId
 */
router.post('/api/task/showker/apply.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/showker/apply/' + req.session.userData.id + '/' + req.body.wangwangId + '/' + req.body.taskId, req, {
    searchCondition: req.body.searchCondition,
    itemLocation: req.body.itemLocation,
    browseToBottom: req.body.browseToBottom,
    enshrine: req.body.enshrine,
    addToCart: req.body.addToCart
  });
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

module.exports = router;
