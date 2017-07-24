/**
 * Created by ycb on 2017/7/20.
 */
const express = require('express');
const config = require('./config');
const logConfig = require('./logConfig');
const request = require('request-promise');
const uid = require('uid-safe');
const querystring = require('querystring');
const redis = require("redis");
const captchapng = require('captchapng');

const router = express.Router();
const baseUrl = config.baseUrl;
const redisClient = redis.createClient(config.redis.port, config.redis.host, {db: config.redis.db});
redisClient.on('ready', function (res) {
  logConfig.logger.info('redis start：redis is ready');
});

redisClient.on('error', function (res) {
  logConfig.logger.info('redis start：redis is error');
});

/**
 * 用户登陆接口
 * @param phone
 * @param passWord
 * @param role
 */
router.post('/api/login.json', (req, res, next) => {
  let nSession = req.cookies.nSession;
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/sign-in',
    formData: {
      phone: req.body.phone,
      passWord: req.body.passWord,
      role: req.body.role
    },
  };
  request(options)
    .then(function (parsedBody) {
      logConfig.logger.info(parsedBody);
      let userData = JSON.parse(parsedBody);
      res.cookie('nSession', uid.sync(18));
      redisClient.hmset('node:xiuba:session:' + nSession, userData.data, function (err, res) {
        if (err) {
          logConfig.logger.info('redis存入用户session失败信息：' + err);
        }
        if (res) {
          logConfig.logger.info('redis存入用户session成功状态：' + res);
        }
        redisClient.end();
      });
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error('登陆接口错误信息：' + err);
      res.end("服务器错误");
    });
});

/**
 * 用户注册
 * @param phone
 * @param pwd
 * @param repwd
 * @param nickName
 * @param smsCode
 * @param role
 */
router.post('/api/sign-up.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/sign-up',
    formData: {
      phone: req.body.phone,
      pwd: req.body.pwd,
      nickName: '',
      smsCode: req.body.smsCode,
      role: req.body.role
    },
  };
  request(options)
    .then(function (parsedBody) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(err);
      res.end("服务器错误");
    });
});

/**
 * 图形验证码接口
 */
router.get("/api/vrcode.json", (req, res, next) => {
  let vrcode = new captchapng(80,30,parseInt(Math.random()*9000+1000));
  vrcode.color(0, 0, 0, 0);
  vrcode.color(251, 119, 21, 255);
  let codeImg = vrcode.getBase64();
  let imgBase64 = new Buffer(codeImg,'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg;charset=UTF-8'
  });
  console.log(imgBase64);
  res.end(imgBase64);
});
module.exports = router;
