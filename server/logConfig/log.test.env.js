const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'testing.log'
    }
  },
  categories: {
    default: {
      appenders: ['testing'],
      level: 'info'
    }
  }
});
const logger = log4js.getLogger('testing');
module.exports.logger = logger;
module.exports.use = function (app) {
  app.use(log4js.connectLogger(logger, {level: 'auto', format: ':method :url'}));
};
