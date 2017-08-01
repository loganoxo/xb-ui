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
const ALY = require("aliyun-sdk");

const router = express.Router();
const baseUrl = config.baseUrl;

const sessionExpireSeconds = 7200;//session过期时间 秒

/**
 * 创建redis服务
 * @param port
 * @param host
 * @param db
 * */
const redisClient = redis.createClient(config.redis.port, config.redis.host, {db: config.redis.db});
const redisSubscribeClient = redis.createClient(config.redis.port, config.redis.host, {db: config.redis.db});

redisClient.on('ready', function (res) {
  logConfig.logger.info('redis start：redis is ready');
});

redisSubscribeClient.on('ready', function (res) {
  //订阅redis消息
  redisSubscribeClient.psubscribe('__keyevent@15__:expired');
  logConfig.logger.info('redis psubscribe end');

  // 监听当接收到redis订阅消息调用对应服务
  redisSubscribeClient.on("pmessage", function (pattern, channel, expiredKey) {
    if (expiredKey.indexOf('node:xiuba:session:') === 0) {
      let backupSessionKey = expiredKey.replace('node:xiuba:session:', 'node:xiuba:backup-session:');
      redisClient.hgetall(backupSessionKey, function (err, object) {
        redisClient.del(backupSessionKey);
        logConfig.logger.info(object);
      });
    }
  });
});

redisClient.on('error', function (res) {
  logConfig.logger.info('redis start：redis is error');
});

/**
 * 从redis中获取session
 */
const getSessionData = function (req, callback) {
  let sessionID = req.sessionID;
  redisClient.expire('node:xiuba:session:' + sessionID, sessionExpireSeconds);
  redisClient.hgetall('node:xiuba:session:' + sessionID, function (err, data) {
    callback(data);
  });
};

/**
 * 存储session到redis
 */
const setSessionData = function (req, data) {
  let sessionID = req.sessionID;

  redisClient.hmset('node:xiuba:session:' + sessionID, data, function (err, res) {
    if (err) {
      logConfig.logger.info('redis存入用户session失败信息：' + err);
      redisClient.end(true);
    }
    if (res) {
      logConfig.logger.info('redis存入用户session成功状态：' + res);
    }
  });
  redisClient.expire('node:xiuba:session:' + sessionID, sessionExpireSeconds);
  redisClient.hmset('node:xiuba:backup-session:' + sessionID, data);
};

/**
 * 合并对象方法
 */
const extend = function (object, data) {
  for (let obj in data) {
    object[obj] = data[obj];
  }
  return object;
};

/**
 * 此方法用于当用户登陆后需要操作图形验证码时
 * 需要将图形验证码合并到session中
 */
const setSessionDataForExists = function (req, data) {
  getSessionData(req, function (result) {
    if (result) {
      setSessionData(req, extend(result, data))
    } else {
      setSessionData(req, data);
    }
  });
};

/**
 * 从redis中删除session
 */
const delSession = function (req) {
  let sessionID = req.sessionID;
  redisClient.del('node:xiuba:session:' + sessionID);
  redisClient.del('node:xiuba:backup-session:' + sessionID);
};

/**
 * 创建阿里云服务
 * @param accessKeyId
 * @param secretAccessKey
 * @param endpoint
 * @param apiVersion
 */
const sts = new ALY.STS({
  accessKeyId: "LTAIIrk65z4rEGeW",
  secretAccessKey: "1l1IUcLy8QWW5VXMg8LhTkLQhbnXv1",
  endpoint: 'https://sts.aliyuncs.com',
  apiVersion: '2015-04-01'
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
        delSession(req);
        req.session.regenerate(function (serr) {
          if (!serr) {
            setSessionData(req, userData);
          }
          res.send(parsedBody);
          res.end();
        });
      }
    })
    .catch(function (err) {
      logConfig.logger.error('登陆接口错误信息：' + err);
      res.end("服务器错误");
    });
});

/**
 * 用户登陆接口
 * @param phone
 * @param passWord
 * @param role
 */
router.post('/api/sign-out.json', (req, res, next) => {
  getSessionData(req, function (data) {
    res.send(data);
    res.end();
  });


  /*  let options = {
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
   logConfig.logger.info(parsedBody);
   let userData = parsedBody.data;*/
  /*
   req.session.destroy(function (serr) {
   if(!serr) {
   redisClient.hgetall('node:xiuba:session:' + req.sessionID, function(err, object) {
   redisClient.del('node:xiuba:session:' + req.sessionID);
   redisClient.del('node:xiuba:backup-session:' + req.sessionID);
   logConfig.logger.info(object);
   });
   }
   });
   */
  /* }
   })
   .catch(function (err) {
   logConfig.logger.error('登陆接口错误信息：' + err);
   res.end("服务器错误");
   });*/
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
  let nSession = req.sessionID;
  // console.log('node:xiuba:session:' + nSession);
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
  getSessionData(req, function (data) {
    if (Number(req.body.validateCode) === Number(data.vrCode)) {
      request(options).then(function (parsedBody) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      }).catch(function (err) {
        logConfig.logger.error(err);
        res.json({status: false, msg: "服务器错误"});
        res.end();
      });
    } else if (!data.vrCode) {
      res.json({status: false, msg: "图形验证码过期"});
      res.end();
    } else {
      res.json({status: false, msg: "图形验证码不符"});
      res.end();
    }
  });
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
    json: true,
  };
  request(options)
    .then(function (parsedBody) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});


