import { Server, Socket } from 'socket.io';
import { TGame, TUser } from 'shared/types';
import { MAX_GAME_ROUND } from 'shared/constant';
import mockupData from 'shared/answers.json';
import { rooms } from './room';

let games: Array<TGame> = [];

const defaultGame = (gameId: number, users: Array<TUser>): TGame => ({
  id: gameId,
  round: 0,
  set: 0,
  answer: '',
  painter: null,
  users,
  waitingUsers: [],
  usedAnswer: [],
  score: [],
});

const getGame = (targetId: number) => games.find(({ id }) => id === targetId);

const setAnswer = (usedAnswer: Array<string>): string => {
  const { answers } = mockupData;
  const answer = answers[Math.floor(Math.random() * answers.length)];

  return usedAnswer.includes(answer) ? setAnswer(usedAnswer) : answer;
};

const setScore = (gameId: number, painterId: number, answerId: number) => {
  const { score, users } = getGame(gameId);
  if (score.filter(({ user }) => user.id === painterId).length === 0)
    score.push({ user: users.find(({ id }) => id === painterId), value: 1 });
  else score[score.findIndex(({ user }) => user.id === painterId)].value++;

  if (score.filter(({ user }) => user.id === answerId).length === 0)
    score.push({ user: users.find(({ id }) => id === answerId), value: 3 });
  else score[score.findIndex(({ user }) => user.id === answerId)].value += 3;
};

const delay = (time: number) => new Promise((res, _) => setTimeout(res, time));

const setGameEvent = (io: Server, socket: Socket) => {
  const startRound = (gameId: number) => {
    const game = getGame(gameId);
    if (!game) return;
    if (game.round === MAX_GAME_ROUND) return endGame(gameId);
    game.round++;
    game.set = 0;
    game.users = [...rooms.filter(({ id }) => id === gameId)[0].users];
    game.waitingUsers = [...game.users];

    startSet(gameId);
  };

  const startSet = (gameId: number) => {
    const game = getGame(gameId);
    if (!game) return;
    if (game.waitingUsers.length === 0) return startRound(gameId);
    game.set++;
    game.painter = game.waitingUsers.pop();
    game.answer = setAnswer(game.usedAnswer);
    io.to(gameId.toString()).emit('game/set/start', game);
  };

  const endSet = async (gameId: number) => {
    const game = getGame(gameId);
    game.usedAnswer.push(game.answer);
    io.to(gameId.toString()).emit('game/update', game);
    await delay(5000);
    startSet(gameId);
  };

  const leaveGame = () => {
    const { roomId, user } = socket.request.session;
    const game = getGame(roomId);
    if (!game || user.id === null) return;

    game.waitingUsers = game.waitingUsers.filter(({ id }) => id !== user.id);

    game.users = game.users.filter(({ id }) => id !== user.id);

    if (game.users.length < 2) return endGame(roomId);
    if (game.painter.id === user.id) {
      io.to(roomId.toString()).emit('game/painterDisconnected');
      endSet(roomId);
    }
  };

  const endGame = (gameId: number) => {
    io.to(gameId.toString()).emit('game/end');
    rooms.filter(({ id }) => id === gameId)[0].status = 'WAITING';
    io.emit('room/update', rooms);
    games = games.filter(({ id }) => id !== gameId);
  };

  socket.on('game/start', () => {
    const gameId = socket.request.session.roomId;

    rooms.filter(({ id }) => id === gameId)[0].status = 'PLAYING';
    io.emit('room/update', rooms);

    games.push(defaultGame(gameId, rooms.filter(({ id }) => id === gameId)[0].users));

    startRound(gameId);
  });

  socket.on('chat', (message: string) => {
    const { roomId, user } = socket.request.session;
    const game = getGame(roomId);

    if (!game?.users.find(({ id }) => id === user.id)) return;
    if (game.painter.id === user.id) return;
    if (game.answer !== message) return;
    setScore(roomId, getGame(roomId).painter.id, user.id);

    io.to(roomId.toString()).emit('game/answer', game.users.filter(({ id }) => id === user.id)[0].name);
    endSet(roomId);
  });

  socket.on('game/timeout', () => {
    const { roomId, user } = socket.request.session;
    if (roomId === null || getGame(roomId)?.painter.id !== user?.id) return;

    io.to(roomId.toString()).emit('game/timeout');
    endSet(roomId);
  });

  socket.on('room/join', (targetId: number) => {
    if (getGame(targetId)) socket.emit('game/update', getGame(targetId));
  });

  socket.on('room/leave', leaveGame);

  socket.on('disconnecting', leaveGame);
};

export default setGameEvent;
