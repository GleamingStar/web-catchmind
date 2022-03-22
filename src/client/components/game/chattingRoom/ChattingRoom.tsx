import styled from 'styled-components';
import Container from './Container';
import Sender from './Sender';

const ChattingRoomWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  height: 100%;

  @media screen and (max-width: 800px) {
    top: 500px;
  }

  display: flex;
  flex-direction: column;
`;

const ChattingRoom = () => (
  <ChattingRoomWrapper>
    <Container />
    <Sender />
  </ChattingRoomWrapper>
);

export default ChattingRoom;
