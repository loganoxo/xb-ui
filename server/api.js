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
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/sign-in',
    formData: {
      phone: req.body.phone,
      passWord: req.body.passWord,
    },
  };
  request(options)
    .then(function (parsedBody) {
      logConfig.logger.info(parsedBody);
      let userData = JSON.parse(parsedBody);
      let userUid = uid.sync(18);
      res.cookie('nSession', userUid);
      redisClient.hmset('node:xiuba:session:' + userUid, userData.data, function (err, res) {
        if (err) {
          logConfig.logger.info('redis存入用户session失败信息：' + err);
          redisClient.end(true);
        }
        if (res) {
          logConfig.logger.info('redis存入用户session成功状态：' + res);
        }
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
  let nSession = req.cookies.nSession;
  nSession = nSession.replace("s:", "");
  console.log('node:xiuba:session:' + nSession);
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/sign-up',
    formData: {
      phone: req.body.phone,
      pwd: req.body.pwd,
      repwd:req.body.repwd,
      nickName:req.body.nickName,
      smsCode: req.body.smsCode,
      role: req.body.role,
    },
  };
  redisClient.get('node:xiuba:session:' + nSession, function (err, keys) {
    console.log(keys);
    if(Number(req.body.validateCode) === Number(keys)){
      request(options).then(function (parsedBody) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(err);
        res.json({status:false, msg:"服务器错误"});
        res.end();
      });
    }else if(!keys){
      res.json({status:false, msg:"图形验证码过期"});
      res.end();
    }else {
      res.json({status:false, msg:"图形验证码不符"});
      res.end();
    }
  })

});

/**
 * 发送验证码
 * @param phone
 * @param purpose 'fast': 快速登录，'reg': 注册
 */
router.post('/api/send-verify-code.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/send-verify-code',
    formData: {
      phone: req.body.phone,
      purpose: req.body.purpose,
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
      res.json({status:false, msg:"服务器错误"});
      res.end();
    });
});

/**
 * 图形验证码接口
 */
router.get("/api/vrcode.json", (req, res, next) => {
  let nSession = req.cookies.nSession;
  if (nSession) {
    nSession = nSession.replace("s:", "");
  } else {
    logConfig.logger.info('获取图形验证码session失败');
  }
  logConfig.logger.info('图形验证码session：' + nSession);
  let number = parseInt(Math.random() * 9000 + 1000);
  let vrcode = new captchapng(80, 30, number);
  vrcode.color(0, 0, 0, 0);
  vrcode.color(251, 119, 21, 255);
  let codeImg = vrcode.getBase64();
  let imgBase64 = new Buffer(codeImg, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg;charset=UTF-8'
  });
  res.end(imgBase64);
  redisClient.set('node:xiuba:session:' + nSession, number, function (err, res) {
    if (err) {
      logConfig.logger.info('redis存入用户vcode失败信息：' + err);
      redisClient.end(true);
    }
    if (res) {
      logConfig.logger.info('redis存入用户vcode成功状态：' + res);
    }
  });
});

/**
 * 检测是否第一次动态登陆
 */
router.post('/api/check-fast-sign-in.json', function (req, res, next) {
  let nSession = req.cookies.nSession;
  nSession = nSession.replace("s:", "");
  console.log('node:xiuba:session:' + nSession);
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/check-fast-sign-in',
    formData: {
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
  };
  redisClient.get('node:xiuba:session:' + nSession, function (err, keys) {
    console.log(keys);
    if(Number(req.body.validateCode) === Number(keys)){
      request(options).then(function (parsedBody) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(err);
        res.json({status:false, msg:"服务器错误"});
        res.end();
      });
    }else if(!keys){
      res.json({status:false, msg:"验证码过期"});
      res.end();
    }else {
      res.json({status:false, msg:"验证码不符"});
      res.end();
    }
  });


});

module.exports = router;
