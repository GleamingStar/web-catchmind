import { Socket } from 'socket.io';

const setCanvasEvent = (socket: Socket) => {
  socket.on('canvas/draw', (canvas) =>
    socket.broadcast.to(socket.request.session.roomId.toString()).emit('canvas/draw', canvas)
  );

  socket.on('canvas/reset', () => socket.broadcast.to(socket.request.session.roomId.toString()).emit('canvas/reset'));
};

export default setCanvasEvent