declare module 'node:http' {
  interface IncomingMessage {
    session: { user: TUser; roomId: number };
  }
}

export enum MessageType {
  System = 'SYSTEM',
  User = 'USER',
}

export type TChat = {
  type: MessageType;
  id: number;
  imgUrl?: string;
  name?: string;
  message: string;
};

export type TUser = {
  id: number;
  name: string;
  imgUrl: string;
};

export type TRoom = {
  id: number;
  name: string;
  status: 'WAITING' | 'PLAYING';
  users: Array<TUser>;
};

export type TGame = {
  id: number;
  round: number;
  set: number;
  answer: string;
  painter: TUser;
  users: Array<TUser>;
  waitingUsers: Array<TUser>;
  usedAnswer: Array<string>;
  score: Array<{ user: TUser; value: number }>;
};
