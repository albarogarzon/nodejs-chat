const app = require('express');
const http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http);
const { addUser, removeUser, getUser } = require('./helper');
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  socket.on('create-room', (name) => {
    console.log('The room name received is: ', name);
  });
  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });
    socket.join(room_id)
    if (error) {
      console.log('Join Error, ', error);
    } else {
      console.log('Join user ', user);
    }
  });
  socket.on('sendMessage', (message, room_id, callback) => {
    console.log('socket id', socket.id);
    const user = getUser(socket.id);
    console.log('USER', user);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log('mgee ', msgToStore);
    io.to(room_id).emit('message', msgToStore);
    callback();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  });
});
http.listen(PORT, () => {
  console.log(`listening on port  ${PORT}`);
});
