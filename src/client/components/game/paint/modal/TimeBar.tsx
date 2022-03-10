import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gameAtom, timerAtom } from 'client/atom/gameAtom';
import { CANVAS_SIZE } from 'shared/constant';

const TimeBarWrapper = styled.div<{ ratio: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: ${({ ratio }) => `${ratio * CANVAS_SIZE}px`};
  height: 4px;
  background-color: ${({ ratio }) =>
    ratio > 0.5 ? '#43c465' : ratio > 0.25 ? '#ff9f45' : ratio !== 0 ? '#871111' : '#43c465'};
  transition: width 1s, background-color 10s;

  pointer-events: none;
`;

const TimeBar = () => {
  const game = useRecoilValue(gameAtom);
  const timer = useRecoilValue(timerAtom);

  return game ? <TimeBarWrapper ratio={timer / 180} /> : <></>;
};

export default TimeBar;
