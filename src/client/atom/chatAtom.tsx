import { atom } from 'recoil';
import { TChat } from 'shared/types';

export const chatLogAtom = atom<Array<TChat>>({
  key: 'chatLog',
  default: [],
});
