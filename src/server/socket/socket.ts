import { Server } from 'socket.io';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { TRoom, TUser } from 'shared/types';
import { chat, enter, join, leave } from './makeMessage';
import setUserEvent from './user';

const getRoom = (roomId: number) => rooms[rooms.findIndex(({ id }) => id === roomId)];

const getUserList = (roomId: number) => getRoom(roomId).users;

const deleteRoom = (roomId: number) => (rooms = rooms.filter(({ id }) => id !== roomId));

const joinUser = (roomId: number, user: TUser) => getRoom(roomId).users.push(user);

const leaveUser = (roomId: number, userId: number) =>
  (getRoom(roomId).users = getRoom(roomId).users.filter(({ id }) => id !== userId));

let rooms: Array<TRoom> = [];

let roomId = 0;

const setSocket = (server, session: RequestHandler) => {
  const io = new Server(server);

  let chatId = 0;

  io.use(({ request }, next) => session(request as Request, {} as Response, next as NextFunction));

  io.on('connection', (socket) => {
    let currentRoomId: number = null;

    socket.on('login', () => {
      socket.emit('room/update', rooms);
    });

    socket.on('chat', (message) => {
      const { name, imgUrl } = socket.request.session.user;
      io.to(currentRoomId.toString()).emit('chat', chat(chatId++, name, imgUrl, message));
    });

    socket.on('room/create', (roomName: string) => {
      const { id, name, imgUrl } = socket.request.session.user;

      socket.join(roomId.toString());
      currentRoomId = roomId;

      rooms.push({ id: roomId++, name: roomName, users: [{ id, name, imgUrl }] });

      io.emit('room/update', rooms);

      socket.emit('room/join', roomId);
      socket.emit('chat', enter(chatId++, name));
    });

    socket.on('room/join', (targetId: number) => {
      if (currentRoomId !== null) return;

      const { id, name, imgUrl } = socket.request.session.user;

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

      const { id, name } = socket.request.session.user;

      socket.leave(currentRoomId.toString());

      socket.broadcast.to(currentRoomId.toString()).emit('chat', leave(chatId++, name));

      leaveUser(currentRoomId, id);

      if (getUserList(currentRoomId).length === 0) deleteRoom(currentRoomId);

      io.emit('room/update', rooms);
      socket.emit('room/leave');

      currentRoomId = null;
    });

    socket.on('disconnecting', () => {
      if (currentRoomId === null) return;

      const { id, name } = socket.request.session.user;

      socket.broadcast.to(currentRoomId.toString()).emit('chat', leave(chatId++, name));

      leaveUser(currentRoomId, id);

      if (getUserList(currentRoomId).length === 0) deleteRoom(currentRoomId);

      io.emit('room/update', rooms);
    });
    setUserEvent(socket);
  });

  return io;
};

export default setSocket;
