import { atom } from 'recoil';
import socket from 'client/config/socket';
import { LOGIN_ALERT_MESSAGE, ROOM_ALERT_MESSAGE } from 'shared/constant';

export const loginAlertAtom = atom({
  key: 'loginAlert',
  default: LOGIN_ALERT_MESSAGE.NONE,
  effects: [
    ({ setSelf, resetSelf }) => {
      socket.on('login/success', resetSelf);
      socket.on('login/fail/duplicate', () => setSelf(LOGIN_ALERT_MESSAGE.DUPLICATED));

      return () => {
        socket.off('login/success', resetSelf);
        socket.off('login/fail/duplicate');
      };
    },
  ],
});

export const roomAlertAtom = atom({
  key: 'roomAlert',
  default: ROOM_ALERT_MESSAGE.NONE,
  effects: [
    ({ resetSelf }) => {
      socket.on('room/join', resetSelf);

      return () => {
        socket.off('room/join', resetSelf);
      };
    },
  ],
});
