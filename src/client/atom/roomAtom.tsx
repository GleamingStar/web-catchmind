import { atom, selector } from 'recoil';
import socket from 'client/config/socket';
import { TRoom } from 'shared/types';

export const roomListAtom = atom<Array<TRoom>>({
  key: 'roomList',
  default: [],
  effects: [
    ({ setSelf }) => {
      socket.on('room/update', setSelf);
      socket.emit('room/update')

      return () => {
        socket.off('room/update', setSelf);
      };
    },
  ],
});

export const currentRoomIndexAtom = atom<number>({
  key: 'currentRoomIndex',
  default: null,
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('room/join', setSelf);
      socket.on('room/leave', resetSelf);

      return () => {
        socket.off('room/join', setSelf);
        socket.off('room/leave', resetSelf);
      };
    },
  ],
});

export const currentRoomSelector = selector<TRoom>({
  key: 'currentRoom',
  get: ({ get }) => get(roomListAtom).filter(({ id }) => id === get(currentRoomIndexAtom))[0],
});
