import { atom, selector } from 'recoil';
import { TRoom } from 'shared/types';

export const roomListAtom = atom<Array<TRoom>>({
  key: 'roomList',
  default: [],
});

export const currentRoomIndexAtom = atom<number>({
  key: 'currentRoomIndex',
  default: null,
});

export const currentRoomSelector = selector<TRoom>({
  key: 'currentRoom',
  get: ({ get }) => get(roomListAtom).filter(({ id }) => id === get(currentRoomIndexAtom))[0],
});
