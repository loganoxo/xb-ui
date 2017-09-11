/**
 * Created by ycb on 2017/9/11.
 */
const port = normalizePort(process.env.PORT || '3000');
module.exports = {
  port: port,
  baseUrl: 'http://192.168.1.142:8765',
  redis: {
    port: '6543',
    host: '192.168.1.44',
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
