var ws = require('ws');
var http = require('http');
var fs = require('fs');

var httpServer = http.createServer(function(req, res) {
  console.log('Request', req.method, req.url);
  if (req.method == 'GET') {
    if (req.url == '/') {
      res.writeHead(200, {'Content-Type': 'text/html', 'Connection': 'close'});
      fs.readFile('test.html', function(fnord, data) {
        res.write(data.toString());
        res.end();
      });
      return;
    }
  }
  res.writeHead(404, {'Content-Type': 'text/plain', 'Connection': 'close'});
  res.write('404 File Not Fnord');
  res.end();
});

var wsServer = new ws.Server({server:httpServer});
wsServer.on('connection', function(conn) {
  console.log('client connected');
  conn.send('*anon connected*');
  conn.on('message', function(msg) {
    console.log('client sent: %s', msg);
    if (msg == 'ping') {
      console.log('sending pong');
      conn.send('pong');
    }
  });
  conn.on('close', function() {
    console.log('client disconnected');
  });
});
console.log('Ready?');

httpServer.listen(23363);
