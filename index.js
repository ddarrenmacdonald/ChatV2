var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//* Adding in the Redis functionality *//

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set("app name", "ChatCon", redis.print);

//* End Redis Code *//


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//* This Socket IO function logs when a user connect *//
io.on('connection', function(socket){
  //* This adds the Redis function to the socket *//
  
  client.get('app name', function(err, reply) {
  console.log('app name is', reply);
});
  client.hgetall('history', function(err, replies) {
    socket.emit('history', replies);
  });
  
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