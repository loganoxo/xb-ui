/**
 * Created by ycb on 2017/7/20.
 */
const express = require('express');
const config = require('./config');
const request = require('request-promise');
const uid = require('uid-safe');
// const querystring = require('querystring');
const redis = require("redis");
const router = express.Router();
const baseUrl = config.baseUrl;
const redisClient = redis.createClient(config.redis.port, config.redis.host, {db: config.redis.db});

redisClient.on('ready', function (res) {
  console.log('redis start:redis is ready');
});

redisClient.on('error', function (res) {
  console.log('redis start:redis is error');
});
router.post('/api/login', function (req, res, next) {
  let nSession = req.cookies.nSession;
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/sign-in.json',
    formData: {
      phone: req.body.phone,
      passWord: req.body.passWord,
      role: req.body.role
    },
  };
  request(options)
    .then(function (parsedBody) {
      let userData = JSON.parse(parsedBody);
      res.cookie('nSession', uid.sync(18));
      redisClient.hmset('node:xiuba:session:' + nSession, userData.data, function (err, res) {
        if (err) {
          console.log('redis存入用户session失败信息：' + err);
        }
        if (res) {
          console.log('redis存入用户session成功状态：' + res);
        }
        redisClient.end();
      });
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      res.json(err);
      res.end();
    });
});
module.exports = router;
