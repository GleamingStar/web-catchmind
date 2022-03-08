import styled from 'styled-components';
import { lazy, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { currentRoomIndexAtom } from 'client/atom/roomAtom';
import Entrance from './entrance/Entrance';
const Listener = lazy(() => import('client/config/Listener'));
const Lobby = lazy(() => import('./lobby/Lobby'));
const Game = lazy(() => import('./game/Game'));

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  background-color: #dfd3c3;
  overflow: hidden;

  user-select: none;
`;

const Main = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;
  return (
    <MainWrapper>
      <Suspense fallback={<></>}>
        <Listener />
        {isLogined ? isInRoom ? <Game /> : <Lobby /> : <Entrance />}
      </Suspense>
    </MainWrapper>
  );
};

export default Main;
