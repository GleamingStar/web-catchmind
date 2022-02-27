import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { chatLogAtom } from 'client/atom/chatAtom';
import { currentRoomIndexAtom, roomListAtom } from 'client/atom/roomAtom';
import { loginAlertAtom, roomAlertAtom } from 'client/atom/alertAtom';
import { contextAtom } from 'client/atom/canvasAtom';
import { CANVAS_SIZE, LOGIN_ALERT_MESSAGE, ROOM_ALERT_MESSAGE } from 'shared/constant';
import { TChat, TUser } from 'shared/types';
import socket from './socket';

const Listener = () => {
  const setChatLog = useSetRecoilState(chatLogAtom);
  const setRoomIndex = useSetRecoilState(currentRoomIndexAtom);
  const setRoomList = useSetRecoilState(roomListAtom);
  const setAccount = useSetRecoilState(accountAtom);
  const setLoginAlert = useSetRecoilState(loginAlertAtom);
  const setRoomAlert = useSetRecoilState(roomAlertAtom);
  const canvasContext = useRecoilValue(contextAtom);

  useEffect(() => {
    socket.on('chat', (chat: TChat) => setChatLog((log) => [...log, chat]));
    socket.on('room/update', setRoomList);
    socket.on('room/join', (roomId: number) => {
      setRoomAlert(ROOM_ALERT_MESSAGE.NONE);
      setRoomIndex(roomId);
    });
    socket.on('login/success', (account: TUser) => {
      setLoginAlert(LOGIN_ALERT_MESSAGE.NONE);
      setAccount(account);
    });
    socket.on('login/fail/duplicate', () => setLoginAlert(LOGIN_ALERT_MESSAGE.DUPLICATED));

    return () => {
      socket.offAny();
    };
  }, []);

  useEffect(() => {
    if (!canvasContext) return;
    socket.on('canvas/draw', (canvas) => {
      const img = new Image();
      img.onload = () => canvasContext.drawImage(img, 0, 0);
      img.src = canvas;
    });

    socket.on('canvas/reset', () => canvasContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE));

    return () => {
      socket.off('canvas/draw');
      socket.off('canvas/reset');
    };
  }, [canvasContext]);

  return <></>;
};

export default Listener;