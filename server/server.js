const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey What is going on.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', reason);
  });
});

//this is http server vs express server
server.listen(port, () => {
  console.log(`Started on port ${port}`)
});
