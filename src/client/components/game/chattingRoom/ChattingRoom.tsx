import styled from 'styled-components';
import Container from './Container';
import Sender from './Sender';

const ChattingRoomWrapper = styled.div`
  position: absolute;
  right: 0;

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
