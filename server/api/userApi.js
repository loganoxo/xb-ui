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
 * 获取用户交易列表
 * @param pageable
 * @param userId
 * @param createTimeStart
 * @param createTimeEnd
 * @param accountChangeType
 * @param taskSerial
 * @param page
 * @param size
 */
router.post('/api/get-trad-list.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/get-trad-list',req,{
    userId: req.session.userData.id,
    tradTimeStart: req.body.tradTimeStart,
    tradTimeEnd: req.body.tradTimeEnd,
    accountChangeTypeStr: req.body.accountChangeTypeStr,
    reversePicUrl: req.body.reversePicUrl,
    taskSerial: req.body.taskSerial,
    page: req.body.page,
    size: req.body.size
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取银行卡信息
 */
router.post('/api/get-bank-card-information.json', function (req, res, next) {
  let options = apiConfig.getOptions('/user/account/getBankCardByUid/'+ req.session.userData.id,req);
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});


/**
 * 判断是否可以发布活动
 */
router.post('/api/get-check-Member-for-task.json', function (req, res, next) {
  let options= apiConfig.getOptions('/task/checkMemberForTask/' + req.session.userData.id,req);
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});


/**
 * 获取会员活动信息
 */
router.post('/api/get-user-member-all.json', function (req, res, next) {
  let options = apiConfig.getOptions('/user/member/all',req);
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});

/**
 * 获取会员等级详细信息
 */
router.post('/api/get-user-member-level-info.json', function (req, res, next) {
  let options = apiConfig.getOptions( '/user/member/get/level/' + req.body.level,req);
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});


/**
 * 充值会员
 */
router.post('/api/user-member-purchase.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/member/purchase/' + req.session.userData.id +'/'+ req.body.memberId,req,{
    payPwd:req.body.payPwd
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});

/**
 * 获取用户截图
 */
router.post('/api/get-user-screen-shot.json', function (req, res, next) {
  let options =apiConfig.getOptions( '/task/showker/getScreenshot/'+req.body.id,req);
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器超时，请稍后再试！"});
    res.end();
  })
});

/**
 * 获取用户、账户、旺旺账号
 * @param userId
 */
