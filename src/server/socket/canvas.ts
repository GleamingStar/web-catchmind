import { TCanvas } from 'shared/types';
import { Socket } from 'socket.io';

const setCanvasEvent = (socket: Socket) => {
  socket.on('canvas/draw', (canvas: TCanvas) => {
    socket.broadcast.to(socket.request.session.roomId?.toString()).emit('canvas/draw', canvas);
  });

  socket.on('canvas/update/request', () =>
    socket.broadcast.to(socket.request.session.roomId?.toString()).emit('canvas/update/request')
  );

  socket.on('canvas/update/response', (canvasUrl: string) =>
    socket.broadcast.to(socket.request.session.roomId?.toString()).emit('canvas/update/response', canvasUrl)
  );

  socket.on('canvas/reset', () => socket.broadcast.to(socket.request.session.roomId?.toString()).emit('canvas/reset'));
};

export default setCanvasEvent;
