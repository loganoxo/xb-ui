/**
 * Created by ycb on 2017/7/22.
 */
const log4js = require('log4js');
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'all'
    }
  }
});

const logger = log4js.getLogger('console');
exports.logger = logger;
exports.use = function (app) {
  app.use(log4js.connectLogger(logger, {level: 'auto', format: ':method :url'}));
};
