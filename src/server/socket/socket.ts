import { Server } from 'socket.io';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { chat } from './chat';
import setUserEvent from './user';
import setGameEvent from './game';
import setRoomEvent from './room';
import setCanvasEvent from './canvas';

const setSocket = (server, session: RequestHandler) => {
  const io = new Server(server);

  io.use(({ request }, next) => session(request as Request, {} as Response, next as NextFunction));

  io.on('connection', (socket) => {
    socket.on('chat', (message: string) => {
      const { user, roomId } = socket.request.session;
      chat(io, roomId, user.name, user.imgUrl, message);
    });

    setUserEvent(socket);

    setGameEvent(io, socket);

    setRoomEvent(io, socket);

    setCanvasEvent(socket);
  });

  return io;
};

export default setSocket;
