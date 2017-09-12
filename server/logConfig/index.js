/**
 * Created by ycb on 2017/7/24.
 */
const path = require('path');
/**
 * 特别注意：如果没有指定环境变量则默认为开发环境
 */
let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();
const getPathName = function (env) {
  switch (env) {
    case 'production':
      return 'node.prod.env';
      break;
    case 'development':
      return 'node.dev.env';
      break;
    case 'testing':
      return 'node.test.env';
      break;
  }
};
const file = path.resolve(__dirname, getPathName(env));
try {
  let config = module.exports = require(file);
  console.log('Load config: [%s] %s', env, file);
} catch (err) {
  console.error('Cannot load config: [%s] %s', env, file);
  throw err;
}