router.post('/api/get-user-account.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/get-user-account',req,{
    userId: req.session.userData.id,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的密码修改支付密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/find-pwd-by-origin.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/reset-pwd-by-originPwd',req,{
    userId: req.session.userData.id,
    oldPwd: req.body.oldPwd,
    newPwd: req.body.newPwd,
    repwd: req.body.repwd
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取交易明细列表
 * @param userId
 * @param tradId
 */
router.post("/api/get-trad-detail-list.json", function (req, res, next) {
  let options = apiConfig.postOptions( '/user/account/get-trad-detail-list',req,{
    userId: req.session.userData.id,
    tradId: req.body.tradId
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 添加银行卡
 * @param accountName
 * @param bankName
 * @param bankNo
 * @param bankPart
 * @param phoneNo
 * @param smsCode
 * @param uid
 */
router.post('/api/add-bank-card.json', function (req, res, next) {
  let options = apiConfig.postOptions( '/user/account/add_bank_card',req,{
    uid: req.session.userData.id,
    accountName: req.body.accountName,
    bankName: req.body.bankName,
    bankNo: req.body.bankNo,
    bankPart: req.body.bankPart,
    smsCode: req.body.smsCode,
  });
  let validateCode = parseInt(req.body.validateCode);
  let time = new Date().getTime();
  let vrCode = req.session.vrCode;
  if (validateCode === vrCode.code) {
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
 * 申请提现
 * @param fee
 * @param platform
 * @param uid
 * @param bankCardNum
 * @param payPwd
 * @return
 */
router.post('/api/with-draw-apply.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/with_draw_apply',req,{
    uid: req.session.userData.id,
    fee: req.body.fee,
    bankCardNum: req.body.bankCardNum,
    payPwd: req.body.payPwd
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 显示提现列表
 * @param pageable
 * @param userId
 * @param serialNumber
 * @param applyTimeStart
 * @param applyTimeEnd
 * @param state
 * @return
 */
router.post('/api/get-with-draw-list.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/get_with_draw_list',req,{
    userId: req.session.userData.id,
    serialNumber: req.body.serialNumber,
    applyTimeStart: req.body.applyTimeStart,
    applyTimeEnd: req.body.applyTimeEnd,
    state: req.body.state,
    page: req.body.page,
    size: req.body.size
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 获取某个活动的任务担保金返款列表
 * @param taskId
 * @return
 */
router.post('/api/get-deposit-return-list.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/get_deposit_return_list',req,{
    taskId: req.body.taskId
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});


/**
 * 修改用户头像
 * @param userId
 * @param picStr
 */
router.post('/api/user/edit-portrait-pic.json', function (req, res, next) {
  let options = apiConfig.postOptions( '/user/edit_portrait_pic',req,{
    uid: req.session.userData.id,
    picStr: req.body.picStr
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 余额充值
 * @param uid
 * @param finalFee
 * @param orderPlatform
 * @param payChannel
 */
router.post('/api/balance-order-create.json', function (req, res, next) {
  let options = apiConfig.postOptions('/order/balance-order-create',req,{
    uid: req.session.userData.id,
    finalFee: req.body.finalFee,
    orderPlatform: req.body.orderPlatform,
    payChannel: req.body.payChannel
  });

  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的支付密码修改支付密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/user/account/reset-pay-pwd-by-originPwd.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/reset-pay-pwd-by-originPwd',req,{
    userId: req.session.userData.id,
    oldPwd: req.body.oldPwd,
    newPwd: req.body.newPwd,
    repwd: req.body.repwd,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过上一次的登录密码修改登录密码
 * @param userId
 * @param oldPwd
 * @param newPwd
 * @param repwd
 */
router.post('/api/user/account/reset-login-pwd-by-originPwd.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/reset-login-pwd-by-originPwd',req,{
    userId: req.session.userData.id,
    oldPwd: req.body.oldPwd,
    newPwd: req.body.newPwd,
    repwd: req.body.repwd,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过手机短信验证码重置登录密码
 * @param userId
 * @param pwd
 * @param repwd
 * @return
 */
router.post('/api/user/account/reset-login-pwd-by-smscode.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/reset-login-pwd-by-smscode',req,{
    userId: req.session.userData.id,
    pwd: req.body.pwd,
    repwd: req.body.repwd,
    phone: req.body.phone,
    smsCode: req.body.smsCode,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过手机短信验证码重置支付密码
 * @param userId
 * @param pwd
 * @param repwd
 */
router.post('/api/user/account/reset-pay-pwd-by-smscode.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/reset-pay-pwd-by-smscode',req,{
    userId: req.session.userData.id,
    pwd: req.body.pwd,
    repwd: req.body.repwd,
    phone: req.body.phone,
    smsCode: req.body.smsCode,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 验证重置密码短信
 * @param phone
 * @param smsCode
 */
router.post('/api/user/account/check-phone-message-before-reset-pwd.json', function (req, res, next) {
  let options = apiConfig.postOptions('/user/account/check-phone-message-before-reset-pwd',req,{
    uid: req.session.userData.id,
    phone: req.body.phone,
    smsCode: req.body.smsCode,
  });
  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

/**
 * 通过旺旺名获取信息
 * @param phone
 * @param smsCode
 */
router.post('/api/user/alitm/getAlitmByAccount.json', function (req, res, next) {
  let options = apiConfig.getOptions('/user/alitm/getAlitmByAccount',req,{
    account:req.body.account
  });
  request(options).then(function (parsedBody) {
    const tbLevelImagesUrl = [
      {
        value: 1,
        text: 'https://img.alicdn.com/newrank/b_red_1.gif',
        label: '1心'
      },
      {
        value: 2,
        text: 'https://img.alicdn.com/newrank/b_red_2.gif',
        label: '2心'
      },
      {
        value: 3,
        text: 'https://img.alicdn.com/newrank/b_red_3.gif',
        label: '3心'
      },
      {
        value: 4,
        text: 'https://img.alicdn.com/newrank/b_red_4.gif',
        label: '4心'
      },
      {
        value: 5,
        text: 'https://img.alicdn.com/newrank/b_red_5.gif',
        label: '5心'
      },
      {
        value: 6,
        text: 'https://img.alicdn.com/newrank/b_blue_1.gif',
        label: '1钻'
      },
      {
        value: 7,
        text: 'https://img.alicdn.com/newrank/b_blue_2.gif',
        label: '2钻'
      },
      {
        value: 8,
        text: 'https://img.alicdn.com/newrank/b_blue_3.gif',
        label: '3钻'
      },
      {
        value: 9,
        text: 'https://img.alicdn.com/newrank/b_blue_4.gif',
        label: '4钻'
      },
      {
        value: 10,
        text: 'https://img.alicdn.com/newrank/b_blue_5.gif',
        label: '5钻'
      },
      {
        value: 11,
        text: 'https://img.alicdn.com/newrank/s_crown_1.gif',
        label: '1皇冠'
      },
      {
        value: 12,
        text: 'https://img.alicdn.com/newrank/s_crown_2.gif',
        label: '2皇冠'
      },
      {
        value: 13,
        text: 'https://img.alicdn.com/newrank/s_crown_3.gif',
        label: '3皇冠'
      },
      {
        value: 14,
        text: 'https://img.alicdn.com/newrank/s_crown_4.gif',
        label: '4皇冠'
      },
      {
        value: 15,
        text: 'https://img.alicdn.com/newrank/s_crown_5.gif',
        label: '5皇冠'
      },
    ];
    const tqzList = [
      {
        value: 1,
        label: '0-199'
      },
      {
        value: 2,
        label: '200-399'
      },
      {
        value: 3,
        label: '400-599'
      },
      {
        value: 4,
        label: '600-799'
      },
      {
        value: 5,
        label: '800-999'
      },
      {
        value: 6,
        label: '1000-1999'
      },
      {
        value: 7,
        label: '2000-2499'
      },
      {
        value: 8,
        label: '2500以上'
      },
    ];
    let data ={};
    if(parsedBody.status && parsedBody.data){
      data.creditLevelUrl = parsedBody.data.creditLevel ? tbLevelImagesUrl[parsedBody.data.creditLevel - 1].text : null;
      data.tqzNum = parsedBody.data.tqz ? tqzList[parsedBody.data.tqz - 1].label : null;
      res.send({
        msg: parsedBody.msg,
        status: parsedBody.status,
        data: data
      });
      res.end();
    }else{
      res.send(parsedBody);
      res.end();
    }
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});


/**
 * 获取邀请列表
 * @param pageable
 * @param inviterId
 */
router.post('/api/user/reward/getRecommendPage.json', function (req, res, next) {
  let options = apiConfig.getOptions('/user/reward/getRecommendPage/' + req.session.userData.id,req,{
    page: req.body.page,
    size: req.body.size,
  });

  request(options).then(function (parsedBody) {
    res.send(parsedBody);
    res.end();
  }).catch(function (err) {
    logConfig.logger.error(req.originalUrl + ':' + err);
    res.json({status: false, msg: "服务器请求超时，请稍后在试！"});
    res.end();
  });
});

module.exports = router;
