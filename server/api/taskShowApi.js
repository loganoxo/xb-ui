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
 * 首页导航
 */
router.post('/api/task/item/catalog/main.json', (req, res, next) => {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/item/catalog/main',
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
 * 首页活动任务展示
 */
router.post('/api/task/index/newest.json', (req, res, next) => {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/index/newest',
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
 * 首页左上角列表接口
 */
router.post('/api/task/showker-newest.json', (req, res, next) => {
  let options = {
    method: 'GET',
    uri: baseUrl + '/task/showker/newest',
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
 * 分类页面请求
 * @param id  大类id
 */
router.post('/api/task/get/item/catalog/parent.json', (req, res, next) => {
  let options =
    {
      method: 'GET',
      uri: baseUrl + '/task/item/catalog/parent/' + req.body.id,
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
 * 分类页面小类内容
 * @param id  大类id
 */
router.post('/api/task/item/catalog/child.json', (req, res, next) => {
  let options =
    {
      method: 'GET',
      uri: baseUrl + '/task/item/catalog/' + req.body.cate + '/child',
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
 * 分类页面任务详情请求
 *@param pageIndex: 第几页，
 *@param pageSize: 一页几个，
 *@param taskName: 搜索关键词，
 *@param taskTypes: 搜索关键词，
 *@param itemCatalogs: 分类，
 */
router.post('/api/search/task/s.json', (req, res, next) => {
  let options =
    {
      method: 'POST',
      uri: baseUrl + '/search/task/s',
      json: true,
      formData: {
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize,
        taskName: req.body.taskName,
        taskTypes: req.body.taskTypes,
        itemCatalogs: req.body.itemCatalogs,
        sortField: req.body.sortField,
        sortOrder: req.body.sortOrder
      },
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
 * 详情页请求
 * @param taskId 商品ID
 */
router.post('/api/task/detail.json', (req, res, next) => {
  let options =  {
    method: 'GET',
    uri: baseUrl + '/task/detail/' + req.body.taskId,
    json: true,
  };
  if(req.session.userData){
    options.qs =  {
      userId: req.session.userData.id,
      role: req.session.userData.role,
    }
  }
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
 * 详情页秀客报告
 * @param taskId
 * @param pageIndex
 */
router.post('/api/task/trial/report.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + "/task/trial/reports/"+ req.body.taskId + "/" + req.body.pageIndex,
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
 * 详情页已审批秀客列表
 * @param taskId
 * @param pageIndex
 */
router.post('/api/task/success.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + "/task/success/"+ req.body.taskId + "/" + req.body.pageIndex,
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
 * 商家查看秀客买家秀全文
 * @param id
 * @param showkerId
 */
router.post('/api/task/showker/trialReport.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + "/task/showker/report/get",
    json: true,
    qs: {
      id: req.body.id ,
      showkerId: req.body.showkerId
    },
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
 * 获取活动日志接口
 * @param id
 * @param showkerId
 */
router.post('/api/task-log.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + "/task/log/" + req.body.taskId + "/" + req.session.userData.id ,
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
 * 获取活动日志秀客任务进程接口
 * @param id
 * @param showkerId
 */
router.post('/api/task-detail-log.json', function (req, res, next) {
  let options = {
    method: 'GET',
    uri: baseUrl + "/task/log/detail/" + req.body.showkerTaskId + "/" + req.session.userData.id ,
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

module.exports = router;
