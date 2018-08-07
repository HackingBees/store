var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('io',io);

http.listen(8080, function () {
  var now = new Date();
  console.log('Storefront application is up and listening for requests. ' + now);
})
