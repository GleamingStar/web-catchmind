import { Server, Socket } from 'socket.io';
import { TRoom, TUser } from 'shared/types';
import { enter, join, leave } from './chat';

const getRoom = (roomId: number) => rooms[rooms.findIndex(({ id }) => id === roomId)];

const getUserList = (roomId: number) => getRoom(roomId).users;

const deleteRoom = (roomId: number) => (rooms = rooms.filter(({ id }) => id !== roomId));

const joinUser = (roomId: number, user: TUser) => getRoom(roomId).users.push(user);

const leaveUser = (roomId: number, userId: number) =>
  (getRoom(roomId).users = getRoom(roomId).users.filter(({ id }) => id !== userId));

let rooms: Array<TRoom> = [];

let roomId = 0;

const setRoomEvent = (io: Server, socket: Socket) => {
  const session = socket.request.session;

  session.roomId = null;

  socket.on('login', () => socket.emit('room/update', rooms));

  socket.on('room/create', (roomName: string) => {
    session.roomId = roomId;
    socket.join(roomId.toString());

    rooms.push({ id: roomId++, name: roomName, users: [session.user] });

    io.emit('room/update', rooms);

    socket.emit('room/join', roomId);
    socket.emit('chat', enter(session.user.name));
  });

  socket.on('room/join', (targetId: number) => {
    if (session.roomId !== null) return;

    const { id, name, imgUrl } = session.user;

    session.roomId = targetId;

    socket.join(targetId.toString());

    joinUser(targetId, { id, name, imgUrl });
    io.emit('room/update', rooms);
    socket.emit('room/join', targetId);

    socket.emit('chat', enter(name));
    socket.broadcast.to(targetId.toString()).emit('chat', join(name));
  });

  socket.on('room/leave', () => {
    if (session.roomId !== null) return;

    const { id, name } = session.user;

    socket.leave(session.roomId.toString());

    socket.broadcast.to(session.roomId.toString()).emit('chat', leave(name));

    leaveUser(session.roomId, id);

    if (getUserList(session.roomId).length === 0) deleteRoom(session.roomId);

    io.emit('room/update', rooms);
    socket.emit('room/leave');

    session.roomId = null;
  });

  socket.on('disconnecting', () => {
    if (session.roomId === null || session.user === null) return;

    const { id, name } = session.user;

    socket.broadcast.to(session.roomId.toString()).emit('chat', leave(name));

    leaveUser(session.roomId, id);

    if (getUserList(session.roomId).length === 0) deleteRoom(session.roomId);

    io.emit('room/update', rooms);
  });
};

export default setRoomEvent;
