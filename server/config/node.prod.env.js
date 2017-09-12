/**
 * Created by ycb on 2017/7/22.
 */
const port = normalizePort(process.env.PORT || '3000');
module.exports = {
  port: port,
  baseUrl: 'http://10.10.10.102:8765',
  redis: {
    port: '6379',
    host: '10.10.10.103',
    db: 15
  }
};

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


