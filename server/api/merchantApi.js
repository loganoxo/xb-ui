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
      itemPrice: req.body.itemPrice * 100,
      pinkage: req.body.pinkage,
      itemDescription: req.body.itemDescription,
      paymentMethod: req.body.paymentMethod,
      taskDetail: req.body.taskDetail,
      id: req.body.id
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
      res.json({status: false, msg: "服务器错误"});
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
    res.json({status: false, msg: "服务器错误"});
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 商家通过余额支付保证金
 * @param userId
 * @param fee
 * @param payPassword
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});


/**
 * 商家试用活动管理
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
      res.json({status: false, msg: "服务器错误"});
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
      res.json({status: false, msg: "服务器错误"});
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 根据任务id和状态获取任务申请列表（商家编辑已提交过的任务）
 * @param taskId
 * @param status
 */
router.post('/api/get-task-apply-list.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/seller/applyList',
    formData: {
      taskId: req.body.taskId,
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
      res.json({status: false, msg: "服务器错误"});
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
    uri: baseUrl + '/task/seller/showkeAudit',
    formData: {
      id: req.body.id,
      status: req.body.status,
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
 * 商家审核秀订单号
 * @param id
 * @param status
 */
router.post('/api/order-number-audit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/seller/orderNumAudit',
    formData: {
      id: req.body.id,
      status: req.body.status,
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
 * 商家获取秀客订单详情
 * @param id
 * @param status
 */
router.post('/api/order-number-info.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/seller/orderInfo',
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

/**
 * 商家对任务补充保证金
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 商家查看试用报告详情
 *  @param id
 */
router.post('/api/task-report-info.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/seller/reportInfo',
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

/**
 * 商家审核试用报告
 * @param id
 * @param status
 * @param msg
 */
router.post('/api/task-report-audit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/seller/reportAudit',
    formData: {
      id: req.body.id,
      status: req.body.status,
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

module.exports = router;
