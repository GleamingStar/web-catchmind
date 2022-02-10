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
