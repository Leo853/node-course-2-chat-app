const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
//web sockets server
var io = socketIO(server);

//help page
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //greet connected user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));


  //inform others
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();

    console.log('createMessage', message);
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', reason);
  });
});

//this is http server vs express server
server.listen(port, () => {
  console.log(`Started on port ${port}`)
});
