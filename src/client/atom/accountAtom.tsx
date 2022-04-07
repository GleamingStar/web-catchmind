import { atom, selector } from 'recoil';
import socket from 'client/config/socket';
import { PROFILE_IMAGE_SIZE } from 'shared/constant';
import { TUser } from 'shared/types';
import { makeHash } from 'shared/util';

export const userNameAtom = atom({
  key: 'userName',
  default: '',
});

export const imageUrlAtom = atom({
  key: 'imageUrl',
  default: makeHash(32),
});

export const userImageSelector = selector({
  key: 'userImage',
  get: ({ get }) => `http://gravatar.com/avatar/${get(imageUrlAtom)}?d=identicon&s=${PROFILE_IMAGE_SIZE}`,
});

export const accountAtom = atom<TUser>({
  key: 'account',
  default: null,
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('login/success', setSelf);
      socket.on('disconnect', resetSelf);

      return () => {
        socket.off('login/success', setSelf);
        socket.off('disconnect', resetSelf);
      };
    },
  ],
});
