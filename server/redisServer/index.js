const redis = require("redis");
const config = require('../config');
/**
 * 创建redis服务
 * @param port
 * @param host
 * @param db
 * */
const redisClient = redis.createClient(config.redis.port, config.redis.host, {db: config.redis.db});
module.exports = redisClient;
