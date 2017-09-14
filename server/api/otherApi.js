/**
 * 注意：（请使用JS严格模式语法）
 */
'use strict';

const express = require('express');
const logConfig = require('../logConfig');
const redisClient = require("../redisServer");
const sts = require('../aliServer');

const router = express.Router();

/**
 * 订阅redis服务消息
 */
redisClient.on('ready', function (res) {
  logConfig.logger.info('redis start：redis is ready');

  //开始订阅redis消息
  redisClient.psubscribe('__keyevent@15__:expired');

  logConfig.logger.info('redis psubscribe end');

  // 监听当接收到redis订阅消息调用对应服务
  redisClient.on("pmessage", function (pattern, channel, expiredKey) {
    //此处处理当session过期时的逻辑

  });
});

redisClient.on('error', function (res) {
  logConfig.logger.info('redis start：redis is error');
});

/**
 * 获取阿里云临时token
 * @param Action
 * @param RoleArn
 * @param RoleSessionName
 */
router.get('/api/ali-token.json', (req, res, next) => {
  var start = new Date().getTime();
  logConfig.logger.info('ali-token-start:'+ start);
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-METHOD', 'GET');
  res.setHeader("Content-Type", "application/json");
  sts.assumeRole({
    Action: 'AssumeRole',
    RoleArn: 'acs:ram::1787158783531067:role/aliyunosstokengeneratorrole',
    //设置Token的附加Policy，可以在获取Token时，通过额外设置一个Policy进一步减小Token的权限；
    //Policy: '{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}',
    //设置Token有效期，可选参数，默认3600秒；
    //DurationSeconds: 3600,
    RoleSessionName: 'RoleSessionName'
  }, function (err, parsedBody) {
    var end =  new Date().getTime();
    logConfig.logger.info('ali-token-end:'+ (end - start));
    if (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
    }
    if (parsedBody) {
      res.send(parsedBody.Credentials);
    }
    res.end();
    var endFinish = new Date().getTime();
    logConfig.logger.info('ali-token-endFinish:'+ (endFinish - start));
  });
});

module.exports = router;
