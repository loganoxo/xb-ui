const config = require('../config');
const baseUrl = config.baseUrl;

const postOptions = function (url, req, formData = {}) {
  return {
    method: 'POST',
    uri: baseUrl + url,
    formData: formData,
    json: true,
    headers: {
      xAppUserPhone: req.session.userInfo ? req.session.userInfo.phone : null,
      xForwardedFor: req.realIp ? req.realIp : null,
      xUserId: req.session.userInfo ? req.session.userInfo.id : null,
    }
  }
};

const getOptions = function (url, req, qs = {}) {
  return {
    method: 'GET',
    uri: baseUrl + url,
    qs: qs,
    json: true,
    headers: {
      xAppUserPhone: req.session.userInfo ? req.session.userInfo.phone : null,
      xForwardedFor: req.realIp ? req.realIp : null,
      xUserId: req.session.userInfo ? req.session.userInfo.id : null,
    }
  }
};

module.exports = {postOptions, getOptions};
