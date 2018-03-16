// Dependencies
const express = require('express');
const path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// Point static path to lib and serve its content
app.use(express.static(path.join(__dirname, 'lib')));
app.use('/lib/jquery', express.static(path.resolve('./lib/jquery')));

app.set('port', (process.env.PORT || 3005));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(process.env.PORT || 3005, function(){
  console.log('Dassi Orleando simple chat app listening on *:' + app.get('port'));
});
