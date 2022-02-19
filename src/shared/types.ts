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
  id: string;
  name: string;
  imgUrl: string;
};

export type TRoom = {
  id: number;
  name: string;
  users: Array<TUser>;
};
