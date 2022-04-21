import { lazy, startTransition, Suspense, useCallback, useEffect } from 'react';
import { RecoilRoot, useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { leftSpaceAtom } from 'client/atom/canvasAtom';
import { currentRoomIndexAtom } from 'client/atom/roomAtom';
import { isPortraitAtom } from 'client/atom/miscAtom';
import { LANDSCAPE_WIDTH, PORTRAIT_WIDTH } from 'shared/constant';
import { throttle } from 'shared/util';
import Spinner from './common/Spinner';
import Entrance from './entrance/Entrance';
const Lobby = lazy(() => import('./lobby/Lobby'));
const Game = lazy(() => import('./game/Game'));

const Main = () => (
  <RecoilRoot>
    <MainContents />
  </RecoilRoot>
);

const MainContents = () => {
  const isLogined = useRecoilValue(accountAtom) !== null;
  const isInRoom = useRecoilValue(currentRoomIndexAtom) !== null;
  const [_, setLeftSpace] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(leftSpaceAtom);
  const [__, setPortrait] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(isPortraitAtom);

  const setHeight = useCallback(
    throttle(() => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`), 20),
    []
  );

  const setLeft = () => {
    const width = window.innerWidth;
    setPortrait(width <= LANDSCAPE_WIDTH);
    if (width > LANDSCAPE_WIDTH) setLeftSpace((width - LANDSCAPE_WIDTH) / 2);
    else if (width > PORTRAIT_WIDTH) setLeftSpace((width - PORTRAIT_WIDTH) / 2);
  };

  useEffect(() => {
    const resizeHandler = () => {
      setHeight();
      startTransition(() => setLeft());
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <Suspense fallback={<Spinner size={200} />}>{isLogined ? isInRoom ? <Game /> : <Lobby /> : <Entrance />}</Suspense>;
};

export default Main;
