import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { gameAtom, timerAtom } from 'client/atom/gameAtom';

const TimerWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  padding: 5px;
  top: 10px;
  left: 10px;
  pointer-events: none;

  border: 2px solid #cdb699;
  border-radius: 10px;
  background-color: #fbf8f134;
  backdrop-filter: blur(4px);
  box-shadow: 3px 3px 4px #bbb;

  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '-90px'})`};
  transition: transform 0.4s ease-out;
`;

const Timer = () => {
  const game = useRecoilValue(gameAtom);
  const timer = useRecoilValue(timerAtom);
  const account = useRecoilValue(accountAtom);
  const isPlaying = game?.users.some(({ id }) => id === account.id);

  return <TimerWrapper isActivated={game !== null}>{isPlaying ? timer : '관전중'}</TimerWrapper>;
};

export default Timer;
