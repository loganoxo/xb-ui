/**
 * Created by ycb on 2017/7/18.
 */
const api = require('./api');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const redis = require("redis");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
console.log(process.env.NODE_ENV);
/*// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
 app.use(express.static(path.resolve(__dirname, '../dist')));
 // 因为是单页应用 所有请求都走/dist/index.html
 app.get('*', function(req, res) {
 const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
 res.send(html)
 });*/
// 监听8088端口
app.listen(config.port);
console.log('node run success and listen on port %s', config.port);
