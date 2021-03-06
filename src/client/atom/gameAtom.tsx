import { atom, selector } from 'recoil';
import socket from 'client/config/socket';
import { MAX_SET_TIMER } from 'shared/constant';
import { TGame } from 'shared/types';
import { debounce } from 'shared/util';
import { accountAtom } from './accountAtom';

export const gameAtom = atom<TGame>({
  key: 'game',
  default: null,
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('game/set/start', setSelf);
      socket.on('game/update', setSelf);
      socket.on('room/leave', resetSelf);
      socket.on('game/end', resetSelf);
      socket.on('disconnect', resetSelf);

      socket.emit('game/update');

      return () => {
        socket.off('game/set/start', setSelf);
        socket.off('game/update', setSelf);
        socket.off('room/leave', resetSelf);
        socket.off('game/end', resetSelf);
        socket.off('disconnect', resetSelf);
      };
    },
  ],
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
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('game/timer', setSelf);
      socket.on('game/set/start', resetSelf);

      return () => {
        socket.off('game/timer', setSelf);
        socket.off('game/set/start', resetSelf);
      };
    },
  ],
});

export const isPainterSelector = selector({
  key: 'isPainter',
  get: ({ get }) => (get(accountAtom)?.id === get(gameAtom)?.painter.id) === (get(gameAtom) !== null),
});

export const resultAtom = atom<TGame['score']>({
  key: 'result',
  default: [],
  effects: [
    ({ setSelf }) => {
      socket.on('game/result', setSelf);

      return () => {
        socket.off('game/result', setSelf);
      };
    },
  ],
});

export const isEndAtom = atom({
  key: 'isEnd',
  default: false,
  effects: [
    ({ setSelf, resetSelf }) => {
      const debouncedReset = debounce(resetSelf, 5000);

      const endHandler = () => {
        setSelf(true);
        debouncedReset();
      };

      socket.on('game/end', endHandler);
      socket.on('room/leave', resetSelf);
      socket.on('game/set/start', resetSelf);

      return () => {
        socket.off('game/end', endHandler);
        socket.off('room/leave', resetSelf);
        socket.off('game/set/start', resetSelf);
      };
    },
  ],
});
