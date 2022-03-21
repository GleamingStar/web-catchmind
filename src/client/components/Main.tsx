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
    min-height: 700px;
    height: calc(var(--vh, 1vh) * 100);
  }

  background-color: #dfd3c3;
  overflow: hidden;

  user-select: none;
`;

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

const Main = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;

  useEffect(() => {
    window.innerWidth < 500 &&
      document
        .getElementsByName('viewport')[0]
        .setAttribute('content', `width=device-width, initial-scale=${window.innerWidth / 500}`);

    const resizeHandler = throttle(
      () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`),
      100
    );
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <MainWrapper>
      <Suspense fallback={<></>}>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Entrance />}</Suspense>
    </MainWrapper>
  );
};

export default Main;
