import { atom } from 'recoil';
import socket from 'client/config/socket';
import { LANDSCAPE_WIDTH, LOGIN_ALERT_MESSAGE, ROOM_ALERT_MESSAGE } from 'shared/constant';
import { debounce } from 'shared/util';

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

export const userCountAtom = atom({
  key: 'userCount',
  default: 0,
  effects: [
    ({ setSelf }) => {
      socket.on('usercount', setSelf);
      socket.emit('usercount');

      return () => {
        socket.off('usercount', setSelf);
      };
    },
  ],
});

export const disconnectAlertAtom = atom({
  key: 'disconnectAlert',
  default: false,
  effects: [
    ({ setSelf }) => {
      const onHandler = () => setSelf(true);
      const offHandler = () => setSelf(false);
      socket.on('disconnect', onHandler);
      socket.on('connect', offHandler);

      return () => {
        socket.off('disconnect', onHandler);
        socket.off('connect', offHandler);
      };
    },
  ],
});

export const zoomOutAlertAtom = atom({
  key: 'zoomOutAlert',
  default: visualViewport.width < 499,
  effects: [
    ({ setSelf }) => {
      if (visualViewport.width > 499) return;

      const evCache: Array<PointerEvent> = [];
      let prevDiff = -1;

      const donwHandler = (e: PointerEvent) => evCache.push(e);

      const moveHandler = (e: PointerEvent) => {
        for (let i = 0; i < evCache.length; i++) {
          if (e.pointerId == evCache[i].pointerId) {
            evCache[i] = e;
            break;
          }
        }

        if (evCache.length == 2) {
          const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

          if (prevDiff > 0 && curDiff < prevDiff) {
            setSelf(false);
            cancel();
          }

          prevDiff = curDiff;
        }
      };

      const resetHandler = ({ pointerId }: PointerEvent) => {
        for (let i = 0; i < evCache.length; i++) {
          if (evCache[i].pointerId == pointerId) {
            evCache.splice(i, 1);
            break;
          }
        }
        if (evCache.length < 2) prevDiff = -1;
      };

      const cancel = () => {
        window.removeEventListener('pointerdown', donwHandler);
        window.removeEventListener('pointermove', moveHandler);
        window.removeEventListener('pointerup', resetHandler);
        window.removeEventListener('pointercancel', resetHandler);
        window.removeEventListener('pointerout', resetHandler);
        window.removeEventListener('pointerleave', resetHandler);
      };

      window.addEventListener('pointerdown', donwHandler);
      window.addEventListener('pointermove', moveHandler);
      window.addEventListener('pointerup', resetHandler);
      window.addEventListener('pointercancel', resetHandler);
      window.addEventListener('pointerout', resetHandler);
      window.addEventListener('pointerleave', resetHandler);

      return () => {
        cancel();
      };
    },
  ],
});

export const isPortraitAtom = atom({
  key: 'isPortrait',
  default: window.innerWidth < LANDSCAPE_WIDTH,
  effects: [
    ({ setSelf }) => {
      const resizeHandler = debounce(() => setSelf(window.innerWidth < LANDSCAPE_WIDTH), 100);

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    },
  ],
});
