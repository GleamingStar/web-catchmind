import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { chatLogAtom } from 'client/atom/chatAtom';
import { currentRoomIndexAtom, roomListAtom } from 'client/atom/roomAtom';
import { loginAlertAtom, roomAlertAtom } from 'client/atom/alertAtom';
import { contextAtom } from 'client/atom/canvasAtom';
import { gameAtom, timerAtom } from 'client/atom/gameAtom';
import { CANVAS_SIZE, LOGIN_ALERT_MESSAGE, ROOM_ALERT_MESSAGE, MAX_SET_TIMER } from 'shared/constant';
import { TCanvas, TChat, TGame, TUser } from 'shared/types';
import socket from './socket';

const Listener = () => {
  const setChatLog = useSetRecoilState(chatLogAtom);
  const setRoomIndex = useSetRecoilState(currentRoomIndexAtom);
  const setRoomList = useSetRecoilState(roomListAtom);
  const setAccount = useSetRecoilState(accountAtom);
  const setLoginAlert = useSetRecoilState(loginAlertAtom);
  const setRoomAlert = useSetRecoilState(roomAlertAtom);
  const setGame = useSetRecoilState(gameAtom);
  const setTimer = useSetRecoilState(timerAtom);
  const canvasContext = useRecoilValue(contextAtom);

  useEffect(() => {
    socket.on('chat', (chat: TChat) => setChatLog((log) => [...log, chat]));

    socket.on('room/update', setRoomList);

    socket.on('room/join', (roomId: number) => {
      setRoomAlert(ROOM_ALERT_MESSAGE.NONE);
      setRoomIndex(roomId);
    });

    socket.on('room/leave', () => {
      setChatLog([]);
      setRoomIndex(null);
      setGame(null);
    });

    socket.on('login/success', (account: TUser) => {
      setLoginAlert(LOGIN_ALERT_MESSAGE.NONE);
      setAccount(account);
    });

    socket.on('login/fail/duplicate', () => setLoginAlert(LOGIN_ALERT_MESSAGE.DUPLICATED));

    socket.on('game/set/start', (game: TGame) => {
      setGame(game);
      setTimer(MAX_SET_TIMER);
    });

    socket.on('game/timer', setTimer);

    socket.on('game/update', setGame);

    socket.on('game/end', () => setGame(null));

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    if (!canvasContext) return;
    socket.on('canvas/draw', ({ tool, thickness, color, location }: TCanvas) => {
      const { x0, y0, x1, y1 } = location;
      canvasContext.beginPath();
      canvasContext.lineWidth = thickness;
      canvasContext.globalCompositeOperation = tool === 'pencil' ? 'source-over' : 'destination-out';
      canvasContext.moveTo(x0, y0);
      canvasContext.lineTo(x1, y1);
      canvasContext.strokeStyle = color;
      canvasContext.stroke();
      canvasContext.closePath();
    });

    const resetListener = () => canvasContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    socket.on('canvas/reset', resetListener);

    socket.on('game/set/start', resetListener);

    socket.on('game/end', resetListener);

    return () => {
      socket.off('canvas/draw');
      socket.off('canvas/reset');
      socket.off('game/set/start', resetListener);
      socket.off('game/end', resetListener);
    };
  }, [canvasContext]);

  return <></>;
};

export default Listener;
