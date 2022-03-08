import { Socket } from 'socket.io';
import GameManager from 'server/manager/game';

const setGameEvent = (socket: Socket, gameManager: GameManager) => {
  socket.on('game/start', () => gameManager.startGame(socket.request.session.roomId));

  socket.on('chat', (message: string) => {
    const { roomId, user } = socket.request.session;
    const game = gameManager.getGame(roomId);
    if (!roomId == null || !user || !game) return;

    const { status, users, painter, answer } = game;
    if (status === 'WAITING' || !users.find(({ id }) => id === user.id) || painter.id === user.id || answer !== message)
      return;

    gameManager.answer(roomId, user);
  });

  socket.on('room/join', (targetId: number) => {
    const game = gameManager.getGame(targetId);
    game && socket.emit('game/update', game);
  });

  socket.on('room/leave', () => {
    const { roomId, user } = socket.request.session;
    roomId !== null && user && gameManager.leaveGame(roomId, user.id);
  });

  socket.on('disconnecting', () => {
    const { roomId, user } = socket.request.session;
    roomId !== null && user && gameManager.leaveGame(roomId, user.id);
  });
};

export default setGameEvent;
