import { atom } from 'recoil';
import { TUser } from 'shared/types';

export const accountAtom = atom<TUser>({
  key: 'account',
  default: null,
});
