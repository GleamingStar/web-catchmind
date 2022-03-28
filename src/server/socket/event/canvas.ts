import { Server, Socket } from 'socket.io';
import { TCanvas } from 'shared/types';

const setCanvasEvent = (io: Server, socket: Socket) => {
  socket.on('canvas/draw', (canvas: TCanvas) => {
    socket.broadcast.to(socket.handshake.auth.roomId?.toString()).emit('canvas/draw', canvas);
  });

  socket.on('canvas/update/request', () =>
    socket.broadcast.to(socket.handshake.auth.roomId?.toString()).emit('canvas/update/request')
  );

  socket.on('canvas/update/response', (canvasUrl: string) =>
    socket.broadcast.to(socket.handshake.auth.roomId?.toString()).emit('canvas/update/response', canvasUrl)
  );

  socket.on('canvas/reset', () => io.to(socket.handshake.auth.roomId?.toString()).emit('canvas/reset'));
};

export default setCanvasEvent;
