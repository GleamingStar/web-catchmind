import { Server } from 'socket.io';
import { TUser } from 'shared/types';
import { rooms } from 'server/router/room';
import { chat, enter, join, leave } from './makeMessage';

const getRoom = (roomId: number) => rooms.findIndex(({ id }) => id === roomId);

const joinUser = (roomId: number, user: TUser) => rooms[getRoom(roomId)].users.push(user);

const leaveUser = (roomId: number, user: TUser) => {
  rooms[getRoom(roomId)].users = rooms[getRoom(roomId)].users.filter(({ id }) => id !== user.id);
};

const getUserList = (roomId: number) => rooms[getRoom(roomId)].users;

const setSocket = (server) => {
  const io = new Server(server);

  let chatId = 0;

  io.on('connection', (socket) => {
    let id;
    let name;
    let imgUrl;
    let currentRoom = null;

    socket.on('login', (user) => {
      id = user.id;
      name = user.name;
      imgUrl = user.imgUrl;
      socket.join(`user/${id}`);
    });

    socket.on('logout', (userId) => {
      io.to(`user/${userId}`).emit('logout');
      io.socketsLeave(`user/${userId}`);
    });

    socket.on('room/join', (roomId) => {
      if (rooms[getRoom(roomId)].users.filter((user) => user.id === id).length > 0) {
        socket.emit('room/kick', roomId);
        return;
      }
      socket.join(roomId.toString());

      socket.emit('chat', enter(chatId++, name));
      socket.broadcast.to(roomId.toString()).emit('chat', join(chatId++, name));

      currentRoom = roomId;
      joinUser(roomId, { id, name, imgUrl });
      socket.emit('room/join', roomId);
      io.to(roomId.toString()).emit('user', getUserList(roomId));
    });

    socket.on('room/leave', () => {
      if (currentRoom === null) return;
      socket.leave(currentRoom.toString());
      socket.broadcast.to(currentRoom.toString()).emit('chat', leave(chatId++, name));

      leaveUser(currentRoom, { id, name, imgUrl });
      io.to(currentRoom.toString()).emit('user', getUserList(currentRoom));
      currentRoom = null;
    });

    socket.on('chat', (message) => io.to(currentRoom.toString()).emit('chat', chat(chatId++, name, imgUrl, message)));

    socket.on('disconnect', () => {
      if (currentRoom === null) return;
      socket.broadcast.to(currentRoom.toString()).emit('chat', leave(chatId++, name));
      leaveUser(currentRoom, { id, name, imgUrl });
      io.to(currentRoom.toString()).emit('user', getUserList(currentRoom));
    });
  });

  return io;
};

export default setSocket;
