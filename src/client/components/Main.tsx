import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { currentRoomIndexAtom } from 'client/atom/roomAtom';
import Game from './game/Game';
import Lobby from './lobby/Lobby';
import Login from './login/Login';

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  background-color: #DFD3C3;
`;

const Main = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;
  return <MainWrapper>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Login />}</MainWrapper>;
};

export default Main;
