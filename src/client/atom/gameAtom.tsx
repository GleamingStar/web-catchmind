import { atom, selector } from 'recoil';
import { MAX_SET_TIMER } from 'shared/constant';
import { TGame } from 'shared/types';
import { accountAtom } from './accountAtom';

export const gameAtom = atom<TGame>({
  key: 'game',
  default: null,
});

export const answerSelector = selector<string>({
  key: 'answer',
  get: ({ get }) => get(gameAtom)?.answer,
});

export const scoreSelector = selector({
  key: 'score',
  get: ({ get }) => (get(gameAtom) === null ? [] : [...get(gameAtom).score].sort((a, b) => b.value - a.value)),
});

export const timerAtom = atom<number>({
  key: 'timer',
  default: MAX_SET_TIMER,
});

export const isPainterSelector = selector({
  key: 'isPainter',
  get: ({ get }) => (get(accountAtom)?.id === get(gameAtom)?.painter.id) === (get(gameAtom) !== null),
});
