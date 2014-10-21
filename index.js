var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//* This Socket IO function logs when a user connect *//
io.on('connection', function(socket){
  console.log('a user connected');

//* This Socket IO function logs when a user disconnects *//
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);


//* Using console.log to test *//
    console.log('chat message', msg);
  });
});

//* Listening on the server *//
http.listen(3000, function(){
  console.log('listening on *:3000');
});