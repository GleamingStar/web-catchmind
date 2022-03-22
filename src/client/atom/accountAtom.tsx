import { atom } from 'recoil';
import socket from 'client/config/socket';
import { TUser } from 'shared/types';

export const accountAtom = atom<TUser>({
  key: 'account',
  default: null,
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('login/success', setSelf);
      socket.on('disconnect', resetSelf)
      
      return () => {
        socket.off('login/success', setSelf);
        socket.off('disconnect', resetSelf)
      };
    },
  ],
});
