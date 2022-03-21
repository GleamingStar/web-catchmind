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

const throttle = (callback, delay) => {
  let previousCall = new Date().getTime();

  return (...args) => {
    const time = new Date().getTime();

    if (time - previousCall >= delay) {
      previousCall = time;
      callback(...args);
    }
  };
};

export const isPortraitAtom = atom({
  key: 'isPortrait',
  default: window.innerWidth < 800,
  effects: [
    ({ setSelf }) => {
      const resizeHandler = throttle(() => setSelf(window.innerWidth < 800), 100);
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    },
  ],
});
