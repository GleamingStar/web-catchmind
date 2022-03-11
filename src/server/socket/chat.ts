import { Server, Socket } from 'socket.io';
import { MessageType, TChat } from 'shared/types';

let chatId = 0;

const makeSystemMessage = (message: string): TChat => ({
  type: MessageType.System,
  id: chatId++,
  message,
});

const makeChat = (name: string, imgUrl: string, message: string): TChat => ({
  type: MessageType.User,
  id: chatId++,
  name,
  imgUrl,
  message,
});

const chat = (io: Server, roomId: number, name: string, imgUrl: string, message: string) =>
  io.to(roomId.toString()).emit('chat', makeChat(name, imgUrl, message));

const enter = (socket: Socket, roomId: number, name: string) => {
  socket.broadcast.to(roomId.toString()).emit('chat', makeSystemMessage(`${name}님이 참여했습니다.`));
};

const leave = (socket: Socket, roomId: number, name: string) =>
  socket.broadcast.to(roomId.toString()).emit('chat', makeSystemMessage(`${name}님이 퇴장했습니다.`));

const start = (io: Server, roomId: number) =>
  io.to(roomId.toString()).emit('chat', makeSystemMessage('게임이 시작되었습니다.'));

const win = (io: Server, roomId: number, name: string) =>
  io.to(roomId.toString()).emit('chat', makeSystemMessage(`${name}님이 정답을 맞혔습니다.`));

const timeout = (io: Server, roomId: number, answer: string) => {
  io.to(roomId.toString()).emit('chat', makeSystemMessage('제한시간이 끝났습니다.'));
  io.to(roomId.toString()).emit('chat', makeSystemMessage(`정답은 ${answer}입니다.`));
};

const painterOut = (io: Server, roomId: number, answer: string) => {
  io.to(roomId.toString()).emit('chat', makeSystemMessage('출제자가 나가 세트가 종료되었습니다.'));
  io.to(roomId.toString()).emit('chat', makeSystemMessage(`정답은 ${answer}입니다.`));
};

const stop = (io: Server, roomId: number) =>
  io.to(roomId.toString()).emit('chat', makeSystemMessage('인원이 부족해 게임이 중단되었습니다.'));

const end = (io: Server, roomId: number) =>
  io.to(roomId.toString()).emit('chat', makeSystemMessage('게임이 종료되었습니다.'));

export default { chat, enter, leave, start, win, timeout, painterOut, stop, end };
