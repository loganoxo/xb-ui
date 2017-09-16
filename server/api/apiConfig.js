const config = require('../config');
const baseUrl = config.baseUrl;

const postOPtions = function (url,formData) {
  return {
    method: 'POST',
    uri: baseUrl + url,
    formData: formData,
    json: true,
    headers: {}
  }
};

const getOPtions = function (url,qs) {
  return {
    method: 'GET ',
    uri: baseUrl + url,
    qs: qs,
    json: true,
    headers: {}
  }
};
