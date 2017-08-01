const ALY = require("aliyun-sdk");

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
module.exports = sts;
