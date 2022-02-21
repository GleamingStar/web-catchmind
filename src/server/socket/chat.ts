import { MessageType, TChat } from 'shared/types';

let chatId = 0;

export const chat = (name: string, imgUrl: string, message: string): TChat => ({
  type: MessageType.User,
  id: chatId++,
  name,
  imgUrl,
  message,
});

const makeSystemMessage = (message: string): TChat => ({
  type: MessageType.System,
  id: chatId++,
  message,
});

const template = {
  enter: (name) => `${name}님 환영합니다!`,
  join: (name) => `${name}님이 참여했습니다.`,
  leave: (name) => `${name}님이 퇴장했습니다`,
  win: (name) => `${name}님이 이겼습니다`,
};

export const enter = (name: string) => makeSystemMessage(template.enter(name));

export const join = (name: string) => makeSystemMessage(template.join(name));

export const leave = (name: string) => makeSystemMessage(template.leave(name));

export const win = (name: string) => makeSystemMessage(template.win(name));
