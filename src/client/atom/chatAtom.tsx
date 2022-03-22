import { atom } from 'recoil';
import socket from 'client/config/socket';
import { TChat } from 'shared/types';

export const chatLogAtom = atom<Array<TChat>>({
  key: 'chatLog',
  default: [],
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('chat', (chat: TChat) => setSelf((log: Array<TChat>) => [...log, chat]));
      socket.on('room/leave', resetSelf);
      socket.on('disconnect', resetSelf);

      return () => {
        socket.off('chat');
        socket.off('room/leave', resetSelf);
        socket.off('disconnect', resetSelf);
      };
    },
  ],
});
