/**
 * Created by ycb on 2017/7/20.
 */
const express = require('express');
const config = require('./config');
const logConfig = require('./logConfig');
const request = require('request-promise');
const querystring = require('querystring');
const captchapng = require('captchapng');
const redisClient = require("./redisServer");
const sts = require('./aliServer');

const router = express.Router();
const baseUrl = config.baseUrl;

/**
 * 订阅redis服务消息
 * */
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
 * 获取阿里云临时token接口
 * @param Action
 * @param RoleArn
 * @param RoleSessionName
 */
router.get('/api/ali-token.json', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-METHOD', 'GET');
  sts.assumeRole({
    Action: 'AssumeRole',
    RoleArn: 'acs:ram::1787158783531067:role/aliyunosstokengeneratorrole',
    //设置Token的附加Policy，可以在获取Token时，通过额外设置一个Policy进一步减小Token的权限；
    //Policy: '{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}',
    //设置Token有效期，可选参数，默认3600秒；
    //DurationSeconds: 3600,
    RoleSessionName: 'RoleSessionName'
  }, function (err, parsedBody) {
    if (err) {
      res.send(err);
    }
    if (parsedBody) {
      res.send(parsedBody.Credentials);
    }
    res.end();
  });
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
    json: true,
  };
  request(options)
    .then(function (parsedBody) {
      if (parsedBody.status) {
        let userData = parsedBody.data;
        req.session.regenerate(function (serr) {
          if (!serr) {
            req.session.userData = userData
          }
          res.send(parsedBody);
          res.end();
        });
      }else{
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error('登陆接口错误信息：' + err);
      res.end("服务器错误");
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
  };
  if (Number(req.body.validateCode) === Number(req.session.vrCode)) {
    request(options).then(function (parsedBody) {
      if (parsedBody.status) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }else {
        res.send(parsedBody);
        res.end();
      }
    }).catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
  } else {
    res.json({status: false, msg: "图片验证码过期"});
    res.end();
  }
});

/**
 * 用户登出接口
 */
router.post('/api/sign-out.json', (req, res, next) => {
  // delete req.session;
});

/**
 * 用户注册接口
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
    },
    json: true,
  };
  if (Number(req.body.validateCode) === req.session.vrCode) {
    request(options).then(function (parsedBody) {
      if (parsedBody.status) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }else {
        res.send(parsedBody);
        res.end();
      }
    }).catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
  } else {
    res.json({status: false, msg: "图形验证码过期"});
    res.end();
  }
});

/**
 * 生成图形验证码接口
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
 * 发送手机验证码接口
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
  if (Number(req.body.validateCode) === Number(req.session.vrCode)) {
    request(options).then(function (parsedBody) {
      if (parsedBody.status) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }else {
        res.send(parsedBody);
        res.end();
      }
    }).catch(function (err) {
        logConfig.logger.error(err);
        res.json({status: false, msg: "服务器错误"});
        res.end();
    });
  }else {
    res.json({status: false, msg: "图片验证码输入有误"});
    res.end();
  }

});

/**
 * 实名认证提交认证
 * @param realname 姓名
 * @param idcard  身份证号
 * @param picUrl  身份证正面
 * @param reversePicUrl 身份证反面
 */
router.post('/api/user/identity/saveidentity.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/identity/saveidentity',
    formData: {
      phone: req.session.userData.phone,
      userId: req.session.userData.id,
      realname: req.body.realname,
      idcard: req.body.idcard,
      picUrl: req.body.picUrl,
      reversePicUrl: req.body.reversePicUrl
    },
    json: true,
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
  });
});

/**
 * 实名认证初始化
 * @param realName 姓名
 * @param success   成功状态
 * @param processing  审核中
 */
router.post('/api/identity-index.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/identity/index',
    formData: {
      userId: req.session.userData.id
    }
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});

/**
 * 获取商品类型接口
 * @param phone
 * @param smsCode
 */
router.post("/api/item-catalog.json", function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/task/get/item/catalog',
  };
  request(options)
    .then(function (parsedBody) {
      if (parsedBody.status) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }else {
        res.send(parsedBody);
        res.end();
      }
  }).catch(function (err) {
    logConfig.logger.error(err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  })
});

/**
 * 任务发布接口
 * @param taskType
 * @param taskDaysDuration
 * @param onlyShowForQualification
 * @param refuseOldShowker
 * @param taskName
 * @param itemType
 * @param taskMainImage
 * @param itemUrl
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
      userId:182,
      taskType: req.body.taskType,
      taskDaysDuration: req.body.taskDaysDuration,
      onlyShowForQualification: req.body.onlyShowForQualification,
      refuseOldShowker: req.body.refuseOldShowker,
      taskName: req.body.taskName,
      "itemCatalog.id":req.body.itemType,
      taskMainImage: req.body.taskMainImage,
      itemUrl: req.body.itemUrl,
      taskCount: req.body.taskCount,
      itemPrice: req.body.itemPrice,
      pinkage: req.body.pinkage,
      itemDescription: req.body.itemDescription,
      paymentMethod: req.body.paymentMethod,
      taskDetail: req.body.taskDetail
    },
    json: true,
  };
  request(options)
    .then(function (parsedBody) {
      if (parsedBody.status) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }else {
        res.send(parsedBody);
        res.end();
      }
    })
    .catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});
/**
 * 绑定旺旺号
 * @param userId
 * @param alitm_account
 * @param picUrl
 */
router.post('/api/alitm-bunding.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/alitm-bunding',
    formData: {
      userId: req.session.userData.id,
      alitmAccount: req.body.alitmAccount,
      picUrl: req.body.picUrl
    }
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
    logConfig.logger.error(err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});

/**
 * 获取旺旺信息列表
 * @param userId
 */
router.post('/api/get-alitm-info-list.json', function (req, res, next) {
  let  options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/get-alitm-info-list',
    formData: {
      userId: req.session.userData.id,
    }
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
    logConfig.logger.error(err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});

/**
 * 解绑旺旺号
 * @param userId
 */
router.post('/api/alitm-unBunding.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/alitm-unBunding',
    formData: {
      id: req.body.id,
    }
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
    logConfig.logger.error(err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});

/**
 * 修改旺旺号
 * @param userId
 */
router.post('/api/alitm/resubmit.json', function (req, res, next) {
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/alitm/resubmit',
    formData: {
      id:  req.body.id,
      alitmAccount: req.body.alitmAccount,
      picUrl: req.body.picUrl
    }
  };
  request(options).then(function (parsedBody) {
    if (parsedBody.status) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    }else {
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
    logConfig.logger.error(err);
    res.json({status: false, msg: "服务器错误"});
    res.end();
  });
});

module.exports = router;
