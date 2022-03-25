import { Server } from 'socket.io';
import { createServer } from 'http';
import RoomManager from 'server/manager/room';
import GameManager from 'server/manager/game';
import setUserEvent from './event/user';
import setGameEvent from './event/game';
import setRoomEvent from './event/room';
import setCanvasEvent from './event/canvas';
import chat from './chat';

const setSocket = (server: ReturnType<typeof createServer>) => {
  const io = new Server(server);

  const roomManager = new RoomManager(io);

  const gameManager = new GameManager(io, roomManager);

  io.on('connection', (socket) => {
    socket.on('chat', (message: string) => {
      const { user, roomId } = socket.handshake.auth;
      chat.chat(io, roomId, user.name, user.imgUrl, message);
    });

    setUserEvent(io, socket);

    setGameEvent(socket, gameManager);

    setRoomEvent(socket, roomManager);

    setCanvasEvent(socket);
  });

  return io;
};

export default setSocket;
