import { atom, selector } from 'recoil';
import { TRoom } from 'shared/types';

const getRoomList = async () => {
  try {
    const response = await fetch('/room');
    const { rooms } = await response.json();

    return rooms;
  } catch (err) {
    console.error('network error occuerred');
    return null;
  }
};

export const roomListAtom = atom<Array<TRoom>>({
  key: 'roomList',
  default: getRoomList(),
});

export const currentRoomIndexAtom = atom<number>({
  key: 'currentRoomIndex',
  default: null,
});

export const currentRoomSelector = selector<TRoom>({
  key: 'currentRoom',
  get: ({ get }) => get(roomListAtom).filter(({ id }) => id === get(currentRoomIndexAtom))[0],
});
