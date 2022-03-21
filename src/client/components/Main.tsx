import styled from 'styled-components';
import { lazy, Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { currentRoomIndexAtom } from 'client/atom/roomAtom';
import Entrance from './entrance/Entrance';
const Lobby = lazy(() => import('./lobby/Lobby'));
const Game = lazy(() => import('./game/Game'));

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  @media screen and (max-width: 800px) {
    width: 500px;
    height: 100vh;
    min-height: 700px;
  }

  background-color: #dfd3c3;
  overflow: hidden;

  user-select: none;
`;

const Main = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;

  useEffect(() => {
    window.innerWidth < 500 &&
      document
        .getElementsByName('viewport')[0]
        .setAttribute('content', `width=device-width, initial-scale=${window.innerWidth / 500}`);
  }, []);

  return (
    <MainWrapper>
      <Suspense fallback={<></>}>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Entrance />}</Suspense>
    </MainWrapper>
  );
};

export default Main;
