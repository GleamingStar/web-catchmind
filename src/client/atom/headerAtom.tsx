import { atom, selector } from 'recoil';

export const toggleHeaderModalAtom = atom<number>({
  key: 'toggleHeaderModal',
  default: 0,
});

export const isUserListOnSelector = selector<boolean>({
  key: 'isUserListOn',
  get: ({ get }) => get(toggleHeaderModalAtom) === 1,
});

export const isScoreBoardOnSelector = selector<boolean>({
  key: 'isScoreBoardOn',
  get: ({ get }) => get(toggleHeaderModalAtom) === 2,
});
