var ws = require('ws');
var http = require('http');
var fs = require('fs');

var httpServer = http.createServer(function(req, res) {
  console.log('Local Server got request', req.method, req.url);
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
  console.log('Local Server got connection');
  conn.send('*anon connected*');
  conn.on('message', function(msg) {
    console.log('Local Server received "%s" from client', msg);
    if (msg == 'ping') {
      console.log('Local Server sending pong to client');
      conn.send('pong');
    }
  });
  conn.on('close', function() {
    console.log('client disconnected');
  });
});
console.log('Ready?');

httpServer.listen(23363);
