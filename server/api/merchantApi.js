/**
 * 注意：（请使用JS严格模式语法）
 */
'use strict';

const express = require('express');
const config = require('../config');
const logConfig = require('../logConfig');
const apiConfig = require('../apiConfig');
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
  let options = apiConfig.postOptions('/task/save', req, {
    userId: req.session.userData.id,
    taskType: req.body.taskType,
    taskDaysDuration: req.body.taskDaysDuration,
    onlyShowForQualification: req.body.onlyShowForQualification,
    refuseOldShowker: req.body.refuseOldShowker,
    needBrowseCollectAddCart: req.body.needBrowseCollectAddCart,
    taskName: req.body.taskName,
    "itemCatalog.id": req.body.itemType,
    taskMainImage: req.body.taskMainImage,
    itemUrl: req.body.itemUrl,
    storeName: req.body.storeName,
    taskCount: req.body.taskCount,
    itemPrice: (req.body.itemPrice * 100).toFixed(0) * 1,
    pinkage: req.body.pinkage,
    itemDescription: req.body.itemDescription,
    paymentMethod: req.body.paymentMethod,
    taskDetail: req.body.taskDetail,
    id: req.body.taskId
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
 * 获取商家任务发布商品类型
 * @param phone
 * @param smsCode
 */
router.post("/api/item-catalog.json", function (req, res, next) {
  let options = apiConfig.getOptions('/task/item/catalog/all', req);
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
  let options = apiConfig.getOptions('/user/getAccountBalanceByUserId/' + req.session.userData.id, req);
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
  let options = apiConfig.postOptions('/user/account/pay-by-account-balance', req, {
    uid: req.session.userData.id,
    payPwd: req.body.payPassword,
    taskId: req.body.taskId,
    type: req.body.type,
    platform: 'PC'
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
 * 商家活动活动管理
 * @param userId
 * @param pageIndex
 * @param pageSize
 * @param taskStatusList
 * @param settlementStatusList
 */
router.post('/api/task-list.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/list/' + req.session.userData.id + '/' + req.body.pageIndex, req, {
    pageSize: req.body.pageSize,
    taskNumber: req.body.taskNumber,
    orderBy: req.body.orderBy,
    sort: req.body.sort,
    taskStatusListString: req.body.taskStatusList,
    settlementStatusListString: req.body.settlementStatusList
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
 * 商家关闭已提交的任务
 * @param userId
 * @param taskId
 */
router.post('/api/close-task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/close/' + req.session.userData.id + '/' + req.body.taskId, req);
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
  let options = apiConfig.getOptions('/task/delete/' + req.session.userData.id + '/' + req.body.taskId, req);
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
router.post('/api/task-settlement.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/settlement/' + req.session.userData.id + '/' + req.body.taskId, req);
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
  let options = apiConfig.getOptions('/task/get/' + req.session.userData.id + '/' + req.body.taskId, req);
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
  let options = apiConfig.postOptions('/task/merchant/apply/list', req, {
    taskId: req.body.taskId,
    merchantId: req.session.userData.id,
    status: req.body.status,
    pageIndex: req.body.pageIndex,
    selectStatus: req.body.selectStatus,
    searchValue: req.body.searchValue,
    orderNum: req.body.orderNum,
    endReasonList: req.body.endReasonList,
    auditStatusList: req.body.auditStatusList,
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
 * 商家审核秀客是否通过
 * @param id
 * @param status
 */
router.post('/api/set-task-showker-audit.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/merchant/showker/audit', req, {
    taskApplyId: req.body.id,
    merchantId: req.session.userData.id,
    auditPass: req.body.status,
    reason: req.body.reason
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
 * 商家设置新增任务为已读状态
 * @param taskId
 * @param taskApplyId
 */
router.post('/api/applies/waiting/audit/newest/clear/one.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/merchant/applies/waiting/audit/newest/clear/one', req, {
    taskId: req.body.taskId,
    taskApplyId: req.body.taskApplyId
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
 * 商家审核秀订单号
 * @param id
 * @param status
 */
router.post('/api/order-number-audit.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/merchant/order/audit', req, {
    showkerTaskId: req.body.id,
    merchantId: req.session.userData.id,
    auditPass: req.body.status,
    msg: req.body.msg
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
 * 商家获取秀客订单详情
 * @param id
 * @param status
 */
router.post('/api/order-number-info.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/merchant/order/info', req, {
    showkerTaskId: req.body.id,
    merchantId: req.session.userData.id,
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
 * 商家对任务补充担保金
 * @param uid
 * @param platform
 * @param payPwd
 * @param showkerTaskId
 */
router.post('/api/deposit-supplement.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/deposit_supplement', req, {
    uid: req.session.userData.id,
    platform: "pc",
    payPwd: req.body.payPassword,
    showkerTaskId: req.body.taskId
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
 * 商家审核买家秀
 * @param id
 * @param status
 * @param msg
 */
router.post('/api/task-report-audit.json', function (req, res, next) {
  let options = apiConfig.postOptions('/task/merchant/report/audit', req, {
    showkerTaskId: req.body.id,
    merchantId: req.session.userData.id,
    auditPass: req.body.status,
    msg: req.body.msg
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
 * 商家通过买家秀并返款
 * @param uid
 * @param showkerTaskId
 * @param payPwd
 * @param platform
 */
router.post('/api/showker-deposit-return.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/showker_deposit_return', req, {
    uid: req.session.userData.id,
    showkerTaskId: req.body.showkerTaskId,
    payPwd: req.body.payPwd,
    platform: req.body.platform
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
 * 商家个人主页活动提醒
 * @param showkerId
 */
router.post('/api/task/seller-personal-trial-count.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/personal/trial/count/' + req.session.userData.id, req);
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
  let options = apiConfig.getOptions('/task/settlement/detail/' + req.session.userData.id + '/' + req.body.taskId, req);
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
 * 商家进入秀客任务管理页任务列表（所有待审核活动）
 * @param merchantId
 * @param pageIndex
 * @param pageSize
 * @param taskNumber
 * @param alitmAccount
 */
router.post('/api/applies/waiting/audit/task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/applies/waiting/audit/task', req, {
    merchantId: req.session.userData.id,
    pageIndex: req.body.pageIndex,
    pageSize: req.body.pageSize,
    taskNumber: req.body.taskNumber,
    alitmAccount: req.body.alitmAccount,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.newestTaskApplyCount = item.newestTaskApplyCount;
          data.totalTaskApplyCount = item.totalTaskApplyCount;
          data.trailDone = item.trailDone;
          data.trailEnd = item.trailEnd;
          data.showkerApplySuccessCount = item.showkerApplySuccessCount;
          data.trailOn = item.trailOn;
          data.residueCount = item.residueCount;
          data.taskCount = item.taskCount;
          data.id = item.task.id;
          data.number = item.task.number;
          data.taskMainImage = item.task.taskMainImage;
          data.taskName = item.task.taskName;
          data.endTime = item.task.endTime;
          data.needBrowseCollectAddCart = item.task.needBrowseCollectAddCart;
          dataList.push(data);
        });
      }
      res.send({
        msg: parsedBody.msg,
        status: parsedBody.status,
        data: {
          content: dataList,
          totalElements: parsedBody.data.totalElements
        }
      });
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务详情（待审核新增）
 * @param merchantId
 * @param taskId
 * @param pageIndex
 * @param alitmAccount
 */
/*router.post('/api/applies/waiting/audit/newest.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/applies/waiting/audit/newest', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
    pageIndex: req.body.pageIndex,
    alitmAccount: req.body.alitmAccount,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.alitmAccount = item.taskApply.alitmAccount;
          data.applyTime = item.taskApply.applyTime;
          data.id = item.taskApply.id;
          data.showkerId = item.taskApply.showkerId;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});*/

/**
 * 商家进入秀客任务管理页任务详情（待审核全部）
 * @param merchantId
 * @param taskId
 * @param pageIndex
 */
router.post('/api/applies/waiting/audit/all.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/applies/waiting/audit/all', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
    pageIndex: req.body.pageIndex,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.alitmAccount = item.taskApply.alitmAccount;
          data.applyTime = item.taskApply.applyTime;
          data.id = item.taskApply.id;
          data.showkerId = item.taskApply.showkerId;
          data.status = item.taskApply.status;
          data.reason = item.taskApply.reason;
          data.screenshot = item.taskApply.screenshot;
          data.newest = item.newest;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务列表（所有已通过审核活动）
 * @param merchantId
 * @param pageIndex
 * @param pageSize
 * @param taskNumber
 * @param alitmAccount
 * @param orderNum
 * @param showkerTaskStatusList
 */
router.post('/api/passes/task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/passes/task', req, {
    merchantId: req.session.userData.id,
    pageIndex: req.body.pageIndex,
    pageSize: req.body.pageSize,
    taskNumber: req.body.taskNumber,
    alitmAccount: req.body.alitmAccount,
    orderNum: req.body.orderNum,
    showkerTaskStatusList: req.body.showkerTaskStatusList,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.id = item.id;
          data.number = item.number;
          data.taskMainImage = item.taskMainImage;
          data.taskName = item.taskName;
          data.settlementStatusDesc = item.settlementStatusDesc;
          data.taskStatusDesc = item.taskStatusDesc;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务列表（已通过审核任务中的单号待审核数，买家秀待审核数）
 * @param merchantId
 * @param taskId
 */
router.post('/api/passes/showker/task/counts/info.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/passes/showker/task/counts/info', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
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
 * 商家进入秀客任务管理页任务列表（所有通过审核的任务）
 * @param merchantId
 * @param taskId
 * @param alitmAccount
 * @param orderNum
 * @param showkerTaskStatusList
 */
router.post('/api/passes/showker/task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/passes/showker/task', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
    alitmAccount: req.body.alitmAccount,
    orderNum: req.body.orderNum,
    showkerTaskStatusList: req.body.showkerTaskStatusList,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.alitmAccount = item.alitmAccount;
          data.id = item.id;
          data.status = item.status;
          data.orderNum = item.orderNum;
          data.currentGenerationEndTime = item.currentGenerationEndTime;
          data.trialEndReason = item.trialEndReason;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务列表（所有未通过审核的活动）
 * @param merchantId
 * @param taskId
 * @param alitmAccount
 * @param taskNumber
 * @param rejectReasonList
 */
router.post('/api/applies/end/task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/applies/end/task', req, {
    merchantId: req.session.userData.id,
    pageIndex: req.body.pageIndex,
    pageSize: req.body.pageSize,
    taskNumber: req.body.taskNumber,
    alitmAccount: req.body.alitmAccount,
    rejectReasonList: req.body.rejectReasonList,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.id = item.task.id;
          data.number = item.task.number;
          data.taskMainImage = item.task.taskMainImage;
          data.taskName = item.task.taskName;
          data.count = item.count;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务列表（所有未通过审核的任务）
 * @param merchantId
 * @param taskId
 * @param pageIndex
 * @param pageSize
 * @param alitmAccount
 * @param rejectReasonList
 */
router.post('/api/applies/end/showker/task.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/applies/end/showker/task', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
    pageIndex: req.body.pageIndex,
    pageSize: req.body.pageSize,
    alitmAccount: req.body.alitmAccount,
    rejectReasonList: req.body.rejectReasonList,
  });
  request(options)
    .then(function (parsedBody) {
      let dataList = [];
      if (parsedBody.status && parsedBody.data) {
        parsedBody.data.content.forEach(item => {
          let data = {};
          data.alitmAccount = item.alitmAccount;
          data.id = item.id;
          data.status = item.status;
          data.rejectReasonDesc = item.rejectReasonDesc;
          data.auditTime = item.auditTime;
          dataList.push(data);
        });
        res.send({
          msg: parsedBody.msg,
          status: parsedBody.status,
          data: {
            content: dataList,
            totalElements: parsedBody.data.totalElements
          }
        });
        res.end();
      } else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    });
});

/**
 * 商家进入秀客任务管理页任务列表（未通过审核的人数）
 * @param merchantId
 * @param taskId
 */
/*router.post('/api/passes/end/showker/task/count.json', function (req, res, next) {
  let options = apiConfig.getOptions('/task/merchant/end/showker/task/count', req, {
    merchantId: req.session.userData.id,
    taskId: req.body.taskId,
    alitmAccount: req.body.alitmAccount,
    rejectReasonList: req.body.rejectReasonList,
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
});*/

module.exports = router;
