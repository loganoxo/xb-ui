const crypto = require('crypto');

/**
 * aes192加密模块
 * @param str 要加密的字符串
 * @param secret 要使用的加密密钥(要记住,解密的时候需要用到此密钥)
 * @retrun 加密后的字符串
 */
const getEncAse192 = function (str, secret) {
  let cipher = crypto.createCipher("aes192", secret);
  let enc = cipher.update(str, "utf8", "hex");
  enc += cipher.final("hex");
  return enc;
};

/**
 * aes192解密模块
 * @param str 要解密的字符串
 * @param secret 要使用的解密密钥(要和加密时密钥对应,不然无法解密)
 * @retrun 解密后的字符串
 */
const getDecAse192 = function (str, secret) {
  let decipher = crypto.createDecipher("aes192", secret);
  let dec = decipher.update(str, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};

module.exports = {getEncAse192, getDecAse192};
