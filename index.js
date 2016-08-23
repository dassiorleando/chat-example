var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.set('port', (process.env.PORT));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('Dassi Orleando simple chat app listening on *:' + app.get('port'));
});
