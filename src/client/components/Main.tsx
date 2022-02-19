import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { chatLogAtom } from 'client/atom/chatAtom';
import { currentRoomIndexAtom, roomListAtom } from 'client/atom/roomAtom';
import socket from 'client/config/socket';
import { TChat } from 'shared/types';
import Game from './game/Game';
import Lobby from './lobby/Lobby';
import Login from './login/Login';

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  background-color: #c8f2ef;
`;

const Main = () => {
  const setChatLog = useSetRecoilState(chatLogAtom);
  const setRoomIndex = useSetRecoilState(currentRoomIndexAtom);
  const setRoomList = useSetRecoilState(roomListAtom);

  useEffect(() => {
    socket.on('chat', (chat: TChat) => setChatLog((log) => [...log, chat]));
    socket.on('room/update', (rooms) => setRoomList(rooms));
    socket.on('room/join', (id) => setRoomIndex(id));

    return () => {
      socket.offAny();
    };
  }, []);

  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;
  return <MainWrapper>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Login />}</MainWrapper>;
};

export default Main;
