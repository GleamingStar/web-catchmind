import { MessageType, TChat } from 'shared/types';

export const chat = (chatId: number, name: string, imgUrl: string, message: string): TChat => ({
  type: MessageType.User,
  id: chatId,
  name,
  imgUrl,
  message,
});

const makeSystemMessage = (message: string, chatId: number): TChat => ({
  type: MessageType.System,
  id: chatId,
  message,
});

const template = {
  enter: (name) => `${name}님 환영합니다!`,
  join: (name) => `${name}님이 참여했습니다.`,
  leave: (name) => `${name}님이 퇴장했습니다`,
  win: (name) => `${name}님이 이겼습니다`,
};

export const enter = (id: number, name: string) => makeSystemMessage(template.enter(name), id);

export const join = (id: number, name: string) => makeSystemMessage(template.join(name), id);

export const leave = (id: number, name: string) => makeSystemMessage(template.leave(name), id);

export const win = (id: number, name: string) => makeSystemMessage(template.win(name), id);