/**
 * 实名认证提交认证
 * @param realname 姓名
 * @param idcard  身份证号
 * @param picUrl  身份证正面
 * @param reversePicUrl 身份证反面
 */
router.post('/api/user/identity/saveidentity.json', function (req, res, next) {
  getSessionData(req, function (data) {
    let options = {
      method: 'POST',
      uri: baseUrl + '/user/identity/saveidentity',
      formData: {
        phone: req.body.phone,
        userId: req.body.userId,
        realname: req.body.realname,
        idcard: req.body.idcard,
        picUrl: req.body.picUrl,
        reversePicUrl: req.body.reversePicUrl
      },
      json: true,
    };
    request(options)
      .then(function (parsedBody) {
        logConfig.logger.info(parsedBody);
        res.send(parsedBody);
        res.end();
      })
      .catch(function (err) {
        logConfig.logger.error(err);
        res.json({status: false, msg: "服务器错误"});
        res.end();
      });
  });
});

/**
 * 实名认证初始化
 * @param realName 姓名
 * @param success   成功状态
 * @param processing  审核中
 */
router.post('/api/identity-index.json', function (req, res, next) {
  // redisClient.hgetall(req.sessionID, function (err, object) {
  //   let options = {
  //     method: 'POST',
  //     uri: baseUrl + 'user/identity/index',
  //     json: true,
  //   };
  //   request(options)
  //     .then(function (parsedBody) {
  //       logConfig.logger.info(parsedBody);
  //       res.send(parsedBody);
  //       res.end();
  //     })
  //     .catch(function (err) {
  //       logConfig.logger.error(err);
  //       res.json({status: false, msg: "服务器错误"});
  //       res.end();
  //     });
  // });
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/identity/index',
    formData: {
      userId: req.body.userId
    }
  };
  request(options)
    .then(function (parsedBody) {
      logConfig.logger.info(parsedBody);
      res.send(parsedBody);
      res.end();
    })
    .catch(function (err) {
      logConfig.logger.error(err);
      res.json({status: false, msg: "服务器错误"});
      res.end();
    });
});


/**`
 * 图形验证码接口
 * @param sessionID
 */
router.get("/api/vrcode.json", (req, res, next) => {
  let nSession = req.sessionID;
  logConfig.logger.info('图形验证码session：' + nSession);
  let vrCode = parseInt(Math.random() * 9000 + 1000);
  let vrCodeImg = new captchapng(80, 30, vrCode);
  vrCodeImg.color(0, 0, 0, 0);
  vrCodeImg.color(251, 119, 21, 255);
  let vrCodeImgBase64 = new Buffer(vrCodeImg.getBase64(), 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg;charset=UTF-8'
  });
  res.end(vrCodeImgBase64);
  setSessionDataForExists(req, {vrCode: vrCode});
});

/**
 * 检测是否第一次动态登陆
 * @param phone
 * @param smsCode
 */
router.post('/api/check-fast-sign-in.json', function (req, res, next) {
  let nSession = req.sessionID;
  // console.log('node:xiuba:session:' + nSession);
  let options = {
    method: 'POST',
    uri: baseUrl + '/user/check-fast-sign-in',
    formData: {
      phone: req.body.phone,
      smsCode: req.body.smsCode,
    },
  };
  getSessionData(req, function (data) {
    if (data && data.vrCode) {
      if (Number(req.body.validateCode) === Number(data.vrCode)) {
        request(options).then(function (parsedBody) {
          logConfig.logger.info(parsedBody);
          res.send(parsedBody);
          res.end();
        }).catch(function (err) {
          logConfig.logger.error(err);
          res.json({status: false, msg: "服务器错误"});
          res.end();
        });
      } else if (!data.vrCode) {
        res.json({status: false, msg: "图片验证码过期"});
        res.end();
      } else {
        res.json({status: false, msg: "图片验证码不符"});
        res.end();
      }
    } else {
      res.json({status: false, msg: "图片验证码过期"});
      res.end();
    }
  });
  redisClient.get('node:xiuba:session:' + nSession, function (err, keys) {
    logConfig.logger.info(keys);
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
  router.post("/aip/task-create.json", function (req, res, next) {
    let options = {
      method: 'POST',
      uri: baseUrl + '/task/create',
      formData: {
        taskType: req.body.taskType,
        taskDaysDuration: req.body.taskDaysDuration,
        onlyShowForQualification: req.body.onlyShowForQualification,
        refuseOldShowker: req.body.refuseOldShowker,
        taskName: req.body.taskName,
        itemType: req.body.itemType,
        taskMainImage: req.body.taskMainImage,
        itemUrl: req.body.itemUrl,
        taskCount: req.body.taskCount,
        itemPrice: req.body.itemPrice,
        pinkage: req.body.pinkage,
        itemDescription: req.body.itemDescription,
        userId: req.body.userId,
        paymentMethod: req.body.paymentMethod,
        taskDetail: req.body.taskDetail
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
        res.json({status: false, msg: "服务器错误"});
        res.end();
      });
  })
});

module.exports = router;
