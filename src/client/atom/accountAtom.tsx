import { atom } from 'recoil';
import socket from 'client/config/socket';
import { TUser } from 'shared/types';

export const accountAtom = atom<TUser>({
  key: 'account',
  default: null,
  effects: [
    ({ setSelf }) => {
      socket.on('login/success', setSelf);

      return () => {
        socket.off('login/success', setSelf);
      };
    },
  ],
});
