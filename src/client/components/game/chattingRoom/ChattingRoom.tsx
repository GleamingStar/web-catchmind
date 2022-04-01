import { LANDSCAPE_WIDTH } from 'shared/constant';
import styled from 'styled-components';
import Container from './Container';
import Sender from './Sender';

const ChattingRoomWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  height: 100%;

  @media screen and (max-width: ${LANDSCAPE_WIDTH}px) and (max-height: 645px) {
    opacity: 0.5;
  }

  display: flex;
  flex-direction: column;

  transition: opacity 0.5s;
`;

const ChattingRoom = () => (
  <ChattingRoomWrapper>
    <Container />
    <Sender />
  </ChattingRoomWrapper>
);

export default ChattingRoom;
