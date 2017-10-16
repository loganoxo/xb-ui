/**
 * 注意：（请使用JS严格模式语法）
 */
'use strict';

const express = require('express');
const logConfig = require('../logConfig');
const apiConfig = require('../apiConfig');
const request = require('request-promise');
const captchapng = require('captchapng');
const cryptoConfig = require('../cryptoConfig');
// const cookie = require('cookie-parser');
const router = express.Router();
const secret = 'xiuba';//推荐链接加密密钥

/**
 * 用户登陆
 * @param phone
 * @param passWord
 * @param role
 */
router.post('/api/login.json', (req, res, next) => {
  let options = apiConfig.postOptions('/user/sign-in', req, {
    phone: req.body.phone,
    passWord: req.body.passWord,
    loginIp: req.ip,
    sessionId: req.sessionID
  });
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      let userData = parsedBody.data;
      req.session.regenerate(function (err) {
        if (!err) {
          req.session.userData = userData;
          logConfig.logger.info('User information is stored in redis successfully！');
        } else {
          logConfig.logger.err('User information is stored in redis failed：' + err);
        }
        res.send(parsedBody);
        res.end();
      });
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
 * qq快速登录
 * @param accessToken
 */
router.post('/api/user/qq/sign-in.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/qq/sign-in', req, {
    accessToken: req.body.accessToken,
    sessionId: req.sessionID
  });
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      let userData = parsedBody.data;
      req.session.regenerate(function (err) {
        if (!err) {
          req.session.userData = userData;
          logConfig.logger.info('User information is stored in redis successfully！');
        } else {
          logConfig.logger.err('User information is stored in redis failed：' + err);
        }
        res.send(parsedBody);
        res.end();
      });
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
 * 检测是否第一次动态登陆
 * @param phone
 * @param smsCode
 */
router.post('/api/check-fast-sign-in.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/check-fast-sign-in', req, {
    phone: req.body.phone,
    smsCode: req.body.smsCode,
    loginIp: req.ip,
    sessionId: req.sessionID
  });
  let validateCode = parseInt(req.body.validateCode);
  let time = new Date().getTime();
  let vrCode = req.session.vrCode;
  if (vrCode && validateCode === vrCode.code) {
    if (vrCode.expireTime > time) {
      request(options).then(function (parsedBody) {
        if (parsedBody.status && parsedBody.statusCode === 'login_success') {
          let userData = parsedBody.data;
          req.session.regenerate(function (err) {
            if (!err) {
              req.session.userData = userData;
              logConfig.logger.info('User information is stored in redis successfully！');
            } else {
              logConfig.logger.err('User information is stored in redis failed：' + err);
            }
            res.send(parsedBody);
            res.end();
          });
        } else {
          res.send(parsedBody);
          res.end();
        }
      }).catch(function (err) {
        logConfig.logger.error(req.originalUrl + ':' + err);
        res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
        res.end();
      });
    } else {
      res.json({status: false, msg: "图形验证码过期！"});
      res.end();
    }
  } else {
    res.json({status: false, msg: "图形验证码错误！"});
    res.end();
  }
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
  let options = apiConfig.postOptions('/user/sign-up', req, {
    phone: req.body.phone,
    pwd: req.body.pwd,
    repwd: req.body.repwd,
    nickName: req.body.nickName,
    smsCode: req.body.smsCode,
    role: req.body.role,
    purpose: req.body.purpose
  });
  if (req.body.recommendCode) {
    options.headers.xUserId = cryptoConfig.getDecAse192(req.body.recommendCode, secret);
  }
  let validateCode = parseInt(req.body.validateCode);
  let time = new Date().getTime();
  let vrCode = req.session.vrCode;
  if (vrCode && validateCode === vrCode.code) {
    if (vrCode.expireTime > time) {
      request(options).then(function (parsedBody) {
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(req.originalUrl + ':' + err);
        res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
        res.end();
      });
    } else {
      res.json({status: false, msg: "图形验证码过期！"});
      res.end();
    }
  } else {
    res.json({status: false, msg: "图形验证码错误！"});
    res.end();
  }
});

/**
 * qq快速注册
 * @param accessToken
 */
router.post('/api/user/qq/data-complete.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/qq/data-complete', req, {
    accessToken: req.body.accessToken,
    qqOpenId: req.body.qqOpenId,
    phone: req.body.phone,
    pwd: req.body.pwd,
    smsCode: req.body.smsCode,
    role: req.body.role,
    purpose: req.body.purpose
  });
  if (req.body.recommendCode) {
    options.headers.xUserId = cryptoConfig.getDecAse192(req.body.recommendCode, secret);
  }
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      let userData = parsedBody.data;
      req.session.regenerate(function (err) {
        if (!err) {
          req.session.userData = userData;
          logConfig.logger.info('用户信息存入redis成功！');
        } else {
          logConfig.logger.err('用户信息存入redis失败：' + err);
        }
        res.send(parsedBody);
        res.end();
      });
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
 * 生成图形验证码
 */
router.get("/api/vrcode.json", (req, res, next) => {
  let code = parseInt(Math.random() * 9000 + 1000);
  req.session.vrCode = {
    code: code,
    expireTime: new Date().getTime() + 120 * 1000
  };
  let vrCodeImg = new captchapng(80, 30, code);
  vrCodeImg.color(0, 0, 0, 0);
  vrCodeImg.color(251, 119, 21, 255);
  let vrCodeImgBase64 = new Buffer(vrCodeImg.getBase64(), 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg;charset=UTF-8'
  });
  res.end(vrCodeImgBase64);
});

/**
 * 发送短信验证码
 * @param phone
 * @param purpose 'fast': 快速登录，'reg': 注册
 */
router.post('/api/send-verify-code.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/send-verify-code', req, {
    phone: req.body.phone,
    purpose: req.body.purpose,
  });
  let validateCode = parseInt(req.body.validateCode);
  let time = new Date().getTime();
  let vrCode = req.session.vrCode;
  if (vrCode && validateCode === vrCode.code) {
    if (vrCode.expireTime > time) {
      request(options).then(function (parsedBody) {
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(req.originalUrl + ':' + err);
        res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
        res.end();
      });
    } else {
      res.json({status: false, msg: "图形验证码过期！"});
      res.end();
    }
  } else {
    res.json({status: false, msg: "图形验证码错误！"});
    res.end();
  }
});

/**
 * 用户退出登录
 */
router.post('/api/logged-out.json', (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
      res.end();
    } else {
      res.json({status: true, msg: "退出登陆成功！"});
      res.end();
    }
  })
});

/**
 * 生成推荐链接
 */
router.post("/api/recommend-url.json", (req, res, next) => {
  let userId = String(req.session.userData.id);
  let recommendUrl = 'https://' + req.hostname + '/sel-role?recommendCode=' + cryptoConfig.getEncAse192(userId, secret);
  res.end(recommendUrl);
});

module.exports = router;
