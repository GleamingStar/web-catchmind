import { atom } from 'recoil';
import { LOGIN_ALERT_MESSAGE, ROOM_ALERT_MESSAGE } from 'shared/constant';

export const loginAlertAtom = atom({
  key: 'loginAlert',
  default: LOGIN_ALERT_MESSAGE.NONE,
});

export const roomAlertAtom = atom({
  key: 'roomAlert',
  default: ROOM_ALERT_MESSAGE.NONE,
});
