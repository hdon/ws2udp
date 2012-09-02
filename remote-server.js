var ws = require('ws');

var wsServer = new ws.Server({port:23364});
wsServer.on('connection', function(conn) {
  console.log('Remote Server got connection');
  conn.send('OLEH');
  conn.close();
});
console.log('Remote Server is ready');
