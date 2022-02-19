import { Server } from 'socket.io';
import { TRoom, TUser } from 'shared/types';
import { chat, enter, join, leave } from './makeMessage';

const getRoom = (roomId: number) => rooms[rooms.findIndex(({ id }) => id === roomId)];

const getUserList = (roomId: number) => getRoom(roomId).users;

const deleteRoom = (roomId: number) => (rooms = rooms.filter(({ id }) => id !== roomId));

const joinUser = (roomId: number, user: TUser) => getRoom(roomId).users.push(user);

const leaveUser = (roomId: number, userId: number) =>
  (getRoom(roomId).users = getRoom(roomId).users.filter(({ id }) => id !== userId.toString()));

let rooms: Array<TRoom> = [];

let roomId = 0;

const setSocket = (server) => {
  const io = new Server(server);

  let chatId = 0;

  io.on('connection', (socket) => {
    let id;
    let name;
    let imgUrl;
    let currentRoomId: number = null;

    socket.on('login', (user) => {
      id = user.id;
      name = user.name;
      imgUrl = user.imgUrl;
      socket.emit('room/update', rooms);
    });

    socket.on('chat', (message) => io.to(currentRoomId.toString()).emit('chat', chat(chatId++, name, imgUrl, message)));

    socket.on('room/create', (roomName: string) => {
      socket.join(roomId.toString());
      currentRoomId = roomId;

      rooms.push({ id: roomId++, name: roomName, users: [{ id, name, imgUrl }] });

      io.emit('room/update', rooms);

      socket.emit('room/join', roomId);
      socket.emit('chat', enter(chatId++, name));
    });

    socket.on('room/join', (targetId: number) => {
      if (currentRoomId !== null) return;
      currentRoomId = targetId;

      socket.join(targetId.toString());

      joinUser(currentRoomId, { id, name, imgUrl });
      io.emit('room/update', rooms);
      socket.emit('room/join', targetId);

      socket.emit('chat', enter(chatId++, name));
      socket.broadcast.to(targetId.toString()).emit('chat', join(chatId++, name));
    });

    socket.on('room/leave', () => {
      if (currentRoomId === null) return;
      socket.leave(currentRoomId.toString());

      socket.broadcast.to(currentRoomId.toString()).emit('chat', leave(chatId++, name));

      leaveUser(currentRoomId, id);

      if (getUserList(currentRoomId).length === 0) deleteRoom(currentRoomId);

      io.emit('room/update', rooms);
      socket.emit('room/leave');

      currentRoomId = null;
    });

    socket.on('disconnect', () => {
      if (currentRoomId === null) return;

      socket.broadcast.to(currentRoomId.toString()).emit('chat', leave(chatId++, name));

      leaveUser(currentRoomId, id);

      if (getUserList(currentRoomId).length === 0) deleteRoom(currentRoomId);

      io.emit('room/update', rooms);
    });
  });

  return io;
};

export default setSocket;
