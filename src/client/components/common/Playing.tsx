import styled from 'styled-components';
import { BsBrush, BsEasel } from 'react-icons/bs';

const PlayingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Brush = styled.div`
  position: absolute;
  top: -5px;
  left: 5px;

  @keyframes draw {
    0% {
      transform: translate(-4px, 0px);
    }
    20% {
      transform: translate(-1px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(1px, -2px);
    }
    100% {
      transform: translate(4px, 0px);
    }
  }

  animation: 2s ease-in 0s infinite alternate draw;
`;

const Playing = ({ size }: { size: number }) => (
  <PlayingWrapper title="게임중">
    <BsEasel size={size} />
    <Brush>
      <BsBrush size={size * 0.75} />
    </Brush>
  </PlayingWrapper>
);

export default Playing;
