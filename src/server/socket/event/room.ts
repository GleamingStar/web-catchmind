import { Socket } from 'socket.io';
import RoomManager from 'server/manager/room';

const setRoomEvent = (socket: Socket, roomManager: RoomManager) => {
  const auth = socket.handshake.auth;

  auth.roomId = null;

  socket.on('room/update', () => socket.emit('room/update', roomManager.getRooms()));

  socket.on('room/create', (roomName: string) => {
    const roomId = roomManager.createRoom(roomName, auth.user);

    auth.roomId = roomId;

    socket.join(roomId.toString());

    socket.emit('room/join', roomId);
  });

  socket.on('room/join', (targetId: number) => {
    auth.roomId = targetId;

    roomManager.joinRoom(targetId, auth.user);

    socket.join(targetId.toString());

    socket.emit('room/join', targetId);
  });

  socket.on('room/leave', () => {
    if (auth.roomId === null) return;

    socket.leave(auth.roomId.toString());

    roomManager.leaveRoom(auth.roomId, auth.user);

    socket.emit('room/leave');

    if (roomManager.getUsers(auth.roomId).length === 0) roomManager.deleteRoom(auth.roomId);

    auth.roomId = null;
  });

  socket.on('disconnecting', () => {
    if (auth.roomId === null || !auth.user) return;

    roomManager.leaveRoom(auth.roomId, auth.user);

    if (roomManager.getUsers(auth.roomId).length === 0) roomManager.deleteRoom(auth.roomId);
  });
};

export default setRoomEvent;
