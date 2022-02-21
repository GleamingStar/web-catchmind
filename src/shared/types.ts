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
  users: Array<TUser>;
};
