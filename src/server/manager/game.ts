import { Server } from 'socket.io';
import chat from 'server/socket/chat';
import { TGame, TUser } from 'shared/types';
import { MAX_GAME_ROUND } from 'shared/constant';
import mockupData from 'shared/answers.json';
import roomManager from './room';

const delay = (time: number) => new Promise((res, _) => setTimeout(res, time));

class GameManager {
  games: Array<TGame>;
  io: Server;
  room: roomManager;

  constructor(io: Server, roomManager: roomManager) {
    this.games = [];
    this.io = io;
    this.room = roomManager;
  }

  getGame(targetId: number) {
    return this.games.find(({ id }) => id === targetId);
  }

  startGame(id: number) {
    const defaultGame: TGame = {
      id,
      round: 0,
      set: 0,
      status: 'WAITING',
      answer: '',
      painter: null,
      users: this.room.getUsers(id),
      waitingUsers: [],
      usedAnswer: [],
      score: [],
    };
    this.games.push(defaultGame);
    this.room.setRoomStatus(id, 'PLAYING');
    chat.start(this.io, id);

    this.startRound(id);
  }

  startRound(targetId: number) {
    const game = this.getGame(targetId);
    if (!game) return;
    if (game.round === MAX_GAME_ROUND) return this.endGame(targetId, 'over');
    game.round++;
    game.set = 0;
    game.users = [...this.room.getUsers(targetId)];
    game.waitingUsers = [...game.users];

    this.startSet(targetId);
  }

  startSet(id: number) {
    const game = this.getGame(id);
    if (!game) return;
    if (game.waitingUsers.length === 0) return this.startRound(id);
    game.set++;
    game.status = 'PLAYING';
    game.painter = game.waitingUsers.pop();
    game.answer = this.setAnswer(game.usedAnswer);
    this.io.to(id.toString()).emit('game/set/start', game);
  }

  answer(targetId: number, user: TUser) {
    const { painter } = this.getGame(targetId);
    this.setScore(targetId, painter.id, user.id);

    chat.win(this.io, targetId, user.name);
    this.io.to(targetId.toString()).emit('game/answer');
    this.endSet(targetId);
  }

  timeout(targetId: number) {
    this.io.to(targetId.toString()).emit('game/timeout');
    chat.timeout(this.io, targetId, this.getGame(targetId).answer);
    this.endSet(targetId);
  }

  async endSet(targetId: number) {
    const game = this.getGame(targetId);
    if (game.status === 'WAITING') return;
    game.status = 'WAITING';
    game.usedAnswer.push(game.answer);
    this.io.to(targetId.toString()).emit('game/update', game);
    await delay(5000);
    this.startSet(targetId);
  }

  leaveGame(targetId: number, userId: number) {
    const game = this.getGame(targetId);
    if (!game) return;

    game.waitingUsers = game.waitingUsers.filter(({ id }) => id !== userId);

    game.users = game.users.filter(({ id }) => id !== userId);

    if (game.users.length < 2) this.endGame(targetId, 'stop');
    else if (game.painter.id === userId && game.status === 'PLAYING') {
      chat.painterOut(this.io, targetId, game.answer);
      this.endSet(targetId);
    }
  }

  endGame(targetId: number, type: 'over' | 'stop') {
    this.io.to(targetId.toString()).emit('game/end');
    type === 'over' ? chat.end(this.io, targetId) : chat.stop(this.io, targetId);

    this.games = this.games.filter(({ id }) => id !== targetId);
    this.room.setRoomStatus(targetId, 'WAITING');
  }

  setAnswer(usedAnswer: Array<string>): string {
    const { answers } = mockupData;
    const answer = answers[Math.floor(Math.random() * answers.length)];

    return usedAnswer.includes(answer) ? this.setAnswer(usedAnswer) : answer;
  }

  setScore(targetId: number, painterId: number, answerId: number) {
    const { score, users } = this.getGame(targetId);
    if (score.filter(({ user }) => user.id === painterId).length === 0)
      score.push({ user: users.find(({ id }) => id === painterId), value: 1 });
    else score[score.findIndex(({ user }) => user.id === painterId)].value++;

    if (score.filter(({ user }) => user.id === answerId).length === 0)
      score.push({ user: users.find(({ id }) => id === answerId), value: 3 });
    else score[score.findIndex(({ user }) => user.id === answerId)].value += 3;
  }
}

export default GameManager;