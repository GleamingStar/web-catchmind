import { Socket } from 'socket.io';
import RoomManager from 'server/manager/room';
import chat from '../chat';

const setRoomEvent = (socket: Socket, roomManager: RoomManager) => {
  const auth = socket.handshake.auth;

  auth.roomId = null;

  socket.on('room/update', () => socket.emit('room/update', roomManager.getRooms()));

  socket.on('room/create', (roomName: string) => {
    const roomId = roomManager.createRoom(roomName, auth.user);

    auth.roomId = roomId;

    socket.join(roomId.toString());

    socket.emit('room/join', roomId);

    chat.enter(socket, auth.roomId, auth.user.name);
  });

  socket.on('room/join', (targetId: number) => {
    auth.roomId = targetId;

    socket.join(targetId.toString());

    roomManager.joinRoom(targetId, auth.user);

    socket.emit('room/join', targetId);

    chat.enter(socket, auth.roomId, auth.user.name);
  });

  socket.on('room/leave', () => {
    if (auth.roomId === null) return;

    const { id, name } = auth.user;

    socket.leave(auth.roomId.toString());

    chat.leave(socket, auth.roomId, name);

    roomManager.leaveRoom(auth.roomId, id);

    socket.emit('room/leave');

    if (roomManager.getUsers(auth.roomId).length === 0) roomManager.deleteRoom(auth.roomId);

    auth.roomId = null;
  });

  socket.on('disconnecting', () => {
    if (auth.roomId === null || !auth.user) return;

    const { id, name } = auth.user;

    chat.leave(socket, auth.roomId, name);

    roomManager.leaveRoom(auth.roomId, id);

    if (roomManager.getUsers(auth.roomId).length === 0) roomManager.deleteRoom(auth.roomId);
  });
};

export default setRoomEvent;
