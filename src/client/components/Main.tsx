import styled from 'styled-components';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { leftSpaceAtom } from 'client/atom/canvasAtom';
import { currentRoomIndexAtom } from 'client/atom/roomAtom';
import { LANDSCAPE_WIDTH, PORTRAIT_WIDTH } from 'shared/constant';
import { debounce, throttle } from 'shared/util';
import Entrance from './entrance/Entrance';
const Lobby = lazy(() => import('./lobby/Lobby'));
const Game = lazy(() => import('./game/Game'));

const MainWrapper = styled.div`
  position: relative;

  width: ${LANDSCAPE_WIDTH}px;
  height: 600px;

  @media screen and (max-width: ${LANDSCAPE_WIDTH}px) {
    width: ${PORTRAIT_WIDTH}px;
    min-height: 700px;
    height: calc(var(--vh, 1vh) * 100);
  }

  background-color: #dfd3c3;
  overflow: hidden;

  user-select: none;
`;

const Main = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;
  const setLeftSpace = useSetRecoilState(leftSpaceAtom);

  const setHeight = useCallback(
    throttle(() => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`), 100),
    []
  );

  const setLeft = useCallback(
    debounce(() => {
      const width = window.innerWidth;
      if (width > LANDSCAPE_WIDTH) setLeftSpace((width - LANDSCAPE_WIDTH) / 2);
      else if (width > PORTRAIT_WIDTH) setLeftSpace((width - PORTRAIT_WIDTH) / 2);
    }, 250),
    []
  );

  useEffect(() => {
    const resizeHandler = () => {
      setHeight();
      setLeft();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <MainWrapper>
      <Suspense fallback={null}>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Entrance />}</Suspense>
    </MainWrapper>
  );
};

export default Main;
