// const Koa = require('koa')
// const app = new Koa()
// const debug = require('debug')('koa-weapp-demo')
// const response = require('./middlewares/response')
// const bodyParser = require('koa-bodyparser')
const config = require('./config')

// // 使用响应处理中间件
// app.use(response)

// // 解析请求体
// app.use(bodyParser())

// // 引入路由分发
// const router = require('./routes')
// app.use(router.routes())

// // 启动程序，监听端口
// app.listen(config.port, () => debug(`listening on port ${config.port}`))

var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
  if (req.url === '/favicon.ico'){
    return;
  }

  let headers = {}
  if (req.headers['content-type']){
    headers['content-type'] = req.headers['content-type']
  }
  if (req.headers['content-length']) {
    headers['content-length'] = req.headers['content-length']
  }
  var sreq = http.request({
    host: config.host, // 目标主机
    path: req.url, // 目标路径
    method: req.method, // 请求方式
    headers
  }, function (sres) {
    sres.pipe(res);
    sres.on('end', function () {
      console.log('done');
    });
  });
  if (/POST|PUT/i.test(req.method)) {
    req.pipe(sreq);
  } else {
    sreq.end();
  }
  // res.end(req.originalUrl);
  // sendPromise(req, res, function(error, result){
  //   res.end(error ? '{code:-1, data:"服务器异常"}' : result);
  // });
});
// 访问127.0.0.1:3001查看效果
app.listen(config.port);
console.log(`listening on port ${config.port}`);