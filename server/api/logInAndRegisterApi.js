const express = require('express');
const config = require('../config');
const logConfig = require('../logConfig');
const request = require('request-promise');
const captchapng = require('captchapng');

const router = express.Router();
const baseUrl = config.baseUrl;

/**
 * 用户登陆
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
    json: true,
  };
  request(options)
    .then(function (parsedBody) {
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
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 检测是否第一次动态登陆
 * @param phone
 * @param smsCode
 */
router.post('/api/check-fast-sign-in.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/check-fast-sign-in',
    formData: {
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
    json: true,
  };
  let validateCode = parseInt(req.body.validateCode);
  if (validateCode === req.session.vrCode) {
    request(options).then(function (parsedBody) {
      if (parsedBody.status && parsedBody.statusCode === 200) {
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
    }).catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
  } else {
    res.json({status: false, msg: "图片验证码过期"});
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
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/sign-up',
    formData: {
      phone: req.body.phone,
      pwd: req.body.pwd,
      repwd: req.body.repwd,
      nickName: req.body.nickName,
      smsCode: req.body.smsCode,
      role: req.body.role,
      purpose: req.body.purpose
    },
    json: true,
  };
  let validateCode = parseInt(req.body.validateCode);
  if (validateCode === req.session.vrCode) {
    request(options).then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    }).catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
  } else {
    res.json({status: false, msg: "图形验证码过期"});
    res.end();
  }
});

/**
 * 生成图形验证码
 */
router.get("/api/vrcode.json", (req, res, next) => {
  let vrCode = parseInt(Math.random() * 9000 + 1000);
  req.session.vrCode = vrCode;
  let vrCodeImg = new captchapng(80, 30, vrCode);
  vrCodeImg.color(0, 0, 0, 0);
  vrCodeImg.color(251, 119, 21, 255);
  let vrCodeImgBase64 = new Buffer(vrCodeImg.getBase64(), 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg;charset=UTF-8'
  });
  res.end(vrCodeImgBase64);
});

/**
 * 发送手机验证码
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
    json: true,
  };
  let validateCode = parseInt(req.body.validateCode);
  if (validateCode === req.session.vrCode) {
    request(options).then(function (parsedBody) {
      res.send(parsedBody);
      res.end();
    }).catch(function (err) {
      logConfig.logger.error(req.originalUrl + ':' + err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
  } else {
    res.json({status: false, msg: "图片验证码输入有误"});
    res.end();
  }

});

/**
 * 用户退出登录
 */
router.post('/api/sign-out.json', (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    } else {
      res.json({status: true, msg: "退出登陆成功！"});
      res.end();
    }
  })
});

module.exports = router;
