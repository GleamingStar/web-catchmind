import { COLOR } from './constant';

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

type TStatus = 'WAITING' | 'PLAYING';

export type TRoom = {
  id: number;
  name: string;
  status: TStatus;
  users: Array<TUser>;
};

export type TGame = {
  id: number;
  round: number;
  set: number;
  status: TStatus;
  answer: string;
  painter: TUser;
  users: Array<TUser>;
  waitingUsers: Array<TUser>;
  usedAnswer: Array<string>;
  score: Array<{ user: TUser; value: number }>;
};

export type TColor = typeof COLOR[number];

export type TCanvas = {
  tool: 'pencil' | 'eraser';
  color: TColor;
  location: { x0: number; y0: number; x1: number; y1: number };
};
