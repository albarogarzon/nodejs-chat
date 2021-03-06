const users = [];
const addUser = ({ socket_id, name, user_id, room_id }) => {
  const exist = users.find(
    (user) => user.room_id === room_id && user.user_id === user_id
  );
  if (exist) {
    return { error: 'User already exists in this room' };
  }
  const user = { socket_id, name, user_id, room_id };
  users.push(user);
  console.log('user list ', users);
  return { user };
};

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (socket_id) => {

  const user1 = users.find((user) => user.socket_id === socket_id);
  if (user1 !== null) {
    return user1;
  } else {
    console.log('null');
  }
};

module.exports = { addUser, removeUser, getUser };
