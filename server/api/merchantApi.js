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
 * 商家进行任务发布
 * @param taskType
 * @param taskDaysDuration
 * @param onlyShowForQualification
 * @param refuseOldShowker
 * @param taskName
 * @param itemType
 * @param taskMainImage
 * @param itemUrl
 * @param storeName
 * @param taskCount
 * @param itemPrice
 * @param pinkage
 * @param itemDescription
 * @param userId
 * @param paymentMethod
 * @param taskDetail
 */
router.post("/api/task-create.json", function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/save',
    formData: {
      userId: req.session.userData.id,
      taskType: req.body.taskType,
      taskDaysDuration: req.body.taskDaysDuration,
      onlyShowForQualification: req.body.onlyShowForQualification,
      refuseOldShowker: req.body.refuseOldShowker,
      taskName: req.body.taskName,
      "itemCatalog.id": req.body.itemType,
      taskMainImage: req.body.taskMainImage,
      itemUrl: req.body.itemUrl,
      storeName: req.body.storeName,
      taskCount: req.body.taskCount,
      itemPrice: (req.body.itemPrice * 100).toFixed(2) * 1,
      pinkage: req.body.pinkage,
      itemDescription: req.body.itemDescription,
      paymentMethod: req.body.paymentMethod,
      taskDetail: req.body.taskDetail,
      id: req.body.taskId
    },
    json: true,
  };
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
 * 获取商家任务发布商品类型
 * @param phone
 * @param smsCode
 */
router.post("/api/item-catalog.json", function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/item/catalog/all',
    json: true
  };
  request(options)
    .then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  })
});

/**
 * 商家账户余额
 * @param userId
 */
router.post("/api/get-account-balance.json", function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/user/getAccountBalanceByUserId/' + req.session.userData.id,
    json: true
  };
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
 * 商家通过余额支付担保金
 * @param userId
 * @param fee
 * @param payPassword
 * @param type
 * @param platform
 */
router.post("/api/pay-by-balance.json", function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/pay-by-account-balance',
    formData: {
      uid: req.session.userData.id,
      payPwd: req.body.payPassword,
      taskId: req.body.taskId,
      type: req.body.type,
      platform: 'PC'
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家活动活动管理
 * @param userId
 * @param pageIndex
 * @param pageSize
 * @param taskStatusList
 * @param settlementStatusList
 */
router.post('/api/task-list.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/list/' + req.session.userData.id + '/' + req.body.pageIndex,
    qs: {
      pageSize: req.body.pageSize,
      taskStatusListString: req.body.taskStatusList,
      settlementStatusListString: req.body.settlementStatusList
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家关闭已提交的任务
 * @param userId
 * @param taskId
 */
router.post('/api/close-task.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/close/' + req.session.userData.id + '/' + req.body.taskId,
    json: true
  };
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
 * 商家删除已提交的任务
 * @param userId
 * @param taskId
 */
router.post('/api/delete-task.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/delete/' + req.session.userData.id + '/' + req.body.taskId,
    json: true
  };
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
 * 商家申请任务结算
 * @param userId
 * @param taskId
 */
router.post('/api/task-settlement.json',function (req, res ,next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/settlement/'+ req.session.userData.id+ '/'+ req.body.taskId,
    json: true
  };
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
 * 获取商家任务发布列表
 * @param userId
 * @param taskId
 */
router.post('/api/get-task.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/get/' + req.session.userData.id + '/' + req.body.taskId,
    json: true
  };
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
 * 商家获取已申请任务秀客列表
 * @param taskId
 * @param status
 */
router.post('/api/get-task-apply-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/merchant/apply/list',
    formData: {
      taskId: req.body.taskId,
      merchantId: req.session.userData.id,
      status: req.body.status,
      pageIndex: req.body.pageIndex,
      selectStatus: req.body.selectStatus,
      searchValue: req.body.searchValue,
      orderNum: req.body.orderNum,
      endReasonList: req.body.endReasonList,
      auditStatusList: req.body.auditStatusList,
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家审核秀客是否通过
 * @param id
 * @param status
 */
router.post('/api/set-task-showker-audit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/merchant/showker/audit',
    formData: {
      taskApplyId: req.body.id,
      merchantId: req.session.userData.id,
      auditPass: req.body.status,
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家审核秀订单号
 * @param id
 * @param status
 */
router.post('/api/order-number-audit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/merchant/order/audit',
    formData: {
      showkerTaskId: req.body.id,
      merchantId: req.session.userData.id,
      auditPass: req.body.status,
      msg: req.body.msg
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家获取秀客订单详情
 * @param id
 * @param status
 */
router.post('/api/order-number-info.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/merchant/order/info',
    formData: {
      showkerTaskId: req.body.id,
      merchantId: req.session.userData.id,
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家对任务补充担保金
 * @param uid
 * @param platform
 * @param payPwd
 * @param showkerTaskId
 */
router.post('/api/deposit-supplement.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/deposit_supplement',
    formData: {
      uid: req.session.userData.id,
      platform: "pc",
      payPwd: req.body.payPassword,
      showkerTaskId: req.body.taskId
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家审核买家秀
 * @param id
 * @param status
 * @param msg
 */
router.post('/api/task-report-audit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/merchant/report/audit',
    formData: {
      showkerTaskId: req.body.id,
      merchantId: req.session.userData.id,
      auditPass: req.body.status,
      msg: req.body.msg
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家通过买家秀并返款
 * @param uid
 * @param showkerTaskId
 * @param payPwd
 * @param platform
 */
router.post('/api/showker-deposit-return.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/account/showker_deposit_return',
    formData: {
      uid: req.session.userData.id,
      showkerTaskId: req.body.showkerTaskId,
      payPwd: req.body.payPwd,
      platform: req.body.platform
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
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家个人主页活动提醒
 * @param showkerId
 */
router.post('/api/task/seller-personal-trial-count.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/merchant/personal/trial/count/' + req.session.userData.id,
    json: true
  };
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
 * 商家查看活动结算详情
 * @param taskId
 */
router.post('/api/task-settlement-detail.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/settlement/detail/' + req.session.userData.id +'/' + req.body.taskId,
    json: true
  };
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
