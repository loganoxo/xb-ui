/**
 * Created by ycb on 2017/7/24.
 */
const path = require('path');
/**
 * 特别注意：如果没有指定环境变量则默认为生产环境
 */
let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();
const file = path.resolve(__dirname, env === 'production' ? 'log.prod.env' : 'log.dev.env');
try {
  let config = module.exports = require(file);
  console.log('Load config: [%s] %s', env, file);
} catch (err) {
  console.error('Cannot load config: [%s] %s', env, file);
  throw err;
}
