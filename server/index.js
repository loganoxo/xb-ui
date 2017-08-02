/**
 * Created by ycb on 2017/7/18.
 */
const config = require('./config');
const logConfig = require('./logConfig');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();
logConfig.use(app);

const redisOptions = {
  host: config.redis.host,
  port: config.redis.port,
  prefix: "node:xiuba:session:",
  db: config.redis.db,
  ttl: 3600
};

app.use(session({
  store: new RedisStore(redisOptions),
  name: 'sid',
  secret: 'xiuba love you 2017!',
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(require('./api'));

logConfig.logger.info('当前node环境变量为：' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  // 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
  app.use(express.static(path.resolve(__dirname, '../dist')));
  // 因为是单页应用 所有请求都走/dist/index.html
  app.get('*', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html)
  });
}

// 监听服务端口
app.listen(config.port);
logConfig.logger.info('node run success and listen on port %s', config.port);
