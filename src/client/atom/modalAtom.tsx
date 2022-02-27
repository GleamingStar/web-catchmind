import { atom, selector } from 'recoil';

export const toggleModalAtom = atom<number>({
  key: 'toggleModal',
  default: 0,
});

export const isUserListOnSelector = selector<boolean>({
  key: 'isUserListOn',
  get: ({ get }) => get(toggleModalAtom) === 1,
});

export const isScoreBoardOnSelector = selector<boolean>({
  key: 'isScoreBoardOn',
  get: ({ get }) => get(toggleModalAtom) === 2,
});
