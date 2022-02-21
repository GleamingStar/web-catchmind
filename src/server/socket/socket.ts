import { Server } from 'socket.io';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { chat } from './chat';
import setUserEvent from './user';
import setRoomEvent from './room';

const setSocket = (server, session: RequestHandler) => {
  const io = new Server(server);

  io.use(({ request }, next) => session(request as Request, {} as Response, next as NextFunction));

  io.on('connection', (socket) => {

    socket.on('chat', (message : string) => {
      const { user, roomId } = socket.request.session;
      io.to(roomId.toString()).emit('chat', chat(user.name, user.imgUrl, message));
    });

    setRoomEvent(io, socket);

    setUserEvent(socket);

  });

  return io;
};

export default setSocket;
