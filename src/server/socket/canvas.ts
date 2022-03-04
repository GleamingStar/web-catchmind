import { Socket } from 'socket.io';

const setCanvasEvent = (socket: Socket) => {
  socket.on('canvas/draw', (canvas) =>
    socket.broadcast.to(socket.request.session.roomId.toString()).emit('canvas/draw', canvas)
  );

  socket.on('room/join', () => {
    const { roomId } = socket.request.session;
    socket.broadcast.to(roomId.toString()).emit('canvas/update');
  });

  socket.on('canvas/reset', () => socket.broadcast.to(socket.request.session.roomId.toString()).emit('canvas/reset'));
};

export default setCanvasEvent;
