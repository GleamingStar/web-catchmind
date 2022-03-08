import { Socket } from 'socket.io';
import RoomManager from 'server/manager/room';
import chat from '../chat';

const setRoomEvent = (socket: Socket, roomManager: RoomManager) => {
  const session = socket.request.session;

  session.roomId = null;

  socket.on('login', () => socket.emit('room/update', roomManager.getRooms()));

  socket.on('room/create', (roomName: string) => {
    const roomId = roomManager.createRoom(roomName, session.user);

    session.roomId = roomId;

    socket.join(roomId.toString());

    socket.emit('room/join', roomId);

    chat.enter(socket, session.roomId, session.user.name);
  });

  socket.on('room/join', (targetId: number) => {
    session.roomId = targetId;

    socket.join(targetId.toString());

    roomManager.joinRoom(targetId, session.user);

    socket.emit('room/join', targetId);

    chat.enter(socket, session.roomId, session.user.name);
  });

  socket.on('room/leave', () => {
    if (session.roomId === null) return;

    const { id, name } = session.user;

    socket.leave(session.roomId.toString());

    chat.leave(socket, session.roomId, name);

    roomManager.leaveRoom(session.roomId, id);

    socket.emit('room/leave');

    if (roomManager.getUsers(session.roomId).length === 0) roomManager.deleteRoom(session.roomId);

    session.roomId = null;
  });

  socket.on('disconnecting', () => {
    if (session.roomId === null || !session.user) return;

    const { id, name } = session.user;

    chat.leave(socket, session.roomId, name);

    roomManager.leaveRoom(session.roomId, id);

    if (roomManager.getUsers(session.roomId).length === 0) roomManager.deleteRoom(session.roomId);
  });
};

export default setRoomEvent;
