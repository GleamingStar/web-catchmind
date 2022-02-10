import { atom } from 'recoil';
import { ERROR_MESSAGE } from 'shared/constant';
import { TUser } from 'shared/types';

export const checkSession = async () => {
  try {
    const response = await fetch('/user');

    if (!response.ok) {
      const { message } = await response.json();

      throw new Error(message);
    }

    const { user } = await response.json();

    return user;
  } catch (err) {
    if (err.message !== ERROR_MESSAGE.NOT_LOGINED) console.error('network error occurred');

    return null;
  }
};

export const accountAtom = atom<TUser>({
  key: 'account',
  default: checkSession(),
});
